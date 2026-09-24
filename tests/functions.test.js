// Function-level acceptance tests (run with `node --test`).
// Covers brief tests 5 and 13 (access codes, server-side), 7 (Baseline
// payload), 14 (interpretation without marketing), 15 (counter payloads),
// 8 (EN/DE string parity), plus rate limiting and counter concurrency.

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const setTestEnv = require('./support/env');
const { createStores } = require('./support/memory-store');

const ROOT = path.resolve(__dirname, '..');
setTestEnv();
const lib = require(path.join(ROOT, 'netlify/impact/lib.js'));
const stores = createStores();
lib.setStoreFactory(stores);

const access = require(path.join(ROOT, 'netlify/impact/access.js'));
const submit = require(path.join(ROOT, 'netlify/impact/submit.js'));
const benchmark = require(path.join(ROOT, 'netlify/impact/benchmark.js'));
const counter = require(path.join(ROOT, 'netlify/impact/count.js'));

let ipSeq = 0;
function ev(body, opts) {
  const o = opts || {};
  return {
    httpMethod: o.method || 'POST',
    headers: { 'x-nf-client-connection-ip': o.ip || `10.0.0.${++ipSeq}`, ...(o.headers || {}) },
    body: body === undefined ? undefined : JSON.stringify(body),
  };
}
const json = (r) => JSON.parse(r.body || '{}');

const SCORES = { direction: 25, risk: 50, decisions: 50, plan: 75, people: 50, partners: 100, data: 0, systems: 75 };
const RANKING = ['data', 'direction', 'risk', 'decisions', 'people'];
const BASE = { lang: 'en', mode: 'quick', industry: 'industrial', size: '250to999', scores: SCORES, ranking: RANKING };

test.beforeEach(() => stores.reset());

/* ── 5 + 13: access codes ── */
test('access: invalid code rejected server-side', async () => {
  const r = await access.handler(ev({ code: 'NOPE-123' }));
  assert.equal(r.statusCode, 403);
  assert.equal(json(r).error, 'invalid');
});

test('access: expired code rejected with expired error', async () => {
  const r = await access.handler(ev({ code: 'TEST-EXPIRED' }));
  assert.equal(r.statusCode, 403);
  assert.equal(json(r).error, 'expired');
});

test('access: valid unexpired code accepted (case and spaces ignored)', async () => {
  assert.equal((await access.handler(ev({ code: 'TEST-VALID' }))).statusCode, 200);
  assert.equal((await access.handler(ev({ code: '  test-valid ' }))).statusCode, 200);
});

test('access: code valid through the end of its expiry day', async () => {
  const today = lib.zurichDate();
  const prev = process.env.IMPACT_ACCESS_CODES;
  process.env.IMPACT_ACCESS_CODES = JSON.stringify([{ code: 'EDGE-1', client: 'x', expires: today }]);
  try {
    assert.equal((await access.handler(ev({ code: 'EDGE-1' }))).statusCode, 200);
  } finally {
    process.env.IMPACT_ACCESS_CODES = prev;
  }
});

test('access: unexpected fields rejected', async () => {
  const r = await access.handler(ev({ code: 'TEST-VALID', client: 'x' }));
  assert.equal(r.statusCode, 400);
});

test('access: brute force is rate-limited (10 per window)', async () => {
  let last;
  for (let i = 0; i < 11; i++) last = await access.handler(ev({ code: `WRONG-${i}` }, { ip: '192.0.2.1' }));
  assert.equal(last.statusCode, 429);
});

test('access: no raw IP is stored by the rate limiter', async () => {
  await access.handler(ev({ code: 'TEST-VALID' }, { ip: '203.0.113.77' }));
  const dump = JSON.stringify(stores.dump('impact-ratelimit'));
  assert.ok(!dump.includes('203.0.113.77'));
});

test('functions refuse to run without RATE_LIMIT_SALT', async () => {
  const salt = process.env.RATE_LIMIT_SALT;
  delete process.env.RATE_LIMIT_SALT;
  try {
    assert.equal((await access.handler(ev({ code: 'TEST-VALID' }))).statusCode, 503);
  } finally {
    process.env.RATE_LIMIT_SALT = salt;
  }
});

test('access: foreign origin rejected', async () => {
  const r = await access.handler(ev({ code: 'TEST-VALID' }, { headers: { origin: 'https://evil.example' } }));
  assert.equal(r.statusCode, 403);
});

/* ── 7: Baseline payload ── */
test('benchmark: stores only the allowed fields', async () => {
  const r = await benchmark.handler(ev(BASE));
  assert.equal(r.statusCode, 200);
  const records = Object.values(stores.dump('impact-benchmark'));
  assert.equal(records.length, 1);
  assert.deepEqual(Object.keys(records[0]).sort(), ['date', 'industry', 'lang', 'mode', 'ranking', 'scores', 'size']);
  assert.deepEqual(Object.keys(records[0].scores).sort(), [...lib.DIMS].sort());
  assert.match(records[0].date, /^\d{4}-\d{2}-\d{2}$/);
});

test('benchmark: identifying or unexpected fields are rejected, nothing stored', async () => {
  for (const extra of [{ email: 'a@b.ch' }, { name: 'Anna' }, { org: 'Muster AG' }, { initiative: 'CRM' }, { date: '2026-01-01' }]) {
    const r = await benchmark.handler(ev({ ...BASE, ...extra }));
    assert.equal(r.statusCode, 400, JSON.stringify(extra));
  }
  const r2 = await benchmark.handler(ev({ ...BASE, scores: { ...SCORES, extra: 50 } }));
  assert.equal(r2.statusCode, 400);
  assert.equal(Object.keys(stores.dump('impact-benchmark')).length, 0);
});

test('benchmark: malformed values rejected', async () => {
  const bad = [
    { ...BASE, scores: { ...SCORES, risk: 30 } },            // quick mode only takes 25-point steps
    { ...BASE, scores: { ...SCORES, risk: 120 } },
    { ...BASE, ranking: ['data', 'risk'] },                  // a ranking is 0 or 5-8 long
    { ...BASE, ranking: ['data', 'data', 'risk', 'plan', 'people'] },
    { ...BASE, industry: 'banking' },
    { ...BASE, size: '5000' },
  ];
  for (const p of bad) assert.equal((await benchmark.handler(ev(p))).statusCode, 400, JSON.stringify(p));
});

test('benchmark: deep mode accepts averaged scores; sustain (empty ranking) accepted', async () => {
  const deep = { ...BASE, mode: 'deep', scores: { ...SCORES, risk: 17 } };
  assert.equal((await benchmark.handler(ev(deep))).statusCode, 200);
  assert.equal((await benchmark.handler(ev({ ...BASE, ranking: [] }))).statusCode, 200);
});

/* ── 14: interpretation request ── */
test('submit: succeeds with the marketing box unticked', async () => {
  const calls = [];
  const realFetch = global.fetch;
  global.fetch = async (url, opts) => { calls.push({ url, body: JSON.parse(opts.body) }); return new Response('{}', { status: 200 }); };
  try {
    const r = await submit.handler(ev({ ...BASE, email: 'anna@example.ch', marketing: false }));
    assert.equal(r.statusCode, 200);
    assert.equal(calls.length, 1);
    assert.match(calls[0].url, /^https:\/\/api-eu1\.hsforms\.com\/submissions\/v3\/integration\/submit\/49059754\/test-form-guid$/);
    const fields = Object.fromEntries(calls[0].body.fields.map((f) => [f.name, f.value]));
    assert.equal(fields.email, 'anna@example.ch');
    assert.equal(fields.impact_insights_opt_in, 'false');
    assert.match(fields.impact_checklist_summary, /Data: 0%/);
    assert.match(fields.impact_checklist_summary, /Where to start: 1\. Data/);
    assert.equal(stores.dump('impact-counters')[lib.zurichMonth()].quick.interpretation_requested, 1);
  } finally {
    global.fetch = realFetch;
  }
});

test('submit: email required, unexpected fields rejected', async () => {
  assert.equal((await submit.handler(ev({ ...BASE, marketing: false }))).statusCode, 400);
  assert.equal((await submit.handler(ev({ ...BASE, email: 'not-an-email', marketing: false }))).statusCode, 400);
  assert.equal((await submit.handler(ev({ ...BASE, email: 'a@b.ch', marketing: false, phone: '079' }))).statusCode, 400);
  assert.equal((await submit.handler(ev({ ...BASE, email: 'a@b.ch', marketing: 'yes' }))).statusCode, 400);
});

/* ── 15: counters ── */
test('count: accepts only {event, mode}; stores totals only', async () => {
  assert.equal((await counter.handler(ev({ event: 'started', mode: 'quick' }))).statusCode, 200);
  assert.equal((await counter.handler(ev({ event: 'completed', mode: 'deep' }))).statusCode, 200);
  for (const bad of [
    { event: 'started', mode: 'quick', id: 'abc' },
    { event: 'started', mode: 'quick', sessionId: 'x' },
    { event: 'started' },
    { event: 'interpretation_requested', mode: 'quick' }, // server-side only
    { event: 'visited', mode: 'quick' },
  ]) {
    assert.equal((await counter.handler(ev(bad))).statusCode, 400, JSON.stringify(bad));
  }
  const all = stores.dump('impact-counters');
  const months = Object.keys(all);
  assert.equal(months.length, 1);
  assert.match(months[0], /^\d{4}-\d{2}$/);
  assert.deepEqual(all[months[0]], { quick: { started: 1 }, deep: { completed: 1 } });
});

test('count: concurrent increments are not lost', async () => {
  await Promise.all(Array.from({ length: 20 }, () => lib.incrementCounter(null, 'started', 'quick')));
  assert.equal(stores.dump('impact-counters')[lib.zurichMonth()].quick.started, 20);
});

test('count: stats view requires the password', async () => {
  await counter.handler(ev({ event: 'started', mode: 'quick' }));
  const noAuth = await counter.handler(ev(undefined, { method: 'GET' }));
  assert.equal(noAuth.statusCode, 401);
  assert.match(noAuth.headers['WWW-Authenticate'], /^Basic/);
  const wrong = await counter.handler(ev(undefined, { method: 'GET', headers: { authorization: 'Basic ' + Buffer.from('dave:nope').toString('base64') } }));
  assert.equal(wrong.statusCode, 401);
  const ok = await counter.handler(ev(undefined, { method: 'GET', headers: { authorization: 'Basic ' + Buffer.from('dave:test-stats-password').toString('base64') } }));
  assert.equal(ok.statusCode, 200);
  assert.equal(json(ok).months[lib.zurichMonth()].quick.started, 1);
});

/* ── Netlify v2 entry points ── */
test('v2 entry points wrap the handlers and declare their /api/impact paths', async () => {
  const { pathToFileURL } = require('url');
  for (const name of ['access', 'submit', 'benchmark', 'count']) {
    const mod = await import(pathToFileURL(path.join(ROOT, `netlify/functions/impact-${name}.mjs`)).href);
    assert.equal(typeof mod.default, 'function', name);
    assert.deepEqual(mod.config, { path: `/api/impact/${name}` });
  }
  const access = await import(pathToFileURL(path.join(ROOT, 'netlify/functions/impact-access.mjs')).href);
  const ok = await access.default(new Request('http://x/api/impact/access', {
    method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ code: 'TEST-VALID' }),
  }), { ip: '198.51.100.9' });
  assert.equal(ok.status, 200);
  assert.deepEqual(await ok.json(), { ok: true });
  const expired = await access.default(new Request('http://x/api/impact/access', {
    method: 'POST', body: JSON.stringify({ code: 'TEST-EXPIRED' }),
  }), { ip: '198.51.100.9' });
  assert.equal(expired.status, 403);
  assert.equal((await expired.json()).error, 'expired');
  const stats = await (await import(pathToFileURL(path.join(ROOT, 'netlify/functions/impact-count.mjs')).href))
    .default(new Request('http://x/api/impact/count'), { ip: '198.51.100.9' });
  assert.equal(stats.status, 401);
  assert.match(stats.headers.get('www-authenticate'), /^Basic/);
});

/* ── 8: EN/DE parity in locales/*.json and js/i18n.js ── */
function loadI18n() {
  const win = { location: { search: '', href: 'http://x/' }, dispatchEvent() {}, history: { replaceState() {} } };
  const ctx = {
    window: win,
    localStorage: { getItem: () => null, setItem() {} },
    navigator: { language: 'en' },
    URLSearchParams, URL, CustomEvent: function () {},
  };
  vm.runInNewContext(fs.readFileSync(path.join(ROOT, 'js/i18n.js'), 'utf8'), ctx);
  return win.F8_I18N.translations;
}
function leaves(o, p, acc) {
  acc = acc || {};
  if (o && typeof o === 'object') for (const k of Object.keys(o)) leaves(o[k], p ? `${p}.${k}` : k, acc);
  else acc[p] = o;
  return acc;
}
function get(obj, key) { return key.split('.').reduce((v, k) => (v == null ? v : v[k]), obj); }

test('i18n: impact and privacy strings match between locales/*.json and js/i18n.js, EN and DE', () => {
  const T = loadI18n();
  const en = JSON.parse(fs.readFileSync(path.join(ROOT, 'locales/en.json'), 'utf8'));
  const de = JSON.parse(fs.readFileSync(path.join(ROOT, 'locales/de.json'), 'utf8'));
  for (const ns of ['impact', 'privacy']) {
    assert.deepEqual(leaves(T.en[ns]), leaves(en[ns]), `en ${ns}: i18n.js vs en.json`);
    assert.deepEqual(leaves(T.de[ns]), leaves(de[ns]), `de ${ns}: i18n.js vs de.json`);
    assert.deepEqual(Object.keys(leaves(en[ns])).sort(), Object.keys(leaves(de[ns])).sort(), `${ns}: EN/DE keys`);
  }
  for (const [k, v] of Object.entries(leaves(de.impact))) {
    assert.ok(typeof v === 'string' && v.trim(), `empty DE string ${k}`);
    assert.ok(!v.includes('ß'), `ß in ${k} (Swiss spelling uses ss)`);
  }
  for (const [k, v] of Object.entries({ ...leaves(en.impact), ...leaves(de.impact) })) {
    assert.ok(!/(CHF|EUR|€|\$\s?\d|100\+)/.test(v), `pricing or "100+" in ${k}`);
  }
});

test('i18n: every key the page uses exists in EN and DE', () => {
  const T = loadI18n();
  const html = fs.readFileSync(path.join(ROOT, 'impact-checklist.html'), 'utf8');
  const js = fs.readFileSync(path.join(ROOT, 'js/impact-checklist.js'), 'utf8');
  const keys = new Set();
  for (const m of html.matchAll(/data-t(?:-aria)?="([^"]+)"/g)) keys.add(m[1]);
  for (const m of js.matchAll(/\bt\('([a-zA-Z0-9.]*[a-zA-Z0-9])'/g)) keys.add('impact.' + m[1]);
  for (const id of lib.DIMS) keys.add(`impact.dims.${id}.name`);
  for (const lang of ['en', 'de']) {
    for (const k of keys) {
      const v = get(T[lang], k);
      assert.ok(v != null && v !== '', `${lang}: missing ${k}`);
    }
  }
  assert.ok(keys.size > 80, `expected many keys, found ${keys.size}`);
});

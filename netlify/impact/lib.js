const crypto = require('crypto');

// Shared helpers for the Impact Checklist functions: strict payload
// validation, durable (Netlify Blobs) rate limiting, lost-update-safe
// counters and a common response shape.

const DIMS = ['direction', 'risk', 'decisions', 'plan', 'people', 'partners', 'data', 'systems'];
const MODES = ['quick', 'deep'];
const LANGS = ['en', 'de'];
const INDUSTRIES = ['lifeSciences', 'consumer', 'industrial', 'other'];
const SIZES = ['lt50', '50to249', '250to999', '1000plus'];
const TRUST_STEPS = [0, 25, 50, 75, 100];
const ALLOWED_ORIGINS = ['https://facilit8.org', 'https://www.facilit8.org'];
const MAX_BODY_BYTES = 8 * 1024;

const JSON_HEADERS = {
  'Content-Type': 'application/json',
  'X-Robots-Tag': 'noindex, nofollow, noarchive',
  'Cache-Control': 'no-store',
};

/* ── Blobs (injectable for tests) ──
   The Impact functions run in Netlify's current (v2) function format, where
   Blobs is configured automatically, including the uncached endpoint that
   strong-consistency reads need. Lambda-compatibility functions never get
   that endpoint, which is why these are not written as `exports.handler`
   functions like the older ones in netlify/functions. */
let storeFactory = null;
let blobsGetStore = null;
function setStoreFactory(fn) { storeFactory = fn; }
// The v2 entry points import @netlify/blobs statically (so Netlify's bundler
// ships it) and hand getStore in here.
function setBlobsGetStore(fn) { blobsGetStore = fn; }
// Blobs stores are site-wide, shared by production and every preview. Keep
// preview and branch-deploy data out of the real Baseline and counters by
// suffixing the store name outside production.
let deployContext = 'production';
function storeName(name) {
  return deployContext === 'production' ? name : `${name}-${deployContext}`;
}
function store(name) {
  if (storeFactory) return storeFactory(name);
  if (!blobsGetStore) throw new Error('Netlify Blobs not wired: call setBlobsGetStore from the entry point');
  return blobsGetStore({ name: storeName(name), consistency: 'strong' });
}

/* ── v2 adapter ──
   Each handler takes a small event object ({ httpMethod, headers, body })
   and returns { statusCode, headers, body }. toV2 wraps it as a Netlify v2
   function: (Request, Context) => Response. */
function toV2(handler) {
  return async (req, context) => {
    const headers = {};
    req.headers.forEach((v, k) => { headers[k] = v; });
    if (context && context.ip) headers['x-nf-client-connection-ip'] = context.ip;
    deployContext = (context && context.deploy && context.deploy.context) || 'production';
    const body = req.method === 'GET' || req.method === 'HEAD' ? undefined : await req.text();
    const out = await handler({ httpMethod: req.method, headers, body });
    return new Response(out.body == null ? '' : out.body, { status: out.statusCode, headers: out.headers || {} });
  };
}

/* ── Responses ── */
function reply(statusCode, body, extraHeaders) {
  return { statusCode, headers: { ...JSON_HEADERS, ...(extraHeaders || {}) }, body: JSON.stringify(body) };
}

// Deploy previews and branch deploys run on *.netlify.app; allow the site's
// own URL (Netlify sets URL / DEPLOY_PRIME_URL / DEPLOY_URL) as well as the
// production domains.
function allowedOrigins() {
  const own = [process.env.URL, process.env.DEPLOY_PRIME_URL, process.env.DEPLOY_URL]
    .filter(Boolean)
    .map((u) => u.replace(/\/$/, ''));
  return ALLOWED_ORIGINS.concat(own);
}

// Same-origin POST only. Returns an error response, or null to continue.
function guard(event, methods) {
  const allowed = methods || ['POST'];
  if (!allowed.includes(event.httpMethod)) return reply(405, { error: 'method not allowed' });
  const origin = event.headers.origin || event.headers.Origin || '';
  if (origin && !allowedOrigins().includes(origin)) return reply(403, { error: 'forbidden origin' });
  return null;
}

function parseBody(event) {
  const raw = event.body || '';
  if (Buffer.byteLength(raw, 'utf8') > MAX_BODY_BYTES) return { error: 'payload too large' };
  try {
    const v = JSON.parse(raw || '{}');
    if (!v || typeof v !== 'object' || Array.isArray(v)) return { error: 'invalid json' };
    return { value: v };
  } catch (e) {
    return { error: 'invalid json' };
  }
}

/* ── Validation ── */
function onlyKeys(obj, allowed, required) {
  const extra = Object.keys(obj).filter((k) => !allowed.includes(k));
  if (extra.length) return `unexpected field: ${extra[0]}`;
  const missing = (required || []).filter((k) => !(k in obj));
  if (missing.length) return `missing field: ${missing[0]}`;
  return null;
}

function checkScores(scores) {
  if (!scores || typeof scores !== 'object' || Array.isArray(scores)) return 'invalid scores';
  const err = onlyKeys(scores, DIMS, DIMS);
  if (err) return err;
  for (const id of DIMS) {
    const v = scores[id];
    if (!Number.isInteger(v) || v < 0 || v > 100) return 'invalid scores';
  }
  return null;
}

function checkRanking(ranking) {
  if (!Array.isArray(ranking) || ranking.length > 8) return 'invalid ranking';
  const seen = new Set();
  for (const id of ranking) {
    if (!DIMS.includes(id) || seen.has(id)) return 'invalid ranking';
    seen.add(id);
  }
  // The ranking step always shows at least 5 dimensions, or is skipped entirely.
  if (ranking.length !== 0 && ranking.length < 5) return 'invalid ranking';
  return null;
}

// Fields shared by the interpretation request and the Baseline record.
function checkCommon(p) {
  if (!LANGS.includes(p.lang)) return 'invalid lang';
  if (!MODES.includes(p.mode)) return 'invalid mode';
  if (!INDUSTRIES.includes(p.industry)) return 'invalid industry';
  if (!SIZES.includes(p.size)) return 'invalid size';
  if (p.mode === 'quick' && Object.values(p.scores).some((v) => !TRUST_STEPS.includes(v))) return 'invalid scores';
  return checkScores(p.scores) || checkRanking(p.ranking);
}

/* ── Time ── */
function zurichDate(d) {
  // en-CA gives YYYY-MM-DD
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Zurich', year: 'numeric', month: '2-digit', day: '2-digit' }).format(d || new Date());
}
function zurichMonth(d) { return zurichDate(d).slice(0, 7); }

/* ── Timing-safe string compare ── */
function safeEqual(a, b) {
  const ha = crypto.createHash('sha256').update(String(a)).digest();
  const hb = crypto.createHash('sha256').update(String(b)).digest();
  return crypto.timingSafeEqual(ha, hb);
}

/* ── Conditional-write update, retried on conflict ── */
// Each conflict means another request won the race, so a burst of N
// simultaneous writers needs up to N rounds; the jittered backoff spreads
// them out so they do not keep colliding.
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
async function atomicUpdate(st, key, mutate, attempts) {
  const max = attempts || 40;
  for (let i = 0; i < max; i++) {
    const cur = await st.getWithMetadata(key, { type: 'json' });
    const next = mutate(cur ? cur.data : null);
    const opts = cur ? { onlyIfMatch: cur.etag } : { onlyIfNew: true };
    const res = await st.setJSON(key, next, opts);
    if (!res || res.modified !== false) return next;
    await sleep(Math.random() * Math.min(200, 10 * (i + 1)));
  }
  throw new Error('atomic update failed after retries');
}

/* ── Durable rate limiting ──
   Key = function name + SHA-256(salt + UTC date + client IP). The salt is
   secret and the date rotates daily, so hashes cannot be reversed or linked
   across days. Expired entries are pruned opportunistically. No raw IP is
   ever stored. */
function clientHash(event) {
  const salt = process.env.RATE_LIMIT_SALT;
  if (!salt) return null;
  const ip = event.headers['x-nf-client-connection-ip'] || event.headers['client-ip'] || 'unknown';
  const day = new Date().toISOString().slice(0, 10);
  return crypto.createHash('sha256').update(`${salt}|${day}|${ip}`).digest('hex').slice(0, 32);
}

async function rateLimit(event, fnName, max, windowMs) {
  const hash = clientHash(event);
  if (!hash) return reply(503, { error: 'rate limiting not configured' });
  const st = store('impact-ratelimit', event);
  const now = Date.now();
  const key = `${fnName}/${hash}`;
  let limited = false;
  await atomicUpdate(st, key, (cur) => {
    const rec = cur && now - cur.start < windowMs ? { ...cur } : { start: now, count: 0 };
    rec.count += 1;
    limited = rec.count > max;
    return rec;
  });
  if (Math.random() < 0.02) pruneRateLimits(st, now).catch(() => {});
  return limited ? reply(429, { error: 'too many requests, try again shortly' }) : null;
}

const MAX_WINDOW_MS = 24 * 60 * 60 * 1000;
async function pruneRateLimits(st, now) {
  const { blobs } = await st.list();
  for (const b of blobs || []) {
    const rec = await st.get(b.key, { type: 'json' });
    if (!rec || now - rec.start > MAX_WINDOW_MS) await st.delete(b.key);
  }
}

/* ── Counters ── */
const COUNTER_EVENTS = ['started', 'completed', 'interpretation_requested', 'benchmark_contributed'];

async function incrementCounter(event, name, mode) {
  if (!COUNTER_EVENTS.includes(name) || !MODES.includes(mode)) throw new Error('invalid counter');
  const st = store('impact-counters', event);
  const month = zurichMonth();
  return atomicUpdate(st, month, (cur) => {
    const data = cur || {};
    const m = { ...(data[mode] || {}) };
    m[name] = (m[name] || 0) + 1;
    return { ...data, [mode]: m };
  });
}

module.exports = {
  DIMS, MODES, LANGS, INDUSTRIES, SIZES, COUNTER_EVENTS,
  setStoreFactory, setBlobsGetStore, store, storeName, toV2, reply, guard, parseBody, onlyKeys,
  checkScores, checkRanking, checkCommon, zurichDate, zurichMonth,
  safeEqual, atomicUpdate, rateLimit, incrementCounter,
};

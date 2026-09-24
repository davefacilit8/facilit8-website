const crypto = require('crypto');
const lib = require('./_impact-lib');

// Impact Checklist: "Add my anonymous scores to the facilit8 Swiss Impact
// Baseline." Stores ONLY date, language, mode, industry, size band, the 8
// trust scores and the ranked list. Any other field is rejected, and the
// record is built from an explicit allow-list, never by copying the input.

const ALLOWED = ['lang', 'mode', 'industry', 'size', 'scores', 'ranking'];
const RATE_MAX = 5;
const RATE_WINDOW_MS = 10 * 60 * 1000;

function buildRecord(p) {
  const scores = {};
  lib.DIMS.forEach((id) => { scores[id] = p.scores[id]; });
  return {
    date: lib.zurichDate(),
    lang: p.lang,
    mode: p.mode,
    industry: p.industry,
    size: p.size,
    scores,
    ranking: p.ranking.slice(),
  };
}

exports.handler = async (event) => {
  const blocked = lib.guard(event);
  if (blocked) return blocked;

  const limited = await lib.rateLimit(event, 'benchmark', RATE_MAX, RATE_WINDOW_MS);
  if (limited) return limited;

  const parsed = lib.parseBody(event);
  if (parsed.error) return lib.reply(400, { error: parsed.error });
  const p = parsed.value;
  const err = lib.onlyKeys(p, ALLOWED, ALLOWED) || lib.checkCommon(p);
  if (err) return lib.reply(400, { error: err });

  const record = buildRecord(p);
  const key = `${record.date.slice(0, 7)}/${crypto.randomUUID()}`;
  await lib.store('impact-benchmark', event).setJSON(key, record);

  try { await lib.incrementCounter(event, 'benchmark_contributed', p.mode); } catch (e) {}
  return lib.reply(200, { ok: true });
};

exports._test = { buildRecord, ALLOWED };

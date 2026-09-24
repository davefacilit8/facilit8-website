const lib = require('./_impact-lib');

// Impact Checklist: checks a deep-mode / facilitator access code.
// Codes live only in the IMPACT_ACCESS_CODES env var, as JSON:
//   [{"code":"KX7-2Q9","client":"Muster AG","expires":"2026-12-31"}]
// A code is valid through the end of its expiry day (Europe/Zurich).
// See docs/impact-access-codes.md.

const RATE_MAX = 10;
const RATE_WINDOW_MS = 15 * 60 * 1000;

function normalise(code) {
  return String(code || '').trim().toUpperCase();
}

function loadCodes() {
  try {
    const list = JSON.parse(process.env.IMPACT_ACCESS_CODES || '[]');
    return Array.isArray(list) ? list.filter((c) => c && typeof c.code === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(c.expires || '')) : null;
  } catch (e) {
    return null;
  }
}

exports.handler = async (event) => {
  const blocked = lib.guard(event);
  if (blocked) return blocked;

  const limited = await lib.rateLimit(event, 'access', RATE_MAX, RATE_WINDOW_MS);
  if (limited) return limited;

  const parsed = lib.parseBody(event);
  if (parsed.error) return lib.reply(400, { error: parsed.error });
  const p = parsed.value;
  const keyErr = lib.onlyKeys(p, ['code'], ['code']);
  if (keyErr) return lib.reply(400, { error: keyErr });
  if (typeof p.code !== 'string' || p.code.length > 64) return lib.reply(400, { error: 'invalid code' });

  const codes = loadCodes();
  if (!codes) return lib.reply(500, { error: 'access codes not configured' });

  const given = normalise(p.code);
  // Compare against every entry so timing does not reveal list position.
  let match = null;
  for (const c of codes) {
    if (lib.safeEqual(normalise(c.code), given) && !match) match = c;
  }
  if (!match) return lib.reply(403, { error: 'invalid' });
  if (lib.zurichDate() > match.expires) return lib.reply(403, { error: 'expired' });
  return lib.reply(200, { ok: true });
};

const lib = require('./lib');

// Impact Checklist: anonymous completion counters.
//   POST {event, mode}  -> +1 for that event, mode and month (Europe/Zurich).
//                          Only 'started' and 'completed' come from the page;
//                          the other two are counted server-side by the
//                          submit and benchmark functions.
//   GET  (HTTP Basic, password = IMPACT_STATS_PASSWORD) -> all months as JSON.
// No identifiers, cookies, IP addresses or fingerprints are stored.

const CLIENT_EVENTS = ['started', 'completed'];
const POST_MAX = 30;
const POST_WINDOW_MS = 10 * 60 * 1000;
const GET_MAX = 10;
const GET_WINDOW_MS = 15 * 60 * 1000;

function basicPassword(event) {
  const h = event.headers.authorization || event.headers.Authorization || '';
  const m = /^Basic\s+(.+)$/i.exec(h);
  if (!m) return null;
  const decoded = Buffer.from(m[1], 'base64').toString('utf8');
  const i = decoded.indexOf(':');
  return i >= 0 ? decoded.slice(i + 1) : null;
}

async function stats(event) {
  const limited = await lib.rateLimit(event, 'stats', GET_MAX, GET_WINDOW_MS);
  if (limited) return limited;
  const expected = process.env.IMPACT_STATS_PASSWORD;
  if (!expected) return lib.reply(500, { error: 'stats password not configured' });
  const given = basicPassword(event);
  if (given == null || !lib.safeEqual(given, expected)) {
    return lib.reply(401, { error: 'unauthorised' }, { 'WWW-Authenticate': 'Basic realm="facilit8 Impact Checklist stats", charset="UTF-8"' });
  }
  const st = lib.store('impact-counters', event);
  const { blobs } = await st.list();
  const months = {};
  for (const b of (blobs || []).sort((a, c) => a.key.localeCompare(c.key))) {
    months[b.key] = await st.get(b.key, { type: 'json' });
  }
  return lib.reply(200, { generated: new Date().toISOString(), months });
}

exports.handler = async (event) => {
  const blocked = lib.guard(event, ['POST', 'GET']);
  if (blocked) return blocked;
  if (event.httpMethod === 'GET') return stats(event);

  const limited = await lib.rateLimit(event, 'count', POST_MAX, POST_WINDOW_MS);
  if (limited) return limited;

  const parsed = lib.parseBody(event);
  if (parsed.error) return lib.reply(400, { error: parsed.error });
  const p = parsed.value;
  const err = lib.onlyKeys(p, ['event', 'mode'], ['event', 'mode']);
  if (err) return lib.reply(400, { error: err });
  if (!CLIENT_EVENTS.includes(p.event)) return lib.reply(400, { error: 'invalid event' });
  if (!lib.MODES.includes(p.mode)) return lib.reply(400, { error: 'invalid mode' });

  await lib.incrementCounter(event, p.event, p.mode);
  return lib.reply(200, { ok: true });
};

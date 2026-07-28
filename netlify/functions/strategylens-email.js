const { Resend } = require('resend');

// StrategyLENS is a public soft-launch (noindex, unlisted) — this endpoint
// backs the "email me my dashboard" action. It sends the plain-text cascade
// summary the frontend builds; it does not persist anything server-side.

const ALLOWED_ORIGINS = ['https://facilit8.org', 'https://www.facilit8.org'];
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_SUMMARY_LENGTH = 4000; // ~4KB, per handover spec
const FACILIT8_CC = 'david@facilit8.org'; // matches CONFIG.email used elsewhere on the site

const JSON_HEADERS = {
  'Content-Type': 'application/json',
  'X-Robots-Tag': 'noindex, nofollow, noarchive',
  'Cache-Control': 'no-store',
};

// Best-effort in-memory rate limit. Netlify Functions are stateless across
// cold starts and instances, so this only throttles repeat hits on the same
// warm instance — it is not a durable rate limiter. There's no existing
// rate-limit helper in this repo to reuse, and adding real infrastructure
// (e.g. Blobs-backed counters) felt like overkill for a soft-launch tool.
// Revisit if abuse becomes a real problem.
const hits = new Map();
const RATE_LIMIT_WINDOW_MS = 60 * 1000;
const RATE_LIMIT_MAX = 5;

function corsHeaders(origin) {
  if (origin && ALLOWED_ORIGINS.includes(origin)) {
    return {
      'Access-Control-Allow-Origin': origin,
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };
  }
  return {};
}

function isRateLimited(key) {
  const now = Date.now();
  const rec = hits.get(key) || { count: 0, start: now };
  if (now - rec.start > RATE_LIMIT_WINDOW_MS) {
    rec.count = 0;
    rec.start = now;
  }
  rec.count += 1;
  hits.set(key, rec);
  return rec.count > RATE_LIMIT_MAX;
}

exports.handler = async (event) => {
  const origin = event.headers.origin || event.headers.Origin || '';
  const cors = corsHeaders(origin);
  const headers = { ...JSON_HEADERS, ...cors };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers };
  }

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers, body: JSON.stringify({ error: 'method not allowed' }) };
  }

  // Same-origin only. Requests with no Origin header (e.g. curl, server-to-server)
  // are allowed through to this check but still hit validation below; browser
  // requests from anywhere else are rejected here.
  if (origin && !ALLOWED_ORIGINS.includes(origin)) {
    return { statusCode: 403, headers, body: JSON.stringify({ error: 'forbidden origin' }) };
  }

  const clientKey = event.headers['x-nf-client-connection-ip'] || event.headers['client-ip'] || 'unknown';
  if (isRateLimited(clientKey)) {
    return { statusCode: 429, headers, body: JSON.stringify({ error: 'too many requests, try again shortly' }) };
  }

  let payload;
  try {
    payload = JSON.parse(event.body || '{}');
  } catch (e) {
    return { statusCode: 400, headers, body: JSON.stringify({ error: 'invalid json' }) };
  }

  const { to, ccFacilit8, lang, company, summary } = payload;

  if (typeof to !== 'string' || to.length > 254 || !EMAIL_RE.test(to.trim())) {
    return { statusCode: 400, headers, body: JSON.stringify({ error: 'invalid email address' }) };
  }
  if (typeof summary !== 'string' || summary.trim().length === 0) {
    return { statusCode: 400, headers, body: JSON.stringify({ error: 'missing summary' }) };
  }
  if (summary.length > MAX_SUMMARY_LENGTH) {
    return { statusCode: 400, headers, body: JSON.stringify({ error: 'summary too long' }) };
  }

  const safeLang = lang === 'de' ? 'de' : 'en';
  const safeCompany = typeof company === 'string' ? company.trim().slice(0, 200) : '';

  const consentLine = safeLang === 'de'
    ? 'Auf Ihre Anfrage gesendet von StrategyLENS (facilit8.org). Wir speichern nichts, ausser Sie haben eine Kopie an facilit8 gewählt.'
    : 'Sent at your request by StrategyLENS (facilit8.org). We store nothing unless you chose to CC facilit8.';

  const subject = safeLang === 'de'
    ? `StrategyLENS — ${safeCompany || 'Ihr Dashboard'}`
    : `StrategyLENS — ${safeCompany || 'your dashboard'}`;

  const textBody = `${summary}\n\n—\n${consentLine}`;

  if (!process.env.RESEND_API_KEY) {
    // Fails loudly rather than silently pretending to send — surfaces
    // misconfiguration immediately instead of leaving users thinking it worked.
    return { statusCode: 500, headers, body: JSON.stringify({ error: 'email not configured' }) };
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    const { error } = await resend.emails.send({
      from: 'StrategyLENS <strategylens@facilit8.org>',
      to: [to.trim()],
      cc: ccFacilit8 === true ? [FACILIT8_CC] : undefined,
      subject,
      text: textBody,
    });
    if (error) {
      return { statusCode: 502, headers, body: JSON.stringify({ error: 'send failed' }) };
    }
    return { statusCode: 200, headers, body: JSON.stringify({ ok: true }) };
  } catch (e) {
    return { statusCode: 502, headers, body: JSON.stringify({ error: 'send failed' }) };
  }
};

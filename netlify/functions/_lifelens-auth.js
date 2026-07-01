const crypto = require('crypto');

const COOKIE_NAME = 'll_auth';
const MAX_AGE_SECONDS = 60 * 60 * 24 * 30; // 30 days

function sign(value, secret) {
  return crypto.createHmac('sha256', secret).update(value).digest('hex');
}

function makeToken(secret) {
  const expires = Date.now() + MAX_AGE_SECONDS * 1000;
  const payload = String(expires);
  return `${payload}.${sign(payload, secret)}`;
}

function verifyToken(token, secret) {
  if (!token) return false;
  const parts = token.split('.');
  if (parts.length !== 2) return false;
  const [payload, sig] = parts;
  const expected = sign(payload, secret);
  const sigBuf = Buffer.from(sig);
  const expectedBuf = Buffer.from(expected);
  if (sigBuf.length !== expectedBuf.length) return false;
  if (!crypto.timingSafeEqual(sigBuf, expectedBuf)) return false;
  const expires = Number(payload);
  return Number.isFinite(expires) && Date.now() < expires;
}

function parseCookies(header) {
  const out = {};
  if (!header) return out;
  header.split(';').forEach(part => {
    const idx = part.indexOf('=');
    if (idx === -1) return;
    out[part.slice(0, idx).trim()] = decodeURIComponent(part.slice(idx + 1).trim());
  });
  return out;
}

function isAuthenticated(event) {
  const secret = process.env.LIFELENS_SECRET;
  if (!secret) return false;
  const cookies = parseCookies(event.headers.cookie || event.headers.Cookie);
  return verifyToken(cookies[COOKIE_NAME], secret);
}

function authCookieHeader() {
  const secret = process.env.LIFELENS_SECRET;
  const token = makeToken(secret);
  return `${COOKIE_NAME}=${encodeURIComponent(token)}; Path=/; Max-Age=${MAX_AGE_SECONDS}; HttpOnly; Secure; SameSite=Lax`;
}

module.exports = { isAuthenticated, authCookieHeader, COOKIE_NAME };

const { getStore } = require('@netlify/blobs');
const { isAuthenticated } = require('./_lifelens-auth');

const JSON_HEADERS = {
  'Content-Type': 'application/json',
  'X-Robots-Tag': 'noindex, nofollow, noarchive',
  'Cache-Control': 'no-store',
};

exports.handler = async (event) => {
  if (!isAuthenticated(event)) {
    return { statusCode: 401, headers: JSON_HEADERS, body: JSON.stringify({ error: 'unauthenticated' }) };
  }

  const store = getStore('lifelens');

  if (event.httpMethod === 'GET') {
    const state = await store.get('state', { type: 'json' });
    return { statusCode: 200, headers: JSON_HEADERS, body: JSON.stringify({ state: state || null }) };
  }

  if (event.httpMethod === 'POST') {
    let state;
    try {
      state = JSON.parse(event.body || '{}');
    } catch (e) {
      return { statusCode: 400, headers: JSON_HEADERS, body: JSON.stringify({ error: 'invalid json' }) };
    }
    await store.setJSON('state', state);
    return { statusCode: 200, headers: JSON_HEADERS, body: JSON.stringify({ ok: true }) };
  }

  return { statusCode: 405, headers: JSON_HEADERS, body: JSON.stringify({ error: 'method not allowed' }) };
};

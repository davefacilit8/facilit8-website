// Local test server for the Impact Checklist.
// - Serves the repo as static files (like Netlify with publish = ".").
// - Routes /api/impact/* to the real function handlers, with Netlify Blobs
//   replaced by an in-memory store and HubSpot replaced by a recorder.
// - /__test/* endpoints let tests inspect function inputs and reset state.

const http = require('http');
const fs = require('fs');
const path = require('path');
const setTestEnv = require('./env');
const { createStores } = require('./memory-store');

const ROOT = path.resolve(__dirname, '../..');
const PORT = Number(process.env.PORT || 8765);
const BASE = `http://127.0.0.1:${PORT}`;

setTestEnv({ URL: BASE });
const lib = require(path.join(ROOT, 'netlify/functions/_impact-lib.js'));
const stores = createStores();
lib.setStoreFactory(stores);

const FUNCTIONS = {
  '/api/impact/access': 'impact-access',
  '/api/impact/submit': 'impact-submit',
  '/api/impact/benchmark': 'impact-benchmark',
  '/api/impact/count': 'impact-count',
};

const log = { inputs: [], hubspot: [] };

const realFetch = global.fetch;
global.fetch = async (url, opts) => {
  if (String(url).includes('hsforms.com')) {
    log.hubspot.push({ url: String(url), body: JSON.parse(opts.body) });
    return new Response(JSON.stringify({ inlineMessage: 'ok' }), { status: 200 });
  }
  return realFetch(url, opts);
};

const TYPES = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8',
  '.json': 'application/json', '.png': 'image/png', '.jpg': 'image/jpeg', '.gif': 'image/gif',
  '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.xml': 'application/xml', '.txt': 'text/plain',
};

function readBody(req) {
  return new Promise((resolve) => {
    let data = '';
    req.on('data', (c) => { data += c; });
    req.on('end', () => resolve(data));
  });
}

async function handleFunction(req, res, name, body) {
  const fn = require(path.join(ROOT, 'netlify/functions', name + '.js'));
  let parsed = null;
  try { parsed = JSON.parse(body || 'null'); } catch (e) {}
  log.inputs.push({ fn: name, method: req.method, body: parsed });
  const headers = {};
  for (const [k, v] of Object.entries(req.headers)) headers[k] = v;
  headers['x-nf-client-connection-ip'] = headers['x-test-ip'] || '127.0.0.1';
  const out = await fn.handler({ httpMethod: req.method, headers, body });
  res.writeHead(out.statusCode, out.headers || {});
  res.end(out.body || '');
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, BASE);
  const body = await readBody(req);
  try {
    if (url.pathname === '/__test/reset') {
      stores.reset();
      log.inputs = [];
      log.hubspot = [];
      res.writeHead(204); res.end(); return;
    }
    if (url.pathname === '/__test/log') {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ ...log, benchmark: stores.dump('impact-benchmark'), counters: stores.dump('impact-counters') }));
      return;
    }
    if (FUNCTIONS[url.pathname]) { await handleFunction(req, res, FUNCTIONS[url.pathname], body); return; }

    let rel = decodeURIComponent(url.pathname);
    if (rel === '/impact-checklist') rel = '/impact-checklist.html';
    if (rel.endsWith('/')) rel += 'index.html';
    const file = path.join(ROOT, rel);
    if (!file.startsWith(ROOT) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) {
      res.writeHead(404); res.end('not found'); return;
    }
    res.writeHead(200, { 'Content-Type': TYPES[path.extname(file)] || 'application/octet-stream' });
    fs.createReadStream(file).pipe(res);
  } catch (e) {
    console.error(e);
    res.writeHead(500); res.end(String(e && e.message));
  }
});

server.listen(PORT, '127.0.0.1', () => console.log(`impact test server on ${BASE}`));

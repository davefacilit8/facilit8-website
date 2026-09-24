// In-memory stand-in for a Netlify Blobs store: the subset the Impact
// functions use, including conditional writes (onlyIfMatch / onlyIfNew).

class MemoryStore {
  constructor() {
    this.map = new Map();
    this.version = 0;
  }
  async get(key, opts) {
    const e = this.map.get(key);
    if (!e) return null;
    return opts && opts.type === 'json' ? JSON.parse(e.value) : e.value;
  }
  async getWithMetadata(key, opts) {
    const e = this.map.get(key);
    if (!e) return null;
    return { data: opts && opts.type === 'json' ? JSON.parse(e.value) : e.value, etag: e.etag, metadata: {} };
  }
  async setJSON(key, value, opts) {
    const cur = this.map.get(key);
    if (opts && opts.onlyIfNew && cur) return { modified: false };
    if (opts && opts.onlyIfMatch && (!cur || cur.etag !== opts.onlyIfMatch)) return { modified: false };
    const etag = `"${++this.version}"`;
    this.map.set(key, { value: JSON.stringify(value), etag });
    return { modified: true, etag };
  }
  async delete(key) { this.map.delete(key); }
  async list() { return { blobs: [...this.map.keys()].map((key) => ({ key })) }; }
  dump() {
    const out = {};
    for (const [k, e] of this.map) out[k] = JSON.parse(e.value);
    return out;
  }
}

function createStores() {
  const stores = new Map();
  const factory = (name) => {
    if (!stores.has(name)) stores.set(name, new MemoryStore());
    return stores.get(name);
  };
  factory.reset = () => stores.clear();
  factory.dump = (name) => (stores.has(name) ? stores.get(name).dump() : {});
  return factory;
}

module.exports = { MemoryStore, createStores };

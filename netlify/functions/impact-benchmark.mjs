// Netlify v2 entry point. The logic lives in netlify/impact/benchmark.js.
import impl from '../impact/benchmark.js';
import lib from '../impact/lib.js';

export default lib.toV2(impl.handler);

export const config = { path: '/api/impact/benchmark' };

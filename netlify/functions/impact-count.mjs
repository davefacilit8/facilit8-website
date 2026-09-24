// Netlify v2 entry point. The logic lives in netlify/impact/count.js.
import impl from '../impact/count.js';
import lib from '../impact/lib.js';

export default lib.toV2(impl.handler);

export const config = { path: '/api/impact/count' };

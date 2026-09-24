// Netlify v2 entry point. The logic lives in netlify/impact/count.js.
import { getStore } from '@netlify/blobs';
import impl from '../impact/count.js';
import lib from '../impact/lib.js';

lib.setBlobsGetStore(getStore);

export default lib.toV2(impl.handler);

export const config = { path: '/api/impact/count' };

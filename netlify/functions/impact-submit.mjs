// Netlify v2 entry point. The logic lives in netlify/impact/submit.js.
import { getStore } from '@netlify/blobs';
import impl from '../impact/submit.js';
import lib from '../impact/lib.js';

lib.setBlobsGetStore(getStore);

export default lib.toV2(impl.handler);

export const config = { path: '/api/impact/submit' };

import { sendJson } from './_response';

const ALLOWED_SOURCES = new Set(['error-boundary', 'window-error', 'unhandled-rejection']);

export default function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return sendJson(res, { error: 'method_not_allowed' }, 405);
  }

  const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body ?? {});
  const event = {
    event: 'client_error',
    source: ALLOWED_SOURCES.has(body.source) ? body.source : 'unknown',
    name: typeof body.name === 'string' ? body.name.slice(0, 100) : 'UnknownError',
    message: typeof body.message === 'string' ? body.message.slice(0, 500) : '',
    path: typeof body.path === 'string' ? body.path.slice(0, 200) : '/',
    occurredAt: typeof body.occurredAt === 'string' ? body.occurredAt : new Date().toISOString(),
  };

  console.error(JSON.stringify(event));
  res.statusCode = 204;
  res.end();
}

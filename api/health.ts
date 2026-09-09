import { sendJson } from './_response';

export default function handler(_: any, res: any) {
  sendJson(res, { status: 'ok', service: 'kwin-city-portal-api', timestamp: new Date().toISOString() });
}

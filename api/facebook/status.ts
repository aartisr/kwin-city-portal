import { getFacebookPublishLogs, isSupabaseConfigured } from './_publisher';
import { sendJson } from '../_response';

export default async function handler(req: any, res: any) {
  try {
    const logs = await getFacebookPublishLogs();
    sendJson(res, {
      configured: !!(process.env.FACEBOOK_PAGE_ID && process.env.FACEBOOK_PAGE_ACCESS_TOKEN),
      pageId: process.env.FACEBOOK_PAGE_ID || "kwincity",
      logs
    });
  } catch (error: any) {
    sendJson(res, { error: error.message || "Failed to retrieve status" }, 500);
  }
}

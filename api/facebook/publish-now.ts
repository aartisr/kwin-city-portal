import { getFacebookPublishLogs, saveFacebookPublishLogs, publishToFacebook, generateTrendingPost } from '../../src/services/facebookPublisher';
import { sendJson } from '../_response';

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return sendJson(res, { error: 'Method Not Allowed' }, 405);
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    const { customMessage } = body || {};
    
    // Fallback topics for KWIN city
    const topics = ["Sustainable water infrastructure", "renewable monorail designs", "land valuation indices"];
    const postBody = customMessage || await generateTrendingPost(topics);
    const result = await publishToFacebook(postBody);

    const newLog = {
      date: new Date().toISOString().split("T")[0],
      success: result.success,
      message: result.success 
        ? `Manual Trigger Success: "${postBody.substring(0, 75)}..."` 
        : `Manual Trigger Failed: ${result.error}`,
      postId: result.postId,
      timestamp: new Date().toISOString(),
    };

    const currentLogs = await getFacebookPublishLogs();
    const updatedLogs = [newLog, ...currentLogs].slice(0, 30);
    await saveFacebookPublishLogs(updatedLogs);

    sendJson(res, {
      success: result.success,
      log: newLog
    });
  } catch (error: any) {
    console.error("Vercel Serverless Exception in publish-now:", error);
    sendJson(res, {
      success: false,
      error: error.message || "An unexpected serverless error occurred while publishing.",
      log: {
        date: new Date().toISOString().split("T")[0],
        success: false,
        message: `Serverless Error: ${error.message || "Unknown error"}`,
        timestamp: new Date().toISOString()
      }
    }, 500);
  }
}

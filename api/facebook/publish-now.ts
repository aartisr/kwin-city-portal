import { 
  getFacebookPublishLogs, 
  saveFacebookPublishLogs, 
  publishToFacebook,
  publishToInstagram,
  generateTrendingPost 
} from './_publisher';

function sendJson(res: any, payload: unknown, statusCode = 200) {
  res.statusCode = statusCode;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store, max-age=0');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.end(JSON.stringify(payload));
}

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return sendJson(res, { error: 'Method Not Allowed' }, 405);
  }

  try {
    let customMessage = "";
    let platform = "facebook";
    let imageUrl = "";

    if (req.body) {
      const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
      customMessage = body?.customMessage || "";
      platform = body?.platform || "facebook";
      imageUrl = body?.imageUrl || "";
    }
    
    // Generate trending post with 7-day cyclical calendar and anti-duplication if customMessage not provided
    const postBody = customMessage || await generateTrendingPost();

    let result: { success: boolean; postId?: string; error?: string };

    if (platform === 'instagram') {
      result = await publishToInstagram(postBody, imageUrl);
    } else {
      result = await publishToFacebook(postBody);
    }

    const platformLabel = platform === 'instagram' ? 'Instagram' : 'Facebook';
    const newLog = {
      date: new Date().toISOString().split("T")[0],
      success: result.success,
      message: result.success 
        ? `${platformLabel} Manual Trigger Success: "${postBody.substring(0, 75)}..."` 
        : `${platformLabel} Manual Trigger Failed: ${result.error}`,
      postId: result.postId,
      timestamp: new Date().toISOString(),
    };

    const currentLogs = await getFacebookPublishLogs();
    const updatedLogs = [newLog, ...currentLogs].slice(0, 30);
    await saveFacebookPublishLogs(updatedLogs);

    sendJson(res, {
      success: result.success,
      platform,
      postId: result.postId,
      error: result.error,
      log: newLog
    });
  } catch (error: any) {
    console.error("Vercel Serverless Exception in publish-now:", error);
    sendJson(res, {
      success: false,
      error: error.message || "An unexpected serverless error occurred.",
      log: {
        date: new Date().toISOString().split("T")[0],
        success: false,
        message: `Serverless Error: ${error.message || "Unknown error"}`,
        timestamp: new Date().toISOString()
      }
    }, 500);
  }
}

import { 
  getFacebookPublishLogs, 
  saveFacebookPublishLogs, 
  publishToFacebook, 
  generateTrendingPost 
} from './_publisher';

function sendJson(res: any, payload: unknown, statusCode = 200) {
  res.statusCode = statusCode;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'public, max-age=0, s-maxage=3600');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.end(JSON.stringify(payload));
}

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return sendJson(res, { error: 'Method Not Allowed' }, 405);
  }

  try {
    let customMessage = "";
    if (req.body) {
      const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
      customMessage = body?.customMessage || "";
    }
    
    // Generate trending post with 7-day cyclical calendar and anti-duplication
    const postBody = customMessage || await generateTrendingPost();
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

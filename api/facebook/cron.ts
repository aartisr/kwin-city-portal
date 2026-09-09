import { 
  getFacebookPublishLogs, 
  saveFacebookPublishLogs, 
  publishToFacebook, 
  generateTrendingPost,
  PublishLog 
} from './_publisher';

function sendJson(res: any, payload: unknown, statusCode = 200) {
  res.statusCode = statusCode;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store, max-age=0');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.end(JSON.stringify(payload));
}

export default async function handler(req: any, res: any) {
  try {
    const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
    const logs = await getFacebookPublishLogs();

    // Idempotency: Verify if a post has already succeeded for today
    const alreadyPostedToday = logs.some(log => log.date === today && log.success);
    if (alreadyPostedToday) {
      return sendJson(res, {
        message: `A Facebook update has already been published for today (${today}). Skipping to avoid duplication.`,
        date: today,
        skipped: true
      });
    }

    // Generate dynamic post using today's civic pillar rotation + anti-duplication engine
    const postBody = await generateTrendingPost();
    const result = await publishToFacebook(postBody);

    const newLog: PublishLog = {
      date: today,
      success: result.success,
      message: result.success 
        ? `Daily Automated Cron Success: "${postBody.substring(0, 75)}..."` 
        : `Daily Automated Cron Failed: ${result.error}`,
      postId: result.postId,
      timestamp: new Date().toISOString(),
    };

    const updatedLogs = [newLog, ...logs].slice(0, 30);
    await saveFacebookPublishLogs(updatedLogs);

    return sendJson(res, {
      message: result.success ? "Daily Facebook post published successfully" : "Failed to publish post",
      success: result.success,
      postId: result.postId,
      log: newLog
    });
  } catch (error: any) {
    console.error("Error in daily cron publisher:", error);
    return sendJson(res, {
      success: false,
      error: error.message || "An unexpected error occurred in the daily cron job."
    }, 500);
  }
}

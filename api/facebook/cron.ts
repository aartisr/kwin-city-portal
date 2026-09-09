import { 
  getFacebookPublishLogs, 
  saveFacebookPublishLogs, 
  publishToFacebook, 
  publishToInstagram,
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

    // Check if Facebook has already been posted today
    const fbAlreadyPosted = logs.some(log => log.date === today && log.success && !log.message.startsWith("Instagram"));
    // Check if Instagram has already been posted today
    const igAlreadyPosted = logs.some(log => log.date === today && log.success && log.message.startsWith("Instagram"));

    const postBody = await generateTrendingPost();
    const newLogs: PublishLog[] = [];

    // 1. Automated Facebook Publish
    let fbResult: { success: boolean; postId?: string; error?: string } | null = null;
    if (!fbAlreadyPosted) {
      fbResult = await publishToFacebook(postBody);
      newLogs.push({
        date: today,
        success: fbResult.success,
        message: fbResult.success 
          ? `Facebook Daily Cron: "${postBody.substring(0, 75)}..."` 
          : `Facebook Daily Cron Failed: ${fbResult.error}`,
        postId: fbResult.postId,
        timestamp: new Date().toISOString(),
      });
    }

    // 2. Automated Instagram Publish (if account configured)
    let igResult: { success: boolean; postId?: string; error?: string } | null = null;
    const hasInstagram = !!(process.env.INSTAGRAM_ACCOUNT_ID || process.env.FACEBOOK_PAGE_ACCESS_TOKEN);
    if (!igAlreadyPosted && hasInstagram) {
      // Instagram captions format with link in bio instruction
      const igCaption = `${postBody}\n\n🔗 Verified links, GIS maps & public records available at the link in our bio!`;
      igResult = await publishToInstagram(igCaption);
      if (igResult.success) {
        newLogs.push({
          date: today,
          success: true,
          message: `Instagram Daily Cron: "${postBody.substring(0, 75)}..."`,
          postId: igResult.postId,
          timestamp: new Date().toISOString(),
        });
      }
    }

    if (newLogs.length > 0) {
      const updatedLogs = [...newLogs, ...logs].slice(0, 30);
      await saveFacebookPublishLogs(updatedLogs);
    }

    return sendJson(res, {
      date: today,
      facebook: fbResult ? { published: fbResult.success, postId: fbResult.postId } : { skipped: fbAlreadyPosted },
      instagram: igResult ? { published: igResult.success, postId: igResult.postId } : { skipped: igAlreadyPosted },
      logsCreated: newLogs.length
    });
  } catch (error: any) {
    console.error("Error in daily cron publisher:", error);
    return sendJson(res, {
      success: false,
      error: error.message || "An unexpected error occurred in the daily cron job."
    }, 500);
  }
}

import { sendJson } from '../_response';

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return sendJson(res, { error: 'Method Not Allowed' }, 405);
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    const { postId, message } = body || {};

    if (!postId || !message) {
      return sendJson(res, { error: "postId and message are required." }, 400);
    }

    const pageAccessToken = process.env.FACEBOOK_PAGE_ACCESS_TOKEN;
    if (!pageAccessToken) {
      return sendJson(res, { error: "Facebook Page Access Token is not configured." }, 400);
    }

    const url = `https://graph.facebook.com/v18.0/${postId}/comments`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message,
        access_token: pageAccessToken,
      }),
    });

    const data = await response.json();
    if (!response.ok) {
      console.error("Facebook Comment API Error:", data);
      return sendJson(res, { error: data.error?.message || "Failed to post comment." }, response.status);
    }

    sendJson(res, { success: true, commentId: data.id });
  } catch (error: any) {
    console.error("Facebook Comment Exception:", error);
    sendJson(res, { error: error.message || "Failed to contact Meta Graph API." }, 500);
  }
}

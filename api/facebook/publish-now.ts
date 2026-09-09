import { createClient } from "@supabase/supabase-js";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

// 1. Response Helper
function sendJson(res: any, payload: unknown, statusCode = 200) {
  res.statusCode = statusCode;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'public, max-age=0, s-maxage=3600');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.end(JSON.stringify(payload));
}

// 2. Supabase Connection
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;
const isSupabaseConfigured = !!(supabaseUrl && supabaseAnonKey);
const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl!, supabaseAnonKey!)
  : null;

export interface PublishLog {
  date: string;
  success: boolean;
  message: string;
  postId?: string;
  timestamp: string;
}

let inMemoryFallbackLogs: PublishLog[] = [];

async function getFacebookPublishLogs(): Promise<PublishLog[]> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from("kwin_discourse_store")
        .select("value")
        .eq("key", "facebook_publish_logs")
        .single();
      
      if (error) {
        if (error.code === "PGRST116") return [];
        return inMemoryFallbackLogs;
      }
      return data?.value || [];
    } catch (e) {
      return inMemoryFallbackLogs;
    }
  }
  return inMemoryFallbackLogs;
}

async function saveFacebookPublishLogs(logs: PublishLog[]): Promise<void> {
  inMemoryFallbackLogs = logs;
  if (isSupabaseConfigured && supabase) {
    try {
      await supabase
        .from("kwin_discourse_store")
        .upsert(
          { key: "facebook_publish_logs", value: logs, updated_at: new Date().toISOString() },
          { onConflict: "key" }
        );
    } catch (e) {
      console.error("Failed to save Facebook publish logs in Supabase:", e);
    }
  }
}

// 3. Gemini Client lazy loader
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      throw new Error("GEMINI_API_KEY environment variable is required.");
    }
    aiClient = new GoogleGenAI({
      apiKey: key,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

// 4. Robust Retry Helper with Instant Quota Exit
async function retryWithBackoff<T>(
  action: () => Promise<T>,
  maxAttempts: number = 3,
  baseDelayMs: number = 1000
): Promise<T> {
  let attempt = 0;
  while (true) {
    try {
      return await action();
    } catch (error: any) {
      attempt++;
      const status = error.status || error.statusCode || 0;
      const message = (error.message || String(error)).toLowerCase();
      
      // If we see resource_exhausted, quota, or billing limits, EXIT instantly
      const isDailyQuotaExceeded = 
        status === 429 || 
        message.includes("quota") || 
        message.includes("resource_exhausted") || 
        message.includes("billing") ||
        message.includes("limit");

      if (attempt >= maxAttempts || isDailyQuotaExceeded) {
        throw error;
      }

      const delay = baseDelayMs * Math.pow(2, attempt) + Math.random() * 500;
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
}

// 5. Post Generator with Graceful Quota Fallback
async function generateTrendingPost(trendingTopics: string[]): Promise<string> {
  const topicsText = trendingTopics.length > 0 
    ? trendingTopics.join(", ") 
    : "Sustainable water infrastructure, renewable monorail designs, and land valuation indices";

  try {
    const prompt = `
      You are the official social media publisher for KWIN City.
      Compose an exceptionally appealing, high-engagement, and visually stunning update for the KWIN City Facebook Page.
      Focus on these active trending civic topics: ${topicsText}.
      
      Formatting & Structure Requirements:
      1. **Engaging Headline**: Start with a highly catchy, bold, emoji-rich headline.
      2. **Civic Innovation Details**: Detail KWIN City's cutting-edge scientific or planning milestones (5,800-acre masterplan, 1,500-acre academic superblock).
      3. **Highly Visual Bullet Points**: Use beautiful appropriate emojis for each bullet point.
      4. **Perfect Hashtag Pairing**: Conclude with: #KWINCity #SustainableUrbanism #TechFDI #BengaluruRealEstate #SmartCitiesIndia.
      5. **Optimal Length**: Limit to 180-200 words.
    `;

    const response = await retryWithBackoff(() => 
      getGeminiClient().models.generateContent({
        model: "gemini-flash-latest",
        contents: prompt,
      })
    );

    return response.text || "Daily update from KWIN City: Connecting citizens with verified planning, sustainable transit progress, and civic research dialogues.";
  } catch (error: any) {
    console.warn("[Vercel Publisher] Gemini quota exceeded or failed. Falling back to high-quality static post.", error.message);
    return `🚀 KWIN City Innovation Brief: Connecting North Bengaluru's Zero-Emission Future! 🌿

As part of the 5,800-acre Masterplan in Doddaballapur, our teams are advancing critical milestones for the academic superblock and renewable transit corridors.

📍 Core Focus Areas:
• 💧 Sustainable water loops & advanced green recycling networks.
• 🚄 Net-zero solar-powered monorail connecting primary research hubs.
• 📊 Real-time land valuation indices & KIADB-notified developmental plots.

Join the civic dialogue, read verified planning journals, or submit research notices directly on our interactive portal!

#KWINCity #SustainableUrbanism #TechFDI #BengaluruRealEstate #SmartCitiesIndia`;
  }
}

// 6. Facebook Graph API publisher
async function publishToFacebook(messageContent: string): Promise<{ success: boolean; postId?: string; error?: string }> {
  const activePageId = process.env.FACEBOOK_PAGE_ID || "kwincity";
  const activePageAccessToken = process.env.FACEBOOK_PAGE_ACCESS_TOKEN;
  const isConfigured = !!(activePageId && activePageAccessToken);

  if (!isConfigured) {
    return { 
      success: false, 
      error: "Facebook credentials are not fully configured. Set FACEBOOK_PAGE_ID and FACEBOOK_PAGE_ACCESS_TOKEN." 
    };
  }

  try {
    let targetPageId = activePageId;
    const isNumeric = /^\d+$/.test(activePageId);
    if (!isNumeric) {
      try {
        const meUrl = `https://graph.facebook.com/v18.0/me?fields=id,name&access_token=${activePageAccessToken}`;
        const meRes = await fetch(meUrl);
        if (meRes.ok) {
          const meData = await meRes.json();
          if (meData.id) {
            targetPageId = meData.id;
          }
        }
      } catch (meEx) {
        console.error("Exception while auto-resolving Page ID:", meEx);
      }
    }

    const url = `https://graph.facebook.com/v18.0/${targetPageId}/feed`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: messageContent,
        access_token: activePageAccessToken,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return { 
        success: false, 
        error: data.error?.message || "Failed to post to Facebook Page feed." 
      };
    }

    return { 
      success: true, 
      postId: data.id 
    };
  } catch (e: any) {
    return { 
      success: false, 
      error: e.message || "Network exception while contacting Facebook Graph API." 
    };
  }
}

// 7. Handler Route
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

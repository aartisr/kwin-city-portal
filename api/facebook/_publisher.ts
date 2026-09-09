import { createClient } from "@supabase/supabase-js";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

// 1. Supabase Initialization
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;
export const isSupabaseConfigured = !!(supabaseUrl && supabaseAnonKey);
export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl!, supabaseAnonKey!)
  : null;

// 2. Gemini Initialization
let aiClient: GoogleGenAI | null = null;
export function getGeminiClient(): GoogleGenAI {
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

// 3. Retry Helper with Jitter
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
      const status = error.status || error.statusCode;
      const message = error.message || String(error);
      const isDailyQuotaExceeded = 
        status === 429 && (
          message.includes("quota") || 
          message.includes("Quota exceeded") || 
          message.includes("RESOURCE_EXHAUSTED")
        );

      const isTransient = 
        !isDailyQuotaExceeded && (
          !status || 
          status === 503 || 
          status === 429 || 
          status === 502 || 
          status === 504
        );

      if (attempt >= maxAttempts || !isTransient) {
        throw error;
      }
      const delay = baseDelayMs * Math.pow(2, attempt) + Math.random() * 500;
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
}

// 4. Log Interface and Handling
export interface PublishLog {
  date: string;
  success: boolean;
  message: string;
  postId?: string;
  timestamp: string;
}

let inMemoryFallbackLogs: PublishLog[] = [];

export async function getFacebookPublishLogs(): Promise<PublishLog[]> {
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

export async function saveFacebookPublishLogs(logs: PublishLog[]): Promise<void> {
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

// 5. Post Generator with Gemini
export async function generateTrendingPost(trendingTopics: string[]): Promise<string> {
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

    return response.text || "Daily update from KWIN City: Connecting citizens with verified planning and civic research dialogues.";
  } catch (error) {
    console.error("Gemini failed to generate Facebook post content.", error);
    return `KWIN City Daily Brief: Active planning is underway for the Knowledge, Innovation, and Wellbeing districts. Explore verified data insights, sustainability benchmarks, and KIADB acquisition details on our community portal. #KWINCity #Karnataka`;
  }
}

// 6. Graph API Publisher
export async function publishToFacebook(messageContent: string): Promise<{ success: boolean; postId?: string; error?: string }> {
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

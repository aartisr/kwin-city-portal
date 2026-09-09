import { GoogleGenAI } from "@google/genai";
import { supabase, isSupabaseConfigured } from "./supabaseServer";
import dotenv from "dotenv";

dotenv.config();

// Initialize internal Gemini SDK for back-end background tasks
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export interface PublishLog {
  date: string; // YYYY-MM-DD
  success: boolean;
  message: string;
  postId?: string;
  timestamp: string;
}

// Credentials
const pageId = process.env.FACEBOOK_PAGE_ID || "kwincity"; // Handle or Page ID
const pageAccessToken = process.env.FACEBOOK_PAGE_ACCESS_TOKEN;

export const isFacebookConfigured = !!(pageId && pageAccessToken);

// Store logs in memory fallback if Supabase not connected
let inMemoryPublishLogs: PublishLog[] = [];

/**
 * Retrieves the posting logs history
 */
export async function getFacebookPublishLogs(): Promise<PublishLog[]> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from("kwin_discourse_store")
        .select("value")
        .eq("key", "facebook_publish_logs")
        .single();
      
      if (error) {
        if (error.code === "PGRST116") return []; // Key does not exist yet
        console.warn("Error fetching Facebook publish logs from Supabase:", error.message);
        return inMemoryPublishLogs;
      }
      return data?.value || [];
    } catch (e) {
      console.warn("Supabase connection issue. Utilizing local post logs.");
      return inMemoryPublishLogs;
    }
  }
  return inMemoryPublishLogs;
}

/**
 * Saves the posting logs history
 */
export async function saveFacebookPublishLogs(logs: PublishLog[]): Promise<void> {
  inMemoryPublishLogs = logs;
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

/**
 * Generates an informative, high-engagement update summarizing KWIN City discourse trends
 */
export async function generateTrendingPost(trendingTopics: string[]): Promise<string> {
  const topicsText = trendingTopics.length > 0 
    ? trendingTopics.join(", ") 
    : "Sustainable water infrastructure, renewable monorail designs, and land valuation indices";

  try {
    const prompt = `
      You are the official Social Intelligence Assistant for KWIN City (Knowledge, Wellbeing, and Innovation City).
      Compose an engaging, highly professional, and informative update for the KWIN City Facebook Page.
      Focus on these active trending civic topics: ${topicsText}.
      
      Requirements:
      1. Outline the scientific or planning highlights of KWIN City (e.g., 50% water resilience, solar farms, or district plans).
      2. Frame it in an evidence-first, inspiring, and neutral tone. Include 3 bulleted highlights.
      3. Do NOT use fake promotional hype words like "supercharge", "empower", or "revolutionary".
      4. Include official educational and feedback links (e.g., inviting citizens to contribute citations in the Discourse Lab).
      5. Add relevant civic hashtags like #KWINCity #SustainablePlanning #UrbanInnovation #KarnatakaDevelopment.
      6. Limit the entire post to 180 words for maximum legibility.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: prompt,
    });

    return response.text || "Daily update from KWIN City: Connecting citizens with verified planning, sustainable transit progress, and civic research dialogues.";
  } catch (error) {
    console.error("Gemini failed to generate Facebook post content. Falling back to static content.", error);
    return `KWIN City Daily Brief: Active planning is underway for the Knowledge, Innovation, and Wellbeing districts. Explore verified data insights, sustainability benchmarks, and KIADB acquisition details on our community portal. #KWINCity #Karnataka`;
  }
}

/**
 * Publishes a dynamic post to Facebook using Graph API
 */
export async function publishToFacebook(messageContent: string): Promise<{ success: boolean; postId?: string; error?: string }> {
  if (!isFacebookConfigured) {
    return { 
      success: false, 
      error: "Facebook credentials are not fully configured. Set FACEBOOK_PAGE_ID and FACEBOOK_PAGE_ACCESS_TOKEN in the workspace environment settings." 
    };
  }

  try {
    const url = `https://graph.facebook.com/v18.0/${pageId}/feed`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: messageContent,
        access_token: pageAccessToken,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Facebook API response error:", data);
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
    console.error("Facebook connection error:", e);
    return { 
      success: false, 
      error: e.message || "Network exception while contacting Facebook Graph API." 
    };
  }
}

/**
 * Daily auto-publisher worker trigger. Runs behind-the-scenes to check and perform a post once a day.
 */
export async function runDailyAutoPublishCheck(trendingTopics: string[] = []): Promise<PublishLog | null> {
  const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
  const logs = await getFacebookPublishLogs();

  // Check if we already have a successful post for today
  const alreadyPostedToday = logs.some(log => log.date === today && log.success);
  if (alreadyPostedToday) {
    console.log(`[Facebook Sync] Daily check completed. Post already exists for date ${today}. Skipping.`);
    return null;
  }

  console.log(`[Facebook Sync] Starting automated daily publish for ${today}...`);
  const postBody = await generateTrendingPost(trendingTopics);
  const result = await publishToFacebook(postBody);

  const newLog: PublishLog = {
    date: today,
    success: result.success,
    message: result.success 
      ? `Published successfully: "${postBody.substring(0, 50)}..."` 
      : `Failed: ${result.error}`,
    postId: result.postId,
    timestamp: new Date().toISOString(),
  };

  // Keep a maximum log history of 30 days to limit database density
  const updatedLogs = [newLog, ...logs].slice(0, 30);
  await saveFacebookPublishLogs(updatedLogs);

  return newLog;
}

/**
 * Initializes the background recurring timer loop
 */
export function startFacebookPublishingScheduler(getTrendingDataFn: () => string[]) {
  console.log("🟢 Facebook Publishing Scheduler initialized. Running daily background checks.");
  
  // Perform an initial check on boot to make sure we don't miss a day if the server restarted
  setTimeout(async () => {
    try {
      const activeTopics = getTrendingDataFn();
      await runDailyAutoPublishCheck(activeTopics);
    } catch (e) {
      console.error("Error during initial Facebook scheduler check:", e);
    }
  }, 5000);

  // Poll once per hour (3,600,000 ms) to check if we transitioned into a new calendar day
  setInterval(async () => {
    try {
      const activeTopics = getTrendingDataFn();
      await runDailyAutoPublishCheck(activeTopics);
    } catch (e) {
      console.error("Error in recurring Facebook scheduler check:", e);
    }
  }, 60 * 60 * 1000);
}

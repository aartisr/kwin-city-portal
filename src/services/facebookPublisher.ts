import { GoogleGenAI } from "@google/genai";
import { supabase, isSupabaseConfigured } from "./supabaseServer";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";

dotenv.config();

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

/**
 * Robust retry helper with exponential backoff and jitter for handling transient API spikes (e.g. 503, 429, or network exceptions)
 */
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
      
      // If we hit a hard daily quota limit (RESOURCE_EXHAUSTED), do not retry and waste time/logs
      const isDailyQuotaExceeded = 
        status === 429 && (
          message.includes("quota") || 
          message.includes("Quota exceeded") || 
          message.includes("RESOURCE_EXHAUSTED") ||
          message.includes("generativelanguage") ||
          message.includes("Daily")
        );

      // Classify whether the error is transient and should be retried
      const isTransient = 
        !isDailyQuotaExceeded && (
          !status || // Network drop or socket timeout
          status === 503 || // Service Unavailable / High demand
          status === 429 || // Too Many Requests / Rate limit (RPM)
          status === 502 || // Bad Gateway
          status === 504 || // Gateway Timeout
          message.includes("503") ||
          message.includes("429") ||
          message.includes("UNAVAILABLE") ||
          message.includes("high demand") ||
          message.includes("temp") ||
          message.includes("timeout")
        );

      if (attempt >= maxAttempts || !isTransient) {
        throw error;
      }

      // Calculate exponential delay with a randomized jitter component
      const delay = baseDelayMs * Math.pow(2, attempt) + Math.random() * 500;
      console.warn(`[Gemini Retry] Attempt ${attempt} failed with a transient error (${message}). Retrying in ${Math.round(delay)}ms...`);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
}

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

// Store logs in persistent JSON file on disk if Supabase not connected
const LOGS_FILE_PATH = path.join(process.cwd(), "facebook-publish-logs.json");

let inMemoryFallbackLogs: PublishLog[] = [];

function readLogsFromFile(): PublishLog[] {
  if (process.env.VERCEL === "1") {
    return inMemoryFallbackLogs;
  }
  try {
    if (fs.existsSync(LOGS_FILE_PATH)) {
      const content = fs.readFileSync(LOGS_FILE_PATH, "utf-8");
      return JSON.parse(content);
    }
  } catch (e) {
    console.warn("[Facebook Sync] Failed to read Facebook publish logs from disk:", e);
  }
  return inMemoryFallbackLogs;
}

function writeLogsToFile(logs: PublishLog[]) {
  inMemoryFallbackLogs = logs;
  if (process.env.VERCEL === "1") {
    return;
  }
  try {
    fs.writeFileSync(LOGS_FILE_PATH, JSON.stringify(logs, null, 2), "utf-8");
  } catch (e) {
    console.error("[Facebook Sync] Failed to write Facebook publish logs to disk:", e);
  }
}

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
        return readLogsFromFile();
      }
      return data?.value || [];
    } catch (e) {
      console.warn("Supabase connection issue. Utilizing local post logs.");
      return readLogsFromFile();
    }
  }
  return readLogsFromFile();
}

/**
 * Saves the posting logs history
 */
export async function saveFacebookPublishLogs(logs: PublishLog[]): Promise<void> {
  writeLogsToFile(logs);
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

// 7-Day Rotating Civic Themes for Guaranteed Variety & Non-Repetition
export const DAILY_CIVIC_THEMES: Record<number, { dayName: string; pillar: string; focusAngle: string; fallbackPost: string }> = {
  0: {
    dayName: "Sunday",
    pillar: "Civic Discourse & Citizen Voice",
    focusAngle: "Community research claims, top-voted citizen threads, and open planning submissions",
    fallbackPost: `🗣️ KWIN City Discourse Roundup: What Citizens & Planners Are Discussing! 🏛️\n\nTransparent urban development begins with open public debate. Over the past week in our Civic Discourse Lab, citizens, scholars, and local representatives have raised key discussions:\n\n📌 Active Community Dialogues:\n• 📑 Valuation Transparency: Debating KIADB commercial land-swap multipliers for Doddaballapur landholders.\n• 🩺 Rural Healthcare Access: Inquiring about subsidized care access at the upcoming Tata-IISc super-specialty hospital.\n• 🚌 Transit Choices: Comparing high-frequency Electric BRT loops against central monorail lines.\n\nHave a voice in North Bengaluru's future! Explore verified planning documents or submit your research claim on our live portal.\n\n#KWINCity #CivicDialogue #SmartCitiesIndia #ParticipatoryPlanning #KarnatakaUrbanism`
  },
  1: {
    dayName: "Monday",
    pillar: "Innovation & Deep-Tech Supercluster",
    focusAngle: "Semiconductor R&D, AI labs, aerospace & defense corridor, ₹40,000 Crore investment pipeline",
    fallbackPost: `🚀 Accelerating Deep-Tech: Inside KWIN City's 1,500-Acre Innovation District! ⚡\n\nAs Karnataka solidifies its position as Asia's premier technology engine, KWIN City is engineered to host next-generation industrial clusters between Dabaspet and Doddaballapur:\n\n🔬 Industrial Highlights:\n• 💡 Semiconductor & Advanced Electronics: Custom-zoned manufacturing layouts backed by uninterrupted green power.\n• 🤖 AI & Autonomous Mobility: Dedicated testing testbeds for robotics, drones, and future transport tech.\n• 💼 ₹40,000 Crore Capital Target: Aiming to generate over 80,000 high-value science and engineering jobs.\n\nTrack industrial allocation notices, gazette filings, and ecosystem maps on the KWIN City portal!\n\n#KWINCity #DeepTech #SemiconductorsIndia #MakeInIndia #BengaluruTech #FutureMobility`
  },
  2: {
    dayName: "Tuesday",
    pillar: "Wellbeing & Academic Medicine",
    focusAngle: "Tata-IISc Medical School, 800-bed super-specialty teaching hospital, clinical trials and MD-PhD pipelines",
    fallbackPost: `🩺 Revolutionizing Healthcare: The Tata-IISc Medical Super-Campus at KWIN City! 🏥\n\nBridging clinical medicine with cutting-edge engineering, the Wellbeing District at KWIN City is anchored by an unprecedented clinical and biomedical research powerhouse.\n\n🧬 Key Medical Milestones:\n• 🏥 800-Bed Advanced Teaching Hospital: Bringing world-class tertiary and trauma care to North Bengaluru.\n• 🔬 Tata-IISc Collaborative Labs: Fostering clinician-scientist programs (MD-PhD) and translational genomics.\n• 🧪 Biopharma Incubator Hub: Enabling expedited clinical trials and bio-manufacturing within a single campus.\n\nLearn more about healthcare masterplans and academic partner MOUs on our verified portal.\n\n#KWINCity #TataIISc #BiotechHub #HealthcareInnovation #MedTechIndia #WellbeingDistrict`
  },
  3: {
    dayName: "Wednesday",
    pillar: "Transit & Regional Expressways",
    focusAngle: "STRR connectivity, Doddaballapur-Hoskote expressway, 35-min Kempegowda Airport commute, eco-transit",
    fallbackPost: `🚄 Rapid Regional Transit: Connecting KWIN City to Bengaluru in Under 40 Minutes! 🛣️\n\nStrategic location is the lifeblood of sustainable urbanism. Situated along the Satellite Town Ring Road (STRR), KWIN City is built for seamless regional and global cargo mobility.\n\n🌐 Transit Infrastructure Features:\n• ✈️ 35-Min Airport Link: Direct expressway access to Kempegowda International Airport (BLR) via Doddaballapur-Hoskote STRR.\n• 🚝 Zero-Emission Transit Spine: Feasibility studies underway for internal renewable monorail and dedicated e-BRT bus corridors.\n• 🚛 Industrial Logistics Access: Direct linkage to the Bengaluru-Pune Greenfield Expressway for freight efficiency.\n\nReview transit GIS maps and commuting timelines directly in our interactive Masterplan viewer.\n\n#KWINCity #STRR #BengaluruInfrastructure #UrbanMobility #NorthBengaluru #AirportCorridor`
  },
  4: {
    dayName: "Thursday",
    pillar: "Sustainability & Ecological Architecture",
    focusAngle: "465-acre dedicated solar farm, 10 interconnected lakes, 50% water self-sufficiency, 40% green cover",
    fallbackPost: `🌿 Building India's First Net-Zero City: Solar Grids & Rejuvenated Lakes at KWIN City! ☀️\n\nTrue progress respects natural ecosystems. KWIN City's masterplan reserves 40% of its 5,800-acre territory for open green canopies, natural valleys, and renewable energy grids.\n\n🌱 Ecological Benchmarks:\n• ☀️ 465-Acre Dedicated Solar Farm: Clean, decentralised green power for industrial and academic superblocks.\n• 💧 10 Interconnected Lake Systems: Rejuvenating natural drainage channels to supply over 50% of urban water requirements.\n• 🔄 100% Water Recycling: Closed-loop STP infrastructure ensuring zero untreated discharge into regional watersheds.\n\nExplore environmental impact reports and watershed preservation blueprints on the KWIN portal.\n\n#KWINCity #NetZeroIndia #SustainableCities #RenewableEnergy #LakeConservation #EcoUrbanism`
  },
  5: {
    dayName: "Friday",
    pillar: "Knowledge & Global University Superblock",
    focusAngle: "Collaborations with 9 foreign universities, international branch campuses, 1,500-acre academic village",
    fallbackPost: `🎓 World-Class Higher Education: Global Universities Join the KWIN Knowledge Superblock! 📚\n\nPositioning Karnataka as a global academic capital, the 1,500-acre Knowledge District at KWIN City is designed to host leading international and Indian universities.\n\n🏛️ Academic Hub Features:\n• 🌐 Global University MOUs: Formal partnerships established with 9 renowned international higher education institutions.\n• 🔬 Shared R&D Infrastructure: Centralised supercomputing, nanofabrication, and interdisciplinary libraries.\n• 🏡 Integrated Academic Village: Student and faculty housing surrounded by sports parks and pedestrianized boulevards.\n\nCheck academic eligibility criteria, institutional zoning, and campus layouts on our portal!\n\n#KWINCity #HigherEducation #GlobalUniversities #StudyInIndia #KarnatakaEducation #ResearchSupercluster`
  },
  6: {
    dayName: "Saturday",
    pillar: "Landowner Equity & Regional Prosperity",
    focusAngle: "KIADB land-swap policy, commercial allotment rehabilitation, farmer welfare, local employment guarantees",
    fallbackPost: `🤝 Equitable Growth for Farmers: The KWIN City Land-Swap & Livelihood Framework! 🌾\n\nSustainable urbanization must create intergenerational wealth for original landholders. The Commerce & Industries Department and KIADB are implementing structured rehabilitation policies in Doddaballapur:\n\n💼 Inclusive Planning Principles:\n• 🏢 Commercial Land-Swap Model: Allocating developed commercial plots within KWIN City layouts back to landowners for recurring lease revenue.\n• 🧑‍🏫 Vocational Skill Centres: Upskilling rural youth with technical certifications for guaranteed employment in tech & biotech units.\n• 📜 Transparent Gazette Access: Public disclosure of acquisition compensation benchmarks and survey schedules.\n\nRead verified farmer representation letters and official rehabilitation gazettes on our community forum.\n\n#KWINCity #LandownerEquity #FarmerWelfare #KIADB #InclusiveDevelopment #KarnatakaNews`
  }
};

/**
 * Generates an informative, high-engagement update summarizing KWIN City discourse trends
 */
export async function generateTrendingPost(trendingTopics: string[] = []): Promise<string> {
  const dayOfWeek = new Date().getDay();
  const currentTheme = DAILY_CIVIC_THEMES[dayOfWeek] || DAILY_CIVIC_THEMES[1];

  // Retrieve past published messages to prevent duplicate topics and identical wording
  const previousLogs = await getFacebookPublishLogs();
  const recentPostSnippets = previousLogs
    .filter(l => l.success && l.message)
    .slice(0, 5)
    .map(l => l.message.replace(/^Published successfully:\s*"/, "").replace(/^Manual Trigger Success:\s*"/, "").slice(0, 100));

  const topicsText = trendingTopics.length > 0 
    ? trendingTopics.join(", ") 
    : currentTheme.focusAngle;

  try {
    const prompt = `
      You are the official social media publisher for KWIN City (Knowledge, Wellbeing, and Innovation City).
      Compose an exceptionally appealing, high-engagement, and visually stunning update for the KWIN City Facebook Page.
      
      TODAY'S CIVIC PILLAR: "${currentTheme.pillar}" (${currentTheme.dayName})
      FOCUS ANGLE: ${currentTheme.focusAngle}
      ACTIVE COMMUNITY TRENDS: ${topicsText}

      NEGATIVE CONSTRAINTS (ANTI-DUPLICATION MANDATE):
      Do NOT repeat the exact same headline, structure, or identical phrasing as these recently published updates:
      ${recentPostSnippets.length > 0 ? recentPostSnippets.map((s, i) => `${i + 1}. "${s}..."`).join('\n      ') : "No recent posts found."}
      
      Formatting & Structure Requirements:
      1. **Engaging Headline**: Start with a highly catchy, bold, emoji-rich headline focused on today's pillar (${currentTheme.pillar}).
      2. **Civic Innovation Details**: Clearly detail KWIN City's cutting-edge scientific or planning milestones (5,800-acre masterplan in Doddaballapur, STRR expressway, solar grids, Tata-IISc).
      3. **Highly Visual Bullet Points**: Use beautiful, appropriate emojis for each bullet point to make it highly scannable and readable.
      4. **Community Call to Action**: Invite readers to share their views, join the Discourse Lab, or review verified gazette documents on our interactive portal.
      5. **No Clichés**: Do not use generic promotional hype verbs like "supercharge" or "empower", instead use precise, inspiring, data-driven planning terms.
      6. **Perfect Hashtag Pairing**: Conclude with a clean block of high-traffic hashtags: #KWINCity #SustainableUrbanism #TechFDI #BengaluruRealEstate #SmartCitiesIndia #NorthBengaluru.
      7. **Optimal Length**: Limit to 170-195 words for maximum legibility and social feed friendliness.
    `;

    // Wrapped in an exponential backoff retry mechanism to mitigate high-demand 503/429 spikes
    const response = await retryWithBackoff(() => 
      getGeminiClient().models.generateContent({
        model: "gemini-flash-latest",
        contents: prompt,
      })
    );

    return response.text || currentTheme.fallbackPost;
  } catch (error) {
    console.warn(`[Facebook Sync] Using curated day-specific fallback for ${currentTheme.dayName} (${currentTheme.pillar}):`, error);
    return currentTheme.fallbackPost;
  }
}

/**
 * Publishes a dynamic post to Facebook using Graph API
 */
export async function publishToFacebook(messageContent: string): Promise<{ success: boolean; postId?: string; error?: string }> {
  const activePageId = process.env.FACEBOOK_PAGE_ID || "kwincity";
  const activePageAccessToken = process.env.FACEBOOK_PAGE_ACCESS_TOKEN;
  const isConfigured = !!(activePageId && activePageAccessToken);

  if (!isConfigured) {
    return { 
      success: false, 
      error: "Facebook credentials are not fully configured. Set FACEBOOK_PAGE_ID and FACEBOOK_PAGE_ACCESS_TOKEN in the workspace environment settings." 
    };
  }

  try {
    let targetPageId = activePageId;

    // Robust check: If pageId is a textual handle or non-numeric username, automatically resolve the numeric Page ID from the Page Access Token using /me
    const isNumeric = /^\d+$/.test(activePageId);
    if (!isNumeric) {
      console.log(`[Facebook Sync] Page ID '${activePageId}' is not numeric. Auto-resolving from Page Access Token...`);
      try {
        const meUrl = `https://graph.facebook.com/v18.0/me?fields=id,name&access_token=${activePageAccessToken}`;
        const meRes = await fetch(meUrl);
        if (meRes.ok) {
          const meData = await meRes.json();
          if (meData.id) {
            targetPageId = meData.id;
            console.log(`[Facebook Sync] Successfully auto-resolved Page ID for '${meData.name}' to: ${targetPageId}`);
          }
        } else {
          const meErr = await meRes.json();
          console.error("[Facebook Sync] Failed to auto-resolve Page ID from token:", meErr);
        }
      } catch (meEx) {
        console.error("[Facebook Sync] Exception while auto-resolving Page ID:", meEx);
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

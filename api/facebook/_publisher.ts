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

// 3. Retry Helper with Instant Quota Exit
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

// 5. 7-Day Rotating Civic Pillars & Curated Fallback Posts
export interface DayTheme {
  dayName: string;
  pillar: string;
  focusAngle: string;
  fallbackPost: string;
}

export const DAILY_CIVIC_THEMES: Record<number, DayTheme> = {
  // Sunday (0)
  0: {
    dayName: "Sunday",
    pillar: "Civic Discourse & Citizen Voice",
    focusAngle: "Community research claims, top-voted citizen threads, and open planning submissions",
    fallbackPost: `🗣️ KWIN City Discourse Roundup: What Citizens & Planners Are Discussing! 🏛️

Transparent urban development begins with open public debate. Over the past week in our Civic Discourse Lab, citizens, scholars, and local representatives have raised key discussions:

📌 Active Community Dialogues:
• 📑 Valuation Transparency: Debating KIADB commercial land-swap multipliers for Doddaballapur landholders.
• 🩺 Rural Healthcare Access: Inquiring about subsidized care access at the upcoming Tata-IISc super-specialty hospital.
• 🚌 Transit Choices: Comparing high-frequency Electric BRT loops against central monorail lines.

Have a voice in North Bengaluru's future! Explore verified planning documents or submit your research claim on our live portal.

#KWINCity #CivicDialogue #SmartCitiesIndia #ParticipatoryPlanning #KarnatakaUrbanism`
  },
  // Monday (1)
  1: {
    dayName: "Monday",
    pillar: "Innovation & Deep-Tech Supercluster",
    focusAngle: "Semiconductor R&D, AI labs, aerospace & defense corridor, ₹40,000 Crore investment pipeline",
    fallbackPost: `🚀 Accelerating Deep-Tech: Inside KWIN City's 1,500-Acre Innovation District! ⚡

As Karnataka solidifies its position as Asia's premier technology engine, KWIN City is engineered to host next-generation industrial clusters between Dabaspet and Doddaballapur:

🔬 Industrial Highlights:
• 💡 Semiconductor & Advanced Electronics: Custom-zoned manufacturing layouts backed by uninterrupted green power.
• 🤖 AI & Autonomous Mobility: Dedicated testing testbeds for robotics, drones, and future transport tech.
• 💼 ₹40,000 Crore Capital Target: Aiming to generate over 80,000 high-value science and engineering jobs.

Track industrial allocation notices, gazette filings, and ecosystem maps on the KWIN City portal!

#KWINCity #DeepTech #SemiconductorsIndia #MakeInIndia #BengaluruTech #FutureMobility`
  },
  // Tuesday (2)
  2: {
    dayName: "Tuesday",
    pillar: "Wellbeing & Academic Medicine",
    focusAngle: "Tata-IISc Medical School, 800-bed super-specialty teaching hospital, clinical trials and MD-PhD pipelines",
    fallbackPost: `🩺 Revolutionizing Healthcare: The Tata-IISc Medical Super-Campus at KWIN City! 🏥

Bridging clinical medicine with cutting-edge engineering, the Wellbeing District at KWIN City is anchored by an unprecedented clinical and biomedical research powerhouse.

🧬 Key Medical Milestones:
• 🏥 800-Bed Advanced Teaching Hospital: Bringing world-class tertiary and trauma care to North Bengaluru.
• 🔬 Tata-IISc Collaborative Labs: Fostering clinician-scientist programs (MD-PhD) and translational genomics.
• 🧪 Biopharma Incubator Hub: Enabling expedited clinical trials and bio-manufacturing within a single campus.

Learn more about healthcare masterplans and academic partner MOUs on our verified portal.

#KWINCity #TataIISc #BiotechHub #HealthcareInnovation #MedTechIndia #WellbeingDistrict`
  },
  // Wednesday (3)
  3: {
    dayName: "Wednesday",
    pillar: "Transit & Regional Expressways",
    focusAngle: "STRR connectivity, Doddaballapur-Hoskote expressway, 35-min Kempegowda Airport commute, eco-transit",
    fallbackPost: `🚄 Rapid Regional Transit: Connecting KWIN City to Bengaluru in Under 40 Minutes! 🛣️

Strategic location is the lifeblood of sustainable urbanism. Situated along the Satellite Town Ring Road (STRR), KWIN City is built for seamless regional and global cargo mobility.

🌐 Transit Infrastructure Features:
• ✈️ 35-Min Airport Link: Direct expressway access to Kempegowda International Airport (BLR) via Doddaballapur-Hoskote STRR.
• 🚝 Zero-Emission Transit Spine: Feasibility studies underway for internal renewable monorail and dedicated e-BRT bus corridors.
• 🚛 Industrial Logistics Access: Direct linkage to the Bengaluru-Pune Greenfield Expressway for freight efficiency.

Review transit GIS maps and commuting timelines directly in our interactive Masterplan viewer.

#KWINCity #STRR #BengaluruInfrastructure #UrbanMobility #NorthBengaluru #AirportCorridor`
  },
  // Thursday (4)
  4: {
    dayName: "Thursday",
    pillar: "Sustainability & Ecological Architecture",
    focusAngle: "465-acre dedicated solar farm, 10 interconnected lakes, 50% water self-sufficiency, 40% green cover",
    fallbackPost: `🌿 Building India's First Net-Zero City: Solar Grids & Rejuvenated Lakes at KWIN City! ☀️

True progress respects natural ecosystems. KWIN City's masterplan reserves 40% of its 5,800-acre territory for open green canopies, natural valleys, and renewable energy grids.

🌱 Ecological Benchmarks:
• ☀️ 465-Acre Dedicated Solar Farm: Clean, decentralised green power for industrial and academic superblocks.
• 💧 10 Interconnected Lake Systems: Rejuvenating natural drainage channels to supply over 50% of urban water requirements.
• 🔄 100% Water Recycling: Closed-loop STP infrastructure ensuring zero untreated discharge into regional watersheds.

Explore environmental impact reports and watershed preservation blueprints on the KWIN portal.

#KWINCity #NetZeroIndia #SustainableCities #RenewableEnergy #LakeConservation #EcoUrbanism`
  },
  // Friday (5)
  5: {
    dayName: "Friday",
    pillar: "Knowledge & Global University Superblock",
    focusAngle: "Collaborations with 9 foreign universities, international branch campuses, 1,500-acre academic village",
    fallbackPost: `🎓 World-Class Higher Education: Global Universities Join the KWIN Knowledge Superblock! 📚

Positioning Karnataka as a global academic capital, the 1,500-acre Knowledge District at KWIN City is designed to host leading international and Indian universities.

🏛️ Academic Hub Features:
• 🌐 Global University MOUs: Formal partnerships established with 9 renowned international higher education institutions.
• 🔬 Shared R&D Infrastructure: Centralised supercomputing, nanofabrication, and interdisciplinary libraries.
• 🏡 Integrated Academic Village: Student and faculty housing surrounded by sports parks and pedestrianized boulevards.

Check academic eligibility criteria, institutional zoning, and campus layouts on our portal!

#KWINCity #HigherEducation #GlobalUniversities #StudyInIndia #KarnatakaEducation #ResearchSupercluster`
  },
  // Saturday (6)
  6: {
    dayName: "Saturday",
    pillar: "Landowner Equity & Regional Prosperity",
    focusAngle: "KIADB land-swap policy, commercial allotment rehabilitation, farmer welfare, local employment guarantees",
    fallbackPost: `🤝 Equitable Growth for Farmers: The KWIN City Land-Swap & Livelihood Framework! 🌾

Sustainable urbanization must create intergenerational wealth for original landholders. The Commerce & Industries Department and KIADB are implementing structured rehabilitation policies in Doddaballapur:

💼 Inclusive Planning Principles:
• 🏢 Commercial Land-Swap Model: Allocating developed commercial plots within KWIN City layouts back to landowners for recurring lease revenue.
• 🧑‍🏫 Vocational Skill Centres: Upskilling rural youth with technical certifications for guaranteed employment in tech & biotech units.
• 📜 Transparent Gazette Access: Public disclosure of acquisition compensation benchmarks and survey schedules.

Read verified farmer representation letters and official rehabilitation gazettes on our community forum.

#KWINCity #LandownerEquity #FarmerWelfare #KIADB #InclusiveDevelopment #KarnatakaNews`
  }
};

// 6. Post Generator with Anti-Duplication Engine
export async function generateTrendingPost(trendingTopics: string[] = []): Promise<string> {
  const dayOfWeek = new Date().getDay(); // 0 = Sunday, 1 = Monday ... 6 = Saturday
  const currentTheme = DAILY_CIVIC_THEMES[dayOfWeek] || DAILY_CIVIC_THEMES[1];

  // Retrieve previous logs to prevent repetition
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
      You are the official social media publisher for KWIN City (Knowledge, Wellbeing, and Innovation City in Doddaballapur/Dabaspet, Karnataka).
      
      TODAY'S CIVIC PILLAR: "${currentTheme.pillar}" (${currentTheme.dayName})
      PRIMARY FOCUS ANGLE: ${currentTheme.focusAngle}
      ACTIVE COMMUNITY TRENDS: ${topicsText}

      NEGATIVE CONSTRAINTS (ANTI-DUPLICATION MANDATE):
      Do NOT repeat the same headline, structure, or identical phrasing as these recently published updates:
      ${recentPostSnippets.length > 0 ? recentPostSnippets.map((s, i) => `${i + 1}. "${s}..."`).join('\n      ') : "No recent posts found."}

      Formatting & Engagement Guidelines:
      1. **Dynamic Headline**: Start with a bold, eye-catching, emoji-led headline tailored specifically to today's pillar (${currentTheme.pillar}).
      2. **Verified Facts Only**: Include concrete KWIN City facts (e.g. 5,800-acre masterplan, STRR Doddaballapur-Hoskote expressway, 465-acre solar farm, Tata-IISc Medical School, 10 interconnected lakes).
      3. **Visual Bullet Points**: Include 3 clear, concise bullet points using relevant emojis (e.g. 🏥, 🚄, ⚡, 💧, 🎓).
      4. **Community Call-to-Action**: Encourage readers to verify planning maps, participate in the Discourse Lab, or submit research questions.
      5. **Hashtags**: End with: #KWINCity #SustainableUrbanism #TechFDI #BengaluruRealEstate #SmartCitiesIndia.
      6. **Word Count**: 160-190 words.
    `;

    const response = await retryWithBackoff(() => 
      getGeminiClient().models.generateContent({
        model: "gemini-flash-latest",
        contents: prompt,
      })
    );

    return response.text || currentTheme.fallbackPost;
  } catch (error: any) {
    console.warn(`[Vercel Publisher] Using curated day-specific fallback for ${currentTheme.dayName} (${currentTheme.pillar}):`, error.message);
    return currentTheme.fallbackPost;
  }
}

// 7. Graph API Publisher
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

/**
 * 8. Instagram Graph API Publisher (2-Step Media Container Creation + Publish)
 * Instagram Content Publishing API requires an Instagram Business or Creator account connected to your Facebook Page.
 * It uses the Meta Graph API container endpoint (/media) followed by publish (/media_publish).
 */
export async function publishToInstagram(
  caption: string, 
  imageUrl?: string
): Promise<{ success: boolean; postId?: string; error?: string }> {
  const activePageAccessToken = process.env.FACEBOOK_PAGE_ACCESS_TOKEN;
  let instagramAccountId = process.env.INSTAGRAM_ACCOUNT_ID;
  const activePageId = process.env.FACEBOOK_PAGE_ID || "kwincity";

  if (!activePageAccessToken) {
    return {
      success: false,
      error: "FACEBOOK_PAGE_ACCESS_TOKEN is required to publish to Instagram Graph API."
    };
  }

  try {
    let effectiveAccessToken = activePageAccessToken;

    // Strategy 1: Always check me/accounts to:
    // a) Derive the specific Page Access Token if a User Token was provided
    // b) Auto-discover the linked Instagram Business Account ID if not set
    try {
      const accountsUrl = `https://graph.facebook.com/v18.0/me/accounts?fields=id,name,access_token,instagram_business_account&access_token=${activePageAccessToken}`;
      const accountsRes = await fetch(accountsUrl);
      if (accountsRes.ok) {
        const accountsData = await accountsRes.json();
        const pages = accountsData?.data || [];
        const matchedPage = pages.find(
          (p: any) => p.id === activePageId || (p.name && p.name.toLowerCase().includes("kwin")) || p.instagram_business_account?.id
        ) || pages[0];

        if (matchedPage) {
          if (matchedPage.access_token) {
            effectiveAccessToken = matchedPage.access_token;
          }
          if (!instagramAccountId && matchedPage.instagram_business_account?.id) {
            instagramAccountId = matchedPage.instagram_business_account.id;
          }
        }
      }
    } catch (accountsErr) {
      console.error("Exception during me/accounts resolution:", accountsErr);
    }

    if (!instagramAccountId) {
      // Strategy 2: Direct page lookup
      const pageInfoUrl = `https://graph.facebook.com/v18.0/${activePageId}?fields=instagram_business_account&access_token=${effectiveAccessToken}`;
      const pageInfoRes = await fetch(pageInfoUrl);
      if (pageInfoRes.ok) {
        const pageInfo = await pageInfoRes.json();
        if (pageInfo?.instagram_business_account?.id) {
          instagramAccountId = pageInfo.instagram_business_account.id;
        }
      }
    }

    if (!instagramAccountId) {
      // Strategy 3: Check /me directly
      try {
        const meUrl = `https://graph.facebook.com/v18.0/me?fields=instagram_business_account&access_token=${effectiveAccessToken}`;
        const meRes = await fetch(meUrl);
        if (meRes.ok) {
          const meData = await meRes.json();
          if (meData?.instagram_business_account?.id) {
            instagramAccountId = meData.instagram_business_account.id;
          }
        }
      } catch (meErr) {
        console.error("Exception during /me Instagram discovery:", meErr);
      }
    }

    if (!instagramAccountId) {
      return {
        success: false,
        error: "No linked Instagram Business Account found. In Meta Business Suite, ensure your Instagram account is linked as a Professional account to your Facebook Page, or explicitly set INSTAGRAM_ACCOUNT_ID in environment variables."
      };
    }

    // Instagram Content Publishing requires a publicly accessible image URL.
    // Use the provided image, configured default image, or high-res KWIN masterplan asset.
    const targetImageUrl = imageUrl || 
      process.env.INSTAGRAM_DEFAULT_IMAGE_URL || 
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&h=1200&q=80";

    // Step A: Create the IG Media Container
    const containerUrl = `https://graph.facebook.com/v18.0/${instagramAccountId}/media`;
    const containerParams = new URLSearchParams();
    containerParams.append('image_url', targetImageUrl);
    containerParams.append('caption', caption);
    containerParams.append('access_token', effectiveAccessToken);

    const containerRes = await fetch(containerUrl, {
      method: "POST",
      body: containerParams,
    });

    const containerData = await containerRes.json();
    if (!containerRes.ok || !containerData?.id) {
      let errMsg = containerData?.error?.message || "Failed to create Instagram media container.";
      
      // Auto-diagnose missing permissions if Meta returns unsupported or permission error
      if (errMsg.includes("Unsupported post request") || errMsg.includes("permissions") || errMsg.includes("Object with ID")) {
        try {
          const permRes = await fetch(`https://graph.facebook.com/v18.0/me/permissions?access_token=${activePageAccessToken}`);
          if (permRes.ok) {
            const permData = await permRes.json();
            const granted = (permData.data || [])
              .filter((p: any) => p.status === "granted")
              .map((p: any) => p.permission);
            if (!granted.includes("instagram_content_publish")) {
              errMsg = `Token is missing 'instagram_content_publish' permission. Currently granted: [${granted.join(', ') || 'none'}]. Please add 'instagram_content_publish' in Meta Graph API Explorer.`;
            }
          }
        } catch (_) {}
      }

      return {
        success: false,
        error: errMsg
      };
    }

    const creationId = containerData.id;

    // Wait 2 seconds for Instagram CDN to ingest the container
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Step B: Publish the container
    const publishUrl = `https://graph.facebook.com/v18.0/${instagramAccountId}/media_publish`;
    const publishParams = new URLSearchParams();
    publishParams.append('creation_id', creationId);
    publishParams.append('access_token', effectiveAccessToken);

    const publishRes = await fetch(publishUrl, {
      method: "POST",
      body: publishParams,
    });

    const publishData = await publishRes.json();
    if (!publishRes.ok || !publishData?.id) {
      return {
        success: false,
        error: publishData?.error?.message || "Failed to publish Instagram media container."
      };
    }

    return {
      success: true,
      postId: publishData.id
    };
  } catch (err: any) {
    return {
      success: false,
      error: err.message || "Exception while communicating with Instagram Graph API."
    };
  }
}


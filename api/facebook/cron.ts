import { createClient } from "@supabase/supabase-js";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

function sendJson(res: any, payload: unknown, statusCode = 200) {
  res.statusCode = statusCode;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store, max-age=0');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.end(JSON.stringify(payload));
}

// 1. Supabase Initialization
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;
const isSupabaseConfigured = !!(supabaseUrl && supabaseAnonKey);
const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl!, supabaseAnonKey!)
  : null;

// 2. Gemini Initialization
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

// 5. 7-Day Rotating Civic Pillars & Curated Fallback Posts
export interface DayTheme {
  dayName: string;
  pillar: string;
  focusAngle: string;
  fallbackPost: string;
}

const DAILY_CIVIC_THEMES: Record<number, DayTheme> = {
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

async function generateTrendingPost(trendingTopics: string[] = []): Promise<string> {
  const dayOfWeek = new Date().getDay();
  const currentTheme = DAILY_CIVIC_THEMES[dayOfWeek] || DAILY_CIVIC_THEMES[1];

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
    console.warn(`[Publisher] Using curated day-specific fallback for ${currentTheme.dayName}:`, error.message);
    return currentTheme.fallbackPost;
  }
}

async function publishToFacebook(messageContent: string): Promise<{ success: boolean; postId?: string; error?: string }> {
  const activePageId = process.env.FACEBOOK_PAGE_ID || "kwincity";
  const activePageAccessToken = process.env.FACEBOOK_PAGE_ACCESS_TOKEN;

  if (!activePageAccessToken) {
    return { 
      success: false, 
      error: "Facebook credentials are not fully configured. Set FACEBOOK_PAGE_ACCESS_TOKEN." 
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
      headers: { "Content-Type": "application/json" },
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

async function publishToInstagram(
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

function formatForWhatsApp(rawText: string): string {
  const todayFormatted = new Date().toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });

  return `📢 *KWIN CITY OFFICIAL DAILY BULLETIN* 🚀\n_North Bengaluru Knowledge, Health, Innovation & Research Metropolis_\n📅 *${todayFormatted}*\n\n${rawText}\n\n━━━━━━━━━━━━━━━━━━━━\n📍 *KWIN City Masterplan Facts:*\n• *5,800 Acres* in Doddaballapur & Nelamangala\n• *45 Mins* to Kempegowda Intl Airport via STRR NH-648\n• *100% Stamp Duty Exemption* for Knowledge, AI & Bio FDI\n• *465-Acre Captive Solar Microgrid* for 24x7 Clean Power\n\n🔗 *Official Portal & Verified Gazettes:*\nhttps://kwin-city.com/\n\n_Forward this update to your investor, faculty & leadership network!_`;
}

async function publishToWhatsApp(
  message: string,
  mediaUrl?: string
): Promise<{ success: boolean; messageId?: string; error?: string }> {
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
  const accessToken = process.env.WHATSAPP_ACCESS_TOKEN || process.env.FACEBOOK_PAGE_ACCESS_TOKEN;
  const recipient = process.env.WHATSAPP_RECIPIENT_NUMBER || process.env.WHATSAPP_TO_NUMBER;

  if (!phoneNumberId || !accessToken) {
    return {
      success: false,
      error: "WhatsApp Cloud API credentials not configured."
    };
  }

  if (!recipient) {
    return {
      success: false,
      error: "No recipient phone number configured in WHATSAPP_RECIPIENT_NUMBER."
    };
  }

  try {
    const url = `https://graph.facebook.com/v18.0/${phoneNumberId}/messages`;
    const cleanRecipient = recipient.replace(/[^0-9]/g, "");

    const bodyPayload = mediaUrl ? {
      messaging_product: "whatsapp",
      recipient_type: "individual",
      to: cleanRecipient,
      type: "image",
      image: {
        link: mediaUrl,
        caption: message
      }
    } : {
      messaging_product: "whatsapp",
      recipient_type: "individual",
      to: cleanRecipient,
      type: "text",
      text: {
        preview_url: true,
        body: message
      }
    };

    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${accessToken}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(bodyPayload)
    });

    const data = await res.json();
    if (!res.ok || !data?.messages?.[0]?.id) {
      return {
        success: false,
        error: data?.error?.message || "WhatsApp Cloud API failed to deliver message."
      };
    }

    return {
      success: true,
      messageId: data.messages[0].id
    };
  } catch (err: any) {
    return {
      success: false,
      error: err.message || "Exception while contacting WhatsApp Cloud API."
    };
  }
}

async function publishToLinkedIn(
  message: string
): Promise<{ success: boolean; postId?: string; error?: string }> {
  const accessToken = process.env.LINKEDIN_ACCESS_TOKEN;
  const orgId = process.env.LINKEDIN_ORGANIZATION_ID || process.env.LINKEDIN_ORG_ID;
  const personUrn = process.env.LINKEDIN_PERSON_URN;

  if (!accessToken) {
    return { success: false, error: "LinkedIn access token not configured." };
  }

  const author = orgId ? `urn:li:organization:${orgId}` : (personUrn || "");
  if (!author) {
    return { success: false, error: "LinkedIn Author URN missing." };
  }

  try {
    const url = "https://api.linkedin.com/v2/ugcPosts";
    const payload = {
      author,
      lifecycleState: "PUBLISHED",
      specificContent: {
        "com.linkedin.ugc.ShareContent": {
          shareCommentary: { text: message },
          shareMediaCategory: "NONE"
        }
      },
      visibility: { "com.linkedin.ugc.MemberNetworkVisibility": "PUBLIC" }
    };

    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${accessToken}`,
        "Content-Type": "application/json",
        "X-Restli-Protocol-Version": "2.0.0"
      },
      body: JSON.stringify(payload)
    });

    const data = await res.json();
    if (!res.ok || !data?.id) {
      return { success: false, error: data?.message || "LinkedIn API failed." };
    }
    return { success: true, postId: data.id };
  } catch (err: any) {
    return { success: false, error: err.message || "Exception contacting LinkedIn API." };
  }
}

async function publishToTwitter(
  message: string
): Promise<{ success: boolean; postId?: string; error?: string }> {
  const bearerToken = process.env.TWITTER_BEARER_TOKEN || process.env.TWITTER_API_KEY;
  if (!bearerToken) {
    return { success: false, error: "X / Twitter token not configured." };
  }

  try {
    const tweetText = message.length > 275 ? message.substring(0, 270) + "..." : message;
    const url = "https://api.twitter.com/2/tweets";

    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${bearerToken}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ text: tweetText })
    });

    const data = await res.json();
    if (!res.ok || !data?.data?.id) {
      return { success: false, error: data?.detail || data?.title || "X API failed." };
    }
    return { success: true, postId: data.data.id };
  } catch (err: any) {
    return { success: false, error: err.message || "Exception contacting X API." };
  }
}

// Single Master Daily Social Media Cron Handler (Facebook, Instagram, WhatsApp, LinkedIn, X)
export default async function handler(req: any, res: any) {
  try {
    const today = new Date().toISOString().split("T")[0];
    const logs = await getFacebookPublishLogs();

    const fbAlreadyPosted = logs.some(log => log.date === today && log.success && !log.message.startsWith("Instagram") && !log.message.startsWith("WhatsApp") && !log.message.startsWith("LinkedIn") && !log.message.startsWith("X / Twitter"));
    const igAlreadyPosted = logs.some(log => log.date === today && log.success && log.message.startsWith("Instagram"));
    const waAlreadyPosted = logs.some(log => log.date === today && log.success && log.message.startsWith("WhatsApp"));
    const liAlreadyPosted = logs.some(log => log.date === today && log.success && log.message.startsWith("LinkedIn"));
    const xAlreadyPosted = logs.some(log => log.date === today && log.success && log.message.startsWith("X / Twitter"));

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

    // 2. Automated Instagram Publish
    let igResult: { success: boolean; postId?: string; error?: string } | null = null;
    const hasInstagram = !!(process.env.INSTAGRAM_ACCOUNT_ID || process.env.FACEBOOK_PAGE_ACCESS_TOKEN);
    if (!igAlreadyPosted && hasInstagram) {
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
      } else {
        newLogs.push({
          date: today,
          success: false,
          message: `Instagram Daily Cron Failed: ${igResult.error}`,
          timestamp: new Date().toISOString(),
        });
      }
    }

    // 3. Automated WhatsApp Daily Broadcast
    let waResult: { success: boolean; messageId?: string; error?: string } | null = null;
    const hasWhatsApp = !!(process.env.WHATSAPP_PHONE_NUMBER_ID && (process.env.WHATSAPP_ACCESS_TOKEN || process.env.FACEBOOK_PAGE_ACCESS_TOKEN));
    if (!waAlreadyPosted && hasWhatsApp) {
      const waMessage = formatForWhatsApp(postBody);
      waResult = await publishToWhatsApp(waMessage);
      if (waResult.success) {
        newLogs.push({
          date: today,
          success: true,
          message: `WhatsApp Daily Broadcast: "${postBody.substring(0, 75)}..."`,
          postId: waResult.messageId,
          timestamp: new Date().toISOString(),
        });
      } else {
        newLogs.push({
          date: today,
          success: false,
          message: `WhatsApp Daily Broadcast Failed: ${waResult.error}`,
          timestamp: new Date().toISOString(),
        });
      }
    }

    // 4. Automated LinkedIn Thought Leadership Broadcast (if configured)
    let liResult: { success: boolean; postId?: string; error?: string } | null = null;
    const hasLinkedIn = !!(process.env.LINKEDIN_ACCESS_TOKEN && (process.env.LINKEDIN_ORGANIZATION_ID || process.env.LINKEDIN_ORG_ID || process.env.LINKEDIN_PERSON_URN));
    if (!liAlreadyPosted && hasLinkedIn) {
      const liPost = `${postBody}\n\nRead the empirical statutory gazette and masterplan: https://kwin-city.com/\n#KWINCity #Karnataka #Innovation #SmartMetropolis #FDI`;
      liResult = await publishToLinkedIn(liPost);
      newLogs.push({
        date: today,
        success: liResult.success,
        message: liResult.success 
          ? `LinkedIn Daily Cron: "${postBody.substring(0, 75)}..."` 
          : `LinkedIn Daily Cron Failed: ${liResult.error}`,
        postId: liResult.postId,
        timestamp: new Date().toISOString(),
      });
    }

    // 5. Automated X / Twitter Broadcast (if configured)
    let xResult: { success: boolean; postId?: string; error?: string } | null = null;
    const hasTwitter = !!(process.env.TWITTER_BEARER_TOKEN || process.env.TWITTER_API_KEY);
    if (!xAlreadyPosted && hasTwitter) {
      const tweetText = `${postBody.substring(0, 210)}...\n\n🔗 https://kwin-city.com/ #KWINCity`;
      xResult = await publishToTwitter(tweetText);
      newLogs.push({
        date: today,
        success: xResult.success,
        message: xResult.success 
          ? `X / Twitter Daily Cron: "${postBody.substring(0, 75)}..."` 
          : `X / Twitter Daily Cron Failed: ${xResult.error}`,
        postId: xResult.postId,
        timestamp: new Date().toISOString(),
      });
    }

    if (newLogs.length > 0) {
      const updatedLogs = [...newLogs, ...logs].slice(0, 30);
      await saveFacebookPublishLogs(updatedLogs);
    }

    return sendJson(res, {
      job: "unified_daily_social_media_cron",
      date: today,
      facebook: fbResult ? { published: fbResult.success, postId: fbResult.postId } : { skipped: fbAlreadyPosted },
      instagram: igResult ? { published: igResult.success, postId: igResult.postId } : { skipped: igAlreadyPosted },
      whatsapp: waResult ? { published: waResult.success, messageId: waResult.messageId } : { skipped: waAlreadyPosted || !hasWhatsApp },
      linkedin: liResult ? { published: liResult.success, postId: liResult.postId } : { skipped: liAlreadyPosted || !hasLinkedIn },
      twitter: xResult ? { published: xResult.success, postId: xResult.postId } : { skipped: xAlreadyPosted || !hasTwitter },
      logsCreated: newLogs.length
    });
  } catch (error: any) {
    console.error("Error in daily unified social media cron publisher:", error);
    return sendJson(res, {
      success: false,
      error: error.message || "An unexpected error occurred in the daily cron job."
    }, 500);
  }
}

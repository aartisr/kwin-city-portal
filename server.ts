import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini SDK with telemetry header
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

// Grounding data for KWIN City to ensure high-quality, evidence-first answers
const KWIN_CITY_KNOWLEDGE = `
You are the KWIN Civic Guide, an AI assistant for the KWIN Civic Discourse Lab.
Your goal is to provide evidence-first, objective, and neutral insights about KWIN City based ONLY on verified details.
If asked about controversial or unverified topics, provide balanced perspective, noting what is confirmed and what is debated/pending, without taking sides.

Core Facts about KWIN City:
- Name: KWIN City stands for Knowledge, Wellbeing, and Innovation City (formerly KHIR - Knowledge, Health, Innovation, and Research).
- Location: Spans 5,800 acres in Karnataka, India, situated between Dabaspet and Doddaballapur, approximately 45 minutes from Bengaluru's Kempegowda International Airport.
- Promoters: Government of Karnataka, aiming to attract ₹40,000 crore in investments, create 80,000 to 100,000 jobs, and house up to 500,000 residents.
- Four Main Districts:
  1. Knowledge District: Focused on higher education, hosting national and international universities. Collaborations with 9 foreign universities and prominent Indian institutions like Tata IISc Medical School.
  2. Wellbeing (Health) District: Aiming to be an academic medical hub in Asia, attracting advanced super-specialty hospitals, research labs, and biotechnology units.
  3. Innovation District: Geared toward life sciences, future mobility, semiconductors, AI, aerospace, defense, and space technology startups/enterprises.
  4. Research District: Dedicated to academic and industrial research, R&D centers, and scientific development.
- Sustainability Features: Dedicated solar farm (465 acres) for clean energy, extensive rainwater harvesting targeting 50% of water demand, over 10 interconnected lakes, and 40% dedicated green/open spaces.
- Transit: Central monorail system, connected to STRR (Satellite Town Ring Road), and Bengaluru-Pune Greenfield Expressway.

Critical Execution Risks & Controversies:
- Land Acquisition: Extensive farmer and local landowner protests near Doddaballapur due to land acquisition and fear of losing agricultural livelihoods.
- Soil & Environmental impact: Questions regarding lake conservation and rainwater drainage paths with such massive concrete infrastructure.
- Transparency: Civic groups demanding full transparency regarding developer allocations, KIADB (Karnataka Industrial Areas Development Board) acquisition valuations, and public access benefits.

Discourse Protocol:
- If asked "is land acquisition completed?", clarify that KIADB final approvals for early phases are confirmed, but land acquisition for subsequent phases is active and remains a point of heavy local discussion and farmer opposition.
- If asked about the Tata IISc Medical School, confirm it is one of the verified institutional hubs.
- Keep responses factual, clear, bulleted if helpful, and always direct users to verified sources or local discourse channels.
`;

// API endpoint for Gemini chat
app.post("/api/chat", async (req, res) => {
  try {
    const { message, history } = req.body;
    if (!message) {
      return res.status(400).json({ error: "Message is required." });
    }

    // Format history for chat
    const formattedHistory = (history || []).map((h: { role: string; content: string }) => ({
      role: h.role === "assistant" ? "model" as const : "user" as const,
      parts: [{ text: h.content }]
    }));

    // Start chat with system instructions in config
    const chat = ai.chats.create({
      model: "gemini-flash-latest",
      config: {
        systemInstruction: KWIN_CITY_KNOWLEDGE,
        temperature: 0.7,
      },
      history: formattedHistory
    });

    const result = await chat.sendMessage({
      message: message
    });

    res.json({ text: result.text });
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    res.status(500).json({
      error: error.message || "An error occurred while communicating with the AI model."
    });
  }
});

// ==========================================
// SUPABASE CIVIC DISCOURSE STORAGE ENGINE
// ==========================================
import { supabase, isSupabaseConfigured } from "./src/services/supabaseServer";
import { initialThreads, initialClaims } from "./src/data/discourse-data";

// Fallback in-memory database to persist across transactions when Supabase is not configured
let inMemoryThreads = [...initialThreads];
let inMemoryClaims = [...initialClaims];

async function getStoredData(key: string, fallback: any) {
  if (!isSupabaseConfigured || !supabase) {
    return fallback;
  }
  try {
    const { data, error } = await supabase
      .from("kwin_discourse_store")
      .select("value")
      .eq("key", key)
      .single();

    if (error) {
      if (error.code === "PGRST116") {
        // Table exists but key not found: initialize it with the fallback value
        await saveStoredData(key, fallback);
        return fallback;
      }
      console.warn(`Supabase get warning for key "${key}" (falling back locally):`, error.message);
      return fallback;
    }
    return data?.value || fallback;
  } catch (e) {
    console.warn(`Supabase network error for key "${key}" (using local state):`, e);
    return fallback;
  }
}

async function saveStoredData(key: string, value: any) {
  if (!isSupabaseConfigured || !supabase) {
    return;
  }
  try {
    const { error } = await supabase
      .from("kwin_discourse_store")
      .upsert({ key, value, updated_at: new Date().toISOString() }, { onConflict: "key" });

    if (error) {
      console.error(`Supabase save error for key "${key}":`, error.message);
    }
  } catch (e) {
    console.error(`Supabase save connection exception for key "${key}":`, e);
  }
}

// REST Endpoints for synchronized Discourse Lab state
app.get("/api/discourse/threads", async (req, res) => {
  const data = await getStoredData("threads", inMemoryThreads);
  inMemoryThreads = data;
  res.json(data);
});

app.post("/api/discourse/threads", async (req, res) => {
  const newThreads = req.body;
  if (!Array.isArray(newThreads)) {
    return res.status(400).json({ error: "Invalid payload. Body must be an array of threads." });
  }
  inMemoryThreads = newThreads;
  await saveStoredData("threads", newThreads);
  res.json({ success: true, message: "Threads state synchronized successfully." });
});

app.get("/api/discourse/claims", async (req, res) => {
  const data = await getStoredData("claims", inMemoryClaims);
  inMemoryClaims = data;
  res.json(data);
});

app.post("/api/discourse/claims", async (req, res) => {
  const newClaims = req.body;
  if (!Array.isArray(newClaims)) {
    return res.status(400).json({ error: "Invalid payload. Body must be an array of claims." });
  }
  inMemoryClaims = newClaims;
  await saveStoredData("claims", newClaims);
  res.json({ success: true, message: "Claims state synchronized successfully." });
});

// ==========================================
// AUTOMATED FACEBOOK AUTO-PUBLISHING HUB
// ==========================================
import { 
  getFacebookPublishLogs, 
  runDailyAutoPublishCheck, 
  startFacebookPublishingScheduler, 
  isFacebookConfigured,
  generateTrendingPost,
  publishToFacebook,
  saveFacebookPublishLogs
} from "./src/services/facebookPublisher";

function getTrendingTopics(): string[] {
  try {
    const threadTitles = (inMemoryThreads || []).slice(0, 2).map(t => t.title);
    const claimTitles = (inMemoryClaims || []).slice(0, 2).map(c => c.statement);
    return [...threadTitles, ...claimTitles];
  } catch (e) {
    return [];
  }
}

// Endpoint to inspect Facebook integration status and logs
app.get("/api/facebook/status", async (req, res) => {
  const logs = await getFacebookPublishLogs();
  res.json({
    configured: isFacebookConfigured,
    pageId: process.env.FACEBOOK_PAGE_ID || "kwincity",
    logs
  });
});

// Endpoint to force publish a trending update immediately for verification/testing
app.post("/api/facebook/publish-now", async (req, res) => {
  const topics = getTrendingTopics();
  const postBody = await generateTrendingPost(topics);
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

  res.json({
    success: result.success,
    log: newLog
  });
});

// Start the server with Vite middleware in development or express.static in production

async function init() {
  // Start automated publishing scheduler checks in the background
  startFacebookPublishingScheduler(getTrendingTopics);

  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

init();

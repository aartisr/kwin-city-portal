import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

// 1. Inlined sendJson helper to avoid any relative import failures
function sendJson(res: any, payload: unknown, statusCode = 200) {
  res.statusCode = statusCode;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'public, max-age=0, s-maxage=3600');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.end(JSON.stringify(payload));
}

// 2. Local Supabase Initialization
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

// 3. Main Handler
export default async function handler(req: any, res: any) {
  try {
    const logs = await getFacebookPublishLogs();
    sendJson(res, {
      configured: !!(process.env.FACEBOOK_PAGE_ID && process.env.FACEBOOK_PAGE_ACCESS_TOKEN),
      pageId: process.env.FACEBOOK_PAGE_ID || "kwincity",
      logs
    });
  } catch (error: any) {
    sendJson(res, { error: error.message || "Failed to retrieve status" }, 500);
  }
}

import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

export const isSupabaseConfigured = !!(supabaseUrl && supabaseAnonKey);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl!, supabaseAnonKey!)
  : null;

if (isSupabaseConfigured) {
  console.log("🟢 Supabase client successfully initialized with provided credentials.");
} else {
  console.log("🟡 Supabase credentials not found. Discourse Lab is operating in high-performance local/in-memory fallback mode.");
}

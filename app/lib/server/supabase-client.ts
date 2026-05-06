import type { SupabaseClient as BaseSupabaseClient } from '@supabase/supabase-js';
import type { Database } from './models';

export type SupabaseClient = BaseSupabaseClient<Database>;

let supabaseClient: SupabaseClient | null = null;
let supabaseInitError: string | null = null;
let supabaseAdminClient: SupabaseClient | null = null;
let supabaseAdminInitError: string | null = null;

function loadCreateClient() {
  const runtimeRequire = eval('require') as NodeRequire;
  const moduleName = '@supabase/' + 'supabase-js';
  const { createClient } = runtimeRequire(moduleName) as {
    createClient: (
      url: string,
      key: string,
      options?: Record<string, unknown>
    ) => SupabaseClient;
  };
  return createClient;
}

export function initSupabase(): SupabaseClient | null {
  if (supabaseClient !== null) return supabaseClient;
  if (supabaseInitError !== null) return null;

  const url = process.env.KWIN_SUPABASE_URL;
  const anonKey = process.env.KWIN_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    supabaseInitError = 'Supabase not configured. Using file-based storage.';
    return null;
  }

  try {
    // Runtime-only load so missing dependency doesn't break startup/build.
    const createClient = loadCreateClient();
    supabaseClient = createClient(url, anonKey, {
      auth: { persistSession: false },
    });
    return supabaseClient;
  } catch (error) {
    supabaseInitError = `Supabase initialization failed: ${error}. Using file-based storage.`;
    return null;
  }
}

export function getSupabase(): SupabaseClient | null {
  return initSupabase();
}

export function initSupabaseAdmin(): SupabaseClient | null {
  if (supabaseAdminClient !== null) return supabaseAdminClient;
  if (supabaseAdminInitError !== null) return null;

  const url = process.env.KWIN_SUPABASE_URL;
  const serviceRoleKey = process.env.KWIN_SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRoleKey) {
    supabaseAdminInitError = 'Supabase service role is not configured.';
    return null;
  }

  try {
    const createClient = loadCreateClient();
    supabaseAdminClient = createClient(url, serviceRoleKey, {
      auth: { persistSession: false },
    });
    return supabaseAdminClient;
  } catch (error) {
    supabaseAdminInitError = `Supabase admin initialization failed: ${error}.`;
    return null;
  }
}

export function getSupabaseAdmin(): SupabaseClient | null {
  return initSupabaseAdmin();
}

export function isSupabaseConfigured(): boolean {
  return (
    !!process.env.KWIN_SUPABASE_URL &&
    !!process.env.KWIN_SUPABASE_ANON_KEY
  );
}

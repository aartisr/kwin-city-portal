export type SupabaseClient = any;

let supabaseClient: SupabaseClient | null = null;
let supabaseInitError: string | null = null;

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
    const runtimeRequire = eval('require') as NodeRequire;
    const moduleName = '@supabase/' + 'supabase-js';
    const { createClient } = runtimeRequire(moduleName) as {
      createClient: (url: string, key: string, options?: Record<string, unknown>) => SupabaseClient;
    };

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

export function isSupabaseConfigured(): boolean {
  return (
    !!process.env.KWIN_SUPABASE_URL &&
    !!process.env.KWIN_SUPABASE_ANON_KEY
  );
}

import { getSupabase, getSupabaseAdmin, isSupabaseConfigured } from '@/lib/server/supabase-client';
import { readJsonFile, writeJsonFile } from '@/lib/server/store';
import { SEO_AGENCY_MAX_STORED_RUNS, SEO_AGENCY_STORE_FILE } from './config';
import type { KwinSeoAgencyRun } from './types';

type StoredRuns = KwinSeoAgencyRun[];

type SaveResult = {
  backend: 'supabase' | 'file';
  warning?: string;
};

function isKwinSeoAgencyRun(value: unknown): value is KwinSeoAgencyRun {
  if (!value || typeof value !== 'object') return false;
  const candidate = value as Partial<KwinSeoAgencyRun>;
  return Boolean(candidate.id && candidate.runDate && candidate.dailyBrief && candidate.dailyArticle && candidate.socialQueue);
}

async function readStoredRunsFromSupabase(): Promise<StoredRuns | null> {
  const supabase = getSupabaseAdmin() ?? getSupabase();

  if (!supabase) return null;

  const { data, error } = await supabase
    .from('seo_agency_runs')
    .select('payload')
    .order('generated_at', { ascending: false })
    .limit(SEO_AGENCY_MAX_STORED_RUNS);

  if (error || !data) return null;

  return data.map((row) => row.payload).filter(isKwinSeoAgencyRun);
}

async function readStoredRuns(): Promise<StoredRuns> {
  const supabaseRuns = await readStoredRunsFromSupabase();
  if (supabaseRuns && supabaseRuns.length > 0) {
    return supabaseRuns;
  }

  const existing = await readJsonFile<StoredRuns>(SEO_AGENCY_STORE_FILE, []);
  return existing.filter(isKwinSeoAgencyRun);
}

async function saveRunToFile(run: KwinSeoAgencyRun, warning?: string): Promise<SaveResult> {
  const existing = await readJsonFile<StoredRuns>(SEO_AGENCY_STORE_FILE, []);
  const next = [run, ...existing.filter((item) => item.id !== run.id)].slice(0, SEO_AGENCY_MAX_STORED_RUNS);
  await writeJsonFile(SEO_AGENCY_STORE_FILE, next);
  return { backend: 'file', warning };
}

export async function saveSeoAgencyRun(run: KwinSeoAgencyRun): Promise<SaveResult> {
  const supabase = getSupabaseAdmin();

  if (supabase) {
    const { error } = await supabase.from('seo_agency_runs').upsert(
      {
        id: run.id,
        run_date: run.runDate,
        generated_at: run.generatedAt,
        payload: run,
      },
      { onConflict: 'id' },
    );

    if (!error) {
      return { backend: 'supabase' };
    }

    return saveRunToFile(run, `Supabase save failed: ${error.message}`);
  }

  const warning = isSupabaseConfigured()
    ? 'KWIN_SUPABASE_SERVICE_ROLE_KEY is not configured; stored in local file fallback.'
    : 'Supabase is not configured; stored in local file fallback.';
  return saveRunToFile(run, warning);
}

export async function getLatestSeoAgencyRun(): Promise<KwinSeoAgencyRun | null> {
  const runs = await readStoredRuns();
  return runs[0] ?? null;
}

export async function getSeoAgencyRunByArticleSlug(slug: string): Promise<KwinSeoAgencyRun | null> {
  const runs = await readStoredRuns();
  return runs.find((run) => run.dailyArticle.slug === slug || run.dailyBrief.slug === slug) ?? null;
}

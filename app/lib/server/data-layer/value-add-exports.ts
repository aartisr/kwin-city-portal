import crypto from 'crypto';
import { readJsonFile, writeJsonFile } from '../store';
import { getSupabase } from '../supabase-client';
import type { ExportJob, ExportJobRequest } from '@/types/value-add';

type ExportJobRecord = ExportJob & {
  filters?: Record<string, string | number | boolean>;
};

const STORE_FILE = 'value-add-export-jobs.json';
const TTL_MS = 1000 * 60 * 60;

export async function createExportJob(request: ExportJobRequest): Promise<ExportJob> {
  const now = Date.now();
  const id = crypto.randomUUID();
  const createdAt = new Date(now).toISOString();
  const expiresAt = new Date(now + TTL_MS).toISOString();

  const job: ExportJob = {
    id,
    status: 'queued',
    exportType: request.exportType,
    createdAt,
    expiresAt,
  };

  const supabase = getSupabase();
  if (supabase) {
    try {
      const client = supabase as any;
      const payload = {
        id,
        export_type: request.exportType,
        filters: request.filters ?? {},
        status: 'queued',
        created_at: createdAt,
        expires_at: expiresAt,
      };

      const { error } = await client.from('value_add_export_jobs').insert([payload]);
      if (!error) {
        return job;
      }

      console.error('Supabase createExportJob error:', error);
    } catch (error) {
      console.error('Supabase createExportJob exception:', error);
    }
  }

  const jobs = await readJsonFile<ExportJobRecord[]>(STORE_FILE, []);
  jobs.push({
    ...job,
    filters: request.filters,
  });
  await writeJsonFile(STORE_FILE, jobs);

  return job;
}

export async function findExportJob(jobId: string): Promise<ExportJob | null> {
  const supabase = getSupabase();
  if (supabase) {
    try {
      const client = supabase as any;
      const { data, error } = await client
        .from('value_add_export_jobs')
        .select('*')
        .eq('id', jobId)
        .single();

      if (error) {
        if (error.code !== 'PGRST116') {
          console.error('Supabase findExportJob error:', error);
        }
      } else if (data) {
        if (data.expires_at && Date.parse(data.expires_at) < Date.now()) {
          return null;
        }

        return {
          id: data.id,
          status: data.status,
          exportType: data.export_type,
          createdAt: data.created_at,
          expiresAt: data.expires_at ?? undefined,
          fileUrl: data.file_url ?? undefined,
        };
      }
    } catch (error) {
      console.error('Supabase findExportJob exception:', error);
    }
  }

  const jobs = await readJsonFile<ExportJobRecord[]>(STORE_FILE, []);
  const index = jobs.findIndex((job) => job.id === jobId);
  if (index === -1) {
    return null;
  }

  const job = jobs[index];
  if (job.expiresAt && Date.parse(job.expiresAt) < Date.now()) {
    jobs.splice(index, 1);
    await writeJsonFile(STORE_FILE, jobs);
    return null;
  }

  return {
    id: job.id,
    status: job.status,
    exportType: job.exportType,
    createdAt: job.createdAt,
    expiresAt: job.expiresAt,
    fileUrl: job.fileUrl,
  };
}

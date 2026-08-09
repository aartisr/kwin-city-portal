import { createExportJob, findExportJob } from '@/lib/server/data-layer';
import type { ExportJob, ExportJobRequest } from '@/types/value-add';

export async function queueExportJob(request: ExportJobRequest): Promise<ExportJob> {
  return createExportJob(request);
}

export async function getExportJob(jobId: string): Promise<ExportJob | null> {
  return findExportJob(jobId);
}

export function isExportType(value: string): value is ExportJobRequest['exportType'] {
  return value === 'csv' || value === 'geojson' || value === 'json';
}
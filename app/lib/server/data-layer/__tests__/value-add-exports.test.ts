import crypto from 'crypto';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { createExportJob, findExportJob } from '@/lib/server/data-layer/value-add-exports';

const {
  mockGetSupabase,
  mockReadJsonFile,
  mockWriteJsonFile,
} = vi.hoisted(() => ({
  mockGetSupabase: vi.fn(),
  mockReadJsonFile: vi.fn(),
  mockWriteJsonFile: vi.fn(),
}));

vi.mock('@/lib/server/supabase-client', () => ({
  getSupabase: mockGetSupabase,
}));

vi.mock('@/lib/server/store', () => ({
  readJsonFile: mockReadJsonFile,
  writeJsonFile: mockWriteJsonFile,
}));

describe('server/data-layer value-add-exports', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-01-01T00:00:00.000Z'));
    vi.spyOn(console, 'error').mockImplementation(() => {});
    vi.spyOn(crypto, 'randomUUID').mockReturnValue('job-1');
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it('creates export jobs in Supabase when insert succeeds', async () => {
    const insert = vi.fn().mockResolvedValue({ error: null });
    const from = vi.fn().mockReturnValue({ insert });
    mockGetSupabase.mockReturnValue({ from });

    const job = await createExportJob({
      exportType: 'csv',
      filters: { persona: 'investor' },
    });

    expect(job).toEqual({
      id: 'job-1',
      status: 'queued',
      exportType: 'csv',
      createdAt: '2026-01-01T00:00:00.000Z',
      expiresAt: '2026-01-01T01:00:00.000Z',
    });
    expect(mockWriteJsonFile).not.toHaveBeenCalled();
  });

  it('falls back to file storage when Supabase insert returns an error', async () => {
    const insert = vi.fn().mockResolvedValue({ error: { code: 'insert-failed' } });
    const from = vi.fn().mockReturnValue({ insert });
    mockGetSupabase.mockReturnValue({ from });
    mockReadJsonFile.mockResolvedValue([]);

    const job = await createExportJob({ exportType: 'json' });

    expect(job.id).toBe('job-1');
    expect(mockWriteJsonFile).toHaveBeenCalledWith(
      'value-add-export-jobs.json',
      [expect.objectContaining({ id: 'job-1', exportType: 'json' })],
    );
  });

  it('falls back to file storage when Supabase insert throws', async () => {
    const insert = vi.fn().mockRejectedValue(new Error('insert exploded'));
    const from = vi.fn().mockReturnValue({ insert });
    mockGetSupabase.mockReturnValue({ from });
    mockReadJsonFile.mockResolvedValue([]);

    const job = await createExportJob({ exportType: 'geojson' });

    expect(job.exportType).toBe('geojson');
    expect(mockWriteJsonFile).toHaveBeenCalled();
  });

  it('maps a live Supabase export row into app shape', async () => {
    const single = vi.fn().mockResolvedValue({
      data: {
        id: 'job-live',
        status: 'ready',
        export_type: 'csv',
        created_at: '2026-01-01T00:00:00.000Z',
        expires_at: '2026-01-01T02:00:00.000Z',
        file_url: 'https://cdn.example.com/job-live.csv',
      },
      error: null,
    });
    const eq = vi.fn().mockReturnValue({ single });
    const select = vi.fn().mockReturnValue({ eq });
    const from = vi.fn().mockReturnValue({ select });
    mockGetSupabase.mockReturnValue({ from });

    const job = await findExportJob('job-live');

    expect(job).toEqual({
      id: 'job-live',
      status: 'ready',
      exportType: 'csv',
      createdAt: '2026-01-01T00:00:00.000Z',
      expiresAt: '2026-01-01T02:00:00.000Z',
      fileUrl: 'https://cdn.example.com/job-live.csv',
    });
  });

  it('returns null for expired Supabase export rows', async () => {
    const single = vi.fn().mockResolvedValue({
      data: {
        id: 'job-expired',
        status: 'ready',
        export_type: 'json',
        created_at: '2025-12-31T20:00:00.000Z',
        expires_at: '2025-12-31T21:00:00.000Z',
        file_url: null,
      },
      error: null,
    });
    const eq = vi.fn().mockReturnValue({ single });
    const select = vi.fn().mockReturnValue({ eq });
    const from = vi.fn().mockReturnValue({ select });
    mockGetSupabase.mockReturnValue({ from });

    const job = await findExportJob('job-expired');

    expect(job).toBeNull();
  });

  it('drops expired fallback jobs and persists cleanup', async () => {
    mockGetSupabase.mockReturnValue(null);
    mockReadJsonFile.mockResolvedValue([
      {
        id: 'job-2',
        status: 'queued',
        exportType: 'csv',
        createdAt: '2025-12-31T00:00:00.000Z',
        expiresAt: '2025-12-31T01:00:00.000Z',
      },
    ]);

    const job = await findExportJob('job-2');

    expect(job).toBeNull();
    expect(mockWriteJsonFile).toHaveBeenCalledWith('value-add-export-jobs.json', []);
  });

  it('returns active fallback jobs and null for missing jobs', async () => {
    mockGetSupabase.mockReturnValue(null);
    mockReadJsonFile.mockResolvedValue([
      {
        id: 'job-3',
        status: 'ready',
        exportType: 'json',
        createdAt: '2026-01-01T00:00:00.000Z',
        expiresAt: '2026-01-01T03:00:00.000Z',
        fileUrl: 'https://cdn.example.com/job-3.json',
      },
    ]);

    await expect(findExportJob('missing')).resolves.toBeNull();
    await expect(findExportJob('job-3')).resolves.toEqual({
      id: 'job-3',
      status: 'ready',
      exportType: 'json',
      createdAt: '2026-01-01T00:00:00.000Z',
      expiresAt: '2026-01-01T03:00:00.000Z',
      fileUrl: 'https://cdn.example.com/job-3.json',
    });
  });

  it('falls back to local lookup when Supabase read returns non-notfound error', async () => {
    const single = vi.fn().mockResolvedValue({ data: null, error: { code: 'permission-denied' } });
    const eq = vi.fn().mockReturnValue({ single });
    const select = vi.fn().mockReturnValue({ eq });
    const from = vi.fn().mockReturnValue({ select });
    mockGetSupabase.mockReturnValue({ from });
    mockReadJsonFile.mockResolvedValue([
      {
        id: 'job-fallback',
        status: 'queued',
        exportType: 'csv',
        createdAt: '2026-01-01T00:00:00.000Z',
        expiresAt: '2026-01-01T03:00:00.000Z',
      },
    ]);

    const job = await findExportJob('job-fallback');

    expect(job?.id).toBe('job-fallback');
  });

  it('falls back to local lookup when Supabase read throws', async () => {
    const single = vi.fn().mockRejectedValue(new Error('select exploded'));
    const eq = vi.fn().mockReturnValue({ single });
    const select = vi.fn().mockReturnValue({ eq });
    const from = vi.fn().mockReturnValue({ select });
    mockGetSupabase.mockReturnValue({ from });
    mockReadJsonFile.mockResolvedValue([
      {
        id: 'job-throw-fallback',
        status: 'ready',
        exportType: 'json',
        createdAt: '2026-01-01T00:00:00.000Z',
        expiresAt: '2026-01-01T03:00:00.000Z',
      },
    ]);

    const job = await findExportJob('job-throw-fallback');

    expect(job?.id).toBe('job-throw-fallback');
  });
});

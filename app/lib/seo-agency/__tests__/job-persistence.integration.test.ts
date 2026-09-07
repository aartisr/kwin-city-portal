// @vitest-environment node

import { beforeEach, describe, expect, it, vi } from 'vitest';

const { mockFetchKwinNewsSignals, mockPublishSeoAgencyRun, mockGetPublishingReadiness, mockGetSupabaseAdmin, mockReadJsonFile, mockWriteJsonFile } = vi.hoisted(() => ({
  mockFetchKwinNewsSignals: vi.fn(),
  mockPublishSeoAgencyRun: vi.fn(),
  mockGetPublishingReadiness: vi.fn(),
  mockGetSupabaseAdmin: vi.fn(),
  mockReadJsonFile: vi.fn(),
  mockWriteJsonFile: vi.fn(),
}));

vi.mock('../news', () => ({ fetchKwinNewsSignals: mockFetchKwinNewsSignals }));
vi.mock('../publisher', () => ({
  publishSeoAgencyRun: mockPublishSeoAgencyRun,
  getPublishingReadiness: mockGetPublishingReadiness,
}));
vi.mock('@/lib/server/supabase-client', () => ({
  getSupabaseAdmin: mockGetSupabaseAdmin,
  getSupabase: vi.fn(),
  isSupabaseConfigured: vi.fn(() => true),
}));
vi.mock('@/lib/server/store', () => ({
  readJsonFile: mockReadJsonFile,
  writeJsonFile: mockWriteJsonFile,
}));

import { runKwinSeoAgencyJob } from '../job';

describe('KWIN SEO agency cron persistence integration', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockFetchKwinNewsSignals.mockResolvedValue([]);
    mockPublishSeoAgencyRun.mockResolvedValue({ attempts: [], socialQueue: [] });
    mockGetPublishingReadiness.mockReturnValue([]);
  });

  it('creates a daily run and upserts its complete payload to seo_agency_runs', async () => {
    const upsert = vi.fn().mockResolvedValue({ error: null });
    const from = vi.fn().mockReturnValue({ upsert });
    mockGetSupabaseAdmin.mockReturnValue({ from });

    const result = await runKwinSeoAgencyJob(new Date('2026-08-15T03:11:00.000Z'));

    expect(result.storageBackend).toBe('supabase');
    expect(from).toHaveBeenCalledWith('seo_agency_runs');
    expect(upsert).toHaveBeenCalledWith(
      expect.objectContaining({
        id: '2026-08-15',
        run_date: '2026-08-15',
        generated_at: expect.any(String),
        payload: expect.objectContaining({ id: '2026-08-15', runDate: '2026-08-15' }),
      }),
      { onConflict: 'id' },
    );
    expect(mockWriteJsonFile).not.toHaveBeenCalled();
  });
});

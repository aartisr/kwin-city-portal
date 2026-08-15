// @vitest-environment node

import { afterEach, describe, expect, it, vi } from 'vitest';
import { triggerSeoAgencyRefresh } from './trigger-seo-agency-refresh.mjs';

const refreshUrl = 'https://kwin-city.com/api/cron/kwin-seo-agency';

function response(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json' },
  });
}

describe('SEO agency production refresh handoff', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('accepts only a successful Supabase-backed cron run', async () => {
    const fetchImpl = vi.fn().mockResolvedValue(
      response({
        success: true,
        storageBackend: 'supabase',
        runDate: '2026-08-15',
        generatedAt: '2026-08-15T03:11:00.000Z',
        durationMs: 321,
      }),
    );
    const log = vi.spyOn(console, 'log').mockImplementation(() => {});

    await expect(
      triggerSeoAgencyRefresh({ refreshUrl, cronSecret: 'test-secret', fetchImpl }),
    ).resolves.toMatchObject({ storageBackend: 'supabase', runDate: '2026-08-15' });

    expect(fetchImpl).toHaveBeenCalledWith(
      refreshUrl,
      expect.objectContaining({ headers: { authorization: 'Bearer test-secret' } }),
    );
    expect(log).toHaveBeenCalledWith(expect.stringContaining('persisted to Supabase'));
  });

  it('fails the workflow when the cron falls back to file storage', async () => {
    const fetchImpl = vi.fn().mockResolvedValue(
      response({
        success: true,
        storageBackend: 'file',
        warning: 'KWIN_SUPABASE_SERVICE_ROLE_KEY is not configured; stored in local file fallback.',
        persistence: {
          provider: 'supabase',
          supabaseUrlConfigured: true,
          supabaseAnonKeyConfigured: false,
          supabaseServiceRoleKeyConfigured: false,
        },
      }),
    );

    await expect(
      triggerSeoAgencyRefresh({ refreshUrl, cronSecret: 'test-secret', fetchImpl }),
    ).rejects.toThrow(/did not persist to Supabase.*SERVICE_ROLE_KEY.*supabaseServiceRoleKeyConfigured":false/i);
  });

  it('fails the workflow when the cron rejects the request', async () => {
    const fetchImpl = vi.fn().mockResolvedValue(response({ success: false, error: 'Unauthorized cron request.' }, 401));

    await expect(
      triggerSeoAgencyRefresh({ refreshUrl, cronSecret: 'wrong-secret', fetchImpl }),
    ).rejects.toThrow('SEO agency refresh failed: HTTP 401 — Unauthorized cron request.');
  });
});

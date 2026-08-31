import { beforeEach, describe, expect, it, vi } from 'vitest';

const {
  mockCookies,
  mockIsSameOrigin,
  mockCheckRateLimit,
  mockGetRateLimitHeaders,
  mockHasValidCsrf,
  cookieStore,
} = vi.hoisted(() => {
  const cookieStore = {
    get: vi.fn(),
  };

  return {
    mockCookies: vi.fn(async () => cookieStore),
    mockIsSameOrigin: vi.fn(() => true),
    mockCheckRateLimit: vi.fn(() => ({
      limited: false,
      limit: 100,
      remaining: 99,
      resetAt: Date.now() + 60_000,
      retryAfterSeconds: 60,
    })),
    mockGetRateLimitHeaders: vi.fn(() => ({})),
    mockHasValidCsrf: vi.fn(() => true),
    cookieStore,
  };
});

vi.mock('next/headers', () => ({
  cookies: mockCookies,
}));

vi.mock('@/lib/server/security', async () => {
  const actual = await vi.importActual<typeof import('@/lib/server/security')>('@/lib/server/security');
  return {
    ...actual,
    isSameOrigin: mockIsSameOrigin,
    checkRateLimit: mockCheckRateLimit,
    getRateLimitHeaders: mockGetRateLimitHeaders,
    hasValidCsrf: mockHasValidCsrf,
  };
});

import { POST as riskCheckPost } from '@/api/value-add/risk-check/route';
import { POST as accessibilityPost } from '@/api/value-add/accessibility/route';
import { GET as exportsGet, POST as exportsPost } from '@/api/value-add/exports/route';
import { POST as subscribePost } from '@/api/value-add/alerts/subscribe/route';
import { POST as unsubscribePost } from '@/api/value-add/alerts/unsubscribe/route';

function parseJsonResponse(response: Response) {
  return response.json() as Promise<{ error?: string }>;
}

describe('value-add route validation', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    cookieStore.get.mockReturnValue({ value: 'csrf-token' });
  });

  it('rejects malformed risk-check payloads', async () => {
    const req = {
      json: vi.fn().mockRejectedValue(new Error('bad-json')),
      headers: { get: vi.fn() },
    } as any;

    const response = await riskCheckPost(req);
    const body = await parseJsonResponse(response as Response);

    expect(response.status).toBe(400);
    expect(body.error).toBe('Invalid JSON payload.');
  });

  it('rejects accessibility payloads without origin/mode', async () => {
    const req = {
      json: vi.fn().mockResolvedValue({ origin: '', mode: 'invalid' }),
      headers: { get: vi.fn() },
    } as any;

    const response = await accessibilityPost(req);
    const body = await parseJsonResponse(response as Response);

    expect(response.status).toBe(400);
    expect(body.error).toBe('origin and mode are required.');
  });

  it('rejects export status requests without jobId', async () => {
    const req = {
      nextUrl: new URL('https://kwin-city.com/api/value-add/exports'),
      headers: { get: vi.fn() },
    } as any;

    const response = await exportsGet(req);
    const body = await parseJsonResponse(response as Response);

    expect(response.status).toBe(400);
    expect(body.error).toBe('jobId is required.');
  });

  it('rejects export queue request when exportType is invalid', async () => {
    const req = {
      json: vi.fn().mockResolvedValue({ exportType: 'xml' }),
      headers: { get: vi.fn() },
    } as any;

    const response = await exportsPost(req);
    const body = await parseJsonResponse(response as Response);

    expect(response.status).toBe(400);
    expect(body.error).toBe('exportType must be one of: csv, geojson, json.');
  });

  it('rejects alert subscription payloads with missing required fields', async () => {
    const req = {
      json: vi.fn().mockResolvedValue({ email: 'invalid', persona: 'unknown', cadence: 'yearly', topics: [] }),
      headers: { get: vi.fn() },
    } as any;

    const response = await subscribePost(req);
    const body = await parseJsonResponse(response as Response);

    expect(response.status).toBe(400);
    expect(body.error).toBe('email, persona, cadence, and at least one topic are required.');
  });

  it('rejects unsubscribe payloads without subscriptionId', async () => {
    const req = {
      json: vi.fn().mockResolvedValue({}),
      headers: { get: vi.fn() },
    } as any;

    const response = await unsubscribePost(req);
    const body = await parseJsonResponse(response as Response);

    expect(response.status).toBe(400);
    expect(body.error).toBe('subscriptionId is required.');
  });

  it('rejects write routes with invalid origin before business logic', async () => {
    mockIsSameOrigin.mockReturnValueOnce(false);

    const req = {
      json: vi.fn().mockResolvedValue({ exportType: 'csv' }),
      headers: { get: vi.fn() },
    } as any;

    const response = await exportsPost(req);
    const body = await parseJsonResponse(response as Response);

    expect(response.status).toBe(403);
    expect(body.error).toBe('Invalid request origin.');
  });

  it('rejects write routes with CSRF failure', async () => {
    mockHasValidCsrf.mockReturnValueOnce(false);

    const req = {
      json: vi.fn().mockResolvedValue({ exportType: 'csv' }),
      headers: { get: vi.fn() },
    } as any;

    const response = await exportsPost(req);
    const body = await parseJsonResponse(response as Response);

    expect(response.status).toBe(403);
    expect(body.error).toBe('CSRF validation failed.');
  });
});

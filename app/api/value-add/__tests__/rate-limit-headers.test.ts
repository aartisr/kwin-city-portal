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
    mockCheckRateLimit: vi.fn(),
    mockGetRateLimitHeaders: vi.fn(() => ({
      'X-RateLimit-Limit': '20',
      'X-RateLimit-Remaining': '0',
      'X-RateLimit-Reset': '9999999999',
      'Retry-After': '60',
    })),
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
import { POST as exportsPost } from '@/api/value-add/exports/route';
import { POST as subscribePost } from '@/api/value-add/alerts/subscribe/route';

function limitedResult(limit: number) {
  return {
    limited: true,
    limit,
    remaining: 0,
    resetAt: Date.now() + 60_000,
    retryAfterSeconds: 60,
  };
}

function parseJsonResponse(response: Response) {
  return response.json() as Promise<{ error?: string }>;
}

describe('value-add route throttling headers', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    cookieStore.get.mockReturnValue({ value: 'csrf-token' });
  });

  it('returns rate-limit headers for risk-check throttling', async () => {
    mockCheckRateLimit.mockReturnValueOnce(limitedResult(80));

    const req = {
      json: vi.fn().mockResolvedValue({ areaName: 'north bengaluru' }),
      headers: { get: vi.fn() },
    } as any;

    const response = await riskCheckPost(req);
    const body = await parseJsonResponse(response as Response);

    expect(response.status).toBe(429);
    expect(body.error).toBe('Too many requests. Try again shortly.');
    expect(response.headers.get('X-RateLimit-Limit')).toBe('20');
    expect(response.headers.get('Retry-After')).toBe('60');
  });

  it('returns rate-limit headers for exports throttling', async () => {
    mockCheckRateLimit.mockReturnValueOnce(limitedResult(25));

    const req = {
      json: vi.fn().mockResolvedValue({ exportType: 'csv' }),
      headers: { get: vi.fn() },
    } as any;

    const response = await exportsPost(req);
    const body = await parseJsonResponse(response as Response);

    expect(response.status).toBe(429);
    expect(body.error).toBe('Too many requests. Try again shortly.');
    expect(response.headers.get('X-RateLimit-Limit')).toBe('20');
    expect(response.headers.get('Retry-After')).toBe('60');
  });

  it('returns rate-limit headers for alerts subscribe throttling', async () => {
    mockCheckRateLimit.mockReturnValueOnce(limitedResult(20));

    const req = {
      json: vi.fn().mockResolvedValue({
        email: 'user@example.com',
        persona: 'investor',
        cadence: 'weekly',
        topics: ['connectivity'],
      }),
      headers: { get: vi.fn() },
    } as any;

    const response = await subscribePost(req);
    const body = await parseJsonResponse(response as Response);

    expect(response.status).toBe(429);
    expect(body.error).toBe('Too many requests. Try again shortly.');
    expect(response.headers.get('X-RateLimit-Limit')).toBe('20');
    expect(response.headers.get('Retry-After')).toBe('60');
  });
});

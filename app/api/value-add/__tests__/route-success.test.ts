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

import { GET as exportsGet, POST as exportsPost } from '@/api/value-add/exports/route';
import { POST as subscribePost } from '@/api/value-add/alerts/subscribe/route';
import { POST as unsubscribePost } from '@/api/value-add/alerts/unsubscribe/route';

type ExportPostResponse = {
  requestId: string;
  status: 'success' | 'partial' | 'error';
  data: {
    id: string;
    status: string;
    exportType: 'csv' | 'geojson' | 'json';
  };
};

type ExportGetResponse = {
  requestId: string;
  status: 'success' | 'partial' | 'error';
  data: {
    id: string;
    status: string;
  };
};

type SubscriptionResponse = {
  requestId: string;
  status: 'success' | 'partial' | 'error';
  data: {
    subscriptionId: string;
    status: 'active' | 'inactive';
  };
};

describe('value-add route success paths', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    cookieStore.get.mockReturnValue({ value: 'csrf-token' });
  });

  it('queues export jobs and allows status lookup by id', async () => {
    const postReq = {
      json: vi.fn().mockResolvedValue({ exportType: 'csv', filters: { topic: 'connectivity' } }),
      headers: { get: vi.fn() },
    } as any;

    const postResponse = await exportsPost(postReq);
    const postBody = (await (postResponse as Response).json()) as ExportPostResponse;

    expect(postResponse.status).toBe(202);
    expect(postBody.status).toBe('success');
    expect(postBody.data.status).toBe('queued');
    expect(postBody.data.exportType).toBe('csv');
    expect(postBody.data.id.length).toBeGreaterThan(0);

    const getReq = {
      nextUrl: new URL(`https://kwin-city.com/api/value-add/exports?jobId=${encodeURIComponent(postBody.data.id)}`),
      headers: { get: vi.fn() },
    } as any;

    const getResponse = await exportsGet(getReq);
    const getBody = (await (getResponse as Response).json()) as ExportGetResponse;

    expect(getResponse.status).toBe(200);
    expect(getBody.status).toBe('success');
    expect(getBody.data.id).toBe(postBody.data.id);
    expect(getBody.data.status).toBe('queued');
  });

  it('creates and then deactivates alert subscriptions', async () => {
    const subscribeReq = {
      json: vi.fn().mockResolvedValue({
        email: 'user@example.com',
        persona: 'investor',
        topics: ['connectivity', 'infrastructure'],
        cadence: 'weekly',
      }),
      headers: { get: vi.fn() },
    } as any;

    const subscribeResponse = await subscribePost(subscribeReq);
    const subscribeBody = (await (subscribeResponse as Response).json()) as SubscriptionResponse;

    expect(subscribeResponse.status).toBe(201);
    expect(subscribeBody.status).toBe('success');
    expect(subscribeBody.data.status).toBe('active');
    expect(subscribeBody.data.subscriptionId.length).toBeGreaterThan(0);

    const unsubscribeReq = {
      json: vi.fn().mockResolvedValue({ subscriptionId: subscribeBody.data.subscriptionId }),
      headers: { get: vi.fn() },
    } as any;

    const unsubscribeResponse = await unsubscribePost(unsubscribeReq);
    const unsubscribeBody = (await (unsubscribeResponse as Response).json()) as SubscriptionResponse;

    expect(unsubscribeResponse.status).toBe(200);
    expect(unsubscribeBody.status).toBe('success');
    expect(unsubscribeBody.data.subscriptionId).toBe(subscribeBody.data.subscriptionId);
    expect(unsubscribeBody.data.status).toBe('inactive');
  });
});

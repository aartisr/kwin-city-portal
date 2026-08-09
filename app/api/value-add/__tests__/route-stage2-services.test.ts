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

import { GET as spatialGet } from '@/api/value-add/spatial-explorer/route';
import { GET as satelliteGet } from '@/api/value-add/satellite-tracker/route';
import { GET as valuationGet } from '@/api/value-add/valuation/route';
import { GET as investmentGet } from '@/api/value-add/investment-radar/route';
import { GET as newsGet } from '@/api/value-add/news-feed/route';
import { GET as openDataGet } from '@/api/value-add/open-data/route';
import { GET as exchangeGet, POST as exchangePost } from '@/api/value-add/opportunity-exchange/route';

type Envelope<T> = {
  requestId: string;
  status: 'success' | 'partial' | 'error';
  data: T;
};

describe('value-add stage2 route coverage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    cookieStore.get.mockReturnValue({ value: 'csrf-token' });
  });

  it('returns spatial explorer data for requested phase', async () => {
    const req = {
      nextUrl: new URL('https://kwin-city.com/api/value-add/spatial-explorer?phase=phase-2'),
      headers: { get: vi.fn() },
    } as any;

    const response = await spatialGet(req);
    const body = (await (response as Response).json()) as Envelope<{ phase: string; layers: Array<{ phase: string }> }>;

    expect(response.status).toBe(200);
    expect(body.status).toBe('success');
    expect(body.data.phase).toBe('phase-2');
    expect(body.data.layers.every((layer) => layer.phase === 'phase-2')).toBe(true);
  });

  it('returns satellite snapshots with limit applied', async () => {
    const req = {
      nextUrl: new URL('https://kwin-city.com/api/value-add/satellite-tracker?limit=2'),
      headers: { get: vi.fn() },
    } as any;

    const response = await satelliteGet(req);
    const body = (await (response as Response).json()) as Envelope<{ snapshots: unknown[] }>;

    expect(response.status).toBe(200);
    expect(body.status).toBe('success');
    expect(body.data.snapshots).toHaveLength(2);
  });

  it('returns valuation index and normalizes unknown zone', async () => {
    const req = {
      nextUrl: new URL('https://kwin-city.com/api/value-add/valuation?zone=unknown-zone'),
      headers: { get: vi.fn() },
    } as any;

    const response = await valuationGet(req);
    const body = (await (response as Response).json()) as Envelope<{ zone: string; points: unknown[] }>;

    expect(response.status).toBe(200);
    expect(body.status).toBe('success');
    expect(body.data.zone).toBe('doddaballapur');
    expect(body.data.points.length).toBeGreaterThan(0);
  });

  it('filters investment radar by category', async () => {
    const req = {
      nextUrl: new URL('https://kwin-city.com/api/value-add/investment-radar?category=biotech'),
      headers: { get: vi.fn() },
    } as any;

    const response = await investmentGet(req);
    const body = (await (response as Response).json()) as Envelope<{ signals: Array<{ category: string }> }>;

    expect(response.status).toBe(200);
    expect(body.status).toBe('success');
    expect(body.data.signals.length).toBeGreaterThan(0);
    expect(body.data.signals.every((signal) => signal.category === 'biotech')).toBe(true);
  });

  it('returns structured regulatory news and open data catalog', async () => {
    const newsReq = {
      nextUrl: new URL('https://kwin-city.com/api/value-add/news-feed?limit=3'),
      headers: { get: vi.fn() },
    } as any;

    const newsResponse = await newsGet(newsReq);
    const newsBody = (await (newsResponse as Response).json()) as Envelope<{ total: number; items: unknown[] }>;

    expect(newsResponse.status).toBe(200);
    expect(newsBody.status).toBe('success');
    expect(newsBody.data.total).toBe(3);
    expect(newsBody.data.items).toHaveLength(3);

    const openDataResponse = await openDataGet();
    const openDataBody = (await (openDataResponse as Response).json()) as Envelope<{ datasets: unknown[] }>;

    expect(openDataResponse.status).toBe(200);
    expect(openDataBody.status).toBe('success');
    expect(openDataBody.data.datasets.length).toBeGreaterThan(0);
  });

  it('enforces opportunity exchange validation and creates/lists leads', async () => {
    mockIsSameOrigin.mockReturnValueOnce(false);
    const invalidOriginReq = {
      json: vi.fn().mockResolvedValue({}),
      headers: { get: vi.fn() },
    } as any;

    const invalidOriginResponse = await exchangePost(invalidOriginReq);
    const invalidOriginBody = (await (invalidOriginResponse as Response).json()) as { error: string };

    expect(invalidOriginResponse.status).toBe(403);
    expect(invalidOriginBody.error).toBe('Invalid request origin.');

    const invalidPayloadReq = {
      json: vi.fn().mockResolvedValue({ name: '', email: 'bad', role: 'invalid', requirement: '' }),
      headers: { get: vi.fn() },
    } as any;

    const invalidPayloadResponse = await exchangePost(invalidPayloadReq);
    const invalidPayloadBody = (await (invalidPayloadResponse as Response).json()) as { error: string };

    expect(invalidPayloadResponse.status).toBe(400);
    expect(invalidPayloadBody.error).toBe('name, email, role, and requirement are required.');

    const validReq = {
      json: vi.fn().mockResolvedValue({
        name: 'Aarti',
        email: 'aarti@example.com',
        role: 'investor',
        requirement: 'Looking for 40-60 acre industrial land near corridor link.',
        budgetBand: 'INR 20Cr-40Cr',
      }),
      headers: { get: vi.fn() },
    } as any;

    const validResponse = await exchangePost(validReq);
    const validBody = (await (validResponse as Response).json()) as Envelope<{ id: string; role: string; status: string }>;

    expect(validResponse.status).toBe(201);
    expect(validBody.status).toBe('success');
    expect(validBody.data.role).toBe('investor');
    expect(validBody.data.id.length).toBeGreaterThan(0);

    const listReq = {
      nextUrl: new URL('https://kwin-city.com/api/value-add/opportunity-exchange?limit=10'),
      headers: { get: vi.fn() },
    } as any;

    const listResponse = await exchangeGet(listReq);
    const listBody = (await (listResponse as Response).json()) as Envelope<{ leads: Array<{ id: string }> }>;

    expect(listResponse.status).toBe(200);
    expect(listBody.status).toBe('success');
    expect(listBody.data.leads.some((lead) => lead.id === validBody.data.id)).toBe(true);
  });
});

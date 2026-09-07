import { beforeEach, describe, expect, it, vi } from 'vitest';

const {
  mockCookies,
  mockIsSameOrigin,
  mockCheckRateLimit,
  mockGetRateLimitHeaders,
  mockHasValidCsrf,
  mockEvaluateRisk,
  mockCalculateAccessibility,
  mockQueueExportJob,
  mockCreateSubscription,
  mockDisableSubscription,
  mockCaptureApiRouteException,
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
    mockEvaluateRisk: vi.fn(() => ({
      assessment: {
        riskBand: 'low',
        score: 10,
        summary: 'ok',
        matchedSignals: [],
        recommendations: [],
      },
      sourceIds: ['kiadb'],
      warnings: [],
    })),
    mockCalculateAccessibility: vi.fn(() => ({
      result: {
        estimatedMinutes: 10,
        assumptions: ['x'],
      },
      sourceIds: ['strr'],
    })),
    mockQueueExportJob: vi.fn(() => ({
      id: 'job-1',
      status: 'queued',
      exportType: 'csv',
      createdAt: new Date().toISOString(),
    })),
    mockCreateSubscription: vi.fn(() => ({
      subscriptionId: 'sub-1',
      status: 'active',
    })),
    mockDisableSubscription: vi.fn(() => ({
      subscriptionId: 'sub-1',
      status: 'inactive',
    })),
    mockCaptureApiRouteException: vi.fn(),
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

vi.mock('@/lib/server/value-add/risk-check', () => ({
  evaluateRisk: mockEvaluateRisk,
}));

vi.mock('@/lib/server/value-add/accessibility', () => ({
  calculateAccessibility: mockCalculateAccessibility,
}));

vi.mock('@/lib/server/value-add/exports', async () => {
  const actual = await vi.importActual<typeof import('@/lib/server/value-add/exports')>('@/lib/server/value-add/exports');
  return {
    ...actual,
    queueExportJob: mockQueueExportJob,
  };
});

vi.mock('@/lib/server/value-add/alerts', async () => {
  const actual = await vi.importActual<typeof import('@/lib/server/value-add/alerts')>('@/lib/server/value-add/alerts');
  return {
    ...actual,
    createSubscription: mockCreateSubscription,
    disableSubscription: mockDisableSubscription,
  };
});

vi.mock('@/lib/server/observability', () => ({
  captureApiRouteException: mockCaptureApiRouteException,
}));

import { POST as riskCheckPost } from '@/api/value-add/risk-check/route';
import { POST as accessibilityPost } from '@/api/value-add/accessibility/route';
import { POST as exportsPost } from '@/api/value-add/exports/route';
import { POST as subscribePost } from '@/api/value-add/alerts/subscribe/route';
import { POST as unsubscribePost } from '@/api/value-add/alerts/unsubscribe/route';

function parseJsonResponse(response: Response) {
  return response.json() as Promise<{ error?: string; requestId?: string }>;
}

describe('value-add route fallback handling', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    cookieStore.get.mockReturnValue({ value: 'csrf-token' });
  });

  it('returns wrapped fallback for risk-check exceptions', async () => {
    mockEvaluateRisk.mockImplementationOnce(() => {
      throw new Error('risk engine unavailable');
    });

    const req = {
      json: vi.fn().mockResolvedValue({ areaName: 'north bengaluru' }),
      headers: { get: vi.fn() },
    } as any;

    const response = await riskCheckPost(req);
    const body = await parseJsonResponse(response as Response);

    expect(response.status).toBe(500);
    expect(body.error).toBe('Risk check is temporarily unavailable. Please try again.');
    expect(typeof body.requestId).toBe('string');
    expect(mockCaptureApiRouteException).toHaveBeenCalledTimes(1);
  });

  it('returns wrapped fallback for accessibility exceptions', async () => {
    mockCalculateAccessibility.mockImplementationOnce(() => {
      throw new Error('accessibility engine unavailable');
    });

    const req = {
      json: vi.fn().mockResolvedValue({ origin: 'KWIN City', mode: 'road' }),
      headers: { get: vi.fn() },
    } as any;

    const response = await accessibilityPost(req);
    const body = await parseJsonResponse(response as Response);

    expect(response.status).toBe(500);
    expect(body.error).toBe('Accessibility calculations are temporarily unavailable. Please try again.');
    expect(typeof body.requestId).toBe('string');
    expect(mockCaptureApiRouteException).toHaveBeenCalledTimes(1);
  });

  it('returns wrapped fallback for export queue exceptions', async () => {
    mockQueueExportJob.mockImplementationOnce(() => {
      throw new Error('queue unavailable');
    });

    const req = {
      json: vi.fn().mockResolvedValue({ exportType: 'csv' }),
      headers: { get: vi.fn() },
    } as any;

    const response = await exportsPost(req);
    const body = await parseJsonResponse(response as Response);

    expect(response.status).toBe(500);
    expect(body.error).toBe('Export request could not be queued. Please try again.');
    expect(typeof body.requestId).toBe('string');
    expect(mockCaptureApiRouteException).toHaveBeenCalledTimes(1);
  });

  it('returns wrapped fallback for subscribe exceptions', async () => {
    mockCreateSubscription.mockImplementationOnce(() => {
      throw new Error('subscribe unavailable');
    });

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

    expect(response.status).toBe(500);
    expect(body.error).toBe('Unable to create alert subscription at the moment.');
    expect(typeof body.requestId).toBe('string');
    expect(mockCaptureApiRouteException).toHaveBeenCalledTimes(1);
  });

  it('returns wrapped fallback for unsubscribe exceptions', async () => {
    mockDisableSubscription.mockImplementationOnce(() => {
      throw new Error('unsubscribe unavailable');
    });

    const req = {
      json: vi.fn().mockResolvedValue({ subscriptionId: 'sub-1' }),
      headers: { get: vi.fn() },
    } as any;

    const response = await unsubscribePost(req);
    const body = await parseJsonResponse(response as Response);

    expect(response.status).toBe(500);
    expect(body.error).toBe('Unable to process unsubscribe request right now.');
    expect(typeof body.requestId).toBe('string');
    expect(mockCaptureApiRouteException).toHaveBeenCalledTimes(1);
  });
});

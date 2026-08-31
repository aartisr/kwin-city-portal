import { beforeEach, describe, expect, it, vi } from 'vitest';

const {
  mockCookies,
  mockIsSameOrigin,
  mockCheckRateLimit,
  mockGetRateLimitHeaders,
  mockHasValidCsrf,
  mockFindUserByEmail,
  mockCreateUser,
  mockGetSessionFromCookie,
  mockCaptureApiRouteException,
  cookieStore,
} = vi.hoisted(() => {
  const cookieStore = {
    get: vi.fn(),
    set: vi.fn(),
  };

  return {
    mockCookies: vi.fn(async () => cookieStore),
    mockIsSameOrigin: vi.fn(() => true),
    mockCheckRateLimit: vi.fn(() => ({
      limited: false,
      limit: 20,
      remaining: 19,
      resetAt: Date.now() + 60_000,
      retryAfterSeconds: 60,
    })),
    mockGetRateLimitHeaders: vi.fn(() => ({})),
    mockHasValidCsrf: vi.fn(() => true),
    mockFindUserByEmail: vi.fn(),
    mockCreateUser: vi.fn(),
    mockGetSessionFromCookie: vi.fn(),
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

vi.mock('@/lib/server/data-layer', () => ({
  findUserByEmail: mockFindUserByEmail,
  createUser: mockCreateUser,
}));

vi.mock('@/lib/server/auth', async () => {
  const actual = await vi.importActual<typeof import('@/lib/server/auth')>('@/lib/server/auth');
  return {
    ...actual,
    getSessionFromCookie: mockGetSessionFromCookie,
    verifyPassword: vi.fn(async () => true),
    hashPassword: vi.fn(async () => ({ salt: 'salt', hash: 'hash' })),
  };
});

vi.mock('@/lib/server/observability', () => ({
  captureApiRouteException: mockCaptureApiRouteException,
}));

import { POST as signInPost } from '@/api/auth/signin/route';
import { POST as signUpPost } from '@/api/auth/signup/route';
import { POST as signOutPost } from '@/api/auth/signout/route';
import { GET as meGet } from '@/api/auth/me/route';

function parseJsonResponse(response: Response) {
  return response.json() as Promise<{ error?: string; requestId?: string }>;
}

describe('auth routes fallback hardening', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    cookieStore.get.mockReturnValue({ value: 'csrf-token' });
    mockGetSessionFromCookie.mockResolvedValue(null);
  });

  it('returns wrapped fallback for unhandled sign-in failures', async () => {
    mockFindUserByEmail.mockRejectedValue(new Error('db unavailable'));

    const req = {
      json: vi.fn().mockResolvedValue({ email: 'x@example.com', password: 'password123' }),
      headers: { get: vi.fn() },
    } as any;

    const response = await signInPost(req);
    const body = await parseJsonResponse(response as Response);

    expect(response.status).toBe(500);
    expect(body.error).toBe('Sign-in is temporarily unavailable. Please try again.');
    expect(typeof body.requestId).toBe('string');
    expect(body.requestId).toBeTruthy();
    expect(mockCaptureApiRouteException).toHaveBeenCalledTimes(1);
  });

  it('returns wrapped fallback for unhandled sign-up failures', async () => {
    mockFindUserByEmail.mockResolvedValue(null);
    mockCreateUser.mockRejectedValue(new Error('write failed'));

    const req = {
      json: vi.fn().mockResolvedValue({ name: 'User', email: 'u@example.com', password: 'password123' }),
      headers: { get: vi.fn() },
    } as any;

    const response = await signUpPost(req);
    const body = await parseJsonResponse(response as Response);

    expect(response.status).toBe(500);
    expect(body.error).toBe('Sign-up is temporarily unavailable. Please try again.');
    expect(typeof body.requestId).toBe('string');
    expect(mockCaptureApiRouteException).toHaveBeenCalledTimes(1);
  });

  it('returns wrapped fallback for unhandled sign-out failures', async () => {
    mockCookies.mockRejectedValueOnce(new Error('cookie store unavailable'));

    const req = { headers: { get: vi.fn() } } as any;
    const response = await signOutPost(req);
    const body = await parseJsonResponse(response as Response);

    expect(response.status).toBe(500);
    expect(body.error).toBe('Sign-out is temporarily unavailable. Please try again.');
    expect(typeof body.requestId).toBe('string');
    expect(mockCaptureApiRouteException).toHaveBeenCalledTimes(1);
  });

  it('returns wrapped fallback for unhandled session lookup failures', async () => {
    mockGetSessionFromCookie.mockRejectedValue(new Error('token parse failure'));

    const response = await meGet();
    const body = await parseJsonResponse(response as Response);

    expect(response.status).toBe(500);
    expect(body.error).toBe('Unable to load authentication session. Please refresh and try again.');
    expect(typeof body.requestId).toBe('string');
    expect(mockCaptureApiRouteException).toHaveBeenCalledTimes(1);
  });

  it('returns rate-limit headers on sign-in throttling', async () => {
    mockCheckRateLimit.mockReturnValueOnce({
      limited: true,
      limit: 20,
      remaining: 0,
      resetAt: Date.now() + 60_000,
      retryAfterSeconds: 60,
    });
    mockGetRateLimitHeaders.mockReturnValueOnce({
      'X-RateLimit-Limit': '20',
      'X-RateLimit-Remaining': '0',
      'X-RateLimit-Reset': '9999999999',
      'Retry-After': '60',
    });

    const req = {
      json: vi.fn().mockResolvedValue({ email: 'x@example.com', password: 'password123' }),
      headers: { get: vi.fn() },
    } as any;

    const response = await signInPost(req);
    const body = await parseJsonResponse(response as Response);

    expect(response.status).toBe(429);
    expect(body.error).toBe('Too many requests. Try again shortly.');
    expect(response.headers.get('X-RateLimit-Limit')).toBe('20');
    expect(response.headers.get('Retry-After')).toBe('60');
  });

  it('returns rate-limit headers on sign-up throttling', async () => {
    mockCheckRateLimit.mockReturnValueOnce({
      limited: true,
      limit: 10,
      remaining: 0,
      resetAt: Date.now() + 60_000,
      retryAfterSeconds: 60,
    });
    mockGetRateLimitHeaders.mockReturnValueOnce({
      'X-RateLimit-Limit': '10',
      'X-RateLimit-Remaining': '0',
      'X-RateLimit-Reset': '9999999999',
      'Retry-After': '60',
    });

    const req = {
      json: vi.fn().mockResolvedValue({ name: 'User', email: 'u@example.com', password: 'password123' }),
      headers: { get: vi.fn() },
    } as any;

    const response = await signUpPost(req);
    const body = await parseJsonResponse(response as Response);

    expect(response.status).toBe(429);
    expect(body.error).toBe('Too many requests. Try again shortly.');
    expect(response.headers.get('X-RateLimit-Limit')).toBe('10');
    expect(response.headers.get('Retry-After')).toBe('60');
  });

  it('returns consistent csrf rejection shape for sign-out', async () => {
    mockHasValidCsrf.mockReturnValueOnce(false);

    const req = { headers: { get: vi.fn() } } as any;
    const response = await signOutPost(req);
    const body = await parseJsonResponse(response as Response);

    expect(response.status).toBe(403);
    expect(body).toEqual({ error: 'CSRF validation failed.' });
  });

  it('rejects invalid origin before auth logic executes', async () => {
    mockIsSameOrigin.mockReturnValueOnce(false);

    const req = {
      json: vi.fn().mockResolvedValue({ email: 'x@example.com', password: 'password123' }),
      headers: { get: vi.fn() },
    } as any;

    const response = await signInPost(req);
    const body = await parseJsonResponse(response as Response);

    expect(response.status).toBe(403);
    expect(body).toEqual({ error: 'Invalid request origin.' });
    expect(mockFindUserByEmail).not.toHaveBeenCalled();
  });

  it('returns 400 for malformed sign-up payload', async () => {
    const req = {
      json: vi.fn().mockResolvedValue({ name: 'A', email: 'invalid-email', password: 'short' }),
      headers: { get: vi.fn() },
    } as any;

    const response = await signUpPost(req);
    const body = await parseJsonResponse(response as Response);

    expect(response.status).toBe(400);
    expect(body.error).toBe('Name must be at least 2 characters.');
  });
});

import crypto from 'crypto';
import type { NextRequest } from 'next/server';

type RateLimitConfig = {
  scope: string;
  limit: number;
  windowMs: number;
};

type RateEntry = {
  count: number;
  resetAt: number;
};

export type RateLimitResult = {
  limited: boolean;
  limit: number;
  remaining: number;
  resetAt: number;
  retryAfterSeconds: number;
};

const rateMap = new Map<string, RateEntry>();

export const CSRF_COOKIE = 'kwin_csrf';
export const CSRF_HEADER = 'x-csrf-token';

export function createCsrfToken() {
  return crypto.randomBytes(24).toString('hex');
}

function purgeExpiredRateEntries(now: number) {
  for (const [key, entry] of rateMap.entries()) {
    if (now > entry.resetAt) {
      rateMap.delete(key);
    }
  }
}

export function getClientIp(req: NextRequest) {
  return (
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    req.headers.get('x-real-ip') ||
    'unknown'
  );
}

export function checkRateLimit(req: NextRequest, config: RateLimitConfig): RateLimitResult {
  const key = `${config.scope}:${getClientIp(req)}`;
  const now = Date.now();
  purgeExpiredRateEntries(now);
  const current = rateMap.get(key);

  if (!current || now > current.resetAt) {
    const resetAt = now + config.windowMs;
    rateMap.set(key, { count: 1, resetAt });
    return {
      limited: false,
      limit: config.limit,
      remaining: Math.max(config.limit - 1, 0),
      resetAt,
      retryAfterSeconds: Math.ceil(config.windowMs / 1000),
    };
  }

  if (current.count >= config.limit) {
    return {
      limited: true,
      limit: config.limit,
      remaining: 0,
      resetAt: current.resetAt,
      retryAfterSeconds: Math.max(Math.ceil((current.resetAt - now) / 1000), 1),
    };
  }

  current.count += 1;
  return {
    limited: false,
    limit: config.limit,
    remaining: Math.max(config.limit - current.count, 0),
    resetAt: current.resetAt,
    retryAfterSeconds: Math.max(Math.ceil((current.resetAt - now) / 1000), 1),
  };
}

export function isRateLimited(req: NextRequest, config: RateLimitConfig) {
  return checkRateLimit(req, config).limited;
}

export function getRateLimitHeaders(result: RateLimitResult): Record<string, string> {
  return {
    'X-RateLimit-Limit': String(result.limit),
    'X-RateLimit-Remaining': String(result.remaining),
    'X-RateLimit-Reset': String(Math.floor(result.resetAt / 1000)),
    'Retry-After': String(result.retryAfterSeconds),
  };
}

export function isSameOrigin(req: NextRequest) {
  const origin = req.headers.get('origin');
  if (!origin) return true;

  const proto = req.headers.get('x-forwarded-proto') || 'http';
  const host = req.headers.get('x-forwarded-host') || req.headers.get('host');
  if (!host) return false;

  const expected = `${proto}://${host}`;
  return origin === expected;
}

export function hasValidCsrf(req: NextRequest, cookieValue: string | undefined) {
  const header = req.headers.get(CSRF_HEADER);
  if (!header || !cookieValue) return false;

  const a = Buffer.from(header);
  const b = Buffer.from(cookieValue);
  if (a.length !== b.length) return false;

  return crypto.timingSafeEqual(a, b);
}

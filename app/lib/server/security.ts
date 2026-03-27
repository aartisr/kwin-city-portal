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

const rateMap = new Map<string, RateEntry>();

export const CSRF_COOKIE = 'kwin_csrf';
export const CSRF_HEADER = 'x-csrf-token';

export function createCsrfToken() {
  return crypto.randomBytes(24).toString('hex');
}

function getClientIp(req: NextRequest) {
  return (
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    req.headers.get('x-real-ip') ||
    'unknown'
  );
}

export function isRateLimited(req: NextRequest, config: RateLimitConfig) {
  const key = `${config.scope}:${getClientIp(req)}`;
  const now = Date.now();
  const current = rateMap.get(key);

  if (!current || now > current.resetAt) {
    rateMap.set(key, { count: 1, resetAt: now + config.windowMs });
    return false;
  }

  if (current.count >= config.limit) {
    return true;
  }

  current.count += 1;
  return false;
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

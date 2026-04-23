import { NextResponse } from 'next/server';
import { getRateLimitHeaders } from '@/lib/server/security';
import type { RateLimitResult } from '@/lib/server/security';

export function buildContactResponseHeaders(
  requestId: string,
  rateLimit: RateLimitResult
): Headers {
  const headers = new Headers({
    'Cache-Control': 'no-store',
    'X-Request-Id': requestId,
  });

  for (const [key, value] of Object.entries(getRateLimitHeaders(rateLimit))) {
    headers.set(key, value);
  }

  return headers;
}

export function createContactResponse(
  body: Record<string, unknown>,
  requestId: string,
  rateLimit: RateLimitResult,
  init?: ResponseInit
) {
  const headers = buildContactResponseHeaders(requestId, rateLimit);
  const extraHeaders = new Headers(init?.headers);

  extraHeaders.forEach((value, key) => {
    headers.set(key, value);
  });

  return NextResponse.json(
    {
      ...body,
      requestId,
    },
    {
      ...init,
      headers,
    }
  );
}

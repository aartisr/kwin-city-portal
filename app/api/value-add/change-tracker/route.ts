import { NextRequest, NextResponse } from 'next/server';
import { checkRateLimit, getRateLimitHeaders } from '@/lib/server/security';
import { withApiRoute } from '@/lib/server/api-route';
import { getChangeTimeline, normalizeLimit } from '@/lib/server/value-add/change-tracker';
import { createEnvelope } from '@/lib/server/value-add/common';

export async function GET(req: NextRequest) {
  return withApiRoute(
    {
      method: 'GET',
      path: '/api/value-add/change-tracker',
      fallbackMessage: 'Change tracker is temporarily unavailable. Please try again.',
    },
    async ({ requestId }) => {
      const rateLimit = checkRateLimit(req, { scope: 'value-add-change-tracker', limit: 100, windowMs: 60_000 });
      if (rateLimit.limited) {
        return NextResponse.json(
          { error: 'Too many requests. Try again shortly.' },
          { status: 429, headers: getRateLimitHeaders(rateLimit) }
        );
      }

      const limit = normalizeLimit(req.nextUrl.searchParams.get('limit'));
      const { result, sourceIds } = getChangeTimeline(limit);
      return NextResponse.json(
        createEnvelope({
          requestId,
          status: 'success',
          data: result,
          sourceIds,
        })
      );
    }
  );
}
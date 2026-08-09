import { NextRequest, NextResponse } from 'next/server';
import { checkRateLimit, getRateLimitHeaders } from '@/lib/server/security';
import { withApiRoute } from '@/lib/server/api-route';
import { createEnvelope } from '@/lib/server/value-add/common';
import { getRegulatoryPlan, normalizePersona } from '@/lib/server/value-add/regulatory';

export async function GET(req: NextRequest) {
  return withApiRoute(
    {
      method: 'GET',
      path: '/api/value-add/regulatory',
      fallbackMessage: 'Regulatory guide is temporarily unavailable. Please try again.',
    },
    async ({ requestId }) => {
      const rateLimit = checkRateLimit(req, { scope: 'value-add-regulatory', limit: 80, windowMs: 60_000 });
      if (rateLimit.limited) {
        return NextResponse.json(
          { error: 'Too many requests. Try again shortly.' },
          { status: 429, headers: getRateLimitHeaders(rateLimit) }
        );
      }

      const persona = normalizePersona(req.nextUrl.searchParams.get('persona'));
      const { result, sourceIds } = getRegulatoryPlan(persona);
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
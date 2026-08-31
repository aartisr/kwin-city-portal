import { NextRequest, NextResponse } from 'next/server';
import { checkRateLimit, getRateLimitHeaders, isSameOrigin } from '@/lib/server/security';
import { withApiRoute } from '@/lib/server/api-route';
import { createEnvelope, parseJsonBody } from '@/lib/server/value-add/common';
import { evaluateRisk } from '@/lib/server/value-add/risk-check';
import type { RiskQuery } from '@/types/value-add';

export async function POST(req: NextRequest) {
  return withApiRoute(
    {
      method: 'POST',
      path: '/api/value-add/risk-check',
      fallbackMessage: 'Risk check is temporarily unavailable. Please try again.',
    },
    async ({ requestId }) => {
      if (!isSameOrigin(req)) {
        return NextResponse.json({ error: 'Invalid request origin.' }, { status: 403 });
      }

      const rateLimit = checkRateLimit(req, { scope: 'value-add-risk-check', limit: 80, windowMs: 60_000 });
      if (rateLimit.limited) {
        return NextResponse.json(
          { error: 'Too many requests. Try again shortly.' },
          { status: 429, headers: getRateLimitHeaders(rateLimit) }
        );
      }

      const body = await parseJsonBody<RiskQuery>(req);
      if (!body || typeof body !== 'object') {
        return NextResponse.json({ error: 'Invalid JSON payload.' }, { status: 400 });
      }

      const result = evaluateRisk(body);
      return NextResponse.json(
        createEnvelope({
          requestId,
          status: result.warnings.length > 0 ? 'partial' : 'success',
          data: result.assessment,
          sourceIds: result.sourceIds,
          warnings: result.warnings,
        })
      );
    }
  );
}
import { NextRequest, NextResponse } from 'next/server';
import { checkRateLimit, getRateLimitHeaders, isSameOrigin } from '@/lib/server/security';
import { withApiRoute } from '@/lib/server/api-route';
import { calculateAccessibility } from '@/lib/server/value-add/accessibility';
import { createEnvelope, parseJsonBody } from '@/lib/server/value-add/common';
import type { AccessibilityQuery } from '@/types/value-add';

function isValidAccessibilityPayload(body: AccessibilityQuery) {
  return typeof body.origin === 'string' && body.origin.trim().length > 0 && (body.mode === 'road' || body.mode === 'transit' || body.mode === 'air');
}

export async function POST(req: NextRequest) {
  return withApiRoute(
    {
      method: 'POST',
      path: '/api/value-add/accessibility',
      fallbackMessage: 'Accessibility calculations are temporarily unavailable. Please try again.',
    },
    async ({ requestId }) => {
      if (!isSameOrigin(req)) {
        return NextResponse.json({ error: 'Invalid request origin.' }, { status: 403 });
      }

      const rateLimit = checkRateLimit(req, { scope: 'value-add-accessibility', limit: 80, windowMs: 60_000 });
      if (rateLimit.limited) {
        return NextResponse.json(
          { error: 'Too many requests. Try again shortly.' },
          { status: 429, headers: getRateLimitHeaders(rateLimit) }
        );
      }

      const body = await parseJsonBody<AccessibilityQuery>(req);
      if (!body || !isValidAccessibilityPayload(body)) {
        return NextResponse.json({ error: 'origin and mode are required.' }, { status: 400 });
      }

      const { result, sourceIds } = calculateAccessibility(body);
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
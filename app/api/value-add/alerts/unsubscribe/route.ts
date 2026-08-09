import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { checkRateLimit, CSRF_COOKIE, getRateLimitHeaders, hasValidCsrf, isSameOrigin } from '@/lib/server/security';
import { withApiRoute } from '@/lib/server/api-route';
import { createEnvelope, parseJsonBody } from '@/lib/server/value-add/common';
import { disableSubscription } from '@/lib/server/value-add/alerts';

interface UnsubscribePayload {
  subscriptionId?: string;
}

export async function POST(req: NextRequest) {
  return withApiRoute(
    {
      method: 'POST',
      path: '/api/value-add/alerts/unsubscribe',
      fallbackMessage: 'Unable to process unsubscribe request right now.',
    },
    async ({ requestId }) => {
      if (!isSameOrigin(req)) {
        return NextResponse.json({ error: 'Invalid request origin.' }, { status: 403 });
      }

      const rateLimit = checkRateLimit(req, { scope: 'value-add-alert-unsubscribe', limit: 20, windowMs: 60_000 });
      if (rateLimit.limited) {
        return NextResponse.json(
          { error: 'Too many requests. Try again shortly.' },
          { status: 429, headers: getRateLimitHeaders(rateLimit) }
        );
      }

      const cookieStore = await cookies();
      const csrfCookie = cookieStore.get(CSRF_COOKIE)?.value;
      if (!hasValidCsrf(req, csrfCookie)) {
        return NextResponse.json({ error: 'CSRF validation failed.' }, { status: 403 });
      }

      const body = await parseJsonBody<UnsubscribePayload>(req);
      const subscriptionId = typeof body?.subscriptionId === 'string' ? body.subscriptionId.trim() : '';
      if (!subscriptionId) {
        return NextResponse.json({ error: 'subscriptionId is required.' }, { status: 400 });
      }

      const result = await disableSubscription(subscriptionId);
      if (!result) {
        return NextResponse.json({ error: 'Subscription not found.' }, { status: 404 });
      }

      return NextResponse.json(
        createEnvelope({
          requestId,
          status: 'success',
          data: result,
          sourceIds: ['brief'],
        })
      );
    }
  );
}
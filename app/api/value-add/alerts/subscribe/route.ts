import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { checkRateLimit, CSRF_COOKIE, getRateLimitHeaders, hasValidCsrf, isSameOrigin } from '@/lib/server/security';
import { withApiRoute } from '@/lib/server/api-route';
import { createEnvelope, parseJsonBody } from '@/lib/server/value-add/common';
import { createSubscription, isValidCadence, isValidPersona } from '@/lib/server/value-add/alerts';
import type { AlertSubscription } from '@/types/value-add';

function normalizeTopics(value: unknown): string[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .filter((topic): topic is string => typeof topic === 'string')
    .map((topic) => topic.trim())
    .filter(Boolean)
    .slice(0, 20);
}

function normalizeGeoFilters(value: unknown): string[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .filter((item): item is string => typeof item === 'string')
    .map((item) => item.trim())
    .filter(Boolean)
    .slice(0, 10);
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(req: NextRequest) {
  return withApiRoute(
    {
      method: 'POST',
      path: '/api/value-add/alerts/subscribe',
      fallbackMessage: 'Unable to create alert subscription at the moment.',
    },
    async ({ requestId }) => {
      if (!isSameOrigin(req)) {
        return NextResponse.json({ error: 'Invalid request origin.' }, { status: 403 });
      }

      const rateLimit = checkRateLimit(req, { scope: 'value-add-alert-subscribe', limit: 20, windowMs: 60_000 });
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

      const body = await parseJsonBody<Partial<AlertSubscription>>(req);
      const email = typeof body?.email === 'string' ? body.email.trim().toLowerCase() : '';
      const persona = typeof body?.persona === 'string' ? body.persona.trim().toLowerCase() : '';
      const cadence = typeof body?.cadence === 'string' ? body.cadence.trim().toLowerCase() : '';
      const topics = normalizeTopics(body?.topics);
      const geofilters = normalizeGeoFilters(body?.geofilters);

      if (!isValidEmail(email) || !isValidPersona(persona) || !isValidCadence(cadence) || topics.length === 0) {
        return NextResponse.json(
          { error: 'email, persona, cadence, and at least one topic are required.' },
          { status: 400 }
        );
      }

      const subscription = await createSubscription({
        email,
        persona,
        topics,
        geofilters,
        cadence,
      });

      return NextResponse.json(
        createEnvelope({
          requestId,
          status: 'success',
          data: subscription,
          sourceIds: ['brief', 'kiadb'],
        }),
        { status: 201 }
      );
    }
  );
}
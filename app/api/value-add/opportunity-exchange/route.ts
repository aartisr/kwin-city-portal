import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { checkRateLimit, CSRF_COOKIE, getRateLimitHeaders, hasValidCsrf, isSameOrigin } from '@/lib/server/security';
import { withApiRoute } from '@/lib/server/api-route';
import { createEnvelope, parseJsonBody } from '@/lib/server/value-add/common';
import {
  createOpportunityLead,
  isValidOpportunityRole,
  listOpportunityLeads,
  normalizeLeadLimit,
} from '@/lib/server/value-add/opportunity-exchange';
import type { OpportunityRequest } from '@/types/value-add';

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function GET(req: NextRequest) {
  return withApiRoute(
    {
      method: 'GET',
      path: '/api/value-add/opportunity-exchange',
      fallbackMessage: 'Opportunity exchange is temporarily unavailable. Please try again.',
    },
    async ({ requestId }) => {
      const limit = normalizeLeadLimit(req.nextUrl.searchParams.get('limit'));
      const data = await listOpportunityLeads(limit);

      return NextResponse.json(
        createEnvelope({
          requestId,
          status: 'success',
          data,
          sourceIds: ['brief'],
        })
      );
    }
  );
}

export async function POST(req: NextRequest) {
  return withApiRoute(
    {
      method: 'POST',
      path: '/api/value-add/opportunity-exchange',
      fallbackMessage: 'Unable to submit opportunity request at the moment.',
    },
    async ({ requestId }) => {
      if (!isSameOrigin(req)) {
        return NextResponse.json({ error: 'Invalid request origin.' }, { status: 403 });
      }

      const rateLimit = checkRateLimit(req, { scope: 'value-add-opportunity-post', limit: 20, windowMs: 60_000 });
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

      const body = await parseJsonBody<Partial<OpportunityRequest>>(req);
      const name = typeof body?.name === 'string' ? body.name.trim() : '';
      const email = typeof body?.email === 'string' ? body.email.trim().toLowerCase() : '';
      const role = typeof body?.role === 'string' ? body.role.trim().toLowerCase() : '';
      const requirement = typeof body?.requirement === 'string' ? body.requirement.trim() : '';
      const budgetBand = typeof body?.budgetBand === 'string' && body.budgetBand.trim().length > 0 ? body.budgetBand.trim() : undefined;

      if (!name || !isValidEmail(email) || !isValidOpportunityRole(role) || !requirement) {
        return NextResponse.json(
          { error: 'name, email, role, and requirement are required.' },
          { status: 400 }
        );
      }

      const lead = await createOpportunityLead({
        name,
        email,
        role,
        requirement,
        budgetBand,
      });

      return NextResponse.json(
        createEnvelope({
          requestId,
          status: 'success',
          data: lead,
          sourceIds: ['brief'],
        }),
        { status: 201 }
      );
    }
  );
}

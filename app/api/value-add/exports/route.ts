import { NextRequest, NextResponse } from 'next/server';
import { checkRateLimit, CSRF_COOKIE, getRateLimitHeaders, hasValidCsrf, isSameOrigin } from '@/lib/server/security';
import { withApiRoute } from '@/lib/server/api-route';
import { createEnvelope, parseJsonBody } from '@/lib/server/value-add/common';
import { getExportJob, isExportType, queueExportJob } from '@/lib/server/value-add/exports';
import type { ExportJobRequest } from '@/types/value-add';
import { cookies } from 'next/headers';

export async function GET(req: NextRequest) {
  return withApiRoute(
    {
      method: 'GET',
      path: '/api/value-add/exports',
      fallbackMessage: 'Export status is temporarily unavailable. Please try again.',
    },
    async ({ requestId }) => {
      const jobId = req.nextUrl.searchParams.get('jobId')?.trim();
      if (!jobId) {
        return NextResponse.json({ error: 'jobId is required.' }, { status: 400 });
      }

      const job = await getExportJob(jobId);
      if (!job) {
        return NextResponse.json({ error: 'Export job not found.' }, { status: 404 });
      }

      return NextResponse.json(
        createEnvelope({
          requestId,
          status: 'success',
          data: job,
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
      path: '/api/value-add/exports',
      fallbackMessage: 'Export request could not be queued. Please try again.',
    },
    async ({ requestId }) => {
      if (!isSameOrigin(req)) {
        return NextResponse.json({ error: 'Invalid request origin.' }, { status: 403 });
      }

      const rateLimit = checkRateLimit(req, { scope: 'value-add-exports', limit: 25, windowMs: 60_000 });
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

      const body = await parseJsonBody<ExportJobRequest>(req);
      if (!body || typeof body.exportType !== 'string' || !isExportType(body.exportType)) {
        return NextResponse.json({ error: 'exportType must be one of: csv, geojson, json.' }, { status: 400 });
      }

      const job = await queueExportJob(body);
      return NextResponse.json(
        createEnvelope({
          requestId,
          status: 'success',
          data: job,
          sourceIds: ['brief'],
        }),
        { status: 202 }
      );
    }
  );
}
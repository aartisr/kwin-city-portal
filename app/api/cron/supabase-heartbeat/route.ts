import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/server/supabase-client';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function isAuthorized(request: NextRequest): boolean {
  const secret = process.env.CRON_SECRET;
  if (secret) {
    return request.headers.get('authorization') === `Bearer ${secret}`;
  }

  if (process.env.NODE_ENV !== 'production') {
    return true;
  }

  return request.headers.get('user-agent') === 'vercel-cron/1.0';
}

/**
 * A low-cost, read-only query that gives a Free-tier Supabase project regular
 * database activity and makes configuration failures visible in Vercel logs.
 */
export async function GET(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ ok: false, error: 'Unauthorized cron request.' }, { status: 401 });
  }

  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return NextResponse.json({
      ok: false,
      error: 'Supabase service-role client is not configured.',
    }, { status: 503 });
  }

  const { error } = await supabase
    .from('seo_agency_runs')
    .select('id', { head: true })
    .limit(1);

  if (error) {
    return NextResponse.json({
      ok: false,
      error: 'Supabase heartbeat query failed.',
    }, { status: 503 });
  }

  return NextResponse.json({
    ok: true,
    service: 'supabase',
    mode: 'read-only',
    checkedAt: new Date().toISOString(),
  });
}

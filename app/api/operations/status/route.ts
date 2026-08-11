import { NextResponse } from 'next/server';
import { getSiteFreshnessStatus } from '@/lib/operations/site-freshness';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
  const freshness = getSiteFreshnessStatus();

  return NextResponse.json(
    {
      service: 'kwin-city-portal',
      operation: 'always-current',
      measuredAt: new Date().toISOString(),
      freshness,
    },
    {
      headers: {
        'Cache-Control': 'no-store, max-age=0',
      },
    }
  );
}

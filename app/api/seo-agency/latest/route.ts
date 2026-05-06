import { NextResponse } from 'next/server';
import { createKwinSeoAgencyRun } from '@/lib/seo-agency/content';
import { getPublishingReadiness } from '@/lib/seo-agency/publisher';
import { getLatestSeoAgencyRun } from '@/lib/seo-agency/store';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
  const storedRun = await getLatestSeoAgencyRun();
  const baseRun = storedRun ?? createKwinSeoAgencyRun();
  const run = {
    ...baseRun,
    publishingReadiness: baseRun.publishingReadiness ?? getPublishingReadiness(),
  };

  return NextResponse.json({
    source: storedRun ? 'stored' : 'generated-fallback',
    run,
  });
}

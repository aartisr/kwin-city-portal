import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';
import { runKwinSeoAgencyJob } from '@/lib/seo-agency/job';
import { getSeoAgencyPersistenceDiagnostics } from '@/lib/seo-agency/store';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 300;

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

export async function GET(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ success: false, error: 'Unauthorized cron request.' }, { status: 401 });
  }

  const startedAt = Date.now();
  const result = await runKwinSeoAgencyJob();

  revalidatePath('/seo-agency');
  revalidatePath(`/seo-agency/articles/${result.run.dailyArticle.slug}`);
  revalidatePath(`/seo-agency/articles/${result.run.dailyArticle.slug}/instagram-image`);
  revalidatePath('/sitemap.xml');
  revalidatePath('/feed.xml');

  return NextResponse.json({
    success: true,
    runDate: result.run.runDate,
    generatedAt: result.run.generatedAt,
    storageBackend: result.storageBackend,
    warning: result.warning,
    persistence: getSeoAgencyPersistenceDiagnostics(),
    durationMs: Date.now() - startedAt,
    topSignal: result.run.newsSignals[0]
      ? {
          title: result.run.newsSignals[0].title,
          source: result.run.newsSignals[0].source,
          relevanceScore: result.run.newsSignals[0].relevanceScore,
        }
      : null,
    publishingReadiness: result.run.publishingReadiness,
    publishAttempts: result.run.publishAttempts,
  });
}

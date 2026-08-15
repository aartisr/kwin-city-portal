import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';
import { runKwinSeoAgencyJob } from '@/lib/seo-agency/job';
import { getSeoAgencyPersistenceDiagnostics } from '@/lib/seo-agency/store';
import { getLatestSeoAgencyRun } from '@/lib/seo-agency/store';
import { beginSchedulerHeartbeat, completeSchedulerHeartbeat, recordVerification } from '@/lib/operations/verification-repository';
import { VERIFICATION_POLICIES } from '@/lib/operations/verification-policy';

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
  const startedAtIso = new Date(startedAt).toISOString();
  const provider = request.headers.get('x-kwin-trigger-provider') === 'github_actions'
    ? 'github_actions' as const
    : request.headers.get('user-agent') === 'vercel-cron/1.0'
      ? 'vercel_cron' as const
      : 'manual' as const;
  const invocationId = request.headers.get('x-github-run-id') ?? crypto.randomUUID();
  const heartbeatKey = `seo-refresh:${provider}:${invocationId}`;
  await beginSchedulerHeartbeat({ idempotencyKey: heartbeatKey, provider, scheduleId: 'kwin-seo-agency-daily', invocationId });
  const result = await runKwinSeoAgencyJob();

  revalidatePath('/seo-agency');
  revalidatePath(`/seo-agency/articles/${result.run.dailyArticle.slug}`);
  revalidatePath(`/seo-agency/articles/${result.run.dailyArticle.slug}/instagram-image`);
  revalidatePath('/sitemap.xml');
  revalidatePath('/feed.xml');

  const persistedRun = result.storageBackend === 'supabase' ? await getLatestSeoAgencyRun() : null;
  const postWriteVerified = persistedRun?.id === result.run.id;
  const contentOutcome = result.liveInputStatus === 'live' && result.storageBackend === 'supabase' && postWriteVerified
    ? 'passed' as const
    : 'partial' as const;
  let evidenceAttemptId: string | null = null;
  let evidenceQualified = false;
  let evidenceWarning: string | undefined;
  try {
    const evidence = await recordVerification({
      idempotencyKey: `content:${result.run.id}`,
      suite: 'content_refresh', outcome: contentOutcome,
      policyVersion: VERIFICATION_POLICIES.content_refresh.version,
      startedAt: startedAtIso, completedAt: new Date().toISOString(),
      commitSha: process.env.VERCEL_GIT_COMMIT_SHA?.toLowerCase(),
      environment: process.env.VERCEL_ENV === 'production' ? 'production' : process.env.NODE_ENV === 'production' ? 'preview' : 'development',
      provider, providerRunId: result.run.id, trigger: provider === 'vercel_cron' ? 'schedule' : 'request',
      controls: [
        { id: 'authorization', required: true, outcome: 'passed' },
        { id: 'source-health', required: true, outcome: result.liveInputStatus === 'live' ? 'passed' : 'failed', summary: result.warning },
        { id: 'live-inputs', required: true, outcome: result.liveInputStatus === 'live' ? 'passed' : 'failed', metrics: { signalCount: result.run.newsSignals.length } },
        { id: 'content-validation', required: true, outcome: 'passed' },
        { id: 'supabase-persistence', required: true, outcome: result.storageBackend === 'supabase' ? 'passed' : 'failed' },
        { id: 'post-write-read', required: true, outcome: postWriteVerified ? 'passed' : 'failed' },
      ],
      manifest: { runId: result.run.id, runDate: result.run.runDate, storageBackend: result.storageBackend, liveInputStatus: result.liveInputStatus },
      failureCode: contentOutcome === 'partial' ? 'content-refresh-not-qualified' : undefined,
      failureSummary: contentOutcome === 'partial' ? (result.warning ?? 'Live input or durable persistence qualification failed.') : undefined,
    });
    evidenceAttemptId = evidence.attempt.id;
    evidenceQualified = evidence.attempt.qualified;
  } catch (error) {
    evidenceWarning = error instanceof Error ? error.message : 'Evidence recording failed.';
  }
  await completeSchedulerHeartbeat(heartbeatKey, {
    outcome: contentOutcome, durationMs: Date.now() - startedAt,
    failureCode: contentOutcome === 'partial' ? 'content-refresh-not-qualified' : evidenceWarning ? 'evidence-recording-failed' : undefined,
  });

  return NextResponse.json({
    success: true,
    runDate: result.run.runDate,
    generatedAt: result.run.generatedAt,
    storageBackend: result.storageBackend,
    liveInputStatus: result.liveInputStatus,
    warning: result.warning,
    persistence: getSeoAgencyPersistenceDiagnostics(),
    durationMs: Date.now() - startedAt,
    evidence: { attemptId: evidenceAttemptId, qualified: evidenceQualified, warning: evidenceWarning },
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

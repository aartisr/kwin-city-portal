import { createKwinSeoAgencyRun } from './content';
import { fetchKwinNewsSignals } from './news';
import { getPublishingReadiness, publishSeoAgencyRun } from './publisher';
import { saveSeoAgencyRun } from './store';
import type { KwinNewsSignal, KwinSeoAgencyRun } from './types';

type AgencyJobResult = {
  run: KwinSeoAgencyRun;
  storageBackend: 'supabase' | 'file';
  liveInputStatus: 'live' | 'fallback';
  warning?: string;
};

export async function runKwinSeoAgencyJob(now = new Date()): Promise<AgencyJobResult> {
  let newsSignals: KwinNewsSignal[] = [];
  let warning: string | undefined;

  try {
    newsSignals = await fetchKwinNewsSignals();
  } catch (error) {
    warning = error instanceof Error ? error.message : 'News signal fetch failed.';
  }

  const draftRun = createKwinSeoAgencyRun({ now, newsSignals });
  const publishing = await publishSeoAgencyRun(draftRun);
  const publishingReadiness = getPublishingReadiness();
  const run = {
    ...createKwinSeoAgencyRun({
      now,
      newsSignals,
      publishAttempts: publishing.attempts,
    }),
    socialQueue: publishing.socialQueue,
    publishingReadiness,
  };

  if (warning) {
    run.healthChecks = [
      {
        label: 'News fetch',
        status: 'warn',
        detail: `Live feed fetch had an issue, so the agency used the evergreen KWIN content reservoir. ${warning}`,
      },
      ...run.healthChecks,
    ];
  }

  const saveResult = await saveSeoAgencyRun(run);

  return {
    run,
    storageBackend: saveResult.backend,
    liveInputStatus: newsSignals.length > 0 && !warning ? 'live' : 'fallback',
    warning: saveResult.warning ?? warning,
  };
}

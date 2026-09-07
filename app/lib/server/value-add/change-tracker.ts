import { KWIN_TIMELINE_PHASES } from '@/data/constants';
import type { ChangeEvent, ChangeTrackerResponse } from '@/types/value-add';

export function getChangeTimeline(limit: number): {
  result: ChangeTrackerResponse;
  sourceIds: string[];
} {
  const events: ChangeEvent[] = KWIN_TIMELINE_PHASES.map((phase) => ({
    id: phase.id,
    category: phase.status,
    title: phase.title,
    date: `${phase.year}-01-01`,
    summary: phase.description,
    sourceIds: ['brief', 'kiadb'],
  }))
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, limit);

  return {
    result: {
      asOf: new Date().toISOString(),
      total: events.length,
      events,
    },
    sourceIds: ['brief', 'kiadb'],
  };
}

export function normalizeLimit(input: string | null): number {
  const parsed = Number.parseInt(input ?? '', 10);
  if (!Number.isFinite(parsed) || parsed <= 0) {
    return 10;
  }

  return Math.min(parsed, 50);
}
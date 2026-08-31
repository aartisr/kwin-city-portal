import type { GazetteNewsItem, GazetteNewsResponse } from '@/types/value-add';

const NEWS_ITEMS: GazetteNewsItem[] = [
  {
    id: 'gazette-01',
    title: 'Land notification update for northern logistics belt',
    category: 'gazette',
    publishedAt: '2026-07-02T00:00:00.000Z',
    summary: 'Notification package refreshed for corridor-linked industrial parcels and adjacent buffers.',
    sourceId: 'kiadb',
  },
  {
    id: 'policy-01',
    title: 'State facilitation desk expands approval workflow guidance',
    category: 'policy',
    publishedAt: '2026-06-21T00:00:00.000Z',
    summary: 'Updated sequencing notes released for investors and project operators.',
    sourceId: 'brief',
  },
  {
    id: 'infra-01',
    title: 'STRR corridor package enters next implementation window',
    category: 'infrastructure',
    publishedAt: '2026-06-10T00:00:00.000Z',
    summary: 'Connectivity-linked works advance with revised execution milestones.',
    sourceId: 'strr',
  },
];

export function getGazetteNews(limit: number): {
  result: GazetteNewsResponse;
  sourceIds: string[];
} {
  const normalizedLimit = Number.isFinite(limit) && limit > 0 ? Math.min(Math.floor(limit), 50) : 10;
  const items = [...NEWS_ITEMS]
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
    .slice(0, normalizedLimit);

  return {
    result: {
      asOf: new Date().toISOString(),
      total: items.length,
      items,
    },
    sourceIds: ['kiadb', 'strr', 'brief'],
  };
}

export function normalizeNewsLimit(input: string | null): number {
  const parsed = Number.parseInt(input ?? '', 10);
  if (!Number.isFinite(parsed) || parsed <= 0) {
    return 10;
  }

  return Math.min(parsed, 50);
}

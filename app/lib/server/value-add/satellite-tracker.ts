import type { SatelliteSnapshot, SatelliteTrackerResponse } from '@/types/value-add';

const SNAPSHOTS: SatelliteSnapshot[] = [
  {
    id: '2025-11',
    month: '2025-11',
    progressScore: 42,
    note: 'Early grading and corridor earthwork visible across phase-1 edge parcels.',
  },
  {
    id: '2026-01',
    month: '2026-01',
    progressScore: 49,
    note: 'Road bed continuity increased across central arterial alignment.',
  },
  {
    id: '2026-03',
    month: '2026-03',
    progressScore: 57,
    note: 'Utility trench signatures expanded near projected service nodes.',
  },
  {
    id: '2026-05',
    month: '2026-05',
    progressScore: 63,
    note: 'Cluster-level site preparation accelerated near planned anchor zones.',
  },
];

export function getSatelliteTracker(limit: number): {
  result: SatelliteTrackerResponse;
  sourceIds: string[];
} {
  const normalizedLimit = Number.isFinite(limit) && limit > 0 ? Math.min(Math.floor(limit), 24) : 6;
  const snapshots = [...SNAPSHOTS].slice(-normalizedLimit).reverse();

  return {
    result: {
      asOf: new Date().toISOString(),
      snapshots,
    },
    sourceIds: ['strr', 'brief'],
  };
}

export function normalizeSnapshotLimit(input: string | null): number {
  const parsed = Number.parseInt(input ?? '', 10);
  if (!Number.isFinite(parsed) || parsed <= 0) {
    return 6;
  }

  return Math.min(parsed, 24);
}

import type { OpenDataResponse } from '@/types/value-add';

export function getOpenDataCatalog(): {
  result: OpenDataResponse;
  sourceIds: string[];
} {
  return {
    result: {
      datasets: [
        {
          id: 'kwin-phase-boundary',
          name: 'KWIN phase boundary extract',
          format: 'geojson',
          coverage: 'Phase 1 and corridor edge overlays',
          updatedAt: '2026-07-30T00:00:00.000Z',
        },
        {
          id: 'corridor-travel-signals',
          name: 'Corridor travel assumptions and deltas',
          format: 'csv',
          coverage: 'Accessibility estimator reference table',
          updatedAt: '2026-07-25T00:00:00.000Z',
        },
        {
          id: 'change-events-feed',
          name: 'Change event feed',
          format: 'json',
          coverage: 'Timeline and source-linked status events',
          updatedAt: '2026-07-28T00:00:00.000Z',
        },
      ],
    },
    sourceIds: ['brief', 'kiadb'],
  };
}

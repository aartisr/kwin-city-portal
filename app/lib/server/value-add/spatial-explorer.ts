import type { SpatialExplorerResponse, SpatialLayer } from '@/types/value-add';

type Phase = SpatialExplorerResponse['phase'];

const LAYERS: SpatialLayer[] = [
  {
    id: 'road-grid-a14',
    title: 'Arterial Grid A-14',
    category: 'transport',
    phase: 'phase-1',
    status: 'available',
    description: 'Primary arterial alignment for phase-1 logistics circulation.',
  },
  {
    id: 'road-grid-b22',
    title: 'Collector Grid B-22',
    category: 'transport',
    phase: 'phase-1',
    status: 'available',
    description: 'Collector road alignment tied to industrial parcel access.',
  },
  {
    id: 'kiadb-buffer',
    title: 'Acquisition Notification Buffers',
    category: 'zoning',
    phase: 'phase-1',
    status: 'available',
    description: 'Preliminary and final notification influence zones.',
  },
  {
    id: 'utility-corridor',
    title: 'Utility Trunk Corridor',
    category: 'utilities',
    phase: 'phase-2',
    status: 'planned',
    description: 'Projected water and power trunk integration corridor.',
  },
  {
    id: 'anchor-clusters',
    title: 'Anchor Investment Clusters',
    category: 'anchor',
    phase: 'phase-2',
    status: 'planned',
    description: 'Planned cluster overlays for anchor tenant concentration.',
  },
  {
    id: 'future-transit',
    title: 'Future Transit Access Belt',
    category: 'transport',
    phase: 'phase-3',
    status: 'planned',
    description: 'Long-range transit-oriented accessibility belt.',
  },
];

export function normalizePhase(input: string | null): Phase {
  const value = (input ?? '').trim().toLowerCase();
  if (value === 'phase-1' || value === 'phase-2' || value === 'phase-3') {
    return value;
  }

  return 'phase-1';
}

export function getSpatialExplorerData(phase: Phase): {
  result: SpatialExplorerResponse;
  sourceIds: string[];
} {
  const layers = LAYERS.filter((layer) => layer.phase === phase);

  return {
    result: {
      phase,
      layers,
      highlights: [
        'Layer status distinguishes available vs planned overlays.',
        'Transport and zoning overlays can be cross-checked with risk and regulatory tools.',
      ],
    },
    sourceIds: ['kiadb', 'strr', 'brief'],
  };
}

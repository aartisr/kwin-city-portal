import type { AcquisitionPhaseVisibility } from '@/components/strategic-map/mapbox';
import type { SpatialExplorerResponse } from '@/types/value-add';

export type SpatialView = { phase: SpatialExplorerResponse['phase']; acquisition: AcquisitionPhaseVisibility };

const PHASES = new Set<SpatialView['phase']>(['phase-1', 'phase-2', 'phase-3']);

export function parseSpatialView(search: string): SpatialView {
  const params = new URLSearchParams(search);
  const rawPhase = params.get('phase') as SpatialView['phase'] | null;
  const visible = new Set((params.get('acquisition') ?? 'phase-1').split(','));
  return {
    phase: rawPhase && PHASES.has(rawPhase) ? rawPhase : 'phase-1',
    acquisition: {
      'phase-1': visible.has('phase-1'),
      'phase-2': visible.has('phase-2'),
      'phase-3': visible.has('phase-3'),
    },
  };
}

export function spatialViewSearch(view: SpatialView) {
  const params = new URLSearchParams({ phase: view.phase });
  const visible = (['phase-1', 'phase-2', 'phase-3'] as const).filter((phase) => view.acquisition[phase]);
  params.set('acquisition', visible.join(','));
  return `?${params.toString()}`;
}

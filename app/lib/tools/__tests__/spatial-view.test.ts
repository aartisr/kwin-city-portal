import { describe, expect, it } from 'vitest';
import { parseSpatialView, spatialViewSearch } from '@/lib/tools/spatial-view';

describe('shareable spatial view', () => {
  it('round-trips a selected phase and acquisition overlays', () => {
    const view = parseSpatialView('?phase=phase-3&acquisition=phase-1%2Cphase-3');
    expect(view).toEqual({ phase: 'phase-3', acquisition: { 'phase-1': true, 'phase-2': false, 'phase-3': true } });
    expect(parseSpatialView(spatialViewSearch(view))).toEqual(view);
  });

  it('fails safely to the default view for unknown state', () => {
    expect(parseSpatialView('?phase=unknown')).toEqual({ phase: 'phase-1', acquisition: { 'phase-1': true, 'phase-2': false, 'phase-3': false } });
  });
});

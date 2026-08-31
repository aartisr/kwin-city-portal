'use client';

import { useState } from 'react';
import StrategicLocationMap from '@/components/StrategicLocationMap';
import type { AcquisitionPhaseId, AcquisitionPhaseVisibility } from './mapbox';

const HIDDEN: AcquisitionPhaseVisibility = {
  'phase-1': false,
  'phase-2': false,
  'phase-3': false,
};

export default function AcquisitionOverlayControls() {
  const [isOpen, setIsOpen] = useState(false);
  const [visibility, setVisibility] = useState<AcquisitionPhaseVisibility>(HIDDEN);

  const togglePhase = (phase: AcquisitionPhaseId) => {
    setVisibility((current) => ({ ...current, [phase]: !current[phase] }));
  };

  const allVisible = visibility['phase-1'] && visibility['phase-2'] && visibility['phase-3'];

  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-amber-200 bg-amber-50/80 px-4 py-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm font-bold text-amber-950">Derived acquisition overlays</p>
            <p className="mt-0.5 text-xs leading-5 text-amber-900">
              Document-derived planning context only — not an authoritative cadastral or acquisition boundary.
            </p>
          </div>
          <button
            type="button"
            aria-expanded={isOpen}
            aria-controls="regional-acquisition-overlays"
            onClick={() => setIsOpen((current) => !current)}
            className="rounded-full border border-amber-300 bg-white px-3 py-1.5 text-xs font-bold text-amber-950 transition-colors hover:bg-amber-100"
          >
            {isOpen ? 'Hide overlays' : 'Show derived overlays'}
          </button>
        </div>

        {isOpen ? (
          <div id="regional-acquisition-overlays" className="mt-3 flex flex-wrap items-center gap-2 border-t border-amber-200 pt-3">
            <button
              type="button"
              onClick={() => setVisibility({ 'phase-1': true, 'phase-2': true, 'phase-3': true })}
              disabled={allVisible}
              className="rounded-full border border-amber-300 bg-white px-2.5 py-1 text-xs font-semibold text-amber-950 hover:bg-amber-100 disabled:opacity-50"
            >
              Show all
            </button>
            {(['phase-1', 'phase-2', 'phase-3'] as const).map((phase) => (
              <label key={phase} className="inline-flex items-center gap-1.5 rounded-full border border-amber-200 bg-white px-2.5 py-1 text-xs font-semibold text-amber-950">
                <input
                  type="checkbox"
                  checked={visibility[phase]}
                  onChange={() => togglePhase(phase)}
                  className="h-3.5 w-3.5 accent-amber-700"
                />
                {phase.replace('-', ' ').replace(/\b\w/g, (letter) => letter.toUpperCase())}
              </label>
            ))}
            <a href="/tools/spatial-explorer" className="ml-auto text-xs font-semibold text-amber-950 underline underline-offset-2 hover:text-amber-800">
              Open full Spatial Explorer →
            </a>
          </div>
        ) : null}
      </div>

      <StrategicLocationMap acquisitionPhaseVisibility={visibility} />
    </div>
  );
}

'use client';

import { useEffect, useState } from 'react';
import StrategicLocationMap from '@/components/StrategicLocationMap';
import type { SpatialExplorerResponse, ValueAddEnvelope } from '@/types/value-add';

type Phase = SpatialExplorerResponse['phase'];

export default function SpatialExplorer() {
  const [phase, setPhase] = useState<Phase>('phase-1');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<ValueAddEnvelope<SpatialExplorerResponse> | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`/api/value-add/spatial-explorer?phase=${encodeURIComponent(phase)}`);
        const payload = (await response.json()) as ValueAddEnvelope<SpatialExplorerResponse> | { error?: string };

        if (!response.ok) {
          if (!cancelled) {
            setError('error' in payload && typeof payload.error === 'string' ? payload.error : 'Unable to load map layers.');
            setResult(null);
          }
          return;
        }

        if (!cancelled) {
          setResult(payload as ValueAddEnvelope<SpatialExplorerResponse>);
        }
      } catch {
        if (!cancelled) {
          setError('Unable to contact the service. Please try again.');
          setResult(null);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    void load();
    return () => {
      cancelled = true;
    };
  }, [phase]);

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 md:p-8 shadow-sm">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Spatial Explorer</h2>
          <p className="mt-2 text-slate-600">Interactive map plus phase-specific zoning, transport, and anchor overlays.</p>
        </div>
        <label className="text-sm font-medium text-slate-700">
          Phase
          <select
            value={phase}
            onChange={(event) => setPhase(event.target.value as Phase)}
            className="ml-2 rounded-xl border border-slate-300 px-3 py-2 text-slate-900 focus:border-slate-500 focus:outline-none"
          >
            <option value="phase-1">Phase 1</option>
            <option value="phase-2">Phase 2</option>
            <option value="phase-3">Phase 3</option>
          </select>
        </label>
      </div>

      <div className="mt-6">
        <StrategicLocationMap />
      </div>

      {loading ? <p className="mt-6 text-sm text-slate-600">Loading layer metadata...</p> : null}
      {error ? <p className="mt-6 text-sm font-medium text-rose-700">{error}</p> : null}

      {result ? (
        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
          {result.data.layers.map((layer) => (
            <article key={layer.id} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <div className="flex items-center justify-between gap-2">
                <h3 className="font-semibold text-slate-900">{layer.title}</h3>
                <span className="rounded-full bg-slate-200 px-2.5 py-1 text-xs font-semibold uppercase text-slate-700">{layer.status}</span>
              </div>
              <p className="mt-1 text-xs uppercase tracking-wide text-slate-500">{layer.category}</p>
              <p className="mt-2 text-sm text-slate-700">{layer.description}</p>
            </article>
          ))}

          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 md:col-span-2">
            <h3 className="font-semibold text-slate-900">Highlights</h3>
            <ul className="mt-2 space-y-1 text-sm text-slate-700">
              {result.data.highlights.map((item) => (
                <li key={item}>- {item}</li>
              ))}
            </ul>
            <p className="mt-3 text-xs text-slate-500">Evidence: {result.evidence.map((item) => item.label).join(', ')}</p>
          </div>
        </div>
      ) : null}
    </section>
  );
}

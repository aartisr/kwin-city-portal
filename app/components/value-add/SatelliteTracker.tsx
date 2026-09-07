'use client';

import { useEffect, useState } from 'react';
import type { SatelliteTrackerResponse, ValueAddEnvelope } from '@/types/value-add';

export default function SatelliteTracker() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<ValueAddEnvelope<SatelliteTrackerResponse> | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch('/api/value-add/satellite-tracker?limit=6');
        const payload = (await response.json()) as ValueAddEnvelope<SatelliteTrackerResponse> | { error?: string };
        if (!response.ok) {
          if (!cancelled) {
            setError('error' in payload && typeof payload.error === 'string' ? payload.error : 'Unable to load satellite tracker.');
            setResult(null);
          }
          return;
        }

        if (!cancelled) {
          setResult(payload as ValueAddEnvelope<SatelliteTrackerResponse>);
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
  }, []);

  if (loading) {
    return <p className="text-sm text-slate-600">Loading satellite progress...</p>;
  }

  if (error) {
    return <p className="text-sm font-medium text-rose-700">{error}</p>;
  }

  if (!result) {
    return null;
  }

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 md:p-8 shadow-sm">
      <h2 className="text-2xl font-bold text-slate-900">Satellite Development Tracker</h2>
      <p className="mt-2 text-slate-600">Month-by-month progression signals from corridor and site-preparation observations.</p>

      <ol className="mt-6 space-y-4">
        {result.data.snapshots.map((snapshot) => (
          <li key={snapshot.id} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="font-semibold text-slate-900">{snapshot.month}</p>
              <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-semibold text-emerald-800">
                Progress {snapshot.progressScore}%
              </span>
            </div>
            <p className="mt-2 text-sm text-slate-700">{snapshot.note}</p>
          </li>
        ))}
      </ol>

      <p className="mt-4 text-xs text-slate-500">As of: {new Date(result.data.asOf).toLocaleString()} | Evidence: {result.evidence.map((item) => item.label).join(', ')}</p>
    </section>
  );
}

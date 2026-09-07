'use client';

import { useEffect, useState } from 'react';
import type { ValuationIndexResponse, ValueAddEnvelope } from '@/types/value-add';

export default function ValuationIndex() {
  const [zone, setZone] = useState('doddaballapur');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<ValueAddEnvelope<ValuationIndexResponse> | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`/api/value-add/valuation?zone=${encodeURIComponent(zone)}`);
        const payload = (await response.json()) as ValueAddEnvelope<ValuationIndexResponse> | { error?: string };

        if (!response.ok) {
          if (!cancelled) {
            setError('error' in payload && typeof payload.error === 'string' ? payload.error : 'Unable to load valuation data.');
            setResult(null);
          }
          return;
        }

        if (!cancelled) {
          setResult(payload as ValueAddEnvelope<ValuationIndexResponse>);
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
  }, [zone]);

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 md:p-8 shadow-sm">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Valuation and Guidance Index</h2>
          <p className="mt-2 text-slate-600">Compare directional market rates and guidance values by zone.</p>
        </div>

        <label className="text-sm font-medium text-slate-700">
          Zone
          <select
            value={zone}
            onChange={(event) => setZone(event.target.value)}
            className="ml-2 rounded-xl border border-slate-300 px-3 py-2 text-slate-900 focus:border-slate-500 focus:outline-none"
          >
            <option value="doddaballapur">Doddaballapur</option>
            <option value="nelamangala">Nelamangala</option>
            <option value="dobbaspet">Dobbaspet</option>
          </select>
        </label>
      </div>

      {loading ? <p className="mt-6 text-sm text-slate-600">Loading valuation index...</p> : null}
      {error ? <p className="mt-6 text-sm font-medium text-rose-700">{error}</p> : null}

      {result ? (
        <div className="mt-6 space-y-4">
          <p className="text-sm text-slate-600">
            Trend: <span className="font-semibold uppercase text-slate-900">{result.data.trend}</span>
          </p>

          <div className="overflow-x-auto rounded-xl border border-slate-200">
            <table className="min-w-full divide-y divide-slate-200 text-sm">
              <thead className="bg-slate-50 text-slate-700">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold">Period</th>
                  <th className="px-4 py-3 text-left font-semibold">Market Rate / sq.ft</th>
                  <th className="px-4 py-3 text-left font-semibold">Guidance Rate / sq.ft</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {result.data.points.map((point) => (
                  <tr key={point.period}>
                    <td className="px-4 py-3 text-slate-800">{point.period}</td>
                    <td className="px-4 py-3 text-slate-800">{point.marketRatePerSqFt.toLocaleString()}</td>
                    <td className="px-4 py-3 text-slate-800">{point.guidanceRatePerSqFt.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <ul className="space-y-1 text-sm text-slate-700">
            {result.data.commentary.map((item) => (
              <li key={item}>- {item}</li>
            ))}
          </ul>

          <p className="text-xs text-slate-500">Evidence: {result.evidence.map((item) => item.label).join(', ')}</p>
        </div>
      ) : null}
    </section>
  );
}

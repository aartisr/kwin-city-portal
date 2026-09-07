'use client';

import { useMemo, useState } from 'react';
import type { RiskAssessment, ValueAddEnvelope } from '@/types/value-add';

export default function RiskCheckForm() {
  const [parcelId, setParcelId] = useState('');
  const [areaName, setAreaName] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<ValueAddEnvelope<RiskAssessment> | null>(null);

  const scoreTone = useMemo(() => {
    if (!result) return 'text-slate-600';
    if (result.data.riskBand === 'high') return 'text-rose-700';
    if (result.data.riskBand === 'medium') return 'text-amber-700';
    return 'text-emerald-700';
  }, [result]);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const lat = latitude.trim().length > 0 ? Number(latitude) : undefined;
    const lng = longitude.trim().length > 0 ? Number(longitude) : undefined;

    if ((lat != null && Number.isNaN(lat)) || (lng != null && Number.isNaN(lng))) {
      setError('Latitude and longitude must be valid numbers.');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/value-add/risk-check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          parcelId: parcelId.trim() || undefined,
          areaName: areaName.trim() || undefined,
          latitude: lat,
          longitude: lng,
        }),
      });

      const payload = (await response.json()) as ValueAddEnvelope<RiskAssessment> | { error?: string };
      if (!response.ok) {
        const message = 'error' in payload && typeof payload.error === 'string' ? payload.error : 'Unable to run risk check.';
        setError(message);
        setResult(null);
        return;
      }

      setResult(payload as ValueAddEnvelope<RiskAssessment>);
    } catch {
      setError('Unable to contact the service. Please try again.');
      setResult(null);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 md:p-8 shadow-sm">
      <h2 className="text-2xl font-bold text-slate-900">Risk Check</h2>
      <p className="mt-2 text-slate-600">
        Submit parcel, area, or coordinates to get a preliminary risk band with evidence-backed context.
      </p>

      <form onSubmit={onSubmit} className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
        <label className="text-sm font-medium text-slate-700">
          Parcel ID
          <input
            className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2 text-slate-900 focus:border-slate-500 focus:outline-none"
            value={parcelId}
            onChange={(event) => setParcelId(event.target.value)}
            placeholder="Ex: DOD-34-LAKE-BLOCK"
          />
        </label>

        <label className="text-sm font-medium text-slate-700">
          Area Name
          <input
            className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2 text-slate-900 focus:border-slate-500 focus:outline-none"
            value={areaName}
            onChange={(event) => setAreaName(event.target.value)}
            placeholder="Ex: North Bengaluru industrial corridor"
          />
        </label>

        <label className="text-sm font-medium text-slate-700">
          Latitude
          <input
            className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2 text-slate-900 focus:border-slate-500 focus:outline-none"
            value={latitude}
            onChange={(event) => setLatitude(event.target.value)}
            placeholder="13.1939"
          />
        </label>

        <label className="text-sm font-medium text-slate-700">
          Longitude
          <input
            className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2 text-slate-900 focus:border-slate-500 focus:outline-none"
            value={longitude}
            onChange={(event) => setLongitude(event.target.value)}
            placeholder="77.6045"
          />
        </label>

        <div className="md:col-span-2 flex flex-wrap items-center gap-3">
          <button
            type="submit"
            disabled={loading}
            className="rounded-xl bg-slate-900 px-5 py-2.5 font-semibold text-white hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? 'Running check...' : 'Run risk check'}
          </button>
          {error ? <span className="text-sm font-medium text-rose-700">{error}</span> : null}
        </div>
      </form>

      {result ? (
        <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-5">
          <div className="flex flex-wrap items-center gap-4">
            <div>
              <p className="text-xs uppercase tracking-wider text-slate-500">Risk band</p>
              <p className={`text-xl font-bold capitalize ${scoreTone}`}>{result.data.riskBand}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-slate-500">Score</p>
              <p className={`text-xl font-bold ${scoreTone}`}>{result.data.score}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-slate-500">Request status</p>
              <p className="text-sm font-semibold text-slate-700">{result.status}</p>
            </div>
          </div>

          <p className="mt-4 text-slate-700">{result.data.summary}</p>

          <div className="mt-4 grid gap-3 md:grid-cols-2">
            <div>
              <h3 className="text-sm font-semibold text-slate-800">Matched signals</h3>
              <ul className="mt-2 space-y-1 text-sm text-slate-700">
                {result.data.matchedSignals.map((signal) => (
                  <li key={signal}>- {signal}</li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-slate-800">Recommendations</h3>
              <ul className="mt-2 space-y-1 text-sm text-slate-700">
                {result.data.recommendations.map((item) => (
                  <li key={item}>- {item}</li>
                ))}
              </ul>
            </div>
          </div>

          {result.warnings.length > 0 ? (
            <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 p-3">
              <p className="text-sm font-semibold text-amber-800">Warnings</p>
              <ul className="mt-1 space-y-1 text-sm text-amber-800">
                {result.warnings.map((warning) => (
                  <li key={warning.code}>- {warning.message}</li>
                ))}
              </ul>
            </div>
          ) : null}

          <p className="mt-4 text-xs text-slate-500">Evidence: {result.evidence.map((item) => item.label).join(', ')}</p>
        </div>
      ) : null}
    </section>
  );
}

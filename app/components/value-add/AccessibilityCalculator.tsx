'use client';

import { useState } from 'react';
import type { AccessibilityResult, ValueAddEnvelope } from '@/types/value-add';

export default function AccessibilityCalculator() {
  const [origin, setOrigin] = useState('KWIN City');
  const [destination, setDestination] = useState('Bengaluru International Airport');
  const [mode, setMode] = useState<'road' | 'transit' | 'air'>('road');
  const [includeProjected, setIncludeProjected] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<ValueAddEnvelope<AccessibilityResult> | null>(null);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await fetch('/api/value-add/accessibility', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          origin: origin.trim(),
          destination: destination.trim() || undefined,
          mode,
          includeProjected,
        }),
      });

      const payload = (await response.json()) as ValueAddEnvelope<AccessibilityResult> | { error?: string };
      if (!response.ok) {
        const message = 'error' in payload && typeof payload.error === 'string' ? payload.error : 'Unable to calculate accessibility.';
        setError(message);
        setResult(null);
        return;
      }

      setResult(payload as ValueAddEnvelope<AccessibilityResult>);
    } catch {
      setError('Unable to contact the service. Please try again.');
      setResult(null);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 md:p-8 shadow-sm">
      <h2 className="text-2xl font-bold text-slate-900">Accessibility Calculator</h2>
      <p className="mt-2 text-slate-600">Estimate travel time and projected improvements for key KWIN routes.</p>

      <form onSubmit={onSubmit} className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
        <label className="text-sm font-medium text-slate-700">
          Origin
          <input
            value={origin}
            onChange={(event) => setOrigin(event.target.value)}
            className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2 text-slate-900 focus:border-slate-500 focus:outline-none"
          />
        </label>

        <label className="text-sm font-medium text-slate-700">
          Destination
          <input
            value={destination}
            onChange={(event) => setDestination(event.target.value)}
            className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2 text-slate-900 focus:border-slate-500 focus:outline-none"
          />
        </label>

        <label className="text-sm font-medium text-slate-700">
          Mode
          <select
            value={mode}
            onChange={(event) => setMode(event.target.value as 'road' | 'transit' | 'air')}
            className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2 text-slate-900 focus:border-slate-500 focus:outline-none"
          >
            <option value="road">Road</option>
            <option value="transit">Transit</option>
            <option value="air">Air-connect</option>
          </select>
        </label>

        <label className="flex items-center gap-2 text-sm font-medium text-slate-700 md:pt-8">
          <input
            type="checkbox"
            checked={includeProjected}
            onChange={(event) => setIncludeProjected(event.target.checked)}
            className="h-4 w-4"
          />
          Include projected corridor improvements
        </label>

        <div className="md:col-span-2 flex items-center gap-3">
          <button
            type="submit"
            disabled={loading}
            className="rounded-xl bg-slate-900 px-5 py-2.5 font-semibold text-white hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? 'Calculating...' : 'Calculate accessibility'}
          </button>
          {error ? <span className="text-sm font-medium text-rose-700">{error}</span> : null}
        </div>
      </form>

      {result ? (
        <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-5">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div>
              <p className="text-xs uppercase tracking-wider text-slate-500">Estimated</p>
              <p className="text-2xl font-bold text-slate-900">{result.data.estimatedMinutes}m</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-slate-500">Projected</p>
              <p className="text-2xl font-bold text-slate-900">{result.data.projectedMinutes != null ? `${result.data.projectedMinutes}m` : 'n/a'}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-slate-500">Delta</p>
              <p className="text-2xl font-bold text-emerald-700">{result.data.deltaMinutes != null ? `-${result.data.deltaMinutes}m` : 'n/a'}</p>
            </div>
          </div>

          <ul className="mt-4 space-y-1 text-sm text-slate-700">
            {result.data.assumptions.map((assumption) => (
              <li key={assumption}>- {assumption}</li>
            ))}
          </ul>

          <p className="mt-4 text-xs text-slate-500">Evidence: {result.evidence.map((item) => item.label).join(', ')}</p>
        </div>
      ) : null}
    </section>
  );
}

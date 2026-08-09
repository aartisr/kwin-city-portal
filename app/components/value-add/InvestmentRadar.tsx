'use client';

import { useEffect, useState } from 'react';
import type { InvestmentRadarResponse, InvestmentSignal, ValueAddEnvelope } from '@/types/value-add';

type Category = InvestmentSignal['category'] | 'all';

export default function InvestmentRadar() {
  const [category, setCategory] = useState<Category>('all');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<ValueAddEnvelope<InvestmentRadarResponse> | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);

      const query = category === 'all' ? '' : `?category=${encodeURIComponent(category)}`;

      try {
        const response = await fetch(`/api/value-add/investment-radar${query}`);
        const payload = (await response.json()) as ValueAddEnvelope<InvestmentRadarResponse> | { error?: string };

        if (!response.ok) {
          if (!cancelled) {
            setError('error' in payload && typeof payload.error === 'string' ? payload.error : 'Unable to load investment radar.');
            setResult(null);
          }
          return;
        }

        if (!cancelled) {
          setResult(payload as ValueAddEnvelope<InvestmentRadarResponse>);
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
  }, [category]);

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 md:p-8 shadow-sm">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Anchor Tenant and Investment Radar</h2>
          <p className="mt-2 text-slate-600">Monitor strategic commitments and stage progression by category.</p>
        </div>

        <label className="text-sm font-medium text-slate-700">
          Category
          <select
            value={category}
            onChange={(event) => setCategory(event.target.value as Category)}
            className="ml-2 rounded-xl border border-slate-300 px-3 py-2 text-slate-900 focus:border-slate-500 focus:outline-none"
          >
            <option value="all">All</option>
            <option value="manufacturing">Manufacturing</option>
            <option value="biotech">Biotech</option>
            <option value="education">Education</option>
            <option value="healthcare">Healthcare</option>
          </select>
        </label>
      </div>

      {loading ? <p className="mt-6 text-sm text-slate-600">Loading investment radar...</p> : null}
      {error ? <p className="mt-6 text-sm font-medium text-rose-700">{error}</p> : null}

      {result ? (
        <div className="mt-6 space-y-3">
          {result.data.signals.map((signal) => (
            <article key={signal.id} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="font-semibold text-slate-900">{signal.organization}</h3>
                <span className="rounded-full bg-slate-200 px-2.5 py-1 text-xs font-semibold uppercase text-slate-700">{signal.stage}</span>
              </div>
              <p className="mt-1 text-xs uppercase tracking-wide text-slate-500">{signal.category}</p>
              {signal.footprintAcres != null ? <p className="mt-1 text-sm text-slate-700">Footprint: {signal.footprintAcres} acres</p> : null}
              <p className="mt-2 text-sm text-slate-700">{signal.note}</p>
            </article>
          ))}
          <p className="text-xs text-slate-500">Evidence: {result.evidence.map((item) => item.label).join(', ')}</p>
        </div>
      ) : null}
    </section>
  );
}

'use client';

import { useEffect, useState } from 'react';
import type { GazetteNewsResponse, ValueAddEnvelope } from '@/types/value-add';

export default function GazetteNewsFeed() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<ValueAddEnvelope<GazetteNewsResponse> | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch('/api/value-add/news-feed?limit=12');
        const payload = (await response.json()) as ValueAddEnvelope<GazetteNewsResponse> | { error?: string };

        if (!response.ok) {
          if (!cancelled) {
            setError('error' in payload && typeof payload.error === 'string' ? payload.error : 'Unable to load news feed.');
            setResult(null);
          }
          return;
        }

        if (!cancelled) {
          setResult(payload as ValueAddEnvelope<GazetteNewsResponse>);
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
    return <p className="text-sm text-slate-600">Loading gazette and policy updates...</p>;
  }

  if (error) {
    return <p className="text-sm font-medium text-rose-700">{error}</p>;
  }

  if (!result) {
    return null;
  }

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 md:p-8 shadow-sm">
      <h2 className="text-2xl font-bold text-slate-900">Gazette and Regulatory News Engine</h2>
      <p className="mt-2 text-slate-600">Structured updates tagged by category and linked to source evidence.</p>

      <ol className="mt-6 space-y-3">
        {result.data.items.map((item) => (
          <li key={item.id} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="font-semibold text-slate-900">{item.title}</p>
              <span className="rounded-full bg-slate-200 px-2.5 py-1 text-xs font-semibold uppercase text-slate-700">{item.category}</span>
            </div>
            <p className="mt-1 text-xs text-slate-500">{new Date(item.publishedAt).toLocaleDateString()}</p>
            <p className="mt-2 text-sm text-slate-700">{item.summary}</p>
          </li>
        ))}
      </ol>

      <p className="mt-4 text-xs text-slate-500">As of: {new Date(result.data.asOf).toLocaleString()} | Evidence: {result.evidence.map((item) => item.label).join(', ')}</p>
    </section>
  );
}

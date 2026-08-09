'use client';

import { useEffect, useState } from 'react';
import type { RegulatoryResponse, ValueAddEnvelope } from '@/types/value-add';

const PERSONAS: RegulatoryResponse['persona'][] = ['citizen', 'resident', 'investor', 'researcher', 'journalist'];

export default function RegulatoryChecklist() {
  const [persona, setPersona] = useState<RegulatoryResponse['persona']>('citizen');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<ValueAddEnvelope<RegulatoryResponse> | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`/api/value-add/regulatory?persona=${encodeURIComponent(persona)}`);
        const payload = (await response.json()) as ValueAddEnvelope<RegulatoryResponse> | { error?: string };

        if (!response.ok) {
          const message = 'error' in payload && typeof payload.error === 'string' ? payload.error : 'Unable to load regulatory checklist.';
          if (!cancelled) {
            setError(message);
            setResult(null);
          }
          return;
        }

        if (!cancelled) {
          setResult(payload as ValueAddEnvelope<RegulatoryResponse>);
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
  }, [persona]);

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 md:p-8 shadow-sm">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Regulatory Navigator</h2>
          <p className="mt-2 text-slate-600">Step-by-step compliance pathway tailored by persona.</p>
        </div>

        <label className="text-sm font-medium text-slate-700">
          Persona
          <select
            value={persona}
            onChange={(event) => setPersona(event.target.value as RegulatoryResponse['persona'])}
            className="ml-2 rounded-xl border border-slate-300 px-3 py-2 text-slate-900 focus:border-slate-500 focus:outline-none"
          >
            {PERSONAS.map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        </label>
      </div>

      {loading ? <p className="mt-6 text-sm text-slate-600">Loading checklist...</p> : null}
      {error ? <p className="mt-6 text-sm font-medium text-rose-700">{error}</p> : null}

      {result ? (
        <div className="mt-6">
          <p className="text-sm text-slate-600">
            Estimated timeline: <span className="font-semibold text-slate-900">{result.data.estimatedTotalDays} days</span>
          </p>

          <ol className="mt-4 space-y-3">
            {result.data.steps.map((step) => (
              <li key={step.id} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <p className="font-semibold text-slate-900">{step.title}</p>
                <p className="mt-1 text-sm text-slate-700">Authority: {step.authority}</p>
                <p className="mt-1 text-sm text-slate-700">Estimated time: {step.estimatedDays} days</p>
                <p className="mt-2 text-xs uppercase tracking-wide text-slate-500">Required documents</p>
                <ul className="mt-1 space-y-1 text-sm text-slate-700">
                  {step.requiredDocuments.map((doc) => (
                    <li key={doc}>- {doc}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>

          <p className="mt-4 text-xs text-slate-500">Evidence: {result.evidence.map((item) => item.label).join(', ')}</p>
        </div>
      ) : null}
    </section>
  );
}

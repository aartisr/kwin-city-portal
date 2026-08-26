'use client';

import { FormEvent, useCallback, useEffect, useRef, useState } from 'react';
import type { OpportunityExchangeResponse, OpportunityLead, ValueAddEnvelope } from '@/types/value-add';

const PARTNER_PATHS: Array<{
  role: OpportunityLead['role'];
  label: string;
  description: string;
  requirementHint: string;
}> = [
  {
    role: 'investor',
    label: 'Investor',
    description: 'Capital, JV, or strategic-entry thesis',
    requirementHint: 'Describe your investment mandate, preferred entry structure, and corridor priorities.',
  },
  {
    role: 'developer',
    label: 'Developer',
    description: 'Industrial, mixed-use, or build-to-suit delivery',
    requirementHint: 'Describe your site, development, or build-to-suit requirement.',
  },
  {
    role: 'institution',
    label: 'Institution',
    description: 'Education, healthcare, or research presence',
    requirementHint: 'Describe your institution type, space or land needs, and intended programme.',
  },
  {
    role: 'operator',
    label: 'Operator',
    description: 'Manufacturing, services, or infrastructure operations',
    requirementHint: 'Describe the operation, infrastructure dependencies, and location needs.',
  },
  {
    role: 'landowner',
    label: 'Landowner',
    description: 'Land context, partnership, or diligence request',
    requirementHint: 'Describe the land context and the type of partnership or diligence you need.',
  },
];

export default function OpportunityExchange() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<OpportunityLead['role']>('investor');
  const [requirement, setRequirement] = useState('');
  const [budgetBand, setBudgetBand] = useState('');
  const [submitState, setSubmitState] = useState<'idle' | 'submitting'>('idle');
  const [submitMessage, setSubmitMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [leads, setLeads] = useState<OpportunityLead[]>([]);
  const csrfRef = useRef('');
  const selectedPath = PARTNER_PATHS.find((path) => path.role === role) ?? PARTNER_PATHS[0];

  const getCsrfToken = useCallback(async () => {
    if (csrfRef.current) return csrfRef.current;

    const response = await fetch('/api/auth/me', { cache: 'no-store' });
    if (!response.ok) return '';

    const payload = (await response.json()) as { csrf?: string };
    const token = typeof payload.csrf === 'string' ? payload.csrf : '';
    if (token) {
      csrfRef.current = token;
    }
    return token;
  }, []);

  async function loadLeads() {
    setError(null);
    try {
      const response = await fetch('/api/value-add/opportunity-exchange?limit=10');
      const payload = (await response.json()) as ValueAddEnvelope<OpportunityExchangeResponse> | { error?: string };

      if (!response.ok) {
        setError('error' in payload && typeof payload.error === 'string' ? payload.error : 'Unable to load exchange board.');
        return;
      }

      setLeads((payload as ValueAddEnvelope<OpportunityExchangeResponse>).data.leads);
    } catch {
      setError('Unable to contact the service. Please try again.');
    }
  }

  useEffect(() => {
    void loadLeads();
    void getCsrfToken();
  }, [getCsrfToken]);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitState('submitting');
    setSubmitMessage(null);
    setError(null);

    try {
      const csrfToken = await getCsrfToken();
      if (!csrfToken) {
        setError('Unable to verify this request. Please refresh and try again.');
        return;
      }

      const response = await fetch('/api/value-add/opportunity-exchange', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-csrf-token': csrfToken,
        },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          role,
          requirement: requirement.trim(),
          budgetBand: budgetBand.trim() || undefined,
        }),
      });

      const payload = (await response.json()) as ValueAddEnvelope<OpportunityLead> | { error?: string };

      if (!response.ok) {
        setError('error' in payload && typeof payload.error === 'string' ? payload.error : 'Unable to submit opportunity request.');
        return;
      }

      const submitted = (payload as ValueAddEnvelope<OpportunityLead>).data;
      setName('');
      setEmail('');
      setRequirement('');
      setBudgetBand('');
      setSubmitMessage(`Request ${submitted.id} submitted with status: ${submitted.status}. Save this reference for follow-up.`);
      await loadLeads();
    } catch {
      setError('Unable to contact the service. Please try again.');
    } finally {
      setSubmitState('idle');
    }
  }

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 md:p-8 shadow-sm">
      <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#6F3F00]">Partner intake</p>
      <h2 className="mt-1 text-2xl font-bold text-slate-900">Start the right KWIN City conversation.</h2>
      <p className="mt-2 max-w-2xl text-slate-600">Choose your path, share only the decision context that matters, and receive a traceable reference for follow-up.</p>

      <fieldset className="mt-6">
        <legend className="text-sm font-semibold text-slate-800">I am exploring KWIN City as a…</legend>
        <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-5">
          {PARTNER_PATHS.map((path) => {
            const selected = path.role === role;
            return (
              <button
                key={path.role}
                type="button"
                onClick={() => setRole(path.role)}
                aria-pressed={selected}
                className={`min-h-24 rounded-xl border p-3 text-left transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600 ${
                  selected
                    ? 'border-amber-300 bg-amber-50 shadow-sm'
                    : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                <span className="block text-sm font-bold text-slate-900">{path.label}</span>
                <span className="mt-1 block text-xs leading-5 text-slate-600">{path.description}</span>
              </button>
            );
          })}
        </div>
      </fieldset>

      <form onSubmit={onSubmit} className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
        <label className="text-sm font-medium text-slate-700">
          Name
          <input
            required
            autoComplete="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2 text-slate-900 focus:border-slate-500 focus:outline-none"
          />
        </label>

        <label className="text-sm font-medium text-slate-700">
          Email
          <input
            required
            type="email"
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2 text-slate-900 focus:border-slate-500 focus:outline-none"
          />
        </label>

        <label className="text-sm font-medium text-slate-700">
          Role
          <select
            value={role}
            onChange={(event) => setRole(event.target.value as OpportunityLead['role'])}
            className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2 text-slate-900 focus:border-slate-500 focus:outline-none"
          >
            <option value="investor">Investor</option>
            <option value="developer">Developer</option>
            <option value="institution">Institution</option>
            <option value="operator">Operator</option>
            <option value="landowner">Landowner</option>
          </select>
        </label>

        <label className="text-sm font-medium text-slate-700">
          Budget Band (optional)
          <input
            value={budgetBand}
            onChange={(event) => setBudgetBand(event.target.value)}
            className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2 text-slate-900 focus:border-slate-500 focus:outline-none"
            placeholder="Ex: INR 10Cr - 25Cr"
          />
        </label>

        <label className="text-sm font-medium text-slate-700 md:col-span-2">
          Requirement
          <textarea
            required
            minLength={20}
            value={requirement}
            onChange={(event) => setRequirement(event.target.value)}
            rows={4}
            className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2 text-slate-900 focus:border-slate-500 focus:outline-none"
            placeholder={selectedPath.requirementHint}
          />
        </label>

        <div className="md:col-span-2 flex flex-wrap items-center gap-3">
          <button
            type="submit"
            disabled={submitState === 'submitting'}
            className="rounded-xl bg-slate-900 px-5 py-2.5 font-semibold text-white hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitState === 'submitting' ? 'Submitting...' : 'Submit requirement'}
          </button>
          {submitMessage ? <span role="status" className="text-sm font-medium text-emerald-700">{submitMessage}</span> : null}
          {error ? <span role="alert" className="text-sm font-medium text-rose-700">{error}</span> : null}
        </div>
        <p className="text-xs leading-5 text-slate-500 md:col-span-2">Your contact details are used only to process this request and are never shown on the public exchange board. A submission is preliminary and does not create an investment, brokerage, partnership, or matching commitment.</p>
      </form>

      <div className="mt-6">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-600">Recent exchange board</h3>
        {leads.length === 0 ? (
          <p className="mt-2 text-sm text-slate-600">No active submissions yet.</p>
        ) : (
          <ul className="mt-3 space-y-2">
            {leads.map((lead) => (
              <li key={lead.id} className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                <p className="text-sm font-semibold text-slate-900">{lead.role} - {lead.status}</p>
                <p className="mt-1 text-sm text-slate-700">{lead.requirement}</p>
                {lead.budgetBand ? <p className="mt-1 text-xs text-slate-600">Budget: {lead.budgetBand}</p> : null}
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}

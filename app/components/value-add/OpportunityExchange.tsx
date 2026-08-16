'use client';

import { FormEvent, useEffect, useState } from 'react';
import type { OpportunityExchangeResponse, OpportunityLead, ValueAddEnvelope } from '@/types/value-add';

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
  }, []);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitState('submitting');
    setSubmitMessage(null);
    setError(null);

    try {
      const response = await fetch('/api/value-add/opportunity-exchange', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
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
      <h2 className="text-2xl font-bold text-slate-900">Investor and Developer Matchmaking</h2>
      <p className="mt-2 text-slate-600">Submit requirements and monitor recent exchange demand on the corridor board.</p>

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
            placeholder="Describe land requirement, JV preference, or built-to-suit request"
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
        <p className="text-xs leading-5 text-slate-500 md:col-span-2">Your contact details are used to process this requirement and are not displayed on the public exchange board. Submissions are preliminary and do not create an investment, brokerage, or matching commitment.</p>
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

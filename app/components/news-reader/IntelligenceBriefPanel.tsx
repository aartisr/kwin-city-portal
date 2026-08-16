'use client';

import { useState } from 'react';
import { buildIntelligenceBrief } from './intelligence-brief';
import type { IntelligenceLens, ReaderCluster, ReaderItem, ReaderLocale } from './types';
import { formatDate } from './utils';

const LENSES: Array<{ id: IntelligenceLens; label: string }> = [
  { id: 'resident', label: 'Resident' },
  { id: 'investor', label: 'Investor' },
  { id: 'government', label: 'Government' },
  { id: 'researcher', label: 'Researcher' },
];

const STATUS_STYLES = {
  'confirmed-primary': 'border-emerald-200 bg-emerald-50 text-emerald-900',
  corroborated: 'border-cyan-200 bg-cyan-50 text-cyan-950',
  'publisher-reported': 'border-amber-200 bg-amber-50 text-amber-950',
  'discovery-only': 'border-slate-300 bg-slate-50 text-slate-800',
};

export function IntelligenceBriefPanel({ item, cluster, locale }: {
  item: ReaderItem;
  cluster?: ReaderCluster;
  locale: ReaderLocale;
}) {
  const brief = buildIntelligenceBrief(item, cluster);
  const [lens, setLens] = useState<IntelligenceLens>('resident');
  const [question, setQuestion] = useState<string | null>(null);

  return (
    <div className="space-y-6" data-testid="kwin-intelligence-brief">
      <section aria-labelledby="brief-title" className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 bg-gradient-to-r from-slate-950 to-cyan-950 px-5 py-4 text-white">
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-cyan-200">KWIN intelligence brief</p>
          <h2 id="brief-title" className="mt-1 text-lg font-extrabold">What happened</h2>
        </div>
        <div className="space-y-4 p-5">
          <p className="text-sm leading-7 text-slate-700">{brief.whatHappened}</p>
          <div className={`rounded-xl border p-3 text-sm ${STATUS_STYLES[brief.evidenceStatus]}`}>
            <p className="font-bold">{brief.evidenceLabel}</p>
            <p className="mt-1 text-xs leading-5 opacity-80">This label describes evidence present in this cluster. It is not a guarantee that every claim in the article is true.</p>
          </div>
        </div>
      </section>

      <section aria-labelledby="impact-title">
        <p id="impact-title" className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">KWIN impact lens</p>
        <div className="mt-3 flex flex-wrap gap-2" role="tablist" aria-label="Choose an impact perspective">
          {LENSES.map((entry) => (
            <button
              key={entry.id}
              type="button"
              role="tab"
              aria-selected={lens === entry.id}
              onClick={() => setLens(entry.id)}
              className={`rounded-full border px-3 py-1.5 text-xs font-bold transition ${lens === entry.id ? 'border-cyan-800 bg-cyan-900 text-white' : 'border-slate-200 bg-white text-slate-700 hover:border-cyan-400'}`}
            >
              {entry.label}
            </button>
          ))}
        </div>
        <p role="tabpanel" className="mt-3 rounded-xl border border-cyan-100 bg-cyan-50/70 p-4 text-sm leading-6 text-slate-700">
          {brief.lensCopy[lens]}
        </p>
      </section>

      <section className="grid gap-3 sm:grid-cols-2" aria-label="Evidence ledger">
        <div className="rounded-xl border border-emerald-200 bg-emerald-50/60 p-4">
          <p className="text-xs font-bold uppercase tracking-[0.12em] text-emerald-900">What we know</p>
          <ul className="mt-2 space-y-2 text-sm leading-5 text-slate-700">
            {brief.known.map((value) => <li key={value}>✓ {value}</li>)}
          </ul>
        </div>
        <div className="rounded-xl border border-amber-200 bg-amber-50/60 p-4">
          <p className="text-xs font-bold uppercase tracking-[0.12em] text-amber-950">What we do not know</p>
          <ul className="mt-2 space-y-2 text-sm leading-5 text-slate-700">
            {brief.unknown.length ? brief.unknown.map((value) => <li key={value}>? {value}</li>) : <li>No material metadata gaps detected; article claims still require source review.</li>}
          </ul>
        </div>
      </section>

      <section aria-labelledby="timeline-title">
        <div className="flex items-center justify-between gap-3">
          <p id="timeline-title" className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">Coverage timeline</p>
          <span className="text-[11px] text-slate-500">Oldest → newest</span>
        </div>
        <ol className="mt-3 border-l-2 border-cyan-200 pl-4">
          {brief.timeline.map((event, index) => (
            <li key={`${event.source}-${event.at}-${index}`} className="relative pb-4 last:pb-0">
              <span className="absolute -left-[1.32rem] top-1 h-2.5 w-2.5 rounded-full border-2 border-white bg-cyan-700" aria-hidden="true" />
              <p className="text-xs font-bold text-slate-500">{formatDate(event.at, locale)} · {event.source}</p>
              <p className="mt-1 text-sm font-semibold leading-5 text-slate-800">{event.label}</p>
              <p className="mt-1 text-[11px] text-slate-500">{event.provenance.replace(/-/g, ' ')}</p>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="ask-title" className="rounded-2xl border border-indigo-200 bg-indigo-50/60 p-4">
        <p id="ask-title" className="text-xs font-bold uppercase tracking-[0.14em] text-indigo-950">Ask KWIN · evidence-only</p>
        <p className="mt-1 text-xs leading-5 text-slate-600">Answers below are deterministic summaries of visible metadata. They do not infer missing article content.</p>
        <div className="mt-3 space-y-2">
          {brief.questions.map((entry) => (
            <div key={entry.id}>
              <button
                type="button"
                aria-expanded={question === entry.id}
                onClick={() => setQuestion((current) => current === entry.id ? null : entry.id)}
                className="flex w-full items-center justify-between gap-3 rounded-lg border border-indigo-100 bg-white px-3 py-2 text-left text-sm font-bold text-slate-800 hover:border-indigo-300"
              >
                {entry.question}<span aria-hidden="true">{question === entry.id ? '−' : '+'}</span>
              </button>
              {question === entry.id ? <p className="px-3 py-3 text-sm leading-6 text-slate-700">{entry.answer}</p> : null}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

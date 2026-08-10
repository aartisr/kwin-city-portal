'use client';

import { useMemo, useState } from 'react';
import { KWIN_SOURCE_REGISTRY } from '@/data/constants';

type SourceReferencesProps = {
  sourceIds: string[];
  heading?: string;
  compact?: boolean;
};

const statusStyles = {
  verified: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  'pending-verification': 'bg-amber-50 text-amber-700 border-amber-200',
  contextual: 'bg-blue-50 text-blue-700 border-blue-200',
};

export default function SourceReferences({
  sourceIds,
  heading = 'Referenced sources',
  compact = false,
}: SourceReferencesProps) {
  const [expanded, setExpanded] = useState(!compact);

  const sources = sourceIds
    .map((id) => KWIN_SOURCE_REGISTRY[id])
    .filter(Boolean);

  const sourceSummary = useMemo(() => {
    const summary = {
      verified: 0,
      pending: 0,
      contextual: 0,
    };

    for (const source of sources) {
      if (source.status === 'verified') {
        summary.verified += 1;
      } else if (source.status === 'pending-verification') {
        summary.pending += 1;
      } else {
        summary.contextual += 1;
      }
    }

    return summary;
  }, [sources]);

  const headerTone = compact
    ? 'rounded-xl border border-slate-200 bg-slate-50/90 px-3.5 py-3'
    : 'rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5';

  return (
    <section className={`rounded-2xl border border-gray-200 bg-white/85 ${compact ? 'p-3.5' : 'p-5'}`} aria-label={heading}>
      <div className={headerTone}>
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className={`${compact ? 'text-sm' : 'text-base'} font-semibold text-gray-900`}>{heading}</p>
            <p className="mt-0.5 text-xs text-slate-600">
              {sources.length} source{sources.length === 1 ? '' : 's'} linked
            </p>
          </div>
          <button
            type="button"
            onClick={() => setExpanded((value) => !value)}
            aria-expanded={expanded}
            className="inline-flex items-center gap-1.5 rounded-full border border-slate-300 bg-white px-2.5 py-1.5 text-xs font-semibold text-slate-800 hover:bg-slate-100"
          >
            <span>{expanded ? 'Hide details' : 'Show details'}</span>
            <svg
              className={`h-3 w-3 transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`}
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 7l5 6 5-6" />
            </svg>
          </button>
        </div>

        <div className="mt-2.5 flex flex-wrap gap-1.5">
          <span className="rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[11px] font-semibold text-emerald-800">
            Primary: {sourceSummary.verified}
          </span>
          <span className="rounded-full border border-amber-200 bg-amber-50 px-2 py-0.5 text-[11px] font-semibold text-amber-800">
            Pending: {sourceSummary.pending}
          </span>
          <span className="rounded-full border border-blue-200 bg-blue-50 px-2 py-0.5 text-[11px] font-semibold text-blue-800">
            Contextual: {sourceSummary.contextual}
          </span>
        </div>
      </div>

      {expanded ? (
        <div className={`space-y-3 ${compact ? 'mt-3' : 'mt-4'}`}>
          {sources.map((source) => (
            <div key={source.id} className="rounded-xl border border-gray-100 bg-gray-50 px-4 py-3">
              <div className="mb-1.5 flex flex-wrap items-center gap-2">
                <span className="text-xs font-semibold text-gray-500">{source.label}</span>
                <span className={`rounded-full border px-2 py-0.5 text-[11px] font-semibold ${statusStyles[source.status]}`}>
                  {source.status === 'pending-verification'
                    ? 'Pending primary verification'
                    : source.status === 'verified'
                      ? 'Primary source'
                      : 'Contextual source'}
                </span>
              </div>

              <div className="text-sm font-medium text-gray-900">{source.title}</div>
              <div className="mb-2 text-xs text-gray-500">{source.publisher}</div>
              <p className="mb-0 text-sm leading-6 text-gray-700">{source.note}</p>
              {source.url ? (
                <a
                  href={source.url}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-2 inline-flex text-sm font-semibold text-blue-700 hover:text-blue-800"
                >
                  Open source
                </a>
              ) : null}
            </div>
          ))}
        </div>
      ) : null}
    </section>
  );
}
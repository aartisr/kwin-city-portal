'use client';

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
  const sources = sourceIds
    .map((id) => KWIN_SOURCE_REGISTRY[id])
    .filter(Boolean);

  return (
    <div className={`rounded-2xl border border-gray-200 bg-white/80 ${compact ? 'p-4' : 'p-5'}`}>
      <div className="flex items-center justify-between gap-4 mb-4">
        <h3 className={`${compact ? 'text-sm' : 'text-base'} font-semibold text-gray-900`}>{heading}</h3>
        <span className="text-xs uppercase tracking-[0.18em] text-gray-400">Source basis</span>
      </div>

      <div className="space-y-3">
        {sources.map((source) => (
          <div key={source.id} className="rounded-xl border border-gray-100 bg-gray-50 px-4 py-3">
            <div className="flex flex-wrap items-center gap-2 mb-1.5">
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
            <div className="text-xs text-gray-500 mb-2">{source.publisher}</div>
            <p className="text-sm text-gray-700 leading-6 mb-0">{source.note}</p>
            {source.url ? (
              <a
                href={source.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex mt-2 text-sm font-semibold text-blue-600 hover:text-blue-700"
              >
                Open source
              </a>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}
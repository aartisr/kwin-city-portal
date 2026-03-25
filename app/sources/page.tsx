import type { Metadata } from 'next';
import Link from 'next/link';
import {
  KWIN_CLAIM_MAPPINGS,
  KWIN_SOURCE_REGISTRY,
} from '@/data/constants';

export const metadata: Metadata = {
  title: 'Sources | KWIN City Research Portal',
  description: 'Source registry and claim-to-source mapping for KWIN City website content.',
};

const statusStyles = {
  verified: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  'pending-verification': 'bg-amber-50 text-amber-700 border-amber-200',
  contextual: 'bg-blue-50 text-blue-700 border-blue-200',
};

const sources = Object.values(KWIN_SOURCE_REGISTRY);

export default function SourcesPage() {
  return (
    <main className="min-h-screen bg-gray-50 pt-24 pb-16">
      <div className="container">
        <div className="max-w-4xl mb-10">
          <Link href="/" className="text-sm font-semibold text-blue-600 hover:text-blue-700">
            Back to homepage
          </Link>
          <h1 className="text-5xl font-bold text-gray-900 mt-4 mb-4">Sources and Claim Ledger</h1>
          <p className="text-lg text-gray-600 max-w-3xl">
            This page shows the source basis for the KWIN City portal. It separates primary references, pending primary
            verification, and contextual regional evidence so readers can see exactly what each claim rests on.
          </p>
        </div>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-5">Source Registry</h2>
          <div className="grid grid-cols-1 gap-4">
            {sources.map((source) => (
              <article id={source.id} key={source.id} className="rounded-2xl border border-gray-200 bg-white p-6">
                <div className="flex flex-wrap items-start justify-between gap-4 mb-3">
                  <div>
                    <div className="text-xs font-semibold tracking-[0.18em] text-gray-400 mb-2">{source.label}</div>
                    <h3 className="text-xl font-semibold text-gray-900">{source.title}</h3>
                    <p className="text-sm text-gray-500 mt-1">{source.publisher}</p>
                  </div>
                  <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${statusStyles[source.status]}`}>
                    {source.status === 'pending-verification'
                      ? 'Pending primary verification'
                      : source.status === 'verified'
                        ? 'Primary source'
                        : 'Contextual source'}
                  </span>
                </div>
                <p className="text-gray-700 leading-7 mb-3">{source.note}</p>
                {source.url ? (
                  <a href={source.url} target="_blank" rel="noreferrer" className="text-sm font-semibold text-blue-600 hover:text-blue-700">
                    Open source
                  </a>
                ) : (
                  <div className="text-sm text-gray-500">Internal project brief; no public URL attached.</div>
                )}
              </article>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-5">Claim Mapping</h2>
          <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white">
            <table className="min-w-full text-left text-sm">
              <thead className="border-b border-gray-200 bg-gray-50">
                <tr>
                  <th className="px-5 py-4 font-semibold text-gray-900">Section</th>
                  <th className="px-5 py-4 font-semibold text-gray-900">Claim</th>
                  <th className="px-5 py-4 font-semibold text-gray-900">Status</th>
                  <th className="px-5 py-4 font-semibold text-gray-900">Sources</th>
                </tr>
              </thead>
              <tbody>
                {KWIN_CLAIM_MAPPINGS.map((item) => (
                  <tr key={item.id} className="border-b border-gray-100 last:border-b-0">
                    <td className="px-5 py-4 align-top text-gray-700">{item.section}</td>
                    <td className="px-5 py-4 align-top text-gray-900 leading-7">{item.claim}</td>
                    <td className="px-5 py-4 align-top">
                      <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${statusStyles[item.status]}`}>
                        {item.status === 'pending-verification'
                          ? 'Pending primary verification'
                          : item.status === 'verified'
                            ? 'Primary source'
                            : 'Contextual'}
                      </span>
                    </td>
                    <td className="px-5 py-4 align-top">
                      <div className="flex flex-wrap gap-2">
                        {item.sourceIds.map((sourceId) => {
                          const source = KWIN_SOURCE_REGISTRY[sourceId];
                          return (
                            <Link
                              key={sourceId}
                              href={`#${source.id}`}
                              className="rounded-full border border-gray-300 px-3 py-1 text-xs font-semibold text-gray-700 hover:border-blue-300 hover:text-blue-700"
                            >
                              {source.label}
                            </Link>
                          );
                        })}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
}
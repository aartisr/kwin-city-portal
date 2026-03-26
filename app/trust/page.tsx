import type { Metadata } from 'next';
import Link from 'next/link';
import SiteFrame from '@/components/SiteFrame';
import SourceReferences from '@/components/SourceReferences';

export const metadata: Metadata = {
  title: 'Trust Center | Authenticity, Attribution, and Originality',
  description:
    'The KWIN City Trust Center: our authenticity standards, source-attribution protocol, originality rules, and verification boundaries.',
  alternates: {
    canonical: 'https://kwin-city.com/trust',
  },
};

const PRINCIPLES = [
  {
    title: 'Primary Source First',
    body: 'Project-critical facts are prioritized from KIADB and official institutional records. Secondary narratives are clearly labeled as context.',
  },
  {
    title: 'Verification Status Always Visible',
    body: 'Claims are marked as primary, pending-verification, or contextual. Ambiguity is disclosed instead of hidden.',
  },
  {
    title: 'Attribution by Default',
    body: 'Every substantive section is designed to expose source lineage and give direct access to references.',
  },
  {
    title: 'Original Editorial Synthesis',
    body: 'Interpretation, framing, and analysis are original. External materials are cited, not copied or repackaged as proprietary claims.',
  },
  {
    title: 'Evidence Boundaries',
    body: 'We explicitly state what evidence can prove and cannot prove. Context is not presented as confirmation.',
  },
  {
    title: 'Open Auditability',
    body: 'Readers can inspect the full claim-to-source chain through the Source Ledger and Evidence Vault.',
  },
] as const;

export default function TrustPage() {
  return (
    <SiteFrame>
      <main className="bg-[linear-gradient(180deg,#f8fafc_0%,#ffffff_35%,#f8fafc_100%)]">
        <section className="pt-28 pb-14 border-b border-slate-200">
          <div className="container">
            <p className="text-xs font-bold tracking-[0.24em] uppercase text-cyan-700 mb-4">Trust Center</p>
            <h1 className="text-4xl md:text-6xl font-black text-slate-900 max-w-5xl leading-tight">
              Authenticity and Originality Are Product Requirements
            </h1>
            <p className="mt-5 text-base md:text-lg text-slate-700 max-w-4xl leading-8">
              Trust is treated as infrastructure. This portal is built so evidence, attribution, and uncertainty are
              visible by design across pages, not hidden in legal fine print.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/sources" className="rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800">
                Open Source Ledger
              </Link>
              <Link href="/evidence" className="rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50">
                Inspect Evidence Vault
              </Link>
              <Link href="/news-intelligence" className="rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50">
                Monitor News Intelligence
              </Link>
            </div>
          </div>
        </section>

        <section className="py-14">
          <div className="container grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-5">
            {PRINCIPLES.map((item) => (
              <article key={item.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="text-xl font-extrabold text-slate-900 mb-2">{item.title}</h2>
                <p className="text-sm text-slate-700 leading-7">{item.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="pb-16">
          <div className="container grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            <article className="rounded-2xl border border-amber-200 bg-amber-50 p-6">
              <h2 className="text-2xl font-extrabold text-amber-900 mb-3">Authenticity Scope</h2>
              <ul className="space-y-2 text-sm text-amber-900 leading-7">
                <li>Strategic interpretation is editorial and original to this portal.</li>
                <li>Third-party facts remain owned by their original publishers and are attributed.</li>
                <li>Pending-verification statements are intentionally not framed as institutional confirmation.</li>
                <li>Readers should rely on primary records for legal, investment, or regulatory decisions.</li>
              </ul>
            </article>
            <SourceReferences sourceIds={['kiadb', 'brief', 'economicSurvey', 'aviation']} heading="Core trust anchors" />
          </div>
        </section>
      </main>
    </SiteFrame>
  );
}

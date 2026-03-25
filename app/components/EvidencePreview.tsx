import Link from 'next/link';
import { KWIN_EVIDENCE_SOURCES } from '@/data/constants';

export default function EvidencePreview() {
  const preview = KWIN_EVIDENCE_SOURCES.slice(0, 3);

  return (
    <section
      className="section relative overflow-hidden bg-[linear-gradient(160deg,#0D1333_0%,#040714_100%)]"
    >
      {/* Gold orb */}
      <div
        className="absolute top-0 right-0 w-[500px] h-[500px] pointer-events-none bg-[radial-gradient(circle_at_80%_0%,rgba(245,166,35,0.08),transparent_55%)]"
      />

      <div className="container relative z-10">
        <div className="max-w-3xl mb-12">
          <div className="eyebrow text-[#F5A623] mb-3">Research Foundation</div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-5 leading-tight">
            Every claim.{' '}
            <span className="gradient-text-gold">
              Every source.
            </span>{' '}
            In full.
          </h2>
          <p className="text-lg text-[#94A3B8] leading-relaxed max-w-2xl">
            Transparency is how we earn your trust. This portal was built from the ground up with every substantive
            claim traced to a published source — and every limitation clearly stated. Here is a preview.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-10">
          {preview.map((source) => (
            <article
              key={source.id}
              className="rounded-2xl border border-white/8 p-6 transition-colors hover:border-white/14 bg-[rgba(255,255,255,0.04)]"
            >
              <div className="eyebrow text-[#64748B] mb-3">{source.publisher}</div>
              <h3 className="text-xl font-bold text-white mb-3">{source.title}</h3>
              <p className="text-[#94A3B8] text-sm leading-7">{source.summary}</p>
            </article>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/evidence" className="btn btn-primary">
            Open Evidence Vault
          </Link>
          <Link href="/sources" className="btn btn-outline-light">
            Review Claim Ledger
          </Link>
        </div>
      </div>
    </section>
  );
}


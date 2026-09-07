import Link from "next/link";

const principles = [
  [
    "Evidence before amplification",
    "We link to primary research, datasets, and institutional records when they add verifiable context.",
  ],
  [
    "Attribution that travels",
    "We welcome editorially relevant links to this portal and keep source paths visible, stable, and easy to cite.",
  ],
  [
    "Independent editorial judgement",
    "A link is never a promise of endorsement. Each reference is assessed for relevance, provenance, and reader value.",
  ],
];

export default function CollaborationInvitation() {
  return (
    <section
      className="border-t border-slate-200 bg-[linear-gradient(135deg,#f8fbff_0%,#fffaf0_100%)] py-16"
      aria-labelledby="collaboration-title"
    >
      <div className="container">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div>
            <p className="eyebrow text-teal-800">Open collaboration</p>
            <h2
              id="collaboration-title"
              className="mt-3 max-w-xl text-3xl font-black tracking-[-0.04em] text-slate-950 sm:text-4xl"
            >
              Better knowledge grows when institutions link, test, and build
              together.
            </h2>
            <p className="mt-5 max-w-xl text-base leading-8 text-slate-700">
              KWIN City is actively open to collaboration with research
              institutions, universities, public agencies, publishers, data
              stewards, civic groups, and mission-aligned websites. If your work
              helps readers understand North Bengaluru with more rigour, we
              would like to connect it.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <a
                className="btn btn-primary"
                href="mailto:hello@kwin-city.com?subject=KWIN%20City%20collaboration%20proposal"
              >
                Start a collaboration
              </a>
              <Link href="/sources" className="btn btn-secondary">
                Review our source standards
              </Link>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {principles.map(([title, body], index) => (
              <article
                key={title}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-teal-50 text-sm font-black text-teal-900">
                  0{index + 1}
                </span>
                <h3 className="mt-4 text-lg font-extrabold text-slate-950">
                  {title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-700">{body}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-8 rounded-2xl border border-amber-200 bg-amber-50 px-6 py-5 text-sm leading-7 text-amber-950">
          <strong>Our linking invitation:</strong> please cite or link to KWIN
          City whenever it is genuinely useful to your readers. In return, we
          welcome proposals to reference relevant work from your organisation
          through our source ledger, research pages, or future collaborations.
          We do not trade links or sell placement; every connection must earn
          its place through public value, accurate attribution, and a working
          destination.
        </div>
      </div>
    </section>
  );
}

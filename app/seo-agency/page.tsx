import type { Metadata } from 'next';
import Link from 'next/link';
import JsonLd from '@/components/JsonLd';
import SiteFrame from '@/components/SiteFrame';
import { SITE_CONFIG } from '@/config/site.config';
import { createKwinSeoAgencyRun } from '@/lib/seo-agency/content';
import { getPublishingReadiness } from '@/lib/seo-agency/publisher';
import { getLatestSeoAgencyRun } from '@/lib/seo-agency/store';
import type { AgencyReadinessCheck, AgencySnapshot, EvidenceStatus, KwinSeoAgencyRun, SocialPostDraft } from '@/lib/seo-agency/types';

export const dynamic = 'force-dynamic';

const PAGE_URL = `${SITE_CONFIG.url}/seo-agency`;

export const metadata: Metadata = {
  title: 'KWIN City SEO Agency | Daily News, Social, Weekly, Monthly & Yearly Snapshots',
  description:
    'A daily KWIN City content engine that turns source-mapped news signals into SEO briefs, social drafts, and weekly, monthly, and yearly strategy snapshots.',
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: 'KWIN City SEO Agency — Daily Source-Led Publishing Desk',
    description:
      'Daily KWIN City content briefs, relevance scoring, social publishing queue, and strategic snapshots for high-trust local search growth.',
    url: PAGE_URL,
    type: 'website',
    images: [{ url: `${SITE_CONFIG.url}/opengraph-image` }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'KWIN City SEO Agency — Daily Source-Led Publishing Desk',
    description:
      'Daily KWIN City content briefs, relevance scoring, social publishing queue, and strategic snapshots for high-trust local search growth.',
    images: [`${SITE_CONFIG.url}/opengraph-image`],
  },
};

function formatDate(iso: string): string {
  return new Intl.DateTimeFormat('en-IN', {
    dateStyle: 'medium',
    timeZone: 'Asia/Kolkata',
  }).format(new Date(iso));
}

function formatDateTime(iso: string): string {
  return new Intl.DateTimeFormat('en-IN', {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: 'Asia/Kolkata',
  }).format(new Date(iso));
}

function evidenceClass(status: EvidenceStatus): string {
  if (status === 'verified') return 'border-emerald-200 bg-emerald-50 text-emerald-800';
  if (status === 'pending') return 'border-amber-200 bg-amber-50 text-amber-800';
  return 'border-slate-200 bg-slate-100 text-slate-700';
}

function publishClass(status: SocialPostDraft['publishStatus']): string {
  if (status === 'published') return 'border-emerald-200 bg-emerald-50 text-emerald-800';
  if (status === 'failed') return 'border-rose-200 bg-rose-50 text-rose-800';
  if (status === 'queued') return 'border-cyan-200 bg-cyan-50 text-cyan-800';
  return 'border-slate-200 bg-slate-100 text-slate-700';
}

function snapshotAccent(snapshot: AgencySnapshot): string {
  if (snapshot.cadence === 'daily') return 'border-l-cyan-500';
  if (snapshot.cadence === 'weekly') return 'border-l-amber-500';
  if (snapshot.cadence === 'monthly') return 'border-l-emerald-500';
  return 'border-l-slate-900';
}

function readinessClass(status: AgencyReadinessCheck['status']): string {
  if (status === 'ready') return 'bg-emerald-100 text-emerald-800';
  if (status === 'blocked') return 'bg-rose-100 text-rose-800';
  if (status === 'manual') return 'bg-slate-200 text-slate-700';
  return 'bg-amber-100 text-amber-900';
}

function getSchema(run: KwinSeoAgencyRun) {
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_CONFIG.url },
        { '@type': 'ListItem', position: 2, name: 'SEO Agency', item: PAGE_URL },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      '@id': `${PAGE_URL}#agency`,
      url: PAGE_URL,
      name: 'KWIN City SEO Agency',
      description: run.mission,
      dateModified: run.generatedAt,
      hasPart: {
        '@type': 'Article',
        headline: run.dailyArticle.title,
        description: run.dailyArticle.dek,
        url: run.dailyArticle.canonicalUrl,
        datePublished: run.dailyArticle.publishedAt,
        about: run.topic.keywords,
      },
    },
  ];
}

export default async function SeoAgencyPage() {
  const storedRun = await getLatestSeoAgencyRun();
  const run = storedRun ?? createKwinSeoAgencyRun();
  const topSignal = run.newsSignals[0];
  const publishedCount = run.socialQueue.filter((draft) => draft.publishStatus === 'published').length;
  const queuedCount = run.socialQueue.filter((draft) => draft.publishStatus === 'queued').length;
  const publishingReadiness = run.publishingReadiness ?? getPublishingReadiness();

  return (
    <SiteFrame>
      <JsonLd data={getSchema(run)} />
      <main className="bg-[linear-gradient(180deg,#f8fafc_0%,#ffffff_34%,#f4f7fb_100%)]">
        <section className="kwin-page-top border-b border-slate-200 pb-14">
          <div className="container">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.22em] text-cyan-700">Daily Growth Desk</p>
            <div className="grid gap-8 lg:grid-cols-[1fr_360px] lg:items-end">
              <div>
                <h1 className="max-w-5xl text-4xl font-black leading-tight text-slate-950 md:text-6xl">
                  {run.agencyName}
                </h1>
                <p className="mt-5 max-w-4xl text-base leading-8 text-slate-700 md:text-lg">{run.mission}</p>
                <div className="mt-7 flex flex-wrap gap-3">
                  <Link href="/news-intelligence" className="rounded-xl bg-slate-950 px-5 py-3 text-sm font-bold text-white hover:bg-slate-800">
                    News Intelligence
                  </Link>
                  <Link href="/news-reader" className="rounded-xl bg-cyan-700 px-5 py-3 text-sm font-bold text-white hover:bg-cyan-800">
                    Live Reader
                  </Link>
                  <Link href="/sources" className="rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-bold text-slate-800 hover:bg-slate-50">
                    Source Ledger
                  </Link>
                </div>
              </div>

              <aside className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">Latest run</p>
                <p className="mt-2 text-3xl font-black text-slate-950">{formatDate(run.runDate)}</p>
                <p className="mt-2 text-sm leading-6 text-slate-600">Generated {formatDateTime(run.generatedAt)}</p>
                <div className="mt-5 grid grid-cols-2 gap-3 text-center">
                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                    <p className="text-2xl font-black text-slate-950">{run.newsSignals.length}</p>
                    <p className="text-xs text-slate-500">signals</p>
                  </div>
                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                    <p className="text-2xl font-black text-slate-950">{topSignal?.relevanceScore ?? 0}</p>
                    <p className="text-xs text-slate-500">top score</p>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </section>

        <section className="py-12">
          <div className="container grid gap-4 md:grid-cols-4">
            {[
              ['Today focus', run.topic.pillar],
              ['Audience', run.topic.audience],
              ['Queued', `${queuedCount} social post${queuedCount === 1 ? '' : 's'}`],
              ['Published', `${publishedCount} direct post${publishedCount === 1 ? '' : 's'}`],
            ].map(([label, value]) => (
              <article key={label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">{label}</p>
                <p className="mt-2 text-base font-extrabold leading-6 text-slate-950">{value}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="pb-14" id={run.dailyBrief.slug}>
          <div className="container grid gap-6 lg:grid-cols-[1fr_360px]">
            <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
              <div className="mb-4 flex flex-wrap items-center gap-2">
                <span className={`rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-[0.08em] ${evidenceClass(run.topic.evidenceStatus)}`}>
                  {run.topic.evidenceStatus}
                </span>
                <span className="rounded-full border border-cyan-200 bg-cyan-50 px-3 py-1 text-xs font-bold uppercase tracking-[0.08em] text-cyan-800">
                  Daily Article
                </span>
              </div>
              <h2 className="text-3xl font-black leading-tight text-slate-950 md:text-4xl">{run.dailyArticle.title}</h2>
              <p className="mt-4 text-base leading-8 text-slate-700">{run.dailyArticle.dek}</p>
              <p className="mt-5 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm font-semibold leading-7 text-amber-900">
                {run.dailyBrief.sharePrompt}
              </p>

              <div className="mt-7 grid gap-3 sm:grid-cols-2">
                {run.dailyArticle.keyTakeaways.slice(0, 4).map((takeaway) => (
                  <p key={takeaway} className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm font-semibold leading-7 text-slate-700">
                    {takeaway}
                  </p>
                ))}
              </div>

              <Link
                href={`/seo-agency/articles/${run.dailyArticle.slug}`}
                className="mt-7 inline-flex rounded-xl bg-slate-950 px-5 py-3 text-sm font-bold text-white hover:bg-slate-800"
              >
                Read today&apos;s full article
              </Link>
            </article>

            <aside className="space-y-4">
              <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="text-lg font-black text-slate-950">SEO Brief</h2>
                <dl className="mt-4 space-y-4 text-sm">
                  <div>
                    <dt className="font-bold text-slate-500">Primary keyword</dt>
                    <dd className="mt-1 font-extrabold text-slate-950">{run.dailyBrief.primaryKeyword}</dd>
                  </div>
                  <div>
                    <dt className="font-bold text-slate-500">Secondary keywords</dt>
                    <dd className="mt-2 flex flex-wrap gap-2">
                      {run.dailyBrief.secondaryKeywords.map((keyword) => (
                        <span key={keyword} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                          {keyword}
                        </span>
                      ))}
                    </dd>
                  </div>
                </dl>
              </article>

              <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="text-lg font-black text-slate-950">Internal Links</h2>
                <div className="mt-4 flex flex-col gap-2">
                  {run.dailyBrief.internalLinks.map((link) => (
                    <Link key={link.href} href={link.href} className="text-sm font-bold text-cyan-800 underline-offset-4 hover:underline">
                      {link.label}
                    </Link>
                  ))}
                </div>
              </article>
            </aside>
          </div>
        </section>

        <section className="pb-14">
          <div className="container">
            <div className="mb-5 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-cyan-700">Relevance Engine</p>
                <h2 className="mt-2 text-3xl font-black text-slate-950">Top KWIN City News Signals</h2>
              </div>
              <Link href="/news-reader" className="text-sm font-bold text-cyan-800 underline-offset-4 hover:underline">
                Open all monitored feeds
              </Link>
            </div>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {run.newsSignals.slice(0, 6).map((signal) => (
                <article key={`${signal.source}-${signal.url}`} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <span className="rounded-full bg-slate-950 px-3 py-1 text-xs font-black text-white">{signal.relevanceScore}</span>
                    <span className={`rounded-full border px-2.5 py-1 text-[11px] font-bold uppercase ${evidenceClass(signal.evidenceStatus)}`}>
                      {signal.evidenceStatus}
                    </span>
                  </div>
                  <h3 className="text-base font-extrabold leading-6 text-slate-950">{signal.title}</h3>
                  <p className="mt-2 text-xs font-bold uppercase tracking-[0.12em] text-slate-500">{signal.source}</p>
                  <p className="mt-3 text-sm leading-7 text-slate-700">{signal.summary}</p>
                  <a href={signal.url} target="_blank" rel="noreferrer" className="mt-4 inline-flex text-sm font-bold text-cyan-800 underline-offset-4 hover:underline">
                    Open source
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="pb-14">
          <div className="container">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-cyan-700">Publishing Queue</p>
            <h2 className="mt-2 text-3xl font-black text-slate-950">Social Posts Ready For Review Or Automation</h2>
            <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {publishingReadiness.map((check) => (
                <article key={check.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                  <span className={`rounded-full px-3 py-1 text-xs font-black uppercase ${readinessClass(check.status)}`}>
                    {check.status}
                  </span>
                  <h3 className="mt-3 text-lg font-black text-slate-950">{check.label}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-700">{check.detail}</p>
                  {check.missingEnv && check.missingEnv.length > 0 ? (
                    <p className="mt-3 text-xs font-semibold text-rose-700">
                      Missing: {check.missingEnv.join(', ')}
                    </p>
                  ) : null}
                </article>
              ))}
            </div>
            <div className="mt-5 grid gap-4 lg:grid-cols-2">
              {run.socialQueue.map((draft) => (
                <article key={draft.platform} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                  <div className="mb-4 flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-slate-950 px-3 py-1 text-xs font-black uppercase text-white">{draft.platform}</span>
                    <span className={`rounded-full border px-3 py-1 text-xs font-bold uppercase ${publishClass(draft.publishStatus)}`}>
                      {draft.publishStatus}
                    </span>
                    <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-600">
                      {draft.format}
                    </span>
                  </div>
                  <h3 className="text-xl font-black text-slate-950">{draft.hook}</h3>
                  <p className="mt-3 whitespace-pre-line text-sm leading-7 text-slate-700">{draft.body}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {draft.hashtags.map((tag) => (
                      <span key={tag} className="rounded-full bg-cyan-50 px-3 py-1 text-xs font-bold text-cyan-800">
                        {tag}
                      </span>
                    ))}
                  </div>
                  {draft.publishNote ? <p className="mt-4 text-xs font-semibold text-slate-500">{draft.publishNote}</p> : null}
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="pb-14">
          <div className="container">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-cyan-700">Snapshots</p>
            <h2 className="mt-2 text-3xl font-black text-slate-950">Daily, Weekly, Monthly, And Yearly Strategy</h2>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              {run.snapshots.map((snapshot) => (
                <article key={snapshot.cadence} className={`rounded-2xl border border-slate-200 border-l-4 bg-white p-6 shadow-sm ${snapshotAccent(snapshot)}`}>
                  <p className="text-xs font-black uppercase tracking-[0.16em] text-slate-500">{snapshot.cadence}</p>
                  <h3 className="mt-2 text-xl font-black text-slate-950">{snapshot.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-700">{snapshot.summary}</p>
                  <div className="mt-5 grid gap-4 sm:grid-cols-2">
                    <div>
                      <h4 className="text-sm font-black text-slate-950">Assets</h4>
                      <ul className="mt-2 space-y-1 text-sm leading-6 text-slate-700">
                        {snapshot.contentAssets.map((asset) => (
                          <li key={asset}>{asset}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-sm font-black text-slate-950">Metrics</h4>
                      <ul className="mt-2 space-y-1 text-sm leading-6 text-slate-700">
                        {snapshot.metricsToWatch.map((metric) => (
                          <li key={metric}>{metric}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="pb-16">
          <div className="container">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-cyan-700">Quality Gate</p>
              <h2 className="mt-2 text-3xl font-black text-slate-950">Automation Health Checks</h2>
              <div className="mt-5 grid gap-4 md:grid-cols-3">
                {run.healthChecks.map((check) => (
                  <article key={check.label} className="rounded-xl border border-slate-200 bg-slate-50 p-5">
                    <span className={`rounded-full px-3 py-1 text-xs font-black uppercase ${check.status === 'pass' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-900'}`}>
                      {check.status}
                    </span>
                    <h3 className="mt-3 text-lg font-black text-slate-950">{check.label}</h3>
                    <p className="mt-2 text-sm leading-7 text-slate-700">{check.detail}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
    </SiteFrame>
  );
}

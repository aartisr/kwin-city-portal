import type { Metadata } from 'next';
import Link from 'next/link';
import SiteFrame from '@/components/SiteFrame';
import SourceReferences from '@/components/SourceReferences';

const FEED_GROUPS = [
  {
    title: 'Tier A: Direct Publisher Feeds',
    description: 'Native newsroom feeds with highest editorial provenance for local Bengaluru updates.',
    trustLevel: 'Primary publisher channel',
    feeds: [
      {
        name: 'The Hindu - Bengaluru',
        provider: 'The Hindu',
        type: 'Direct RSS',
        xmlUrl: 'https://www.thehindu.com/news/cities/bangalore/feeder/default.rss',
        siteUrl: 'https://www.thehindu.com/news/cities/bangalore/',
      },
      {
        name: 'Times of India - Bengaluru',
        provider: 'Times of India',
        type: 'Direct RSS',
        xmlUrl: 'https://timesofindia.indiatimes.com/rssfeeds/-2128833038.cms',
        siteUrl: 'https://timesofindia.indiatimes.com/city/bengaluru',
      },
    ],
  },
  {
    title: 'Tier B: KWIN Precision Watch',
    description: 'Keyword and source-filtered streams for KWIN-specific signal detection and faster alerting.',
    trustLevel: 'Aggregated with publisher attribution',
    feeds: [
      {
        name: 'KWIN City Master Feed (India locale)',
        provider: 'Google News RSS',
        type: 'Aggregated RSS',
        xmlUrl:
          'https://news.google.com/rss/search?q=%22KWIN%20City%22%20OR%20%22Knowledge%20Wellbeing%20Innovation%20City%22%20Bengaluru&hl=en-IN&gl=IN&ceid=IN:en',
        siteUrl: 'https://news.google.com/',
      },
      {
        name: 'Deccan Herald - KWIN filter',
        provider: 'Google News + Deccan Herald',
        type: 'Source-filtered RSS',
        xmlUrl: 'https://news.google.com/rss/search?q=KWIN%20City%20site:deccanherald.com&hl=en-IN&gl=IN&ceid=IN:en',
        siteUrl: 'https://www.deccanherald.com',
      },
      {
        name: 'The Hindu - KWIN filter',
        provider: 'Google News + The Hindu',
        type: 'Source-filtered RSS',
        xmlUrl: 'https://news.google.com/rss/search?q=KWIN%20City%20site:thehindu.com&hl=en-IN&gl=IN&ceid=IN:en',
        siteUrl: 'https://www.thehindu.com',
      },
      {
        name: 'Times of India - KWIN filter',
        provider: 'Google News + TOI',
        type: 'Source-filtered RSS',
        xmlUrl:
          'https://news.google.com/rss/search?q=KWIN%20City%20site:timesofindia.indiatimes.com&hl=en-IN&gl=IN&ceid=IN:en',
        siteUrl: 'https://timesofindia.indiatimes.com',
      },
      {
        name: 'New Indian Express - KWIN filter',
        provider: 'Google News + TNIE',
        type: 'Source-filtered RSS',
        xmlUrl: 'https://news.google.com/rss/search?q=KWIN%20City%20site:newindianexpress.com&hl=en-IN&gl=IN&ceid=IN:en',
        siteUrl: 'https://www.newindianexpress.com',
      },
    ],
  },
  {
    title: 'Tier C: Strategic Context Signals',
    description: 'Broader policy and regional-development streams to capture adjacent shifts around KWIN.',
    trustLevel: 'Contextual monitor',
    feeds: [
      {
        name: 'KHIR City Signal',
        provider: 'Google News RSS',
        type: 'Aggregated RSS',
        xmlUrl: 'https://news.google.com/rss/search?q=%22KHIR%20City%22%20Bengaluru&hl=en-IN&gl=IN&ceid=IN:en',
        siteUrl: 'https://news.google.com/',
      },
      {
        name: 'Doddaballapura + Industrial Policy',
        provider: 'Google News RSS',
        type: 'Aggregated RSS',
        xmlUrl:
          'https://news.google.com/rss/search?q=Doddaballapura%20industrial%20policy%20Karnataka&hl=en-IN&gl=IN&ceid=IN:en',
        siteUrl: 'https://news.google.com/',
      },
    ],
  },
] as const;

const PROTOCOL = [
  {
    title: 'Attribution by Design',
    detail:
      'Every feed is labeled with provider lineage (direct publisher or aggregator + source filter), so readers can see exactly where each signal originates.',
  },
  {
    title: 'Verification Tiers',
    detail:
      'Tier A sources are strongest for editorial provenance. Tier B is best for speed and relevance. Tier C is contextual and must not be treated as project confirmation.',
  },
  {
    title: 'Evidence Discipline',
    detail:
      'News is treated as directional intelligence. Project-critical claims must still be cross-checked against primary records such as KIADB or official government documentation.',
  },
  {
    title: 'Methodological Transparency',
    detail:
      'This page openly states what each feed can prove and cannot prove. We prioritize public verifiability over impressionistic narrative.',
  },
] as const;

export const metadata: Metadata = {
  title: 'News Intelligence | KWIN City',
  description:
    'A credibility-first news intelligence dashboard for KWIN City with explicit attribution, verification tiers, and downloadable OPML feeds.',
  alternates: {
    canonical: 'https://kwin-city.com/news-intelligence',
  },
};

export default function NewsIntelligencePage() {
  return (
    <SiteFrame>
      <main className="bg-gradient-to-b from-[#f8fafc] via-white to-[#f8fafc]">
        <section className="pt-28 pb-16 border-b border-gray-200">
          <div className="container">
            <div className="rounded-3xl border border-[#dbe3ef] bg-[radial-gradient(1200px_500px_at_10%_0%,rgba(14,116,144,0.08),transparent_65%),radial-gradient(900px_400px_at_100%_20%,rgba(234,179,8,0.08),transparent_65%),linear-gradient(180deg,#ffffff,rgba(248,250,252,0.95))] p-8 md:p-12">
              <p className="text-xs font-bold tracking-[0.22em] uppercase text-cyan-700 mb-4">News Intelligence Desk</p>
              <h1 className="text-4xl md:text-6xl font-black text-slate-900 leading-tight max-w-5xl">
                World-Class KWIN Media Observatory
              </h1>
              <p className="mt-5 text-base md:text-lg text-slate-700 max-w-4xl leading-8">
                Built for precision, attribution, and institutional-grade trust. This is a curated monitoring system,
                not a rumor stream. Every feed is transparent about origin, verification strength, and appropriate use.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="/feeds/kwin-city-news-feeds.opml"
                  className="inline-flex items-center rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800 transition-colors"
                >
                  Download OPML Bundle
                </a>
                <Link
                  href="/news-reader"
                  className="inline-flex items-center rounded-xl bg-cyan-700 px-5 py-3 text-sm font-semibold text-white hover:bg-cyan-800 transition-colors"
                >
                  Open Live OPML Reader
                </Link>
                <Link
                  href="/sources"
                  className="inline-flex items-center rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-800 hover:bg-slate-50 transition-colors"
                >
                  Open Claim Ledger
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="py-14 md:py-16">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-5">
              {PROTOCOL.map((item) => (
                <article key={item.title} className="rounded-2xl border border-slate-200 bg-white p-5 md:p-6 shadow-sm">
                  <h2 className="text-lg font-bold text-slate-900 mb-2">{item.title}</h2>
                  <p className="text-sm text-slate-700 leading-7">{item.detail}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="pb-16 md:pb-20">
          <div className="container space-y-8">
            {FEED_GROUPS.map((group) => (
              <section key={group.title} className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8 shadow-sm">
                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6">
                  <div>
                    <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900">{group.title}</h2>
                    <p className="text-slate-700 mt-2 max-w-3xl">{group.description}</p>
                  </div>
                  <span className="inline-flex w-fit rounded-full border border-cyan-200 bg-cyan-50 px-3 py-1 text-xs font-bold tracking-[0.08em] uppercase text-cyan-800">
                    {group.trustLevel}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {group.feeds.map((feed) => (
                    <article key={feed.xmlUrl} className="rounded-xl border border-slate-200 bg-slate-50 p-5">
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <h3 className="text-base font-bold text-slate-900 leading-6">{feed.name}</h3>
                        <span className="rounded-full border border-slate-300 bg-white px-2.5 py-0.5 text-[11px] font-semibold text-slate-700 whitespace-nowrap">
                          {feed.type}
                        </span>
                      </div>
                      <p className="text-xs uppercase tracking-[0.14em] text-slate-500 mb-4">Provider: {feed.provider}</p>
                      <div className="flex flex-wrap gap-2">
                        <a
                          href={feed.xmlUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center rounded-lg bg-slate-900 px-3 py-2 text-xs font-semibold text-white hover:bg-slate-800"
                        >
                          Open RSS XML
                        </a>
                        <a
                          href={feed.siteUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100"
                        >
                          Publisher Site
                        </a>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </section>

        <section className="pb-16">
          <div className="container grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            <article className="rounded-2xl border border-amber-200 bg-amber-50/70 p-6 md:p-7">
              <h2 className="text-2xl font-extrabold text-amber-900 mb-3">Authenticity Boundaries</h2>
              <ul className="space-y-2 text-sm text-amber-900 leading-7">
                <li>News feeds indicate momentum, discourse, and emerging signals.</li>
                <li>They do not independently certify land status, approvals, or execution milestones.</li>
                <li>For critical project facts, cross-check with KIADB and primary public documents.</li>
                <li>Google News RSS usage is intended for personal feed-reader consumption per its terms.</li>
              </ul>
            </article>

            <SourceReferences
              sourceIds={['kiadb', 'aviation', 'economicSurvey', 'strr']}
              heading="Primary institutional anchors"
            />
          </div>
        </section>
      </main>
    </SiteFrame>
  );
}

import type { Metadata } from 'next';
import Link from 'next/link';
import JsonLd from '@/components/JsonLd';
import SiteFrame from '@/components/SiteFrame';
import SourceReferences from '@/components/SourceReferences';
import { getServerLocale, pickByLocale } from '@/lib/i18n/server';

const SITE_URL = 'https://kwin-city.com';
const PAGE_URL = `${SITE_URL}/news-intelligence`;
const OG_IMAGE = `${SITE_URL}/opengraph-image`;

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
    title: 'Tier A2: Official Government, State & Central Original-Source Signals',
    description: 'Primary and near-primary government or institutional signals for policy, approvals, infrastructure, environment, transport, and city operations. This tier is meant to keep original bodies first and discovery feeds secondary.',
    trustLevel: 'Primary institutional signal',
    feeds: [
      {
        name: 'Reserve Bank of India - Press Releases',
        provider: 'Reserve Bank of India',
        type: 'Direct RSS',
        xmlUrl: 'https://rbi.org.in/pressreleases_rss.xml',
        siteUrl: 'https://www.rbi.org.in/Scripts/rss.aspx',
      },
      {
        name: 'Reserve Bank of India - Notifications',
        provider: 'Reserve Bank of India',
        type: 'Direct RSS',
        xmlUrl: 'https://rbi.org.in/notifications_rss.xml',
        siteUrl: 'https://www.rbi.org.in/Scripts/rss.aspx',
      },
      {
        name: 'Reserve Bank of India - Speeches',
        provider: 'Reserve Bank of India',
        type: 'Direct RSS',
        xmlUrl: 'https://rbi.org.in/speeches_rss.xml',
        siteUrl: 'https://www.rbi.org.in/Scripts/rss.aspx',
      },
      {
        name: 'Reserve Bank of India - Annual Reports',
        provider: 'Reserve Bank of India',
        type: 'Direct RSS',
        xmlUrl: 'https://rbi.org.in/AnnualReportMain_rss.xml',
        siteUrl: 'https://www.rbi.org.in/Scripts/rss.aspx',
      },
      {
        name: 'Reserve Bank of India - Publications',
        provider: 'Reserve Bank of India',
        type: 'Direct RSS',
        xmlUrl: 'https://rbi.org.in/Publication_rss.xml',
        siteUrl: 'https://www.rbi.org.in/Scripts/rss.aspx',
      },
      {
        name: 'Government of Karnataka - Bengaluru',
        provider: 'Google News + Karnataka Government',
        type: 'Source-filtered RSS',
        xmlUrl: 'https://news.google.com/rss/search?q=site:karnataka.gov.in%20Bengaluru&hl=en-IN&gl=IN&ceid=IN:en',
        siteUrl: 'https://karnataka.gov.in/',
      },
      {
        name: "Chief Minister's Office Karnataka",
        provider: 'Google News + Karnataka CMO',
        type: 'Source-filtered RSS',
        xmlUrl: 'https://news.google.com/rss/search?q=site:cm.karnataka.gov.in%20Karnataka&hl=en-IN&gl=IN&ceid=IN:en',
        siteUrl: 'https://cm.karnataka.gov.in/',
      },
      {
        name: 'Bengaluru Urban District Administration',
        provider: 'Google News + District Administration',
        type: 'Source-filtered RSS',
        xmlUrl: 'https://news.google.com/rss/search?q=site:bengaluruurban.nic.in%20Bengaluru&hl=en-IN&gl=IN&ceid=IN:en',
        siteUrl: 'https://bengaluruurban.nic.in/',
      },
      {
        name: 'KIADB Official Signals',
        provider: 'Google News + KIADB',
        type: 'Source-filtered RSS',
        xmlUrl: 'https://news.google.com/rss/search?q=site:kiadb.karnataka.gov.in%20KIADB%20OR%20industrial%20land&hl=en-IN&gl=IN&ceid=IN:en',
        siteUrl: 'https://kiadb.karnataka.gov.in/',
      },
      {
        name: 'Department of Industries & Commerce Karnataka',
        provider: 'Google News + Karnataka Industries',
        type: 'Source-filtered RSS',
        xmlUrl: 'https://news.google.com/rss/search?q=site:industry.karnataka.gov.in%20Karnataka%20industries&hl=en-IN&gl=IN&ceid=IN:en',
        siteUrl: 'https://industry.karnataka.gov.in/',
      },
      {
        name: 'BBMP Official Signals',
        provider: 'Google News + BBMP',
        type: 'Source-filtered RSS',
        xmlUrl: 'https://news.google.com/rss/search?q=site:bbmp.gov.in%20Bengaluru&hl=en-IN&gl=IN&ceid=IN:en',
        siteUrl: 'https://www.bbmp.gov.in/',
      },
      {
        name: 'BMRCL / Namma Metro',
        provider: 'Google News + BMRCL',
        type: 'Source-filtered RSS',
        xmlUrl: 'https://news.google.com/rss/search?q=site:english.bmrc.co.in%20Bengaluru%20Metro&hl=en-IN&gl=IN&ceid=IN:en',
        siteUrl: 'https://english.bmrc.co.in/',
      },
      {
        name: 'KSPCB / Environment Signals',
        provider: 'Google News + KSPCB',
        type: 'Source-filtered RSS',
        xmlUrl: 'https://news.google.com/rss/search?q=site:kspcb.karnataka.gov.in%20Bengaluru%20environment&hl=en-IN&gl=IN&ceid=IN:en',
        siteUrl: 'https://kspcb.karnataka.gov.in/',
      },
      {
        name: 'Karnataka Transport Department',
        provider: 'Google News + Karnataka Transport',
        type: 'Source-filtered RSS',
        xmlUrl: 'https://news.google.com/rss/search?q=site:transport.karnataka.gov.in%20Karnataka%20transport&hl=en-IN&gl=IN&ceid=IN:en',
        siteUrl: 'https://transport.karnataka.gov.in/',
      },
      {
        name: 'BMTC Official Signals',
        provider: 'Google News + BMTC',
        type: 'Source-filtered RSS',
        xmlUrl: 'https://news.google.com/rss/search?q=site:majestic.bmtc.co.in%20Bengaluru%20transport&hl=en-IN&gl=IN&ceid=IN:en',
        siteUrl: 'https://majestic.bmtc.co.in/',
      },
      {
        name: 'PIB Karnataka & Bengaluru',
        provider: 'Google News + PIB',
        type: 'Source-filtered RSS',
        xmlUrl: 'https://news.google.com/rss/search?q=site:pib.gov.in%20Karnataka%20Bengaluru%20infrastructure&hl=en-IN&gl=IN&ceid=IN:en',
        siteUrl: 'https://pib.gov.in/',
      },
      {
        name: 'Ministry of Housing & Urban Affairs',
        provider: 'Google News + MoHUA',
        type: 'Source-filtered RSS',
        xmlUrl: 'https://news.google.com/rss/search?q=site:mohua.gov.in%20urban%20development%20India&hl=en-IN&gl=IN&ceid=IN:en',
        siteUrl: 'https://mohua.gov.in/',
      },
      {
        name: 'DPIIT / Industry Policy',
        provider: 'Google News + DPIIT',
        type: 'Source-filtered RSS',
        xmlUrl: 'https://news.google.com/rss/search?q=site:dpiit.gov.in%20investment%20policy%20India&hl=en-IN&gl=IN&ceid=IN:en',
        siteUrl: 'https://dpiit.gov.in/',
      },
      {
        name: 'National Highways Authority of India',
        provider: 'Google News + NHAI',
        type: 'Source-filtered RSS',
        xmlUrl: 'https://news.google.com/rss/search?q=site:nhai.gov.in%20Karnataka%20highway&hl=en-IN&gl=IN&ceid=IN:en',
        siteUrl: 'https://nhai.gov.in/',
      },
      {
        name: 'South Western Railway',
        provider: 'Google News + Indian Railways',
        type: 'Source-filtered RSS',
        xmlUrl: 'https://news.google.com/rss/search?q=site:swr.indianrailways.gov.in%20Bengaluru%20rail&hl=en-IN&gl=IN&ceid=IN:en',
        siteUrl: 'https://swr.indianrailways.gov.in/',
      },
      {
        name: 'Central Pollution Control Board',
        provider: 'Google News + CPCB',
        type: 'Source-filtered RSS',
        xmlUrl: 'https://news.google.com/rss/search?q=site:cpcb.nic.in%20Bengaluru%20environment&hl=en-IN&gl=IN&ceid=IN:en',
        siteUrl: 'https://cpcb.nic.in/',
      },
      {
        name: 'India Meteorological Department',
        provider: 'Google News + IMD',
        type: 'Source-filtered RSS',
        xmlUrl: 'https://news.google.com/rss/search?q=site:imd.gov.in%20Karnataka%20weather&hl=en-IN&gl=IN&ceid=IN:en',
        siteUrl: 'https://imd.gov.in/',
      },
      {
        name: 'Ministry of Road Transport & Highways',
        provider: 'Google News + MoRTH',
        type: 'Source-filtered RSS',
        xmlUrl: 'https://news.google.com/rss/search?q=site:morth.gov.in%20road%20transport%20India&hl=en-IN&gl=IN&ceid=IN:en',
        siteUrl: 'https://morth.gov.in/',
      },
      {
        name: 'Ministry of Railways',
        provider: 'Google News + Indian Railways',
        type: 'Source-filtered RSS',
        xmlUrl: 'https://news.google.com/rss/search?q=site:indianrailways.gov.in%20Bengaluru%20rail&hl=en-IN&gl=IN&ceid=IN:en',
        siteUrl: 'https://indianrailways.gov.in/',
      },
      {
        name: 'Ministry of Environment, Forest and Climate Change',
        provider: 'Google News + MoEFCC',
        type: 'Source-filtered RSS',
        xmlUrl: 'https://news.google.com/rss/search?q=site:moefcc.nic.in%20environment%20India&hl=en-IN&gl=IN&ceid=IN:en',
        siteUrl: 'https://moefcc.nic.in/',
      },
      {
        name: 'NITI Aayog',
        provider: 'Google News + NITI Aayog',
        type: 'Source-filtered RSS',
        xmlUrl: 'https://news.google.com/rss/search?q=site:niti.gov.in%20policy%20India&hl=en-IN&gl=IN&ceid=IN:en',
        siteUrl: 'https://niti.gov.in/',
      },
      {
        name: 'Reserve Bank of India',
        provider: 'Google News + RBI',
        type: 'Source-filtered RSS',
        xmlUrl: 'https://news.google.com/rss/search?q=site:rbi.org.in%20India%20economy&hl=en-IN&gl=IN&ceid=IN:en',
        siteUrl: 'https://rbi.org.in/',
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

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  const title = pickByLocale(locale, {
    en: 'KWIN City News Intelligence | Source-Mapped Media Monitoring',
    kn: 'ಸುದ್ದಿ ಇಂಟೆಲಿಜೆನ್ಸ್',
    hi: 'न्यूज़ इंटेलिजेंस',
  });
  const description = pickByLocale(locale, {
    en: 'Track KWIN City coverage with source-mapped news feeds, verification framing, OPML downloads, and transparent attribution across publisher and filtered streams.',
    kn: 'KWIN Cityಗಾಗಿ ವಿಶ್ವಾಸಾರ್ಹ ಸುದ್ದಿ ಇಂಟೆಲಿಜೆನ್ಸ್ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್.',
    hi: 'KWIN City के लिए विश्वसनीय न्यूज़ इंटेलिजेंस डैशबोर्ड।',
  });
  return {
    title,
    description,
    alternates: { canonical: PAGE_URL },
    openGraph: {
      title: 'KWIN City News Intelligence — Source-Mapped Monitoring, Not Rumor Tracking',
      description,
      url: PAGE_URL,
      type: 'website',
      images: [{ url: OG_IMAGE }],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'KWIN City News Intelligence — Source-Mapped Monitoring, Not Rumor Tracking',
      description,
      images: [OG_IMAGE],
    },
  };
}

export default async function NewsIntelligencePage() {
  const locale = await getServerLocale();
  const pageSchemas = [
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'News Intelligence', item: PAGE_URL },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      '@id': `${PAGE_URL}#collection`,
      url: PAGE_URL,
      name: 'KWIN City News Intelligence',
      description:
        'A monitored collection of publisher feeds and KWIN-related news intelligence sources with transparent attribution and verification framing.',
      isPartOf: {
        '@id': `${SITE_URL}/#website`,
      },
      hasPart: FEED_GROUPS.flatMap((group) =>
        group.feeds.map((feed) => ({
          '@type': 'DataFeed',
          name: feed.name,
          url: feed.xmlUrl,
          provider: {
            '@type': 'Organization',
            name: feed.provider,
          },
        })),
      ),
    },
  ];

  return (
    <SiteFrame>
      <JsonLd data={pageSchemas} />
      <main className="bg-gradient-to-b from-[#f8fafc] via-white to-[#f8fafc]">
        <section className="kwin-page-top pb-16 border-b border-gray-200">
          <div className="container">
            <div className="rounded-3xl border border-[#dbe3ef] bg-[radial-gradient(1200px_500px_at_10%_0%,rgba(14,116,144,0.08),transparent_65%),radial-gradient(900px_400px_at_100%_20%,rgba(234,179,8,0.08),transparent_65%),linear-gradient(180deg,#ffffff,rgba(248,250,252,0.95))] p-8 md:p-12">
              <p className="text-xs font-bold tracking-[0.22em] uppercase text-cyan-700 mb-4">{pickByLocale(locale, { en: 'News Intelligence Desk', kn: 'ಸುದ್ದಿ ಇಂಟೆಲಿಜೆನ್ಸ್ ಡೆಸ್ಕ್', hi: 'न्यूज़ इंटेलिजेंस डेस्क' })}</p>
              <h1 className="text-4xl md:text-6xl font-black text-slate-900 leading-tight max-w-5xl">
                {pickByLocale(locale, { en: 'World-Class KWIN Media Observatory', kn: 'ವಿಶ್ವಮಟ್ಟದ KWIN ಮೀಡಿಯಾ ವೀಕ್ಷಣಾಲಯ', hi: 'विश्वस्तरीय KWIN मीडिया ऑब्जर्वेटरी' })}
              </h1>
              <p className="mt-5 text-base md:text-lg text-slate-700 max-w-4xl leading-8">
                {pickByLocale(locale, {
                  en: 'Built for precision, attribution, and institutional-grade trust. This is a curated monitoring system, not a rumor stream. Every feed is transparent about origin, verification strength, and appropriate use.',
                  kn: 'ನಿಖರತೆ, ಮೂಲ ಸೂಚನೆ ಮತ್ತು ಸಂಸ್ಥಾತ್ಮಕ ವಿಶ್ವಾಸಕ್ಕಾಗಿ ನಿರ್ಮಿಸಿದ ಮೇಲ್ವಿಚಾರಣಾ ವ್ಯವಸ್ಥೆ.',
                  hi: 'सटीकता, स्रोत स्पष्टता और संस्थागत भरोसे के लिए बनाई गई निगरानी प्रणाली।',
                })}
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
                  {group.feeds.slice(0, 6).map((feed) => (
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

                {group.feeds.length > 6 ? (
                  <details className="group mt-5 rounded-xl border border-slate-200 bg-slate-50/70 p-4">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-bold text-slate-800 marker:content-none">
                      <span>Show the remaining {group.feeds.length - 6} reviewed sources</span>
                      <span className="flex h-7 w-7 items-center justify-center rounded-full border border-slate-300 bg-white text-lg leading-none transition-transform group-open:rotate-45" aria-hidden="true">+</span>
                    </summary>
                    <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">The full registry is available for audit and export; it is collapsed initially so the decision path stays clear.</p>
                    <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                      {group.feeds.slice(6).map((feed) => (
                        <article key={feed.xmlUrl} className="rounded-xl border border-slate-200 bg-white p-5">
                          <div className="flex items-start justify-between gap-3 mb-3">
                            <h3 className="text-base font-bold text-slate-900 leading-6">{feed.name}</h3>
                            <span className="rounded-full border border-slate-300 bg-slate-50 px-2.5 py-0.5 text-[11px] font-semibold text-slate-700 whitespace-nowrap">{feed.type}</span>
                          </div>
                          <p className="text-xs uppercase tracking-[0.14em] text-slate-500 mb-4">Provider: {feed.provider}</p>
                          <div className="flex flex-wrap gap-2">
                            <a href={feed.xmlUrl} target="_blank" rel="noreferrer" className="inline-flex items-center rounded-lg bg-slate-900 px-3 py-2 text-xs font-semibold text-white hover:bg-slate-800">Open RSS XML</a>
                            <a href={feed.siteUrl} target="_blank" rel="noreferrer" className="inline-flex items-center rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100">Publisher Site</a>
                          </div>
                        </article>
                      ))}
                    </div>
                  </details>
                ) : null}
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

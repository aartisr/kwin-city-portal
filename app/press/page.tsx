import type { Metadata } from 'next';
import Link from 'next/link';
import SiteFrame from '@/components/SiteFrame';
import JsonLd from '@/components/JsonLd';

const SITE_URL = 'https://kwin-city.com';
const PAGE_URL = `${SITE_URL}/press`;

const pageSchemas = [
  {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${PAGE_URL}#webpage`,
    url: PAGE_URL,
    name: 'KWIN City Press and Media Kit',
    description:
      'Media-ready facts, source-ledger links, reusable assets, and attribution guidance for coverage referencing KWIN City research.',
    isPartOf: { '@id': `${SITE_URL}/#website` },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Is this the official KIADB KWIN City website?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No. This is an independent, source-linked research portal. It does not claim official KIADB endorsement.',
        },
      },
      {
        '@type': 'Question',
        name: 'Which page should be cited for claim verification?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Use the Sources and Claim Ledger at https://kwin-city.com/sources for claim-level mappings and source status labels.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can journalists and researchers reuse charts and briefing assets?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. Assets can be referenced with attribution and a contextual link to the relevant source, evidence, or data-insights page.',
        },
      },
    ],
  },
];

export const metadata: Metadata = {
  title: 'Press and Media Kit | Citation-Ready KWIN City Research Assets',
  description:
    'Editorial-ready facts, claim verification links, chart sources, and reusable media assets for responsible KWIN City coverage.',
  alternates: { canonical: PAGE_URL },
  keywords: [
    'KWIN City press kit',
    'KWIN City media resources',
    'KWIN City citations',
    'KWIN City source verification',
    'North Bengaluru research links',
  ],
  openGraph: {
    title: 'KWIN City Press and Media Kit',
    description:
      'A citation-friendly media page with source ledger links, downloadable assets, and attribution guidance for editors and researchers.',
    url: PAGE_URL,
    type: 'website',
    images: [{ url: `${PAGE_URL}/opengraph-image` }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'KWIN City Press and Media Kit',
    description:
      'Source-led, citation-friendly media resources for KWIN City and North Bengaluru coverage.',
    images: [`${PAGE_URL}/opengraph-image`],
  },
};

const assets = [
  {
    href: '/sources',
    title: 'Sources and Claim Ledger',
    body: 'Claim-level mapping with source status labels and direct external references.',
  },
  {
    href: '/evidence',
    title: 'Evidence Vault',
    body: 'Dataset-level notes describing what each source can and cannot prove.',
  },
  {
    href: '/data-insights',
    title: 'Data Insights Lab',
    body: 'Interactive visuals derived from public data and project datasets.',
  },
  {
    href: '/share',
    title: 'Share Kit',
    body: 'Reusable social copy, visual assets, and short context summaries.',
  },
  {
    href: '/downloads',
    title: 'Downloads Library',
    body: 'Curated project and policy resources with transparent context labels.',
  },
];

const verificationChecklist = [
  'Confirm whether a claim is marked primary source, contextual source, or pending primary verification.',
  'Cite the most specific page that supports the statement, not only the homepage.',
  'For proposal-level numbers, mention that values may change with official updates.',
  'When possible, include at least one link to the primary institutional source.',
];

export default function PressPage() {
  return (
    <SiteFrame>
      <JsonLd data={pageSchemas} />
      <main id="main-content" role="main" className="bg-[#F8FAFC]">
        <section className="kwin-page-top-roomy relative overflow-hidden bg-[linear-gradient(160deg,#04120F_0%,#0C2238_54%,#071A2E_100%)] text-white">
          <div className="absolute inset-x-0 top-0 h-1 bg-[linear-gradient(90deg,#F5A623,#06B6D4,#10B981)]" />
          <div className="container relative pb-12 md:pb-16">
            <p className="text-[11px] font-bold uppercase tracking-normal text-[#F5C050]">Press and media kit</p>
            <h1 className="mt-4 max-w-4xl text-5xl font-black leading-none tracking-normal md:text-7xl">
              Citation-ready KWIN City research assets.
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-[#C9D8E8]">
              This page helps editors, researchers, and civic writers quickly reference the right material with transparent attribution.
              The portal is independent and source-linked; it is not the official KIADB website.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/sources" className="btn btn-primary text-center">Open source ledger</Link>
              <Link href="/data-insights" className="btn btn-outline-light text-center">Open data insights</Link>
            </div>
          </div>
        </section>

        <section className="section bg-white">
          <div className="container">
            <div className="max-w-4xl">
              <h2 className="text-4xl font-black leading-tight tracking-normal text-slate-950 md:text-5xl">
                Preferred attribution line
              </h2>
              <p className="mt-5 text-base leading-8 text-slate-700">
                Independent, source-linked research portal for KWIN City and the North Bengaluru development context.
              </p>
              <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <p className="text-sm font-semibold text-slate-900">Sample editorial citation</p>
                <p className="mt-2 text-sm leading-7 text-slate-700">
                  Source: KWIN City research portal, Sources and Claim Ledger (<a href="https://kwin-city.com/sources" className="text-blue-700 underline underline-offset-2">kwin-city.com/sources</a>), accessed 23 Aug 2026.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="section bg-[#F4F8FD]">
          <div className="container">
            <div className="mb-8 max-w-3xl">
              <h2 className="text-4xl font-black leading-tight tracking-normal text-slate-950 md:text-5xl">
                Linkable assets for coverage
              </h2>
              <p className="mt-4 text-base leading-7 text-slate-700">
                Choose the page that best matches your story angle so readers land on the exact evidence context.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {assets.map((asset) => (
                <article key={asset.href} className="border border-slate-200 bg-white p-5">
                  <h3 className="text-xl font-black tracking-normal text-slate-950">{asset.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{asset.body}</p>
                  <Link href={asset.href} className="mt-5 inline-flex text-sm font-bold text-[#0F6BFF] hover:text-[#0B52C9]">
                    Open page
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section bg-white">
          <div className="container">
            <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
              <article className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
                <p className="text-[11px] font-bold uppercase tracking-normal text-[#0F766E]">Verification checklist</p>
                <h2 className="mt-3 text-3xl font-black leading-tight tracking-normal text-slate-950">
                  Before publishing or citing
                </h2>
                <ul className="mt-5 space-y-3 text-sm leading-7 text-slate-700">
                  {verificationChecklist.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span aria-hidden="true" className="mt-1.5 h-2.5 w-2.5 rounded-full bg-[#0F766E]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </article>

              <article className="rounded-2xl border border-[#DCEBFF] bg-[#F2F7FF] p-6">
                <p className="text-[11px] font-bold uppercase tracking-normal text-[#0F6BFF]">Contact</p>
                <h2 className="mt-3 text-2xl font-black leading-tight tracking-normal text-slate-950">
                  Request a fact check note
                </h2>
                <p className="mt-4 text-sm leading-7 text-slate-700">
                  For editorial deadlines, you can request a concise source-checked note with links to claim mappings and primary references.
                </p>
                <Link href="/contact" className="mt-6 inline-flex rounded-xl border border-[#0F6BFF] px-4 py-2 text-sm font-bold text-[#0F6BFF] transition hover:bg-[#E8F0FF]">
                  Contact research desk
                </Link>
              </article>
            </div>
          </div>
        </section>
      </main>
    </SiteFrame>
  );
}
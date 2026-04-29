import type { Metadata } from 'next';
import Link from 'next/link';
import SiteFrame from '@/components/SiteFrame';
import JsonLd from '@/components/JsonLd';

const SITE_URL = 'https://kwin-city.com';
const PAGE_URL = `${SITE_URL}/instagram`;

const priorityLinks = [
  {
    href: '/about',
    label: 'Start with the KWIN City brief',
    body: 'A fast overview of the proposed 465-acre knowledge, wellbeing, and innovation township in North Bengaluru.',
    accent: 'from-[#F5A623] to-[#FACC15]',
  },
  {
    href: '/why-north-bengaluru',
    label: 'Why North Bengaluru matters',
    body: 'Location, connectivity, airport context, and the Doddaballapura growth corridor in one evidence-led path.',
    accent: 'from-[#38BDF8] to-[#06B6D4]',
  },
  {
    href: '/data-insights',
    label: 'Open the data dashboard',
    body: 'Charts, comparisons, and structured context for people who want numbers before narratives.',
    accent: 'from-[#34D399] to-[#10B981]',
  },
  {
    href: '/sources',
    label: 'Check the source ledger',
    body: 'Every major public claim should be traceable, status-labeled, and reviewable.',
    accent: 'from-[#A78BFA] to-[#6366F1]',
  },
  {
    href: '/share',
    label: 'Share the 60-second brief',
    body: 'Copy a social-ready KWIN City angle, open launch carousel visuals, and send people back to the evidence.',
    accent: 'from-[#FB7185] to-[#E8A020]',
  },
];

const storyTracks = [
  {
    label: 'Knowledge',
    title: 'Research, education, and high-skill talent',
    body: 'Show why knowledge districts win when institutions, data, and industry learn from each other.',
  },
  {
    label: 'Wellbeing',
    title: 'A city should feel livable, not only productive',
    body: 'Explain public realm, health, climate comfort, access, and daily quality of life in plain language.',
  },
  {
    label: 'Innovation',
    title: 'Semiconductors, aerospace, health-tech, and renewables',
    body: 'Turn complex sectors into short visual explainers with links back to deeper evidence.',
  },
  {
    label: 'Trust',
    title: 'Source-linked by default',
    body: 'Make the account a high-signal feed: proposed, confirmed, pending, and sourced are always clear.',
  },
];

const featureLinks = [
  { href: '/sectors', label: 'Sector map', desc: 'Target clusters and opportunity areas' },
  { href: '/timeline', label: 'Timeline', desc: 'Milestones and public project signals' },
  { href: '/for/investor', label: 'Investor lens', desc: 'Opportunity, risks, and decision context' },
  { href: '/for/resident', label: 'Resident lens', desc: 'Livability, community, and daily impact' },
  { href: '/for/journalist', label: 'Media kit', desc: 'Verified angles and source paths' },
  { href: '/contact', label: 'Contact', desc: 'Questions, corrections, and collaboration' },
];

const launchPosts = [
  { title: 'What is KWIN City?', href: '/about' },
  { title: 'Why Doddaballapura?', href: '/why-north-bengaluru' },
  { title: 'Knowledge + Wellbeing + Innovation', href: '/about' },
  { title: 'The 465-acre question', href: '/about' },
  { title: 'Sectors to watch', href: '/sectors' },
  { title: 'How this portal verifies claims', href: '/trust' },
];

const socialSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': `${PAGE_URL}#webpage`,
  url: PAGE_URL,
  name: 'KWIN City Instagram Hub',
  description:
    'A mobile-first social landing page for the KWIN City Instagram presence, linking followers to source-led project explainers, data, sectors, and contact paths.',
  isPartOf: {
    '@id': `${SITE_URL}/#website`,
  },
  about: {
    '@id': `${SITE_URL}/#organization`,
  },
};

export const metadata: Metadata = {
  title: 'KWIN City Instagram Hub | Visual Brief, Data, Sources and Updates',
  description:
    'The official Instagram-ready landing hub for KWIN City: start with the visual brief, explore North Bengaluru context, open data insights, and verify source-linked claims.',
  alternates: { canonical: PAGE_URL },
  keywords: [
    'KWIN City Instagram',
    'KWIN City social media',
    'North Bengaluru visual brief',
    'Doddaballapura KWIN City',
    'KWIN City sources',
  ],
  openGraph: {
    title: 'KWIN City Instagram Hub',
    description:
      'Move from Instagram curiosity to verified KWIN City evidence with mobile-first links to the visual brief, data dashboards, source ledger, sectors, and updates.',
    url: PAGE_URL,
    type: 'website',
    images: [{ url: `${PAGE_URL}/opengraph-image` }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'KWIN City Instagram Hub',
    description:
      'Move from Instagram curiosity to verified KWIN City evidence with mobile-first links to the visual brief, data dashboards, source ledger, sectors, and updates.',
    images: [`${PAGE_URL}/opengraph-image`],
  },
};

export default function InstagramHubPage() {
  return (
    <SiteFrame>
      <JsonLd data={socialSchema} />
      <main id="main-content" role="main" className="bg-[#F8FAFC]">
        <section className="kwin-page-top-roomy relative overflow-hidden bg-[#040714] text-white">
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#F5A623] via-[#38BDF8] to-[#10B981]" />
          <div aria-hidden="true" className="absolute inset-0 opacity-[0.16]">
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(245,166,35,0.28)_1px,transparent_1px),linear-gradient(180deg,rgba(6,182,212,0.20)_1px,transparent_1px)] bg-[length:72px_72px]" />
          </div>

          <div className="container relative pb-14 md:pb-20">
            <div className="grid gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-end">
              <div>
                <p className="text-sm font-bold uppercase text-[#F5A623]">KWIN City social desk</p>
                <h1 className="mt-4 max-w-4xl text-5xl font-black leading-none tracking-normal md:text-7xl">
                  The visual brief for North Bengaluru&apos;s knowledge city.
                </h1>
                <p className="mt-6 max-w-2xl text-lg leading-8 text-[#C9D6E5]">
                  From an Instagram post to the full evidence trail in one tap. Start with the story,
                  then open the data, sources, and sector context behind it.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Link href="/about" className="btn btn-primary text-center">
                    Read the city brief
                  </Link>
                  <Link href="/sources" className="btn btn-outline-light text-center">
                    Verify the sources
                  </Link>
                </div>
              </div>

              <div className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-4 shadow-[0_28px_90px_rgba(0,0,0,0.35)] backdrop-blur">
                <div className="rounded-[1.5rem] border border-white/10 bg-[#07111F] p-5">
                  <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F5A623] text-xl font-black text-[#040714]">
                        K
                      </div>
                      <div>
                        <p className="font-extrabold text-white">KWIN City</p>
                        <p className="text-xs text-[#8FA4BC]">@hellokwincityconnect</p>
                      </div>
                    </div>
                    <span className="rounded-full border border-cyan-300/25 bg-cyan-300/10 px-3 py-1 text-xs font-bold text-cyan-200">
                      Launch hub
                    </span>
                  </div>
                  <div className="mt-5 grid grid-cols-3 gap-3 text-center">
                    <div className="rounded-xl bg-white/[0.06] p-3">
                      <p className="text-xl font-black text-white">465</p>
                      <p className="mt-1 text-[11px] uppercase text-[#8FA4BC]">acres proposed</p>
                    </div>
                    <div className="rounded-xl bg-white/[0.06] p-3">
                      <p className="text-xl font-black text-white">3</p>
                      <p className="mt-1 text-[11px] uppercase text-[#8FA4BC]">pillars</p>
                    </div>
                    <div className="rounded-xl bg-white/[0.06] p-3">
                      <p className="text-xl font-black text-white">1</p>
                      <p className="mt-1 text-[11px] uppercase text-[#8FA4BC]">source trail</p>
                    </div>
                  </div>
                  <div className="mt-5 space-y-3">
                    {launchPosts.map((post) => (
                      <Link
                        key={post.title}
                        href={post.href}
                        className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 transition hover:border-[#F5A623]/40 hover:bg-white/[0.08]"
                        aria-label={`Open ${post.title}`}
                      >
                        <span className="text-sm font-semibold text-[#DCE7F3]">{post.title}</span>
                        <span className="text-sm font-bold text-[#F5A623]">Open</span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section bg-white">
          <div className="container">
            <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-sm font-bold uppercase text-blue-600">Tap paths</p>
                <h2 className="mt-2 text-3xl font-black tracking-normal text-gray-950 md:text-5xl">
                  The links every Instagram visitor needs first.
                </h2>
              </div>
              <p className="max-w-xl text-base leading-7 text-gray-600">
                Each path is built to move a casual viewer toward clear context, not hype.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {priorityLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl"
                >
                  <div className={`mb-5 h-1.5 w-20 rounded-full bg-gradient-to-r ${item.accent}`} />
                  <h3 className="text-2xl font-black tracking-normal text-gray-950">{item.label}</h3>
                  <p className="mt-3 text-base leading-7 text-gray-600">{item.body}</p>
                  <span className="mt-5 inline-flex text-sm font-bold text-blue-700 group-hover:text-blue-900">
                    Open path
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="section bg-[#EDF5FA]">
          <div className="container">
            <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:items-start">
              <div>
                <p className="text-sm font-bold uppercase text-emerald-700">Content pillars</p>
                <h2 className="mt-2 text-3xl font-black tracking-normal text-gray-950 md:text-5xl">
                  Make the feed beautiful, but make it useful first.
                </h2>
                <p className="mt-4 text-base leading-7 text-gray-700">
                  The strongest KWIN City Instagram presence should be a living index:
                  short visuals, source-linked captions, and permanent paths back to the portal.
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                {storyTracks.map((track) => (
                  <article key={track.label} className="rounded-2xl border border-white bg-white p-5 shadow-sm">
                    <p className="text-xs font-bold uppercase text-[#E8A020]">{track.label}</p>
                    <h3 className="mt-3 text-xl font-black tracking-normal text-gray-950">{track.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-gray-600">{track.body}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section bg-white">
          <div className="container">
            <div className="mb-8 max-w-3xl">
              <p className="text-sm font-bold uppercase text-slate-600">More routes</p>
              <h2 className="mt-2 text-3xl font-black tracking-normal text-gray-950 md:text-5xl">
                Go deeper after the first swipe.
              </h2>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {featureLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-2xl border border-gray-200 bg-gray-50 p-5 transition hover:-translate-y-1 hover:border-cyan-200 hover:bg-white hover:shadow-lg"
                >
                  <h3 className="text-lg font-black tracking-normal text-gray-950">{link.label}</h3>
                  <p className="mt-2 text-sm leading-6 text-gray-600">{link.desc}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
    </SiteFrame>
  );
}

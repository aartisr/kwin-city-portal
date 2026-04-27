import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import SiteFrame from '@/components/SiteFrame';
import JsonLd from '@/components/JsonLd';
import InlineSourceBadges from '@/components/InlineSourceBadges';
import ShareActions from '@/components/share/ShareActions';
import { SITE_CONFIG } from '@/config/site.config';

const SITE_URL = 'https://kwin-city.com';
const PAGE_URL = `${SITE_URL}/share`;

const heroShareText =
  'KWIN City, North Bengaluru: a source-linked 60-second brief on the proposed 465-acre knowledge, wellbeing, and innovation city.';

const shareAngles = [
  {
    id: 'group-chat',
    label: 'Group chat opener',
    title: 'What should a 465-acre knowledge city prove first?',
    text: 'Bengaluru friends: if a 465-acre knowledge city is proposed near Doddaballapura, what should it prove first - jobs, water, mobility, or trust?',
    note: 'Best for WhatsApp, family groups, resident forums, and civic conversations.',
    sourceIds: ['brief', 'kiadb'],
  },
  {
    id: 'investor',
    label: 'Investor signal',
    title: 'The regional case is bigger than one project.',
    text: "KWIN City is worth reading through North Bengaluru's airport corridor, road planning, and Karnataka's industrial depth - with every major claim source-linked.",
    note: 'Best for LinkedIn, ecosystem builders, sector watchers, and founders.',
    sourceIds: ['aviation', 'strr', 'economicSurvey'],
  },
  {
    id: 'journalist',
    label: 'Media angle',
    title: 'A cleaner way to cover a big urban proposal.',
    text: 'KWIN City has a public source ledger that separates confirmed context, proposal-level claims, and pending verification. Useful starting point for reporting.',
    note: 'Best for journalists, policy analysts, and people who want the claim trail first.',
    sourceIds: ['brief', 'kiadb'],
  },
  {
    id: 'water',
    label: 'Civic pressure test',
    title: 'The sustainability story has to be measurable.',
    text: 'For KWIN City to earn trust, water, groundwater, lake governance, mobility, and climate resilience have to be measured against public evidence.',
    note: 'Best for urbanists, resident groups, climate conversations, and planners.',
    sourceIds: ['rainfall', 'groundwater', 'lakes'],
  },
];

const quickLinks = [
  { href: '/about', label: 'Read the brief', body: 'What KWIN City is and what is still being verified.' },
  { href: '/why-north-bengaluru', label: 'Open the regional case', body: 'Airport, corridor, and location context.' },
  { href: '/sources', label: 'Check sources', body: 'The claim-to-source ledger.' },
  { href: '/instagram', label: 'Instagram hub', body: 'Mobile-first launch links and visual brief.' },
];

const carouselSlides = Array.from({ length: 8 }, (_, index) => {
  const number = index + 1;
  return {
    number,
    src: `/social/kwin-launch/kwin-launch-slide-${String(number).padStart(2, '0')}.png`,
  };
});

const socialLinks = [
  {
    label: 'WhatsApp',
    href: `https://wa.me/?text=${encodeURIComponent(`${heroShareText} ${PAGE_URL}`)}`,
  },
  {
    label: 'LinkedIn',
    href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(PAGE_URL)}`,
  },
  {
    label: 'X',
    href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(heroShareText)}&url=${encodeURIComponent(PAGE_URL)}&via=${encodeURIComponent(SITE_CONFIG.xHandle.replace(/^@/, ''))}`,
  },
  {
    label: 'Email',
    href: `mailto:?subject=${encodeURIComponent('KWIN City 60-second brief')}&body=${encodeURIComponent(`${heroShareText}\n\n${PAGE_URL}`)}`,
  },
];

const shareSchema = [
  {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${PAGE_URL}#webpage`,
    url: PAGE_URL,
    name: 'KWIN City Share Kit',
    description:
      'A share-ready KWIN City briefing page with copyable social prompts, launch carousel visuals, and source-linked next steps.',
    isPartOf: {
      '@id': `${SITE_URL}/#website`,
    },
    about: {
      '@id': `${SITE_URL}/#organization`,
    },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    '@id': `${PAGE_URL}#share-kit`,
    name: 'KWIN City 60-second Brief',
    url: PAGE_URL,
    headline: 'Share KWIN City in 10 seconds',
    text: heroShareText,
    associatedMedia: carouselSlides.map((slide) => ({
      '@type': 'ImageObject',
      contentUrl: `${SITE_URL}${slide.src}`,
      name: `KWIN City launch carousel slide ${slide.number}`,
    })),
    accountablePerson: {
      '@type': 'Organization',
      name: 'KWIN City',
      sameAs: SITE_CONFIG.socialLinks.x,
    },
  },
];

export const metadata: Metadata = {
  title: 'Share KWIN City | 60-Second Brief, Social Prompts and Launch Carousel',
  description:
    'Copy a source-linked KWIN City brief, send a social-ready angle, or open the launch carousel for North Bengaluru audiences.',
  alternates: { canonical: PAGE_URL },
  keywords: [
    'KWIN City share kit',
    'KWIN City brief',
    'KWIN City launch carousel',
    'North Bengaluru KWIN City',
    'Doddaballapura knowledge city',
  ],
  openGraph: {
    title: 'Share KWIN City in 10 seconds',
    description:
      'A source-linked 60-second brief, social prompts, and launch carousel for North Bengaluru audiences.',
    url: PAGE_URL,
    type: 'website',
    images: [{ url: `${PAGE_URL}/opengraph-image`, width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Share KWIN City in 10 seconds',
    description: 'Copy the 60-second brief, send a social angle, or open the launch carousel.',
    images: [`${PAGE_URL}/opengraph-image`],
  },
};

export default function SharePage() {
  return (
    <SiteFrame>
      <JsonLd data={shareSchema} />
      <main id="main-content" role="main" className="bg-[#F6F8FB]">
        <section className="kwin-page-top-roomy relative overflow-hidden bg-[#04120F] text-white">
          <div className="absolute inset-x-0 top-0 h-1 bg-[linear-gradient(90deg,#F5A623,#06B6D4,#10B981)]" />
          <div className="container relative pb-12 md:pb-16">
            <div className="grid gap-9 lg:grid-cols-[0.94fr_1.06fr] lg:items-center">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-normal text-[#F5C050]">
                  KWIN City share kit
                </p>
                <h1 className="mt-4 max-w-4xl text-5xl font-black leading-none tracking-normal md:text-7xl">
                  Share KWIN City in 10 seconds.
                </h1>
                <p className="mt-6 max-w-2xl text-lg leading-8 text-[#C9D8E8]">
                  A short source-linked brief, four copyable angles, launch carousel visuals,
                  and fast paths back to the evidence.
                </p>
                <div className="mt-7">
                  <ShareActions
                    title="KWIN City 60-second brief"
                    text={heroShareText}
                    url={PAGE_URL}
                    copyLabel="Copy brief"
                    copiedLabel="Copied"
                    shareLabel="Share brief"
                    tone="dark"
                  />
                </div>
                <div className="mt-6 flex flex-wrap gap-2">
                  {socialLinks.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      target={link.href.startsWith('mailto:') ? undefined : '_blank'}
                      rel={link.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                      className="border border-white/12 bg-white/[0.06] px-4 py-2 text-xs font-bold text-white transition hover:border-white/24 hover:bg-white/[0.10]"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-[0.9fr_1.1fr] gap-3 sm:gap-4">
                <div className="grid gap-3 sm:gap-4">
                  {[2, 3].map((slide) => (
                    <div key={slide} className="relative aspect-square overflow-hidden border border-white/12 bg-white/[0.08]">
                      <Image
                        src={`/social/kwin-launch/kwin-launch-slide-0${slide}.png`}
                        alt={`KWIN City launch carousel slide ${slide}`}
                        fill
                        sizes="(max-width: 1024px) 42vw, 220px"
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
                <div className="relative aspect-square overflow-hidden border border-white/12 bg-white/[0.08] shadow-[0_32px_90px_rgba(0,0,0,0.35)]">
                  <Image
                    src="/social/kwin-launch/kwin-launch-slide-01.png"
                    alt="KWIN City launch carousel cover"
                    fill
                    priority
                    sizes="(max-width: 1024px) 54vw, 480px"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section bg-white">
          <div className="container">
            <div className="mb-9 grid gap-4 md:grid-cols-[0.8fr_1.2fr] md:items-end">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-normal text-[#0F766E]">
                  Copyable angles
                </p>
                <h2 className="mt-3 text-4xl font-black leading-tight tracking-normal text-slate-950 md:text-5xl">
                  Start the right conversation.
                </h2>
              </div>
              <p className="max-w-2xl text-base leading-7 text-slate-600">
                Each angle points people toward a specific question and then back to the source trail.
              </p>
            </div>

            <div className="grid gap-4 lg:grid-cols-2">
              {shareAngles.map((angle) => (
                <article key={angle.id} id={angle.id} className="border border-slate-200 bg-[#FBFCFE] p-5">
                  <p className="text-[11px] font-bold uppercase tracking-normal text-[#E8A020]">
                    {angle.label}
                  </p>
                  <h3 className="mt-2 text-2xl font-black leading-tight tracking-normal text-slate-950">
                    {angle.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{angle.note}</p>
                  <div className="mt-4">
                    <InlineSourceBadges sourceIds={angle.sourceIds} />
                  </div>
                  <ShareActions
                    title={angle.title}
                    text={angle.text}
                    url={`${PAGE_URL}#${angle.id}`}
                    copyLabel="Copy"
                    copiedLabel="Copied"
                    shareLabel="Share"
                    className="mt-5"
                  />
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section bg-[#EEF6F5]">
          <div className="container">
            <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-normal text-[#0F766E]">
                  Launch carousel
                </p>
                <h2 className="mt-3 text-4xl font-black leading-tight tracking-normal text-slate-950 md:text-5xl">
                  Eight square assets, ready for the feed.
                </h2>
              </div>
              <Link href="/instagram" className="btn btn-secondary text-center">
                Open Instagram hub
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
              {carouselSlides.map((slide) => (
                <a
                  key={slide.number}
                  href={slide.src}
                  className="group relative aspect-square overflow-hidden border border-white bg-white shadow-sm"
                >
                  <Image
                    src={slide.src}
                    alt={`KWIN City launch carousel slide ${slide.number}`}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover transition duration-500 group-hover:scale-[1.03]"
                  />
                  <span className="absolute left-3 top-3 bg-[#04120F]/82 px-2.5 py-1 text-[10px] font-black text-white">
                    {String(slide.number).padStart(2, '0')}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="section bg-white">
          <div className="container">
            <div className="mb-8 max-w-3xl">
              <p className="text-[11px] font-bold uppercase tracking-normal text-slate-500">
                Next tap
              </p>
              <h2 className="mt-3 text-4xl font-black leading-tight tracking-normal text-slate-950 md:text-5xl">
                Send the spark. Keep the proof close.
              </h2>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {quickLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="border border-slate-200 bg-[#F8FAFC] p-5 transition hover:-translate-y-1 hover:border-cyan-200 hover:bg-white hover:shadow-lg"
                >
                  <h3 className="text-lg font-black tracking-normal text-slate-950">{link.label}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{link.body}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
    </SiteFrame>
  );
}

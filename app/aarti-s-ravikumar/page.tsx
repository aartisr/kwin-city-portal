import type { Metadata } from 'next';
import Link from 'next/link';
import JsonLd from '@/components/JsonLd';
import SiteFrame from '@/components/SiteFrame';
import { SITE_CONFIG } from '@/config/site.config';
import { SITE_IDENTITY, personReference, personSchema } from '@/lib/identity';

const PROFILE = SITE_IDENTITY.person.profileUrl;
const UPDATED = `${SITE_CONFIG.lastUpdatedISO}T00:00:00+05:30`;

const WORK = [
  { href: '/evidence', title: 'Evidence and factual-status library', description: 'Source-linked records with explicit verification boundaries.' },
  { href: '/news-intelligence', title: 'KWIN news intelligence', description: 'Publisher-attributed monitoring separated from primary evidence.' },
  { href: '/data-insights', title: 'KWIN data insights', description: 'Research-oriented datasets, visualizations, and provenance.' },
  { href: '/updates', title: 'KWIN updates and change tracking', description: 'Dated project narratives with source and verification context.' },
  { href: '/trust', title: 'Trust and publishing methodology', description: 'The portal’s evidence, freshness, correction, and attribution rules.' },
  { href: '/tools', title: 'Public-interest tools', description: 'Modular tools for examining planning, risk, regulation, investment, and accessibility.' },
] as const;

export const metadata: Metadata = {
  title: 'Aarti S Ravikumar | Creator and Author of KWIN City Portal',
  description: 'Explore the evidence-first KWIN City research, news intelligence, data, tools, and trust methodology created and authored by Aarti S Ravikumar.',
  keywords: [
    'Aarti S Ravikumar', 'Aarti Sri Ravikumar', 'Aarti S Ravikumar work',
    'Aarti Ravikumar KWIN City', 'KWIN City Portal author', 'ai-aarti',
  ],
  authors: [{ name: SITE_IDENTITY.person.name, url: PROFILE }],
  creator: SITE_IDENTITY.person.name,
  alternates: { canonical: PROFILE },
  openGraph: {
    type: 'profile',
    url: PROFILE,
    title: 'Aarti S Ravikumar — KWIN City Portal',
    description: 'Creator and named author of the evidence-first KWIN City research portal.',
    images: [{ url: `${SITE_CONFIG.url}/opengraph-image`, width: 1200, height: 630, alt: 'Aarti S Ravikumar — creator of KWIN City Portal' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Aarti S Ravikumar — KWIN City Portal',
    description: 'Creator and named author of the evidence-first KWIN City research portal.',
    images: [`${SITE_CONFIG.url}/opengraph-image`],
  },
};

const schema = {
  '@context': 'https://schema.org',
  '@type': 'ProfilePage',
  '@id': `${PROFILE}#profile`,
  url: PROFILE,
  name: 'Aarti S Ravikumar — creator and author of KWIN City Portal',
  description: SITE_IDENTITY.person.description,
  dateModified: UPDATED,
  mainEntity: personSchema(),
  hasPart: WORK.map((work) => ({
    '@type': 'CreativeWork',
    name: work.title,
    description: work.description,
    url: `${SITE_CONFIG.url}${work.href}`,
    creator: personReference(),
  })),
};

export default function AartiProfilePage() {
  return (
    <SiteFrame>
      <JsonLd data={schema} />
      <main id="main-content" className="kwin-page-top bg-[linear-gradient(180deg,#f8fafc_0%,#ffffff_45%,#ecfeff_100%)] pb-20">
        <section className="container max-w-5xl py-16 sm:py-24">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-800">Creator profile</p>
          <h1 className="mt-4 max-w-4xl text-4xl font-black tracking-[-0.05em] text-slate-950 sm:text-6xl">Aarti S Ravikumar</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-700">
            Aarti S Ravikumar is the creator and named author of the KWIN City Portal, an evidence-first research and public-information website about the proposed KWIN City project and its North Bengaluru context.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={SITE_IDENTITY.person.externalUrl} target="_blank" rel="me noreferrer" className="rounded-xl bg-slate-950 px-5 py-3 text-sm font-bold text-white hover:bg-cyan-900">Visit ai-aarti.com ↗</a>
            <Link href="/trust" className="rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-bold text-slate-800 hover:border-cyan-500">Review publishing methodology</Link>
          </div>
        </section>

        <section className="container max-w-5xl" aria-labelledby="work-title">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_18px_55px_rgba(15,23,42,0.08)] sm:p-10">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-500">Selected work on this website</p>
            <h2 id="work-title" className="mt-2 text-3xl font-black tracking-[-0.04em] text-slate-950">Research, evidence, intelligence, and tools</h2>
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {WORK.map((work) => (
                <Link key={work.href} href={work.href} className="rounded-2xl border border-slate-200 bg-slate-50 p-5 transition hover:-translate-y-0.5 hover:border-cyan-400 hover:bg-cyan-50">
                  <h3 className="font-extrabold text-slate-950">{work.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{work.description}</p>
                  <span className="mt-4 inline-block text-xs font-black uppercase tracking-wide text-cyan-800">Explore work →</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="container mt-8 max-w-5xl">
          <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm leading-6 text-amber-950">
            <strong>Ownership clarification:</strong>{' '}
            <a href={SITE_IDENTITY.legalOwner.url} className="font-bold underline underline-offset-2">BAJA Associates</a>{' '}
            is identified in this website’s terms as the website and copyright owner.{' '}
            <a href={SITE_IDENTITY.person.externalUrl} rel="me" className="font-bold underline underline-offset-2">Aarti S Ravikumar</a>{' '}
            is identified as its creator and named author. Third-party publications and datasets remain owned by their respective publishers.
          </div>
        </section>
      </main>
    </SiteFrame>
  );
}

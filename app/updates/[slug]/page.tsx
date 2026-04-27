import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import JsonLd from '@/components/JsonLd';
import SiteFrame from '@/components/SiteFrame';
import { SITE_CONFIG } from '@/config/site.config';
import { getUpdateBySlug, getUpdateEntries, getUpdatePath, getUpdateUrl } from '@/lib/updates/content';

type PageProps = {
  params: Promise<{ slug: string }>;
};

const SITE_URL = SITE_CONFIG.url;

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

function getVerificationLabel(tier: 'verified' | 'pending' | 'contextual') {
  if (tier === 'verified') return 'Verified';
  if (tier === 'pending') return 'Pending verification';
  return 'Contextual';
}

function getShareLinks(url: string, title: string) {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  return [
    {
      label: 'Share on X',
      href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    },
    {
      label: 'Share on LinkedIn',
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    },
    {
      label: 'Share on WhatsApp',
      href: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
    },
  ];
}

export function generateStaticParams() {
  return getUpdateEntries().map((entry) => ({ slug: entry.id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const entry = getUpdateBySlug(slug);

  if (!entry) {
    return {};
  }

  const url = getUpdateUrl(slug);
  const title = `${entry.title} | KWIN City Updates`;
  const description = entry.summary;
  const imageUrl = `${SITE_URL}/updates/${slug}/opengraph-image`;

  return {
    title,
    description,
    keywords: [...entry.tags, 'KWIN City updates', 'North Bengaluru project updates'],
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      type: 'article',
      publishedTime: `${entry.date}T00:00:00+05:30`,
      modifiedTime: `${entry.date}T00:00:00+05:30`,
      images: [{ url: imageUrl, width: 1200, height: 630, alt: entry.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
    },
  };
}

export default async function UpdateDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const entry = getUpdateBySlug(slug);

  if (!entry) {
    notFound();
  }

  const pageUrl = getUpdateUrl(slug);
  const verificationLabel = getVerificationLabel(entry.verificationTier);
  const shareLinks = getShareLinks(pageUrl, entry.title);
  const pageSchemas = [
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'Updates', item: `${SITE_URL}/updates` },
        { '@type': 'ListItem', position: 3, name: entry.title, item: pageUrl },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'NewsArticle',
      '@id': `${pageUrl}#article`,
      headline: entry.title,
      description: entry.summary,
      articleBody: entry.body,
      datePublished: `${entry.date}T00:00:00+05:30`,
      dateModified: `${entry.date}T00:00:00+05:30`,
      articleSection: entry.category,
      inLanguage: 'en-IN',
      keywords: entry.tags,
      mainEntityOfPage: pageUrl,
      url: pageUrl,
      author: {
        '@type': 'Organization',
        name: 'KWIN City Research Team',
        url: SITE_URL,
      },
      publisher: {
        '@type': 'Organization',
        name: 'KWIN City',
        url: SITE_URL,
        publishingPrinciples: `${SITE_URL}/trust`,
        logo: {
          '@type': 'ImageObject',
          url: `${SITE_URL}/icon`,
        },
      },
      image: [`${SITE_URL}/updates/${slug}/opengraph-image`],
      citation: entry.links.map((link) => (link.href.startsWith('http') ? link.href : `${SITE_URL}${link.href}`)),
      about: [
        { '@type': 'Thing', name: 'KWIN City' },
        { '@type': 'Thing', name: `Verification tier: ${entry.verificationTier}` },
      ],
      isAccessibleForFree: true,
    },
  ];

  return (
    <SiteFrame>
      <JsonLd data={pageSchemas} />
      <main className="kwin-page-top bg-[linear-gradient(180deg,#f8fafc_0%,#ffffff_35%,#f8fafc_100%)] pb-16">
        <div className="container max-w-4xl">
          <nav aria-label="Breadcrumb" className="mb-6 text-sm text-slate-500">
            <div className="flex flex-wrap items-center gap-2">
              <Link href="/" className="hover:text-slate-700">
                Home
              </Link>
              <span>/</span>
              <Link href="/updates" className="hover:text-slate-700">
                Updates
              </Link>
              <span>/</span>
              <span className="text-slate-700">{entry.title}</span>
            </div>
          </nav>

          <article className="rounded-[2rem] border border-slate-200 bg-white shadow-sm overflow-hidden">
            <div className="border-b border-slate-200 bg-slate-50 px-6 py-5 md:px-10">
              <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                <span>{entry.category}</span>
                <span>•</span>
                <time dateTime={entry.date}>{formatDate(entry.date)}</time>
                <span>•</span>
                <span>{verificationLabel}</span>
              </div>
              <h1 className="mt-4 text-3xl md:text-5xl font-black tracking-tight text-slate-950 leading-tight">
                {entry.title}
              </h1>
              <p className="mt-4 text-lg text-slate-700 leading-8">{entry.summary}</p>
            </div>

            <div className="px-6 py-8 md:px-10">
              <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_16rem]">
                <div>
                  <p className="text-base text-slate-800 leading-8">{entry.body}</p>

                  {entry.tags.length > 0 && (
                    <div className="mt-8">
                      <h2 className="text-sm font-bold uppercase tracking-[0.18em] text-slate-500">Tags</h2>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {entry.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-sm font-medium text-slate-700"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {entry.links.length > 0 && (
                    <div className="mt-8">
                      <h2 className="text-sm font-bold uppercase tracking-[0.18em] text-slate-500">
                        Primary references and next reading
                      </h2>
                      <div className="mt-4 flex flex-wrap gap-3">
                        {entry.links.map((link) => (
                          <Link
                            key={link.label}
                            href={link.href}
                            className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-800 hover:border-amber-300 hover:text-amber-800"
                          >
                            {link.label} →
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <aside className="space-y-4">
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Share</p>
                    <div className="mt-4 flex flex-col gap-2">
                      {shareLinks.map((item) => (
                        <a
                          key={item.label}
                          href={item.href}
                          target="_blank"
                          rel="noreferrer"
                          className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-800 hover:border-amber-300 hover:text-amber-800"
                        >
                          {item.label}
                        </a>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Canonical URL</p>
                    <a
                      href={pageUrl}
                      className="mt-3 block break-all text-sm font-medium text-sky-700 hover:text-sky-900"
                    >
                      {pageUrl}
                    </a>
                  </div>
                </aside>
              </div>
            </div>
          </article>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/updates" className="rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800">
              Back to all updates
            </Link>
            <Link href={getUpdatePath(slug)} className="rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50">
              Permanent link
            </Link>
          </div>
        </div>
      </main>
    </SiteFrame>
  );
}

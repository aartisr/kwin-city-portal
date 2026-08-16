import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import JsonLd from '@/components/JsonLd';
import SiteFrame from '@/components/SiteFrame';
import { SITE_CONFIG } from '@/config/site.config';
import { getSeoAgencyRunByArticleSlug } from '@/lib/seo-agency/store';
import type { DailyArticle, EvidenceStatus, KwinSeoAgencyRun } from '@/lib/seo-agency/types';
import { legalOwnerSchema, personReference } from '@/lib/identity';

type PageProps = {
  params: Promise<{ slug: string }>;
};

const SITE_URL = SITE_CONFIG.url;

function formatDateTime(iso: string): string {
  return new Intl.DateTimeFormat('en-IN', {
    dateStyle: 'long',
    timeStyle: 'short',
    timeZone: 'Asia/Kolkata',
  }).format(new Date(iso));
}

function evidenceClass(status: EvidenceStatus): string {
  if (status === 'verified') return 'border-emerald-200 bg-emerald-50 text-emerald-800';
  if (status === 'pending') return 'border-amber-200 bg-amber-50 text-amber-800';
  return 'border-slate-200 bg-slate-100 text-slate-700';
}

function getShareLinks(article: DailyArticle) {
  const encodedUrl = encodeURIComponent(article.canonicalUrl);
  const encodedTitle = encodeURIComponent(article.title);

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

function getSchema(run: KwinSeoAgencyRun) {
  const article = run.dailyArticle;

  return [
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'SEO Agency', item: `${SITE_URL}/seo-agency` },
        { '@type': 'ListItem', position: 3, name: article.title, item: article.canonicalUrl },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      '@id': `${article.canonicalUrl}#article`,
      headline: article.title,
      description: article.dek,
      datePublished: article.publishedAt,
      dateModified: article.updatedAt,
      inLanguage: 'en-IN',
      mainEntityOfPage: article.canonicalUrl,
      url: article.canonicalUrl,
      articleSection: run.topic.pillar,
      keywords: [run.dailyBrief.primaryKeyword, ...run.dailyBrief.secondaryKeywords],
      articleBody: article.sections.flatMap((section) => section.paragraphs).join('\n\n'),
      author: personReference(),
      copyrightHolder: legalOwnerSchema(),
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
      citation: article.sourceLinks.map((link) => (link.href.startsWith('http') ? link.href : `${SITE_URL}${link.href}`)),
      about: [
        { '@type': 'Thing', name: 'KWIN City' },
        { '@type': 'Thing', name: 'North Bengaluru' },
        { '@type': 'Thing', name: `Evidence status: ${article.evidenceStatus}` },
      ],
      isAccessibleForFree: true,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: article.faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      })),
    },
  ];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const run = await getSeoAgencyRunByArticleSlug(slug);

  if (!run) return {};

  const article = run.dailyArticle;

  return {
    title: article.title,
    description: article.dek,
    keywords: [run.dailyBrief.primaryKeyword, ...run.dailyBrief.secondaryKeywords],
    alternates: { canonical: article.canonicalUrl },
    openGraph: {
      title: article.title,
      description: article.dek,
      url: article.canonicalUrl,
      type: 'article',
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt,
      images: [{ url: `${SITE_URL}/opengraph-image`, width: 1200, height: 630, alt: article.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.dek,
      images: [`${SITE_URL}/opengraph-image`],
    },
  };
}

export default async function SeoAgencyArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const run = await getSeoAgencyRunByArticleSlug(slug);

  if (!run) {
    notFound();
  }

  const article = run.dailyArticle;
  const shareLinks = getShareLinks(article);

  return (
    <SiteFrame>
      <JsonLd data={getSchema(run)} />
      <main className="kwin-page-top bg-[linear-gradient(180deg,#f8fafc_0%,#ffffff_36%,#f8fafc_100%)] pb-16">
        <div className="container max-w-5xl">
          <nav aria-label="Breadcrumb" className="mb-6 text-sm text-slate-500">
            <div className="flex flex-wrap items-center gap-2">
              <Link href="/" className="hover:text-slate-700">
                Home
              </Link>
              <span>/</span>
              <Link href="/seo-agency" className="hover:text-slate-700">
                SEO Agency
              </Link>
              <span>/</span>
              <span className="text-slate-700">Daily Article</span>
            </div>
          </nav>

          <article className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm">
            <header className="border-b border-slate-200 bg-slate-50 px-6 py-8 md:px-10 md:py-10">
              <div className="mb-4 flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-slate-950 px-3 py-1 text-xs font-black uppercase tracking-[0.12em] text-white">
                  {article.heroKicker}
                </span>
                <span className={`rounded-full border px-3 py-1 text-xs font-black uppercase tracking-[0.12em] ${evidenceClass(article.evidenceStatus)}`}>
                  {article.evidenceStatus}
                </span>
              </div>
              <h1 className="text-3xl font-black leading-tight text-slate-950 md:text-5xl">{article.title}</h1>
              <p className="mt-5 text-lg leading-8 text-slate-700">{article.dek}</p>
              <div className="mt-6 flex flex-wrap items-center gap-3 text-sm font-semibold text-slate-500">
                <time dateTime={article.publishedAt}>Published {formatDateTime(article.publishedAt)}</time>
                <span>Reading time: {article.readingTimeMinutes} min</span>
              </div>
            </header>

            <div className="grid gap-8 px-6 py-8 md:px-10 lg:grid-cols-[minmax(0,1fr)_18rem]">
              <div>
                <section className="rounded-2xl border border-cyan-200 bg-cyan-50 p-5">
                  <h2 className="text-sm font-black uppercase tracking-[0.16em] text-cyan-900">Key takeaways</h2>
                  <ul className="mt-4 space-y-3 text-sm leading-7 text-cyan-950">
                    {article.keyTakeaways.map((takeaway) => (
                      <li key={takeaway}>{takeaway}</li>
                    ))}
                  </ul>
                </section>

                <div className="mt-8 space-y-8">
                  {article.sections.map((section) => (
                    <section key={section.heading}>
                      <h2 className="text-2xl font-black text-slate-950">{section.heading}</h2>
                      <div className="mt-3 space-y-4">
                        {section.paragraphs.map((paragraph) => (
                          <p key={paragraph} className="text-base leading-8 text-slate-800">
                            {paragraph}
                          </p>
                        ))}
                      </div>
                    </section>
                  ))}
                </div>

                <section className="mt-10 rounded-2xl border border-slate-200 bg-slate-50 p-6">
                  <h2 className="text-2xl font-black text-slate-950">Reader questions</h2>
                  <div className="mt-5 space-y-5">
                    {article.faqs.map((faq) => (
                      <div key={faq.question}>
                        <h3 className="text-base font-black text-slate-950">{faq.question}</h3>
                        <p className="mt-2 text-sm leading-7 text-slate-700">{faq.answer}</p>
                      </div>
                    ))}
                  </div>
                </section>
              </div>

              <aside className="space-y-4">
                <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                  <h2 className="text-sm font-black uppercase tracking-[0.16em] text-slate-500">Source summary</h2>
                  <p className="mt-3 text-sm leading-7 text-slate-700">{article.sourceSummary}</p>
                </section>

                <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                  <h2 className="text-sm font-black uppercase tracking-[0.16em] text-slate-500">Sources</h2>
                  <div className="mt-4 flex flex-col gap-3">
                    {article.sourceLinks.map((link) => {
                      const isExternal = link.href.startsWith('http');
                      const href = isExternal ? link.href : link.href;
                      return isExternal ? (
                        <a key={link.href} href={href} target="_blank" rel="noreferrer" className="text-sm font-bold text-cyan-800 underline-offset-4 hover:underline">
                          {link.label}
                        </a>
                      ) : (
                        <Link key={link.href} href={href} className="text-sm font-bold text-cyan-800 underline-offset-4 hover:underline">
                          {link.label}
                        </Link>
                      );
                    })}
                  </div>
                </section>

                <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                  <h2 className="text-sm font-black uppercase tracking-[0.16em] text-slate-500">Share</h2>
                  <div className="mt-4 flex flex-col gap-3">
                    {shareLinks.map((link) => (
                      <a key={link.href} href={link.href} target="_blank" rel="noreferrer" className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-bold text-slate-800 hover:border-cyan-300 hover:text-cyan-800">
                        {link.label}
                      </a>
                    ))}
                  </div>
                </section>

                <section className="rounded-2xl border border-amber-200 bg-amber-50 p-5">
                  <h2 className="text-sm font-black uppercase tracking-[0.16em] text-amber-900">Editorial checklist</h2>
                  <ul className="mt-4 space-y-2 text-sm leading-6 text-amber-950">
                    {article.editorialChecklist.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>
              </aside>
            </div>
          </article>
        </div>
      </main>
    </SiteFrame>
  );
}

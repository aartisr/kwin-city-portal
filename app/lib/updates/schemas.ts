import { SITE_CONFIG } from '@/config/site.config';
import { getUpdateEntries, getUpdateUrl } from './content';

const SITE_LOGO = `${SITE_CONFIG.url}/icon`;

function toAbsoluteUrl(pathOrUrl: string): string {
  if (pathOrUrl.startsWith('http://') || pathOrUrl.startsWith('https://')) {
    return pathOrUrl;
  }
  return `${SITE_CONFIG.url}${pathOrUrl}`;
}

export function getUpdatesSchemas() {
  const entries = getUpdateEntries();

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'KWIN City Updates Feed',
    itemListOrder: 'https://schema.org/ItemListOrderDescending',
    numberOfItems: entries.length,
    itemListElement: entries.map((entry, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      url: getUpdateUrl(entry.id),
      name: entry.title,
    })),
  };

  const newsArticleSchemas = entries.map((entry) => ({
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    '@id': `${getUpdateUrl(entry.id)}#article`,
    headline: entry.title,
    description: entry.summary,
    datePublished: `${entry.date}T00:00:00+05:30`,
    dateModified: `${entry.date}T00:00:00+05:30`,
    articleSection: entry.category,
    articleBody: entry.body,
    inLanguage: 'en-IN',
    keywords: entry.tags,
    mainEntityOfPage: getUpdateUrl(entry.id),
    url: getUpdateUrl(entry.id),
    author: {
      '@type': 'Organization',
      name: 'KWIN City Research Team',
      url: SITE_CONFIG.url,
    },
    publisher: {
      '@type': 'Organization',
      name: 'KWIN City',
      url: SITE_CONFIG.url,
      logo: {
        '@type': 'ImageObject',
        url: SITE_LOGO,
      },
    },
    image: [`${SITE_CONFIG.url}/updates/${entry.id}/opengraph-image`],
    citation: entry.links.map((link) => toAbsoluteUrl(link.href)),
    about: [
      {
        '@type': 'Thing',
        name: 'KWIN City',
      },
      {
        '@type': 'Thing',
        name: `Verification tier: ${entry.verificationTier}`,
      },
    ],
  }));

  return [itemListSchema, ...newsArticleSchemas];
}

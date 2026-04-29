import { SITE_CONFIG } from '@/config/site.config';

const SITE_URL = SITE_CONFIG.url;
const LAST_UPDATED = `${SITE_CONFIG.lastUpdatedISO}T00:00:00+05:30`;

export function getHomeSchemas() {
  const realEstateProjectSchema = {
    '@context': 'https://schema.org',
    '@type': 'Place',
    name: 'KWIN City Township',
    description:
      'A proposed 465-acre knowledge-economy township adjacent to Kempegowda International Airport in Doddaballapura, North Bengaluru.',
    url: SITE_URL,
    dateModified: LAST_UPDATED,
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 13.2905,
      longitude: 77.5419,
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Doddaballapura',
      addressRegion: 'Karnataka',
      postalCode: '561203',
      addressCountry: 'IN',
    },
  };

  const collectionPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': `${SITE_URL}/#knowledge-hub`,
    url: SITE_URL,
    name: 'KWIN City Knowledge Hub',
    description:
      'Evidence-first navigation hub for KWIN City research, updates, news intelligence, sources, data insights, and trust documentation.',
    dateModified: LAST_UPDATED,
    isPartOf: {
      '@id': `${SITE_URL}/#website`,
    },
    about: {
      '@type': 'Thing',
      name: 'KWIN City',
    },
    hasPart: [
      `${SITE_URL}/updates`,
      `${SITE_URL}/share`,
      `${SITE_URL}/news-intelligence`,
      `${SITE_URL}/data-insights`,
      `${SITE_URL}/evidence`,
      `${SITE_URL}/sources`,
      `${SITE_URL}/timeline`,
      `${SITE_URL}/faq`,
      `${SITE_URL}/trust`,
    ],
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL }],
  };

  return [realEstateProjectSchema, collectionPageSchema, breadcrumbSchema];
}

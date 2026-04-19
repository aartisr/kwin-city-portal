import { SITE_CONFIG } from '@/config/site.config';

const SITE_URL = SITE_CONFIG.url;
const SITE_LOGO = `${SITE_URL}/icon`;
const LAST_UPDATED = `${SITE_CONFIG.lastUpdatedISO}T00:00:00+05:30`;

export function getHomeSchemas() {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'KWIN City',
    alternateName: 'Knowledge Wellbeing Innovation City',
    url: SITE_URL,
    logo: SITE_LOGO,
    description:
      'KWIN City is presented on this portal as a proposed knowledge-economy township in Doddaballapura, North Bengaluru, with project materials emphasizing semiconductors, aerospace, health-tech, ICT, and renewables.',
    dateModified: LAST_UPDATED,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Doddaballapura',
      addressRegion: 'Karnataka',
      addressCountry: 'IN',
    },
    areaServed: {
      '@type': 'Place',
      name: 'North Bengaluru, Karnataka, India',
    },
    sameAs: ['https://www.kiadb.in'],
  };

  const webSiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'KWIN City Portal',
    url: SITE_URL,
    description:
      'Evidence-first research portal for KWIN City — a proposed knowledge, wellbeing, and innovation township in North Bengaluru.',
    dateModified: LAST_UPDATED,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };

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

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    dateModified: LAST_UPDATED,
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is KWIN City?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'KWIN City stands for Knowledge, Wellbeing, and Innovation City. It is presented on this portal as a proposed knowledge-economy township in Doddaballapura, North Bengaluru. Project materials describe major investment and jobs ambitions, and readers should verify critical figures against primary institutional records.',
        },
      },
      {
        '@type': 'Question',
        name: 'Where is KWIN City located?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'KWIN City is located in Doddaballapura, North Bengaluru, Karnataka, India — approximately 33 km from Bengaluru city centre and adjacent to Kempegowda International Airport (KIAL).',
        },
      },
      {
        '@type': 'Question',
        name: 'What industries will be in KWIN City?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Project materials describe five target sectors for KWIN City: semiconductors, aerospace and defence, health-tech and life sciences, ICT and deep tech, and renewable energy. The portal treats these as proposal-level sector priorities unless confirmed by primary records.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is KWIN City a sustainable township?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'KWIN City is described as a sustainability-led proposal with ambitions such as net-zero operations, green cover, solar systems, and water resilience. Those sustainability features should be read as proposal intent unless and until implementation records confirm delivery.',
        },
      },
      {
        '@type': 'Question',
        name: 'Who is developing KWIN City?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Project materials cited on this portal associate KWIN City with KIADB, the Karnataka Industrial Areas Development Board. Readers should verify the current development and implementation status against primary institutional records.',
        },
      },
    ],
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL }],
  };

  return [organizationSchema, webSiteSchema, realEstateProjectSchema, faqSchema, breadcrumbSchema];
}

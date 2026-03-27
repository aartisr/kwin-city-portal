import type { Metadata } from 'next';
import Hero from '@/components/Hero';
import BengaluruPride from '@/components/BengaluruPride';
import SiteFrame from '@/components/SiteFrame';
import HomeSummary from '@/components/HomeSummary';
import HomeTrustSnapshot from '@/components/HomeTrustSnapshot';
import HomeRouteGrid from '@/components/HomeRouteGrid';
import EvidencePreview from '@/components/EvidencePreview';
import ImageStrip from '@/components/ImageStrip';
import PersonaHub from '@/components/PersonaHub';
import JsonLd from '@/components/JsonLd';
import { SITE_CONFIG } from '@/config/site.config';
import { getServerLocale, pickByLocale } from '@/lib/i18n/server';

const SITE_URL = SITE_CONFIG.url;
const LAST_UPDATED = `${SITE_CONFIG.lastUpdatedISO}T00:00:00+05:30`;

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  return {
    title: pickByLocale(locale, {
      en: 'KWIN City | Knowledge · Wellbeing · Innovation | North Bengaluru',
      kn: 'KWIN City | ಜ್ಞಾನ · ಕ್ಷೇಮ · ನವೀನತೆ | ಉತ್ತರ ಬೆಂಗಳೂರು',
      hi: 'KWIN City | ज्ञान · कल्याण · नवाचार | नॉर्थ बेंगलुरु',
    }),
    description: pickByLocale(locale, {
      en: 'KWIN City is a proposed 465-acre knowledge-economy township in Doddaballapura, North Bengaluru. Semiconductors, aerospace, health-tech, renewables and R&D — designed net-zero and evidence-first.',
      kn: 'KWIN City ಉತ್ತರ ಬೆಂಗಳೂರಿನ ದೊಡ್ಡಬಳ್ಳಾಪುರದಲ್ಲಿ ಪ್ರಸ್ತಾಪಿತ 465 ಏಕರೆ ಜ್ಞಾನ-ಆರ್ಥಿಕ ಟೌನ್‌ಶಿಪ್.',
      hi: 'KWIN City नॉर्थ बेंगलुरु के डोड्डाबल्लापुर में प्रस्तावित 465 एकड़ ज्ञान-आर्थिक टाउनशिप है।',
    }),
    alternates: {
      canonical: 'https://kwin-city.com',
    },
  };
}

// ─── Schema.org Structured Data ────────────────────────────────────────────
const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'KWIN City',
  alternateName: 'Knowledge Wellbeing Innovation City',
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  description:
    'KWIN City is a proposed 465-acre knowledge-economy township in Doddaballapura, North Bengaluru, operated by KIADB. Focused on semiconductors, aerospace, health-tech, ICT, and renewables.',
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
  sameAs: [
    'https://www.kiadb.in',
  ],
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
  '@type': 'LandmarksOrHistoricalBuildings',
  name: 'KWIN City Township',
  description:
    'A proposed 465-acre net-zero knowledge township adjacent to Kempegowda International Airport, Doddaballapura, North Bengaluru.',
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
        text: 'KWIN City stands for Knowledge, Wellbeing, and Innovation City. It is a proposed 465-acre multi-phase township in Doddaballapura, North Bengaluru, developed by KIADB (Karnataka Industrial Areas Development Board) targeting ₹40,000 crore investment and 100,000+ high-skill jobs.',
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
        text: 'KWIN City targets five high-growth sectors: semiconductors, aerospace & defence, health-tech & life sciences, ICT & deep tech, and renewable energy. Each sector will have dedicated infrastructure and innovation support.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is KWIN City a sustainable township?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. KWIN City is designed to achieve net-zero carbon operations. The plan includes solar self-sufficiency, 40% green cover, interconnected lakes, and near-zero waste systems.',
      },
    },
    {
      '@type': 'Question',
      name: 'Who is developing KWIN City?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'KWIN City is operated by KIADB — the Karnataka Industrial Areas Development Board — the statutory body responsible for industrial infrastructure in Karnataka.',
      },
    },
  ],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
  ],
};

export default function Home() {
  return (
    <SiteFrame>
      <JsonLd data={[organizationSchema, webSiteSchema, realEstateProjectSchema, faqSchema, breadcrumbSchema]} />
      <main id="main-content" role="main">
        <Hero />
        <ImageStrip />
        <BengaluruPride />
        <HomeSummary />
        <HomeTrustSnapshot />
        <PersonaHub />
        <HomeRouteGrid />
        <EvidencePreview />
      </main>
    </SiteFrame>
  );
}

import { SITE_CONFIG } from '@/config/site.config';

export const SITE_IDENTITY = {
  person: {
    id: `${SITE_CONFIG.url}/aarti-s-ravikumar#person`,
    name: 'Aarti S Ravikumar',
    alternateNames: ['Aarti Sri Ravikumar'],
    profileUrl: `${SITE_CONFIG.url}/aarti-s-ravikumar`,
    externalUrl: 'https://ai-aarti.com',
    description: 'Creator and named author of the KWIN City evidence-first research portal.',
  },
  legalOwner: {
    id: `${SITE_CONFIG.url}/#baja-associates`,
    name: 'BAJA Associates',
    url: 'https://baja.kwin-city.com',
  },
} as const;

export function personReference() {
  return { '@id': SITE_IDENTITY.person.id };
}

export function personSchema() {
  return {
    '@type': 'Person',
    '@id': SITE_IDENTITY.person.id,
    name: SITE_IDENTITY.person.name,
    alternateName: SITE_IDENTITY.person.alternateNames,
    url: SITE_IDENTITY.person.profileUrl,
    sameAs: [SITE_IDENTITY.person.externalUrl],
    description: SITE_IDENTITY.person.description,
    knowsAbout: [
      'KWIN City',
      'North Bengaluru',
      'Evidence-first research',
      'Urban development intelligence',
      'AI and digital public-interest tools',
    ],
  };
}

export function legalOwnerSchema() {
  return {
    '@type': 'Organization',
    '@id': SITE_IDENTITY.legalOwner.id,
    name: SITE_IDENTITY.legalOwner.name,
    url: SITE_IDENTITY.legalOwner.url,
    sameAs: [SITE_IDENTITY.legalOwner.url],
  };
}

import { SITE_CONFIG } from '@/config/site.config';
import { legalOwnerSchema, personReference } from '@/lib/identity';

export const INTERACTIVE_APPLICATIONS = [
  { name: 'KWIN Spatial Explorer', path: '/tools/spatial-explorer', category: 'MappingApplication', features: ['Interactive map', 'Phase overlays', 'Source provenance', 'GeoJSON export'] },
  { name: 'KWIN Risk Check', path: '/tools/risk-check', category: 'BusinessApplication', features: ['Preliminary risk assessment', 'Evidence links', 'Recommendations'] },
  { name: 'KWIN Accessibility Calculator', path: '/tools/accessibility', category: 'TravelApplication', features: ['Travel-time scenarios', 'Projected comparisons', 'Assumption disclosure'] },
  { name: 'KWIN Regulatory Navigator', path: '/tools/regulatory-navigator', category: 'BusinessApplication', features: ['Persona pathways', 'Authority checkpoints', 'Document checklist'] },
  { name: 'KWIN Valuation Index', path: '/tools/valuation-index', category: 'FinanceApplication', features: ['Zone comparison', 'Directional indicators', 'Evidence context'] },
  { name: 'KWIN Investment Radar', path: '/tools/investment-radar', category: 'FinanceApplication', features: ['Category filters', 'Commitment stages', 'Dated signals'] },
  { name: 'KWIN Opportunity Exchange', path: '/tools/opportunity-exchange', category: 'BusinessApplication', features: ['Structured requirement submission', 'Request status', 'Opportunity board'] },
  { name: 'KWIN Open Data Studio', path: '/tools/open-data-studio', category: 'DeveloperApplication', features: ['Dataset catalog', 'CSV export', 'GeoJSON export', 'JSON export'] },
] as const;

export function interactiveApplicationsSchema() {
  const applications = INTERACTIVE_APPLICATIONS.map((application) => ({
    '@type': 'WebApplication',
    '@id': `${SITE_CONFIG.url}${application.path}#application`,
    name: application.name,
    url: `${SITE_CONFIG.url}${application.path}`,
    applicationCategory: application.category,
    operatingSystem: 'Any modern web browser',
    isAccessibleForFree: true,
    featureList: application.features,
    author: personReference(),
    copyrightHolder: { '@id': legalOwnerSchema()['@id'] },
  }));

  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    '@id': `${SITE_CONFIG.url}/tools#interactive-applications`,
    name: 'KWIN City interactive intelligence applications',
    numberOfItems: applications.length,
    itemListElement: applications.map((item, index) => ({ '@type': 'ListItem', position: index + 1, item })),
  };
}

import type { InfrastructureItem } from '@/types/kwin';

export const KWIN_INFRASTRUCTURE: InfrastructureItem[] = [
  {
    id: 'solar-park',
    name: 'Solar Farm',
    description:
      'Dedicated renewable energy generation facility designed for sustainability [Details pending verification]',
    status: 'planned',
    capacity: '~465 acres [pending verification]',
    certifications: ['ISO 50001 (projected)', 'Net-Zero Energy Target'],
  },
  {
    id: 'lakes',
    name: 'Water Management System',
    description: '10 interconnected lakes for water conservation and urban cooling [Details pending verification]',
    status: 'planned',
    capacity: 'TBD [pending verification]',
    certifications: ['Water Recycling Compliant', 'Biodiversity Protected'],
  },
  {
    id: 'strr-connectivity',
    name: 'Satellite Town Ring Road Connectivity',
    description: 'Strategic highway connectivity to major transport corridors [Status pending verification]',
    status: 'planned',
    location: 'North Bengaluru Corridor',
  },
  {
    id: 'healthcare',
    name: 'Healthcare Infrastructure',
    description: 'World-class hospital and health-tech centers [Partners pending verification]',
    status: 'planned',
  },
  {
    id: 'transit',
    name: 'Public Transit System',
    description: 'Integrated bus rapid transit and public transportation network',
    status: 'planned',
  },
];

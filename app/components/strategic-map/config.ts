import { KWIN_EVIDENCE_SOURCES, KWIN_GEOGRAPHIC_LOCATIONS } from '@/data/constants';

export const MAP_CENTER: [number, number] = [77.6045, 13.1939];

export const MAP_LOCATIONS = KWIN_GEOGRAPHIC_LOCATIONS.filter(
  (location) => location.id !== 'irr-node',
);

export const MAP_LEGEND_ITEMS = [
  {
    icon: '🏢',
    gradient: 'radial-gradient(circle, #8b5cf6 0%, #8b5cf6dd 100%)',
    label: 'KWIN City',
    description: '465+ acre township site',
  },
  {
    icon: '✈️',
    gradient: 'radial-gradient(circle, #ec4899 0%, #ec4899dd 100%)',
    label: "Bengaluru Int'l Airport",
    description: 'Gateway connectivity',
  },
  {
    icon: '🛣️',
    gradient: 'radial-gradient(circle, #10b981 0%, #10b981dd 100%)',
    label: 'STRR Connectivity',
    description: 'Strategic orbital corridor',
  },
  {
    icon: '📍',
    gradient: 'radial-gradient(circle, #3b82f6 0%, #3b82f6dd 100%)',
    label: 'Key Landmarks',
    description: 'Reference points',
  },
] as const;

export const STRR_SOURCE = KWIN_EVIDENCE_SOURCES.find((source) => source.id === 'strr-documents');
export const AIRPORT_SOURCE = KWIN_EVIDENCE_SOURCES.find((source) => source.id === 'aviation-traffic');

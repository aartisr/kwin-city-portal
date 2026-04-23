import type { GeographicLocation } from '@/types/kwin';

// Geographic locations for Strategic Location & Connectivity Map
// Data sourced from: OpenStreetMap, Government of Karnataka, KIADB, OpenCity datasets
export const KWIN_GEOGRAPHIC_LOCATIONS: GeographicLocation[] = [
  {
    id: 'kwin-site',
    name: 'KWIN City (Proposed)',
    coordinates: [77.6045, 13.1939], // Doddaballapura, North Bengaluru
    type: 'kwin-site',
    description: '465+ acres | Knowledge, Wellbeing, Innovation Township',
    sourceId: 'verified',
  },
  {
    id: 'bangalore-airport',
    name: 'Bengaluru International Airport',
    coordinates: [77.7099, 13.1939], // Devanahalli
    type: 'airport',
    description: 'Gateway to India | Strategic connectivity nexus',
    distance: '~12 km from KWIN City (adjacent)',
    sourceId: 'aviation-traffic',
  },
  {
    id: 'city-center',
    name: 'Bengaluru City Center',
    coordinates: [77.6369, 12.9716],
    type: 'landmark',
    description: 'Central Business District | Tech corridor hub',
    distance: '~40 km south of KWIN City',
  },
  {
    id: 'strr-corridor',
    name: 'Satellite Town Ring Road (STRR)',
    coordinates: [77.6045, 13.0939],
    type: 'connectivity',
    description: 'Orbital highway corridor | Connects satellite towns & major transport nodes',
    sourceId: 'strr-documents',
  },
  {
    id: 'whitefield',
    name: 'Whitefield Tech Corridor',
    coordinates: [77.7499, 12.9656],
    type: 'landmark',
    description: 'Existing high-tech cluster | IT/ITeS anchor',
    distance: '~35 km south of KWIN City',
  },
  {
    id: 'electronic-city',
    name: 'Electronic City',
    coordinates: [77.6769, 12.8386],
    type: 'landmark',
    description: 'Established IT/ITeS hub | Tech industry anchor',
    distance: '~50 km south of KWIN City',
  },
  {
    id: 'irr-node',
    name: 'Intermediate Ring Road (IRR)',
    coordinates: [77.5545, 13.0145],
    type: 'connectivity',
    description: 'Peripheral road planning logic | Connects towns around Bengaluru',
    sourceId: 'irr-documents',
  },
];

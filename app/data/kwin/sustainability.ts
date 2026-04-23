import type { SustainabilityMetric } from '@/types/kwin';

export const KWIN_SUSTAINABILITY_METRICS: SustainabilityMetric[] = [
  {
    name: 'Green Cover',
    target: '40% of total area',
    unit: 'hectares',
    deadline: '2030',
  },
  {
    name: 'Renewable Energy',
    target: '100% of operational energy',
    unit: 'MW',
    deadline: '2030',
  },
  {
    name: 'Water Recycling',
    target: '80% of wastewater treated and reused',
    unit: 'percentage',
    deadline: '2029',
  },
  {
    name: 'Carbon Neutrality',
    target: 'Net-zero emissions',
    unit: 'carbon neutral',
    deadline: '2030',
  },
  {
    name: 'Biodiversity Index',
    target: 'Restore native species population',
    unit: 'species count',
    deadline: '2028',
  },
  {
    name: 'Urban Heat Island Mitigation',
    target: 'Reduce surface temp by 2-3°C vs. baseline',
    unit: '°C reduction',
    deadline: '2029',
  },
];

// Verified & Pending Facts - Transparent Sourcing
export const KWIN_FACTS = {
  verified: [
    'Location: Doddaballapura, North Bengaluru, Karnataka',
    'Operator: Karnataka Industrial Areas Development Board (KIADB)',
    'Project Phases: Multi-phase development (Phase 1-5)',
    'Scope: Multi-sector township with Knowledge, Wellbeing, and Innovation domains',
  ],
  pendingVerification: [
    'Total Area: ~465+ acres',
    'Total Investment Target: ₹40,000 Crore',
    'Expected Employment: 100,000+ direct jobs',
    'University Partnerships: Liverpool, St. Johns [sources not yet verified]',
    'Satellite Town Ring Road (STRR) Connectivity: Details pending confirmation',
    '10 Interconnected Lakes: Specifications pending verification',
    '465-acre Solar Park: Technical specifications pending',
    'Completion Timeline: 2030 (subject to regulatory approvals)',
  ],
  unconfirmed: [
    'Specific corporate anchor tenants',
    'Exact hospital partners and capacities',
    'Detailed infrastructure timeline',
    'Environmental clearance status',
    'Funding arrangement breakdown',
  ],
};

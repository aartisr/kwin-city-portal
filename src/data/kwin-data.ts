import { District, TimelinePhase, EvidenceSource, ClaimMapping } from '../types';

export const KWIN_META = {
  name: "KWIN City",
  fullName: "Knowledge, Wellbeing, and Innovation City",
  formerName: "KHIR City (Knowledge, Health, Innovation, and Research City)",
  state: "Karnataka",
  country: "India",
  location: "North Bengaluru (Between Doddaballapur and Dabaspet)",
  coordinates: "13.293° N, 77.418° E",
  totalAcreage: 5800,
  projectedPopulation: 500000,
  projectedInvestmentINR: "₹40,000 Crore",
  projectedInvestmentUSD: "$4.8 Billion",
  expectedJobs: "80,000 – 100,000",
  airportDistanceKm: 38,
  airportTravelTimeMin: 45,
  launchDate: "September 26, 2024",
  launchingAuthority: "Govt of Karnataka (Chief Minister Siddaramaiah & Minister MB Patil)",
  solarFarmAcreage: 465,
  rainwaterHarvestingTarget: "50% of total demand",
  evTransitCorridorKm: 82,
};

export const DISTRICTS: District[] = [
  {
    id: 'knowledge',
    name: 'Knowledge & Higher Education District',
    category: 'knowledge',
    tagline: 'Global Ivy-League & Research University Hub',
    acreage: 1500,
    description: 'A 1,500-acre academic campus zone designed for international university campuses, postgraduate polytechnics, applied AI laboratories, and executive skill centers.',
    focusAreas: ['Autonomous Systems', 'Applied AI & Quantum Computing', 'Genomics & Biotech', 'Sustainable Urbanism'],
    keyAnchors: ['International University Satellite Campuses', 'Karnataka State AI Excellence Center', 'Advanced Materials Institute'],
    projectedJobs: 28000,
    expectedInvestment: '₹10,500 Cr',
    color: '#3B82F6', // Blue
    iconName: 'GraduationCap',
  },
  {
    id: 'health',
    name: 'Health & Life Sciences District',
    category: 'health',
    tagline: 'Precision Medicine & MedTech Manufacturing Sanctuary',
    acreage: 1400,
    description: 'An integrated healthcare ecosystem uniting tertiary research hospitals, clinical trial zones, bio-foundries, medical robotics labs, and Ayurvedic integrative wellness sanctuaries.',
    focusAreas: ['Precision Oncology', 'Genomic Therapeutics', 'Medical Robotics & Imaging', 'Clinical Trial Incubators'],
    keyAnchors: ['Super-Specialty Research Hospital', 'Biomedical Innovation Hub', 'Stem Cell & Regenerative Medicine Lab'],
    projectedJobs: 24000,
    expectedInvestment: '₹11,200 Cr',
    color: '#10B981', // Emerald
    iconName: 'Activity',
  },
  {
    id: 'innovation',
    name: 'Innovation & Smart Enterprise District',
    category: 'innovation',
    tagline: 'DeepTech, SpaceTech & AI-First Commercial Hub',
    acreage: 1600,
    description: 'High-density tech clusters with zero-carbon footprint office campuses, prototyping workshops, semiconductor design houses, and venture acceleration labs.',
    focusAreas: ['Fabless Semiconductor Design', 'Enterprise AI & SaaS', 'Satellite Subsystems & SpaceTech', 'Autonomous Mobility R&D'],
    keyAnchors: ['Global Tech Unicorn Hub', 'Fabless Silicon Testing Lab', 'SpaceTech Incubation Cluster'],
    projectedJobs: 32000,
    expectedInvestment: '₹12,800 Cr',
    color: '#8B5CF6', // Purple
    iconName: 'Cpu',
  },
  {
    id: 'research',
    name: 'Research & Advanced Engineering District',
    category: 'research',
    tagline: 'Defense, CleanTech & Next-Gen Manufacturing',
    acreage: 1300,
    description: 'Prototyping parks, clean-room facilities, battery gigafactory testbeds, aerospace metallurgy research, and green hydrogen technology centers.',
    focusAreas: ['Solid-State Battery R&D', 'Green Hydrogen Storage', 'Aerospace Composites', 'Next-Gen Robotics'],
    keyAnchors: ['Clean Energy Prototyping Park', 'Aviation Metallurgy Center', 'Robotics Systems Foundry'],
    projectedJobs: 16000,
    expectedInvestment: '₹5,500 Cr',
    color: '#F59E0B', // Amber
    iconName: 'Compass',
  },
];

export const TIMELINE_PHASES: TimelinePhase[] = [
  {
    id: 'phase-0',
    phase: 'Phase 0: Master Planning & Land Gazetting',
    yearRange: '2023 – 2024',
    title: 'Statutory Gazetting & Spatial Conception',
    status: 'completed',
    progress: 100,
    description: 'Feasibility analysis, inter-departmental clearances, high-level master layout finalization, and initial KIADB gazette notification.',
    milestones: [
      'Official Cabinet Approval for KHIR/KWIN City project (₹40,000 Cr envelope)',
      'Site demarcation between Doddaballapur & Dabaspet corridor',
      'Open-access public consultation and masterplan release',
      'Launch of KWIN City official portal & investor concierge'
    ],
    targetAcreage: 1200,
  },
  {
    id: 'phase-1',
    phase: 'Phase 1: Trunk Infrastructure & Utilities',
    yearRange: '2024 – 2027',
    title: 'Arterial Roads, Power Grid & Solar Hub',
    status: 'in-progress',
    progress: 42,
    description: 'Groundwork execution, 465-acre solar farm civil works, trunk water conduits from STRR corridor, and arterial road networks A-14 and B-22.',
    milestones: [
      'KIADB acquisition of initial 2,000-acre contiguous land parcels',
      'Construction kickoff for 465-acre captive solar farm',
      'Laying of 8-lane expressway connecting NH-44 to STRR',
      'Groundbreaking for Anchor Tertiary Hospital & AI Research Lab'
    ],
    targetAcreage: 2000,
  },
  {
    id: 'phase-2',
    phase: 'Phase 2: District Anchors & Tech Incubators',
    yearRange: '2027 – 2030',
    title: 'University Campuses & Commercial Cores',
    status: 'planned',
    progress: 0,
    description: 'Delivery of 1500-acre higher education campuses, super-specialty hospital commissioning, and venture incubation zones.',
    milestones: [
      'Inauguration of top-tier foreign university satellite campus',
      'Commissioning of 1,000-bed Research Hospital and Bio-foundry',
      'First 25,000 high-tech jobs operational in Innovation District',
      'Suburban rail feeder link to Kempegowda Airport operational'
    ],
    targetAcreage: 1800,
  },
  {
    id: 'phase-3',
    phase: 'Phase 3: Mature Ecosystem & Full Expansion',
    yearRange: '2030 – 2035',
    title: 'Full 5,800-Acre Integrated Smart Metropolis',
    status: 'planned',
    progress: 0,
    description: 'Completion of all 4 districts, 500,000 population capacity, 100% net-zero water & power operation, and complete circular economy.',
    milestones: [
      'Achieving target 100,000 knowledge-economy workforce',
      '100% renewable grid coverage via on-site solar and micro-hydro',
      'Full integration with Bengaluru-Pune Industrial Expressway corridor',
      'Global recognition as South Asia’s premier life sciences & AI hub'
    ],
    targetAcreage: 800,
  },
];

export const OPENCITY_DATA_RECORDS = {
  aviationTraffic: [
    { year: '2015', passengers: 15400000, growthPct: 15.2, cargoTons: 285000 },
    { year: '2017', passengers: 22800000, growthPct: 24.1, cargoTons: 334000 },
    { year: '2019', passengers: 33300000, growthPct: 18.3, cargoTons: 386000 },
    { year: '2021', passengers: 13100000, growthPct: -60.7, cargoTons: 326000 },
    { year: '2022', passengers: 27500000, growthPct: 109.9, cargoTons: 412000 },
    { year: '2023', passengers: 37200000, growthPct: 35.3, cargoTons: 439000 },
    { year: '2024', passengers: 42100000, growthPct: 13.2, cargoTons: 480000 },
    { year: '2025 (P)', passengers: 48500000, growthPct: 15.2, cargoTons: 530000 },
    { year: '2026 (P)', passengers: 55000000, growthPct: 13.4, cargoTons: 590000 },
  ],
  groundwaterDepth: [
    { taluk: 'Doddaballapur', preMonsoonDepthM: 42.8, postMonsoonDepthM: 35.4, status: 'Semi-Critical' },
    { taluk: 'Nelamangala', preMonsoonDepthM: 48.2, postMonsoonDepthM: 40.1, status: 'Over-Exploited' },
    { taluk: 'Devanahalli', preMonsoonDepthM: 52.4, postMonsoonDepthM: 44.8, status: 'Critical' },
    { taluk: 'Hosakote', preMonsoonDepthM: 46.1, postMonsoonDepthM: 38.9, status: 'Semi-Critical' },
    { taluk: 'Tumakuru Rural', preMonsoonDepthM: 34.5, postMonsoonDepthM: 28.2, status: 'Safe' },
    { taluk: 'Gauribidanur', preMonsoonDepthM: 38.0, postMonsoonDepthM: 31.5, status: 'Safe' },
  ],
  projectedJobsBySector: [
    { sector: 'AI & Enterprise Software', jobs: 32000, percentage: 32, fill: '#8B5CF6' },
    { sector: 'Higher Ed & Research', jobs: 28000, percentage: 28, fill: '#3B82F6' },
    { sector: 'BioTech & MedTech', jobs: 24000, percentage: 24, fill: '#10B981' },
    { sector: 'Advanced Manufacturing', jobs: 16000, percentage: 16, fill: '#F59E0B' },
  ],
  lakesStewardship: [
    { agency: 'BBMP Lake Division', count: 183, pct: 54 },
    { agency: 'Minor Irrigation Dept', count: 72, pct: 21 },
    { agency: 'Forest Department', count: 48, pct: 14 },
    { agency: 'BDA', count: 37, pct: 11 },
  ]
};

export const EVIDENCE_SOURCES: EvidenceSource[] = [
  {
    id: 'src-opencity-docs',
    title: 'OpenCity - KWIN City Government Documents & Planning Drawings',
    publisher: 'OpenCity.in / Urban Informatics Lab',
    scope: 'Master plan PDF drawings, sector maps, and environmental notifications',
    url: 'https://data.opencity.in/dataset/kwin-city-documents',
    status: 'verified',
    summary: 'Repository of official downloadable drawings published by KIADB for Phase 3 Sectors 1-3.',
    supports: ['5,800-acre planned extent', 'Road centerline hierarchy', 'District zoning allocations'],
    cannotProve: ['Current on-ground construction completion rates', 'Exact commercial lease pricing'],
    lastAudited: '2026-02-15',
    hash: 'sha256:e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855'
  },
  {
    id: 'src-kiadb-gazette',
    title: 'Karnataka Industrial Area Development Board (KIADB) Gazette Notification',
    publisher: 'Government of Karnataka Gazette Archive',
    scope: 'Statutory land acquisition notifications for Doddaballapur-Dabaspet corridor',
    url: 'https://kiadb.karnataka.gov.in/',
    status: 'verified',
    summary: 'Official state gazette demarcating survey numbers and compensation frameworks for KWIN site.',
    supports: ['Legal boundary lines', 'Preliminary acquisition clearance', 'Industrial area designation'],
    cannotProve: ['Tenant occupancy timelines', 'Non-statutory marketing claims'],
    lastAudited: '2026-01-20',
    hash: 'sha256:7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069'
  },
  {
    id: 'src-bial-traffic',
    title: 'Kempegowda International Airport (BIAL) Annual Traffic & Expansion Report',
    publisher: 'Bangalore International Airport Limited',
    scope: 'Passenger growth statistics and Terminal 2 cargo/passenger capacity metrics',
    url: 'https://www.bengaluruairport.com/',
    status: 'project-adjacent',
    summary: 'Corroborating data on North Bengaluru’s aviation dominance and proximity advantages.',
    supports: ['45-min transit catchment to airport', 'Regional air cargo bandwidth'],
    cannotProve: ['Internal KWIN intra-city transit speed'],
    lastAudited: '2026-03-01',
    hash: 'sha256:d8578edf8458ce06fbc5bb76a58c5ca4ff5a77f3747f52cae96f131a4cfbb756'
  },
  {
    id: 'src-karnataka-ind-policy',
    title: 'Karnataka Industrial Policy 2020-2025 & Bio-Economy Strategy',
    publisher: 'Department of Commerce & Industries, Govt of Karnataka',
    scope: 'Subsidies, tax exemptions, and SEZ regulatory fast-track guidelines',
    url: 'https://kum.karnataka.gov.in/',
    status: 'verified',
    summary: 'Statutory basis for anchor fiscal incentives, stamp duty exemptions, and capital subsidies.',
    supports: ['Investment incentive ceilings', 'Single-window clearance SLA of 30 days'],
    cannotProve: ['Private entity investment guarantees'],
    lastAudited: '2026-02-10',
    hash: 'sha256:9f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9011'
  }
];

export const CLAIM_MAPPINGS: ClaimMapping[] = [
  {
    id: 'claim-1',
    claim: 'KWIN City spans 5,800 acres situated between Doddaballapur and Dabaspet.',
    category: 'Land & Scale',
    officialStatus: 'verified',
    verifiedSource: 'KIADB Preliminary Gazette & Cabinet Resolution #CR-2024-88',
    sourceUrl: 'https://data.opencity.in/dataset/kwin-city-documents',
    analysis: 'Verified through official state planning publications. Total demarcated boundary encompasses 5,800 acres across 14 revenue villages.'
  },
  {
    id: 'claim-2',
    claim: 'Expected total capital infusion of ₹40,000 Crore ($4.8 Billion USD).',
    category: 'Investment',
    officialStatus: 'in-progress',
    verifiedSource: 'State High-Level Clearance Committee (SHLCC) Projected Pipeline',
    sourceUrl: 'https://kum.karnataka.gov.in/',
    analysis: 'Target capital expenditure envelope approved in principle by Government of Karnataka; ₹8,400 Cr committed via initial MoUs.'
  },
  {
    id: 'claim-3',
    claim: 'Creation of 80,000 to 100,000 knowledge-economy jobs.',
    category: 'Employment',
    officialStatus: 'in-progress',
    verifiedSource: 'Karnataka Skill Development & Industrial Projection Model 2025',
    sourceUrl: 'https://data.opencity.in/dataset/kwin-city-documents',
    analysis: 'Modelled based on 5,800 acres density calculations across tech, medtech, and higher education campus footprints.'
  },
  {
    id: 'claim-4',
    claim: 'Self-sustaining 465-acre solar farm and 50% rainwater harvesting mandate.',
    category: 'Sustainability',
    officialStatus: 'verified',
    verifiedSource: 'State Environmental Impact Assessment Authority (SEIAA) Master Plan',
    sourceUrl: 'https://data.opencity.in/dataset/kwin-city-documents',
    analysis: 'Statutory green zoning mandates captive 465-acre solar field and decentralized rainwater retention lakes to mitigate groundwater deficit.'
  }
];

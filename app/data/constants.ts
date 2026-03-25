import {
  TimelinePhase,
  Pillar,
  InfrastructureItem,
  Sector,
  SustainabilityMetric,
  EvidenceSource,
  SourceReference,
  ClaimMapping,
  GeographicLocation,
} from '../types/kwin';

export const KWIN_TIMELINE_PHASES: TimelinePhase[] = [
  {
    id: 'phase-0',
    year: 2024,
    title: 'Inauguration & Land Acquisition',
    description: 'Official launch and commencement of land acquisition and master planning',
    milestones: [
      'Project inauguration ceremony',
      'KIADB approvals finalized',
      'Initial land demarcation',
      'Master plan public disclosure',
    ],
    status: 'completed',
    progress: 100,
  },
  {
    id: 'phase-1',
    year: 2025,
    title: 'Infrastructure & Connectivity',
    description: 'Development of core infrastructure and road connectivity [PENDING VERIFICATION]',
    milestones: [
      'Road network planning and partial construction',
      'Satellite Town Ring Road (STRR) connectivity framework',
      'Water supply and sewerage systems design',
      'Electrical grid planning',
    ],
    status: 'in-progress',
    progress: 35,
  },
  {
    id: 'phase-2',
    year: 2026,
    title: 'Institutional & Knowledge District Setup',
    description: 'Establishment of research institutions and knowledge centers [PENDING VERIFICATION]',
    milestones: [
      'University partnerships formalization [pending verification]',
      'Research center site preparation',
      'Healthcare infrastructure groundwork',
      'Knowledge district zoning finalization',
    ],
    status: 'planned',
    progress: 10,
  },
  {
    id: 'phase-3',
    year: 2027,
    title: 'Industrial & Revenue Generation Phase',
    description: 'Launch of semiconductor and innovation clusters [PENDING VERIFICATION]',
    milestones: [
      'Semiconductor park land release',
      'Aerospace cluster infrastructure setup',
      'Solar farm construction (465 acres) [pending verification]',
      'Industrial land allotments commence',
    ],
    status: 'planned',
    progress: 0,
  },
  {
    id: 'phase-4',
    year: 2028,
    title: 'Wellbeing & Sustainability Integration',
    description: 'Green infrastructure and wellness centers operational [PENDING VERIFICATION]',
    milestones: [
      'Lake restoration and water management systems complete',
      'Green building standards enforcement begins',
      'Health-tech hub operational',
      'Urban heat island mitigation systems',
    ],
    status: 'planned',
    progress: 0,
  },
  {
    id: 'phase-5',
    year: 2030,
    title: 'Full Operational Status',
    description: 'Complete ecosystem operational with mixed-use development [PENDING VERIFICATION]',
    milestones: [
      'Primary industrial clusters operational',
      '100,000+ jobs created [pending verification]',
      'Net-zero carbon operations target',
      'World-class amenities fully functional',
    ],
    status: 'planned',
    progress: 0,
  },
];

export const KWIN_PILLARS: Pillar[] = [
  {
    id: 'knowledge',
    title: 'Knowledge',
    subtitle: 'Research & Innovation Hub',
    description: 'Dedicated zones for higher education, research institutions, and innovation centers. featuring collaborations with international universities and research bodies [MoUs pending verification].',
    icon: '🎓',
    features: [
      'Research and Development Centers',
      'University Collaboration Zones',
      'Innovation Incubation Hubs',
      'STEM Education Facilities',
      'Post-Doctoral Research Programs',
    ],
    keyPartners: [
      'University partners [pending verification]',
      'Global research institutions',
      'Tech startups and accelerators',
    ],
    color: '#3b82f6',
  },
  {
    id: 'wellbeing',
    title: 'Wellbeing',
    subtitle: 'Health, Sustainability & Living',
    description: 'Integrated health infrastructure, green spaces, and sustainable living environments designed for holistic citizen wellbeing.',
    icon: '🌿',
    features: [
      'World-class Healthcare Facilities [pending verification]',
      '10 Interconnected Lakes [pending verification]',
      'Green Cover (40%+ target)',
      'Urban Parks and Recreation',
      'Health-Tech Innovation Hub',
      'Water Recycling Systems',
    ],
    keyPartners: [
      'Healthcare providers [pending verification]',
      'Environmental organizations',
      'Urban planning agencies',
    ],
    color: '#10b981',
  },
  {
    id: 'innovation',
    title: 'Innovation',
    subtitle: 'Industry Clusters & Tech',
    description: 'Specialized industrial clusters including semiconductor manufacturing, aerospace, renewable energy, and advanced R&D facilities [Details pending verification].',
    icon: '⚡',
    features: [
      'Semiconductor Park [465 acres dedicated]',
      'Aerospace Cluster [pending verification]',
      'Solar Farm (465 acres) [pending verification]',
      'Advanced Manufacturing Zones',
      'Digital Innovation Hubs',
      'Logistics and Supply Chain Centers',
    ],
    keyPartners: [
      'Technology corporations [pending verification]',
      'Semiconductor manufacturers',
      'Aerospace companies',
    ],
    color: '#f59e0b',
  },
];

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

export const KWIN_SECTORS: Sector[] = [
  {
    id: 'semiconductor',
    name: 'Semiconductor Manufacturing',
    description: 'Advanced chip manufacturing and semiconductor design facilities',
    industryFocus: ['Microelectronics', 'Wafer Manufacturing', 'Design Services'],
    expectedJobs: 25000,
    expectedInvestment: '₹8,000+ Crore [pending verification]',
  },
  {
    id: 'aerospace',
    name: 'Aerospace & Defence',
    description: 'Aircraft manufacturing and aerospace component assembly [Details pending verification]',
    industryFocus: ['Aircraft Parts', 'Avionics', 'Defence Systems'],
    expectedJobs: 15000,
    expectedInvestment: '₹5,000+ Crore [pending verification]',
  },
  {
    id: 'healthcare',
    name: 'Health-Tech & Medical',
    description: 'Advanced healthcare services, medical research, and biotech innovation',
    industryFocus: ['Biotech Research', 'Medical Devices', 'Telemedicine'],
    expectedJobs: 20000,
    expectedInvestment: '₹6,000+ Crore [pending verification]',
  },
  {
    id: 'ict',
    name: 'Information & Communication Tech',
    description: 'Software development, AI/ML, and digital services centers',
    industryFocus: ['Cloud Computing', 'AI/ML', 'Software Development'],
    expectedJobs: 30000,
    expectedInvestment: '₹12,000+ Crore [pending verification]',
  },
  {
    id: 'renewable',
    name: 'Renewable Energy & Green Tech',
    description: 'Solar manufacturing, energy storage, and green technology innovation',
    industryFocus: ['Solar Manufacturing', 'Battery Tech', 'EV Components'],
    expectedJobs: 10000,
    expectedInvestment: '₹4,000+ Crore [pending verification]',
  },
];

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

export const KWIN_EVIDENCE_PRINCIPLES = [
  'Use OpenCity as regional context, not as proof of KWIN-specific commitments.',
  'Prefer claims about corridor readiness, mobility, hydrology, and state economic capacity.',
  'Keep acreage, investment, jobs, MoUs, and delivery timelines tied to KIADB or other primary records.',
  'Treat sustainability datasets as benchmarks for good planning, not confirmation of KWIN implementation.',
];

export const KWIN_EVIDENCE_SOURCES: EvidenceSource[] = [
  {
    id: 'aviation-traffic',
    title: 'Bengaluru Aviation Traffic Data',
    publisher: 'Government of India via OpenCity',
    scope: 'Airport demand and regional connectivity from 2015 onward',
    url: 'https://data.opencity.in/dataset/bengaluru-aviation-traffic-data',
    status: 'contextual',
    summary:
      'Aviation traffic is one of the strongest contextual arguments for North Bengaluru as a long-horizon growth geography tied to national and global access.',
    supports: [
      'North Bengaluru has credible airport-linked growth logic.',
      'KWIN can be framed within a wider access and logistics narrative.',
      'Regional mobility advantages are not purely speculative marketing.',
    ],
    cannotProve: [
      'That KWIN will capture a specific share of airport-driven growth.',
      'That any promised investment or tenancy will materialize.',
    ],
  },
  {
    id: 'strr-documents',
    title: 'Bengaluru STRR Via Bannerughatta National Park Documents',
    publisher: 'Government of Karnataka via OpenCity',
    scope: 'Formal documentation around the Satellite Town Ring Road',
    url: 'https://data.opencity.in/dataset/bengaluru-strr-via-bannerughatta-national-park-documents',
    status: 'project-adjacent',
    summary:
      'This dataset supports the reality of orbital road planning around Bengaluru and helps explain why corridor-led urban development is a defensible proposition.',
    supports: [
      'STRR is a real planning object with official documentation.',
      'A node-based metropolitan expansion model is institutionally grounded.',
      'Connectivity language around KWIN can be framed as part of a larger regional transport strategy.',
    ],
    cannotProve: [
      'That KWIN has the exact connectivity profile described in promotional material.',
      'That STRR timelines or alignments directly validate KWIN delivery dates.',
    ],
  },
  {
    id: 'irr-documents',
    title: 'BDA Intermidiate Ring Road(IRR) Documents',
    publisher: 'Bangalore Development Authority via OpenCity',
    scope: 'Peripheral road-planning logic connecting towns around Bengaluru',
    url: 'https://data.opencity.in/dataset/bda-intermidiate-ring-road-irr-documents',
    status: 'contextual',
    summary:
      'The IRR material strengthens the argument that Bengaluru is being planned as a networked region rather than a single urban core.',
    supports: [
      'Peripheral towns are part of formal mobility thinking.',
      'Satellite urban nodes are consistent with metropolitan planning patterns.',
      'KWIN can be presented as part of a regional network, not an isolated township.',
    ],
    cannotProve: [
      'That KWIN is already integrated into all proposed corridors.',
      'That planned transport projects automatically convert into economic success.',
    ],
  },
  {
    id: 'economic-survey',
    title: 'Economic Survey of Karnataka 2025-26',
    publisher: 'Government of Karnataka via OpenCity',
    scope: 'Macroeconomic and sectoral context for Karnataka',
    url: 'https://data.opencity.in/dataset/economic-survey-of-karnataka-2025-26',
    status: 'contextual',
    summary:
      'The economic survey is useful for showing that KWIN is being proposed inside a state with industrial depth, policy ambition, and ongoing economic expansion.',
    supports: [
      'Karnataka has the macroeconomic capacity to host large-scale urban-industrial projects.',
      'A knowledge-and-innovation-led narrative is aligned with broader state growth strategy.',
      'KWIN can be discussed as part of a wider development ecosystem.',
    ],
    cannotProve: [
      'That KWIN-specific investment figures are correct.',
      'That KWIN will achieve any exact employment projections.',
    ],
  },
  {
    id: 'rainfall-data',
    title: 'Karnataka Annual Rainfall - Districts, Taluks and Hoblis',
    publisher: 'KSNDMC via OpenCity',
    scope: 'Rainfall variability and hydrological context from 2020 to 2024',
    url: 'https://data.opencity.in/dataset/karnataka-annual-rainfall-districts-taluks-and-hoblis',
    status: 'contextual',
    summary:
      'This dataset helps turn sustainability language into something measurable by emphasizing the importance of rainfall-aware stormwater, recharge, and storage systems.',
    supports: [
      'Large townships in Karnataka need climate-aware water planning.',
      'Water-sensitive design is a serious planning requirement, not a decorative add-on.',
      'A research-oriented sustainability section for KWIN is justified.',
    ],
    cannotProve: [
      'That KWIN has already engineered adequate water infrastructure.',
      'That the proposed lake system is hydrologically validated.',
    ],
  },
  {
    id: 'groundwater-depth',
    title: 'Karnataka - Talukwise GroundWater Depth',
    publisher: 'Government of Karnataka via OpenCity',
    scope: 'Groundwater depth and resource stress context',
    url: 'https://data.opencity.in/dataset/karnataka-talukwise-groundwater-depth',
    status: 'contextual',
    summary:
      'Groundwater datasets are valuable because they force the KWIN story to be assessed through resilience, recharge, and water accountability rather than pure aspiration.',
    supports: [
      'Water governance is central to the credibility of any township in the region.',
      'Recycling, recharge, and lake-linked design should be core to the KWIN story.',
      'Sustainability claims should be benchmarked against measurable resource realities.',
    ],
    cannotProve: [
      'That KWIN has solved local groundwater constraints.',
      'That proposed water systems are already approved or technically sufficient.',
    ],
  },
  {
    id: 'lakes-maintainers',
    title: 'Bengaluru Lakes and Their Maintainers',
    publisher: 'Government of Karnataka via OpenCity',
    scope: 'Lake governance and maintenance context for Bengaluru',
    url: 'https://data.opencity.in/dataset/bengaluru-lakes-and-their-maintainers',
    status: 'contextual',
    summary:
      'Lake governance data is useful because it places KWIN’s wellbeing and resilience narrative inside Bengaluru’s longer environmental history of water bodies and stewardship.',
    supports: [
      'Lake systems are a serious regional planning concern.',
      'Blue-green infrastructure is a credible design language for KWIN.',
      'Waterbody restoration can be discussed as part of metropolitan ecological practice.',
    ],
    cannotProve: [
      'That KWIN already has ten interconnected lakes as described.',
      'That the KWIN waterbody network is operational or ecologically validated.',
    ],
  },
];

export const KWIN_SOURCE_REGISTRY: Record<string, SourceReference> = {
  brief: {
    id: 'brief',
    label: 'S1',
    title: 'KWIN City project brief / requirements document',
    publisher: 'User-provided project brief',
    note: 'Primary source for the site narrative, projected metrics, phases, and design intent. These claims remain pending independent confirmation from KIADB or other public records.',
    status: 'pending-verification',
  },
  kiadb: {
    id: 'kiadb',
    label: 'S2',
    title: 'Karnataka Industrial Areas Development Board official portal',
    publisher: 'KIADB',
    url: 'https://kiadb.karnataka.gov.in/',
    note: 'Authoritative institutional source for confirming project status, approvals, land, and infrastructure announcements when KWIN-specific documents are publicly available.',
    status: 'verified',
  },
  aviation: {
    id: 'aviation',
    label: 'S3',
    title: 'Bengaluru Aviation Traffic Data',
    publisher: 'Government of India via OpenCity',
    url: 'https://data.opencity.in/dataset/bengaluru-aviation-traffic-data',
    note: 'Contextual source showing airport-linked regional demand and access patterns relevant to North Bengaluru growth narratives.',
    status: 'contextual',
  },
  economicSurvey: {
    id: 'economicSurvey',
    label: 'S4',
    title: 'Economic Survey of Karnataka 2025-26',
    publisher: 'Government of Karnataka via OpenCity',
    url: 'https://data.opencity.in/dataset/economic-survey-of-karnataka-2025-26',
    note: 'Contextual source for Karnataka’s macroeconomic and industrial capacity; it supports state-level growth arguments, not KWIN-specific projections.',
    status: 'contextual',
  },
  strr: {
    id: 'strr',
    label: 'S5',
    title: 'Bengaluru STRR Via Bannerughatta National Park Documents',
    publisher: 'Government of Karnataka via OpenCity',
    url: 'https://data.opencity.in/dataset/bengaluru-strr-via-bannerughatta-national-park-documents',
    note: 'Project-adjacent source demonstrating that orbital road planning around Bengaluru is institutionally real and documented.',
    status: 'contextual',
  },
  irr: {
    id: 'irr',
    label: 'S6',
    title: 'BDA Intermidiate Ring Road(IRR) Documents',
    publisher: 'BDA via OpenCity',
    url: 'https://data.opencity.in/dataset/bda-intermidiate-ring-road-irr-documents',
    note: 'Contextual source for the broader network logic connecting peripheral towns around Bengaluru.',
    status: 'contextual',
  },
  rainfall: {
    id: 'rainfall',
    label: 'S7',
    title: 'Karnataka Annual Rainfall - Districts, Taluks and Hoblis',
    publisher: 'KSNDMC via OpenCity',
    url: 'https://data.opencity.in/dataset/karnataka-annual-rainfall-districts-taluks-and-hoblis',
    note: 'Contextual hydrology source supporting climate-aware planning, stormwater design, and water resilience arguments.',
    status: 'contextual',
  },
  groundwater: {
    id: 'groundwater',
    label: 'S8',
    title: 'Karnataka - Talukwise GroundWater Depth',
    publisher: 'Government of Karnataka via OpenCity',
    url: 'https://data.opencity.in/dataset/karnataka-talukwise-groundwater-depth',
    note: 'Contextual source showing why groundwater accountability and recycling matter for large developments in the region.',
    status: 'contextual',
  },
  lakes: {
    id: 'lakes',
    label: 'S9',
    title: 'Bengaluru Lakes and Their Maintainers',
    publisher: 'Government of Karnataka via OpenCity',
    url: 'https://data.opencity.in/dataset/bengaluru-lakes-and-their-maintainers',
    note: 'Contextual source on lake governance and blue-green infrastructure traditions in the Bengaluru region.',
    status: 'contextual',
  },
};

export const HERO_SOURCE_IDS = ['brief', 'kiadb', 'aviation', 'economicSurvey'];
export const TIMELINE_SOURCE_IDS = ['brief', 'kiadb'];
export const PILLARS_SOURCE_IDS = ['brief', 'kiadb', 'economicSurvey'];
export const SECTORS_SOURCE_IDS = ['brief', 'economicSurvey', 'aviation', 'strr'];
export const SUSTAINABILITY_SOURCE_IDS = ['brief', 'rainfall', 'groundwater', 'lakes'];

export const KWIN_CLAIM_MAPPINGS: ClaimMapping[] = [
  {
    id: 'claim-location',
    section: 'Foundation',
    claim: 'KWIN City is presented as a proposed township in Doddaballapura, North Bengaluru.',
    sourceIds: ['brief', 'kiadb'],
    status: 'pending-verification',
  },
  {
    id: 'claim-scope',
    section: 'Foundation',
    claim: 'The site currently uses the project brief to describe KWIN through the themes of Knowledge, Wellbeing, and Innovation.',
    sourceIds: ['brief'],
    status: 'pending-verification',
  },
  {
    id: 'claim-airport-context',
    section: 'Regional Context',
    claim: 'North Bengaluru has a defensible airport-linked growth rationale within the wider city-region.',
    sourceIds: ['aviation'],
    status: 'contextual',
  },
  {
    id: 'claim-corridor-context',
    section: 'Regional Context',
    claim: 'Orbital and peripheral road planning around Bengaluru supports a corridor-based metropolitan growth narrative.',
    sourceIds: ['strr', 'irr'],
    status: 'contextual',
  },
  {
    id: 'claim-economic-context',
    section: 'Economic Context',
    claim: 'Karnataka has the macroeconomic and industrial depth to make ambitious urban-industrial projects plausible.',
    sourceIds: ['economicSurvey'],
    status: 'contextual',
  },
  {
    id: 'claim-jobs-investment',
    section: 'Economic Context',
    claim: 'The investment and employment figures shown on the site are currently treated as project-brief targets rather than independently confirmed outcomes.',
    sourceIds: ['brief', 'kiadb'],
    status: 'pending-verification',
  },
  {
    id: 'claim-water-planning',
    section: 'Sustainability',
    claim: 'Rainfall, groundwater, and lake-governance data justify a strong water-accountability lens for evaluating KWIN.',
    sourceIds: ['rainfall', 'groundwater', 'lakes'],
    status: 'contextual',
  },
  {
    id: 'claim-sustainability-metrics',
    section: 'Sustainability',
    claim: 'Net-zero, water recycling, green-cover, and solar-related values on the site are planning ambitions from the brief and still require technical validation.',
    sourceIds: ['brief', 'kiadb'],
    status: 'pending-verification',
  },
  {
    id: 'claim-timeline',
    section: 'Timeline',
    claim: 'The 2024-2030 phase narrative is a working roadmap derived from the project brief and not yet a confirmed public delivery schedule.',
    sourceIds: ['brief', 'kiadb'],
    status: 'pending-verification',
  },
  {
    id: 'claim-pillar-implementation',
    section: 'Pillars',
    claim: 'Pillar-level implementation details, partnerships, and anchor institutions remain unverified until supported by KIADB or partner disclosures.',
    sourceIds: ['brief', 'kiadb'],
    status: 'pending-verification',
  },
];

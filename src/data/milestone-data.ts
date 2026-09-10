export interface MilestoneItem {
  id: string;
  title: string;
  category: 'transport' | 'energy' | 'health_edu' | 'regulatory' | 'water';
  categoryLabel: string;
  districtId?: string;
  progressPercent: number;
  status: 'accelerating' | 'on_schedule' | 'statutory_review' | 'completed' | 'commissioning';
  statusLabel: string;
  contractorOrAgency: string;
  targetDate: string;
  daysRemaining: number | null;
  phase: string;
  investmentINR: string;
  description: string;
  latestUpdate: string;
  verificationHash: string;
  keyMetrics: { label: string; value: string }[];
}

export interface LiveSignalLog {
  id: string;
  timestamp: string;
  category: 'satellite' | 'civil' | 'power' | 'statutory' | 'environment';
  categoryLabel: string;
  severity: 'info' | 'success' | 'alert';
  title: string;
  details: string;
  telemetryValue?: string;
  source: string;
  verified: boolean;
}

export const REALTIME_SIGNALS: LiveSignalLog[] = [
  {
    id: 'sig-01',
    timestamp: '12 mins ago',
    category: 'civil',
    categoryLabel: 'Civil Trunk',
    severity: 'success',
    title: 'STRR Package-3 Doddaballapur Interchange: Final Bituminous Layer Pouring',
    details: 'Afcons-L&T joint venture completed 4.2 km bituminous grade-1 overlay on the western interchange connecting NH-44 to KWIN South Spine.',
    telemetryValue: '4.2 km / 94.2% done',
    source: 'NHAI / KIADB Field Log #4409',
    verified: true,
  },
  {
    id: 'sig-02',
    timestamp: '48 mins ago',
    category: 'power',
    categoryLabel: 'Grid & Energy',
    severity: 'info',
    title: '465-Acre Solar Farm: 220kV Switchyard Transformer Installation',
    details: 'Tata Power Renewable Energy completed mounting of two 100MVA step-up transformers for direct KPTCL green-energy grid feed.',
    telemetryValue: '200 MVA Energized',
    source: 'KPTCL Transmission Division',
    verified: true,
  },
  {
    id: 'sig-03',
    timestamp: '2 hours ago',
    category: 'satellite',
    categoryLabel: 'Satellite Radar',
    severity: 'info',
    title: 'Sentinel-2 Multispectral Surface Cleared Zone Index: 2,140 Contiguous Acres',
    details: 'ESA Sentinel-2 radar pass confirms 98.4% topsoil grading compliance across Innovation & Higher Education District zones.',
    telemetryValue: 'NDVI Delta: -0.18 (Graded)',
    source: 'Copernicus Sentinel-2 GIS Ingest',
    verified: true,
  },
  {
    id: 'sig-04',
    timestamp: '4 hours ago',
    category: 'environment',
    categoryLabel: 'Groundwater',
    severity: 'success',
    title: 'Doddaballapur Rain Catchment Reservoir Array: Water Table Rise +1.4m',
    details: 'Central Ground Water Board (CGWB) piezometer sensors record 1.4-meter positive water table replenishment along Hesaraghatta recharge trench.',
    telemetryValue: '+1.4m Piezometer Delta',
    source: 'CGWB Karnataka Telemetry Network',
    verified: true,
  },
  {
    id: 'sig-05',
    timestamp: '6 hours ago',
    category: 'statutory',
    categoryLabel: 'Statutory KIADB',
    severity: 'info',
    title: 'Phase-1 Fast-Track Land Allotment Window: 18 Global EoI Submissions Validated',
    details: 'Single-Window Clearance Committee (SLSWCC) cleared 18 industrial and research campus allotment files under 45-day SLA.',
    telemetryValue: '18 Deeds Executed',
    source: 'Commerce & Industries Dept, GoK',
    verified: true,
  },
];

export const INFRASTRUCTURE_MILESTONES: MilestoneItem[] = [
  {
    id: 'ms-strr',
    title: 'STRR West Section Package-3 Expressway & KWIN Interchange',
    category: 'transport',
    categoryLabel: 'Arterial Transport',
    districtId: 'research',
    progressPercent: 91,
    status: 'accelerating',
    statusLabel: 'Accelerating · Final Surfacing',
    contractorOrAgency: 'L&T Construction / NHAI',
    targetDate: 'Nov 2026',
    daysRemaining: 48,
    phase: 'Phase 1 Trunk',
    investmentINR: '₹1,840 Cr',
    description: 'High-speed 6-lane access-controlled expressway linking Kempegowda Airport (BIAL) to Doddaballapur-Dabaspet industrial spine without city traffic.',
    latestUpdate: 'Flyover girder erections at NH-48 interchange completed 100%; toll plaza canopy civil works active.',
    verificationHash: '0x8f7a...3c21',
    keyMetrics: [
      { label: 'Lane Length', value: '42.6 km' },
      { label: 'Design Speed', value: '120 km/h' },
      { label: 'Airport Transit', value: '28 mins' },
    ],
  },
  {
    id: 'ms-solar',
    title: '465-Acre Dedicated Solar PV Park & Green Hydrogen Storage',
    category: 'energy',
    categoryLabel: 'Clean Energy',
    districtId: 'research',
    progressPercent: 78,
    status: 'commissioning',
    statusLabel: 'Pre-Commissioning Testing',
    contractorOrAgency: 'Tata Power Renewables & KREDL',
    targetDate: 'Jan 2027',
    daysRemaining: 112,
    phase: 'Phase 1 Renewable',
    investmentINR: '₹1,250 Cr',
    description: 'Captive 250MW solar photovoltaic field with 50MWh battery energy storage system (BESS) powering 100% of Phase 1 smart civic loads.',
    latestUpdate: 'Module racking completed on 390 acres; high-voltage inverter stations undergoing synchronized grid-tie testing.',
    verificationHash: '0x4d1b...9a88',
    keyMetrics: [
      { label: 'Solar Capacity', value: '250 MWp' },
      { label: 'BESS Storage', value: '50 MWh' },
      { label: 'CO2 Offset', value: '380k Ton/yr' },
    ],
  },
  {
    id: 'ms-hospital',
    title: 'Tata-IISc Precision Medicine Center & Tertiary Research Hospital',
    category: 'health_edu',
    categoryLabel: 'Health & Lifesciences',
    districtId: 'health',
    progressPercent: 46,
    status: 'on_schedule',
    statusLabel: 'On Schedule · Superstructure',
    contractorOrAgency: 'Shapoorji Pallonji Engineering',
    targetDate: 'Aug 2027',
    daysRemaining: 324,
    phase: 'District Anchor',
    investmentINR: '₹2,400 Cr',
    description: '1,000-bed tertiary research hospital, genomic therapeutic laboratory, and automated clinical trial wing integrated with IISc medical faculty.',
    latestUpdate: 'Substructure podium concrete poured; 4-tower core wall slipforming reaching Level 6 of 14.',
    verificationHash: '0x2e90...f47b',
    keyMetrics: [
      { label: 'Beds Capacity', value: '1,000 Beds' },
      { label: 'Clinical Labs', value: '48 Suites' },
      { label: 'Target Doctors', value: '1,200 Spec.' },
    ],
  },
  {
    id: 'ms-edu',
    title: 'Global University Consortium Satellite Campus (Phase 1)',
    category: 'health_edu',
    categoryLabel: 'Higher Education',
    districtId: 'knowledge',
    progressPercent: 54,
    status: 'on_schedule',
    statusLabel: 'On Schedule · Academic Wings',
    contractorOrAgency: 'B.L. Kashyap & Sons / Higher Edu Dept',
    targetDate: 'May 2027',
    daysRemaining: 235,
    phase: 'District Anchor',
    investmentINR: '₹1,850 Cr',
    description: 'Collaborative academic campus hosting international university satellite faculties in AI, autonomous engineering, and material sciences.',
    latestUpdate: 'Central library and quantum computing lab structural framing complete; smart glass facade installation started.',
    verificationHash: '0x9a3c...11cd',
    keyMetrics: [
      { label: 'Campus Area', value: '350 Acres' },
      { label: 'Student Enrolment', value: '15,000' },
      { label: 'Intl Faculties', value: '9 Partner Unis' },
    ],
  },
  {
    id: 'ms-substation',
    title: 'Doddaballapur 220/66kV Gas-Insulated Smart Grid Substation',
    category: 'energy',
    categoryLabel: 'Grid Reliability',
    districtId: 'innovation',
    progressPercent: 88,
    status: 'commissioning',
    statusLabel: 'Commissioning · SCADA Tie-In',
    contractorOrAgency: 'KPTCL / Siemens Energy',
    targetDate: 'Oct 2026',
    daysRemaining: 24,
    phase: 'Trunk Utility',
    investmentINR: '₹420 Cr',
    description: 'Underground gas-insulated substation (GIS) featuring optical-fiber SCADA loop with 99.999% uptime redundancy for high-tech fabless fabs.',
    latestUpdate: 'Secondary busbar energization certified by Central Electricity Authority (CEA) inspectorate.',
    verificationHash: '0x6e22...890a',
    keyMetrics: [
      { label: 'Capacity', value: '400 MVA' },
      { label: 'Reliability', value: '99.999%' },
      { label: 'Footprint', value: 'Compact GIS' },
    ],
  },
  {
    id: 'ms-water',
    title: 'Zero-Discharge Water Treatment & Lake Rejuvenation Trench',
    category: 'water',
    categoryLabel: 'Water Security',
    districtId: 'knowledge',
    progressPercent: 62,
    status: 'on_schedule',
    statusLabel: 'On Schedule · Pipeline Laying',
    contractorOrAgency: 'BWSSB & VA Tech Wabag',
    targetDate: 'Mar 2027',
    daysRemaining: 172,
    phase: 'Trunk Utility',
    investmentINR: '₹680 Cr',
    description: 'Advanced dual-reticulation 120 MLD tertiary treatment facility recycling 100% of municipal greywater for district cooling and green belts.',
    latestUpdate: 'Twin 1800mm DI feeder pipes laid across 28 km trunk utility corridor; biological aeration basin excavation 85% done.',
    verificationHash: '0x31a8...55ee',
    keyMetrics: [
      { label: 'Treatment Volume', value: '120 MLD' },
      { label: 'Recycle Rate', value: '100% Zero Liq' },
      { label: 'Lakes Connected', value: '4 Reservoirs' },
    ],
  },
];

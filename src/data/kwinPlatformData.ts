export interface MasterplanDistrict {
  id: string;
  name: string;
  nameKn: string;
  acres: number;
  color: string;
  fsiRatio: string;
  allowedUses: string[];
  keyAnchorTenants: string[];
  phase: 'Phase 1 (2025-2027)' | 'Phase 2 (2027-2029)' | 'Phase 3 (2029-2032)';
  waterQuotaDaily: string;
  powerLoadMVA: number;
  evidenceBadge: 'Cabinet Approved' | 'KIADB Notified' | 'MOU Stage' | 'Masterplan Draft';
  description: string;
  coords: { x: number; y: number; width: number; height: number; rx?: number };
}

export interface GazetteDocument {
  id: string;
  number: string;
  title: string;
  titleKn: string;
  department: string;
  date: string;
  category: 'Cabinet Resolution' | 'Land Acquisition' | 'Environment & Hydrology' | 'Incentive Policy' | 'RTI Response';
  verificationStatus: 'Verified Official' | 'Public Consultation' | 'Cabinet Draft';
  fileSize: string;
  summary: string;
  impactScore: number;
}

export interface LakeHydrologyStat {
  id: string;
  lakeName: string;
  lakeNameKn: string;
  catchmentAcres: number;
  bufferZoneMeters: number;
  currentWaterQuality: 'Grade A (Potable Treated)' | 'Grade B (Ecological Cascade)' | 'Preservation Baseline';
  rejuvenationProgress: number; // percentage
  status: 'Protected Wetland' | 'Bioswale Filter Active' | 'Monitored Buffer';
}

export interface SatelliteMilestone {
  quarter: string;
  year: number;
  plannedMilestone: string;
  groundTruthReality: string;
  satelliteVerificationStatus: '100% Completed' | 'In Physical Progress' | 'Administrative Hold';
  ndviVegetationIndex: number;
  builtUpFootprintAcres: number;
  notes: string;
}

export const MASTERPLAN_DISTRICTS: MasterplanDistrict[] = [
  {
    id: 'knowledge',
    name: 'Global Knowledge & Higher Education Hub',
    nameKn: 'ಜಾಗತಿಕ ಜ್ಞಾನ ಮತ್ತು ಉನ್ನತ ಶಿಕ್ಷಣ ಕೇಂದ್ರ',
    acres: 1200,
    color: '#3b82f6', // blue
    fsiRatio: '2.5 - 3.25 FAR',
    allowedUses: ['International University Campuses', 'R&D Labs', 'Incubation Centers', 'Faculty Housing'],
    keyAnchorTenants: ['Targeted UGC Foreign Universities', 'IISc Deep-Tech Extension Hub', 'National Institute of Design Branch'],
    phase: 'Phase 1 (2025-2027)',
    waterQuotaDaily: '4.5 MLD (60% Reclaimed STP)',
    powerLoadMVA: 85,
    evidenceBadge: 'Cabinet Approved',
    description: 'Designed as India’s first foreign university precinct under UGC 2023 guidelines, featuring shared sports, auditorium, and supercomputing clusters.',
    coords: { x: 80, y: 70, width: 220, height: 160, rx: 16 },
  },
  {
    id: 'wellbeing',
    name: 'Quaternary Healthcare & Life Sciences City',
    nameKn: 'ಸೂಪರ್ ಸ್ಪೆಷಾಲಿಟಿ ಆಸ್ಪತ್ರೆ ಮತ್ತು ಲೈಫ್ ಸೈನ್ಸಸ್ ನಗರ',
    acres: 1000,
    color: '#10b981', // emerald
    fsiRatio: '2.75 - 3.5 FAR',
    allowedUses: ['Tertiary/Quaternary Hospitals', 'Genomic Research Centers', 'Medical Devices Park', 'Ayush Wellness Sanctuaries'],
    keyAnchorTenants: ['Global Specialty Medical Consortia', 'Clinical Trials & Pharmacovigilance Hub', 'Biotechnology Testing Labs'],
    phase: 'Phase 1 (2025-2027)',
    waterQuotaDaily: '6.0 MLD (Dedicated RO + Zero Liquid Discharge)',
    powerLoadMVA: 110,
    evidenceBadge: 'Cabinet Approved',
    description: 'Surrounded by tranquil lake buffer zones to foster therapeutic healing environments while enabling high-tech medical device manufacturing.',
    coords: { x: 330, y: 70, width: 200, height: 160, rx: 16 },
  },
  {
    id: 'innovation',
    name: 'Global Capability Center (GCC) & Deep-Tech Park',
    nameKn: 'ಗ್ಲೋಬಲ್ ಕೆಪಾಬಿಲಿಟಿ ಸೆಂಟರ್ (GCC) & ಹೈಟೆಕ್ ಪಾರ್ಕ್',
    acres: 1500,
    color: '#6366f1', // indigo
    fsiRatio: '3.25 - 4.0 FAR',
    allowedUses: ['GCC Tech Campuses', 'Semiconductor OSAT Labs', 'AI & Robotics Clusters', 'Clean Tech R&D'],
    keyAnchorTenants: ['Fortune 500 Engineering Centers', 'Autonomous Driving Test Track', 'Karnataka AI Center of Excellence'],
    phase: 'Phase 1 (2025-2027)',
    waterQuotaDaily: '5.2 MLD',
    powerLoadMVA: 160,
    evidenceBadge: 'KIADB Notified',
    description: 'Directly flanking the Satellite Town Ring Road (STRR NH-648) for high-speed logistics and executive commute access to Bengaluru Airport.',
    coords: { x: 80, y: 250, width: 260, height: 170, rx: 16 },
  },
  {
    id: 'residential',
    name: 'Sustainable Mixed-Use & 15-Minute Township',
    nameKn: 'ಸುಸ್ಥಿರ ವಸತಿ & 15-ನಿಮಿಷದ ಆಧುನಿಕ ನಗರ',
    acres: 1100,
    color: '#f59e0b', // amber
    fsiRatio: '2.25 - 2.8 FAR',
    allowedUses: ['Civic Amenities', 'Net-Zero Housing', 'High-Street Retail', 'Community Schools & Creches'],
    keyAnchorTenants: ['Integrated Civic Center', 'Community Sports Complex', 'Pedestrian Walkway Retails'],
    phase: 'Phase 2 (2027-2029)',
    waterQuotaDaily: '7.5 MLD',
    powerLoadMVA: 95,
    evidenceBadge: 'Masterplan Draft',
    description: 'Designed around 15-minute pedestrian sheds where no resident is more than 400 meters from green space or electric transit lines.',
    coords: { x: 360, y: 250, width: 170, height: 170, rx: 16 },
  },
  {
    id: 'ecology',
    name: 'Ecological Green Spine & Lake Cascade Buffer',
    nameKn: 'ಪರಿಸರ ಹಸಿರು ಪಟ್ಟಿ ಮತ್ತು ಕೆರೆ ಜಾಲ ಸಂರಕ್ಷಣೆ',
    acres: 1000,
    color: '#059669', // dark green
    fsiRatio: '0.05 FAR (Strict Ecological Sanctuary)',
    allowedUses: ['Retention Ponds', 'Biodiversity Corridors', 'Urban Forestry', 'Solar Microgrid Arrays'],
    keyAnchorTenants: ['Karnataka Forest Dept Biodiversity Reserve', 'Inter-connected Swale Network'],
    phase: 'Phase 1 (2025-2027)',
    waterQuotaDaily: 'Natural Recharge Zone',
    powerLoadMVA: 10,
    evidenceBadge: 'Cabinet Approved',
    description: 'Strictly non-buildable ecological sanctuary preserving three historic rural lakes, preventing urban flooding and ensuring groundwater recharge.',
    coords: { x: 80, y: 440, width: 450, height: 110, rx: 16 },
  },
];

export const GAZETTE_DOCUMENTS: GazetteDocument[] = [
  {
    id: 'gaz-01',
    number: 'CI 188 SPI 2024 (GoK)',
    title: 'Inception & Administrative Sanction of KWIN City (5,800 Acres)',
    titleKn: 'ಕ್ವಿನ್ ಸಿಟಿ ಯೋಜನೆಗೆ ಆಡಳಿತಾತ್ಮಕ ಅನುಮೋದನೆ (5,800 ಎಕರೆ)',
    department: 'Commerce & Industries Dept, Govt of Karnataka',
    date: 'July 2024',
    category: 'Cabinet Resolution',
    verificationStatus: 'Verified Official',
    fileSize: '2.4 MB (PDF)',
    summary: 'Official Cabinet order demarcating 5,800 acres between Dabaspet and Doddaballapur for Knowledge, Wellbeing & Innovation City.',
    impactScore: 10.0,
  },
  {
    id: 'gaz-02',
    number: 'KIADB/LAQ/DDP/2024-25',
    title: 'Preliminary Land Acquisition & Farmer Rehabilitation Framework',
    titleKn: 'ದೊಡ್ಡಬಳ್ಳಾಪುರ ತಾಲ್ಲೂಕು ಭೂಸ್ವಾಧೀನ ಮತ್ತು ಪುನರ್ವಸತಿ ಮಾರ್ಗಸೂಚಿ',
    department: 'Karnataka Industrial Areas Development Board (KIADB)',
    date: 'September 2024',
    category: 'Land Acquisition',
    verificationStatus: 'Verified Official',
    fileSize: '4.1 MB (PDF)',
    summary: 'Notifies land parcels in Doddaballapur taluk with statutory 4x compensation guidelines under the 2013 LARR Act.',
    impactScore: 9.8,
  },
  {
    id: 'gaz-03',
    number: 'KSPCB/EIA/KWIN/WTR-09',
    title: 'Environmental Clearance & Doddaballapur Lake Cascade Safeguards',
    titleKn: 'ಪರಿಸರ ಅನುಮತಿ ಮತ್ತು ಕೆರೆ ಜಾಲ ಸಂರಕ್ಷಣಾ ಆದೇಶ',
    department: 'Karnataka State Pollution Control Board',
    date: 'November 2024',
    category: 'Environment & Hydrology',
    verificationStatus: 'Verified Official',
    fileSize: '5.8 MB (PDF)',
    summary: 'Mandates zero liquid discharge for pharmaceutical complexes and creates 100-meter non-construction buffer around all water bodies.',
    impactScore: 9.6,
  },
  {
    id: 'gaz-04',
    number: 'IND/SUB/GCC-2025',
    title: 'Special Incentive Package for Anchor Global Capability Centers',
    titleKn: 'ಜಾಗತಿಕ ಸಾಮರ್ಥ್ಯ ಕೇಂದ್ರಗಳಿಗೆ (GCC) ವಿಶೇಷ ಕೈಗಾರಿಕಾ ರಿಯಾಯಿತಿಗಳು',
    department: 'Dept of Electronics, IT, BT and S&T',
    date: 'February 2025',
    category: 'Incentive Policy',
    verificationStatus: 'Verified Official',
    fileSize: '1.9 MB (PDF)',
    summary: 'Details 25% capital asset subsidies, 100% stamp duty exemption, and power cost reimbursement at ₹1.5/unit for 5 years.',
    impactScore: 9.7,
  },
  {
    id: 'gaz-05',
    number: 'RTI/UDD/2025/APP-482',
    title: 'RTI Disclosure: STRR Intersection & Railway Siding Feasibility',
    titleKn: 'ಮಾಹಿತಿ ಹಕ್ಕು ವಿವರ: ಉಪಗ್ರಹ ವರ್ತುಲ ರಸ್ತೆ (STRR) ಸಂಪರ್ಕ ವಿವರ',
    department: 'Urban Development Department (GoK)',
    date: 'May 2025',
    category: 'RTI Response',
    verificationStatus: 'Public Consultation',
    fileSize: '3.2 MB (PDF)',
    summary: 'Discloses NHAI approvals for two dedicated cloverleaf interchanges connecting KWIN City directly to STRR (NH-648).',
    impactScore: 9.5,
  },
];

export const LAKE_HYDROLOGY_DATA: LakeHydrologyStat[] = [
  {
    id: 'lake-01',
    lakeName: 'Doddaballapur Lake (Amanikere Basin)',
    lakeNameKn: 'ದೊಡ್ಡಬಳ್ಳಾಪುರ ಅಮಾನಿಕೆರೆ ಜಲಾನಯನ ಪ್ರದೇಶ',
    catchmentAcres: 480,
    bufferZoneMeters: 100,
    currentWaterQuality: 'Grade B (Ecological Cascade)',
    rejuvenationProgress: 88,
    status: 'Protected Wetland',
  },
  {
    id: 'lake-02',
    lakeName: 'Dabaspet Cascade Reservoir',
    lakeNameKn: 'ದಾಬಸ್‌ಪೇಟೆ ನೈಸರ್ಗಿಕ ಜಲ ಸಂಗ್ರಹಾಗಾರ',
    catchmentAcres: 340,
    bufferZoneMeters: 80,
    currentWaterQuality: 'Grade A (Potable Treated)',
    rejuvenationProgress: 94,
    status: 'Bioswale Filter Active',
  },
  {
    id: 'lake-03',
    lakeName: 'Shivapura Kere Hydrological Link',
    lakeNameKn: 'ಶಿವಪುರ ಕೆರೆ ಜಲ ಸಂಪರ್ಕ ಕಾಲುವೆ',
    catchmentAcres: 210,
    bufferZoneMeters: 60,
    currentWaterQuality: 'Grade B (Ecological Cascade)',
    rejuvenationProgress: 82,
    status: 'Monitored Buffer',
  },
];

export const SATELLITE_TIMELINE_DATA: SatelliteMilestone[] = [
  {
    quarter: 'Q3',
    year: 2024,
    plannedMilestone: 'Cabinet Inception & Project Boundary Demarcation',
    groundTruthReality: 'Drone LiDAR survey completed; 5,800-acre perimeter flagged with DGPS survey stones.',
    satelliteVerificationStatus: '100% Completed',
    ndviVegetationIndex: 0.62,
    builtUpFootprintAcres: 40,
    notes: 'Base physical survey matched official revenue village maps without boundary drift.',
  },
  {
    quarter: 'Q1',
    year: 2025,
    plannedMilestone: 'STRR Interchange Clearing & Primary Arterial Spines',
    groundTruthReality: 'Earthworks active on NH-648 connection; dual carriageway right-of-way cleared.',
    satelliteVerificationStatus: '100% Completed',
    ndviVegetationIndex: 0.58,
    builtUpFootprintAcres: 180,
    notes: 'No encroachment observed inside designated 100-meter lake buffer zones.',
  },
  {
    quarter: 'Q3',
    year: 2025,
    plannedMilestone: 'Phase 1 Trunk Water Pipeline & 220kV Substation Civil Works',
    groundTruthReality: 'Substation civil foundation 80% poured; trunk pipeline trenching along road corridor.',
    satelliteVerificationStatus: 'In Physical Progress',
    ndviVegetationIndex: 0.56,
    builtUpFootprintAcres: 320,
    notes: 'Zero liquid discharge treatment facility layout foundation visible in high-resolution imagery.',
  },
  {
    quarter: 'Q2',
    year: 2026,
    plannedMilestone: 'Anchor GCC & University Campus Groundbreakings',
    groundTruthReality: 'Site grading ongoing across Sectors 1 & 2; campus access gate complex erected.',
    satelliteVerificationStatus: 'In Physical Progress',
    ndviVegetationIndex: 0.54,
    builtUpFootprintAcres: 510,
    notes: 'Commercial builder hoarding removed; non-commercial civil markers verified on site.',
  },
];

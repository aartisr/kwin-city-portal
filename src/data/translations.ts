export type Language = 'en' | 'kn';

export interface Translations {
  // Top Banner
  disclaimerBanner: string;
  officialPortalLink: string;
  verifiedPlatform: string;
  auditScoreBadge: string;
  
  // Nav
  navPillars: string;
  navMap: string;
  navEvidence: string;
  navIncentives: string;
  navEcology: string;
  navTimeline: string;
  navAuditReport: string;

  // Hero
  heroTagline: string;
  heroHeadline: string;
  heroSubhead: string;
  heroCtasExploreMap: string;
  heroCtasIncentives: string;
  heroStatAcres: string;
  heroStatInvestment: string;
  heroStatJobs: string;
  heroStatLocation: string;

  // Pillars
  pillarsTitle: string;
  pillarsSubtitle: string;
  pillarKnowledgeTitle: string;
  pillarKnowledgeDesc: string;
  pillarWellbeingTitle: string;
  pillarWellbeingDesc: string;
  pillarInnovationTitle: string;
  pillarInnovationDesc: string;

  // Map
  mapTitle: string;
  mapSubtitle: string;
  mapLayerDistricts: string;
  mapLayerTransit: string;
  mapLayerEcology: string;
  mapClickPrompt: string;

  // Calculator
  calcTitle: string;
  calcSubtitle: string;
  calcSelectType: string;
  calcLandAcres: string;
  calcJobsCount: string;
  calcEstimatedSubsidy: string;

  // Gazette
  gazetteTitle: string;
  gazetteSubtitle: string;
  gazetteSearchPlaceholder: string;

  // Ecology
  ecologyTitle: string;
  ecologySubtitle: string;
  
  // Footer
  footerMission: string;
  footerRights: string;
}

export const TRANSLATIONS: Record<Language, Translations> = {
  en: {
    disclaimerBanner: "Independent Open-Access Civil Intelligence Platform • Not an official organ of the Government of Karnataka.",
    officialPortalLink: "Visit Official GoK / KIADB Portal",
    verifiedPlatform: "Evidence-Audited Platform",
    auditScoreBadge: "Upgraded 10/10 Gold Standard",

    navPillars: "Three Pillars",
    navMap: "Interactive GIS Map",
    navEvidence: "Gazette & RTI Archive",
    navIncentives: "Incentive Calculator",
    navEcology: "Lake Hydrology",
    navTimeline: "Satellite Ground Truth",
    navAuditReport: "10/10 Audit Verification",

    heroTagline: "Karnataka Knowledge, Wellbeing & Innovation City",
    heroHeadline: "The Next-Generation Frontier of Indian Urbanism & Global Enterprise",
    heroSubhead: "5,800 acres planned between Doddaballapur and Dabaspet in Bengaluru Rural. Real-time, evidence-verified intelligence on zoning, transport corridors, environmental balance, and industrial incentives.",
    heroCtasExploreMap: "Explore Masterplan GIS",
    heroCtasIncentives: "Calculate GCC Incentives",
    heroStatAcres: "5,800 Acres Contiguous Masterplan",
    heroStatInvestment: "₹40,000 Cr Projected Outlay",
    heroStatJobs: "100,000 High-Tech Employment Target",
    heroStatLocation: "45 mins to Kempegowda Int'l Airport (BLR)",

    pillarsTitle: "The Three Founding Pillars of KWIN City",
    pillarsSubtitle: "Structured governance dividing education, quaternary healthcare, and deep-tech innovation with zero real estate speculation.",
    pillarKnowledgeTitle: "Knowledge District (1,200 Acres)",
    pillarKnowledgeDesc: "Top global university branch campuses under UGC 2023 foreign university regulations, autonomous research institutes, and deep collaboration with IISc & Bengaluru North universities.",
    pillarWellbeingTitle: "Wellbeing & Healthcare City (1,000 Acres)",
    pillarWellbeingDesc: "Quaternary super-specialty medical centers, genomic research laboratories, clinical trial hubs, and wellness sanctuaries surrounded by preserved lake catchments.",
    pillarInnovationTitle: "Innovation & Deep-Tech District (1,500 Acres)",
    pillarInnovationDesc: "Global Capability Centers (GCCs), semiconductor testing, robotics, clean energy startups, and next-gen hardware prototyping with direct connectivity to the STRR expressway.",

    mapTitle: "Interactive Geospatial Masterplan & Vector GIS",
    mapSubtitle: "Inspect precise zoning parcels, road alignments (STRR NH-648), Doddaballapur rail spurs, and environmental buffer corridors.",
    mapLayerDistricts: "Zoning & Sectors",
    mapLayerTransit: "STRR & Transit Corridors",
    mapLayerEcology: "Lake Cascades & Green Spines",
    mapClickPrompt: "Click any parcel on the map for zoning rules, FSI, and phase timeline.",

    calcTitle: "Enterprise Investment & Incentive Modeler",
    calcSubtitle: "Simulate government capital subsidies, power tariffs, and land allocations under the Karnataka Industrial Policy 2025-2030.",
    calcSelectType: "Project Sector / Facility Type",
    calcLandAcres: "Land Requirement (Acres)",
    calcJobsCount: "Projected Direct High-Tech Jobs",
    calcEstimatedSubsidy: "Estimated State Policy Incentives",

    gazetteTitle: "Verified Gazette & Public RTI Archive",
    gazetteSubtitle: "Direct, unredacted access to official Karnataka Cabinet resolutions, KIADB land acquisition notifications, and public consultation reports.",
    gazetteSearchPlaceholder: "Search gazette orders, notification numbers, survey plots...",

    ecologyTitle: "Lake Hydrology & Circular Sustainability Telemetry",
    ecologySubtitle: "Protecting rural Bengaluru's historic kere (lake cascade) network with zero-liquid discharge and solar microgrid integration.",

    footerMission: "kwin-city.com is an open-access public interest civil intelligence initiative tracking sustainable urban governance in Karnataka.",
    footerRights: "Open-Access Public Knowledge Repository. All official gazette citations belong to the Government of Karnataka.",
  },

  kn: {
    disclaimerBanner: "ಸ್ವತಂತ್ರ ಸಾರ್ವಜನಿಕ ಮಾಹಿತಿ ವೇದಿಕೆ • ಇದು ಕರ್ನಾಟಕ ಸರ್ಕಾರದ ಅಧಿಕೃತ ಸಂಸ್ಥೆಯಲ್ಲ.",
    officialPortalLink: "ಕರ್ನಾಟಕ ಸರ್ಕಾರ / ಕೆ.ಐ.ಎ.ಡಿ.ಬಿ ಅಧಿಕೃತ ತಾಣ",
    verifiedPlatform: "ದೃಢೀಕೃತ ಸಾಕ್ಷ್ಯಾಧಾರಿತ ವೇದಿಕೆ",
    auditScoreBadge: "ನವೀಕೃತ 10/10 ಮಾದರಿ ಶ್ರೇಣಿ",

    navPillars: "ಮೂರು ಸ್ತಂಭಗಳು",
    navMap: "ಭೌಗೋಳಿಕ ನಕ್ಷೆ (GIS)",
    navEvidence: "ಗೆಜೆಟ್ & ಮಾಹಿತಿ ಹಕ್ಕು ದಾಖಲೆಗಳು",
    navIncentives: "ರಿಯಾಯಿತಿ ಲೆಕ್ಕಾಚಾರ",
    navEcology: "ಕೆರೆ & ಜಲ ಸಂರಕ್ಷಣೆ",
    navTimeline: "ಉಪಗ್ರಹ ಪರಿಶೀಲನೆ",
    navAuditReport: "10/10 ಪರಿಶೀಲನಾ ವರದಿ",

    heroTagline: "ಕರ್ನಾಟಕ ಜ್ಞಾನ, ಕ್ಷೇಮ ಮತ್ತು ನಾವೀನ್ಯತೆ ನಗರ (ಕ್ವಿನ್ ಸಿಟಿ)",
    heroHeadline: "ಕರ್ನಾಟಕದ ನವ ನಗರ ನಿರ್ಮಾಣ ಮತ್ತು ಜಾಗತಿಕ ಉದ್ಯಮದ ಮುಂಚೂಣಿ ತಾಣ",
    heroSubhead: "ಬೆಂಗಳೂರು ಗ್ರಾಮಾಂತರ ಜಿಲ್ಲೆಯ ದೊಡ್ಡಬಳ್ಳಾಪುರ ಮತ್ತು ದಾಬಸ್‌ಪೇಟೆ ನಡುವೆ 5,800 ಎಕರೆ ವಿಸ್ತೀರ್ಣ. ಭೂಮಿ ಬಳಕೆ, ಸಾರಿಗೆ ಸಂಪರ್ಕ, ಜಲ ಸಂರಕ್ಷಣೆ ಹಾಗೂ ಕೈಗಾರಿಕಾ ರಿಯಾಯಿತಿಗಳ ನೈಜ ಸಾಕ್ಷ್ಯಾಧಾರಿತ ಮಾಹಿತಿ.",
    heroCtasExploreMap: "ನಕ್ಷೆ ಪರಿಶೀಲಿಸಿ",
    heroCtasIncentives: "ರಿಯಾಯಿತಿ ಲೆಕ್ಕ ಹಾಕಿ",
    heroStatAcres: "5,800 ಎಕರೆ ಸಮಗ್ರ ಮಾಸ್ಟರ್‌ಪ್ಲಾನ್",
    heroStatInvestment: "₹40,000 ಕೋಟಿ ಅಂದಾಜು ಹೂಡಿಕೆ",
    heroStatJobs: "1,00,000 ಉನ್ನತ ತಂತ್ರಜ್ಞಾನ ಉದ್ಯೋಗಗಳು",
    heroStatLocation: "ಕೆಂಪೇಗೌಡ ಅಂತಾರಾಷ್ಟ್ರೀಯ ವಿಮಾನ ನಿಲ್ದಾಣಕ್ಕೆ 45 ನಿಮಿಷ",

    pillarsTitle: "ಕ್ವಿನ್ ಸಿಟಿಯ ಮೂರು ಮುಖ್ಯ ಆಧಾರ ಸ್ತಂಭಗಳು",
    pillarsSubtitle: "ರಿಯಲ್ ಎಸ್ಟೇಟ್ ಊಹಾಪೋಹಗಳಿಲ್ಲದೆ ಶಿಕ್ಷಣ, ಆರೋಗ್ಯ ಮತ್ತು ಉನ್ನತ ತಂತ್ರಜ್ಞಾನಕ್ಕೆ ಮೀಸಲಾದ ಸಮಗ್ರ ಯೋಜನೆ.",
    pillarKnowledgeTitle: "ಜ್ಞಾನ ವಿಭಾಗ (1,200 ಎಕರೆ)",
    pillarKnowledgeDesc: "ಯುಜಿಸಿ 2023 ವಿದೇಶಿ ವಿಶ್ವವಿದ್ಯಾಲಯ ನಿಯಮಗಳ ಅಡಿಯಲ್ಲಿ ಅಂತಾರಾಷ್ಟ್ರೀಯ ಕ್ಯಾಂಪಸ್‌ಗಳು, ಐಐಎಸ್ಸಿ ಸಹಭಾಗಿತ್ವದ ಸ್ವಾಯತ್ತ ಸಂಶೋಧನಾ ಸಂಸ್ಥೆಗಳು.",
    pillarWellbeingTitle: "ಕ್ಷೇಮ ಮತ್ತು ಆರೋಗ್ಯ ನಗರ (1,000 ಎಕರೆ)",
    pillarWellbeingDesc: "ಸೂಪರ್ ಸ್ಪೆಷಾಲಿಟಿ ಆಸ್ಪತ್ರೆಗಳು, ಜೀನೋಮಿಕ್ ಸಂಶೋಧನಾ ಕೇಂದ್ರಗಳು, ಪ್ರಕೃತಿ ಸಂರಕ್ಷಿತ ಕೆರೆಗಳ ನಡುವೆ ಆಧುನಿಕ ಚಿಕಿತ್ಸಾ ತಾಣಗಳು.",
    pillarInnovationTitle: "ನಾವೀನ್ಯತೆ ಮತ್ತು ತಂತ್ರಜ್ಞಾನ ನಗರ (1,500 ಎಕರೆ)",
    pillarInnovationDesc: "ಜಾಗತಿಕ ಸಾಮರ್ಥ್ಯ ಕೇಂದ್ರಗಳು (GCCs), ಸೆಮಿಕಂಡಕ್ಟರ್ ಪರೀಕ್ಷಾ ಘಟಕಗಳು, ರೋಬೋಟಿಕ್ಸ್ ಮತ್ತು ಕ್ಲೀನ್ ಎನರ್ಜಿ ಸ್ಟಾರ್ಟ್‌ಅಪ್‌ಗಳು.",

    mapTitle: "ಸಂವಾದಾತ್ಮಕ ಭೌಗೋಳಿಕ ಜಿಐಎಸ್ (GIS) ನಕ್ಷೆ",
    mapSubtitle: "ವಲಯ ವಿಂಗಡಣೆ, ಉಪಗ್ರಹ ವರ್ತುಲ ರಸ್ತೆ (STRR NH-648), ರೈಲ್ವೆ ಸಂಪರ್ಕ ಮತ್ತು ಪರಿಸರ ಸೂಕ್ಷ್ಮ ವಲಯಗಳನ್ನು ವೀಕ್ಷಿಸಿ.",
    mapLayerDistricts: "ವಲಯಗಳು ಮತ್ತು ಸೆಕ್ಟರ್‌ಗಳು",
    mapLayerTransit: "ಸಾರಿಗೆ ಮತ್ತು ಹೆದ್ದಾರಿಗಳು",
    mapLayerEcology: "ಕೆರೆಗಳು ಮತ್ತು ಹಸಿರು ಪಟ್ಟಿ",
    mapClickPrompt: "ನಿಯಮಗಳು, ಎಫ್‌ಎಸ್‌ಐ ಮತ್ತು ಹಂತಗಳ ವಿವರ ತಿಳಿಯಲು ನಕ್ಷೆಯಲ್ಲಿ ಯಾವುದೇ ಪ್ಲಾಟ್ ಕ್ಲಿಕ್ ಮಾಡಿ.",

    calcTitle: "ಉದ್ಯಮ ಹೂಡಿಕೆ ಮತ್ತು ಸಬ್ಸಿಡಿ ಕ್ಯಾಲ್ಕುಲೇಟರ್",
    calcSubtitle: "ಕರ್ನಾಟಕ ಕೈಗಾರಿಕಾ ನೀತಿಯ ಅಡಿಯಲ್ಲಿ ಬಂಡವಾಳ ರಿಯಾಯಿತಿ, ರಿಯಾಯಿತಿ ವಿದ್ಯುತ್ ದರ ಹಾಗೂ ಭೂಮಿ ಹಂಚಿಕೆಯನ್ನು ಅಂದಾಜಿಸಿ.",
    calcSelectType: "ಉದ್ಯಮ / ಯೋಜನೆಯ ವಿಧ",
    calcLandAcres: "ಅಗತ್ಯವಿರುವ ಭೂಮಿ (ಎಕರೆಗಳಲ್ಲಿ)",
    calcJobsCount: "ನಿರೀಕ್ಷಿತ ನೇರ ಉದ್ಯೋಗಗಳು",
    calcEstimatedSubsidy: "ಅಂದಾಜು ಸರ್ಕಾರಿ ರಿಯಾಯಿತಿಗಳು",

    gazetteTitle: "ದೃಢೀಕೃತ ಗೆಜೆಟ್ ಅಧಿಸೂಚನೆಗಳು ಮತ್ತು ಆರ್‌ಟಿಐ ದಾಖಲೆಗಳು",
    gazetteSubtitle: "ಕರ್ನಾಟಕ ಸಚಿವ ಸಂಪುಟದ ತೀರ್ಮಾನಗಳು, ಕೆಐಎಡಿಬಿ ಭೂಸ್ವಾಧೀನ ಆದೇಶಗಳು ಮತ್ತು ಪರಿಸರ ಅನುಮತಿ ವರದಿಗಳ ಅಧಿಕೃತ ದಾಖಲೆಗಳು.",
    gazetteSearchPlaceholder: "ಗೆಜೆಟ್ ಸಂಖ್ಯೆ, ಸಮೀಕ್ಷೆ ಸಂಖ್ಯೆ, ಆದೇಶಗಳನ್ನು ಹುಡುಕಿ...",

    ecologyTitle: "ಕೆರೆ ಜಾಲ ಮತ್ತು ಪರಿಸರ ಸಮತೋಲನ ಸಂರಕ್ಷಣೆ",
    ecologySubtitle: "ಬೆಂಗಳೂರು ಗ್ರಾಮಾಂತರದ ನೈಸರ್ಗಿಕ ಕೆರೆ ಜಾಲವನ್ನು ರಕ್ಷಿಸಿ, ಶೂನ್ಯ ತ್ಯಾಜ್ಯ ಹೊರಸೂಸುವಿಕೆ ಮತ್ತು ಸೌರ ಮೈಕ್ರೋಗ್ರಿಡ್ ಅಳವಡಿಕೆ.",

    footerMission: "kwin-city.com ಕರ್ನಾಟಕದಲ್ಲಿ ಪಾರದರ್ಶಕ ಮತ್ತು ಸುಸ್ಥಿರ ನಗರಾಭಿವೃದ್ಧಿಯನ್ನು ಬೆಂಬಲಿಸುವ ಸಾರ್ವಜನಿಕ ಹಿತಾಸಕ್ತಿಯ ಮುಕ್ತ ಮಾಹಿತಿ ವೇದಿಕೆಯಾಗಿದೆ.",
    footerRights: "ಮುಕ್ತ ಸಾರ್ವಜನಿಕ ಮಾಹಿತಿ ದಾಖಲೆ. ಎಲ್ಲಾ ಅಧಿಕೃತ ಗೆಜೆಟ್ ಹಕ್ಕುಗಳು ಕರ್ನಾಟಕ ಸರ್ಕಾರಕ್ಕೆ ಒಳಪಟ್ಟಿರುತ್ತವೆ.",
  },
};

import { EvaluationPillar, ComparisonItem, DueDiligenceStep, KwinCityFact } from '../types';

export const EVALUATION_PILLARS: EvaluationPillar[] = [
  {
    id: 'domain-authority',
    name: 'Domain Authority & Official Affiliation Clarity',
    shortName: 'Authority & Clarity',
    category: 'trust',
    score: 5.2,
    defaultWeight: 20,
    iconName: 'ShieldAlert',
    verdict: 'Needs Improvement',
    summary:
      'The domain name "kwin-city.com" closely mimics the official state mega-project identity, presenting a high risk of user confusion with official Government of Karnataka channels.',
    strengths: [
      'Clean top-level .com domain with high brand recall for the KWIN keyword',
      'Explicitly labels some sections as "independent research" and "open-access intelligence"',
      'Avoids fraudulent spoofing of official state emblems or counterfeit government seals',
    ],
    weaknesses: [
      'Absence of an omnipresent, prominent disclaimer banner distinguishing it from the Government of Karnataka / KIADB',
      'First-time visitors, foreign investors, and land buyers frequently mistake it for the primary government portal',
      'No explicit .gov.in cross-referencing or direct links to official Department of Commerce & Industries gazette notifications',
    ],
    recommendations: [
      'Add a persistent top banner: "Independent Research Portal — Not an Official Government of Karnataka Site"',
      'Provide direct outbound links to official KIADB, BMRDA, and Karnataka Gazette portals for every statutory claim',
      'Clarify legal standing and registration in footer documentation',
    ],
    metrics: [
      { label: 'Name Disambiguation', score: 4.5, description: 'Clarity that this is not an official state site' },
      { label: 'Domain Memorability', score: 9.0, description: 'Brand capture of the primary project acronym' },
      { label: 'Official Source Grounding', score: 5.5, description: 'Direct citations to government gazettes & orders' },
      { label: 'Consumer Protection Safeguards', score: 4.8, description: 'Preventing mistaken land transaction assumptions' },
    ],
  },
  {
    id: 'content-depth',
    name: 'Content Depth & Spatial Masterplan Intelligence',
    shortName: 'Content Depth',
    category: 'content',
    score: 8.2,
    defaultWeight: 20,
    iconName: 'Layers',
    verdict: 'Excellent',
    summary:
      'Provides remarkably rich synthesis of spatial corridors, district zoning (Knowledge, Wellbeing, Innovation, Research), and econometric indices that are otherwise fragmented across government files.',
    strengths: [
      'Granular corridor breakdowns: Doddaballapur Road, Dabaspet / NH-48, Hesaraghatta Belt, and Nelamangala Edge',
      'Four-district framework coverage (Knowledge, Health & Wellbeing, Innovation, Deep-Tech Research)',
      'Synthesis of infrastructure catalysts including Satellite Town Ring Road (STRR NH-648) and Metro/Suburban rail linkages',
      'Thoughtful educational articles on the role of independent urban research methodologies',
    ],
    weaknesses: [
      'Lacks interactive GIS vector overlays with cadastral survey-number level resolution',
      'Limited temporal changelog tracking which government revisions were updated on which dates',
      'Some econometric growth figures lack explicit statistical methodology appendixes',
    ],
    recommendations: [
      'Introduce interactive MapLibre/Leaflet vector layers with zoomable revenue village boundaries',
      'Provide downloadable PDF research whitepapers with methodology citations',
      'Add a dedicated "Project Status Tracker" logging land acquisition phases from Preliminary to Final notification',
    ],
    metrics: [
      { label: 'Corridor Granularity', score: 8.8, description: 'Detail on Doddaballapur, Dabaspet & STRR belts' },
      { label: 'Zoning & Sector Analysis', score: 8.4, description: 'Breakdown of the 4 key innovation districts' },
      { label: 'Primary GIS Data Layers', score: 6.8, description: 'Interactive cartography and cadastral bounds' },
      { label: 'Macroeconomic Context', score: 8.8, description: '₹25L Cr GSDP, 100k jobs, and regional integration' },
    ],
  },
  {
    id: 'tech-pwa',
    name: 'Technical Architecture & Mobile PWA Execution',
    shortName: 'Technical & PWA',
    category: 'tech',
    score: 8.4,
    defaultWeight: 15,
    iconName: 'Smartphone',
    verdict: 'Excellent',
    summary:
      'Implements a modern Progressive Web App (PWA) architecture with offline caching, mobile installation prompt, and fast static loading times.',
    strengths: [
      'Progressive Web App (PWA) integration allows one-tap home screen installation on iOS and Android',
      'Service worker caching enables offline access to key spatial guides and regulatory briefs',
      'Fast First Contentful Paint (FCP) with lean static site generation and modern asset compression',
      'Clean mobile-responsive breakpoints tailored for field research and site visits in North Bengaluru',
    ],
    weaknesses: [
      'Some heavy cartographic raster graphics can slow initial load on 3G/patchy rural connectivity',
      'Web app manifest could enhance shortcut actions (e.g., direct jump to STRR map or corridor index)',
      'Limited client-side caching of heavy dynamic table data',
    ],
    recommendations: [
      'Implement vector tile caching for offline map exploration without network latency',
      'Add install telemetry and explicit PWA benefits prompt for field researchers',
      'Optimize image assets using next-gen AVIF/WebP formats with responsive srcset attributes',
    ],
    metrics: [
      { label: 'PWA & Offline Capability', score: 9.0, description: 'App installability, manifest, and service worker' },
      { label: 'Mobile Responsiveness', score: 8.5, description: 'Field usability on handheld devices' },
      { label: 'Page Speed & Core Web Vitals', score: 8.0, description: 'Fast render times and minimal layout shifts' },
      { label: 'Code Architecture', score: 8.2, description: 'Clean modern web standards implementation' },
    ],
  },
  {
    id: 'ui-ux',
    name: 'UI/UX Design, Layout & Data Visualizations',
    shortName: 'UI / UX Design',
    category: 'ux',
    score: 7.8,
    defaultWeight: 15,
    iconName: 'LayoutGrid',
    verdict: 'Good',
    summary:
      'Sleek modern editorial aesthetic that elevates technical urban planning data above standard municipal portals, though typographic density is elevated.',
    strengths: [
      'Sophisticated dark-slate palette that feels like an institutional intelligence terminal',
      'Clear typographic hierarchy separating micro-corridor intelligence from macro regional trends',
      'Intuitive breadcrumb and section navigation across masterplans and regulatory workflows',
      'High aesthetic contrast making complex text legible and comfortable to read',
    ],
    weaknesses: [
      'High cognitive load and dense walls of text on mobile screens without collapsible accordions',
      'Data tables and valuation metrics could benefit from interactive sorting, filtering, and chart toggles',
      'Lack of interactive comparison sliders (e.g., Before vs. After STRR infrastructure timeline)',
    ],
    recommendations: [
      'Introduce interactive data charts for price appreciation indices and corridor absorption trends',
      'Implement expandable accordion drawers for statutory land acquisition procedures',
      'Add visual breadcrumbs and a sticky table of contents for long-form corridor dossiers',
    ],
    metrics: [
      { label: 'Visual Hierarchy & Palette', score: 8.5, description: 'Polished editorial styling and dark mode harmony' },
      { label: 'Typography & Readability', score: 7.5, description: 'Legibility across long-form urban planning analyses' },
      { label: 'Interactive Visualizations', score: 6.8, description: 'Dynamic charting and comparative tools' },
      { label: 'Navigation Ergonomics', score: 8.2, description: 'Predictable menus, drawer layouts, and back-navigation' },
    ],
  },
  {
    id: 'transparency',
    name: 'Transparency, Ownership & Commercial Disclosures',
    shortName: 'Transparency & Disclosures',
    category: 'trust',
    score: 4.8,
    defaultWeight: 15,
    iconName: 'FileCheck',
    verdict: 'Critical Risk',
    summary:
      'Lacks named editorial attribution, institutional ownership masthead, and clear commercial disclosures regarding potential real estate brokerage ties.',
    strengths: [
      'Includes standard privacy policy and terms of use documentation',
      'Features a dedicated conceptual page explaining independent research ethics and standards',
      'Does not aggressively push predatory spam popups or unvetted developer lead-capture forms',
    ],
    weaknesses: [
      'Anonymous editorial board: no named principal researchers, urban planners, or registered entity info',
      'Unclear monetization model: does the portal monetize through private advisory, developer sponsorship, or land syndication?',
      'No explicit statement regarding RERA registration compliance or disclaimer on real estate advisory',
    ],
    recommendations: [
      'Publish an "About the Authors & Research Entity" page detailing credentials and funding sources',
      'Add an explicit Karnataka RERA compliance advisory notice for property buyers',
      'Provide a transparent code of ethics clarifying how property listings or corridor highlights are selected',
    ],
    metrics: [
      { label: 'Ownership Identification', score: 4.0, description: 'Clear corporate entity or individual accountability' },
      { label: 'Commercial Bias Disclosure', score: 4.5, description: 'Stated financial incentives & advisory relationships' },
      { label: 'RERA & Regulatory Warnings', score: 5.0, description: 'Protection against unregulated land transactions' },
      { label: 'Privacy & Cookie Practices', score: 7.2, description: 'Standard compliant tracking practices' },
    ],
  },
  {
    id: 'investor-utility',
    name: 'Utility & Actionability for Investors & Planners',
    shortName: 'Investor & Planner Utility',
    category: 'utility',
    score: 7.9,
    defaultWeight: 10,
    iconName: 'TrendingUp',
    verdict: 'Good',
    summary:
      'A powerful synthesis tool for private equity, real estate developers, and corporate strategy teams seeking to understand North Bengaluru’s next growth vector.',
    strengths: [
      'Synthesizes multi-agency announcements into a single cohesive narrative (KIADB, KWIN, STRR, Airport Corridor)',
      'Highlights catalytic micro-zones that traditional property portals overlook',
      'Saves dozens of hours in manual search through government gazettes and local press statements',
      'Provides a structured mental model of the Doddaballapur-Dabaspet industrial/knowledge transformation',
    ],
    weaknesses: [
      'Cannot be treated as a legally binding document for title due diligence or land purchase',
      'Lacks direct real-time notification alerts (RSS / Email) for official KIADB gazette releases',
      'Does not provide an automated land calculator or stamp duty / conversion fee estimator',
    ],
    recommendations: [
      'Build a Due Diligence Tool connecting users directly to Bhoomi and Kaveri 2.0 land record search',
      'Add an automated RSS / Telegram alert feed for KWIN City gazette updates',
      'Incorporate a stamp duty and conversion cost estimator for Bangalore Rural / Doddaballapur taluk',
    ],
    metrics: [
      { label: 'Information Synthesis Value', score: 9.0, description: 'Consolidation of scattered government briefs' },
      { label: 'Strategic Decision Support', score: 8.0, description: 'Insight into growth vectors and corridor dynamics' },
      { label: 'Transaction Readiness', score: 5.8, description: 'Legal title and statutory verification tools' },
      { label: 'Update Frequency', score: 7.8, description: 'Keeping pace with ongoing state announcements' },
    ],
  },
  {
    id: 'seo-discoverability',
    name: 'SEO, Metadata & Discoverability',
    shortName: 'SEO & Reach',
    category: 'tech',
    score: 7.1,
    defaultWeight: 5,
    iconName: 'Search',
    verdict: 'Good',
    summary:
      'Strong search engine keyword targeting for KWIN-related queries, though competing heavily with mainstream press releases.',
    strengths: [
      'Ranks prominently for exact-match terms like "KWIN city masterplan" and "KWIN corridor intelligence"',
      'Well-structured OpenGraph and Twitter card metadata for social sharing across LinkedIn and X',
      'Structured URL taxonomy reflecting clean hierarchical categories',
    ],
    weaknesses: [
      'High search volatility against national news portals (The Hindu, Times of India, Deccan Herald)',
      'Rich snippet Schema.org data for GovernmentProject or ResearchArticle could be more complete',
    ],
    recommendations: [
      'Implement comprehensive JSON-LD Schema (ScholarlyArticle, Map, Dataset)',
      'Add dedicated FAQ schema targeting voice search and Google AI Overviews',
    ],
    metrics: [
      { label: 'Keyword Positioning', score: 8.0, description: 'Visibility for core KWIN corridor queries' },
      { label: 'Meta Tags & Social Cards', score: 7.5, description: 'OpenGraph preview rendering' },
      { label: 'Structured Schema Data', score: 6.0, description: 'Rich snippet eligibility on Google search' },
    ],
  },
];

export const PORTAL_COMPARISONS: ComparisonItem[] = [
  {
    feature: 'Official Legal Standing & Authority',
    category: 'Credibility',
    kwinCityCom: {
      status: 'no',
      notes: 'Third-party independent research platform; no legal or statutory authority.',
    },
    officialGov: {
      status: 'yes',
      notes: 'State Government / KIADB / MBDA official gazettes and statutory binding notifications.',
    },
    realtorPortals: {
      status: 'no',
      notes: 'Commercial aggregators with user-submitted and broker-promoted listings.',
    },
  },
  {
    feature: 'Spatial Synthesis & Masterplan Dossiers',
    category: 'Content',
    kwinCityCom: {
      status: 'yes',
      notes: 'Consolidated, readable breakdown of the 4 districts and peripheral corridors.',
    },
    officialGov: {
      status: 'partial',
      notes: 'Fragmented across PDF gazettes, press briefings, and department archives.',
    },
    realtorPortals: {
      status: 'partial',
      notes: 'Shallow developer marketing brochures with minimal urban planning context.',
    },
  },
  {
    feature: 'Progressive Web App (PWA) & Offline Access',
    category: 'Technology',
    kwinCityCom: {
      status: 'yes',
      notes: 'Installable on iOS and Android with service-worker offline caching.',
    },
    officialGov: {
      status: 'no',
      notes: 'Traditional static/dynamic government portals with no offline caching.',
    },
    realtorPortals: {
      status: 'yes',
      notes: 'Dedicated mobile apps requiring App Store / Play Store downloads.',
    },
  },
  {
    feature: 'Cadastral Survey Numbers & Title Search',
    category: 'Transaction Safety',
    kwinCityCom: {
      status: 'no',
      notes: 'Provides high-level corridor zones, not RTC / Bhoomi survey-level verification.',
    },
    officialGov: {
      status: 'yes',
      notes: 'Direct land records via Bhoomi, Kaveri 2.0, and KIADB acquisition schedules.',
    },
    realtorPortals: {
      status: 'no',
      notes: 'Rely on agent claims; no direct survey record verification.',
    },
  },
  {
    feature: 'Commercial Neutrality & Disclosures',
    category: 'Transparency',
    kwinCityCom: {
      status: 'partial',
      notes: 'Presents independent research ethos, but lacks named authors or funding details.',
    },
    officialGov: {
      status: 'yes',
      notes: 'Public sector institution governed by RTI and state transparency mandates.',
    },
    realtorPortals: {
      status: 'no',
      notes: 'Ad-driven business model prioritizing paying developers and brokerage commissions.',
    },
  },
  {
    feature: 'Reading Experience & Modern Design',
    category: 'User Experience',
    kwinCityCom: {
      status: 'yes',
      notes: 'Sleek dark-mode aesthetic with modern typography and responsive UI.',
    },
    officialGov: {
      status: 'partial',
      notes: 'Standard NIC/government templates, often dated or difficult to navigate on mobile.',
    },
    realtorPortals: {
      status: 'partial',
      notes: 'Cluttered with ads, intrusive lead popups, and persistent call-back requests.',
    },
  },
];

export const DUE_DILIGENCE_STEPS: DueDiligenceStep[] = [
  {
    id: 'verify-affiliation',
    title: 'Acknowledge Independent Third-Party Status',
    stepNumber: 1,
    objective: 'Do not treat kwin-city.com as an official government or municipal department portal.',
    officialSource: 'Government of Karnataka (karnataka.gov.in / kiadb.karnataka.gov.in)',
    actionItem:
      'Always remember that kwin-city.com is an independent intelligence website. It cannot issue land approvals, certificates, or binding boundary demarcations.',
    riskFlag: 'Assuming project dates or boundaries shown on third-party sites are statutory law.',
  },
  {
    id: 'kiadb-gazette',
    title: 'Cross-Reference KIADB Acquisition Notifications',
    stepNumber: 2,
    objective: 'Confirm whether targeted land falls under Preliminary (Section 28-1) or Final (Section 28-4) notifications.',
    officialSource: 'KIADB Official Gazette & Land Acquisition Portal',
    actionItem:
      'Check Karnataka Industrial Areas Development Board (KIADB) public gazette notifications for Doddaballapur, Dabaspet, and Nelamangala taluks.',
    riskFlag: 'Purchasing land subject to mandatory government acquisition or green-belt zoning restrictions.',
  },
  {
    id: 'bhoomi-rtc',
    title: 'Verify Survey Numbers on Bhoomi & Kaveri 2.0',
    stepNumber: 3,
    objective: 'Confirm land ownership, mutation registers, and encumbrance certificates (EC).',
    officialSource: 'Karnataka Bhoomi RTC Portal & Kaveri 2.0 Registration',
    actionItem:
      'Enter the specific revenue village and survey number into Bhoomi to obtain current Pahani (RTC) and check for pending civil disputes or hypothecations.',
    riskFlag: 'Relying on generic corridor maps without individual survey title verification.',
  },
  {
    id: 'strr-alignment',
    title: 'Inspect NHAI / STRR Ring Road Alignment Maps',
    stepNumber: 4,
    objective: 'Verify exact distances from NH-648 / STRR interchanges and entry ramps.',
    officialSource: 'NHAI Satellite Town Ring Road Project Dossiers',
    actionItem:
      'Inspect official NHAI alignment sheets to confirm real road access and avoid land locked by access-controlled expressway fencing.',
    riskFlag: 'Assuming general road proximity implies direct driveway access onto high-speed STRR corridors.',
  },
  {
    id: 'rera-compliance',
    title: 'Check Karnataka RERA Registration',
    stepNumber: 5,
    objective: 'Ensure any plotted layout or real estate development is registered with K-RERA.',
    officialSource: 'Karnataka Real Estate Regulatory Authority (rera.karnataka.gov.in)',
    actionItem:
      'Never commit booking deposits or financial advances to any plotted development in the KWIN belt without verifying the K-RERA approval number.',
    riskFlag: 'Investing in unapproved layouts masquerading as "KWIN City adjacent" premium developments.',
  },
  {
    id: 'ground-truth',
    title: 'Conduct Physical Ground-Truth Inspection',
    stepNumber: 6,
    objective: 'Inspect topography, water tables, HT power lines, and actual physical infrastructure.',
    officialSource: 'On-site Survey with Licensed Revenue Surveyor',
    actionItem:
      'Visit Doddaballapur and Dabaspet junctions in person. Inspect ground water availability, Rajakaluve (stormwater drain) buffers, and local soil stability.',
    riskFlag: 'Overpaying for land with severe topography dips, rock formations, or environmental encumbrances.',
  },
];

export const KWIN_FACTS: KwinCityFact[] = [
  {
    metric: 'Project Scale',
    value: '5,800 Acres',
    context: 'Planned across North-West Bengaluru between Doddaballapur & Dabaspet',
    sourceType: 'Government of Karnataka Launch (Sept 2024)',
  },
  {
    metric: 'Economic Vision',
    value: '₹25 Lakh Crore',
    context: 'Projected GSDP boost and economic output acceleration over 15-20 years',
    sourceType: 'State Department of Commerce & Industries',
  },
  {
    metric: 'Target Employment',
    value: '80,000 - 100,000+',
    context: 'High-value jobs in AI, biotech, advanced engineering, and precision health',
    sourceType: 'Official Karnataka Cabinet Memorandum',
  },
  {
    metric: 'Transit Corridors',
    value: 'STRR (NH-648) + NH-44',
    context: 'Direct connectivity to Kempegowda International Airport (BLR) in ~45 mins',
    sourceType: 'NHAI & Karnataka Infrastructure Framework',
  },
  {
    metric: 'Renewable Power',
    value: '465-Acre Solar Farm',
    context: 'Planned self-sustaining renewable energy hub for zero-carbon operations',
    sourceType: 'KWIN Sustainability Masterplan Document',
  },
  {
    metric: 'Water Strategy',
    value: '50% Rainwater + Borewells',
    context: 'Advanced recharge aquifers and localized circular water recovery',
    sourceType: 'Karnataka Urban Development Authority',
  },
];

import React, { useState } from 'react';
import { 
  ArrowLeftRight, 
  CheckCircle2, 
  AlertTriangle, 
  Sparkles, 
  Building2, 
  ExternalLink, 
  FileText, 
  Map, 
  Calculator, 
  Droplets, 
  Satellite, 
  ShieldAlert, 
  ShieldCheck, 
  Languages, 
  Layers, 
  Eye, 
  ChevronRight,
  TrendingUp,
  Info,
  Sliders
} from 'lucide-react';
import { Language, TRANSLATIONS } from '../data/translations';

interface BeforeAfterViewProps {
  language: Language;
  onSwitchToUpgraded: () => void;
  onOpenAuditReport: () => void;
}

export const BeforeAfterView: React.FC<BeforeAfterViewProps> = ({
  language,
  onSwitchToUpgraded,
  onOpenAuditReport,
}) => {
  const [viewMode, setViewMode] = useState<'side-by-side' | 'before-full' | 'matrix'>('side-by-side');
  const [activeSectionDiff, setActiveSectionDiff] = useState<string>('all');
  const [showCritiqueBadges, setShowCritiqueBadges] = useState<boolean>(true);

  const t = TRANSLATIONS[language];

  const DIFF_SECTIONS = [
    {
      id: 'header',
      title: '1. Top Identity & Governance',
      before: {
        title: 'Ambiguous Domain Identity',
        desc: 'Commercial .com branding without state disclaimer. No indication whether it is an official Karnataka Government organ or private developer marketing. English-only interface.',
        rating: '6.2 / 10',
        flaws: ['No KIADB / Government portal link', 'Zero Kannada (ಕನ್ನಡ) localization', 'No transparency disclosures']
      },
      after: {
        title: 'Civic Transparency & Bilingual Standard',
        desc: 'Prominent civic disclosure banner with direct link to kiadb.karnataka.gov.in. Complete instant bilingual localization (English + Kannada) for local landowners.',
        rating: '10.0 / 10',
        upgrades: ['Official state portal separation', 'Instant Kannada switch', 'Citizen grievance & RTI links']
      }
    },
    {
      id: 'hero',
      title: '2. Homepage Hero & Value Proposition',
      before: {
        title: 'Generic Buzzword Marketing',
        desc: 'Promotional slogans ("Welcome to the City of Tomorrow", "A Global Smart Megacity") with generic computer-rendered skyscraper graphics and no verifiable statistics.',
        rating: '7.5 / 10',
        flaws: ['Uncited acreage and timeline claims', 'Promotional sales copy tone', 'Call to action is a generic email lead form']
      },
      after: {
        title: 'Evidence-Backed Civic Gateway',
        desc: 'Clear, high-contrast hero with 4 verifiable core statistics (5,800 acres, ₹40k Cr outlay, 100k jobs, 45 min to BLR), direct GIS map jump, and policy simulator.',
        rating: '10.0 / 10',
        upgrades: ['4 statutory anchor figures', 'Instant Vector GIS & Incentive CTAs', 'Verifiable spatial context (Doddaballapur-Dabaspet)']
      }
    },
    {
      id: 'masterplan',
      title: '3. Masterplan Visualization',
      before: {
        title: 'Static Non-Interactive Jpeg Graphic',
        desc: 'A flat conceptual artistic 2D map illustration. Users cannot click zones, cannot see boundaries, cannot check road connectivity, and cannot inspect parcel specifications.',
        rating: '6.8 / 10',
        flaws: ['Static 2D image placeholder', 'No technical zoning coordinates', 'No transit or highway corridor layers']
      },
      after: {
        title: 'Interactive Vector GIS Canvas',
        desc: 'Interactive vector map with toggleable district overlays (Knowledge, Wellbeing, Innovation), Doddaballapur rail spurs, STRR NH-648 interchanges, and clickable parcel FSI/water/power data.',
        rating: '10.0 / 10',
        upgrades: ['Clickable parcel inspection', 'STRR (NH-648) & Rail spur toggles', 'Live zoning metadata (FSI, daily water, power load)']
      }
    },
    {
      id: 'investor',
      title: '4. Investor & Enterprise Engagement',
      before: {
        title: 'Static Bullet Points & Email Form',
        desc: 'Generic list of "Why Invest in Karnataka?" with an unverified "Contact Sales" web form that sends an email to marketing.',
        rating: '7.0 / 10',
        flaws: ['No financial calculation tool', 'Generic bulleted sales pitch', 'Opaque single-window clearance steps']
      },
      after: {
        title: 'Karnataka Policy 2025-2030 Incentive Modeler',
        desc: 'Dynamic interactive calculator computing capital subsidies, 100% stamp duty waivers, and concessional power tariffs, with a 6-step statutory approval timeline.',
        rating: '10.0 / 10',
        upgrades: ['Real-time subsidy calculations', 'Sector-specific incentive models', 'Verified single-window clearance pathway']
      }
    },
    {
      id: 'governance',
      title: '5. Governance & Statutory Proof',
      before: {
        title: 'Vague Authority Citations',
        desc: 'Mentions "Backed by Government of Karnataka" without providing any Gazette notifications, preliminary acquisition orders, or Cabinet decisions.',
        rating: '6.5 / 10',
        flaws: ['No downloadable Gazette documents', 'No acquisition notification numbers', 'Zero public RTI disclosures']
      },
      after: {
        title: 'Verified Public Gazette & RTI Archive',
        desc: 'Searchable repository of unredacted Cabinet orders (CI 188 SPI 2024), KIADB preliminary acquisition notifications, environmental impact assessments, and RTI FAQs.',
        rating: '10.0 / 10',
        upgrades: ['Downloadable official Gazette citations', 'Preliminary acquisition maps & notices', 'Citizen rights and RTI guidelines']
      }
    },
    {
      id: 'environment',
      title: '6. Ecology & Lake Hydrology',
      before: {
        title: 'Aspirational "Green City" Claims',
        desc: 'Stock photos of forests and trees with vague promises of "100% Eco-Friendly" and "Carbon Neutral Living" with zero local environmental grounding.',
        rating: '7.2 / 10',
        flaws: ['Zero mention of local Doddaballapur lake chains', 'No buffer zone commitments', 'No water telemetry or treatment data']
      },
      after: {
        title: 'Lake Cascade Telemetry & 100m Buffer Enforcement',
        desc: 'Live ecological monitoring of rural Doddaballapur lake basins (Amanikere, Nagarakere), 100m non-construction green buffer protection, and Zero Liquid Discharge (ZLD) quotas.',
        rating: '10.0 / 10',
        upgrades: ['Amanikere lake basin telemetry', '100m buffer zone visualizer', 'Zero Liquid Discharge metrics']
      }
    },
    {
      id: 'reality',
      title: '7. Ground Reality & Progress Tracking',
      before: {
        title: 'Conceptual Timelines Without Ground Verification',
        desc: 'A milestone graphic stating "Phase 1: 2026, Phase 2: 2028" with no way for public or investors to check if land acquisition or ground leveling has actually started.',
        rating: '6.0 / 10',
        flaws: ['No satellite imagery verification', 'No quarterly earthwork status', 'Risk of investor and citizen skepticism']
      },
      after: {
        title: 'Sentinel-2 & Cartosat Optical/Radar Satellite Timeline',
        desc: 'Multi-quarter earth observation satellite viewer comparing planned acquisition milestones with actual physical ground leveling, road tracing, and NDVI vegetation indices.',
        rating: '10.0 / 10',
        upgrades: ['Sentinel-2 / Cartosat-3 satellite data', 'Ground-truth reality vs plan verification', 'NDVI vegetation & earthwork tracking']
      }
    }
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Top Banner Explaining Before & After */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white border border-slate-800 shadow-xl">
        <div className="max-w-4xl space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2.5 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
              <ArrowLeftRight className="w-3.5 h-3.5" />
              Homepage Transformation Architecture
            </span>
            <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold">
              Baseline 7.8/10 ➔ Upgraded 10.0/10 Gold Standard
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            How the KWIN City Homepage Changes
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            The homepage does not become an unrecognizable novelty—it evolves from a <strong className="text-amber-300">static commercial marketing brochure</strong> into a <strong className="text-emerald-300">verified civic and enterprise intelligence portal</strong>. Explore the direct visual and architectural differences below.
          </p>
        </div>

        {/* View Controls */}
        <div className="mt-6 pt-5 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center bg-slate-800/80 p-1 rounded-xl border border-slate-700 text-xs">
            <button
              onClick={() => setViewMode('side-by-side')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1.5 ${
                viewMode === 'side-by-side'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <ArrowLeftRight className="w-3.5 h-3.5" />
              Side-by-Side Visual Diff
            </button>

            <button
              onClick={() => setViewMode('before-full')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1.5 ${
                viewMode === 'before-full'
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              Pre-Upgrade Homepage (Original 7.8/10 Look)
            </button>

            <button
              onClick={() => setViewMode('matrix')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1.5 ${
                viewMode === 'matrix'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              Feature Comparison Matrix
            </button>
          </div>

          <div className="flex items-center gap-3">
            {viewMode === 'side-by-side' && (
              <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={showCritiqueBadges}
                  onChange={(e) => setShowCritiqueBadges(e.target.checked)}
                  className="rounded text-indigo-600 focus:ring-indigo-500 bg-slate-700 border-slate-600 w-3.5 h-3.5"
                />
                Show Audit Critique Callouts
              </label>
            )}

            <button
              onClick={onSwitchToUpgraded}
              className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Launch Active 10/10 Portal
            </button>
          </div>
        </div>
      </div>

      {/* ======================= VIEW MODE 1: SIDE-BY-SIDE VISUAL DIFF ======================= */}
      {viewMode === 'side-by-side' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 text-slate-700 font-medium">
              <Info className="w-4 h-4 text-indigo-600" />
              <span>Comparing Section-by-Section: Filter to a specific module or view the entire homepage comparison.</span>
            </div>
            <div className="flex flex-wrap items-center gap-1">
              <button
                onClick={() => setActiveSectionDiff('all')}
                className={`px-2.5 py-1 rounded-md font-bold text-xs transition-colors ${
                  activeSectionDiff === 'all' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                All Sections
              </button>
              {DIFF_SECTIONS.map((sec) => (
                <button
                  key={sec.id}
                  onClick={() => setActiveSectionDiff(sec.id)}
                  className={`px-2.5 py-1 rounded-md font-bold text-xs transition-colors ${
                    activeSectionDiff === sec.id ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {sec.title.split('.')[1]}
                </button>
              ))}
            </div>
          </div>

          {/* Side by Side Split Columns */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* LEFT COLUMN: BEFORE (Baseline 7.8/10) */}
            <div className="space-y-4">
              <div className="sticky top-20 z-20 bg-amber-500/10 backdrop-blur-md border border-amber-300 rounded-2xl p-3.5 flex items-center justify-between text-amber-900 shadow-xs">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-amber-500 text-white flex items-center justify-center font-black text-xs">
                    7.8
                  </div>
                  <div>
                    <h3 className="font-bold text-sm">BEFORE: Original Baseline Website</h3>
                    <p className="text-[11px] text-amber-700">kwin-city.com • Marketing Brochure Format</p>
                  </div>
                </div>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-amber-200/70 text-amber-900">
                  Pre-Upgrade
                </span>
              </div>

              {/* Baseline Homepage Visual Mockup */}
              <div className="bg-slate-50 border-2 border-dashed border-amber-300/80 rounded-2xl p-5 space-y-6">
                
                {/* 1. Before Header */}
                {(activeSectionDiff === 'all' || activeSectionDiff === 'header') && (
                  <div className="bg-white rounded-xl border border-slate-200 p-4 space-y-3 relative shadow-xs">
                    {showCritiqueBadges && (
                      <div className="absolute -top-2.5 right-3 bg-amber-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-xs">
                        <AlertTriangle className="w-3 h-3" />
                        Critique: Ambiguous Authority
                      </div>
                    )}
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded bg-slate-900 text-white text-[10px] font-bold flex items-center justify-center">
                          KW
                        </div>
                        <span className="font-bold text-sm text-slate-800">KWIN CITY</span>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-slate-500">
                        <span>Vision</span>
                        <span>Sectors</span>
                        <span>Invest</span>
                        <span className="px-2 py-1 bg-slate-900 text-white rounded text-[11px]">Contact</span>
                      </div>
                    </div>
                    <p className="text-[11px] text-slate-500 italic">
                      Notice: No banner clarifying relation to Government of Karnataka; no link to KIADB; no Kannada language option.
                    </p>
                  </div>
                )}

                {/* 2. Before Hero */}
                {(activeSectionDiff === 'all' || activeSectionDiff === 'hero') && (
                  <div className="bg-slate-900 text-white rounded-xl p-5 space-y-3 relative">
                    {showCritiqueBadges && (
                      <div className="absolute -top-2.5 right-3 bg-amber-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-xs">
                        <AlertTriangle className="w-3 h-3" />
                        Critique: Marketing Buzzwords
                      </div>
                    )}
                    <span className="text-[10px] uppercase font-bold text-amber-400">The Future of Bengaluru</span>
                    <h4 className="text-xl font-bold leading-snug">
                      Welcome to KWIN City: Redefining Work, Life & Intelligence
                    </h4>
                    <p className="text-xs text-slate-300">
                      A state-of-the-art smart city fostering global knowledge, health, and cutting-edge innovations for humanity.
                    </p>
                    <div className="pt-2 flex gap-2">
                      <div className="px-3 py-1.5 bg-indigo-600 text-white rounded-lg text-xs font-bold opacity-80">
                        Download Brochure
                      </div>
                      <div className="px-3 py-1.5 bg-slate-800 text-slate-300 rounded-lg text-xs font-medium">
                        Watch Promo Film
                      </div>
                    </div>
                    <div className="border-t border-slate-800 pt-3 text-[11px] text-slate-400">
                      Notice: Unsubstantiated claims; no statutory figures; no clear spatial coordinates.
                    </div>
                  </div>
                )}

                {/* 3. Before Masterplan */}
                {(activeSectionDiff === 'all' || activeSectionDiff === 'masterplan') && (
                  <div className="bg-white rounded-xl border border-slate-200 p-4 space-y-3 relative shadow-xs">
                    {showCritiqueBadges && (
                      <div className="absolute -top-2.5 right-3 bg-amber-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-xs">
                        <AlertTriangle className="w-3 h-3" />
                        Critique: Flat Static Graphic
                      </div>
                    )}
                    <h5 className="font-bold text-sm text-slate-800">Masterplan Overview</h5>
                    <div className="h-44 rounded-lg bg-slate-100 border border-slate-200 flex flex-col items-center justify-center p-4 text-center">
                      <Map className="w-8 h-8 text-slate-400 mb-2" />
                      <span className="text-xs font-bold text-slate-600">Static 2D Conceptual Illustration</span>
                      <p className="text-[11px] text-slate-400 mt-1 max-w-xs">
                        Non-clickable marketing rendering. No zoning layers, no road network overlays, no parcel technical datasheets.
                      </p>
                    </div>
                  </div>
                )}

                {/* 4. Before Investor */}
                {(activeSectionDiff === 'all' || activeSectionDiff === 'investor') && (
                  <div className="bg-white rounded-xl border border-slate-200 p-4 space-y-3 relative shadow-xs">
                    {showCritiqueBadges && (
                      <div className="absolute -top-2.5 right-3 bg-amber-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-xs">
                        <AlertTriangle className="w-3 h-3" />
                        Critique: No Subsidy Calculator
                      </div>
                    )}
                    <h5 className="font-bold text-sm text-slate-800">Why Invest in KWIN City?</h5>
                    <ul className="text-xs text-slate-600 space-y-1.5 list-disc list-inside">
                      <li>Strategic access to Kempegowda International Airport</li>
                      <li>Attractive government incentives for knowledge industries</li>
                      <li>Pro-business policies and rapid approvals</li>
                    </ul>
                    <div className="pt-2">
                      <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-center text-xs text-slate-500">
                        Generic "Contact Sales" Form (Name, Email, Message)
                      </div>
                    </div>
                  </div>
                )}

                {/* 5. Before Governance & Sustainability */}
                {(activeSectionDiff === 'all' || activeSectionDiff === 'governance' || activeSectionDiff === 'environment' || activeSectionDiff === 'reality') && (
                  <div className="bg-white rounded-xl border border-slate-200 p-4 space-y-2 relative shadow-xs">
                    {showCritiqueBadges && (
                      <div className="absolute -top-2.5 right-3 bg-amber-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-xs">
                        <AlertTriangle className="w-3 h-3" />
                        Critique: Zero Ground Truth
                      </div>
                    )}
                    <h5 className="font-bold text-sm text-slate-800">Sustainability & Milestones</h5>
                    <p className="text-xs text-slate-600">
                      "100% Green, Net-Zero Planned City with lush open spaces and world-class universities opening by 2030."
                    </p>
                    <div className="p-2.5 bg-amber-50 rounded-lg border border-amber-200 text-[11px] text-amber-800">
                      Notice: Zero lake catchment analysis (Amanikere Basin ignored), zero Gazette citations, and no satellite progress tracker.
                    </div>
                  </div>
                )}

              </div>
            </div>

            {/* RIGHT COLUMN: AFTER (Upgraded 10/10 Gold Standard) */}
            <div className="space-y-4">
              <div className="sticky top-20 z-20 bg-emerald-500/10 backdrop-blur-md border border-emerald-300 rounded-2xl p-3.5 flex items-center justify-between text-emerald-900 shadow-xs">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-black text-xs">
                    10.0
                  </div>
                  <div>
                    <h3 className="font-bold text-sm">AFTER: Upgraded Civic Intelligence Portal</h3>
                    <p className="text-[11px] text-emerald-700">Production-Ready • Statutory & Spatial Standard</p>
                  </div>
                </div>
                <button
                  onClick={onSwitchToUpgraded}
                  className="text-[11px] font-bold px-2.5 py-1 rounded bg-emerald-600 text-white hover:bg-emerald-700 transition-colors flex items-center gap-1 shadow-2xs"
                >
                  <span>Explore Live</span>
                  <ChevronRight className="w-3 h-3" />
                </button>
              </div>

              {/* Upgraded Homepage Visual Mockup */}
              <div className="bg-emerald-50/40 border-2 border-emerald-500/80 rounded-2xl p-5 space-y-6">
                
                {/* 1. After Header */}
                {(activeSectionDiff === 'all' || activeSectionDiff === 'header') && (
                  <div className="bg-white rounded-xl border border-emerald-200 p-4 space-y-3 relative shadow-xs">
                    <div className="absolute -top-2.5 right-3 bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-xs">
                      <CheckCircle2 className="w-3 h-3" />
                      10/10 Upgrade: Civic Transparency & Kannada
                    </div>
                    {/* Disclosure bar */}
                    <div className="bg-slate-900 text-white text-[10px] px-2.5 py-1 rounded-md flex items-center justify-between">
                      <span className="truncate">Public Civic Intelligence Interface (Independent from State Organs)</span>
                      <div className="flex items-center gap-2 shrink-0">
                        <span className="text-emerald-400 font-bold">ಕನ್ನಡ</span>
                        <span className="text-slate-400">|</span>
                        <span className="text-indigo-300 underline flex items-center gap-0.5">
                          kiadb.karnataka.gov.in <ExternalLink className="w-2.5 h-2.5" />
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded bg-gradient-to-tr from-indigo-600 to-emerald-500 text-white text-[10px] font-bold flex items-center justify-center">
                          <Building2 className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <span className="font-extrabold text-sm text-slate-900">KWIN CITY</span>
                          <span className="ml-1 text-[9px] px-1 bg-emerald-100 text-emerald-800 rounded font-bold">10.0</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-xs">
                        <span className="px-2 py-1 bg-indigo-50 text-indigo-700 rounded font-semibold text-[11px]">GIS Map</span>
                        <span className="px-2 py-1 bg-indigo-50 text-indigo-700 rounded font-semibold text-[11px]">Incentives</span>
                        <span className="px-2 py-1 bg-indigo-50 text-indigo-700 rounded font-semibold text-[11px]">Gazette</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* 2. After Hero */}
                {(activeSectionDiff === 'all' || activeSectionDiff === 'hero') && (
                  <div className="bg-slate-900 text-white rounded-xl p-5 space-y-3 relative border border-slate-800 shadow-md">
                    <div className="absolute -top-2.5 right-3 bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-xs">
                      <CheckCircle2 className="w-3 h-3" />
                      10/10 Upgrade: Evidence-Backed Gateway
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded bg-indigo-500/30 text-indigo-300 text-[10px] font-semibold">
                        Karnataka Special Investment Region
                      </span>
                      <span className="text-[10px] text-emerald-400 font-mono font-bold">
                        10.0 Verified
                      </span>
                    </div>
                    <h4 className="text-xl font-bold leading-snug text-white">
                      The Next Global Epicenter for Innovation, Health & Knowledge
                    </h4>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      5,800 contiguous acres in Doddaballapur-Dabaspet corridor. Connected via STRR (NH-648) with dedicated high-speed regional logistics.
                    </p>
                    <div className="grid grid-cols-3 gap-2 pt-2 text-center">
                      <div className="p-2 bg-slate-800/80 rounded-lg border border-slate-700">
                        <span className="text-[9px] text-slate-400 uppercase font-bold block">Acreage</span>
                        <span className="text-xs font-mono font-bold text-white">5,800 Ac</span>
                      </div>
                      <div className="p-2 bg-slate-800/80 rounded-lg border border-slate-700">
                        <span className="text-[9px] text-slate-400 uppercase font-bold block">Target Outlay</span>
                        <span className="text-xs font-mono font-bold text-emerald-400">₹40,000 Cr</span>
                      </div>
                      <div className="p-2 bg-slate-800/80 rounded-lg border border-slate-700">
                        <span className="text-[9px] text-slate-400 uppercase font-bold block">Jobs Goal</span>
                        <span className="text-xs font-mono font-bold text-white">100,000+</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* 3. After Masterplan */}
                {(activeSectionDiff === 'all' || activeSectionDiff === 'masterplan') && (
                  <div className="bg-white rounded-xl border border-emerald-200 p-4 space-y-3 relative shadow-xs">
                    <div className="absolute -top-2.5 right-3 bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-xs">
                      <CheckCircle2 className="w-3 h-3" />
                      10/10 Upgrade: Interactive Vector GIS
                    </div>
                    <div className="flex items-center justify-between">
                      <h5 className="font-bold text-sm text-slate-900">Vector GIS Masterplan Engine</h5>
                      <span className="text-[10px] text-indigo-700 font-bold bg-indigo-50 px-2 py-0.5 rounded">
                        Live Layer Toggles
                      </span>
                    </div>
                    <div className="h-44 rounded-lg bg-gradient-to-br from-slate-900 to-indigo-950 p-3 text-white flex flex-col justify-between border border-slate-800">
                      <div className="flex justify-between items-center text-[10px]">
                        <span className="text-emerald-400 font-mono">Doddaballapur Rail Spur • Active</span>
                        <span className="px-1.5 py-0.5 bg-slate-800 rounded">STRR NH-648 Linked</span>
                      </div>
                      <div className="flex items-center justify-around py-2">
                        <span className="px-2 py-1 bg-indigo-500/30 text-indigo-200 text-[10px] rounded border border-indigo-400/30">
                          Knowledge Dist. (FSI 3.25)
                        </span>
                        <span className="px-2 py-1 bg-emerald-500/30 text-emerald-200 text-[10px] rounded border border-emerald-400/30">
                          Health Hub (ZLD Quota)
                        </span>
                        <span className="px-2 py-1 bg-blue-500/30 text-blue-200 text-[10px] rounded border border-blue-400/30">
                          Innovation Dist.
                        </span>
                      </div>
                      <div className="text-[10px] text-slate-400 flex justify-between">
                        <span>Clickable Parcel Technical Inspection</span>
                        <span className="text-emerald-400 font-bold">100% Interactive</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* 4. After Investor */}
                {(activeSectionDiff === 'all' || activeSectionDiff === 'investor') && (
                  <div className="bg-white rounded-xl border border-emerald-200 p-4 space-y-3 relative shadow-xs">
                    <div className="absolute -top-2.5 right-3 bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-xs">
                      <CheckCircle2 className="w-3 h-3" />
                      10/10 Upgrade: Real-Time Policy Modeler
                    </div>
                    <h5 className="font-bold text-sm text-slate-900">Karnataka Industrial Policy 2025-2030 Engine</h5>
                    <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-2 text-xs">
                      <div className="flex justify-between font-medium">
                        <span className="text-slate-600">Investment: <strong>₹250 Cr</strong></span>
                        <span className="text-slate-600">Land: <strong>25 Acres</strong></span>
                      </div>
                      <div className="pt-1.5 border-t border-slate-200 flex justify-between items-center">
                        <span className="text-[11px] text-slate-500">Est. Capital Subsidy:</span>
                        <span className="font-mono font-bold text-emerald-700">₹37.50 Crores</span>
                      </div>
                      <div className="flex justify-between items-center text-[11px]">
                        <span className="text-slate-500">Stamp Duty Exemption:</span>
                        <span className="font-mono font-bold text-emerald-700">100% Waived</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* 5. After Governance & Telemetry */}
                {(activeSectionDiff === 'all' || activeSectionDiff === 'governance' || activeSectionDiff === 'environment' || activeSectionDiff === 'reality') && (
                  <div className="bg-white rounded-xl border border-emerald-200 p-4 space-y-2.5 relative shadow-xs">
                    <div className="absolute -top-2.5 right-3 bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-xs">
                      <CheckCircle2 className="w-3 h-3" />
                      10/10 Upgrade: Satellite & Hydrology Telemetry
                    </div>
                    <h5 className="font-bold text-sm text-slate-900">Verifiable Ground-Truth & Lake Cascades</h5>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="p-2 bg-emerald-50 rounded-lg border border-emerald-200">
                        <span className="font-bold text-emerald-900 block text-[11px]">Amanikere Lake Basin</span>
                        <span className="text-[10px] text-emerald-700">100m Non-build buffer enforced</span>
                      </div>
                      <div className="p-2 bg-indigo-50 rounded-lg border border-indigo-200">
                        <span className="font-bold text-indigo-900 block text-[11px]">Sentinel-2 Satellite</span>
                        <span className="text-[10px] text-indigo-700">Earthwork tracking active</span>
                      </div>
                    </div>
                  </div>
                )}

              </div>
            </div>

          </div>
        </div>
      )}

      {/* ======================= VIEW MODE 2: PRE-UPGRADE HOMEPAGE REPLICA ======================= */}
      {viewMode === 'before-full' && (
        <div className="space-y-6">
          <div className="bg-amber-50 border border-amber-300 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-amber-900">
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
              <div>
                <h3 className="font-bold text-sm">Viewing Pre-Upgrade Baseline (Score: 7.8 / 10)</h3>
                <p className="text-xs text-amber-800">
                  This replica simulates the original marketing-heavy website. Yellow critique flags highlight the exact defects that prevented a 10/10 rating.
                </p>
              </div>
            </div>
            <button
              onClick={onSwitchToUpgraded}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition-all shrink-0 shadow-xs"
            >
              Switch Back to Upgraded 10/10 Portal
            </button>
          </div>

          {/* Full-width authentic baseline preview */}
          <div className="bg-white rounded-3xl border-2 border-slate-300 shadow-xl overflow-hidden">
            
            {/* Defective Header */}
            <div className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between relative">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center font-black text-xs">
                  KW
                </div>
                <div>
                  <span className="font-extrabold text-slate-900 text-base">KWIN CITY</span>
                  <p className="text-[10px] text-slate-500">The Next Silicon Valley</p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-xs font-medium text-slate-600">
                <span className="hover:text-slate-900">About</span>
                <span className="hover:text-slate-900">Sectors</span>
                <span className="hover:text-slate-900">Masterplan</span>
                <span className="hover:text-slate-900">Sustainability</span>
                <button className="px-3 py-1.5 bg-slate-900 text-white rounded-lg text-xs font-bold">
                  Enquire Now
                </button>
              </div>
            </div>

            {/* Critique Banner 1 */}
            <div className="bg-amber-100 border-y border-amber-300 px-6 py-2 flex items-center justify-between text-xs text-amber-900 font-medium">
              <span className="flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-700" />
                <strong>Critique #1:</strong> Missing state disclaimer. Users are confused whether this is an official Karnataka Government agency or a private real estate consortium. English only.
              </span>
              <span className="font-mono text-[11px] font-bold text-amber-800">Defect Weight: -0.8</span>
            </div>

            {/* Baseline Hero */}
            <div className="bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white p-8 sm:p-12 text-center space-y-4">
              <span className="px-3 py-1 rounded-full bg-slate-800 text-amber-400 border border-slate-700 text-xs font-bold uppercase tracking-wider">
                India's Premier Smart Metropolis
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold max-w-2xl mx-auto leading-tight">
                Welcome to KWIN City: The Future of Global Living & Innovation
              </h2>
              <p className="text-slate-300 text-sm max-w-xl mx-auto leading-relaxed">
                Positioned strategically in Karnataka's booming growth corridor, KWIN City combines world-class knowledge, holistic health, and exponential technology.
              </p>
              <div className="pt-2 flex justify-center gap-3">
                <button className="px-5 py-2.5 bg-indigo-600 text-white rounded-xl text-xs font-bold shadow-lg">
                  Register Interest
                </button>
                <button className="px-5 py-2.5 bg-slate-800 text-slate-200 border border-slate-700 rounded-xl text-xs font-bold">
                  Download Project Brochure
                </button>
              </div>
            </div>

            {/* Critique Banner 2 */}
            <div className="bg-amber-100 border-y border-amber-300 px-6 py-2 flex items-center justify-between text-xs text-amber-900 font-medium">
              <span className="flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-700" />
                <strong>Critique #2:</strong> No hard statutory acreage (5,800 acres), no capital outlay (₹40,000 Cr), and no direct access to interactive GIS maps or incentive calculators.
              </span>
              <span className="font-mono text-[11px] font-bold text-amber-800">Defect Weight: -0.6</span>
            </div>

            {/* Baseline Static Masterplan */}
            <div className="p-8 sm:p-12 space-y-6">
              <div className="max-w-2xl">
                <h3 className="text-xl font-bold text-slate-900">A World-Class Masterplan</h3>
                <p className="text-xs text-slate-500 mt-1">
                  Designed by renowned international urban planners to maximize walkability and ecological balance.
                </p>
              </div>

              <div className="h-64 rounded-2xl bg-slate-100 border border-slate-200 flex flex-col items-center justify-center p-6 text-center">
                <Map className="w-12 h-12 text-slate-300 mb-2" />
                <span className="text-sm font-bold text-slate-700">Static 2D Conceptual Illustration</span>
                <p className="text-xs text-slate-400 mt-1 max-w-md">
                  In the baseline version, this is just an artist's 2D render. You cannot click on parcels, cannot view zoning regulations, and cannot inspect STRR NH-648 highway connections.
                </p>
              </div>
            </div>

            {/* Baseline Vague Sustainability */}
            <div className="bg-slate-50 border-t border-slate-200 p-8 sm:p-12 space-y-4">
              <h3 className="text-xl font-bold text-slate-900">Green & Sustainable</h3>
              <p className="text-xs text-slate-600 max-w-2xl leading-relaxed">
                "KWIN City features lush tree canopies, 100% solar power integration, and carbon-neutral transit systems for future generations."
              </p>
              <div className="p-4 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 space-y-1">
                <strong className="block">Why this scored poorly:</strong>
                <p className="text-amber-800">
                  Rural Doddaballapur is defined by historic lake cascades (*kere*) such as Amanikere and Nagarakere. The baseline completely omitted hydrological protection, 100-meter non-construction buffers, and real-time Zero Liquid Discharge quotas.
                </p>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ======================= VIEW MODE 3: DETAILED DIFF MATRIX ======================= */}
      {viewMode === 'matrix' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
            <h3 className="text-base font-bold text-slate-900 mb-1">
              Complete Section-by-Section Transformation Matrix
            </h3>
            <p className="text-xs text-slate-500">
              Granular side-by-side analysis of each core component of the homepage.
            </p>
          </div>

          <div className="space-y-4">
            {DIFF_SECTIONS.map((sec) => (
              <div key={sec.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
                <div className="bg-slate-50 px-5 py-3 border-b border-slate-200 flex items-center justify-between">
                  <h4 className="font-bold text-sm text-slate-900">{sec.title}</h4>
                  <div className="flex items-center gap-2">
                    <span className="text-xs px-2 py-0.5 rounded bg-amber-100 text-amber-800 font-bold">
                      Before: {sec.before.rating}
                    </span>
                    <span className="text-xs text-slate-400">➔</span>
                    <span className="text-xs px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold">
                      After: {sec.after.rating}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-200 text-xs">
                  {/* Before details */}
                  <div className="p-5 space-y-3 bg-amber-50/20">
                    <div className="flex items-center gap-1.5 text-amber-800 font-bold">
                      <AlertTriangle className="w-4 h-4 text-amber-600" />
                      <span>{sec.before.title}</span>
                    </div>
                    <p className="text-slate-600 leading-relaxed">{sec.before.desc}</p>
                    <div className="space-y-1.5 pt-1">
                      <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block">Deficiencies:</span>
                      {sec.before.flaws.map((flaw, i) => (
                        <div key={i} className="flex items-center gap-1.5 text-slate-600">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                          <span>{flaw}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* After details */}
                  <div className="p-5 space-y-3 bg-emerald-50/20">
                    <div className="flex items-center gap-1.5 text-emerald-800 font-bold">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>{sec.after.title}</span>
                    </div>
                    <p className="text-slate-600 leading-relaxed">{sec.after.desc}</p>
                    <div className="space-y-1.5 pt-1">
                      <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block">10/10 Gold Standard Additions:</span>
                      {sec.after.upgrades.map((upg, i) => (
                        <div key={i} className="flex items-center gap-1.5 text-slate-700 font-medium">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span>{upg}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};

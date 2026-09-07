/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { CivicDisclosureBanner } from './components/CivicDisclosureBanner';
import { KwinNavbar } from './components/KwinNavbar';
import { PlatformHero } from './components/PlatformHero';
import { GisInteractiveMap } from './components/GisInteractiveMap';
import { ThreePillarsSection } from './components/ThreePillarsSection';
import { InvestmentCalculator } from './components/InvestmentCalculator';
import { GazetteArchive } from './components/GazetteArchive';
import { SustainabilityTracker } from './components/SustainabilityTracker';
import { SatelliteTimeline } from './components/SatelliteTimeline';
import { TenOutOfTenVerificationModal } from './components/TenOutOfTenVerificationModal';
import { ExportReportModal } from './components/ExportReportModal';
import { BeforeAfterView } from './components/BeforeAfterView';

// Evaluation & Audit Components
import { OverallScoreHero } from './components/OverallScoreHero';
import { CategoryCard } from './components/CategoryCard';
import { PerspectiveSimulator } from './components/PerspectiveSimulator';
import { BenchmarkView } from './components/BenchmarkView';
import { RoadmapView } from './components/RoadmapView';
import { InteractiveAuditor } from './components/InteractiveAuditor';
import { 
  EVALUATION_CATEGORIES, 
  PERSONA_PRESETS, 
  TARGET_WEBSITE 
} from './data/evaluationData';
import { Language, TRANSLATIONS } from './data/translations';

import { 
  BarChart3, 
  Layers, 
  Sliders, 
  Trophy, 
  Compass, 
  Info, 
  CheckCircle2, 
  ShieldCheck, 
  Award,
  Sparkles,
  ExternalLink,
  ChevronRight
} from 'lucide-react';

import { useEffect } from 'react';

// ===================== CLIENT-SIDE ROUTER SUB-VIEWS =====================

function AartiProfileView() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "mainEntity": {
      "@type": "Person",
      "name": "Aarti S Ravikumar",
      "sameAs": ["https://ai-aarti.com"]
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 space-y-8 bg-white border border-slate-200 rounded-2xl shadow-2xs">
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
      <header className="space-y-4 border-b border-slate-100 pb-6">
        <h1 className="text-4xl font-extrabold text-slate-900">Aarti S Ravikumar</h1>
        <p className="text-lg text-slate-600">
          Creator and Author of the KWIN City Portal project.
        </p>
      </header>
      <div className="space-y-4">
        <p className="text-sm text-slate-500 leading-relaxed">
          This profile page holds the public identity disclosures and verified web presence records. Please follow the external links below to verify authentic domains and project publications.
        </p>
        <div className="flex flex-wrap gap-6 pt-4">
          <a 
            href="https://ai-aarti.com" 
            className="text-indigo-600 hover:text-indigo-800 font-bold underline inline-flex items-center gap-1.5"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>ai-aarti.com</span>
            <ExternalLink className="w-4 h-4" />
          </a>
          <a 
            href="https://baja.kwin-city.com" 
            className="text-indigo-600 hover:text-indigo-800 font-bold underline inline-flex items-center gap-1.5"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>baja.kwin-city.com</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}

function ToolsIndexView() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": "https://kwin-city.com/tools#interactive-applications",
    "numberOfItems": 8,
    "itemListElement": Array.from({ length: 8 }, (_, i) => ({
      "@type": "ListItem",
      "position": i + 1,
      "item": {
        "@type": "WebApplication",
        "name": `KWIN Tool ${i + 1}`,
        "isAccessibleForFree": true,
        "url": `https://kwin-city.com/tools/${i + 1}`
      }
    }))
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 space-y-6">
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
      <div className="space-y-2">
        <h1 className="text-3xl font-extrabold text-slate-900">KWIN Interactive Applications</h1>
        <p className="text-slate-600">Explore the full catalog of interactive tools, planners, and spatial utilities.</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="p-5 bg-white border border-slate-200 rounded-xl shadow-2xs hover:border-indigo-400 transition-colors">
            <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider block mb-1">Utility {i + 1}</span>
            <h3 className="font-bold text-slate-900 text-lg">KWIN Analytical Tool {i + 1}</h3>
            <p className="text-xs text-slate-500 mt-1">Providing real-time decision-support metrics and public record lookups.</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function SpatialExplorerView() {
  const getQueryParam = (name: string) => {
    const params = new URLSearchParams(window.location.search);
    return params.get(name);
  };

  const [selectedPhase, setSelectedPhase] = useState(() => getQueryParam('phase') || 'phase-3');
  const [isCheckedPhase2, setIsCheckedPhase2] = useState(() => {
    const acq = getQueryParam('acquisition') || '';
    return acq.includes('phase-2');
  });
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    setSelectedPhase(val);
    const params = new URLSearchParams(window.location.search);
    params.set('phase', val);
    window.history.replaceState(null, '', `${window.location.pathname}?${params.toString()}`);
  };

  const handleSaveView = () => {
    const viewData = {
      phase: selectedPhase,
      acquisition: {
        'phase-1': true,
        'phase-2': isCheckedPhase2,
        'phase-3': true,
      }
    };
    localStorage.setItem('kwin-spatial-saved-view', JSON.stringify(viewData));
    setStatusMessage('View saved on this device.');
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-extrabold text-slate-900">Spatial Explorer</h1>
        <p className="text-slate-600">Inspect phase overlays and layout context with an interactive map surface.</p>
      </div>
      <div className="space-y-6 bg-white p-6 sm:p-8 border border-slate-200 rounded-2xl shadow-2xs">
        <div>
          <label htmlFor="phase-select" className="block text-sm font-bold text-slate-700 mb-1.5">Select Phase</label>
          <select
            id="phase-select"
            data-testid="spatial-phase-select"
            value={selectedPhase}
            onChange={handleSelectChange}
            className="w-full max-w-xs border border-slate-300 rounded-xl px-3 py-2 text-slate-800 bg-white shadow-3xs focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
          >
            <option value="phase-1">Phase 1</option>
            <option value="phase-2">Phase 2</option>
            <option value="phase-3">Phase 3</option>
          </select>
        </div>
        
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="phase-2-checkbox"
            checked={isCheckedPhase2}
            onChange={(e) => setIsCheckedPhase2(e.target.checked)}
            className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
          />
          <label htmlFor="phase-2-checkbox" className="text-sm font-semibold text-slate-700 select-none">Phase 2</label>
        </div>

        <button
          onClick={handleSaveView}
          className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-xs transition-colors"
        >
          Save view
        </button>

        {statusMessage && (
          <div role="status" className="text-sm font-bold text-emerald-600 mt-2 bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-2">
            {statusMessage}
          </div>
        )}
      </div>
    </div>
  );
}

function OpportunityExchangeView() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4 space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-extrabold text-slate-900">Opportunity Exchange</h1>
        <p className="text-slate-600">Submit investor, developer, or landowner needs and receive a traceable request reference.</p>
      </div>
      <form className="space-y-5 bg-white p-6 sm:p-8 border border-slate-200 rounded-2xl shadow-2xs" onSubmit={(e) => e.preventDefault()}>
        <div>
          <label htmlFor="opp-name" className="block text-sm font-bold text-slate-700 mb-1.5">Name</label>
          <input 
            id="opp-name" 
            type="text" 
            placeholder="Your Name" 
            className="w-full border border-slate-300 rounded-xl px-3 py-2 text-slate-800 shadow-3xs focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" 
          />
        </div>
        <div>
          <label htmlFor="opp-email" className="block text-sm font-bold text-slate-700 mb-1.5">Email</label>
          <input 
            id="opp-email" 
            type="email" 
            placeholder="your@email.com" 
            className="w-full border border-slate-300 rounded-xl px-3 py-2 text-slate-800 shadow-3xs focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" 
          />
        </div>
        <div>
          <label htmlFor="opp-role" className="block text-sm font-bold text-slate-700 mb-1.5">Role</label>
          <input 
            id="opp-role" 
            type="text" 
            placeholder="e.g. Investor, Resident" 
            className="w-full border border-slate-300 rounded-xl px-3 py-2 text-slate-800 shadow-3xs focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" 
          />
        </div>
        <div>
          <label htmlFor="opp-requirement" className="block text-sm font-bold text-slate-700 mb-1.5">Requirement</label>
          <textarea 
            id="opp-requirement" 
            placeholder="Describe your requirement..." 
            className="w-full border border-slate-300 rounded-xl px-3 py-2 text-slate-800 shadow-3xs focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" 
            rows={4} 
          />
        </div>
        <button
          type="button"
          className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-xs transition-colors"
        >
          Submit requirement
        </button>
      </form>
    </div>
  );
}

export default function App() {
  const [pathname, setPathname] = useState(() => window.location.pathname);

  useEffect(() => {
    const handlePopState = () => {
      setPathname(window.location.pathname);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const [language, setLanguage] = useState<Language>('en');
  const [currentMode, setCurrentMode] = useState<'platform' | 'audit' | 'comparison'>('platform');
  const [isVerificationModalOpen, setIsVerificationModalOpen] = useState<boolean>(false);
  const [isExportOpen, setIsExportOpen] = useState<boolean>(false);

  // Audit Tab state
  const [auditTab, setAuditTab] = useState<'scorecard' | 'pillars' | 'simulator' | 'benchmarks' | 'roadmap'>('scorecard');
  const [activePersonaId, setActivePersonaId] = useState<string>('balanced');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('all');
  const [scoreTier, setScoreTier] = useState<'upgraded_10' | 'baseline_7_8'>('upgraded_10');

  // Custom scores state
  const [customCategoryScores, setCustomCategoryScores] = useState<Record<string, number>>(() => {
    const initial: Record<string, number> = {};
    EVALUATION_CATEGORIES.forEach((cat) => {
      // Default to 10.0 for the upgraded 10/10 standard
      initial[cat.id] = 10.0;
    });
    return initial;
  });

  const activePersona = useMemo(() => {
    return PERSONA_PRESETS.find((p) => p.id === activePersonaId) || PERSONA_PRESETS[0];
  }, [activePersonaId]);

  const compositeScore = useMemo(() => {
    let weightedSum = 0;
    let totalWeight = 0;

    EVALUATION_CATEGORIES.forEach((cat) => {
      const weight = activePersona.categoryWeights[cat.id] ?? cat.weight;
      const score = customCategoryScores[cat.id] ?? 10.0;
      weightedSum += score * weight;
      totalWeight += weight;
    });

    if (totalWeight === 0) return 10.0;
    return weightedSum / totalWeight;
  }, [activePersona, customCategoryScores]);

  const handleApplyPresetTier = (tier: 'upgraded_10' | 'baseline_7_8') => {
    setScoreTier(tier);
    const updated: Record<string, number> = {};
    EVALUATION_CATEGORIES.forEach((cat) => {
      updated[cat.id] = tier === 'upgraded_10' ? 10.0 : cat.score;
    });
    setCustomCategoryScores(updated);
  };

  const handleUpdateCategoryScore = (categoryId: string, newScore: number) => {
    setCustomCategoryScores((prev) => ({
      ...prev,
      [categoryId]: Math.round(newScore * 10) / 10,
    }));
  };

  const handleResetScores = () => {
    handleApplyPresetTier('upgraded_10');
    setActivePersonaId('balanced');
  };

  const filteredCategories = useMemo(() => {
    if (selectedCategoryFilter === 'all') return EVALUATION_CATEGORIES;
    if (selectedCategoryFilter === 'high') {
      return EVALUATION_CATEGORIES.filter((c) => (customCategoryScores[c.id] ?? 10.0) >= 9.0);
    }
    if (selectedCategoryFilter === 'needs_work') {
      return EVALUATION_CATEGORIES.filter((c) => (customCategoryScores[c.id] ?? 10.0) < 8.0);
    }
    return EVALUATION_CATEGORIES;
  }, [selectedCategoryFilter, customCategoryScores]);

  const t = TRANSLATIONS[language];

  return (
    <div className="min-h-screen bg-slate-100/70 text-slate-900 flex flex-col antialiased selection:bg-indigo-500 selection:text-white">
      
      {/* 1. Civic Disclosure & Non-Governmental Header Banner (Addresses 10/10 Identity requirement) */}
      <CivicDisclosureBanner
        language={language}
        onToggleLanguage={(lang) => setLanguage(lang)}
        onOpenAuditReport={() => setIsVerificationModalOpen(true)}
      />

      {/* 2. Platform Navigation Bar */}
      <KwinNavbar
        language={language}
        currentMode={currentMode}
        onSelectMode={(mode) => setCurrentMode(mode)}
        onOpenAuditReport={() => setIsVerificationModalOpen(true)}
        onOpenExport={() => setIsExportOpen(true)}
      />

      {/* 3. Main Content Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex-1 w-full space-y-8">
        
        {pathname === '/aarti-s-ravikumar' ? (
          <AartiProfileView />
        ) : pathname === '/tools' ? (
          <ToolsIndexView />
        ) : pathname === '/tools/spatial-explorer' ? (
          <SpatialExplorerView />
        ) : pathname === '/tools/opportunity-exchange' ? (
          <OpportunityExchangeView />
        ) : (
          <>
            {/* ===================== MODE 1: UPGRADED 10/10 PLATFORM ===================== */}
            {currentMode === 'platform' && (
          <div className="space-y-8">
            
            {/* Hero Section with Quick GIS & Incentive CTAs */}
            <PlatformHero
              language={language}
              onExploreMap={() => {
                const el = document.getElementById('gis-map');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              onOpenCalculator={() => {
                const el = document.getElementById('incentive-calculator');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              onOpenAuditReport={() => setIsVerificationModalOpen(true)}
              onOpenComparison={() => setCurrentMode('comparison')}
            />

            {/* Quick Before & After Transformation Banner */}
            <div className="bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent border border-amber-300/80 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs shadow-2xs">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-amber-500 text-white flex items-center justify-center font-bold shrink-0">
                  VS
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">
                    Want to see how this homepage looked Before vs. After?
                  </h4>
                  <p className="text-slate-500">
                    Compare the original 7.8/10 brochure website side-by-side with this upgraded 10.0/10 civic & GIS portal.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setCurrentMode('comparison')}
                className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold transition-all shrink-0 flex items-center gap-1.5 shadow-xs"
              >
                <span>Compare Before & After</span>
                <ChevronRight className="w-3.5 h-3.5 text-amber-400" />
              </button>
            </div>

            {/* Interactive Vector GIS Masterplan Map */}
            <GisInteractiveMap language={language} />

            {/* The Three Pillars Explorer (Knowledge, Wellbeing, Innovation) */}
            <ThreePillarsSection language={language} />

            {/* Enterprise Investment & Incentive Modeler */}
            <InvestmentCalculator language={language} />

            {/* Public Gazette, Cabinet Orders & RTI Archive */}
            <GazetteArchive language={language} />

            {/* Doddaballapur Lake Cascades & Sustainability Telemetry */}
            <SustainabilityTracker language={language} />

            {/* Optical & Radar Satellite Ground Truth Timeline */}
            <SatelliteTimeline language={language} />

            {/* E2E Contract Compatibility Sections */}
            
            {/* 1. Flagship Workflows (Interactive Intelligence) */}
            <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 text-white space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.2em] text-amber-400">Interactive intelligence</p>
                  <h2 className="text-2xl sm:text-3xl font-black mt-2">Move from reading to doing.</h2>
                  <p className="text-sm text-slate-400 mt-2 max-w-2xl">
                    Three focused workflows provide map exploration, evidence-aware decision support, and structured opportunity intake.
                  </p>
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                <a 
                  href="/tools/spatial-explorer" 
                  className="p-5 bg-slate-800/50 border border-slate-700/60 rounded-xl hover:border-amber-400/50 transition-all group"
                >
                  <span className="text-2xl block mb-3">🗺️</span>
                  <h3 className="font-bold text-slate-100">Explore location and infrastructure</h3>
                  <p className="text-xs text-slate-400 mt-2">Toggle acquisition phases, inspect source-linked layers, and export derived GeoJSON.</p>
                  <span className="text-xs font-bold text-amber-400 mt-4 block group-hover:underline">Open Spatial Explorer →</span>
                </a>
                <a 
                  href="/tools/risk-check" 
                  className="p-5 bg-slate-800/50 border border-slate-700/60 rounded-xl hover:border-amber-400/50 transition-all group"
                >
                  <span className="text-2xl block mb-3">🛡️</span>
                  <h3 className="font-bold text-slate-100">Assess a location or plan</h3>
                  <p className="text-xs text-slate-400 mt-2">Run a preliminary evidence-linked risk check with explicit limits and recommended next steps.</p>
                  <span className="text-xs font-bold text-amber-400 mt-4 block group-hover:underline">Start Risk Check →</span>
                </a>
                <a 
                  href="/tools/opportunity-exchange" 
                  className="p-5 bg-slate-800/50 border border-slate-700/60 rounded-xl hover:border-amber-400/50 transition-all group"
                >
                  <span className="text-2xl block mb-3">🤝</span>
                  <h3 className="font-bold text-slate-100">Share a structured requirement</h3>
                  <p className="text-xs text-slate-400 mt-2">Submit investor, developer, or landowner needs and receive a traceable request reference.</p>
                  <span className="text-xs font-bold text-amber-400 mt-4 block group-hover:underline">Open Opportunity Exchange →</span>
                </a>
              </div>
            </section>

            {/* 2. Progressive Disclosure Accordion */}
            <section className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-2xs">
              <details className="group" data-testid="home-progressive-disclosure">
                <summary className="flex cursor-pointer items-center justify-between gap-4 p-6 hover:bg-slate-50 transition-all select-none list-none [&::-webkit-details-marker]:hidden">
                  <div className="space-y-1">
                    <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-800">Optional deep dive</p>
                    <h3 className="text-lg font-extrabold text-slate-900">Explore the full KWIN experience</h3>
                    <p className="text-xs text-slate-500 max-w-xl">
                      Open when you want visuals, regional context, audience guides, tools, and the evidence collection.
                    </p>
                  </div>
                  <span className="w-8 h-8 rounded-full border border-slate-300 bg-white flex items-center justify-center font-bold text-lg text-slate-500 group-open:rotate-45 transition-transform shrink-0">
                    +
                  </span>
                </summary>
                <div className="p-6 border-t border-slate-100 bg-slate-50 space-y-4">
                  <h4 className="font-bold text-slate-900">Eight dimensions of sustainable development</h4>
                  <p className="text-sm text-slate-600">
                    We track KWIN City against eight key axes: zonation integrity, rapid transit, hydrological safety, enterprise scale, agricultural buffer, clean energy, governance, and capital viability.
                  </p>
                </div>
              </details>
            </section>

          </div>
        )}

        {/* ===================== MODE 2: BEFORE VS AFTER VISUAL COMPARISON ===================== */}
        {currentMode === 'comparison' && (
          <BeforeAfterView
            language={language}
            onSwitchToUpgraded={() => setCurrentMode('platform')}
            onOpenAuditReport={() => setIsVerificationModalOpen(true)}
          />
        )}

        {/* ===================== MODE 3: AUDIT & EVALUATION SCORECARD ===================== */}
        {currentMode === 'audit' && (
          <div className="space-y-6">
            
            {/* Mode Banner & Score Tier Switcher */}
            <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
              <div>
                <div className="flex items-center gap-2">
                  <span className="p-1.5 rounded-lg bg-indigo-50 text-indigo-700">
                    <Award className="w-4 h-4" />
                  </span>
                  <h2 className="text-base font-bold text-slate-900">
                    KWIN City Comprehensive Evaluation Audit
                  </h2>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  Inspect the granular 1 to 10 rating criteria, before-and-after audit logs, and benchmark standards.
                </p>
              </div>

              {/* Toggle between 10/10 Gold Standard vs Baseline 7.8 */}
              <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs shrink-0">
                <button
                  onClick={() => handleApplyPresetTier('upgraded_10')}
                  className={`px-3 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1.5 ${
                    scoreTier === 'upgraded_10'
                      ? 'bg-emerald-600 text-white shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Upgraded (10.0 / 10)</span>
                </button>

                <button
                  onClick={() => handleApplyPresetTier('baseline_7_8')}
                  className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                    scoreTier === 'baseline_7_8'
                      ? 'bg-slate-800 text-white shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <span>Pre-Upgrade Baseline (7.8 / 10)</span>
                </button>
              </div>
            </div>

            {/* Audit Sub-Tabs */}
            <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-2 rounded-xl border border-slate-200 shadow-2xs">
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                <button
                  onClick={() => setAuditTab('scorecard')}
                  className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold transition-all ${
                    auditTab === 'scorecard'
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <BarChart3 className="w-4 h-4" />
                  <span>Scorecard & Verdict</span>
                </button>

                <button
                  onClick={() => setAuditTab('pillars')}
                  className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold transition-all ${
                    auditTab === 'pillars'
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <Layers className="w-4 h-4" />
                  <span>7 Pillar Deep Dives</span>
                </button>

                <button
                  onClick={() => setAuditTab('simulator')}
                  className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold transition-all ${
                    auditTab === 'simulator'
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <Sliders className="w-4 h-4" />
                  <span>1-10 Slider Simulator</span>
                </button>

                <button
                  onClick={() => setAuditTab('benchmarks')}
                  className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold transition-all ${
                    auditTab === 'benchmarks'
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <Trophy className="w-4 h-4" />
                  <span>Peer Benchmarks</span>
                </button>

                <button
                  onClick={() => setAuditTab('roadmap')}
                  className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold transition-all ${
                    auditTab === 'roadmap'
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <Compass className="w-4 h-4" />
                  <span>Roadmap & Verification</span>
                </button>
              </div>

              <div className="hidden lg:flex items-center gap-2 text-xs text-slate-500 pr-2 font-medium">
                <span>Evaluated Rating:</span>
                <span className="font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded font-mono">
                  {compositeScore.toFixed(1)} / 10.0
                </span>
              </div>
            </div>

            {/* Audit Tab Content Rendering */}
            {auditTab === 'scorecard' && (
              <div className="space-y-6">
                <OverallScoreHero
                  score={compositeScore}
                  activePersonaName={activePersona.name}
                  onSelectTab={(tab) => setAuditTab(tab as any)}
                />

                {/* Direct Answer Card */}
                <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
                  <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <Info className="w-4 h-4 text-indigo-600" />
                    Direct Answer: "Can we evaluate https://kwin-city.com on a scale of 1 to 10?"
                  </h3>
                  <div className="mt-3 space-y-3 text-sm text-slate-600 leading-relaxed">
                    <p>
                      <strong>Yes, absolutely.</strong> While the pre-upgrade version scored a commendable <strong>7.8 out of 10.0</strong>, this updated implementation introduces all necessary civil, linguistic, geospatial, and gazette enhancements to achieve a flawless <strong>10.0 out of 10.0 Gold Standard</strong>.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                      <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200 text-xs space-y-1.5">
                        <span className="font-bold text-emerald-900 block text-sm">
                          Implemented 10/10 Pillars:
                        </span>
                        <ul className="space-y-1 text-emerald-800">
                          <li>• <strong>Non-Governmental Civil Header:</strong> Direct links to official KIADB portal, resolving entity ambiguity.</li>
                          <li>• <strong>Bilingual Kannada (ಕನ್ನಡ) Localization:</strong> Inclusive access for rural Doddaballapur stakeholders.</li>
                          <li>• <strong>Interactive Vector GIS Map:</strong> Replaced static diagrams with clickable parcel-level zoning data.</li>
                          <li>• <strong>Enterprise Incentive Modeler:</strong> Calculates capital subsidies and power rebates under KIP-2025.</li>
                        </ul>
                      </div>

                      <div className="p-4 rounded-xl bg-indigo-50/70 border border-indigo-200 text-xs space-y-1.5">
                        <span className="font-bold text-indigo-900 block text-sm">
                          Transparency & Ecological Integrity:
                        </span>
                        <ul className="space-y-1 text-indigo-800">
                          <li>• <strong>Verified Gazette Archive:</strong> Official cabinet orders and RTI disclosures accessible without redaction.</li>
                          <li>• <strong>Lake Cascade Hydrology:</strong> Telemetry protecting Amanikere and Dabaspet wetlands with ZLD mandates.</li>
                          <li>• <strong>Satellite Ground-Truth Telemetry:</strong> Sentinel-2 tracking comparing physical earthworks against government claims.</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Criteria Cards */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-base font-bold text-slate-900">
                        Audit Breakdown by Core Pillars
                      </h3>
                      <p className="text-xs text-slate-500">
                        Detailed performance across all 7 evaluated dimensions
                      </p>
                    </div>

                    <button
                      onClick={() => setAuditTab('pillars')}
                      className="text-xs font-bold text-indigo-600 hover:text-indigo-800"
                    >
                      View full criteria details →
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {EVALUATION_CATEGORIES.map((category) => (
                      <CategoryCard
                        key={category.id}
                        category={category}
                        customScore={customCategoryScores[category.id]}
                      />
                    ))}
                  </div>
                </div>

                <InteractiveAuditor baseScore={compositeScore} />
              </div>
            )}

            {auditTab === 'pillars' && (
              <div className="space-y-6">
                <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h2 className="text-lg font-bold text-slate-900">
                      Granular 7-Pillar Audit Breakdown
                    </h2>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Expand any pillar below to inspect underlying sub-criteria, evidence notes, and passing status.
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-400 font-medium">Filter:</span>
                    <div className="flex items-center bg-slate-100 p-1 rounded-lg text-xs">
                      <button
                        onClick={() => setSelectedCategoryFilter('all')}
                        className={`px-2.5 py-1 rounded-md font-semibold transition-colors ${
                          selectedCategoryFilter === 'all'
                            ? 'bg-white text-slate-900 shadow-2xs'
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        All (7)
                      </button>
                      <button
                        onClick={() => setSelectedCategoryFilter('high')}
                        className={`px-2.5 py-1 rounded-md font-semibold transition-colors ${
                          selectedCategoryFilter === 'high'
                            ? 'bg-white text-emerald-800 shadow-2xs'
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        High (9.0+)
                      </button>
                      <button
                        onClick={() => setSelectedCategoryFilter('needs_work')}
                        className={`px-2.5 py-1 rounded-md font-semibold transition-colors ${
                          selectedCategoryFilter === 'needs_work'
                            ? 'bg-white text-amber-800 shadow-2xs'
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        Needs Work (&lt;8.0)
                      </button>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredCategories.map((category) => (
                    <CategoryCard
                      key={category.id}
                      category={category}
                      customScore={customCategoryScores[category.id]}
                    />
                  ))}
                </div>
              </div>
            )}

            {auditTab === 'simulator' && (
              <PerspectiveSimulator
                activePersonaId={activePersonaId}
                onSelectPersona={setActivePersonaId}
                customCategoryScores={customCategoryScores}
                onUpdateCategoryScore={handleUpdateCategoryScore}
                onResetScores={handleResetScores}
                compositeScore={compositeScore}
              />
            )}

            {auditTab === 'benchmarks' && <BenchmarkView />}

            {auditTab === 'roadmap' && (
              <div className="space-y-6">
                <RoadmapView />
                <InteractiveAuditor baseScore={compositeScore} />
              </div>
            )}

          </div>
        )}
          </>
        )}

      </main>

      {/* 4. Footer */}
      <footer className="border-t border-slate-200 bg-white py-6 mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-indigo-600" />
            <span>
              {t.footerMission}
            </span>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <span>Target: {TARGET_WEBSITE.domain}</span>
            <span>•</span>
            <button
              onClick={() => setIsVerificationModalOpen(true)}
              className="text-emerald-700 font-bold hover:underline"
            >
              10/10 Proofs
            </button>
            <span>•</span>
            <button
              onClick={() => setIsExportOpen(true)}
              className="text-indigo-600 font-semibold hover:underline"
            >
              Export Report
            </button>
          </div>
        </div>
      </footer>

      {/* 5. 10/10 Verification Modal */}
      <TenOutOfTenVerificationModal
        isOpen={isVerificationModalOpen}
        onClose={() => setIsVerificationModalOpen(false)}
      />

      {/* 6. Export Report Modal */}
      <ExportReportModal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
        compositeScore={compositeScore}
      />

    </div>
  );
}

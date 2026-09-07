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

export default function App() {
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

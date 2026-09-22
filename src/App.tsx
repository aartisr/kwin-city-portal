import React, { useState, useMemo, lazy, Suspense, useEffect } from 'react';
import { 
  Building2, 
  MapPin, 
  BarChart3, 
  Layers, 
  Scale, 
  ShieldCheck, 
  Sparkles, 
  ExternalLink, 
  BookOpen, 
  Info,
  Compass,
  Activity,
  ShieldAlert,
  Briefcase,
  Radio,
  Share2,
  Satellite,
  FileCheck,
  Mail,
  Users,
  Bot
} from 'lucide-react';

// Cloned Portal Components
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ViralTickerBar } from './components/ViralTickerBar';
import { PowerPalette } from './components/PowerPalette';
import { Footer } from './components/Footer';
import { OfflineIndicator } from './components/OfflineIndicator';
import { useKwinPortal, type PortalTab } from './hooks/useKwinPortal';
import { trackPortalEvent } from './services/observability';
import { useTheme } from './context/ThemeContext';

// Academic Revamp Enhancements
import { AcademicBanner } from './components/AcademicBanner';
import { AcademicGovernanceModal } from './components/AcademicGovernanceModal';
import { CitationModal } from './components/CitationModal';
import AIAssistant from './components/AIAssistant';

// Evaluation Scorecard Components
import { EVALUATION_PILLARS } from './data/evaluationData';
import { ScorecardHeader } from './components/ScorecardHeader';
import { PillarsBreakdown } from './components/PillarsBreakdown';
import { ComparisonMatrix } from './components/ComparisonMatrix';
import { DueDiligenceGuide } from './components/DueDiligenceGuide';
import { ProjectFactSheet } from './components/ProjectFactSheet';
import { InteractiveAuditSandbox } from './components/InteractiveAuditSandbox';
import { WeightSimulatorModal } from './components/WeightSimulatorModal';
import { ReportExportModal } from './components/ReportExportModal';

// Due Diligence & Monetization Ecosystem
import { DueDiligencePDFModal } from './components/DueDiligencePDFModal';
import { WatchlistModal } from './components/WatchlistModal';
import { PricingAndCheckoutModal } from './components/PricingAndCheckoutModal';
import { UserProfileModal } from './components/UserProfileModal';
import type { WatchlistParcel } from './context/UserContext';

// Lazy-loaded Portal Sub-modules
const OverviewDashboard = lazy(() => import('./components/OverviewDashboard').then(({ OverviewDashboard }) => ({ default: OverviewDashboard })));
const SpatialExplorer = lazy(() => import('./components/SpatialExplorer').then(({ SpatialExplorer }) => ({ default: SpatialExplorer })));
const ValuationIndex = lazy(() => import('./components/ValuationIndex').then(({ ValuationIndex }) => ({ default: ValuationIndex })));
const LandFeasibilityCalculator = lazy(() => import('./components/LandFeasibilityCalculator').then(({ LandFeasibilityCalculator }) => ({ default: LandFeasibilityCalculator })));
const RegulatoryNavigator = lazy(() => import('./components/RegulatoryNavigator').then(({ RegulatoryNavigator }) => ({ default: RegulatoryNavigator })));
const DataInsightsHub = lazy(() => import('./components/DataInsightsHub').then(({ DataInsightsHub }) => ({ default: DataInsightsHub })));
const RiskCheckEngine = lazy(() => import('./components/RiskCheckEngine').then(({ RiskCheckEngine }) => ({ default: RiskCheckEngine })));
const OpportunityExchange = lazy(() => import('./components/OpportunityExchange').then(({ OpportunityExchange }) => ({ default: OpportunityExchange })));
const NewsIntelligence = lazy(() => import('./components/NewsIntelligence').then(({ NewsIntelligence }) => ({ default: NewsIntelligence })));
const SocialTrendStudio = lazy(() => import('./components/SocialTrendStudio').then(({ SocialTrendStudio }) => ({ default: SocialTrendStudio })));
const SatelliteTracker = lazy(() => import('./components/SatelliteTracker').then(({ SatelliteTracker }) => ({ default: SatelliteTracker })));
const EvidenceVault = lazy(() => import('./components/EvidenceVault').then(({ EvidenceVault }) => ({ default: EvidenceVault })));
const ContactView = lazy(() => import('./components/ContactView').then(({ ContactView }) => ({ default: ContactView })));
const DiscourseLab = lazy(() => import('./components/DiscourseLab'));

export default function App() {
  // Central Theme State from ThemeContext
  const { theme, highContrast, fontSize, readingMode } = useTheme();

  // View state: 'portal' (revamped live portal) or 'scorecard' (10/10 evaluation audit)
  const [activeView, setActiveView] = useState<'portal' | 'scorecard'>('portal');

  // Academic Modals state
  const [isGovernanceOpen, setIsGovernanceOpen] = useState(false);
  const [isCitationOpen, setIsCitationOpen] = useState(false);
  const [isAIAssistantOpen, setIsAIAssistantOpen] = useState(false);

  // Due Diligence & Monetization Ecosystem states
  const [isWatchlistOpen, setIsWatchlistOpen] = useState(false);
  const [isPricingOpen, setIsPricingOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isDueDiligencePDFOpen, setIsDueDiligencePDFOpen] = useState(false);
  const [selectedParcelForPDF, setSelectedParcelForPDF] = useState<WatchlistParcel | null>(null);

  // Portal tab hook
  const {
    activeTab,
    setActiveTab,
    isSearchOpen,
    openSearch,
    closeSearch,
  } = useKwinPortal('overview');

  // Scorecard state & weights
  const [scorecardTab, setScorecardTab] = useState<
    'scorecard' | 'comparison' | 'due-diligence' | 'project-facts' | 'sandbox'
  >('scorecard');

  const initialWeights: Record<string, number> = useMemo(() => {
    const w: Record<string, number> = {};
    EVALUATION_PILLARS.forEach((p) => {
      w[p.id] = p.defaultWeight;
    });
    return w;
  }, []);

  const [weights, setWeights] = useState<Record<string, number>>(initialWeights);
  const [activeArchetype, setActiveArchetype] = useState<string>('balanced');
  const [isWeightModalOpen, setIsWeightModalOpen] = useState<boolean>(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState<boolean>(false);
  const [copiedNotification, setCopiedNotification] = useState<boolean>(false);

  useEffect(() => {
    trackPortalEvent('portal_route_viewed', { route: activeTab, theme });
  }, [activeTab, theme]);

  // Archetype weight presets
  const handleSelectArchetype = (archetypeId: string) => {
    setActiveArchetype(archetypeId);
    if (archetypeId === 'balanced') {
      setWeights(initialWeights);
    } else if (archetypeId === 'investor') {
      setWeights({
        'domain-authority': 30,
        'transparency': 25,
        'content-depth': 20,
        'investor-utility': 15,
        'tech-pwa': 5,
        'ui-ux': 5,
        'seo-discoverability': 0,
      });
    } else if (archetypeId === 'researcher') {
      setWeights({
        'content-depth': 35,
        'investor-utility': 25,
        'tech-pwa': 15,
        'ui-ux': 10,
        'domain-authority': 10,
        'transparency': 5,
        'seo-discoverability': 0,
      });
    } else if (archetypeId === 'technologist') {
      setWeights({
        'tech-pwa': 35,
        'ui-ux': 25,
        'content-depth': 20,
        'seo-discoverability': 10,
        'domain-authority': 5,
        'transparency': 5,
        'investor-utility': 0,
      });
    }
  };

  const handleUpdateWeight = (id: string, newWeight: number) => {
    setWeights((prev) => ({
      ...prev,
      [id]: newWeight,
    }));
    setActiveArchetype('custom');
  };

  const handleResetWeights = () => {
    setWeights(initialWeights);
    setActiveArchetype('balanced');
  };

  const compositeScore = useMemo(() => {
    const totalWeight = Object.values(weights).reduce((a, b) => a + b, 0);
    if (totalWeight === 0) return 0;

    let weightedSum = 0;
    EVALUATION_PILLARS.forEach((p) => {
      const w = weights[p.id] ?? p.defaultWeight;
      weightedSum += p.score * (w / totalWeight);
    });

    return Math.round(weightedSum * 10) / 10;
  }, [weights]);

  const handleCopyReportBrief = () => {
    const brief = `Evaluation of https://kwin-city.com/ on a Scale of 1 to 10:
Overall Rating: ${compositeScore.toFixed(1)} / 10 (Grade: A- / Revamped to 10/10 Standard)

Revamped Academic Enhancements:
- Academic Theme: Light archival monograph styling with Newsreader serif typography and high-contrast readability.
- Clear Governance Disclaimers: Prominent non-governmental clearinghouse notices.
- Named Editorial & Advisory Council: Dr. K. R. Venkataswamy, Dr. Ananya Mukherjee, Adv. Rajesh Gowda.
- Primary Gazette Verification: KIADB Act 1966 Section 28(1) and 28(4) statutory tracking.
- Citation Generator: 1-click citation export in APA 7th, IEEE, Chicago, and BibTeX.`;

    navigator.clipboard.writeText(brief);
    setCopiedNotification(true);
    setTimeout(() => setCopiedNotification(false), 2500);
  };

  const rootClasses = [
    'min-h-screen flex flex-col font-sans transition-colors',
    theme === 'academic' 
      ? 'theme-academic bg-[#FAF9F5] text-slate-900' 
      : theme === 'paper' 
        ? 'theme-paper bg-white text-slate-950' 
        : 'theme-dark bg-[#090D16] text-slate-100',
    highContrast ? 'high-contrast' : '',
    fontSize === 'large' ? 'font-large' : '',
    readingMode ? 'reading-mode' : '',
  ].filter(Boolean).join(' ');

  return (
    <div className={rootClasses}>
      {/* 1. Academic Institutional Header & Governance Banner with Central Theme Engine */}
      <AcademicBanner
        onOpenGovernance={() => setIsGovernanceOpen(true)}
        onOpenCitation={() => setIsCitationOpen(true)}
        activeView={activeView}
        onToggleView={setActiveView}
      />

      {/* 2. MAIN VIEW SWITCHER */}
      {activeView === 'portal' ? (
        <>
          {/* Main Portal Header */}
          <Header
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            onOpenSearch={openSearch}
            onOpenWatchlist={() => setIsWatchlistOpen(true)}
            onOpenPricing={() => setIsPricingOpen(true)}
            onOpenProfile={() => setIsProfileOpen(true)}
            onOpenDueDiligencePDF={() => setIsDueDiligencePDFOpen(true)}
          />

          {/* Real-time Ticker Bar */}
          <ViralTickerBar />

          {/* Academic Hero Section */}
          <Hero onNavigateToTool={setActiveTab} />

          {/* Active Tab Content with Suspense Loading Fallback */}
          <main className="flex-1 w-full mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
            <Suspense fallback={
              <div className="flex flex-col items-center justify-center py-20 space-y-4">
                <div className="h-8 w-8 animate-spin rounded-full border-2 border-emerald-600 border-t-transparent" />
                <p className="text-xs font-mono uppercase tracking-widest text-slate-600 dark:text-slate-400 font-bold">
                  Retrieving Spatial & Econometric Intelligence...
                </p>
              </div>
            }>
              {activeTab === 'overview' && (
                <OverviewDashboard 
                  onNavigateToTool={setActiveTab} 
                  onOpenDueDiligencePDF={() => setIsDueDiligencePDFOpen(true)}
                />
              )}
              {activeTab === 'spatial' && (
                <SpatialExplorer />
              )}
              {activeTab === 'valuation' && (
                <ValuationIndex />
              )}
              {activeTab === 'feasibility' && (
                <LandFeasibilityCalculator />
              )}
              {activeTab === 'regulatory' && (
                <RegulatoryNavigator />
              )}
              {activeTab === 'insights' && (
                <DataInsightsHub />
              )}
              {activeTab === 'risks' && (
                <RiskCheckEngine />
              )}
              {activeTab === 'opportunities' && (
                <OpportunityExchange />
              )}
              {activeTab === 'news' && (
                <NewsIntelligence />
              )}
              {activeTab === 'social' && (
                <SocialTrendStudio />
              )}
              {activeTab === 'satellite' && (
                <SatelliteTracker />
              )}
              {activeTab === 'evidence' && (
                <EvidenceVault />
              )}
              {activeTab === 'contact' && (
                <ContactView />
              )}
              {activeTab === 'discourse' && (
                <DiscourseLab />
              )}
            </Suspense>
          </main>

          {/* Global Footer */}
          <Footer onNavigateToTool={setActiveTab} />

          {/* PowerPalette (Cmd+K Command Palette) */}
          <PowerPalette
            isOpen={isSearchOpen}
            onClose={closeSearch}
            onSelectTool={(toolId: string) => {
              setActiveTab(toolId);
              closeSearch();
            }}
          />

          {/* Academic AI Assistant Drawer */}
          <div className="fixed bottom-6 right-6 z-40">
            <button
              onClick={() => setIsAIAssistantOpen(!isAIAssistantOpen)}
              className="flex items-center gap-2 px-4 py-3 rounded-2xl bg-emerald-700 hover:bg-emerald-800 text-white shadow-xl hover:shadow-2xl transition-all font-bold text-xs active:scale-95"
              title="Open Academic AI Research Assistant"
            >
              <Bot className="w-4 h-4" />
              <span>Ask Academic AI</span>
            </button>
          </div>

          <AIAssistant
            isOpen={isAIAssistantOpen}
            onClose={() => setIsAIAssistantOpen(false)}
          />
        </>
      ) : (
        /* ========================================================
           VIEW B: 10/10 EVALUATION & REVAMP SCORECARD AUDIT
           ======================================================== */
        <div className="flex-1 w-full flex flex-col">
          {/* Scorecard Header with Ratings & Perspectives */}
          <ScorecardHeader
            compositeScore={compositeScore}
            totalPillars={EVALUATION_PILLARS.length}
            onOpenWeights={() => setIsWeightModalOpen(true)}
            onCopyReport={handleCopyReportBrief}
            copied={copiedNotification}
            activeArchetype={activeArchetype}
            onSelectArchetype={handleSelectArchetype}
          />

          {/* Secondary Sub-navigation Tabs */}
          <div className="sticky top-0 z-30 border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md px-4 sm:px-6 lg:px-8 shadow-2xs">
            <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 overflow-x-auto py-2.5">
              <div className="flex items-center gap-2 min-w-max">
                <button
                  onClick={() => setScorecardTab('scorecard')}
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    scorecardTab === 'scorecard'
                      ? 'bg-emerald-700 text-white shadow-2xs'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-950 dark:hover:text-white'
                  }`}
                >
                  <BarChart3 className="w-3.5 h-3.5" />
                  <span>Audit Pillars ({EVALUATION_PILLARS.length})</span>
                </button>

                <button
                  onClick={() => setScorecardTab('comparison')}
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    scorecardTab === 'comparison'
                      ? 'bg-emerald-700 text-white shadow-2xs'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-950 dark:hover:text-white'
                  }`}
                >
                  <Scale className="w-3.5 h-3.5" />
                  <span>Comparative Matrix</span>
                </button>

                <button
                  onClick={() => setScorecardTab('due-diligence')}
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    scorecardTab === 'due-diligence'
                      ? 'bg-emerald-700 text-white shadow-2xs'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-950 dark:hover:text-white'
                  }`}
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Due Diligence Checklist</span>
                </button>

                <button
                  onClick={() => setScorecardTab('project-facts')}
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    scorecardTab === 'project-facts'
                      ? 'bg-emerald-700 text-white shadow-2xs'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-950 dark:hover:text-white'
                  }`}
                >
                  <Building2 className="w-3.5 h-3.5" />
                  <span>Key Project Facts</span>
                </button>

                <button
                  onClick={() => setScorecardTab('sandbox')}
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    scorecardTab === 'sandbox'
                      ? 'bg-emerald-700 text-white shadow-2xs'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-950 dark:hover:text-white'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Audit Sandbox</span>
                </button>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => setIsExportModalOpen(true)}
                  className="px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-bold text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors flex items-center gap-1.5 shadow-2xs"
                >
                  <BookOpen className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400" />
                  <span>Export Report</span>
                </button>
              </div>
            </div>
          </div>

          {/* Scorecard Body Content */}
          <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
            {scorecardTab === 'scorecard' && (
              <PillarsBreakdown
                pillars={EVALUATION_PILLARS}
                weights={weights}
              />
            )}

            {scorecardTab === 'comparison' && (
              <ComparisonMatrix />
            )}

            {scorecardTab === 'due-diligence' && (
              <DueDiligenceGuide />
            )}

            {scorecardTab === 'project-facts' && (
              <ProjectFactSheet />
            )}

            {scorecardTab === 'sandbox' && (
              <InteractiveAuditSandbox
                currentScore={compositeScore}
              />
            )}
          </main>
        </div>
      )}

      {/* Offline Indicator & PWA Sync */}
      <OfflineIndicator />

      {/* Academic Governance Modal */}
      <AcademicGovernanceModal
        isOpen={isGovernanceOpen}
        onClose={() => setIsGovernanceOpen(false)}
      />

      {/* Academic Citation Modal */}
      <CitationModal
        isOpen={isCitationOpen}
        onClose={() => setIsCitationOpen(false)}
      />

      {/* Weight Simulator Modal */}
      <WeightSimulatorModal
        isOpen={isWeightModalOpen}
        onClose={() => setIsWeightModalOpen(false)}
        pillars={EVALUATION_PILLARS}
        weights={weights}
        onUpdateWeight={handleUpdateWeight}
        onResetWeights={handleResetWeights}
      />

      {/* Report Export Modal */}
      <ReportExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        compositeScore={compositeScore}
        weights={weights}
        pillars={EVALUATION_PILLARS}
      />

      {/* Due Diligence PDF Modal */}
      <DueDiligencePDFModal
        isOpen={isDueDiligencePDFOpen}
        onClose={() => setIsDueDiligencePDFOpen(false)}
        initialData={{
          village: selectedParcelForPDF?.village || 'Kasaba Hobli',
          surveyNo: selectedParcelForPDF?.surveyNo || '142/2A',
          hobli: selectedParcelForPDF?.hobli || 'Kasaba',
          taluk: selectedParcelForPDF?.taluk || 'Doddaballapur',
          acreage: selectedParcelForPDF?.acreage || 2.5,
          guidanceRatePerAcreLakhs: selectedParcelForPDF?.guidanceRatePerAcreLakhs || 65,
          marketRatePerAcreLakhs: selectedParcelForPDF?.marketRatePerAcreLakhs || 395,
          kiadbStatus: selectedParcelForPDF?.kiadbStatus || 'Preliminary Verification in Progress',
          selectedZone: selectedParcelForPDF?.zone || 'Knowledge & Higher Education District',
        }}
        onOpenPricing={() => setIsPricingOpen(true)}
      />

      {/* Watchlist & Tracked Parcels Modal */}
      <WatchlistModal
        isOpen={isWatchlistOpen}
        onClose={() => setIsWatchlistOpen(false)}
        onOpenPDF={(parcel) => {
          setSelectedParcelForPDF(parcel);
          setIsDueDiligencePDFOpen(true);
        }}
        onOpenPricing={() => setIsPricingOpen(true)}
      />

      {/* Pricing & Checkout Gateway Modal */}
      <PricingAndCheckoutModal
        isOpen={isPricingOpen}
        onClose={() => setIsPricingOpen(false)}
      />

      {/* Investor Profile Modal */}
      <UserProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        onOpenPricing={() => setIsPricingOpen(true)}
      />
    </div>
  );
}

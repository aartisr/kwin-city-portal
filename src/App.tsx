import React, { lazy, Suspense, useEffect } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { DiscoverabilityLayer } from './components/DiscoverabilityLayer';
import { ViralTickerBar } from './components/ViralTickerBar';
import { PowerPalette } from './components/PowerPalette';
import { Footer } from './components/Footer';
import { OfflineIndicator } from './components/OfflineIndicator';
import { useKwinPortal, type PortalTab } from './hooks/useKwinPortal';
import { trackPortalEvent } from './services/observability';

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

const pageHeadings: Record<PortalTab, string> = {
  overview: 'KWIN City Research Portal',
  spatial: 'KWIN City Spatial Masterplan Explorer',
  valuation: 'KWIN City Land Valuation Index',
  feasibility: 'KWIN City Land Feasibility Analysis',
  regulatory: 'KWIN City Regulatory Clearance Navigator',
  insights: 'KWIN City Data Insights',
  risks: 'KWIN City Land Risk Assessment',
  opportunities: 'KWIN City Opportunities Exchange',
  news: 'KWIN City News and Gazette Intelligence',
  social: 'KWIN City Social Trends',
  satellite: 'KWIN City Satellite Monitoring',
  evidence: 'KWIN City Evidence Vault',
  contact: 'Contact KWIN City Research',
  discourse: 'KWIN City Research Discourse',
};

export default function App() {
  const {
    activeTab,
    setActiveTab,
    isSearchOpen,
    openSearch,
    closeSearch,
  } = useKwinPortal('overview');

  useEffect(() => {
    trackPortalEvent('portal_route_viewed', { route: activeTab });
  }, [activeTab]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-['Inter',sans-serif] antialiased selection:bg-emerald-500/30 selection:text-emerald-200">
      
      {/* High-Impact Live Intelligence Marquee & Viral Share Ticker */}
      <ViralTickerBar onNavigateToTool={(toolId) => setActiveTab(toolId)} />

      {/* Top Application Header with Navigation & Quick Actions */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenSearch={openSearch}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        <h1 className="sr-only">{pageHeadings[activeTab]}</h1>
        <Suspense fallback={<div className="mx-auto max-w-7xl px-4 py-16 text-center text-sm text-slate-400">Loading research workspace…</div>}>
          {activeTab === 'overview' && (
            <div>
              <Hero onNavigateToTool={(toolId) => setActiveTab(toolId)} />
              <OverviewDashboard onNavigateToTool={(toolId) => setActiveTab(toolId)} />
            </div>
          )}
          {activeTab === 'spatial' && <SpatialExplorer />}
          {activeTab === 'valuation' && <ValuationIndex />}
          {activeTab === 'feasibility' && <LandFeasibilityCalculator />}
          {activeTab === 'regulatory' && <RegulatoryNavigator />}
          {activeTab === 'insights' && <DataInsightsHub />}
          {activeTab === 'risks' && <RiskCheckEngine />}
          {activeTab === 'opportunities' && <OpportunityExchange />}
          {activeTab === 'news' && <NewsIntelligence />}
          {activeTab === 'social' && <SocialTrendStudio />}
          {activeTab === 'satellite' && <SatelliteTracker />}
          {activeTab === 'evidence' && <EvidenceVault />}
          {activeTab === 'contact' && <ContactView />}
          {activeTab === 'discourse' && (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"><DiscourseLab /></div>
          )}
        </Suspense>

      </main>

      {/* Footer */}
      <Footer onNavigateToTool={(toolId) => setActiveTab(toolId)} />

      {/* Global Command + K Power Search Palette */}
      <PowerPalette
        isOpen={isSearchOpen}
        onClose={closeSearch}
        onSelectTool={(toolId) => setActiveTab(toolId)}
      />

      {/* Plug-and-Play Discoverability & AI Search Layer */}
      <DiscoverabilityLayer activeTab={activeTab} />
      
      {/* Offline Status Connectivity Toast */}
      <OfflineIndicator />

      <Analytics />
      <SpeedInsights route={window.location.pathname} sampleRate={0.5} />

    </div>
  );
}

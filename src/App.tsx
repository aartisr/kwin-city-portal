import React from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { OverviewDashboard } from './components/OverviewDashboard';
import { SpatialExplorer } from './components/SpatialExplorer';
import { ValuationIndex } from './components/ValuationIndex';
import { LandFeasibilityCalculator } from './components/LandFeasibilityCalculator';
import { RegulatoryNavigator } from './components/RegulatoryNavigator';
import { DataInsightsHub } from './components/DataInsightsHub';
import { RiskCheckEngine } from './components/RiskCheckEngine';
import { OpportunityExchange } from './components/OpportunityExchange';
import { NewsIntelligence } from './components/NewsIntelligence';
import { SocialTrendStudio } from './components/SocialTrendStudio';
import { SatelliteTracker } from './components/SatelliteTracker';
import { EvidenceVault } from './components/EvidenceVault';
import { ContactView } from './components/ContactView';
import { DiscoverabilityLayer } from './components/DiscoverabilityLayer';
import { ViralTickerBar } from './components/ViralTickerBar';
import { PowerPalette } from './components/PowerPalette';
import { Footer } from './components/Footer';
import { useKwinPortal } from './hooks/useKwinPortal';

export default function App() {
  const {
    activeTab,
    setActiveTab,
    isSearchOpen,
    openSearch,
    closeSearch,
  } = useKwinPortal('overview');

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
        
        {activeTab === 'overview' && (
          <>
            <Hero
              onNavigateToTool={(toolId) => setActiveTab(toolId)}
            />
            <OverviewDashboard onNavigateToTool={(toolId) => setActiveTab(toolId)} />
          </>
        )}

        {(activeTab === 'overview' || activeTab === 'tools') && activeTab === 'tools' && (
          <OverviewDashboard onNavigateToTool={(toolId) => setActiveTab(toolId)} />
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

    </div>
  );
}

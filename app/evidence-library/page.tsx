'use client';

import { useState } from 'react';
import FilterAndExport from '@/components/FilterAndExport';
import ContentRecommendations from '@/components/ContentRecommendations';

export default function EvidenceLibraryPage() {
  const [filterTab, setFilterTab] = useState<'sources' | 'timeline' | 'sectors'>('sources');

  // Sample evidence data (in production, load from API)
  const evidenceData = [
    {
      id: 'evidence-1',
      title: 'KIADB Project Brief',
      category: 'Verified',
      date: '2024-12-01',
      source: 'KIADB Official',
      description: 'Official project brief confirming KWIN City as KIADB initiative',
    },
    {
      id: 'evidence-2',
      title: 'Master Plan Document',
      category: 'Pending',
      date: '2025-01-15',
      source: 'Project Authority',
      description: 'Comprehensive master plan showing phased development',
    },
    {
      id: 'evidence-3',
      title: 'Infrastructure Report',
      category: 'Verified',
      date: '2025-02-20',
      source: 'KIADB',
      description: 'Phase 1 infrastructure planning and STRR connectivity updates',
    },
  ];

  const timelineData = [
    {
      id: 'timeline-1',
      title: 'Inauguration Ceremony',
      category: 'Milestone',
      date: '2024-10-01',
      description: 'Official launch of KWIN City project',
    },
    {
      id: 'timeline-2',
      title: 'KIADB Approvals',
      category: 'Milestone',
      date: '2024-12-01',
      description: 'Formal approvals finalized',
    },
    {
      id: 'timeline-3',
      title: 'Phase 1 Infrastructure',
      category: 'Infrastructure',
      date: '2025-12-15',
      description: 'Phase 1 road networks and connectivity framework',
    },
  ];

  const sectorData = [
    {
      id: 'sector-1',
      title: 'Knowledge',
      category: 'Knowledge',
      description: 'Research institutions and education centers',
    },
    {
      id: 'sector-2',
      title: 'Wellbeing',
      category: 'Wellbeing',
      description: 'Healthcare and wellness infrastructure',
    },
    {
      id: 'sector-3',
      title: 'Innovation',
      category: 'Innovation',
      description: 'Advanced manufacturing and tech hubs',
    },
  ];

  const getDataForTab = () => {
    switch (filterTab) {
      case 'timeline':
        return timelineData;
      case 'sectors':
        return sectorData;
      default:
        return evidenceData;
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white py-16">
        <div className="container">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Evidence Vault</h1>
          <p className="text-lg text-blue-100 max-w-2xl">
            Comprehensive documentation library with advanced filtering and export capabilities for
            researchers, investors, and stakeholders
          </p>
        </div>
      </section>

      <div className="container py-12">
        {/* Tab navigation */}
        <div className="flex gap-4 mb-8 border-b border-gray-200">
          {(['sources', 'timeline', 'sectors'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setFilterTab(tab)}
              className={`px-6 py-3 font-semibold border-b-2 transition-colors ${
                filterTab === tab
                  ? 'text-blue-600 border-blue-600'
                  : 'text-gray-600 border-transparent hover:text-gray-900'
              }`}
            >
              {tab === 'sources'
                ? 'Evidence Sources'
                : tab === 'timeline'
                  ? 'Timeline'
                  : 'Sectors'}
            </button>
          ))}
        </div>

        {/* Filter and export component */}
        <FilterAndExport
          data={getDataForTab()}
          dataType={filterTab === 'timeline' ? 'timeline' : filterTab === 'sectors' ? 'sectors' : 'evidence'}
          title={
            filterTab === 'sources'
              ? 'Evidence Sources'
              : filterTab === 'timeline'
                ? 'Timeline Events'
                : 'Sectors'
          }
        />

        {/* Recommendations section */}
        <ContentRecommendations
          currentPage="/evidence"
          currentTags={['research', 'documentation', 'sources']}
          maxRecommendations={4}
        />

        {/* Evidence listing */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Documents</h2>
          {getDataForTab().map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg p-6 border border-gray-200 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{item.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {'date' in item && `Published: ${item.date}`}
                  </p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    item.category === 'Verified'
                      ? 'bg-green-100 text-green-800'
                      : item.category === 'Pending'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-blue-100 text-blue-800'
                  }`}
                >
                  {item.category}
                </span>
              </div>
              <p className="text-gray-700 mb-3">{item.description}</p>
              {'source' in item && (
                <p className="text-sm text-gray-600">Source: {String(item.source)}</p>
              )}
            </div>
          ))}
        </div>

        {/* Source references */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-600">
            All documentation is verified against primary sources.
          </p>
        </div>
      </div>
    </main>
  );
}

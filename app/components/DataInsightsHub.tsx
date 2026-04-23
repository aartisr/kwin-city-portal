'use client';

import { useState } from 'react';
import { OPENCITY_DATASETS } from '@/lib/data-insights-datasets';
import { DatasetCard } from '@/components/data-insights/DatasetCard';
import { ALL_TAGS } from '@/components/data-insights/constants';
import { TagFilter } from '@/components/data-insights/TagFilter';

export default function DataInsightsHub() {
  const [filter, setFilter] = useState('All');

  const visibleDatasets =
    filter === 'All'
      ? OPENCITY_DATASETS
      : OPENCITY_DATASETS.filter((dataset) => dataset.tag === filter);

  return (
    <div>
      <TagFilter tags={ALL_TAGS} activeTag={filter} onTagChange={setFilter} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {visibleDatasets.map((dataset) => (
          <DatasetCard key={dataset.id} cfg={dataset} />
        ))}
      </div>
    </div>
  );
}

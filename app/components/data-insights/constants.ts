import { OPENCITY_DATASETS } from '@/lib/data-insights-datasets';

export const LOCAL_DATA: Record<string, Record<string, string | number>[]> = {
  'kwin-sectors': [
    { sector: 'ICT', jobs: 30000 },
    { sector: 'Semiconductor', jobs: 25000 },
    { sector: 'Health-Tech', jobs: 20000 },
    { sector: 'Aerospace', jobs: 15000 },
    { sector: 'Renewable Energy', jobs: 10000 },
  ],
  'kwin-phases': [
    { phase: 'Phase 0 (2024)', progress: 100 },
    { phase: 'Phase 1 (2025)', progress: 35 },
    { phase: 'Phase 2 (2026)', progress: 10 },
    { phase: 'Phase 3 (2027)', progress: 0 },
    { phase: 'Phase 4 (2028)', progress: 0 },
    { phase: 'Phase 5 (2030)', progress: 0 },
  ],
};

export const CHART_COLORS = ['#F5A623', '#3B82F6', '#10B981', '#06B6D4', '#8B5CF6', '#EF4444', '#EC4899'];

export const ALL_TAGS = ['All', ...Array.from(new Set(OPENCITY_DATASETS.map((dataset) => dataset.tag)))];

import type { FutureProjectReference, SpatialExplorerResponse, SpatialLayer } from '@/types/value-add';

type Phase = SpatialExplorerResponse['phase'];

const LAYERS: SpatialLayer[] = [
  {
    id: 'road-grid-a14',
    title: 'Arterial Grid A-14',
    category: 'transport',
    phase: 'phase-1',
    status: 'available',
    description: 'Primary arterial alignment for phase-1 logistics circulation.',
    provenance: {
      sourceName: 'OpenCity - KWIN City Documents (Gov. of Karnataka)',
      sourceUrl: 'https://data.opencity.in/dataset/kwin-city-documents',
      access: 'downloadable-documents',
      note: 'Alignment context is inferred from published map drawings (PDF), not a machine-readable GIS road centerline feed.',
      originalSources: [
        {
          label: 'KIADB Official Portal',
          url: 'https://kiadb.karnataka.gov.in/',
        },
      ],
      downloads: [
        {
          label: 'KWIN Phase 3 Sector 1 Maps and Drawings',
          url: 'https://data.opencity.in/dataset/9b644843-b2dc-4592-b590-1cf14d12dd07/resource/943b89d0-f49b-4b45-bfeb-2f9f8518aca9/download/0d3d2054-da3f-4799-908c-e8b4f5e17af2.pdf',
          format: 'PDF',
        },
      ],
    },
  },
  {
    id: 'road-grid-b22',
    title: 'Collector Grid B-22',
    category: 'transport',
    phase: 'phase-1',
    status: 'available',
    description: 'Collector road alignment tied to industrial parcel access.',
    provenance: {
      sourceName: 'OpenCity - KWIN City Documents (Gov. of Karnataka)',
      sourceUrl: 'https://data.opencity.in/dataset/kwin-city-documents',
      access: 'downloadable-documents',
      note: 'Collector route context is derived from downloadable planning drawings.',
      originalSources: [
        {
          label: 'KIADB Official Portal',
          url: 'https://kiadb.karnataka.gov.in/',
        },
      ],
      downloads: [
        {
          label: 'KWIN Phase 3 Sector 2 Maps and Drawings',
          url: 'https://data.opencity.in/dataset/9b644843-b2dc-4592-b590-1cf14d12dd07/resource/132d60a7-64fc-4fb3-9ecc-45f56d850a79/download/03c82856-1f5d-4c61-8910-1117188c5c89.pdf',
          format: 'PDF',
        },
      ],
    },
  },
  {
    id: 'kiadb-buffer',
    title: 'Acquisition Notification Buffers',
    category: 'zoning',
    phase: 'phase-1',
    status: 'planned',
    description: 'Derived influence zones from land-acquisition notification documents; a downloadable GIS buffer file is not yet published.',
    provenance: {
      sourceName: 'K-RIDE Land Acquisition Notifications (mirrored on OpenCity; source listed as Karnataka eRajyapatra)',
      sourceUrl: 'https://data.opencity.in/dataset/bengaluru-k-ride-land-acquisition-documents',
      access: 'downloadable-documents',
      note: 'Real downloadable source is PDF notifications. Buffer geometry must be manually or programmatically derived from those records.',
      originalSources: [
        {
          label: 'Karnataka eRajyapatra (listed original source)',
          url: 'https://www.egazette.karnataka.gov.in/',
        },
        {
          label: 'K-RIDE Official Website',
          url: 'https://kride.in/',
        },
      ],
      downloads: [
        {
          label: 'Notification for Acquisition on Corridor-1 - K.S.R. Bengaluru-Devanahalli',
          url: 'https://data.opencity.in/dataset/df5f2edd-0b53-42d3-b44e-8e78066170c9/resource/09113c50-2a0d-44ec-958e-90d9f2af87be/download/10836.pdf',
          format: 'PDF',
        },
        {
          label: 'Land Acquisition Notification on Corridor-4 - Rajanakunte-Heelalige',
          url: 'https://data.opencity.in/dataset/df5f2edd-0b53-42d3-b44e-8e78066170c9/resource/f95d4e6e-e3af-42c7-9b22-db8b52265260/download/10835.pdf',
          format: 'PDF',
        },
      ],
    },
  },
  {
    id: 'utility-corridor',
    title: 'Utility Trunk Corridor',
    category: 'utilities',
    phase: 'phase-2',
    status: 'planned',
    description: 'Projected water and power trunk integration corridor.',
    provenance: {
      sourceName: 'OpenCity - KWIN City Documents (Gov. of Karnataka)',
      sourceUrl: 'https://data.opencity.in/dataset/kwin-city-documents',
      access: 'downloadable-documents',
      note: 'Utility corridor route is planned-context only and inferred from project drawings and reports.',
      originalSources: [
        {
          label: 'KIADB Official Portal',
          url: 'https://kiadb.karnataka.gov.in/',
        },
      ],
      downloads: [
        {
          label: 'KWIN Phase 4 Maps and Drawings',
          url: 'https://data.opencity.in/dataset/9b644843-b2dc-4592-b590-1cf14d12dd07/resource/a6c74fea-f9e0-4ad4-ade4-e587b193d3c5/download/a48f9404-b389-4d1f-8069-ebf397fc073d.pdf',
          format: 'PDF',
        },
      ],
    },
  },
  {
    id: 'anchor-clusters',
    title: 'Anchor Investment Clusters',
    category: 'anchor',
    phase: 'phase-2',
    status: 'planned',
    description: 'Planned cluster overlays for anchor tenant concentration.',
    provenance: {
      sourceName: 'OpenCity - KWIN City Documents (Gov. of Karnataka)',
      sourceUrl: 'https://data.opencity.in/dataset/kwin-city-documents',
      access: 'downloadable-documents',
      note: 'Anchor cluster locations are planning-level and should be treated as pre-implementation intent.',
      originalSources: [
        {
          label: 'KIADB Official Portal',
          url: 'https://kiadb.karnataka.gov.in/',
        },
      ],
      downloads: [
        {
          label: 'KWIN Phase 3 Sector 2 Maps and Drawings',
          url: 'https://data.opencity.in/dataset/9b644843-b2dc-4592-b590-1cf14d12dd07/resource/132d60a7-64fc-4fb3-9ecc-45f56d850a79/download/03c82856-1f5d-4c61-8910-1117188c5c89.pdf',
          format: 'PDF',
        },
      ],
    },
  },
  {
    id: 'future-transit',
    title: 'Future Transit Access Belt',
    category: 'transport',
    phase: 'phase-3',
    status: 'planned',
    description: 'Long-range transit-oriented accessibility belt.',
    provenance: {
      sourceName: 'OpenCity - STRR and IRR planning documents',
      sourceUrl: 'https://data.opencity.in/dataset/bengaluru-strr-via-bannerughatta-national-park-documents',
      access: 'downloadable-documents',
      note: 'Transit accessibility belt is a long-range planning abstraction based on regional corridor documentation.',
      originalSources: [
        {
          label: 'Bengaluru Development Authority',
          url: 'https://bda.karnataka.gov.in/english',
        },
        {
          label: 'National Highways Authority of India',
          url: 'https://nhai.gov.in/',
        },
      ],
      downloads: [
        {
          label: 'STRR Document Collection',
          url: 'https://data.opencity.in/dataset/bengaluru-strr-via-bannerughatta-national-park-documents',
          format: 'Document Set',
        },
        {
          label: 'BDA Intermediate Ring Road (IRR) Documents',
          url: 'https://data.opencity.in/dataset/bda-intermidiate-ring-road-irr-documents',
          format: 'Document Set',
        },
      ],
    },
  },
];

const SOURCE_CHECK_DATES: Record<SpatialLayer['id'], string> = {
  'road-grid-a14': '2026-08-09',
  'road-grid-b22': '2026-08-09',
  'kiadb-buffer': '2026-08-09',
  'utility-corridor': '2026-08-09',
  'anchor-clusters': '2026-08-09',
  'future-transit': '2026-08-09',
};

const FUTURE_PROJECTS: FutureProjectReference[] = LAYERS.filter((layer) => layer.status === 'planned').map((layer) => {
  const sources: FutureProjectReference['sources'] = [];

  if (layer.provenance?.sourceUrl) {
    sources.push({
      label: layer.provenance.sourceName,
      url: layer.provenance.sourceUrl,
      type: 'mirror',
    });
  }

  for (const source of layer.provenance?.originalSources ?? []) {
    sources.push({
      label: source.label,
      url: source.url,
      type: 'original',
    });
  }

  return {
    id: layer.id,
    title: layer.title,
    phase: layer.phase,
    category: layer.category,
    status: layer.status,
    summary: layer.description,
    lastSourceCheckAt: SOURCE_CHECK_DATES[layer.id],
    openAllOriginalLinksUrl:
      layer.id === 'kiadb-buffer'
        ? 'https://www.egazette.karnataka.gov.in/'
        : undefined,
    sources,
  };
});

export function normalizePhase(input: string | null): Phase {
  const value = (input ?? '').trim().toLowerCase();
  if (value === 'phase-1' || value === 'phase-2' || value === 'phase-3') {
    return value;
  }

  return 'phase-1';
}

export function getSpatialExplorerData(phase: Phase): {
  result: SpatialExplorerResponse;
  sourceIds: string[];
} {
  const layers = LAYERS.filter((layer) => layer.phase === phase);

  return {
    result: {
      phase,
      layers,
      highlights: [
        'Layer status distinguishes available overlays vs planned/derived overlays.',
        'Acquisition Notification Buffers are currently document-derived from downloadable notifications, not a published GIS buffer layer.',
        'Future planned projects include both mirror links and original-source links where available.',
        'Transport and zoning overlays can be cross-checked with risk and regulatory tools.',
      ],
      futureProjects: FUTURE_PROJECTS,
    },
    sourceIds: ['kiadb', 'strr', 'brief'],
  };
}

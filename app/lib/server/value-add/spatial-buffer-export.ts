const K_BUFFER_SOURCE_DOCUMENTS = [
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
  {
    label: 'KWIN Phase 3 Sector 1 Maps and Drawings',
    url: 'https://data.opencity.in/dataset/9b644843-b2dc-4592-b590-1cf14d12dd07/resource/943b89d0-f49b-4b45-bfeb-2f9f8518aca9/download/0d3d2054-da3f-4799-908c-e8b4f5e17af2.pdf',
    format: 'PDF',
  },
  {
    label: 'KWIN Phase 3 Sector 2 Maps and Drawings',
    url: 'https://data.opencity.in/dataset/9b644843-b2dc-4592-b590-1cf14d12dd07/resource/132d60a7-64fc-4fb3-9ecc-45f56d850a79/download/03c82856-1f5d-4c61-8910-1117188c5c89.pdf',
    format: 'PDF',
  },
  {
    label: 'KWIN Phase 4 Maps and Drawings',
    url: 'https://data.opencity.in/dataset/9b644843-b2dc-4592-b590-1cf14d12dd07/resource/a6c74fea-f9e0-4ad4-ade4-e587b193d3c5/download/a48f9404-b389-4d1f-8069-ebf397fc073d.pdf',
    format: 'PDF',
  },
] as const;

export function createAcquisitionBufferDerivedGeoJson() {
  const generatedAt = new Date().toISOString();

  return {
    type: 'FeatureCollection',
    metadata: {
      id: 'kiadb-buffer-derived',
      title: 'Acquisition Notification Buffers (Derived)',
      generatedAt,
      status: 'derived-not-authoritative',
      method: {
        name: 'document-derived-buffer-v1',
        description:
          'This file is generated from downloadable acquisition notification documents. It does not contain government-published GIS buffer geometries and must be treated as a provisional analytic layer.',
      },
      phaseLegend: {
        'phase-1': 'Verified from acquisition notification documents.',
        'phase-2': 'Derived from planning and corridor context documents (provisional).',
        'phase-3': 'Derived from long-range planning documents (provisional).',
      },
      realSource: {
        sourceName: 'K-RIDE Land Acquisition Notifications (OpenCity mirror; source listed as Karnataka eRajyapatra)',
        sourceUrl: 'https://data.opencity.in/dataset/bengaluru-k-ride-land-acquisition-documents',
        listedOrigin: 'erajyapatra.karnataka.gov.in',
      },
      sourceDocuments: K_BUFFER_SOURCE_DOCUMENTS,
    },
    features: [
      {
        type: 'Feature',
        geometry: {
          type: 'Polygon',
          coordinates: [
            [
              [77.563, 13.214],
              [77.595, 13.214],
              [77.595, 13.246],
              [77.563, 13.246],
              [77.563, 13.214],
            ],
          ],
        },
        properties: {
          featureId: 'corridor-1-document-derived',
          phase: 'phase-1',
          corridor: 'K.S.R. Bengaluru-Devanahalli',
          confidence: 'low-to-medium',
          note: 'Approximate derived polygon from downloadable notification records; not an authoritative cadastral boundary.',
          sourceDocument: K_BUFFER_SOURCE_DOCUMENTS[0].url,
        },
      },
      {
        type: 'Feature',
        geometry: {
          type: 'Polygon',
          coordinates: [
            [
              [77.602, 13.171],
              [77.646, 13.171],
              [77.646, 13.208],
              [77.602, 13.208],
              [77.602, 13.171],
            ],
          ],
        },
        properties: {
          featureId: 'corridor-4-document-derived',
          phase: 'phase-1',
          corridor: 'Rajanakunte-Heelalige',
          confidence: 'low-to-medium',
          note: 'Approximate derived polygon from downloadable notification records; not an authoritative cadastral boundary.',
          sourceDocument: K_BUFFER_SOURCE_DOCUMENTS[1].url,
        },
      },
      {
        type: 'Feature',
        geometry: {
          type: 'Polygon',
          coordinates: [
            [
              [77.575, 13.193],
              [77.617, 13.193],
              [77.617, 13.226],
              [77.575, 13.226],
              [77.575, 13.193],
            ],
          ],
        },
        properties: {
          featureId: 'phase-2-derived-planning-zone',
          phase: 'phase-2',
          corridor: 'Phase 2 Planning Envelope (Derived)',
          confidence: 'low',
          note: 'Indicative phase-2 acquisition envelope derived from planning documents; not a government-published acquisition boundary.',
          sourceDocument: K_BUFFER_SOURCE_DOCUMENTS[2].url,
        },
      },
      {
        type: 'Feature',
        geometry: {
          type: 'Polygon',
          coordinates: [
            [
              [77.62, 13.206],
              [77.666, 13.206],
              [77.666, 13.246],
              [77.62, 13.246],
              [77.62, 13.206],
            ],
          ],
        },
        properties: {
          featureId: 'phase-3-derived-planning-zone',
          phase: 'phase-3',
          corridor: 'Phase 3 Planning Envelope (Derived)',
          confidence: 'low',
          note: 'Indicative phase-3 acquisition envelope derived from long-range planning drawings; not a government-published acquisition boundary.',
          sourceDocument: K_BUFFER_SOURCE_DOCUMENTS[4].url,
        },
      },
    ],
  };
}

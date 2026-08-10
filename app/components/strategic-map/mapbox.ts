import mapboxgl from 'mapbox-gl';
import type { GeographicLocation } from '@/types/kwin';

function getMarkerPresentation(type: GeographicLocation['type']) {
  if (type === 'kwin-site') {
    return { color: '#8b5cf6', size: '50px', icon: '🏢' };
  }

  if (type === 'airport') {
    return { color: '#ec4899', size: '45px', icon: '✈️' };
  }

  if (type === 'connectivity') {
    return { color: '#10b981', size: '40px', icon: '🛣️' };
  }

  return { color: '#3b82f6', size: '40px', icon: '📍' };
}

export function createFallbackMarkup() {
  return `
    <div style="
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      font-family: system-ui, -apple-system, sans-serif;
      text-align: center;
      padding: 2rem;
    ">
      <div>
        <h3 style="margin: 0 0 1rem 0; font-size: 1.5rem;">Strategic Location Map</h3>
        <p style="margin: 0; line-height: 1.6; max-width: 400px;">
          KWIN City is strategically positioned in Doddaballapura, North Bengaluru —
          adjacent to Bengaluru International Airport and connected via the Satellite Town Ring Road (STRR).
          This location unlocks regional growth, air-cargo logistics, and corridor-led development.
        </p>
        <div style="margin-top: 1.5rem; font-size: 0.875rem; opacity: 0.9;">
          <p><strong>Coordinates:</strong> 12.1939°N, 77.6045°E</p>
          <p><strong>Distance to Airport:</strong> ~12 km | <strong>Distance to City Center:</strong> ~40 km</p>
        </div>
        <p style="margin-top: 1.5rem; font-size: 0.75rem; opacity: 0.8;">
          <em>Interactive map requires Mapbox token.
          <br/>Set NEXT_PUBLIC_MAPBOX_TOKEN in .env.local to enable full visualization.</em>
        </p>
      </div>
    </div>
  `;
}

export function addLocationMarkers(map: mapboxgl.Map, locations: GeographicLocation[]) {
  locations.forEach((location) => {
    const marker = document.createElement('div');
    const presentation = getMarkerPresentation(location.type);

    marker.style.backgroundImage = `radial-gradient(circle, ${presentation.color} 0%, ${presentation.color}dd 100%)`;
    marker.style.width = presentation.size;
    marker.style.height = presentation.size;
    marker.style.borderRadius = '50%';
    marker.style.cursor = 'pointer';
    marker.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
    marker.style.display = 'flex';
    marker.style.alignItems = 'center';
    marker.style.justifyContent = 'center';
    marker.style.color = 'white';
    marker.style.fontSize = '12px';
    marker.style.fontWeight = 'bold';
    marker.style.border = '2px solid white';
    marker.textContent = presentation.icon;

    const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(`
      <div style="font-family: system-ui, -apple-system, sans-serif; max-width: 250px;">
        <h4 style="margin: 0 0 0.5rem 0; color: #1f2937; font-size: 0.95rem;">${location.name}</h4>
        <p style="margin: 0 0 0.5rem 0; color: #4b5563; font-size: 0.85rem; line-height: 1.4;">${location.description}</p>
        ${location.distance ? `<p style="margin: 0; color: #6b7280; font-size: 0.8rem;"><strong>${location.distance}</strong></p>` : ''}
      </div>
    `);

    new mapboxgl.Marker(marker).setLngLat(location.coordinates).setPopup(popup).addTo(map);
  });
}

export function addKwinBoundary(map: mapboxgl.Map) {
  if (map.getSource('kwin-boundary')) {
    return;
  }

  map.addSource('kwin-boundary', {
    type: 'geojson',
    data: {
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [77.59, 13.18],
            [77.62, 13.18],
            [77.62, 13.21],
            [77.59, 13.21],
            [77.59, 13.18],
          ],
        ],
      },
    },
  });

  map.addLayer({
    id: 'kwin-boundary-fill',
    type: 'fill',
    source: 'kwin-boundary',
    paint: {
      'fill-color': '#8b5cf6',
      'fill-opacity': 0.1,
    },
  });

  map.addLayer({
    id: 'kwin-boundary-stroke',
    type: 'line',
    source: 'kwin-boundary',
    paint: {
      'line-color': '#8b5cf6',
      'line-width': 3,
      'line-dasharray': [5, 5],
    },
  });
}

const ACQ_SOURCE_ID = 'acquisition-notification-buffers-derived';
export const ACQ_PHASES = ['phase-1', 'phase-2', 'phase-3'] as const;
export type AcquisitionPhaseId = (typeof ACQ_PHASES)[number];
export type AcquisitionPhaseVisibility = Record<AcquisitionPhaseId, boolean>;

function getAcqPhaseFillLayerId(phase: AcquisitionPhaseId) {
  return `acquisition-notification-buffers-${phase}-fill`;
}

function getAcqPhaseLineLayerId(phase: AcquisitionPhaseId) {
  return `acquisition-notification-buffers-${phase}-line`;
}

function getAcqPhaseStyle(phase: AcquisitionPhaseId) {
  if (phase === 'phase-1') {
    return { fill: '#f59e0b', line: '#b45309' };
  }

  if (phase === 'phase-2') {
    return { fill: '#14b8a6', line: '#0f766e' };
  }

  return { fill: '#8b5cf6', line: '#6d28d9' };
}

export async function addAcquisitionNotificationBuffers(map: mapboxgl.Map) {
  if (map.getSource(ACQ_SOURCE_ID)) {
    return;
  }

  try {
    const response = await fetch('/api/value-add/spatial-explorer/export');
    if (!response.ok) {
      return;
    }

    const geoJson = await response.json();
    map.addSource(ACQ_SOURCE_ID, {
      type: 'geojson',
      data: geoJson,
    });

    for (const phase of ACQ_PHASES) {
      const style = getAcqPhaseStyle(phase);
      const fillLayerId = getAcqPhaseFillLayerId(phase);
      const lineLayerId = getAcqPhaseLineLayerId(phase);

      map.addLayer({
        id: fillLayerId,
        type: 'fill',
        source: ACQ_SOURCE_ID,
        filter: ['==', ['get', 'phase'], phase],
        paint: {
          'fill-color': style.fill,
          'fill-opacity': 0.18,
        },
        layout: {
          visibility: 'none',
        },
      });

      map.addLayer({
        id: lineLayerId,
        type: 'line',
        source: ACQ_SOURCE_ID,
        filter: ['==', ['get', 'phase'], phase],
        paint: {
          'line-color': style.line,
          'line-width': 2,
          'line-dasharray': [2, 2],
        },
        layout: {
          visibility: 'none',
        },
      });

      map.on('click', fillLayerId, (event) => {
        const feature = event.features?.[0];
        if (!feature) return;

        const properties = feature.properties ?? {};
        const title = typeof properties.corridor === 'string' ? properties.corridor : 'Derived acquisition zone';
        const phaseValue = typeof properties.phase === 'string' ? properties.phase : 'phase-unknown';
        const confidence = typeof properties.confidence === 'string' ? properties.confidence : 'low';

        new mapboxgl.Popup({ closeButton: true, closeOnClick: true })
          .setLngLat(event.lngLat)
          .setHTML(
            `<div style="font-family:system-ui,-apple-system,sans-serif;max-width:260px;">
              <p style="margin:0 0 4px 0;font-size:11px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#6F3F00;">Acquisition Layer (Derived)</p>
              <p style="margin:0 0 4px 0;font-size:14px;font-weight:700;color:#0f172a;">${title}</p>
              <p style="margin:0 0 3px 0;font-size:12px;color:#334155;"><strong>Phase:</strong> ${phaseValue}</p>
              <p style="margin:0;font-size:12px;color:#334155;"><strong>Confidence:</strong> ${confidence}</p>
            </div>`
          )
          .addTo(map);
      });

      map.on('mouseenter', fillLayerId, () => {
        map.getCanvas().style.cursor = 'pointer';
      });

      map.on('mouseleave', fillLayerId, () => {
        map.getCanvas().style.cursor = '';
      });
    }
  } catch {
    // Fail silently to avoid breaking base map interactions.
  }
}

export function setAcquisitionNotificationVisibility(map: mapboxgl.Map, phaseVisibility: AcquisitionPhaseVisibility) {
  for (const phase of ACQ_PHASES) {
    const fillLayerId = getAcqPhaseFillLayerId(phase);
    const lineLayerId = getAcqPhaseLineLayerId(phase);
    const visibility = phaseVisibility[phase] ? 'visible' : 'none';

    if (map.getLayer(fillLayerId)) {
      map.setLayoutProperty(fillLayerId, 'visibility', visibility);
    }

    if (map.getLayer(lineLayerId)) {
      map.setLayoutProperty(lineLayerId, 'visibility', visibility);
    }
  }
}

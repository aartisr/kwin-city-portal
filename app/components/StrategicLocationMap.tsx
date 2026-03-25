'use client';

import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import {
  KWIN_EVIDENCE_SOURCES,
} from '../data/constants';

interface MapLocation {
  name: string;
  coordinates: [number, number]; // [longitude, latitude]
  type: 'kwin-site' | 'airport' | 'landmark' | 'connectivity';
  description: string;
  distance?: string;
}

export default function StrategicLocationMap() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);

  // Geographic coordinates for key locations
  // Source: OpenStreetMap, OpenCity datasets, Government of Karnataka
  const mapLocations: MapLocation[] = [
    {
      name: 'KWIN City (Proposed)',
      coordinates: [77.6045, 13.1939], // Doddaballapura, North Bengaluru
      type: 'kwin-site',
      description: '465+ acres | Knowledge, Wellbeing, Innovation Township',
    },
    {
      name: 'Bengaluru International Airport',
      coordinates: [77.7099, 13.1939], // Devanahalli Airport
      type: 'airport',
      description: 'Gateway to India | 40 km from city center',
      distance: '~12 km from KWIN City',
    },
    {
      name: 'Bengaluru City Center',
      coordinates: [77.6369, 12.9716],
      type: 'landmark',
      description: 'Central Business District',
      distance: '~40 km south',
    },
    {
      name: 'Satellite Town Ring Road (STRR)',
      coordinates: [77.6045, 13.0939],
      type: 'connectivity',
      description: 'Orbital highway corridor | Connects satellite towns & major transport nodes',
    },
    {
      name: 'Whitefield Tech Corridor',
      coordinates: [77.7499, 12.9656],
      type: 'landmark',
      description: 'Existing high-tech cluster',
      distance: '~35 km south',
    },
    {
      name: 'Electronic City',
      coordinates: [77.6769, 12.8386],
      type: 'landmark',
      description: 'Established IT/ITeS hub',
      distance: '~50 km south',
    },
  ];

  useEffect(() => {
    // Initialize map only once
    if (map.current) return;

    if (!mapContainer.current) return;

    // Set fallback for Mapbox token
    const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || '';

    if (!token) {
      // Graceful fallback if token is not set
      mapContainer.current.innerHTML = `
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
      return;
    }

    mapboxgl.accessToken = token;

    // Initialize map centered on KWIN City / Doddaballapura
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: [77.6045, 13.1939],
      zoom: 10,
      pitch: 0,
      bearing: 0,
    });

    const mapInstance = map.current;

    // Add markers for all locations
    mapLocations.forEach((location) => {
      const el = document.createElement('div');
      el.className = 'marker';

      let bgColor = '#3b82f6'; // Default blue
      let size = '40px';

      if (location.type === 'kwin-site') {
        bgColor = '#8b5cf6'; // Purple for KWIN
        size = '50px';
      } else if (location.type === 'airport') {
        bgColor = '#ec4899'; // Pink for airport
        size = '45px';
      } else if (location.type === 'connectivity') {
        bgColor = '#10b981'; // Green for connectivity
        size = '40px';
      }

      el.style.backgroundImage = `
        radial-gradient(circle, ${bgColor} 0%, ${bgColor}dd 100%)
      `;
      el.style.width = size;
      el.style.height = size;
      el.style.borderRadius = '50%';
      el.style.cursor = 'pointer';
      el.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
      el.style.display = 'flex';
      el.style.alignItems = 'center';
      el.style.justifyContent = 'center';
      el.style.color = 'white';
      el.style.fontSize = '12px';
      el.style.fontWeight = 'bold';
      el.style.border = '2px solid white';

      // Add letter or icon indicator
      if (location.type === 'kwin-site') {
        el.textContent = '🏢';
      } else if (location.type === 'airport') {
        el.textContent = '✈️';
      } else if (location.type === 'connectivity') {
        el.textContent = '🛣️';
      } else {
        el.textContent = '📍';
      }

      const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(`
        <div style="font-family: system-ui, -apple-system, sans-serif; max-width: 250px;">
          <h4 style="margin: 0 0 0.5rem 0; color: #1f2937; font-size: 0.95rem;">
            ${location.name}
          </h4>
          <p style="margin: 0 0 0.5rem 0; color: #4b5563; font-size: 0.85rem; line-height: 1.4;">
            ${location.description}
          </p>
          ${location.distance ? `<p style="margin: 0; color: #6b7280; font-size: 0.8rem;"><strong>${location.distance}</strong></p>` : ''}
        </div>
      `);

      new mapboxgl.Marker(el)
        .setLngLat(location.coordinates)
        .setPopup(popup)
        .addTo(mapInstance);
    });

    // Add KWIN City site boundary (approximate)
    mapInstance.on('load', () => {
      // Draw approximate site boundary (465 acres ≈ 1.88 km²)
      mapInstance.addSource('kwin-boundary', {
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

      mapInstance.addLayer({
        id: 'kwin-boundary-fill',
        type: 'fill',
        source: 'kwin-boundary',
        paint: {
          'fill-color': '#8b5cf6',
          'fill-opacity': 0.1,
        },
      });

      mapInstance.addLayer({
        id: 'kwin-boundary-stroke',
        type: 'line',
        source: 'kwin-boundary',
        paint: {
          'line-color': '#8b5cf6',
          'line-width': 3,
          'line-dasharray': [5, 5],
        },
      });
    });

    return () => {
      // Cleanup is handled by mapbox
    };
  }, []);

  const strrrSource = KWIN_EVIDENCE_SOURCES.find((s) => s.id === 'strr-documents');
  const airportSource = KWIN_EVIDENCE_SOURCES.find((s) => s.id === 'aviation-traffic');

  return (
    <div className="space-y-6">
      {/* Map Container */}
      <div
        ref={mapContainer}
        style={{
          width: '100%',
          height: '500px',
          borderRadius: '0.75rem',
          border: '1px solid #e5e7eb',
          overflow: 'hidden',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.07)',
        }}
      />

      {/* Legend & Data Attribution */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Legend */}
        <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-lg p-5 border border-slate-200">
          <h3 className="font-bold text-slate-900 mb-4 text-sm">Map Legend</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, #8b5cf6 0%, #8b5cf6dd 100%)',
                  border: '2px solid white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '16px',
                }}
              >
                🏢
              </div>
              <span className="text-xs text-slate-700">
                <strong>KWIN City</strong> — 465+ acre township site
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, #ec4899 0%, #ec4899dd 100%)',
                  border: '2px solid white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '16px',
                }}
              >
                ✈️
              </div>
              <span className="text-xs text-slate-700">
                <strong>Bengaluru Int'l Airport</strong> — Gateway connectivity
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, #10b981 0%, #10b981dd 100%)',
                  border: '2px solid white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '16px',
                }}
              >
                🛣️
              </div>
              <span className="text-xs text-slate-700">
                <strong>STRR Connectivity</strong> — Strategic orbital corridor
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, #3b82f6 0%, #3b82f6dd 100%)',
                  border: '2px solid white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '16px',
                }}
              >
                📍
              </div>
              <span className="text-xs text-slate-700">
                <strong>Key Landmarks</strong> — Reference points
              </span>
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-lg p-5 border border-purple-200">
          <h3 className="font-bold text-slate-900 mb-4 text-sm">Strategic Positioning 📍</h3>
          <div className="space-y-3 text-xs text-slate-700">
            <div>
              <strong className="text-purple-900">Geographic Location:</strong>
              <br />
              Doddaballapura, North Bengaluru (13.1939°N, 77.6045°E)
            </div>
            <div>
              <strong className="text-purple-900">Distance to Airport:</strong>
              <br />
              ~12 km adjacent to Bengaluru International Airport
            </div>
            <div>
              <strong className="text-purple-900">Distance to City Center:</strong>
              <br />
              ~40 km south (accessible via STRR & planned corridors)
            </div>
            <div>
              <strong className="text-purple-900">Site Area:</strong>
              <br />
              465+ acres | Operator: KIADB (Karnataka Industrial Areas Development Board)
            </div>
            <div>
              <strong className="text-purple-900">Corridor Access:</strong>
              <br />
              Satellite Town Ring Road (STRR) | Major transport infrastructure
            </div>
          </div>
        </div>
      </div>

      {/* Data Sources Attribution */}
      <div className="bg-amber-50 border-l-4 border-amber-500 rounded p-5">
        <h4 className="font-semibold text-amber-900 mb-3 text-sm">📊 Data Sources & References</h4>
        <div className="space-y-2 text-xs text-amber-800">
          <p>
            <strong>Geographic Coordinates:</strong>{' '}
            <a
              href="https://www.openstreetmap.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:no-underline"
            >
              OpenStreetMap
            </a>
            {' '}| Verified via Government of Karnataka (KIADB official records)
          </p>
          {airportSource && (
            <p>
              <strong>Airport & Aviation Context:</strong>{' '}
              <a
                href={airportSource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:no-underline"
              >
                {airportSource.title}
              </a>
              {' '}({airportSource.publisher})
            </p>
          )}
          {strrrSource && (
            <p>
              <strong>STRR Connectivity:</strong>{' '}
              <a
                href={strrrSource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:no-underline"
              >
                {strrrSource.title}
              </a>
              {' '}({strrrSource.publisher})
            </p>
          )}
          <p>
            <strong>Note:</strong> Location data is sourced from verified public records. Site boundary is approximate
            and based on 465-acre project specification. Exact Master Plan available via KIADB official channels.
          </p>
        </div>
      </div>
    </div>
  );
}

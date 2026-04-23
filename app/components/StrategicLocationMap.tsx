'use client';

import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { LegendPanel } from '@/components/strategic-map/LegendPanel';
import { SourceAttribution } from '@/components/strategic-map/SourceAttribution';
import { MAP_CENTER, MAP_LOCATIONS } from '@/components/strategic-map/config';
import { addKwinBoundary, addLocationMarkers, createFallbackMarkup } from '@/components/strategic-map/mapbox';

export default function StrategicLocationMap() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (map.current || !mapContainer.current) {
      return;
    }

    const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || '';
    if (!token) {
      mapContainer.current.innerHTML = createFallbackMarkup();
      return;
    }

    mapboxgl.accessToken = token;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: MAP_CENTER,
      zoom: 10,
      pitch: 0,
      bearing: 0,
    });

    const mapInstance = map.current;
    addLocationMarkers(mapInstance, MAP_LOCATIONS);
    mapInstance.on('load', () => addKwinBoundary(mapInstance));
  }, []);

  return (
    <div className="space-y-6">
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <LegendPanel />

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

      <SourceAttribution />
    </div>
  );
}

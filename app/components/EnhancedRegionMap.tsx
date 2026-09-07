'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import type { FeatureCollection, LineString, Point, Polygon } from 'geojson';
import { KWIN_GEOGRAPHIC_LOCATIONS } from '@/data/kwin/geography';

type LayerId = 'base' | 'zones' | 'infrastructure' | 'green' | 'poi';

type MapLayer = {
  id: LayerId;
  name: string;
  description: string;
};

type PoiType = 'kwin-site' | 'airport' | 'landmark' | 'connectivity';

type PoiListItem = {
  id: string;
  name: string;
  type: PoiType;
  coordinates: [number, number];
  description: string;
  distance?: string;
};

const MAP_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN?.trim() || '';
const MAP_STYLE = 'mapbox://styles/mapbox/light-v11';
const MAP_CENTER: [number, number] = [77.63, 13.17];

const layerControls: MapLayer[] = [
  { id: 'base', name: 'Regional Frame', description: 'North Bengaluru context, KWIN footprint, and corridor frame' },
  { id: 'zones', name: 'Proposed Zones', description: 'Knowledge, innovation, and wellbeing districts' },
  { id: 'infrastructure', name: 'Infrastructure', description: 'Airport linkage, STRR logic, and utility spine' },
  { id: 'green', name: 'Green Systems', description: 'Parks, lake buffers, and ecological resilience areas' },
  { id: 'poi', name: 'Points of Interest', description: 'Clickable airport, city, corridor, and site markers' },
];

const initialSelectedLayers: LayerId[] = ['base', 'zones', 'infrastructure', 'green', 'poi'];

const INITIAL_MAP_PADDING = { top: 56, right: 56, bottom: 56, left: 56 };

const pointOfInterestItems: PoiListItem[] = KWIN_GEOGRAPHIC_LOCATIONS.map((location) => ({
  id: location.id,
  name: location.name,
  type: location.type,
  coordinates: location.coordinates,
  description: location.description,
  distance: location.distance,
}));

const regionalFrameSource: FeatureCollection<Polygon> = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      properties: { name: 'North Bengaluru regional frame', category: 'region' },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [77.47, 12.96],
          [77.79, 12.96],
          [77.79, 13.28],
          [77.47, 13.28],
          [77.47, 12.96],
        ]],
      },
    },
    {
      type: 'Feature',
      properties: { name: 'KWIN site frame', category: 'kwin' },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [77.588, 13.177],
          [77.621, 13.177],
          [77.621, 13.211],
          [77.588, 13.211],
          [77.588, 13.177],
        ]],
      },
    },
  ],
};

const zonesSource: FeatureCollection<Polygon> = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      properties: { name: 'Knowledge District', zone: 'knowledge' },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [77.593, 13.185],
          [77.604, 13.185],
          [77.604, 13.199],
          [77.593, 13.199],
          [77.593, 13.185],
        ]],
      },
    },
    {
      type: 'Feature',
      properties: { name: 'Innovation Corridor', zone: 'innovation' },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [77.604, 13.182],
          [77.618, 13.182],
          [77.618, 13.199],
          [77.604, 13.199],
          [77.604, 13.182],
        ]],
      },
    },
    {
      type: 'Feature',
      properties: { name: 'Wellbeing Quarter', zone: 'wellbeing' },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [77.596, 13.199],
          [77.614, 13.199],
          [77.614, 13.209],
          [77.596, 13.209],
          [77.596, 13.199],
        ]],
      },
    },
  ],
};

const infrastructureSource: FeatureCollection<LineString> = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      properties: { name: 'Airport connector', kind: 'connector' },
      geometry: {
        type: 'LineString',
        coordinates: [
          [77.6045, 13.1939],
          [77.645, 13.1939],
          [77.7099, 13.1939],
        ],
      },
    },
    {
      type: 'Feature',
      properties: { name: 'STRR logic corridor', kind: 'strr' },
      geometry: {
        type: 'LineString',
        coordinates: [
          [77.525, 13.09],
          [77.6045, 13.0939],
          [77.705, 13.1],
        ],
      },
    },
    {
      type: 'Feature',
      properties: { name: 'Utility spine', kind: 'utility' },
      geometry: {
        type: 'LineString',
        coordinates: [
          [77.593, 13.183],
          [77.61, 13.198],
          [77.618, 13.208],
        ],
      },
    },
  ],
};

const greenSystemsSource: FeatureCollection<Polygon> = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      properties: { name: 'Central ecological commons' },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [77.598, 13.188],
          [77.607, 13.188],
          [77.607, 13.194],
          [77.598, 13.194],
          [77.598, 13.188],
        ]],
      },
    },
    {
      type: 'Feature',
      properties: { name: 'Lake resilience belt' },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [77.607, 13.199],
          [77.617, 13.199],
          [77.617, 13.206],
          [77.607, 13.206],
          [77.607, 13.199],
        ]],
      },
    },
    {
      type: 'Feature',
      properties: { name: 'Neighbourhood park system' },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [77.592, 13.201],
          [77.599, 13.201],
          [77.599, 13.207],
          [77.592, 13.207],
          [77.592, 13.201],
        ]],
      },
    },
  ],
};

const poiSource: FeatureCollection<Point> = {
  type: 'FeatureCollection',
  features: pointOfInterestItems.map((poi) => ({
    type: 'Feature',
    properties: {
      id: poi.id,
      name: poi.name,
      type: poi.type,
      description: poi.description,
      distance: poi.distance || '',
    },
    geometry: {
      type: 'Point',
      coordinates: poi.coordinates,
    },
  })),
};

const layerIdMap: Record<LayerId, string[]> = {
  base: ['regional-frame-fill', 'regional-frame-line', 'regional-frame-labels'],
  zones: ['zones-fill', 'zones-line', 'zones-labels'],
  infrastructure: ['infrastructure-line', 'infrastructure-labels'],
  green: ['green-systems-fill', 'green-systems-line', 'green-systems-labels'],
  poi: ['poi-circles', 'poi-labels'],
};

function extendBoundsWithCoordinates(bounds: mapboxgl.LngLatBounds, coordinates: [number, number][]) {
  for (const coordinate of coordinates) {
    bounds.extend(coordinate);
  }
}

function getInitialBounds() {
  const bounds = new mapboxgl.LngLatBounds();

  extendBoundsWithCoordinates(bounds, pointOfInterestItems.map((poi) => poi.coordinates));

  for (const feature of regionalFrameSource.features) {
    extendBoundsWithCoordinates(bounds, feature.geometry.coordinates[0] as [number, number][]);
  }

  for (const feature of zonesSource.features) {
    extendBoundsWithCoordinates(bounds, feature.geometry.coordinates[0] as [number, number][]);
  }

  for (const feature of greenSystemsSource.features) {
    extendBoundsWithCoordinates(bounds, feature.geometry.coordinates[0] as [number, number][]);
  }

  for (const feature of infrastructureSource.features) {
    extendBoundsWithCoordinates(bounds, feature.geometry.coordinates as [number, number][]);
  }

  return bounds;
}

function applyLayerVisibility(map: mapboxgl.Map, selectedLayers: LayerId[]) {
  for (const [groupId, mapLayerIds] of Object.entries(layerIdMap) as [LayerId, string[]][]) {
    const visibility = selectedLayers.includes(groupId) ? 'visible' : 'none';

    for (const mapLayerId of mapLayerIds) {
      if (map.getLayer(mapLayerId)) {
        map.setLayoutProperty(mapLayerId, 'visibility', visibility);
      }
    }
  }
}

function getPoiBadge(type: PoiType) {
  if (type === 'kwin-site') return 'KWIN';
  if (type === 'airport') return 'Airport';
  if (type === 'connectivity') return 'Corridor';
  return 'Landmark';
}

function buildPopupHtml(properties: Record<string, unknown>) {
  const name = typeof properties.name === 'string' ? properties.name : 'Point of interest';
  const description = typeof properties.description === 'string' ? properties.description : '';
  const distance = typeof properties.distance === 'string' ? properties.distance : '';

  return `
    <div style="font-family: system-ui, -apple-system, sans-serif; max-width: 260px;">
      <h4 style="margin: 0 0 0.45rem 0; color: #0f172a; font-size: 0.96rem; font-weight: 700;">${name}</h4>
      <p style="margin: 0 0 0.5rem 0; color: #475569; font-size: 0.84rem; line-height: 1.5;">${description}</p>
      ${distance ? `<p style="margin: 0; color: #334155; font-size: 0.78rem;"><strong>${distance}</strong></p>` : ''}
    </div>
  `;
}

export default function EnhancedRegionMap() {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const popupRef = useRef<mapboxgl.Popup | null>(null);
  const [selectedLayers, setSelectedLayers] = useState<LayerId[]>(initialSelectedLayers);
  const [activePoiId, setActivePoiId] = useState<string | null>(null);
  const [mapState, setMapState] = useState<'ready' | 'missing-token' | 'error'>('ready');

  useEffect(() => {
    if (mapRef.current || !mapContainerRef.current) {
      return;
    }

    if (!MAP_TOKEN) {
      setMapState('missing-token');
      return;
    }

    mapboxgl.accessToken = MAP_TOKEN;

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: MAP_STYLE,
      center: MAP_CENTER,
      zoom: 10.7,
      pitch: 14,
      bearing: -6,
      attributionControl: true,
    });

    mapRef.current = map;
    map.addControl(new mapboxgl.NavigationControl({ showCompass: true }), 'top-right');

    const initializeLayers = () => {
      try {
        if (!map.getSource('regional-frame')) {
          map.addSource('regional-frame', { type: 'geojson', data: regionalFrameSource });
        }
        if (!map.getSource('zones')) {
          map.addSource('zones', { type: 'geojson', data: zonesSource });
        }
        if (!map.getSource('infrastructure')) {
          map.addSource('infrastructure', { type: 'geojson', data: infrastructureSource });
        }
        if (!map.getSource('green-systems')) {
          map.addSource('green-systems', { type: 'geojson', data: greenSystemsSource });
        }
        if (!map.getSource('poi')) {
          map.addSource('poi', { type: 'geojson', data: poiSource });
        }

        map.addLayer({
          id: 'regional-frame-fill',
          type: 'fill',
          source: 'regional-frame',
          paint: {
            'fill-color': [
              'match',
              ['get', 'category'],
              'region', '#60a5fa',
              'kwin', '#8b5cf6',
              '#94a3b8',
            ],
            'fill-opacity': [
              'match',
              ['get', 'category'],
              'region', 0.12,
              'kwin', 0.24,
              0.1,
            ],
          },
        });

        map.addLayer({
          id: 'regional-frame-line',
          type: 'line',
          source: 'regional-frame',
          paint: {
            'line-color': [
              'match',
              ['get', 'category'],
              'region', '#3b82f6',
              'kwin', '#7c3aed',
              '#64748b',
            ],
            'line-width': [
              'match',
              ['get', 'category'],
              'region', 2,
              'kwin', 3,
              2,
            ],
            'line-opacity': 0.95,
          },
        });

        map.addLayer({
          id: 'regional-frame-labels',
          type: 'symbol',
          source: 'regional-frame',
          layout: {
            'text-field': ['get', 'name'],
            'text-size': 11,
            'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
            'text-allow-overlap': true,
            'text-ignore-placement': true,
          },
          paint: {
            'text-color': '#1e293b',
            'text-halo-color': '#ffffff',
            'text-halo-width': 1.5,
          },
        });

        map.addLayer({
          id: 'zones-fill',
          type: 'fill',
          source: 'zones',
          paint: {
            'fill-color': [
              'match',
              ['get', 'zone'],
              'knowledge', '#f59e0b',
              'innovation', '#3b82f6',
              'wellbeing', '#10b981',
              '#cbd5e1',
            ],
            'fill-opacity': 0.4,
          },
        });

        map.addLayer({
          id: 'zones-line',
          type: 'line',
          source: 'zones',
          paint: {
            'line-color': [
              'match',
              ['get', 'zone'],
              'knowledge', '#d97706',
              'innovation', '#2563eb',
              'wellbeing', '#059669',
              '#64748b',
            ],
            'line-width': 3.5,
          },
        });

        map.addLayer({
          id: 'zones-labels',
          type: 'symbol',
          source: 'zones',
          layout: {
            'text-field': ['get', 'name'],
            'text-size': 11,
            'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
            'text-allow-overlap': true,
            'text-ignore-placement': true,
          },
          paint: {
            'text-color': '#111827',
            'text-halo-color': '#ffffff',
            'text-halo-width': 1.5,
          },
        });

        map.addLayer({
          id: 'green-systems-fill',
          type: 'fill',
          source: 'green-systems',
          paint: {
            'fill-color': '#22c55e',
            'fill-opacity': 0.38,
          },
        });

        map.addLayer({
          id: 'green-systems-line',
          type: 'line',
          source: 'green-systems',
          paint: {
            'line-color': '#15803d',
            'line-width': 3,
          },
        });

        map.addLayer({
          id: 'green-systems-labels',
          type: 'symbol',
          source: 'green-systems',
          layout: {
            'text-field': ['get', 'name'],
            'text-size': 11,
            'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
            'text-allow-overlap': true,
            'text-ignore-placement': true,
          },
          paint: {
            'text-color': '#166534',
            'text-halo-color': '#ffffff',
            'text-halo-width': 1.5,
          },
        });

        map.addLayer({
          id: 'infrastructure-line',
          type: 'line',
          source: 'infrastructure',
          layout: {
            'line-cap': 'round',
            'line-join': 'round',
          },
          paint: {
            'line-color': [
              'match',
              ['get', 'kind'],
              'strr', '#0f766e',
              'connector', '#db2777',
              'utility', '#475569',
              '#64748b',
            ],
            'line-width': [
              'match',
              ['get', 'kind'],
              'strr', 6,
              'connector', 5,
              'utility', 4,
              4,
            ],
            'line-opacity': 0.95,
          },
        });

        map.addLayer({
          id: 'infrastructure-labels',
          type: 'symbol',
          source: 'infrastructure',
          layout: {
            'symbol-placement': 'line-center',
            'text-field': ['get', 'name'],
            'text-size': 11,
            'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
            'text-allow-overlap': true,
            'text-ignore-placement': true,
          },
          paint: {
            'text-color': '#0f172a',
            'text-halo-color': '#ffffff',
            'text-halo-width': 1.5,
          },
        });

        map.addLayer({
          id: 'poi-circles',
          type: 'circle',
          source: 'poi',
          paint: {
            'circle-radius': [
              'match',
              ['get', 'type'],
              'kwin-site', 11,
              'airport', 10,
              'connectivity', 9,
              8,
            ],
            'circle-color': [
              'match',
              ['get', 'type'],
              'kwin-site', '#7c3aed',
              'airport', '#db2777',
              'connectivity', '#0f766e',
              '#2563eb',
            ],
            'circle-stroke-color': '#ffffff',
            'circle-stroke-width': 2,
          },
        });

        map.addLayer({
          id: 'poi-labels',
          type: 'symbol',
          source: 'poi',
          layout: {
            'text-field': ['get', 'name'],
            'text-offset': [0, 1.2],
            'text-size': 11,
            'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
            'text-allow-overlap': true,
            'text-ignore-placement': true,
          },
          paint: {
            'text-color': '#0f172a',
            'text-halo-color': '#ffffff',
            'text-halo-width': 1.5,
          },
        });

        applyLayerVisibility(map, initialSelectedLayers);

        map.on('click', 'poi-circles', handlePoiClick);
        map.on('mouseenter', 'poi-circles', handlePoiMouseEnter);
        map.on('mouseleave', 'poi-circles', handlePoiMouseLeave);

        map.fitBounds(getInitialBounds(), {
          padding: INITIAL_MAP_PADDING,
          maxZoom: 11.2,
          duration: 0,
        });
        map.resize();
      } catch {
        setMapState('error');
      }
    };

    const handlePoiClick = (event: mapboxgl.MapMouseEvent & { features?: mapboxgl.MapboxGeoJSONFeature[] }) => {
      const feature = event.features?.[0];
      if (!feature || feature.geometry.type !== 'Point') {
        return;
      }

      const coordinates = [...feature.geometry.coordinates] as [number, number];
      const properties = (feature.properties ?? {}) as Record<string, unknown>;
      const id = typeof properties.id === 'string' ? properties.id : null;

      setActivePoiId(id);
      popupRef.current?.remove();
      popupRef.current = new mapboxgl.Popup({ offset: 18 })
        .setLngLat(coordinates)
        .setHTML(buildPopupHtml(properties))
        .addTo(map);
      map.flyTo({ center: coordinates, zoom: 11.1, essential: true });
    };

    const handlePoiMouseEnter = () => {
      map.getCanvas().style.cursor = 'pointer';
    };

    const handlePoiMouseLeave = () => {
      map.getCanvas().style.cursor = '';
    };

    map.once('load', initializeLayers);
    map.on('error', () => setMapState('error'));

    return () => {
      popupRef.current?.remove();
      popupRef.current = null;
      map.remove();
      mapRef.current = null;
    };
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    if (!map || !map.isStyleLoaded()) {
      return;
    }

    applyLayerVisibility(map, selectedLayers);
  }, [selectedLayers]);

  const toggleLayer = (layerId: LayerId) => {
    setSelectedLayers((current) =>
      current.includes(layerId) ? current.filter((id) => id !== layerId) : [...current, layerId],
    );
  };

  const focusPoi = (poi: PoiListItem) => {
    setActivePoiId(poi.id);

    const map = mapRef.current;
    if (!map) {
      return;
    }

    popupRef.current?.remove();
    popupRef.current = new mapboxgl.Popup({ offset: 18 })
      .setLngLat(poi.coordinates)
      .setHTML(
        buildPopupHtml({
          name: poi.name,
          description: poi.description,
          distance: poi.distance || '',
        }),
      )
      .addTo(map);

    map.flyTo({ center: poi.coordinates, zoom: 11.1, essential: true });
  };

  if (mapState === 'missing-token') {
    return (
      <section className="section bg-white">
        <div className="container">
          <div className="rounded-3xl border border-slate-200 bg-gradient-to-br from-slate-50 to-slate-100 p-8 shadow-sm">
            <h2 className="text-3xl font-extrabold text-slate-900 mb-4">Interactive Regional Map</h2>
            <p className="text-slate-700 max-w-3xl leading-7 mb-4">
              The live Mapbox experience is ready, but it needs <code>NEXT_PUBLIC_MAPBOX_TOKEN</code> to render the
              full regional frame, proposed zones, infrastructure overlays, green systems, and interactive points of
              interest.
            </p>
            <p className="text-slate-600">
              Add the token in your environment and redeploy to unlock the complete map layer experience.
            </p>
          </div>
        </div>
      </section>
    );
  }

  if (mapState === 'error') {
    return (
      <section className="section bg-white">
        <div className="container">
          <div className="rounded-3xl border border-rose-200 bg-rose-50 p-8 text-rose-950 shadow-sm">
            <h2 className="text-3xl font-extrabold mb-4">Interactive Regional Map</h2>
            <p className="leading-7">
              The map could not finish loading. Check the Mapbox token, browser console, and network access to
              Mapbox styles and tiles.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section bg-white">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">Interactive Regional Map</h2>
          <p className="max-w-4xl text-lg text-gray-700">
            Explore KWIN City through a true Mapbox-backed regional frame with live layer controls for proposed zones,
            infrastructure logic, ecological systems, and strategic points of interest across North Bengaluru.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <motion.aside
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-1"
          >
            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200 sticky top-20 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-4">Map Layers</h3>
              <div className="space-y-3">
                {layerControls.map((layer) => (
                  <label key={layer.id} className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedLayers.includes(layer.id)}
                      onChange={() => toggleLayer(layer.id)}
                      className="mt-1 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <div>
                      <p className="font-medium text-sm text-gray-900">{layer.name}</p>
                      <p className="text-xs text-gray-600 leading-5">{layer.description}</p>
                    </div>
                  </label>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="font-bold text-gray-900 mb-3 text-sm">Strategic Locations</h4>
                <div className="space-y-2">
                  {pointOfInterestItems.map((poi) => (
                    <button
                      key={poi.id}
                      type="button"
                      onClick={() => focusPoi(poi)}
                      className={`w-full rounded-xl border p-3 text-left transition-colors ${
                        activePoiId === poi.id
                          ? 'border-blue-300 bg-blue-50'
                          : 'border-transparent bg-white hover:border-gray-200 hover:bg-gray-100'
                      }`}
                    >
                      <p className="text-xs font-semibold text-gray-900">{poi.name}</p>
                      <p className="text-xs text-gray-600 mt-1">{getPoiBadge(poi.type)}</p>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.aside>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="w-[calc(100%-4px)] min-w-0 max-w-full lg:w-auto lg:col-span-3"
          >
            <div
              ref={mapContainerRef}
              className="relative box-border h-[640px] w-full max-w-full overflow-hidden rounded-3xl border-2 border-slate-200 shadow-[0_20px_50px_rgba(15,23,42,0.12)]"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

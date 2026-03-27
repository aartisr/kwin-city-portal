'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface MapLayer {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
}

interface PointOfInterest {
  id: string;
  name: string;
  type: 'landmark' | 'infrastructure' | 'residential' | 'commercial' | 'green-space';
  coords: { x: number; y: number };
  description: string;
}

export default function EnhancedRegionMap() {
  const [selectedLayers, setSelectedLayers] = useState<string[]>(['base', 'zones', 'infrastructure']);
  const [hoveredPOI, setHoveredPOI] = useState<string | null>(null);

  const layers: MapLayer[] = [
    { id: 'base', name: 'Base Map', description: 'Geographic boundaries', enabled: true },
    { id: 'zones', name: 'Zoning Districts', description: 'Proposed zones', enabled: true },
    { id: 'infrastructure', name: 'Infrastructure', description: 'Roads, utilities, transit', enabled: true },
    { id: 'green', name: 'Green Spaces', description: 'Parks and natural areas', enabled: false },
  ];

  const pointsOfInterest: PointOfInterest[] = [
    {
      id: 'hq',
      name: 'Knowledge Campus HQ',
      type: 'landmark',
      coords: { x: 50, y: 30 },
      description: 'Central hub for research and education',
    },
    {
      id: 'hospital',
      name: 'Wellness Center',
      type: 'infrastructure',
      coords: { x: 70, y: 50 },
      description: 'Primary healthcare facility',
    },
    {
      id: 'park',
      name: 'Central Park',
      type: 'green-space',
      coords: { x: 40, y: 65 },
      description: '120-acre central green space',
    },
    {
      id: 'housing',
      name: 'Residential District A',
      type: 'residential',
      coords: { x: 25, y: 45 },
      description: 'Mixed-income housing',
    },
    {
      id: 'manufacturing',
      name: 'Innovation Corridor',
      type: 'commercial',
      coords: { x: 75, y: 75 },
      description: 'Advanced manufacturing hub',
    },
  ];

  const toggleLayer = (layerId: string) => {
    setSelectedLayers((prev) =>
      prev.includes(layerId) ? prev.filter((l) => l !== layerId) : [...prev, layerId]
    );
  };

  const getPOIColor = (type: PointOfInterest['type']) => {
    const colors: Record<PointOfInterest['type'], string> = {
      landmark: 'bg-blue-500',
      infrastructure: 'bg-purple-500',
      residential: 'bg-green-500',
      commercial: 'bg-orange-500',
      'green-space': 'bg-emerald-500',
    };
    return colors[type];
  };

  const getPOILabel = (type: PointOfInterest['type']) => {
    const labels: Record<PointOfInterest['type'], string> = {
      landmark: '🏛️',
      infrastructure: '🏗️',
      residential: '🏘️',
      commercial: '🏭',
      'green-space': '🌳',
    };
    return labels[type];
  };

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
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
            Interactive Regional Map
          </h2>
          <p className="text-lg text-gray-600">
            Explore KWIN City&apos;s geography, infrastructure, and planned zones with interactive layers
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Map controls */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-1"
          >
            <div className="bg-gray-50 rounded-lg p-6 border border-gray-200 sticky top-20">
              <h3 className="font-bold text-gray-900 mb-4">Map Layers</h3>
              <div className="space-y-3">
                {layers.map((layer) => (
                  <label key={layer.id} className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedLayers.includes(layer.id)}
                      onChange={() => toggleLayer(layer.id)}
                      className="mt-1 w-4 h-4"
                    />
                    <div>
                      <p className="font-medium text-sm text-gray-900">{layer.name}</p>
                      <p className="text-xs text-gray-600">{layer.description}</p>
                    </div>
                  </label>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="font-bold text-gray-900 mb-3 text-sm">Points of Interest</h4>
                <div className="space-y-2">
                  {pointsOfInterest.map((poi) => (
                    <button
                      key={poi.id}
                      onClick={() => setHoveredPOI(hoveredPOI === poi.id ? null : poi.id)}
                      className="w-full text-left p-2 rounded hover:bg-gray-100 transition-colors"
                    >
                      <p className="text-xs font-medium text-gray-900">{poi.name}</p>
                      <p className="text-xs text-gray-600">{getPOILabel(poi.type)}</p>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Interactive map */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-3"
          >
            <div className="relative w-full aspect-square bg-gradient-to-br from-blue-100 via-blue-50 to-green-50 rounded-lg border-2 border-gray-300 overflow-hidden">
              {/* Base map layers */}
              {selectedLayers.includes('base') && (
                <div className="absolute inset-0 opacity-30">
                  <div className="grid grid-cols-4 grid-rows-4 w-full h-full">
                    {[...Array(16)].map((_, i) => (
                      <div key={i} className="border border-gray-300" />
                    ))}
                  </div>
                </div>
              )}

              {/* Zones layer */}
              {selectedLayers.includes('zones') && (
                <>
                  <div className="absolute top-1/4 left-1/4 w-1/3 h-1/3 bg-yellow-300 opacity-20 rounded-lg border-2 border-yellow-500 border-dashed" />
                  <div className="absolute top-1/2 right-1/4 w-1/4 h-1/3 bg-blue-300 opacity-20 rounded-lg border-2 border-blue-600 border-dashed" />
                  <div className="absolute bottom-1/4 left-1/3 w-1/3 h-1/4 bg-green-300 opacity-20 rounded-lg border-2 border-green-600 border-dashed" />
                </>
              )}

              {/* Infrastructure layer */}
              {selectedLayers.includes('infrastructure') && (
                <>
                  <div className="absolute top-0 left-1/3 w-1 h-full bg-gray-500 opacity-40" />
                  <div className="absolute top-1/3 left-0 h-1 w-full bg-gray-500 opacity-40" />
                </>
              )}

              {/* Points of Interest */}
              {pointsOfInterest.map((poi) => (
                <motion.div
                  key={poi.id}
                  className="absolute"
                  style={{ left: `${poi.coords.x}%`, top: `${poi.coords.y}%` }}
                  onMouseEnter={() => setHoveredPOI(poi.id)}
                  onMouseLeave={() => setHoveredPOI(null)}
                >
                  <motion.button
                    whileHover={{ scale: 1.3 }}
                    className={`${getPOIColor(poi.type)} w-8 h-8 rounded-full flex items-center justify-center text-white font-bold shadow-lg hover:shadow-xl transition-shadow -translate-x-1/2 -translate-y-1/2`}
                  >
                    {getPOILabel(poi.type)}
                  </motion.button>

                  {/* Tooltip */}
                  {hoveredPOI === poi.id && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="absolute left-0 top-12 bg-white rounded-lg shadow-xl p-3 min-w-max z-10 border border-gray-200"
                    >
                      <p className="font-bold text-gray-900 text-sm">{poi.name}</p>
                      <p className="text-xs text-gray-600">{poi.description}</p>
                    </motion.div>
                  )}
                </motion.div>
              ))}

              {/* Legend */}
              <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-lg p-3 border border-gray-200">
                <p className="text-xs font-bold text-gray-900 mb-2">Legend</p>
                <div className="space-y-1">
                  {Array.from(new Set(pointsOfInterest.map((p) => p.type))).map((type) => (
                    <div key={type} className="flex items-center gap-2 text-xs">
                      <div className={`w-3 h-3 rounded-full ${getPOIColor(type)}`} />
                      <span className="text-gray-700 capitalize">{type.replace('-', ' ')}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

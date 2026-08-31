'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { KWIN_PILLARS } from '@/data/constants';

export default function SectorComparison() {
  const [selectedSectors, setSelectedSectors] = useState<string[]>([]);

  const toggleSector = (sectorId: string) => {
    setSelectedSectors((prev) =>
      prev.includes(sectorId)
        ? prev.filter((s) => s !== sectorId)
        : prev.length < 3
          ? [...prev, sectorId]
          : prev
    );
  };

  const getSelectedSectorData = () => {
    return KWIN_PILLARS.filter((s) => selectedSectors.includes(s.id));
  };

  const comparisonMetrics = [
    { label: 'Primary Focus', key: 'title' },
    { label: 'Lead Department', key: 'subtitle' },
    { label: 'Key Drivers', key: 'description' },
  ];

  return (
    <section className="section bg-white">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
            Pillar Comparison
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Select up to 3 pillars to compare features, capabilities, and strategic focus areas
            side-by-side.
          </p>
        </motion.div>

        {/* Sector selector */}
        <div className="mb-12">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Select Pillars (up to 3)</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {KWIN_PILLARS.map((sector) => (
              <motion.button
                key={sector.id}
                onClick={() => toggleSector(sector.id)}
                whileHover={{ scale: 1.02 }}
                className={`p-4 rounded-lg border-2 transition-all text-left ${
                  selectedSectors.includes(sector.id)
                    ? 'border-blue-600 bg-blue-50 shadow-md'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
              >
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    checked={selectedSectors.includes(sector.id)}
                    onChange={() => {}}
                    className="mt-1 w-5 h-5 cursor-pointer"
                  />
                  <div>
                    <p className="font-bold text-gray-900">{sector.title}</p>
                    <p className="text-sm text-gray-600">{sector.subtitle}</p>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Comparison table */}
        {selectedSectors.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="overflow-x-auto rounded-lg border border-gray-200"
          >
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="px-6 py-4 text-left font-bold text-gray-900">Aspect</th>
                  {getSelectedSectorData().map((sector) => (
                    <th key={sector.id} className="px-6 py-4 text-left font-bold text-gray-900">
                      {sector.title}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparisonMetrics.map((metric, idx) => (
                  <tr
                    key={metric.key}
                    className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                  >
                    <td className="px-6 py-4 font-semibold text-gray-900 w-32">{metric.label}</td>
                    {getSelectedSectorData().map((sector) => (
                      <td key={sector.id} className="px-6 py-4 text-gray-700">
                        <div className="max-w-xs">
                          {metric.key === 'description' ? (
                            <p className="text-sm line-clamp-3">{sector[metric.key as keyof typeof sector]}</p>
                          ) : (
                            <p>{sector[metric.key as keyof typeof sector]}</p>
                          )}
                        </div>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        )}

        {selectedSectors.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200"
          >
            <p className="text-gray-600 text-lg">Select sectors above to begin comparison</p>
          </motion.div>
        )}
      </div>
    </section>
  );
}

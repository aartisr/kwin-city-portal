'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { KWIN_PILLARS } from '@/data/constants';

interface SectorFilterProps {
  onFilterChange?: (selectedPillars: string[]) => void;
  maxSelections?: number;
}

export default function SectorFilter({
  onFilterChange,
  maxSelections = 3,
}: SectorFilterProps) {
  const [selectedPillars, setSelectedPillars] = useState<string[]>([]);
  const [isExpanded, setIsExpanded] = useState(false);

  const togglePillar = (pillarId: string) => {
    let newSelection: string[];

    if (selectedPillars.includes(pillarId)) {
      newSelection = selectedPillars.filter((id) => id !== pillarId);
    } else if (selectedPillars.length < maxSelections) {
      newSelection = [...selectedPillars, pillarId];
    } else {
      return; // Max selections reached
    }

    setSelectedPillars(newSelection);
    onFilterChange?.(newSelection);
  };

  const clearAll = () => {
    setSelectedPillars([]);
    onFilterChange?.([]);
  };

  const getSelectedPillars = () => {
    return KWIN_PILLARS.filter((p) => selectedPillars.includes(p.id));
  };

  return (
    <div className="w-full bg-white rounded-lg border border-gray-200 shadow-sm">
      {/* Header */}
      <div className="p-4 md:p-6 border-b border-gray-200">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-1">Filter by Pillar</h3>
            <p className="text-sm text-gray-600">
              Select up to {maxSelections} pillars to refine your view
            </p>
          </div>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200"
          >
            {isExpanded ? 'Hide' : 'Show'} All
          </button>
        </div>
      </div>

      {/* Selected tags */}
      <AnimatePresence>
        {selectedPillars.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="px-4 md:px-6 py-4 bg-blue-50 border-b border-gray-200"
          >
            <div className="flex flex-wrap gap-2 items-center">
              <span className="text-sm font-medium text-gray-700">Active filters:</span>
              {getSelectedPillars().map((pillar) => (
                <motion.button
                  key={pillar.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  onClick={() => togglePillar(pillar.id)}
                  className="inline-flex items-center gap-2 px-3 py-1 bg-white rounded-full border"
                  style={{ borderColor: pillar.color || '#3B82F6' }}
                >
                  <span className="text-sm font-medium" style={{ color: pillar.color || '#3B82F6' }}>
                    {pillar.title}
                  </span>
                  <span className="text-lg leading-none">×</span>
                </motion.button>
              ))}
              <button
                onClick={clearAll}
                className="text-sm text-gray-600 hover:text-gray-900 ml-2 underline"
              >
                Clear all
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Pillars grid */}
      <AnimatePresence mode="wait">
        {isExpanded ? (
          <motion.div
            key="expanded"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="p-4 md:p-6"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {KWIN_PILLARS.map((pillar) => {
                const isSelected = selectedPillars.includes(pillar.id);
                return (
                  <motion.button
                    key={pillar.id}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    onClick={() => togglePillar(pillar.id)}
                    disabled={
                      !isSelected && selectedPillars.length >= maxSelections
                    }
                    className={`relative p-4 rounded-lg border-2 transition-all duration-200 text-left ${
                      isSelected
                        ? 'border-2 bg-opacity-10'
                        : 'border-gray-200 hover:border-gray-300'
                    } ${
                      !isSelected && selectedPillars.length >= maxSelections
                        ? 'opacity-50 cursor-not-allowed'
                        : ''
                    }`}
                    style={
                      isSelected
                        ? {
                            borderColor: pillar.color || '#3B82F6',
                            backgroundColor: `${pillar.color || '#3B82F6'}10`,
                          }
                        : {}
                    }
                  >
                    <div className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => {}}
                        className="mt-1 rounded"
                        style={{
                          accentColor: pillar.color || '#3B82F6',
                        }}
                      />
                      <div>
                        <h4 className="font-bold text-gray-900">{pillar.title}</h4>
                        <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                          {pillar.subtitle}
                        </p>
                      </div>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

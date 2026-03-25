'use client';

import { motion } from 'framer-motion';
import { KWIN_TIMELINE_PHASES, TIMELINE_SOURCE_IDS } from '@/data/constants';
import { useState } from 'react';
import SourceReferences from '@/components/SourceReferences';
import InlineSourceBadges from '@/components/InlineSourceBadges';

export default function Timeline() {
  const [selectedPhase, setSelectedPhase] = useState(KWIN_TIMELINE_PHASES[0]);

  return (
    <section id="timeline" className="section bg-white">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">The KWIN City Roadmap</h2>
          <p className="text-lg text-gray-600">
            Five phases from inauguration to city-scale operations. The sequence below comes from the project
            brief and represents a working roadmap — the kind of ambitious, phased plan that serious urban
            developments publish early and refine as they progress.{' '}
            <InlineSourceBadges sourceIds={TIMELINE_SOURCE_IDS} />
          </p>
        </motion.div>

        {/* Horizontal Timeline Scroll */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="overflow-x-auto pb-4 mb-12 -mx-4 px-4"
        >
          <div className="flex gap-3 min-w-max">
            {KWIN_TIMELINE_PHASES.map((phase) => (
              <button
                key={phase.id}
                onClick={() => setSelectedPhase(phase)}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 whitespace-nowrap ${
                  selectedPhase.id === phase.id
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <div className="text-sm opacity-75">{phase.year}</div>
                <div className="text-xs mt-1">{phase.title.split('&')[0]}</div>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Selected Phase Details */}
        <motion.div
          key={selectedPhase.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-lg p-8"
        >
          <div className="max-w-3xl">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h3 className="text-3xl font-bold text-gray-900 mb-2">{selectedPhase.title}</h3>
                <p className="text-gray-600">
                  {selectedPhase.description} <InlineSourceBadges sourceIds={TIMELINE_SOURCE_IDS} />
                </p>
              </div>
              <div className="text-right">
                <div className="text-4xl font-bold text-blue-600">{selectedPhase.year}</div>
                <div className="text-sm text-gray-500 mt-2">
                  {selectedPhase.status === 'completed' && '✓ Completed'}
                  {selectedPhase.status === 'in-progress' && '🔄 In Progress'}
                  {selectedPhase.status === 'planned' && '📋 Planned'}
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            {selectedPhase.progress !== undefined && (
              <div className="mb-6">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600">Progress</span>
                  <span className="font-medium text-gray-900">{selectedPhase.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <motion.div
                    className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${selectedPhase.progress}%` }}
                    transition={{ duration: 1.5, ease: 'easeOut' }}
                  />
                </div>
              </div>
            )}

            {/* Milestones */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Key Milestones</h4>
              <ul className="space-y-2">
                {selectedPhase.milestones.map((milestone: string, idx: number) => (
                  <li key={idx}>
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="flex items-start gap-3"
                    >
                      <span className="text-blue-600 font-bold mt-0.5">→</span>
                      <span className="text-gray-700">{milestone}</span>
                    </motion.div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Verification Note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-8 p-4 bg-amber-50 border border-amber-200 rounded-lg"
        >
          <p className="text-sm text-amber-900">
            <strong>⚠️ Research Note:</strong> Timeline and milestones are based on requirements documentation and
            pending verification from official KIADB sources, government clearances, and environmental impact assessments.
          </p>
        </motion.div>

        <div className="mt-6">
          <SourceReferences sourceIds={TIMELINE_SOURCE_IDS} compact />
        </div>
      </div>
    </section>
  );
}

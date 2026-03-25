'use client';

import { motion } from 'framer-motion';
import { KWIN_SUSTAINABILITY_METRICS, SUSTAINABILITY_SOURCE_IDS } from '@/data/constants';
import SourceReferences from '@/components/SourceReferences';
import InlineSourceBadges from '@/components/InlineSourceBadges';

export default function Sustainability() {
  return (
    <section id="sustainability" className="section bg-gradient-to-br from-green-50 via-white to-blue-50">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto mb-12 text-center"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">Sustainability Built In From Day One</h2>
          <p className="text-lg text-gray-600">
            KWIN proposes solar self-sufficiency, interconnected lakes, 40%+ green cover, and near-total water
            recycling. These targets become meaningful when measured against the rainfall, groundwater, and ecological
            data already published for the region.{' '}
            <InlineSourceBadges sourceIds={SUSTAINABILITY_SOURCE_IDS} />
          </p>
        </motion.div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {KWIN_SUSTAINABILITY_METRICS.map((metric, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="glass p-6 rounded-lg border border-green-200"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-gray-900">{metric.name}</h3>
                <span className="text-2xl">🎯</span>
              </div>

              <div className="mb-4">
                <div className="text-3xl font-bold text-green-600 mb-1">{metric.target}</div>
                <div className="text-xs text-gray-500">Unit: {metric.unit}</div>
                <div className="mt-2">
                  <InlineSourceBadges sourceIds={['brief', 'kiadb']} />
                </div>
              </div>

              {metric.deadline && (
                <div className="pt-4 border-t border-gray-200">
                  <div className="text-sm text-gray-700">
                    <span className="text-gray-600">Deadline: </span>
                    <span className="font-semibold">{metric.deadline}</span>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Infrastructure Highlights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-white border border-gray-200 rounded-lg p-8 mb-8"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Key Infrastructure Initiatives</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: '465-Acre Solar Farm',
                description:
                  'Dedicated renewable energy generation facility providing 100% operational power [pending verification]',
                icon: '☀️',
              },
              {
                title: '10 Interconnected Lakes',
                description:
                  'Water conservation system for irrigation, urban cooling, and biodiversity support [pending verification]',
                icon: '💧',
              },
              {
                title: 'Green Cover (40%+)',
                description: 'Native tree planting and forest restoration targeting 40% of project area as green space',
                icon: '🌳',
              },
              {
                title: 'Water Recycling (80%)',
                description: 'Advanced wastewater treatment and reuse system with 80% recirculation target by 2029',
                icon: '♻️',
              },
              {
                title: 'Smart Waste Management',
                description: 'Zero-landfill operations through composting, recycling, and material recovery',
                icon: '🚀',
              },
              {
                title: 'Urban Heat Island Mitigation',
                description: 'Cool pavements, green roofs, and tree canopy targeting 2-3°C reduction vs. baseline',
                icon: '❄️',
              },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="flex gap-4"
              >
                <div className="text-3xl flex-shrink-0">{item.icon}</div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">{item.title}</h4>
                  <p className="text-sm text-gray-600">
                    {item.description} <InlineSourceBadges sourceIds={SUSTAINABILITY_SOURCE_IDS} />
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Verification Note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="p-4 bg-green-50 border border-green-200 rounded-lg"
        >
          <p className="text-sm text-green-900">
            <strong>🌍 Environmental Commitment:</strong> Sustainability metrics and infrastructure details are based on
            aspirational targets from the KWIN City development brief. Technical specifications and certification pathways
            await verification from KIADB environmental and sustainability reports.
          </p>
        </motion.div>

        <div className="mt-6">
          <SourceReferences sourceIds={SUSTAINABILITY_SOURCE_IDS} compact />
        </div>
      </div>
    </section>
  );
}

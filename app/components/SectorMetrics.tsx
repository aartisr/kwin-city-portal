'use client';

import { motion } from 'framer-motion';
import { KWIN_PILLARS } from '@/data/constants';

export default function SectorMetrics() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.4, ease: 'easeOut' },
    },
  };

  // Sample metrics for each pillar (in a real app, these would come from data)
  const metricsMap: Record<string, { label: string; value: string }[]> = {
    innovation: [
      { label: 'Active Projects', value: '24+' },
      { label: 'Tech Startups', value: '156' },
      { label: 'Growth Rate', value: '32%' },
    ],
    sustainability: [
      { label: 'Green Spaces', value: '285 Ha' },
      { label: 'Renewable Energy', value: '45%' },
      { label: 'Waste Reduction', value: '38%' },
    ],
    infrastructure: [
      { label: 'Roads Built', value: '892 km' },
      { label: 'Connectivity', value: '99.2%' },
      { label: 'Projects Completed', value: '147' },
    ],
    community: [
      { label: 'Population Served', value: '2.3M' },
      { label: 'Programs', value: '89' },
      { label: 'Engagement Rate', value: '76%' },
    ],
  };

  return (
    <section className="py-16 px-4 md:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
            Pillar Performance Metrics
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Key performance indicators across our strategic pillars demonstrating impact and
            growth.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {KWIN_PILLARS.map((pillar) => {
            const metrics = metricsMap[pillar.id] || metricsMap.innovation;
            return (
              <motion.div
                key={pillar.id}
                variants={itemVariants}
                className="relative bg-gradient-to-br from-gray-50 to-white rounded-lg border border-gray-200 p-8 hover:border-gray-300 transition-colors duration-300"
              >
                {/* Decorative accent */}
                <div
                  className="absolute top-0 right-0 w-24 h-24 rounded-bl-full opacity-10"
                  style={{ backgroundColor: pillar.color || '#3B82F6' }}
                />

                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h3
                        className="text-2xl font-bold mb-2"
                        style={{ color: pillar.color || '#3B82F6' }}
                      >
                        {pillar.title}
                      </h3>
                      <p className="text-sm text-gray-600">{pillar.subtitle}</p>
                    </div>
                  </div>

                  {/* Metrics grid */}
                  <div className="grid grid-cols-3 gap-4">
                    {metrics.map((metric, idx) => (
                      <div key={idx} className="text-center">
                        <div className="text-2xl font-bold text-gray-900 mb-1">
                          {metric.value}
                        </div>
                        <div className="text-xs text-gray-500">{metric.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

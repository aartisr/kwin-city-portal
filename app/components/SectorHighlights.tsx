'use client';

import { motion } from 'framer-motion';
import { KWIN_PILLARS } from '@/data/constants';

export default function SectorHighlights() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  return (
    <section className="py-16 px-4 md:px-8 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
            Key Pillar Highlights
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore the strategic focuses and opportunities across our core pillars that drive
            innovation and growth.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {KWIN_PILLARS.map((pillar) => (
            <motion.div
              key={pillar.id}
              variants={itemVariants}
              className="group relative bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              {/* Color accent bar */}
              <div
                className="absolute top-0 left-0 right-0 h-1 group-hover:h-2 transition-all duration-300"
                style={{ backgroundColor: pillar.color || '#3B82F6' }}
              />

              <div className="p-6">
                <div
                  className="inline-flex items-center justify-center w-12 h-12 rounded-lg mb-4"
                  style={{ backgroundColor: `${pillar.color || '#3B82F6'}15` }}
                >
                  <span
                    className="text-2xl font-bold"
                    style={{ color: pillar.color || '#3B82F6' }}
                  >
                    {pillar.title.charAt(0)}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-3">{pillar.title}</h3>

                <p className="text-gray-600 text-sm mb-4 line-clamp-3">{pillar.subtitle}</p>

                {/* Metadata */}
                <div className="space-y-2 text-xs text-gray-500 border-t pt-4 mt-4">
                  <div className="flex items-start gap-2">
                    <span className="font-semibold whitespace-nowrap">Impact Area:</span>
                    <span>{pillar.id}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

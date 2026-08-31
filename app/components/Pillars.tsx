'use client';

import { motion } from 'framer-motion';
import { KWIN_PILLARS, PILLARS_SOURCE_IDS } from '@/data/constants';
import SourceReferences from '@/components/SourceReferences';
import InlineSourceBadges from '@/components/InlineSourceBadges';

const COLOR_CLASS_MAP: Record<string, { borderTop: string; dot: string; link: string }> = {
  '#3B82F6': { borderTop: 'border-t-blue-500', dot: 'bg-blue-500', link: 'text-blue-600' },
  '#10B981': { borderTop: 'border-t-emerald-500', dot: 'bg-emerald-500', link: 'text-emerald-600' },
  '#8B5CF6': { borderTop: 'border-t-violet-500', dot: 'bg-violet-500', link: 'text-violet-600' },
};

export default function Pillars() {
  return (
    <section id="pillars" className="section bg-gradient-to-br from-white via-blue-50 to-green-50">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">The Three Pillars of KWIN City</h2>
          <p className="text-lg text-gray-600">
            Knowledge, Wellbeing, and Innovation are not just aspirational labels — they define the functional
            structure of everything KWIN proposes to build. Framing drawn from the project brief; regional
            applicability supported by Karnataka&apos;s macroeconomic trajectory.{' '}
            <InlineSourceBadges sourceIds={PILLARS_SOURCE_IDS} />
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {KWIN_PILLARS.map((pillar, idx) => (
            (() => {
              const colorClass = COLOR_CLASS_MAP[pillar.color] || COLOR_CLASS_MAP['#3B82F6'];
              return (
            <motion.div
              key={pillar.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              viewport={{ once: true }}
              className="group"
            >
              <div
                className={`glass p-8 rounded-xl h-full hover:shadow-xl transition-all duration-300 cursor-pointer border-t-4 ${colorClass.borderTop}`}
              >
                {/* Icon */}
                <div className="text-5xl mb-6">{pillar.icon}</div>

                {/* Title & Subtitle */}
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{pillar.title}</h3>
                <p className="text-sm font-medium text-gray-500 mb-4">{pillar.subtitle}</p>

                {/* Description */}
                <p className="text-gray-700 mb-6 leading-relaxed">
                  {pillar.description} <InlineSourceBadges sourceIds={PILLARS_SOURCE_IDS} />
                </p>

                {/* Features */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-900 mb-3">Key Features</h4>
                  <ul className="space-y-2">
                    {pillar.features.slice(0, 4).map((feature: string, i: number) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                        <span className={`inline-block w-1.5 h-1.5 rounded-full mt-1.5 ${colorClass.dot}`} />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Learn More */}
                <motion.button
                  whileHover={{ x: 5 }}
                  className={`text-sm font-medium flex items-center gap-2 ${colorClass.link}`}
                >
                  Learn more
                  <span>→</span>
                </motion.button>
              </div>
            </motion.div>
              );
            })()
          ))}
        </div>

        <div className="mt-8">
          <SourceReferences sourceIds={PILLARS_SOURCE_IDS} compact />
        </div>
      </div>
    </section>
  );
}

'use client';

import { motion } from 'framer-motion';
import { KWIN_SECTORS, SECTORS_SOURCE_IDS } from '@/data/constants';
import SourceReferences from '@/components/SourceReferences';
import InlineSourceBadges from '@/components/InlineSourceBadges';

const sectorIcons = {
  semiconductor: '🖥️',
  aerospace: '✈️',
  healthcare: '⚕️',
  ict: '💻',
  renewable: '⚡',
};

export default function Sectors() {
  return (
    <section id="sectors" className="section bg-white">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">Industry Clusters That Will Define KWIN</h2>
          <p className="text-lg text-gray-600">
            Semiconductor fabs, aerospace MRO, health-tech campuses, ICT parks, and renewable energy — the
            sector mix reflects where global capital is flowing and where Karnataka has real competitive advantages.
            Employment and investment figures are planning targets from the brief.{' '}
            <InlineSourceBadges sourceIds={SECTORS_SOURCE_IDS} />
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {KWIN_SECTORS.map((sector, idx) => (
            <motion.div
              key={sector.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="text-4xl">{sectorIcons[sector.id as keyof typeof sectorIcons]}</div>
                <div className="text-right">
                  <div className="text-sm font-semibold text-blue-600">{sector.expectedJobs.toLocaleString()}</div>
                  <div className="text-xs text-gray-500">Jobs [*]</div>
                </div>
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-2">{sector.name}</h3>
              <p className="text-sm text-gray-600 mb-4">
                {sector.description} <InlineSourceBadges sourceIds={SECTORS_SOURCE_IDS} />
              </p>

              {/* Industry Focus */}
              <div className="mb-4">
                <h4 className="text-xs font-semibold text-gray-700 uppercase mb-2">Focus Areas</h4>
                <div className="flex flex-wrap gap-2">
                  {sector.industryFocus.map((focus: string, i: number) => (
                    <span key={i} className="inline-block px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                      {focus}
                    </span>
                  ))}
                </div>
              </div>

              {/* Investment */}
              <div className="pt-4 border-t border-gray-200">
                <div className="text-sm">
                  <span className="text-gray-600">Investment Target: </span>
                  <span className="font-semibold text-gray-900">{sector.expectedInvestment}</span>
                </div>
                <div className="mt-2">
                  <InlineSourceBadges sourceIds={['brief', 'kiadb']} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Verification Note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg"
        >
          <p className="text-sm text-blue-900">
            <strong>📊 Data Transparency:</strong> Employment and investment projections marked with [*] are aspirational
            targets pending verification from KIADB project prospectus, tender documents, and sector impact assessments.
          </p>
        </motion.div>

        <div className="mt-6">
          <SourceReferences sourceIds={SECTORS_SOURCE_IDS} compact />
        </div>
      </div>
    </section>
  );
}

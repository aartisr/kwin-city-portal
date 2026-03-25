'use client';

import { motion } from 'framer-motion';
import { KWIN_EVIDENCE_PRINCIPLES, KWIN_EVIDENCE_SOURCES } from '@/data/constants';

const statusStyles = {
  contextual: 'bg-blue-50 text-blue-700 border-blue-200',
  'project-adjacent': 'bg-amber-50 text-amber-700 border-amber-200',
};

export default function EvidenceVault() {
  return (
    <section id="research" className="section bg-gray-50">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto mb-12"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Evidence Vault</h2>
          <p className="text-lg text-gray-600">
            OpenCity is useful for defending the regional logic behind KWIN City. It helps us talk responsibly about
            corridor growth, connectivity, water planning, and Karnataka&apos;s economic capacity without overstating what
            those datasets prove about KWIN itself.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1.9fr] gap-8 items-start mb-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-white border border-gray-200 rounded-2xl p-6"
          >
            <h3 className="text-xl font-semibold text-gray-900 mb-4">How To Use These Sources</h3>
            <ul className="space-y-3">
              {KWIN_EVIDENCE_PRINCIPLES.map((principle: string, index: number) => (
                <li key={index} className="flex gap-3 text-sm text-gray-700">
                  <span className="mt-1 inline-block h-2 w-2 rounded-full bg-gray-900" />
                  <span>{principle}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-white border border-gray-200 rounded-2xl p-6"
          >
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Safe Narrative Frame</h3>
            <p className="text-gray-700 leading-8">
              KWIN City should be presented as a proposed node within larger patterns that are already visible in
              Karnataka and the Bengaluru region: airport-led growth, corridor-based mobility planning, measurable water
              constraints, and state-level industrial ambition. That is a strong case. It is also a much more credible
              case than treating contextual datasets as if they validate every KWIN project claim.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {KWIN_EVIDENCE_SOURCES.map((source, index) => (
            <motion.article
              key={source.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.06 }}
              viewport={{ once: true }}
              className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm"
            >
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">{source.title}</h3>
                  <p className="text-sm text-gray-500">{source.publisher}</p>
                </div>
                <span className={`shrink-0 rounded-full border px-3 py-1 text-xs font-semibold ${statusStyles[source.status]}`}>
                  {source.status === 'contextual' ? 'Contextual evidence' : 'Project-adjacent evidence'}
                </span>
              </div>

              <p className="text-sm text-gray-600 mb-3">{source.scope}</p>
              <p className="text-gray-700 leading-7 mb-5">{source.summary}</p>

              <div className="grid grid-cols-1 gap-5">
                <div>
                  <h4 className="text-sm font-semibold text-gray-900 mb-2">Useful for saying</h4>
                  <ul className="space-y-2">
                    {source.supports.map((statement: string, statementIndex: number) => (
                      <li key={statementIndex} className="flex gap-2 text-sm text-gray-700">
                        <span className="mt-1 text-green-600">+</span>
                        <span>{statement}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-gray-900 mb-2">Not enough to prove</h4>
                  <ul className="space-y-2">
                    {source.cannotProve.map((statement: string, statementIndex: number) => (
                      <li key={statementIndex} className="flex gap-2 text-sm text-gray-700">
                        <span className="mt-1 text-rose-600">-</span>
                        <span>{statement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-5 pt-5 border-t border-gray-200 flex items-center justify-between gap-4">
                <span className="text-xs uppercase tracking-[0.2em] text-gray-400">OpenCity dataset</span>
                <a
                  href={source.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm font-semibold text-blue-600 hover:text-blue-700"
                >
                  View source
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
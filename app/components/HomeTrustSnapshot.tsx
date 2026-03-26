'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const columns = [
  {
    status: 'Confirmed Context',
    icon: '✓',
    items: [
      'KIADB is the institutional anchor for project confirmation.',
      'The broader North Bengaluru region shows real infrastructure momentum.',
      'Regional open data from Karnataka and GoI substantiates the setting.',
    ],
    bg: 'bg-emerald-50',
    border: 'border-emerald-200',
    iconBg: 'bg-emerald-100',
    iconColor: 'text-emerald-700',
    headingColor: 'text-emerald-800',
  },
  {
    status: 'Project Proposal',
    icon: '◇',
    items: [
      'Acreage, investment, jobs, and phase timelines are from the project brief.',
      'University and hospital partnerships are aspirational pending public disclosure.',
      'Sector clusters and innovation districts await formal KIADB confirmation.',
    ],
    bg: 'bg-amber-50',
    border: 'border-amber-200',
    iconBg: 'bg-amber-100',
    iconColor: 'text-amber-700',
    headingColor: 'text-amber-800',
  },
  {
    status: 'Regional Evidence',
    icon: '◉',
    items: [
      "Airport traffic data confirms North Bengaluru's connectivity advantage.",
      'STRR and IRR documents validate the corridor-led growth narrative.',
      'Growth-trajectory, groundwater, and lake-governance datasets make key claims testable.',
    ],
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-700',
    headingColor: 'text-blue-800',
  },
];

export default function HomeTrustSnapshot() {
  return (
    <section className="section bg-[linear-gradient(160deg,#F8FAFC_0%,#FFFFFF_100%)]">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-3xl mb-12"
        >
          <div className="eyebrow text-[#E8A020] mb-3">Our Commitment to You</div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-5 leading-tight">
            We don&apos;t just present the vision.{' '}
            <span className="bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
              We show you the evidence.
            </span>
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed max-w-2xl">
            Every claim on this portal is labeled. Confirmed facts, project proposals, and regional context are always
            clearly distinguished — because the right way to build confidence is with transparency.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
          {columns.map((col, idx) => (
            <motion.article
              key={col.status}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className={`rounded-2xl border ${col.border} ${col.bg} p-7`}
            >
              <div className={`inline-flex items-center justify-center w-10 h-10 rounded-xl mb-5 text-lg font-bold ${col.iconBg} ${col.iconColor}`}>
                {col.icon}
              </div>
              <h3 className={`text-xl font-bold mb-4 ${col.headingColor}`}>{col.status}</h3>
              <ul className="space-y-3">
                {col.items.map((item) => (
                  <li key={item} className="flex gap-3 text-sm text-gray-700 leading-6">
                    <span className="mt-1 shrink-0 w-1.5 h-1.5 rounded-full bg-gray-400" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl border border-gray-200 bg-white px-7 py-5 shadow-sm"
        >
          <p className="text-sm text-gray-600">
            <strong className="text-gray-900">Want to see every source?</strong>{' '}
            The full claim ledger lists every statement side-by-side with its source, publisher, and verification status.
          </p>
          <Link href="/sources" className="shrink-0 btn btn-primary">
            Open Claim Ledger
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

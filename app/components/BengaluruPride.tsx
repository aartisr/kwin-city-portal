'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import InlineSourceBadges from '@/components/InlineSourceBadges';

const pillars = [
  {
    icon: '🌐',
    title: "India's Silicon Valley",
    body: "Bengaluru is the undisputed technology capital of India — home to the highest density of global tech companies, R&D centres, and startup unicorns on the subcontinent. KWIN City is proposed in this orbit.",
    sourceIds: ['economicSurvey'],
    iconBgClass: 'bg-[#F5A623]/20 border border-[#F5A623]/30',
  },
  {
    icon: '✈️',
    title: 'World-Class Connectivity',
    body: "Kempegowda International Airport is one of India's busiest and fastest-growing gateways. North Bengaluru's airport corridor is already one of the most sought-after investment zones in South Asia.",
    sourceIds: ['aviation'],
    iconBgClass: 'bg-[#06B6D4]/20 border border-[#06B6D4]/30',
  },
  {
    icon: '🛣️',
    title: 'Infrastructure in Motion',
    body: "The Satellite Town Ring Road (STRR) and Inner Ring Road (IRR) projects represent Karnataka's serious commitment to orbital and radial connectivity that frames KWIN's region as a planned node.",
    sourceIds: ['strr', 'irr'],
    iconBgClass: 'bg-[#10B981]/20 border border-[#10B981]/30',
  },
  {
    icon: '📈',
    title: 'Economic Ambition at Scale',
    body: "Karnataka's economic survey documents a state actively investing in industrial expansion, knowledge infrastructure, and global capital attraction. The macroeconomic backdrop is as strong as it has ever been.",
    sourceIds: ['economicSurvey'],
    iconBgClass: 'bg-[#8B5CF6]/20 border border-[#8B5CF6]/30',
  },
];

export default function BengaluruPride() {
  return (
    <section
      className="section relative overflow-hidden bg-[linear-gradient(160deg,#0D1333_0%,#040714_60%,#0A1020_100%)]"
    >
      {/* Decorative orb */}
      <div
        className="absolute top-0 right-0 w-[700px] h-[700px] pointer-events-none bg-[radial-gradient(circle_at_80%_20%,rgba(245,166,35,0.07),transparent_60%)]"
      />

        <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="max-w-3xl mb-14"
        >
          <div className="eyebrow text-[#F5A623] mb-4">The Region Behind the Vision</div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-5 leading-tight">
            Built Where{' '}
            <span className="gradient-text-gold">
              India&apos;s Future
            </span>{' '}
            Lives.
          </h2>
          <p className="text-lg text-[#94A3B8] leading-relaxed max-w-2xl">
            Bengaluru already defines India&apos;s technology story. Its northern corridor is rapidly emerging as the
            new frontier of industrial ambition, mobility infrastructure, and global capital. The conditions for KWIN
            City are not aspirational — many are already well underway.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-12">
          {pillars.map((pillar, idx) => (
            <motion.article
              key={pillar.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="rounded-2xl border border-white/8 p-7 transition-all duration-300 hover:border-white/16 bg-[rgba(255,255,255,0.04)]"
            >
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-5 ${pillar.iconBgClass}`}
              >
                {pillar.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{pillar.title}</h3>
              <p className="text-[#94A3B8] leading-7 mb-4">{pillar.body}</p>
              <InlineSourceBadges sourceIds={pillar.sourceIds} />
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 rounded-2xl border border-white/8 px-7 py-5 bg-[rgba(245,166,35,0.06)]"
        >
          <div>
            <p className="text-sm font-semibold text-[#F5A623] mb-1">Research basis for this section</p>
            <p className="text-sm text-[#64748B]">
              Regional context drawn from OpenCity open datasets and Karnataka State publications — they describe the
              city-region, not KWIN-specific delivery milestones.
            </p>
          </div>
          <Link
            href="/why-north-bengaluru"
            className="shrink-0 inline-flex items-center gap-2 text-sm font-bold text-[#F5A623] hover:text-[#FACC15] whitespace-nowrap transition-colors"
          >
            Full regional case
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

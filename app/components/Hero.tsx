'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import SourceReferences from '@/components/SourceReferences';
import { HERO_SOURCE_IDS } from '@/data/constants';
import InlineSourceBadges from '@/components/InlineSourceBadges';

const stats = [
  { figure: '465+', label: 'Acres', detail: 'Development area', sourceIds: ['brief', 'kiadb'] },
  { figure: '₹40K Cr', label: 'Vision', detail: 'Investment target ✦', sourceIds: ['brief', 'kiadb'] },
  { figure: '1 Lakh+', label: 'Jobs', detail: 'Employment goal ✦', sourceIds: ['brief', 'kiadb'] },
  { figure: '5', label: 'Phases', detail: 'Planned rollout', sourceIds: ['brief', 'kiadb'] },
];

export default function Hero() {
  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[linear-gradient(150deg,#040714_0%,#0D1640_50%,#07131F_100%)]"
    >
      {/* Animated gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <motion.div
          animate={{ x: [0, 40, 0], y: [0, -30, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/3 right-1/4 w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(29,78,216,0.18),transparent_65%)]"
        />
        <motion.div
          animate={{ x: [0, -30, 0], y: [0, 35, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
          className="absolute bottom-1/3 left-1/4 w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(232,160,32,0.13),transparent_65%)]"
        />
        <motion.div
          animate={{ x: [0, 20, 0], y: [0, 20, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut', delay: 8 }}
          className="absolute top-2/3 right-1/3 w-[350px] h-[350px] rounded-full bg-[radial-gradient(circle,rgba(6,182,212,0.12),transparent_65%)]"
        />
      </div>

      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.025] [background-image:linear-gradient(rgba(255,255,255,0.15)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.15)_1px,transparent_1px)] [background-size:64px_64px]"
      />

      <div className="container relative z-10 pt-28 pb-24">
        <div className="max-w-5xl mx-auto text-center">
          {/* Eyebrow badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mb-8 flex justify-center"
          >
            <span className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full text-xs font-bold tracking-[0.2em] uppercase border border-white/10 bg-white/5 text-[#94A3B8] backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F5A623] animate-pulse" />
              North Bengaluru · Proposed 2024
            </span>
          </motion.div>

          {/* Staggered headline */}
          <div className="mb-8">
            {[
              { text: 'Knowledge.', colorClass: 'text-white' },
              { text: 'Wellbeing.',  colorClass: 'gradient-text-gold' },
              { text: 'Innovation.', colorClass: 'text-[#22D3EE]' },
            ].map((line, i) => (
              <motion.div
                key={line.text}
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 + i * 0.18, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
              >
                <span
                  className={`block text-[clamp(2.25rem,9vw,7rem)] font-extrabold leading-[1.0] tracking-[-0.04em] ${line.colorClass}`}
                >
                  {line.text}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="text-xl md:text-2xl text-[#94A3B8] max-w-3xl mx-auto leading-relaxed mb-10"
          >
            India&#39;s most consequential city is expanding north.{' '}
            <span className="text-white/85">
              KWIN City is the township proposed for that frontier — and this site is your complete guide to it.
            </span>
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <Link
              href="/about"
              className="group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-lg text-[#040714] transition-transform hover:-translate-y-0.5 bg-[linear-gradient(135deg,#F5A623,#E8A020)] shadow-[0_8px_32px_rgba(232,160,32,0.35)] w-full sm:w-auto"
            >
              Explore the Vision
              <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link
              href="/evidence"
              className="btn btn-outline-light text-lg px-8 py-4 w-full sm:w-auto justify-center"
            >
              Read the Research
            </Link>
          </motion.div>

          {/* Stats strip */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3, duration: 0.8 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-px rounded-2xl overflow-hidden bg-[rgba(255,255,255,0.06)]"
          >
            {stats.map((stat) => (
              <div
                key={stat.figure}
                className="px-6 py-5 text-center bg-[rgba(255,255,255,0.04)]"
              >
                <div className="text-3xl md:text-4xl font-extrabold text-white mb-1">{stat.figure}</div>
                <div className="text-sm font-bold text-[#F5A623] mb-1">{stat.label}</div>
                <div className="text-xs text-[#64748B] mb-2">{stat.detail}</div>
                <div className="flex justify-center">
                  <InlineSourceBadges sourceIds={stat.sourceIds} />
                </div>
              </div>
            ))}
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6, duration: 0.5 }}
            className="text-xs text-[#475569] mt-5"
          >
            ✦ Investment and employment figures from project brief — pending KIADB primary verification.{' '}
            <Link href="/sources" className="text-[#94A3B8] hover:text-white underline underline-offset-2">
              Review all sources
            </Link>
          </motion.p>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] tracking-[0.25em] text-[#475569] uppercase">Discover More</span>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2.2, repeat: Infinity }}>
          <svg className="w-5 h-5 text-[#475569]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </motion.div>

      {/* Source references hidden for accessibility */}
      <div className="sr-only">
        <SourceReferences sourceIds={HERO_SOURCE_IDS} compact />
      </div>
    </section>
  );
}


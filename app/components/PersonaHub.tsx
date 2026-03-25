'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

const personas = [
  {
    id: 'investor',
    title: 'For Investors',
    icon: '💼',
    tagline: 'Capital meets opportunity',
    description:
      'Sector allocations, ROI benchmarks, KIADB regulatory framework, and why the early-mover window in KWIN is open now.',
    href: '/for/investor',
    image:
      'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=900&h=700&q=80&auto=format&fit=crop',
    overlayFrom: 'rgba(92,53,0,0.88)',
    overlayTo: 'rgba(0,0,0,0.45)',
    accent: '#F5A623',
    accentClass: 'text-amber-400',
    badgeClass: 'bg-amber-500/15 text-amber-300 border border-amber-500/25',
    glowClass: 'hover:shadow-[0_0_60px_rgba(245,166,35,0.22)]',
    borderClass: 'hover:border-amber-500/40',
  },
  {
    id: 'resident',
    title: 'For Residents',
    icon: '🏡',
    tagline: 'Life by design',
    description:
      'Green cover, interconnected lakes, schools, healthcare, and connectivity — the complete quality-of-life picture.',
    href: '/for/resident',
    image:
      'https://images.unsplash.com/photo-1448375240586-882707db888b?w=900&h=700&q=80&auto=format&fit=crop',
    overlayFrom: 'rgba(5,60,35,0.88)',
    overlayTo: 'rgba(0,0,0,0.45)',
    accent: '#10B981',
    accentClass: 'text-emerald-400',
    badgeClass: 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/25',
    glowClass: 'hover:shadow-[0_0_60px_rgba(16,185,129,0.22)]',
    borderClass: 'hover:border-emerald-500/40',
  },
  {
    id: 'researcher',
    title: 'For Researchers',
    icon: '🔬',
    tagline: 'Infrastructure for inquiry',
    description:
      "Lab facilities, IP policy, industry-academia nexus, and grants inside KWIN's knowledge district.",
    href: '/for/researcher',
    image:
      'https://images.unsplash.com/photo-1562774053-701939374585?w=900&h=600&q=80&auto=format&fit=crop',
    overlayFrom: 'rgba(25,18,80,0.88)',
    overlayTo: 'rgba(0,0,0,0.50)',
    accent: '#6366F1',
    accentClass: 'text-indigo-400',
    badgeClass: 'bg-indigo-500/15 text-indigo-300 border border-indigo-500/25',
    glowClass: 'hover:shadow-[0_0_60px_rgba(99,102,241,0.22)]',
    borderClass: 'hover:border-indigo-500/40',
  },
  {
    id: 'journalist',
    title: 'For Journalists',
    icon: '📰',
    tagline: 'Facts before filing',
    description:
      'Press kit, verified facts sheet, claim-status tracker, and media contacts — the most accurate story starts here.',
    href: '/for/journalist',
    image:
      'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=900&h=600&q=80&auto=format&fit=crop',
    overlayFrom: 'rgba(3,55,70,0.88)',
    overlayTo: 'rgba(0,0,0,0.50)',
    accent: '#06B6D4',
    accentClass: 'text-cyan-400',
    badgeClass: 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/25',
    glowClass: 'hover:shadow-[0_0_60px_rgba(6,182,212,0.22)]',
    borderClass: 'hover:border-cyan-500/40',
  },
  {
    id: 'citizen',
    title: 'For Curious Citizens',
    icon: '🌍',
    tagline: 'Plain language, real answers',
    description:
      "What KWIN is, who decides what, how you can participate, and where to dig deeper — zero jargon.",
    href: '/for/citizen',
    image:
      'https://images.unsplash.com/photo-1529688530647-93a6e1916f5f?w=900&h=600&q=80&auto=format&fit=crop',
    overlayFrom: 'rgba(70,5,35,0.85)',
    overlayTo: 'rgba(0,0,0,0.50)',
    accent: '#EC4899',
    accentClass: 'text-pink-400',
    badgeClass: 'bg-pink-500/15 text-pink-300 border border-pink-500/25',
    glowClass: 'hover:shadow-[0_0_60px_rgba(236,72,153,0.22)]',
    borderClass: 'hover:border-pink-500/40',
  },
];

export default function PersonaHub() {
  return (
    <section className="section bg-[#040714]">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65 }}
          viewport={{ once: true }}
          className="max-w-3xl mb-12"
        >
          <div className="eyebrow text-[#F5A623] mb-3">Your Guided View</div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-5 leading-tight">
            Tailored for{' '}
            <span className="gradient-text-gold">who you are.</span>
          </h2>
          <p className="text-lg text-[#94A3B8] leading-relaxed max-w-2xl">
            KWIN City means different things to different people. We built a dedicated lens for each —
            so you get straight to what matters most to you without wading through everything else.
          </p>
        </motion.div>

        {/* Grid: 2 tall cards on top, 3 shorter cards on bottom */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {/* Row 1: first two cards — taller */}
          {personas.slice(0, 2).map((persona, idx) => (
            <PersonaCard key={persona.id} persona={persona} idx={idx} tall />
          ))}

          {/* Third card top-row on xl (Researcher) */}
          <div className="hidden xl:block">
            <PersonaCard persona={personas[2]} idx={2} tall />
          </div>

          {/* Bottom row: Researcher (hidden on xl above), Journalist, Citizen */}
          <div className="xl:hidden">
            <PersonaCard persona={personas[2]} idx={2} />
          </div>
          <PersonaCard persona={personas[3]} idx={3} />
          <PersonaCard persona={personas[4]} idx={4} />
        </div>
      </div>
    </section>
  );
}

function PersonaCard({
  persona,
  idx,
  tall = false,
}: {
  persona: (typeof personas)[number];
  idx: number;
  tall?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: idx * 0.08 }}
      viewport={{ once: true }}
    >
      <Link
        href={persona.href}
        className={`group relative flex flex-col justify-end overflow-hidden rounded-2xl border border-white/8 transition-all duration-500 ${persona.glowClass} ${persona.borderClass} ${tall ? 'h-60 sm:h-72 md:h-80 lg:h-96' : 'h-52 sm:h-60 md:h-64 lg:h-72'}`}
      >
        {/* Background image */}
        <Image
          src={persona.image}
          alt={`${persona.title} — KWIN City`}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
        />

        {/* Gradient overlay */}
        <div
          className="absolute inset-0 transition-opacity duration-500"
          style={{
            background: `linear-gradient(to top, ${persona.overlayFrom} 0%, ${persona.overlayTo} 60%, rgba(0,0,0,0.1) 100%)`,
          }}
        />

        {/* Content */}
        <div className="relative z-10 p-6">
          <div className="mb-3 flex items-center gap-2">
            <span className={`text-xs font-bold tracking-[0.18em] uppercase px-2.5 py-1 rounded-full text-[10px] ${persona.badgeClass}`}>
              {persona.tagline}
            </span>
          </div>
          <div className="flex items-end justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-2xl">{persona.icon}</span>
                <h3 className="text-xl font-extrabold text-white">{persona.title}</h3>
              </div>
              <p className="text-sm text-white/70 leading-relaxed max-w-xs">
                {persona.description}
              </p>
            </div>
            <div
              className={`shrink-0 flex items-center justify-center w-10 h-10 rounded-xl border transition-all duration-300 group-hover:translate-x-1 ${persona.badgeClass}`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

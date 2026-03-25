'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

const images = [
  {
    src: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=600&h=400&q=75&auto=format&fit=crop',
    alt: 'Bengaluru city aerial view at dusk',
    label: 'Bengaluru, India',
  },
  {
    src: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=600&h=400&q=75&auto=format&fit=crop',
    alt: 'Modern international airport terminal',
    label: 'Airport Corridor',
  },
  {
    src: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=600&h=400&q=75&auto=format&fit=crop',
    alt: 'Solar energy farm at sunset',
    label: 'Solar Vision',
  },
  {
    src: 'https://images.unsplash.com/photo-1562774053-701939374585?w=600&h=400&q=75&auto=format&fit=crop',
    alt: 'University campus knowledge infrastructure',
    label: 'Knowledge Infrastructure',
  },
  {
    src: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&h=400&q=75&auto=format&fit=crop',
    alt: 'Semiconductor technology circuit board',
    label: 'Semiconductor Focus',
  },
];

export default function ImageStrip() {
  return (
    <div className="bg-[#040714] py-2 overflow-hidden">
      {/* Mobile: horizontal scroll strip; sm+: equal-width flex row */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="flex gap-2 px-2 overflow-x-auto snap-x snap-mandatory scrollbar-none sm:overflow-x-visible"
        style={{ WebkitOverflowScrolling: 'touch' }}
      >
        {images.map((img, idx) => (
          <motion.div
            key={img.label}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: idx * 0.07 }}
            viewport={{ once: true }}
            className="group relative shrink-0 sm:flex-1 sm:shrink overflow-hidden rounded-xl snap-start"
            style={{ width: 'min(72vw, 260px)', aspectRatio: '16/10' }}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105 brightness-75 group-hover:brightness-90"
                          sizes="(max-width: 640px) 72vw, 20vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            <span className="absolute bottom-3 left-3 text-[10px] font-semibold tracking-[0.15em] uppercase text-white/80">
              {img.label}
            </span>
          </motion.div>
        ))}
      </motion.div>
      <p className="text-center text-[10px] text-[#334155] mt-2 pb-1">
        Images via Unsplash for visual context; not literal KWIN construction photography
      </p>
    </div>
  );
}

'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

const images = [
  {
    src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Vidhana_Soudha%2C_front_%2801%29.jpg/1920px-Vidhana_Soudha%2C_front_%2801%29.jpg',
    alt: 'Vidhana Soudha in Bengaluru, Karnataka',
    label: 'Vidhana Soudha',
    credit: 'Moheen Reeyad',
    license: 'CC BY-SA 4.0',
    source: 'https://commons.wikimedia.org/wiki/File:Vidhana_Soudha,_front_(01).jpg',
  },
  {
    src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Kempegowda_International_Airport%2C_Bengaluru_%28Ank_Kumar%2C_Infosys%29_01.jpg/1920px-Kempegowda_International_Airport%2C_Bengaluru_%28Ank_Kumar%2C_Infosys%29_01.jpg',
    alt: 'Kempegowda International Airport in Bengaluru',
    label: 'Airport Corridor',
    credit: 'Ank Kumar',
    license: 'CC BY-SA 4.0',
    source:
      'https://commons.wikimedia.org/wiki/File:Kempegowda_International_Airport,_Bengaluru_(Ank_Kumar,_Infosys)_01.jpg',
  },
  {
    src: 'https://upload.wikimedia.org/wikipedia/commons/4/41/InfosysHQFrontView.jpg',
    alt: 'Infosys headquarters front view in Electronic City, Bengaluru',
    label: 'Electronic City',
    credit: 'Sundar',
    license: 'CC BY-SA 3.0',
    source:
      'https://commons.wikimedia.org/wiki/File:InfosysHQFrontView.jpg',
  },
  {
    src: 'https://upload.wikimedia.org/wikipedia/commons/b/b8/Main_Building%2C_Indian_Institute_of_Science%2C_Bangalore%2C_Karnataka%2C_India_%282017%29.jpg',
    alt: 'Main Building of the Indian Institute of Science in Bengaluru',
    label: 'Knowledge Infrastructure',
    credit: 'Sayantan Mondal',
    license: 'CC BY-SA 4.0',
    source: 'https://commons.wikimedia.org/wiki/File:Main_Building,_Indian_Institute_of_Science,_Bangalore,_Karnataka,_India_(2017).jpg',
  },
  {
    src: 'https://upload.wikimedia.org/wikipedia/commons/6/64/Lalbagh_%28Lal_Baugh%29_Botanical_Garden_in_Bangalore_%28now_Bengaluru%29_1.jpg',
    alt: 'Lalbagh Botanical Garden in Bengaluru',
    label: 'Urban Green Core',
    credit: 'CreativoCamaal (Lens Naayak Photography)',
    license: 'CC BY-SA 4.0',
    source:
      'https://commons.wikimedia.org/wiki/File:Lalbagh_(Lal_Baugh)_Botanical_Garden_in_Bangalore_(now_Bengaluru)_1.jpg',
  },
];

const LICENSE_LINKS: Record<string, string> = {
  'CC BY-SA 3.0': 'https://creativecommons.org/licenses/by-sa/3.0/',
  'CC BY-SA 4.0': 'https://creativecommons.org/licenses/by-sa/4.0/',
  'CC BY 4.0': 'https://creativecommons.org/licenses/by/4.0/',
  'CC BY 3.0': 'https://creativecommons.org/licenses/by/3.0/',
  CC0: 'https://creativecommons.org/publicdomain/zero/1.0/',
};

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
      <div className="mt-2 px-4 pb-1">
        <details className="group rounded-md border border-slate-800/70 bg-[#0b1220]/80 px-3 py-2">
          <summary className="cursor-pointer select-none text-center text-[10px] text-[#64748B] list-none">
            <span className="group-open:hidden sm:hidden">Show credits</span>
            <span className="group-open:hidden hidden sm:inline">Show Image Credits & Licenses</span>
            <span className="hidden group-open:inline sm:hidden">Hide credits</span>
            <span className="hidden group-open:inline sm:inline">Hide Image Credits & Licenses</span>
          </summary>
          <div className="mt-2 flex flex-wrap justify-center gap-x-3 gap-y-1 text-[10px] text-[#475569]">
            {images.map((img) => (
              <span key={img.label}>
                {img.label}:{' '}
                <a
                  href={img.source}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-[#94A3B8]"
                >
                  source
                </a>{' '}
                ·{' '}
                <a
                  href={LICENSE_LINKS[img.license]}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-[#94A3B8]"
                >
                  {img.license}
                </a>{' '}
                · {img.credit}
              </span>
            ))}
          </div>
        </details>
      </div>
    </div>
  );
}

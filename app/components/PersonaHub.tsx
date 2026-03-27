'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useI18n } from '@/lib/i18n/I18nProvider';
import { pickLocalizedValue } from '@/lib/i18n/messages';

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
      'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Kempegowda_International_Airport%2C_Bengaluru_%28Ank_Kumar%2C_Infosys%29_01.jpg/1920px-Kempegowda_International_Airport%2C_Bengaluru_%28Ank_Kumar%2C_Infosys%29_01.jpg',
    imageSource:
      'https://commons.wikimedia.org/wiki/File:Kempegowda_International_Airport,_Bengaluru_(Ank_Kumar,_Infosys)_01.jpg',
    imageCredit: 'Ank Kumar',
    imageLicense: 'CC BY-SA 4.0',
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
      'https://upload.wikimedia.org/wikipedia/commons/b/b0/Cubbon_Park_%2848186335396%29.jpg',
    imageSource: 'https://commons.wikimedia.org/wiki/File:Cubbon_Park_(48186335396).jpg',
    imageCredit: 'Abhiman Singh',
    imageLicense: 'CC0',
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
      'https://upload.wikimedia.org/wikipedia/commons/1/13/IIMB_Campus.jpg',
    imageSource: 'https://commons.wikimedia.org/wiki/File:IIMB_Campus.jpg',
    imageCredit: 'Magentic Manifestations',
    imageLicense: 'CC BY-SA 3.0',
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
      'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Vidhana_Soudha%2C_front_%2801%29.jpg/1920px-Vidhana_Soudha%2C_front_%2801%29.jpg',
    imageSource: 'https://commons.wikimedia.org/wiki/File:Vidhana_Soudha,_front_(01).jpg',
    imageCredit: 'Moheen Reeyad',
    imageLicense: 'CC BY-SA 4.0',
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
    href: '/for/curious-citizens',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/4/41/InfosysHQFrontView.jpg',
    imageSource:
      'https://commons.wikimedia.org/wiki/File:InfosysHQFrontView.jpg',
    imageCredit: 'Sundar',
    imageLicense: 'CC BY-SA 3.0',
    overlayFrom: 'rgba(70,5,35,0.85)',
    overlayTo: 'rgba(0,0,0,0.50)',
    accent: '#EC4899',
    accentClass: 'text-pink-400',
    badgeClass: 'bg-pink-500/15 text-pink-300 border border-pink-500/25',
    glowClass: 'hover:shadow-[0_0_60px_rgba(236,72,153,0.22)]',
    borderClass: 'hover:border-pink-500/40',
  },
];

const LICENSE_LINKS: Record<string, string> = {
  'CC BY-SA 3.0': 'https://creativecommons.org/licenses/by-sa/3.0/',
  'CC BY-SA 4.0': 'https://creativecommons.org/licenses/by-sa/4.0/',
  'CC BY 4.0': 'https://creativecommons.org/licenses/by/4.0/',
  'CC BY 3.0': 'https://creativecommons.org/licenses/by/3.0/',
  CC0: 'https://creativecommons.org/publicdomain/zero/1.0/',
};

export default function PersonaHub() {
  const { locale } = useI18n();
  const l = (values: { en: string; kn?: string; hi?: string; ta?: string }) => pickLocalizedValue(locale, values);

  const intro = l({
    en: 'KWIN City means different things to different people. We built a dedicated lens for each — so you get straight to what matters most to you without wading through everything else.',
    kn: 'KWIN City ವಿಭಿನ್ನ ಜನರಿಗೆ ವಿಭಿನ್ನ ಅರ್ಥ ಹೊಂದಿದೆ. ಆದ್ದರಿಂದ ನಿಮ್ಮ ಅಗತ್ಯಕ್ಕೆ ತಕ್ಕ ಮಾರ್ಗವನ್ನು ನಾವು ನಿರ್ಮಿಸಿದ್ದೇವೆ.',
    hi: 'KWIN City हर व्यक्ति के लिए अलग मायने रखता है। इसलिए हमने आपकी जरूरत के अनुसार अलग मार्ग तैयार किया है।',
    ta: 'KWIN City ஒவ்வொருவருக்கும் வேறுபட்ட அர்த்தம் தருகிறது. அதனால் உங்கள் தேவைக்கு ஏற்ப தனித்த பாதையை உருவாக்கியுள்ளோம்.',
  });

  const localizedPersonas = personas.map((persona) => {
    const byId: Record<string, { title: string; tagline: string; description: string }> = {
      investor: {
        title: l({ en: 'For Investors', kn: 'ಹೂಡಿಕೆದಾರರಿಗಾಗಿ', hi: 'निवेशकों के लिए', ta: 'முதலீட்டாளர்களுக்காக' }),
        tagline: l({ en: 'Capital meets opportunity', kn: 'ಬಂಡವಾಳ ಮತ್ತು ಅವಕಾಶ', hi: 'पूंजी और अवसर', ta: 'மூலதனம் சந்திக்கும் வாய்ப்பு' }),
        description: l({ en: 'Sector allocations, ROI benchmarks, KIADB regulatory framework, and why the early-mover window in KWIN is open now.', kn: 'ಕ್ಷೇತ್ರ ಹಂಚಿಕೆ, ROI ಮಾನದಂಡಗಳು, ಮತ್ತು KWIN ಹೂಡಿಕೆ ಅವಕಾಶಗಳು.', hi: 'सेक्टर आवंटन, ROI बेंचमार्क और KWIN निवेश अवसर।', ta: 'துறை ஒதுக்கீடுகள், ROI அளவுகோல்கள் மற்றும் KWIN முதலீட்டு வாய்ப்புகள்.' }),
      },
      resident: {
        title: l({ en: 'For Residents', kn: 'ನಿವಾಸಿಗಳಿಗಾಗಿ', hi: 'निवासियों के लिए', ta: 'குடியிருப்பாளர்களுக்காக' }),
        tagline: l({ en: 'Life by design', kn: 'ಜೀವನ ಗುಣಮಟ್ಟ', hi: 'जीवन गुणवत्ता', ta: 'திட்டமிட்ட வாழ்வு' }),
        description: l({ en: 'Green cover, interconnected lakes, schools, healthcare, and connectivity — the complete quality-of-life picture.', kn: 'ಹಸಿರು ಆವರಣ, ಆರೋಗ್ಯ, ಶಾಲೆಗಳು ಮತ್ತು ಸಂಪರ್ಕತೆ ಕುರಿತು ಸಂಪೂರ್ಣ ಚಿತ್ರ.', hi: 'ग्रीन कवर, स्वास्थ्य, स्कूल और कनेक्टिविटी पर संपूर्ण दृष्टि।', ta: 'பசுமை, சுகாதாரம், பள்ளிகள் மற்றும் இணைப்பு உடன் முழுமையான வாழ்க்கைத் தரம்.' }),
      },
      researcher: {
        title: l({ en: 'For Researchers', kn: 'ಸಂಶೋಧಕರಿಗಾಗಿ', hi: 'शोधकर्ताओं के लिए', ta: 'ஆராய்ச்சியாளர்களுக்காக' }),
        tagline: l({ en: 'Infrastructure for inquiry', kn: 'ಸಂಶೋಧನೆಗೆ ಮೂಲಸೌಕರ್ಯ', hi: 'अनुसंधान के लिए अवसंरचना', ta: 'ஆராய்ச்சிக்கான கட்டமைப்பு' }),
        description: l({ en: "Lab facilities, IP policy, industry-academia nexus, and grants inside KWIN's knowledge district.", kn: 'ಡೇಟಾ, ವಿಧಾನಶಾಸ್ತ್ರ, ಮತ್ತು ಕೈಗಾರಿಕೆ-ಅಕಾಡೆಮಿಯಾ ಸಂಪರ್ಕ.', hi: 'डेटा, कार्यप्रणाली और उद्योग-अकादमिक सहयोग।', ta: 'தரவு, முறைவியல் மற்றும் தொழில்-கல்வி இணைப்புகள்.' }),
      },
      journalist: {
        title: l({ en: 'For Journalists', kn: 'ಪತ್ರಕರ್ತರಿಗಾಗಿ', hi: 'पत्रकारों के लिए', ta: 'செய்தியாளர்களுக்காக' }),
        tagline: l({ en: 'Facts before filing', kn: 'ಮೊದಲು ನಿಜಾಂಶಗಳು', hi: 'पहले तथ्य', ta: 'முதலில் உண்மைகள்' }),
        description: l({ en: 'Press kit, verified facts sheet, claim-status tracker, and media contacts — the most accurate story starts here.', kn: 'ಪರಿಶೀಲಿತ ಅಂಶಗಳು, ಮೂಲ ಮಾರ್ಗಗಳು ಮತ್ತು ಕಥೆ ರೂಪಿಸುವ ಸಾಧನಗಳು.', hi: 'सत्यापित तथ्य, स्रोत मार्ग और स्टोरी फ्रेम।', ta: 'சரிபார்க்கப்பட்ட தகவல்கள், ஆதார பாதைகள் மற்றும் கதைகட்டமைப்பு கருவிகள்.' }),
      },
      citizen: {
        title: l({ en: 'For Curious Citizens', kn: 'ಕುತೂಹಲಕರ ನಾಗರಿಕರಿಗಾಗಿ', hi: 'जिज्ञासु नागरिकों के लिए', ta: 'ஆர்வமுள்ள குடிமக்களுக்காக' }),
        tagline: l({ en: 'Plain language, real answers', kn: 'ಸರಳ ಉತ್ತರಗಳು', hi: 'सरल उत्तर', ta: 'எளிய மொழி, தெளிவான பதில்கள்' }),
        description: l({ en: 'What KWIN is, who decides what, how you can participate, and where to dig deeper — zero jargon.', kn: 'KWIN ಬಗ್ಗೆ ಸರಳ ವಿವರಣೆ — ಜಾರ್ಗನ್ ಇಲ್ಲದೆ.', hi: 'KWIN के बारे में सरल व्याख्या — बिना जार्गन।', ta: 'KWIN என்ன, யார் தீர்மானிக்கிறார்கள், நீங்கள் எப்படி பங்கேற்பது — எளிய விளக்கம்.' }),
      },
    };

    const entry = byId[persona.id];
    if (!entry) return persona;
    return { ...persona, ...entry };
  });

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
            {l({ en: 'Tailored for ', kn: 'ನಿಮಗಾಗಿ ', hi: 'आपके लिए ', ta: 'உங்களுக்கேற்ற ' })}
            <span className="gradient-text-gold">{l({ en: 'who you are.', kn: 'ಹೊಂದಿಕೆಯಾಗಿರುವ ದೃಷ್ಟಿಕೋನ.', hi: 'विशेष रूप से तैयार दृष्टिकोण।', ta: 'தனிப்பயன் பார்வை.' })}</span>
          </h2>
          <p className="text-lg text-[#94A3B8] leading-relaxed max-w-2xl">
            {intro}
          </p>
        </motion.div>

        {/* Grid: 2 tall cards on top, 3 shorter cards on bottom */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {/* Row 1: first two cards — taller */}
          {localizedPersonas.slice(0, 2).map((persona, idx) => (
            <PersonaCard key={persona.id} persona={persona} idx={idx} tall />
          ))}

          {/* Third card top-row on xl (Researcher) */}
          <div className="hidden xl:block">
            <PersonaCard persona={localizedPersonas[2]} idx={2} tall />
          </div>

          {/* Bottom row: Researcher (hidden on xl above), Journalist, Citizen */}
          <div className="xl:hidden">
            <PersonaCard persona={localizedPersonas[2]} idx={2} />
          </div>
          <PersonaCard persona={localizedPersonas[3]} idx={3} />
          <PersonaCard persona={localizedPersonas[4]} idx={4} />
        </div>

        <div className="mt-6">
          <details className="group rounded-md border border-slate-800/70 bg-[#0b1220]/80 px-3 py-2">
            <summary className="cursor-pointer select-none text-center text-[11px] text-[#64748B] list-none">
              <span className="group-open:hidden sm:hidden">Show credits</span>
              <span className="group-open:hidden hidden sm:inline">Show Persona Image Credits & Licenses</span>
              <span className="hidden group-open:inline sm:hidden">Hide credits</span>
              <span className="hidden group-open:inline sm:inline">Hide Persona Image Credits & Licenses</span>
            </summary>
            <div className="mt-2 flex flex-wrap justify-center gap-x-3 gap-y-1 text-[10px] text-[#64748B]">
              {localizedPersonas.map((persona) => (
                <span key={persona.id}>
                  {persona.title}:{' '}
                  <a
                    href={persona.imageSource}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-[#94A3B8]"
                  >
                    source
                  </a>{' '}
                  ·{' '}
                  <a
                    href={LICENSE_LINKS[persona.imageLicense]}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-[#94A3B8]"
                  >
                    {persona.imageLicense}
                  </a>{' '}
                  · {persona.imageCredit}
                </span>
              ))}
            </div>
          </details>
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

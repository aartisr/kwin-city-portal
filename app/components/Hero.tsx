import Link from 'next/link';
import SourceReferences from '@/components/SourceReferences';
import InlineSourceBadges from '@/components/InlineSourceBadges';
import { HERO_SOURCE_IDS } from '@/data/constants';
import { getServerLocale, pickByLocale } from '@/lib/i18n/server';

const stats = [
  { figure: '465+', label: 'Acres', detail: 'Development area', sourceIds: ['brief', 'kiadb'] },
  { figure: '₹40K Cr', label: 'Vision', detail: 'Investment target ✦', sourceIds: ['brief', 'kiadb'] },
  { figure: '1 Lakh+', label: 'Jobs', detail: 'Employment goal ✦', sourceIds: ['brief', 'kiadb'] },
  { figure: '5', label: 'Phases', detail: 'Planned rollout', sourceIds: ['brief', 'kiadb'] },
];

export default async function Hero() {
  const locale = await getServerLocale();
  const headlineLines = [
    {
      text: pickByLocale(locale, {
        en: 'Knowledge.',
        kn: 'ಜ್ಞಾನ.',
        hi: 'ज्ञान.',
        ta: 'அறிவு.',
      }),
      colorClass: 'text-white',
      delayMs: 120,
    },
    {
      text: pickByLocale(locale, {
        en: 'Wellbeing.',
        kn: 'ಕ್ಷೇಮ.',
        hi: 'कल्याण.',
        ta: 'நலன்.',
      }),
      colorClass: 'gradient-text-gold',
      delayMs: 260,
    },
    {
      text: pickByLocale(locale, {
        en: 'Innovation.',
        kn: 'ನವೋದ್ಯಮ.',
        hi: 'नवाचार.',
        ta: 'புதுமை.',
      }),
      colorClass: 'text-[#22D3EE]',
      delayMs: 400,
    },
  ];

  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden bg-[linear-gradient(150deg,#040714_0%,#0D1640_50%,#07131F_100%)]">
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="hero-orb hero-orb-a absolute top-1/3 right-1/4 w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(29,78,216,0.18),transparent_65%)]" />
        <div className="hero-orb hero-orb-b absolute bottom-1/3 left-1/4 w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(232,160,32,0.13),transparent_65%)]" />
        <div className="hero-orb hero-orb-c absolute top-2/3 right-1/3 w-[350px] h-[350px] rounded-full bg-[radial-gradient(circle,rgba(6,182,212,0.12),transparent_65%)]" />
      </div>

      <div
        className="absolute inset-0 opacity-[0.025] [background-image:linear-gradient(rgba(255,255,255,0.15)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.15)_1px,transparent_1px)] [background-size:64px_64px]"
      />

      <div className="h-[100px] sm:h-[100px] md:h-[110px] shrink-0" aria-hidden="true" />

      <div className="flex-1 flex items-center">
        <div className="container relative z-10 w-full py-12">
          <div className="max-w-5xl mx-auto text-center">
            <div className="mb-6">
              {headlineLines.map((line) => (
                <div
                  key={line.text}
                  className="kwin-fade-up"
                  style={{ animationDelay: `${line.delayMs}ms` }}
                >
                  <span
                    className={`block text-[clamp(2.25rem,9vw,7rem)] font-extrabold leading-[1.0] tracking-[-0.04em] ${line.colorClass}`}
                  >
                    {line.text}
                  </span>
                </div>
              ))}
            </div>

            <div
              className="mb-8 flex justify-center kwin-fade-up"
              style={{ animationDelay: '560ms' }}
            >
              <span className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full text-xs font-bold tracking-[0.2em] uppercase border border-white/10 bg-white/5 text-[#94A3B8] backdrop-blur-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-[#F5A623] animate-pulse" />
                {pickByLocale(locale, {
                  en: 'North Bengaluru · Proposed 2024',
                  kn: 'ಉತ್ತರ ಬೆಂಗಳೂರು · ಪ್ರಸ್ತಾವಿತ 2024',
                  hi: 'नॉर्थ बेंगलुरु · प्रस्तावित 2024',
                  ta: 'வட பெங்களூரு · முன்மொழிவு 2024',
                })}
              </span>
            </div>

            <p
              className="text-xl md:text-2xl text-[#94A3B8] max-w-3xl mx-auto leading-relaxed mb-10 kwin-fade-in"
              style={{ animationDelay: '700ms' }}
            >
              {pickByLocale(locale, {
                en: "India's most consequential city is expanding north.",
                kn: 'ಭಾರತದ ಅತ್ಯಂತ ಪರಿಣಾಮಕಾರಿ ನಗರ ಈಗ ಉತ್ತರದತ್ತ ವಿಸ್ತರಿಸುತ್ತಿದೆ.',
                hi: 'भारत का सबसे प्रभावशाली शहर उत्तर की ओर फैल रहा है।',
                ta: 'இந்தியாவின் மிக முக்கியமான நகரம் வடக்கே விரிகிறது.',
              })}{' '}
              <span className="text-white/85">
                {pickByLocale(locale, {
                  en: 'KWIN City is the township proposed for that frontier - and this site is your complete guide to it.',
                  kn: 'ಆ ಹೊಸ ಗಡಿಯಿಗಾಗಿ ಪ್ರಸ್ತಾಪಿಸಲಾದ ಟೌನ್‌ಶಿಪ್ KWIN City — ಮತ್ತು ಈ ತಾಣ ಅದಕ್ಕಾಗಿ ನಿಮ್ಮ ಸಂಪೂರ್ಣ ಮಾರ್ಗದರ್ಶಿ.',
                  hi: 'KWIN City उसी नए फ्रंटियर के लिए प्रस्तावित टाउनशिप है - और यह साइट आपकी पूरी मार्गदर्शिका है।',
                  ta: 'அந்த புதிய எல்லைக்காக முன்மொழியப்பட்ட நகரம் KWIN City - இந்த தளம் அதற்கான முழுமையான வழிகாட்டி.',
                })}
              </span>
            </p>

            <div
              className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 kwin-fade-up"
              style={{ animationDelay: '820ms' }}
            >
              <Link
                href="/about"
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-lg text-[#040714] transition-transform hover:-translate-y-0.5 bg-[linear-gradient(135deg,#F5A623,#E8A020)] shadow-[0_8px_32px_rgba(232,160,32,0.35)] w-full sm:w-auto"
              >
                {pickByLocale(locale, {
                  en: 'Explore the Vision',
                  kn: 'ದೃಷ್ಟಿಯನ್ನು ಅನ್ವೇಷಿಸಿ',
                  hi: 'विजन देखें',
                  ta: 'காட்சியை ஆராயுங்கள்',
                })}
                <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link
                href="/evidence"
                className="btn btn-outline-light text-lg px-8 py-4 w-full sm:w-auto justify-center"
              >
                {pickByLocale(locale, {
                  en: 'Read the Research',
                  kn: 'ಅಧ್ಯಯನವನ್ನು ಓದಿ',
                  hi: 'रिसर्च पढ़ें',
                  ta: 'ஆராய்ச்சியைப் படிக்கவும்',
                })}
              </Link>
            </div>

            <div
              className="grid grid-cols-2 md:grid-cols-4 gap-px rounded-2xl overflow-hidden bg-[rgba(255,255,255,0.06)] kwin-fade-in"
              style={{ animationDelay: '940ms' }}
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
            </div>

            <p
              className="text-xs text-[#475569] mt-5 kwin-fade-in"
              style={{ animationDelay: '1080ms' }}
            >
              ✦{' '}
              {pickByLocale(locale, {
                en: 'Investment and employment figures from project brief - pending KIADB primary verification.',
                kn: 'ಹೂಡಿಕೆ ಮತ್ತು ಉದ್ಯೋಗ ಅಂಕಿಗಳು ಯೋಜನಾ ಸಂಕ್ಷಿಪ್ತದಿಂದ - KIADB ಪ್ರಾಥಮಿಕ ಪರಿಶೀಲನೆ ಬಾಕಿ.',
                hi: 'निवेश और रोजगार के आंकड़े परियोजना ब्रीफ से - KIADB प्राथमिक सत्यापन लंबित।',
                ta: 'முதலீடு மற்றும் வேலைவாய்ப்பு எண்கள் திட்டக் குறிப்பிலிருந்து - KIADB முதன்மை சரிபார்ப்பு நிலுவையில் உள்ளது.',
              })}{' '}
              <Link href="/sources" className="text-[#94A3B8] hover:text-white underline underline-offset-2">
                {pickByLocale(locale, {
                  en: 'Review all sources',
                  kn: 'ಎಲ್ಲಾ ಮೂಲಗಳನ್ನು ಪರಿಶೀಲಿಸಿ',
                  hi: 'सभी स्रोत देखें',
                  ta: 'அனைத்து மூலங்களையும் பாருங்கள்',
                })}
              </Link>
            </p>
          </div>
        </div>
      </div>

      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 kwin-fade-in"
        style={{ animationDelay: '1240ms' }}
      >
        <span className="text-[10px] tracking-[0.25em] text-[#475569] uppercase">
          {pickByLocale(locale, {
            en: 'Discover More',
            kn: 'ಇನ್ನಷ್ಟು ಅನ್ವೇಷಿಸಿ',
            hi: 'और जानें',
            ta: 'மேலும் கண்டறியுங்கள்',
          })}
        </span>
        <div className="hero-scroll-indicator">
          <svg className="w-5 h-5 text-[#475569]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>

      <div className="sr-only">
        <SourceReferences sourceIds={HERO_SOURCE_IDS} compact />
      </div>
    </section>
  );
}

import Link from 'next/link';
import { getServerLocale, pickByLocale } from '@/lib/i18n/server';

const pillars = [
  {
    key: 'knowledge',
    marker: '01',
    icon: '◌',
    href: '/evidence',
    tone: 'border-cyan-300/30 bg-cyan-300/[0.09] text-cyan-50',
    glow: 'from-cyan-400/30 via-cyan-300/5 to-transparent',
    title: { en: 'Knowledge', kn: 'ಜ್ಞಾನ', hi: 'ज्ञान', ta: 'அறிவு' },
    detail: {
      en: 'Evidence that can be inspected, not merely repeated.',
      kn: 'ಕೇವಲ ಪುನರಾವರ್ತನೆಯಲ್ಲ, ಪರಿಶೀಲಿಸಬಹುದಾದ ಸಾಕ್ಷ್ಯ.',
      hi: 'सिर्फ दोहराई नहीं गई, जांची जा सकने वाली जानकारी।',
      ta: 'வெறுமனே மீள்கூறப்படாத, ஆய்வு செய்யக்கூடிய ஆதாரம்.',
    },
    action: { en: 'Explore evidence', kn: 'ಸಾಕ್ಷ್ಯ ನೋಡಿ', hi: 'साक्ष्य देखें', ta: 'ஆதாரத்தைப் பாருங்கள்' },
  },
  {
    key: 'wellbeing',
    marker: '02',
    icon: '↗',
    href: '/sustainability',
    tone: 'border-emerald-300/30 bg-emerald-300/[0.09] text-emerald-50',
    glow: 'from-emerald-400/28 via-emerald-300/5 to-transparent',
    title: { en: 'Wellbeing', kn: 'ಕ್ಷೇಮ', hi: 'कल्याण', ta: 'நல்வாழ்வு' },
    detail: {
      en: 'Growth considered alongside water, ecology, and daily life.',
      kn: 'ನೀರು, ಪರಿಸರ ಮತ್ತು ದೈನಂದಿನ ಬದುಕಿನ ಜೊತೆ ಪರಿಗಣಿಸಿದ ಬೆಳವಣಿಗೆ.',
      hi: 'जल, पारिस्थितिकी और रोज़मर्रा की ज़िंदगी के साथ विचार किया गया विकास।',
      ta: 'நீர், சூழலியல் மற்றும் அன்றாட வாழ்வுடன் இணைத்து கருதப்படும் வளர்ச்சி.',
    },
    action: { en: 'See the systems view', kn: 'ವ್ಯವಸ್ಥೆಗಳ ನೋಟ ನೋಡಿ', hi: 'सिस्टम दृश्य देखें', ta: 'அமைப்பு பார்வையைப் பாருங்கள்' },
  },
  {
    key: 'innovation',
    marker: '03',
    icon: '✦',
    href: '/sectors',
    tone: 'border-amber-200/35 bg-amber-200/[0.1] text-amber-50',
    glow: 'from-amber-300/32 via-amber-200/5 to-transparent',
    title: { en: 'Innovation', kn: 'ನವೀನತೆ', hi: 'नवाचार', ta: 'புதுமை' },
    detail: {
      en: 'A forward-looking industrial proposition grounded in public questions.',
      kn: 'ಸಾರ್ವಜನಿಕ ಪ್ರಶ್ನೆಗಳಲ್ಲಿ ನೆಲೆಯೂರಿರುವ ಮುಂದಿನ ಕಾಲದ ಕೈಗಾರಿಕಾ ಪ್ರಸ್ತಾವನೆ.',
      hi: 'सार्वजनिक सवालों पर आधारित एक भविष्यदर्शी औद्योगिक प्रस्ताव।',
      ta: 'பொது கேள்விகளில் நிலைகொண்ட எதிர்காலத் தொழில் முன்மொழிவு.',
    },
    action: { en: 'Discover the sectors', kn: 'ಕ್ಷೇತ್ರಗಳನ್ನು ತಿಳಿಯಿರಿ', hi: 'क्षेत्र जानें', ta: 'துறைகளை அறியுங்கள்' },
  },
] as const;

export default async function InnovationCanvas() {
  const locale = await getServerLocale();

  return (
    <section data-testid="innovation-canvas" className="relative overflow-hidden bg-[#06121f] py-14 text-white sm:py-20" aria-labelledby="innovation-canvas-title">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute -left-24 top-4 h-72 w-72 rounded-full bg-cyan-400/15 blur-3xl" />
        <div className="absolute right-0 top-1/3 h-80 w-80 rounded-full bg-amber-300/10 blur-3xl" />
        <div className="absolute inset-0 opacity-[0.14] [background-image:linear-gradient(rgba(147,197,253,0.3)_1px,transparent_1px),linear-gradient(90deg,rgba(147,197,253,0.3)_1px,transparent_1px)] [background-size:36px_36px]" />
      </div>

      <div className="container relative">
        <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
          <div className="max-w-xl">
            <p className="eyebrow text-cyan-200">
              {pickByLocale(locale, { en: 'The KWIN creative system', kn: 'KWIN ಸೃಜನಾತ್ಮಕ ವ್ಯವಸ್ಥೆ', hi: 'KWIN रचनात्मक प्रणाली', ta: 'KWIN படைப்பாற்றல் அமைப்பு' })}
            </p>
            <h2 id="innovation-canvas-title" className="mt-4 text-4xl font-black leading-[0.98] tracking-[-0.055em] text-white sm:text-5xl">
              {pickByLocale(locale, {
                en: 'A city idea is only interesting when its parts improve each other.',
                kn: 'ನಗರದ ಕಲ್ಪನೆಯ ಭಾಗಗಳು ಪರಸ್ಪರವನ್ನು ಉತ್ತಮಗೊಳಿಸಿದಾಗ ಮಾತ್ರ ಅದು ಆಸಕ್ತಿದಾಯಕವಾಗುತ್ತದೆ.',
                hi: 'शहर का विचार तभी रोचक है जब उसके हिस्से एक-दूसरे को बेहतर बनाएं।',
                ta: 'ஒரு நகரக் கருத்தின் பகுதிகள் ஒன்றையொன்று மேம்படுத்தும்போதுதான் அது சுவாரஸ்யமாகிறது.',
              })}
            </h2>
          </div>
          <p className="max-w-2xl text-base leading-8 text-[#bdd0df] sm:text-lg">
            {pickByLocale(locale, {
              en: 'KWIN’s three pillars are not slogans. This portal lets you test the connections between evidence, liveability, and industrial ambition—one question at a time.',
              kn: 'KWIN ನ ಮೂರು ಸ್ತಂಭಗಳು ಕೇವಲ ಘೋಷಣೆಗಳಲ್ಲ. ಈ ಪೋರ್ಟಲ್ ಸಾಕ್ಷ್ಯ, ಬದುಕಲು ಯೋಗ್ಯತೆ ಮತ್ತು ಕೈಗಾರಿಕಾ ಮಹತ್ವಾಕಾಂಕ್ಷೆಯ ನಡುವಿನ ಸಂಬಂಧಗಳನ್ನು ಒಂದೊಂದು ಪ್ರಶ್ನೆಯಾಗಿ ಪರೀಕ್ಷಿಸಲು ನಿಮಗೆ ಅವಕಾಶ ನೀಡುತ್ತದೆ.',
              hi: 'KWIN के तीन स्तंभ केवल नारे नहीं हैं। यह पोर्टल आपको साक्ष्य, जीवन-योग्यता और औद्योगिक महत्वाकांक्षा के बीच के संबंधों को एक-एक सवाल करके परखने देता है।',
              ta: 'KWIN இன் மூன்று தூண்கள் வெறும் முழக்கங்கள் அல்ல. ஆதாரம், வாழ்வதற்கான தரம் மற்றும் தொழில் முனைப்பு ஆகியவற்றின் தொடர்புகளை ஒவ்வொரு கேள்வியாகச் சோதிக்க இந்தத் தளம் உதவுகிறது.',
            })}
          </p>
        </div>

        <div className="relative mt-10 grid gap-4 lg:grid-cols-3 lg:gap-5">
          <div className="pointer-events-none absolute left-[16%] right-[16%] top-1/2 hidden h-px -translate-y-1/2 bg-gradient-to-r from-cyan-300/15 via-white/30 to-amber-200/15 lg:block" aria-hidden="true" />
          {pillars.map((pillar) => (
            <article key={pillar.key} className={`relative overflow-hidden rounded-[26px] border p-6 shadow-[0_24px_65px_rgba(0,0,0,0.22)] backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:border-white/35 ${pillar.tone}`}>
              <div className={`pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b ${pillar.glow}`} aria-hidden="true" />
              <div className="relative flex items-start justify-between gap-4">
                <span className="text-[11px] font-black tracking-[0.2em] text-white/55">{pillar.marker}</span>
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/20 bg-[#071b2c]/45 text-xl" aria-hidden="true">{pillar.icon}</span>
              </div>
              <h3 className="relative mt-12 text-2xl font-black tracking-[-0.04em] text-white">{pickByLocale(locale, pillar.title)}</h3>
              <p className="relative mt-3 min-h-14 text-sm leading-6 text-white/72">{pickByLocale(locale, pillar.detail)}</p>
              <Link href={pillar.href} className="relative mt-7 inline-flex items-center gap-2 text-sm font-black text-white underline decoration-white/30 underline-offset-4 transition hover:decoration-white">
                {pickByLocale(locale, pillar.action)} <span aria-hidden="true">→</span>
              </Link>
            </article>
          ))}
        </div>

        <div className="mt-8 flex flex-col gap-3 border-t border-white/10 pt-5 text-sm text-[#9fb9ca] sm:flex-row sm:items-center sm:justify-between">
          <p>{pickByLocale(locale, { en: 'Explore a pillar, then follow the evidence trail behind it.', kn: 'ಒಂದು ಸ್ತಂಭವನ್ನು ಅನ್ವೇಷಿಸಿ, ನಂತರ ಅದರ ಹಿಂದಿನ ಸಾಕ್ಷ್ಯ ಮಾರ್ಗವನ್ನು ಅನುಸರಿಸಿ.', hi: 'एक स्तंभ देखें, फिर उसके पीछे के साक्ष्य मार्ग का अनुसरण करें।', ta: 'ஒரு தூணை ஆராயுங்கள்; பிறகு அதன் பின்னுள்ள ஆதாரப் பாதையைப் பின்பற்றுங்கள்.' })}</p>
          <Link href="/for" className="font-bold text-cyan-100 hover:text-white">{pickByLocale(locale, { en: 'Choose your pathway →', kn: 'ನಿಮ್ಮ ಮಾರ್ಗವನ್ನು ಆಯ್ಕೆಮಾಡಿ →', hi: 'अपना रास्ता चुनें →', ta: 'உங்கள் பாதையைத் தேர்ந்தெடுக்கவும் →' })}</Link>
        </div>
      </div>
    </section>
  );
}

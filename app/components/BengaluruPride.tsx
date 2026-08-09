'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import InlineSourceBadges from '@/components/InlineSourceBadges';
import { LAUNCH_DECK_THEMES } from '@/data/kwin/launch-deck-themes';
import { useI18n } from '@/lib/i18n/I18nProvider';
import { pickLocalizedValue } from '@/lib/i18n/messages';

const PILLAR_TITLES = {
  'vidhana-soudha': {
    en: 'Policy & Governance Signals',
    kn: 'ನೀತಿ ಮತ್ತು ಆಡಳಿತ ಸೂಚನೆಗಳು',
    hi: 'नीति और शासन संकेत',
    ta: 'கொள்கை மற்றும் ஆட்சி சுட்டுக்கள்',
  },
  'airport-corridor': {
    en: 'Airport-led Regional Connectivity',
    kn: 'ವಿಮಾನ ನಿಲ್ದಾಣ ಚಾಲಿತ ಪ್ರಾದೇಶಿಕ ಸಂಪರ್ಕ',
    hi: 'एयरपोर्ट-आधारित क्षेत्रीय कनेक्टिविटी',
    ta: 'விமானநிலைய அடிப்படையிலான பிராந்திய இணைப்பு',
  },
  'electronic-city': {
    en: 'Technology Ecosystem Momentum',
    kn: 'ತಂತ್ರಜ್ಞಾನ ಪರಿಸರ ವೇಗ',
    hi: 'प्रौद्योगिकी पारितंत्र की गति',
    ta: 'தொழில்நுட்ப சூழல் முன்னேற்றம்',
  },
  'knowledge-infrastructure': {
    en: 'Knowledge & Research Base',
    kn: 'ಜ್ಞಾನ ಮತ್ತು ಸಂಶೋಧನಾ ಆಧಾರ',
    hi: 'ज्ञान और अनुसंधान आधार',
    ta: 'அறிவு மற்றும் ஆராய்ச்சி அடித்தளம்',
  },
} as const;

const launchThemeVisuals = [
  {
    id: 'vidhana-soudha',
    icon: '🏛️',
    iconBgClass: 'bg-[#F5A623]/20 border border-[#F5A623]/30',
  },
  {
    id: 'airport-corridor',
    icon: '✈️',
    iconBgClass: 'bg-[#06B6D4]/20 border border-[#06B6D4]/30',
  },
  {
    id: 'electronic-city',
    icon: '💻',
    iconBgClass: 'bg-[#10B981]/20 border border-[#10B981]/30',
  },
  {
    id: 'knowledge-infrastructure',
    icon: '🔬',
    iconBgClass: 'bg-[#8B5CF6]/20 border border-[#8B5CF6]/30',
  },
];

export default function BengaluruPride() {
  const { locale } = useI18n();
  const l = (values: Parameters<typeof pickLocalizedValue<string>>[1]) => pickLocalizedValue(locale, values);

  const pillars = LAUNCH_DECK_THEMES.map((theme) => {
    const visuals = launchThemeVisuals.find((item) => item.id === theme.id);

    return {
      id: theme.id,
      icon: visuals?.icon ?? '•',
      title: PILLAR_TITLES[theme.id],
      body: theme.summary,
      sourceIds: theme.sourceIds,
      iconBgClass: visuals?.iconBgClass ?? 'bg-slate-700/40 border border-slate-600/50',
    };
  });

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
          <div className="eyebrow text-[#F5A623] mb-4">
            {l({ en: 'The Region Behind the Vision', kn: 'ದೃಷ್ಟಿಕೋನದ ಹಿಂದೆ ಇರುವ ಪ್ರದೇಶ', hi: 'विजन के पीछे का क्षेत्र', ta: 'காட்சிக்கு பின்னுள்ள பிராந்தியம்' })}
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-5 leading-tight">
            {l({ en: 'Built Where', kn: 'ನಿರ್ಮಾಣವಾಗುತ್ತಿದೆ ಇಲ್ಲಿ', hi: 'निर्माण वहीं जहां', ta: 'உருவாகுவது அங்கே' })}{' '}
            <span className="gradient-text-gold">
              {l({ en: "India's Future", kn: 'ಭಾರತದ ಭವಿಷ್ಯ', hi: 'भारत का भविष्य', ta: 'இந்தியாவின் எதிர்காலம்' })}
            </span>{' '}
            {l({ en: 'Lives.', kn: 'ವಾಸಿಸುತ್ತದೆ.', hi: 'बसता है।', ta: 'வாழ்கிறது.' })}
          </h2>
          <p className="text-lg text-[#94A3B8] leading-relaxed max-w-2xl">
            {l({
              en: "Bengaluru already defines India's technology story. Its northern corridor is rapidly emerging as the new frontier of industrial ambition, mobility infrastructure, and global capital. The conditions for KWIN City are not aspirational - many are already well underway.",
              kn: 'ಬೆಂಗಳೂರು ಈಗಾಗಲೇ ಭಾರತದ ತಂತ್ರಜ್ಞಾನ ಕಥೆಯನ್ನು ನಿರ್ಧರಿಸಿದೆ. ಅದರ ಉತ್ತರ ಕಾರಿಡಾರ್ ಕೈಗಾರಿಕಾ ಮಹತ್ವಾಕಾಂಕ್ಷೆ, ಸಂಚಾರ ಮೂಲಸೌಕರ್ಯ ಮತ್ತು ಜಾಗತಿಕ ಬಂಡವಾಳದ ಹೊಸ ಗಡಿಯಾಗಿ ವೇಗವಾಗಿ ರೂಪುಗೊಳ್ಳುತ್ತಿದೆ. KWIN City ಗಾಗಿ ಅಗತ್ಯವಾದ ಹಲವು ಪರಿಸ್ಥಿತಿಗಳು ಈಗಾಗಲೇ ಪ್ರಗತಿಯಲ್ಲಿವೆ.',
              hi: 'बेंगलुरु पहले से ही भारत की तकनीकी कहानी को परिभाषित करता है। इसका उत्तरी कॉरिडोर औद्योगिक महत्वाकांक्षा, गतिशील अवसंरचना और वैश्विक पूंजी के नए केंद्र के रूप में तेज़ी से उभर रहा है। KWIN City के लिए आवश्यक कई स्थितियां पहले से प्रगति पर हैं।',
              ta: 'பெங்களூரு இந்தியாவின் தொழில்நுட்ப பயணத்தை ஏற்கனவே வரையறுக்கிறது. அதன் வடக்கு காரிடார், தொழில் முனைவு, போக்குவரத்து அடிக்கட்டு, உலக முதலீடு ஆகியவற்றின் புதிய முனையாக வேகமாக உருவாகிறது. KWIN City க்கான பல அடிப்படை நிலைகள் ஏற்கனவே முன்னேறிக் கொண்டிருக்கின்றன.',
            })}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-12">
          {pillars.map((pillar, idx) => (
            <motion.article
              key={pillar.id}
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
              <h3 className="text-xl font-bold text-white mb-3">{l(pillar.title)}</h3>
              <p className="text-[#94A3B8] leading-7 mb-4">{l(pillar.body)}</p>
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
            <p className="text-sm font-semibold text-[#F5A623] mb-1">
              {l({ en: 'Research basis for this section', kn: 'ಈ ವಿಭಾಗದ ಸಂಶೋಧನಾ ಆಧಾರ', hi: 'इस अनुभाग का शोध आधार', ta: 'இந்த பகுதியின் ஆய்வு ஆதாரம்' })}
            </p>
            <p className="text-sm text-[#64748B]">
              {l({
                en: 'Regional context drawn from OpenCity open datasets and Karnataka State publications. They describe the city-region, not KWIN-specific delivery milestones.',
                kn: 'OpenCity ಮುಕ್ತ ಡೇಟಾಸೆಟ್‌ಗಳು ಮತ್ತು ಕರ್ನಾಟಕ ರಾಜ್ಯ ಪ್ರಕಟಣೆಗಳಿಂದ ಪಡೆದ ಪ್ರಾದೇಶಿಕ ಸಂದರ್ಭ. ಇವು ನಗರ-ಪ್ರದೇಶವನ್ನು ವಿವರಿಸುತ್ತವೆ; KWIN-ನಿಗೆ ಸಂಬಂಧಿಸಿದ ನಿರ್ದಿಷ್ಟ ವಿತರಣಾ ಮೈಲಿಗಲ್ಲುಗಳನ್ನು ಅಲ್ಲ.',
                hi: 'ओपनसिटी ओपन डेटासेट और कर्नाटक राज्य प्रकाशनों से लिया गया क्षेत्रीय संदर्भ। ये शहर-क्षेत्र का वर्णन करते हैं, न कि KWIN-विशिष्ट डिलीवरी माइलस्टोन का।',
                ta: 'OpenCity திறந்த தரவுத்தொகுப்புகள் மற்றும் கர்நாடக மாநில வெளியீடுகளிலிருந்து பெறப்பட்ட பிராந்திய சூழல். இவை நகர-பிராந்தியத்தை விவரிக்கின்றன; KWIN-க்கு தனிப்பட்ட நிறைவேற்ற மைல்கற்களை அல்ல.',
              })}
            </p>
          </div>
          <Link
            href="/why-north-bengaluru"
            className="shrink-0 inline-flex items-center gap-2 text-sm font-bold text-[#F5A623] hover:text-[#FACC15] whitespace-nowrap transition-colors"
          >
            {l({ en: 'Full regional case', kn: 'ಸಂಪೂರ್ಣ ಪ್ರಾದೇಶಿಕ ಪ್ರಕರಣ', hi: 'पूरा क्षेत्रीय आधार', ta: 'முழு பிராந்திய ஆதாரம்' })}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

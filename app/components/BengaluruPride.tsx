'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import InlineSourceBadges from '@/components/InlineSourceBadges';
import { useI18n } from '@/lib/i18n/I18nProvider';
import { pickLocalizedValue } from '@/lib/i18n/messages';

const pillars = [
  {
    id: 'silicon-valley',
    icon: '🌐',
    title: {
      en: "India's Silicon Valley",
      kn: 'ಭಾರತದ ಸಿಲಿಕಾನ್ ವ್ಯಾಲಿ',
      hi: 'भारत की सिलिकॉन वैली',
      ta: 'இந்தியாவின் சிலிகான் பள்ளத்தாக்கு',
    },
    body: {
      en: 'Bengaluru is the undisputed technology capital of India, home to the highest density of global tech companies, R&D centres, and startup unicorns on the subcontinent. KWIN City is proposed in this orbit.',
      kn: 'ಬೆಂಗಳೂರು ಭಾರತத்தின் ತಂತ್ರಜ್ಞಾನ ರಾಜಧಾನಿ. ಜಾಗತಿಕ ತಂತ್ರಜ್ಞಾನ ಕಂಪನಿಗಳು, ಸಂಶೋಧನೆ ಮತ್ತು ಅಭಿವೃದ್ಧಿ ಕೇಂದ್ರಗಳು ಹಾಗೂ ಸ್ಟಾರ್ಟ್‌ಅಪ್ ಯೂನಿಕೋನ್‌ಗಳ ಅತ್ಯಧಿಕ ಸಾಂದ್ರತೆ ಇಲ್ಲಿ ಇದೆ. KWIN City ಈ ವಲಯದಲ್ಲೇ ಪ್ರಸ್ತಾಪಿತವಾಗಿದೆ.',
      hi: 'बेंगलुरु भारत की निर्विवाद तकनीकी राजधानी है। यहां वैश्विक टेक कंपनियों, आर एंड डी केंद्रों और स्टार्टअप यूनिकॉर्न की उच्चतम सघनता है। KWIN City इसी क्षेत्रीय परिप्रेक्ष्य में प्रस्तावित है।',
      ta: 'பெங்களூரு இந்தியாவின் முன்னணி தொழில்நுட்பத் தலைநகரம். உலகளாவிய தொழில்நுட்ப நிறுவனங்கள், ஆராய்ச்சி மையங்கள், ஸ்டார்ட்அப் யூனிகார்ன்கள் மிக அதிகமாக உள்ள பகுதியாக இது திகழ்கிறது. KWIN City இந்த வளையத்திலேயே முன்மொழியப்பட்டுள்ளது.',
    },
    sourceIds: ['economicSurvey'],
    iconBgClass: 'bg-[#F5A623]/20 border border-[#F5A623]/30',
  },
  {
    id: 'connectivity',
    icon: '✈️',
    title: {
      en: 'World-Class Connectivity',
      kn: 'ವಿಶ್ವಮಟ್ಟದ ಸಂಪರ್ಕ',
      hi: 'विश्वस्तरीय कनेक्टिविटी',
      ta: 'உலகத்தர இணைப்பு',
    },
    body: {
      en: "Kempegowda International Airport is one of India's busiest and fastest-growing gateways. North Bengaluru's airport corridor is already one of the most sought-after investment zones in South Asia.",
      kn: 'ಕೆಂಪೇಗೌಡ ಅಂತರರಾಷ್ಟ್ರೀಯ ವಿಮಾನ ನಿಲ್ದಾಣ ಭಾರತದಲ್ಲಿ ಅತಿ ಬ್ಯುಸಿ ಮತ್ತು ವೇಗವಾಗಿ ಬೆಳೆಯುತ್ತಿರುವ ಪ್ರವೇಶ ದ್ವಾರಗಳಲ್ಲಿ ಒಂದು. ಉತ್ತರ ಬೆಂಗಳೂರಿನ ವಿಮಾನ ನಿಲ್ದಾಣ ಕಾರಿಡಾರ್ ಈಗಾಗಲೇ ದಕ್ಷಿಣ ಏಷ್ಯಾದ ಅತ್ಯಂತ ಬೇಡಿಕೆಯ ಹೂಡಿಕೆ ವಲಯಗಳಲ್ಲಿ ಒಂದು.',
      hi: 'केम्पेगौड़ा अंतरराष्ट्रीय हवाई अड्डा भारत के सबसे व्यस्त और तेज़ी से बढ़ते प्रवेश द्वारों में से एक है। नॉर्थ बेंगलुरु का एयरपोर्ट कॉरिडोर दक्षिण एशिया के सबसे आकर्षक निवेश क्षेत्रों में गिना जाता है।',
      ta: 'கெம்பேகவுடா சர்வதேச விமானநிலையம் இந்தியாவின் மிகப் பரபரப்பான மற்றும் வேகமாக வளர்கின்ற நுழைவாயில்களில் ஒன்று. வட பெங்களூரு விமானநிலைய காரிடார் ஏற்கனவே தென் ஆசியாவின் மிக விரும்பப்படும் முதலீட்டு மண்டலங்களில் ஒன்றாக உள்ளது.',
    },
    sourceIds: ['aviation'],
    iconBgClass: 'bg-[#06B6D4]/20 border border-[#06B6D4]/30',
  },
  {
    id: 'infrastructure',
    icon: '🛣️',
    title: {
      en: 'Infrastructure in Motion',
      kn: 'ಚಲನೆಯಲ್ಲಿರುವ ಮೂಲಸೌಕರ್ಯ',
      hi: 'गतिशील अवसंरचना',
      ta: 'முன்னேறும் அடிக்கட்டு',
    },
    body: {
      en: "The Satellite Town Ring Road (STRR) and Inner Ring Road (IRR) projects represent Karnataka's serious commitment to orbital and radial connectivity that frames KWIN's region as a planned node.",
      kn: 'ಸ್ಯಾಟಲೈಟ್ ಟೌನ್ ರಿಂಗ್ ರೋಡ್ (STRR) ಮತ್ತು ಇನರ್ ರಿಂಗ್ ರೋಡ್ (IRR) ಯೋಜನೆಗಳು ಕರ್ನಾಟಕದ ವಲಯ ಮತ್ತು ರೇಡಿಯಲ್ ಸಂಪರ್ಕದ ಗಂಭೀರ ಬದ್ಧತೆಯನ್ನು ತೋರಿಸುತ್ತವೆ. ಇದು KWIN ಪ್ರದೇಶವನ್ನು ಯೋಜಿತ ನೋಡ್ ಆಗಿ ರೂಪಿಸುತ್ತದೆ.',
      hi: 'सैटेलाइट टाउन रिंग रोड (STRR) और इनर रिंग रोड (IRR) परियोजनाएं कर्नाटक की ऑर्बिटल और रेडियल कनेक्टिविटी के प्रति गंभीर प्रतिबद्धता को दर्शाती हैं, जो KWIN क्षेत्र को एक नियोजित नोड के रूप में स्थापित करती हैं।',
      ta: 'சாட்டிலைட் டவுன் ரிங் ரோடு (STRR) மற்றும் இன்னர் ரிங் ரோடு (IRR) திட்டங்கள், வளைய மற்றும் ஆரை இணைப்பிற்கான கர்நாடகத்தின் உறுதியான முதலீட்டை காட்டுகின்றன. இது KWIN பகுதியை திட்டமிட்ட மையமாக உருவாக்குகிறது.',
    },
    sourceIds: ['strr', 'irr'],
    iconBgClass: 'bg-[#10B981]/20 border border-[#10B981]/30',
  },
  {
    id: 'economic-ambition',
    icon: '📈',
    title: {
      en: 'Economic Ambition at Scale',
      kn: 'ವಿಶಾಲ ಮಟ್ಟದ ಆರ್ಥಿಕ ಮಹತ್ವಾಕಾಂಕ್ಷೆ',
      hi: 'व्यापक पैमाने पर आर्थिक महत्वाकांक्षा',
      ta: 'பரந்த அளவிலான பொருளாதார முனைவு',
    },
    body: {
      en: "Karnataka's economic survey documents a state actively investing in industrial expansion, knowledge infrastructure, and global capital attraction. The macroeconomic backdrop is as strong as it has ever been.",
      kn: 'ಕರ್ನಾಟಕದ ಆರ್ಥಿಕ ಸಮೀಕ್ಷೆಯು ಕೈಗಾರಿಕಾ ವಿಸ್ತರಣೆ, ಜ್ಞಾನ ಮೂಲಸೌಕರ್ಯ ಮತ್ತು ಜಾಗತಿಕ ಬಂಡವಾಳ ಆಕರ್ಷಣೆಯಲ್ಲಿ ಸಕ್ರಿಯವಾಗಿ ಹೂಡಿಕೆ ಮಾಡುತ್ತಿರುವ ರಾಜ್ಯವನ್ನು ದಾಖಲಿಸುತ್ತದೆ. ಸಮಗ್ರ ಆರ್ಥಿಕ ಹಿನ್ನೆಲೆ ಅತ್ಯಂತ ಬಲವಾಗಿದೆ.',
      hi: 'कर्नाटक की आर्थिक सर्वेक्षण रिपोर्ट एक ऐसे राज्य को दिखाती है जो औद्योगिक विस्तार, ज्ञान अवसंरचना और वैश्विक पूंजी आकर्षण में सक्रिय निवेश कर रहा है। व्यापक आर्थिक परिदृश्य अत्यंत मजबूत है।',
      ta: 'கர்நாடகாவின் பொருளாதார ஆய்வு, தொழில் விரிவாக்கம், அறிவு அடிக்கட்டு, உலகளாவிய முதலீட்டு ஈர்ப்பு போன்ற துறைகளில் மாநிலம் செயற்படுவதை காட்டுகிறது. பரந்த பொருளாதார பின்னணி மிகவும் வலுவாக உள்ளது.',
    },
    sourceIds: ['economicSurvey'],
    iconBgClass: 'bg-[#8B5CF6]/20 border border-[#8B5CF6]/30',
  },
];

export default function BengaluruPride() {
  const { locale } = useI18n();
  const l = (values: { en: string; kn: string; hi: string; ta: string }) => pickLocalizedValue(locale, values);

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

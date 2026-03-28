"use client";

import Link from 'next/link';
import InlineSourceBadges from '@/components/InlineSourceBadges';
import { useI18n } from '@/lib/i18n/I18nProvider';
import { pickLocalizedValue } from '@/lib/i18n/messages';

const cards = [
  {
    id: 'what-is-kwin',
    number: '01',
    title: {
      en: 'What is KWIN City?',
      kn: 'KWIN City ಎಂದರೇನು?',
      hi: 'KWIN City क्या है?',
      ta: 'KWIN City என்பது என்ன?',
    },
    body: {
      en: 'A proposed North Bengaluru township framed around three pillars - Knowledge, Wellbeing, and Innovation. Learn what makes it ambitious and what still awaits public confirmation.',
      kn: 'ಜ್ಞಾನ, ಕ್ಷೇಮ ಮತ್ತು ನವೀನತೆ ಎಂಬ ಮೂರು ಸ್ತಂಭಗಳ ಮೇಲೆ ರೂಪುಗೊಂಡ ಉತ್ತರ ಬೆಂಗಳೂರಿನ ಪ್ರಸ್ತಾಪಿತ ಟೌನ್‌ಶಿಪ್. ಇದರ ಮಹತ್ವವೇನು ಮತ್ತು ಇನ್ನೂ ಯಾವುದು ಸಾರ್ವಜನಿಕ ದೃಢೀಕರಣಕ್ಕಾಗಿ ಬಾಕಿಯಿದೆ ಎಂಬುದನ್ನು ತಿಳಿಯಿರಿ.',
      hi: 'ज्ञान, कल्याण और नवाचार के तीन स्तंभों पर आधारित नॉर्थ बेंगलुरु की प्रस्तावित टाउनशिप। जानें इसे महत्वाकांक्षी क्या बनाता है और क्या अब भी सार्वजनिक पुष्टि की प्रतीक्षा में है।',
      ta: 'அறிவு, நலன், புதுமை என்ற மூன்று தூண்களால் வடிவமைக்கப்பட்ட வட பெங்களூருவின் முன்மொழியப்பட்ட டவுன்ஷிப். இதை தனித்துவமாக்குவது என்ன, இன்னும் எந்த அம்சங்கள் பொதுத் உறுதிப்பாட்டுக்காக காத்திருக்கின்றன என்பதை அறியுங்கள்.',
    },
    href: '/about',
    cta: {
      en: 'Discover the vision',
      kn: 'ದೃಷ್ಟಿಕೋನ ತಿಳಿಯಿರಿ',
      hi: 'विजन जानें',
      ta: 'காட்சியை அறியவும்',
    },
    sourceIds: ['brief', 'kiadb'],
    accentBarClass: 'bg-[#F5A623]',
    numberClass: 'text-[#F5A623]/30',
    ctaClass: 'text-[#F5A623]',
  },
  {
    id: 'why-north-bengaluru',
    number: '02',
    title: {
      en: 'Why North Bengaluru?',
      kn: 'ಯಾಕೆ ಉತ್ತರ ಬೆಂಗಳೂರು?',
      hi: 'नॉर्थ बेंगलुरु क्यों?',
      ta: 'ஏன் வட பெங்களூரு?',
    },
    body: {
      en: "Bengaluru's northern corridor is a real, growing, infrastructure-backed region. Explore the airport data, corridor planning, hydrology, and economic evidence that make KWIN's location compelling.",
      kn: 'ಬೆಂಗಳೂರು ಉತ್ತರ ಕಾರಿಡಾರ್ ನಿಜವಾದ, ಬೆಳೆಯುತ್ತಿರುವ, ಮೂಲಸೌಕರ್ಯ ಬೆಂಬಲಿತ ಪ್ರದೇಶವಾಗಿದೆ. KWIN ಸ್ಥಳದ ಮಹತ್ವವನ್ನು ತೋರಿಸುವ ವಿಮಾನ ನಿಲ್ದಾಣದ ಡೇಟಾ, ಕಾರಿಡಾರ್ ಯೋಜನೆ, ಜಲಶಾಸ್ತ್ರ ಮತ್ತು ಆರ್ಥಿಕ ಸಾಕ್ಷ್ಯಗಳನ್ನು ಅನ್ವೇಷಿಸಿ.',
      hi: 'बेंगलुरु का उत्तरी कॉरिडोर एक वास्तविक, तेजी से बढ़ता और अवसंरचना-समर्थित क्षेत्र है। KWIN के स्थान को प्रभावी बनाने वाले एयरपोर्ट डेटा, कॉरिडोर प्लानिंग, जलविज्ञान और आर्थिक साक्ष्य देखें।',
      ta: 'பெங்களூருவின் வடக்கு காரிடார் வளர்ச்சியடைந்து வரும், அடிக்கட்டு ஆதரவு கொண்ட உண்மையான பிராந்தியம். KWIN இடத்தின் வலிமையை நிரூபிக்கும் விமான நிலையத் தரவு, காரிடார் திட்டமிடல், நீரியல் மற்றும் பொருளாதார ஆதாரங்களை ஆராயுங்கள்.',
    },
    href: '/why-north-bengaluru',
    cta: {
      en: 'See the regional case',
      kn: 'ಪ್ರಾದೇಶಿಕ ಪ್ರಕರಣ ನೋಡಿ',
      hi: 'क्षेत्रीय आधार देखें',
      ta: 'பிராந்திய ஆதாரத்தை பார்க்கவும்',
    },
    sourceIds: ['aviation', 'strr', 'economicSurvey'],
    accentBarClass: 'bg-[#06B6D4]',
    numberClass: 'text-[#06B6D4]/30',
    ctaClass: 'text-[#06B6D4]',
  },
  {
    id: 'trust-research',
    number: '03',
    title: {
      en: 'Can I trust the research?',
      kn: 'ಈ ಸಂಶೋಧನೆ ನಂಬಿಕಸ್ಥವೇ?',
      hi: 'क्या मैं इस शोध पर भरोसा कर सकता/सकती हूं?',
      ta: 'இந்த ஆய்வை நான் நம்பலாமா?',
    },
    body: {
      en: "Yes - and here's why. Every claim is labeled as confirmed, proposed, or contextual. This portal is built so you always know exactly what evidence is behind each statement.",
      kn: 'ಹೌದು - ಅದರ ಕಾರಣ ಇಲ್ಲಿದೆ. ಪ್ರತಿಯೊಂದು ಹೇಳಿಕೆಯನ್ನು ದೃಢೀಕೃತ, ಪ್ರಸ್ತಾಪಿತ ಅಥವಾ ಸಂದರ್ಭಾತ್ಮಕ ಎಂದು ಲೇಬಲ್ ಮಾಡಲಾಗಿದೆ. ಪ್ರತಿಯೊಂದು ಹೇಳಿಕೆಯ ಹಿಂದೆ ಯಾವ ಸಾಕ್ಷ್ಯವಿದೆ ಎಂಬುದು ನಿಮಗೆ ಸ್ಪಷ್ಟವಾಗಿ ತಿಳಿಯುವಂತೆ ಈ ಪೋರ್ಟಲ್ ನಿರ್ಮಿಸಲಾಗಿದೆ.',
      hi: 'हां - और यही कारण है। हर दावे को पुष्टि किए गए, प्रस्तावित, या संदर्भात्मक रूप में चिह्नित किया गया है। यह पोर्टल इस तरह बनाया गया है कि हर कथन के पीछे कौन सा साक्ष्य है, यह आपको हमेशा स्पष्ट रहे।',
      ta: 'ஆம் - அதற்கான காரணம் இதுதான். ஒவ்வொரு கூற்றும் உறுதி செய்யப்பட்டதா, முன்மொழிவா, அல்லது சூழல் தகவலா என குறிக்கப்படுகிறது. ஒவ்வொரு கருத்துக்குப் பின்னுள்ள ஆதாரம் தெளிவாகத் தெரியும் வகையில் இந்த தளம் வடிவமைக்கப்பட்டுள்ளது.',
    },
    href: '/sources',
    cta: {
      en: 'Open the claim ledger',
      kn: 'ಹೇಳಿಕೆ ಲೆಡ್ಜರ್ ತೆರೆಯಿರಿ',
      hi: 'क्लेम लेजर खोलें',
      ta: 'கூற்று பதிவேட்டைத் திறக்கவும்',
    },
    sourceIds: ['brief', 'kiadb'],
    accentBarClass: 'bg-[#10B981]',
    numberClass: 'text-[#10B981]/30',
    ctaClass: 'text-[#10B981]',
  },
];

export default function HomeSummary() {
  const { locale } = useI18n();
  const l = (values: Parameters<typeof pickLocalizedValue<string>>[1]) => pickLocalizedValue(locale, values);

  return (
    <section className="section bg-white">
      <div className="container">
        <div className="max-w-3xl mb-12">
          <div className="eyebrow text-[#E8A020] mb-3">
            {l({ en: 'Welcome', kn: 'ಸ್ವಾಗತ', hi: 'स्वागत', ta: 'வரவேற்பு' })}
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-5 leading-tight">
            {l({
              en: 'Your complete guide to',
              kn: 'ನಿಮ್ಮ ಸಂಪೂರ್ಣ ಮಾರ್ಗದರ್ಶಿ',
              hi: 'आपकी संपूर्ण गाइड',
              ta: 'உங்கள் முழுமையான வழிகாட்டி',
            })}{' '}
            <span className="bg-gradient-to-r from-[#E8A020] to-[#F5C050] bg-clip-text text-transparent">
              {l({ en: 'KWIN City.', kn: 'KWIN City.', hi: 'KWIN City.', ta: 'KWIN City.' })}
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl leading-relaxed">
            {l({
              en: 'Whether you came to understand the vision, examine the evidence, or explore the region, everything you need is here. Start with the three most common questions.',
              kn: 'ದೃಷ್ಟಿಕೋನವನ್ನು ಅರ್ಥಮಾಡಿಕೊಳ್ಳಲು, ಸಾಕ್ಷ್ಯವನ್ನು ಪರಿಶೀಲಿಸಲು ಅಥವಾ ಪ್ರದೇಶವನ್ನು ಅನ್ವೇಷಿಸಲು ನೀವು ಬಂದಿದ್ದರೂ, ನಿಮಗೆ ಬೇಕಾದ ಎಲ್ಲವೂ ಇಲ್ಲಿ ಇದೆ. ಸಾಮಾನ್ಯವಾಗಿ ಕೇಳುವ ಮೂರು ಪ್ರಶ್ನೆಗಳೊಂದಿಗೆ ಆರಂಭಿಸಿ.',
              hi: 'चाहे आप विजन समझने आए हों, साक्ष्य देखना चाहते हों, या क्षेत्र का अध्ययन करना चाहते हों, आपको जो चाहिए वह सब यहां है। तीन सबसे सामान्य सवालों से शुरू करें।',
              ta: 'காட்சியைப் புரிந்துகொள்ள, ஆதாரங்களைச் சோதிக்க, அல்லது பிராந்தியத்தை ஆராய வந்திருந்தாலும், உங்களுக்கு தேவையான அனைத்தும் இங்கே உள்ளது. மிக பொதுவான மூன்று கேள்விகளிலிருந்து தொடங்குங்கள்.',
            })}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {cards.map((card) => (
            <div
              key={card.id}
              className="group relative flex flex-col rounded-2xl border border-gray-200 bg-white p-7 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 overflow-hidden"
            >
              {/* Accent line */}
              <div
                className={`absolute top-0 left-0 right-0 h-1 rounded-t-2xl ${card.accentBarClass}`}
              />

              <div className="mb-5">
                <span className={`text-4xl font-extrabold ${card.numberClass}`}>
                  {card.number}
                </span>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-3">{l(card.title)}</h3>
              <p className="text-gray-600 leading-7 flex-1 mb-5">{l(card.body)}</p>

              {/* Source badges sit above the stretched link via z-10 */}
              <div className="relative z-10 mb-4">
                <InlineSourceBadges sourceIds={card.sourceIds} />
              </div>

              <div className={`flex items-center gap-2 font-bold text-sm ${card.ctaClass}`}>
                {/* Stretched link covers the whole card; source badges sit above it */}
                <Link
                  href={card.href}
                  className="after:absolute after:inset-0 after:rounded-2xl focus-visible:after:outline focus-visible:after:outline-2 focus-visible:after:outline-current"
                >
                  {l(card.cta)}
                </Link>
                <svg
                  className="w-4 h-4 transition-transform group-hover:translate-x-1"
                  fill="none" stroke="currentColor" viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

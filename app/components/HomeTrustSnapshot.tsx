'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useI18n } from '@/lib/i18n/I18nProvider';
import { pickLocalizedValue } from '@/lib/i18n/messages';

const columns = [
  {
    id: 'confirmed-context',
    status: {
      en: 'Confirmed Context',
      kn: 'ದೃಢೀಕೃತ ಸಂದರ್ಭ',
      hi: 'पुष्ट संदर्भ',
      ta: 'உறுதிப்படுத்தப்பட்ட சூழல்',
    },
    icon: '✓',
    items: [
      {
        en: 'KIADB is the institutional anchor for project confirmation.',
        kn: 'ಯೋಜನೆ ದೃಢೀಕರಣಕ್ಕೆ KIADB ಸಂಸ್ಥಾತ್ಮಕ ಆಧಾರವಾಗಿದೆ.',
        hi: 'परियोजना पुष्टि के लिए KIADB संस्थागत आधार है।',
        ta: 'திட்ட உறுதிப்பாட்டிற்கான நிறுவன ஆதாரமாக KIADB உள்ளது.',
      },
      {
        en: 'The broader North Bengaluru region shows real infrastructure momentum.',
        kn: 'ವಿಶಾಲ ಉತ್ತರ ಬೆಂಗಳೂರು ಪ್ರದೇಶದಲ್ಲಿ ನಿಜವಾದ ಮೂಲಸೌಕರ್ಯ ವೇಗ ಗೋಚರಿಸುತ್ತಿದೆ.',
        hi: 'वृहद नॉर्थ बेंगलुरु क्षेत्र में वास्तविक अवसंरचनात्मक गति दिखाई देती है।',
        ta: 'விரிவான வட பெங்களூரு பகுதியில் உண்மையான அடிக்கட்டு முன்னேற்றம் தெளிவாக உள்ளது.',
      },
      {
        en: 'Regional open data from Karnataka and GoI substantiates the setting.',
        kn: 'ಕರ್ನಾಟಕ ಮತ್ತು ಭಾರತ ಸರ್ಕಾರದ ಪ್ರಾದೇಶಿಕ ಮುಕ್ತ ಡೇಟಾ ಈ ಪರಿಸ್ಥಿತಿಯನ್ನು ಸಮರ್ಥಿಸುತ್ತದೆ.',
        hi: 'कर्नाटक और भारत सरकार के क्षेत्रीय ओपन डेटा इस संदर्भ को पुष्ट करते हैं।',
        ta: 'கர்நாடகா மற்றும் இந்திய அரசின் பிராந்திய திறந்த தரவுகள் இந்த சூழலை உறுதிப்படுத்துகின்றன.',
      },
    ],
    bg: 'bg-emerald-50',
    border: 'border-emerald-200',
    iconBg: 'bg-emerald-100',
    iconColor: 'text-emerald-700',
    headingColor: 'text-emerald-800',
  },
  {
    id: 'project-proposal',
    status: {
      en: 'Project Proposal',
      kn: 'ಯೋಜನಾ ಪ್ರಸ್ತಾವನೆ',
      hi: 'परियोजना प्रस्ताव',
      ta: 'திட்ட முன்மொழிவு',
    },
    icon: '◇',
    items: [
      {
        en: 'Acreage, investment, jobs, and phase timelines are from the project brief.',
        kn: 'ಎಕರೆ, ಹೂಡಿಕೆ, ಉದ್ಯೋಗಗಳು ಮತ್ತು ಹಂತಗಳ ಕಾಲರೇಖೆ ಯೋಜನಾ ಸಂಕ್ಷಿಪ್ತದಿಂದ ಪಡೆಯಲಾಗಿದೆ.',
        hi: 'एकड़, निवेश, नौकरियां और चरणवार समय-रेखा परियोजना ब्रीफ से ली गई हैं।',
        ta: 'ஏக்கர் அளவு, முதலீடு, வேலைவாய்ப்பு மற்றும் கட்டங்களின் காலவரிசை திட்டக் குறிப்பில் இருந்து பெறப்பட்டவை.',
      },
      {
        en: 'University and hospital partnerships are aspirational pending public disclosure.',
        kn: 'ವಿಶ್ವವಿದ್ಯಾಲಯ ಮತ್ತು ಆಸ್ಪತ್ರೆ ಪಾಲುದಾರಿಕೆಗಳು ಸಾರ್ವಜನಿಕ ಬಹಿರಂಗೀಕರಣ ಬಾಕಿಯಿರುವ ಆಶಯಾತ್ಮಕ ಅಂಶಗಳಾಗಿವೆ.',
        hi: 'विश्वविद्यालय और अस्पताल साझेदारियां सार्वजनिक खुलासे तक आकांक्षात्मक दावे हैं।',
        ta: 'பல்கலைக்கழகம் மற்றும் மருத்துவமனை கூட்டாண்மைகள் பொதுவெளி அறிவிப்பு வரும் வரை நோக்கமூட்டும் கூறுகளாகும்.',
      },
      {
        en: 'Sector clusters and innovation districts await formal KIADB confirmation.',
        kn: 'ಕ್ಷೇತ್ರ ಕ್ಲಸ್ಟರ್‌ಗಳು ಮತ್ತು ನವೀನತೆ ಜಿಲ್ಲೆಗಳು ಅಧಿಕೃತ KIADB ದೃಢೀಕರಣಕ್ಕಾಗಿ ಕಾಯುತ್ತಿವೆ.',
        hi: 'क्षेत्रीय क्लस्टर और नवाचार जिले औपचारिक KIADB पुष्टि की प्रतीक्षा में हैं।',
        ta: 'துறை க்ளஸ்டர்கள் மற்றும் புதுமை மாவட்டங்கள் அதிகாரப்பூர்வ KIADB உறுதிப்பாட்டுக்காக காத்திருக்கின்றன.',
      },
    ],
    bg: 'bg-amber-50',
    border: 'border-amber-200',
    iconBg: 'bg-amber-100',
    iconColor: 'text-amber-700',
    headingColor: 'text-amber-800',
  },
  {
    id: 'regional-evidence',
    status: {
      en: 'Regional Evidence',
      kn: 'ಪ್ರಾದೇಶಿಕ ಸಾಕ್ಷ್ಯ',
      hi: 'क्षेत्रीय साक्ष्य',
      ta: 'பிராந்திய ஆதாரம்',
    },
    icon: '◉',
    items: [
      {
        en: "Airport traffic data confirms North Bengaluru's connectivity advantage.",
        kn: 'ವಿಮಾನ ನಿಲ್ದಾಣ ಸಂಚಾರ ಡೇಟಾ ಉತ್ತರ ಬೆಂಗಳೂರಿನ ಸಂಪರ್ಕದ ಮೇಲುಗೈಯನ್ನು ದೃಢೀಕರಿಸುತ್ತದೆ.',
        hi: 'एयरपोर्ट ट्रैफिक डेटा नॉर्थ बेंगलुरु की कनेक्टिविटी बढ़त की पुष्टि करता है।',
        ta: 'விமான நிலைய போக்குவரத்து தரவு வட பெங்களூருவின் இணைப்பு முன்னிலையை உறுதிப்படுத்துகிறது.',
      },
      {
        en: 'STRR and IRR documents validate the corridor-led growth narrative.',
        kn: 'STRR ಮತ್ತು IRR ದಾಖಲೆಗಳು ಕಾರಿಡಾರ್ ಆಧಾರಿತ ಬೆಳವಣಿಗೆ ಕಥನವನ್ನು ಸಮರ್ಥಿಸುತ್ತವೆ.',
        hi: 'STRR और IRR दस्तावेज़ कॉरिडोर-आधारित विकास कथा को सत्यापित करते हैं।',
        ta: 'STRR மற்றும் IRR ஆவணங்கள் காரிடார் இயக்கும் வளர்ச்சி விளக்கத்தை உறுதிப்படுத்துகின்றன.',
      },
      {
        en: 'Growth-trajectory, groundwater, and lake-governance datasets make key claims testable.',
        kn: 'ಬೆಳವಣಿಗೆ ಪ್ರಗತಿ, ಭೂಗತಜಲ ಮತ್ತು ಸರೋವರ ಆಡಳಿತ ಡೇಟಾಸೆಟ್‌ಗಳು ಪ್ರಮುಖ ಹೇಳಿಕೆಗಳನ್ನು ಪರೀಕ್ಷಿಸಬಹುದಾಗಿಸುತ್ತವೆ.',
        hi: 'विकास-प्रवृत्ति, भूजल और झील-प्रशासन डेटा सेट प्रमुख दावों को परीक्षण योग्य बनाते हैं।',
        ta: 'வளர்ச்சி போக்கு, நிலத்தடி நீர் மற்றும் ஏரி ஆட்சி தரவுத்தொகுப்புகள் முக்கிய கூற்றுகளை சோதிக்கக்கூடியதாக மாற்றுகின்றன.',
      },
    ],
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-700',
    headingColor: 'text-blue-800',
  },
];

export default function HomeTrustSnapshot() {
  const { locale } = useI18n();
  const l = (values: { en: string; kn: string; hi: string; ta: string }) => pickLocalizedValue(locale, values);

  return (
    <section className="section bg-[linear-gradient(160deg,#F8FAFC_0%,#FFFFFF_100%)]">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-3xl mb-12"
        >
          <div className="eyebrow text-[#E8A020] mb-3">
            {l({ en: 'Our Commitment to You', kn: 'ನಿಮಗೆ ನಮ್ಮ ಬದ್ಧತೆ', hi: 'आपके प्रति हमारी प्रतिबद्धता', ta: 'உங்களுக்கான எங்கள் உறுதி' })}
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-5 leading-tight">
            {l({
              en: "We don't just present the vision.",
              kn: 'ನಾವು ಕೇವಲ ದೃಷ್ಟಿಕೋನವನ್ನು ಮಾತ್ರ ನೀಡುವುದಿಲ್ಲ.',
              hi: 'हम केवल विजन प्रस्तुत नहीं करते।',
              ta: 'நாங்கள் காட்சியை மட்டும் காட்டுவதில்லை.',
            })}{' '}
            <span className="bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
              {l({ en: 'We show you the evidence.', kn: 'ನಾವು ನಿಮಗೆ ಸಾಕ್ಷ್ಯ ತೋರಿಸುತ್ತೇವೆ.', hi: 'हम आपको साक्ष्य दिखाते हैं।', ta: 'நாங்கள் உங்களுக்கு ஆதாரத்தை காட்டுகிறோம்.' })}
            </span>
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed max-w-2xl">
            {l({
              en: 'Every claim on this portal is labeled. Confirmed facts, project proposals, and regional context are always clearly distinguished because the right way to build confidence is with transparency.',
              kn: 'ಈ ಪೋರ್ಟಲ್‌ನ ಪ್ರತಿಯೊಂದು ಹೇಳಿಕೆಯೂ ಲೇಬಲ್ ಮಾಡಲಾಗಿದೆ. ದೃಢೀಕೃತ ಅಂಶಗಳು, ಯೋಜನಾ ಪ್ರಸ್ತಾವನೆಗಳು ಮತ್ತು ಪ್ರಾದೇಶಿಕ ಸಂದರ್ಭವು ಯಾವಾಗಲೂ ಸ್ಪಷ್ಟವಾಗಿ ಬೇರ್ಪಡಿಸಲಾಗುತ್ತದೆ, ಏಕೆಂದರೆ ನಂಬಿಕೆ ನಿರ್ಮಿಸಲು ಪಾರದರ್ಶಕತೆಯೇ ಸರಿಯಾದ ಮಾರ್ಗ.',
              hi: 'इस पोर्टल पर हर दावे को लेबल किया गया है। पुष्ट तथ्य, परियोजना प्रस्ताव और क्षेत्रीय संदर्भ हमेशा स्पष्ट रूप से अलग दिखाए जाते हैं, क्योंकि भरोसा बनाने का सही तरीका पारदर्शिता है।',
              ta: 'இந்த தளத்தில் உள்ள ஒவ்வொரு கூற்றும் குறிச்சொல்லிடப்பட்டுள்ளது. உறுதிப்படுத்தப்பட்ட தகவல், திட்ட முன்மொழிவு, பிராந்திய சூழல் ஆகியவை தெளிவாக வேறுபடுத்தப்படுகின்றன, ஏனெனில் நம்பிக்கையை உருவாக்குவதற்கான சரியான வழி வெளிப்படைத்தன்மை.',
            })}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
          {columns.map((col, idx) => (
            <motion.article
              key={col.id}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className={`rounded-2xl border ${col.border} ${col.bg} p-7`}
            >
              <div className={`inline-flex items-center justify-center w-10 h-10 rounded-xl mb-5 text-lg font-bold ${col.iconBg} ${col.iconColor}`}>
                {col.icon}
              </div>
              <h3 className={`text-xl font-bold mb-4 ${col.headingColor}`}>{l(col.status)}</h3>
              <ul className="space-y-3">
                {col.items.map((item) => (
                  <li key={item.en} className="flex gap-3 text-sm text-gray-700 leading-6">
                    <span className="mt-1 shrink-0 w-1.5 h-1.5 rounded-full bg-gray-400" />
                    {l(item)}
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl border border-gray-200 bg-white px-7 py-5 shadow-sm"
        >
          <p className="text-sm text-gray-600">
            <strong className="text-gray-900">
              {l({ en: 'Want to see every source?', kn: 'ಪ್ರತಿಯೊಂದು ಮೂಲವನ್ನೂ ನೋಡಬೇಕೇ?', hi: 'हर स्रोत देखना चाहते हैं?', ta: 'ஒவ்வொரு மூலத்தையும் பார்க்க விரும்புகிறீர்களா?' })}
            </strong>{' '}
            {l({
              en: 'The full claim ledger lists every statement side-by-side with its source, publisher, and verification status.',
              kn: 'ಪೂರ್ಣ ಹೇಳಿಕೆ ಲೆಡ್ಜರ್‌ನಲ್ಲಿ ಪ್ರತಿಯೊಂದು ಹೇಳಿಕೆಯೂ ಅದರ ಮೂಲ, ಪ್ರಕಾಶಕ ಮತ್ತು ಪರಿಶೀಲನಾ ಸ್ಥಿತಿಯೊಂದಿಗೆ ತೋರಿಸಲಾಗುತ್ತದೆ.',
              hi: 'पूर्ण क्लेम लेजर में हर कथन उसके स्रोत, प्रकाशक और सत्यापन स्थिति के साथ दिखाया गया है।',
              ta: 'முழு கூற்று பதிவேட்டில் ஒவ்வொரு கூறும் அதன் மூலம், வெளியீட்டாளர் மற்றும் சரிபார்ப்பு நிலை உடன் காண்பிக்கப்படுகிறது.',
            })}
          </p>
          <Link href="/sources" className="shrink-0 btn btn-primary">
            {l({ en: 'Open Claim Ledger', kn: 'ಹೇಳಿಕೆ ಲೆಡ್ಜರ್ ತೆರೆಯಿರಿ', hi: 'क्लेम लेजर खोलें', ta: 'கூற்று பதிவேட்டை திறக்கவும்' })}
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

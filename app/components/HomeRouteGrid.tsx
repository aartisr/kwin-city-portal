'use client';

import Link from 'next/link';
import { useI18n } from '@/lib/i18n/I18nProvider';
import { pickLocalizedValue } from '@/lib/i18n/messages';

const routes = [
  {
    id: 'trust-center',
    icon: '🛡️',
    title: { en: 'Trust Center', kn: 'ವಿಶ್ವಾಸ ಕೇಂದ್ರ', hi: 'ट्रस्ट सेंटर', ta: 'நம்பிக்கை மையம்' },
    href: '/trust',
    summary: {
      en: 'The public protocol for authenticity: verification tiers, originality boundaries, attribution standards, and open auditability.',
      kn: 'ಪ್ರಮಾಣಿಕತೆಗೆ ಸಾರ್ವಜನಿಕ ಪ್ರೋಟೋಕಾಲ್: ಪರಿಶೀಲನಾ ಹಂತಗಳು, ಮೂಲತತ್ವ ಗಡಿಗಳು, ಮೂಲೋಕ್ತಿಯ ಮಾನದಂಡಗಳು ಮತ್ತು ಮುಕ್ತ ಪರಿಶೀಲನೆ ಸಾಧ್ಯತೆ.',
      hi: 'प्रामाणिकता के लिए सार्वजनिक प्रोटोकॉल: सत्यापन स्तर, मौलिकता सीमाएं, एट्रिब्यूशन मानक और खुली ऑडिटयोग्यता।',
      ta: 'உண்மைத்தன்மைக்கான பொது நெறிமுறை: சரிபார்ப்பு நிலைகள், மூலத்தன்மை வரம்புகள், மேற்கோள் தரநிலைகள் மற்றும் திறந்த ஆய்வுத் திறன்.',
    },
    iconBgClass: 'bg-[#14B8A6]/15',
    linkClass: 'text-[#14B8A6]',
  },
  {
    id: 'news-intelligence',
    icon: '🗞️',
    title: { en: 'News Intelligence', kn: 'ಸುದ್ದಿ ಇಂಟೆಲಿಜೆನ್ಸ್', hi: 'न्यूज़ इंटेलिजेंस', ta: 'செய்தி நுண்ணறிவு' },
    href: '/news-intelligence',
    summary: {
      en: 'A credibility-first media observatory for KWIN with explicit attribution, verification tiers, and transparent boundaries between signal and proof.',
      kn: 'KWINಗಾಗಿ ನಂಬಿಕೆ-ಮುನ್ನಡೆ ಮಾಧ್ಯಮ ವೀಕ್ಷಣಾಲಯ; ಸ್ಪಷ್ಟ ಮೂಲೋಕ್ತಿ, ಪರಿಶೀಲನಾ ಹಂತಗಳು, ಮತ್ತು ಸೂಚನೆ ಹಾಗೂ ಸಾಕ್ಷ್ಯದ ನಡುವಿನ ಪಾರದರ್ಶಕ ಗಡಿಗಳೊಂದಿಗೆ.',
      hi: 'KWIN के लिए विश्वसनीयता-प्रथम मीडिया ऑब्जर्वेटरी, जिसमें स्पष्ट एट्रिब्यूशन, सत्यापन स्तर और संकेत व प्रमाण के बीच पारदर्शी सीमाएं हैं।',
      ta: 'KWIN க்கான நம்பகத்தன்மை மைய செய்தி கண்காணிப்பு அமைப்பு; தெளிவான மேற்கோள், சரிபார்ப்பு நிலைகள், குறிகாட்டி மற்றும் ஆதாரத்திற்கிடையேயான வெளிப்படையான எல்லைகளுடன்.',
    },
    iconBgClass: 'bg-[#0EA5E9]/15',
    linkClass: 'text-[#0EA5E9]',
  },
  {
    id: 'about-kwin',
    icon: '🏙️',
    title: { en: 'About KWIN', kn: 'KWIN ಬಗ್ಗೆ', hi: 'KWIN के बारे में', ta: 'KWIN பற்றி' },
    href: '/about',
    summary: {
      en: 'The full picture of what KWIN City is: its three pillars, institutional framework, and how this portal interprets the proposal.',
      kn: 'KWIN City ಎಂದರೇನು ಎಂಬುದರ ಪೂರ್ಣ ಚಿತ್ರ: ಅದರ ಮೂರು ಸ್ತಂಭಗಳು, ಸಂಸ್ಥಾತ್ಮಕ ಚೌಕಟ್ಟು ಮತ್ತು ಈ ಪೋರ್ಟಲ್ ಯೋಜನೆಯನ್ನು ಹೇಗೆ ಓದುತ್ತದೆ.',
      hi: 'KWIN City का पूर्ण चित्र: इसके तीन स्तंभ, संस्थागत ढांचा और यह पोर्टल प्रस्ताव को कैसे पढ़ता है।',
      ta: 'KWIN City யின் முழு படம்: அதன் மூன்று தூண்கள், நிறுவல் கட்டமைப்பு, இந்த தளம் முன்மொழிவை எப்படிப் புரிகிறது என்பதுடன்.',
    },
    iconBgClass: 'bg-[#F5A623]/15',
    linkClass: 'text-[#F5A623]',
  },
  {
    id: 'why-region',
    icon: '🗺️',
    title: { en: 'Why North Bengaluru', kn: 'ಯಾಕೆ ಉತ್ತರ ಬೆಂಗಳೂರು', hi: 'नॉर्थ बेंगलुरु क्यों', ta: 'ஏன் வட பெங்களூரு' },
    href: '/why-north-bengaluru',
    summary: {
      en: "Aviation connectivity, ring roads, hydrology, and Karnataka's macroeconomic trajectory make a compelling regional case.",
      kn: 'ವಿಮಾನ ಸಂಪರ್ಕ, ರಿಂಗ್ ರಸ್ತೆಗಳು, ಜಲಶಾಸ್ತ್ರ, ಮತ್ತು ಕರ್ನಾಟಕದ ಸಮಗ್ರ ಆರ್ಥಿಕ ದಿಕ್ಕು ಬಲವಾದ ಪ್ರಾದೇಶಿಕ ಆಧಾರವನ್ನು ನೀಡುತ್ತದೆ.',
      hi: 'विमान कनेक्टिविटी, रिंग रोड, जलविज्ञान और कर्नाटक की व्यापक आर्थिक दिशा एक मजबूत क्षेत्रीय आधार देती है।',
      ta: 'விமான இணைப்பு, வளையச் சாலைகள், நீரியல் மற்றும் கர்நாடகாவின் பரந்த பொருளாதார திசை ஆகியவை வலுவான பிராந்திய ஆதாரத்தை வழங்குகின்றன.',
    },
    iconBgClass: 'bg-[#06B6D4]/15',
    linkClass: 'text-[#06B6D4]',
  },
  {
    id: 'timeline',
    icon: '📅',
    title: { en: 'Development Timeline', kn: 'ಅಭಿವೃದ್ಧಿ ಕಾಲರೇಖೆ', hi: 'डेवलपमेंट टाइमलाइन', ta: 'மேம்பாட்டு காலவரிசை' },
    href: '/timeline',
    summary: {
      en: 'Five phases from inauguration to city-scale operations. Explore the roadmap as a working sequence open to public review.',
      kn: 'ಉದ್ಘಾಟನೆಯಿಂದ ನಗರಮಟ್ಟದ ಕಾರ್ಯಾಚರಣೆಗಳವರೆಗೆ ಐದು ಹಂತಗಳು. ಸಾರ್ವಜನಿಕ ಪರಿಶೀಲನೆಗೆ ತೆರೆದ ಕಾರ್ಯಾತ್ಮಕ ಕ್ರಮವಾಗಿ ರಸ್ತೆನಕ್ಷೆಯನ್ನು ನೋಡಿ.',
      hi: 'उद्घाटन से शहर-स्तरीय संचालन तक पांच चरण। इस रोडमैप को सार्वजनिक समीक्षा के लिए खुली कार्य-श्रृंखला के रूप में देखें।',
      ta: 'திறப்புவிழாவிலிருந்து நகர அளவிலான செயல்பாடு வரை ஐந்து கட்டங்கள். பொதுமக்கள் ஆய்வுக்கு திறந்த பணிச்சரமாய் இந்த சாலைவரைபடத்தை பாருங்கள்.',
    },
    iconBgClass: 'bg-[#8B5CF6]/15',
    linkClass: 'text-[#8B5CF6]',
  },
  {
    id: 'sectors',
    icon: '🏭',
    title: { en: 'Industry Sectors', kn: 'ಕೈಗಾರಿಕಾ ಕ್ಷೇತ್ರಗಳು', hi: 'उद्योग क्षेत्र', ta: 'தொழில் துறைகள்' },
    href: '/sectors',
    summary: {
      en: 'Semiconductor, aerospace, health-tech, ICT, and renewable energy clusters define the industry ambition behind KWIN.',
      kn: 'ಸೆಮಿಕಂಡಕ್ಟರ್, ಏರೋಸ್ಪೇಸ್, ಆರೋಗ್ಯ ತಂತ್ರಜ್ಞಾನ, ICT ಮತ್ತು ನವೀಕರಿಸಬಹುದಾದ ಶಕ್ತಿ ಕ್ಲಸ್ಟರ್‌ಗಳು KWIN ಹಿಂದಿನ ಕೈಗಾರಿಕಾ ಮಹತ್ವಾಕಾಂಕ್ಷೆಯನ್ನು ತೋರಿಸುತ್ತವೆ.',
      hi: 'सेमिकंडक्टर, एयरोस्पेस, हेल्थ-टेक, ICT और नवीकरणीय ऊर्जा क्लस्टर KWIN की औद्योगिक महत्वाकांक्षा को दर्शाते हैं।',
      ta: 'செமிகண்டக்டர், ஏரோஸ்பேஸ், ஹெல்த்-டெக், ICT, புதுப்பிக்கத்தக்க ஆற்றல் க்ளஸ்டர்கள் KWIN இன் தொழில் முனைப்பை வரையறுக்கின்றன.',
    },
    iconBgClass: 'bg-[#EC4899]/15',
    linkClass: 'text-[#EC4899]',
  },
  {
    id: 'sustainability',
    icon: '🌿',
    title: { en: 'Sustainability', kn: 'ಸ್ಥಿರತೆಯ ದೃಷ್ಟಿ', hi: 'सस्टेनेबिलिटी', ta: 'திடத்தன்மை' },
    href: '/sustainability',
    summary: {
      en: 'Water, green cover, solar, and ecological plans are reviewed against growth trajectory, groundwater, and lake-governance data.',
      kn: 'ನೀರು, ಹಸಿರು ಆವರಣ, ಸೌರ ಮತ್ತು ಪರಿಸರ ಯೋಜನೆಗಳನ್ನು ಬೆಳವಣಿಗೆ ದಿಕ್ಕು, ಭೂಗತಜಲ ಮತ್ತು ಸರೋವರ ಆಡಳಿತ ಡೇಟಾ ವಿರುದ್ಧ ಪರಿಶೀಲಿಸಲಾಗಿದೆ.',
      hi: 'जल, हरित आवरण, सौर और पारिस्थितिक योजनाओं की समीक्षा विकास प्रवृत्ति, भूजल और झील-प्रशासन डेटा के साथ की जाती है।',
      ta: 'நீர், பசுமை மூடல், சோலார் மற்றும் சூழல் திட்டங்கள் வளர்ச்சி போக்கு, நிலத்தடி நீர், ஏரி நிர்வாகத் தரவுகளுடன் ஒப்பிட்டு ஆய்வு செய்யப்படுகின்றன.',
    },
    iconBgClass: 'bg-[#10B981]/15',
    linkClass: 'text-[#10B981]',
  },
  {
    id: 'evidence',
    icon: '🔍',
    title: { en: 'Evidence Vault', kn: 'ಸಾಕ್ಷ್ಯ ಭಂಡಾರ', hi: 'एविडेंस वॉल्ट', ta: 'ஆதார களஞ்சியம்' },
    href: '/evidence',
    summary: {
      en: 'The complete collection of regional evidence, curated and labeled with transparent limits on what each dataset can and cannot prove.',
      kn: 'ಪ್ರಾದೇಶಿಕ ಸಾಕ್ಷ್ಯಗಳ ಸಂಪೂರ್ಣ ಸಂಗ್ರಹ - ವಿಂಗಡಿಸಲ್ಪಟ್ಟ, ಲೇಬಲ್ ಮಾಡಲ್ಪಟ್ಟ ಮತ್ತು ಪ್ರತಿಯೊಂದು ಡೇಟಾಸೆಟ್ ಏನು ಸಾಬೀತು ಮಾಡಬಹುದು ಅಥವಾ ಮಾಡಲಾರದು ಎಂಬುದನ್ನು ಸ್ಪಷ್ಟವಾಗಿ ತೋರಿಸುವುದು.',
      hi: 'क्षेत्रीय साक्ष्यों का पूरा संग्रह, सुव्यवस्थित और लेबल किया गया, जिसमें हर डेटा सेट क्या सिद्ध कर सकता है और क्या नहीं, इसकी स्पष्ट सीमाएं दी गई हैं।',
      ta: 'பிராந்திய ஆதாரங்களின் முழு தொகுப்பு - தொகுக்கப்பட்டு குறிச்சொல்லிடப்பட்டதாக, ஒவ்வொரு தரவுத்தொகுப்பும் எதை நிரூபிக்க முடியும்/முடியாது என்பதை வெளிப்படையாகக் காட்டுகிறது.',
    },
    iconBgClass: 'bg-[#3B82F6]/15',
    linkClass: 'text-[#3B82F6]',
  },
];

export default function HomeRouteGrid() {
  const { locale } = useI18n();
  const l = (values: Parameters<typeof pickLocalizedValue<string>>[1]) => pickLocalizedValue(locale, values);

  return (
    <section className="section bg-gray-50">
      <div className="container">
        <div className="max-w-3xl mb-12">
          <div className="eyebrow text-[#E8A020] mb-3">
            {l({ en: 'Explore the Portal', kn: 'ಪೋರ್ಟಲ್ ಅನ್ವೇಷಿಸಿ', hi: 'पोर्टल एक्सप्लोर करें', ta: 'தளத்தை ஆராயுங்கள்' })}
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-5 leading-tight">
            {l({ en: 'Eight dimensions of', kn: 'ಎಂಟು ಆಯಾಮಗಳು', hi: 'आठ आयाम', ta: 'எட்டு பரிமாணங்கள்' })}{' '}
            <span className="bg-gradient-to-r from-[#E8A020] to-[#F5C050] bg-clip-text text-transparent">
              {l({ en: 'the KWIN story.', kn: 'KWIN ಕಥೆಯ.', hi: 'KWIN कहानी के।', ta: 'KWIN கதைப்பரப்பின்.' })}
            </span>
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed max-w-2xl">
            {l({
              en: 'The homepage gives you orientation. These eight pages give you depth, each one purpose-built for a specific type of curious visitor.',
              kn: 'ಮುಖಪುಟ ನಿಮಗೆ ದಿಕ್ಕು ನೀಡುತ್ತದೆ. ಈ ಎಂಟು ಪುಟಗಳು ಆಳತೆಯನ್ನು ನೀಡುತ್ತವೆ; ಪ್ರತಿಯೊಂದು ಪುಟವೂ ವಿಭಿನ್ನ ರೀತಿಯ ಕುತೂಹಲಕಾರಿ ಬಳಕೆದಾರರಿಗಾಗಿ ರೂಪಿಸಲಾಗಿದೆ.',
              hi: 'होमपेज आपको दिशा देता है। ये आठ पेज गहराई देते हैं, और हर पेज एक खास तरह के जिज्ञासु उपयोगकर्ता के लिए बनाया गया है।',
              ta: 'முகப்புப் பக்கம் உங்களுக்கு வழிகாட்டலை அளிக்கிறது. இந்த எட்டு பக்கங்கள் ஆழமான புரிதலை வழங்குகின்றன; ஒவ்வொன்றும் வேறு வகை ஆர்வமுள்ள பயனாளருக்காக உருவாக்கப்பட்டுள்ளது.',
            })}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {routes.map((route) => (
            <Link
              key={route.id}
              href={route.href}
              className="group flex flex-col rounded-2xl border border-gray-200 bg-white p-7 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
            >
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-5 ${route.iconBgClass}`}
              >
                {route.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{l(route.title)}</h3>
              <p className="text-gray-600 leading-7 flex-1 mb-5">{l(route.summary)}</p>
              <div
                className={`flex items-center gap-2 text-sm font-bold transition-colors ${route.linkClass}`}
              >
                {l({ en: 'Explore page', kn: 'ಪುಟ ನೋಡಿ', hi: 'पेज देखें', ta: 'பக்கத்தை பார்க்கவும்' })}
                <svg
                  className="w-4 h-4 transition-transform group-hover:translate-x-1"
                  fill="none" stroke="currentColor" viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

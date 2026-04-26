import { SITE_CONFIG } from '@/config/site.config';
import {
  getLocaleDefinition,
  pickLocalizedValue,
  translate,
  type Locale,
} from '@/lib/i18n/messages';
import type { FooterContentModel, FooterGroup, FooterLinkItem, FooterSignalCard, FooterTrustCard } from '@/components/footer/types';

export function buildFooterContent(locale: Locale): FooterContentModel {
  const t = (key: string) => translate(locale, key);
  const l = (values: Parameters<typeof pickLocalizedValue<string>>[1]) => pickLocalizedValue(locale, values);
  const lastUpdatedText = new Date(SITE_CONFIG.lastUpdatedISO).toLocaleDateString(getLocaleDefinition(locale).htmlLang, {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

  const quickRoutes: FooterLinkItem[] = [
    {
      href: '/about',
      label: t('header.items./about.label'),
      desc: l({
        en: 'Start with the high-level vision and structure.',
        kn: 'ಉನ್ನತ ಮಟ್ಟದ ದೃಷ್ಟಿಕೋನ ಮತ್ತು ರಚನೆಯಿಂದ ಪ್ರಾರಂಭಿಸಿ.',
        hi: 'उच्च-स्तरीय दृष्टि और संरचना से शुरुआत करें।',
        ta: 'மேல்நிலை நோக்கும் அமைப்பும் இங்கிருந்து தொடங்குங்கள்.',
      }),
    },
    {
      href: '/data-insights',
      label: t('header.items./data-insights.label'),
      desc: l({
        en: 'See the evidence layer and dashboards first.',
        kn: 'ಮೊದಲಿಗೆ ಸಾಕ್ಷ್ಯ ಪದರ ಮತ್ತು ಡ್ಯಾಶ್‌ಬೋರ್ಡ್‌ಗಳನ್ನು ನೋಡಿ.',
        hi: 'पहले एविडेंस लेयर और डैशबोर्ड देखें।',
        ta: 'முதலில் ஆதார அடுக்கு மற்றும் டாஷ்போர்ட்களை பாருங்கள்.',
      }),
    },
    {
      href: '/trust',
      label: t('header.items./trust.label'),
      desc: l({
        en: 'Understand how claims, sources, and originality are handled.',
        kn: 'ಹೇಳಿಕೆಗಳು, ಮೂಲಗಳು ಮತ್ತು ಮೂಲತತ್ವವನ್ನು ಹೇಗೆ ನಿರ್ವಹಿಸಲಾಗುತ್ತದೆ ಎಂಬುದನ್ನು ತಿಳಿಯಿರಿ.',
        hi: 'समझें कि दावे, स्रोत और मौलिकता कैसे संभाली जाती है।',
        ta: 'கூற்றுகள், ஆதாரங்கள், இயல்புத்தன்மை எப்படி கையாளப்படுகின்றன என்பதை அறியுங்கள்.',
      }),
    },
    {
      href: '/sources',
      label: t('header.items./sources.label'),
      desc: l({
        en: 'Review the claim-to-source ledger directly.',
        kn: 'ಹೇಳಿಕೆ-ಮೂಲ ಲೆಡ್ಜರ್ ಅನ್ನು ನೇರವಾಗಿ ಪರಿಶೀಲಿಸಿ.',
        hi: 'क्लेम-टू-सोर्स लेजर को सीधे देखें।',
        ta: 'கூற்று-மூலம் பதிவேட்டை நேரடியாகப் பாருங்கள்.',
      }),
      accent: true,
    },
  ];

  const signalCards: FooterSignalCard[] = [
    {
      eyebrow: l({ en: 'Scale', kn: 'ಪ್ರಮಾಣ', hi: 'पैमाना', ta: 'அளவு' }),
      title: l({ en: '465-acre proposed district', kn: '465 ಏಕರೆ ಪ್ರಸ್ತಾವಿತ ಜಿಲ್ಲೆ', hi: '465-एकड़ प्रस्तावित जिला', ta: '465 ஏக்கர் முன்மொழியப்பட்ட மாவட்டம்' }),
      body: l({
        en: 'The footer should still orient people fast: where it is, what it is, and why it matters.',
        kn: 'ಫುಟರ್ ಕೂಡವೇ ವೇಗವಾಗಿ ದಿಕ್ಕು ತೋರಿಸಬೇಕು: ಇದು ಎಲ್ಲಿ, ಏನು, ಮತ್ತು ಏಕೆ ಮಹತ್ವದ್ದೆಂದು.',
        hi: 'फुटर को भी तुरंत दिशा देनी चाहिए: यह कहाँ है, क्या है, और क्यों महत्वपूर्ण है।',
        ta: 'அடிக்குறிப்பும் வேகமாக திசை காட்ட வேண்டும்: இது எங்கே, என்ன, ஏன் முக்கியம்.',
      }),
    },
    {
      eyebrow: l({ en: 'Trust', kn: 'ವಿಶ್ವಾಸ', hi: 'विश्वास', ta: 'நம்பிக்கை' }),
      title: l({ en: 'Source-linked by default', kn: 'ಮೂಲ-ಲಿಂಕ್ ಡೀಫಾಲ್ಟ್', hi: 'डिफ़ॉल्ट रूप से स्रोत-लिंक्ड', ta: 'இயல்பாகவே மூல இணைப்பு' }),
      body: l({
        en: 'Inspired by Apple and Microsoft: dense information, but with obvious hierarchy and legal clarity.',
        kn: 'Apple ಮತ್ತು Microsoft ನಿಂದ ಪ್ರೇರಣೆ: ದಟ್ಟ ಮಾಹಿತಿ, ಆದರೆ ಸ್ಪಷ್ಟ ಹೈರಾರ್ಕಿ ಮತ್ತು ಕಾನೂನು ಸ್ಪಷ್ಟತೆ.',
        hi: 'Apple और Microsoft से प्रेरित: घनी जानकारी, लेकिन स्पष्ट पदानुक्रम और कानूनी स्पष्टता के साथ।',
        ta: 'Apple, Microsoft பாணியில்: அடர்த்தியான தகவல், ஆனால் தெளிவான அடுக்குமுறை மற்றும் சட்டத் தெளிவுடன்.',
      }),
    },
    {
      eyebrow: l({ en: 'Signal', kn: 'ಸಿಗ್ನಲ್', hi: 'सिग्नल', ta: 'சிக்னல்' }),
      title: l({ en: 'Updates, news, and evidence', kn: 'ನವೀಕರಣಗಳು, ಸುದ್ದಿ, ಮತ್ತು ಸಾಕ್ಷ್ಯ', hi: 'अपडेट्स, समाचार और साक्ष्य', ta: 'புதுப்பிப்புகள், செய்திகள், ஆதாரங்கள்' }),
      body: l({
        en: 'Inspired by Stripe and GitHub: help people choose the next useful action, not just read a link list.',
        kn: 'Stripe ಮತ್ತು GitHub ನಿಂದ ಪ್ರೇರಣೆ: ಜನರು ಮುಂದಿನ ಉಪಯುಕ್ತ ಕ್ರಮವನ್ನು ಆಯ್ಕೆಮಾಡಲು ನೆರವಾಗಬೇಕು, ಕೇವಲ ಲಿಂಕ್ ಪಟ್ಟಿಯನ್ನು ಓದಲು ಅಲ್ಲ.',
        hi: 'Stripe और GitHub से प्रेरित: लोगों को अगला उपयोगी कदम चुनने में मदद करें, सिर्फ लिंक सूची न दिखाएँ।',
        ta: 'Stripe, GitHub பாணியில்: அடுத்த பயனுள்ள செயலைத் தேர்ந்தெடுக்க உதவ வேண்டும்; வெறும் இணைப்பு பட்டியல் போதாது.',
      }),
    },
    {
      eyebrow: l({ en: 'Audience', kn: 'ಪ್ರೇಕ್ಷಕರು', hi: 'दर्शक', ta: 'பார்வையாளர்கள்' }),
      title: l({ en: 'Built for many entry points', kn: 'ಹಲವಾರು ಪ್ರವೇಶ ಬಿಂದುಗಳಿಗೆ ನಿರ್ಮಿತ', hi: 'कई प्रवेश बिंदुओं के लिए निर्मित', ta: 'பல நுழைவு பாதைகளுக்காக உருவாக்கப்பட்டது' }),
      body: l({
        en: 'Inspired by Airbnb and Notion: support different intents without making the footer feel messy.',
        kn: 'Airbnb ಮತ್ತು Notion ನಿಂದ ಪ್ರೇರಣೆ: ಫುಟರ್ ಅಸಮರ್ಪಕವಾಗಿ ಅನ್ನಿಸದಂತೆ ವಿವಿಧ ಉದ್ದೇಶಗಳನ್ನು ಬೆಂಬಲಿಸಿ.',
        hi: 'Airbnb और Notion से प्रेरित: अलग-अलग इरादों को सपोर्ट करें, बिना फुटर को अव्यवस्थित बनाए।',
        ta: 'Airbnb, Notion பாணியில்: அடிக்குறிப்பு குழப்பமாகத் தெரியாமல் பல நோக்குகளை ஆதரிக்க வேண்டும்.',
      }),
    },
  ];

  const audienceCards: FooterLinkItem[] = [
    { href: '/for/investor', label: t('header.items./for/investor.label'), desc: l({ en: 'Opportunity and risk framing', kn: 'ಅವಕಾಶ ಮತ್ತು ಅಪಾಯ ಚೌಕಟ್ಟು', hi: 'अवसर और जोखिम फ्रेमिंग', ta: 'வாய்ப்பு மற்றும் ஆபத்து கட்டமைப்பு' }) },
    { href: '/for/resident', label: t('header.items./for/resident.label'), desc: l({ en: 'Livability and community lens', kn: 'ಜೀವನಶೈಲಿ ಮತ್ತು ಸಮುದಾಯ ದೃಷ್ಟಿಕೋನ', hi: 'रहने योग्य जीवन और समुदाय का दृष्टिकोण', ta: 'வாழ்வியல் மற்றும் சமூகக் கண்ணோட்டம்' }) },
    { href: '/for/researcher', label: t('header.items./for/researcher.label'), desc: l({ en: 'Methodology and data access', kn: 'ವಿಧಾನಶಾಸ್ತ್ರ ಮತ್ತು ಡೇಟಾ ಪ್ರವೇಶ', hi: 'कार्यप्रणाली और डेटा एक्सेस', ta: 'முறை மற்றும் தரவு அணுகல்' }) },
    { href: '/for/journalist', label: t('header.items./for/journalist.label'), desc: l({ en: 'Verified angles and sources', kn: 'ದೃಢೀಕೃತ ಕೋನಗಳು ಮತ್ತು ಮೂಲಗಳು', hi: 'सत्यापित एंगल और स्रोत', ta: 'சரிபார்க்கப்பட்ட கோணங்கள் மற்றும் ஆதாரங்கள்' }) },
  ];

  const footerGroups: FooterGroup[] = [
    {
      title: t('header.groups.Discover'),
      links: [
        { href: '/about', label: t('header.items./about.label') },
        { href: '/why-north-bengaluru', label: t('header.items./why-north-bengaluru.label') },
        { href: '/timeline', label: t('header.items./timeline.label') },
        { href: '/updates', label: t('header.items./updates.label') },
        { href: '/faq', label: t('header.items./faq.label') },
      ],
    },
    {
      title: t('header.groups.Research'),
      links: [
        { href: '/data-insights', label: t('header.items./data-insights.label') },
        { href: '/evidence', label: t('header.items./evidence.label') },
        { href: '/sources', label: t('header.items./sources.label'), accent: true },
        { href: '/trust', label: t('header.items./trust.label') },
        { href: '/evidence-library', label: l({ en: 'Evidence Library', kn: 'ಸಾಕ್ಷ್ಯ ಗ್ರಂಥಾಲಯ', hi: 'एविडेंस लाइब्रेरी', ta: 'ஆதார நூலகம்' }) },
      ],
    },
    {
      title: l({ en: 'Live Intelligence', kn: 'ಲೈವ್ ಇಂಟೆಲಿಜೆನ್ಸ್', hi: 'लाइव इंटेलिजेंस', ta: 'நேரடி நுண்ணறிவு' }),
      links: [
        { href: '/news-intelligence', label: t('header.items./news-intelligence.label') },
        { href: '/news-reader', label: t('header.items./news-reader.label') },
        { href: '/share', label: l({ en: 'Share Kit', kn: 'ಹಂಚಿಕೆ ಕಿಟ್', hi: 'शेयर किट', ta: 'பகிர்வு கிட்' }), accent: true },
        { href: '/instagram', label: l({ en: 'Instagram Hub', kn: 'Instagram ಹಬ್', hi: 'Instagram हब', ta: 'Instagram மையம்' }) },
        { href: '/search', label: t('common.search') },
        { href: '/downloads', label: t('header.items./downloads.label') },
        { href: '/contact', label: t('common.contact') },
      ],
    },
    {
      title: l({ en: 'Open Web', kn: 'ಓಪನ್ ವೆಬ್', hi: 'ओपन वेब', ta: 'திறந்த இணையம்' }),
      links: [
        { href: 'https://kiadb.karnataka.gov.in/', label: l({ en: 'KIADB Portal', kn: 'KIADB ಪೋರ್ಟಲ್', hi: 'KIADB पोर्टल', ta: 'KIADB தளம்' }), external: true },
        { href: 'https://data.opencity.in/dataset/bengaluru-aviation-traffic-data', label: l({ en: 'Aviation Data', kn: 'ವಿಮಾನ ಡೇಟಾ', hi: 'एविएशन डेटा', ta: 'விமானத் தரவு' }), external: true },
        { href: 'https://data.opencity.in/dataset/economic-survey-of-karnataka-2025-26', label: l({ en: 'Economic Survey', kn: 'ಆರ್ಥಿಕ ಸಮೀಕ್ಷೆ', hi: 'आर्थिक सर्वेक्षण', ta: 'பொருளாதார ஆய்வு' }), external: true },
        { href: 'https://data.opencity.in/dataset/bengaluru-strr-via-bannerughatta-national-park-documents', label: l({ en: 'STRR Documents', kn: 'STRR ದಾಖಲೆಗಳು', hi: 'STRR दस्तावेज़', ta: 'STRR ஆவணங்கள்' }), external: true },
        { href: 'https://data.opencity.in/dataset/bengaluru-lakes-and-their-maintainers', label: l({ en: 'Lakes Governance', kn: 'ಸರೋವರ ಆಡಳಿತ', hi: 'झील प्रशासन', ta: 'ஏரி நிர்வாகம்' }), external: true },
      ],
    },
  ];

  const trustCards: FooterTrustCard[] = [
    {
      title: l({ en: 'Authenticity layer', kn: 'ಪ್ರಾಮಾಣಿಕತೆ ಪದರ', hi: 'प्रामाणिकता परत', ta: 'உண்மைத்தன்மை அடுக்கு' }),
      body: l({
        en: 'Claims are expected to be source-linked, status-labeled, and reviewable.',
        kn: 'ಹೇಳಿಕೆಗಳು ಮೂಲ-ಲಿಂಕ್, ಸ್ಥಿತಿ-ಲೇಬಲ್ ಮತ್ತು ಪರಿಶೀಲಿಸಬಹುದಾಗಿರಲು ನಿರೀಕ್ಷಿಸಲಾಗಿದೆ.',
        hi: 'दावों से अपेक्षा है कि वे स्रोत-लिंक्ड, स्थिति-लेबल्ड और समीक्षा योग्य हों।',
        ta: 'கூற்றுகள் மூல இணைப்பு, நிலை குறிப்பு, ஆய்வு செய்யக்கூடிய தன்மை கொண்டிருக்க வேண்டும்.',
      }),
      accent: 'from-[#F5A623]/20 to-[#F5A623]/0',
      link: { href: '/trust', label: t('header.items./trust.label') },
    },
    {
      title: l({ en: 'Structured discovery', kn: 'ರಚಿತ ಅನ್ವೇಷಣೆ', hi: 'संरचित खोज', ta: 'கட்டமைக்கப்பட்ட கண்டுபிடித்தல்' }),
      body: l({
        en: 'Schema, search, sources, and document downloads are designed to reduce uncertainty.',
        kn: 'Schema, search, sources, ಮತ್ತು ಡಾಕ್ಯುಮೆಂಟ್ ಡೌನ್‌ಲೋಡ್‌ಗಳು ಅನಿಶ್ಚಿತತೆಯನ್ನು ಕಡಿಮೆ ಮಾಡುವಂತೆ ವಿನ್ಯಾಸಗೊಳಿಸಲಾಗಿದೆ.',
        hi: 'स्कीमा, सर्च, स्रोत और दस्तावेज़ डाउनलोड अनिश्चितता कम करने के लिए बनाए गए हैं।',
        ta: 'Schema, தேடல், ஆதாரங்கள், ஆவணப் பதிவிறக்கங்கள் ஆகியவை குழப்பத்தை குறைக்க வடிவமைக்கப்பட்டுள்ளன.',
      }),
      accent: 'from-[#06B6D4]/20 to-[#06B6D4]/0',
      link: { href: '/sources', label: t('common.sources') },
    },
    {
      title: l({ en: 'Open-data posture', kn: 'ಮುಕ್ತ ಡೇಟಾ ನಿಲುವು', hi: 'ओपन-डेटा रुख', ta: 'திறந்த தரவு அணுகுமுறை' }),
      body: l({
        en: 'External references stay visible so users can inspect the underlying context themselves.',
        kn: 'ಬಳಕೆದಾರರು ಮೂಲಭೂತ ಸಂದರ್ಭವನ್ನು ತಾವೇ ಪರಿಶೀಲಿಸಲು ಹೊರಗಿನ ಉಲ್ಲೇಖಗಳು ಗೋಚರವಾಗಿರುತ್ತವೆ.',
        hi: 'बाहरी संदर्भ दिखाई देते रहते हैं ताकि उपयोगकर्ता खुद मूल संदर्भ देख सकें।',
        ta: 'பயனர்கள் அடிப்படைச் சூழலைத் தாங்களே பார்வையிட வெளிப்புற மேற்கோள்கள் திறந்தவையாக வைக்கப்படுகின்றன.',
      }),
      accent: 'from-emerald-400/20 to-emerald-400/0',
      link: { href: '/downloads', label: t('header.items./downloads.label') },
    },
  ];

  const credibilityRail = [
    { icon: '◎', label: l({ en: 'Evidence-first architecture', kn: 'ಸಾಕ್ಷ್ಯ-ಪ್ರಥಮ ಆರ್ಕಿಟೆಕ್ಚರ್', hi: 'एविडेंस-फर्स्ट आर्किटेक्चर', ta: 'ஆதார-முன்னுரிமை கட்டமைப்பு' }) },
    { icon: '↗', label: l({ en: 'Open-web references', kn: 'ಓಪನ್-ವೆಬ್ ಉಲ್ಲೇಖಗಳು', hi: 'ओपन-वेब रेफरेंस', ta: 'திறந்த இணைய மேற்கோள்கள்' }) },
    { icon: '◌', label: l({ en: 'Mobile-ready reading paths', kn: 'ಮೊಬೈಲ್‌ಗೆ ಸಿದ್ಧ ಓದು ಮಾರ್ಗಗಳು', hi: 'मोबाइल-रेडी पढ़ने के रास्ते', ta: 'மொபைலுக்கு ஏற்ற வாசிப்பு பாதைகள்' }) },
    { icon: '◇', label: l({ en: 'Audience-specific routes', kn: 'ಪ್ರೇಕ್ಷಕ-ನಿರ್ದಿಷ್ಟ ಮಾರ್ಗಗಳು', hi: 'दर्शक-विशिष्ट मार्ग', ta: 'பார்வையாளர்-சார் பாதைகள்' }) },
  ];

  return {
    lastUpdatedText,
    quickRoutes,
    signalCards,
    audienceCards,
    footerGroups,
    trustCards,
    credibilityRail,
  };
}

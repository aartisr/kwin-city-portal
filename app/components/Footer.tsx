import Link from 'next/link';
import DeferredNewsletterSignup from '@/components/DeferredNewsletterSignup';
import { SITE_CONFIG } from '@/config/site.config';
import {
  getLocaleDefinition,
  pickLocalizedValue,
  translate,
  type Locale,
} from '@/lib/i18n/messages';

type FooterLinkItem = {
  href: string;
  label: string;
  desc?: string;
  external?: boolean;
  accent?: boolean;
};

type FooterGroup = {
  title: string;
  links: FooterLinkItem[];
};

function FooterNavLink({ link }: { link: FooterLinkItem }) {
  const baseClassName = link.accent
    ? 'text-amber-300 hover:text-amber-200'
    : 'text-[#A7B8CC] hover:text-white';
  const className = `footer-nav-link group flex items-start gap-3 rounded-2xl px-3 py-3 transition-all duration-200 hover:bg-white/[0.04] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500`;
  const content = (
    <>
      <span className="footer-nav-link-dot mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gradient-to-r from-[#F5A623] to-[#06B6D4] opacity-70 transition-opacity duration-200 group-hover:opacity-100" />
      <span className="min-w-0">
        <span className={`footer-nav-link-label block text-sm font-semibold transition-colors duration-200 ${baseClassName}`}>
          {link.label}
          {link.external ? ' ↗' : ''}
        </span>
        {link.desc ? <span className="mt-1 block text-xs leading-5 text-[#60738E]">{link.desc}</span> : null}
      </span>
    </>
  );

  if (link.external) {
    return (
      <a href={link.href} target="_blank" rel="noopener noreferrer" className={className}>
        {content}
      </a>
    );
  }

  return (
    <Link href={link.href} className={className}>
      {content}
    </Link>
  );
}

export default function Footer({ locale }: { locale: Locale }) {
  const t = (key: string) => translate(locale, key);
  const l = (values: Parameters<typeof pickLocalizedValue<string>>[1]) => pickLocalizedValue(locale, values);
  const year = new Date().getFullYear();
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

  const signalCards = [
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

  const trustCards = [
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

  return (
    <footer
      className="relative overflow-hidden border-t border-white/8 bg-[linear-gradient(180deg,#030611_0%,#071224_38%,#08192F_62%,#030611_100%)]"
      role="contentinfo"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-8%] top-10 h-48 w-48 rounded-full bg-[#F5A623]/12 blur-3xl md:h-72 md:w-72" />
        <div className="absolute right-[-10%] top-1/3 h-64 w-64 rounded-full bg-cyan-400/10 blur-3xl md:h-96 md:w-96" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/18 to-transparent" />
        <div className="absolute bottom-24 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-300/15 to-transparent" />
      </div>

      <div className="container relative py-12 md:py-16 lg:py-20">
        <section className="footer-panel kwin-fade-up overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(145deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))] shadow-[0_28px_80px_rgba(2,6,23,0.35)]" style={{ animationDelay: '0.04s' }}>
          <div className="grid gap-8 px-5 py-6 sm:px-7 sm:py-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10 lg:px-10 lg:py-10">
            <div className="kwin-fade-up" style={{ animationDelay: '0.1s' }}>
              <p className="text-[11px] font-bold uppercase tracking-[0.26em] text-[#F5A623] md:text-xs">
                {t('footer.ctaEyebrow')}
              </p>
              <div className="mt-4 max-w-2xl">
                <h3 className="text-[2rem] font-extrabold leading-[1.02] tracking-[-0.05em] text-white md:text-[3.3rem]">
                  {t('footer.ctaTitle')}
                </h3>
                <p className="mt-4 max-w-xl text-[15px] leading-7 text-[#B5C6D9] md:text-[16px]">
                  {t('footer.ctaBody')}
                </p>
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Link href="/about" className="btn btn-primary text-center">
                  {t('footer.exploreKwin')}
                </Link>
                <Link href="/sources" className="btn btn-outline-light text-center">
                  {t('footer.viewSources')}
                </Link>
              </div>

              <div className="mt-6 flex flex-wrap gap-2.5">
                {credibilityRail.map((item) => (
                  <span
                    key={item.label}
                    className="footer-chip inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-3.5 py-2 text-[11px] font-semibold tracking-[0.03em] text-[#D6E3F1]"
                  >
                    <span className="text-[#F5A623]" aria-hidden="true">{item.icon}</span>
                    {item.label}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid gap-4 kwin-fade-up" style={{ animationDelay: '0.16s' }}>
              <div className="footer-panel rounded-[1.5rem] border border-white/10 bg-[#07111F]/85 p-5 md:p-6">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-cyan-300">
                      {l({ en: 'Decision Desk', kn: 'ನಿರ್ಧಾರ ಡೆಸ್ಕ್', hi: 'डिसीजन डेस्क', ta: 'முடிவு மேசை' })}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-[#9DB1C8]">
                      {l({
                        en: 'Borrowing from Stripe, GitHub, and Notion: the footer should help you choose your next move instantly.',
                        kn: 'Stripe, GitHub, ಮತ್ತು Notion ನಿಂದ ಪ್ರೇರಣೆ: ಫುಟರ್ ನಿಮ್ಮ ಮುಂದಿನ ಕ್ರಮವನ್ನು ತಕ್ಷಣ ಆಯ್ಕೆಮಾಡಲು ಸಹಾಯ ಮಾಡಬೇಕು.',
                        hi: 'Stripe, GitHub और Notion से प्रेरित: फुटर को तुरंत अगला कदम चुनने में मदद करनी चाहिए।',
                        ta: 'Stripe, GitHub, Notion பாணியில்: அடிக்குறிப்பு உடனே அடுத்த செயலை தேர்வு செய்ய உதவ வேண்டும்.',
                      })}
                    </p>
                  </div>
                  <span className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-cyan-200">
                    {l({ en: 'Fast paths', kn: 'ವೇಗದ ಮಾರ್ಗಗಳು', hi: 'फास्ट पाथ्स', ta: 'வேகமான பாதைகள்' })}
                  </span>
                </div>

                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {quickRoutes.map((route) => (
                    <FooterNavLink key={route.href} link={route} />
                  ))}
                </div>
              </div>

              <div id="newsletter" className="footer-panel rounded-[1.5rem] border border-white/10 bg-[linear-gradient(160deg,rgba(245,166,35,0.10),rgba(6,182,212,0.10))] p-5 md:p-6">
                <DeferredNewsletterSignup />
              </div>
            </div>
          </div>

          <div className="grid gap-3 border-t border-white/8 px-5 py-5 sm:px-7 lg:grid-cols-4 lg:px-10">
            {signalCards.map((card, index) => (
              <article
                key={card.title}
                className="footer-panel kwin-fade-up rounded-[1.4rem] border border-white/8 bg-white/[0.03] p-4 transition-transform duration-300 hover:-translate-y-1 hover:bg-white/[0.05]"
                style={{ animationDelay: `${0.22 + index * 0.05}s` }}
              >
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#F5A623]">{card.eyebrow}</p>
                <h4 className="mt-2 text-[15px] font-bold leading-6 text-white">{card.title}</h4>
                <p className="mt-2 text-[13px] leading-6 text-[#90A4BD]">{card.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-10 grid gap-6 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="footer-panel kwin-fade-up rounded-[1.8rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] p-6 md:p-7" style={{ animationDelay: '0.18s' }}>
              <div className="flex items-center gap-3">
                <div className="footer-brand-mark flex h-11 w-11 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#F5A623,#E8A020)] text-xl font-extrabold text-[#040714] shadow-[0_12px_28px_rgba(232,160,32,0.35)]">
                  K
                </div>
                <div>
                  <p className="text-lg font-extrabold tracking-tight text-white">KWIN City</p>
                  <p className="text-xs uppercase tracking-[0.2em] text-[#6E859F]">
                    {l({ en: 'North Bengaluru', kn: 'ಉತ್ತರ ಬೆಂಗಳೂರು', hi: 'नॉर्थ बेंगलुरु', ta: 'வட பெங்களூரு' })}
                  </p>
                </div>
              </div>

              <p className="mt-5 text-[15px] leading-7 text-[#B1C2D6]">
                {l({
                  en: 'A research portal for KWIN City, designed to feel more like a decision interface than a marketing brochure.',
                  kn: 'KWIN Cityಗಾಗಿ ಸಂಶೋಧನಾ ಪೋರ್ಟಲ್, ಮಾರುಕಟ್ಟೆ ಬ್ರೋಶರ್ ಗಿಂತ ನಿರ್ಧಾರ ಇಂಟರ್‌ಫೇಸ್‌ನಂತೆ ಅನುಭವವಾಗುವಂತೆ ವಿನ್ಯಾಸಗೊಳಿಸಲಾಗಿದೆ.',
                  hi: 'KWIN City के लिए एक शोध पोर्टल, जिसे मार्केटिंग ब्रोशर से अधिक एक निर्णय इंटरफेस जैसा महसूस हो, इस तरह बनाया गया है।',
                  ta: 'KWIN Cityக்கான ஆய்வு தளம்; விளம்பர பிரோஷரை விட ஒரு முடிவு இடைமுகம் போல உணரப்படுமாறு வடிவமைக்கப்பட்டது.',
                })}
              </p>

              <div className="footer-panel mt-5 rounded-[1.25rem] border border-white/8 bg-[#07111E]/90 p-4">
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-cyan-300">
                  {l({ en: 'Navigate by audience', kn: 'ಪ್ರೇಕ್ಷಕರ ಪ್ರಕಾರ ಸಂಚರಿಸಿ', hi: 'दर्शक के अनुसार नेविगेट करें', ta: 'பார்வையாளர்படி வழிசெல்' })}
                </p>
                <div className="mt-3 grid gap-2 sm:grid-cols-2">
                  {audienceCards.map((card) => (
                    <FooterNavLink key={card.href} link={card} />
                  ))}
                </div>
              </div>

              <div className="mt-5 flex flex-wrap items-center gap-3 text-[11px] text-[#6E859F]">
                <span>13°13&apos;N 77°32&apos;E</span>
                <span className="h-1 w-1 rounded-full bg-white/20" />
                <span>Doddaballapura, Karnataka</span>
                <span className="h-1 w-1 rounded-full bg-white/20" />
                <span>{t('footer.lastUpdated')} {lastUpdatedText}</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-8">
            <nav className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4" role="navigation" aria-label="Footer navigation">
              {footerGroups.map((group, index) => (
                <section
                  key={group.title}
                  className="footer-panel kwin-fade-up rounded-[1.6rem] border border-white/10 bg-white/[0.03] p-4 md:p-5"
                  style={{ animationDelay: `${0.22 + index * 0.05}s` }}
                >
                  <h4 className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#F5A623]">
                    {group.title}
                  </h4>
                  <div className="mt-3 space-y-1">
                    {group.links.map((link) => (
                      <FooterNavLink key={`${group.title}-${link.href}`} link={link} />
                    ))}
                  </div>
                </section>
              ))}
            </nav>
          </div>
        </section>

        <section className="mt-10 grid gap-4 md:grid-cols-3">
          {trustCards.map((card, index) => (
            <article
              key={card.title}
              className="footer-panel kwin-fade-up rounded-[1.5rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] p-5"
              style={{ animationDelay: `${0.28 + index * 0.05}s` }}
            >
              <div className={`mb-4 h-1.5 w-16 rounded-full bg-gradient-to-r ${card.accent}`} />
              <h4 className="text-base font-bold text-white">{card.title}</h4>
              <p className="mt-2 text-sm leading-6 text-[#9CB1C8]">{card.body}</p>
              <div className="mt-4">
                <Link
                  href={card.link.href}
                  className="footer-action-link inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-2 text-xs font-semibold text-[#DCE8F4] transition-all duration-200 hover:border-white/20 hover:bg-white/[0.08] hover:text-white"
                >
                  {card.link.label}
                  <span aria-hidden="true" className="footer-action-arrow">→</span>
                </Link>
              </div>
            </article>
          ))}
        </section>

        <div className="mt-10 border-t border-white/10 pt-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-[11px] text-[#6C819A]">
              <span className="text-[#8AA1BA]">© {year} BAJA Associates</span>
              <span className="hidden sm:inline h-1 w-1 rounded-full bg-white/20" />
              <span>Aarti S Ravikumar</span>
              <span className="hidden sm:inline h-1 w-1 rounded-full bg-white/20" />
              <span>{l({ en: 'Evidence-first publishing', kn: 'ಸಾಕ್ಷ್ಯ-ಪ್ರಥಮ ಪ್ರಕಟಣೆ', hi: 'एविडेंस-फर्स्ट पब्लिशिंग', ta: 'ஆதார-முன்னுரிமை வெளியீடு' })}</span>
            </div>

            <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-[11px] text-[#6C819A]">
              <span>{t('footer.openData')}</span>
              <span className="hidden sm:inline h-1 w-1 rounded-full bg-white/20" />
              <Link href="/terms" className="text-[#91A8C0] hover:text-white transition-colors">{t('common.terms')}</Link>
              <span className="h-1 w-1 rounded-full bg-white/20" />
              <Link href="/sources" className="text-[#91A8C0] hover:text-white transition-colors">{t('common.sources')}</Link>
              <span className="h-1 w-1 rounded-full bg-white/20" />
              <Link href="/contact" className="text-[#91A8C0] hover:text-white transition-colors">{t('common.contact')}</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

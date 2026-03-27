export const LOCALE_DEFINITIONS = [
  { code: 'en', label: 'English', nativeLabel: 'English', htmlLang: 'en-IN' },
  { code: 'kn', label: 'Kannada', nativeLabel: 'ಕನ್ನಡ', htmlLang: 'kn-IN' },
  { code: 'hi', label: 'Hindi', nativeLabel: 'हिन्दी', htmlLang: 'hi-IN' },
  { code: 'ta', label: 'Tamil', nativeLabel: 'தமிழ்', htmlLang: 'ta-IN' },
  { code: 'te', label: 'Telugu', nativeLabel: 'తెలుగు', htmlLang: 'te-IN' },
  { code: 'es', label: 'Spanish', nativeLabel: 'Español', htmlLang: 'es-ES' },
] as const;

export type Locale = (typeof LOCALE_DEFINITIONS)[number]['code'];

type LocaleDetails = Omit<(typeof LOCALE_DEFINITIONS)[number], 'code'>;
type Primitive = string | number | boolean | bigint | symbol | null | undefined;

export type DeepPartial<T> =
  T extends Primitive
    ? T
    : T extends Array<infer Item>
    ? Array<DeepPartial<Item>>
    : { [Key in keyof T]?: DeepPartial<T[Key]> };

export const SUPPORTED_LOCALES = LOCALE_DEFINITIONS.map(({ code }) => code) as Locale[];
export const DEFAULT_LOCALE: Locale = 'en';

export const LOCALE_DETAILS = LOCALE_DEFINITIONS.reduce((acc, definition) => {
  acc[definition.code] = {
    label: definition.label,
    nativeLabel: definition.nativeLabel,
    htmlLang: definition.htmlLang,
  };
  return acc;
}, {} as Record<Locale, LocaleDetails>);

export const HTML_LANG = SUPPORTED_LOCALES.reduce((acc, locale) => {
  acc[locale] = LOCALE_DETAILS[locale].htmlLang;
  return acc;
}, {} as Record<Locale, string>);

export type LocalizedValue<T> = Record<typeof DEFAULT_LOCALE, T> & Partial<Record<Locale, T>>;

const defaultMessages = {
  common: {
    language: 'Language',
    search: 'Search',
    account: 'Account',
    signedIn: 'Signed in',
    trust: 'Trust',
    hideTrustBar: 'Hide Trust Protocol bar',
    showTrustBar: 'Show Trust Protocol bar',
    toggleMenu: 'Toggle menu',
    exploreKwin: 'Explore KWIN',
    discoverMore: 'Discover More',
    reviewSources: 'Review all sources',
    terms: 'Terms',
    sources: 'Sources',
    contact: 'Contact',
  },
  header: {
    groups: {
      Discover: 'Discover',
      Ecosystem: 'Ecosystem',
      Research: 'Research',
      Intelligence: 'Intelligence',
      Audiences: 'Audiences',
    },
    items: {
      '/about': { label: 'About KWIN', desc: 'Mission, pillars, and framework' },
      '/why-north-bengaluru': { label: 'Why North Bengaluru', desc: 'Regional strategic case' },
      '/timeline': { label: 'Timeline', desc: 'Phase-wise development roadmap' },
      '/updates': { label: 'Updates', desc: 'Milestones & announcements' },
      '/faq': { label: 'FAQ', desc: 'Questions answered - for every audience' },
      '/sectors': { label: 'Sectors', desc: 'Industry depth and opportunities' },
      '/sustainability': { label: 'Sustainability', desc: 'Climate and resilience lens' },
      '/data-insights': { label: 'Data Insights', desc: 'Live evidence dashboards' },
      '/analytics': { label: 'Analytics Dashboard', desc: 'On-device page tracking insights' },
      '/evidence': { label: 'Evidence Vault', desc: 'What each dataset can prove' },
      '/sources': { label: 'Sources & Claims', desc: 'Full claim-to-source ledger' },
      '/downloads': { label: 'Document Downloads', desc: 'Reports, briefs & open datasets' },
      '/news-intelligence': { label: 'News Intelligence', desc: 'Attribution-first media observatory' },
      '/news-reader': { label: 'Live News Reader', desc: 'On-demand OPML summary reader' },
      '/community': { label: 'Community Discussion', desc: 'Open stakeholder threads and replies' },
      '/trust': { label: 'Trust Center', desc: 'Authenticity and originality protocol' },
      '/download': { label: 'Get the App', desc: 'Install on Android & iOS - free' },
      '/account': { label: 'Account & Preferences', desc: 'Sign in and save your interests' },
      '/for/investor': { label: 'Investor', desc: 'Opportunity & risk briefing' },
      '/for/resident': { label: 'Resident', desc: 'Livability & community' },
      '/for/researcher': { label: 'Researcher', desc: 'Data & methodology' },
      '/for/journalist': { label: 'Journalist', desc: 'Verified story angles' },
      '/for/curious-citizens': { label: 'Curious Citizen', desc: 'Plain-language explainer' },
      '/for': { label: 'All Audience Hubs', desc: 'Browse all persona pathways' },
    },
  },
  hero: {
    title1: 'Knowledge.',
    title2: 'Wellbeing.',
    title3: 'Innovation.',
    badge: 'North Bengaluru · Proposed 2024',
    taglineLead: "India's most consequential city is expanding north.",
    taglineRest: 'KWIN City is the township proposed for that frontier - and this site is your complete guide to it.',
    ctaPrimary: 'Explore the Vision',
    ctaSecondary: 'Read the Research',
    sourceNotePrefix: 'Investment and employment figures from project brief - pending KIADB primary verification.',
  },
  footer: {
    ctaEyebrow: 'The definitive KWIN resource',
    ctaTitle: 'Everything KWIN. One place.',
    ctaBody: "This portal exists so that anyone - investor, resident, researcher, journalist, or curious citizen - can understand KWIN City with complete confidence in what's known and what's still being confirmed.",
    exploreKwin: 'Explore KWIN',
    viewSources: 'View Sources',
    openData: 'Open Data · Every claim sourced',
    lastUpdated: 'Last updated',
  },
};

type MessageDictionary = typeof defaultMessages;

const localeMessageOverrides: Partial<Record<Locale, DeepPartial<MessageDictionary>>> = {
  kn: {
    common: {
      language: 'ಭಾಷೆ',
      search: 'ಹುಡುಕಿ',
      account: 'ಖಾತೆ',
      signedIn: 'ಲಾಗಿನ್ ಆಗಿದೆ',
      trust: 'ವಿಶ್ವಾಸ',
      hideTrustBar: 'Trust Protocol ಪಟ್ಟಿಯನ್ನು ಮರೆಮಾಡಿ',
      showTrustBar: 'Trust Protocol ಪಟ್ಟಿಯನ್ನು ತೋರಿಸಿ',
      toggleMenu: 'ಮೆನು ಬದಲಿಸಿ',
      exploreKwin: 'KWIN ಅನ್ವೇಷಿಸಿ',
      discoverMore: 'ಇನ್ನಷ್ಟು ತಿಳಿಯಿರಿ',
      reviewSources: 'ಎಲ್ಲಾ ಮೂಲಗಳನ್ನು ನೋಡಿ',
      terms: 'ನಿಯಮಗಳು',
      sources: 'ಮೂಲಗಳು',
      contact: 'ಸಂಪರ್ಕ',
    },
    header: {
      groups: {
        Discover: 'ಅನ್ವೇಷಣೆ',
        Ecosystem: 'ಪರಿಸರ ವ್ಯವಸ್ಥೆ',
        Research: 'ಸಂಶೋಧನೆ',
        Intelligence: 'ಗುಪ್ತಜ್ಞಾನ',
        Audiences: 'ಪ್ರೇಕ್ಷಕರು',
      },
      items: {
        '/about': { label: 'KWIN ಬಗ್ಗೆ', desc: 'ಮಿಷನ್, ಸ್ತಂಭಗಳು ಮತ್ತು ಚೌಕಟ್ಟು' },
        '/why-north-bengaluru': { label: 'ಯಾಕೆ ಉತ್ತರ ಬೆಂಗಳೂರು', desc: 'ಪ್ರಾದೇಶಿಕ ತಂತ್ರಯುಕ್ತ ಆಧಾರ' },
        '/timeline': { label: 'ಕಾಲರೇಖೆ', desc: 'ಹಂತಾವಾರು ಅಭಿವೃದ್ಧಿ ರಸ್ತೆನಕ್ಷೆ' },
        '/updates': { label: 'ನವೀಕರಣಗಳು', desc: 'ಮೈಲಿಗಲ್ಲುಗಳು ಮತ್ತು ಪ್ರಕಟಣೆಗಳು' },
        '/faq': { label: 'FAQ', desc: 'ಎಲ್ಲಾ ಪ್ರೇಕ್ಷಕರ ಪ್ರಶ್ನೆಗಳಿಗೆ ಉತ್ತರಗಳು' },
        '/sectors': { label: 'ಕ್ಷೇತ್ರಗಳು', desc: 'ಕೈಗಾರಿಕಾ ಆಳತೆ ಮತ್ತು ಅವಕಾಶಗಳು' },
        '/sustainability': { label: 'ಸ್ಥಿರತೆ', desc: 'ಹವಾಮಾನ ಮತ್ತು ಪ್ರತಿರೋಧ ದೃಷ್ಟಿಕೋನ' },
        '/data-insights': { label: 'ಡೇಟಾ ಒಳನೋಟಗಳು', desc: 'ಲೈವ್ ಸಾಕ್ಷ್ಯ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್‌ಗಳು' },
        '/analytics': { label: 'ವಿಶ್ಲೇಷಣಾ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್', desc: 'ಆನ್-ಡಿವೈಸ್ ಪುಟ-ಟ್ರ್ಯಾಕಿಂಗ್ ಒಳನೋಟಗಳು' },
        '/evidence': { label: 'ಸಾಕ್ಷ್ಯ ಭಂಡಾರ', desc: 'ಪ್ರತಿ ಡೇಟಾಸೆಟ್ ಏನು ಸಾಬೀತು ಮಾಡಬಹುದು' },
        '/sources': { label: 'ಮೂಲಗಳು ಮತ್ತು ಹೇಳಿಕೆಗಳು', desc: 'ಪೂರ್ಣ ಹೇಳಿಕೆ-ಮೂಲ ಲೆಡ್ಜರ್' },
        '/downloads': { label: 'ದಾಖಲೆ ಡೌನ್‌ಲೋಡ್‌ಗಳು', desc: 'ವರದಿಗಳು, ಸಂಕ್ಷಿಪ್ತಿಕೆಗಳು ಮತ್ತು ಮುಕ್ತ ಡೇಟಾಸೆಟ್‌ಗಳು' },
        '/news-intelligence': { label: 'ಸುದ್ದಿ ಇಂಟೆಲಿಜೆನ್ಸ್', desc: 'ಅಟ್ರಿಬ್ಯೂಶನ್-ಫರ್ಸ್ಟ್ ಮೀಡಿಯಾ ವೀಕ್ಷಣಾಲಯ' },
        '/news-reader': { label: 'ಲೈವ್ ಸುದ್ದಿ ಓದುಗರ', desc: 'ಬೇಡಿಕೆಯ ಮೇರೆಗೆ OPML ಸಾರಾಂಶ ಓದುಗರ' },
        '/community': { label: 'ಸಮುದಾಯ ಚರ್ಚೆ', desc: 'ಮುಕ್ತ ಹಿತಾಸಕ್ತಿ ತಂತಿಗಳು ಮತ್ತು ಪ್ರತಿಕ್ರಿಯೆಗಳು' },
        '/trust': { label: 'ವಿಶ್ವಾಸ ಕೇಂದ್ರ', desc: 'ಪ್ರಾಮಾಣಿಕತೆ ಮತ್ತು ಮೂಲತತ್ವ ಪ್ರೋಟೋಕಾಲ್' },
        '/download': { label: 'ಆಪ್ ಪಡೆಯಿರಿ', desc: 'Android ಮತ್ತು iOS ನಲ್ಲಿ ಉಚಿತವಾಗಿ ಸ್ಥಾಪಿಸಿ' },
        '/account': { label: 'ಖಾತೆ ಮತ್ತು ಆದ್ಯತೆಗಳು', desc: 'ಲಾಗಿನ್ ಮಾಡಿ ಮತ್ತು ಆಸಕ್ತಿಗಳನ್ನು ಉಳಿಸಿ' },
        '/for/investor': { label: 'ಹೂಡಿಕೆದಾರ', desc: 'ಅವಕಾಶ ಮತ್ತು ಅಪಾಯ ಸಂಕ್ಷಿಪ್ತಿಕೆ' },
        '/for/resident': { label: 'ನಿವಾಸಿ', desc: 'ಬಾಳ್ವಿಕೆ ಮತ್ತು ಸಮುದಾಯ' },
        '/for/researcher': { label: 'ಸಂಶೋಧಕ', desc: 'ಡೇಟಾ ಮತ್ತು ವಿಧಾನಶಾಸ್ತ್ರ' },
        '/for/journalist': { label: 'ಪತ್ರಕರ್ತ', desc: 'ದೃಢೀಕೃತ ಕಥಾ ಕೋನಗಳು' },
        '/for/curious-citizens': { label: 'ಕುತೂಹಲಕಾರಿ ನಾಗರಿಕ', desc: 'ಸರಳ ಭಾಷೆಯ ವಿವರ' },
        '/for': { label: 'ಎಲ್ಲಾ ಪ್ರೇಕ್ಷಕರ ಹಬ್‌ಗಳು', desc: 'ಎಲ್ಲಾ ಪರ್ಸೋನಾ ಮಾರ್ಗಗಳನ್ನು ನೋಡಿ' },
      },
    },
    hero: {
      title1: 'ಜ್ಞಾನ.',
      title2: 'ಕ್ಷೇಮ.',
      title3: 'ನವೀನತೆ.',
      badge: 'ಉತ್ತರ ಬೆಂಗಳೂರು · ಪ್ರಸ್ತಾವಿತ 2024',
      taglineLead: 'ಭಾರತದ ಅತ್ಯಂತ ಮಹತ್ವದ ನಗರ ಉತ್ತರದತ್ತ ವಿಸ್ತರಿಸುತ್ತಿದೆ.',
      taglineRest: 'KWIN City ಈ ಹೊಸ ಗಡಿಯಿಗಾಗಿ ಪ್ರಸ್ತಾಪಿತ ಪಟ್ಟಣ — ಮತ್ತು ಈ ತಾಣವು ಅದರ ಸಂಪೂರ್ಣ ಮಾರ್ಗದರ್ಶಿ.',
      ctaPrimary: 'ದೃಷ್ಟಿಕೋನ ನೋಡಿ',
      ctaSecondary: 'ಸಂಶೋಧನೆ ಓದಿ',
      sourceNotePrefix: 'ಹೂಡಿಕೆ ಮತ್ತು ಉದ್ಯೋಗ ಅಂಕಿಗಳು ಯೋಜನಾ ಸಂಕ್ಷಿಪ್ತದಿಂದ — KIADB ಪ್ರಾಥಮಿಕ ದೃಢೀಕರಣ ಬಾಕಿ.',
    },
    footer: {
      ctaEyebrow: 'KWINಗೆ ನಿರ್ಧಾರಕ ಸಂಪನ್ಮೂಲ',
      ctaTitle: 'ಎಲ್ಲಾ KWIN. ಒಂದೇ ಸ್ಥಳ.',
      ctaBody: 'ಹೂಡಿಕೆದಾರ, ನಿವಾಸಿ, ಸಂಶೋಧಕ, ಪತ್ರಕರ್ತ ಅಥವಾ ಕುತೂಹಲಕಾರಿ ನಾಗರಿಕ — ಯಾರಾದರೂ KWIN City ಅನ್ನು ನಿಖರ ಮಾಹಿತಿಯೊಂದಿಗೆ ಅರ್ಥಮಾಡಿಕೊಳ್ಳಲು ಈ ಪೋರ್ಟಲ್ ನಿರ್ಮಿಸಲಾಗಿದೆ.',
      exploreKwin: 'KWIN ಅನ್ವೇಷಿಸಿ',
      viewSources: 'ಮೂಲಗಳನ್ನು ನೋಡಿ',
      openData: 'ಮುಕ್ತ ಡೇಟಾ · ಪ್ರತಿಯೊಂದು ಹೇಳಿಕೆಗೆ ಮೂಲ',
      lastUpdated: 'ಕೊನೆಯ ನವೀಕರಣ',
    },
  },
  hi: {
    common: {
      language: 'भाषा',
      search: 'खोज',
      account: 'खाता',
      signedIn: 'साइन इन',
      trust: 'विश्वास',
      hideTrustBar: 'ट्रस्ट प्रोटोकॉल बार छिपाएं',
      showTrustBar: 'ट्रस्ट प्रोटोकॉल बार दिखाएं',
      toggleMenu: 'मेनू बदलें',
      exploreKwin: 'KWIN देखें',
      discoverMore: 'और जानें',
      reviewSources: 'सभी स्रोत देखें',
      terms: 'शर्तें',
      sources: 'स्रोत',
      contact: 'संपर्क',
    },
    header: {
      groups: {
        Discover: 'खोजें',
        Ecosystem: 'इकोसिस्टम',
        Research: 'अनुसंधान',
        Intelligence: 'इंटेलिजेंस',
        Audiences: 'दर्शक',
      },
      items: {
        '/about': { label: 'KWIN के बारे में', desc: 'मिशन, स्तंभ और ढांचा' },
        '/why-north-bengaluru': { label: 'नॉर्थ बेंगलुरु क्यों', desc: 'क्षेत्रीय रणनीतिक आधार' },
        '/timeline': { label: 'टाइमलाइन', desc: 'चरणवार विकास रोडमैप' },
        '/updates': { label: 'अपडेट्स', desc: 'माइलस्टोन और घोषणाएं' },
        '/faq': { label: 'FAQ', desc: 'हर दर्शक के सवालों के जवाब' },
        '/sectors': { label: 'सेक्टर', desc: 'उद्योग की गहराई और अवसर' },
        '/sustainability': { label: 'सस्टेनेबिलिटी', desc: 'जलवायु और लचीलापन दृष्टिकोण' },
        '/data-insights': { label: 'डेटा इनसाइट्स', desc: 'लाइव एविडेंस डैशबोर्ड' },
        '/analytics': { label: 'एनालिटिक्स डैशबोर्ड', desc: 'ऑन-डिवाइस पेज ट्रैकिंग इनसाइट्स' },
        '/evidence': { label: 'एविडेंस वॉल्ट', desc: 'हर डेटा सेट क्या सिद्ध कर सकता है' },
        '/sources': { label: 'स्रोत और दावे', desc: 'पूरा दावा-से-स्रोत लेजर' },
        '/downloads': { label: 'दस्तावेज़ डाउनलोड', desc: 'रिपोर्ट, ब्रीफ और ओपन डेटासेट' },
        '/news-intelligence': { label: 'न्यूज़ इंटेलिजेंस', desc: 'एट्रिब्यूशन-फर्स्ट मीडिया ऑब्जर्वेटरी' },
        '/news-reader': { label: 'लाइव न्यूज़ रीडर', desc: 'ऑन-डिमांड OPML सारांश रीडर' },
        '/community': { label: 'समुदाय चर्चा', desc: 'खुले हितधारक थ्रेड्स और रिप्लाई' },
        '/trust': { label: 'ट्रस्ट सेंटर', desc: 'प्रामाणिकता और मौलिकता प्रोटोकॉल' },
        '/download': { label: 'ऐप प्राप्त करें', desc: 'Android और iOS पर मुफ्त इंस्टॉल करें' },
        '/account': { label: 'खाता और प्राथमिकताएं', desc: 'साइन इन करें और रुचियां सहेजें' },
        '/for/investor': { label: 'निवेशक', desc: 'अवसर और जोखिम ब्रीफिंग' },
        '/for/resident': { label: 'निवासी', desc: 'रहने-योग्यता और समुदाय' },
        '/for/researcher': { label: 'शोधकर्ता', desc: 'डेटा और कार्यप्रणाली' },
        '/for/journalist': { label: 'पत्रकार', desc: 'सत्यापित स्टोरी एंगल्स' },
        '/for/curious-citizens': { label: 'जिज्ञासु नागरिक', desc: 'सरल भाषा में व्याख्या' },
        '/for': { label: 'सभी दर्शक हब', desc: 'सभी पर्सोना पाथवे देखें' },
      },
    },
    hero: {
      title1: 'ज्ञान.',
      title2: 'कल्याण.',
      title3: 'नवाचार.',
      badge: 'उत्तर बेंगलुरु · प्रस्तावित 2024',
      taglineLead: 'भारत का सबसे महत्वपूर्ण शहर उत्तर की ओर बढ़ रहा है।',
      taglineRest: 'KWIN City उसी नए फ्रंटियर के लिए प्रस्तावित टाउनशिप है — और यह साइट आपकी पूरी मार्गदर्शिका है।',
      ctaPrimary: 'विजन देखें',
      ctaSecondary: 'रिसर्च पढ़ें',
      sourceNotePrefix: 'निवेश और रोजगार के आंकड़े प्रोजेक्ट ब्रीफ से — KIADB का प्राथमिक सत्यापन लंबित।',
    },
    footer: {
      ctaEyebrow: 'KWIN का निर्णायक संसाधन',
      ctaTitle: 'सब कुछ KWIN. एक ही जगह.',
      ctaBody: 'यह पोर्टल इसलिए बनाया गया है ताकि निवेशक, निवासी, शोधकर्ता, पत्रकार या जिज्ञासु नागरिक — कोई भी KWIN City को भरोसे के साथ समझ सके।',
      exploreKwin: 'KWIN देखें',
      viewSources: 'स्रोत देखें',
      openData: 'ओपन डेटा · हर दावे का स्रोत',
      lastUpdated: 'अंतिम अपडेट',
    },
  },
  ta: {
    common: {
      language: 'மொழி',
      search: 'தேடல்',
      account: 'கணக்கு',
      signedIn: 'உள்நுழைந்துள்ளது',
      trust: 'நம்பிக்கை',
      hideTrustBar: 'நம்பிக்கை நெறிமுறை பட்டியை மறைக்கவும்',
      showTrustBar: 'நம்பிக்கை நெறிமுறை பட்டியை காட்டவும்',
      toggleMenu: 'மெனுவை மாற்று',
      exploreKwin: 'KWIN ஐ ஆராயுங்கள்',
      discoverMore: 'மேலும் அறிய',
      reviewSources: 'அனைத்து ஆதாரங்களையும் பார்க்கவும்',
      terms: 'விதிமுறைகள்',
      sources: 'ஆதாரங்கள்',
      contact: 'தொடர்பு',
    },
    header: {
      groups: {
        Discover: 'கண்டறி',
        Ecosystem: 'சூழல் அமைப்பு',
        Research: 'ஆராய்ச்சி',
        Intelligence: 'நுண்ணறிவு',
        Audiences: 'பார்வையாளர் குழுக்கள்',
      },
      items: {
        '/about': { label: 'KWIN பற்றி', desc: 'பணி, தூண்கள் மற்றும் வடிவமைப்பு' },
        '/why-north-bengaluru': { label: 'ஏன் வட பெங்களூரு', desc: 'பிராந்திய மூலோபாய ஆதாரம்' },
        '/timeline': { label: 'காலவரிசை', desc: 'கட்டங்கட்டமாக மேம்பாட்டு சாலைவரைபடம்' },
        '/updates': { label: 'புதுப்பிப்புகள்', desc: 'மைல்கற்கள் மற்றும் அறிவிப்புகள்' },
        '/faq': { label: 'FAQ', desc: 'அனைத்து பார்வையாளர்களுக்குமான பதில்கள்' },
        '/sectors': { label: 'துறைகள்', desc: 'தொழில் ஆழமும் வாய்ப்புகளும்' },
        '/sustainability': { label: 'திடத்தன்மை', desc: 'காலநிலை மற்றும் தாங்குத்திறன் நோக்கு' },
        '/data-insights': { label: 'தரவு நுண்ணறிவு', desc: 'நேரடி ஆதார டாஷ்போர்டுகள்' },
        '/analytics': { label: 'பகுப்பாய்வு டாஷ்போர்டு', desc: 'சாதனத்திலேயே பக்க-பின்தொடர்பு நுண்ணறிவு' },
        '/evidence': { label: 'ஆதார களஞ்சியம்', desc: 'ஒவ்வொரு தரவுத்தொகுப்பும் நிரூபிக்கக் கூடியது' },
        '/sources': { label: 'மூலங்கள் மற்றும் கூற்றுகள்', desc: 'முழு கூற்று-மூல பதிவேடு' },
        '/downloads': { label: 'ஆவண பதிவிறக்கங்கள்', desc: 'அறிக்கைகள், சுருக்கங்கள் மற்றும் திறந்த தரவுத்தொகுப்புகள்' },
        '/news-intelligence': { label: 'செய்தி நுண்ணறிவு', desc: 'மேற்கோள்-முன்னுரிமை ஊடக கண்காணிப்பு' },
        '/news-reader': { label: 'நேரடி செய்தி வாசிப்பான்', desc: 'தேவைக்கேற்ற OPML சுருக்க வாசிப்பான்' },
        '/community': { label: 'சமூக விவாதம்', desc: 'திறந்த பங்குதாரர் திரிகள் மற்றும் பதில்கள்' },
        '/trust': { label: 'நம்பிக்கை மையம்', desc: 'உண்மைத்தன்மை மற்றும் மூலத்தன்மை நெறிமுறை' },
        '/download': { label: 'ஆப்பைப் பெறுங்கள்', desc: 'Android மற்றும் iOS இல் இலவசமாக நிறுவுங்கள்' },
        '/account': { label: 'கணக்கு மற்றும் விருப்பங்கள்', desc: 'உள்நுழைந்து உங்கள் விருப்பங்களை சேமிக்கவும்' },
        '/for/investor': { label: 'முதலீட்டாளர்', desc: 'வாய்ப்பு மற்றும் ஆபத்து சுருக்கம்' },
        '/for/resident': { label: 'குடியிருப்பாளர்', desc: 'வாழ்வாதாரம் மற்றும் சமூக வாழ்க்கை' },
        '/for/researcher': { label: 'ஆராய்ச்சியாளர்', desc: 'தரவு மற்றும் முறையியல்' },
        '/for/journalist': { label: 'செய்தியாளர்', desc: 'சரிபார்க்கப்பட்ட செய்தி கோணங்கள்' },
        '/for/curious-citizens': { label: 'ஆர்வமுள்ள குடிமகன்', desc: 'எளிய மொழி விளக்கம்' },
        '/for': { label: 'அனைத்து பார்வையாளர் மையங்கள்', desc: 'அனைத்து பேர்சோனா வழித்தடங்களையும் பார்க்கவும்' },
      },
    },
    hero: {
      title1: 'அறிவு.',
      title2: 'நலன்.',
      title3: 'புதுமை.',
      badge: 'வட பெங்களூர் · முன்மொழிவு 2024',
      taglineLead: 'இந்தியாவின் மிக முக்கியமான நகரம் வடக்கு நோக்கி விரிகிறது.',
      taglineRest: 'அந்த எல்லைக்கான முன்மொழியப்பட்ட டவுன்ஷிப் KWIN City - அதை முழுமையாக அறிய இந்த தளம் உங்கள் வழிகாட்டி.',
      ctaPrimary: 'காணொளியை ஆராயுங்கள்',
      ctaSecondary: 'ஆராய்ச்சியை படிக்கவும்',
      sourceNotePrefix: 'முதலீடு மற்றும் வேலைவாய்ப்பு எண்கள் திட்டக் குறிப்பிலிருந்து - KIADB முதன்மை சரிபார்ப்பு நிலுவையில் உள்ளது.',
    },
    footer: {
      ctaEyebrow: 'KWIN க்கான முழுமையான ஆதாரம்',
      ctaTitle: 'KWIN அனைத்தும். ஒரே இடத்தில்.',
      ctaBody: 'முதலீட்டாளர், குடியிருப்பாளர், ஆராய்ச்சியாளர், செய்தியாளர் அல்லது ஆர்வலர் - யாரும் KWIN Cityயை நம்பிக்கையுடன் புரிந்துகொள்ள இந்த தளம் உருவாக்கப்பட்டது.',
      exploreKwin: 'KWIN ஐ ஆராயுங்கள்',
      viewSources: 'ஆதாரங்களை பார்க்கவும்',
      openData: 'திறந்த தரவு · ஒவ்வொரு கூற்றுக்கும் ஆதாரம்',
      lastUpdated: 'கடைசியாக புதுப்பிக்கப்பட்டது',
    },
  },
  te: {
    common: {
      language: 'భాష',
      search: 'శోధన',
      account: 'ఖాతా',
      signedIn: 'సైన్ ఇన్ చేసినవారు',
      trust: 'విశ్వాసం',
      hideTrustBar: 'ట్రస్ట్ ప్రోటోకాల్ బార్‌ను దాచండి',
      showTrustBar: 'ట్రస్ట్ ప్రోటోకాల్ బార్‌ను చూపండి',
      toggleMenu: 'మెను టోగుల్ చేయండి',
      exploreKwin: 'KWINని అన్వేషించండి',
      discoverMore: 'మరిన్ని తెలుసుకోండి',
      reviewSources: 'అన్ని సోర్సులను చూడండి',
      terms: 'నిబంధనలు',
      sources: 'సోర్సులు',
      contact: 'సంప్రదింపులు',
    },
    header: {
      groups: {
        Discover: 'కనుగొను',
        Ecosystem: 'ఈకోసిస్టమ్',
        Research: 'పరిశోధన',
        Intelligence: 'గుప్తాంశం',
        Audiences: 'ప్రేక్షకులు',
      },
      items: {
        '/about': { label: 'KWINల గురించి', desc: 'లక్ష్యం, స్తంభాలు మరియు చట్రం' },
        '/why-north-bengaluru': { label: 'ఉత్తర బెంగళూరు ఎందుకు', desc: 'ప్రాంతీయ సాంకేతిక కేస్' },
        '/timeline': { label: 'కాలరేఖ', desc: 'దశ-వారీ అభివృద్ధి రోడ్‌మ్యాప్' },
        '/updates': { label: 'నవీకరణలు', desc: 'మైలుకట్లు మరియు ప్రకటనలు' },
        '/faq': { label: 'FAQ', desc: 'ప్రతిటి ప్రేక్షకుకు ప్రశ్నలకు సమాధానాలు' },
        '/sectors': { label: 'సెక్టర్‌లు', desc: 'పరిశ్రమ లోతు మరియు అవకాశాలు' },
        '/sustainability': { label: 'సంపోషణీయత', desc: 'వాతావరణ మరియు నిరోధక దృష్టికోణం' },
        '/data-insights': { label: 'డేటా ఇన్‌సైట్‌లు', desc: 'లైవ్ ఎవిడెన్స్ డ్యాష్‌బోర్డ్‌లు' },
        '/analytics': { label: 'విశ్లేషణ డ్యాష్‌బోర్డ్', desc: 'ఆన్-ఇన్ డివైస్ పేజ్ ట్రాకింగ్ ఇన్‌సైట్‌లు' },
        '/evidence': { label: 'ఎవిడెన్స్ వాల్ట్', desc: 'ప్రతిటి డేటాసెట్ నిరూపించగలిగే విషయం' },
        '/sources': { label: 'సోర్సులు మరియు క్లెయిమ్‌లు', desc: 'పూర్తి క్లెయిమ్-టు-సోర్స్ లెడ్జర్' },
        '/downloads': { label: 'డాక్యుమెంట్ డౌన్‌లోడ్‌లు', desc: 'నివేదనలు, ఎంపికలు మరియు ఓపెన్ డేటాసెట్‌లు' },
        '/news-intelligence': { label: 'సమాచార గుప్తాంశం', desc: 'ఆట్రిబ్యూషన్-ఫర్స్ట్ మీడియా పర్యవేక్షణం' },
        '/news-reader': { label: 'లైవ్ న్యూజ్ రీడర్', desc: 'డిమాండ్‌పై OPML సారాంశ రీడర్' },
        '/community': { label: 'సమాజం చర్చ', desc: 'ఓపెన్ స్టేక్‌హోల్డర్ థ్రెడ్‌లు మరియు సమాధానాలు' },
        '/trust': { label: 'ట్రస్ట్ సెంటర్', desc: 'ప్రామాణికత మరియు లక్షణం ప్రోటోకాల్' },
        '/download': { label: 'అ్యాప్ పొందండి', desc: 'Android మరియు iOS లో ఉచితంగా ఇన్‌స్టాల్ చేయండి' },
        '/account': { label: 'ఖాతా మరియు ప్రాధాన్యతలు', desc: 'సైన్ ఇన్ చేయండి మరియు ఆసక్తులను సేవ్ చేయండి' },
        '/for/investor': { label: 'పెట్టుబడిదారు', desc: 'అవకాశం మరియు ప్రమాద బ్రీఫింగ్' },
        '/for/resident': { label: 'నివాసి', desc: 'సజీవ్యత మరియు సమాజం' },
        '/for/researcher': { label: 'పరిశోధకుడు', desc: 'డేటా మరియు పద్ధతి శాస్త్రం' },
        '/for/journalist': { label: 'పత్రికారుడు', desc: 'ధృవీకృత కథ కోణాలు' },
        '/for/curious-citizens': { label: 'ఆసక్త సివిలియన్', desc: 'సాధారణ భాష వివరణ' },
        '/for': { label: 'అన్ని ప్రేక్షక హబ్‌లు', desc: 'అన్ని పర్సోనా మార్గాలను చూడండి' },
      },
    },
    hero: {
      title1: 'జ్ఞానం.',
      title2: 'సుఖం.',
      title3: 'ఆవిష్కరణ.',
      badge: 'ఉత్తర బెంగళూరు · ప్రతిపాదిత 2024',
      taglineLead: 'భారతదేశం యొక్క అత్యంత ప్రభావవంతమైన నగరం ఉత్తరం వైపు విస్తరిస్తోంది.',
      taglineRest: 'KWIN City ఆ సరిహద్దు కోసం ప్రతిపాదిత టౌన్‌షిప్ — మరియు ఈ సైట్ దాని సంపూర్ణ గైడ్.',
      ctaPrimary: 'విజన్‌ను అన్వేషించండి',
      ctaSecondary: 'పరిశోధన చదవండి',
      sourceNotePrefix: 'పెట్టుబడి మరియు ఉద్యోగ సంఖ్యలు ప్రాజెక్ట్ సంక్షిప్తీకరణ నుండి - KIADB ప్రాథమిక ధృవీకరణ పెండింగ్.',
    },
    footer: {
      ctaEyebrow: 'నిర్ణయాత్మక KWIN సంపద',
      ctaTitle: 'అన్ని KWIN. ఒక సంగ్రహం.',
      ctaBody: 'పెట్టుబడిదారు, నివాసి, పరిశోధకుడు, పత్రికారుడు, లేదా ఆసక్త సిటిజన్ — ఎవరైనా KWIN City ను సంపూర్ణ ఆత్మవిశ్వాసం వలన అర్థం చేసుకోవడానికి ఈ పోర్టల్ ఉంది.',
      exploreKwin: 'KWINని అన్వేషించండి',
      viewSources: 'సోర్సులను చూడండి',
      openData: 'ఓపెన్ డేటా · ప్రతిటి క్లెయిమ్ సోర్స్‌చేయబడినది',
      lastUpdated: 'చివరగా నవీకరించబడినది',
    },
  },
  es: {
    common: {
      language: 'Idioma',
      search: 'Buscar',
      account: 'Cuenta',
      signedIn: 'Sesión iniciada',
      trust: 'Confianza',
      hideTrustBar: 'Ocultar barra de protocolo de confianza',
      showTrustBar: 'Mostrar barra de protocolo de confianza',
      toggleMenu: 'Alternar menú',
      exploreKwin: 'Explorar KWIN',
      discoverMore: 'Descubre más',
      reviewSources: 'Ver todas las fuentes',
      terms: 'Términos',
      sources: 'Fuentes',
      contact: 'Contacto',
    },
    header: {
      groups: {
        Discover: 'Descubrir',
        Ecosystem: 'Ecosistema',
        Research: 'Investigación',
        Intelligence: 'Inteligencia',
        Audiences: 'Audiencias',
      },
      items: {
        '/about': { label: 'Acerca de KWIN', desc: 'Misión, pilares y marco' },
        '/why-north-bengaluru': { label: 'Por qué Bengaluru Norte', desc: 'Caso estratégico regional' },
        '/timeline': { label: 'Cronología', desc: 'Hoja de ruta de desarrollo por fases' },
        '/updates': { label: 'Actualizaciones', desc: 'Hitos y anuncios' },
        '/faq': { label: 'FAQ', desc: 'Preguntas respondidas en todos los públicos' },
        '/sectors': { label: 'Sectores', desc: 'Profundidad industrial y oportunidades' },
        '/sustainability': { label: 'Sostenibilidad', desc: 'Perspectiva climática y de resiliencia' },
        '/data-insights': { label: 'Información de datos', desc: 'Paneles de evidencia en vivo' },
        '/analytics': { label: 'Panel de análisis', desc: 'Información de seguimiento de páginas en el dispositivo' },
        '/evidence': { label: 'Bóveda de evidencia', desc: 'Lo que cada conjunto de datos puede probar' },
        '/sources': { label: 'Fuentes y afirmaciones', desc: 'Libro mayor completo de afirmación a fuente' },
        '/downloads': { label: 'Descargas de documentos', desc: 'Informes, resúmenes y conjuntos de datos abiertos' },
        '/news-intelligence': { label: 'Inteligencia de noticias', desc: 'Observatorio de medios de atribución primaria' },
        '/news-reader': { label: 'Lector de noticias en vivo', desc: 'Lector resumen OPML bajo demanda' },
        '/community': { label: 'Discusión comunitaria', desc: 'Debates abiertos de partes interesadas y respuestas' },
        '/trust': { label: 'Centro de confianza', desc: 'Protocolo de autenticidad y originalidad' },
        '/download': { label: 'Obtener la app', desc: 'Instalar gratuitamente en Android e iOS' },
        '/account': { label: 'Cuenta y preferencias', desc: 'Inicie sesión y guarde sus intereses' },
        '/for/investor': { label: 'Inversionista', desc: 'Oportunidad e información de riesgo' },
        '/for/resident': { label: 'Residente', desc: 'Habitabilidad y comunidad' },
        '/for/researcher': { label: 'Investigador', desc: 'Datos y metodología' },
        '/for/journalist': { label: 'Periodista', desc: 'Ángulos de historia verificados' },
        '/for/curious-citizens': { label: 'Ciudadano interesado', desc: 'Explicación en lenguaje sencillo' },
        '/for': { label: 'Todos los centros de audiencia', desc: 'Explorar todos los caminos de personajes' },
      },
    },
    hero: {
      title1: 'Conocimiento.',
      title2: 'Bienestar.',
      title3: 'Innovación.',
      badge: 'Bengaluru Norte · Propuesto 2024',
      taglineLead: 'La ciudad más importante de India se está expandiendo hacia el norte.',
      taglineRest: 'KWIN City es el municipio propuesto para esa nueva frontera - y este sitio es tu guía completa.',
      ctaPrimary: 'Explorar la visión',
      ctaSecondary: 'Leer la investigación',
      sourceNotePrefix: 'Figuras de inversión y empleo del resumen del proyecto - pendiente verificación primaria de KIADB.',
    },
    footer: {
      ctaEyebrow: 'El recurso definitivo de KWIN',
      ctaTitle: 'Todo KWIN. Un solo lugar.',
      ctaBody: 'Este portal existe para que cualquiera - inversor, residente, investigador, periodista o ciudadano interesado - pueda entender KWIN City con total confianza en lo que se sabe y lo que aún se está confirmando.',
      exploreKwin: 'Explorar KWIN',
      viewSources: 'Ver fuentes',
      openData: 'Datos abiertos · Cada afirmación está fundamentada',
      lastUpdated: 'Última actualización',
    },
  },
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function mergeUnknownDeep(base: unknown, overrides?: unknown): unknown {
  if (overrides === undefined) {
    return base;
  }

  if (Array.isArray(base)) {
    return overrides ?? base;
  }

  if (!isRecord(base) || !isRecord(overrides)) {
    return overrides ?? base;
  }

  const result: Record<string, unknown> = { ...base };
  const overrideRecord = overrides;

  for (const key of Object.keys(overrideRecord)) {
    const overrideValue = overrideRecord[key];
    if (overrideValue === undefined) {
      continue;
    }

    const baseValue = result[key];
    result[key] = isRecord(baseValue) && isRecord(overrideValue)
      ? mergeUnknownDeep(baseValue, overrideValue)
      : overrideValue;
  }

  return result;
}

function mergeDeep<T>(base: T, overrides?: DeepPartial<T>): T {
  return mergeUnknownDeep(base, overrides) as T;
}

function resolvePath(obj: unknown, key: string): string | undefined {
  const parts = key.split('.');
  let current: unknown = obj;

  for (const part of parts) {
    if (!isRecord(current)) {
      return undefined;
    }
    current = current[part];
  }

  return typeof current === 'string' ? current : undefined;
}

export const messages = SUPPORTED_LOCALES.reduce((catalog, locale) => {
  catalog[locale] = locale === DEFAULT_LOCALE
    ? defaultMessages
    : mergeDeep(defaultMessages, localeMessageOverrides[locale]) as MessageDictionary;
  return catalog;
}, {} as Record<Locale, MessageDictionary>);

export function getLocaleDefinition(locale: Locale): LocaleDetails {
  return LOCALE_DETAILS[locale];
}

export function pickLocalizedValue<T>(locale: Locale, values: LocalizedValue<T>): T {
  return (values[locale] ?? values[DEFAULT_LOCALE]) as T;
}

export function translate(locale: Locale, key: string): string {
  return resolvePath(messages[locale], key)
    ?? resolvePath(messages[DEFAULT_LOCALE], key)
    ?? key;
}

export function normalizeLocale(value?: string | null): Locale {
  if (!value) return DEFAULT_LOCALE;
  const lower = value.toLowerCase();
  if (SUPPORTED_LOCALES.includes(lower as Locale)) return lower as Locale;
  return DEFAULT_LOCALE;
}

export function getIntlLocale(locale: Locale): string {
  const map: Record<Locale, string> = {
    en: 'en-IN',
    kn: 'kn-IN',
    hi: 'hi-IN',
    ta: 'ta-IN',
    te: 'te-IN',
    es: 'es-ES',
  };
  return map[locale] ?? map[DEFAULT_LOCALE];
}
export const LOCALE_DEFINITIONS = [
  { code: 'en', label: 'English', nativeLabel: 'English', htmlLang: 'en-IN' },
  { code: 'kn', label: 'Kannada', nativeLabel: 'ಕನ್ನಡ', htmlLang: 'kn-IN' },
  { code: 'hi', label: 'Hindi', nativeLabel: 'हिन्दी', htmlLang: 'hi-IN' },
  { code: 'ta', label: 'Tamil', nativeLabel: 'தமிழ்', htmlLang: 'ta-IN' },
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
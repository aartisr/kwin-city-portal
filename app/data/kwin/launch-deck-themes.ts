import type { LocalizedValue } from '@/lib/i18n/messages';

export type LaunchDeckTheme = {
  id: 'vidhana-soudha' | 'airport-corridor' | 'electronic-city' | 'knowledge-infrastructure';
  src: string;
  alt: LocalizedValue<string>;
  label: LocalizedValue<string>;
  summary: LocalizedValue<string>;
  credit: string;
  license: string;
  source: string;
  sourceIds: string[];
};

export const LAUNCH_DECK_THEMES: LaunchDeckTheme[] = [
  {
    id: 'vidhana-soudha',
    src: '/social/kwin-launch/kwin-launch-slide-03.png',
    alt: {
      en: 'Vidhana Soudha in Bengaluru, Karnataka',
      kn: 'ಕರ್ನಾಟಕ, ಬೆಂಗಳೂರಿನ ವಿಧಾನಸೌಧ',
      hi: 'बेंगलुरु, कर्नाटक में विधान सौधा',
      ta: 'கர்நாடகா, பெங்களூருவில் விதான சௌதா',
    },
    label: {
      en: 'Governance Context',
      kn: 'ಆಡಳಿತ ಸಂದರ್ಭ',
      hi: 'शासन संदर्भ',
      ta: 'ஆட்சி சூழல்',
    },
    summary: {
      en: 'Policy and institutional governance anchors the KWIN discussion. Regulatory clarity is central to any township narrative.',
      kn: 'ನೀತಿನಿರ್ಧಾರ ಮತ್ತು ಸಂಸ್ಥಾ ಆಡಳಿತವು KWIN ಚರ್ಚೆಯ ಮೂಲಾಧಾರ. ನಿಯಂತ್ರಣ ಸ್ಪಷ್ಟತೆ ಯಾವುದೇ ಟೌನ್‌ಶಿಪ್ ಕಥನದ ಕೇಂದ್ರಬಿಂದು.',
      hi: 'नीतिगत और संस्थागत शासन KWIN चर्चा का आधार है। नियामकीय स्पष्टता किसी भी टाउनशिप कथा का मुख्य हिस्सा है।',
      ta: 'கொள்கை மற்றும் நிறுவல் ஆட்சி KWIN விவாதத்தின் அடிப்படை. ஒழுங்குமுறை தெளிவு எந்த டவுன்ஷிப் கதைமாந்தரத்திற்கும் மையம்.',
    },
    credit: 'KWIN City launch deck',
    license: 'Internal portal artifact',
    source: '/instagram',
    sourceIds: ['kiadb'],
  },
  {
    id: 'airport-corridor',
    src: '/social/kwin-launch/kwin-launch-slide-04.png',
    alt: {
      en: 'Kempegowda International Airport in Bengaluru',
      kn: 'ಬೆಂಗಳೂರು ಕೆಂಪೇಗೌಡ ಅಂತರರಾಷ್ಟ್ರೀಯ ವಿಮಾನ ನಿಲ್ದಾಣ',
      hi: 'बेंगलुरु में केम्पेगौड़ा अंतरराष्ट्रीय हवाई अड्डा',
      ta: 'பெங்களூருவில் கெம்பேகவுடா சர்வதேச விமானநிலையம்',
    },
    label: {
      en: 'Airport Connectivity Context',
      kn: 'ವಿಮಾನ ಸಂಪರ್ಕ ಸಂದರ್ಭ',
      hi: 'हवाई संपर्क संदर्भ',
      ta: 'விமான இணைப்பு சூழல்',
    },
    summary: {
      en: 'North Bengaluru connectivity and airport access are repeatedly cited as strategic drivers behind KWIN location narratives.',
      kn: 'ಉತ್ತರ ಬೆಂಗಳೂರಿನ ಸಂಪರ್ಕತೆ ಮತ್ತು ವಿಮಾನ ನಿಲ್ದಾಣ ಪ್ರವೇಶವು KWIN ಸ್ಥಳ ಆಯ್ಕೆ ಕಥನದಲ್ಲಿ ಪ್ರಮುಖ ಚಾಲಕಗಳಾಗಿ ಪುನರಾವರ್ತಿತವಾಗಿವೆ.',
      hi: 'नॉर्थ बेंगलुरु कनेक्टिविटी और एयरपोर्ट पहुंच को KWIN लोकेशन नैरेटिव में लगातार रणनीतिक कारक माना गया है।',
      ta: 'வட பெங்களூரு இணைப்பு மற்றும் விமானநிலைய அணுகல் KWIN இடக் கதைமாந்தரத்தில் மீண்டும் மீண்டும் குறிப்பிடப்படும் மூலக் காரகங்கள்.',
    },
    credit: 'KWIN City launch deck',
    license: 'Internal portal artifact',
    source: '/instagram',
    sourceIds: ['aviation', 'strr'],
  },
  {
    id: 'electronic-city',
    src: '/social/kwin-launch/kwin-launch-slide-05.png',
    alt: {
      en: 'Infosys headquarters front view in Electronic City, Bengaluru',
      kn: 'ಬೆಂಗಳೂರು ಎಲೆಕ್ಟ್ರಾನಿಕ್ ಸಿಟಿಯ ಇನ್ಫೋಸಿಸ್ ಮುಖ್ಯ ಕಚೇರಿ ಮುಂಭಾಗ',
      hi: 'बेंगलुरु के इलेक्ट्रॉनिक सिटी में इंफोसिस मुख्यालय का दृश्य',
      ta: 'பெங்களூரு எலக்ட்ரானிக் சிட்டியில் உள்ள இன்போசிஸ் தலைமையக முன்புறம்',
    },
    label: {
      en: 'Technology Ecosystem Context',
      kn: 'ತಂತ್ರಜ್ಞಾನ ಪರಿಸರ ಸಂದರ್ಭ',
      hi: 'प्रौद्योगिकी पारितंत्र संदर्भ',
      ta: 'தொழில்நுட்ப சூழல் பின்னணி',
    },
    summary: {
      en: 'The launch narrative links KWIN to Bengaluru\'s established technology ecosystem and scale effects seen in existing tech districts.',
      kn: 'ಲಾಂಚ್ ಕಥನವು KWIN ಅನ್ನು ಬೆಂಗಳೂರಿನ ಸ್ಥಾಪಿತ ತಂತ್ರಜ್ಞಾನ ಪರಿಸರ ಮತ್ತು ಈಗಿನ ತಂತ್ರಜ್ಞಾನ ಜಿಲ್ಲೆಗಳ ಪ್ರಮಾಣ ಪರಿಣಾಮಗಳೊಂದಿಗೆ ಸಂಪರ್ಕಿಸುತ್ತದೆ.',
      hi: 'लॉन्च नैरेटिव KWIN को बेंगलुरु के स्थापित टेक इकोसिस्टम और मौजूदा टेक जिलों के स्केल प्रभाव से जोड़ता है।',
      ta: 'தொடக்க கதைமாந்தரம் KWIN ஐ பெங்களூருவின் நிறுவப்பட்ட தொழில்நுட்ப சூழல் மற்றும் தற்போதைய டெக் மாவட்டங்களின் அளவளாவிய தாக்கங்களுடன் இணைக்கிறது.',
    },
    credit: 'KWIN City launch deck',
    license: 'Internal portal artifact',
    source: '/instagram',
    sourceIds: ['economicSurvey'],
  },
  {
    id: 'knowledge-infrastructure',
    src: '/social/kwin-launch/kwin-launch-slide-06.png',
    alt: {
      en: 'Main Building of the Indian Institute of Science in Bengaluru',
      kn: 'ಬೆಂಗಳೂರು ಭಾರತೀಯ ವಿಜ್ಞಾನ ಸಂಸ್ಥೆಯ ಮುಖ್ಯ ಕಟ್ಟಡ',
      hi: 'बेंगलुरु में भारतीय विज्ञान संस्थान की मुख्य इमारत',
      ta: 'பெங்களூருவில் உள்ள இந்திய அறிவியல் நிறுவனத்தின் முதன்மை கட்டிடம்',
    },
    label: {
      en: 'Research Ecosystem Context',
      kn: 'ಸಂಶೋಧನಾ ಪರಿಸರ ಸಂದರ್ಭ',
      hi: 'अनुसंधान पारितंत्र संदर्भ',
      ta: 'ஆராய்ச்சி சூழல் பின்னணி',
    },
    summary: {
      en: 'Universities, labs, and research institutions are framed as long-term capability infrastructure in the launch narrative.',
      kn: 'ವಿಶ್ವವಿದ್ಯಾಲಯಗಳು, ಪ್ರಯೋಗಾಲಯಗಳು ಮತ್ತು ಸಂಶೋಧನಾ ಸಂಸ್ಥೆಗಳು ಲಾಂಚ್ ಕಥನದಲ್ಲಿ ದೀರ್ಘಕಾಲೀನ ಸಾಮರ್ಥ್ಯ ಮೂಲಸೌಕರ್ಯವಾಗಿ ನಿರೂಪಿಸಲ್ಪಟ್ಟಿವೆ.',
      hi: 'विश्वविद्यालय, लैब और अनुसंधान संस्थान लॉन्च नैरेटिव में दीर्घकालीन क्षमता अवसंरचना के रूप में प्रस्तुत हैं।',
      ta: 'பல்கலைக்கழகங்கள், ஆய்வகங்கள், ஆராய்ச்சி நிறுவனங்கள் தொடக்க கதைமாந்தரத்தில் நீண்டகால திறன் அடிக்கட்டாக சித்தரிக்கப்படுகின்றன.',
    },
    credit: 'KWIN City launch deck',
    license: 'Internal portal artifact',
    source: '/instagram',
    sourceIds: ['economicSurvey'],
  },
];

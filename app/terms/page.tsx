import type { Metadata } from 'next';
import SiteFrame from '@/components/SiteFrame';
import { getServerLocale, pickByLocale } from '@/lib/i18n/server';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  return {
    title: pickByLocale(locale, {
      en: 'Terms of Use | Research Portal',
      kn: 'ಬಳಕೆ ನಿಯಮಗಳು | ಸಂಶೋಧನಾ ಪೋರ್ಟಲ್',
      hi: 'उपयोग की शर्तें | रिसर्च पोर्टल',
      ta: 'பயன்பாட்டு விதிமுறைகள் | ஆய்வு தளம்',
    }),
    description: pickByLocale(locale, {
      en: 'Review the KWIN City Research Portal terms of use, copyright ownership, permitted sharing rules, source accuracy disclaimer, external link policy, and contact path for legal questions.',
      kn: 'KWIN City ಸಂಶೋಧನಾ ಪೋರ್ಟಲ್‌ಗಾಗಿ ಬಳಕೆ ನಿಯಮಗಳು, ಕಾಪಿರೈಟ್ ಮತ್ತು ಅನುಮತಿತ ಬಳಕೆ ನಿಯಮಗಳು.',
      hi: 'KWIN City रिसर्च पोर्टल के लिए उपयोग की शर्तें, कॉपीराइट और अनुमत उपयोग नियम।',
      ta: 'KWIN City ஆய்வு தளத்திற்கான பயன்பாட்டு விதிமுறைகள், பதிப்புரிமை மற்றும் அனுமதிக்கப்பட்ட பயன்பாட்டு நெறிமுறைகள்.',
    }),
    alternates: { canonical: 'https://kwin-city.com/terms' },
  };
}

export default async function TermsPage() {
  const locale = await getServerLocale();
  const l = (values: Parameters<typeof pickByLocale<string>>[1]) => pickByLocale(locale, values);
  const effectiveDate = '25 March 2026';

  return (
    <SiteFrame>
      <main className="min-h-screen bg-white pt-24 pb-16">
        <div className="container max-w-4xl">
          <p className="text-xs font-bold tracking-[0.18em] uppercase text-[#F5A623] mb-3">{l({ en: 'Legal', kn: 'ಕಾನೂನು', hi: 'कानूनी', ta: 'சட்டம்' })}</p>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">{l({ en: 'Terms of Use', kn: 'ಬಳಕೆ ನಿಯಮಗಳು', hi: 'उपयोग की शर्तें', ta: 'பயன்பாட்டு விதிமுறைகள்' })}</h1>
          <p className="text-sm text-gray-500 mb-8">{l({ en: 'Effective date:', kn: 'ಪ್ರಭಾವಿ ದಿನಾಂಕ:', hi: 'प्रभावी तिथि:', ta: 'செயல்படும் தேதி:' })} {effectiveDate}</p>

          <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5 mb-8">
            <p className="text-sm text-amber-900 leading-7">
              {l({
                en: 'This page is a practical legal draft for your project. Please have local legal counsel review it before relying on it as final legal advice.',
                kn: 'ಈ ಪುಟವು ನಿಮ್ಮ ಯೋಜನೆಗೆ ಪ್ರಾಯೋಗಿಕ ಕಾನೂನು ಕರಡು. ಅಂತಿಮ ಕಾನೂನು ಸಲಹೆಯಾಗಿ ಬಳಸುವ ಮೊದಲು ಸ್ಥಳೀಯ ಕಾನೂನು ಸಲಹೆಗಾರರಿಂದ ಪರಿಶೀಲಿಸಿರಿ.',
                hi: 'यह पेज आपके प्रोजेक्ट के लिए एक व्यावहारिक कानूनी मसौदा है। इसे अंतिम कानूनी सलाह मानने से पहले स्थानीय कानूनी सलाहकार से समीक्षा कराएं।',
                ta: 'இந்தப் பக்கம் உங்கள் திட்டத்திற்கான ஒரு நடைமுறை சட்ட வரைவு. இதை இறுதி சட்ட ஆலோசனையாக பயன்படுத்தும் முன் உள்ளூர் சட்ட ஆலோசகரால் மதிப்பாய்வு செய்யவும்.',
              })}
            </p>
          </div>

          <section className="space-y-8 text-gray-700 leading-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{l({ en: '1. About this website', kn: '1. ಈ ವೆಬ್‌ಸೈಟ್ ಬಗ್ಗೆ', hi: '1. इस वेबसाइट के बारे में', ta: '1. இந்த இணையதளம் பற்றி' })}</h2>
              <p>
                {l({
                  en: 'The KWIN City Research Portal provides informational and research-oriented content about KWIN City and related regional development context. Content is presented in good faith from available public sources and internal analysis.',
                  kn: 'KWIN City ಸಂಶೋಧನಾ ಪೋರ್ಟಲ್ KWIN City ಹಾಗೂ ಸಂಬಂಧಿತ ಪ್ರಾದೇಶಿಕ ಅಭಿವೃದ್ಧಿ ಹಿನ್ನೆಲೆಯ ಕುರಿತು ಮಾಹಿತಿ ಮತ್ತು ಸಂಶೋಧನಾ ವಿಷಯಗಳನ್ನು ಒದಗಿಸುತ್ತದೆ. ಲಭ್ಯವಿರುವ ಸಾರ್ವಜನಿಕ ಮೂಲಗಳು ಮತ್ತು ಆಂತರಿಕ ವಿಶ್ಲೇಷಣೆಯಿಂದ ವಿಷಯವನ್ನು ಸದುದ್ದೇಶದಿಂದ ನೀಡಲಾಗಿದೆ.',
                  hi: 'KWIN City रिसर्च पोर्टल KWIN City और संबंधित क्षेत्रीय विकास संदर्भ पर सूचना और शोध-उन्मुख सामग्री प्रदान करता है। सामग्री उपलब्ध सार्वजनिक स्रोतों और आंतरिक विश्लेषण के आधार पर सद्भावना से प्रस्तुत की जाती है।',
                  ta: 'KWIN City ஆய்வு தளம், KWIN City மற்றும் தொடர்புடைய பிராந்திய மேம்பாட்டு சூழல் குறித்த தகவல் மற்றும் ஆய்வு சார்ந்த உள்ளடக்கத்தை வழங்குகிறது. கிடைக்கக்கூடிய பொதுமூலங்கள் மற்றும் உட்புற ஆய்வின் அடிப்படையில் நல்லநம்பிக்கையுடன் இந்த உள்ளடக்கம் வழங்கப்படுகிறது.',
                })}
              </p>
              <p className="mt-3">
                {l({ en: 'Website owner: BAJA Associates. Author: Aarti S Ravikumar.', kn: 'ವೆಬ್‌ಸೈಟ್ ಮಾಲೀಕ: BAJA Associates. ಲೇಖಕಿ: Aarti S Ravikumar.', hi: 'वेबसाइट स्वामी: BAJA Associates. लेखिका: Aarti S Ravikumar.', ta: 'இணையதள உரிமையாளர்: BAJA Associates. ஆசிரியர்: Aarti S Ravikumar.' })}
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{l({ en: '2. Copyright and intellectual property', kn: '2. ಕಾಪಿರೈಟ್ ಮತ್ತು ಬೌದ್ಧಿಕ ಸ್ವತ್ತು', hi: '2. कॉपीराइट और बौद्धिक संपदा', ta: '2. பதிப்புரிமை மற்றும் அறிவுசார் சொத்து' })}</h2>
              <p>
                {l({
                  en: 'Unless otherwise stated, the original content on this website including text, layout structure, graphics, visual composition, data compilation, and source code is owned by the site owner and is protected by copyright law.',
                  kn: 'ಬೇರೆ ಹೇಳಿಕೆ ಇಲ್ಲದಿದ್ದರೆ, ಈ ವೆಬ್‌ಸೈಟ್‌ನ ಪಠ್ಯ, ಲೇಔಟ್ ರಚನೆ, ಗ್ರಾಫಿಕ್ಸ್, ದೃಶ್ಯ ಸಂಯೋಜನೆ, ಡೇಟಾ ಸಂಗ್ರಹಣೆ ಮತ್ತು ಮೂಲ ಕೋಡ್ ಸೇರಿದಂತೆ ಮೂಲ ವಿಷಯವು ಸೈಟ್ ಮಾಲೀಕರಿಗೆ ಸೇರಿದ್ದು ಕಾಪಿರೈಟ್ ಕಾನೂನಿನಿಂದ ರಕ್ಷಿತವಾಗಿದೆ.',
                  hi: 'जब तक अन्यथा उल्लेख न हो, इस वेबसाइट की मूल सामग्री जिसमें टेक्स्ट, लेआउट संरचना, ग्राफिक्स, दृश्य संरचना, डेटा संकलन और स्रोत कोड शामिल हैं, साइट स्वामी की संपत्ति है और कॉपीराइट कानून से संरक्षित है।',
                  ta: 'வேறு குறிப்பிடப்படாவிட்டால், இந்த தளத்தின் உரை, வடிவமைப்பு அமைப்பு, படங்கள், காட்சி அமைப்பு, தரவு தொகுப்பு மற்றும் மூலக் குறியீடு உள்ளிட்ட அசல் உள்ளடக்கம் தள உரிமையாளருக்குச் சொந்தமானது மற்றும் பதிப்புரிமை சட்டத்தால் பாதுகாக்கப்படுகிறது.',
                })}
              </p>
              <p className="mt-3">
                {l({ en: 'Copyright owner: BAJA Associates. Named author: Aarti S Ravikumar.', kn: 'ಕಾಪಿರೈಟ್ ಮಾಲೀಕ: BAJA Associates. ಹೆಸರಿಸಲಾದ ಲೇಖಕಿ: Aarti S Ravikumar.', hi: 'कॉपीराइट स्वामी: BAJA Associates. नामित लेखिका: Aarti S Ravikumar।', ta: 'பதிப்புரிமை உரிமையாளர்: BAJA Associates. குறிப்பிடப்பட்ட ஆசிரியர்: Aarti S Ravikumar.' })}
              </p>
              <p className="mt-3">
                {l({
                  en: 'Third-party trademarks, logos, datasets, and source publications remain the property of their respective owners and are used here for reference, commentary, and research context.',
                  kn: 'ಮೂರನೇ ಪಕ್ಷದ ಟ್ರೇಡ್‌ಮಾರ್ಕ್‌ಗಳು, ಲೋಗೊಗಳು, ಡೇಟಾಸೆಟ್‌ಗಳು ಮತ್ತು ಮೂಲ ಪ್ರಕಟಣೆಗಳು ತಮ್ಮ ಮಾಲೀಕರದ್ದೇ ಆಗಿದ್ದು, ಇಲ್ಲಿ ಉಲ್ಲೇಖ, ಟಿಪ್ಪಣಿ ಮತ್ತು ಸಂಶೋಧನಾ ಹಿನ್ನೆಲೆಗೆ ಬಳಸಲ್ಪಡುತ್ತವೆ.',
                  hi: 'तृतीय-पक्ष ट्रेडमार्क, लोगो, डेटासेट और स्रोत प्रकाशन अपने-अपने स्वामियों की संपत्ति हैं और यहां संदर्भ, टिप्पणी और शोध संदर्भ के लिए उपयोग किए जाते हैं।',
                  ta: 'மூன்றாம் தரப்பு வர்த்தகமுத்திரைகள், லோகோக்கள், தரவுத்தொகுப்புகள் மற்றும் மூல வெளியீடுகள் அவற்றின் உரிமையாளர்களுக்கே சொந்தமானவை; இங்கே குறிப்புகள், விளக்கம் மற்றும் ஆய்வு சூழலுக்காக பயன்படுத்தப்படுகின்றன.',
                })}
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{l({ en: '3. Permitted use', kn: '3. ಅನುಮತಿತ ಬಳಕೆ', hi: '3. अनुमत उपयोग', ta: '3. அனுமதிக்கப்பட்ட பயன்பாடு' })}</h2>
              <p>{l({ en: 'You may:', kn: 'ನೀವು ಮಾಡಬಹುದಾದವು:', hi: 'आप कर सकते हैं:', ta: 'நீங்கள் செய்யலாம்:' })}</p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>{l({ en: 'view and use the website for personal, academic, journalistic, or internal business research;', kn: 'ವೈಯಕ್ತಿಕ, ಶೈಕ್ಷಣಿಕ, ಪತ್ರಿಕಾ ಅಥವಾ ಆಂತರಿಕ ವ್ಯವಹಾರ ಸಂಶೋಧನೆಗಾಗಿ ವೆಬ್‌ಸೈಟ್ ಅನ್ನು ವೀಕ್ಷಿಸಿ ಮತ್ತು ಬಳಸಿ;', hi: 'व्यक्तिगत, शैक्षणिक, पत्रकारिता या आंतरिक व्यावसायिक शोध हेतु वेबसाइट देखें और उपयोग करें;', ta: 'தனிப்பட்ட, கல்வி, பத்திரிகை அல்லது உட்புற வணிக ஆய்வுக்காக தளத்தைப் பார்க்கவும் பயன்படுத்தவும்;' })}</li>
                <li>{l({ en: 'quote short excerpts with clear attribution and a link to this website;', kn: 'ಸ್ಪಷ್ಟ ಕ್ರೆಡಿಟ್ ಮತ್ತು ಈ ವೆಬ್‌ಸೈಟ್ ಲಿಂಕ್ ಜೊತೆಗೆ ಚಿಕ್ಕ ಉಲ್ಲೇಖಗಳನ್ನು ಬಳಸಬಹುದು;', hi: 'स्पष्ट श्रेय और इस वेबसाइट के लिंक के साथ छोटे उद्धरण दे सकते हैं;', ta: 'தெளிவான குறிப்பு மற்றும் இந்த தள இணைப்புடன் குறுகிய பகுதிகளை மேற்கோள் கொள்ளலாம்;' })}</li>
                <li>{l({ en: 'share source links and factual references.', kn: 'ಮೂಲ ಲಿಂಕ್‌ಗಳು ಮತ್ತು ತಥ್ಯಾಧಾರಿತ ಉಲ್ಲೇಖಗಳನ್ನು ಹಂಚಬಹುದು.', hi: 'स्रोत लिंक और तथ्यात्मक संदर्भ साझा कर सकते हैं।', ta: 'மூல இணைப்புகளையும் உண்மைத் தகவல் குறிப்புகளையும் பகிரலாம்.' })}</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{l({ en: '4. Restricted use', kn: '4. ನಿರ್ಬಂಧಿತ ಬಳಕೆ', hi: '4. प्रतिबंधित उपयोग', ta: '4. தடைசெய்யப்பட்ட பயன்பாடு' })}</h2>
              <p>{l({ en: 'You may not, without prior written permission:', kn: 'ಪೂರ್ವ ಲಿಖಿತ ಅನುಮತಿ ಇಲ್ಲದೆ, ನೀವು ಮಾಡಬಾರದು:', hi: 'पूर्व लिखित अनुमति के बिना, आप नहीं कर सकते:', ta: 'முன்கூட்டிய எழுத்து அனுமதி இல்லாமல், நீங்கள் செய்யக்கூடாது:' })}</p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>{l({ en: 'copy substantial portions of the site content or design for republication;', kn: 'ಮರುಪ್ರಕಟಣೆಗೆ ಸೈಟ್ ವಿಷಯ ಅಥವಾ ವಿನ್ಯಾಸದ ದೊಡ್ಡ ಭಾಗಗಳನ್ನು ನಕಲಿಸುವುದು;', hi: 'पुनर्प्रकाशन के लिए साइट सामग्री या डिज़ाइन के बड़े हिस्से कॉपी करना;', ta: 'மறுபதிப்பிற்காக தள உள்ளடக்கம் அல்லது வடிவமைப்பின் பெரிய பகுதிகளை நகலெடுப்பது;' })}</li>
                <li>{l({ en: 'reproduce the website branding, presentation, or proprietary compilation in a competing service;', kn: 'ಸ್ಪರ್ಧಾತ್ಮಕ ಸೇವೆಯಲ್ಲಿ ವೆಬ್‌ಸೈಟ್ ಬ್ರ್ಯಾಂಡಿಂಗ್, ಪ್ರಸ್ತುತಿಕೆ ಅಥವಾ ಸ್ವತ್ತು ಸಂಗ್ರಹವನ್ನು ಪುನರುತ್ಪಾದಿಸುವುದು;', hi: 'किसी प्रतिस्पर्धी सेवा में वेबसाइट ब्रांडिंग, प्रस्तुति या स्वामित्व संकलन का पुनरुत्पादन करना;', ta: 'போட்டியாளரான சேவையில் தள பிராண்டிங், അവതരണം அல்லது சொந்தத் தொகுப்பை மீளுருவாக்குவது;' })}</li>
                <li>{l({ en: 'remove attribution, copyright notices, or source traceability markers.', kn: 'ಕ್ರೆಡಿಟ್, ಕಾಪಿರೈಟ್ ಸೂಚನೆಗಳು ಅಥವಾ ಮೂಲ ಹಾದಿ ಗುರುತುಗಳನ್ನು ತೆಗೆದುಹಾಕುವುದು.', hi: 'श्रेय, कॉपीराइट नोटिस या स्रोत ट्रेसबिलिटी संकेत हटाना।', ta: 'குறிப்பீடு, பதிப்புரிமை அறிவிப்பு அல்லது மூலத்தைக் கண்காணிக்கும் அடையாளங்களை அகற்றுவது.' })}</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{l({ en: '5. Source and accuracy disclaimer', kn: '5. ಮೂಲ ಮತ್ತು ನಿಖರತೆ ನಿರಾಕರಣೆ', hi: '5. स्रोत और सटीकता अस्वीकरण', ta: '5. மூல மற்றும் துல்லியக் குறிப்பு' })}</h2>
              <p>
                {l({
                  en: 'Project status information may change over time, and some claims may be marked as pending verification. This website does not constitute legal, financial, investment, engineering, or government advisory. Users should verify critical decisions against official records.',
                  kn: 'ಯೋಜನೆ ಸ್ಥಿತಿ ಮಾಹಿತಿಗಳು ಕಾಲಾನುಗುಣವಾಗಿ ಬದಲಾಗಬಹುದು, ಮತ್ತು ಕೆಲವು ಹೇಳಿಕೆಗಳು ಪರಿಶೀಲನೆ ಬಾಕಿ ಎಂದು ಗುರುತಿಸಬಹುದು. ಈ ವೆಬ್‌ಸೈಟ್ ಕಾನೂನು, ಹಣಕಾಸು, ಹೂಡಿಕೆ, ಎಂಜಿನಿಯರಿಂಗ್ ಅಥವಾ ಸರ್ಕಾರದ ಸಲಹೆ ಆಗುವುದಿಲ್ಲ. ಪ್ರಮುಖ ನಿರ್ಧಾರಗಳನ್ನು ಅಧಿಕೃತ ದಾಖಲೆಗಳೊಂದಿಗೆ ಪರಿಶೀಲಿಸಿ.',
                  hi: 'परियोजना स्थिति संबंधी जानकारी समय के साथ बदल सकती है, और कुछ दावों को सत्यापन लंबित के रूप में चिह्नित किया जा सकता है। यह वेबसाइट कानूनी, वित्तीय, निवेश, इंजीनियरिंग या सरकारी सलाह नहीं है। उपयोगकर्ताओं को महत्वपूर्ण निर्णय आधिकारिक अभिलेखों से सत्यापित करने चाहिए।',
                  ta: 'திட்ட நிலை தகவல்கள் காலப்போக்கில் மாறக்கூடும்; சிலக் கோரிக்கைகள் சரிபார்ப்பு நிலுவையில் எனக் குறிக்கப்படலாம். இந்த தளம் சட்ட, நிதி, முதலீடு, பொறியியல் அல்லது அரசு ஆலோசனையாகாது. முக்கிய முடிவுகளை அதிகாரப்பூர்வ பதிவுகளுடன் சரிபார்க்க வேண்டும்.',
                })}
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{l({ en: '6. External links', kn: '6. ಬಾಹ್ಯ ಲಿಂಕ್‌ಗಳು', hi: '6. बाहरी लिंक', ta: '6. வெளிப்புற இணைப்புகள்' })}</h2>
              <p>
                {l({
                  en: 'This website links to third-party sites for source transparency. We do not control third-party content and are not responsible for its availability, changes, or policies.',
                  kn: 'ಮೂಲ ಪಾರದರ್ಶಕತೆಯಗಾಗಿ ಈ ವೆಬ್‌ಸೈಟ್ ಮೂರನೇ ಪಕ್ಷದ ಸೈಟ್‌ಗಳಿಗೆ ಲಿಂಕ್ ಮಾಡುತ್ತದೆ. ಮೂರನೇ ಪಕ್ಷದ ವಿಷಯದ ಮೇಲೆ ನಮ್ಮ ನಿಯಂತ್ರಣವಿಲ್ಲ; ಅದರ ಲಭ್ಯತೆ, ಬದಲಾವಣೆಗಳು ಅಥವಾ ನೀತಿಗಳಿಗೆ ನಾವು ಹೊಣೆಗಾರರಲ್ಲ.',
                  hi: 'स्रोत पारदर्शिता के लिए यह वेबसाइट तृतीय-पक्ष साइटों से लिंक करती है। तृतीय-पक्ष सामग्री पर हमारा नियंत्रण नहीं है और उसकी उपलब्धता, परिवर्तन या नीतियों के लिए हम जिम्मेदार नहीं हैं।',
                  ta: 'மூலத் தெளிவுத்தன்மைக்காக இந்த தளம் மூன்றாம் தரப்பு தளங்களுக்கு இணைக்கிறது. மூன்றாம் தரப்பு உள்ளடக்கத்தை நாம் கட்டுப்படுத்துவதில்லை; அதன் கிடைப்பாடு, மாற்றங்கள் அல்லது கொள்கைகளுக்கு நாங்கள் பொறுப்பல்ல.',
                })}
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{l({ en: '7. Takedown and permissions', kn: '7. ಟೇಕ್‌ಡೌನ್ ಮತ್ತು ಅನುಮತಿಗಳು', hi: '7. टेकडाउन और अनुमतियाँ', ta: '7. நீக்க கோரிக்கைகள் மற்றும் அனுமதிகள்' })}</h2>
              <p>
                {l({ en: 'For permission requests, copyright concerns, or takedown notices, contact:', kn: 'ಅನುಮತಿ ವಿನಂತಿಗಳು, ಕಾಪಿರೈಟ್ ಆತಂಕಗಳು ಅಥವಾ ತೆಗೆದುಹಾಕುವ ಸೂಚನೆಗಳಿಗೆ ಸಂಪರ್ಕಿಸಿ:', hi: 'अनुमति अनुरोध, कॉपीराइट चिंता या टेकडाउन नोटिस के लिए संपर्क करें:', ta: 'அனுமதி கோரிக்கைகள், பதிப்புரிமை கவலைகள் அல்லது நீக்க அறிவிப்புகளுக்கு தொடர்புகொள்ளவும்:' })}
                <span className="font-semibold"> [replace-with-your-legal-email@example.com]</span>
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{l({ en: '8. Updates to these terms', kn: '8. ಈ ನಿಯಮಗಳ ನವೀಕರಣಗಳು', hi: '8. इन शर्तों के अपडेट', ta: '8. இந்த விதிமுறைகளின் புதுப்பிப்புகள்' })}</h2>
              <p>
                {l({
                  en: 'We may revise these terms periodically. Continued use of the website after updates constitutes acceptance of the revised terms.',
                  kn: 'ಈ ನಿಯಮಗಳನ್ನು ನಾವು ಕಾಲಕಾಲಕ್ಕೆ ಪರಿಷ್ಕರಿಸಬಹುದು. ನವೀಕರಣಗಳ ನಂತರವೂ ವೆಬ್‌ಸೈಟ್ ಬಳಕೆ ಮುಂದುವರಿಸಿದರೆ ಪರಿಷ್ಕೃತ ನಿಯಮಗಳನ್ನು ಅಂಗೀಕರಿಸಿದಂತೆ ಪರಿಗಣಿಸಲಾಗುತ್ತದೆ.',
                  hi: 'हम समय-समय पर इन शर्तों में संशोधन कर सकते हैं। अपडेट के बाद वेबसाइट का निरंतर उपयोग संशोधित शर्तों की स्वीकृति माना जाएगा।',
                  ta: 'இந்த விதிமுறைகளை காலம் காலமாக மாற்றலாம். புதுப்பிப்புகளுக்குப் பிறகும் தளத்தை தொடர்ந்து பயன்படுத்துவது, மாற்றிய விதிமுறைகளை ஏற்றுக்கொண்டதாக கருதப்படும்.',
                })}
              </p>
            </div>
          </section>
        </div>
      </main>
    </SiteFrame>
  );
}

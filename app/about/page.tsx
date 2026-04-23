import type { Metadata } from 'next';
import SiteFrame from '@/components/SiteFrame';
import PageIntro from '@/components/PageIntro';
import Pillars from '@/components/Pillars';
import SourceReferences from '@/components/SourceReferences';
import JsonLd from '@/components/JsonLd';
import { getServerLocale, pickByLocale } from '@/lib/i18n/server';

const breadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://kwin-city.com' },
    { '@type': 'ListItem', position: 2, name: 'About', item: 'https://kwin-city.com/about' },
  ],
};

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  const title = pickByLocale(locale, {
    en: 'About KWIN City | Project Overview, Scale, Vision & Verification Boundaries',
    kn: 'KWIN City ಬಗ್ಗೆ | ಜ್ಞಾನ · ಕ್ಷೇಮ · ನವೀನತೆ ಟೌನ್‌ಶಿಪ್',
    hi: 'KWIN City के बारे में | ज्ञान · कल्याण · नवाचार टाउनशिप',
    ta: 'KWIN City பற்றி | அறிவு · நல்வாழ்வு · புதுமை நகரம்',
  });
  const description = pickByLocale(locale, {
    en: 'Understand what KWIN City is, where it is proposed, how large it is, what sectors it targets, and which claims are confirmed versus still awaiting primary verification.',
    kn: 'KWIN City ಕುರಿತು ತಿಳಿಯಿರಿ — ಉತ್ತರ ಬೆಂಗಳೂರಿನ ದೊಡ್ಡಬಳ್ಳಾಪುರದಲ್ಲಿ ಪ್ರಸ್ತಾಪಿತ 465 ಏಕರೆ ಜ್ಞಾನ-ಆರ್ಥಿಕ ಟೌನ್‌ಶಿಪ್.',
    hi: 'KWIN City के बारे में जानें — उत्तर बेंगलुरु के डोड्डाबल्लापुर में प्रस्तावित 465 एकड़ ज्ञान-आधारित टाउनशिप।',
    ta: 'KWIN City பற்றி அறியுங்கள் — வட பெங்களூருவின் டொಡ್ಡபள்ளாபுராவில் முன்மொழியப்பட்ட அறிவு-சார்ந்த நகரத் திட்டம்.',
  });
  const ogTitle = pickByLocale(locale, {
    en: 'About KWIN City — What the Project Proposes and What the Evidence Supports',
    kn: 'KWIN City ಬಗ್ಗೆ — ಜ್ಞಾನ, ಕ್ಷೇಮ, ನವೀನತೆ ಟೌನ್‌ಶಿಪ್',
    hi: 'KWIN City के बारे में — ज्ञान, कल्याण, नवाचार टाउनशिप',
    ta: 'KWIN City பற்றி — அறிவு, நல்வாழ்வு, புதுமை நகரம்',
  });
  const ogDescription = pickByLocale(locale, {
    en: 'A clear overview of KWIN City’s scale, location, pillars, and verification status for investors, researchers, residents, and journalists.',
    kn: 'ಮೂರು ಸ್ತಂಭಗಳು. ಒಂದು ಮಹತ್ವಾಕಾಂಕ್ಷಿ ನಗರ. KWIN City ಏನು ಪ್ರಸ್ತಾಪಿಸುತ್ತದೆ ಎಂಬುದನ್ನು ನೋಡಿ.',
    hi: 'तीन स्तंभ। एक महत्वाकांक्षी शहर। KWIN City क्या प्रस्तावित करता है, जानिए।',
    ta: 'மூன்று தளங்கள். ஒரு உயர்வான நகரக் காட்சி. KWIN City என்ன முன்வைக்கிறது என்பதை அறியுங்கள்.',
  });

  return {
    title,
    description,
    keywords: [
      'about KWIN City',
      'KWIN City overview',
      'knowledge economy township India',
      'KIADB Doddaballapura',
      'North Bengaluru urban development',
    ],
    alternates: { canonical: 'https://kwin-city.com/about' },
    openGraph: {
      title: ogTitle,
      description: ogDescription,
      url: 'https://kwin-city.com/about',
      type: 'website',
      images: [{ url: 'https://kwin-city.com/about/opengraph-image' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: ogTitle,
      description: ogDescription,
      images: ['https://kwin-city.com/about/opengraph-image'],
    },
  };
}

export default async function AboutPage() {
  const locale = await getServerLocale();
  const eyebrow = pickByLocale(locale, {
    en: 'About KWIN City',
    kn: 'KWIN City ಬಗ್ಗೆ',
    hi: 'KWIN City के बारे में',
    ta: 'KWIN City பற்றி',
  });
  const title = pickByLocale(locale, {
    en: 'A township designed around people, knowledge, and the future.',
    kn: 'ಜನರು, ಜ್ಞಾನ ಮತ್ತು ಭವಿಷ್ಯವನ್ನು ಕೇಂದ್ರದಲ್ಲಿಟ್ಟ ಟೌನ್‌ಶಿಪ್.',
    hi: 'लोगों, ज्ञान और भविष्य के लिए डिजाइन की गई टाउनशिप।',
    ta: 'மக்கள், அறிவு மற்றும் எதிர்காலத்தை மையமாகக் கொண்ட நகரத் திட்டம்.',
  });
  const description = pickByLocale(locale, {
    en: 'KWIN City brings three ideas together that rarely meet at scale: world-class research and education, genuine wellbeing infrastructure, and breakthrough industrial clusters. This page tells you what\'s proposed, what\'s confirmed, and why it matters.',
    kn: 'KWIN City ಮೂರು ಪ್ರಮುಖ ಕಲ್ಪನೆಗಳನ್ನು ಒಟ್ಟುಗೂಡಿಸುತ್ತದೆ: ಜಾಗತಿಕ ಮಟ್ಟದ ಸಂಶೋಧನೆ, ನಿಜವಾದ ಕ್ಷೇಮ ಮೂಲಸೌಕರ್ಯ ಮತ್ತು ನವೀನ ಕೈಗಾರಿಕಾ ಕ್ಲಸ್ಟರ್‌ಗಳು.',
    hi: 'KWIN City तीन प्रमुख विचारों को साथ लाता है: विश्वस्तरीय अनुसंधान, वास्तविक कल्याण अवसंरचना और नवाचार उद्योग क्लस्टर।',
    ta: 'KWIN City மூன்று முக்கியக் கருத்துகளை ஒன்றாகக் கொண்டு வருகிறது: உலகத் தர ஆய்வு, உண்மையான நல்வாழ்வு உட்கட்டமைப்பு மற்றும் புதுமை தொழில் மையங்கள்.',
  });

  return (
    <SiteFrame>
      <JsonLd data={breadcrumb} />
      <main id="main-content" role="main">
        <PageIntro
          eyebrow={eyebrow}
          title={title}
          description={description}
          sourceIds={['brief', 'kiadb']}
        />
        <section className="section bg-white">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-8 items-start">
              <div className="rounded-2xl border border-gray-200 bg-gray-50 p-8">
                <h2 className="text-3xl font-semibold text-gray-900 mb-4">{pickByLocale(locale, { en: 'Current reading of the project', kn: 'ಯೋಜನೆಯ ಪ್ರಸ್ತುತ ಓದು', hi: 'परियोजना की वर्तमान समझ', ta: 'திட்டத்தின் தற்போதைய நிலை புரிதல்' })}</h2>
                <p className="text-gray-700 leading-8 mb-4">
                  {pickByLocale(locale, {
                    en: 'At this stage, the safest description is that KWIN City is a proposed North Bengaluru township framed around knowledge, wellbeing, and innovation. The portal treats the brief as a live project narrative, not as final proof of implementation.',
                    kn: 'ಈ ಹಂತದಲ್ಲಿ, KWIN City ಅನ್ನು ಜ್ಞಾನ, ಕ್ಷೇಮ ಮತ್ತು ನವೀನತೆಯ ಚೌಕಟ್ಟಿನಲ್ಲಿರುವ ಉತ್ತರ ಬೆಂಗಳೂರಿನ ಪ್ರಸ್ತಾಪಿತ ಟೌನ್‌ಶಿಪ್ ಎಂದು ವಿವರಿಸುವುದು ಸೂಕ್ತ. ಈ ಪೋರ್ಟಲ್ ಪ್ರಾಜೆಕ್ಟ್ ಬ್ರಿಫ್ ಅನ್ನು ಅಂತಿಮ ಅನುಷ್ಠಾನ ಸಾಬೀತು ಎಂದು ಅಲ್ಲ, ಮುಂದುವರಿಯುವ ಕಥನವಾಗಿ ನೋಡುತ್ತದೆ.',
                    hi: 'इस चरण में सुरक्षित वर्णन यह है कि KWIN City उत्तर बेंगलुरु का एक प्रस्तावित टाउनशिप है, जो ज्ञान, कल्याण और नवाचार पर आधारित है। यह पोर्टल ब्रीफ को अंतिम कार्यान्वयन प्रमाण नहीं, बल्कि चल रही परियोजना कथा मानता है।',
                    ta: 'இந்த நிலையிலேயே பாதுகாப்பான விளக்கம் என்னவென்றால், KWIN City என்பது அறிவு, நல்வாழ்வு மற்றும் புதுமையை மையமாகக் கொண்ட வட பெங்களூருவில் முன்மொழியப்பட்ட நகரத் திட்டம். இந்த தளம், திட்டக் குறிப்பு இறுதி நடைமுறை சான்றாக அல்லாமல், முன்னேறும் திட்டக் கதைபோல் கருதுகிறது.',
                  })}
                </p>
                <p className="text-gray-700 leading-8 mb-0">
                  {pickByLocale(locale, {
                    en: 'That is why the site separates overview content from full source review and keeps major figures marked as pending primary verification until public institutional records are available.',
                    kn: 'ಅದಕ್ಕಾಗಿ ಈ ಸೈಟ್, ಸಮಗ್ರ ಮೂಲ ವಿಮರ್ಶೆಯನ್ನು ಅವಲೋಕನ ವಿಷಯದಿಂದ ಬೇರ್ಪಡಿಸಿ, ಸಾರ್ವಜನಿಕ ಸಂಸ್ಥೆಗಳ ದಾಖಲೆಗಳು ಲಭ್ಯವಾಗುವವರೆಗೆ ಪ್ರಮುಖ ಅಂಕಿಗಳನ್ನು “ಪ್ರಾಥಮಿಕ ಪರಿಶೀಲನೆ ಬಾಕಿ” ಎಂದು ಗುರುತಿಸುತ್ತದೆ.',
                    hi: 'इसी कारण साइट अवलोकन सामग्री को पूर्ण स्रोत समीक्षा से अलग रखती है और सार्वजनिक संस्थागत अभिलेख उपलब्ध होने तक प्रमुख आंकड़ों को प्राथमिक सत्यापन लंबित के रूप में चिह्नित करती है।',
                    ta: 'அதனால் தான் இந்த தளம், கண்ணோட்ட உள்ளடக்கத்தையும் முழுமையான மூல சரிபார்ப்பையும் தனியே வைத்திருக்கிறது; பொதுத் துறை பதிவுகள் கிடைக்கும் வரை முக்கிய எண்ணிக்கைகளை “முதன்மை சரிபார்ப்பு நிலுவை” எனக் குறிக்கிறது.',
                  })}
                </p>
              </div>
              <SourceReferences sourceIds={['brief', 'kiadb', 'economicSurvey']} />
            </div>
          </div>
        </section>
        <Pillars />
      </main>
    </SiteFrame>
  );
}

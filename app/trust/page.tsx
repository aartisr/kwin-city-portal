import type { Metadata } from 'next';
import Link from 'next/link';
import SiteFrame from '@/components/SiteFrame';
import SourceReferences from '@/components/SourceReferences';
import { getServerLocale, pickByLocale } from '@/lib/i18n/server';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  return {
    title: pickByLocale(locale, {
      en: 'Trust Center | Authenticity, Attribution, and Originality',
      kn: 'ವಿಶ್ವಾಸ ಕೇಂದ್ರ | ಪ್ರಾಮಾಣಿಕತೆ, ಮೂಲೋಕ್ತಿ ಮತ್ತು ಮೂಲತತ್ವ',
      hi: 'ट्रस्ट सेंटर | प्रामाणिकता, एट्रिब्यूशन और मौलिकता',
      ta: 'நம்பிக்கை மையம் | உண்மைத்தன்மை, மேற்கோள் மற்றும் மூலத்தன்மை',
    }),
    description: pickByLocale(locale, {
      en: 'The KWIN City Trust Center: our authenticity standards, source-attribution protocol, originality rules, and verification boundaries.',
      kn: 'KWIN City ವಿಶ್ವಾಸ ಕೇಂದ್ರ: ಪ್ರಾಮಾಣಿಕತಾ ಮಾನದಂಡಗಳು, ಮೂಲೋಕ್ತಿ ಪ್ರೋಟೋಕಾಲ್, ಮೂಲತತ್ವ ನಿಯಮಗಳು ಮತ್ತು ಪರಿಶೀಲನಾ ಗಡಿಗಳು.',
      hi: 'KWIN City ट्रस्ट सेंटर: हमारे प्रामाणिकता मानक, स्रोत-एट्रिब्यूशन प्रोटोकॉल, मौलिकता नियम और सत्यापन सीमाएं।',
      ta: 'KWIN City நம்பிக்கை மையம்: உண்மைத்தன்மை தரநிலைகள், மூல மேற்கோள் நெறிமுறை, மூலத்தன்மை விதிகள் மற்றும் சரிபார்ப்பு எல்லைகள்.',
    }),
    alternates: {
      canonical: 'https://kwin-city.com/trust',
    },
  };
}

export default async function TrustPage() {
  const locale = await getServerLocale();
  const l = (values: { en: string; kn: string; hi: string; ta: string }): string => pickByLocale<string>(locale, values);

  const principles = [
    {
      title: l({ en: 'Primary Source First', kn: 'ಮೊದಲು ಪ್ರಾಥಮಿಕ ಮೂಲ', hi: 'प्राथमिक स्रोत पहले', ta: 'முதலில் முதன்மை மூலம்' }),
      body: l({ en: 'Project-critical facts are prioritized from KIADB and official institutional records. Secondary narratives are clearly labeled as context.', kn: 'ಯೋಜನೆಗೆ ಮಹತ್ವದ ಅಂಶಗಳಿಗೆ KIADB ಮತ್ತು ಅಧಿಕೃತ ದಾಖಲೆಗಳಿಗೆ ಆದ್ಯತೆ ನೀಡಲಾಗುತ್ತದೆ. ದ್ವಿತೀಯ ಕಥನಗಳನ್ನು ಸಂದರ್ಭ ಎಂದು ಸ್ಪಷ್ಟವಾಗಿ ಗುರುತಿಸಲಾಗುತ್ತದೆ.', hi: 'परियोजना-सम्बंधित महत्वपूर्ण तथ्यों के लिए KIADB और आधिकारिक संस्थागत अभिलेखों को प्राथमिकता दी जाती है। द्वितीयक कथनों को संदर्भ के रूप में स्पष्ट लेबल किया जाता है।', ta: 'திட்டத்திற்கான முக்கிய தகவல்களில் KIADB மற்றும் அதிகாரப்பூர்வ பதிவுகளுக்கு முன்னுரிமை வழங்கப்படுகிறது. இரண்டாம் நிலை விளக்கங்கள் சூழல் எனத் தெளிவாக குறிக்கப்படுகின்றன.' }),
    },
    {
      title: l({ en: 'Verification Status Always Visible', kn: 'ಪರಿಶೀಲನಾ ಸ್ಥಿತಿ ಸದಾ ಗೋಚರ', hi: 'सत्यापन स्थिति हमेशा स्पष्ट', ta: 'சரிபார்ப்பு நிலை எப்போதும் தெளிவு' }),
      body: l({ en: 'Claims are marked as primary, pending-verification, or contextual. Ambiguity is disclosed instead of hidden.', kn: 'ಹೇಳಿಕೆಗಳನ್ನು ಪ್ರಾಥಮಿಕ, ಪರಿಶೀಲನೆ ಬಾಕಿ ಅಥವಾ ಸಂದರ್ಭಾತ್ಮಕ ಎಂದು ಗುರುತಿಸಲಾಗುತ್ತದೆ. ಅಸ್ಪಷ್ಟತೆ ಮರೆಮಾಡದೇ ಬಹಿರಂಗಪಡಿಸಲಾಗುತ್ತದೆ.', hi: 'दावों को प्राथमिक, सत्यापन-लंबित, या संदर्भात्मक रूप में चिह्नित किया जाता है। अस्पष्टता को छिपाने के बजाय प्रकट किया जाता है।', ta: 'கூற்றுகள் முதன்மை, சரிபார்ப்பு நிலுவை, அல்லது சூழல் என குறிக்கப்படுகின்றன. தெளிவின்மை மறைக்கப்படாமல் வெளிப்படுத்தப்படுகிறது.' }),
    },
    {
      title: l({ en: 'Attribution by Default', kn: 'ಡೀಫಾಲ್ಟ್ ಆಗಿ ಮೂಲೋಕ್ತಿ', hi: 'डिफ़ॉल्ट रूप से एट्रिब्यूशन', ta: 'இயல்பாகவே மேற்கோள் வழங்கல்' }),
      body: l({ en: 'Every substantive section is designed to expose source lineage and give direct access to references.', kn: 'ಪ್ರತಿ ವಿಷಯಾಧಾರಿತ ವಿಭಾಗವೂ ಮೂಲ ವಂಶಾವಳಿಯನ್ನು ತೋರಿಸಿ ಉಲ್ಲೇಖಗಳಿಗೆ ನೇರ ಪ್ರವೇಶ ನೀಡುವಂತೆ ವಿನ್ಯಾಸಗೊಳಿಸಲಾಗಿದೆ.', hi: 'हर महत्वपूर्ण अनुभाग को स्रोत-विरासत दिखाने और संदर्भों तक सीधे पहुंच देने के लिए डिज़ाइन किया गया है।', ta: 'ஒவ்வொரு முக்கிய பகுதியும் மூல வரிசையை வெளிப்படுத்தி மேற்கோள்களுக்கு நேரடி அணுகலை வழங்கும் வகையில் வடிவமைக்கப்பட்டுள்ளது.' }),
    },
    {
      title: l({ en: 'Original Editorial Synthesis', kn: 'ಮೂಲ ಸಂಪಾದಕೀಯ ಸಂಯೋಜನೆ', hi: 'मौलिक संपादकीय संश्लेषण', ta: 'மூல தொகுப்பாசிரியர் ஒருங்கிணைப்பு' }),
      body: l({ en: 'Interpretation, framing, and analysis are original. External materials are cited, not copied or repackaged as proprietary claims.', kn: 'ವ್ಯಾಖ್ಯಾನ, ರೂಪರೇಖೆ ಮತ್ತು ವಿಶ್ಲೇಷಣೆ ಮೂಲವಾಗಿವೆ. ಹೊರಗಿನ ವಿಷಯಗಳನ್ನು ಉಲ್ಲೇಖಿಸಲಾಗುತ್ತದೆ; ನಕಲಿಸಿ ಸ್ವಂತ ಹೇಳಿಕೆ ಎಂದು ನೀಡಲಾಗುವುದಿಲ್ಲ.', hi: 'व्याख्या, फ्रेमिंग और विश्लेषण मौलिक हैं। बाहरी सामग्री का हवाला दिया जाता है; उसे कॉपी या स्वामित्व दावे के रूप में पुनर्पैकेज नहीं किया जाता।', ta: 'விளக்கம், அமைப்பு, பகுப்பாய்வு ஆகியவை மூலமாக உள்ளன. வெளிப்புற உள்ளடக்கங்கள் மேற்கோளிடப்படுகின்றன; நகலெடுத்து சொந்தக் கூற்றாக மாற்றப்படுவதில்லை.' }),
    },
    {
      title: l({ en: 'Evidence Boundaries', kn: 'ಸಾಕ್ಷ್ಯದ ಗಡಿಗಳು', hi: 'साक्ष्य की सीमाएं', ta: 'ஆதார எல்லைகள்' }),
      body: l({ en: 'We explicitly state what evidence can prove and cannot prove. Context is not presented as confirmation.', kn: 'ಸಾಕ್ಷ್ಯವು ಏನು ಸಾಬೀತು ಮಾಡಬಹುದು/ಮಾಡಲಾರದು ಎಂಬುದನ್ನು ನಾವು ಸ್ಪಷ್ಟವಾಗಿ ಹೇಳುತ್ತೇವೆ. ಸಂದರ್ಭವನ್ನು ದೃಢೀಕರಣವಾಗಿ ನೀಡುವುದಿಲ್ಲ.', hi: 'हम स्पष्ट रूप से बताते हैं कि साक्ष्य क्या सिद्ध कर सकता है और क्या नहीं। संदर्भ को पुष्टि के रूप में प्रस्तुत नहीं किया जाता।', ta: 'ஆதாரம் எதை நிரூபிக்க முடியும்/முடியாது என்பதை நாங்கள் தெளிவாகக் கூறுகிறோம். சூழல் தகவல் உறுதிப்பாடாக வழங்கப்படுவதில்லை.' }),
    },
    {
      title: l({ en: 'Open Auditability', kn: 'ಮುಕ್ತ ಪರಿಶೀಲನೀಯತೆ', hi: 'खुली ऑडिटयोग्यता', ta: 'திறந்த ஆய்வு திறன்' }),
      body: l({ en: 'Readers can inspect the full claim-to-source chain through the Source Ledger and Evidence Vault.', kn: 'ಓದುಗರು Source Ledger ಮತ್ತು Evidence Vault ಮೂಲಕ ಸಂಪೂರ್ಣ ಹೇಳಿಕೆ-ಮೂಲ ಸರಪಳಿಯನ್ನು ಪರಿಶೀಲಿಸಬಹುದು.', hi: 'पाठक Source Ledger और Evidence Vault के माध्यम से पूरे दावा-से-स्रोत क्रम की जांच कर सकते हैं।', ta: 'படிப்போர் Source Ledger மற்றும் Evidence Vault வழியாக முழு கூற்று-மூலச் சங்கிலியை ஆய்வு செய்யலாம்.' }),
    },
  ] as const;

  return (
    <SiteFrame>
      <main className="bg-[linear-gradient(180deg,#f8fafc_0%,#ffffff_35%,#f8fafc_100%)]">
        <section className="pt-28 pb-14 border-b border-slate-200">
          <div className="container">
            <p className="text-xs font-bold tracking-[0.24em] uppercase text-cyan-700 mb-4">{l({ en: 'Trust Center', kn: 'ವಿಶ್ವಾಸ ಕೇಂದ್ರ', hi: 'ट्रस्ट सेंटर', ta: 'நம்பிக்கை மையம்' })}</p>
            <h1 className="text-4xl md:text-6xl font-black text-slate-900 max-w-5xl leading-tight">
              {l({ en: 'Authenticity and Originality Are Product Requirements', kn: 'ಪ್ರಾಮಾಣಿಕತೆ ಮತ್ತು ಮೂಲತತ್ವವು ಉತ್ಪನ್ನದ ಮೂಲ ಅವಶ್ಯಕತೆಗಳು', hi: 'प्रामाणिकता और मौलिकता उत्पाद की मूल आवश्यकताएं हैं', ta: 'உண்மைத்தன்மையும் மூலத்தன்மையும் தயாரிப்பின் அடிப்படைத் தேவைகள்' })}
            </h1>
            <p className="mt-5 text-base md:text-lg text-slate-700 max-w-4xl leading-8">
              {l({ en: 'Trust is treated as infrastructure. This portal is built so evidence, attribution, and uncertainty are visible by design across pages, not hidden in legal fine print.', kn: 'ವಿಶ್ವಾಸವನ್ನು ಮೂಲಸೌಕರ್ಯವೆಂದು ಪರಿಗಣಿಸಲಾಗಿದೆ. ಸಾಕ್ಷ್ಯ, ಮೂಲೋಕ್ತಿ ಮತ್ತು ಅನಿಶ್ಚಿತತೆ ಪುಟಗಳಾದ್ಯಂತ ವಿನ್ಯಾಸದಲ್ಲಿಯೇ ಗೋಚರಿಸುವಂತೆ ಈ ಪೋರ್ಟಲ್ ನಿರ್ಮಿಸಲಾಗಿದೆ; ಕಾನೂನು ಸೂಕ್ಷ್ಮ ಪಠ್ಯದಲ್ಲಿ ಮರೆಮಾಡಲಾಗುವುದಿಲ್ಲ.', hi: 'भरोसे को अवसंरचना माना गया है। यह पोर्टल इस तरह बनाया गया है कि साक्ष्य, एट्रिब्यूशन और अनिश्चितता पृष्ठों पर स्पष्ट दिखें, कानूनी सूक्ष्म पाठ में छिपे नहीं।', ta: 'நம்பிக்கை ஒரு அடிக்கட்டாக கருதப்படுகிறது. ஆதாரம், மேற்கோள், நிச்சயமின்மை ஆகியவை பக்கங்களிலேயே தெளிவாகக் காணப்படும்படி இந்த தளம் வடிவமைக்கப்பட்டுள்ளது; சட்டச் சிறு எழுத்துகளில் மறைக்கப்படவில்லை.' })}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/sources" className="rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800">
                {l({ en: 'Open Source Ledger', kn: 'ಮೂಲ ಲೆಡ್ಜರ್ ತೆರೆಯಿರಿ', hi: 'स्रोत लेजर खोलें', ta: 'மூல பதிவேட்டைத் திறக்கவும்' })}
              </Link>
              <Link href="/evidence" className="rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50">
                {l({ en: 'Inspect Evidence Vault', kn: 'ಸಾಕ್ಷ್ಯ ಭಂಡಾರ ಪರಿಶೀಲಿಸಿ', hi: 'एविडेंस वॉल्ट देखें', ta: 'ஆதார களஞ்சியத்தை ஆய்வு செய்யவும்' })}
              </Link>
              <Link href="/news-intelligence" className="rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50">
                {l({ en: 'Monitor News Intelligence', kn: 'ಸುದ್ದಿ ಇಂಟೆಲಿಜೆನ್ಸ್ ನೋಡಿ', hi: 'न्यूज़ इंटेलिजेंस मॉनिटर करें', ta: 'செய்தி நுண்ணறிவைப் கண்காணிக்கவும்' })}
              </Link>
            </div>
          </div>
        </section>

        <section className="py-14">
          <div className="container grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-5">
            {principles.map((item) => (
              <article key={item.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="text-xl font-extrabold text-slate-900 mb-2">{item.title}</h2>
                <p className="text-sm text-slate-700 leading-7">{item.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="pb-16">
          <div className="container grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            <article className="rounded-2xl border border-amber-200 bg-amber-50 p-6">
              <h2 className="text-2xl font-extrabold text-amber-900 mb-3">{l({ en: 'Authenticity Scope', kn: 'ಪ್ರಾಮಾಣಿಕತಾ ವ್ಯಾಪ್ತಿ', hi: 'प्रामाणिकता का दायरा', ta: 'உண்மைத்தன்மை வரம்பு' })}</h2>
              <ul className="space-y-2 text-sm text-amber-900 leading-7">
                <li>{l({ en: 'Strategic interpretation is editorial and original to this portal.', kn: 'ತಂತ್ರಯುಕ್ತ ವ್ಯಾಖ್ಯಾನವು ಸಂಪಾದಕೀಯವಾಗಿದ್ದು ಈ ಪೋರ್ಟಲ್‌ಗೆ ಮೂಲವಾಗಿದೆ.', hi: 'रणनीतिक व्याख्या संपादकीय है और इस पोर्टल की मौलिक सामग्री है।', ta: 'மூலோபாய விளக்கம் தொகுப்பாசிரியரின் மூலப் பணியாக இந்த தளத்திற்கே உரியது.' })}</li>
                <li>{l({ en: 'Third-party facts remain owned by their original publishers and are attributed.', kn: 'ತೃತೀಯಪಕ್ಷ ಅಂಶಗಳು ಮೂಲ ಪ್ರಕಾಶಕರದೇ ಆಗಿದ್ದು, ಸರಿಯಾದ ಮೂಲೋಕ್ತಿಯೊಂದಿಗೆ ನೀಡಲಾಗುತ್ತದೆ.', hi: 'तृतीय-पक्ष तथ्य अपने मूल प्रकाशकों के ही स्वामित्व में रहते हैं और उचित एट्रिब्यूशन के साथ दिए जाते हैं।', ta: 'மூன்றாம் தரப்பு தகவல்கள் அவற்றின் மூல வெளியீட்டாளர்களின் உரிமையிலேயே இருந்து, சரியான மேற்கோளுடன் வழங்கப்படுகின்றன.' })}</li>
                <li>{l({ en: 'Pending-verification statements are intentionally not framed as institutional confirmation.', kn: 'ಪರಿಶೀಲನೆ ಬಾಕಿ ಹೇಳಿಕೆಗಳನ್ನು ಸಂಸ್ಥಾತ್ಮಕ ದೃಢೀಕರಣದಂತೆ ಉದ್ದೇಶಪೂರ್ವಕವಾಗಿ ರೂಪಿಸಲಾಗುವುದಿಲ್ಲ.', hi: 'सत्यापन-लंबित कथनों को जानबूझकर संस्थागत पुष्टि की तरह प्रस्तुत नहीं किया जाता।', ta: 'சரிபார்ப்பு நிலுவையில் உள்ள கூற்றுகள் நிறுவல் உறுதிப்பாடாக நினைக்கப்படாத வகையில் தெளிவாகக் காட்டப்படுகின்றன.' })}</li>
                <li>{l({ en: 'Readers should rely on primary records for legal, investment, or regulatory decisions.', kn: 'ಕಾನೂನು, ಹೂಡಿಕೆ ಅಥವಾ ನಿಯಂತ್ರಣ ನಿರ್ಧಾರಗಳಿಗೆ ಓದುಗರು ಪ್ರಾಥಮಿಕ ದಾಖಲೆಗಳನ್ನೇ ಅವಲಂಬಿಸಬೇಕು.', hi: 'कानूनी, निवेश या नियामकीय निर्णयों के लिए पाठकों को प्राथमिक अभिलेखों पर निर्भर रहना चाहिए।', ta: 'சட்ட, முதலீட்டு, ஒழுங்குமுறை முடிவுகளுக்குப் படிப்போர் முதன்மை பதிவுகளையே நம்ப வேண்டும்.' })}</li>
              </ul>
            </article>
            <SourceReferences sourceIds={['kiadb', 'brief', 'economicSurvey', 'aviation']} heading={l({ en: 'Core trust anchors', kn: 'ಮುಖ್ಯ ವಿಶ್ವಾಸ ಆಧಾರಗಳು', hi: 'मुख्य भरोसा आधार', ta: 'முக்கிய நம்பிக்கை ஆதாரங்கள்' })} />
          </div>
        </section>
      </main>
    </SiteFrame>
  );
}

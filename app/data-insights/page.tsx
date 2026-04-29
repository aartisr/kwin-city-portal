import type { Metadata } from 'next';
import SiteFrame from '@/components/SiteFrame';
import LazyDataInsightsHub from '@/components/LazyDataInsightsHub';
import { OPENCITY_DATASETS } from '@/lib/data-insights-datasets';
import { getServerLocale, pickByLocale } from '@/lib/i18n/server';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  return {
    title: pickByLocale(locale, {
      en: 'KWIN Data Insights Lab | North Bengaluru Charts, Open Data & Regional Analytics',
      kn: 'ಡೇಟಾ ಒಳನೋಟ ಪ್ರಯೋಗಾಲಯ | ಲೈವ್ ಚಾರ್ಟ್‌ಗಳು · ಪ್ರಾದೇಶಿಕ ವಿಶ್ಲೇಷಣೆ · ಮುಕ್ತ ಡೇಟಾ',
      hi: 'डेटा इनसाइट्स लैब | लाइव चार्ट · क्षेत्रीय विश्लेषण · ओपन डेटा',
      ta: 'தரவு நுண்ணறிவு ஆய்வகம் | நேரடி வரைபடங்கள் · பிராந்திய பகுப்பாய்வு · திறந்த தரவு',
    }),
    description: pickByLocale(locale, {
      en: 'Interactive charts from Karnataka open data and KWIN datasets covering airport growth, STRR corridors, groundwater, lakes, ecology, and sector projections.',
      kn: 'ಕರ್ನಾಟಕ ಸರ್ಕಾರದ ದೃಢೀಕೃತ ಮುಕ್ತ ಡೇಟಾದಿಂದ ರಚಿಸಲಾದ ಲೈವ್ ಚಾರ್ಟ್‌ಗಳು: ವಿಮಾನ ನಿಲ್ದಾಣ ಸಂಪರ್ಕ ಬೆಳವಣಿಗೆ, STRR ಕಾರಿಡಾರ್ ಅಭಿವೃದ್ಧಿ, ಭೂಗತಜಲ ಸ್ಥೈರ್ಯ, ಸರೋವರ ಆಡಳಿತ ಮತ್ತು KWIN ಕ್ಷೇತ್ರ ಅಂದಾಜುಗಳು.',
      hi: 'कर्नाटक सरकार के सत्यापित ओपन डेटा से बने लाइव चार्ट: एयरपोर्ट कनेक्टिविटी वृद्धि, STRR कॉरिडोर विकास, भूजल लचीलापन, झील प्रशासन और KWIN सेक्टर प्रक्षेपण।',
      ta: 'கர்நாடக அரசு உறுதிப்படுத்திய திறந்த தரவிலிருந்து உருவாகும் நேரடி வரைபடங்கள்: விமான நிலைய இணைப்பு வளர்ச்சி, STRR வழித்தட மேம்பாடு, நிலத்தடி நீர் தாங்குத்திறன், ஏரி நிர்வாகம் மற்றும் KWIN துறை முன்னறிவிப்புகள்.',
    }),
    keywords: [
      'Bengaluru data insights',
      'Karnataka open data charts',
      'North Bengaluru analytics',
      'KWIN data lab',
    ],
    alternates: { canonical: 'https://kwin-city.com/data-insights' },
    openGraph: {
      title: pickByLocale(locale, {
        en: 'KWIN Data Insights Lab — Interactive Regional Charts from Open Data',
        kn: 'KWIN City ಡೇಟಾ ಒಳನೋಟ ಪ್ರಯೋಗಾಲಯ — ಸರ್ಕಾರದ ಮುಕ್ತ ಡೇಟಾದಿಂದ ಲೈವ್ ವಿಶ್ಲೇಷಣೆ',
        hi: 'KWIN City डेटा इनसाइट्स लैब — सरकारी ओपन डेटा से लाइव क्षेत्रीय विश्लेषण',
        ta: 'KWIN City தரவு நுண்ணறிவு ஆய்வகம் — அரசு திறந்த தரவிலிருந்து நேரடி பகுப்பாய்வு',
      }),
      description: pickByLocale(locale, {
        en: 'Explore North Bengaluru through interactive charts built from government open data, KWIN datasets, airport traffic, water resilience, ecology, and sector projections.',
        kn: 'ಕರ್ನಾಟಕ ಮುಕ್ತ ಡೇಟಾದಿಂದ ಚಾಲಿತ ಸಂವಾದಾತ್ಮಕ ಚಾರ್ಟ್‌ಗಳು: ವಿಮಾನ ನಿಲ್ದಾಣ ಬೆಳವಣಿಗೆ, ಕಾರಿಡಾರ್‌ಗಳು, ಭೂಗತಜಲ ಮತ್ತು ಕ್ಷೇತ್ರ ಅಂದಾಜುಗಳು.',
        hi: 'कर्नाटक ओपन डेटा से संचालित इंटरैक्टिव चार्ट: एयरपोर्ट वृद्धि, कॉरिडोर, भूजल और सेक्टर प्रक्षेपण।',
        ta: 'கர்நாடக திறந்த தரவால் இயங்கும் இணையாடல் வரைபடங்கள்: விமான நிலைய வளர்ச்சி, வழித்தடங்கள், நிலத்தடி நீர், துறை முன்னறிவிப்புகள்.',
      }),
      url: 'https://kwin-city.com/data-insights',
      type: 'website',
    },
  };
}

export default async function DataInsightsPage() {
  const locale = await getServerLocale();
  const l = (values: Parameters<typeof pickByLocale<string>>[1]) => pickByLocale(locale, values);

  return (
    <SiteFrame>
      <main id="main-content" role="main">
        {/* Hero */}
        <section className="kwin-page-top pb-14 bg-[linear-gradient(150deg,#040714_0%,#0D1640_45%,#07131F_100%)]">
          <div className="container">
            <div className="max-w-3xl">
              <div className="eyebrow text-[#F5A623] mb-4">{l({ en: 'Data Insights Lab', kn: 'ಡೇಟಾ ಒಳನೋಟ ಪ್ರಯೋಗಾಲಯ', hi: 'डेटा इनसाइट्स लैब', ta: 'தரவு நுண்ணறிவு ஆய்வகம்' })}</div>
              <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-5">
                {l({ en: 'Regional data.', kn: 'ಪ್ರಾದೇಶಿಕ ಡೇಟಾ.', hi: 'क्षेत्रीय डेटा।', ta: 'பிராந்திய தரவு.' })}{' '}
                <span className="bg-gradient-to-r from-amber-400 to-cyan-400 bg-clip-text text-transparent">
                  {l({ en: 'Rendered on demand.', kn: 'ಬೇಡಿಕೆಯ ಮೇರೆಗೆ ರೆಂಡರ್ ಆಗುತ್ತದೆ.', hi: 'मांग पर रेंडर किया जाता है।', ta: 'தேவைக்கேற்ப காட்சிப்படுத்தப்படுகிறது.' })}
                </span>
              </h1>
              <p className="text-lg text-[#94A3B8] leading-relaxed max-w-2xl mb-8">
                {l({ en: 'Every chart below is generated live from verified government open-data sources via', kn: 'ಕೆಳಗಿನ ಪ್ರತಿಯೊಂದು ಚಾರ್ಟ್ ದೃಢೀಕೃತ ಸರ್ಕಾರಿ ಮುಕ್ತ ಡೇಟಾ ಮೂಲಗಳಿಂದ ಲೈವ್ ರಚಿಸಲಾಗುತ್ತದೆ:', hi: 'नीचे दिया हर चार्ट सत्यापित सरकारी ओपन डेटा स्रोतों से लाइव तैयार होता है:', ta: 'கீழே உள்ள ஒவ்வொரு வரைபடமும் உறுதிப்படுத்தப்பட்ட அரசு திறந்த தரவிலிருந்து நேரடியாக உருவாக்கப்படுகிறது:' })}{' '}
                <a
                  href="https://data.opencity.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#F5A623] hover:underline"
                >
                  data.opencity.in
                </a>{' '}
                {l({ en: 'and KWIN portal datasets. Click', kn: 'ಮತ್ತು KWIN ಪೋರ್ಟಲ್ ಡೇಟಾಸೆಟ್‌ಗಳಿಂದ. ಯಾವುದೇ ಕಾರ್ಡ್‌ನಲ್ಲಿ', hi: 'और KWIN पोर्टल डेटासेट से। किसी भी कार्ड पर', ta: 'மற்றும் KWIN தள தரவுத்தொகுப்புகளிலிருந்து. எந்த கார்டிலும்' })}{' '}
                <strong className="text-white">{l({ en: 'Generate Chart', kn: 'ಚಾರ್ಟ್ ರಚಿಸಿ', hi: 'चार्ट बनाएं', ta: 'வரைபடம் உருவாக்கு' })}</strong>{' '}
                {l({ en: 'to fetch and visualize data, then switch chart types instantly.', kn: 'ಅನ್ನು ಕ್ಲಿಕ್ ಮಾಡಿ ಡೇಟಾ ಪಡೆಯಿರಿ ಮತ್ತು ದೃಶ್ಯೀಕರಿಸಿ; ನಂತರ ಚಾರ್ಟ್ ಪ್ರಕಾರಗಳನ್ನು ತಕ್ಷಣ ಬದಲಾಯಿಸಿ.', hi: 'पर क्लिक करके डेटा प्राप्त करें और विज़ुअलाइज़ करें, फिर चार्ट प्रकार तुरंत बदलें।', ta: 'என்பதை கிளிக் செய்து தரவை பெறவும் காட்சிப்படுத்தவும்; பின்னர் வரைபட வகைகளை உடனே மாற்றவும்.' })}
              </p>

              {/* Dataset count pills */}
              <div className="flex flex-wrap gap-3">
                <span className="text-xs font-bold tracking-widest uppercase px-3 py-1.5 rounded-full border border-white/10 text-[#94A3B8]">
                  {OPENCITY_DATASETS.length} {l({ en: 'datasets', kn: 'ಡೇಟಾಸೆಟ್‌ಗಳು', hi: 'डेटासेट', ta: 'தரவுத்தொகுப்புகள்' })}
                </span>
                <span className="text-xs font-bold tracking-widest uppercase px-3 py-1.5 rounded-full border border-[#3B82F6]/30 text-[#3B82F6] bg-[#3B82F6]/5">
                  {l({ en: 'Connectivity', kn: 'ಸಂಪರ್ಕ', hi: 'कनेक्टिविटी', ta: 'இணைப்பு' })}
                </span>
                <span className="text-xs font-bold tracking-widest uppercase px-3 py-1.5 rounded-full border border-[#8B5CF6]/30 text-[#8B5CF6] bg-[#8B5CF6]/5">
                  {l({ en: 'Growth', kn: 'ವೃದ್ಧಿ', hi: 'विकास', ta: 'வளர்ச்சி' })}
                </span>
                <span className="text-xs font-bold tracking-widest uppercase px-3 py-1.5 rounded-full border border-[#06B6D4]/30 text-[#06B6D4] bg-[#06B6D4]/5">
                  {l({ en: 'Water', kn: 'ನೀರು', hi: 'जल', ta: 'நீர்' })}
                </span>
                <span className="text-xs font-bold tracking-widest uppercase px-3 py-1.5 rounded-full border border-[#10B981]/30 text-[#10B981] bg-[#10B981]/5">
                  {l({ en: 'Ecology', kn: 'ಪರಿಸರ', hi: 'पारिस्थितिकी', ta: 'சூழலியல்' })}
                </span>
                <span className="text-xs font-bold tracking-widest uppercase px-3 py-1.5 rounded-full border border-[#F5A623]/30 text-[#F5A623] bg-[#F5A623]/5">
                  {l({ en: 'KWIN Plan', kn: 'KWIN ಯೋಜನೆ', hi: 'KWIN योजना', ta: 'KWIN திட்டம்' })}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* How it works strip */}
        <section className="bg-[#040714] border-y border-white/8">
          <div className="container">
            <dl className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-white/8">
              {[
                {
                  step: '01',
                  title: l({ en: 'Choose & Filter', kn: 'ಆಯ್ಕೆ ಮಾಡಿ ಮತ್ತು ಫಿಲ್ಟರ್ ಮಾಡಿ', hi: 'चुनें और फ़िल्टर करें', ta: 'தேர்வு செய்து வடிகட்டு' }),
                  desc: l({ en: 'Pick a dataset category: Connectivity, Growth, Water, Ecology, or KWIN Plan data.', kn: 'ಡೇಟಾಸೆಟ್ ವರ್ಗವನ್ನು ಆಯ್ಕೆಮಾಡಿ: ಸಂಪರ್ಕ, ವೃದ್ಧಿ, ನೀರು, ಪರಿಸರ, ಅಥವಾ KWIN ಯೋಜನೆ ಡೇಟಾ.', hi: 'डेटासेट श्रेणी चुनें: कनेक्टिविटी, विकास, जल, पारिस्थितिकी, या KWIN योजना डेटा।', ta: 'ஒரு தரவுத்தொகுப்பு வகையைத் தேர்ந்தெடுக்கவும்: இணைப்பு, வளர்ச்சி, நீர், சூழலியல், அல்லது KWIN திட்ட தரவு.' }),
                },
                {
                  step: '02',
                  title: l({ en: 'Generate on Demand', kn: 'ಬೇಡಿಕೆಯ ಮೇರೆಗೆ ರಚಿಸಿ', hi: 'मांग पर तैयार करें', ta: 'தேவைக்கேற்ப உருவாக்கு' }),
                  desc: l({ en: 'Click the button. The portal fetches live data from the OpenCity CKAN API.', kn: 'ಬಟನ್ ಕ್ಲಿಕ್ ಮಾಡಿ. OpenCity CKAN API ಯಿಂದ ಪೋರ್ಟಲ್ ಲೈವ್ ಡೇಟಾ ಪಡೆಯುತ್ತದೆ.', hi: 'बटन क्लिक करें। पोर्टल OpenCity CKAN API से लाइव डेटा प्राप्त करता है।', ta: 'பொத்தானை அழுத்தவும். தளம் OpenCity CKAN API இலிருந்து நேரடி தரவைப் பெறுகிறது.' }),
                },
                {
                  step: '03',
                  title: l({ en: 'Switch Chart Types', kn: 'ಚಾರ್ಟ್ ಪ್ರಕಾರ ಬದಲಿಸಿ', hi: 'चार्ट प्रकार बदलें', ta: 'வரைபட வகைகளை மாற்று' }),
                  desc: l({ en: 'Instantly toggle between Bar, Line, Area, and Pie views for any dataset.', kn: 'ಯಾವುದೇ ಡೇಟಾಸೆಟ್‌ಗೆ Bar, Line, Area ಮತ್ತು Pie ದೃಶ್ಯಗಳನ್ನು ತಕ್ಷಣ ಬದಲಿಸಿ.', hi: 'किसी भी डेटासेट के लिए Bar, Line, Area और Pie व्यू तुरंत बदलें।', ta: 'எந்த தரவுத்தொகுப்பிற்கும் Bar, Line, Area, Pie காட்சிகளை உடனே மாற்றலாம்.' }),
                },
              ].map((item) => (
                <div key={item.step} className="px-8 py-7">
                  <dt className="text-[#F5A623] font-extrabold text-xs tracking-widest mb-2">{item.step}</dt>
                  <dd>
                    <p className="font-bold text-white mb-1">{item.title}</p>
                    <p className="text-sm text-[#64748B] leading-relaxed">{item.desc}</p>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* Main chart grid */}
        <section className="section bg-[linear-gradient(160deg,#040714_0%,#07101A_100%)]">
          <div className="container">
            <LazyDataInsightsHub />
          </div>
        </section>

        {/* Provenance note */}
        <section className="py-8 bg-[#040714] border-t border-white/8">
          <div className="container">
            <p className="text-xs text-[#475569] text-center max-w-3xl mx-auto leading-relaxed">
              {l({ en: 'All OpenCity datasets are published by government agencies under open-data licenses. KWIN Plan data is sourced from the project brief and carries', kn: 'ಎಲ್ಲಾ OpenCity ಡೇಟಾಸೆಟ್‌ಗಳನ್ನು ಸರ್ಕಾರಿ ಸಂಸ್ಥೆಗಳು ಮುಕ್ತ ಡೇಟಾ ಪರವಾನಗಿಗಳಡಿ ಪ್ರಕಟಿಸುತ್ತವೆ. KWIN ಯೋಜನೆ ಡೇಟಾ ಯೋಜನಾ ಸಂಕ್ಷಿಪ್ತದಿಂದ ಪಡೆದುಕೊಳ್ಳಲ್ಪಟ್ಟಿದ್ದು', hi: 'सभी OpenCity डेटासेट सरकारी एजेंसियों द्वारा ओपन डेटा लाइसेंस के तहत प्रकाशित हैं। KWIN योजना डेटा परियोजना ब्रीफ से लिया गया है और इसमें', ta: 'அனைத்து OpenCity தரவுத்தொகுப்புகளும் அரசு அமைப்புகளால் திறந்த தரவு உரிமத்தின் கீழ் வெளியிடப்படுகின்றன. KWIN திட்ட தரவு திட்டக் குறிப்பிலிருந்து பெறப்பட்டு' })}{' '}
              <span className="text-amber-500">{l({ en: 'pending-verification', kn: 'ಪರಿಶೀಲನೆ ಬಾಕಿ', hi: 'सत्यापन-लंबित', ta: 'சரிபார்ப்பு நிலுவை' })}</span>{' '}
              {l({ en: 'status. Treat projections as proposal-level inputs, not confirmed outcomes. Charts are rendered client-side; no data is stored by this portal.', kn: 'ಸ್ಥಿತಿಯಲ್ಲಿದೆ. ಅಂದಾಜುಗಳನ್ನು ಪ್ರಸ್ತಾವನೆ-ಮಟ್ಟದ ಇನ್‌ಪುಟ್‌ಗಳೆಂದು ಮಾತ್ರ ಪರಿಗಣಿಸಿ; ದೃಢೀಕೃತ ಫಲಿತಾಂಶಗಳೆಂದು ಅಲ್ಲ. ಚಾರ್ಟ್‌ಗಳು ಕ್ಲೈಂಟ್-ಸೈಡ್‌ನಲ್ಲಿ ರೆಂಡರ್ ಆಗುತ್ತವೆ; ಈ ಪೋರ್ಟಲ್ ಡೇಟಾ ಸಂಗ್ರಹಿಸುವುದಿಲ್ಲ.', hi: 'स्थिति। प्रक्षेपणों को प्रस्ताव-स्तरीय इनपुट के रूप में देखें, पुष्टि किए गए परिणाम के रूप में नहीं। चार्ट क्लाइंट-साइड पर रेंडर होते हैं; यह पोर्टल डेटा संग्रहित नहीं करता।', ta: 'நிலையில் உள்ளது. முன்னறிவிப்புகளை முன்மொழிவு-நிலை உள்ளீடுகளாக மட்டும் கருதவும்; உறுதிப்படுத்தப்பட்ட முடிவுகளாக அல்ல. வரைபடங்கள் கிளையண்ட் பக்கத்தில் காட்சிப்படுத்தப்படுகின்றன; இந்த தளம் தரவை சேமிக்காது.' })}
            </p>
          </div>
        </section>
      </main>
    </SiteFrame>
  );
}

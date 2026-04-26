import Image from 'next/image';
import Link from 'next/link';
import SourceReferences from '@/components/SourceReferences';
import InlineSourceBadges from '@/components/InlineSourceBadges';
import { HERO_SOURCE_IDS } from '@/data/constants';
import { getServerLocale, pickByLocale } from '@/lib/i18n/server';

const heroImage = {
  src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Kempegowda_International_Airport%2C_Bengaluru_%28Ank_Kumar%2C_Infosys%29_01.jpg/1920px-Kempegowda_International_Airport%2C_Bengaluru_%28Ank_Kumar%2C_Infosys%29_01.jpg',
  source:
    'https://commons.wikimedia.org/wiki/File:Kempegowda_International_Airport,_Bengaluru_(Ank_Kumar,_Infosys)_01.jpg',
  credit: 'Ank Kumar',
  license: 'CC BY-SA 4.0',
};

const stats = [
  { figure: '465+', label: 'Acres', detail: 'Proposed development area', sourceIds: ['brief', 'kiadb'] },
  { figure: '3', label: 'Pillars', detail: 'Knowledge, wellbeing, innovation', sourceIds: ['brief'] },
  { figure: '5', label: 'Phases', detail: 'Working rollout sequence', sourceIds: ['brief', 'kiadb'] },
  { figure: '1', label: 'Ledger', detail: 'Claims mapped to sources', sourceIds: ['brief', 'kiadb'] },
];

const proofPoints = [
  'Project claims stay labeled as confirmed, contextual, or pending verification.',
  'Regional claims connect back to airport, corridor, economic, water, and lake datasets.',
  'The fastest share path now leads to a source-linked brief, not a loose screenshot.',
];

export default async function Hero() {
  const locale = await getServerLocale();

  return (
    <section
      data-testid="hero-section"
      className="relative overflow-hidden bg-[#040714] text-white"
      aria-labelledby="home-hero-title"
    >
      <div className="absolute inset-0" aria-hidden="true">
        <Image
          src={heroImage.src}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(4,7,20,0.96)_0%,rgba(4,7,20,0.84)_42%,rgba(4,7,20,0.36)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,7,20,0.20)_0%,rgba(4,7,20,0.78)_100%)]" />
      </div>

      <div className="container kwin-page-top-hero relative z-10 pb-10">
        <div className="grid gap-9 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
          <div className="max-w-4xl">
            <p
              data-testid="hero-location-badge"
              className="inline-flex max-w-full items-center gap-2 rounded-full border border-white/14 bg-white/[0.08] px-4 py-2 text-[11px] font-bold uppercase tracking-normal text-[#D8E7F7] backdrop-blur-md"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[#F5A623]" aria-hidden="true" />
              {pickByLocale(locale, {
                en: 'Doddaballapura, North Bengaluru',
                kn: 'ದೊಡ್ಡಬಳ್ಳಾಪುರ, ಉತ್ತರ ಬೆಂಗಳೂರು',
                hi: 'डोड्डाबल्लापुर, नॉर्थ बेंगलुरु',
                ta: 'தொட்டபள்ளாபுரா, வட பெங்களூரு',
              })}
            </p>

            <h1
              id="home-hero-title"
              className="mt-6 max-w-5xl text-5xl font-black leading-none tracking-normal text-white md:text-7xl lg:text-8xl"
            >
              <span className="block">KWIN City</span>
              <span className="mt-3 block max-w-4xl text-3xl font-extrabold leading-tight tracking-normal text-[#F5C050] md:text-5xl lg:text-6xl">
                {pickByLocale(locale, {
                  en: "North Bengaluru's proposed knowledge, wellbeing, and innovation city.",
                  kn: 'ಉತ್ತರ ಬೆಂಗಳೂರಿನ ಪ್ರಸ್ತಾಪಿತ ಜ್ಞಾನ, ಕ್ಷೇಮ ಮತ್ತು ನವೀನತೆ ನಗರ.',
                  hi: 'नॉर्थ बेंगलुरु का प्रस्तावित ज्ञान, कल्याण और नवाचार शहर.',
                  ta: 'வட பெங்களூருவின் முன்மொழியப்பட்ட அறிவு, நலன் மற்றும் புதுமை நகரம்.',
                })}
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-[#D5E4F2] md:text-xl">
              {pickByLocale(locale, {
                en: 'A fast, source-linked guide to the 465-acre township proposal, the regional case behind it, and the questions every serious reader should ask next.',
                kn: '465 ಏಕರೆ ಟೌನ್‌ಶಿಪ್ ಪ್ರಸ್ತಾವನೆ, ಅದರ ಪ್ರಾದೇಶಿಕ ಆಧಾರ ಮತ್ತು ಗಂಭೀರ ಓದುಗರು ಮುಂದೆ ಕೇಳಬೇಕಾದ ಪ್ರಶ್ನೆಗಳ ವೇಗದ, ಮೂಲ-ಲಿಂಕ್ ಮಾರ್ಗದರ್ಶಿ.',
                hi: '465 एकड़ टाउनशिप प्रस्ताव, उसके क्षेत्रीय आधार और आगे पूछे जाने वाले जरूरी सवालों की तेज, स्रोत-लिंक्ड गाइड.',
                ta: '465 ஏக்கர் டவுன்ஷிப் முன்மொழிவு, அதன் பிராந்திய ஆதாரம், அடுத்ததாக கேட்க வேண்டிய கேள்விகள் ஆகியவற்றுக்கான விரைவு, மூல இணைப்புள்ள வழிகாட்டி.',
              })}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link href="/share" className="btn btn-primary text-center">
                {pickByLocale(locale, {
                  en: 'Share the 60-second brief',
                  kn: '60-ಸೆಕೆಂಡ್ ಸಂಕ್ಷಿಪ್ತಿಕೆ ಹಂಚಿ',
                  hi: '60-सेकंड ब्रीफ शेयर करें',
                  ta: '60-வினாடி சுருக்கத்தை பகிரவும்',
                })}
              </Link>
              <Link href="/evidence" className="btn btn-outline-light text-center">
                {pickByLocale(locale, {
                  en: 'Verify the evidence',
                  kn: 'ಸಾಕ್ಷ್ಯ ಪರಿಶೀಲಿಸಿ',
                  hi: 'साक्ष्य सत्यापित करें',
                  ta: 'ஆதாரத்தை சரிபார்க்கவும்',
                })}
              </Link>
              <Link
                href="/why-north-bengaluru"
                className="inline-flex items-center justify-center rounded-xl border border-white/14 bg-white/[0.08] px-6 py-4 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:border-white/28 hover:bg-white/[0.12]"
              >
                {pickByLocale(locale, {
                  en: 'Why the north matters',
                  kn: 'ಉತ್ತರ ಯಾಕೆ ಮುಖ್ಯ',
                  hi: 'उत्तर क्यों महत्वपूर्ण है',
                  ta: 'வட பகுதி ஏன் முக்கியம்',
                })}
              </Link>
            </div>
          </div>

          <div className="lg:justify-self-end">
            <div className="max-w-xl border border-white/12 bg-[#06101D]/82 p-5 shadow-[0_32px_90px_rgba(0,0,0,0.42)] backdrop-blur-xl sm:p-6">
              <div className="flex items-start justify-between gap-5 border-b border-white/10 pb-5">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-normal text-cyan-200">
                    {pickByLocale(locale, {
                      en: 'The forwardable angle',
                      kn: 'ಹಂಚಬಹುದಾದ ಕೋನ',
                      hi: 'शेयर करने योग्य एंगल',
                      ta: 'பகிரக்கூடிய கோணம்',
                    })}
                  </p>
                  <p className="mt-3 text-2xl font-black leading-tight text-white md:text-3xl">
                    {pickByLocale(locale, {
                      en: 'What should a knowledge city prove first?',
                      kn: 'ಜ್ಞಾನ ನಗರ ಮೊದಲು ಏನು ಸಾಬೀತುಪಡಿಸಬೇಕು?',
                      hi: 'ज्ञान शहर को पहले क्या साबित करना चाहिए?',
                      ta: 'அறிவு நகரம் முதலில் எதை நிரூபிக்க வேண்டும்?',
                    })}
                  </p>
                </div>
                <span className="shrink-0 border border-[#F5A623]/40 bg-[#F5A623]/14 px-3 py-1 text-xs font-black uppercase tracking-normal text-[#F5C050]">
                  KWIN
                </span>
              </div>

              <div className="mt-5 grid gap-3">
                {proofPoints.map((point, index) => (
                  <div key={point} className="grid grid-cols-[2rem_1fr] gap-3">
                    <span className="flex h-8 w-8 items-center justify-center border border-white/12 bg-white/[0.06] text-sm font-black text-[#F5C050]">
                      {index + 1}
                    </span>
                    <p className="text-sm leading-6 text-[#B7C8DA]">{point}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 grid grid-cols-2 gap-px overflow-hidden border border-white/10 bg-white/10 md:grid-cols-4">
                {stats.map((stat) => (
                  <div key={stat.label} className="bg-[#071320]/95 p-4">
                    <p className="text-2xl font-black text-white">{stat.figure}</p>
                    <p className="mt-1 text-xs font-bold uppercase tracking-normal text-[#F5C050]">
                      {stat.label}
                    </p>
                    <p className="mt-2 min-h-10 text-xs leading-5 text-[#8EA4BC]">{stat.detail}</p>
                    <div className="mt-3">
                      <InlineSourceBadges sourceIds={stat.sourceIds} />
                    </div>
                  </div>
                ))}
              </div>

              <p className="mt-4 text-xs leading-5 text-[#7890AA]">
                {pickByLocale(locale, {
                  en: 'Investment, jobs, and delivery figures remain tied to the project brief until primary public records confirm them.',
                  kn: 'ಹೂಡಿಕೆ, ಉದ್ಯೋಗ ಮತ್ತು ವಿತರಣಾ ಅಂಕಿಗಳು ಪ್ರಾಥಮಿಕ ಸಾರ್ವಜನಿಕ ದಾಖಲೆಗಳು ದೃಢೀಕರಿಸುವವರೆಗೆ ಯೋಜನಾ ಸಂಕ್ಷಿಪ್ತಿಕೆಗೆ ಸಂಬಂಧಿಸಿದೆ.',
                  hi: 'निवेश, रोजगार और डिलीवरी आंकड़े प्राथमिक सार्वजनिक रिकॉर्ड से पुष्टि होने तक परियोजना ब्रीफ से जुड़े हैं.',
                  ta: 'முதலீடு, வேலைவாய்ப்பு, நிறைவேற்ற எண்கள் முதன்மை பொது பதிவுகள் உறுதிப்படுத்தும் வரை திட்டக் குறிப்புடன் இணைக்கப்பட்டவை.',
                })}{' '}
                <Link href="/sources" className="text-[#D6E8F8] underline underline-offset-2 hover:text-white">
                  {pickByLocale(locale, {
                    en: 'Review all sources',
                    kn: 'ಎಲ್ಲಾ ಮೂಲಗಳನ್ನು ಪರಿಶೀಲಿಸಿ',
                    hi: 'सभी स्रोत देखें',
                    ta: 'அனைத்து மூலங்களையும் பாருங்கள்',
                  })}
                </Link>
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-3 border-t border-white/10 pt-5 text-[11px] text-[#7890AA] md:flex-row md:items-center md:justify-between">
          <p>
            {pickByLocale(locale, {
              en: 'Hero image: Kempegowda International Airport, Bengaluru.',
              kn: 'ಹೀರೋ ಚಿತ್ರ: ಕೆಂಪೇಗೌಡ ಅಂತರರಾಷ್ಟ್ರೀಯ ವಿಮಾನ ನಿಲ್ದಾಣ, ಬೆಂಗಳೂರು.',
              hi: 'हीरो छवि: केम्पेगौड़ा अंतरराष्ट्रीय हवाई अड्डा, बेंगलुरु.',
              ta: 'முதன்மை படம்: கெம்பேகவுடா சர்வதேச விமானநிலையம், பெங்களூரு.',
            })}{' '}
            <a href={heroImage.source} target="_blank" rel="noopener noreferrer" className="text-[#BFD4EA] underline underline-offset-2 hover:text-white">
              {heroImage.credit}
            </a>{' '}
            · {heroImage.license}
          </p>
          <p>Last content refresh: April 24, 2026</p>
        </div>
      </div>

      <div className="sr-only">
        <SourceReferences sourceIds={HERO_SOURCE_IDS} compact />
      </div>
    </section>
  );
}

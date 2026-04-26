import Image from 'next/image';
import Link from 'next/link';
import InlineSourceBadges from '@/components/InlineSourceBadges';
import ShareActions from '@/components/share/ShareActions';
import { getServerLocale, pickByLocale } from '@/lib/i18n/server';

const SHARE_URL = 'https://kwin-city.com/share';

const shareMoments = [
  {
    id: 'group-chat',
    eyebrow: 'Group chat opener',
    title: 'What should a 465-acre knowledge city prove first?',
    body: 'Jobs, water, mobility, and trust are the four questions that turn KWIN from a headline into a real civic conversation.',
    text: 'Bengaluru friends: if a 465-acre knowledge city is proposed near Doddaballapura, what should it prove first - jobs, water, mobility, or trust?',
    sourceIds: ['brief', 'kiadb'],
  },
  {
    id: 'airport-corridor',
    eyebrow: 'North Bengaluru signal',
    title: 'The airport corridor is the context people already understand.',
    body: 'The strongest hook is not hype. It is the plain regional logic: airport access, orbital roads, and Karnataka industrial depth.',
    text: "KWIN City makes more sense when you read it through North Bengaluru's airport corridor, road planning, and state-level industrial context.",
    sourceIds: ['aviation', 'strr', 'economicSurvey'],
  },
  {
    id: 'trust-angle',
    eyebrow: 'Credibility hook',
    title: 'The source ledger is the unusual part.',
    body: 'A shareable city story gets stronger when every major claim can be checked, challenged, and improved.',
    text: 'The most interesting thing about this KWIN City portal is the evidence layer: claims are source-linked and status-labeled instead of left as pure promotion.',
    sourceIds: ['brief', 'kiadb'],
  },
];

export default async function ShareKwinMoment() {
  const locale = await getServerLocale();

  return (
    <section className="section bg-[#F6F8FB]" aria-labelledby="share-kwin-title">
      <div className="container">
        <div className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-normal text-[#0F766E]">
              {pickByLocale(locale, {
                en: 'Built to travel',
                kn: 'ಹಂಚಲು ನಿರ್ಮಿಸಲಾಗಿದೆ',
                hi: 'शेयर होने के लिए तैयार',
                ta: 'பகிர்வதற்காக வடிவமைப்பு',
              })}
            </p>
            <h2
              id="share-kwin-title"
              className="mt-3 max-w-xl text-4xl font-black leading-tight tracking-normal text-slate-950 md:text-5xl"
            >
              {pickByLocale(locale, {
                en: 'Give people one sharp reason to send KWIN City onward.',
                kn: 'KWIN City ಅನ್ನು ಮುಂದೆ ಹಂಚಲು ಜನರಿಗೆ ಒಂದು ಸ್ಪಷ್ಟ ಕಾರಣ ನೀಡಿ.',
                hi: 'KWIN City आगे भेजने के लिए लोगों को एक साफ कारण दें.',
                ta: 'KWIN Cityயை பகிர மக்கள் ஒரு தெளிவான காரணம் பெறட்டும்.',
              })}
            </h2>
            <p className="mt-5 max-w-xl text-base leading-8 text-slate-600">
              {pickByLocale(locale, {
                en: 'The site now has a dedicated share kit: a short brief, social-ready prompts, and the existing launch carousel in one place.',
                kn: 'ಈ ತಾಣದಲ್ಲಿ ಈಗ ಒಂದೇ ಸ್ಥಳದಲ್ಲಿ ಚಿಕ್ಕ ಸಂಕ್ಷಿಪ್ತಿಕೆ, ಸಾಮಾಜಿಕ ಮಾಧ್ಯಮಕ್ಕೆ ಸಿದ್ಧವಾದ ಸಂದೇಶಗಳು ಮತ್ತು ಲಾಂಚ್ ಕ್ಯಾರೌಸೆಲ್ ಇದೆ.',
                hi: 'साइट में अब एक समर्पित शेयर किट है: छोटा ब्रीफ, सोशल-रेडी prompts, और launch carousel एक जगह.',
                ta: 'இந்த தளத்தில் இப்போது குறும் சுருக்கம், சமூகப் பகிர்வு உரைகள், launch carousel அனைத்தும் ஒரே இடத்தில் உள்ளன.',
              })}
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link href="/share" className="btn btn-primary text-center">
                {pickByLocale(locale, {
                  en: 'Open share kit',
                  kn: 'ಹಂಚಿಕೆ ಕಿಟ್ ತೆರೆಯಿರಿ',
                  hi: 'शेयर किट खोलें',
                  ta: 'பகிர்வு கிட் திறக்கவும்',
                })}
              </Link>
              <Link href="/instagram" className="btn btn-secondary text-center">
                {pickByLocale(locale, {
                  en: 'Instagram launch hub',
                  kn: 'Instagram ಲಾಂಚ್ ಹಬ್',
                  hi: 'Instagram launch hub',
                  ta: 'Instagram launch hub',
                })}
              </Link>
            </div>

            <div className="mt-8 grid max-w-md grid-cols-[0.72fr_0.28fr] gap-3">
              <div className="relative aspect-square overflow-hidden border border-slate-200 bg-white shadow-sm">
                <Image
                  src="/social/kwin-launch/kwin-launch-slide-01.png"
                  alt="KWIN City launch carousel cover"
                  fill
                  sizes="(max-width: 1024px) 72vw, 380px"
                  className="object-cover"
                />
              </div>
              <div className="grid gap-3">
                {[2, 3, 4].map((slide) => (
                  <div key={slide} className="relative aspect-square overflow-hidden border border-slate-200 bg-white shadow-sm">
                    <Image
                      src={`/social/kwin-launch/kwin-launch-slide-0${slide}.png`}
                      alt={`KWIN City launch carousel slide ${slide}`}
                      fill
                      sizes="120px"
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid gap-4">
            {shareMoments.map((moment) => (
              <article key={moment.id} id={moment.id} className="border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  <div className="max-w-2xl">
                    <p className="text-[11px] font-bold uppercase tracking-normal text-[#E8A020]">
                      {moment.eyebrow}
                    </p>
                    <h3 className="mt-2 text-2xl font-black leading-tight tracking-normal text-slate-950">
                      {moment.title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-slate-600">{moment.body}</p>
                    <div className="mt-4">
                      <InlineSourceBadges sourceIds={moment.sourceIds} />
                    </div>
                  </div>
                  <ShareActions
                    title={moment.title}
                    text={moment.text}
                    url={`${SHARE_URL}#${moment.id}`}
                    copyLabel="Copy angle"
                    copiedLabel="Copied"
                    shareLabel="Send"
                  />
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

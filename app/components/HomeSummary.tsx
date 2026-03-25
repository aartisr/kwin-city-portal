import Link from 'next/link';
import InlineSourceBadges from '@/components/InlineSourceBadges';

const cards = [
  {
    number: '01',
    title: 'What is KWIN City?',
    body: 'A proposed North Bengaluru township framed around three pillars — Knowledge, Wellbeing, and Innovation. Learn what makes it ambitious and what still awaits public confirmation.',
    href: '/about',
    cta: 'Discover the vision',
    sourceIds: ['brief', 'kiadb'],
    accentBarClass: 'bg-[#F5A623]',
    numberClass: 'text-[#F5A623]/30',
    ctaClass: 'text-[#F5A623]',
  },
  {
    number: '02',
    title: 'Why North Bengaluru?',
    body: "Bengaluru's northern corridor is a real, growing, infrastructure-backed region. Explore the airport data, corridor planning, hydrology, and economic evidence that make KWIN's location compelling.",
    href: '/why-north-bengaluru',
    cta: 'See the regional case',
    sourceIds: ['aviation', 'strr', 'economicSurvey'],
    accentBarClass: 'bg-[#06B6D4]',
    numberClass: 'text-[#06B6D4]/30',
    ctaClass: 'text-[#06B6D4]',
  },
  {
    number: '03',
    title: 'Can I trust the research?',
    body: "Yes — and here's why. Every claim is labeled as confirmed, proposed, or contextual. This portal is built so you always know exactly what evidence is behind each statement.",
    href: '/sources',
    cta: 'Open the claim ledger',
    sourceIds: ['brief', 'kiadb'],
    accentBarClass: 'bg-[#10B981]',
    numberClass: 'text-[#10B981]/30',
    ctaClass: 'text-[#10B981]',
  },
];

export default function HomeSummary() {
  return (
    <section className="section bg-white">
      <div className="container">
        <div className="max-w-3xl mb-12">
          <div className="eyebrow text-[#E8A020] mb-3">Welcome</div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-5 leading-tight">
            Your complete guide to{' '}
            <span className="bg-gradient-to-r from-[#E8A020] to-[#F5C050] bg-clip-text text-transparent">
              KWIN City.
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl leading-relaxed">
            Whether you came to understand the vision, examine the evidence, or explore the region, everything
            you need is here. Start with the three most common questions.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {cards.map((card) => (
            <div
              key={card.number}
              className="group relative flex flex-col rounded-2xl border border-gray-200 bg-white p-7 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 overflow-hidden"
            >
              {/* Accent line */}
              <div
                className={`absolute top-0 left-0 right-0 h-1 rounded-t-2xl ${card.accentBarClass}`}
              />

              <div className="mb-5">
                <span className={`text-4xl font-extrabold ${card.numberClass}`}>
                  {card.number}
                </span>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-3">{card.title}</h3>
              <p className="text-gray-600 leading-7 flex-1 mb-5">{card.body}</p>

              {/* Source badges sit above the stretched link via z-10 */}
              <div className="relative z-10 mb-4">
                <InlineSourceBadges sourceIds={card.sourceIds} />
              </div>

              <div className={`flex items-center gap-2 font-bold text-sm ${card.ctaClass}`}>
                {/* Stretched link covers the whole card; source badges sit above it */}
                <Link
                  href={card.href}
                  className="after:absolute after:inset-0 after:rounded-2xl focus-visible:after:outline focus-visible:after:outline-2 focus-visible:after:outline-current"
                >
                  {card.cta}
                </Link>
                <svg
                  className="w-4 h-4 transition-transform group-hover:translate-x-1"
                  fill="none" stroke="currentColor" viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

import Image from 'next/image';
import Link from 'next/link';
import SiteFrame from '@/components/SiteFrame';

type PersonaSection = {
  title: string;
  body: string;
  bullets: string[];
};

type StatItem = {
  value: string;
  label: string;
  accent?: string; // tailwind text colour class, e.g. 'text-emerald-500'
  note?: string;
};

type EvidenceCta = {
  heading: string;
  body: string;
  links: { label: string; href: string; primary?: boolean }[];
};

type PersonaPageProps = {
  eyebrow: string;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  audienceLabel: string;
  sections: PersonaSection[];
  quickActions: { label: string; href: string }[];
  stats?: StatItem[];
  evidenceCta?: EvidenceCta;
};

export default function PersonaPage({
  eyebrow,
  title,
  description,
  imageSrc,
  imageAlt,
  audienceLabel,
  sections,
  quickActions,
  stats,
  evidenceCta,
}: PersonaPageProps) {
  return (
    <SiteFrame>
      <main>
        <section className="pt-28 pb-12 bg-[linear-gradient(150deg,#040714_0%,#0D1640_45%,#07131F_100%)]">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-8 items-center">
              <div>
                <div className="eyebrow text-[#F5A623] mb-4">{eyebrow}</div>
                <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-5">{title}</h1>
                <p className="text-lg text-[#94A3B8] leading-relaxed max-w-2xl mb-6">{description}</p>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 text-xs font-bold tracking-[0.16em] uppercase text-[#CBD5E1]">
                  {audienceLabel}
                </div>
                <div className="mt-8 flex flex-wrap gap-3">
                  {quickActions.map((item) => (
                    <Link key={item.label} href={item.href} className="btn btn-outline-light">
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
              <div className="relative h-[320px] md:h-[420px] rounded-2xl overflow-hidden border border-white/10">
                <Image
                  src={imageSrc}
                  alt={imageAlt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
              </div>
            </div>
          </div>
        </section>

        {/* Stats strip */}
        {stats && stats.length > 0 && (
          <section className="bg-[#040714] border-y border-white/8">
            <div className="container">
              <div className="grid grid-cols-2 sm:grid-cols-4">
                {stats.map((s) => (
                  <div key={s.label} className="px-6 py-8 text-center border-r border-b border-white/8 [&:nth-child(2n)]:border-r-0 sm:[&:nth-child(2n)]:border-r sm:[&:nth-child(4n)]:border-r-0 [&:nth-last-child(-n+2)]:border-b-0 sm:[&:nth-last-child(-n+2)]:border-b sm:[&:nth-last-child(-n+4)]:border-b-0">
                    <p className="text-xs font-bold tracking-widest uppercase text-[#64748B] mb-2">{s.label}</p>
                    <p className={`text-3xl md:text-4xl font-extrabold mb-1 ${s.accent ?? 'text-[#F5A623]'}`}>{s.value}</p>
                    {s.note && <p className="text-[11px] text-[#475569] leading-snug mt-1">{s.note}</p>}
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="section bg-white">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {sections.map((section) => (
                <article key={section.title} className="rounded-2xl border border-gray-200 bg-gray-50 p-7">
                  <h2 className="text-2xl font-bold text-gray-900 mb-3">{section.title}</h2>
                  <p className="text-gray-700 leading-7 mb-4">{section.body}</p>
                  <ul className="space-y-2">
                    {section.bullets.map((bullet) => (
                      <li key={bullet} className="text-sm text-gray-700 flex gap-3 leading-6">
                        <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#E8A020] shrink-0" />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Evidence CTA */}
        {evidenceCta && (
          <section className="section relative overflow-hidden bg-[linear-gradient(160deg,#0D1333_0%,#040714_100%)]">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] pointer-events-none bg-[radial-gradient(circle_at_80%_0%,rgba(245,166,35,0.07),transparent_55%)]" />
            <div className="container relative z-10">
              <div className="max-w-3xl mx-auto text-center">
                <div className="eyebrow text-[#F5A623] mb-3">Next Steps</div>
                <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4 leading-tight">
                  {evidenceCta.heading}
                </h2>
                <p className="text-[#94A3B8] text-lg leading-relaxed mb-9 max-w-2xl mx-auto">
                  {evidenceCta.body}
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  {evidenceCta.links.map((link) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      className={link.primary ? 'btn btn-primary' : 'btn btn-outline-light'}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}
      </main>
    </SiteFrame>
  );
}

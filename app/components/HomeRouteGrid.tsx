import Link from 'next/link';

const routes = [
  {
    icon: '🏙️',
    title: 'About KWIN',
    href: '/about',
    summary: 'The full picture of what KWIN City is — its three pillars, its institutional framework, and how this portal reads the proposal.',
    iconBgClass: 'bg-[#F5A623]/15',
    linkClass: 'text-[#F5A623]',
  },
  {
    icon: '🗺️',
    title: 'Why North Bengaluru',
    href: '/why-north-bengaluru',
    summary: "Aviation connectivity, ring roads, hydrology, and Karnataka's macroeconomic trajectory — the regional case is compelling.",
    iconBgClass: 'bg-[#06B6D4]/15',
    linkClass: 'text-[#06B6D4]',
  },
  {
    icon: '📅',
    title: 'Development Timeline',
    href: '/timeline',
    summary: 'Five phases from inauguration to city-scale operations. Explore the roadmap as a working sequence open to public review.',
    iconBgClass: 'bg-[#8B5CF6]/15',
    linkClass: 'text-[#8B5CF6]',
  },
  {
    icon: '🏭',
    title: 'Industry Sectors',
    href: '/sectors',
    summary: 'Semiconductor, aerospace, health-tech, ICT, and renewable energy clusters — the industry ambition behind KWIN.',
    iconBgClass: 'bg-[#EC4899]/15',
    linkClass: 'text-[#EC4899]',
  },
  {
    icon: '🌿',
    title: 'Sustainability',
    href: '/sustainability',
    summary: 'Water, green cover, solar, and ecological plans — studied against growth trajectory, groundwater, and lake-governance data.',
    iconBgClass: 'bg-[#10B981]/15',
    linkClass: 'text-[#10B981]',
  },
  {
    icon: '🔍',
    title: 'Evidence Vault',
    href: '/evidence',
    summary: 'The complete collection of regional evidence — curated, labeled, and always honest about what each dataset can and cannot prove.',
    iconBgClass: 'bg-[#3B82F6]/15',
    linkClass: 'text-[#3B82F6]',
  },
];

export default function HomeRouteGrid() {
  return (
    <section className="section bg-gray-50">
      <div className="container">
        <div className="max-w-3xl mb-12">
          <div className="eyebrow text-[#E8A020] mb-3">Explore the Portal</div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-5 leading-tight">
            Six dimensions of{' '}
            <span className="bg-gradient-to-r from-[#E8A020] to-[#F5C050] bg-clip-text text-transparent">
              the KWIN story.
            </span>
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed max-w-2xl">
            The homepage gives you orientation. These six pages give you depth — each one purpose-built for a
            specific type of curious visitor.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {routes.map((route) => (
            <Link
              key={route.title}
              href={route.href}
              className="group flex flex-col rounded-2xl border border-gray-200 bg-white p-7 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
            >
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-5 ${route.iconBgClass}`}
              >
                {route.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{route.title}</h3>
              <p className="text-gray-600 leading-7 flex-1 mb-5">{route.summary}</p>
              <div
                className={`flex items-center gap-2 text-sm font-bold transition-colors ${route.linkClass}`}
              >
                Explore page
                <svg
                  className="w-4 h-4 transition-transform group-hover:translate-x-1"
                  fill="none" stroke="currentColor" viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

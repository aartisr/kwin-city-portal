import InlineSourceBadges from '@/components/InlineSourceBadges';

const pillars = [
  {
    title: 'Airport-driven access',
    body: 'Bengaluru aviation traffic data supports the broader case that North Bengaluru operates within a region of strong national and global connectivity. That is useful contextual evidence for KWIN, not proof of project performance.',
    sourceIds: ['aviation'],
  },
  {
    title: 'Corridor and orbital planning',
    body: 'STRR and IRR documents show that regional mobility planning around Bengaluru is real, formal, and network-oriented. This strengthens the case for satellite-node urban narratives in the region.',
    sourceIds: ['strr', 'irr'],
  },
  {
    title: 'Karnataka growth capacity',
    body: 'The Karnataka economic survey provides macroeconomic context for why large urban-industrial proposals can be framed seriously within the state, even when project-specific claims still need confirmation.',
    sourceIds: ['economicSurvey'],
  },
  {
    title: 'Water and resilience constraints',
    body: 'Growth trajectory, groundwater, and lake-governance datasets matter because they impose real conditions on what a credible township must solve. They make the sustainability conversation sharper, not softer.',
    sourceIds: ['rainfall', 'groundwater', 'lakes'],
  },
];

export default function WhyNorthBengaluru() {
  return (
    <section className="section bg-white">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {pillars.map((item) => (
            <article key={item.title} className="rounded-2xl border border-gray-200 bg-gray-50 p-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">{item.title}</h2>
              <p className="text-gray-700 mb-4">{item.body}</p>
              <InlineSourceBadges sourceIds={item.sourceIds} />
            </article>
          ))}
        </div>

        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-3">Important boundary</h3>
          <p className="text-gray-700 leading-7">
            Regional context can justify why KWIN is plausible as a proposal. It cannot, on its own, validate acreage,
            investment, jobs, partnerships, or delivery milestones. Those still need KIADB or equivalent public primary
            records.
          </p>
        </div>
      </div>
    </section>
  );
}

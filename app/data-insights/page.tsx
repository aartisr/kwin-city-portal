import type { Metadata } from 'next';
import SiteFrame from '@/components/SiteFrame';
import DataInsightsHub from '@/components/DataInsightsHub';
import { OPENCITY_DATASETS } from '@/components/DataInsightsHub';

export const metadata: Metadata = {
  title: 'Data Insights | KWIN City',
  description:
    'Live charts and illustrations generated on demand from OpenCity and KWIN portal data. Connectivity, growth trajectory, groundwater resilience, lake governance, and sector projections.',
};

export default function DataInsightsPage() {
  return (
    <SiteFrame>
      <main>
        {/* Hero */}
        <section className="pt-28 pb-14 bg-[linear-gradient(150deg,#040714_0%,#0D1640_45%,#07131F_100%)]">
          <div className="container">
            <div className="max-w-3xl">
              <div className="eyebrow text-[#F5A623] mb-4">Data Insights Lab</div>
              <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-5">
                Regional data.{' '}
                <span className="bg-gradient-to-r from-amber-400 to-cyan-400 bg-clip-text text-transparent">
                  Rendered on demand.
                </span>
              </h1>
              <p className="text-lg text-[#94A3B8] leading-relaxed max-w-2xl mb-8">
                Every chart below is generated live from verified government open-data sources via{' '}
                <a
                  href="https://data.opencity.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#F5A623] hover:underline"
                >
                  data.opencity.in
                </a>{' '}
                and KWIN portal datasets. Click <strong className="text-white">Generate Chart</strong> on any card to fetch and visualise the data — and switch between chart types instantly.
              </p>

              {/* Dataset count pills */}
              <div className="flex flex-wrap gap-3">
                <span className="text-xs font-bold tracking-widest uppercase px-3 py-1.5 rounded-full border border-white/10 text-[#94A3B8]">
                  {OPENCITY_DATASETS.length} datasets
                </span>
                <span className="text-xs font-bold tracking-widest uppercase px-3 py-1.5 rounded-full border border-[#3B82F6]/30 text-[#3B82F6] bg-[#3B82F6]/5">
                  Connectivity
                </span>
                <span className="text-xs font-bold tracking-widest uppercase px-3 py-1.5 rounded-full border border-[#8B5CF6]/30 text-[#8B5CF6] bg-[#8B5CF6]/5">
                  Growth
                </span>
                <span className="text-xs font-bold tracking-widest uppercase px-3 py-1.5 rounded-full border border-[#06B6D4]/30 text-[#06B6D4] bg-[#06B6D4]/5">
                  Water
                </span>
                <span className="text-xs font-bold tracking-widest uppercase px-3 py-1.5 rounded-full border border-[#10B981]/30 text-[#10B981] bg-[#10B981]/5">
                  Ecology
                </span>
                <span className="text-xs font-bold tracking-widest uppercase px-3 py-1.5 rounded-full border border-[#F5A623]/30 text-[#F5A623] bg-[#F5A623]/5">
                  KWIN Plan
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
                  title: 'Choose & Filter',
                  desc: 'Pick a dataset category — Connectivity, Growth, Water, Ecology, or KWIN Plan data.',
                },
                {
                  step: '02',
                  title: 'Generate on Demand',
                  desc: 'Click the button. The portal fetches live data from the OpenCity CKAN API.',
                },
                {
                  step: '03',
                  title: 'Switch Chart Types',
                  desc: 'Instantly toggle between Bar, Line, Area, and Pie views for any dataset.',
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
            <DataInsightsHub />
          </div>
        </section>

        {/* Provenance note */}
        <section className="py-8 bg-[#040714] border-t border-white/8">
          <div className="container">
            <p className="text-xs text-[#475569] text-center max-w-3xl mx-auto leading-relaxed">
              All OpenCity datasets are published by government agencies under open-data licenses. KWIN Plan data is
              sourced from the project brief and carries{' '}
              <span className="text-amber-500">pending-verification</span> status — treat projections
              as proposal-level inputs, not confirmed outcomes. Charts are rendered client-side; no data is stored by
              this portal.
            </p>
          </div>
        </section>
      </main>
    </SiteFrame>
  );
}

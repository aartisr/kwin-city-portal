import Link from 'next/link';

const WORKFLOWS = [
  {
    href: '/tools/spatial-explorer',
    eyebrow: 'Interactive map',
    title: 'Explore location and infrastructure',
    description: 'Toggle acquisition phases, inspect source-linked layers, and export derived GeoJSON.',
    action: 'Open Spatial Explorer',
    icon: '🗺️',
  },
  {
    href: '/tools/risk-check',
    eyebrow: 'Decision support',
    title: 'Assess a location or plan',
    description: 'Run a preliminary evidence-linked risk check with explicit limits and recommended next steps.',
    action: 'Start Risk Check',
    icon: '🛡️',
  },
  {
    href: '/tools/opportunity-exchange',
    eyebrow: 'Submission workflow',
    title: 'Share a structured requirement',
    description: 'Submit investor, developer, or landowner needs and receive a traceable request reference.',
    action: 'Open Opportunity Exchange',
    icon: '🤝',
  },
] as const;

export default function InteractiveIntelligenceLauncher() {
  return (
    <section className="border-y border-cyan-950/10 bg-[linear-gradient(145deg,#071225,#0b1f35)] py-14 text-white" aria-labelledby="interactive-intelligence-title">
      <div className="container">
        <div className="flex flex-wrap items-end justify-between gap-5">
          <div className="max-w-3xl">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-amber-300">Interactive intelligence</p>
            <h2 id="interactive-intelligence-title" className="mt-3 text-3xl font-black tracking-[-0.04em] sm:text-4xl">Move from reading to doing.</h2>
            <p className="mt-3 max-w-2xl text-base leading-7 text-slate-300">Three focused workflows provide map exploration, evidence-aware decision support, and structured opportunity intake. Outputs disclose their sources and limitations.</p>
          </div>
          <Link href="/tools" className="text-sm font-bold text-cyan-200 underline decoration-cyan-500 underline-offset-4 hover:text-white">View all 11 tools →</Link>
        </div>
        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          {WORKFLOWS.map((workflow) => (
            <Link key={workflow.href} href={workflow.href} className="group rounded-2xl border border-white/15 bg-white/[0.06] p-5 transition hover:-translate-y-0.5 hover:border-amber-300/70 hover:bg-white/[0.1]">
              <div className="flex items-center justify-between gap-4">
                <span className="text-3xl" aria-hidden="true">{workflow.icon}</span>
                <span className="rounded-full border border-cyan-300/25 bg-cyan-300/10 px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.14em] text-cyan-200">{workflow.eyebrow}</span>
              </div>
              <h3 className="mt-5 text-xl font-extrabold">{workflow.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-300">{workflow.description}</p>
              <span className="mt-5 inline-flex text-sm font-bold text-amber-300 group-hover:text-amber-200">{workflow.action} →</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

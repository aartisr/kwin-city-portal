import Link from 'next/link';

export default function BrandLockup() {
  return (
    <Link
      href="/"
      className="group relative z-10 flex min-w-[11rem] flex-shrink-0 items-center gap-3 rounded-2xl px-1.5 py-1.5 transition-transform duration-300 hover:-translate-y-0.5 sm:min-w-[12rem]"
      aria-label="KWIN City home"
    >
      <div className="relative flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#F5A623,#E8A020)] text-xl font-extrabold text-[#040714] shadow-[0_14px_34px_rgba(232,160,32,0.32)] transition-transform duration-300 group-hover:scale-[1.03]">
        <span className="absolute inset-0 rounded-2xl bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.42),transparent_58%)]" aria-hidden="true" />
        <span className="relative">K</span>
      </div>
      <div className="flex-none rounded-2xl border border-[#13204A] bg-[linear-gradient(135deg,#061126,#0D1B3D)] px-3.5 py-2.5 leading-none shadow-[0_14px_34px_rgba(2,6,23,0.22)]">
        <div className="flex items-center gap-1.5 whitespace-nowrap">
          <span className="text-[1.12rem] font-black tracking-[0.01em] text-white">KWIN</span>
          <span className="text-[0.94rem] font-bold text-[#F5C050]">City</span>
        </div>
        <div className="mt-1 hidden flex-col items-start gap-0.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-300 2xl:flex">
          <span>Evidence-First Portal</span>
          <span className="text-slate-400 tracking-[0.16em]">North Bengaluru</span>
        </div>
      </div>
    </Link>
  );
}

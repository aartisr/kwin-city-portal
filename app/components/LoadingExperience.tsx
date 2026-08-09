const LOADING_MESSAGES = [
  'Preparing a calmer reading space',
  'Gathering fresh source-linked updates',
  'Balancing official and discovery signals',
];

export function LoadingExperience() {
  return (
    <main className="min-h-[100svh] overflow-hidden bg-[radial-gradient(circle_at_top,rgba(245,192,80,0.18),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(6,182,212,0.12),transparent_30%),linear-gradient(180deg,#f8fafc_0%,#ffffff_55%,#f8fafc_100%)] px-6 py-10 text-slate-900">
      <div className="mx-auto flex min-h-[calc(100svh-5rem)] w-full max-w-5xl items-center justify-center">
        <section className="relative w-full max-w-2xl overflow-hidden rounded-[2rem] border border-white/60 bg-white/70 p-8 shadow-[0_20px_70px_rgba(15,23,42,0.08)] backdrop-blur-xl sm:p-10">
          <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(245,192,80,0.08),transparent_35%,rgba(6,182,212,0.06)_70%,transparent_100%)]" />
          <div className="relative flex flex-col items-center text-center">
            <div className="relative mb-8 flex h-28 w-28 items-center justify-center rounded-full border border-amber-200/70 bg-[radial-gradient(circle,rgba(255,255,255,0.9)_0%,rgba(255,248,232,0.95)_52%,rgba(245,192,80,0.14)_100%)] shadow-[0_10px_50px_rgba(232,160,32,0.16)]">
              <div className="absolute inset-2 rounded-full border border-amber-200/70" />
              <div className="absolute inset-0 rounded-full bg-[conic-gradient(from_180deg,rgba(245,192,80,0)_0deg,rgba(245,192,80,0.9)_80deg,rgba(6,182,212,0.78)_180deg,rgba(245,192,80,0)_360deg)] animate-[spin_2.8s_linear_infinite] [mask:radial-gradient(circle,transparent_47%,black_48%)]" />
              <div className="absolute h-14 w-14 rounded-full bg-white shadow-[0_6px_24px_rgba(15,23,42,0.08)]" />
              <div className="absolute h-8 w-8 rounded-full bg-gradient-to-br from-amber-300 to-cyan-400 animate-[pulse_2.8s_ease-in-out_infinite]" />
            </div>

            <p className="eyebrow mb-3 text-amber-700">KWIN City Reader</p>
            <h1 className="max-w-xl text-balance text-3xl font-black tracking-[-0.04em] text-slate-950 sm:text-5xl">
              Quietly assembling your next set of source-linked stories.
            </h1>
            <p className="mt-4 max-w-2xl text-pretty text-base leading-8 text-slate-600 sm:text-lg">
              The reader is balancing official, primary, and discovery signals so the first frame feels deliberate, calm, and useful.
            </p>

            <div className="mt-8 grid w-full gap-3 sm:grid-cols-3">
              {LOADING_MESSAGES.map((message, index) => (
                <div
                  key={message}
                  className="rounded-2xl border border-slate-200/80 bg-white/80 px-4 py-4 text-left shadow-[0_8px_28px_rgba(15,23,42,0.04)] animate-[fadeIn_1.2s_ease-out_both]"
                  style={{ animationDelay: `${index * 180}ms` }}
                >
                  <div className="mb-2 h-1.5 w-14 rounded-full bg-gradient-to-r from-amber-400 to-cyan-400" />
                  <p className="text-sm font-semibold leading-6 text-slate-700">{message}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 flex items-center gap-2 text-sm text-slate-500">
              <span className="h-2.5 w-2.5 rounded-full bg-amber-400 animate-[pulse_1.8s_ease-in-out_infinite]" />
              <span className="h-2.5 w-2.5 rounded-full bg-cyan-400 animate-[pulse_1.8s_ease-in-out_infinite] [animation-delay:180ms]" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 animate-[pulse_1.8s_ease-in-out_infinite] [animation-delay:360ms]" />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

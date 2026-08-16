import type { SavedReaderBrief } from './useReaderLibrary';

export function SavedBriefsPanel({ briefs, onRemove }: {
  briefs: Record<string, SavedReaderBrief>;
  onRemove: (id: string) => void;
}) {
  const entries = Object.entries(briefs).sort(([, a], [, b]) => b.savedAt.localeCompare(a.savedAt));
  if (!entries.length) return null;
  return (
    <details className="mb-5 rounded-2xl border border-slate-200 bg-white p-4">
      <summary className="cursor-pointer text-sm font-bold text-slate-900">Saved KWIN briefs · {entries.length} available from this device</summary>
      <p className="mt-2 text-xs leading-5 text-slate-500">These are compact KWIN metadata snapshots stored in this browser. Publisher article content is not copied or cached.</p>
      <div className="mt-4 grid gap-3 md:grid-cols-2">
        {entries.map(([id, brief]) => (
          <article key={id} className="rounded-xl border border-slate-200 bg-slate-50 p-3">
            <p className="text-[11px] font-bold uppercase tracking-wide text-slate-500">{brief.source} · {brief.provenance.replace(/-/g, ' ')}</p>
            <h3 className="mt-1 text-sm font-extrabold leading-5 text-slate-900">{brief.title}</h3>
            <p className="mt-2 line-clamp-3 text-xs leading-5 text-slate-600">{brief.summary}</p>
            <div className="mt-3 flex items-center gap-3">
              <a href={brief.link} target="_blank" rel="noreferrer" className="text-xs font-bold text-cyan-800 hover:underline">Original ↗</a>
              <button type="button" onClick={() => onRemove(id)} className="text-xs font-bold text-slate-500 hover:text-rose-700">Remove</button>
            </div>
          </article>
        ))}
      </div>
    </details>
  );
}

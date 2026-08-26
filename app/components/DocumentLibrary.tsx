"use client";

import { useMemo, useState } from "react";
import {
  KWIN_DOCUMENT_LIBRARY,
  type DocumentTrustLevel,
} from "@/data/kwin/document-library";

const FILTERS: Array<{ id: "all" | DocumentTrustLevel; label: string }> = [
  { id: "all", label: "All records" },
  { id: "primary", label: "Primary authority" },
  { id: "contextual", label: "Contextual record" },
  { id: "discovery", label: "Discovery lead" },
];

const TRUST_STYLE: Record<DocumentTrustLevel, string> = {
  primary: "border-emerald-200 bg-emerald-50 text-emerald-800",
  contextual: "border-blue-200 bg-blue-50 text-blue-800",
  discovery: "border-amber-200 bg-amber-50 text-amber-800",
};

const TRUST_LABEL: Record<DocumentTrustLevel, string> = {
  primary: "Primary authority",
  contextual: "Contextual record",
  discovery: "Discovery lead",
};

export default function DocumentLibrary() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<"all" | DocumentTrustLevel>("all");
  const records = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return KWIN_DOCUMENT_LIBRARY.filter((record) => {
      const matchesFilter = filter === "all" || record.trust === filter;
      const haystack =
        `${record.title} ${record.authority} ${record.type} ${record.scope} ${record.note}`.toLowerCase();
      return (
        matchesFilter &&
        (!normalizedQuery || haystack.includes(normalizedQuery))
      );
    });
  }, [filter, query]);

  return (
    <section
      className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7"
      aria-labelledby="document-library-title"
    >
      <div className="max-w-3xl">
        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#6F3F00]">
          Verified discovery
        </p>
        <h2
          id="document-library-title"
          className="mt-1 text-2xl font-extrabold text-slate-950"
        >
          Find the record before forming a conclusion.
        </h2>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          Every entry says whether it is an issuing authority, contextual
          material, or only a lead to investigate. This library does not
          determine a document’s legal effect or project applicability.
        </p>
      </div>

      <div className="mt-6 grid gap-3 md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
        <label className="relative block">
          <span className="sr-only">Search official records</span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            type="search"
            placeholder="Search authority, document type, or topic"
            className="min-h-12 w-full rounded-xl border border-slate-300 bg-white px-4 pr-10 text-sm text-slate-950 outline-none transition placeholder:text-slate-500 focus:border-amber-500 focus:ring-4 focus:ring-amber-100"
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-500"
          >
            ⌕
          </span>
        </label>
        <p className="text-sm font-medium text-slate-600" aria-live="polite">
          {records.length} {records.length === 1 ? "record" : "records"}
        </p>
      </div>

      <div
        className="mt-3 flex gap-2 overflow-x-auto pb-1"
        aria-label="Filter records by evidence level"
      >
        {FILTERS.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setFilter(item.id)}
            aria-pressed={filter === item.id}
            className={`min-h-10 shrink-0 rounded-full border px-3 text-xs font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600 ${filter === item.id ? "border-slate-950 bg-slate-950 text-white" : "border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50"}`}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="mt-5 grid gap-3">
        {records.map((record) => (
          <article
            key={record.id}
            className="rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:p-5"
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-slate-500">
                  {record.type} · {record.authority}
                </p>
                <h3 className="mt-1 text-base font-bold text-slate-950">
                  {record.title}
                </h3>
              </div>
              <span
                className={`shrink-0 rounded-full border px-2.5 py-1 text-[11px] font-bold ${TRUST_STYLE[record.trust]}`}
              >
                {TRUST_LABEL[record.trust]}
              </span>
            </div>
            <p className="mt-2 text-sm font-medium text-slate-700">
              Scope: {record.scope}
            </p>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              {record.note}
            </p>
            <a
              href={record.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex min-h-11 items-center gap-2 rounded-xl border border-slate-300 bg-white px-3.5 text-sm font-bold text-slate-900 transition hover:border-amber-300 hover:bg-amber-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600"
            >
              Open record <span aria-hidden="true">↗</span>
            </a>
          </article>
        ))}
      </div>

      {records.length === 0 ? (
        <p
          className="mt-6 rounded-xl border border-dashed border-slate-300 bg-slate-50 px-4 py-6 text-sm text-slate-600"
          role="status"
        >
          No record matches that search. Try an authority such as KIADB, a type
          such as “Gazette,” or clear the filter.
        </p>
      ) : null}
    </section>
  );
}

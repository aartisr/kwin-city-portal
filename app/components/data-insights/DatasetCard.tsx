'use client';

import { useCallback, useState } from 'react';
import type { ChartType, DatasetConfig } from '@/lib/data-insights-datasets';
import { ChartRenderer } from './ChartRenderer';
import { LOCAL_DATA } from './constants';
import { normaliseRows } from './normaliseRows';

type FetchState =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'error'; message: string; hint?: string }
  | { status: 'ok'; data: Record<string, string | number>[] };

const CHART_TYPES: ChartType[] = ['bar', 'line', 'area', 'pie'];

type DatasetCardProps = {
  cfg: DatasetConfig;
};

export function DatasetCard({ cfg }: DatasetCardProps) {
  const [state, setState] = useState<FetchState>({ status: 'idle' });
  const [chartType, setChartType] = useState<ChartType>(cfg.chartType);
  const [limit, setLimit] = useState(30);

  const load = useCallback(async () => {
    if (cfg.dataset === '__local__') {
      setState({ status: 'ok', data: LOCAL_DATA[cfg.id] ?? [] });
      return;
    }

    setState({ status: 'loading' });

    try {
      const response = await fetch(`/api/opencity?dataset=${encodeURIComponent(cfg.dataset)}&limit=${limit}`);
      const json = await response.json();

      if (!response.ok || json.error) {
        setState({
          status: 'error',
          message: json.error ?? 'Failed to fetch data',
          hint: json.hint,
        });
        return;
      }

      const records: Record<string, unknown>[] = json.result?.records ?? [];
      if (!records.length) {
        setState({ status: 'error', message: 'Dataset returned no table records.', hint: json.hint });
        return;
      }

      setState({ status: 'ok', data: normaliseRows(records, cfg, limit) });
    } catch (error) {
      setState({
        status: 'error',
        message: error instanceof Error ? error.message : 'Network error',
      });
    }
  }, [cfg, limit]);

  return (
    <div className="rounded-2xl border border-white/8 bg-[rgba(255,255,255,0.03)] overflow-hidden flex flex-col">
      <div className="px-6 pt-6 pb-4 border-b border-white/8">
        <div className="flex items-start justify-between gap-3 mb-2">
          <span
            className="text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full"
            style={{ backgroundColor: `${cfg.tagColor}18`, color: cfg.tagColor }}
          >
            {cfg.tag}
          </span>
          {cfg.dataset !== '__local__' ? (
            <a
              href={`https://data.opencity.in/dataset/${cfg.dataset}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] text-[#64748B] hover:text-[#94A3B8] transition-colors"
            >
              ↗ OpenCity
            </a>
          ) : null}
        </div>
        <h3 className="text-lg font-bold text-white mb-1">{cfg.label}</h3>
        <p className="text-sm text-[#94A3B8] leading-relaxed">{cfg.description}</p>
      </div>

      <div className="flex-1 px-4 py-5 min-h-[380px] flex flex-col">
        {state.status === 'idle' ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-4">
            {cfg.dataset !== '__local__' ? (
              <label className="text-xs text-[#64748B] flex items-center gap-2">
                Show top
                <select
                  className="bg-[#0D1333] border border-white/10 rounded-lg px-2 py-1 text-white text-xs"
                  value={limit}
                  onChange={(event) => setLimit(parseInt(event.target.value, 10))}
                >
                  {[15, 30, 50, 100].map((count) => (
                    <option key={count} value={count}>{count}</option>
                  ))}
                </select>
                records
              </label>
            ) : null}

            <button
              onClick={load}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm text-[#040714] bg-[linear-gradient(135deg,#F5A623,#E8A020)] hover:brightness-110 transition-all"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              Generate Chart
            </button>
          </div>
        ) : null}

        {state.status === 'loading' ? (
          <div className="flex-1 flex items-center justify-center gap-3 text-[#94A3B8]">
            <div className="w-5 h-5 rounded-full border-2 border-[#F5A623] border-t-transparent animate-spin" />
            Fetching from data.opencity.in…
          </div>
        ) : null}

        {state.status === 'error' ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-3 text-center px-4">
            <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center text-red-400 text-xl">!</div>
            <p className="text-red-400 text-sm font-semibold">{state.message}</p>
            {state.hint ? <p className="text-[#64748B] text-xs">{state.hint}</p> : null}
            <button onClick={load} className="btn btn-outline-light text-xs px-4 py-2">Retry</button>
          </div>
        ) : null}

        {state.status === 'ok' ? (
          <>
            <div className="flex justify-end gap-1 mb-3">
              {CHART_TYPES.map((type) => (
                <button
                  key={type}
                  onClick={() => setChartType(type)}
                  className={`text-[10px] font-bold uppercase tracking-wide px-2.5 py-1 rounded-lg transition-colors ${
                    chartType === type
                      ? 'bg-[#F5A623] text-[#040714]'
                      : 'text-[#64748B] hover:text-white hover:bg-white/5'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>

            <ChartRenderer data={state.data} cfg={{ ...cfg, chartType }} />

            {cfg.note ? (
              <p className="text-[10px] text-[#475569] mt-3 text-center">{cfg.note}</p>
            ) : null}

            <button
              onClick={() => setState({ status: 'idle' })}
              className="mt-3 self-center text-xs text-[#64748B] hover:text-white transition-colors"
            >
              ← Reset
            </button>
          </>
        ) : null}
      </div>
    </div>
  );
}

'use client';

import { useState, useCallback } from 'react';
import {
  BarChart, Bar, LineChart, Line, AreaChart, Area,
  PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';

// ─────────────────────────────────────────────────────────────────
// Dataset catalogue — each entry describes a real OpenCity dataset,
// its CKAN slug, which columns to use, and which chart type fits best.
// ─────────────────────────────────────────────────────────────────
export type ChartType = 'bar' | 'line' | 'area' | 'pie';

export interface DatasetConfig {
  id: string;
  label: string;
  description: string;
  tag: string;
  tagColor: string;
  dataset: string;         // CKAN package slug
  xField: string;          // column for X axis / pie label
  yField: string;          // column for Y axis / pie value
  chartType: ChartType;
  sortBy?: string;
  dateField?: string;
  unit?: string;
  note?: string;
}

export const OPENCITY_DATASETS: DatasetConfig[] = [
  {
    id: 'aviation',
    label: 'Bengaluru Airport Traffic',
    description: 'Annual passenger movements at KIAL — the core connectivity argument for North Bengaluru.',
    tag: 'Connectivity',
    tagColor: '#3B82F6',
    dataset: 'bengaluru-aviation-traffic-data',
    xField: 'Year',
    yField: 'Total_Passengers',
    chartType: 'area',
    unit: 'passengers',
    note: "Shows North Bengaluru's airport-anchored growth trajectory.",
  },
  {
    id: 'aviation-growth',
    label: 'Bengaluru Air Traffic Growth Trajectory',
    description: 'Year-over-year growth in total passengers at KIAL, indicating North Bengaluru demand momentum.',
    tag: 'Growth',
    tagColor: '#8B5CF6',
    dataset: 'bengaluru-aviation-traffic-data',
    xField: 'Year',
    yField: 'Growth_Percent',
    chartType: 'line',
    unit: '% YoY',
    note: 'Derived from OpenCity aviation records; a stronger growth signal than rainfall context.',
  },
  {
    id: 'groundwater',
    label: 'Groundwater Depth by Taluk',
    description: 'Pre-monsoon groundwater depth across Karnataka taluks — evidence layer for water resilience.',
    tag: 'Water',
    tagColor: '#06B6D4',
    dataset: 'karnataka-talukwise-groundwater-depth',
    xField: 'Taluk',
    yField: 'Pre_Monsoon_Depth_m',
    chartType: 'bar',
    unit: 'm depth',
    note: "Deeper readings = more stress; justifies KWIN's recharge systems.",
  },
  {
    id: 'lakes',
    label: 'Bengaluru Lakes by Maintainer',
    description: 'Distribution of lake custody across agencies — context for KWIN\'s blue-green infrastructure.',
    tag: 'Ecology',
    tagColor: '#10B981',
    dataset: 'bengaluru-lakes-and-their-maintainers',
    xField: 'Maintaining_Agency',
    yField: 'Count',
    chartType: 'pie',
    note: 'Shows institutional complexity of lake stewardship in Bengaluru.',
  },
  {
    id: 'kwin-sectors',
    label: 'KWIN Projected Jobs by Sector',
    description: 'Employment projections across KWIN\'s five knowledge-economy sectors (portal data).',
    tag: 'KWIN Plan',
    tagColor: '#F5A623',
    dataset: '__local__',   // served from constants, no API call
    xField: 'sector',
    yField: 'jobs',
    chartType: 'bar',
    unit: 'jobs (projected)',
    note: 'Proposal-level figures pending KIADB verification.',
  },
  {
    id: 'kwin-phases',
    label: 'KWIN Construction Phase Progress',
    description: 'Current completion % across the five project phases.',
    tag: 'KWIN Plan',
    tagColor: '#F5A623',
    dataset: '__local__',
    xField: 'phase',
    yField: 'progress',
    chartType: 'bar',
    unit: '% complete',
    note: 'Based on portal data; actual on-ground status pending KIADB update.',
  },
];

// Local data fallback (no API call required)
const LOCAL_DATA: Record<string, Record<string, string | number>[]> = {
  'kwin-sectors': [
    { sector: 'ICT', jobs: 30000 },
    { sector: 'Semiconductor', jobs: 25000 },
    { sector: 'Health-Tech', jobs: 20000 },
    { sector: 'Aerospace', jobs: 15000 },
    { sector: 'Renewable Energy', jobs: 10000 },
  ],
  'kwin-phases': [
    { phase: 'Phase 0 (2024)', progress: 100 },
    { phase: 'Phase 1 (2025)', progress: 35 },
    { phase: 'Phase 2 (2026)', progress: 10 },
    { phase: 'Phase 3 (2027)', progress: 0 },
    { phase: 'Phase 4 (2028)', progress: 0 },
    { phase: 'Phase 5 (2030)', progress: 0 },
  ],
};

// ─────────────────────────────────────────────────────────────────
// Palette
// ─────────────────────────────────────────────────────────────────
const CHART_COLORS = ['#F5A623', '#3B82F6', '#10B981', '#06B6D4', '#8B5CF6', '#EF4444', '#EC4899'];

// ─────────────────────────────────────────────────────────────────
// Helper: normalise raw CKAN records into {xField, yField} pairs
// ─────────────────────────────────────────────────────────────────
function normaliseRows(
  records: Record<string, unknown>[],
  cfg: DatasetConfig,
  limit: number
): Record<string, string | number>[] {
  // Find available columns
  const keys = Object.keys(records[0] ?? {});

  // Try to match xField / yField case-insensitively
  const findKey = (want: string) =>
    keys.find((k) => k.toLowerCase() === want.toLowerCase()) ??
    keys.find((k) => k.toLowerCase().includes(want.toLowerCase()));

  const xKey = findKey(cfg.xField) ?? keys[1];
  const yKey = findKey(cfg.yField) ?? keys[2];

  if (cfg.id === 'aviation-growth') {
    const yearKey = findKey('Year') ?? xKey;
    const passengersKey = findKey('Total_Passengers') ?? findKey('Passengers') ?? yKey;

    const yearly = records
      .map((row) => {
        const year = Number(String(row[yearKey] ?? '').replace(/[^0-9]/g, ''));
        const passengers = parseFloat(String(row[passengersKey] ?? 0).replace(/,/g, ''));
        return { year, passengers };
      })
      .filter((row) => Number.isFinite(row.year) && Number.isFinite(row.passengers) && row.passengers > 0)
      .sort((a, b) => a.year - b.year);

    const growthSeries: Record<string, string | number>[] = [];
    for (let i = 1; i < yearly.length; i += 1) {
      const prev = yearly[i - 1];
      const curr = yearly[i];
      if (prev.passengers <= 0) continue;
      const growth = ((curr.passengers - prev.passengers) / prev.passengers) * 100;
      growthSeries.push({
        [cfg.xField]: String(curr.year),
        [cfg.yField]: Number(growth.toFixed(2)),
      });
    }

    return growthSeries.slice(-limit);
  }

  // For pie charts: aggregate by xKey
  if (cfg.chartType === 'pie') {
    const counts: Record<string, number> = {};
    for (const row of records) {
      const label = String(row[xKey] ?? 'Unknown').trim();
      if (!label || label === 'null') continue;
      const val = parseFloat(String(row[yKey] ?? '1'));
      counts[label] = (counts[label] ?? 0) + (isNaN(val) ? 1 : val);
    }
    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8)
      .map(([name, value]) => ({ [cfg.xField]: name, [cfg.yField]: value }));
  }

  return records
    .slice(0, limit)
    .map((r) => {
      const xVal = String(r[xKey] ?? '').slice(0, 30);
      const yRaw = r[yKey];
      const yVal = typeof yRaw === 'number' ? yRaw : parseFloat(String(yRaw ?? 0).replace(/,/g, ''));
      return { [cfg.xField]: xVal, [cfg.yField]: isNaN(yVal) ? 0 : yVal };
    })
    .filter((r) => r[cfg.xField]);
}

// ─────────────────────────────────────────────────────────────────
// Chart renderer
// ─────────────────────────────────────────────────────────────────
function ChartRenderer({
  data,
  cfg,
}: {
  data: Record<string, string | number>[];
  cfg: DatasetConfig;
}) {
  const fmt = (v: number) =>
    v >= 1_000_000
      ? `${(v / 1_000_000).toFixed(1)}M`
      : v >= 1_000
      ? `${(v / 1_000).toFixed(1)}K`
      : String(Math.round(v));

  const tickStyle = { fill: '#94A3B8', fontSize: 11 };

  const common = {
    data,
    margin: { top: 8, right: 16, left: 0, bottom: 60 },
  };

  if (cfg.chartType === 'pie') {
    const chartDesc = `Pie chart: ${cfg.description}. Categories shown: ${data.map((d) => `${d[cfg.xField]}: ${fmt(Number(d[cfg.yField] ?? 0))}`).join(', ')}`;
    return (
      <figure role="img" aria-label={cfg.label} aria-describedby={`chart-desc-${cfg.id}`}>
        <ResponsiveContainer width="100%" height={340}>
          <PieChart>
            <Pie
              data={data}
              dataKey={cfg.yField}
              nameKey={cfg.xField}
              cx="50%"
              cy="45%"
              outerRadius={110}
              label={({ name, percent }) => `${String(name).slice(0, 18)} (${((percent ?? 0) * 100).toFixed(0)}%)`}
              labelLine={false}
            >
              {data.map((_, i) => (
                <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(v) => [fmt(Number(v ?? 0)), cfg.yField]} />
          </PieChart>
        </ResponsiveContainer>
        <figcaption id={`chart-desc-${cfg.id}`} className="sr-only">{chartDesc}</figcaption>
      </figure>
    );
  }

  if (cfg.chartType === 'area') {
    const chartDesc = `Area chart: ${cfg.description}. ${cfg.note ? `Note: ${cfg.note}` : ''}`;
    return (
      <figure role="img" aria-label={cfg.label} aria-describedby={`chart-desc-${cfg.id}`}>
        <ResponsiveContainer width="100%" height={340}>
          <AreaChart {...common}>
          <defs>
            <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#F5A623" stopOpacity={0.25} />
              <stop offset="95%" stopColor="#F5A623" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" />
          <XAxis
            dataKey={cfg.xField}
            tick={tickStyle}
            angle={-40}
            textAnchor="end"
            interval="preserveStartEnd"
          />
          <YAxis tick={tickStyle} tickFormatter={fmt} />
          <Tooltip formatter={(v) => [fmt(Number(v ?? 0)), cfg.unit ?? cfg.yField]} />
          <Area type="monotone" dataKey={cfg.yField} stroke="#F5A623" fill="url(#areaGrad)" strokeWidth={2} />
        </AreaChart>
        </ResponsiveContainer>
        <figcaption id={`chart-desc-${cfg.id}`} className="sr-only">{chartDesc}</figcaption>
      </figure>
    );
  }

  if (cfg.chartType === 'line') {
    const chartDesc = `Line chart: ${cfg.description}. ${cfg.note ? `Note: ${cfg.note}` : ''}`;
    return (
      <figure role="img" aria-label={cfg.label} aria-describedby={`chart-desc-${cfg.id}`}>
        <ResponsiveContainer width="100%" height={340}>
          <LineChart {...common}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" />
          <XAxis dataKey={cfg.xField} tick={tickStyle} angle={-40} textAnchor="end" />
          <YAxis tick={tickStyle} tickFormatter={fmt} />
          <Tooltip formatter={(v) => [fmt(Number(v ?? 0)), cfg.unit ?? cfg.yField]} />
          <Line type="monotone" dataKey={cfg.yField} stroke="#3B82F6" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
        <figcaption id={`chart-desc-${cfg.id}`} className="sr-only">{chartDesc}</figcaption>
      </figure>
    );
  }

  // bar (default)
  return (
    <ResponsiveContainer width="100%" height={340}>
      <BarChart {...common}>
        <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" />
        <XAxis dataKey={cfg.xField} tick={tickStyle} angle={-40} textAnchor="end" interval="preserveStartEnd" />
        <YAxis tick={tickStyle} tickFormatter={fmt} />
        <Tooltip formatter={(v) => [fmt(Number(v ?? 0)), cfg.unit ?? cfg.yField]} />
        <Bar dataKey={cfg.yField} radius={[4, 4, 0, 0]}>
          {data.map((_, i) => (
            <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

// ─────────────────────────────────────────────────────────────────
// Single dataset card
// ─────────────────────────────────────────────────────────────────
type FetchState =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'error'; message: string; hint?: string }
  | { status: 'ok'; data: Record<string, string | number>[] };

function DatasetCard({ cfg }: { cfg: DatasetConfig }) {
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
      const res = await fetch(
        `/api/opencity?dataset=${encodeURIComponent(cfg.dataset)}&limit=${limit}`
      );
      const json = await res.json();

      if (!res.ok || json.error) {
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
    } catch (e) {
      setState({ status: 'error', message: e instanceof Error ? e.message : 'Network error' });
    }
  }, [cfg, limit]);

  const TYPES: ChartType[] = ['bar', 'line', 'area', 'pie'];

  return (
    <div className="rounded-2xl border border-white/8 bg-[rgba(255,255,255,0.03)] overflow-hidden flex flex-col">
      {/* Header */}
      <div className="px-6 pt-6 pb-4 border-b border-white/8">
        <div className="flex items-start justify-between gap-3 mb-2">
          <span
            className="text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full"
            style={{ backgroundColor: `${cfg.tagColor}18`, color: cfg.tagColor }}
          >
            {cfg.tag}
          </span>
          {cfg.dataset !== '__local__' && (
            <a
              href={`https://data.opencity.in/dataset/${cfg.dataset}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] text-[#64748B] hover:text-[#94A3B8] transition-colors"
            >
              ↗ OpenCity
            </a>
          )}
        </div>
        <h3 className="text-lg font-bold text-white mb-1">{cfg.label}</h3>
        <p className="text-sm text-[#94A3B8] leading-relaxed">{cfg.description}</p>
      </div>

      {/* Chart area */}
      <div className="flex-1 px-4 py-5 min-h-[380px] flex flex-col">
        {state.status === 'idle' && (
          <div className="flex-1 flex flex-col items-center justify-center gap-4">
            {cfg.dataset !== '__local__' && (
              <label className="text-xs text-[#64748B] flex items-center gap-2">
                Show top
                <select
                  className="bg-[#0D1333] border border-white/10 rounded-lg px-2 py-1 text-white text-xs"
                  value={limit}
                  onChange={(e) => setLimit(parseInt(e.target.value))}
                >
                  {[15, 30, 50, 100].map((n) => (
                    <option key={n} value={n}>{n}</option>
                  ))}
                </select>
                records
              </label>
            )}
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
        )}

        {state.status === 'loading' && (
          <div className="flex-1 flex items-center justify-center gap-3 text-[#94A3B8]">
            <div className="w-5 h-5 rounded-full border-2 border-[#F5A623] border-t-transparent animate-spin" />
            Fetching from data.opencity.in…
          </div>
        )}

        {state.status === 'error' && (
          <div className="flex-1 flex flex-col items-center justify-center gap-3 text-center px-4">
            <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center text-red-400 text-xl">!</div>
            <p className="text-red-400 text-sm font-semibold">{state.message}</p>
            {state.hint && <p className="text-[#64748B] text-xs">{state.hint}</p>}
            <button onClick={load} className="btn btn-outline-light text-xs px-4 py-2">Retry</button>
          </div>
        )}

        {state.status === 'ok' && (
          <>
            {/* Chart type switcher */}
            <div className="flex justify-end gap-1 mb-3">
              {TYPES.map((t) => (
                <button
                  key={t}
                  onClick={() => setChartType(t)}
                  className={`text-[10px] font-bold uppercase tracking-wide px-2.5 py-1 rounded-lg transition-colors ${
                    chartType === t
                      ? 'bg-[#F5A623] text-[#040714]'
                      : 'text-[#64748B] hover:text-white hover:bg-white/5'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
            <ChartRenderer data={state.data} cfg={{ ...cfg, chartType }} />
            {cfg.note && (
              <p className="text-[10px] text-[#475569] mt-3 text-center">{cfg.note}</p>
            )}
            <button
              onClick={() => setState({ status: 'idle' })}
              className="mt-3 self-center text-xs text-[#64748B] hover:text-white transition-colors"
            >
              ← Reset
            </button>
          </>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// Export: full hub
// ─────────────────────────────────────────────────────────────────
const ALL_TAGS = ['All', ...Array.from(new Set(OPENCITY_DATASETS.map((d) => d.tag)))];

export default function DataInsightsHub() {
  const [filter, setFilter] = useState('All');

  const visible = filter === 'All' ? OPENCITY_DATASETS : OPENCITY_DATASETS.filter((d) => d.tag === filter);

  return (
    <div>
      {/* Filter pills */}
      <div className="flex flex-wrap gap-2 mb-10">
        {ALL_TAGS.map((tag) => (
          <button
            key={tag}
            onClick={() => setFilter(tag)}
            className={`text-sm font-semibold px-4 py-1.5 rounded-full transition-all ${
              filter === tag
                ? 'bg-[#F5A623] text-[#040714]'
                : 'border border-white/10 text-[#94A3B8] hover:border-white/25 hover:text-white'
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {visible.map((cfg) => (
          <DatasetCard key={cfg.id} cfg={cfg} />
        ))}
      </div>
    </div>
  );
}

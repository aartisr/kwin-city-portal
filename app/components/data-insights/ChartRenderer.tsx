import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import type { DatasetConfig } from '@/lib/data-insights-datasets';
import { CHART_COLORS } from './constants';

type ChartRendererProps = {
  data: Record<string, string | number>[];
  cfg: DatasetConfig;
};

export function ChartRenderer({ data, cfg }: ChartRendererProps) {
  const formatValue = (value: number) =>
    value >= 1_000_000
      ? `${(value / 1_000_000).toFixed(1)}M`
      : value >= 1_000
      ? `${(value / 1_000).toFixed(1)}K`
      : String(Math.round(value));

  const tickStyle = { fill: '#94A3B8', fontSize: 11 };
  const common = { data, margin: { top: 8, right: 16, left: 0, bottom: 60 } };

  if (cfg.chartType === 'pie') {
    const chartDescription = `Pie chart: ${cfg.description}. Categories shown: ${data.map((item) => `${item[cfg.xField]}: ${formatValue(Number(item[cfg.yField] ?? 0))}`).join(', ')}`;
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
              {data.map((_, index) => (
                <Cell key={index} fill={CHART_COLORS[index % CHART_COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => [formatValue(Number(value ?? 0)), cfg.yField]} />
          </PieChart>
        </ResponsiveContainer>
        <figcaption id={`chart-desc-${cfg.id}`} className="sr-only">{chartDescription}</figcaption>
      </figure>
    );
  }

  if (cfg.chartType === 'area') {
    const chartDescription = `Area chart: ${cfg.description}. ${cfg.note ? `Note: ${cfg.note}` : ''}`;
    return (
      <figure role="img" aria-label={cfg.label} aria-describedby={`chart-desc-${cfg.id}`}>
        <ResponsiveContainer width="100%" height={340}>
          <AreaChart {...common}>
            <defs>
              <linearGradient id={`area-gradient-${cfg.id}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#F5A623" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#F5A623" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" />
            <XAxis dataKey={cfg.xField} tick={tickStyle} angle={-40} textAnchor="end" interval="preserveStartEnd" />
            <YAxis tick={tickStyle} tickFormatter={formatValue} />
            <Tooltip formatter={(value) => [formatValue(Number(value ?? 0)), cfg.unit ?? cfg.yField]} />
            <Area type="monotone" dataKey={cfg.yField} stroke="#F5A623" fill={`url(#area-gradient-${cfg.id})`} strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
        <figcaption id={`chart-desc-${cfg.id}`} className="sr-only">{chartDescription}</figcaption>
      </figure>
    );
  }

  if (cfg.chartType === 'line') {
    const chartDescription = `Line chart: ${cfg.description}. ${cfg.note ? `Note: ${cfg.note}` : ''}`;
    return (
      <figure role="img" aria-label={cfg.label} aria-describedby={`chart-desc-${cfg.id}`}>
        <ResponsiveContainer width="100%" height={340}>
          <LineChart {...common}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" />
            <XAxis dataKey={cfg.xField} tick={tickStyle} angle={-40} textAnchor="end" />
            <YAxis tick={tickStyle} tickFormatter={formatValue} />
            <Tooltip formatter={(value) => [formatValue(Number(value ?? 0)), cfg.unit ?? cfg.yField]} />
            <Line type="monotone" dataKey={cfg.yField} stroke="#3B82F6" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
        <figcaption id={`chart-desc-${cfg.id}`} className="sr-only">{chartDescription}</figcaption>
      </figure>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={340}>
      <BarChart {...common}>
        <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" />
        <XAxis dataKey={cfg.xField} tick={tickStyle} angle={-40} textAnchor="end" interval="preserveStartEnd" />
        <YAxis tick={tickStyle} tickFormatter={formatValue} />
        <Tooltip formatter={(value) => [formatValue(Number(value ?? 0)), cfg.unit ?? cfg.yField]} />
        <Bar dataKey={cfg.yField} radius={[4, 4, 0, 0]}>
          {data.map((_, index) => (
            <Cell key={index} fill={CHART_COLORS[index % CHART_COLORS.length]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

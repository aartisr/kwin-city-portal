import type { DatasetConfig } from '@/lib/data-insights-datasets';

export function normaliseRows(
  records: Record<string, unknown>[],
  cfg: DatasetConfig,
  limit: number,
): Record<string, string | number>[] {
  const keys = Object.keys(records[0] ?? {});

  const findKey = (wanted: string) =>
    keys.find((key) => key.toLowerCase() === wanted.toLowerCase())
    ?? keys.find((key) => key.toLowerCase().includes(wanted.toLowerCase()));

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
    for (let index = 1; index < yearly.length; index += 1) {
      const previous = yearly[index - 1];
      const current = yearly[index];
      if (previous.passengers <= 0) {
        continue;
      }

      const growth = ((current.passengers - previous.passengers) / previous.passengers) * 100;
      growthSeries.push({
        [cfg.xField]: String(current.year),
        [cfg.yField]: Number(growth.toFixed(2)),
      });
    }

    return growthSeries.slice(-limit);
  }

  if (cfg.chartType === 'pie') {
    const counts: Record<string, number> = {};
    for (const row of records) {
      const label = String(row[xKey] ?? 'Unknown').trim();
      if (!label || label === 'null') {
        continue;
      }

      const value = parseFloat(String(row[yKey] ?? '1'));
      counts[label] = (counts[label] ?? 0) + (Number.isNaN(value) ? 1 : value);
    }

    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8)
      .map(([name, value]) => ({ [cfg.xField]: name, [cfg.yField]: value }));
  }

  return records
    .slice(0, limit)
    .map((record) => {
      const xValue = String(record[xKey] ?? '').slice(0, 30);
      const yRaw = record[yKey];
      const yValue = typeof yRaw === 'number' ? yRaw : parseFloat(String(yRaw ?? 0).replace(/,/g, ''));
      return { [cfg.xField]: xValue, [cfg.yField]: Number.isNaN(yValue) ? 0 : yValue };
    })
    .filter((row) => row[cfg.xField]);
}

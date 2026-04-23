import { describe, expect, it } from 'vitest';
import { OPENCITY_DATASETS } from '@/lib/data-insights-datasets';
import { normaliseRows } from '@/components/data-insights/normaliseRows';

describe('data-insights/normaliseRows', () => {
  it('derives aviation growth series from passenger totals', () => {
    const config = OPENCITY_DATASETS.find((dataset) => dataset.id === 'aviation-growth');
    expect(config).toBeDefined();

    const rows = normaliseRows(
      [
        { Year: '2022', Total_Passengers: '1000' },
        { Year: '2023', Total_Passengers: '1500' },
        { Year: '2024', Total_Passengers: '1800' },
      ],
      config!,
      10,
    );

    expect(rows).toEqual([
      { Year: '2023', Growth_Percent: 50 },
      { Year: '2024', Growth_Percent: 20 },
    ]);
  });

  it('aggregates pie chart rows by label', () => {
    const config = OPENCITY_DATASETS.find((dataset) => dataset.id === 'lakes');
    expect(config).toBeDefined();

    const rows = normaliseRows(
      [
        { Maintaining_Agency: 'BBMP', Count: '2' },
        { Maintaining_Agency: 'BBMP', Count: '3' },
        { Maintaining_Agency: 'BDA', Count: '1' },
      ],
      config!,
      10,
    );

    expect(rows).toEqual([
      { Maintaining_Agency: 'BBMP', Count: 5 },
      { Maintaining_Agency: 'BDA', Count: 1 },
    ]);
  });

  it('matches generic fields case-insensitively and parses numeric values', () => {
    const config = OPENCITY_DATASETS.find((dataset) => dataset.id === 'groundwater');
    expect(config).toBeDefined();

    const rows = normaliseRows(
      [
        { Taluk_Name: 'Anekal', pre_monsoon_depth_m: '12.5' },
        { Taluk_Name: 'Yelahanka', pre_monsoon_depth_m: '7' },
      ],
      config!,
      10,
    );

    expect(rows).toEqual([
      { Taluk: 'Anekal', Pre_Monsoon_Depth_m: 12.5 },
      { Taluk: 'Yelahanka', Pre_Monsoon_Depth_m: 7 },
    ]);
  });
});

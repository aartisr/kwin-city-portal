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

  it('skips invalid aviation rows and avoids division by zero in growth series', () => {
    const config = OPENCITY_DATASETS.find((dataset) => dataset.id === 'aviation-growth');
    expect(config).toBeDefined();

    const rows = normaliseRows(
      [
        { Year: 'FY-2021', Passengers: '0' },
        { Year: 'FY-2022', Passengers: '1000' },
        { Year: 'FY-2023', Passengers: '1500' },
        { Year: 'FY-xxxx', Passengers: '800' },
      ],
      config!,
      10,
    );

    expect(rows).toEqual([
      { Year: '2023', Growth_Percent: 50 },
    ]);
  });

  it('ignores empty or null pie labels and treats invalid values as fallback counts', () => {
    const config = OPENCITY_DATASETS.find((dataset) => dataset.id === 'lakes');
    expect(config).toBeDefined();

    const rows = normaliseRows(
      [
        { Maintaining_Agency: 'BBMP', Count: '2' },
        { Maintaining_Agency: 'BDA', Count: 'oops' },
        { Maintaining_Agency: ' ', Count: '4' },
        { Maintaining_Agency: 'null', Count: '5' },
      ],
      config!,
      10,
    );

    expect(rows).toEqual([
      { Maintaining_Agency: 'BBMP', Count: 2 },
      { Maintaining_Agency: 'BDA', Count: 1 },
    ]);
  });

  it('normalizes generic rows with truncation, numeric fallback, and empty-label filtering', () => {
    const config = OPENCITY_DATASETS.find((dataset) => dataset.id === 'groundwater');
    expect(config).toBeDefined();

    const rows = normaliseRows(
      [
        { Taluk_Name: 'ExtremelyLongTalukNameThatExceedsThirtyCharacters', pre_monsoon_depth_m: 'NaN' },
        { Taluk_Name: '', pre_monsoon_depth_m: '10' },
        { Taluk_Name: 'Hebbal', pre_monsoon_depth_m: '1,234.5' },
      ],
      config!,
      3,
    );

    expect(rows).toEqual([
      { Taluk: 'ExtremelyLongTalukNameThatExce', Pre_Monsoon_Depth_m: 0 },
      { Taluk: 'Hebbal', Pre_Monsoon_Depth_m: 1234.5 },
    ]);
  });
});

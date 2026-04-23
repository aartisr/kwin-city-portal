export type ChartType = 'bar' | 'line' | 'area' | 'pie';

export interface DatasetConfig {
  id: string;
  label: string;
  description: string;
  tag: string;
  tagColor: string;
  dataset: string;
  xField: string;
  yField: string;
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
    dataset: '__local__',
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

export type KwinNewsTimelineEntry = {
  date: string;
  title: string;
  publisher: string;
  url: string;
  sourceType: 'official' | 'publisher';
  milestone: string;
  summary: string;
};

// This archive records traceable KWIN coverage from the public launch onward.
// It is intentionally curated rather than inferred from an RSS window; live
// feeds supplement it above, and every entry points readers to its source.
export const KWIN_NEWS_TIMELINE: KwinNewsTimelineEntry[] = [
  {
    date: '2025-02-14',
    title: 'Karnataka outlines a joint panel and university agreements for KWIN City',
    publisher: 'The Indian Express',
    url: 'https://indianexpress.com/article/cities/bangalore/karnataka-joint-panel-kwin-city-project-agreements-global-universities-9835676/',
    sourceType: 'publisher',
    milestone: 'Institutional coordination',
    summary: 'The report describes a proposed joint committee and university agreements discussed during Invest Karnataka; treat partnerships and delivery details as reported developments that still need confirmation from the responsible institutions.',
  },
  {
    date: '2024-11-04',
    title: 'KIADB tender process reported for the master plan and first-phase DPR',
    publisher: 'Moneycontrol',
    url: 'https://www.moneycontrol.com/news/india/karnataka-to-hire-consultant-for-masterplan-of-kwin-city-bengalurus-twin-12857669.html',
    sourceType: 'publisher',
    milestone: 'Planning and DPR',
    summary: 'Moneycontrol reported that KIADB had floated a consultant tender for a detailed master plan and first-phase DPR. Read the underlying tender or KIADB record for authoritative procurement status.',
  },
  {
    date: '2024-09-26',
    title: 'KWIN City launch announcement',
    publisher: 'Invest Karnataka / Government of Karnataka',
    url: 'https://investkarnataka.co.in/wp-content/uploads/2025/02/1.pdf',
    sourceType: 'official',
    milestone: 'Public launch',
    summary: 'Official launch release from Invest Karnataka. This establishes the timeline anchor; programme scale, targets, and future-facing statements remain proposals unless later primary records confirm them.',
  },
];

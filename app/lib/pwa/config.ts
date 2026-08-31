export const PWA_CONFIG = {
  name: "KWIN City — Knowledge · Wellbeing · Innovation",
  shortName: "KWIN City",
  description:
    "Evidence-first intelligence for KWIN City and North Bengaluru, available as a fast, resilient app.",
  startUrl: "/?source=pwa",
  scope: "/",
  themeColor: "#040714",
  backgroundColor: "#040714",
  serviceWorkerUrl: "/sw.js",
  serviceWorkerScope: "/",
  installDismissalDays: 30,
  installRepeatOfferDays: 90,
  installMinimumIosVisits: 3,
  installRevealDelayMs: 20_000,
  updateCheckIntervalMs: 60 * 60 * 1000,
  shortcuts: [
    {
      name: "Data Insights",
      shortName: "Data",
      url: "/data-insights?source=pwa-shortcut",
      description: "Explore evidence-led dashboards",
    },
    {
      name: "News Intelligence",
      shortName: "News",
      url: "/news-reader?source=pwa-shortcut",
      description: "Read the latest KWIN news signals",
    },
    {
      name: "Evidence Library",
      shortName: "Evidence",
      url: "/evidence-library?source=pwa-shortcut",
      description: "Review source-linked evidence",
    },
    {
      name: "Share KWIN City",
      shortName: "Share",
      url: "/share?source=pwa-shortcut",
      description: "Open the KWIN City sharing toolkit",
    },
  ],
} as const;

export type PwaShortcut = (typeof PWA_CONFIG.shortcuts)[number];

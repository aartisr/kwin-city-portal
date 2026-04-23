export type FooterLinkItem = {
  href: string;
  label: string;
  desc?: string;
  external?: boolean;
  accent?: boolean;
};

export type FooterGroup = {
  title: string;
  links: FooterLinkItem[];
};

export type FooterSignalCard = {
  eyebrow: string;
  title: string;
  body: string;
};

export type FooterTrustCard = {
  title: string;
  body: string;
  accent: string;
  link: {
    href: string;
    label: string;
  };
};

export type FooterContentModel = {
  lastUpdatedText: string;
  quickRoutes: FooterLinkItem[];
  signalCards: FooterSignalCard[];
  audienceCards: FooterLinkItem[];
  footerGroups: FooterGroup[];
  trustCards: FooterTrustCard[];
  credibilityRail: Array<{ icon: string; label: string }>;
};

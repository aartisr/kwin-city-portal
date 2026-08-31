"use client";

import { useEffect, useState } from "react";
import Header from "@/components/Header";
import TrustBanner from "@/components/TrustBanner";
import type { NavGroup } from "@/components/header/types";

type SiteChromeProps = {
  menuGroups: NavGroup[];
  headerLabels: {
    search: string;
    account: string;
    signedIn: string;
    trust: string;
    hideTrustBar: string;
    showTrustBar: string;
    toggleMenu: string;
    exploreKwin: string;
    contact: string;
    language: string;
  };
  trustBannerCopy: {
    protocolLabel: string;
    bodyText: string;
    trustLabel: string;
    sourcesLabel: string;
    newsIntelligenceLabel: string;
    statusText?: string;
    degraded?: boolean;
    contentAgeDays?: number;
    factualAuditAgeDays?: number;
    executionStatusAgeDays?: number;
    incidentKey?: string;
  };
};

export default function SiteChrome({
  menuGroups,
  headerLabels,
  trustBannerCopy,
}: SiteChromeProps) {
  const [trustBannerVisible, setTrustBannerVisible] = useState(false);
  const [freshnessIncidentDismissed, setFreshnessIncidentDismissed] =
    useState(false);
  const freshnessIncident =
    trustBannerCopy.incidentKey ??
    [
      trustBannerCopy.contentAgeDays ?? 0,
      trustBannerCopy.factualAuditAgeDays ?? 0,
      trustBannerCopy.executionStatusAgeDays ?? 0,
    ].join(":");

  useEffect(() => {
    const stored = localStorage.getItem("kwin-trust-banner-visible");
    if (stored === "true") setTrustBannerVisible(true);
    setFreshnessIncidentDismissed(
      localStorage.getItem("kwin-freshness-dismissed-incident") ===
        freshnessIncident,
    );
  }, [freshnessIncident]);

  const toggleTrustBanner = () => {
    setTrustBannerVisible((visible) => {
      const next = !visible;
      localStorage.setItem("kwin-trust-banner-visible", String(next));
      return next;
    });
  };

  const dismissFreshnessIncident = () => {
    localStorage.setItem(
      "kwin-freshness-dismissed-incident",
      freshnessIncident,
    );
    localStorage.setItem("kwin-trust-banner-visible", "false");
    setFreshnessIncidentDismissed(true);
    setTrustBannerVisible(false);
  };

  const degradedNoticeVisible =
    Boolean(trustBannerCopy.degraded) && !freshnessIncidentDismissed;
  const bannerVisible = trustBannerVisible || degradedNoticeVisible;

  return (
    <>
      <Header
        trustBannerVisible={trustBannerVisible}
        onToggleTrustBanner={toggleTrustBanner}
        menuGroups={menuGroups}
        labels={headerLabels}
      />
      <TrustBanner
        visible={bannerVisible}
        expanded={trustBannerVisible}
        onExpandedChange={(expanded) => {
          setTrustBannerVisible(expanded);
          localStorage.setItem("kwin-trust-banner-visible", String(expanded));
        }}
        onDismiss={dismissFreshnessIncident}
        {...trustBannerCopy}
      />
    </>
  );
}

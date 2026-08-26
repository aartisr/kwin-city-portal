import type { Metadata } from "next";
import SiteFrame from "@/components/SiteFrame";
import PageIntro from "@/components/PageIntro";
import GazetteNewsFeed from "@/components/value-add/GazetteNewsFeed";
import Link from "next/link";

export const metadata: Metadata = {
  title: "KWIN Regulatory News | Gazette and Policy Engine",
  description:
    "Browse source-tagged gazette, policy, and infrastructure updates through a structured signal feed.",
  alternates: { canonical: "https://kwin-city.com/updates/regulatory-news" },
};

export default function RegulatoryNewsPage() {
  return (
    <SiteFrame>
      <main id="main-content" role="main">
        <PageIntro
          eyebrow="KWIN Updates"
          title="Regulatory News Engine"
          description="Follow source-tagged regulatory and infrastructure updates with clear categorization for faster decision awareness."
          sourceIds={["kiadb", "strr", "brief"]}
        />
        <section className="section bg-slate-50">
          <div className="container max-w-5xl">
            <div className="mb-5 flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-bold text-slate-900">
                  Need the underlying record?
                </p>
                <p className="mt-1 text-sm text-slate-600">
                  Search the authority-labelled document library before relying
                  on a signal.
                </p>
              </div>
              <Link
                href="/documents"
                className="inline-flex min-h-11 shrink-0 items-center justify-center rounded-xl bg-slate-950 px-4 text-sm font-bold text-white transition hover:bg-slate-800"
              >
                Open Document Library →
              </Link>
            </div>
            <GazetteNewsFeed />
          </div>
        </section>
      </main>
    </SiteFrame>
  );
}

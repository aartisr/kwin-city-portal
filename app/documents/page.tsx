import type { Metadata } from "next";
import DocumentLibrary from "@/components/DocumentLibrary";
import PageIntro from "@/components/PageIntro";
import SiteFrame from "@/components/SiteFrame";

export const metadata: Metadata = {
  title: "KWIN Document Library | Official Records and Source Links",
  description:
    "Search a curated KWIN City document library of issuing authorities, planning records, gazette discovery paths, infrastructure context, and environmental references.",
  alternates: { canonical: "https://kwin-city.com/documents" },
};

export default function DocumentLibraryPage() {
  return (
    <SiteFrame>
      <main id="main-content" role="main">
        <PageIntro
          eyebrow="KWIN Research"
          title="Document Library"
          description="A calm starting point for official records, qualified regional context, and discovery paths that should be verified at the issuing authority."
          sourceIds={["kiadb", "strr", "rainfall", "economicSurvey"]}
        />
        <section className="section bg-slate-50">
          <div className="container max-w-5xl">
            <DocumentLibrary />
          </div>
        </section>
      </main>
    </SiteFrame>
  );
}

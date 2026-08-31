export type DocumentTrustLevel = "primary" | "contextual" | "discovery";

export type DocumentRecord = {
  id: string;
  title: string;
  authority: string;
  type:
    | "Gazette"
    | "Planning"
    | "Land notification"
    | "Infrastructure"
    | "Environment"
    | "Economic policy";
  scope: string;
  trust: DocumentTrustLevel;
  url: string;
  note: string;
};

/**
 * A deliberately small, curated starting registry. Entries must link to the
 * issuing authority or an explicitly labelled public-document mirror. This is
 * a document-finding tool, not evidence that a record applies to KWIN City.
 */
export const KWIN_DOCUMENT_LIBRARY: DocumentRecord[] = [
  {
    id: "karnataka-erajyapatra",
    title: "Karnataka eRajyapatra",
    authority: "Government of Karnataka",
    type: "Gazette",
    scope: "Official Karnataka gazette publication portal",
    trust: "primary",
    url: "https://www.egazette.karnataka.gov.in/",
    note: "Use the issuing authority record to verify legal effect, publication date, and applicability before relying on a notice.",
  },
  {
    id: "kiadb-portal",
    title: "KIADB official portal",
    authority: "Karnataka Industrial Areas Development Board",
    type: "Planning",
    scope: "Industrial land, approvals, and institutional announcements",
    trust: "primary",
    url: "https://kiadb.karnataka.gov.in/",
    note: "Primary institutional starting point for KWIN-specific status, approvals, land, and infrastructure records when published.",
  },
  {
    id: "bmrda-portal",
    title: "BMRDA regional planning portal",
    authority: "Bengaluru Metropolitan Region Development Authority",
    type: "Planning",
    scope: "Bengaluru metropolitan planning and growth-corridor context",
    trust: "primary",
    url: "https://bmrda.karnataka.gov.in/",
    note: "Use for statutory regional-planning context; it does not by itself confirm KWIN-specific approvals or implementation.",
  },
  {
    id: "kride-corridor-one",
    title: "K-RIDE land acquisition notification — Corridor 1",
    authority: "K-RIDE / Karnataka eRajyapatra, mirrored by OpenCity",
    type: "Land notification",
    scope: "K.S.R. Bengaluru–Devanahalli corridor document",
    trust: "contextual",
    url: "https://data.opencity.in/dataset/df5f2edd-0b53-42d3-b44e-8e78066170c9/resource/09113c50-2a0d-44ec-958e-90d9f2af87be/download/10836.pdf",
    note: "Public mirror of a corridor notification. Confirm the original gazette and whether any boundary or notice applies to a specific location.",
  },
  {
    id: "strr-documents",
    title: "Bengaluru STRR document collection",
    authority: "Government of Karnataka, indexed by OpenCity",
    type: "Infrastructure",
    scope: "Satellite Town Ring Road planning documents",
    trust: "contextual",
    url: "https://data.opencity.in/dataset/bengaluru-strr-via-bannerughatta-national-park-documents",
    note: "Useful regional infrastructure context. It does not establish a KWIN delivery date, alignment, or access commitment.",
  },
  {
    id: "ksndmc-rainfall",
    title: "Karnataka annual rainfall data",
    authority: "KSNDMC, indexed by OpenCity",
    type: "Environment",
    scope: "District, taluk, and hobli rainfall context",
    trust: "contextual",
    url: "https://data.opencity.in/dataset/karnataka-annual-rainfall-districts-taluks-and-hoblis",
    note: "Environmental planning context only; it does not validate project-level water or drainage design.",
  },
  {
    id: "karnataka-economic-survey",
    title: "Economic Survey of Karnataka 2025–26",
    authority: "Government of Karnataka, indexed by OpenCity",
    type: "Economic policy",
    scope: "State macroeconomic and industrial context",
    trust: "contextual",
    url: "https://data.opencity.in/dataset/economic-survey-of-karnataka-2025-26",
    note: "Supports state-level context, not project-specific investment, jobs, tenant, or delivery claims.",
  },
  {
    id: "gazette-tracker",
    title: "Gazette Tracker — Bengaluru North",
    authority: "Gazette Tracker (independent index)",
    type: "Gazette",
    scope: "Discovery index for notices associated with Bengaluru North",
    trust: "discovery",
    url: "https://gazettetracker.com/location/karnataka/bengaluru-north",
    note: "Discovery aid only. Follow through to the issuing authority’s official PDF before treating a notice as complete, current, or applicable.",
  },
];

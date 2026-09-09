import { Claim, Thread } from "../types";

export const initialClaims: Claim[] = [
  {
    id: "claim-1",
    statement: "Tata IISc Medical School is being established in the KWIN City Wellbeing & Knowledge District.",
    status: "confirmed",
    category: "Wellbeing",
    description: "The Indian Institute of Science (IISc) partnered with Tata Trust to build a world-class academic medical center and super-specialty teaching hospital, acting as a anchor for the Wellbeing and Knowledge districts.",
    upvotes: 42,
    evidenceList: [
      {
        id: "ev-1-1",
        sourceName: "Karnataka Cabinet Press Briefing & MoU Release",
        type: "official_document",
        description: "Official cabinet order allocating the initial land parcel to the Tata-IISc medical venture as part of the Phase 0 rollout.",
        verifiedAt: "2024-03-12"
      },
      {
        id: "ev-1-2",
        sourceName: "IISc Division of Biological Sciences Academic Plan",
        type: "official_document",
        description: "Official academic booklet detailing clinical research collaborations, MD-PhD pipelines, and infrastructure requirements for the KWIN Campus.",
        verifiedAt: "2024-05-18"
      }
    ],
    unverifiedClaims: [
      "Will the teaching hospital offer free or heavily subsidized treatment for local rural populations of Doddaballapur?",
      "Are undergraduate MBBS seats being offered, or is it strictly post-graduate MD-PhD research?"
    ]
  },
  {
    id: "claim-2",
    statement: "Subsequent phases of land acquisition in Doddaballapur face heavy opposition from local farmers.",
    status: "debated",
    category: "Land & Environment",
    description: "While Phase 1 core areas are approved, local farmer unions have filed objections and organized demonstrations protesting the KIADB's valuation of agricultural land and the loss of multi-crop agricultural livelihoods.",
    upvotes: 78,
    evidenceList: [
      {
        id: "ev-2-1",
        sourceName: "Karnataka Industrial Areas Development Board (KIADB) Notice No. 418",
        type: "official_document",
        description: "Public notice showing the draft boundaries of acquired land under Section 28(1) of the KIADB Act, showing over 1,200 small-holder farm plots listed.",
        verifiedAt: "2024-07-02"
      },
      {
        id: "ev-2-2",
        sourceName: "Deccan Herald Local Coverage - 'Doddaballapur Farmers Vow to Protect Lands'",
        type: "news_report",
        description: "Report documenting protests by the Karnataka Rajya Raitha Sangha (KRRS) in Dabaspet and Doddaballapur demanding revised compensation structures and land-for-land rehabilitation.",
        verifiedAt: "2024-08-14"
      }
    ],
    unverifiedClaims: [
      "KIADB is allegedly undervaluing drylands by up to 40% compared to local market value.",
      "Rumors that groundwater reservoirs in Doddaballapur Zone 2 will be completely sealed off."
    ]
  },
  {
    id: "claim-3",
    statement: "KWIN City will operate on 100% renewable energy using a 465-acre dedicated solar farm.",
    status: "proposed",
    category: "Innovation",
    description: "The official smart city conceptual plans describe a self-sustaining eco-grid powered primarily by an in-house solar farm, making it India's first zero-carbon-ready industrial corridor hub.",
    upvotes: 54,
    evidenceList: [
      {
        id: "ev-3-1",
        sourceName: "KWIN City Masterplan Proposal Document (Draft 1.2)",
        type: "official_document",
        description: "Section 4.2 detailing the green energy mix, land reservation for the solar arrays, and high-capacity battery energy storage systems (BESS).",
        verifiedAt: "2024-01-20"
      }
    ],
    unverifiedClaims: [
      "Is the land allocated for the solar farm fertile farmland, or is it barren rocky ground near Dabaspet?",
      "Will private institutions operating inside the Knowledge District be mandated to buy energy strictly from the KWIN solar grid?"
    ]
  },
  {
    id: "claim-4",
    statement: "Over 10 interconnected lakes inside the project boundary are being integrated into a modern rainwater harvesting network.",
    status: "proposed",
    category: "Land & Environment",
    description: "The water management proposal outlines a plan to rejuvenate 10+ local seasonal lakes, linking them via natural drainage channels to fulfill 50% of the city's future water demands and prevent urban flooding.",
    upvotes: 61,
    evidenceList: [
      {
        id: "ev-4-1",
        sourceName: "Minor Irrigation Department Watershed Report (Bengaluru Rural)",
        type: "official_document",
        description: "Topographic mapping and natural runoff calculations showing how the proposed urban layout preserves natural valley paths connecting local lakes.",
        verifiedAt: "2024-04-05"
      }
    ],
    unverifiedClaims: [
      "Activists raise concerns that sewage from high-density residential towers in Wellbeing District could seep into these lakes if STP capacity is bypassed."
    ]
  }
];

export const initialThreads: Thread[] = [
  {
    id: "thread-1",
    title: "Timelines for the Tata-IISc Medical School clinical phase launch",
    category: "Wellbeing",
    author: "Dr. Anirudh Sharma",
    role: "Scientist & Biotech Expert",
    content: "The Tata-IISc Medical School is arguably the most exciting anchor of KWIN City. Having a dedicated 800-bed super-specialty hospital coupled with basic research will attract immense clinical-trial infrastructure. Does anyone have official insight into when the clinical research labs (Phase 0) will be fully functional? The draft masterplan lists Q3 2026, but with Doddaballapur transit bottlenecks, is this realistic?",
    createdAt: "2026-08-25T14:30:00Z",
    upvotes: 34,
    evidenceScore: 4,
    comments: [
      {
        id: "c-1-1",
        author: "Meera Reddy",
        role: "Research Scholar, IISc",
        type: "adding_evidence",
        content: "I can confirm that the foundation core structures for the lab blocks are nearing completion. The biological containment labs (BSL-3) equipment tenders were published last month. I've attached the tender notification ID for anyone interested in tracking.",
        createdAt: "2026-08-26T09:15:00Z",
        upvotes: 18,
        citationTitle: "Karnataka State e-Procurement Portal - Tender IISc-B281",
        citationUrl: "https://eproc.karnataka.gov.in"
      },
      {
        id: "c-1-2",
        author: "Nandish Kumar",
        role: "Local Activist",
        type: "seeking_verification",
        content: "While the labs look great on paper, will local rural populations get access to super-specialty healthcare? The nearest reliable hospital is currently over 25km away. If this is subsidized, it would resolve massive healthcare inequity here.",
        createdAt: "2026-08-26T12:00:00Z",
        upvotes: 22
      }
    ],
    isPinned: true
  },
  {
    id: "thread-2",
    title: "Farmer Union negotiations regarding compensation multipliers in Doddaballapur",
    category: "Land & Environment",
    author: "Rudrappa G.",
    role: "Farmer Representative",
    content: "Our villages are not against development, but we are against being displaced with compensation based on outdated dryland guidelines. KIADB is offering ₹2.5 crore per acre, whereas the market rate along the Doddaballapur-STRR corridor exceeds ₹4 crore. If KWIN City is built on our fields, our children have no farming future. We are demanding land relocation or guaranteed tech jobs in the Innovation District.",
    createdAt: "2026-09-01T10:10:00Z",
    upvotes: 65,
    evidenceScore: 3,
    comments: [
      {
        id: "c-2-1",
        author: "Sowmya N.",
        role: "Planner Liaison",
        type: "planner_update",
        content: "The Commerce and Industries Department is reviewing a revised rehabilitation packet. It proposes a 10% commercial land allocation back to landowners within the developed city layouts (KWIN land-swap policy) to ensure long-term rental income. The final gazette review is expected in October.",
        createdAt: "2026-09-02T15:20:00Z",
        upvotes: 31
      },
      {
        id: "c-2-2",
        author: "Vikram Hegde",
        role: "Infrastructure Investor",
        type: "citizen_perspective",
        content: "This land-swap policy is exactly what made the Kempegowda Airport and Bengaluru IT parks successful for original landowners. It creates sustainable wealth rather than a one-time cash payout that gets spent quickly. Hope this is finalized soon to avoid execution delays.",
        createdAt: "2026-09-03T11:40:00Z",
        upvotes: 14
      }
    ]
  },
  {
    id: "thread-3",
    title: "Integration of STRR (Satellite Town Ring Road) and internal transit loops",
    category: "Transit & Infrastructure",
    author: "Kiran Mazumdar",
    role: "Urban Planner",
    content: "For KWIN City to house 500,000 residents, connectivity to Bengaluru and Kempegowda Airport is everything. The STRR will act as the spine. But how will internal transit connect? The masterplan proposes a monorail. Monorails are notoriously expensive to maintain (look at Mumbai). Why not a high-frequency Electric Bus Rapid Transit (e-BRT) system using dedicated corridors? It would cost 10x less and be highly adaptable.",
    createdAt: "2026-09-04T16:45:00Z",
    upvotes: 45,
    evidenceScore: 2,
    comments: [
      {
        id: "c-3-1",
        author: "Arun Alur",
        role: "Systems Architect",
        type: "adding_evidence",
        content: "The NHAI (National Highways Authority of India) STRR Doddaballapur-Hoskote stretch is now open, reducing airport travel time to 35 mins. This means logistics inside KWIN City can start day one. I agree on the e-BRT vs monorail. BRT lanes are much easier to construct alongside the standard road expansion.",
        createdAt: "2026-09-05T08:30:00Z",
        upvotes: 19
      }
    ]
  }
];

# Documentation Index

Welcome to the KWIN City Portal documentation. Choose the guide that matches your current task.

---

## Quick Navigation

| I want to… | Go to |
|------------|-------|
| Understand the project at a high level | [README.md](../README.md) |
| Check pre-release legal and asset licensing | [LEGAL_CONTENT_CHECKLIST.md](../LEGAL_CONTENT_CHECKLIST.md) |
| Understand how the site is architected | [ARCHITECTURE.md](ARCHITECTURE.md) |
| Set up the project locally or troubleshoot | [DEVELOPMENT.md](DEVELOPMENT.md) |
| Add or update data (timeline, sectors, metrics) | [DATA_MODEL.md](DATA_MODEL.md) |
| Build or modify a UI component | [COMPONENTS.md](COMPONENTS.md) |
| Work with the OpenCity API or add a dataset | [API.md](API.md) |
| Add a claim, a source, or update the Claim Ledger | [EVIDENCE_SYSTEM.md](EVIDENCE_SYSTEM.md) |
| Contribute to the project | [CONTRIBUTING.md](../CONTRIBUTING.md) |

---

## Document Summaries

### [ARCHITECTURE.md](ARCHITECTURE.md)
The complete architectural overview: tech stack, directory structure, rendering model (Server vs. Client components), data flow, evidence system layers, design system (colors, typography, spacing), and Next.js configuration details.

### [API.md](API.md)
Full reference for the `GET /api/opencity` route: parameters, response shape, error codes, CKAN data source details, caching strategy (1-hour ISR), security considerations (SSRF mitigations), and step-by-step instructions for adding a new dataset.

### [COMPONENTS.md](COMPONENTS.md)
Every component documented with its rendering context (server/client), purpose, props, usage examples, and important behavioural notes. Covers all 25 components including the Evidence & Source components (`InlineSourceBadges`, `SourceReferences`, `EvidenceVault`).

### [DATA_MODEL.md](DATA_MODEL.md)
The authoritative reference for every TypeScript interface in `app/types/kwin.ts` and every data constant in `app/data/constants.ts`. Includes all current data tables (timeline phases, pillars, sectors, sustainability metrics, source registry) and step-by-step instructions for common data modifications.

### [DEVELOPMENT.md](DEVELOPMENT.md)
Everything you need to develop: prerequisites, environment setup, daily workflow, all npm scripts, how to add pages and components, data entry recipes, testing instructions, code style conventions, and a troubleshooting reference for the most common issues.

### [EVIDENCE_SYSTEM.md](EVIDENCE_SYSTEM.md)
The intellectual core of the portal. Explains the philosophy of radical epistemic transparency, the three evidence tiers (Verified / Pending / Contextual), the complete Source Registry (S1–S9), how inline source badges work, the Claim Ledger structure, the Evidence Vault, the four editorial guardrails, and maintenance procedures for keeping the evidence system current.

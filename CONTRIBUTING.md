# Contributing to KWIN City Portal

Thank you for your interest in contributing. This guide covers the contribution workflow, standards, and the responsibilities that come with publishing content about a real proposed development project.

---

## Contents

1. [Before You Contribute](#1-before-you-contribute)
2. [Types of Contributions](#2-types-of-contributions)
3. [Workflow](#3-workflow)
4. [Content Standards](#4-content-standards)
5. [Code Standards](#5-code-standards)
6. [Pull Request Checklist](#6-pull-request-checklist)
7. [Reporting Issues](#7-reporting-issues)

---

## 1. Before You Contribute

### Understand the project's core commitment

The KWIN City Portal's most important feature is its **evidence transparency system**. Every claim on the site is labeled with its verification status and linked to its source. This is not optional — it is the reason the portal exists.

Before contributing content, read [EVIDENCE_SYSTEM.md](docs/EVIDENCE_SYSTEM.md) fully. Before contributing code that displays data, read [DATA_MODEL.md](docs/DATA_MODEL.md).

### Key rule: never publish an unattributed figure

If you add a number (jobs, investment, area, percentage, date), it must have at least one `InlineSourceBadges` badge and a corresponding entry in `KWIN_CLAIM_MAPPINGS`. If you can't point to a source, don't publish the figure.

---

## 2. Types of Contributions

### Content contributions
- Updating a timeline milestone when an official announcement is made
- Adding a new sector or sustainability metric with a verified source
- Correcting a factual error with evidence
- Improving clarity of existing descriptions without changing meaning

### Code contributions
- Bug fixes
- Performance improvements
- Accessibility improvements
- New features agreed on with the maintainer
- Test coverage additions

### Documentation contributions
- Correcting outdated information in this `docs/` folder
- Improving clarity and examples
- Adding missing documentation for existing functionality

### What we do NOT accept
- Claims without sources
- Promotional language not backed by primary documents
- Speculation presented as fact
- Features that bypass the evidence system

---

## 3. Workflow

### 1. Check for an existing issue

Before starting work, check if there's already an issue or discussion about the change you want to make.

### 2. Fork and branch

```bash
git checkout -b feat/your-feature-name
# or
git checkout -b fix/what-you-are-fixing
# or
git checkout -b docs/what-you-are-documenting
```

### 3. Make your changes

Follow the standards in the [Development Guide](docs/DEVELOPMENT.md) and the [Content Standards](#4-content-standards) section below.

### 4. Test your changes

```bash
npm run lint
npm run type-check
npm test
npm run build
```

All four must pass with no errors before submitting a pull request.

### 5. Open a pull request

Use the PR template. Fill in every section.

---

## 4. Content Standards

### Claim accuracy

| Rule | Example |
|------|---------|
| ✅ Do: state what the source says | "The KWIN project brief projects 30,000 ICT jobs [S1]" |
| ✅ Do: label contextual evidence | "Karnataka's airport handles 37M passengers annually [S3]" |
| ❌ Don't: inflate source scope | "KWIN will capture Bengaluru's tech growth [S3]" (S3 is an airport dataset — it doesn't prove this) |
| ❌ Don't: drop the badge | "KWIN will create 100,000 jobs" (no badge) |

### Source escalation rule

If a claim currently has `status: 'pending-verification'` and you have located a primary source that verifies it:

1. Add the source to `KWIN_SOURCE_REGISTRY` with `status: 'verified'`.
2. Update the `ClaimMapping` to reference the new source.
3. Include the source URL in the PR description so it can be confirmed by the maintainer before merging.

### Updating figures

When a figure changes (a progress update, a new announcement):

1. Update the value in `constants.ts`.
2. Check whether the source for that figure has changed. If yes, update `sourceIds` in the `ClaimMapping`.
3. If a previously pending-verification claim is now verified, follow the source escalation rule above.

---

## 5. Code Standards

See [DEVELOPMENT.md](docs/DEVELOPMENT.md) for the full development guide. Quick checklist:

- [ ] No `any` TypeScript types
- [ ] All new components are typed with explicit prop interfaces
- [ ] Server Components used wherever interactivity is not needed
- [ ] `'use client'` only added when required (hooks, animations, event handlers)
- [ ] All new data-displaying content has `<InlineSourceBadges>` for every claim
- [ ] All new sources registered in `KWIN_SOURCE_REGISTRY`
- [ ] All new claims registered in `KWIN_CLAIM_MAPPINGS`
- [ ] `npm run format` run before committing
- [ ] Imports ordered: external → internal components → data/types

---

## 6. Pull Request Checklist

Before requesting review, confirm every item:

**Code quality**
- [ ] `npm run lint` passes with no errors
- [ ] `npm run type-check` passes with no errors
- [ ] `npm test` passes
- [ ] `npm run build` succeeds

**Content quality (if adding/changing site content)**
- [ ] Every new figure has a source badge
- [ ] New sources are registered in `KWIN_SOURCE_REGISTRY`
- [ ] New claims are registered in `KWIN_CLAIM_MAPPINGS`
- [ ] Source status is accurate (verified / pending / contextual)
- [ ] `cannotProve` list is filled in for new `EvidenceSource` entries
- [ ] No promotional language without primary source

**Documentation**
- [ ] If you changed a component's props, updated `docs/COMPONENTS.md`
- [ ] If you changed the data model, updated `docs/DATA_MODEL.md`
- [ ] If you changed API behavior, updated `docs/API.md`

**Pre-release (for maintainer)**
- [ ] [LEGAL_CONTENT_CHECKLIST.md](LEGAL_CONTENT_CHECKLIST.md) reviewed — all images, fonts, and assets licensed

---

## 7. Reporting Issues

### Factual errors

If you find a claim on the site that is inaccurate or whose source is incorrect, open an issue with:
- The page and section where the claim appears
- The current claim text
- The correct information and your source (URL or document reference)
- The current source badge label (e.g., S1, S3)

### Verification upgrades

If a claim currently labeled "Pending Verification" has been confirmed by a primary source, open an issue with the document URL so it can be verified before the site is updated.

### Security issues

Do not open a public issue for security vulnerabilities. Contact the maintainer directly:  
**Aarti S Ravikumar, BAJA Associates**

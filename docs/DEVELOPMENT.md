# Development Guide

Everything you need to run, build, test, and effectively work on the KWIN City Portal.

---

## Contents

1. [Prerequisites](#1-prerequisites)
2. [Environment Setup](#2-environment-setup)
3. [Daily Development Workflow](#3-daily-development-workflow)
4. [Available Scripts](#4-available-scripts)
5. [Adding a New Page](#5-adding-a-new-page)
6. [Adding a New Component](#6-adding-a-new-component)
7. [Adding a New Data Entry](#7-adding-a-new-data-entry)
8. [Working with Sources and Claims](#8-working-with-sources-and-claims)
9. [Testing](#9-testing)
10. [Code Style and Formatting](#10-code-style-and-formatting)
11. [Troubleshooting Common Issues](#11-troubleshooting-common-issues)
12. [Adding a New Locale](#12-adding-a-new-locale)

---

## 1. Prerequisites

| Tool | Minimum Version | Install |
|------|----------------|---------|
| Node.js | 18.x LTS | [nodejs.org](https://nodejs.org) |
| npm | 9.x (ships with Node 18) | — |
| Git | 2.x | [git-scm.com](https://git-scm.com) |

No database, no Docker, no cloud credentials required for local development. The only external service used is the public OpenCity CKAN API, which needs no authentication.

---

## 2. Environment Setup

### Clone and install

```bash
git clone <repository-url>
cd kwin-city-portal
npm install
```

### Environment variables

There are no required environment variables for local development. The OpenCity API is public.

If you ever need a `.env.local` for local overrides (e.g., a Mapbox token for future map features):

```bash
cp .env.example .env.local   # if .env.example exists
# or create manually:
touch .env.local
echo "NEXT_PUBLIC_MAPBOX_TOKEN=your_token_here" >> .env.local
```

### VS Code workspace

Open the project using the provided workspace file to keep it isolated from other local repos:

```bash
code kwin-city-portal.code-workspace
```

This is important if you have other projects open that share similar directory names.

---

## 3. Daily Development Workflow

### Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

The dev server runs with `distDir: '.next-dev'` to avoid cache conflicts with production builds.

### Hot reloading

Next.js App Router supports **Fast Refresh** — component changes are reflected in the browser immediately without a full reload. Changes to `app/data/constants.ts` or `app/types/kwin.ts` also hot-reload.

### Type checking (continuous)

Run type checking in watch mode in a separate terminal:

```bash
npm run type-check -- --watch
```

---

## 4. Available Scripts

| Script | Command | What it does |
|--------|---------|-------------|
| **dev** | `npm run dev` | Start dev server on port 3000 |
| **build** | `npm run build` | Production build (outputs to `.next/`) |
| **start** | `npm start` | Serve the production build |
| **lint** | `npm run lint` | Run ESLint with Next.js config |
| **test** | `npm test` | Run Vitest test suite |
| **type-check** | `npm run type-check` | TypeScript compiler check (no emit) |
| **format** | `npm run format` | Prettier — write all files |
| **format:check** | `npm run format:check` | Prettier — check only (CI-safe) |
| **clean:next** | `npm run clean:next` | Delete `.next/` and `.next-dev/` |

### Production build workflow

```bash
npm run build          # Build Next.js app
npm start              # Serve the production build locally
```

---

## 5. Adding a New Page

### Step 1: Create the route file

```bash
# Example: add a /partners page
mkdir app/partners
touch app/partners/page.tsx
```

### Step 2: Write the page

```tsx
// app/partners/page.tsx
import SiteFrame from '@/components/SiteFrame';
import PageIntro from '@/components/PageIntro';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Partners',   // Will render as "Partners | BAJA Associates"
  description: 'Institutional partners of KWIN City.',
};

export default function PartnersPage() {
  return (
    <SiteFrame>
      <PageIntro
        eyebrow="Partnerships"
        title="Institutional Partners"
        description="The institutions co-developing KWIN City."
        sourceIds={[]}
      />
      {/* Add your feature components here */}
    </SiteFrame>
  );
}
```

### Step 3: Add navigation

Add the new route to `Header.tsx` in the navigation items array.  
If it's a sub-route (like `/for/*`), add it as a dropdown item.

### Step 4: Add a card to HomeRouteGrid

If this is a primary section, add a card to `HomeRouteGrid.tsx`.

---

## 6. Adding a New Component

### Step 1: Decide: server or client?

- **Server Component** (default): No interactivity needed, no browser APIs, no `useState`/`useEffect`.
- **Client Component**: Needs animations, event handlers, live data fetch, or browser APIs.

### Step 2: Create the file

```bash
touch app/components/MyNewComponent.tsx
```

### Step 3: Write the component

**Server Component example:**
```tsx
// app/components/MyNewComponent.tsx
import { KWIN_PILLARS } from '@/data/constants';

export default function MyNewComponent() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* content */}
      </div>
    </section>
  );
}
```

**Client Component example:**
```tsx
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

export default function MyInteractiveComponent() {
  const [active, setActive] = useState(0);
  // ...
}
```

### Step 4: If the component renders claims, add source badges

```tsx
import InlineSourceBadges from '@/components/InlineSourceBadges';

<p>
  KWIN will cover 465+ acres.
  <InlineSourceBadges sourceIds={['brief']} />
</p>
```

### Step 5: Export and import

No barrel exports (`index.ts`) are used. Import components by their full path:

```ts
import MyNewComponent from '@/components/MyNewComponent';
```

---

## 7. Adding a New Data Entry

All data changes happen in `app/data/constants.ts`. See [DATA_MODEL.md](DATA_MODEL.md) for the full reference.

### Add a new timeline milestone

```ts
// In KWIN_TIMELINE_PHASES, find the relevant phase and add to milestones:
milestones: [
  'Existing milestone 1',
  'Existing milestone 2',
  'New milestone you want to add',  // ← add here
],
```

### Add a new sector

```ts
// At the end of KWIN_SECTORS array:
{
  id: 'edtech',
  name: 'EdTech & Lifelong Learning',
  description: 'Digital education platforms and professional upskilling centres.',
  industryFocus: ['Online Learning', 'Skill Development', 'Corporate Training'],
  expectedJobs: 8000,
  expectedInvestment: '₹2,500 Cr',
},
```

Then add a `ClaimMapping` for the jobs/investment figure:

```ts
// In KWIN_CLAIM_MAPPINGS:
{
  id: 'edtechJobs',
  section: 'Sectors',
  claim: 'EdTech sector expected to create 8,000 jobs and ₹2,500 Cr investment',
  sourceIds: ['brief'],
  status: 'pending-verification',
},
```

---

## 8. Working with Sources and Claims

See [EVIDENCE_SYSTEM.md](EVIDENCE_SYSTEM.md) for the full evidence system documentation.

### Quick reference: add a source badge to existing content

1. Find the component rendering the claim.
2. Import `InlineSourceBadges`.
3. Add `<InlineSourceBadges sourceIds={['relevant-source-id']} />` right after the claim text.
4. If there's no existing `ClaimMapping` for this claim, add one to `KWIN_CLAIM_MAPPINGS`.

### Quick reference: upgrade a source from pending to verified

1. In `KWIN_SOURCE_REGISTRY`, change `status: 'pending-verification'` to `status: 'verified'`.
2. In `KWIN_CLAIM_MAPPINGS`, update all mappings that reference this source to `status: 'verified'`.
3. Run `npm run type-check` to confirm no type errors.

---

## 9. Testing

### Run all tests

```bash
npm test
```

### Test file conventions

Test files live alongside the source files they test or in a `__tests__` directory:

```
app/components/Pillars.tsx
app/components/__tests__/Pillars.test.tsx
```

### Writing a component test

```tsx
// app/components/__tests__/MyComponent.test.tsx
import React from 'react';   // Required — see memory note on JSX preserve
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import MyComponent from '../MyComponent';

describe('MyComponent', () => {
  it('renders the heading', () => {
    render(<MyComponent />);
    expect(screen.getByRole('heading', { name: /expected text/i })).toBeInTheDocument();
  });
});
```

> **Important:** Always include `import React from 'react'` in test files. With `jsxImportSource` configured for JSX preserve, Vitest requires the explicit React import to avoid `ReferenceError: React is not defined`.

### Type checking

```bash
npm run type-check
```

TypeScript errors must be zero before merging. The `tsconfig.json` is strict.

---

## 10. Code Style and Formatting

### Prettier

The project uses Prettier for consistent formatting. Run before committing:

```bash
npm run format
```

To check without writing (useful in CI):

```bash
npm run format:check
```

### ESLint

```bash
npm run lint
```

The ESLint config extends `eslint-config-next`. Key rules enforced:
- No unused variables
- No `<img>` tags (use `next/image`)
- React hooks rules

### TypeScript strictness

- `strict: true` is enabled in `tsconfig.json`
- Avoid `any` — use `unknown` and narrow types instead
- All component props should have explicit types or interfaces

### Import ordering (convention)

```ts
// 1. External packages
import { motion } from 'framer-motion';
import { useState } from 'react';

// 2. Internal components
import SiteFrame from '@/components/SiteFrame';
import InlineSourceBadges from '@/components/InlineSourceBadges';

// 3. Data and types
import { KWIN_PILLARS, PILLARS_SOURCE_IDS } from '@/data/constants';
import type { Pillar } from '@/types/kwin';
```

---

## 11. Troubleshooting Common Issues

## 12. Adding a New Locale

The i18n layer is structured so a new locale is a configuration change, not a cross-repo refactor.

### Core rules

- `app/lib/i18n/messages.ts` is the single source of truth for locale registration.
- `LOCALE_DEFINITIONS` controls locale code, language labels, and the HTML `lang` attribute.
- English (`en`) is the canonical base dictionary.
- Other locales are partial override objects deep-merged onto the English dictionary.
- `pickByLocale()` requires only the English value and accepts optional overrides for other locales, so existing page-level maps remain valid when a new locale is introduced.

### Add a locale

1. Add one record to `LOCALE_DEFINITIONS` in `app/lib/i18n/messages.ts`.

```ts
{ code: 'ta', label: 'Tamil', nativeLabel: 'தமிழ்', htmlLang: 'ta-IN' }
```

2. Add a partial override object to `localeMessageOverrides` in the same file.

```ts
ta: {
  common: {
    language: 'மொழி',
  },
  hero: {
    title1: 'அறிவு.',
  },
}
```

3. Build and verify.

```bash
npm run build
```

### Fallback behavior

- If a key is missing in the new locale dictionary, it falls back to English automatically.
- If a page still uses `pickByLocale(locale, { en: '...', kn: '...', hi: '...' })`, that page will continue working after the new locale is added and will fall back to English until that page receives a dedicated translation.

### Preferred pattern for new shared UI

For reusable UI, prefer shared dictionary keys with `t('section.key')` instead of `locale === 'kn'` / `locale === 'hi'` branches. That keeps localization data-driven and avoids component logic changes when more locales are added.

### "Hydration mismatch" error in browser console

**Cause:** A Server Component renders different HTML from what the Client Component hydrates.  
**Fix:** Don't use browser-only APIs (e.g., `window`, `document`) outside `useEffect`. Wrap them:

```tsx
useEffect(() => {
  // Safe to use browser APIs here
}, []);
```

### Build fails after switching between `npm run dev` and `npm run build`

**Cause:** `.next/` and `.next-dev/` artifacts can conflict.  
**Fix:**

```bash
npm run clean:next
npm run build
```

### OpenCity API returns 404 in local development

**Cause:** The dataset slug may have changed on OpenCity, or the CKAN datastore index is empty.  
**Fix:** Visit [data.opencity.in](https://data.opencity.in), find the dataset, and update the slug in `KWIN_EVIDENCE_SOURCES`. Test with:

```bash
curl 'http://localhost:3000/api/opencity?dataset=your-slug&limit=3'
```

### TypeScript error: "Property X does not exist on type Y"

Most common when adding a new field to `constants.ts` without updating the interface in `kwin.ts`.  
**Fix:** Add the new field to the relevant interface in `app/types/kwin.ts`.

### Tailwind classes not being applied

**Cause:** A new file path is not covered by Tailwind's `content` config.  
**Fix:** Check `tailwind.config.js` `content` array and add the path pattern if needed:

```js
content: [
  './app/**/*.{ts,tsx}',
  './pages/**/*.{ts,tsx}',  // add if needed
],
```

### Chart not rendering in DataInsightsHub

**Cause:** The CKAN `records` array may be empty, or the field names don't match what Recharts expects.  
**Fix:** Inspect the raw API response:

```bash
curl 'http://localhost:3000/api/opencity?dataset=your-slug&limit=5' | jq '.result.fields'
```

Then update the DataInsightsHub field mapping to match the actual column names returned by CKAN.

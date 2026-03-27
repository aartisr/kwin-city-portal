# HOW TO: Use the New KWIN City System

## Quick Start (5 minutes)

### 1. Update Website Navigation (30 seconds)
Edit JUST ONE FILE:

```bash
# Open this file:
app/config/site.config.ts

# Find MAIN_NAVIGATION array and add/remove items:
export const MAIN_NAVIGATION = [
  { label: 'About', href: '/about', icon: 'ℹ️' },
  { label: 'NEW PAGE', href: '/new-page', icon: '🆕' },  // ← Add this
];

# Save! Navigation updates everywhere automatically.
```

### 2. Update Page Content (1 minute)
Edit a JSON file instead of code:

```bash
# Find the page you want to edit:
app/content/pages/about.json

# Open it and modify:
{
  "title": "About KWIN City",
  "blocks": [
    {
      "id": "hero",
      "type": "hero",
      "title": "NEW TITLE HERE",  # ← Change this
      "content": "NEW CONTENT HERE"  # ← And this
    }
  ]
}

# Save! Page updates automatically.
```

### 3. Add New Grid Items (2 minutes)
Add items to any grid section:

```json
{
  "type": "grid",
  "items": [
    {
      "id": "item-1",
      "title": "Semiconductors",
      "icon": "🔌",
      "description": "Advanced chip manufacturing"
    },
    {
      "id": "item-2",
      "title": "NEW ITEM",          # ← Add this block
      "icon": "💼",
      "description": "Your description here"
    }
  ]
}
```

---

## Common Tasks

### Task 1: Change Hero Image & Text

**File:** `app/content/pages/about.json`

```json
{
  "id": "hero",
  "type": "hero",
  "title": "YOUR NEW TITLE",
  "subtitle": "Your new subtitle",
  "image": {
    "src": "/images/new-image.jpg",
    "alt": "Description of image"
  }
}
```

### Task 2: Add New Navigation Item

**File:** `app/config/site.config.ts`

```typescript
export const MAIN_NAVIGATION = [
  { label: 'About', href: '/about', icon: 'ℹ️' },
  { label: 'Research', href: '/research', icon: '🔬' },  // ← Add this
];
```

Then create content file:
**File:** `app/content/pages/research.json`

```json
{
  "id": "research-page",
  "title": "Research",
  "slug": "research",
  "blocks": [
    {
      "id": "hero-research",
      "type": "hero",
      "title": "Research at KWIN",
      "content": "..."
    }
  ]
}
```

### Task 3: Add New Sector/Industry

**File:** `app/content/pages/sectors.json`

Find the items array and add:
```json
{
  "id": "new-sector",
  "title": "Biotechnology",
  "description": "Advanced biotech research...",
  "icon": "🧬",
  "tags": ["Research", "Life Sciences"]
}
```

### Task 4: Update Sustainability Metrics

**File:** `app/content/pages/sustainability.json`

Modify items:
```json
{
  "type": "grid",
  "items": [
    {
      "title": "Green Cover",
      "description": "40% of total area",
      "metadata": { "status": "On Track" }
    }
  ]
}
```

### Task 5: Add Image Gallery (Grid of Images)

**File:** Any page content file

```json
{
  "type": "grid",
  "title": "Gallery",
  "items": [
    {
      "id": "image-1",
      "title": "Photo Name",
      "image": "/images/photo1.jpg",
      "description": "Photo description"
    },
    {
      "id": "image-2",
      "title": "Photo Name 2",
      "image": "/images/photo2.jpg"
    }
  ]
}
```

### Task 6: Add CTA Button to Text Block

```json
{
  "type": "text",
  "title": "Section Title",
  "content": "Your content here...",
  "cta": {
    "label": "Learn More",
    "href": "/about",
    "variant": "primary"
  }
}
```

### Task 7: Update Persona (Audience) View

**File:** `app/config/site.config.ts`

```typescript
export const PERSONAS = [
  {
    label: 'Investor',
    href: '/for/investor',
    icon: '📈',
    desc: 'Investment opportunities'  // ← Change this
  },
  // Personas shown in header "By Persona" dropdown
];
```

### Task 8: Create Multi-Column Layout

```json
{
  "type": "grid",
  "layout": "three-col",  // Options: "single", "two-col", "three-col"
  "items": [...]
}
```

### Task 9: Add FAQ / Step-by-Step List

```json
{
  "type": "list",
  "title": "How to Invest",
  "items": [
    {
      "id": "step-1",
      "title": "Step 1: Register",
      "description": "Create your account...",
      "icon": "1️⃣"
    },
    {
      "id": "step-2",
      "title": "Step 2: Browse",
      "description": "Browse available opportunities...",
      "icon": "2️⃣"
    }
  ]
}
```

### Task 10: Update Theme Colors

**File:** `app/config/site.config.ts`

```typescript
export const THEME = {
  colors: {
    primary: '#040714',      // Main color
    accent: '#E8A020',       // Gold/highlight color
    accentLight: '#F5A623',
    // Update these colors here
  },
};
```

### Task 11: Add a New Language (Configuration Only)

**Location:** `app/lib/i18n/messages.ts`

This platform supports multi-language localization through pure configuration. **No component changes needed** when adding a new language.

#### Step 1: Add Language to LOCALE_DEFINITIONS

```typescript
// app/lib/i18n/messages.ts

export const LOCALE_DEFINITIONS = [
  { code: 'en', label: 'English', nativeLabel: 'English', htmlLang: 'en-IN' },
  { code: 'kn', label: 'Kannada', nativeLabel: 'ಕನ್ನಡ', htmlLang: 'kn-IN' },
  { code: 'hi', label: 'Hindi', nativeLabel: 'हिन्दी', htmlLang: 'hi-IN' },
  { code: 'ta', label: 'Tamil', nativeLabel: 'தமிழ்', htmlLang: 'ta-IN' },
  // Add new language here:
  { code: 'es', label: 'Spanish', nativeLabel: 'Español', htmlLang: 'es-ES' },  // ← New
];
```

#### Step 2: Add Translations to localeMessageOverrides

```typescript
// app/lib/i18n/messages.ts

export const localeMessageOverrides: Record<Locale, Record<string, string>> = {
  en: { /* existing English translations */ },
  kn: { /* existing Kannada translations */ },
  hi: { /* existing Hindi translations */ },
  ta: { /* existing Tamil translations */ },
  // Add new language translations:
  es: {
    'North Bengaluru': 'Norte de Bengaluru',
    'Investment Hub': 'Centro de Inversión',
    'Sectors': 'Sectores',
    'About': 'Acerca de',
    'Evidence': 'Evidencia',
    // ... add all UI label translations here
  },
};
```

#### Step 3: Done! ✅
- Language switcher automatically includes new language
- All date/time formatting handled automatically via `getIntlLocale()` helper
- No component files need modification
- All UI text uses centralized translation lookup

**How it works internally:**
- `LOCALE_DEFINITIONS` is the single source of truth for all language metadata
- `localeMessageOverrides` provides translations for UI labels and messages
- Components use `useI18n()` hook which automatically handles new languages
- The `getIntlLocale()` helper maps language codes to Intl.DateTimeFormat locales

**Example: Adding Portuguese (Brazilian)**

```typescript
// Step 1: Add to LOCALE_DEFINITIONS
export const LOCALE_DEFINITIONS = [
  // ... existing languages ...
  { code: 'pt', label: 'Portuguese', nativeLabel: 'Português', htmlLang: 'pt-BR' },
];

// Step 2: Add to localeMessageOverrides
export const localeMessageOverrides = {
  // ... existing translations ...
  pt: {
    'North Bengaluru': 'Norte de Bengaluru',
    'Investment Hub': 'Centro de Investimento',
    'Sectors': 'Setores',
    'About': 'Sobre',
    'Evidence': 'Evidência',
    // ... all translations ...
  },
};

// That's it! No component changes needed.
```

---

## Advanced: Create a New Page Type

### Step 1: Create Component
**File:** `app/components/TimelineView.tsx`

```typescript
'use client';

import { ContentBlock } from '@/lib/content-manager';

export default function TimelineView({ data }: { data: ContentBlock }) {
  return (
    <section className="container mx-auto py-16">
      <h2 className="text-4xl font-bold mb-8">{data.title}</h2>
      {/* Your timeline visualization */}
    </section>
  );
}
```

### Step 2: Register Component
**File:** `app/lib/generic-page-builder.tsx`

```typescript
const componentRegistry = {
  hero: dynamic(() => import('@/components/Hero')),
  timeline: dynamic(() => import('@/components/TimelineView')),  // ← Add this
};
```

### Step 3: Use in Content
**File:** Any page content file

```json
{
  "type": "timeline",
  "title": "Development Timeline",
  "metadata": { "animated": true }
}
```

---

## Content File Locations

```
app/content/
├── pages/
│   ├── about.json              # /about page
│   ├── region.json             # /why-north-bengaluru page
│   ├── timeline.json           # /timeline page
│   ├── sectors.json            # /sectors page
│   ├── sustainability.json     # /sustainability page
│   ├── data-insights.json      # /data-insights page
│   ├── evidence.json           # /evidence page
│   └── sources.json            # /sources page
└── collections/                # (Future: Lists of items)
    ├── timeline-phases.json
    ├── sectors.json
    └── ...
```

---

## Block Types Reference

```typescript
type = "hero"          // Large banner (title, subtitle, image)
type = "text"          // Text content block with optional CTA
type = "grid"          // Responsive grid of items (auto-columns)
type = "list"          // Vertical list (FAQs, features, steps)
type = "card"          // Card layout (featured content)
type = "section"       // Section header/intro
type = "timeline"      // Timeline visualization
type = "sectors"       // Industry sectors grid
type = "pillars"       // Three pillars layout
type = "sustainability"// Sustainability metrics
type = "map"           // Interactive map
```

---

## Testing Your Changes

### 1. Local Development
```bash
cd /Users/rraviku2/kailasa/kwin-city-portal
yarn dev              # Starts dev server
# Visit http://localhost:3000
# Changes update automatically as you edit files
```

### 2. Build for Production
```bash
yarn build            # Compiles everything
yarn start            # Runs production build
```

### 3. Validate JSON
```bash
# Use a JSON validator to check your content files
# Many online validators at: jsonlint.com
```

---

## Performance Tips

1. **Keep images optimized** - Use WebP/AVIF format when possible
2. **Use responsive images** - Set `sizes` attribute for better performance
3. **Lazy load components** - Components load on-demand automatically
4. **Minimize custom CSS** - Use Tailwind classes from the config
5. **Avoid heavy animations** - Use Framer Motion sparingly

---

## Troubleshooting

### "Block type 'xyz' not registered"
**Solution:** Add component to `componentRegistry` in `generic-page-builder.tsx`

### "Content not found: app/content/pages/..."
**Solution:** Make sure JSON file exists in correct location with correct name

### Navigation not updating
**Solution:** Make sure you edited `MAIN_NAVIGATION` in `site.config.ts`, not Header.tsx

### Page not building
**Solution:** Run `yarn build` to see error details, check JSON syntax

### Images not loading
**Solution:** Verify path starts with `/` e.g., `/images/photo.jpg` from public folder

---

## Best Practices

✅ **DO:**
- Keep JSON well-formatted (use VS Code formatter)
- Use descriptive IDs for blocks (e.g., `hero-about`, `grid-sectors`)
- Place images in `/public/images/` folder
- Test locally before deploying

❌ **DON'T:**
- Edit component.tsx files for content changes
- Hardcode text in components
- Mix content and logic in JSON
- Forget to restart dev server after adding files

---

## Quick Reference

| Task | File | Action |
|------|------|--------|
| Add nav item | `site.config.ts` | Add to `MAIN_NAVIGATION` |
| Update page text | `pages/*.json` | Edit `content` field |
| Add grid item | `pages/*.json` | Add to `items` array |
| Change colors | `site.config.ts` | Edit `THEME.colors` |
| Add person | `site.config.ts` | Add to `PERSONAS` |
| Create new sector | `pages/sectors.json` | Add item with icon |
| Add CTA button | `pages/*.json` | Add `cta` field to block |

---

## Support Contacts

- **Performance questions?** Check `ARCHITECTURE.md`
- **Content structure?** Check `ContentBlock` interface
- **Config issues?** Review `site.config.ts` comments
- **Component not working?** Check `componentRegistry` registration

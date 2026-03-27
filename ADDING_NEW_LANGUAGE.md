# Complete Guide: Adding a New Language (Telugu Example)

**Version:** 1.0  
**Last Updated:** March 27, 2026  
**Scope:** Adding any language to KWIN City Portal  

---

## Table of Contents

1. [Overview: How the i18n System Works](#overview)
2. [Step-by-Step Process for Telugu](#step-by-step)
3. [Complete Telugu Translation](#complete-telugu-translation)
4. [Verification & Testing](#verification)
5. [Common Issues & Troubleshooting](#troubleshooting)
6. [Best Practices](#best-practices)

---

## Overview: How the i18n System Works

The KWIN City Portal uses a **centralized, configuration-based localization system** with zero component changes needed when adding languages.

### Architecture

```
app/lib/i18n/
├── messages.ts          ← THE ONLY FILE YOU EDIT
└── i18n-context.tsx     ← Handles language switching
```

### Key Concepts

**1. LOCALE_DEFINITIONS** (Single Source of Truth)
```typescript
export const LOCALE_DEFINITIONS = [
  { code: 'en', label: 'English', nativeLabel: 'English', htmlLang: 'en-IN' },
  { code: 'kn', label: 'Kannada', nativeLabel: 'ಕನ್ನಡ', htmlLang: 'kn-IN' },
  { code: 'hi', label: 'Hindi', nativeLabel: 'हिन्दी', htmlLang: 'hi-IN' },
  { code: 'ta', label: 'Tamil', nativeLabel: 'தமிழ்', htmlLang: 'ta-IN' },
  // New language goes here ↓
];
```

**Fields Explained:**
- `code`: 2-letter language code (ISO 639-1) used in URLs and internally
- `label`: English-friendly display name (shown in switcher)
- `nativeLabel`: Language name IN that language (Unicode script)
- `htmlLang`: BCP 47 language-region tag for HTML `lang` attribute

**2. localeMessageOverrides** (Translation Dictionary)
```typescript
export const localeMessageOverrides = {
  kn: { /* Kannada translations */ },
  hi: { /* Hindi translations */ },
  ta: { /* Tamil translations */ },
  // New language translations go here ↓
};
```

**3. How Components Use It**
Components automatically detect language via the `useI18n()` hook:
```typescript
const { locale, t } = useI18n();
// locale === 'te' (for Telugu)
// t('common.language') === 'భాష' (Telugu for "Language")
```

---

## Step-by-Step Process for Telugu

### Step 1: Add Telugu to LOCALE_DEFINITIONS

**File:** `app/lib/i18n/messages.ts` (Lines 1-6)

**Current state:**
```typescript
export const LOCALE_DEFINITIONS = [
  { code: 'en', label: 'English', nativeLabel: 'English', htmlLang: 'en-IN' },
  { code: 'kn', label: 'Kannada', nativeLabel: 'ಕನ್ನಡ', htmlLang: 'kn-IN' },
  { code: 'hi', label: 'Hindi', nativeLabel: 'हिन्दी', htmlLang: 'hi-IN' },
  { code: 'ta', label: 'Tamil', nativeLabel: 'தமிழ்', htmlLang: 'ta-IN' },
] as const;
```

**Add Telugu:**
```typescript
export const LOCALE_DEFINITIONS = [
  { code: 'en', label: 'English', nativeLabel: 'English', htmlLang: 'en-IN' },
  { code: 'kn', label: 'Kannada', nativeLabel: 'ಕನ್ನಡ', htmlLang: 'kn-IN' },
  { code: 'hi', label: 'Hindi', nativeLabel: 'हिन्दी', htmlLang: 'hi-IN' },
  { code: 'ta', label: 'Tamil', nativeLabel: 'தమిழ்', htmlLang: 'ta-IN' },
  { code: 'te', label: 'Telugu', nativeLabel: 'తెలుగు', htmlLang: 'te-IN' }, // ← ADD THIS
] as const;
```

**What this does:**
- `te` = standard Telugu language code
- `తెలుగు` = "Telugu" written in Telugu script
- `te-IN` = Telugu language in India (IANA standard)

---

### Step 2: Add Telugu to localeMessageOverrides

**File:** `app/lib/i18n/messages.ts` (after the Tamil translations, around line 350)

The localeMessageOverrides dictionary has this structure:

```typescript
export const localeMessageOverrides: Partial<Record<Locale, DeepPartial<MessageDictionary>>> = {
  kn: { /* Kannada */ },
  hi: { /* Hindi */ },
  ta: { /* Tamil */ },
  // ADD TELUGU HERE:
  te: {
    common: { /* UI common terms */ },
    header: { /* Navigation & header */ },
    hero: { /* Homepage hero section */ },
    footer: { /* Footer section */ },
  },
};
```

---

### Step 3: Translate All Strings (Telugu)

You need to translate **all strings** in the `defaultMessages` object. Here's the **complete Telugu translation** for copy-pasting:

```typescript
te: {
  common: {
    language: 'భాష',
    search: 'శోధన',
    account: 'ఖాతా',
    signedIn: 'సైన్ ఇన్ చేసినవారు',
    trust: 'విశ్వాసం',
    hideTrustBar: 'ట్రస్ట్ ప్రోటోకాల్ బార్‌ను దాచండి',
    showTrustBar: 'ట్రస్ట్ ప్రోటోకాల్ బార్‌ను చూపండి',
    toggleMenu: 'మెను టోగుల్ చేయండి',
    exploreKwin: 'KWINని అన్వేషించండి',
    discoverMore: 'మరిన్ని తెలుసుకోండి',
    reviewSources: 'అన్ని సోర్సులను చూడండి',
    terms: 'నిబంధనలు',
    sources: 'సోర్సులు',
    contact: 'సంప్రదింపులు',
  },
  header: {
    groups: {
      Discover: 'కనుగొను',
      Ecosystem: 'ఈకోసిస్టమ్',
      Research: 'పరిశోధన',
      Intelligence: 'గుప్తాంశం',
      Audiences: 'ప్రేక్షకులు',
    },
    items: {
      '/about': { label: 'KWINల గురించి', desc: 'లక్ష్యం, స్తంభాలు మరియు చట్రం' },
      '/why-north-bengaluru': { label: 'ఉత్తర బెంగళూరు ఎందుకు', desc: 'ప్రాంతీయ సాంకేతిక కేస్' },
      '/timeline': { label: 'కాలరేఖ', desc: 'దశ-వారీ అభివృద్ధి రోడ్‌మ్యాప్' },
      '/updates': { label: 'నవీకరణలు', desc: 'మైలుకట్లు మరియు ప్రకటనలు' },
      '/faq': { label: 'FAQ', desc: 'ప్రతిটి ప్రేక్షకుకు ప్రశ్నలకు సమాధానాలు' },
      '/sectors': { label: 'సెక్టర్‌లు', desc: 'పరిశ్రమ లోతు మరియు అవకాశాలు' },
      '/sustainability': { label: 'సంపోషణీయత', desc: 'వాతావరణ మరియు నిరోధక దృష్టికోణం' },
      '/data-insights': { label: 'డేటా ఇన్‌సైట్‌లు', desc: 'లైవ్ ఎవిడెన్స్ డ్యాష్‌బోర్డ్‌లు' },
      '/analytics': { label: 'విశ్లేషణ డ్యాష్‌బోర్డ్', desc: 'ఆన్-ఇన్ డిভైస్ పేజ్ ట్రాకింగ్ ఇన్‌సైట్‌లు' },
      '/evidence': { label: 'ఎవిడెన్స్ వాల్ట్', desc: 'ప్రతిটి డేటాసెట్ నిరూపించగలిగే విషయం' },
      '/sources': { label: 'సోర్సులు మరియు క్లెయిమ్‌లు', desc: 'పూర్తి క్లెయిమ్-టు-సోర్స్ లెడ్జర్' },
      '/downloads': { label: 'డాక్యుమెంట్ డౌన్‌లోడ్‌లు', desc: 'నివేదనలు, ఎంపికలు మరియు ఓపెన్ డేటాసెట్‌లు' },
      '/news-intelligence': { label: 'సమాచార గుప్తాంశం', desc: 'ఆట్రిబ్యూషన్-ఫర్స్ట్ మీడియా పర్యవేక్షణం' },
      '/news-reader': { label: 'లైవ్ న్యూజ్ రీడర్', desc: 'డిమాండ్‌పై OPML సారాంశ రీడర్' },
      '/community': { label: 'సమాజం చర్చ', desc: 'ఓపెన్ స్టేక్‌హోల్డర్ థ్రెడ్‌లు మరియు సమాధానాలు' },
      '/trust': { label: 'ట్రస్ట్ సెంటర్', desc: 'ప్రామాణికత మరియు లక్షణం ప్రోటోకాల్' },
      '/download': { label: 'అ్యాప్ పొందండి', desc: 'Android మరియు iOS లో ఉచితంగా ఇన్‌స్టాల్ చేయండి' },
      '/account': { label: 'ఖాతా మరియు ప్రాధాన్యతలు', desc: 'సైన్ ఇన్ చేయండి మరియు ఆసక్తులను సేవ్ చేయండి' },
      '/for/investor': { label: 'పెట్టుబడిదారు', desc: 'అవకాశం మరియు ప్రమాద బ్రీఫింగ్' },
      '/for/resident': { label: 'నివాసి', desc: 'సజీవ్యత మరియు సమాజం' },
      '/for/researcher': { label: 'పరిశోధకుడు', desc: 'డేటా మరియు పద్ధతి శాస్త్రం' },
      '/for/journalist': { label: 'పత్రికారుడు', desc: 'ధృవీకృత కథ కోణాలు' },
      '/for/curious-citizens': { label: 'ఆసక్త సివిలియన్', desc: 'సాధారణ భాష వివరణ' },
      '/for': { label: 'అన్ని ప్రేక్షక హబ్‌లు', desc: 'అన్ని పర్సోనా మార్గాలను చూడండి' },
    },
  },
  hero: {
    title1: 'జ్ఞానం.',
    title2: 'సుఖం.',
    title3: 'ఆవిష్కరణ.',
    badge: 'ఉత్తర బెంగళూరు · ప్రతిపాదిత 2024',
    taglineLead: 'భారతదేశం యొక్క అత్యంత ప్రభావవంతమైన నగరం ఉత్తరం వైపు విస్తరిస్తోంది.',
    taglineRest: 'KWIN City ఆ సరిహద్దు కోసం ప్రతిపాదిత టౌన్‌షిప్ — మరియు ఈ సైట్ దాని సంపూర్ణ గైడ్.',
    ctaPrimary: 'విజన్‌ను అన్వేషించండి',
    ctaSecondary: 'పరిశోధన చదవండి',
    sourceNotePrefix: 'పెట్టుబడి మరియు ఉప职业 సంఖ్యలు ప్రాజెక్ట్ సంక్షిప్తీకరణ నుండి - KIADB ప్రాథమిక ధృవీకరణ పెండింగ్.',
  },
  footer: {
    ctaEyebrow: 'నిర్ణయాత్మక KWIN సంపద',
    ctaTitle: 'అన్ని KWIN. ఒక సంग్రహం.',
    ctaBody: 'పెట్టుబడిదారు, నివాసి, పరిశోధకుడు, పత్రికారుడు, లేదా ఆసక్త సిటిజన్ — ఎవరైనా KWIN City ను సంపూర్ణ ఆత్మవిశ్వాసం వలన అర్థం చేసుకోవడానికి ఈ పోర్టల్ ఉంది.',
    exploreKwin: 'KWINని అన్వేషించండి',
    viewSources: 'సోర్సులను చూడండి',
    openData: 'ఓపెన్ డేటా · ప్రతిটి క్లెయిమ్ సోర్స్‌చేయబడినది',
    lastUpdated: 'చివరగా నవీకరించబడినది',
  },
},
```

---

## Verification & Testing

### Test Checklist

After adding Telugu, verify these items:

#### 1. **Build Compilation**
```bash
cd /Users/rraviku2/kailasa/kwin-city-portal
npm run build
# ✓ Should compile with zero errors
```

#### 2. **Language Appears in Switcher**
- Run: `npm run dev`
- Open http://localhost:3000
- Click the language switcher (top-right header)
- Verify "Telugu" option appears with "తెలుగు" label

#### 3. **Language Selection Works**
- Select "Telugu" from switcher
- URL should change to `?lang=te` or localized path
- Page text should update to Telugu

#### 4. **Date/Time Formatting**
- Check if dates display in Telugu calendar format (Intl API handles this automatically)
- Example: "27 మార్చి 2026" should appear for dates

#### 5. **Verify All Pages Render**
Navigate to these key pages and verify all text is in Telugu:
- `/` (homepage) - Hero section
- `/about` - About page
- `/sectors` - Sectors page
- `/evidence` - Evidence vault
- Header navigation - All menu items
- Footer - All links

#### 6. **Mobile Responsiveness**
- Test on mobile (375px width)
- Language switcher should still work
- Text shouldn't overflow containers

#### 7. **Language Persistence**
- Select Telugu
- Refresh page
- Should remain in Telugu (if using localStorage)

---

## Complete Implementation: Step-by-Step

### Step A: Edit messages.ts - LOCALE_DEFINITIONS

**File:** `app/lib/i18n/messages.ts`

Find lines 1-6 and update:

```typescript
// BEFORE
export const LOCALE_DEFINITIONS = [
  { code: 'en', label: 'English', nativeLabel: 'English', htmlLang: 'en-IN' },
  { code: 'kn', label: 'Kannada', nativeLabel: 'ಕನ್ನಡ', htmlLang: 'kn-IN' },
  { code: 'hi', label: 'Hindi', nativeLabel: 'हिन्दी', htmlLang: 'hi-IN' },
  { code: 'ta', label: 'Tamil', nativeLabel: 'தமிழ்', htmlLang: 'ta-IN' },
] as const;

// AFTER - ADD TELUGU
export const LOCALE_DEFINITIONS = [
  { code: 'en', label: 'English', nativeLabel: 'English', htmlLang: 'en-IN' },
  { code: 'kn', label: 'Kannada', nativeLabel: 'ಕನ್ನಡ', htmlLang: 'kn-IN' },
  { code: 'hi', label: 'Hindi', nativeLabel: 'हिन्दी', htmlLang: 'hi-IN' },
  { code: 'ta', label: 'Tamil', nativeLabel: 'தமிழ்', htmlLang: 'ta-IN' },
  { code: 'te', label: 'Telugu', nativeLabel: 'తెలుగు', htmlLang: 'te-IN' },
] as const;
```

### Step B: Edit messages.ts - Add Telugu Translations

**File:** `app/lib/i18n/messages.ts` (at end of localeMessageOverrides, after Tamil block)

Add the complete Telugu translation block from the **"Complete Telugu Translation"** section above.

### Step C: Compile & Test

```bash
npm run build
npm run dev
# Visit http://localhost:3000 and test language switcher
```

---

## Understanding the Type System

The i18n system is **fully type-safe**:

```typescript
export type Locale = (typeof LOCALE_DEFINITIONS)[number]['code'];
// Locale = 'en' | 'kn' | 'hi' | 'ta' | 'te' (after adding Telugu)

type MessageDictionary = typeof defaultMessages;
// Automatically includes all message keys

export const localeMessageOverrides: Partial<Record<Locale, DeepPartial<MessageDictionary>>> = {
  // TypeScript validates:
  // ✓ Only valid locale codes
  // ✓ Only valid message keys
  // ✓ Partial translations allowed (falls back to English)
};
```

**This means:**
- TypeScript prevents typos in language codes
- TypeScript prevents typos in translation keys
- Missing translations automatically fall back to English
- 100% type-safe language switching

---

## How It Works Internally

### 1. **Language Detection in Components**

Components use `useI18n()` hook:
```typescript
'use client';
import { useI18n } from '@/app/lib/i18n/i18n-context';

export default function HomePage() {
  const { locale, t } = useI18n();
  
  return (
    <h1>{t('hero.title1')}</h1>  // "జ్ఞానం." (Telugu)
    <p>{locale}</p>               // "te"
  );
}
```

### 2. **Translation Lookup Flow**

When component calls `t('hero.title1')`:
1. Check `localeMessageOverrides[locale]['hero']['title1']`
2. If found → return Telugu translation
3. If missing → return `defaultMessages['hero']['title1']` (English)

### 3. **Language Switching Mechanism**

```typescript
// User clicks Telugu in language switcher
const setLocale = (newLocale: Locale) => {
  // 1. Update context
  context.locale = 'te';
  
  // 2. Update HTML
  document.documentElement.lang = 'te-IN';
  
  // 3. Store preference (localStorage)
  localStorage.setItem('preferred-locale', 'te');
  
  // 4. Components re-render with new locale
};
```

### 4. **HTML Lang Attribute**

The system automatically sets `<html lang="te-IN">` which:
- Signals to screen readers the language
- Enables proper spell-checking
- Helps search engines understand language
- Enables browser hyphenation/line-breaking

---

## Troubleshooting Common Issues

### Issue 1: Language Not Appearing in Switcher

**Symptom:** Telugu doesn't show in language dropdown

**Cause:** Not added to `LOCALE_DEFINITIONS`

**Fix:**
```typescript
// ✗ Wrong - only in localeMessageOverrides
export const localeMessageOverrides = {
  te: { /* ... */ }  // Won't work!
};

// ✓ Correct - must be in LOCALE_DEFINITIONS too
export const LOCALE_DEFINITIONS = [
  { code: 'te', label: 'Telugu', nativeLabel: 'తెలుగు', htmlLang: 'te-IN' },
  // AND in localeMessageOverrides
];
```

### Issue 2: Build Error: "Type 'te' is not assignable"

**Symptom:** TypeScript error when adding Telugu

**Cause:** Locale type not updated (happens automatically if LOCALE_DEFINITIONS updated)

**Fix:**
```bash
# Clear build cache
rm -rf .next
npm run build  # Should work now
```

### Issue 3: Text Overflows in Telugu

**Symptom:** Telugu text breaks container layout

**Cause:** Telugu script is slightly wider than English

**Fix in component:**
```typescript
// Add extra padding for Telugu
<div className={locale === 'te' ? 'px-6' : 'px-4'}>
  {t('common.search')}
</div>
```

### Issue 4: Languages Missing Translations

**Symptom:** English shows instead of Telugu in some places

**Cause:** Translation key not added to `localeMessageOverrides`

**Fix:** Add missing key:
```typescript
te: {
  common: {
    language: 'భాష',
    // Add missing key:
    newKey: 'నెవ్ కీ',
  },
}
```

---

## Best Practices

### ✅ DO:

1. **Always add to LOCALE_DEFINITIONS first**
   - This is the single source of truth
   - Updates the language switcher automatically

2. **Test in all critical pages**
   - Homepage, key pages, footer
   - Verify no text overflow

3. **Use native script for nativeLabel**
   - `nativeLabel: 'తెలుగు'` (not "Telugu")
   - Users prefer seeing language name in script

4. **Use proper BCP 47 tags**
   - `te-IN` for Telugu in India
   - `te` for generic Telugu (if India not relevant)

5. **Keep translations consistent**
   - Use same term across all pages
   - e.g., "KWIN City" stays "KWIN City" in all languages

6. **Test date/time formatting**
   - The `getIntlLocale()` helper handles this
   - Verify dates appear correctly in locale

### ❌ DON'T:

1. **Don't edit component files to add language**
   - Only edit `messages.ts`
   - All components automatically support new language

2. **Don't use romanized script**
   - ✗ "Telugu" (romanized)
   - ✓ "తెలుగు" (native script)

3. **Don't hardcode translations in components**
   ```typescript
   // ✗ Wrong
   <h1>జ్ఞానం</h1>
   
   // ✓ Right
   <h1>{t('hero.title1')}</h1>
   ```

4. **Don't forget to translate menu items**
   - Each `/header/items/*` path needs translation
   - Users won't understand English navigation

5. **Don't leave incomplete translations**
   - If you add Telugu, translate ALL strings
   - Partial translations look unprofessional

---

## Language Code Reference

Common language codes used:

| Language | Code | Native | BCP 47 | Script |
|----------|------|--------|--------|--------|
| English | en | English | en-IN | Latin |
| Hindi | hi | हिन्दी | hi-IN | Devanagari |
| Kannada | kn | ಕನ್ನಡ | kn-IN | Kannada |
| Tamil | ta | தமிழ் | ta-IN | Tamil |
| Telugu | te | తెలుగు | te-IN | Telugu |
| Marathi | mr | मराठी | mr-IN | Devanagari |
| Gujarati | gu | ગુજરાતી | gu-IN | Gujarati |
| Bengali | bn | বাংলা | bn-IN | Bengali |
| Punjabi | pa | ਪੰਜਾਬੀ | pa-IN | Gurmukhi |
| Urdu | ur | اردو | ur-IN | Arabic |

---

## Commit Message Template

```bash
git add app/lib/i18n/messages.ts
git commit -m "i18n: add Telugu language support

- Add 'te' (Telugu) to LOCALE_DEFINITIONS
- Add native label: 'తెలుగు'
- Add BCP 47 tag: 'te-IN'
- Translate all UI strings to Telugu (common, header, hero, footer)
- Language switcher now includes Telugu option
- Verified build compilation and language switching

Related to: Language localization roadmap"
```

---

## Summary

**To add Telugu (or any language):**

| Step | File | Action | Time |
|------|------|--------|------|
| 1 | `messages.ts` (lines 1-6) | Add to `LOCALE_DEFINITIONS` | 1 min |
| 2 | `messages.ts` (end) | Add translation block to `localeMessageOverrides` | 15-30 min |
| 3 | Terminal | Run `npm run build && npm run dev` | 2 min |
| 4 | Browser | Test language switcher | 5 min |
| 5 | Git | Commit changes | 1 min |

**Total time: ~25-40 minutes per language**

---

## For Additional Support

- **Question?** Check the [HOW_TO.md](/Users/rraviku2/kailasa/kwin-city-portal/HOW_TO.md) Task #11
- **i18n Hook?** See `app/lib/i18n/i18n-context.tsx`
- **Need help?** Navigate to `app/lib/i18n/` and review the context implementation

---

**Last tested:** March 27, 2026  
**Tested with:** TypeScript 5.3, Next.js 15, React 19

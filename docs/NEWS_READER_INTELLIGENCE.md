# KWIN News Reader Intelligence Brief

## Purpose

The reader adds KWIN-specific context to RSS and discovery signals without presenting missing publisher content as if KWIN had received or verified it. It is an intelligence aid, not a replacement for the original publication.

## Truth contract

The implementation must fail closed:

- A direct institutional feed means primary evidence is present. It does not prove every interpretation of that evidence.
- Multiple publisher domains mean distinct publisher coverage. They are never described as independent unless ownership and sourcing independence have been separately established.
- A publisher-feed summary is publisher-supplied text, not a KWIN factual finding.
- A discovery-only item remains a discovery signal.
- When the feed contains only a headline, KWIN does not generate a substitute article or pretend to know missing details.
- Unknown publication dates, missing primary evidence and unavailable summaries remain visible.
- The original publisher link remains prominent.

## Implemented capabilities

- Deterministic KWIN intelligence brief generated from visible feed metadata
- Explicit evidence state: primary evidence, corroborated publisher coverage, publisher report or discovery-only
- Separate “what we know” and “what we do not know” ledgers
- Resident, investor, government and researcher impact lenses
- Oldest-to-newest coverage timeline
- Multi-publisher headline and provenance comparison
- Evidence-only question-and-answer prompts with no generative AI dependency
- Locally saved, bounded brief snapshots for offline/PWA use
- Followed monitoring topics
- JSON workspace export with saved briefs, followed topics and current clusters
- Accessible modal focus management, keyboard focus loop and Escape-to-close

## Deliberately not implemented

These need additional authority, infrastructure or evidence and must not be implied by the UI:

- Full article retrieval when a publisher does not include it in RSS
- Paywall bypass or unauthorized article caching
- AI reconstruction, translation, audio rendering or summarization of third-party articles
- Claims of publisher independence based only on different domains
- Server-synchronized user libraries or cross-device alerts
- Material-change alerts backed by durable server jobs
- Primary-document entity graphs beyond evidence already present in a story cluster
- Open-ended AI Q&A
- Publisher factuality, political-bias or ownership scores without a reviewed data license and methodology

## Architecture

- `intelligence-brief.ts` is the pure policy/domain layer. It has no UI, browser or network dependency.
- `IntelligenceBriefPanel.tsx` renders the brief and supports progressive interaction.
- `ReaderDrawer.tsx` owns the accessible modal and publisher handoff.
- `useReaderLibrary.ts` owns device-local preferences and compact saved snapshots.
- `SavedBriefsPanel.tsx` makes saved KWIN metadata available without copying publisher content.

New evidence providers should be adapters that emit the existing `ReaderItem` provenance contract. Provider-specific logic must not leak into the brief policy layer.

## Operational limits

Local brief snapshots are capped at 50 identifiers and intentionally omit full publisher content. Browser storage can be cleared by the user or operating system and is not a durable backup. “Available from this device” must not be described as cross-device synchronization.

Open-ended cited Q&A should only be added after there is:

1. an approved corpus and licensing policy;
2. sentence-level source attribution;
3. retrieval boundaries that exclude unavailable article text;
4. automated grounding and contradiction evaluations;
5. a visible refusal path for insufficient evidence;
6. immutable audit records for generated answers.

## Test expectations

Tests must prove that:

- multiple publishers never become primary confirmation;
- institutional evidence retains a qualification warning;
- headline-only discovery items expose their missing evidence;
- timelines are chronological;
- legacy browser storage migrates safely;
- saved snapshots exclude full article content;
- existing relevance, clustering and source-registry contracts continue to pass.

# RESEARCH.md — Creative Direction

## What this redesign starts from

The live site (firstexpertslogistics.com) already has the right bones: Home, Services,
Routes, About, Get a Quote, Contact. This redesign keeps that information architecture —
it's the real one the company uses — and rebuilds the visual and interaction layer on top
of it. Nothing here invents a new sitemap; see CHANGELOG.md for what's new vs carried over.

## Three directions considered

**A — Aviation Manifest** *(selected)*
Editorial, navy-and-paper, with a "departure board" as the signature motif: a monospace
route ticker, flight-log style route codes, thin-line technical iconography instead of
stock photography. Justified directly by the business — the company sits beside Murtala
Muhammed International Airport and leads with air freight — without tipping into an
airline pastiche.

**B — Port & Container**
Sea-freight-led, industrial-scale imagery (containers, cranes), cooler palette. Rejected
as primary direction because air freight is the company's stated visual priority, but its
influence remains in the Sea Freight section's darker, heavier treatment.

**C — Warm Local / Lagos Street-Level**
Leaned into Lagos street photography and warmer tones. Rejected as the lead direction —
risks reading as generic "African business" stock imagery, which the brief explicitly
warns against — but the "Nigerian identity with international standards" principle from
the brief still shapes the copy (Lagos named with confidence, not hidden).

## Why no stock photography

The brief flags stock-photo clichés — generic handshake shots, staged office photos,
"African businessman at a laptop" — as things to actively avoid, and asks for a clear
placeholder system if real company photography isn't available yet (§87). Rather than
source generic aircraft/port stock, this build uses:

- The **real** company logo and a **real** photo of the Managing Director (both supplied)
- An original, hand-drawn line-art icon system (plane / ship / truck / customs) reused at
  multiple scales, so the whole site shares one consistent visual language instead of a
  grab-bag of photos
- A data-driven visual: the route diagram and manifest ticker are built from the company's
  actual published routes, not decoration

This is a deliberate, documented tradeoff — see ASSET-SOURCES.md for exactly what real
photography would upgrade, and where.

## Design system rationale

- **Color** — sampled directly from the logo file: brand blue is `#014BAE`. Paired with a
  near-black ink navy and a warm "runway amber" used sparingly for status marks — a nod to
  runway/departure-board lighting rather than a generic neon accent.
- **Type** — Space Grotesk (display) for a technical, engineered headline feel; Inter
  (body) for readability; IBM Plex Mono for anything that reads like operational data
  (route codes, stats, eyebrows) — monospace is what departure boards and manifests
  actually use.
- **Motion** — hero and 404 use a large, low-opacity version of the same plane glyph used
  in the Air Freight tile, plus slow-drifting dashed flight-path lines. Everything respects
  `prefers-reduced-motion`.

## Benchmarks referenced (principles, not pixels)

Stripe (information hierarchy for a complex B2B service), Apple (restraint + scroll
pacing), Linear (hover/interaction precision), airline cargo sites like Cathay Cargo/Qatar
Cargo (how aviation brands present routes and schedules without becoming airline
pastiches). No layouts, copy, or assets were copied from any of these — only general
composition and interaction principles.

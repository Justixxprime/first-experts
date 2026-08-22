# CHANGELOG.md

## Phase 9 — New homepage sections, Lagos-USA route corrected to Air

**What changed:**

1. **Lagos → USA is now Air, not Sea**, everywhere it appears: the routes table
   (`routes.html`), both loops of the homepage hero ticker, and confirmed correct under
   the route filter (tested by clicking the Air filter and checking USA appears).
   Updated the estimate to 2 to 4 days / 4x weekly to match an air lane instead of the
   old 21 to 28 days sea estimate.
2. **New "How It Works" section on the homepage** — a 4-step Book → Move → Clear →
   Deliver breakdown with a photo background, between Services and Global Network.
3. **New "From the Guides" section on the homepage** — surfaces 3 of the 4 blog posts
   with their accent colors, linking into the Insights content instead of leaving it
   only reachable from the nav.
4. Both new sections respect the same reveal-on-scroll and reduced-motion handling as
   the rest of the site, and were checked for mobile overflow.

**Still waiting on your answer, not forgotten:** whether Haulage and e-commerce
logistics are real, current services worth building pages for.

---

## Phase 8 — Privacy/Terms rewrite, nav fix, real blog, dash cleanup

**What changed:**

1. **Privacy Policy and Terms of Use rewritten.** Removed the yellow "have a lawyer
   review this" banner box (replaced with a single quiet line at the bottom of each
   page, not a big warning), removed the Tailwind/Google Fonts/CDN technical detail
   (privacy policies should be about the company's data practices, not its build
   tooling), and rewrote both in a more standard, professional structure. Kept the
   substance of "this isn't a substitute for legal review" because I'm not a lawyer and
   privacy law varies by jurisdiction. No single document can honestly claim to be valid
   in every country. See my note in the chat reply for more on this.
2. **Found and fixed a real nav bug while re-adding Contact.** At common laptop/tablet
   widths (around 1024px), 7 nav items plus 2 buttons didn't have enough room and
   started crowding together. Raised the breakpoint where the site switches to the
   clean mobile-style menu (was 960px, now 1220px), so a tight desktop nav never
   happens, and it gracefully becomes the full-screen menu instead. Verified with
   debug outlines on the actual elements, not just a glance at a screenshot, after an
   initial read of the screenshot led me to the wrong conclusion.
3. **Contact is back in the primary nav**, all 17 relevant pages, alongside the
   existing Track Shipment and Request a Quote CTAs.
4. **Real blog, 4 full pages**, not just short paragraphs on one page: expanded each of
   the four Insights guides into its own article (`blog-air-vs-sea-freight.html`,
   `blog-fcl-vs-lcl.html`, `blog-customs-clearance-explained.html`,
   `blog-quote-checklist.html`), each with proper structure, a pull quote, internal
   links to relevant service pages, and a shared "more guides" + quote CTA at the end.
   `insights.html` is now a real index linking out to them, in the same four-color
   equal-weight tile style as the homepage services.
5. **Dash sweep repeated** across all new content, zero remaining site-wide.

**Not done, deliberately, pending your answer:** I have NOT added Haulage or
E-commerce as new services anywhere, and have NOT built new service pages for them.
See my note in the chat reply. Also not done: sourcing new/different stock photography
(see chat), video (see chat), and a broader color pass beyond what the new blog tiles
already introduce.

---

## Phase 7 — Header line actually eliminated, tracking built, Privacy/Terms added

**What changed:**

1. **The header line — removed the source entirely this time**, not patched again.
   Two things were contributing: a `border-bottom` (however faint) on the header, and
   `backdrop-filter: blur()`, which can create its own subtle rendering seam at an
   element's edge on some GPUs. Both are gone — the header now has no border at all,
   ever, in either state, and the "solid" state is a plain flat color with no blur.
   Checked pixel-by-pixel across index.html, customs.html, services.html, and routes.html
   this time (screenshots cropped tight to the header/hero boundary) before calling it
   fixed.
2. **Shipment tracking is built and tested end-to-end** — `tracking.html`, reading a
   published Google Sheet as CSV, zero backend. Unit-tested the CSV parser (including a
   field with a comma inside quotes) and ran the full lookup flow in a real browser
   against a mock sheet response, both the "found" and "not found" paths. Setup steps
   (creating the sheet, generating tracking numbers, publishing it, connecting it) and
   usage instructions (for you and for customers) are in
   `docs/FORMS-AND-TRACKING.md`.
3. **Privacy Policy and Terms of Use added** (`privacy.html`, `terms.html`) — honest,
   plain-language drafts covering what's actually collected (Quote/Contact form fields,
   sent via Web3Forms), what third-party services the site uses, and standard terms of
   use. Both carry a clear on-page notice that they need a lawyer's review before
   publishing — I'm not a lawyer and these are informational starting points, not legal
   advice.
4. **Nav updated everywhere** (17 pages) — "Track Shipment" replaces "Contact" as the
   header's secondary CTA (Contact remains one click away via the footer and mobile
   menu, and is still a full page), plus added to the mobile menu and footer nav column.
   Footer bottom row now links Privacy Policy and Terms of Use on every page.

**Not done:** nothing queued remains outstanding from your list. Next candidates, if
wanted: legal review of Privacy/Terms, and the "add real First Experts photography"
item that's been open since ASSET-SOURCES.md was first written.

---

## Phase 6 — Real fix for the header seam, Web3Forms live, thank-you page, single typeface

**What changed, addressing each point you raised:**

1. **The header line/contrast issue — actually root-caused this time.** The hero photo
   layer was using a flat 55% opacity fade, not a proper gradient — so any strong edge
   in the photo itself (equipment, a shadow, the aircraft body) could read as a stray
   line, and the same flat fade is why the subheading text was hard to read. Replaced it
   everywhere (homepage hero AND all four service-page photo heroes) with a real
   multi-stop dark gradient that has no hard edge of its own and stays strong at the top
   (behind the header) and bottom (behind the text), regardless of what's in the photo.
   I couldn't visually confirm this against the actual photo in my own environment
   (explained honestly last time — my sandbox blocks image CDNs), so please double-check
   this one specifically once you open the zip.
2. **Your real Web3Forms key is now live** in `js/main.js` — Quote and Contact forms
   submit for real now, no more `mailto:` fallback.
3. **New `thank-you.html`** — after a successful Quote or Contact submission, the visitor
   is redirected here instead of just seeing an inline message. Animated checkmark
   (draws itself in), personalized with their first name, and the message differs
   slightly for a quote vs. a general enquiry.
4. **One typeface for everything** (except data labels). You rejected two different
   sans-serif body fonts in a row as "too normal" — so body copy now uses Fraunces too
   (same family as the headlines), which has a built-in "optical size" mode that adjusts
   its own weight/contrast automatically as text gets smaller, so it stays readable
   instead of turning into a novelty font. IBM Plex Mono remains the one deliberate
   exception, for route codes and stats.
5. **Homepage eyebrow ("Total Logistics Solution: Lagos, Nigeria") made bigger** and
   slightly heavier.
6. **The "SCROLL" indicator is now a real button** — tapping/clicking it smooth-scrolls
   to the next section, on both desktop and mobile.
7. **FAQ accordions now only allow one open at a time**, grouped per list, site-wide.
8. **Removed the double-tap-zoom delay** on buttons and links (`touch-action:
   manipulation`) — but deliberately did NOT disable pinch-zoom entirely, since that's
   an accessibility requirement (low-vision visitors need to be able to zoom). Flagging
   this explicitly in case you specifically wanted zoom fully disabled — say so and I'll
   revisit it, but I'd recommend against it.
9. **Routes page enriched** — added the same animated, "alive" network diagram from the
   homepage, plus a real photo on its hero (previously plain).
10. **Customs page now has a real photo too** (port/terminal), matching the other three
    service pages, as part of the header-seam fix.

**Not done in this phase:** the Google Sheets tracker (still just designed, not built —
see `docs/FORMS-AND-TRACKING.md`), and Privacy/Terms pages.

---

## Phase 5 — Header seam bug, animated network map, font refinement

**What changed:**

1. **Fixed the black-line seam you spotted on the Customs page.** Root cause: that page
   was the only one using a light-colored hero section under the dark fixed header —
   every other page uses a dark hero, so the header blends in seamlessly. Customs now
   matches (dark hero, grain texture, a real port photo), so there's no visible seam,
   consistent with every other page including the homepage.
2. **Body font changed again, per your note** — from Hanken Grotesk to **Instrument
   Sans**, which is the sans-serif specifically designed to pair with expressive serif
   display type like Fraunces (they're built by the same type family to work together).
   Still three fonts total: Fraunces (display), Instrument Sans (body), IBM Plex Mono
   (data/labels).
3. **Customs page now has a real photo** — a container port/terminal shot, matching the
   other three service pages. (A literal "customs" photo — stamps, a clearance desk —
   kept turning up as a staged stock cliché the brief explicitly warns against, so this
   uses the port setting the clearance work actually happens in instead.)
4. **Global Network diagram made "alive."** Each route now: draws itself in on scroll,
   then runs a continuous glowing pulse along the path (reads as cargo actually moving,
   not a static line), destination dots pop in as each route "arrives," and the Lagos
   hub has a soft radar-ping animation. All of it respects `prefers-reduced-motion`
   (falls back to the plain static diagram with zero motion).

**Not done in this phase:** the Google Sheets tracker and Privacy/Terms pages are still
queued — this phase focused on the specific bug and the two follow-up design requests.

---

## Phase 4 — Contrast fix, typography, installable icons, responsive QA

**What changed:**

1. **Header contrast bug fixed.** The screenshot you sent showed nav text nearly
   invisible against a light background. Root cause: the header's "solid" state relied
   partly on `backdrop-filter` (a blur effect), which can silently fail on some phone
   browsers/GPUs — when it does, the background was too transparent on its own to keep
   white text readable. Fixed by making the solid background nearly opaque on its own
   (`backdrop-filter` is now a bonus, never load-bearing), and added a soft permanent
   gradient behind the nav so it's never at zero contrast on any page, even before that
   state kicks in.
2. **Typography upgraded.** Body copy moves from Inter to Hanken Grotesk; headlines
   move from Space Grotesk to **Fraunces** — a high-contrast display serif built for
   large sizes and italics, which is where the "since 2005." accent italic now gets a
   genuinely editorial, premium feel instead of a generic sans italic. Three fonts
   total (display / body / mono for data), not six.
3. **Full installable-icon system added.** A `manifest.json` (lets Android/desktop
   Chrome users "Install" the site like an app), 14 icon sizes generated from your
   logo, a maskable Android icon, Apple touch icons for iOS home-screen, and Windows
   tile config — wired into every page's `<head>`.
4. **Responsive-checked across 11 real device sizes** (iPhone SE/14/14 Pro Max,
   two Android sizes, iPad Mini/Air/Pro, laptop, MacBook Air, 1080p desktop) × 5 key
   pages = 55 checks, zero horizontal-overflow bugs found.
5. **Real photography — attempted, partially unconfirmed.** See ASSET-SOURCES.md —
   the hotlinks are in place and should work on a normal connection, but my own testing
   environment couldn't load any image CDN to confirm visually. Please check this one
   yourself after opening the zip.

**Not done in this phase:** the shipment tracker (Google Sheets version, discussed and
designed in `docs/FORMS-AND-TRACKING.md`) and Privacy/Terms pages are still queued —
this phase focused on the specific bugs and platform polish you flagged first.

---

## Phase 3 — Bug fixes + real photography + your corrections

**What changed, in the order you raised it:**

1. **Mobile menu made bulletproof.** Hardened with `pointer-events`, `visibility` and
   `opacity` alongside the existing slide transform, so even in edge cases (address bar
   showing/hiding on mobile browsers changing the viewport mid-transition) it can't
   block taps on the header behind it. `js/main.js` also rewritten so every feature
   (header, menu, reveal animations, counters, route filter, forms, footer year) is
   wrapped in its own `try/catch` — a bug in one can no longer take down another.
2. **Removed 01-4534455 everywhere** (header, footer, contact page, mobile menu,
   structured data) — confirmed not in use. Only 0703 134 1072 remains.
3. **Routes reframed as "anywhere in the world."** Routes page headline, homepage
   network section, and the route diagram now lead with worldwide coverage; the six
   listed lanes are explicitly labelled as examples, not the full list. "USA" no longer
   says "East Coast."
4. **All four services now equal visual weight.** Air Freight no longer gets a larger
   "featured" tile — see COMPANY-FACTS.md for why.
5. **Every em dash removed from visible copy** (108 instances, rewritten by hand/script
   for grammar, then spot-checked), per your note that they read as unnecessary.
6. **Three real, properly-licensed photos added** (Unsplash License, credited in
   ASSET-SOURCES.md) as hero backgrounds behind a dark scrim: homepage + Air Freight
   page, Sea Freight page, Door to Door page. Hotlinked from Unsplash's CDN rather than
   downloaded into the project, to keep the zip small — see ASSET-SOURCES.md for the
   trade-off and how to switch to local files instead.
7. **Forms switched from `mailto:` to Web3Forms** — a free service that emails you form
   submissions with zero backend of your own. Needs a 5-minute setup (get a free access
   key, paste it into `js/main.js`) — full walkthrough in the new
   `docs/FORMS-AND-TRACKING.md`. Falls back to the old `mailto:` behavior automatically
   until you do.
8. **Shipment tracking: explained, not yet built.** `docs/FORMS-AND-TRACKING.md` walks
   through why a free carrier API can't cover First Experts' shipments (you're the
   forwarder, not the carrier), what building a custom API would actually require, and
   the recommended option (a published Google Sheet as a free, no-code "database" the
   team can update directly). Say the word and it gets built next.

**Not done in this phase (flagged, not forgotten):** the "more cinematic/animated/high-
tech" redesign request is a bigger, more subjective undertaking than the fixes above —
I've added a slow photo drift on hero images and equal-weight hover lift on the service
tiles as a first pass, but a fuller motion pass across every section is still ahead.
Privacy Policy / Terms are also still unbuilt (needs legal review either way).

---

## Phase 2 — Expanded information architecture

**What changed:** Added six new pages beyond the live site's current structure, per
the original brief's fuller sitemap: dedicated pages for each of the four **verified**
services (`air-freight.html`, `sea-freight.html`, `door-to-door.html`, `customs.html`),
an industries page (`solutions.html`), and an educational hub (`insights.html`). Nav
(desktop, mobile, footer) updated across every page to: Home, Services, Solutions,
Routes, About, Insights — with Contact and FAQ kept one click away (CTA button /
footer) rather than crowding the top-level bar to 8 items.

**Why:** The brief's sitemap goes further than the live site's current six pages
(dedicated service pages, an Industries/Solutions page, an Insights section). Phase 1
deliberately stayed scoped to what's live today; phase 2 builds out the rest now that
the design system, doc structure, and QA process were already proven out.

**What's deliberately different from the brief:** The brief's suggested structure
includes a standalone "Haulage" service alongside "Door-to-Door." Only four services
are verified on the live site (Air, Sea, Door-to-Door, Customs) — Haulage/road transport
isn't listed as a separate offering, so it's folded into the Door-to-Door page instead
of invented as a fifth service. See COMPANY-FACTS.md.

**Design/content decisions:**
- Service pages reuse the exact verified copy from `services.html`, expanded with a
  process timeline, an FAQ, and cross-links to the other three services — no new
  factual claims, just more depth on facts already in COMPANY-FACTS.md
- `solutions.html` maps the six **verified** industries (About page) to relevant
  services. Framed as "here's what would likely help," not as case-study claims of
  specific past work, since no industry-specific case studies are verified
- `insights.html` holds four short, generic, evergreen guides (air vs sea, FCL vs LCL,
  what customs clearance involves, what to have ready for a quote). These are general
  industry knowledge, not company-specific claims — safe to publish without a source
  citation, and explicitly not framed as "news" per the brief's instruction not to fake
  a news feed

**Technical decisions:** New pages are flat at the root (`air-freight.html`, not
`/services/air-freight.html`) rather than in a subfolder — matches the rest of the
site's flat structure and avoids relative-path bugs. Nav across all pages was updated
programmatically (not by hand per file) to guarantee consistency — see the note in
QA-CHECKLIST.md about how to re-run that if you edit nav again by hand.

**Bugs found and fixed in this phase:** Two more instances of the same
dark-background contrast bug from phase 1 (inline text-links losing their underline
on dark tiles) — same root cause, same fix, applied everywhere it recurred. See
QA-CHECKLIST.md.

**Next step:** Your call. Remaining candidates from the original brief not yet built:
Privacy Policy / Terms (needs legal review — see QA-CHECKLIST.md), a live shipment
tracker (needs a real backend).

---

## Phase 1 — Redesign foundation

**What changed:** Full visual and front-end rebuild of the seven pages that exist on the
live site today (Home, Services, Routes, About, Get a Quote, Contact), plus a new FAQ
page and a proper 404 — same URLs/filenames as the live site, so this can drop in as a
direct replacement.

**Why:** Requested redesign/upgrade of firstexpertslogistics.com using the attached
creative brief, built with HTML5 + Tailwind CSS + vanilla JS as specified, using the
company's real logo, Managing Director photo, and published facts rather than invented
content.

**Files changed:** All of them — this is a full rebuild, not an edit of the existing
codebase (no access to the live site's source, only its rendered pages).

**Design decisions:** See RESEARCH.md (creative direction) and COMPANY-FACTS.md (what's
verified vs deliberately left out).

**Technical decisions:**
- Tailwind via CDN (Play CDN) for a zero-build "download and open" experience
- One shared `css/styles.css` for design tokens + custom components/motion Tailwind
  utilities can't express cleanly (ticker, reveal-on-scroll, grain texture)
- One shared `js/main.js`, defensive (every block checks the DOM exists before using it)
- No external stock imagery — original inline SVG icon system instead (see
  ASSET-SOURCES.md for the reasoning)
- Forms submit via `mailto:` (no backend exists yet) — see QA-CHECKLIST.md

**Risks / known issues:** See QA-CHECKLIST.md → "Known limitations." Nothing blocking a
soft launch, but read it before pushing live.

## Phase — Haulage + E-commerce Logistics added as full services

**What changed:** Two new standalone service pages built and wired in everywhere
services are referenced.

**Why:** Client confirmed both are real services and asked for them to be built out,
not folded into Door to Door (Haulage) or left off entirely (E-commerce Logistics).

**Files changed:**
- New: `haulage.html`, `ecommerce.html` (full pages — hero, explainer, process/benefits,
  FAQ, closing CTA — matching the existing service-page template)
- `services.html` — two new sections (05 Haulage, 06 E-commerce), heading updated to
  "Six ways we move your cargo forward"
- `index.html` — two new homepage service tiles, heading updated to match
- `quote.html` — two new options added to the "Shipping mode" selector
- `faq.html` — services answer updated; Haulage answer corrected (no longer says
  "only as part of Door to Door"); new e-commerce question added
- `sitemap.xml` — both new URLs added
- `docs/COMPANY-FACTS.md` — services table updated from four to six; the old note
  explaining why Haulage was left out has been replaced with the client confirmation

**Known limitation carried over:** no fulfillment volume, courier-partner names, or
warehouse specifics are claimed on the E-commerce Logistics page — none of that is
verified, so it's kept general per the no-invented-facts rule.

## Phase — PWA manifest fix, Routes shown as Air, nav highlighting, media guide

**What changed:**
- Fixed `manifest.json`: `start_url` and `scope` were root-absolute (`/index.html`,
  `/`), which breaks "Add to Home Screen" on any subpath deployment like the
  GitHub Pages testing URL — likely the exact cause of the client's iPhone report.
  Changed to relative paths (`./index.html`, `./`), works on both the testing
  subpath and the future cPanel root domain.
- Routes page + homepage lane ticker: all six example lanes now show as Air
  (Rotterdam/Shanghai given realistic air transit times instead of their old sea
  timings, Accra changed from Road·Haulage to a 1-day Air Express regional lane).
  Removed the Sea/Road route filter buttons since there's no longer any non-Air
  data to filter. Routes page copy now links to Sea Freight/Haulage for anyone who
  needs those modes specifically.
- Desktop header, mobile menu, and footer nav now all mark the current page
  (`aria-current="page"`, amber highlight) consistently on every page that has a
  matching entry — previously only the desktop header did this, and even there a
  few pages (FAQ, Privacy, Terms) were missing it.
- Legal-review disclaimer on Privacy/Terms — already present, confirmed as still
  in place, no change needed.
- Added `docs/MEDIA-REPLACEMENT-GUIDE.md` — a plain-language table mapping every
  photo slot on the site to an exact filename, recommended size, and what to
  photograph, so the client can drop in real company photography later without
  touching any code.

**Files changed:** `manifest.json`, `routes.html`, `index.html`,
`css/styles.css`, plus footer/mobile-menu markup on every page with a matching
nav entry, `docs/ASSET-SOURCES.md`, `docs/CHANGELOG.md`,
`docs/MEDIA-REPLACEMENT-GUIDE.md` (new).

**Risks / known issues:** none introduced. Real company photography and the
Contact page photo slot are still open — see MEDIA-REPLACEMENT-GUIDE.md.

## Phase — Legal disclaimer removed, developer credit added

**What changed:**
- Removed the "reviewed for plain-language clarity... recommend periodic review
  by qualified counsel" disclaimer from the bottom of `privacy.html` and
  `terms.html`.
- Added a footer credit line on every page with a footer: "Website designed &
  powered by Obioma Chibueze Justice," linking to WhatsApp
  (`https://wa.me/2349133058119`).

**Files changed:** `privacy.html`, `terms.html`, `css/styles.css`, plus the
footer on every other page with a footer (21 files).

## Phase — Motion & interaction elevation pass

**What changed:**
- **Hero staggered text reveal:** the eyebrow/headline/subhead/CTA row on every
  hero now cascade in with individual delays instead of appearing as one block.
  Pure CSS, layered on top of the existing scroll-reveal system — no HTML changes.
- **Scroll parallax on photo backgrounds:** every `.hero-photo` and `.photo-layer`
  background image now drifts subtly on scroll, via `background-position` (not
  `transform`, so it never fights the existing Ken Burns scale animation on the
  same elements). Skipped entirely on reduced motion.
- **Magnetic primary buttons:** `.btn-primary` buttons pull subtly toward the
  cursor on desktop. Skipped on touch and reduced motion.
- **Custom cursor:** a small dot that follows the pointer and grows over
  clickable elements, desktop/fine-pointer only — verified it never appears on
  touch/mobile viewports.
- **Air Freight flight-path visual (signature moment):** a new section right
  after the Air Freight hero, reusing the same route-line/route-pulse/route-dest
  visual language already built for the homepage's Global Network diagram, with
  a plane icon riding the path via SMIL `animateMotion`. Explicitly labeled
  "Illustrative route line" with a link to the real Routes page, so it reads as
  atmosphere, not a factual claim.

**Files changed:** `css/styles.css`, `js/main.js`, `air-freight.html`.

**Verified:** all pages checked for console/JS errors with mouse movement and
scroll exercised — clean everywhere. Custom cursor confirmed present on desktop
and absent on a touch/mobile emulated viewport. All existing tag-balance and
broken-link checks re-run clean after this pass.

## Phase — Custom cursor removed; Ken Burns + stagger extended to every photo hero

**What changed:**
- Removed the custom cursor entirely (JS injection block and all
  `.cursor-dot` / `.custom-cursor-on` CSS) — client feedback was that it
  didn't read as professional. Native browser cursor everywhere again.
- The Ken Burns slow-zoom animation (previously homepage-only, on
  `.hero-photo`) now also applies to every inner-page photo hero
  (`.section-photo .photo-layer`): Air Freight, Sea Freight, Door to Door,
  Customs, Haulage, E-commerce Logistics, Routes.
- The staggered text reveal (previously homepage-only) now also applies to
  those same seven inner-page photo heroes, so their eyebrow/headline/
  subhead/CTA cascade in on load the same way the homepage hero does.

**Files changed:** `css/styles.css`, `js/main.js`.

**Verified:** headless-browser check across all 8 photo-hero pages confirms
the cursor is gone, the Ken Burns animation is active, and there are zero
JS errors — on every one of them.

## Phase — Fixed mobile overflow bug (How it works cards + quote form overlap)

**What changed:** Two client-reported bugs on mobile, same root cause:
`.grid-12` was always `repeat(12,1fr)` with no mobile stacking rule, and 27+
elements across the site used inline `grid-column:span 6` (or `span 3`) at
every screen size. On a phone, two 50%-width form fields or four 25%-width
cards became too narrow for their content:
- Homepage "How it works" — steps 03/04 ran off the right edge of the
  screen, text cut off (client screenshot).
- Quote form — "Preferred pickup date" and "Company" sat side by side and
  visually overlapped, because a native date input's minimum rendering
  width didn't fit a 50%-wide column on a phone.

**Fix:** replaced every inline `grid-column:span 6` / `span 3` (about.html,
contact.html, quote.html, index.html — 31 elements total) with new
`.col-6` / `.col-3` utility classes that default to full width (stacked)
below 640px and only widen to their intended fraction above that, matching
every other responsive pattern already used on the site.

**A mistake caught and fixed in the same pass:** the first version of this
fix used a CSS attribute selector matching the inline style text directly,
with no HTML changes. It broke silently: the site's own reveal-stagger
script sets a `--i` custom property via `style.setProperty()`, which makes
the browser re-serialize the whole `style` attribute with different
spacing, so the attribute selector stopped matching on any element the
reveal system touched — which is nearly everything. Moved to real CSS
classes instead, which don't depend on the literal inline style text.
Also caught immediately after: on quote.html and contact.html, the
original elements had `style=` before `class="field"` in the source, so
the substitution produced two separate `class` attributes on the same
element (`class="col-6" class="field"`) — invalid HTML, and the browser
silently keeps only the first, dropping `.field`'s input/label styling
entirely. Merged into a single `class="col-6 field"` and re-swept the
whole site for any other duplicate-class collisions (none found).

**Files changed:** `css/styles.css`, `about.html`, `contact.html`,
`quote.html`, `index.html`.

**Verified:** headless-browser check at 390×844 (iPhone width) on
index.html, quote.html, about.html, contact.html — horizontal overflow is
0px on all four, zero JS errors, and the specific reported sections
(How it works cards, pickup-date/company fields) visually confirmed
stacking correctly with full text visible.

## Phase — World-class feature batch: quick-quote, sticky mobile bar, structured data, tracking timeline, WhatsApp deep-links, image performance

**What changed:**

- **Quick-quote starter (homepage):** a compact Mode/Origin/Destination/
  Weight form right after the hero that hands off to the real quote form
  pre-filled via URL query string. Deliberately does **not** compute or
  display a price — there is no rate engine behind this site, and
  fabricating one would violate the project's core rule of never
  inventing facts. It only removes retyping.
- **Sticky mobile quote bar:** appears once someone scrolls past the
  first screen, mobile only, hidden on quote.html/thank-you.html/404.html
  where it would duplicate the page's own CTA.
- **Contextual WhatsApp links:** every wa.me link site-wide now opens
  with a pre-filled message matching the page it's on (e.g. Haulage page
  → "Hi, I'd like a quote for Haulage.") instead of a blank chat.
- **Tracking timeline rebuilt:** connecting progress line filled up to
  the current stage, with a pulsing ring on whichever stage is active —
  same underlying status logic as before, just a real operational look
  instead of plain dots.
- **Structured data (JSON-LD):** LocalBusiness schema on the homepage
  (using only facts already verified in COMPANY-FACTS.md), Service schema
  on all six service pages, and FAQPage schema generated programmatically
  from faq.html's actual visible Q&A content — extracted from the live
  page text rather than hand-typed, so it's guaranteed to match what's
  displayed.
- **Image performance:** every logo instance and the About page team
  photo now has explicit width/height (prevents layout shift) plus
  loading="lazy" on everything below the fold; the header logo stays
  eager since it's always immediately visible.

**Files changed:** `index.html`, `quote.html`, `tracking.html`,
`about.html`, `faq.html`, all six service pages, `css/styles.css`,
`js/main.js`, plus lazy-loading attributes across all 24 HTML files.

**Verified:**
- Headless-browser end-to-end test: quick-quote form filled and
  submitted → correct arrival on quote.html with mode selected and all
  three fields pre-filled from the URL.
- Sticky bar confirmed hidden at page load, appears after scrolling,
  and confirmed completely absent (`display:none`) on desktop viewports.
- WhatsApp href confirmed carrying the correct pre-filled message on a
  sample page.
- All JSON-LD blocks parsed as syntactically valid JSON across every
  page that has one.
- Full-site regression: all 24 pages checked in a headless browser
  (page load + scroll) — zero JavaScript errors on every single page.
  Tag balance and internal-link checks also re-run clean across the
  whole site.

## Phase — Cinematic/premium elevation: page transitions, per-service visual chapters, performance, spotlight cards

**What changed:**

- **Cross-document view transitions:** one CSS rule (`@view-transition{
  navigation: auto; }`) — browsers that support it (Chrome/Edge 126+,
  Safari 18+) now cross-fade between page navigations instead of a hard
  cut. Unsupported browsers simply ignore the rule and navigate exactly
  as before; nothing to fall back to, nothing that can break.
- **Performance — fonts moved off render-blocking @import:** Google
  Fonts was loaded via `@import` inside styles.css, which forces the
  browser to fully fetch the CSS file before it even discovers the font
  request — an extra serial round-trip on every page. Moved to a
  `<link>` in each page's `<head>`, preceded by `preconnect` hints for
  fonts.googleapis.com, fonts.gstatic.com, cdn.tailwindcss.com, and
  images.unsplash.com. Each page's hero image also gets a
  `<link rel="preload" fetchpriority="high">` now, so the LCP element
  starts loading immediately instead of waiting for CSS to parse.
- **Per-service visual chapters** — previously only Air Freight had a
  signature animated moment. Added one to each remaining service page,
  each with its own distinct motif rather than reusing the same effect:
  - Sea Freight: an animated tide-line wave with a vessel riding the
    route path.
  - Haulage: a road line with mile-marker ticks and a truck riding it.
  - Customs: a document with a scanning line and a stamp/checkmark that
    settles in — process-themed rather than route-themed, since customs
    isn't a route.
  - Door to Door: its existing 5-step list rebuilt into a vertical
    scroll-driven journey — the connecting line fills and each dot
    lights up as you scroll through it, verified via headless browser
    to reach 100% fill with all 5 steps marked reached.
- **Cursor-spotlight on cards:** a soft glow that follows the mouse
  behind `.plate`/`.service-tile` cards on hover, desktop only. This is
  unrelated to the custom cursor removed earlier — the native cursor
  itself is completely untouched; only the card background responds.
- **Scroll progress indicator:** thin amber line at the very top of the
  viewport, fills as you scroll down the page.
- **Image reveal on scroll:** the About page team photo now wipes in
  left-to-right (clip-path) instead of a plain fade, reusing the
  existing reveal system with no new JS.

**Files changed:** `css/styles.css`, `js/main.js`, `sea-freight.html`,
`haulage.html`, `customs.html`, `door-to-door.html`, `about.html`, plus
resource hints added to all 24 HTML files.

**Verified:** full headless-browser sweep — all 24 pages zero JS errors.
Feature-specific checks confirmed with real measured values: scroll
progress bar moved from 0% to 35.8% on scroll; 15 spotlight cards wired
on services.html; both Sea Freight and Haulage confirmed with their
route path present, plane/truck icon opacity at 1, and the SMIL
`animateMotion` element actually injected; Customs stamp element
confirmed present; Door to Door journey fill confirmed reaching 100%
height with all 5 steps marked reached on scroll; About page image-reveal
element confirmed present; homepage confirmed carrying 4 preconnect
hints and 1 hero preload.

**Scope note on "section rhythm variation":** not done as a separate
sweeping pass — the four new visual chapters above already introduce
real light/dark rhythm breaks and one genuine asymmetric split (Customs'
text-vs-icon layout), which covers this more honestly than a cosmetic
padding tweak would have.

## Phase — Dark reading mode, downloadable service sheet, and two corrections

**Corrections to earlier claims in this changelog/conversation — checked
the actual code before building anything, found these were already done:**
- Animated stat counters (item #2 from a prior request) were **already
  fully implemented** — count-up animation on "40+ countries" / "6
  industries" via IntersectionObserver, plus years-in-service computed
  live as `new Date().getFullYear() - 2005` so it never goes stale.
  Nothing needed building here.
- The 404 page (item #7) was **already** a real illustration, not
  text-only as previously stated — a drifting jet icon (26s loop) and a
  slowly crawling dashed route line, both respecting reduced motion.
  Also nothing needed building.

**What was actually built this phase:**

- **Light/dark reading mode toggle.** Deliberately scoped, not a full
  theme inversion — the site's dark sections (`.bg-ink`, `.bg-night`,
  header, footer) are an intentional editorial rhythm per the original
  brief, and `--color-ink` does double duty as both light-section text
  color and dark-section background, so it can't be globally flipped
  without breaking those sections. This toggle re-themes only the plain
  light surfaces (body background, `.plate` cards, form fields, muted
  text) into a dark reading surface; sections that are already dark are
  left completely untouched. A small inline script in `<head>` reads the
  saved preference from localStorage before first paint, so there's no
  flash of the wrong theme on load — confirmed via headless browser that
  `data-theme="dark"` is already set at the `commit` navigation event,
  before the page finishes loading. Toggle button added to the header on
  all 23 pages that have a full header (not 404.html).
- **Downloadable one-page service sheet (PDF):** all six services, the
  verified "at a glance" facts from COMPANY-FACTS.md, and contact
  details, built for the trade-show/WhatsApp-attachment use case named
  when this was proposed. Linked from the Services page hero and the
  footer on every applicable page.

**Files changed:** `css/styles.css`, `js/main.js`, inline anti-flash
script + toggle button added to all 24 HTML files, footer service-sheet
link added to 23 of them, `services.html` hero link, new
`downloads/first-experts-service-sheet.pdf`.

**Verified:** full headless-browser sweep, zero JS errors across all 24
pages. Dark mode toggle confirmed present on all 23 applicable pages;
toggled on about.html and confirmed the actual computed background/text
colors (`rgb(18,22,31)` / `rgb(232,234,240)`) rather than assuming the
CSS applied correctly. Persistence confirmed with a real reload — theme
was already set before the page finished loading, not after. The PDF
link was fetched (not just checked for presence) and confirmed
`200 OK` with `application/pdf` content-type. Footer link confirmed
present on all 23 applicable pages via direct DOM query, not a visual
guess.

## Phase — Audit pass: fixed a real accessibility gap, closed a real content gap

You asked to check what's actually there before proposing anything new.
Audited the live codebase directly rather than working from memory — found
two genuine, concrete gaps and fixed both:

- **Accessibility bug (introduced by the dark mode toggle):** the toggle
  button had `aria-label` but no `aria-pressed` state, so a screen reader
  user had no way to know whether dark mode was currently on. Fixed:
  `aria-pressed` now starts `"false"` in the HTML and flips correctly on
  click — verified with a headless browser, not assumed: confirmed it
  reads `false` before the click and `true` immediately after.
- **Structured data gap:** 8 of 24 pages had JSON-LD (homepage, 6 service
  pages, FAQ) — the 4 blog posts had none. Added BlogPosting schema to
  all four, reusing their existing verified titles/descriptions.
  Deliberately left out `datePublished` since no publish date exists
  anywhere on the pages to verify — adding one would mean inventing it,
  which this project doesn't do even for schema markup Google would
  prefer to see.

**Also audited and confirmed already correct, nothing to fix:** custom
cursor stayed removed (zero occurrences), all resource hints present on
every page, sitemap.xml covers all 22 indexable pages (index.html is
correctly represented as `/`, not `/index.html`), every image has alt
text, robots.txt is in place and points to the sitemap.

**Files changed:** `js/main.js`, `aria-pressed` attribute added to the
toggle button on 23 pages, BlogPosting schema added to 4 blog posts.

**Verified:** full headless-browser sweep, zero JS errors across all 24
pages. JSON-LD re-validated as syntactically correct across every page
that has any. aria-pressed toggle behavior confirmed with real before/
after values, not a visual check.

## Phase — Item #8: live exchange rates + real-time network pulse (homepage)

**What changed:** a new "live utility strip" on the homepage with two
independent widgets:

- **Exchange rates (USD → NGN/GBP/EUR):** fetched client-side from
  Frankfurter (api.frankfurter.dev), an open-source, keyless, ECB-backed
  rate API. Cached per browser session (sessionStorage) so it isn't
  re-fetched on every navigation. Explicitly labeled "for guidance only —
  not a quoted rate," with a link to the source.
- **Network pulse (shipments in motion / delivered / total tracked):**
  reuses the exact same Google Sheets CSV already powering the Tracking
  page — not a new data source. Counts are a genuine tally of rows by
  status at fetch time; nothing estimated or computed.

**A real testing limitation, disclosed rather than glossed over:** this
sandbox blocks all outbound cross-origin requests at the network level —
proven by testing a known-good control domain (images.unsplash.com,
already used successfully elsewhere on the live site) which failed
identically to the untested APIs. So real-world CORS behavior for
Frankfurter could not be 100% verified from here. What was verified
instead: the API requires no key, returns real data including NGN, and
its own documentation shows direct browser fetch as the intended usage
pattern (not a server-proxied one). The widget was also built to fail
completely silently — via Playwright route interception, confirmed both
that (a) with the network genuinely blocked, the strip correctly stays
hidden with zero JS errors, and (b) with a mocked successful response,
the rendering and counting logic itself is correct (verified exact
output: 2 in motion / 2 delivered / 4 total from a 4-row mock CSV).
**Recommend confirming the live rates actually render once this is on
the real domain** — if Frankfurter's CORS doesn't cooperate in practice,
the fix is a one-line URL swap to a different provider, not a rebuild.

**Files changed:** `index.html`, `css/styles.css`, `js/main.js`.

**Verified:** full 24-page JS error sweep — zero errors. Tag balance
re-confirmed clean.


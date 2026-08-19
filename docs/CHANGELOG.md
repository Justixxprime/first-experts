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


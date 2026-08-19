# QA-CHECKLIST.md

This is a status report, not a claim that the site is finished or perfect. Read the
"Known limitations" section before pushing this live.

## Checked

- [x] Every page opens directly from the file system (double-click `index.html`, or use
      VS Code's "Live Server" extension for the best experience with the mobile menu)
- [x] Nav, mobile menu (with focus trap + Escape-to-close), and footer are consistent
      across all seven pages
- [x] `prefers-reduced-motion` disables the hero drift, ticker marquee, and counters —
      tested by enabling "reduce motion" in OS settings
- [x] Keyboard navigation: tab order through nav, mobile menu, forms, and route filter;
      visible focus rings throughout
- [x] Semantic HTML: one `<h1>` per page, landmark elements, skip-to-content link, alt
      text on all images (decorative SVGs marked `aria-hidden`)
- [x] Forms validate required fields with plain-language errors before submitting
- [x] Every phone/email/WhatsApp link uses `tel:` / `mailto:` / `wa.me` so they're
      one-tap on mobile
- [x] No invented statistics, partnerships, certifications, or team members anywhere —
      cross-checked against COMPANY-FACTS.md
- [x] Responsive check at 375 / 390 / 768 / 1024 / 1440 widths (Tailwind's default
      breakpoints plus the custom grid) — no horizontal overflow

## Known limitations (be honest with the client about these)

1. **Tailwind via CDN, not a build step.** This keeps "download, open, and it just
   works" true with zero npm setup — matching how you said you'd be testing it — but it
   ships more CSS than a purged production build would. Before a real launch, run it
   through the Tailwind CLI/PostCSS build and swap the `<script>` tag for a compiled
   `styles.css`. Ten minutes of work, not a rewrite.
2. **Forms have no backend.** Quote and Contact forms validate client-side, then open
   the visitor's email app with the message pre-filled to `info4u@firstexpertslogistics.com`.
   This is honest (no fake "submitted!" message) and works with zero infrastructure, but
   it does leave the sandbox — if you'd rather keep visitors on-page, wire either form
   to a service like Formspree/EmailJS, or a small backend endpoint, and swap the
   `wireForm()` function in `js/main.js`.
3. **No shipment tracking.** The live site doesn't have one either, and the brief is
   explicit that a tracking UI shouldn't pretend to be real without a backend behind it.
   Left off entirely rather than faked — happy to build it once there's a system to
   connect it to.
4. **Testimonials carried over from the live site as-is** — confirm consent is on file
   before relaunch (see COMPANY-FACTS.md).
5. **No real company photography yet** — see ASSET-SOURCES.md for exactly what to shoot
   first and how to drop it in.
6. **Only the 13 pages listed in sitemap.xml were built** (Home, Services, four
   dedicated service pages, Solutions, Routes, About, Insights, Quote, Contact, FAQ)
   plus a 404 — 14 files total. Not built: Privacy Policy / Terms (needs legal review,
   nothing to carry over from the live site), and a standalone Haulage page (folded
   into Door to Door — see COMPANY-FACTS.md for why).

## Not yet done (flag if you want these before launch)

- [ ] Real cross-browser test on iOS Safari (only checked in a Chromium-based renderer
      here) — pay particular attention to `100svh` support and the mobile menu
- [ ] Lighthouse / Core Web Vitals pass once real photography and a compiled Tailwind
      build are in place (CDN Tailwind will under-report performance right now)
- [ ] Legal review of Privacy Policy / Terms - not written yet, none existed on the live
      site to carry over

## Bugs found and fixed during QA (kept here for the record)

Caught by rendering every page headlessly and checking with JS both on and off — not
just written and assumed correct:

- Mobile burger icon was visible at desktop widths (a CSS specificity bug: `.icon-btn`
  was accidentally overriding `.nav-burger`'s `display:none`)
- Header "Contact" button and several inline text-links were invisible on dark
  backgrounds (dark-on-dark text — happened wherever `.btn-ghost` or `.text-link` sat on
  a dark section without the `.on-dark` modifier actually being wired up in CSS)
- A grid math error left an empty gap in the homepage service tiles
- Mobile nav overflowed off-screen at 390px width (too many elements fighting for space
  in the top bar)
- **The important one:** the scroll-reveal animation hid all content via CSS by
  default and only JS made it visible again — meaning a JS failure would've left large
  parts of every page permanently blank. Rebuilt so content is visible by default and
  JS only ever adds the hidden state, with a try/catch safety net

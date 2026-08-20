# COMPANY-FACTS.md — First Experts Logistics

Every factual claim on the redesigned site traces back to a line in this file.
If you add copy that states a fact, add it here first with a source.

Status key: **VERIFIED** = confirmed on the current live site or official assets.
**UNVERIFIED** = not used anywhere on the redesigned site; flagged so nobody adds it later without checking.

---

## Company

| Fact | Status | Source |
|---|---|---|
| Legal/trading name: First Experts Logistics (Plc) | VERIFIED | firstexpertslogistics.com homepage, footer |
| Founded 2005 | VERIFIED | firstexpertslogistics.com/about.html |
| Became a Public Limited Liability Company in 2011 | VERIFIED | firstexpertslogistics.com/about.html |
| Tagline: "Total Logistics Solution" | VERIFIED | Company logo (uploaded asset) |
| Ships to 40+ countries | VERIFIED | firstexpertslogistics.com homepage |
| Industries served: Oil & Gas, Aviation, Telecoms, Manufacturing, Agencies, Government | VERIFIED | firstexpertslogistics.com/about.html |

## Services (six, confirmed directly by the client)

- Air Freight Consolidation — express/priority booking, real-time status updates, urgent/high-value handling
- Sea Freight — FCL & LCL, major global lanes, port handling + documentation
- Door to Door — pickup at origin to delivery at destination, one point of contact
- Customs Clearance — licensed clearance at Nigerian ports/airports, documentation handled
- **Haulage** — standalone road freight/trucking out of Lagos, domestic and cross-border, on its own or paired with Door to Door. Previously left out because it wasn't on the live site; the client has since confirmed this directly and asked for it to be built as its own service. Now built as `haulage.html`, with its own nav entry on Services, homepage tile, and quote-form option.
- **E-commerce Logistics** — import freight + customs + delivery packaged for online sellers (to their own warehouse, a fulfillment partner, or straight to customers). Also client-confirmed and newly built as `ecommerce.html`. No specific fulfillment-center count, courier-partner names, or order volumes are claimed anywhere — kept deliberately generic per the "don't invent facts" rule, since none of that has been verified.

**Visual balance (updated per your direction):** the homepage service section
originally gave Air Freight a larger "featured" tile than the other three, following
the brief's instruction that air freight deserves visual prominence given the airport
location. You corrected this — First Experts does substantial volume across all four
services, not primarily air — so all four are now shown at equal size and weight, in
the same order (Air, Sea, Door to Door, Customs), each with its own accent color so
they're still easy to tell apart at a glance.

## Locations (VERIFIED — firstexpertslogistics.com/contact.html)

- **Head Office:** 1, Murtala Muhammed International Airport Road, Opposite Hajji Camp, Lagos, Nigeria
- **Operation Base:** Room 004B, NAHCO Complex, Ikeja, Lagos, Nigeria

Note: the site states proximity to Murtala Muhammed International Airport via the head office address. No exact distance/travel time is stated anywhere and none should be invented (per brief §80).

## Contact (VERIFIED — firstexpertslogistics.com/contact.html)

- Mobile / WhatsApp: 0703 134 1072 (confirmed working — this is now the only phone number shown anywhere on the site)
- ~~Landline: 01-4534455~~ — removed everywhere at your request (no longer in use)
- Email: info4u@firstexpertslogistics.com

## Social (VERIFIED — live site footer + provided X/Twitter screenshot)

- Facebook: facebook.com/firstexpertslogistics
- LinkedIn: linkedin.com/company/first-expert-logistics
- Instagram: instagram.com/firstexpertslog
- TikTok: tiktok.com/@first.expert.logis
- X: x.com/firstexplog (handle @FirstExplog, confirmed via uploaded screenshot)

## People

- **Kareem Lateef — Managing Director.** VERIFIED, firstexpertslogistics.com/about.html. Bio: 13+ years in logistics and supply value chain, IATA member, University of Lagos graduate. Photo: user-provided (Nigerian-American Chamber of Commerce event), treated with a navy duotone finish for cohesion with the brand — recommend a plain studio headshot as a next step (see ASSET-SOURCES.md).
- No other named staff are published anywhere I could find. **Do not invent a headcount or additional team members.**

## Routes (VERIFIED — firstexpertslogistics.com/routes.html)

**Updated per your direction:** First Experts ships worldwide, not on a fixed set of
lanes — the routes shown on the Routes page (Lagos to Rotterdam, London, Dubai,
Shanghai, Accra, and the USA) are explicitly labelled as a handful of examples, not
the full list. "USA" is shown without "East Coast" or any other sub-region, since
you clarified coverage isn't limited to one part of the country. If there's a
specific phrase you'd prefer over "shown as examples — we ship worldwide," tell me
and I'll swap it in everywhere.

## Testimonials (CARRIED OVER, ORIGIN UNCONFIRMED)

Four testimonials (Adaeze O., Chinedu A., Funke B., Tunde K.) already appear on the live homepage. They're reused here as-is because they're already published — but I could not confirm who originally collected them or whether written consent to publish is on file. **Before this goes live, confirm consent is on file, or replace with testimonials you can verify.** The live site's "4.8 Client Reviews" stat and a broken "0+ Happy Clients" counter were **not** carried over — no source for either number could be found, and a blank counter reads as a live bug rather than a real stat.

## Explicitly NOT used (unverified — do not add without a source)

- Fleet size / vehicle count
- Warehouse count or square footage
- Total shipment volume / annual figures
- Airline or shipping-line partnership names
- Certifications or awards
- Total staff headcount
- Live shipment tracking (no backend exists — see QA-CHECKLIST.md)
- Any specific "minutes from the airport" claim

## Open questions for the team

1. Is `info4u@firstexpertslogistics.com` the right address to receive Quote and Contact form submissions, or should these route elsewhere?
2. Can we get 2–3 real operational photos (loading, warehouse, office) to replace the current line-art placeholder system? See ASSET-SOURCES.md.
3. Confirm consent is on file for the four testimonials before relaunch.
4. Is a live shipment tracker something you actually want to build (needs a backend), or should Tracking stay off the nav for now?
5. `solutions.html` maps the six verified industries to services generically ("best served by X") rather than citing specific past client work, since no industry case studies are verified. If you have real examples you can name, they'd strengthen that page considerably.

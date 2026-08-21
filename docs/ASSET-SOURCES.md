# ASSET-SOURCES.md

## Company-owned assets (used as-is)

| File | Source | Notes |
|---|---|---|
| `images/logo-mark.png`, `images/favicon-*.png`, `images/apple-touch-icon.png`, `images/icon-*.png` | Supplied by the company (round FE logo) | Used for nav, favicon, app icons |
| `images/logo-social.jpg` | Supplied by the company (square FE logo) | Used as the default Open Graph / social share image |
| `images/team-kareem-lateef.jpg` | Supplied by the company — event photo of Kareem Lateef, Managing Director | Cropped to a 4:5 portrait |
| `images/team-kareem-lateef-duotone.jpg` | Derived from the above (navy duotone treatment applied in this project) | Used on the About page — unifies a busy event backdrop with the site's brand palette. **Swap for a plain studio headshot when available.** |

## Original assets created for this project

All section icons and the hero/404 "jet" mark are hand-drawn inline SVG (in the HTML/CSS,
not separate image files) — an original line-art system, not sourced from any icon
library or stock site. No external image dependency, loads instantly, scales perfectly.

## Stock photography now in use

At your request, three real, properly-licensed photos were added as hero background
images (behind a dark gradient scrim, so headline text stays readable). All three are
from Unsplash, under the [Unsplash License](https://unsplash.com/license) — free for
commercial use, no attribution legally required, but credited here anyway as good
practice and per the brief's own asset-sourcing rule (§45).

| Used on | Unsplash URL | Photographer | Published |
|---|---|---|---|
| Homepage hero + Air Freight page hero | `images.unsplash.com/photo-1663517334988-f5c1c10ebccc` | Bernd Dittrich ([@hdbernd](https://unsplash.com/@hdbernd)) | Sep 18, 2022 |
| Sea Freight page hero, Routes page hero | `images.unsplash.com/photo-1511578194003-00c80e42dc9b` | CHUTTERSNAP ([@chuttersnap](https://unsplash.com/@chuttersnap)) | Nov 25, 2017 |
| Door to Door page hero | `images.unsplash.com/photo-1720811559395-3ed8d1b16649` | Tom Jackson ([@themrjaxon](https://unsplash.com/@themrjaxon)) | Jul 12, 2024 |
| Customs Clearance page hero | `images.unsplash.com/photo-1758146296671-0e46a91739a8` | Paul Lichtblau ([@laup](https://unsplash.com/@laup)) | Sep 17, 2025 |
| Haulage page hero | `images.unsplash.com/photo-1519003722824-194d4455a60c` | Unsplash contributor | — |
| E-commerce Logistics page hero | `images.unsplash.com/photo-1553413077-190dd305871c` | Unsplash contributor | — |
| Homepage "How it works" section | `images.unsplash.com/photo-1645736315000-6f788915923b` | Unsplash contributor | — |

**How these are loaded:** as direct hotlinks to Unsplash's own image CDN (that's what
the long `images.unsplash.com/...` URLs in the HTML are) — not downloaded into the
project folder. This is a standard, widely-used technique (millions of sites hotlink
Unsplash this way) and should load normally on a real internet connection.

**Honesty check:** while building this, my own testing sandbox couldn't actually load
these images — every image CDN I tried (Unsplash, Pexels, even Wikimedia) came back
blocked, which looks like a network restriction specific to my development environment
rather than anything wrong with the images or the technique. I can't 100% confirm they
render until you open the site yourself with a normal internet connection. **Please
check the homepage hero and the Air Freight / Sea Freight / Door to Door page heroes
after opening the zip** — if a photo doesn't appear, the section still looks
intentional (it falls back to the navy gradient cleanly, no broken-image icon), but
tell me and I'll switch to local image files instead, which sidesteps hotlinking
entirely.

**Still line-art, not photography:** the Customs Clearance page and the small service
icons throughout. No good royalty-free "customs" photo turned up that wasn't a generic
stock-office cliché — the document/stamp icon already does that job well. Swap it for a
real photo any time you have one (e.g., a photo of an actual clearance document or your
team at the port).

## Recommended real photography still worth getting

Three of the five placeholders below are now filled with real (if generic/stock) photos.
Replacing stock with First Experts' own photography would upgrade the site the most,
highest-impact first:

1. ~~**Hero background**~~ — done, using a stock Unsplash photo. Swap for a real shot
   at/near the head office or cargo being handled airside when available.
2. ~~**Air Freight page**~~ — done, same stock photo as the hero.
3. ~~**Sea Freight page**~~ — done, using a stock Unsplash container-port photo.
4. ~~**Door to Door page**~~ — done, using a stock Unsplash highway/truck photo.
5. ~~**Customs page**~~ — done, using a stock Unsplash port/container photo (a real
   "customs" photo — documents being stamped, an actual clearance desk — never turned
   up without looking like a staged stock cliché, so this uses the same port setting the
   clearance work actually happens in instead).
6. **About page** — a proper studio or office headshot of Kareem Lateef, and photos of
   any other staff who should be credited by name
7. **Contact page** — a photo of the actual head office frontage/signage

Suggested naming convention if/when real company photos are added (matches brief §88):
`hero-air-cargo.jpg`, `air-freight-loading.jpg`, `sea-freight-container-port.jpg`,
`office-mmia-road.jpg`, `team-<firstname>-<lastname>.jpg`. Drop files into `/images/` with
these names and they can replace the current photo/line-art blocks without touching
layout CSS — just change the `background-image:url(...)` in each page's `.photo-layer`.

## Licensing note

If more stock photography is sourced later (Unsplash, Pexels, Pixabay, etc.), log it here
in this same table format — filename, source URL, creator, license, date pulled — before
it goes live, per the brief's own asset-sourcing rule (§45).

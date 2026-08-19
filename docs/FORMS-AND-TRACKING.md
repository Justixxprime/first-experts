# FORMS-AND-TRACKING.md

Written for zero backend experience. If a term is unfamiliar, it's explained the
first time it shows up.

---

## Part 1 — Your Quote and Contact forms (already wired up)

### What "backend" even means

A normal website (HTML, CSS, JS — what this whole project is) only runs in the
visitor's browser. It cannot send an email or save anything by itself. To DO
something with a form submission (email it to you, save it somewhere), you need a
second computer program running somewhere else that the browser can talk to. That
second program is called a "backend." Building and hosting your own backend costs
money and requires ongoing maintenance (a server that has to stay online).

### The shortcut: Web3Forms

Web3Forms (web3forms.com) IS a backend — just one that already exists, that you
don't have to build or host. You get a free "Access Key" (a public code, safe to put
in your website's files), and your form sends its data to Web3Forms instead of to
your own server. Web3Forms receives it and emails it to you. That's the whole
service.

**Why this is safe:** the Access Key is meant to be public. It's not a password —
it just tells Web3Forms which account should receive the email. Nobody can do
anything harmful with it except send YOU emails through YOUR form (and Web3Forms has
spam protection built in).

### Setting it up (5 minutes, no coding)

1. Go to **web3forms.com** and click "Get Access Key" (or similar wording on their
   homepage).
2. Enter the email address where you want form submissions to arrive — probably
   `info4u@firstexpertslogistics.com`.
3. Check that inbox — Web3Forms emails you an Access Key, a string that looks like
   `a1b2c3d4-e5f6-...`.
4. Open `js/main.js` in VS Code. Near the top-middle of the file, find this line:
   ```
   const WEB3FORMS_ACCESS_KEY = "PASTE_YOUR_WEB3FORMS_ACCESS_KEY_HERE";
   ```
5. Replace the text between the quotes with your real key, so it looks like:
   ```
   const WEB3FORMS_ACCESS_KEY = "a1b2c3d4-e5f6-...";
   ```
6. Save the file. That's it — the Quote and Contact forms now email you directly,
   with an in-page "Thank you" message instead of opening the visitor's email app.

**Until you do this**, the forms still work — they fall back to opening the
visitor's email app with the message pre-filled (the old behavior). Nothing is ever
broken either way.

---

## Part 2 — Shipment tracking: your questions, answered plainly

You asked three things: (1) explain tracking, (2) can you use a free API, (3) why
not build your own API. Taking them in order.

### First: what would "real tracking" actually require?

A tracker where a customer types a tracking number and sees a status needs one
thing above all else: **somewhere the current status of each shipment is stored**,
that the website can read. That's it. Everything else — the pretty progress bar,
the "Booked → In Transit → Delivered" steps — is just decoration on top of that one
core thing: a place to store and read status.

The question is only ever: **where does that "somewhere" live, and how does your
team update it?**

### Option A — A free API from a shipping carrier (DHL, Maersk, etc.)

This is what "free API" usually means in logistics: DHL, FedEx, Maersk and others
publish APIs that let you look up a tracking number **on their own network** — i.e.
a shipment they themselves are physically carrying, with a tracking number they
issued.

**This will not work for First Experts**, and here's exactly why: First Experts
isn't the carrier. You're the freight forwarder — you book space with an airline or
shipping line, and THEY move the physical cargo. Even if you got free API access
from, say, Maersk, it would only tell you about shipments that specifically travel
on a Maersk vessel with a Maersk-issued container number. It couldn't track your
air freight, your road transport, or any leg of the journey you handle directly.
There's no single free API that covers "everything First Experts ships," because no
single carrier carries everything you ship.

### Option B — Build your own API

"API" sounds intimidating but it just means "a computer program other computers can
send requests to." Building one requires:

1. **A server** — a computer that's online 24/7, waiting for requests. (Costs
   money monthly, even a cheap one — this is the part that stops being "free.")
2. **A database** — organized storage for the tracking numbers and statuses.
3. **Code** — a program that takes a tracking number, looks it up in the database,
   and sends back the status.
4. **Someone to update the database** — every time a shipment's status changes,
   someone (you, or your ops team) has to go in and update it.

Steps 1–3 are the "build your own API" work. It's a real, learnable skill — but it's
weeks of learning, not an afternoon, if you're starting from zero. And step 4 is
identical work regardless of which option you pick — **there's no way around someone
manually updating a status somewhere**, because First Experts doesn't have a live
GPS feed from every truck, plane and ship. Given that, it's worth asking: can steps
1–3 be skipped entirely, while still solving step 4?

### Option C — The one I'd actually recommend: Google Sheets as your database

This gets you 90% of a real tracker with 0% of the backend work, for free, and your
team updates it the exact same way they'd update anything else: by editing a
spreadsheet.

**How it works, step by step:**

1. **You make a Google Sheet** with columns like:
   `Tracking Number | Status | Origin | Destination | Last Updated | Note`
2. **You publish it to the web as a CSV file.** This is a built-in Google Sheets
   feature (File → Share → Publish to web → choose "Comma-separated values"). Google
   gives you a public link to that CSV.
3. **The website's JavaScript downloads that CSV** every time someone uses the
   tracker, searches it for the tracking number the visitor typed in, and displays
   whatever's in that row.
4. **Whenever a shipment's status changes**, someone on your team opens the Google
   Sheet (on a phone or laptop, no coding) and edits one cell. The website reflects
   it within seconds — nothing to redeploy, nothing to code.

**Why this is the right trade-off for you specifically:** Option B (your own API)
is more "impressive" technically, but it solves a problem you don't have (needing a
server) while leaving unsolved the problem you DO have (someone has to type in
status updates by hand either way). The Google Sheet skips the part that costs money
and requires ongoing engineering, and keeps only the part that was always going to
require a human anyway.

**The honest limitations**, so you know what you're getting:
- It's not truly "live" — it updates whenever someone edits the sheet, not
  automatically from GPS or carrier data.
- The published CSV is technically viewable by anyone who has the link — so don't
  put customer names, phone numbers, or anything sensitive in that sheet. Tracking
  number + status + route is enough, and is what real tracking pages show anyway.
- It's reading a Google-hosted file over the internet, so it needs the visitor to
  be online (same as everything else on this site already).

### It's built. Here's exactly how to set it up (5 minutes, no coding)

The tracking page and lookup logic already exist — `tracking.html`. The only thing
left is connecting it to your own Google Sheet. Follow these steps in order.

**Step 1 — Create the sheet**

1. Go to **sheets.google.com** and create a new blank spreadsheet.
2. In row 1, type these column headers exactly (one per cell, left to right):
   `Tracking Number`, `Status`, `Origin`, `Destination`, `Last Updated`, `Note`
3. From row 2 down, add one row per shipment. Example:

   | Tracking Number | Status | Origin | Destination | Last Updated | Note |
   |---|---|---|---|---|---|
   | FE-24001 | In Transit | Lagos | London | 17 Aug 2026 | Departed MMIA on schedule |
   | FE-24002 | Delivered | Lagos | Accra | 15 Aug 2026 | Signed for by receiving warehouse |

   The **Status** column must be spelled as one of these six (capitalization
   doesn't matter, but the words do): `Booked`, `Picked Up`, `In Transit`,
   `Customs`, `Out for Delivery`, `Delivered`. That's what draws the little
   progress steps on the tracking page. Anything else in that column still
   displays, just without the step graphic.

**Step 2 — How you generate a tracking number**

There's no special generator — you just make one up per shipment, however you like.
A simple, consistent pattern works best, e.g. `FE-` followed by the year and a
running number: `FE-24001`, `FE-24002`, `FE-24003`... Give that number to the
customer (by email, WhatsApp, or on their invoice) when you book their shipment.
That's the same string they'll type into the tracking page.

**Step 3 — Publish the sheet as a CSV link**

1. In Google Sheets: **File → Share → Publish to web**.
2. In the first dropdown, select the specific sheet/tab (usually "Sheet1").
3. In the second dropdown, change **Web page** to **Comma-separated values (.csv)**.
4. Click **Publish**, confirm the dialog.
5. Copy the link it gives you — it looks like:
   `https://docs.google.com/spreadsheets/d/e/2PACX-.../pub?output=csv`

**Step 4 — Connect it to the website**

1. Open `tracking.html` in VS Code.
2. Near the top, find this line:
   ```
   window.TRACKING_SHEET_CSV_URL = "PASTE_YOUR_PUBLISHED_GOOGLE_SHEET_CSV_LINK_HERE";
   ```
3. Paste your link from Step 3 between the quotes. Save the file.

That's it — the tracking page is live.

### How a customer actually uses it

1. They go to **Track Shipment** in the nav (or `tracking.html` directly).
2. They type the tracking number you gave them and press **Track**.
3. The page downloads your published sheet, finds the row with a matching
   tracking number, and shows: the route, a step-by-step status bar, when it was
   last updated, and any note you added. If the number isn't in the sheet, they
   see a plain-language "not found" message with a link to contact you instead
   of a technical error.

### How YOU keep it updated

Whenever a shipment's status changes, open the Google Sheet (phone or laptop,
no login to any dev tool) and edit that row — change the Status cell, update
Last Updated, add a Note if useful. Save. The website reflects it within
seconds, next time someone loads the tracking page — nothing to redeploy, no
code involved, ever.

### Keep in mind

- Only put tracking number, status, route, and a short note in the sheet —
  never a customer's name, phone number, or email, since a published sheet is
  technically viewable by anyone with the link.
- If you ever want to stop tracking working (e.g., to redo the sheet), just
  put the placeholder text back in `TRACKING_SHEET_CSV_URL` — the page shows a
  friendly "not connected yet" message instead of erroring.

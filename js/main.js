/* First Experts Logistics — site behaviour
   Modular AND defensive: every block checks the DOM exists before touching
   it, AND every block is wrapped in its own try/catch. This means a bug or
   browser quirk in ANY one feature (say, the route filter) can never stop
   a completely unrelated feature (say, the mobile menu) from working —
   each block runs independently. See docs/QA-CHECKLIST.md. */

(() => {
  'use strict';

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Header: solid on scroll ---------- */
  try {
    const header = document.querySelector('.site-header');
    if (header) {
      const onScroll = () => {
        header.classList.toggle('is-scrolled', window.scrollY > 12);
      };
      onScroll();
      window.addEventListener('scroll', onScroll, { passive: true });
    }
  } catch (err) { /* header still shows, just won't solidify on scroll */ }

  /* ---------- Mobile menu ---------- */
  try {
    const menu = document.querySelector('.mobile-menu');
    const openBtn = document.querySelector('[data-menu-open]');
    const closeBtn = document.querySelector('[data-menu-close]');
    if (menu && openBtn && closeBtn) {
      const focusable = () => menu.querySelectorAll('a, button');
      const open = () => {
        menu.classList.add('is-open');
        document.body.classList.add('menu-open');
        openBtn.setAttribute('aria-expanded', 'true');
        const first = focusable()[0];
        if (first) first.focus();
      };
      const close = () => {
        menu.classList.remove('is-open');
        document.body.classList.remove('menu-open');
        openBtn.setAttribute('aria-expanded', 'false');
        openBtn.focus();
      };
      openBtn.addEventListener('click', open);
      closeBtn.addEventListener('click', close);
      menu.addEventListener('click', (e) => {
        if (e.target.tagName === 'A') close();
      });
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && menu.classList.contains('is-open')) close();
        if (e.key === 'Tab' && menu.classList.contains('is-open')) {
          const items = Array.from(focusable());
          if (!items.length) return;
          const first = items[0], last = items[items.length - 1];
          if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
          else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
        }
      });
    }
  } catch (err) { /* menu stays in its closed, hidden default state — see styles.css */ }

  /* ---------- Scroll reveal ----------
     Progressive enhancement, deliberately defensive: content is visible by
     default (see styles.css). We only ever ADD hiding — and if anything in
     this block throws, the catch immediately undoes it, so a script error
     can never leave a section permanently invisible. */
  try {
    const revealEls = document.querySelectorAll('[data-reveal]');
    if (revealEls.length) {
      revealEls.forEach((el, i) => {
        el.classList.add('reveal-init');
        el.style.setProperty('--i', i % 6);
      });
      if (reduceMotion || !('IntersectionObserver' in window)) {
        revealEls.forEach(el => el.classList.add('is-visible'));
      } else {
        const io = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible');
              io.unobserve(entry.target);
            }
          });
        }, { threshold: 0.14, rootMargin: '0px 0px -60px 0px' });
        revealEls.forEach(el => io.observe(el));
      }
    }
  } catch (err) {
    document.querySelectorAll('[data-reveal]').forEach(el => el.classList.remove('reveal-init'));
  }

  /* ---------- Animated stat counters (verified figures only) ---------- */
  try {
    const counters = document.querySelectorAll('[data-count]');
    if (counters.length) {
      const animate = (el) => {
        const target = parseInt(el.dataset.count, 10);
        const suffix = el.dataset.suffix || '';
        if (reduceMotion || isNaN(target)) { el.textContent = target + suffix; return; }
        const dur = 1200;
        const start = performance.now();
        const step = (now) => {
          const p = Math.min(1, (now - start) / dur);
          const eased = 1 - Math.pow(1 - p, 3);
          el.textContent = Math.round(eased * target) + suffix;
          if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      };
      const io2 = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) { animate(entry.target); io2.unobserve(entry.target); }
        });
      }, { threshold: 0.6 });
      counters.forEach(el => io2.observe(el));
    }
  } catch (err) { /* counters already show their real static value in the HTML */ }

  /* ---------- Route filter (Routes page) ---------- */
  try {
    const filterWrap = document.querySelector('[data-route-filter]');
    if (filterWrap) {
      const buttons = filterWrap.querySelectorAll('button');
      const rows = document.querySelectorAll('[data-route-mode]');
      buttons.forEach(btn => {
        btn.addEventListener('click', () => {
          buttons.forEach(b => b.setAttribute('aria-pressed', 'false'));
          btn.setAttribute('aria-pressed', 'true');
          const mode = btn.dataset.filter;
          rows.forEach(row => {
            const show = mode === 'all' || row.dataset.routeMode === mode;
            row.classList.toggle('is-hidden', !show);
          });
        });
      });
    }
  } catch (err) { /* the full route table still shows, unfiltered */ }

  /* ---------- Quote / Contact forms: Web3Forms ----------
     Web3Forms (web3forms.com) is a free service that emails you a form
     submission with zero backend of your own — you just POST to their API
     with a public "access key". Get your own free key at web3forms.com and
     paste it below. Until you do, forms fall back to a mailto: link so
     nothing is ever broken — see docs/FORMS-AND-TRACKING.md for the full
     walkthrough (written in plain steps, no coding background assumed). */
  const WEB3FORMS_ACCESS_KEY = "f97268d1-0ecc-4300-9146-91b038ce3c4c";
  const COMPANY_EMAIL = 'info4u@firstexpertslogistics.com';

  try {
    const wireForm = (form) => {
      const status = form.querySelector('.form-status');
      const submitBtn = form.querySelector('button[type="submit"]');

      const showStatus = (msg) => {
        if (!status) return;
        status.textContent = msg;
        status.classList.add('is-visible');
      };

      form.addEventListener('submit', async (e) => {
        e.preventDefault();

        let valid = true;
        form.querySelectorAll('[required]').forEach((input) => {
          const field = input.closest('.field');
          if (!field) return;
          const ok = input.type === 'email'
            ? /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value)
            : input.value.trim().length > 0;
          field.classList.toggle('has-error', !ok);
          if (!ok) valid = false;
        });
        if (!valid) {
          showStatus('Please fill in the highlighted fields before sending.');
          return;
        }

        const hasKey = WEB3FORMS_ACCESS_KEY && !WEB3FORMS_ACCESS_KEY.startsWith('PASTE_');
        if (!hasKey) {
          const data = new FormData(form);
          const lines = [];
          data.forEach((value, key) => { if (value) lines.push(`${key}: ${value}`); });
          const subject = encodeURIComponent(form.dataset.subject || 'Website enquiry - First Experts Logistics');
          const body = encodeURIComponent(lines.join('\n'));
          showStatus('Opening your email app with this request pre-filled - send it to reach our team directly.');
          window.location.href = `mailto:${COMPANY_EMAIL}?subject=${subject}&body=${body}`;
          return;
        }

        if (submitBtn) submitBtn.disabled = true;
        showStatus('Sending...');
        try {
          const data = new FormData(form);
          data.append('access_key', WEB3FORMS_ACCESS_KEY);
          data.append('subject', form.dataset.subject || 'Website enquiry - First Experts Logistics');
          const res = await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            body: data,
            headers: { 'Accept': 'application/json' }
          });
          const result = await res.json();
          if (result.success) {
            const nameField = form.querySelector('input[name="Full name"], input[name="Name"]');
            const params = new URLSearchParams({
              name: nameField ? nameField.value.split(' ')[0] : '',
              type: form.dataset.thankYouType || 'message'
            });
            window.location.href = `thank-you.html?${params.toString()}`;
            return;
          } else {
            showStatus('Something went wrong sending that. Please try again, or email ' + COMPANY_EMAIL + ' directly.');
          }
        } catch (err) {
          showStatus('Could not reach the server - check your connection, or email ' + COMPANY_EMAIL + ' directly.');
        } finally {
          if (submitBtn) submitBtn.disabled = false;
        }
      });
    };
    document.querySelectorAll('[data-mailto-form]').forEach(wireForm);
  } catch (err) { /* forms remain visible; only the submit handler is affected */ }

  /* ---------- Footer year + years-in-service (computed, not invented) ---------- */
  try {
    const yearEl = document.querySelector('[data-current-year]');
    if (yearEl) yearEl.textContent = new Date().getFullYear();
    const serviceEl = document.querySelector('[data-years-service]');
    if (serviceEl) serviceEl.textContent = new Date().getFullYear() - 2005;
  } catch (err) { /* static fallback text already in the HTML */ }

  /* ---------- Hero "SCROLL" indicator: a real tap target ---------- */
  try {
    const scrollBtn = document.querySelector('[data-scroll-next]');
    if (scrollBtn) {
      scrollBtn.addEventListener('click', () => {
        const hero = scrollBtn.closest('section');
        const next = hero ? hero.nextElementSibling : null;
        (next || document.body).scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
      });
    }
  } catch (err) { /* the indicator still shows, just isn't clickable */ }

  /* ---------- FAQ accordions: only one open at a time, per section ----------
     Native <details> already supports this via a shared "name" attribute in
     modern browsers — this just groups each page's FAQ items by their
     immediate wrapping container, so opening one closes the others in that
     same list without affecting unrelated FAQ groups elsewhere on the page. */
  try {
    const groupIds = new Map();
    let counter = 0;
    document.querySelectorAll('details').forEach((el) => {
      const parent = el.parentElement;
      if (!groupIds.has(parent)) groupIds.set(parent, 'faq-group-' + (counter++));
      el.name = groupIds.get(parent);
    });
  } catch (err) { /* each FAQ item still opens/closes independently */ }

  /* ---------- Shipment tracking (tracking.html only) ----------
     Reads a published Google Sheet CSV — no backend of any kind. See
     docs/FORMS-AND-TRACKING.md for the full plain-English setup guide. */
  try {
    const trackForm = document.getElementById('track-form');
    if (trackForm) {
      const STATUS_STEPS = ['Booked', 'Picked Up', 'In Transit', 'Customs', 'Out for Delivery', 'Delivered'];
      const statusBox = document.getElementById('track-status');
      const resultBox = document.getElementById('track-result');

      const parseCSV = (text) => {
        // Small, dependency-free CSV parser that handles quoted fields
        // containing commas — good enough for a Google Sheets export.
        const rows = [];
        let row = [], field = '', inQuotes = false;
        for (let i = 0; i < text.length; i++) {
          const c = text[i], next = text[i + 1];
          if (inQuotes) {
            if (c === '"' && next === '"') { field += '"'; i++; }
            else if (c === '"') { inQuotes = false; }
            else { field += c; }
          } else {
            if (c === '"') inQuotes = true;
            else if (c === ',') { row.push(field); field = ''; }
            else if (c === '\n' || c === '\r') {
              if (c === '\r' && next === '\n') i++;
              row.push(field); field = '';
              if (row.length > 1 || row[0] !== '') rows.push(row);
              row = [];
            } else { field += c; }
          }
        }
        if (field !== '' || row.length) { row.push(field); rows.push(row); }
        if (!rows.length) return [];
        const headers = rows[0].map(h => h.trim().toLowerCase());
        return rows.slice(1).map(r => {
          const obj = {};
          headers.forEach((h, i) => { obj[h] = (r[i] || '').trim(); });
          return obj;
        });
      };

      const renderTimeline = (currentStatus) => {
        const idx = STATUS_STEPS.findIndex(s => s.toLowerCase() === (currentStatus || '').toLowerCase());
        const el = document.getElementById('tr-timeline');
        el.innerHTML = '';
        el.classList.add('tr-track');

        const lineBg = document.createElement('div');
        lineBg.className = 'tr-line-bg';
        el.appendChild(lineBg);

        if (idx >= 0) {
          const fillPct = (idx / (STATUS_STEPS.length - 1)) * 100;
          const lineFill = document.createElement('div');
          lineFill.className = 'tr-line-fill';
          lineFill.style.width = fillPct + '%';
          el.appendChild(lineFill);
        }

        STATUS_STEPS.forEach((step, i) => {
          const reached = idx >= 0 && i <= idx;
          const isCurrent = idx >= 0 && i === idx;
          const wrap = document.createElement('div');
          wrap.className = 'tr-step' + (reached ? ' is-reached' : '') + (isCurrent ? ' is-current' : '');
          wrap.innerHTML = `
            <span class="tr-dot"></span>
            <p class="tr-label">${step.toUpperCase()}</p>
          `;
          el.appendChild(wrap);
        });
        if (idx < 0 && currentStatus) {
          el.innerHTML = `<p class="body">Status on file: <strong>${currentStatus}</strong></p>`;
        }
      };

      trackForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const input = document.getElementById('tracking-number');
        const query = (input.value || '').trim();
        resultBox.style.display = 'none';
        statusBox.textContent = '';
        if (!query) return;

        const csvUrl = window.TRACKING_SHEET_CSV_URL;
        if (!csvUrl || csvUrl.startsWith('PASTE_')) {
          statusBox.innerHTML = 'Tracking isn\u2019t connected yet on this copy of the site \u2014 see <code>docs/FORMS-AND-TRACKING.md</code> to set it up in a few minutes. In the meantime, message us on <a href="https://wa.me/2347031341072" class="text-link">WhatsApp</a> with your tracking number.';
          return;
        }

        statusBox.textContent = 'Looking up your shipment...';
        try {
          const res = await fetch(csvUrl, { cache: 'no-store' });
          if (!res.ok) throw new Error('fetch failed');
          const text = await res.text();
          const rows = parseCSV(text);
          const match = rows.find(r => (r['tracking number'] || r['trackingnumber'] || '').toLowerCase() === query.toLowerCase());

          if (!match) {
            statusBox.textContent = `Tracking number "${query}" not found. Double-check the number, or contact us and we'll look it up directly.`;
            return;
          }

          statusBox.textContent = '';
          document.getElementById('tr-number').textContent = 'Tracking · ' + query.toUpperCase();
          const origin = match['origin'] || '';
          const destination = match['destination'] || '';
          document.getElementById('tr-route').textContent = origin && destination ? `${origin} → ${destination}` : 'Shipment status';
          renderTimeline(match['status'] || '');
          const updated = match['last updated'] || match['lastupdated'] || '';
          document.getElementById('tr-updated').textContent = updated ? `Last updated: ${updated}` : '';
          document.getElementById('tr-note').textContent = match['note'] || '';
          resultBox.style.display = 'block';
        } catch (err) {
          statusBox.textContent = 'Could not reach the tracking sheet right now \u2014 check your connection and try again, or contact us directly.';
        }
      });
    }
  } catch (err) { /* the tracking form still shows; only lookup is affected */ }

  /* ---------- Scroll parallax on photo backgrounds ----------
     Background-image divs only (.hero-photo, .photo-layer), shifted via
     background-position rather than transform, so this never fights the
     existing Ken Burns scale animation (which already owns `transform`
     on these same elements). Skipped entirely on reduced motion. */
  try {
    if (!reduceMotion) {
      const parallaxEls = Array.from(document.querySelectorAll('.hero-photo, .photo-layer'));
      if (parallaxEls.length) {
        let ticking = false;
        const update = () => {
          const vh = window.innerHeight;
          parallaxEls.forEach((el) => {
            const rect = el.getBoundingClientRect();
            const centerOffset = (rect.top + rect.height / 2) - vh / 2;
            const shift = Math.max(-14, Math.min(14, centerOffset * 0.04));
            el.style.backgroundPosition = `center calc(50% + ${shift}px)`;
          });
          ticking = false;
        };
        const onScroll = () => {
          if (!ticking) { requestAnimationFrame(update); ticking = true; }
        };
        update();
        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onScroll);
      }
    }
  } catch (err) { /* photo backgrounds stay centered — no parallax, no harm */ }

  /* ---------- Magnetic primary buttons (desktop, fine pointer only) ----------
     A subtle pull toward the cursor within the button's own bounds, reset
     on mouse leave. Skipped on touch devices and reduced motion entirely —
     this is pure flourish, never a functional dependency. */
  try {
    const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (canHover && !reduceMotion) {
      document.querySelectorAll('.btn-primary').forEach((btn) => {
        btn.addEventListener('mousemove', (e) => {
          const rect = btn.getBoundingClientRect();
          const x = (e.clientX - rect.left - rect.width / 2) * 0.28;
          const y = (e.clientY - rect.top - rect.height / 2) * 0.35;
          btn.style.transform = `translate(${x}px, ${y - 1}px)`;
        });
        btn.addEventListener('mouseleave', () => {
          btn.style.transform = '';
        });
      });
    }
  } catch (err) { /* buttons remain fully usable with their normal CSS hover state */ }

  /* ---------- Air Freight flight-path animation (air-freight.html only) ----------
     Adds a plane riding the existing route-pulse path via SMIL
     animateMotion — additive only (the static path/dots already render
     from the HTML itself without this), and skipped on reduced motion. */
  try {
    if (!reduceMotion) {
      const path = document.querySelector('[data-flight-path]');
      const plane = document.querySelector('[data-flight-plane]');
      if (path && plane) {
        const NS = 'http://www.w3.org/2000/svg';
        const anim = document.createElementNS(NS, 'animateMotion');
        anim.setAttribute('dur', '4.2s');
        anim.setAttribute('repeatCount', 'indefinite');
        anim.setAttribute('rotate', 'auto');
        anim.setAttribute('begin', '1.6s');
        const mpath = document.createElementNS(NS, 'mpath');
        mpath.setAttributeNS('http://www.w3.org/1999/xlink', 'href', '#' + path.id);
        anim.appendChild(mpath);
        plane.appendChild(anim);
        plane.style.opacity = '1';
      }
    }
  } catch (err) { /* the static path and destination dot still show, just no riding plane */ }

  /* ---------- Contextual WhatsApp pre-filled messages ----------
     Every wa.me/2347031341072 link on the site (footer, hero CTA) gets a
     pre-filled message matching the page it's on, so someone tapping
     WhatsApp from the Haulage page doesn't land in a blank chat having to
     explain from scratch what they're asking about. Purely additive —
     if this fails, the links still work exactly as before, just without
     the pre-filled text. */
  try {
    const WA_MESSAGES = {
      'index.html': "Hi, I'd like to request a shipping quote.",
      '': "Hi, I'd like to request a shipping quote.",
      'air-freight.html': "Hi, I'd like a quote for Air Freight.",
      'sea-freight.html': "Hi, I'd like a quote for Sea Freight.",
      'door-to-door.html': "Hi, I'd like a quote for Door to Door delivery.",
      'customs.html': "Hi, I'd like help with Customs Clearance.",
      'haulage.html': "Hi, I'd like a quote for Haulage.",
      'ecommerce.html': "Hi, I'd like to talk about E-commerce Logistics.",
      'routes.html': "Hi, I have a question about one of your shipping routes.",
      'tracking.html': "Hi, I need help tracking a shipment.",
      'quote.html': "Hi, I'd like to request a shipping quote.",
      'contact.html': "Hi, I'd like to get in touch.",
      'services.html': "Hi, I have a question about your services.",
      'solutions.html': "Hi, I have a question about your services.",
      'faq.html': "Hi, I have a question.",
      'about.html': "Hi, I have a question about First Experts Logistics.",
    };
    const path = (window.location.pathname.split('/').pop() || 'index.html');
    const msg = WA_MESSAGES[path] || "Hi, I have a question about your services.";
    const encoded = encodeURIComponent(msg);
    document.querySelectorAll('a[href^="https://wa.me/2347031341072"]').forEach((a) => {
      const href = a.getAttribute('href');
      if (href.indexOf('?') === -1) a.setAttribute('href', href + '?text=' + encoded);
    });
  } catch (err) { /* WhatsApp links still work, just open to a blank chat */ }

  /* ---------- Sticky mobile quote bar ----------
     Appears once someone scrolls past the first screen, mobile only (CSS
     hides it entirely at desktop widths — see .sticky-quote-bar). Not
     shown on quote.html or thank-you.html, where it would just repeat
     the page's own primary action. */
  try {
    const path = (window.location.pathname.split('/').pop() || 'index.html');
    if (path !== 'quote.html' && path !== 'thank-you.html' && path !== '404.html') {
      const waLink = document.querySelector('a[href^="https://wa.me/2347031341072"]');
      const waHref = waLink ? waLink.getAttribute('href') : 'https://wa.me/2347031341072';

      const bar = document.createElement('div');
      bar.className = 'sticky-quote-bar';
      bar.innerHTML = `
        <a href="quote.html" class="btn btn-primary">Request a Quote</a>
        <a href="${waHref}" class="btn btn-ghost on-dark" target="_blank" rel="noopener">WhatsApp</a>
      `;
      document.body.appendChild(bar);

      let ticking = false;
      const update = () => {
        bar.classList.toggle('is-visible', window.scrollY > window.innerHeight * 0.6);
        ticking = false;
      };
      window.addEventListener('scroll', () => {
        if (!ticking) { requestAnimationFrame(update); ticking = true; }
      }, { passive: true });
      update();
    }
  } catch (err) { /* the page's own in-content CTAs still work fine without this */ }

  /* ---------- Quick quote starter (index.html) ----------
     Builds a query string from the compact homepage form and sends the
     person to the real quote form with those answers already filled in.
     Deliberately does NOT compute or display any price — there's no rate
     engine behind this site, and showing a number here would be a fact
     nobody could stand behind. It only removes retyping. */
  try {
    const qqForm = document.getElementById('quick-quote-form');
    if (qqForm) {
      qqForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const mode = document.getElementById('qq-mode').value;
        const origin = document.getElementById('qq-origin').value.trim();
        const destination = document.getElementById('qq-destination').value.trim();
        const weight = document.getElementById('qq-weight').value.trim();
        const params = new URLSearchParams();
        if (mode) params.set('mode', mode);
        if (origin) params.set('origin', origin);
        if (destination) params.set('destination', destination);
        if (weight) params.set('weight', weight);
        const qs = params.toString();
        window.location.href = 'quote.html' + (qs ? '?' + qs : '');
      });
    }
  } catch (err) { /* the quick-quote card just won't redirect; the full quote form on quote.html still works directly */ }

  /* ---------- Quote form pre-fill from URL (quote.html) ----------
     Reads the query string the homepage quick-quote card builds (or
     anyone else linking in the same format) and fills the matching
     fields on the real form. Nothing here is required — the form works
     completely normally with no query string at all. */
  try {
    const params = new URLSearchParams(window.location.search);
    if ([...params.keys()].length) {
      const mode = params.get('mode');
      if (mode) {
        const radio = document.querySelector(`input[name="Shipping mode"][value="${CSS.escape(mode)}"]`);
        if (radio) radio.checked = true;
      }
      const origin = document.getElementById('origin');
      if (origin && params.get('origin')) origin.value = params.get('origin');
      const destination = document.getElementById('destination');
      if (destination && params.get('destination')) destination.value = params.get('destination');
      const weight = document.getElementById('weight');
      if (weight && params.get('weight')) weight.value = params.get('weight');
    }
  } catch (err) { /* the form still loads blank and fully usable */ }

  /* ---------- Scroll progress indicator ---------- */
  try {
    const bar = document.createElement('div');
    bar.className = 'scroll-progress';
    document.body.appendChild(bar);
    let ticking = false;
    const update = () => {
      const h = document.documentElement;
      const scrolled = h.scrollTop;
      const max = h.scrollHeight - h.clientHeight;
      const pct = max > 0 ? (scrolled / max) * 100 : 0;
      bar.style.width = pct + '%';
      ticking = false;
    };
    window.addEventListener('scroll', () => {
      if (!ticking) { requestAnimationFrame(update); ticking = true; }
    }, { passive: true });
    window.addEventListener('resize', update);
    update();
  } catch (err) { /* purely decorative; the page scrolls fine without it */ }

  /* ---------- Cursor-spotlight on cards (desktop, fine pointer only) ----------
     Adds the .spotlight-card class to every .plate / .service-tile on the
     page and tracks the mouse position relative to each one via CSS
     custom properties. Touch devices never run this at all — no glow,
     no cost, and the cards look and work exactly as before. */
  try {
    const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (canHover) {
      document.querySelectorAll('.plate, .service-tile').forEach((card) => {
        card.classList.add('spotlight-card');
        card.addEventListener('mousemove', (e) => {
          const rect = card.getBoundingClientRect();
          card.style.setProperty('--mx', (e.clientX - rect.left) + 'px');
          card.style.setProperty('--my', (e.clientY - rect.top) + 'px');
        });
      });
    }
  } catch (err) { /* cards remain fully usable, just without the hover glow */ }

  /* ---------- Door to Door scroll-driven journey (door-to-door.html only) ----------
     Fills the connecting line as the container scrolls through the middle
     of the viewport, lighting up each dot once the fill reaches it.
     Purely visual — the steps and their text are already fully readable
     without any of this running. */
  try {
    if (!reduceMotion) {
      const track = document.querySelector('[data-journey]');
      const fill = document.querySelector('[data-journey-fill]');
      if (track && fill) {
        const steps = Array.from(track.querySelectorAll('.journey-step'));
        let ticking = false;
        const update = () => {
          const rect = track.getBoundingClientRect();
          const vh = window.innerHeight;
          const progress = Math.max(0, Math.min(1, (vh * 0.75 - rect.top) / rect.height));
          fill.style.height = (progress * 100) + '%';
          steps.forEach((s, i) => {
            const threshold = i / Math.max(1, steps.length - 1);
            s.classList.toggle('is-reached', progress >= threshold - 0.02);
          });
          ticking = false;
        };
        window.addEventListener('scroll', () => {
          if (!ticking) { requestAnimationFrame(update); ticking = true; }
        }, { passive: true });
        update();
      }
    }
  } catch (err) { /* the journey list still reads fine as plain static steps */ }

  /* ---------- Live utility strip: exchange rates + network pulse (index.html) ----------
     Both widgets are independent — either can succeed or fail on its own,
     and the whole strip only reveals itself once at least one of them has
     real data to show. Neither ever displays a fabricated number: the FX
     rates come straight from Frankfurter's live response, and the network
     pulse is a genuine count of rows in the same tracking sheet already
     used by the Tracking page — nothing computed or estimated. */
  try {
    const strip = document.querySelector('[data-live-strip]');
    if (strip) {
      let anySucceeded = false;

      const revealStrip = () => {
        if (anySucceeded) strip.style.display = '';
      };

      // --- Exchange rates ---
      (async () => {
        try {
          const cacheKey = 'fe-fx-cache-v1';
          const cached = sessionStorage.getItem(cacheKey);
          let rates;
          if (cached) {
            rates = JSON.parse(cached);
          } else {
            const res = await fetch('https://api.frankfurter.dev/v2/latest?base=USD&symbols=NGN,GBP,EUR', { cache: 'no-store' });
            if (!res.ok) throw new Error('fx fetch failed');
            const data = await res.json();
            rates = data.rates;
            sessionStorage.setItem(cacheKey, JSON.stringify(rates));
          }
          const el = document.getElementById('fx-rates');
          const fmt = (n) => n.toLocaleString('en-US', { maximumFractionDigits: 2, minimumFractionDigits: 2 });
          const pairs = [
            ['USD → NGN', rates.NGN],
            ['USD → GBP', rates.GBP],
            ['USD → EUR', rates.EUR],
          ].filter(([, v]) => typeof v === 'number');
          if (el && pairs.length) {
            el.innerHTML = pairs.map(([label, v]) => `
              <div class="fx-row"><span class="pair">${label}</span><span class="rate">${fmt(v)}</span></div>
            `).join('');
            anySucceeded = true;
            revealStrip();
          }
        } catch (err) { /* fx-rates block just stays empty; the other widget can still show */ }
      })();

      // --- Network pulse (reuses the tracking sheet, not a new data source) ---
      (async () => {
        try {
          const csvUrl = window.TRACKING_SHEET_CSV_URL;
          if (!csvUrl || csvUrl.startsWith('PASTE_')) return;
          const res = await fetch(csvUrl, { cache: 'no-store' });
          if (!res.ok) throw new Error('sheet fetch failed');
          const text = await res.text();

          const parseCSV = (t) => {
            const rows = [];
            let row = [], field = '', inQuotes = false;
            for (let i = 0; i < t.length; i++) {
              const c = t[i], next = t[i + 1];
              if (inQuotes) {
                if (c === '"' && next === '"') { field += '"'; i++; }
                else if (c === '"') { inQuotes = false; }
                else { field += c; }
              } else {
                if (c === '"') inQuotes = true;
                else if (c === ',') { row.push(field); field = ''; }
                else if (c === '\n' || c === '\r') {
                  if (c === '\r' && next === '\n') i++;
                  row.push(field); field = '';
                  if (row.length > 1 || row[0] !== '') rows.push(row);
                  row = [];
                } else { field += c; }
              }
            }
            if (field !== '' || row.length) { row.push(field); rows.push(row); }
            if (!rows.length) return [];
            const headers = rows[0].map(h => h.trim().toLowerCase());
            return rows.slice(1).map(r => {
              const obj = {};
              headers.forEach((h, i) => { obj[h] = (r[i] || '').trim(); });
              return obj;
            });
          };

          const rows = parseCSV(text);
          if (!rows.length) return;
          const norm = (s) => (s || '').toLowerCase();
          const inMotion = rows.filter(r => {
            const s = norm(r['status']);
            return s && s !== 'delivered';
          }).length;
          const delivered = rows.filter(r => norm(r['status']) === 'delivered').length;

          const el = document.getElementById('network-pulse');
          if (el) {
            el.innerHTML = `
              <div class="pulse-stat"><span class="num"><span class="pulse-dot"></span>${inMotion}</span><span class="label">Shipments in motion</span></div>
              <div class="pulse-stat"><span class="num">${delivered}</span><span class="label">Delivered</span></div>
              <div class="pulse-stat"><span class="num">${rows.length}</span><span class="label">Total tracked</span></div>
            `;
            anySucceeded = true;
            revealStrip();
          }
        } catch (err) { /* network-pulse block just stays empty; the other widget can still show */ }
      })();
    }
  } catch (err) { /* the live strip section stays hidden; everything else on the page is unaffected */ }

  /* ---------- Light/dark reading mode toggle ----------
     The <html data-theme> attribute is already set on load by the small
     inline script in <head> (reads localStorage before first paint, so
     there's no flash of the wrong theme). This just wires the button to
     flip it and remember the choice for next time. */
  try {
    const toggle = document.querySelector('[data-theme-toggle]');
    if (toggle) {
      toggle.setAttribute('aria-pressed', document.documentElement.getAttribute('data-theme') === 'dark' ? 'true' : 'false');
      toggle.addEventListener('click', () => {
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        if (isDark) {
          document.documentElement.removeAttribute('data-theme');
          toggle.setAttribute('aria-pressed', 'false');
          try { localStorage.setItem('fe-theme', 'light'); } catch (e) { /* preference just won't persist */ }
        } else {
          document.documentElement.setAttribute('data-theme', 'dark');
          toggle.setAttribute('aria-pressed', 'true');
          try { localStorage.setItem('fe-theme', 'dark'); } catch (e) { /* preference just won't persist */ }
        }
      });
    }
  } catch (err) { /* the site still displays correctly in its default light-section styling */ }

})();

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
        STATUS_STEPS.forEach((step, i) => {
          const reached = idx >= 0 && i <= idx;
          const wrap = document.createElement('div');
          wrap.style.cssText = 'flex:1;min-width:110px;padding:6px 10px 6px 0;';
          wrap.innerHTML = `
            <div style="width:10px;height:10px;border-radius:50%;margin-bottom:8px;background:${reached ? 'var(--color-brand)' : 'var(--color-line)'};"></div>
            <p style="font-family:var(--font-mono);font-size:11px;letter-spacing:.04em;color:${reached ? 'var(--color-ink)' : 'var(--color-muted)'};font-weight:${reached ? '600' : '400'};">${step.toUpperCase()}</p>
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

})();

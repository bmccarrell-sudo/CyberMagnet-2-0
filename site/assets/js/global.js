/* ============================================================
   CYBERMAGNET — GLOBAL.JS
   Shared JavaScript for the full CyberMagnet web ecosystem.
   Covers: All pages · Modular · Vanilla JS · No dependencies
   Version: 1.1 · Updated December 2025
   Changelog: Social proof numbers updated site-wide
   ============================================================ */

/* ============================================================
   TABLE OF CONTENTS
   1.  Utility Helpers
   2.  DOM Ready Wrapper
   3.  Navigation — Scroll State + Mobile Toggle
   4.  Smooth Scroll — Anchor Links
   5.  Scroll-Based Reveal Animations
   6.  Animated Counters
   7.  FAQ Accordion
   8.  Before/After Slider (Portfolio)
   9.  Testimonial Slider
   10. Form Enhancements
   11. CTA Micro-Interactions (Ripple + Glow)
   12. Reading Progress Bar (Blog)
   13. Table of Contents — Active Link Tracking (Blog)
   14. Newsletter Form
   15. Filter Pills (Blog + Portfolio)
   16. Search Filter (Blog)
   17. Urgency Banner Shimmer (Funnel)
   18. Init — Boot All Modules
   ============================================================ */


/* ============================================================
   1. UTILITY HELPERS
   ============================================================ */

/**
 * Shorthand for document.querySelector
 * @param {string} selector
 * @param {Element|Document} scope
 * @returns {Element|null}
 */
const qs = (selector, scope = document) => scope.querySelector(selector);

/**
 * Shorthand for document.querySelectorAll
 * @param {string} selector
 * @param {Element|Document} scope
 * @returns {NodeList}
 */
const qsa = (selector, scope = document) => scope.querySelectorAll(selector);

/**
 * Add event listener with optional options
 * @param {EventTarget} el
 * @param {string} event
 * @param {Function} handler
 * @param {object} [opts]
 */
const on = (el, event, handler, opts = {}) => {
  if (!el) return;
  el.addEventListener(event, handler, opts);
};

/**
 * Safe classList toggle — no-ops if el is null
 * @param {Element|null} el
 * @param {string} cls
 * @param {boolean} [force]
 */
const toggleClass = (el, cls, force) =>
  el && el.classList.toggle(cls, force);

/**
 * Clamp a number between min and max
 */
const clamp = (val, min, max) => Math.max(min, Math.min(max, val));


/* ============================================================
   2. DOM READY WRAPPER
   ============================================================ */

/**
 * Run callback when DOM is fully parsed.
 * Supports both DOMContentLoaded and already-ready states.
 * @param {Function} fn
 */
function onReady(fn) {
  if (document.readyState !== 'loading') {
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn, { once: true });
  }
}


/* ============================================================
   3. NAVIGATION — SCROLL STATE + MOBILE TOGGLE
   ============================================================ */

function initNav() {
  const nav    = qs('.site-nav') || qs('#main-nav') || qs('nav');
  const toggle = qs('.nav-toggle') || qs('.nav-ham');

  if (!nav) return;

  /* ── Scroll State ─────────────────────────────────────── */
  let lastScroll = 0;

  const handleNavScroll = () => {
    const scrollY = window.scrollY;
    toggleClass(nav, 'is-scrolled', scrollY > 40);
    toggleClass(nav, 'scrolled',    scrollY > 40);   // legacy alias
    lastScroll = scrollY;
  };

  on(window, 'scroll', handleNavScroll, { passive: true });
  handleNavScroll(); // run on load in case page is mid-scroll

  /* ── Mobile Toggle ────────────────────────────────────── */
  if (!toggle) return;

  toggle.setAttribute('aria-expanded', 'false');
  toggle.setAttribute('aria-label', 'Toggle navigation');

  on(toggle, 'click', () => {
    const isOpen = nav.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(isOpen));

    // Prevent body scroll when nav is open on mobile
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Close nav when clicking a link inside it (SPA-friendly)
  qsa('a', nav).forEach(link => {
    on(link, 'click', () => {
      nav.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });

  // Close nav when clicking outside
  on(document, 'click', (e) => {
    if (nav.classList.contains('is-open') && !nav.contains(e.target)) {
      nav.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  });
}


/* ============================================================
   4. SMOOTH SCROLL — ANCHOR LINKS
   ============================================================ */

function initSmoothScroll() {
  // Offset accounts for fixed header (urgency bar + nav)
  const getHeaderOffset = () => {
    const urgency = parseInt(
      getComputedStyle(document.documentElement)
        .getPropertyValue('--urgency-h') || '44', 10
    );
    const navH = parseInt(
      getComputedStyle(document.documentElement)
        .getPropertyValue('--nav-h') || '68', 10
    );
    return urgency + navH + 16; // 16px breathing room
  };

  on(document, 'click', (e) => {
    const anchor = e.target.closest('a[href^="#"]');
    if (!anchor) return;

    const href = anchor.getAttribute('href');
    if (!href || href === '#') return;

    const target = qs(href);
    if (!target) return;

    e.preventDefault();

    const top = target.getBoundingClientRect().top + window.scrollY - getHeaderOffset();
    window.scrollTo({ top, behavior: 'smooth' });

    // Update URL without triggering scroll
    if (history.pushState) {
      history.pushState(null, null, href);
    }
  });
}


/* ============================================================
   5. SCROLL-BASED REVEAL ANIMATIONS
   ============================================================ */

function initReveal() {
  const targets = qsa(
    '.reveal, .reveal-on-scroll, .animate-fade-in-up, .animate-soft-glow'
  );

  if (!targets.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible', 'visible');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.08,
      rootMargin: '0px 0px -28px 0px',
    }
  );

  targets.forEach((el) => observer.observe(el));
}


/* ============================================================
   6. ANIMATED COUNTERS
   ============================================================ */

/**
 * Animates a numeric counter from 0 to its target value.
 * Target is read from data-target attribute.
 * Optional data-suffix appends text after the number (e.g. "%", "M+").
 */
function animateCounter(el) {
  const target  = parseFloat(el.dataset.target || '0');
  const suffix  = el.dataset.suffix  || '';
  const prefix  = el.dataset.prefix  || '';
  const dur     = parseInt(el.dataset.duration || '2000', 10);
  const decimal = el.dataset.decimal || '';  // e.g. ".1" for "4.1×"

  const startTime = performance.now();

  const step = (now) => {
    const elapsed = now - startTime;
    const progress = clamp(elapsed / dur, 0, 1);
    // Ease-out cubic
    const ease = 1 - Math.pow(1 - progress, 3);
    const current = target * ease;

    el.textContent = prefix + Math.round(current) + (decimal && progress >= 1 ? decimal : '') + suffix;

    if (progress < 1) {
      requestAnimationFrame(step);
    } else {
      el.textContent = prefix + target + decimal + suffix;
    }
  };

  requestAnimationFrame(step);
}

function initCounters() {
  const counters = qsa('.counter, [data-counter]');
  if (!counters.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.35 }
  );

  counters.forEach((el) => observer.observe(el));
}


/* ============================================================
   7. FAQ ACCORDION
   ============================================================ */

function initFAQ() {
  const items = qsa('.faq-item');
  if (!items.length) return;

  items.forEach((item) => {
    const question = qs('.faq-question, .faq-q', item);
    const answer   = qs('.faq-answer, .faq-a',  item);

    if (!question) return;

    // Set ARIA attributes
    const id = `faq-answer-${Math.random().toString(36).slice(2, 8)}`;
    question.setAttribute('aria-expanded', 'false');
    question.setAttribute('role', 'button');
    question.setAttribute('tabindex', '0');
    if (answer) {
      answer.setAttribute('id', id);
      question.setAttribute('aria-controls', id);
    }

    const toggle = () => {
      const isOpen = item.classList.toggle('is-open', !item.classList.contains('is-open'));
      // Close all others
      items.forEach((other) => {
        if (other !== item) {
          other.classList.remove('is-open');
          const otherQ = qs('.faq-question, .faq-q', other);
          if (otherQ) otherQ.setAttribute('aria-expanded', 'false');
        }
      });
      question.setAttribute('aria-expanded', String(item.classList.contains('is-open')));
    };

    on(question, 'click',   toggle);
    on(question, 'keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggle();
      }
    });
  });
}


/* ============================================================
   8. BEFORE/AFTER SLIDER (PORTFOLIO)
   ============================================================ */

function initSliders() {
  const sliders = qsa('[data-slider], .before-after');
  if (!sliders.length) return;

  sliders.forEach((wrap) => {
    const afterEl  = qs('.ba-after',  wrap);
    const handleEl = qs('.ba-handle', wrap);

    if (!afterEl || !handleEl) return;

    let isDragging = false;

    const setPosition = (clientX) => {
      const rect = wrap.getBoundingClientRect();
      const pct  = clamp((clientX - rect.left) / rect.width * 100, 2, 98);

      afterEl.style.clipPath  = `inset(0 0 0 ${pct}%)`;
      handleEl.style.left     = `${pct}%`;
    };

    // Initialise at 50%
    afterEl.style.clipPath = 'inset(0 0 0 50%)';
    handleEl.style.left    = '50%';

    on(wrap,   'mousedown',  (e) => { isDragging = true; setPosition(e.clientX); e.preventDefault(); });
    on(wrap,   'touchstart', (e) => { isDragging = true; setPosition(e.touches[0].clientX); }, { passive: true });
    on(window, 'mousemove',  (e) => { if (isDragging) setPosition(e.clientX); });
    on(window, 'touchmove',  (e) => { if (isDragging) setPosition(e.touches[0].clientX); }, { passive: true });
    on(window, 'mouseup',    ()  => { isDragging = false; });
    on(window, 'touchend',   ()  => { isDragging = false; });
  });
}


/* ============================================================
   9. TESTIMONIAL SLIDER
   ============================================================ */

function initTestiSlider() {
  const sliders = qsa('[data-testi-slider]');
  if (!sliders.length) return;

  sliders.forEach((slider) => {
    const track  = qs('[data-testi-track]',  slider);
    const prev   = qs('[data-testi-prev]',   slider);
    const next   = qs('[data-testi-next]',   slider);
    const dots   = qsa('[data-testi-dot]',   slider);

    if (!track) return;

    const cards   = Array.from(track.children);
    let current   = 0;
    let autoTimer = null;

    const getVisible = () => {
      if (window.innerWidth < 640)  return 1;
      if (window.innerWidth < 1024) return 2;
      return 3;
    };

    const maxIndex = () => Math.max(0, cards.length - getVisible());

    const goTo = (index) => {
      current = clamp(index, 0, maxIndex());
      const cardW = cards[0] ? cards[0].offsetWidth + parseInt(getComputedStyle(track).gap || '22', 10) : 0;
      track.style.transform = `translateX(-${current * cardW}px)`;
      track.style.transition = 'transform 0.55s cubic-bezier(0.4, 0, 0.2, 1)';

      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === current);
        dot.setAttribute('aria-selected', String(i === current));
      });
    };

    const advance = () => goTo(current >= maxIndex() ? 0 : current + 1);

    // Controls
    if (next) on(next, 'click', () => { goTo(current + 1); resetAuto(); });
    if (prev) on(prev, 'click', () => { goTo(current - 1); resetAuto(); });

    dots.forEach((dot, i) => {
      on(dot, 'click', () => { goTo(i); resetAuto(); });
    });

    // Auto-advance
    const startAuto = () => { autoTimer = setInterval(advance, 4200); };
    const resetAuto = () => { clearInterval(autoTimer); startAuto(); };

    on(slider, 'mouseenter', () => clearInterval(autoTimer));
    on(slider, 'mouseleave', startAuto);

    // Touch swipe
    let touchStartX = 0;
    on(track, 'touchstart', (e) => { touchStartX = e.touches[0].clientX; }, { passive: true });
    on(track, 'touchend',   (e) => {
      const diff = touchStartX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 40) diff > 0 ? goTo(current + 1) : goTo(current - 1);
      resetAuto();
    });

    startAuto();
    goTo(0);
  });
}


/* ============================================================
   10. FORM ENHANCEMENTS
   ============================================================ */

function initForms() {
  /* ── Active state on focus ─────────────────────────────── */
  qsa('input, textarea, select').forEach((field) => {
    on(field, 'focus', () => field.classList.add('is-active'));
    on(field, 'blur',  () => field.classList.remove('is-active'));
  });

  /* ── Light client-side validation ─────────────────────── */
  qsa('form[data-validate]').forEach((form) => {
    on(form, 'submit', (e) => {
      let valid = true;

      qsa('[required]', form).forEach((field) => {
        const isEmpty = !field.value.trim();
        const isEmail = field.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value);

        const invalid = isEmpty || isEmail;
        field.classList.toggle('is-error', invalid);
        if (invalid) valid = false;

        // Clear error on input
        on(field, 'input', () => field.classList.remove('is-error'), { once: true });
      });

      if (!valid) {
        e.preventDefault();
        // Scroll to first error
        const firstError = qs('.is-error', form);
        if (firstError) {
          firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
          firstError.focus({ preventScroll: true });
        }
      }
    });
  });

  /* ── Newsletter opt-in ─────────────────────────────────── */
  const nlForm     = qs('#nl-form');
  const nlWrap     = qs('#nl-form-wrap');
  const nlSuccess  = qs('#nl-success');

  if (nlForm) {
    on(nlForm, 'submit', (e) => {
      e.preventDefault();
      const emailInput = qs('input[type="email"]', nlForm);
      const email = emailInput ? emailInput.value.trim() : '';

      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        if (emailInput) {
          emailInput.classList.add('is-error');
          on(emailInput, 'input', () => emailInput.classList.remove('is-error'), { once: true });
        }
        return;
      }

      /*
       * ── INTEGRATION POINT ─────────────────────────────────
       * Replace this block with your email provider integration:
       *
       * Option A — Web3Forms (free, recommended):
       *   fetch('https://api.web3forms.com/submit', {
       *     method: 'POST',
       *     headers: { 'Content-Type': 'application/json' },
       *     body: JSON.stringify({ access_key: 'YOUR_KEY', email })
       *   });
       *
       * Option B — Mailchimp embed form (no JS needed — use embed code)
       * Option C — ConvertKit inline form
       * ────────────────────────────────────────────────────────
       */

      if (nlWrap)    nlWrap.style.display    = 'none';
      if (nlSuccess) {
        nlSuccess.style.display = 'flex';
        nlSuccess.classList.add('animate-fade-in-up');
      }
    });
  }
}


/* ============================================================
   11. CTA MICRO-INTERACTIONS (RIPPLE + GLOW)
   ============================================================ */

function initCTAInteractions() {
  qsa('.btn-primary, .btn-fire, .btn-submit').forEach((btn) => {

    on(btn, 'click', (e) => {
      // Create ripple element
      const ripple = document.createElement('span');
      const rect   = btn.getBoundingClientRect();
      const size   = Math.max(rect.width, rect.height);
      const x      = e.clientX - rect.left - size / 2;
      const y      = e.clientY - rect.top  - size / 2;

      Object.assign(ripple.style, {
        position:      'absolute',
        width:         `${size}px`,
        height:        `${size}px`,
        left:          `${x}px`,
        top:           `${y}px`,
        background:    'rgba(255,255,255,0.22)',
        borderRadius:  '50%',
        transform:     'scale(0)',
        pointerEvents: 'none',
        transition:    'transform 0.55s ease, opacity 0.55s ease',
        opacity:       '1',
      });

      // Ensure button has position:relative for ripple to sit inside
      if (getComputedStyle(btn).position === 'static') {
        btn.style.position = 'relative';
      }
      btn.style.overflow = 'hidden';
      btn.appendChild(ripple);

      // Trigger animation
      requestAnimationFrame(() => {
        ripple.style.transform = 'scale(2.5)';
        ripple.style.opacity   = '0';
      });

      // Clean up
      setTimeout(() => ripple.remove(), 600);
    });
  });
}


/* ============================================================
   12. READING PROGRESS BAR (BLOG)
   ============================================================ */

function initReadingProgress() {
  const fill        = qs('#rp-fill');
  const sidebarFill = qs('#sidebar-fill');
  const progressPct = qs('#progress-text');
  const article     = qs('#article, .blog-content, article');

  if (!fill || !article) return;

  const update = () => {
    const rect      = article.getBoundingClientRect();
    const scrolled  = Math.max(0, -rect.top);
    const total     = article.offsetHeight - window.innerHeight;
    const pct       = total > 0 ? clamp(Math.round(scrolled / total * 100), 0, 100) : 0;

    fill.style.width = `${pct}%`;
    if (sidebarFill)  sidebarFill.style.width = `${pct}%`;
    if (progressPct)  progressPct.textContent  = `${pct}%`;
  };

  on(window, 'scroll', update, { passive: true });
  update();
}


/* ============================================================
   13. TABLE OF CONTENTS — ACTIVE LINK TRACKING (BLOG)
   ============================================================ */

function initTOC() {
  const tocLinks = qsa('.toc-link, .toc-list a');
  if (!tocLinks.length) return;

  // Collect section IDs from TOC links
  const sectionIds = Array.from(tocLinks)
    .map((link) => link.getAttribute('href')?.replace('#', ''))
    .filter(Boolean);

  const update = () => {
    let active = sectionIds[0];

    sectionIds.forEach((id) => {
      const el = qs(`#${id}`);
      if (el && el.getBoundingClientRect().top < 180) {
        active = id;
      }
    });

    tocLinks.forEach((link) => {
      const href = link.getAttribute('href')?.replace('#', '');
      link.classList.toggle('is-active', href === active);
      link.classList.toggle('active',    href === active); // legacy alias
    });
  };

  on(window, 'scroll', update, { passive: true });
  update();
}


/* ============================================================
   14. FILTER PILLS (BLOG + PORTFOLIO)
   ============================================================ */

function initFilterPills() {
  const filterGroups = qsa('[data-filter-group]');

  filterGroups.forEach((group) => {
    const pills   = qsa('.filter-pill', group);
    const targets = qsa('[data-cat]');

    pills.forEach((pill) => {
      on(pill, 'click', () => {
        // Update active pill
        pills.forEach((p) => p.classList.remove('active'));
        pill.classList.add('active');

        const cat = pill.dataset.cat || 'all';

        targets.forEach((card) => {
          const cardCat = card.dataset.cat;
          const show    = cat === 'all' || cardCat === cat;
          card.style.display = show ? '' : 'none';
        });

        // Update post count if present
        const countEl = qs('#post-count, [data-post-count]');
        if (countEl) {
          const visible = cat === 'all'
            ? targets.length
            : [...targets].filter((c) => c.dataset.cat === cat).length;
          countEl.textContent = `Showing ${visible} articles`;
        }
      });
    });
  });

  /* Also handle ungrouped filter pills (e.g. blog index standalone) */
  const standalonePills = qsa('.filter-pill:not([data-filter-group] .filter-pill)');
  if (!standalonePills.length) return;

  const allTargets = qsa('#posts-grid .post-card, [data-cat]');

  standalonePills.forEach((pill) => {
    on(pill, 'click', () => {
      standalonePills.forEach((p) => p.classList.remove('active'));
      pill.classList.add('active');

      const cat = pill.dataset.cat || 'all';

      allTargets.forEach((card) => {
        const match = cat === 'all' || card.dataset.cat === cat;
        card.style.display = match ? '' : 'none';
      });

      const countEl = qs('#post-count, [data-post-count]');
      if (countEl) {
        const visible = cat === 'all'
          ? allTargets.length
          : [...allTargets].filter((c) => c.dataset.cat === cat).length;
        countEl.textContent = `Showing ${visible} articles`;
      }
    });
  });
}


/* ============================================================
   15. SEARCH FILTER (BLOG)
   ============================================================ */

function initSearch() {
  const input = qs('#search-input, [data-search]');
  if (!input) return;

  const cards = qsa('#posts-grid .post-card, [data-searchable]');

  on(input, 'input', () => {
    const q = input.value.toLowerCase().trim();

    cards.forEach((card) => {
      const title   = qs('.pc-title, [data-search-title]',   card)?.textContent.toLowerCase() || '';
      const excerpt = qs('.pc-excerpt, [data-search-excerpt]', card)?.textContent.toLowerCase() || '';
      card.style.display = (!q || title.includes(q) || excerpt.includes(q)) ? '' : 'none';
    });
  });
}


/* ============================================================
   16. LOAD MORE BUTTON (BLOG)
   ============================================================ */

function initLoadMore() {
  const btn = qs('#load-more-btn, [data-load-more]');
  if (!btn) return;

  on(btn, 'click', () => {
    const original = btn.textContent;
    btn.textContent = 'Loading...';

    /*
     * ── INTEGRATION POINT ─────────────────────────────────
     * Replace the timeout below with a real fetch/pagination call.
     * On success, append new .post-card elements to #posts-grid,
     * then re-run initReveal() to animate the new cards in.
     * ────────────────────────────────────────────────────────
     */
    setTimeout(() => {
      btn.textContent = 'All articles loaded';
      btn.disabled    = true;
      btn.style.opacity = '0.5';
      btn.style.cursor  = 'default';
    }, 900);
  });
}


/* ============================================================
   17. CANVAS PARTICLE BACKGROUND (HERO)
   ============================================================ */

function initParticleCanvas(canvasId = 'hero-canvas') {
  const canvas = qs(`#${canvasId}`);
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let W, H, pts = [];

  const resize = () => {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
    pts = [];
    const n = Math.min(Math.floor(W * H / 13000), 72);
    for (let i = 0; i < n; i++) {
      pts.push({
        x:  Math.random() * W,
        y:  Math.random() * H,
        r:  Math.random() * 1.3 + 0.3,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
        a:  Math.random() * 0.4 + 0.07,
      });
    }
  };

  const draw = () => {
    ctx.clearRect(0, 0, W, H);

    // Connection lines
    for (let i = 0; i < pts.length; i++) {
      for (let j = i + 1; j < pts.length; j++) {
        const dx = pts[i].x - pts[j].x;
        const dy = pts[i].y - pts[j].y;
        const d  = Math.hypot(dx, dy);
        if (d < 115) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(0,123,255,${(1 - d / 115) * 0.08})`;
          ctx.lineWidth   = 0.7;
          ctx.moveTo(pts[i].x, pts[i].y);
          ctx.lineTo(pts[j].x, pts[j].y);
          ctx.stroke();
        }
      }
    }

    // Dots
    for (const p of pts) {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0,123,255,${p.a})`;
      ctx.fill();

      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > W) p.vx *= -1;
      if (p.y < 0 || p.y > H) p.vy *= -1;
    }

    requestAnimationFrame(draw);
  };

  on(window, 'resize', resize);
  resize();
  draw();
}


/* ============================================================
   18. SHARE BUTTON — COPY TO CLIPBOARD
   ============================================================ */

function initShareButtons() {
  qsa('[data-share-copy], .share-btn-copy').forEach((btn) => {
    on(btn, 'click', async () => {
      const url = btn.dataset.url || window.location.href;
      try {
        await navigator.clipboard.writeText(url);
        const original = btn.textContent;
        btn.textContent = '✓ Copied!';
        setTimeout(() => { btn.textContent = original; }, 2200);
      } catch {
        // Fallback — select a hidden input
        const dummy = document.createElement('input');
        dummy.value = url;
        document.body.appendChild(dummy);
        dummy.select();
        document.execCommand('copy');
        dummy.remove();
      }
    });
  });
}


/* ============================================================
   19. URGENCY BANNER AUTO-INIT
   ============================================================ */

function initUrgencyBanner() {
  /* The urgency banner is CSS-animated; no JS needed for the shimmer.
     This module handles optional countdown or slot-counter updates. */

  const slotCount = qs('[data-slot-count]');
  if (!slotCount) return;

  // Example: read from a data attribute and decrement over sessions
  // (Replace with real backend data in production)
  const stored = sessionStorage.getItem('cm_slots');
  const slots  = stored ? parseInt(stored, 10) : parseInt(slotCount.dataset.slotCount || '3', 10);
  slotCount.textContent = slots;
}


/* ============================================================
   20. INIT — BOOT ALL MODULES
   ============================================================ */

onReady(() => {
  // Core — runs on every page
  initNav();
  initSmoothScroll();
  initReveal();
  initCounters();
  initCTAInteractions();

  // Component-specific — safe to init everywhere (no-ops if elements absent)
  initFAQ();
  initSliders();
  initTestiSlider();
  initForms();
  initFilterPills();
  initSearch();
  initLoadMore();
  initShareButtons();
  initUrgencyBanner();

  // Canvas particle background
  initParticleCanvas('hero-canvas');

  // Blog-specific
  initReadingProgress();
  initTOC();
});

/* ── Export for module environments ─────────────────────── */
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    qs, qsa, on, onReady, clamp,
    initNav, initSmoothScroll, initReveal, initCounters,
    initFAQ, initSliders, initTestiSlider, initForms,
    initFilterPills, initSearch, initLoadMore,
    initReadingProgress, initTOC, initParticleCanvas,
    animateCounter,
  };
}

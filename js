/* ═══════════════════════════════════════════════════════
   NIGREDIA — SHARED JS
═══════════════════════════════════════════════════════ */

/* ── PAGE LOADER ─────────────────────────────────────── */
(function () {
  const loader = document.getElementById('page-loader');
  if (!loader) return;

  // On load: enter animation (logo appears then fades)
  document.body.classList.add('loading-active');
  loader.classList.add('state-enter');

  // After 2.9s, hide loader and unlock scroll
  setTimeout(() => {
    loader.style.opacity = '0';
    loader.style.pointerEvents = 'none';
    document.body.classList.remove('loading-active');
  }, 2900);

  // Intercept all internal page links
  document.addEventListener('click', function (e) {
    const link = e.target.closest('a[href]');
    if (!link) return;
    const href = link.getAttribute('href');
    // Only internal .html links (not anchors, not external)
    if (!href || href.startsWith('#') || href.startsWith('http') || href.startsWith('mailto') || href.startsWith('tel')) return;
    e.preventDefault();

    // Reset loader for leave animation
    loader.style.opacity = '';
    loader.style.pointerEvents = '';
    loader.classList.remove('state-enter');
    loader.classList.add('state-leave');

    setTimeout(() => {
      window.location.href = href;
    }, 550);
  });
})();

/* ── CUSTOM CURSOR ───────────────────────────────────── */
(function () {
  const cur  = document.getElementById('cursor');
  const ring = document.getElementById('cursor-ring');
  if (!cur || !ring) return;

  let mx = 0, my = 0, rx = 0, ry = 0;
  document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });

  function tick() {
    cur.style.left = mx + 'px';
    cur.style.top  = my + 'px';
    rx += (mx - rx) * .13;
    ry += (my - ry) * .13;
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';
    requestAnimationFrame(tick);
  }
  tick();

  document.addEventListener('mouseover', e => {
    if (e.target.closest('a, button')) document.body.classList.add('cursor-hover');
  });
  document.addEventListener('mouseout', e => {
    if (e.target.closest('a, button')) document.body.classList.remove('cursor-hover');
  });
})();

/* ── NAVBAR SCROLL ───────────────────────────────────── */
(function () {
  const nav = document.getElementById('navbar');
  if (!nav) return;
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 30);
  }, { passive: true });
})();

/* ── HAMBURGER ───────────────────────────────────────── */
function toggleMenu() {
  const h = document.getElementById('ham');
  const m = document.getElementById('mobile-menu');
  if (!h || !m) return;
  h.classList.toggle('open');
  m.classList.toggle('open');
  document.body.style.overflow = m.classList.contains('open') ? 'hidden' : '';
}
function closeMenu() {
  const h = document.getElementById('ham');
  const m = document.getElementById('mobile-menu');
  if (h) h.classList.remove('open');
  if (m) m.classList.remove('open');
  document.body.style.overflow = '';
}

/* ── LANGUAGE SWITCHER ───────────────────────────────── */
(function () {
  const saved = localStorage.getItem('nigredia-lang') || 'en';
  applyLang(saved, false);
})();

function setLang(lang) {
  applyLang(lang, true);
  localStorage.setItem('nigredia-lang', lang);
}

function applyLang(lang, animate) {
  const body = document.body;
  if (lang === 'gr') {
    body.classList.add('lang-gr');
  } else {
    body.classList.remove('lang-gr');
  }
  // All lang buttons on page
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });
  // Update html lang
  document.documentElement.lang = lang === 'gr' ? 'el' : 'en';
}

/* ── SCROLL REVEAL ───────────────────────────────────── */
(function () {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
  els.forEach(el => obs.observe(el));
})();

/* ── ACTIVE NAV LINK ─────────────────────────────────── */
(function () {
  const current = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(a => {
    const href = a.getAttribute('href') || '';
    if (href === current || (current === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });
})();


/* ------------------------
   Small helpers & DOM
   ------------------------ */
const qs = (s) => document.querySelector(s);
const qsa = (s) => Array.from(document.querySelectorAll(s));

/* NAV toggle for mobile */
const navToggle = qs('#navToggle');
const mainNav = qs('#mainNav');

navToggle.addEventListener('click', () => {
  mainNav.classList.toggle('open');
});

/* Smooth scroll for in-page links */
qsa('a[href^="#"]').forEach(a => {
  a.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (!href || href === '#') return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // Close mobile nav after click
      if (mainNav.classList.contains('open')) mainNav.classList.remove('open');
    }
  });
});

/* Footer year */
const yearEl = qs('#year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

/* CONTACT FORM - simple validation and fake submit */
const contactForm = qs('#contactForm');
const formMessage = qs('#formMessage');
if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const name = qs('#name').value.trim();
    const email = qs('#email').value.trim();
    const message = qs('#message').value.trim();
    if (!name || !email || !message) {
      formMessage.textContent = 'Please fill all fields before sending.';
      formMessage.style.color = '#b91c1c';
      return;
    }
    // Fake submit: In production, replace with fetch() to server endpoint.
    formMessage.textContent = 'Thanks — your message has been recorded. We will contact you on WhatsApp or email shortly.';
    formMessage.style.color = '#075985';
    contactForm.reset();
  });
}

/* ------------------------
   Carousel (3 slides, 3s each)
   ------------------------ */
(function carousel() {
  const slides = qsa('.hero .slide');
  const prevBtn = qs('#prevSlide');
  const nextBtn = qs('#nextSlide');
  if (!slides.length) return;

  let idx = 0;
  const total = slides.length;
  const intervalMs = 3000; // 3 seconds
  let timer = null;

  function show(i) {
    slides.forEach((s, si) => {
      s.classList.toggle('active', si === i);
    });
    idx = i;
  }

  function next() { show((idx + 1) % total); }
  function prev() { show((idx - 1 + total) % total); }

  // Auto-advance
  function start() {
    stop();
    timer = setInterval(next, intervalMs);
  }
  function stop() {
    if (timer) { clearInterval(timer); timer = null; }
  }

  // start carousel
  start();

  // controls
  if (prevBtn) prevBtn.addEventListener('click', () => { prev(); start(); });
  if (nextBtn) nextBtn.addEventListener('click', () => { next(); start(); });

  // pause on hover (desktop)
  const carouselEl = qs('.hero-carousel');
  if (carouselEl) {
    carouselEl.addEventListener('mouseenter', stop);
    carouselEl.addEventListener('mouseleave', start);
  }

  // ensure accessibility: allow arrow keys to change slide when focused
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') { next(); start(); }
    if (e.key === 'ArrowLeft') { prev(); start(); }
  });

})();

/* Minor: close nav when clicking outside on mobile */
document.addEventListener('click', (e) => {
  const insideNav = e.target.closest('#mainNav') || e.target.closest('#navToggle');
  if (!insideNav && mainNav.classList.contains('open')) {
    mainNav.classList.remove('open');
  }
});

  // Current year
    document.getElementById('year').textContent = new Date().getFullYear();

     // FAQ accordion
    document.querySelectorAll('.accordion').forEach(acc => {
      const btn = acc.querySelector('button');
      const panel = acc.querySelector('.panel');
      btn.addEventListener('click', ()=>{
        const open = panel.style.display === 'block';
        panel.style.display = open ? 'none' : 'block';
        btn.setAttribute('aria-expanded', (!open).toString());
      });
    });
    
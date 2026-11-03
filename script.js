/* Asia Awareness Conference 2027 — script.js
   Small progressive enhancements. The page works fully without JavaScript. */
(function () {
  'use strict';

  /* Mobile nav toggle --------------------------------------------------- */
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('site-nav');
  if (toggle && nav) {
    var setOpen = function (open) {
      toggle.setAttribute('aria-expanded', String(open));
      nav.classList.toggle('is-open', open);
    };
    toggle.addEventListener('click', function () {
      setOpen(toggle.getAttribute('aria-expanded') !== 'true');
    });
    // Close after choosing a link
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) setOpen(false);
    });
    // Escape closes the menu and returns focus to the toggle
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
        setOpen(false);
        toggle.focus();
      }
    });
  }

  /* Sticky mobile Register button --------------------------------------
     Hidden while the hero CTAs or the registration section are on screen,
     so it never duplicates a visible Register button. */
  var sticky = document.querySelector('[data-sticky-cta]');
  var watched = [document.querySelector('.hero .cta-group'), document.getElementById('register')]
    .filter(Boolean);
  if (sticky && watched.length && 'IntersectionObserver' in window) {
    var visible = new Set();
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) visible.add(entry.target);
        else visible.delete(entry.target);
      });
      sticky.classList.toggle('is-hidden', visible.size > 0);
    });
    watched.forEach(function (el) { io.observe(el); });
  }

  /* Move focus to in-page targets so keyboard and screen reader users land
     where the link points (smooth scrolling is handled by CSS). */
  document.addEventListener('click', function (e) {
    var link = e.target.closest('a[href^="#"]');
    if (!link) return;
    var id = link.getAttribute('href').slice(1);
    var target = id && document.getElementById(id);
    if (!target) return;
    if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1');
    // Wait a frame so the browser's own scroll happens first.
    requestAnimationFrame(function () { target.focus({ preventScroll: true }); });
  });

  /* Footer year --------------------------------------------------------- */
  var year = document.querySelector('[data-year]');
  if (year) year.textContent = String(new Date().getFullYear());
})();

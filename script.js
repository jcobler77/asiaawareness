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

  /* Rotating hero photos -------------------------------------------------
     Crossfades every 7s. Has a pause/play button (WCAG 2.2.2), starts paused
     for people who prefer reduced motion, and stops while the tab is hidden
     or the hero has scrolled out of view. */
  var slideLayer = document.querySelector('[data-hero-slides]');
  var slides = slideLayer ? Array.prototype.slice.call(slideLayer.querySelectorAll('.hero-slide')) : [];
  var toggleBtn = document.querySelector('[data-hero-toggle]');
  var toggleLabel = document.querySelector('[data-hero-toggle-label]');
  if (slides.length > 1 && toggleBtn) {
    var INTERVAL = 7000;
    var current = 0;
    var timer = null;
    var userPaused = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var heroVisible = true;

    var show = function (index) {
      slides[current].classList.remove('is-active');
      current = (index + slides.length) % slides.length;
      var slide = slides[current];
      // Make sure a lazy image is fetched before it fades in.
      var img = slide.querySelector('img');
      if (img && img.loading === 'lazy') img.loading = 'eager';
      slide.classList.add('is-active');
      // Warm up the next image so the following fade is smooth.
      var next = slides[(current + 1) % slides.length].querySelector('img');
      if (next && next.loading === 'lazy') next.loading = 'eager';
    };

    var stop = function () { clearInterval(timer); timer = null; };
    var start = function () {
      if (timer || userPaused || !heroVisible || document.hidden) return;
      timer = setInterval(function () { show(current + 1); }, INTERVAL);
    };
    var syncButton = function () {
      toggleBtn.setAttribute('data-paused', String(userPaused));
      if (toggleLabel) toggleLabel.textContent = userPaused ? 'Play photo slideshow' : 'Pause photo slideshow';
    };

    toggleBtn.addEventListener('click', function () {
      userPaused = !userPaused;
      syncButton();
      if (userPaused) stop(); else { show(current + 1); start(); }
    });
    document.addEventListener('visibilitychange', function () {
      if (document.hidden) stop(); else start();
    });
    var hero = document.getElementById('top');
    if (hero && 'IntersectionObserver' in window) {
      new IntersectionObserver(function (entries) {
        heroVisible = entries[0].isIntersecting;
        if (heroVisible) start(); else stop();
      }).observe(hero);
    }
    syncButton();
    start();
  }

  /* Footer year --------------------------------------------------------- */
  var year = document.querySelector('[data-year]');
  if (year) year.textContent = String(new Date().getFullYear());
})();

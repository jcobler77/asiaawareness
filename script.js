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

  /* In-page links (menu, buttons) ---------------------------------------
     We do the scroll ourselves instead of leaving it to the browser.
     Letting the browser scroll and then moving focus (for keyboard and
     screen reader users) races the smooth scroll, and Safari and Firefox
     can cancel the scroll when focus moves mid-animation. Here focus only
     moves after the scroll has finished. */
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.addEventListener('click', function (e) {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    var link = e.target.closest('a[href^="#"]');
    if (!link) return;
    var id = decodeURIComponent(link.getAttribute('href').slice(1));
    var target = id && document.getElementById(id);
    if (!target) return;
    e.preventDefault();

    var smooth = !reduceMotion;
    target.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto', block: 'start' });
    if (history.pushState) history.pushState(null, '', '#' + id);

    var moved = false;
    var moveFocus = function () {
      if (moved) return;
      moved = true;
      if (!target.hasAttribute('tabindex') && !/^(A|BUTTON|INPUT|SELECT|TEXTAREA|SUMMARY)$/.test(target.tagName)) {
        target.setAttribute('tabindex', '-1');
      }
      try { target.focus({ preventScroll: true }); } catch (err) { /* very old browsers */ }
    };
    if (smooth && 'onscrollend' in window) window.addEventListener('scrollend', moveFocus, { once: true });
    setTimeout(moveFocus, smooth ? 1000 : 0);   // fallback when scrollend isn't supported or never fires
  });

  /* Footer year --------------------------------------------------------- */
  var year = document.querySelector('[data-year]');
  if (year) year.textContent = String(new Date().getFullYear());
})();

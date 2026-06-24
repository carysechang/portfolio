(function () {
  'use strict';

  var overlay, img, closeBtn, previousFocus, previousOverflow;

  function create() {
    overlay = document.createElement('div');
    overlay.className = 'poster-lightbox-overlay';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-label', 'Poster viewer');

    closeBtn = document.createElement('button');
    closeBtn.className = 'poster-lightbox-close';
    closeBtn.setAttribute('aria-label', 'Close');
    closeBtn.textContent = '\u00D7';

    img = document.createElement('img');
    img.className = 'poster-lightbox-img';
    img.alt = '';

    overlay.appendChild(closeBtn);
    overlay.appendChild(img);
    document.body.appendChild(overlay);

    overlay.addEventListener('click', function (e) {
      if (e.target === overlay || e.target === closeBtn) close();
    });
    closeBtn.addEventListener('click', close);
  }

  function posterContainer(el) {
    return el.closest('.project-detail__poster');
  }

  function posterImage(el) {
    var container = posterContainer(el);
    if (!container) return null;
    return container.querySelector('img.project-poster, img.lozad, img');
  }

  function resolvePosterSrc(el) {
    var container = posterContainer(el);
    if (container && container.dataset.posterSrc) {
      return container.dataset.posterSrc;
    }

    var target = posterImage(el);
    if (!target) return '';

    var picture = target.closest('picture');
    if (picture) {
      var source = picture.querySelector('source[type="image/png"], source[type="image/jpeg"], source[type="image/webp"]');
      if (source && source.srcset) {
        return source.srcset.split(',')[0].trim().split(' ')[0];
      }
    }

    var src = target.currentSrc || target.getAttribute('data-src') || target.src;
    if (src && src.indexOf('data:image/gif') !== 0) {
      return src;
    }

    return '';
  }

  function openFromElement(el) {
    var src = resolvePosterSrc(el);
    if (!src) return;

    var target = posterImage(el);
    if (!overlay) create();
    previousFocus = document.activeElement;
    previousOverflow = document.body.style.overflow;
    img.src = src;
    img.alt = (target && target.alt) || 'Project poster';
    overlay.classList.add('poster-lightbox-active');
    document.body.style.overflow = 'hidden';
    closeBtn.focus();
    document.addEventListener('keydown', onKey);
  }

  function close() {
    if (!overlay) return;
    overlay.classList.remove('poster-lightbox-active');
    img.removeAttribute('src');
    document.body.style.overflow = previousOverflow || '';
    document.removeEventListener('keydown', onKey);
    if (previousFocus) previousFocus.focus();
  }

  function onKey(e) {
    if (e.key === 'Escape') close();
    if (e.key === 'Tab') {
      e.preventDefault();
      closeBtn.focus();
    }
  }

  function bindPosterLightbox() {
    document.addEventListener('click', function (e) {
      var trigger = e.target.closest('.project-poster-trigger, .project-poster-fullscreen');
      if (!trigger) return;
      e.preventDefault();
      openFromElement(trigger);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bindPosterLightbox);
  } else {
    bindPosterLightbox();
  }
})();

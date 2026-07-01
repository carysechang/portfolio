(function () {
  function getHeaderOffset() {
    var header = document.getElementById("header");
    return header ? header.offsetHeight + 8 : 0;
  }

  function isSamePageHashLink(link) {
    if (!link.hash || link.hash === "#") {
      return false;
    }

    var linkPath = link.pathname.replace(/\/$/, "");
    var pagePath = window.location.pathname.replace(/\/$/, "");
    return linkPath === pagePath || linkPath === "";
  }

  function closeMobileNav() {
    var navbar = document.getElementById("navbarSupportedContent");
    if (navbar && navbar.classList.contains("show")) {
      var toggler = document.querySelector(".navbar-toggler");
      if (toggler) {
        toggler.click();
      }
    }
  }

  function scrollToTarget(target, hash) {
    var startY = window.pageYOffset;
    var targetY = target.getBoundingClientRect().top + window.pageYOffset - getHeaderOffset();
    var distance = targetY - startY;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      window.scrollTo(0, targetY);
      if (hash) {
        history.pushState(null, "", hash);
      }
      return;
    }

    var duration = Math.min(650, Math.max(350, Math.abs(distance) * 0.5));
    var startTime = null;

    function step(timestamp) {
      if (startTime === null) {
        startTime = timestamp;
      }

      var elapsed = timestamp - startTime;
      var progress = Math.min(elapsed / duration, 1);
      window.scrollTo(0, startY + distance * progress);

      if (progress < 1) {
        requestAnimationFrame(step);
        return;
      }

      if (hash) {
        history.pushState(null, "", hash);
      }
    }

    requestAnimationFrame(step);
  }

  document.addEventListener("click", function (event) {
    var link = event.target.closest('a[href*="#"]');
    if (!link || !isSamePageHashLink(link)) {
      return;
    }

    var target = document.querySelector(link.hash);
    if (!target) {
      return;
    }

    event.preventDefault();
    closeMobileNav();
    scrollToTarget(target, link.hash);
  });
})();

(function () {
  function isDesktop() {
    return window.matchMedia("(min-width: 992px)").matches;
  }

  function initNavDropdown() {
    document.querySelectorAll(".nav-dropdown-hover").forEach(function (item) {
      var trigger = item.querySelector(".nav-dropdown-hover__trigger");
      if (!trigger) {
        return;
      }

      trigger.addEventListener("click", function (event) {
        if (isDesktop()) {
          return;
        }

        event.preventDefault();
        var open = item.classList.toggle("is-open");
        trigger.setAttribute("aria-expanded", open ? "true" : "false");
      });
    });

    window.addEventListener("resize", function () {
      if (isDesktop()) {
        document.querySelectorAll(".nav-dropdown-hover.is-open").forEach(function (item) {
          item.classList.remove("is-open");
          var trigger = item.querySelector(".nav-dropdown-hover__trigger");
          if (trigger) {
            trigger.setAttribute("aria-expanded", "false");
          }
        });
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initNavDropdown);
  } else {
    initNavDropdown();
  }
})();

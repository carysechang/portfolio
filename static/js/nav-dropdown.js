(function () {
  function isDesktop() {
    return window.matchMedia("(min-width: 992px)").matches;
  }

  function closeDropdown(item) {
    item.classList.remove("is-open");
    var trigger = item.querySelector(".nav-dropdown-hover__trigger");
    var menu = item.querySelector(".dropdown-menu");
    if (trigger) {
      trigger.setAttribute("aria-expanded", "false");
    }
    if (menu) {
      menu.classList.remove("show");
    }
  }

  function initNavDropdown() {
    document.querySelectorAll(".nav-dropdown-hover").forEach(function (item) {
      var trigger = item.querySelector(".nav-dropdown-hover__trigger");
      if (!trigger) {
        return;
      }

      item.addEventListener("mouseenter", function () {
        if (isDesktop()) {
          trigger.setAttribute("aria-expanded", "true");
        }
      });

      item.addEventListener("mouseleave", function () {
        if (isDesktop()) {
          closeDropdown(item);
        }
      });

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
        document.querySelectorAll(".nav-dropdown-hover.is-open").forEach(closeDropdown);
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initNavDropdown);
  } else {
    initNavDropdown();
  }
})();

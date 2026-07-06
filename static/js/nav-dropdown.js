(function () {
  function closeDesktopDropdowns() {
    if (window.innerWidth < 992) {
      return;
    }

    document.querySelectorAll(".nav-dropdown-hover .dropdown-menu.show").forEach(function (menu) {
      menu.classList.remove("show");
      var toggle = menu.parentElement && menu.parentElement.querySelector(".dropdown-toggle");
      if (toggle) {
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  function initNavDropdownHover() {
    document.querySelectorAll(".nav-dropdown-hover").forEach(function (item) {
      item.addEventListener("mouseleave", closeDesktopDropdowns);
    });

    window.addEventListener("resize", closeDesktopDropdowns);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initNavDropdownHover);
  } else {
    initNavDropdownHover();
  }
})();

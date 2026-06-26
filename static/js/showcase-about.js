(function () {
  function setPanelHeight(panel, expanded) {
    if (expanded) {
      panel.hidden = false;
      panel.style.maxHeight = panel.scrollHeight + "px";
      return;
    }

    panel.style.maxHeight = panel.scrollHeight + "px";
    requestAnimationFrame(function () {
      panel.style.maxHeight = "0px";
    });
  }

  function expandPanel(toggle, panel) {
    toggle.setAttribute("aria-expanded", "true");
    toggle.textContent = "Hide about me";
    panel.classList.add("is-expanded");
    panel.hidden = false;
    panel.style.maxHeight = "0px";
    requestAnimationFrame(function () {
      panel.style.maxHeight = panel.scrollHeight + "px";
    });
  }

  function collapsePanel(toggle, panel) {
    toggle.setAttribute("aria-expanded", "false");
    toggle.textContent = "About me";
    panel.classList.remove("is-expanded");
    setPanelHeight(panel, false);

    panel.addEventListener(
      "transitionend",
      function handleCollapse(event) {
        if (event.propertyName !== "max-height" || panel.classList.contains("is-expanded")) {
          return;
        }

        panel.hidden = true;
        panel.removeEventListener("transitionend", handleCollapse);
      },
      { once: true }
    );
  }

  function initShowcaseAbout() {
    document.querySelectorAll("[data-showcase-about-toggle]").forEach(function (toggle) {
      var panelId = toggle.getAttribute("aria-controls");
      var panel = panelId ? document.getElementById(panelId) : null;
      if (!panel) {
        return;
      }

      function maybeExpandFromHash() {
        if (window.location.hash === "#" + panelId && toggle.getAttribute("aria-expanded") !== "true") {
          expandPanel(toggle, panel);
        }
      }

      toggle.addEventListener("click", function () {
        var expanded = toggle.getAttribute("aria-expanded") === "true";
        if (expanded) {
          collapsePanel(toggle, panel);
          return;
        }

        expandPanel(toggle, panel);
      });

      maybeExpandFromHash();
      window.addEventListener("hashchange", maybeExpandFromHash);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initShowcaseAbout);
  } else {
    initShowcaseAbout();
  }
})();

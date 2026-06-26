const scroll = new SmoothScroll('a[href*="#"]', {
  speed: 1200,
  speedAsDuration: false,
  easing: 'easeOutCubic',
});

const navLinks = document.querySelectorAll('a.nav-link');
navLinks.forEach((navLink) => {
  navLink.addEventListener('click', () => {
    const navbar = document.getElementById('navbarSupportedContent');
    if (navbar && navbar.classList.contains('show')) {
      simulateClick(document.querySelector('.navbar-toggler'));
    }
  });
});

/**
 * Simulate a click event.
 * @public
 * @param {Element} elem  the element to simulate a click on
 * @see https://gomakethings.com/how-to-simulate-a-click-event-with-javascript/
 */
var simulateClick = function (elem) {
  var evt = new MouseEvent('click', {
    bubbles: true,
    cancelable: true,
    view: window,
  });
  elem.dispatchEvent(evt);
};

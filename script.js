const header = document.querySelector(".site-header");
const menuButton = document.querySelector("#menuButton");
const navMenu = document.querySelector("#navMenu");

const eventDate = new Date("2026-05-14T08:00:00-04:00").getTime();

function updateHeader() {
  header.classList.toggle("scrolled", window.scrollY > 24);
}

function updateCountdown() {
  const distance = Math.max(eventDate - Date.now(), 0);

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((distance / (1000 * 60)) % 60);
  const seconds = Math.floor((distance / 1000) % 60);

  document.querySelector("#days").textContent = String(days).padStart(2, "0");
  document.querySelector("#hours").textContent = String(hours).padStart(2, "0");
  document.querySelector("#minutes").textContent = String(minutes).padStart(2, "0");
  document.querySelector("#seconds").textContent = String(seconds).padStart(2, "0");
}

menuButton.addEventListener("click", () => {
  const isOpen = navMenu.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
});

navMenu.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
  });
});

const animatedItems = document.querySelectorAll(
  ".logo-grid img, .section-heading, .intro > div, .stats-band article, .benefit-list article, .objective-grid article, .agenda-day, .panel-feature > div, .panel-highlight, .panelist-grid article, .flyer-gallery img, .materials-cta > div, .expert-card, .committee-section > div, .price-box p, .included-list li, .contact-actions"
);

animatedItems.forEach((item, index) => {
  item.classList.add("reveal");
  item.style.transitionDelay = `${Math.min(index % 6, 5) * 70}ms`;
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.16 }
);

animatedItems.forEach((item) => revealObserver.observe(item));

window.addEventListener("scroll", updateHeader);

updateHeader();
updateCountdown();
setInterval(updateCountdown, 1000);

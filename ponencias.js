const header = document.querySelector(".site-header");
const menuButton = document.querySelector("#menuButton");
const navMenu = document.querySelector("#navMenu");
const loginForm = document.querySelector("#portalLogin");
const portalContent = document.querySelector("#portalContent");
const loginError = document.querySelector("#loginError");
const logoutButton = document.querySelector("#logoutButton");

const PORTAL_USER = atob("Q0lQTEFERjIwMjY=");
const PORTAL_PASS = atob("MjAyNmNpcGxhZGZWSUk=");

function setPortalState(isOpen) {
  loginForm.classList.toggle("hidden", isOpen);
  portalContent.classList.toggle("open", isOpen);
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

loginForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const user = document.querySelector("#portalUser").value.trim();
  const pass = document.querySelector("#portalPass").value.trim();

  if (user === PORTAL_USER && pass === PORTAL_PASS) {
    sessionStorage.setItem("cipladfPortal", "open");
    loginError.textContent = "";
    setPortalState(true);
    return;
  }

  loginError.textContent = "Usuario o contraseña incorrectos.";
});

logoutButton.addEventListener("click", () => {
  sessionStorage.removeItem("cipladfPortal");
  setPortalState(false);
});

window.addEventListener("scroll", () => {
  header.classList.add("scrolled");
});

setPortalState(sessionStorage.getItem("cipladfPortal") === "open");

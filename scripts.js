const navToggle = document.querySelector("[data-nav-toggle]");
const navLinks = document.querySelector(".nav-links");

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    document.body.classList.toggle("nav-open", isOpen);
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      if (window.innerWidth <= 768) {
        navLinks.classList.remove("open");
        document.body.classList.remove("nav-open");
        navToggle.setAttribute("aria-expanded", "false");
      }
    });
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 768 && navLinks.classList.contains("open")) {
      navLinks.classList.remove("open");
      document.body.classList.remove("nav-open");
      navToggle.setAttribute("aria-expanded", "false");
    }
  });
}

// Highlight the active nav item based on the file name.
(() => {
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-link").forEach((link) => {
    const href = link.getAttribute("href");
    if (!href) return;
    const normalized = href.replace("./", "");
    if (normalized === currentPage || (currentPage === "" && normalized === "index.html")) {
      link.classList.add("active");
    }
  });
})();


document.addEventListener("DOMContentLoaded", () => {
  /* ===== Sticky-шапка ===== */
  const header = document.querySelector(".site-header");
  const updateHeader = () => {
    if (header) header.classList.toggle("scrolled", window.scrollY > 20);
  };
  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });

  /* ===== Мобильное меню ===== */
  const menuToggle = document.querySelector(".menu-toggle");
  const menu = document.getElementById("main-menu");

  if (menuToggle && menu) {
    menuToggle.addEventListener("click", () => {
      const open = menu.classList.toggle("open");
      menuToggle.classList.toggle("is-active", open);
      menuToggle.setAttribute("aria-expanded", String(open));
      menuToggle.setAttribute(
        "aria-label",
        open ? "Закрыть меню" : "Открыть меню",
      );
      document.body.classList.toggle("no-scroll", open);
    });

    menu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        menu.classList.remove("open");
        menuToggle.classList.remove("is-active");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Открыть меню");
        document.body.classList.remove("no-scroll");
      });
    });
  }

  /* ===== Активный пункт меню по текущей странице ===== */
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".main-menu a").forEach((link) => {
    link.classList.toggle("active", link.getAttribute("href") === currentPage);
  });

  /* ===== Появление блоков при скролле (.reveal) ===== */
  const revealItems = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 },
    );

    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add("visible"));
  }

  /* ===== Лайтбокс ===== */
  const lightbox = document.getElementById("lightbox");
  const lightboxImage = document.getElementById("lightbox-image");
  const lightboxTitle = document.getElementById("lightbox-title");
  const lightboxMeta = document.getElementById("lightbox-meta");
  const lightboxClose = document.querySelector(".lightbox-close");
  let lastFocused = null;

  const closeLightbox = () => {
    if (!lightbox) return;
    lightbox.classList.remove("open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.classList.remove("no-scroll");
    if (lightboxImage) lightboxImage.src = "";
    if (lastFocused) lastFocused.focus();
  };

  const openLightbox = (button) => {
    const image = button.querySelector("img");
    if (!image || !lightbox) return;

    lastFocused = button;
    if (lightboxImage) {
      lightboxImage.src = button.dataset.full || image.currentSrc || image.src;
      lightboxImage.alt = image.alt || "";
    }
    if (lightboxTitle) lightboxTitle.textContent = button.dataset.title || "";
    if (lightboxMeta) lightboxMeta.textContent = button.dataset.meta || "";
    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.classList.add("no-scroll");
    if (lightboxClose) lightboxClose.focus();
  };

  document.querySelectorAll(".art-image-button").forEach((button) => {
    button.addEventListener("click", () => openLightbox(button));
  });

  if (lightboxClose) lightboxClose.addEventListener("click", closeLightbox);
  if (lightbox) {
    lightbox.addEventListener("click", (event) => {
      if (event.target === lightbox) closeLightbox();
    });
  }

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && lightbox?.classList.contains("open")) {
      closeLightbox();
    }
  });

  /* ===== Форма контактов ===== */
  const form = document.getElementById("contact-form");
  const formNote = document.getElementById("form-note");
  if (form && formNote) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      formNote.textContent = "Спасибо. Сообщение подготовлено.";
    });
  }

  /* ===== Слайдер в hero ===== */
  const slides = document.querySelectorAll(".hero-slide");
  if (slides.length >= 2) {
    let current = 0;
    setInterval(() => {
      slides[current].classList.remove("is-active");
      current = (current + 1) % slides.length;
      requestAnimationFrame(() => {
        slides[current].classList.add("is-active");
      });
    }, 5000);
  }
});

/* ==========================================================================
   SYMBIOSIS TEMPLE — script.js
   ========================================================================== */

const events = [
  {
    artist: "Nacho Bolognani",
    brand: "Symbiosis",
    city: "Santiago del Estero",
    date: "",
    venue: "",
    image: "./IMG_0928.jpg",
    ticketUrl: "https://www.passline.com/eventos/nacho-bolognani-symbiosis-sde"
  }
];


/* NEXT EVENT */

function renderNextEvent() {

  const next = events[0];

  if (!next) return;

  const artist =
    document.getElementById("eventArtist");

  const meta =
    document.getElementById("eventMeta");

  const datetime =
    document.getElementById("eventDatetime");

  const image =
    document.getElementById("eventImage");

  const ticketBtn =
    document.getElementById("eventTicketBtn");

  const stickyArtist =
    document.getElementById("stickyCtaArtist");

  const stickyBtn =
    document.getElementById("stickyCtaBtn");


  if (artist) {
    artist.textContent =
      next.artist.toUpperCase();
  }

  if (meta) {
    meta.textContent =
      `${next.brand.toUpperCase()} — ${next.city.toUpperCase()}`;
  }

  if (datetime) {

    const parts =
      [next.date, next.venue].filter(Boolean);

    datetime.textContent =
      parts.length
        ? parts.join(" · ")
        : "Fecha y venue: próximamente";
  }

  if (image) {
    image.src = next.image;
    image.alt =
      `Flyer del evento ${next.artist} en ${next.brand}, ${next.city}`;
  }

  if (ticketBtn) {
    ticketBtn.href = next.ticketUrl;
  }

  if (stickyArtist) {
    stickyArtist.textContent =
      next.artist.toUpperCase();
  }

  if (stickyBtn) {
    stickyBtn.href = next.ticketUrl;
  }
}


/* NAVBAR */

function initNavScroll() {

  const nav =
    document.getElementById("nav");

  if (!nav) return;

  const toggle = () => {
    nav.classList.toggle(
      "is-scrolled",
      window.scrollY > 40
    );
  };

  toggle();

  window.addEventListener(
    "scroll",
    toggle,
    { passive: true }
  );
}


/* MOBILE MENU */

function initMobileMenu() {

  const burger =
    document.getElementById("burgerBtn");

  const menu =
    document.getElementById("mobileMenu");

  const stickyCta =
    document.getElementById("stickyCta");

  if (!burger || !menu) return;

  const links =
    menu.querySelectorAll("a");

  const close = () => {

    menu.classList.remove("is-open");

    burger.setAttribute(
      "aria-expanded",
      "false"
    );

    burger.setAttribute(
      "aria-label",
      "Abrir menú"
    );

    document.body.style.overflow = "";

    if (stickyCta) {
      stickyCta.classList.remove(
        "is-hidden-menu"
      );
    }
  };


  const open = () => {

    menu.classList.add("is-open");

    burger.setAttribute(
      "aria-expanded",
      "true"
    );

    burger.setAttribute(
      "aria-label",
      "Cerrar menú"
    );

    document.body.style.overflow =
      "hidden";

    if (stickyCta) {
      stickyCta.classList.add(
        "is-hidden-menu"
      );
    }
  };


  burger.addEventListener(
    "click",
    () => {

      const isOpen =
        menu.classList.contains(
          "is-open"
        );

      if (isOpen) {
        close();
      } else {
        open();
      }
    }
  );


  links.forEach((link) => {
    link.addEventListener(
      "click",
      close
    );
  });
}


/* REVEAL */

function initReveal() {

  const items =
    document.querySelectorAll(
      ".reveal"
    );

  if (
    !("IntersectionObserver" in window)
  ) {

    items.forEach((el) => {
      el.classList.add(
        "is-visible"
      );
    });

    return;
  }


  const observer =
    new IntersectionObserver(
      (entries) => {

        entries.forEach(
          (entry) => {

            if (
              entry.isIntersecting
            ) {

              entry.target.classList.add(
                "is-visible"
              );

              observer.unobserve(
                entry.target
              );
            }
          }
        );
      },
      {
        threshold: 0.15,
        rootMargin:
          "0px 0px -60px 0px"
      }
    );


  items.forEach((el) => {
    observer.observe(el);
  });
}


/* GALLERY */

function initGalleryLightbox() {

  const galleryImages =
    document.querySelectorAll(
      ".gallery__item img"
    );

  galleryImages.forEach((img) => {

    const item =
      img.closest(".gallery__item");

    if (!item) return;

    item.addEventListener(
      "click",
      () => {
        openLightbox(
          img.src,
          img.alt
        );
      }
    );
  });
}


/* OPEN LIGHTBOX */

function openLightbox(src, alt) {

  const lightbox =
    document.getElementById(
      "lightbox"
    );

  const img =
    document.getElementById(
      "lightboxImg"
    );

  if (!lightbox || !img) return;

  img.src = src;
  img.alt = alt;

  lightbox.classList.add(
    "is-open"
  );

  document.body.style.overflow =
    "hidden";
}


/* CLOSE LIGHTBOX */

function closeLightbox() {

  const lightbox =
    document.getElementById(
      "lightbox"
    );

  if (!lightbox) return;

  lightbox.classList.remove(
    "is-open"
  );

  document.body.style.overflow = "";
}


/* LIGHTBOX CONTROLS */

function initLightboxControls() {

  const lightbox =
    document.getElementById(
      "lightbox"
    );

  const closeButton =
    document.getElementById(
      "lightboxClose"
    );

  if (!lightbox) return;

  if (closeButton) {
    closeButton.addEventListener(
      "click",
      closeLightbox
    );
  }

  lightbox.addEventListener(
    "click",
    (event) => {

      if (
        event.target === lightbox
      ) {
        closeLightbox();
      }
    }
  );

  document.addEventListener(
    "keydown",
    (event) => {

      if (
        event.key === "Escape" &&
        lightbox.classList.contains(
          "is-open"
        )
      ) {
        closeLightbox();
      }
    }
  );
}


/* MOBILE CTA */

function initStickyCta() {

  const cta =
    document.getElementById(
      "stickyCta"
    );

  const hero =
    document.querySelector(
      ".hero"
    );

  if (!cta || !hero) return;

  const toggle = () => {

    const heroBottom =
      hero
        .getBoundingClientRect()
        .bottom;

    cta.classList.toggle(
      "is-visible",
      heroBottom < 0
    );
  };

  toggle();

  window.addEventListener(
    "scroll",
    toggle,
    { passive: true }
  );
}


/* FOOTER */

function renderFooterCopy() {

  const el =
    document.getElementById(
      "footerCopy"
    );

  if (!el) return;

  el.textContent =
    `© ${new Date().getFullYear()} SYMBIOSIS`;
}


/* INIT */

document.addEventListener(
  "DOMContentLoaded",
  () => {

    renderNextEvent();
    initNavScroll();
    initMobileMenu();
    initGalleryLightbox();
    initLightboxControls();
    initReveal();
    initStickyCta();
    renderFooterCopy();

  }
);

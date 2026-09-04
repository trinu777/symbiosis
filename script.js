/* ==========================================================================
   SYMBIOSIS TEMPLE — script.js
   ========================================================================== */

/* -------- Event data --------
   Estructura preparada para futuros eventos: agregar objetos a este array
   y actualizar el índice usado más abajo cuando cambie el próximo evento. */
const events = [
  {
    artist: "Nacho Bolognani",
    brand: "Symbiosis",
    city: "Santiago del Estero",
    date: "",
    venue: "",
    image: "assets/events/nacho-bolognani.jpg",
    ticketUrl: "https://www.passline.com/eventos/nacho-bolognani-symbiosis-sde?fbclid=PAdGRleAUGj_hwZG9mAmZkaWQWUNt5p2Z7was7JkwERwHZvMlFESf2ZmV4dG4DYWVtAjExAHNydGMGYXBwX2lkDzEyNDAyNDU3NDI4NzQxNAABp_tJlUmgQTsUXOgIyXSKNhoA3nC5AogmcqTg2aErtDW7UpP689GbJNOoP5A6_aem_KXXkY2bFWEol131zxsP7lw&utm_id=97760_v0_s00_e0_tv6_a1denngo7zzr8e"
  }
];

/* -------- Render next event -------- */
function renderNextEvent(){
  const next = events[0];
  if(!next) return;

  document.getElementById('eventArtist').textContent = next.artist.toUpperCase();
  document.getElementById('eventMeta').textContent = `${next.brand.toUpperCase()} — ${next.city.toUpperCase()}`;

  const dtEl = document.getElementById('eventDatetime');
  const parts = [next.date, next.venue].filter(Boolean);
  dtEl.textContent = parts.length ? parts.join(' · ') : 'Fecha y venue: próximamente';

  const img = document.getElementById('eventImage');
  img.src = next.image;
  img.alt = `Flyer del evento ${next.artist} en ${next.brand}, ${next.city}`;

  const ticketBtn = document.getElementById('eventTicketBtn');
  ticketBtn.href = next.ticketUrl;

  const stickyArtist = document.getElementById('stickyCtaArtist');
  stickyArtist.textContent = next.artist.toUpperCase();

  const stickyBtn = document.getElementById('stickyCtaBtn');
  stickyBtn.href = next.ticketUrl;
}

/* -------- Navbar scroll state -------- */
function initNavScroll(){
  const nav = document.getElementById('nav');
  const toggle = () => {
    nav.classList.toggle('is-scrolled', window.scrollY > 40);
  };
  toggle();
  window.addEventListener('scroll', toggle, { passive:true });
}

/* -------- Mobile fullscreen menu -------- */
function initMobileMenu(){
  const burger = document.getElementById('burgerBtn');
  const menu = document.getElementById('mobileMenu');
  const stickyCta = document.getElementById('stickyCta');
  const links = menu.querySelectorAll('a');

  const close = () => {
    menu.classList.remove('is-open');
    burger.setAttribute('aria-expanded','false');
    burger.setAttribute('aria-label','Abrir menú');
    document.body.style.overflow = '';
    stickyCta.classList.remove('is-hidden-menu');
  };
  const open = () => {
    menu.classList.add('is-open');
    burger.setAttribute('aria-expanded','true');
    burger.setAttribute('aria-label','Cerrar menú');
    document.body.style.overflow = 'hidden';
    stickyCta.classList.add('is-hidden-menu');
  };

  burger.addEventListener('click', () => {
    const isOpen = menu.classList.contains('is-open');
    isOpen ? close() : open();
  });

  links.forEach(link => link.addEventListener('click', close));
}

/* -------- Scroll reveal (IntersectionObserver) -------- */
function initReveal(){
  const items = document.querySelectorAll('.reveal');
  if(!('IntersectionObserver' in window)){
    items.forEach(el => el.classList.add('is-visible'));
    return;
  }
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

  items.forEach(el => observer.observe(el));
}

/* -------- Gallery: fotos reales + lightbox --------
   Archivos subidos por el usuario en la raíz del repo (junto a index.html).
   Para sumar más fotos en el futuro, solo agregar el nombre de archivo
   a este array. */
const galleryImages = [
  'galera-symbiosis.jpg',
  'galera-symbiosis1.jpg',
  'galera-symbiosis2.jpg',
  'galera-symbiosis3.jpg'
];

function initGallery(){
  const grid = document.getElementById('galleryGrid');

  galleryImages.forEach((filename, i) => {
    const item = document.createElement('div');
    item.className = 'gallery__item';

    const img = document.createElement('img');
    img.src = filename;
    img.loading = 'lazy';
    img.alt = `Fotografía de un evento anterior de Symbiosis Temple (${i + 1})`;

    item.appendChild(img);
    item.addEventListener('click', () => openLightbox(img.src, img.alt));
    grid.appendChild(item);
  });
}

function openLightbox(src, alt){
  const lightbox = document.getElementById('lightbox');
  const img = document.getElementById('lightboxImg');
  img.src = src;
  img.alt = alt;
  lightbox.classList.add('is-open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox(){
  const lightbox = document.getElementById('lightbox');
  lightbox.classList.remove('is-open');
  document.body.style.overflow = '';
}

function initLightboxControls(){
  const lightbox = document.getElementById('lightbox');
  document.getElementById('lightboxClose').addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => {
    if(e.target === lightbox) closeLightbox();
  });
  document.addEventListener('keydown', (e) => {
    if(e.key === 'Escape' && lightbox.classList.contains('is-open')) closeLightbox();
  });
}

/* -------- Mobile sticky CTA -------- */
function initStickyCta(){
  const cta = document.getElementById('stickyCta');
  const hero = document.querySelector('.hero');
  if(!cta || !hero) return;

  const toggle = () => {
    const heroBottom = hero.getBoundingClientRect().bottom;
    cta.classList.toggle('is-visible', heroBottom < 0);
  };
  toggle();
  window.addEventListener('scroll', toggle, { passive:true });
}

/* -------- Footer dynamic year -------- */
function renderFooterCopy(){
  const el = document.getElementById('footerCopy');
  el.textContent = `© ${new Date().getFullYear()} SYMBIOSIS`;
}

/* -------- Init -------- */
document.addEventListener('DOMContentLoaded', () => {
  renderNextEvent();
  initNavScroll();
  initMobileMenu();
  initGallery();
  initLightboxControls();
  initReveal();
  initStickyCta();
  renderFooterCopy();
});

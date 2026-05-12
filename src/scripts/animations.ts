import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { initMagneticButtons, initRippleEffect } from './magnetic-button';

// Registrar plugin de ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Inicializar todas las animaciones GSAP del sitio
export function initAnimations() {
  // Efecto parallax en hero
  initHeroParallax();

  // Revelar secciones al hacer scroll
  initSectionReveals();

  // Contadores animados
  initCounters();

  // Efecto zoom en galería
  initGalleryZoom();

  // Efecto scroll en navbar
  initNavbarScroll();

  // Animación de tarjetas de precios
  initPricingCards();

  // Animación de grid de amenidades
  initAmenitiesGrid();

  // Efectos interactivos de botones
  initMagneticButtons();
  initRippleEffect();
}

// Efecto parallax en hero: el fondo se mueve más lento que el contenido
function initHeroParallax() {
  const heroSection = document.querySelector('#hero');
  const heroImage = document.querySelector('#hero .absolute.inset-0');
  const heroContent = document.querySelector('#hero .relative.z-10');

  if (!heroSection || !heroImage || !heroContent) return;

  // Parallax effect on hero image
  gsap.to(heroImage, {
    yPercent: 30,
    ease: 'none',
    scrollTrigger: {
      trigger: heroSection,
      start: 'top top',
      end: 'bottom top',
      scrub: 1
    }
  });

  // Fade out hero content
  gsap.to(heroContent, {
    opacity: 0,
    y: -50,
    ease: 'none',
    scrollTrigger: {
      trigger: heroSection,
      start: 'top top',
      end: '50% top',
      scrub: 1
    }
  });
}

/**
 * Reveal sections with fade-in and slide-up effect
 */
function initSectionReveals() {
  const sections = document.querySelectorAll('section:not(#hero):not(#precios)');

  sections.forEach((section) => {
    // Set initial state
    gsap.set(section, {
      opacity: 0,
      y: 50
    });

    gsap.to(section, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: section,
        start: 'top 85%',
        toggleActions: 'play none none none',
        once: true
      }
    });
  });
}

/**
 * Animated counters for numbers
 */
function initCounters() {
  const counterElements = [
    { selector: '[data-counter="altitude"]', endValue: 3550, suffix: 'm' },
    { selector: '[data-counter="capacity-min"]', endValue: 15, suffix: '' },
    { selector: '[data-counter="capacity-max"]', endValue: 20, suffix: '' },
    { selector: '[data-counter="distance"]', endValue: 80, suffix: ' min' }
  ];

  counterElements.forEach(({ selector, endValue, suffix }) => {
    const element = document.querySelector(selector);
    if (!element) return;

    const counter = { value: 0 };

    gsap.to(counter, {
      value: endValue,
      duration: 2,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: element,
        start: 'top 85%',
        once: true
      },
      onUpdate: function() {
        const displayValue = Math.floor(counter.value);
        element.textContent = displayValue.toLocaleString() + suffix;
      }
    });
  });
}

/**
 * Gallery zoom effect on images
 */
function initGalleryZoom() {
  const gallerySection = document.querySelector('#galeria');
  if (!gallerySection) return;

  const galleryImages = gallerySection.querySelectorAll('img');

  if (!galleryImages.length) return;

  gsap.set(galleryImages, {
    scale: 0.9,
    opacity: 0
  });

  gsap.to(galleryImages, {
    scale: 1,
    opacity: 1,
    duration: 0.8,
    stagger: 0.1,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '#galeria',
      start: 'top 75%',
      toggleActions: 'play none none none',
      once: true
    }
  });
}

/**
 * Enhanced navbar scroll effect
 */
function initNavbarScroll() {
  const navbar = document.querySelector('#main-nav');
  if (!navbar) return;

  ScrollTrigger.create({
    start: 'top -80',
    end: 99999,
    toggleClass: {
      targets: navbar,
      className: 'scrolled'
    },
    onEnter: () => {
      gsap.to(navbar, {
        backgroundColor: 'rgba(255, 255, 255, 0.98)',
        backdropFilter: 'blur(20px)',
        boxShadow: '0 8px 32px rgba(15, 30, 61, 0.12)',
        duration: 0.3,
        ease: 'power2.out'
      });
    },
    onLeaveBack: () => {
      gsap.to(navbar, {
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        boxShadow: '0 2px 8px rgba(15, 30, 61, 0.06)',
        duration: 0.3,
        ease: 'power2.out'
      });
    }
  });
}

/**
 * Pricing cards with stagger and lift effect
 */
function initPricingCards() {
  const pricingSection = document.querySelector('#precios');
  if (!pricingSection) return;

  const pricingCards = pricingSection.querySelectorAll('.grid > div');

  if (!pricingCards.length) return;

  // Set initial state without hiding content
  gsap.set(pricingCards, {
    y: 50,
    opacity: 0
  });

  // Animate when scrolled into view
  gsap.to(pricingCards, {
    y: 0,
    opacity: 1,
    duration: 0.8,
    stagger: 0.2,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '#precios',
      start: 'top 75%',
      toggleActions: 'play none none none',
      once: true
    }
  });

  // Hover effect enhancement (optional)
  pricingCards.forEach((card) => {
    const cardElement = card as HTMLElement;

    cardElement.addEventListener('mouseenter', () => {
      gsap.to(cardElement, {
        y: -10,
        scale: 1.02,
        duration: 0.3,
        ease: 'power2.out'
      });
    });

    cardElement.addEventListener('mouseleave', () => {
      gsap.to(cardElement, {
        y: 0,
        scale: 1,
        duration: 0.3,
        ease: 'power2.out'
      });
    });
  });
}

/**
 * Amenities grid items reveal
 */
function initAmenitiesGrid() {
  const amenitiesSection = document.querySelector('#amenidades');
  if (!amenitiesSection) return;

  const amenityItems = amenitiesSection.querySelectorAll('.grid > div, .flex.items-start');

  if (!amenityItems.length) return;

  gsap.set(amenityItems, {
    x: -30,
    opacity: 0
  });

  gsap.to(amenityItems, {
    x: 0,
    opacity: 1,
    duration: 0.6,
    stagger: 0.08,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '#amenidades',
      start: 'top 75%',
      toggleActions: 'play none none none',
      once: true
    }
  });
}

/**
 * Refresh ScrollTrigger on window resize
 */
window.addEventListener('resize', () => {
  ScrollTrigger.refresh();
});

/**
 * Cleanup function for SPA navigation
 */
export function cleanupAnimations() {
  ScrollTrigger.getAll().forEach(trigger => trigger.kill());
}

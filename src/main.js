import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Santos Home Renovation — High-Fidelity Reference Experience Engine
 */
class SantosReferenceSite {
  constructor() {
    this.init();
  }

  init() {
    this.initMobileMenu();
    this.initHeadlineAnim();
    this.initExpandableGallery();
    this.initStickyNarrative();
    this.initBeforeAfter();
    this.initFaq();
    this.initContactForm();
    this.initSmoothScroll();
  }

  /**
   * Mobile Hamburger & Full Drawer
   */
  initMobileMenu() {
    const toggleBtn = document.getElementById('mobile-menu-toggle');
    const closeBtn = document.getElementById('mobile-menu-close');
    const drawer = document.getElementById('mobile-menu-drawer');
    const links = document.querySelectorAll('.mobile-menu-link');

    if (!toggleBtn || !drawer) return;

    const openMenu = () => {
      drawer.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
      toggleBtn.setAttribute('aria-expanded', 'true');
    };

    const closeMenu = () => {
      drawer.classList.add('hidden');
      document.body.style.overflow = '';
      toggleBtn.setAttribute('aria-expanded', 'false');
    };

    toggleBtn.addEventListener('click', openMenu);
    if (closeBtn) closeBtn.addEventListener('click', closeMenu);
    links.forEach(l => l.addEventListener('click', closeMenu));
  }

  /**
   * Word-by-word headline reveal
   */
  initHeadlineAnim() {
    gsap.from('.hero-word', {
      opacity: 0,
      y: 28,
      stagger: 0.08,
      duration: 0.85,
      ease: 'power3.out',
      delay: 0.1
    });
  }

  /**
   * Expandable Horizontal Work Gallery
   */
  initExpandableGallery() {
    const items = document.querySelectorAll('.exp-gallery-item');
    if (!items.length) return;

    items.forEach(item => {
      item.addEventListener('click', () => {
        items.forEach(i => i.classList.remove('active'));
        item.classList.add('active');
      });
    });
  }

  /**
   * Section 5 / 10: Step-by-Step Narrative Interactive Switching
   */
  initStickyNarrative() {
    const steps = [
      {
        badge: "01 / 05",
        img: "/assets/images/service-drywall.jpg"
      },
      {
        badge: "02 / 05",
        img: "/assets/images/service-carpentry.jpg"
      },
      {
        badge: "03 / 05",
        img: "/assets/images/service-flooring.jpg"
      },
      {
        badge: "04 / 05",
        img: "/assets/images/service-bathroom.jpg"
      },
      {
        badge: "05 / 05",
        img: "/assets/images/service-kitchen.jpg"
      }
    ];

    const imageEl = document.getElementById('narrative-img');
    const badgeEl = document.getElementById('narrative-badge');
    const buttons = document.querySelectorAll('.narrative-step-btn');

    if (!imageEl || !buttons.length) return;

    buttons.forEach((btn, index) => {
      btn.addEventListener('click', () => {
        buttons.forEach(b => {
          b.classList.remove('bg-white', 'border-[#D3AA64]', 'shadow-sm');
          b.classList.add('bg-white/70', 'border-transparent');
        });
        btn.classList.add('bg-white', 'border-[#D3AA64]', 'shadow-sm');
        btn.classList.remove('bg-white/70', 'border-transparent');

        if (imageEl && steps[index]) {
          imageEl.style.opacity = '0.3';
          setTimeout(() => {
            imageEl.src = steps[index].img;
            if (badgeEl) badgeEl.textContent = steps[index].badge;
            imageEl.style.opacity = '1';
          }, 150);
        }
      });
    });
  }

  /**
   * Before & After Interactive Comparison Slider
   */
  initBeforeAfter() {
    const container = document.getElementById('ba-slider-container');
    const beforeWrap = document.getElementById('ba-before-wrap');
    const handle = document.getElementById('ba-handle');

    if (!container || !beforeWrap || !handle) return;

    let isDown = false;

    const setPosition = (clientX) => {
      const rect = container.getBoundingClientRect();
      let x = clientX - rect.left;
      if (x < 0) x = 0;
      if (x > rect.width) x = rect.width;
      const pct = (x / rect.width) * 100;
      beforeWrap.style.width = `${pct}%`;
      handle.style.left = `${pct}%`;
    };

    container.addEventListener('mousedown', (e) => {
      isDown = true;
      setPosition(e.clientX);
    });

    window.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      setPosition(e.clientX);
    });

    window.addEventListener('mouseup', () => { isDown = false; });

    container.addEventListener('touchstart', (e) => {
      if (e.touches[0]) setPosition(e.touches[0].clientX);
    }, { passive: true });

    container.addEventListener('touchmove', (e) => {
      if (e.touches[0]) setPosition(e.touches[0].clientX);
    }, { passive: true });
  }

  /**
   * FAQ Accordion
   */
  initFaq() {
    const items = document.querySelectorAll('.ref-faq-item');
    items.forEach(item => {
      const btn = item.querySelector('.ref-faq-trigger');
      const content = item.querySelector('.ref-faq-content');

      if (!btn || !content) return;

      btn.addEventListener('click', () => {
        const isActive = item.classList.contains('active');

        items.forEach(other => {
          if (other !== item && other.classList.contains('active')) {
            other.classList.remove('active');
            const oc = other.querySelector('.ref-faq-content');
            if (oc) oc.style.maxHeight = null;
          }
        });

        if (isActive) {
          item.classList.remove('active');
          content.style.maxHeight = null;
        } else {
          item.classList.add('active');
          content.style.maxHeight = `${content.scrollHeight + 20}px`;
        }
      });
    });
  }

  /**
   * Contact Form WhatsApp Integration
   */
  initContactForm() {
    const form = document.getElementById('ref-contact-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('ref-name')?.value.trim() || '';
      const phone = document.getElementById('ref-phone')?.value.trim() || '';
      const email = document.getElementById('ref-email')?.value.trim() || '';
      const city = document.getElementById('ref-city')?.value.trim() || '';
      const service = document.getElementById('ref-service')?.value || 'Home Renovation';
      const notes = document.getElementById('ref-notes')?.value.trim() || '';

      const text = `Hello Santos Home Renovation!%0A%0A*Name:* ${encodeURIComponent(name)}%0A*Phone:* ${encodeURIComponent(phone)}%0A*Email:* ${encodeURIComponent(email)}%0A*Location:* ${encodeURIComponent(city)}%0A*Service Required:* ${encodeURIComponent(service)}%0A*Project Scope:* ${encodeURIComponent(notes)}`;

      window.open(`https://wa.me/18573467894?text=${text}`, '_blank');
    });
  }

  /**
   * Smooth Anchor Scroll
   */
  initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(a => {
      a.addEventListener('click', function(e) {
        const id = this.getAttribute('href');
        if (id === '#') return;
        const target = document.querySelector(id);
        if (target) {
          e.preventDefault();
          const offset = 84;
          const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
          window.scrollTo({ top, behavior: 'smooth' });
        }
      });
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new SantosReferenceSite();
});

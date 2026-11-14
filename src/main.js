import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Santos Home Renovation — Luxury Navy Architectural Experience
 */
class SantosLuxuryExperience {
  constructor() {
    this.header = document.getElementById('site-header');
    this.currentProjectIndex = 0;
    this.projects = [
      {
        title: "A Refined Kitchen Transformation",
        category: "Kitchen Remodeling",
        description: "Explore the design details, materials, and craftsmanship that define a beautifully renovated kitchen. Custom shaker cabinetry, quartz countertops, and brass fixtures.",
        image: "/assets/images/service-kitchen.jpg",
        location: "Newton, MA"
      },
      {
        title: "Master Suite & Spa Bathroom",
        category: "Bathroom Remodeling",
        description: "Custom floor-to-ceiling porcelain tile, walk-in curbless shower, double vanity in natural oak, and radiant heat flooring.",
        image: "/assets/images/service-bathroom.jpg",
        location: "Brookline, MA"
      },
      {
        title: "Architectural Hardwood & Tile Craft",
        category: "Flooring & Tile",
        description: "Wide-plank white oak flooring installation combined with custom herringbone tile transitions for living and entryway spaces.",
        image: "/assets/images/service-flooring.jpg",
        location: "Cambridge, MA"
      },
      {
        title: "Custom Trim & Architectural Millwork",
        category: "Carpentry & Finish Work",
        description: "Crown molding, custom coffered ceilings, wainscoting, and precise door casings that bring classical New England elegance.",
        image: "/assets/images/service-carpentry.jpg",
        location: "Wellesley, MA"
      }
    ];

    this.init();
  }

  init() {
    this.initHeader();
    this.initMobileMenu();
    this.initHeroEntrance();
    this.initProjectSlider();
    this.initProcessAnimation();
    this.initFaqAccordion();
    this.initContactForm();
    this.initScrollSpy();
    this.initSmoothScroll();
  }

  /**
   * Header background scroll listener
   */
  initHeader() {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        this.header?.classList.add('scrolled');
      } else {
        this.header?.classList.remove('scrolled');
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
  }

  /**
   * Mobile luxury drawer
   */
  initMobileMenu() {
    const toggleBtn = document.getElementById('mobile-menu-toggle');
    const closeBtn = document.getElementById('mobile-menu-close');
    const drawer = document.getElementById('mobile-menu-drawer');
    const links = document.querySelectorAll('.mobile-menu-link');

    if (!toggleBtn || !drawer) return;

    const openMenu = () => {
      drawer.classList.add('active');
      document.body.style.overflow = 'hidden';
      toggleBtn.setAttribute('aria-expanded', 'true');
    };

    const closeMenu = () => {
      drawer.classList.remove('active');
      document.body.style.overflow = '';
      toggleBtn.setAttribute('aria-expanded', 'false');
    };

    toggleBtn.addEventListener('click', openMenu);
    if (closeBtn) closeBtn.addEventListener('click', closeMenu);
    links.forEach(l => l.addEventListener('click', closeMenu));

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && drawer.classList.contains('active')) {
        closeMenu();
      }
    });
  }

  /**
   * Refined Hero Entrance
   */
  initHeroEntrance() {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.from('.hero-content-anim > *', {
      opacity: 0,
      y: 24,
      stagger: 0.12,
      duration: 0.9,
      delay: 0.1
    })
    .from('.hero-differentiators', {
      opacity: 0,
      y: 16,
      duration: 0.7
    }, '-=0.4');
  }

  /**
   * Featured Project Interactive Slider
   */
  initProjectSlider() {
    const prevBtn = document.getElementById('project-prev');
    const nextBtn = document.getElementById('project-next');
    const counter = document.getElementById('project-counter');
    const imageEl = document.getElementById('project-image');
    const titleEl = document.getElementById('project-title');
    const descEl = document.getElementById('project-desc');
    const catEl = document.getElementById('project-cat');

    if (!counter || !imageEl || !titleEl) return;

    const updateProject = (newIndex) => {
      this.currentProjectIndex = (newIndex + this.projects.length) % this.projects.length;
      const proj = this.projects[this.currentProjectIndex];

      gsap.to([imageEl, titleEl, descEl], {
        opacity: 0,
        duration: 0.2,
        ease: 'power2.in',
        onComplete: () => {
          imageEl.src = proj.image;
          titleEl.textContent = proj.title;
          if (descEl) descEl.textContent = proj.description;
          if (catEl) catEl.textContent = proj.category;
          counter.textContent = `0${this.currentProjectIndex + 1} / 0${this.projects.length}`;

          gsap.to([imageEl, titleEl, descEl], {
            opacity: 1,
            duration: 0.35,
            ease: 'power2.out'
          });
        }
      });
    };

    prevBtn?.addEventListener('click', () => updateProject(this.currentProjectIndex - 1));
    nextBtn?.addEventListener('click', () => updateProject(this.currentProjectIndex + 1));
  }

  /**
   * Timeline entrance reveal
   */
  initProcessAnimation() {
    gsap.from('.process-step', {
      scrollTrigger: {
        trigger: '#process',
        start: 'top 75%',
        toggleActions: 'play none none none'
      },
      opacity: 0,
      y: 30,
      stagger: 0.15,
      duration: 0.8,
      ease: 'power3.out'
    });
  }

  /**
   * FAQ Accordion
   */
  initFaqAccordion() {
    const items = document.querySelectorAll('.luxury-faq-item');

    items.forEach(item => {
      const trigger = item.querySelector('.luxury-faq-trigger');
      const content = item.querySelector('.luxury-faq-content');

      if (!trigger || !content) return;

      trigger.addEventListener('click', () => {
        const isActive = item.classList.contains('active');

        items.forEach(other => {
          if (other !== item && other.classList.contains('active')) {
            other.classList.remove('active');
            const oc = other.querySelector('.luxury-faq-content');
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
   * Contact Form -> WhatsApp
   */
  initContactForm() {
    const form = document.getElementById('luxury-contact-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('form-name')?.value.trim() || '';
      const phone = document.getElementById('form-phone')?.value.trim() || '';
      const email = document.getElementById('form-email')?.value.trim() || '';
      const service = document.getElementById('form-service')?.value || 'Home Renovation';
      const city = document.getElementById('form-city')?.value.trim() || 'Massachusetts';
      const notes = document.getElementById('form-notes')?.value.trim() || '';

      const text = `Hello Santos Home Renovation!%0A%0A*Name:* ${encodeURIComponent(name)}%0A*Phone:* ${encodeURIComponent(phone)}%0A*Email:* ${encodeURIComponent(email)}%0A*Service:* ${encodeURIComponent(service)}%0A*Location:* ${encodeURIComponent(city)}%0A*Project Scope:* ${encodeURIComponent(notes)}`;

      window.open(`https://wa.me/18573467894?text=${text}`, '_blank');
    });
  }

  /**
   * Scrollspy for Header
   */
  initScrollSpy() {
    const navLinks = document.querySelectorAll('.luxury-nav-link');
    const sections = ['hero', 'services', 'featured-project', 'about', 'process', 'faq', 'contact'];

    const onScroll = () => {
      let current = 'hero';
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120 && rect.bottom >= 120) {
            current = id;
            break;
          }
        }
      }

      navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === `#${current}`) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /**
   * Smooth link scrolling
   */
  initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        const target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          const headerHeight = 78;
          const top = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
          window.scrollTo({
            top,
            behavior: 'smooth'
          });
        }
      });
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new SantosLuxuryExperience();
});

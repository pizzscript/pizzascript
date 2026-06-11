/* ══════════════════════════════════════════════════
   NAVBAR.JS — Standalone Header/Navbar Injection
   Designed to work across domains (e.g. blog.pizzascript.com loading from www.pizzascript.com)
   ══════════════════════════════════════════════════ */

(function () {
  'use strict';

  // 1. Determine base URL of the hosting domain (where this script is loaded from)
  var baseUrl = '';
  if (document.currentScript && document.currentScript.src) {
    try {
      baseUrl = new URL(document.currentScript.src).origin;
    } catch (e) {
      // fallback
    }
  }
  if (!baseUrl) {
    // default fallback to the origin of the current page
    baseUrl = window.location.origin;
  }

  // 2. Exact navbar HTML matching website/src/components/Navbar.tsx
  var navbarHtml = `
    <header class="navbar" id="navbar" role="banner">
      <div class="navbar-inner">
        <a href="${baseUrl}/" class="navbar-logo" aria-label="Pizza Script Logo">
          <div class="logo-lottie" style="width: 40px; height: 40px;"></div>
          <span class="logo-text">Pizza Script</span>
        </a>

        <nav class="navbar-links" role="navigation" aria-label="Main navigation">
          <a href="${baseUrl}/" class="navbar-link">Home</a>
          <a href="${baseUrl}/services" class="navbar-link">Services</a>
          <a href="${baseUrl}/portfolio" class="navbar-link">Portfolio</a>
          <a href="${baseUrl}/about" class="navbar-link">About</a>
          <a href="${baseUrl}/blog" class="navbar-link">Blog</a>
          <a href="${baseUrl}/#order" class="btn btn-primary navbar-cta font-mono" aria-label="Go to contact section" style="padding: 10px 24px; font-size: 0.75rem;">Get in Touch</a>
        </nav>

        <button class="hamburger" id="hamburger" aria-label="Toggle mobile navigation menu" aria-expanded="false" aria-controls="mobile-menu">
          <span class="hamburger-line"></span>
          <span class="hamburger-line"></span>
          <span class="hamburger-line"></span>
        </button>
      </div>

      <!-- Mobile Menu -->
      <div class="mobile-menu" id="mobile-menu" role="navigation" aria-label="Mobile navigation">
        <a href="${baseUrl}/" class="mobile-menu-link">Home</a>
        <a href="${baseUrl}/services" class="mobile-menu-link">Services</a>
        <a href="${baseUrl}/portfolio" class="mobile-menu-link">Portfolio</a>
        <a href="${baseUrl}/about" class="mobile-menu-link">About</a>
        <a href="${baseUrl}/blog" class="mobile-menu-link">Blog</a>
        <a href="${baseUrl}/#order" class="btn btn-primary mt-4 font-mono text-center block w-full">Get in Touch</a>
      </div>
    </header>
  `;

  // 3. Inject CSS styles matching website/src/styles/index.css
  function injectStyles() {
    var styleId = 'ps-navbar-styles';
    if (document.getElementById(styleId)) return;

    var styleEl = document.createElement('style');
    styleEl.id = styleId;
    styleEl.textContent = `
      /* -- google fonts -- */
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:wght@700&family=JetBrains+Mono:wght@500&display=swap');

      :root {
        --color-cream: #FFF8F0;
        --color-brown-900: #1A0F08;
        --color-brown-700: #3D2517;
        --color-brown-600: #5C3A24;
        --color-oven-orange: #E87040;
        --color-ember: #C45C2C;
        --font-display: 'Playfair Display', 'Georgia', serif;
        --font-body: 'Inter', system-ui, sans-serif;
        --z-nav: 200;
        --z-modal: 400;
        --z-overlay: 300;
        --ease-cinematic: cubic-bezier(0.25, 0.1, 0.25, 1);
        --ease-smooth: cubic-bezier(0.4, 0, 0.2, 1);
        --radius-md: 8px;
        --radius-full: 9999px;
        --shadow-warm-md: 0 4px 16px rgba(44, 24, 16, 0.1);
        --shadow-warm-lg: 0 8px 32px rgba(44, 24, 16, 0.12);
        --shadow-glow-orange: 0 0 30px rgba(232, 112, 64, 0.2);
      }

      /* Lock scrolling when mobile menu is open */
      body.mobile-menu-open {
        overflow: hidden !important;
      }

      /* -- navbar structure & styling -- */
      .navbar {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        height: 72px;
        z-index: var(--z-nav);
        display: flex;
        align-items: center;
        padding: 0 24px;
        transition: all 400ms var(--ease-cinematic);
        background-color: var(--color-brown-900);
        box-sizing: border-box;
      }

      .navbar.navbar-hidden {
        transform: translateY(-100%);
      }

      @media (min-width: 1024px) {
        .navbar {
          padding: 0 48px;
        }
      }

      .navbar.scrolled {
        background-color: rgba(26, 15, 8, 0.92);
        backdrop-filter: blur(16px);
        -webkit-backdrop-filter: blur(16px);
        box-shadow: 0 1px 0 rgba(255, 248, 240, 0.05);
      }

      .navbar-inner {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        max-width: 1440px;
        margin: 0 auto;
        box-sizing: border-box;
      }

      /* ---- Logo ---- */
      .navbar-logo {
        display: flex;
        align-items: center;
        gap: 8px;
        font-family: var(--font-display);
        font-size: 1.1rem;
        font-weight: 600;
        color: var(--color-cream);
        text-decoration: none;
        transition: color 150ms var(--ease-smooth);
        z-index: var(--z-overlay);
      }

      .navbar-logo:hover {
        color: var(--color-oven-orange);
      }

      .navbar-logo .logo-lottie {
        flex-shrink: 0;
        display: block;
      }

      .navbar-logo .logo-text {
        line-height: 1;
        letter-spacing: 0.02em;
      }

      @media (max-width: 768px) {
        .navbar-logo .logo-text {
          display: none;
        }
      }

      /* ---- Desktop Links ---- */
      .navbar-links {
        display: none;
        align-items: center;
        gap: 32px;
      }

      @media (min-width: 768px) {
        .navbar-links {
          display: flex;
        }
      }

      .navbar-link {
        font-family: var(--font-body);
        font-size: 0.8rem;
        font-weight: 400;
        letter-spacing: 0.06em;
        text-transform: uppercase;
        color: rgba(255, 248, 240, 0.6);
        text-decoration: none;
        position: relative;
        padding: 4px 0;
        transition: color 200ms var(--ease-smooth);
      }

      .navbar-link::after {
        content: '';
        position: absolute;
        bottom: -2px;
        left: 0;
        width: 0;
        height: 1.5px;
        background-color: var(--color-oven-orange);
        transition: width 300ms var(--ease-cinematic);
      }

      .navbar-link:hover {
        color: var(--color-cream);
      }

      .navbar-link:hover::after,
      .navbar-link.active::after {
        width: 100%;
      }

      .navbar-link.active {
        color: var(--color-cream);
      }

      .navbar-cta {
        display: none;
      }

      @media (min-width: 768px) {
        .navbar-cta {
          display: inline-flex;
        }
      }

      /* ---- Buttons ---- */
      .btn {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        font-family: var(--font-body);
        font-size: 0.875rem;
        font-weight: 500;
        letter-spacing: 0.05em;
        padding: 14px 32px;
        border-radius: var(--radius-md);
        text-transform: uppercase;
        text-decoration: none;
        white-space: nowrap;
        cursor: pointer;
        border: none;
        position: relative;
        overflow: hidden;
        touch-action: manipulation;
        transition: all 300ms var(--ease-cinematic);
        box-sizing: border-box;
      }

      .btn-primary {
        background-color: var(--color-oven-orange);
        color: var(--color-cream);
        box-shadow: var(--shadow-warm-md);
      }

      .btn-primary:hover {
        background-color: var(--color-ember);
        color: var(--color-cream);
        transform: translateY(-2px);
        box-shadow: var(--shadow-warm-lg), var(--shadow-glow-orange);
      }

      .btn-primary:active {
        transform: translateY(0);
      }

      .font-mono {
        font-family: 'JetBrains Mono', monospace;
      }

      .text-center {
        text-align: center;
      }

      .block {
        display: block;
      }

      .w-full {
        width: 100%;
      }

      .mt-4 {
        margin-top: 1rem;
      }

      /* ---- Hamburger Menu ---- */
      .hamburger {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 44px;
        height: 44px;
        cursor: pointer;
        z-index: calc(var(--z-modal) + 10);
        background-color: rgba(26, 15, 8, 0.4);
        border: 1px solid rgba(255, 248, 240, 0.12);
        border-radius: var(--radius-md);
        padding: 0;
        backdrop-filter: blur(8px);
        outline: none;
      }

      @media (min-width: 768px) {
        .hamburger {
          display: none;
        }
      }

      .hamburger-line {
        display: block;
        width: 20px;
        height: 2px;
        background-color: var(--color-cream);
        border-radius: var(--radius-full);
        transition: all 300ms var(--ease-cinematic);
        transform-origin: center;
      }

      .hamburger-line:nth-child(1) {
        margin-bottom: 5px;
      }

      .hamburger-line:nth-child(3) {
        margin-top: 5px;
      }

      .mobile-menu-open .hamburger-line:nth-child(1) {
        transform: translateY(7px) rotate(45deg);
      }

      .mobile-menu-open .hamburger-line:nth-child(2) {
        opacity: 0;
        transform: scaleX(0);
      }

      .mobile-menu-open .hamburger-line:nth-child(3) {
        transform: translateY(-7px) rotate(-45deg);
      }

      /* ---- Mobile Menu ---- */
      .mobile-menu {
        position: fixed;
        inset: 0;
        background-color: rgba(26, 15, 8, 0.98);
        z-index: var(--z-modal);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 32px;
        opacity: 0;
        visibility: hidden;
        transform: translateX(100%);
        transition: all 500ms var(--ease-cinematic);
        box-sizing: border-box;
        padding: 24px;
      }

      .mobile-menu-open .mobile-menu {
        opacity: 1;
        visibility: visible;
        transform: translateX(0);
      }

      .mobile-menu-link {
        font-family: var(--font-display);
        font-size: 1.1rem;
        font-weight: 500;
        color: var(--color-cream);
        text-decoration: none;
        letter-spacing: 0.04em;
        transition: color 200ms var(--ease-smooth);
        padding: 8px 16px;
      }

      .mobile-menu-link:hover {
        color: var(--color-oven-orange);
      }

      .mobile-menu .btn-primary {
        margin-top: 24px;
      }

      .hamburger,
      .hamburger *,
      .mobile-menu,
      .mobile-menu * {
        box-shadow: none !important;
        text-shadow: none !important;
      }
    `;
    document.head.appendChild(styleEl);
  }

  // 4. Load Lottie Web dynamically from CDN for Pizza Script animated logo
  function loadLottie(callback) {
    if (window.lottie) {
      callback(window.lottie);
      return;
    }
    var script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lottie-web/5.12.2/lottie.min.js';
    script.crossOrigin = 'anonymous';
    script.onload = function () {
      callback(window.lottie);
    };
    script.onerror = function () {
      console.warn('Failed to load Lottie CDN, using static text logo fallback');
    };
    document.head.appendChild(script);
  }

  // 5. Active Nav Link detection
  function initActiveNavLink() {
    var currentPath = window.location.pathname.replace(/\/+$/, '') || '/';
    var links = document.querySelectorAll('.navbar-link, .mobile-menu-link');
    links.forEach(function (link) {
      link.classList.remove('active');
      var href = link.getAttribute('href');
      if (!href) return;

      try {
        var linkUrl = new URL(href, window.location.href);
        var linkPath = linkUrl.pathname.replace(/\/+$/, '') || '/';

        if (linkPath === '/blog' && (currentPath === '/blog' || currentPath.startsWith('/blog/'))) {
          link.classList.add('active');
        } else if (linkPath === '/' && currentPath === '/') {
          link.classList.add('active');
        } else if (linkPath !== '/' && linkPath !== '/blog' && currentPath.startsWith(linkPath)) {
          link.classList.add('active');
        }
      } catch (e) {
        if (href === currentPath) {
          link.classList.add('active');
        }
      }
    });
  }

  // 6. Scroll handler (sticky behaviour and scroll-down hide)
  function initScrollHandler() {
    var lastScrollY = window.scrollY;

    function handleScroll() {
      var scrollY = window.scrollY;
      var navbar = document.querySelector('.navbar');
      if (navbar) {
        if (scrollY > 100) {
          navbar.classList.add('scrolled');
        } else {
          navbar.classList.remove('scrolled');
        }

        var isMobileOpen = document.body.classList.contains('mobile-menu-open');

        // Hide on scroll down, show on scroll up
        if (isMobileOpen) {
          navbar.classList.remove('navbar-hidden');
        } else if (scrollY <= 50) {
          navbar.classList.remove('navbar-hidden');
        } else if (scrollY > lastScrollY) {
          // scrolling down - hide navbar
          navbar.classList.add('navbar-hidden');
        } else if (scrollY < lastScrollY) {
          // scrolling up - show navbar
          navbar.classList.remove('navbar-hidden');
        }
      }

      lastScrollY = scrollY;
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
  }

  // 7. Mobile menu toggle
  function initMobileMenu() {
    var burger = document.querySelector('.hamburger');
    var mobile = document.querySelector('.mobile-menu');
    if (!burger || !mobile) return;

    function toggleMenu() {
      var isOpen = document.body.classList.toggle('mobile-menu-open');
      burger.setAttribute('aria-expanded', isOpen);
    }

    function closeMenu() {
      document.body.classList.remove('mobile-menu-open');
      burger.setAttribute('aria-expanded', 'false');
    }

    burger.addEventListener('click', toggleMenu);

    mobile.querySelectorAll('.mobile-menu-link').forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });

    // Close on escape key
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && document.body.classList.contains('mobile-menu-open')) {
        closeMenu();
      }
    });
  }

  // 8. Handle "Get in Touch" click on the Home page
  function initCtaHandlers() {
    var ctaLinks = document.querySelectorAll('.navbar-cta, .mobile-menu .btn-primary');
    ctaLinks.forEach(function (cta) {
      cta.addEventListener('click', function (e) {
        var isHomePage = window.location.hostname === 'www.pizzascript.com' || window.location.hostname === 'pizzascript.com' || window.location.hostname === 'localhost';
        var isHomePath = window.location.pathname === '/' || window.location.pathname === '/index.html';
        
        if (isHomePage && isHomePath) {
          e.preventDefault();
          var el = document.getElementById('order');
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
          }
          document.body.classList.remove('mobile-menu-open');
        }
      });
    });
  }

  // 9. Core initialization function
  function init() {
    if (document.querySelector('.navbar')) return;

    injectStyles();

    // Create wrapper div
    var wrapper = document.createElement('div');
    wrapper.id = 'ps-header';
    wrapper.innerHTML = navbarHtml;

    // Insert as first child of body
    if (document.body) {
      document.body.insertBefore(wrapper, document.body.firstChild);
    }

    initActiveNavLink();
    initScrollHandler();
    initMobileMenu();
    initCtaHandlers();

    // Load Lottie after DOM injection
    loadLottie(function (lottie) {
      var logoContainer = document.querySelector('.logo-lottie');
      if (logoContainer && lottie) {
        var anim = lottie.loadAnimation({
          container: logoContainer,
          renderer: 'svg',
          loop: true,
          autoplay: true,
          path: baseUrl + '/assets/animations/pizza-glitch-animation.json'
        });

        var logoLink = document.querySelector('.navbar-logo');
        if (logoLink) {
          logoLink.addEventListener('mouseenter', function () {
            anim.goToAndPlay(0, true);
          });
          logoLink.addEventListener('mouseleave', function () {
            anim.stop();
          });
        }
      }
    });
  }

  if (document.body) {
    init();
  } else {
    document.addEventListener('DOMContentLoaded', init);
  }
})();

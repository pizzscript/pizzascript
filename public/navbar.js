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

  // 2. Exact navbar HTML currently being injected by injector.js, with absolute URLs using baseUrl
  var navbarHtml = `
    <div class="sk-scroll-progress"></div>
    <nav class="sk-nav">
      <div class="sk-container sk-nav-inner">
        <a href="${baseUrl}/" class="sk-nav-logo">SAK<span>.</span></a>

        <div class="sk-nav-links">
          <a href="${baseUrl}/" class="sk-nav-link" data-page="home">Home</a>
          <a href="${baseUrl}/about.html" class="sk-nav-link" data-page="about">About</a>
          <a href="${baseUrl}/projects.html" class="sk-nav-link" data-page="projects">Projects</a>
          <a href="${baseUrl}/skills.html" class="sk-nav-link" data-page="skills">Skills</a>
          <a href="${baseUrl}/experience.html" class="sk-nav-link" data-page="experience">Experience</a>
          <a href="${baseUrl}/contact.html" class="sk-nav-link" data-page="contact">Contact</a>
        </div>

        <a href="${baseUrl}/Sohail%20Ahmed%20Khan%202%20(resume).html" class="sk-btn-ghost sk-nav-resume-btn" download>Resume ↓</a>

        <button class="sk-nav-burger" aria-label="Toggle menu">
          <span></span><span></span><span></span>
        </button>
      </div>
    </nav>

    <!-- Mobile overlay -->
    <div class="sk-nav-mobile-overlay"></div>
    <div class="sk-nav-mobile">
      <a href="${baseUrl}/" class="sk-nav-link" data-page="home">Home</a>
      <a href="${baseUrl}/about.html" class="sk-nav-link" data-page="about">About</a>
      <a href="${baseUrl}/projects.html" class="sk-nav-link" data-page="projects">Projects</a>
      <a href="${baseUrl}/skills.html" class="sk-nav-link" data-page="skills">Skills</a>
      <a href="${baseUrl}/experience.html" class="sk-nav-link" data-page="experience">Experience</a>
      <a href="${baseUrl}/contact.html" class="sk-nav-link" data-page="contact">Contact</a>
      <a href="${baseUrl}/assets/Sohail_Ahmed_Khan_Resume.pdf" class="sk-btn-primary" download style="margin-top: 16px; text-align: center; justify-content: center;">Resume ↓</a>
    </div>
  `;

  // 3. Inject CSS styles with Google Fonts and resolved variables to avoid stylesheet dependencies
  function injectStyles() {
    var styleId = 'sk-navbar-styles';
    if (document.getElementById(styleId)) return;

    var styleEl = document.createElement('style');
    styleEl.id = styleId;
    styleEl.textContent = \`
      /* -- google fonts -- */
      @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;600;700;900&family=Share+Tech+Mono&family=Inter:wght@300;400;500;600&display=swap');

      /* -- scroll progress bar -- */
      .sk-scroll-progress {
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        width: 0%;
        background: #00ff41;
        z-index: 10000;
        box-shadow: 0 0 10px #00ff41;
        transition: none;
      }

      /* -- navigation base styles -- */
      .sk-nav {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: 1000;
        height: 70px;
        background: rgba(0, 0, 0, 0.7);
        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px);
        border-bottom: 1px solid rgba(0, 255, 65, 0.15);
        transition: background 0.3s ease, border-color 0.3s ease, transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
      }
      .sk-nav.is-scrolled {
        background: rgba(0, 0, 0, 0.92);
        border-bottom-color: rgba(0, 255, 65, 0.4);
      }
      .sk-nav.sk-nav-hidden {
        transform: translateY(-100%);
      }
      .sk-nav-inner {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 100%;
        width: 100%;
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 32px;
        box-sizing: border-box;
      }
      .sk-nav-logo {
        font-family: 'Orbitron', sans-serif;
        font-size: 1.3rem;
        font-weight: 700;
        color: #e8ffe8;
        letter-spacing: 0.2em;
        text-decoration: none;
        transition: text-shadow 0.3s ease;
        display: flex;
        align-items: center;
      }
      .sk-nav-logo:hover {
        text-shadow: 0 0 15px #00ff41;
        color: #e8ffe8;
      }
      .sk-nav-logo span {
        color: #00ff41;
      }
      .sk-nav-links {
        display: none;
        align-items: center;
        gap: 32px;
      }
      @media (min-width: 768px) {
        .sk-nav-links {
          display: flex;
        }
      }
      .sk-nav-link {
        font-family: 'Share Tech Mono', monospace;
        font-size: 0.75rem;
        color: #a0b8a0;
        text-transform: uppercase;
        letter-spacing: 0.2em;
        text-decoration: none;
        position: relative;
        padding: 4px 0;
        transition: color 0.2s ease;
      }
      .sk-nav-link::after {
        content: '';
        position: absolute;
        bottom: -2px;
        left: 0;
        width: 0;
        height: 1px;
        background: #00ff41;
        box-shadow: 0 0 6px #00ff41;
        transition: width 0.3s ease;
      }
      .sk-nav-link:hover,
      .sk-nav-link.active {
        color: #00ff41;
      }
      .sk-nav-link:hover::after,
      .sk-nav-link.active::after {
        width: 100%;
      }
      .sk-nav-resume-btn {
        display: none;
      }
      @media (min-width: 768px) {
        .sk-nav-resume-btn {
          display: inline-flex;
          font-size: 0.75rem;
          padding: 6px 16px;
        }
      }

      /* Buttons */
      .sk-btn-primary,
      .sk-btn-ghost {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        font-family: 'Share Tech Mono', monospace;
        font-size: 0.8rem;
        letter-spacing: 0.2em;
        text-transform: uppercase;
        padding: 12px 32px;
        border-radius: 2px;
        cursor: pointer;
        text-decoration: none;
        position: relative;
        overflow: hidden;
        transition: all 0.3s ease;
        box-sizing: border-box;
      }
      .sk-btn-primary {
        background: transparent;
        border: 1px solid #00ff41;
        color: #00ff41;
        box-shadow: 0 0 8px rgba(0, 255, 65, 0.2);
        z-index: 1;
      }
      .sk-btn-primary::before {
        content: '';
        position: absolute;
        inset: 0;
        background: #00ff41;
        transform: scaleX(0);
        transform-origin: left;
        transition: transform 0.35s ease;
        z-index: -1;
      }
      .sk-btn-primary:hover {
        color: #000000;
        box-shadow: 0 0 30px rgba(0, 255, 65, 0.3), 0 0 60px rgba(0, 255, 65, 0.1);
      }
      .sk-btn-primary:hover::before {
        transform: scaleX(1);
      }
      .sk-btn-ghost {
        background: transparent;
        border: 1px solid rgba(0, 255, 65, 0.15);
        color: #a0b8a0;
      }
      .sk-btn-ghost:hover {
        border-color: #00cc33;
        color: #00ff9f;
        box-shadow: 0 0 15px rgba(0, 255, 65, 0.1);
      }

      /* Hamburger menu */
      .sk-nav-burger {
        display: flex;
        flex-direction: column;
        gap: 5px;
        background: none;
        border: none;
        cursor: pointer;
        padding: 8px;
        z-index: 1010;
        outline: none;
      }
      @media (min-width: 768px) {
        .sk-nav-burger {
          display: none;
        }
      }
      .sk-nav-burger span {
        display: block;
        width: 24px;
        height: 2px;
        background: #00ff41;
        border-radius: 2px;
        transition: transform 0.3s ease, opacity 0.3s ease;
      }
      .sk-nav-burger.is-open span:nth-child(1) {
        transform: translateY(7px) rotate(45deg);
      }
      .sk-nav-burger.is-open span:nth-child(2) {
        opacity: 0;
      }
      .sk-nav-burger.is-open span:nth-child(3) {
        transform: translateY(-7px) rotate(-45deg);
      }

      /* Mobile overlay and container */
      .sk-nav-mobile {
        position: fixed;
        top: 0;
        right: -100%;
        width: 280px;
        height: 100vh;
        background: rgba(5, 10, 5, 0.97);
        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px);
        border-left: 1px solid rgba(0, 255, 65, 0.15);
        z-index: 1005;
        display: flex;
        flex-direction: column;
        padding: calc(70px + 32px) 32px 32px;
        gap: 16px;
        transition: right 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        box-sizing: border-box;
      }
      .sk-nav-mobile.is-open {
        right: 0;
      }
      .sk-nav-mobile-overlay {
        position: fixed;
        inset: 0;
        background: rgba(0, 0, 0, 0.6);
        z-index: 1004;
        opacity: 0;
        pointer-events: none;
        transition: opacity 0.3s ease;
      }
      .sk-nav-mobile-overlay.is-open {
        opacity: 1;
        pointer-events: auto;
      }
      .sk-nav-mobile .sk-nav-link {
        font-size: 0.875rem;
        padding: 8px 0;
        border-bottom: 1px solid rgba(0, 255, 65, 0.15);
        display: block;
      }
    \`;
    document.head.appendChild(styleEl);
  }

  // 4. Active Nav Link detection
  function initActiveNavLink() {
    var currentPath = window.location.pathname.replace(/\/+$/, '') || '/';
    var currentHost = window.location.host;
    var links = document.querySelectorAll('.sk-nav-link');
    links.forEach(function (link) {
      link.classList.remove('active');
      var href = link.getAttribute('href');
      if (!href) return;
      try {
        var linkUrl = new URL(href, window.location.href);
        if (linkUrl.host === currentHost) {
          var linkPath = linkUrl.pathname.replace(/\/+$/, '') || '/';
          if (currentPath === '/' && linkPath === '/') {
            link.classList.add('active');
          } else if (linkPath !== '/' && currentPath.startsWith(linkPath)) {
            link.classList.add('active');
          }
        }
      } catch (e) {
        if (currentPath === href) {
          link.classList.add('active');
        }
      }
    });
  }

  // 5. Scroll progress bar & header is-scrolled background toggle
  function initScrollHandler() {
    var lastScrollY = window.scrollY;

    function handleScroll() {
      var scrollY = window.scrollY;
      var navbar = document.querySelector('.sk-nav');
      if (navbar) {
        if (scrollY > 100) {
          navbar.classList.add('is-scrolled');
        } else {
          navbar.classList.remove('is-scrolled');
        }

        // Check if mobile menu is currently open
        var isMobileOpen = false;
        var burger = document.querySelector('.sk-nav-burger');
        if (burger && burger.classList.contains('is-open')) {
          isMobileOpen = true;
        }

        // Hide on scroll down, show on scroll up
        if (isMobileOpen) {
          navbar.classList.remove('sk-nav-hidden');
        } else if (scrollY <= 50) {
          navbar.classList.remove('sk-nav-hidden');
        } else if (scrollY > lastScrollY) {
          // scrolling down - hide navbar
          navbar.classList.add('sk-nav-hidden');
        } else if (scrollY < lastScrollY) {
          // scrolling up - show navbar
          navbar.classList.remove('sk-nav-hidden');
        }
      }

      lastScrollY = scrollY;

      var scrollProgress = document.querySelector('.sk-scroll-progress');
      if (scrollProgress) {
        var limit = Math.max(
          document.body.scrollHeight,
          document.body.offsetHeight,
          document.documentElement.clientHeight,
          document.documentElement.scrollHeight,
          document.documentElement.offsetHeight
        ) - window.innerHeight;
        var percent = limit > 0 ? (scrollY / limit) * 100 : 0;
        scrollProgress.style.width = percent + '%';
      }
    }

    window.addEventListener('scroll', handleScroll);
    handleScroll();
  }

  // 6. Mobile menu handlers
  function initMobileMenu() {
    var burger = document.querySelector('.sk-nav-burger');
    var mobile = document.querySelector('.sk-nav-mobile');
    var overlay = document.querySelector('.sk-nav-mobile-overlay');
    if (!burger || !mobile) return;

    function toggleMenu() {
      var isOpen = mobile.classList.toggle('is-open');
      burger.classList.toggle('is-open');
      if (overlay) overlay.classList.toggle('is-open');
      document.body.style.overflow = isOpen ? 'hidden' : '';
    }

    function closeMenu() {
      mobile.classList.remove('is-open');
      burger.classList.remove('is-open');
      if (overlay) overlay.classList.remove('is-open');
      document.body.style.overflow = '';
    }

    burger.addEventListener('click', toggleMenu);
    if (overlay) overlay.addEventListener('click', closeMenu);

    mobile.querySelectorAll('.sk-nav-link').forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });
  }

  // 7. Core initialization function
  function init() {
    // Avoid double injection
    if (document.querySelector('.sk-nav')) return;

    injectStyles();

    // Create wrapper div
    var wrapper = document.createElement('div');
    wrapper.id = 'sk-header';
    wrapper.innerHTML = navbarHtml;

    // Insert it as the first child of document.body
    if (document.body) {
      document.body.insertBefore(wrapper, document.body.firstChild);
    }

    initActiveNavLink();
    initScrollHandler();
    initMobileMenu();
  }

  // Ensure body element exists before insertion
  if (document.body) {
    init();
  } else {
    document.addEventListener('DOMContentLoaded', init);
  }
})();

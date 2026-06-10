import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface NavbarProps {
  isScrolled?: boolean;
  isNavbarVisible?: boolean;
}

export default function Navbar(_props: NavbarProps) {
  const location = useLocation();

  useEffect(() => {
    // 1. Dynamically load the navbar script if it's not already loaded
    const scriptId = 'pizzascript-navbar-script';
    let script = document.getElementById(scriptId) as HTMLScriptElement;
    if (!script) {
      script = document.createElement('script');
      script.id = scriptId;
      script.src = (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
        ? '/navbar.js'
        : 'https://www.pizzascript.com/navbar.js';
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  useEffect(() => {
    // 2. Update active nav links on route changes
    const currentPath = location.pathname.replace(/\/+$/, '') || '/';
    const currentHost = window.location.host;
    const links = document.querySelectorAll('.sk-nav-link');
    links.forEach((link) => {
      link.classList.remove('active');
      const href = link.getAttribute('href');
      if (!href) return;
      try {
        const linkUrl = new URL(href, window.location.origin);
        if (linkUrl.host === currentHost) {
          const linkPath = linkUrl.pathname.replace(/\/+$/, '') || '/';
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
  }, [location.pathname]);

  return null;
}


import { useRef, useState, useEffect, useCallback } from 'react';

interface NavbarProps {
  isScrolled: boolean;
  isNavbarVisible?: boolean;
}

const NAV_LINKS = [
  { href: '#dough', label: 'Foundation', section: 'dough' },
  { href: '#toppings', label: 'Features', section: 'toppings' },
  { href: '#baking', label: 'Process', section: 'baking' },
  { href: '#chef-specials', label: 'Work', section: 'chef-specials' },
  { href: '#reviews', label: 'Reviews', section: 'reviews' },
];

const MOBILE_LINKS = [
  { href: '#dough', label: 'Foundation' },
  { href: '#toppings', label: 'Features' },
  { href: '#baking', label: 'Process' },
  { href: '#removing', label: 'Launch' },
  { href: '#chef-specials', label: 'Work' },
  { href: '#reviews', label: 'Reviews' },
];

export default function Navbar({ isScrolled, isNavbarVisible = true }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const logoRef = useRef<HTMLImageElement>(null);

  // Active section highlighting via IntersectionObserver
  useEffect(() => {
    const sections = document.querySelectorAll('main .section, main .cin-section, main .sequence-scroll-driver');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: '-80px 0px -50% 0px',
      }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  // Close mobile menu on Escape
  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileOpen) {
        setMobileOpen(false);
      }
    };
    document.addEventListener('keydown', handleKeydown);
    return () => document.removeEventListener('keydown', handleKeydown);
  }, [mobileOpen]);

  // Toggle body class for mobile menu
  useEffect(() => {
    if (mobileOpen) {
      document.body.classList.add('mobile-menu-open');
    } else {
      document.body.classList.remove('mobile-menu-open');
    }
    return () => document.body.classList.remove('mobile-menu-open');
  }, [mobileOpen]);

  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      if (href.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          setMobileOpen(false);
          const lenis = (window as unknown as Record<string, unknown>).lenis as
            | { scrollTo: (target: Element) => void }
            | undefined;
          if (lenis) {
            lenis.scrollTo(target);
          } else {
            target.scrollIntoView({ behavior: 'smooth' });
          }
        }
      }
    },
    []
  );

  return (
    <header
      className={`navbar${isScrolled ? ' scrolled' : ''}${!isNavbarVisible && !mobileOpen ? ' navbar-hidden' : ''}`}
      id="navbar"
      role="banner"
    >
      <div className="navbar-inner">
        <a
          href="#kitchen"
          className="navbar-logo"
          aria-label="Pizza Script — Back to top"
          onClick={(e) => handleNavClick(e, '#kitchen')}
        >
          <img
            ref={logoRef}
            src="/assets/images/pizzascript-logo.webp"
            alt="Pizza Script"
            style={{ width: 36, height: 36, borderRadius: '50%', objectFit: 'cover' }}
          />
          <span className="logo-text">Pizza Script</span>
        </a>

        <nav
          className="navbar-links"
          role="navigation"
          aria-label="Main navigation"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.section}
              href={link.href}
              className={`navbar-link${activeSection === link.section ? ' active' : ''}`}
              data-section={link.section}
              onClick={(e) => handleNavClick(e, link.href)}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#order"
            className="btn btn-primary navbar-cta"
            aria-label="Go to the contact form"
            onClick={(e) => handleNavClick(e, '#order')}
            style={{ padding: '10px 24px', fontSize: '0.75rem' }}
          >
            Get in Touch
          </a>
        </nav>

        <button
          className="hamburger"
          id="hamburger"
          aria-label="Toggle mobile navigation menu"
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          onClick={() => setMobileOpen((prev) => !prev)}
        >
          <span className="hamburger-line" />
          <span className="hamburger-line" />
          <span className="hamburger-line" />
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className="mobile-menu"
        id="mobile-menu"
        role="navigation"
        aria-label="Mobile navigation"
      >
        {MOBILE_LINKS.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="mobile-menu-link"
            onClick={(e) => handleNavClick(e, link.href)}
          >
            {link.label}
          </a>
        ))}
        <a
          href="#order"
          className="btn btn-primary"
          onClick={(e) => handleNavClick(e, '#order')}
        >
          Get in Touch
        </a>
      </div>
    </header>
  );
}

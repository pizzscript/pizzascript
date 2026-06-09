import { useRef, useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLottie } from '../hooks/useLottie';

interface NavbarProps {
  isScrolled: boolean;
  isNavbarVisible?: boolean;
}

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/services', label: 'Services' },
  { to: '/portfolio', label: 'Portfolio' },
  { to: '/about', label: 'About' },
];

export default function Navbar({ isScrolled, isNavbarVisible = true }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const lottieContainerRef = useRef<HTMLDivElement>(null);
  
  const animRef = useLottie(lottieContainerRef, {
    path: '/assets/animations/pizza-glitch-animation.json',
    loop: true,
    autoplay: true,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  });

  const handleMouseEnter = () => {
    if (animRef.current) {
      animRef.current.goToAndPlay(0, true);
    }
  };

  const handleMouseLeave = () => {
    if (animRef.current) {
      animRef.current.stop();
    }
  };

  // Close mobile menu on Escape key
  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileOpen) {
        setMobileOpen(false);
      }
    };
    document.addEventListener('keydown', handleKeydown);
    return () => document.removeEventListener('keydown', handleKeydown);
  }, [mobileOpen]);

  // Toggle body scroll locking when mobile menu is active
  useEffect(() => {
    if (mobileOpen) {
      document.body.classList.add('mobile-menu-open');
    } else {
      document.body.classList.remove('mobile-menu-open');
    }
    return () => document.body.classList.remove('mobile-menu-open');
  }, [mobileOpen]);

  // Close menu on navigation
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const isHome = location.pathname === '/';

  const handleGetInTouchClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (location.pathname === '/') {
      e.preventDefault();
      const el = document.getElementById('order');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
      setMobileOpen(false);
    }
  };

  return (
    <header
      className={`navbar${isScrolled ? ' scrolled' : ''}${!isNavbarVisible && !mobileOpen ? ' navbar-hidden' : ''}${!isHome ? ' navbar-sticky' : ''}`}
      id="navbar"
      role="banner"
    >
      <div className="navbar-inner">
        <Link
          to="/"
          className="navbar-logo"
          aria-label="Pizza Script Logo"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div
            ref={lottieContainerRef}
            className="logo-lottie"
            style={{ width: '40px', height: '40px' }}
          />
          <span className="logo-text">Pizza Script</span>
        </Link>

        <nav
          className="navbar-links"
          role="navigation"
          aria-label="Main navigation"
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`navbar-link${location.pathname === link.to ? ' active' : ''}`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/#order"
            className="btn btn-primary navbar-cta font-mono"
            aria-label="Go to contact section"
            style={{ padding: '10px 24px', fontSize: '0.75rem' }}
            onClick={handleGetInTouchClick}
          >
            Get in Touch
          </Link>
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
        {NAV_LINKS.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className={`mobile-menu-link${location.pathname === link.to ? ' active' : ''}`}
          >
            {link.label}
          </Link>
        ))}
        <Link
          to="/#order"
          className="btn btn-primary mt-4 font-mono text-center block w-full"
          onClick={handleGetInTouchClick}
        >
          Get in Touch
        </Link>
      </div>
    </header>
  );
}

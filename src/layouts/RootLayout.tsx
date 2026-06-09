import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useScrollEngine } from '../hooks/useScrollEngine';
import { useScrollProgress } from '../hooks/useScrollProgress';
import { useScrollReveal } from '../hooks/useScrollReveal';

import SkipToContent from '../components/SkipToContent';
import Preloader from '../components/Preloader';
import MatrixBackground from '../components/MatrixBackground';
import ScrollProgress from '../components/ScrollProgress';
import Navbar from '../components/Navbar';
import SectionNav from '../components/SectionNav';
import Footer from '../sections/Footer';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function RootLayout() {
  // Initialize scroll engine
  useScrollEngine();
  const { scrollPercent, isScrolled, showBackToTop, isNavbarVisible } = useScrollProgress();
  useScrollReveal();

  const location = useLocation();

  // Scroll to top or to hash element on route change & refresh ScrollTrigger
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 350);
    } else {
      window.scrollTo(0, 0);
    }
    
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);
  }, [location.pathname, location.hash]);

  const isHome = location.pathname === '/';

  return (
    <>
      {/* Skip to Content */}
      <SkipToContent />

      {/* Preloader */}
      <Preloader />

      {/* Matrix Retro Background */}
      <MatrixBackground />

      {/* Scroll Progress Bar */}
      <ScrollProgress percent={scrollPercent} />

      {/* Navigation */}
      <Navbar isScrolled={isScrolled} isNavbarVisible={isNavbarVisible} />

      {/* Page Content */}
      <main id="main-content">
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />

      {/* Pagination Dot Navigation (Only active on Home Page sections) */}
      <SectionNav visible={showBackToTop && isHome} />
    </>
  );
}

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
    const lenis = (window as any).lenis;

    if (location.hash) {
      const id = location.hash.replace('#', '');
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          if (lenis) {
            lenis.scrollTo(element, { immediate: false });
          } else {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }
      }, 350);
    } else {
      if (lenis) {
        lenis.scrollTo(0, { immediate: true });
      } else {
        window.scrollTo(0, 0);
      }
    }

    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    let observer: IntersectionObserver | null = null;

    // Re-run scroll reveal for newly rendered page elements.
    // RootLayout never unmounts on navigation, so the hook's [] effect
    // won't re-fire — we manually re-observe after the new page DOM paints.
    const revealTimer = setTimeout(() => {
      const animatedElements = document.querySelectorAll('[data-animate]:not(.animate-in)');
      if (animatedElements.length > 0) {
        observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer?.unobserve(entry.target);
              }
            });
          },
          { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
        );
        animatedElements.forEach((el) => observer?.observe(el));
      }
    }, 150);

    return () => {
      clearTimeout(revealTimer);
      if (observer) {
        observer.disconnect();
      }
    };
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

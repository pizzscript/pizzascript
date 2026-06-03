import { useScrollEngine } from './hooks/useScrollEngine';
import { useScrollProgress } from './hooks/useScrollProgress';
import { useScrollReveal } from './hooks/useScrollReveal';

import SkipToContent from './components/SkipToContent';
import Preloader from './components/Preloader';
import MatrixBackground from './components/MatrixBackground';
import ScrollProgress from './components/ScrollProgress';
import Navbar from './components/Navbar';
import SectionNav from './components/SectionNav';
import HeroSection from './sections/HeroSection';
import DoughSection from './sections/DoughSection';
import ToppingsSection from './sections/ToppingsSection';
import BakingSection from './sections/BakingSection';
import RemovingSection from './sections/RemovingSection';
import AromaSection from './sections/AromaSection';
import PortfolioSection from './sections/PortfolioSection';
import ReviewsSection from './sections/ReviewsSection';
import OrderSection from './sections/OrderSection';
import Footer from './sections/Footer';

export default function App() {
  // Initialize smooth scroll engine (Lenis + GSAP)
  useScrollEngine();

  // Track scroll progress for navbar and back-to-top
  const { scrollPercent, isScrolled, showBackToTop, isNavbarVisible } = useScrollProgress();

  // Initialize scroll-reveal animations (IntersectionObserver)
  useScrollReveal();

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

      <main>
        {/* 1. Hero — Approach the pizza shop */}
        <HeroSection />

        {/* 3. Dough — Build the foundation (HTML/CSS/JS) */}
        <DoughSection />

        {/* 4. Toppings — Add features & branding */}
        <ToppingsSection />

        {/* 5. Baking — Optimize & test */}
        <BakingSection />

        {/* 6. Removing — Deploy & launch */}
        <RemovingSection />

        {/* 7. Aroma — SEO & visibility */}
        <AromaSection />

        {/* 8. Portfolio — Showcase work */}
        <PortfolioSection />

        {/* 9. Reviews — Testimonials */}
        <ReviewsSection />

        {/* 10. Contact — Place your order */}
        <OrderSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Section Pagination Nav */}
      <SectionNav visible={showBackToTop} />
    </>
  );
}

import { useScrollEngine } from './hooks/useScrollEngine';
import { useScrollProgress } from './hooks/useScrollProgress';
import { useScrollReveal } from './hooks/useScrollReveal';

import SkipToContent from './components/SkipToContent';
import Preloader from './components/Preloader';
import ScrollProgress from './components/ScrollProgress';
import Navbar from './components/Navbar';
import BackToTop from './components/BackToTop';
<<<<<<< HEAD

import HeroSection from './sections/HeroSection';
import DoughSection from './sections/DoughSection';
import ToppingsSection from './sections/ToppingsSection';
import BakingSection from './sections/BakingSection';
import RemovingSection from './sections/RemovingSection';
import AromaSection from './sections/AromaSection';
=======
import Divider from './components/Divider';

import HeroSection from './sections/HeroSection';
import SpecialsSection from './sections/SpecialsSection';
import PantrySection from './sections/PantrySection';
import RecipeSection from './sections/RecipeSection';
>>>>>>> 50d74942736eff6c8c9a49b5f069202d1d28c8f1
import PortfolioSection from './sections/PortfolioSection';
import ReviewsSection from './sections/ReviewsSection';
import OrderSection from './sections/OrderSection';
import Footer from './sections/Footer';

export default function App() {
  // Initialize smooth scroll engine (Lenis + GSAP)
  useScrollEngine();

  // Track scroll progress for navbar and back-to-top
<<<<<<< HEAD
  const { scrollPercent, isScrolled, showBackToTop, isNavbarVisible } = useScrollProgress();
=======
  const { scrollPercent, isScrolled, showBackToTop } = useScrollProgress();
>>>>>>> 50d74942736eff6c8c9a49b5f069202d1d28c8f1

  // Initialize scroll-reveal animations (IntersectionObserver)
  useScrollReveal();

  return (
    <>
      {/* Skip to Content */}
      <SkipToContent />

      {/* Preloader */}
      <Preloader />

      {/* Scroll Progress Bar */}
      <ScrollProgress percent={scrollPercent} />

      {/* Navigation */}
<<<<<<< HEAD
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
=======
      <Navbar isScrolled={isScrolled} />

      <main>
        {/* Section 1: The Kitchen (Hero) */}
        <HeroSection />

        {/* Section 2: Today's Specials (Services) */}
        <SpecialsSection />

        {/* Divider: Torn */}
        <Divider type="torn" />

        {/* Section 3: The Pantry (Skills) */}
        <PantrySection />

        {/* Divider: Dotted */}
        <Divider type="dotted" icon="🍕" />

        {/* Section 4: The Recipe (Process) */}
        <RecipeSection />

        {/* Divider: Torn */}
        <Divider type="torn" />

        {/* Section 5: Chef's Specials (Portfolio) */}
        <PortfolioSection />

        {/* Divider: Dotted */}
        <Divider type="dotted" icon="⭐" />

        {/* Section 6: Happy Customers (Testimonials) */}
        <ReviewsSection />

        {/* Divider: Steam */}
        <Divider type="steam" />

        {/* Section 7: Place Your Order (Contact) */}
>>>>>>> 50d74942736eff6c8c9a49b5f069202d1d28c8f1
        <OrderSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Back to Top */}
      <BackToTop visible={showBackToTop} />
    </>
  );
}

import SEO from '../components/SEO';
import HeroSection from '../sections/HeroSection';
import MenuSection from '../sections/MenuSection';
import DoughSection from '../sections/DoughSection';
import ToppingsSection from '../sections/ToppingsSection';
import BakingSection from '../sections/BakingSection';
import RemovingSection from '../sections/RemovingSection';
import AromaSection from '../sections/AromaSection';
import PortfolioSection from '../sections/PortfolioSection';
import ReviewsSection from '../sections/ReviewsSection';
import OrderSection from '../sections/OrderSection';
import { getLocalBusinessSchema } from '../utils/schema';

export default function Home() {
  const schema = getLocalBusinessSchema();

  return (
    <>
      <SEO
        title="Hand-Crafted Websites, Made from Scratch"
        description="Freelance web developer cooking up custom-built websites, web apps, and creative UI/UX designs. High performance, zero shortcuts, 100% organic code."
        keywords="freelance web developer, custom websites, react developer, performance optimization, Pune web design, technical SEO, frontend engineer"
        canonicalUrl="/"
        schema={schema}
      />
      
      {/* 1. Hero — Approach the pizza shop */}
      <HeroSection />

      {/* 2. Menu — Choose the tech stack */}
      <MenuSection />

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
    </>
  );
}

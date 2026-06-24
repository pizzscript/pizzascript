import { Routes, Route } from 'react-router-dom';
import RootLayout from '../layouts/RootLayout';
import Home from '../pages/Home';
import ServicesHub from '../pages/ServicesHub';
import CustomWebsiteDevelopment from '../pages/services/CustomWebsiteDevelopment';
import BusinessWebsites from '../pages/services/BusinessWebsites';
import LandingPageDevelopment from '../pages/services/LandingPageDevelopment';
import WebsiteRedesign from '../pages/services/WebsiteRedesign';
import SEOFriendlyWebsites from '../pages/services/SEOFriendlyWebsites';
import WebsiteMaintenance from '../pages/services/WebsiteMaintenance';
import WebsiteSpeedOptimization from '../pages/services/WebsiteSpeedOptimization';
import PortfolioHub from '../pages/PortfolioHub';
import CaseStudy from '../pages/CaseStudy';
import About from '../pages/About';
import FreelancePune from '../pages/landing/FreelancePune';

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<RootLayout />}>
        {/* Main Routes */}
        <Route index element={<Home />} />
        
        {/* Services */}
        <Route path="services" element={<ServicesHub />} />
        <Route path="services/custom-website-development" element={<CustomWebsiteDevelopment />} />
        <Route path="services/business-websites" element={<BusinessWebsites />} />
        <Route path="services/landing-page-development" element={<LandingPageDevelopment />} />
        <Route path="services/website-redesign" element={<WebsiteRedesign />} />
        <Route path="services/seo-friendly-websites" element={<SEOFriendlyWebsites />} />
        <Route path="services/website-maintenance" element={<WebsiteMaintenance />} />
        <Route path="services/website-speed-optimization" element={<WebsiteSpeedOptimization />} />
        
        {/* Portfolio */}
        <Route path="portfolio" element={<PortfolioHub />} />
        <Route path="portfolio/:slug" element={<CaseStudy />} />
        
        {/* General */}
        <Route path="about" element={<About />} />
        
        {/* Fallback */}
        <Route path="*" element={<Home />} />
      </Route>

      {/* Standalone Landing Pages */}
      <Route path="/freelance-pune" element={<FreelancePune />} />
    </Routes>
  );
}


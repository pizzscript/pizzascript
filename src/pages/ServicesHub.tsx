import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { getBreadcrumbSchema } from '../utils/schema';

const SERVICES = [
  {
    slug: 'custom-website-development',
    title: 'Custom Website Development',
    desc: 'Unique, bespoke websites built from scratch. Bypassing slow, generic templates for hand-crafted React layouts that represent your brand and convert visitors.',
    keyword: 'Custom Website Developer',
    metric: '100/100 Lighthouse Speed',
    image: '/assets/images/service_custom_website.png'
  },
  {
    slug: 'business-websites',
    title: 'Business Website Development',
    desc: 'Establish digital credibility and capture continuous inquiries. Secure contact form routes, click-to-chat WhatsApp hooks, and Google Maps local integrations.',
    keyword: 'Corporate Website Design',
    metric: '3x Conversion Lift',
    image: '/assets/images/service_business_websites.png'
  },
  {
    slug: 'landing-page-development',
    title: 'Landing Page Development',
    desc: 'High-conversion single page platforms built to capture campaign traffic. Optimized headings layout, absolute minimum bounce parameters, and fast serverless forms.',
    keyword: 'Campaign Landing Page',
    metric: 'Sub-1.0s Load Time',
    image: '/assets/images/service_landing_pages.png'
  },
  {
    slug: 'website-redesign',
    title: 'Website Redesign Services',
    desc: 'Modernize outdated layouts and regain lost visitors. User experience design overhauls, Core Web Vitals optimization, and careful 301 URL redirect maps.',
    keyword: 'Website Revamp Services',
    metric: 'Reduce 45% Bounce Rate',
    image: '/assets/images/service_redesign.png'
  },
  {
    slug: 'seo-friendly-websites',
    title: 'SEO-Friendly Website Development',
    desc: 'Build search engine authority from day one. Google index pre-rendering, nested metadata headers configurations, and structural schema markup injections.',
    keyword: 'Technical SEO Development',
    metric: '100% Crawl Index Rate',
    image: '/assets/images/service_seo_friendly.png'
  },
  {
    slug: 'website-maintenance',
    title: 'Website Maintenance & Support',
    desc: 'Continuous protection for custom web applications. Automated backup streams, 24/7 security scans alerts, package updates, and quick copy changes sync.',
    keyword: 'Technical Support & Updates',
    metric: '99.99% Global Uptime',
    image: '/assets/images/service_maintenance.png'
  },
  {
    slug: 'website-speed-optimization',
    title: 'Website Speed Optimization',
    desc: 'Achieve lightning-fast execution times. Image compressions, CSS stylesheet tree shaking, browser caching, and Google Core Web Vitals optimizations.',
    keyword: 'Core Web Vitals Optimizer',
    metric: 'Sub-1.0s Paint LCP',
    image: '/assets/images/service_speed_optimization.png'
  }
];

export default function ServicesHub() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Home', url: 'https://pizzascript.dev' },
    { name: 'Services', url: 'https://pizzascript.dev/services' }
  ]);

  // Card Mouse Move Dynamic Tilt Handlers
  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLElement>) => {
    const card = e.currentTarget;
    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
  };

  return (
    <>
      <SEO
        title="Custom Web Development & Technical Services"
        description="High-performance web development services: React frontend engineering, JavaScript SEO, Core Web Vitals optimization, Cloudedge hosting, and GSAP scroll animations."
        keywords="react developer services, web performance optimization, technical javascript seo, custom website design pune"
        canonicalUrl="/services"
        schema={breadcrumbSchema}
      />

      {/* Subtle Background Code Animation */}
      <div className="code-pattern-bg">
        <div className="scrolling-code grid grid-cols-6 gap-8 w-full opacity-30">
          <div className="matrix-text">PIZZA SCRIPT PIZZA SCRIPT PIZZA SCRIPT PIZZA SCRIPT PIZZA SCRIPT PIZZA SCRIPT</div>
          <div className="matrix-text" style={{ animationDelay: '-20s' }}>DEPLOY REACT VITE NEXT TAILWIND CLOUDFLARE VERCEL</div>
          <div className="matrix-text" style={{ animationDelay: '-40s' }}>01011010 11001010 10101010 00111100 11110000</div>
          <div className="matrix-text" style={{ animationDelay: '-60s' }}>ENGINEERING INFRASTRUCTURE PERFORMANCE OPTIMIZATION</div>
          <div className="matrix-text" style={{ animationDelay: '-10s' }}>COMPILING... RUNNING... CACHING... SCALING...</div>
          <div className="matrix-text" style={{ animationDelay: '-35s' }}>GSAP LENIS THREEJS WEBGL SHADER CANVAS ANIMATION</div>
        </div>
      </div>

      <div className="pt-32 pb-section-gap px-gutter max-w-container-max mx-auto relative">
        {/* Hero Section */}
        <div className="mb-section-gap relative z-10">
          <p className="font-eyebrow-mono text-primary-container text-eyebrow-mono mb-4">// Capabilities</p>
          <h1 className="font-display-lg text-display-lg text-on-surface mb-6 max-w-4xl">
            Our Web <span className="font-display-lg-italic italic text-display-lg-italic text-primary-container">Engineering</span> Services
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl leading-relaxed">
            We compile clean, standard-compliant frontend components and optimize serverless infrastructure. No templates, no bloat, just high-performance digital systems crafted for results.
          </p>
        </div>

        {/* Service Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service) => (
            <Link
              key={service.slug}
              to={`/services/${service.slug}`}
              className="glass-card rounded-xl flex flex-col h-full group/card"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              <div className="h-48 md:h-52 bg-surface-container-lowest overflow-hidden relative rounded-lg mb-5 group">
                <img
                  className="w-full h-full object-cover opacity-70 group-hover:scale-105 transition-transform duration-700"
                  src={service.image}
                  alt={service.title}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b0604]/80 to-transparent"></div>
              </div>
              <div className="flex flex-col flex-grow">
                <p className="font-eyebrow-mono text-primary-container text-label-sm mb-2 uppercase">
                  // {service.keyword}
                </p>
                <h3 className="font-headline-sm text-headline-sm text-on-surface mb-3 group-hover/card:text-primary-container transition-colors">
                  {service.title}
                </h3>
                <p className="font-body-md text-body-md text-on-surface-variant mb-6 flex-grow leading-relaxed">
                  {service.desc}
                </p>
                <div className="flex items-center justify-between mt-auto">
                  <span className="perf-badge">{service.metric}</span>
                  <span className="group/link flex items-center gap-2 font-eyebrow-mono text-label-sm text-on-surface group-hover/card:text-primary-container transition-colors">
                    Inspect Detail{' '}
                    <span className="material-symbols-outlined transition-transform group-hover/card:translate-x-1">
                      trending_flat
                    </span>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Metric Ticker (Micro-interaction) */}
        <div className="mt-section-gap border-y border-outline-variant/20 py-8 overflow-hidden">
          <div className="flex whitespace-nowrap animate-marquee items-center gap-12 font-eyebrow-mono text-on-surface-variant text-label-sm">
            <span>SYSTEM_STATUS: <span className="text-primary-container">OPTIMIZED</span></span>
            <span className="material-symbols-outlined text-[10px]" style={{ fontVariationSettings: "'FILL' 1" }}>circle</span>
            <span>BUILD_TIME: <span className="text-primary-container">42ms</span></span>
            <span className="material-symbols-outlined text-[10px]" style={{ fontVariationSettings: "'FILL' 1" }}>circle</span>
            <span>VULNERABILITIES: <span className="text-primary-container">0</span></span>
            <span className="material-symbols-outlined text-[10px]" style={{ fontVariationSettings: "'FILL' 1" }}>circle</span>
            <span>UPTIME: <span className="text-primary-container">99.999%</span></span>
            <span className="material-symbols-outlined text-[10px]" style={{ fontVariationSettings: "'FILL' 1" }}>circle</span>
            <span>SYSTEM_STATUS: <span className="text-primary-container">OPTIMIZED</span></span>
            <span className="material-symbols-outlined text-[10px]" style={{ fontVariationSettings: "'FILL' 1" }}>circle</span>
            <span>BUILD_TIME: <span className="text-primary-container">42ms</span></span>
            <span className="material-symbols-outlined text-[10px]" style={{ fontVariationSettings: "'FILL' 1" }}>circle</span>
          </div>
        </div>
      </div>
    </>
  );
}

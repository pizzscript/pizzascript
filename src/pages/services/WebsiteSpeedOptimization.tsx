import { useState } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../../components/SEO';
import { getServiceSchema, getBreadcrumbSchema } from '../../utils/schema';

export default function WebsiteSpeedOptimization() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const serviceUrl = 'https://www.pizzascript.com/services/website-speed-optimization';
  const serviceSchema = getServiceSchema(
    'Website Speed Optimization',
    'Performance optimization services to boost website speeds and pass Core Web Vitals checks. Image compression, asset cache routing, and Lighthouse score fixes.',
    serviceUrl
  );

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Home', url: 'https://www.pizzascript.com' },
    { name: 'Services', url: 'https://www.pizzascript.com/services' },
    { name: 'Website Speed Optimization', url: serviceUrl }
  ]);

  const faqs = [
    {
      q: 'Why is website speed so important for my business?',
      a: 'Slow websites lose customers. Studies show that a 1-second delay in page load times reduces conversion rates by up to 20%. Fast loading speed also directly impacts your Google SEO rankings, since page speed is a core search ranking factor.'
    },
    {
      q: 'How do you achieve a 100/100 Lighthouse speed score?',
      a: 'We minify and compile styles, compress images, leverage browser cache directories, defer non-critical script files, and structure clean DOM branches to pass Google Core Web Vitals checks instantly.'
    },
    {
      q: 'Will optimizing my site speed break existing website features?',
      a: 'No. We perform optimizations within staging branches first, verifying that all script hooks, contact systems, and interactive tools function properly before going live.'
    }
  ];

  const combinedSchema = {
    "@graph": [
      serviceSchema,
      breadcrumbSchema,
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqs.map(faq => ({
          "@type": "Question",
          "name": faq.q,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.a
          }
        }))
      }
    ]
  };

  return (
    <>
      <SEO
        title="Website Speed Optimization Services | Core Web Vitals"
        description="Premium web performance optimization Pune. Boost loading speeds, achieve 100/100 Lighthouse scores, and optimize Core Web Vitals with custom code refactoring."
        keywords="Website Speed Optimization, Speed Up Website, Core Web Vitals Optimization, Lighthouse Score Optimizer"
        canonicalUrl="/services/website-speed-optimization"
        ogImage="https://lh3.googleusercontent.com/aida-public/AB6AXuCwfSa5avgjn86ghgRR4Jy44y0nR08EO8sZ-KOHYwkCYXJV96AOlvojjXnMXPdTLxEXolnfVINDHfepNecZvAu92Z2DvHwdUxHaWN0yGEqczRGLZ6GBicIT-XZzjuqX6InnRbqhWi7fvw1JeXnr8Z0nlqwNgMjYvuRPafKNI_kGOr0V3sFJWZkkO8zxfe0MMvBrJtZ6dPIJAGs5PzadHEsjxvYobU4TwBWklwxFzw8qVIhYDkTaU2UgHkbmvfIIgE4-KE9WdiRojeI"
        schema={combinedSchema}
      />

      <div className="min-h-screen pt-36 lg:pt-44 pb-16 px-4 md:px-12 lg:px-24 text-cream relative z-10">
        <div className="max-w-6xl mx-auto flex flex-col gap-24">
          {/* Breadcrumb */}
          <div className="text-[10px] font-mono text-stone-500 uppercase tracking-widest">
            <Link to="/" className="hover:text-oven-orange transition-colors">HOME</Link> / <Link to="/services" className="hover:text-oven-orange transition-colors">SERVICES</Link> / <span className="text-oven-orange">SPEED-OPTIMIZATION</span>
          </div>

          {/* Hero Section */}
          <section className="svc-panel grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-7 space-y-6">
              <span className="cin-eyebrow text-xs tracking-widest block uppercase">// SERVICE DETAIL</span>
              <h1 className="cin-heading text-4xl md:text-5xl lg:text-6xl font-serif font-bold leading-tight">
                Website Speed <span className="italic text-primary-container font-serif">Optimization</span>
              </h1>
              <p className="cin-text text-stone-400 text-base leading-relaxed">
                Eliminate page load delays. We refactor source scripts, compress assets, configure advanced edge cache routes, and eliminate cumulative shifts to make your user interfaces load instantly.
              </p>
              <div className="flex gap-4 pt-2">
                <span className="bg-primary-container/10 border border-primary-container/30 text-primary-container px-4 py-1 font-mono text-[10px] uppercase">Lighthouse 100%</span>
                <span className="border border-white/10 text-stone-400 px-4 py-1 font-mono text-[10px] uppercase">Core Web Vitals Pass</span>
              </div>
            </div>

            <div className="lg:col-span-5 relative group">
              <div className="absolute -inset-4 bg-primary-container/10 blur-3xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
              <div className="glass-card p-2 border border-white/10 terminal-glow relative overflow-hidden aspect-square flex items-center justify-center">
                <img
                  className="w-full h-full object-cover opacity-80 grayscale contrast-125 brightness-75 rounded"
                  src="/assets/images/service_speed_optimization.png"
                  alt="Speedometer and Lighthouse performance graphics visual"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent"></div>
                <div className="absolute bottom-8 left-8 right-8">
                  <div className="font-eyebrow-mono text-[10px] text-primary/60 mb-2 uppercase tracking-widest">System Visualization v4.2</div>
                  <div className="h-1 w-full bg-white/10">
                    <div className="h-full bg-primary-container w-[99%] shadow-[0_0_8px_#ff5733]"></div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Technical Specifications */}
          <section className="svc-panel grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="glass-card p-8 border-t-2 border-t-primary-container">
              <span className="font-eyebrow-mono text-eyebrow-mono text-primary-container mb-4 block">// SPEED TOOLKIT</span>
              <h3 className="font-headline-sm text-headline-sm mb-6 text-cream">Speed Core</h3>
              <ul className="space-y-4">
                <li className="flex items-center gap-3 text-stone-300 font-mono text-xs group cursor-default">
                  <span className="material-symbols-outlined text-primary-container text-lg">image</span>
                  <span>Modern AVIF/WebP Compression</span>
                  <span className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity text-primary-container">→</span>
                </li>
                <li className="flex items-center gap-3 text-stone-300 font-mono text-xs group cursor-default">
                  <span className="material-symbols-outlined text-primary-container text-lg">javascript</span>
                  <span>Code Splitting &amp; Deferral</span>
                  <span className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity text-primary-container">→</span>
                </li>
                <li className="flex items-center gap-3 text-stone-300 font-mono text-xs group cursor-default">
                  <span className="material-symbols-outlined text-primary-container text-lg">flash_on</span>
                  <span>CLS Layout Rectifications</span>
                  <span className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity text-primary-container">→</span>
                </li>
              </ul>
            </div>

            {/* Card 2 */}
            <div className="glass-card p-8 border-t-2 border-t-primary-container">
              <span className="font-eyebrow-mono text-eyebrow-mono text-primary-container mb-4 block">// VITALS</span>
              <h3 className="font-headline-sm text-headline-sm mb-6 text-cream">Paint Speeds</h3>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="font-mono text-[10px] text-stone-400">FIRST CONTENTFUL PAINT</span>
                    <span className="font-mono text-[10px] text-primary-container">0.3s</span>
                  </div>
                  <div className="h-1 bg-white/5 w-full">
                    <div className="h-full bg-primary-container w-[98%]"></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="font-mono text-[10px] text-stone-400">LARGEST CONTENTFUL PAINT</span>
                    <span className="font-mono text-[10px] text-primary-container">&lt; 0.9s</span>
                  </div>
                  <div className="h-1 bg-white/5 w-full">
                    <div className="h-full bg-primary-container w-[95%]"></div>
                  </div>
                </div>
                <div className="bg-primary-container/10 p-4 border-l-2 border-primary-container">
                  <p className="font-mono text-[10px] text-primary-container italic">"We route optimized static assets globally through Cloudflare network routes."</p>
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="glass-card p-8 border-t-2 border-t-primary-container">
              <span className="font-eyebrow-mono text-eyebrow-mono text-primary-container mb-4 block">// AUDITS</span>
              <h3 className="font-headline-sm text-headline-sm mb-6 text-cream">Optimization</h3>
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="bg-white/5 px-2.5 py-1 font-mono text-[9px] text-stone-300 border border-white/5">GZIP ASSETS</span>
                <span className="bg-white/5 px-2.5 py-1 font-mono text-[9px] text-stone-300 border border-white/5">CSS CLEANUP</span>
                <span className="bg-white/5 px-2.5 py-1 font-mono text-[9px] text-stone-300 border border-white/5">EDGE CACHING</span>
              </div>
              <div className="text-stone-300 font-mono text-xs space-y-3">
                <p className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-primary-container text-sm">check_circle</span>
                  Perfect desktop &amp; mobile speed
                </p>
                <p className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-primary-container text-sm">check_circle</span>
                  Lazy loaded rendering routes
                </p>
              </div>
            </div>
          </section>

          {/* The Engineering Process */}
          <section className="svc-panel py-20">
            <div className="text-center mb-16">
              <span className="font-eyebrow-mono text-eyebrow-mono text-primary-container block mb-4">// WORKFLOW</span>
              <h2 className="font-display-lg text-display-lg text-cream">The Engineering Process</h2>
            </div>
            <div className="relative">
              <div className="absolute left-1/2 top-16 bottom-16 w-px bg-white/10 -translate-x-1/2 hidden md:block"></div>
              <div className="space-y-16">
                {/* Step 1 */}
                <div className="relative grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                  <div className="md:text-right md:pr-12 lg:pr-16">
                    <span className="font-eyebrow-mono text-eyebrow-mono text-primary-container">01 / AUDIT</span>
                    <h4 className="font-headline-md text-headline-md text-cream mt-2 mb-4">Core Web Vitals Assessment</h4>
                    <p className="font-body-md text-body-md text-stone-400 max-w-lg ml-auto leading-relaxed">
                      Identifying performance bottlenecks, render-blocking scripts, oversized layout images, and slow server routes.
                    </p>
                  </div>
                  <div className="flex justify-center md:justify-center md:pl-12 lg:pl-16">
                    <div className="glass-card p-6 border-primary-container/30">
                      <span className="material-symbols-outlined text-primary-container text-5xl">architecture</span>
                    </div>
                  </div>
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden md:block">
                    <div className="w-4 h-4 bg-primary-container rotate-45 shadow-[0_0_10px_#ff5733]"></div>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="relative grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                  <div className="order-2 md:order-1 flex justify-center md:justify-center md:pr-12 lg:pr-16">
                    <div className="glass-card p-6 border-primary-container/30">
                      <span className="material-symbols-outlined text-primary-container text-5xl">view_quilt</span>
                    </div>
                  </div>
                  <div className="order-1 md:order-2 md:pl-12 lg:pl-16">
                    <span className="font-eyebrow-mono text-eyebrow-mono text-primary-container">02 / OPTIMIZE</span>
                    <h4 className="font-headline-md text-headline-md text-cream mt-2 mb-4">Asset Compression &amp; Splitting</h4>
                    <p className="font-body-md text-body-md text-stone-400 max-w-lg leading-relaxed">
                      Minifying source scripts, building modern WebP images, and eliminating Cumulative Layout Shifts.
                    </p>
                  </div>
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden md:block">
                    <div className="w-4 h-4 bg-primary-container rotate-45"></div>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="relative grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                  <div className="md:text-right md:pr-12 lg:pr-16">
                    <span className="font-eyebrow-mono text-eyebrow-mono text-primary-container">03 / CACHE</span>
                    <h4 className="font-headline-md text-headline-md text-cream mt-2 mb-4">CDN Routing Configurations</h4>
                    <p className="font-body-md text-body-md text-stone-400 max-w-lg ml-auto leading-relaxed">
                      Establishing browser cache headers and routing static site resources through serverless global networks.
                    </p>
                  </div>
                  <div className="flex justify-center md:justify-center md:pl-12 lg:pl-16">
                    <div className="glass-card p-6 border-primary-container/30">
                      <span className="material-symbols-outlined text-primary-container text-5xl">speed</span>
                    </div>
                  </div>
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden md:block">
                    <div className="w-4 h-4 bg-primary-container rotate-45"></div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Case Study Highlight */}
          <section>
            <div className="glass-card p-10 relative overflow-hidden rounded-xl">
              <div className="absolute top-0 right-0 p-8 hidden md:block">
                <span className="bg-primary-container text-on-primary-container px-6 py-2 font-mono text-xs font-bold rotate-12 inline-block">100% PASS ON MOBILE</span>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <span className="font-eyebrow-mono text-eyebrow-mono text-primary-container mb-4 block">// RECENT RESULT</span>
                  <h2 className="font-headline-md text-headline-md text-cream mb-6">Under 1s Paint: retail website speedup</h2>
                  <blockquote className="border-l-4 border-primary-container pl-6 py-2 mb-6">
                    <p className="font-body-lg text-body-lg text-stone-300 italic leading-relaxed">
                      "Our online conversion rate increased by 25% after optimizing our Core Web Vitals. The page loads instantly on mobile, and bounce rates dropped dramatically."
                    </p>
                    <footer className="mt-4 font-mono text-xs text-stone-500">
                      — Marcus Thorne, Chief Development Executive
                    </footer>
                  </blockquote>
                </div>
                <div className="relative">
                  <img
                    className="w-full grayscale opacity-60 border border-white/10 rounded-lg shadow-[4px_4px_0px_rgba(255,87,51,0.25)]"
                    src="/assets/images/case_study_mockup.png"
                    alt="Lighthouse speed optimization speedometer illustration"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Accordion FAQ */}
          <section className="svc-panel border-t border-white/5 pt-16">
            <h2 className="cin-heading text-3xl font-serif font-bold text-cream text-center mb-12">
              Frequently Asked <span className="italic text-primary-container">Questions</span>
            </h2>
            <div className="space-y-4 max-w-3xl mx-auto">
              {faqs.map((faq, idx) => {
                const isOpen = openIndex === idx;
                return (
                  <div key={idx} className={`faq-accordion-card ${isOpen ? 'is-open' : ''}`}>
                    <button
                      onClick={() => setOpenIndex(isOpen ? null : idx)}
                      className="w-full text-left p-5 flex justify-between items-center hover:bg-white/[0.02] transition-colors focus:outline-none"
                    >
                      <span className="font-serif font-bold text-base md:text-lg text-cream">{faq.q}</span>
                      <span className={`material-symbols-outlined text-primary-container text-xl transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                        expand_more
                      </span>
                    </button>
                    <div className={`faq-accordion-content ${isOpen ? 'is-open' : ''}`}>
                      <div className="p-5 pt-0 border-t border-white/5 text-stone-400 text-sm leading-relaxed">
                        {faq.a}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

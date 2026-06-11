import { useState } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../../components/SEO';
import { getServiceSchema, getBreadcrumbSchema } from '../../utils/schema';

export default function CustomWebsiteDevelopment() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const serviceUrl = 'https://www.pizzascript.com/services/custom-website-development';
  const serviceSchema = getServiceSchema(
    'Custom Website Development',
    'Bespoke website design and development services built from scratch. High performance, unique branding, and modern architecture.',
    serviceUrl
  );

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Home', url: 'https://www.pizzascript.com' },
    { name: 'Services', url: 'https://www.pizzascript.com/services' },
    { name: 'Custom Website Development', url: serviceUrl }
  ]);

  const faqs = [
    {
      q: 'Why should I choose custom website development over templates?',
      a: 'Templates come with heavy stylesheet bloat, redundant JavaScript layers, and persistent plugin vulnerabilities. Bespoke websites are coded from scratch with optimized assets, resulting in faster loading speeds, superior technical SEO crawlers discoverability, and custom designs that fit your brand.'
    },
    {
      q: 'How long does a custom business website build take?',
      a: 'A typical custom design and development cycle spans 4 to 8 weeks. This structured process covers research architecture modeling, modular interface prototyping, clean TSX coding, and edge performance optimization before launch.'
    },
    {
      q: 'Are custom websites secure and easily scalable?',
      a: 'Absolutely. By avoiding standard open-source CMS databases and vulnerable third-party plugins, custom edge-rendered static sites have virtually zero server-side exploit vectors. They scale infinitely without database memory overload.'
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
        title="Custom Website Development & Bespoke Design Services"
        description="Premium custom website developer Pune. Tailored website designs built from scratch with high-performance TSX. Zero template bloat, clean SEO code."
        keywords="Custom Website Development, Custom Website Developer, Bespoke Website Design, Custom Business Website"
        canonicalUrl="/services/custom-website-development"
        ogImage="https://lh3.googleusercontent.com/aida-public/AB6AXuBowcJEpApWxrB1BPer0g9gxQ_9mnMXKrjkRjlsY5ifg_fw0tHDQT13i_KA-uyHEJk0mRSNvrMPXtPqUzlOOK8-L-6Cm8fyWru4UM-Rkm-2o2e6kETWf_iggtogTW535-RR3v6ED18wEWGFPtzXAz6tN8KQzV_vXWBQTvjw5Bx3rmImyKUKZVe37f5tHDT-Qmfo5OH3NaZkbn1wUprWp68keOkJVgFe3fGDTHRaqs1f8RFzoILkXaV0V7--VCu7SxGrdD-OBEnYUI8"
        schema={combinedSchema}
      />

      <div className="min-h-screen pt-36 lg:pt-44 pb-16 px-4 md:px-12 lg:px-24 text-cream relative z-10">
        <div className="max-w-6xl mx-auto flex flex-col gap-24">
          {/* Breadcrumb */}
          <div className="text-[10px] font-mono text-stone-500 uppercase tracking-widest">
            <Link to="/" className="hover:text-oven-orange transition-colors">HOME</Link> / <Link to="/services" className="hover:text-oven-orange transition-colors">SERVICES</Link> / <span className="text-oven-orange">CUSTOM-DEVELOPMENT</span>
          </div>

          {/* Hero Section */}
          <section className="svc-panel grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-7 space-y-6">
              <span className="cin-eyebrow text-xs tracking-widest block uppercase">// SERVICE DETAIL</span>
              <h1 className="cin-heading text-4xl md:text-5xl lg:text-6xl font-serif font-bold leading-tight">
                Custom Website <span className="italic text-primary-container font-serif">Development</span>
              </h1>
              <p className="cin-text text-stone-400 text-base leading-relaxed">
                Unique, hand-crafted websites designed specifically for your brand. We bypass generic templates and frozen page-builders to code blazing-fast, secure interfaces designed to convert.
              </p>
              <div className="flex gap-4 pt-2">
                <span className="bg-primary-container/10 border border-primary-container/30 text-primary-container px-4 py-1 font-mono text-[10px] uppercase">No-Template Code</span>
                <span className="border border-white/10 text-stone-400 px-4 py-1 font-mono text-[10px] uppercase">Bespoke UI Layout</span>
              </div>
            </div>

            <div className="lg:col-span-5 relative group">
              <div className="absolute -inset-4 bg-primary-container/10 blur-3xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
              <div className="glass-card p-2 border border-white/10 terminal-glow relative overflow-hidden aspect-square flex items-center justify-center">
                <img
                  className="w-full h-full object-cover opacity-80 grayscale contrast-125 brightness-75 rounded"
                  src="/assets/images/service_custom_website.png"
                  alt="Custom web development UI structure illustration"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent"></div>
                <div className="absolute bottom-8 left-8 right-8">
                  <div className="font-eyebrow-mono text-[10px] text-primary/60 mb-2 uppercase tracking-widest">System Visualization v4.2</div>
                  <div className="h-1 w-full bg-white/10">
                    <div className="h-full bg-primary-container w-2/3 shadow-[0_0_8px_#ff5733]"></div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Technical Specifications */}
          <section className="svc-panel grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="glass-card p-8 border-t-2 border-t-primary-container">
              <span className="font-eyebrow-mono text-eyebrow-mono text-primary-container mb-4 block">// THE STACK</span>
              <h3 className="font-headline-sm text-headline-sm mb-6 text-cream">Modern Core</h3>
              <ul className="space-y-4">
                <li className="flex items-center gap-3 text-stone-300 font-mono text-xs group cursor-default">
                  <span className="material-symbols-outlined text-primary-container text-lg">terminal</span>
                  <span>React 19 Components</span>
                  <span className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity text-primary-container">→</span>
                </li>
                <li className="flex items-center gap-3 text-stone-300 font-mono text-xs group cursor-default">
                  <span className="material-symbols-outlined text-primary-container text-lg">bolt</span>
                  <span>Vite Build Pipeline</span>
                  <span className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity text-primary-container">→</span>
                </li>
                <li className="flex items-center gap-3 text-stone-300 font-mono text-xs group cursor-default">
                  <span className="material-symbols-outlined text-primary-container text-lg">palette</span>
                  <span>Vanilla Tailwind CSS</span>
                  <span className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity text-primary-container">→</span>
                </li>
              </ul>
            </div>

            {/* Card 2 */}
            <div className="glass-card p-8 border-t-2 border-t-primary-container">
              <span className="font-eyebrow-mono text-eyebrow-mono text-primary-container mb-4 block">// PERFORMANCE</span>
              <h3 className="font-headline-sm text-headline-sm mb-6 text-cream">Optimization</h3>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="font-mono text-[10px] text-stone-400">FIRST CONTENTFUL PAINT</span>
                    <span className="font-mono text-[10px] text-primary-container">0.6s</span>
                  </div>
                  <div className="h-1 bg-white/5 w-full">
                    <div className="h-full bg-primary-container w-[95%]"></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="font-mono text-[10px] text-stone-400">LIGHTHOUSE SCORE</span>
                    <span className="font-mono text-[10px] text-primary-container">100%</span>
                  </div>
                  <div className="h-1 bg-white/5 w-full">
                    <div className="h-full bg-primary-container w-full"></div>
                  </div>
                </div>
                <div className="bg-primary-container/10 p-4 border-l-2 border-primary-container">
                  <p className="font-mono text-[10px] text-primary-container italic">"Optimized code splitting, vector icons, and edge CDN cache routes."</p>
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="glass-card p-8 border-t-2 border-t-primary-container">
              <span className="font-eyebrow-mono text-eyebrow-mono text-primary-container mb-4 block">// QUALITY</span>
              <h3 className="font-headline-sm text-headline-sm mb-6 text-cream">Assurance</h3>
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="bg-white/5 px-2.5 py-1 font-mono text-[9px] text-stone-300 border border-white/5">STRICT TS</span>
                <span className="bg-white/5 px-2.5 py-1 font-mono text-[9px] text-stone-300 border border-white/5">SEMANTIC HTML</span>
                <span className="bg-white/5 px-2.5 py-1 font-mono text-[9px] text-stone-300 border border-white/5">CI/CD CHECK</span>
              </div>
              <div className="text-stone-300 font-mono text-xs space-y-3">
                <p className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-primary-container text-sm">check_circle</span>
                  Custom brand architecture maps
                </p>
                <p className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-primary-container text-sm">check_circle</span>
                  Perfect responsive design testing
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
                    <span className="font-eyebrow-mono text-eyebrow-mono text-primary-container">01 / DISCOVERY</span>
                    <h4 className="font-headline-md text-headline-md text-cream mt-2 mb-4">Architecture &amp; Wireframing</h4>
                    <p className="font-body-md text-body-md text-stone-400 max-w-lg ml-auto leading-relaxed">
                      We map your branding goals and content structure to custom components, resolving user flows before designing visual interfaces.
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
                    <span className="font-eyebrow-mono text-eyebrow-mono text-primary-container">02 / DEVELOPMENT</span>
                    <h4 className="font-headline-md text-headline-md text-cream mt-2 mb-4">Vanilla Code Architecture</h4>
                    <p className="font-body-md text-body-md text-stone-400 max-w-lg leading-relaxed">
                      Writing custom HTML layouts and modular React components. We ensure clean files, zero bloat plugins, and rapid loading parameters.
                    </p>
                  </div>
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden md:block">
                    <div className="w-4 h-4 bg-primary-container rotate-45"></div>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="relative grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                  <div className="md:text-right md:pr-12 lg:pr-16">
                    <span className="font-eyebrow-mono text-eyebrow-mono text-primary-container">03 / LAUNCH</span>
                    <h4 className="font-headline-md text-headline-md text-cream mt-2 mb-4">Edge Speed Optimization</h4>
                    <p className="font-body-md text-body-md text-stone-400 max-w-lg ml-auto leading-relaxed">
                      Deploying assets directly to global serverless CDNs. Hardening cache controls and setting up structural schema script injection.
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
                <span className="bg-primary-container text-on-primary-container px-6 py-2 font-mono text-xs font-bold rotate-12 inline-block">100% INDEPENDENT BRAND</span>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <span className="font-eyebrow-mono text-eyebrow-mono text-primary-container mb-4 block">// RECENT RESULT</span>
                  <h2 className="font-headline-md text-headline-md text-cream mb-6">Scale Up: E-Commerce Redesign</h2>
                  <blockquote className="border-l-4 border-primary-container pl-6 py-2 mb-6">
                    <p className="font-body-lg text-body-lg text-stone-300 italic leading-relaxed">
                      "Moving away from static templates to a bespoke React platform gave us full visual freedom and cut our site load times in half, boosting visitor retention instantly."
                    </p>
                    <footer className="mt-4 font-mono text-xs text-stone-500">
                      — Marcus Thorne, Director of Brand Experience
                    </footer>
                  </blockquote>
                </div>
                <div className="relative">
                  <img
                    className="w-full grayscale opacity-60 border border-white/10 rounded-lg shadow-[4px_4px_0px_rgba(255,87,51,0.25)]"
                    src="/assets/images/case_study_mockup.png"
                    alt="Bespoke website design dashboard setup mockup"
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

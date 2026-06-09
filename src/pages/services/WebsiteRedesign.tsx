import { useState } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../../components/SEO';
import { getServiceSchema, getBreadcrumbSchema } from '../../utils/schema';

export default function WebsiteRedesign() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const serviceUrl = 'https://www.pizzascript.com/services/website-redesign';
  const serviceSchema = getServiceSchema(
    'Website Redesign Services',
    'Modernize outdated websites. Visual upgrades, mobile responsive redesigns, Core Web Vitals optimization, and 301 redirect management.',
    serviceUrl
  );

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Home', url: 'https://www.pizzascript.com' },
    { name: 'Services', url: 'https://www.pizzascript.com/services' },
    { name: 'Website Redesign', url: serviceUrl }
  ]);

  const faqs = [
    {
      q: 'What are the main indicators that my website needs a redesign?',
      a: 'Outdated visual styles, poor mobile responsiveness, slow load speeds, and high visitor bounce rates are clear indicators. Modernizing your website addresses these issues to rebuild user trust and capture more inquiries.'
    },
    {
      q: 'Will redirecting pages during a redesign impact our current search rankings?',
      a: 'We create comprehensive URL rewrite maps and configure server-side 301 redirects, ensuring search engines crawl and transfer authority to the new paths without ranking loss.'
    },
    {
      q: 'Can we retain our current website copy and assets?',
      a: 'Yes. We preserve your existing text, branding assets, and articles, but import them into optimized React layout structures for improved reading comfort and speed.'
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
        title="Professional Website Redesign & Modernization Services"
        description="Premium website revamp Pune. Modernize outdated websites with custom React interfaces. UX improvements, speed optimizations, and SEO preservation."
        keywords="Website Redesign, Website Revamp, Website Modernization, Website Upgrade"
        canonicalUrl="/services/website-redesign"
        ogImage="https://lh3.googleusercontent.com/aida-public/AB6AXuABIlDEJFpgBTZijYzc6fT8MPpdH4zL0INv5hPsL1BSuho1rrHZL27BvbROpX315Hso5PcHjSbhOzM2a5Z49wma1jMdue3g5dRHGRgyZ-3T8yypeAhGR8zbjnC3wrq4qRUaXCVjSLvoH4GuPR8ec7naIrRwUkm8YPidlu66XE76fz7dVxQMbsJ6hl0V-hEfS8wFujFcuAw113M9nU3lrRaeNSe9xpRqAn1Ef2YE2dqAqlLHnXYKNCQ5PKipWAkPuR7Qa0QxQFRuC0Q"
        schema={combinedSchema}
      />

      <div className="min-h-screen pt-36 lg:pt-44 pb-16 px-4 md:px-12 lg:px-24 text-cream relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Breadcrumb */}
          <div className="text-[10px] font-mono text-stone-500 uppercase mb-8 tracking-widest">
            <Link to="/" className="hover:text-oven-orange transition-colors">HOME</Link> / <Link to="/services" className="hover:text-oven-orange transition-colors">SERVICES</Link> / <span className="text-oven-orange">WEBSITE-REDESIGN</span>
          </div>

          {/* Hero Section */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-7 space-y-6">
              <span className="cin-eyebrow text-xs tracking-widest block uppercase">// SERVICE DETAIL</span>
              <h1 className="cin-heading text-4xl md:text-5xl lg:text-6xl font-serif font-bold leading-tight">
                Website Redesign <span className="italic text-primary-container font-serif">Services</span>
              </h1>
              <p className="cin-text text-stone-400 text-base leading-relaxed">
                Modernize your online presence and reclaim lost customers. We revamp slow, outdated websites using high-performance React architectures, optimizing UX and speed to boost inquiries.
              </p>
              <div className="flex gap-4 pt-2">
                <span className="bg-primary-container/10 border border-primary-container/30 text-primary-container px-4 py-1 font-mono text-[10px] uppercase">UX Refresh</span>
                <span className="border border-white/10 text-stone-400 px-4 py-1 font-mono text-[10px] uppercase">SEO Link Preservation</span>
              </div>
            </div>

            <div className="lg:col-span-5 relative group">
              <div className="absolute -inset-4 bg-primary-container/10 blur-3xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
              <div className="glass-card p-2 border border-white/10 terminal-glow relative overflow-hidden aspect-square flex items-center justify-center">
                <img
                  className="w-full h-full object-cover opacity-80 grayscale contrast-125 brightness-75 rounded"
                  src="/assets/images/service_redesign.png"
                  alt="Website redesign wireframes and virtual DOM illustration"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent"></div>
                <div className="absolute bottom-8 left-8 right-8">
                  <div className="font-eyebrow-mono text-[10px] text-primary/60 mb-2 uppercase tracking-widest">System Visualization v4.2</div>
                  <div className="h-1 w-full bg-white/10">
                    <div className="h-full bg-primary-container w-[68%] shadow-[0_0_8px_#ff5733]"></div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Technical Specifications */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20">
            {/* Card 1 */}
            <div className="glass-card p-8 border-t-2 border-t-primary-container">
              <span className="font-eyebrow-mono text-eyebrow-mono text-primary-container mb-4 block">// SYSTEM MAP</span>
              <h3 className="font-headline-sm text-headline-sm mb-6 text-cream">Revamp Core</h3>
              <ul className="space-y-4">
                <li className="flex items-center gap-3 text-stone-300 font-mono text-xs group cursor-default">
                  <span className="material-symbols-outlined text-primary-container text-lg">rate_review</span>
                  <span>UI/UX Interface Audits</span>
                  <span className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity text-primary-container">→</span>
                </li>
                <li className="flex items-center gap-3 text-stone-300 font-mono text-xs group cursor-default">
                  <span className="material-symbols-outlined text-primary-container text-lg">link</span>
                  <span>301 Redirect Mapping</span>
                  <span className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity text-primary-container">→</span>
                </li>
                <li className="flex items-center gap-3 text-stone-300 font-mono text-xs group cursor-default">
                  <span className="material-symbols-outlined text-primary-container text-lg">view_in_ar</span>
                  <span>Next-Gen Image Formats</span>
                  <span className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity text-primary-container">→</span>
                </li>
              </ul>
            </div>

            {/* Card 2 */}
            <div className="glass-card p-8 border-t-2 border-t-primary-container">
              <span className="font-eyebrow-mono text-eyebrow-mono text-primary-container mb-4 block">// AUDITS</span>
              <h3 className="font-headline-sm text-headline-sm mb-6 text-cream">Speed Upgrades</h3>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="font-mono text-[10px] text-stone-400">BOUNCE RATE DECREASE</span>
                    <span className="font-mono text-[10px] text-primary-container">-45%</span>
                  </div>
                  <div className="h-1 bg-white/5 w-full">
                    <div className="h-full bg-primary-container w-[90%]"></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="font-mono text-[10px] text-stone-400">SEO DATA RETENTION</span>
                    <span className="font-mono text-[10px] text-primary-container">100%</span>
                  </div>
                  <div className="h-1 bg-white/5 w-full">
                    <div className="h-full bg-primary-container w-full"></div>
                  </div>
                </div>
                <div className="bg-primary-container/10 p-4 border-l-2 border-primary-container">
                  <p className="font-mono text-[10px] text-primary-container italic">"We secure sitemaps and configure URL redirects to shield active traffic links."</p>
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="glass-card p-8 border-t-2 border-t-primary-container">
              <span className="font-eyebrow-mono text-eyebrow-mono text-primary-container mb-4 block">// RESULTS</span>
              <h3 className="font-headline-sm text-headline-sm mb-6 text-cream">Modern Features</h3>
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="bg-white/5 px-2.5 py-1 font-mono text-[9px] text-stone-300 border border-white/5">ACCESSIBILITY</span>
                <span className="bg-white/5 px-2.5 py-1 font-mono text-[9px] text-stone-300 border border-white/5">CLEAN TSX</span>
                <span className="bg-white/5 px-2.5 py-1 font-mono text-[9px] text-stone-300 border border-white/5">ASSET MAPS</span>
              </div>
              <div className="text-stone-300 font-mono text-xs space-y-3">
                <p className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-primary-container text-sm">check_circle</span>
                  Clean semantic layout components
                </p>
                <p className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-primary-container text-sm">check_circle</span>
                  Hardware accelerated animations
                </p>
              </div>
            </div>
          </section>

          {/* The Engineering Process */}
          <section className="py-20 mt-20">
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
                    <h4 className="font-headline-md text-headline-md text-cream mt-2 mb-4">UX &amp; SEO Investigation</h4>
                    <p className="font-body-md text-body-md text-stone-400 max-w-lg ml-auto leading-relaxed">
                      Auditing your current site for performance choke-points and mapping existing SEO keyword landing coordinates.
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
                    <span className="font-eyebrow-mono text-eyebrow-mono text-primary-container">02 / RECONSTRUCTION</span>
                    <h4 className="font-headline-md text-headline-md text-cream mt-2 mb-4">React UI Rebuilding</h4>
                    <p className="font-body-md text-body-md text-stone-400 max-w-lg leading-relaxed">
                      Rebuilding static text layouts and interfaces into fully responsive components, removing obsolete plugin scripts.
                    </p>
                  </div>
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden md:block">
                    <div className="w-4 h-4 bg-primary-container rotate-45"></div>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="relative grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                  <div className="md:text-right md:pr-12 lg:pr-16">
                    <span className="font-eyebrow-mono text-eyebrow-mono text-primary-container">03 / REDIRECTION</span>
                    <h4 className="font-headline-md text-headline-md text-cream mt-2 mb-4">Traffic Preservation</h4>
                    <p className="font-body-md text-body-md text-stone-400 max-w-lg ml-auto leading-relaxed">
                      Setting up 301 URL redirect maps in hosting configurations and checking schema compliance before deployment.
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
          <section className="mt-20">
            <div className="glass-card p-10 relative overflow-hidden rounded-xl">
              <div className="absolute top-0 right-0 p-8 hidden md:block">
                <span className="bg-primary-container text-on-primary-container px-6 py-2 font-mono text-xs font-bold rotate-12 inline-block">100/100 LIGHTHOUSE SPEED</span>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <span className="font-eyebrow-mono text-eyebrow-mono text-primary-container mb-4 block">// RECENT RESULT</span>
                  <h2 className="font-headline-md text-headline-md text-cream mb-6">Revamp Highlight: corporate education site</h2>
                  <blockquote className="border-l-4 border-primary-container pl-6 py-2 mb-6">
                    <p className="font-body-lg text-body-lg text-stone-300 italic leading-relaxed">
                      "Moving our old WordPress build to custom React components resolved all speed and mobile rendering bugs. Our Google search rankings climbed instantly."
                    </p>
                    <footer className="mt-4 font-mono text-xs text-stone-500">
                      — Marcus Thorne, Chief Technology Lead
                    </footer>
                  </blockquote>
                </div>
                <div className="relative">
                  <img
                    className="w-full grayscale opacity-60 border border-white/10 rounded-lg"
                    src="/assets/images/case_study_mockup.png"
                    alt="Bespoke virtual DOM redesign concept visual"
                  />
                  <div className="absolute inset-0 border border-primary-container/20 pointer-events-none translate-x-3 translate-y-3 -z-10 rounded-lg"></div>
                </div>
              </div>
            </div>
          </section>

          {/* Accordion FAQ */}
          <section className="mt-20 border-t border-white/5 pt-16">
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

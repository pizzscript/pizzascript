import { useState } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../../components/SEO';
import { getServiceSchema, getBreadcrumbSchema } from '../../utils/schema';

export default function WebsiteMaintenance() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const serviceUrl = 'https://www.pizzascript.com/services/website-maintenance';
  const serviceSchema = getServiceSchema(
    'Website Maintenance & Support',
    'Professional support and maintenance services for custom websites and legacy platforms. Real-time uptime monitoring, security patching, and fast content updates.',
    serviceUrl
  );

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Home', url: 'https://www.pizzascript.com' },
    { name: 'Services', url: 'https://www.pizzascript.com/services' },
    { name: 'Website Maintenance & Support', url: serviceUrl }
  ]);

  const faqs = [
    {
      q: 'What does your website maintenance service cover?',
      a: 'We monitor your application 24/7 for security alerts, execute package and library updates, run automated backups, and handle content updates, copy edits, or layout adjustments as your brand grows.'
    },
    {
      q: 'How quickly do you resolve website issues or execute updates?',
      a: 'We guarantee a response time of less than 2 hours for critical site outages and complete standard copy or content update requests within 24 to 48 hours in a clean staging space.'
    },
    {
      q: 'Can you help maintain our legacy WordPress website?',
      a: 'Yes. We execute server updates, database optimization, and plugin audit checks on WordPress platforms, while offering high-performance migration pipelines to React.'
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
        title="Website Maintenance Services & Technical Support"
        description="Premium website support Pune. Keep your custom web applications secure, fast, and up-to-date with 24/7 monitoring, backups, and staging deployments."
        keywords="Website Maintenance Services, Website Support Service, WordPress to React Support, Website Security Maintenance"
        canonicalUrl="/services/website-maintenance"
        ogImage="https://lh3.googleusercontent.com/aida-public/AB6AXuBNU9ZLFAckJAH4WgKymLRMWFo-b4jkK0Av38f-Wyg5kndFkLUcUNWeA2HNrncPQ4mKQGXZesAP_coU7f5nn6qVkH_NOExF4th36Z7rbFhEwtDL9Yn5ErG6eO3ktILio-0X73TJsBmBdnw-Nwcp9geWfjY_bSe-WMIGON5hndhpBNHENTDhvvsl0YJwkE90LR0XlawRKLYAXtQi5Hu2iRvdm990eq9uNZE9hhYB2sadR8HdVJelWjDHsMEmieW-qIEGGPM2C_ztzis"
        schema={combinedSchema}
      />

      <div className="min-h-screen pt-36 lg:pt-44 pb-16 px-4 md:px-12 lg:px-24 text-cream relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Breadcrumb */}
          <div className="text-[10px] font-mono text-stone-500 uppercase mb-8 tracking-widest">
            <Link to="/" className="hover:text-oven-orange transition-colors">HOME</Link> / <Link to="/services" className="hover:text-oven-orange transition-colors">SERVICES</Link> / <span className="text-oven-orange">WEBSITE-MAINTENANCE</span>
          </div>

          {/* Hero Section */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-7 space-y-6">
              <span className="cin-eyebrow text-xs tracking-widest block uppercase">// SERVICE DETAIL</span>
              <h1 className="cin-heading text-4xl md:text-5xl lg:text-6xl font-serif font-bold leading-tight">
                Website Maintenance <span className="italic text-primary-container font-serif">&amp; Support</span>
              </h1>
              <p className="cin-text text-stone-400 text-base leading-relaxed">
                Protect your digital assets. We provide continuous monitoring, daily remote backups, and framework updates. Sleep easy knowing your custom web systems are fully supported by experts.
              </p>
              <div className="flex gap-4 pt-2">
                <span className="bg-primary-container/10 border border-primary-container/30 text-primary-container px-4 py-1 font-mono text-[10px] uppercase">24/7 Security Scan</span>
                <span className="border border-white/10 text-stone-400 px-4 py-1 font-mono text-[10px] uppercase">Rapid Content Sync</span>
              </div>
            </div>

            <div className="lg:col-span-5 relative group">
              <div className="absolute -inset-4 bg-primary-container/10 blur-3xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
              <div className="glass-card p-2 border border-white/10 terminal-glow relative overflow-hidden aspect-square flex items-center justify-center">
                <img
                  className="w-full h-full object-cover opacity-80 grayscale contrast-125 brightness-75 rounded"
                  src="/assets/images/service_maintenance.png"
                  alt="Edge hosting nodes and security cloud visualization"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent"></div>
                <div className="absolute bottom-8 left-8 right-8">
                  <div className="font-eyebrow-mono text-[10px] text-primary/60 mb-2 uppercase tracking-widest">System Visualization v4.2</div>
                  <div className="h-1 w-full bg-white/10">
                    <div className="h-full bg-primary-container w-[95%] shadow-[0_0_8px_#ff5733]"></div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Technical Specifications */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20">
            {/* Card 1 */}
            <div className="glass-card p-8 border-t-2 border-t-primary-container">
              <span className="font-eyebrow-mono text-eyebrow-mono text-primary-container mb-4 block">// PROTOCOLS</span>
              <h3 className="font-headline-sm text-headline-sm mb-6 text-cream">Safety Checks</h3>
              <ul className="space-y-4">
                <li className="flex items-center gap-3 text-stone-300 font-mono text-xs group cursor-default">
                  <span className="material-symbols-outlined text-primary-container text-lg">backup</span>
                  <span>Daily Database Backups</span>
                  <span className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity text-primary-container">→</span>
                </li>
                <li className="flex items-center gap-3 text-stone-300 font-mono text-xs group cursor-default">
                  <span className="material-symbols-outlined text-primary-container text-lg">gavel</span>
                  <span>Framework Updates</span>
                  <span className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity text-primary-container">→</span>
                </li>
                <li className="flex items-center gap-3 text-stone-300 font-mono text-xs group cursor-default">
                  <span className="material-symbols-outlined text-primary-container text-lg">security</span>
                  <span>Uptime Alerts Integration</span>
                  <span className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity text-primary-container">→</span>
                </li>
              </ul>
            </div>

            {/* Card 2 */}
            <div className="glass-card p-8 border-t-2 border-t-primary-container">
              <span className="font-eyebrow-mono text-eyebrow-mono text-primary-container mb-4 block">// OPERATIONS</span>
              <h3 className="font-headline-sm text-headline-sm mb-6 text-cream">Uptime SLAs</h3>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="font-mono text-[10px] text-stone-400">UPTIME SLA GUARANTEE</span>
                    <span className="font-mono text-[10px] text-primary-container">99.99%</span>
                  </div>
                  <div className="h-1 bg-white/5 w-full">
                    <div className="h-full bg-primary-container w-[99.99%]"></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="font-mono text-[10px] text-stone-400">RESTORE TIME</span>
                    <span className="font-mono text-[10px] text-primary-container">&lt; 30 Mins</span>
                  </div>
                  <div className="h-1 bg-white/5 w-full">
                    <div className="h-full bg-primary-container w-full"></div>
                  </div>
                </div>
                <div className="bg-primary-container/10 p-4 border-l-2 border-primary-container">
                  <p className="font-mono text-[10px] text-primary-container italic">"We host code configurations inside standard Git flow routes."</p>
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="glass-card p-8 border-t-2 border-t-primary-container">
              <span className="font-eyebrow-mono text-eyebrow-mono text-primary-container mb-4 block">// SECURE HOSTS</span>
              <h3 className="font-headline-sm text-headline-sm mb-6 text-cream">Support Kits</h3>
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="bg-white/5 px-2.5 py-1 font-mono text-[9px] text-stone-300 border border-white/5">GIT STAGING</span>
                <span className="bg-white/5 px-2.5 py-1 font-mono text-[9px] text-stone-300 border border-white/5">API PATCHING</span>
                <span className="bg-white/5 px-2.5 py-1 font-mono text-[9px] text-stone-300 border border-white/5">DNS SECURE</span>
              </div>
              <div className="text-stone-300 font-mono text-xs space-y-3">
                <p className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-primary-container text-sm">check_circle</span>
                  Safe remote staging servers
                </p>
                <p className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-primary-container text-sm">check_circle</span>
                  Package vulnerabilities checks
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
                    <span className="font-eyebrow-mono text-eyebrow-mono text-primary-container">01 / MONITOR</span>
                    <h4 className="font-headline-md text-headline-md text-cream mt-2 mb-4">Real-Time Security Checks</h4>
                    <p className="font-body-md text-body-md text-stone-400 max-w-lg ml-auto leading-relaxed">
                      Establishing 24/7 security scans, uptime verification alerts, and regular backup routes to remote databases.
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
                    <span className="font-eyebrow-mono text-eyebrow-mono text-primary-container">02 / UPDATE</span>
                    <h4 className="font-headline-md text-headline-md text-cream mt-2 mb-4">Dependencies &amp; Code Patches</h4>
                    <p className="font-body-md text-body-md text-stone-400 max-w-lg leading-relaxed">
                      Updating internal libraries, patching framework security alerts, and keeping layouts compatible with current browsers.
                    </p>
                  </div>
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden md:block">
                    <div className="w-4 h-4 bg-primary-container rotate-45"></div>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="relative grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                  <div className="md:text-right md:pr-12 lg:pr-16">
                    <span className="font-eyebrow-mono text-eyebrow-mono text-primary-container">03 / UPGRADE</span>
                    <h4 className="font-headline-md text-headline-md text-cream mt-2 mb-4">Content &amp; Feature Updates</h4>
                    <p className="font-body-md text-body-md text-stone-400 max-w-lg ml-auto leading-relaxed">
                      Executing content additions, design edits, or new contact pages on staging environments before final syncs.
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
                <span className="bg-primary-container text-on-primary-container px-6 py-2 font-mono text-xs font-bold rotate-12 inline-block">100% SECURED UPTIME</span>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <span className="font-eyebrow-mono text-eyebrow-mono text-primary-container mb-4 block">// RECENT RESULT</span>
                  <h2 className="font-headline-md text-headline-md text-cream mb-6">Zero Outages: cloud security maintenance</h2>
                  <blockquote className="border-l-4 border-primary-container pl-6 py-2 mb-6">
                    <p className="font-body-lg text-body-lg text-stone-300 italic leading-relaxed">
                      "Entrusting our support routines to custom maintenance engineers solved our recurring server issues. We have had zero security issues and permanent site speed since our sync setup."
                    </p>
                    <footer className="mt-4 font-mono text-xs text-stone-500">
                      — Marcus Thorne, Security Director
                    </footer>
                  </blockquote>
                </div>
                <div className="relative">
                  <img
                    className="w-full grayscale opacity-60 border border-white/10 rounded-lg"
                    src="/assets/images/case_study_mockup.png"
                    alt="Network servers maintenance illustration"
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

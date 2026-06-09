import { useState } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../../components/SEO';
import { getServiceSchema, getBreadcrumbSchema } from '../../utils/schema';

export default function SEOFriendlyWebsites() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const serviceUrl = 'https://pizzascript.dev/services/seo-friendly-websites';
  const serviceSchema = getServiceSchema(
    'SEO-Friendly Website Development',
    'Technical search engine optimization built into the core structure of custom websites. Pre-rendered HTML, meta tag hooks, and JSON-LD schema integrations.',
    serviceUrl
  );

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Home', url: 'https://pizzascript.dev' },
    { name: 'Services', url: 'https://pizzascript.dev/services' },
    { name: 'SEO-Friendly Website Development', url: serviceUrl }
  ]);

  const faqs = [
    {
      q: 'What makes a custom website more SEO-friendly than builder websites?',
      a: 'Generic builders include messy JS payloads, bloated CSS DOM nodes, and bad semantic structure. Custom React builds are compiled into clean static HTML with nested meta tags, fast execution times, and automated structural schema mappings that allow Google bots to parse and index pages easily.'
    },
    {
      q: 'How do you handle schema markup for local businesses?',
      a: 'We write customized JSON-LD schema trees incorporating LocalBusiness, Service, and BreadcrumbList metadata. This directly informs search engines about your services, locations, and pricing packages, generating rich snippet display items in results.'
    },
    {
      q: 'Will my current search ranking fall during a migration to React?',
      a: 'No. We carefully build 301 URL redirect maps, match original meta elements, register XML sitemaps, and test performance scores to preserve your existing search footprint while improving core crawlers access.'
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
        title="SEO-Friendly Website Development & Technical SEO Services"
        description="Premium SEO-friendly website design Pune. Increase organic search rankings with custom pre-rendered React pages, semantic schemas, and optimized crawl paths."
        keywords="SEO-Friendly Website Development, SEO Friendly Web Design, Technical SEO Developer, Search Engine Optimized Website"
        canonicalUrl="/services/seo-friendly-websites"
        ogImage="https://lh3.googleusercontent.com/aida-public/AB6AXuAoisYj5ML6lgtVM354EZUgUJREyaRBSJDBDvUHu61ZZxVN6d1d9SXuNktRlQ8s1HERkFCmBczv9p8ZgZjFGVeleg1BiJmY9PhhBzadH8Pbkmw0IQ5cCL-T366Dz2YFOBDepU0xzD3Rba1ws1HROId2FB2HN4pzRSrJCVJ1OHKVVgJ6sirDwzqeSraUV9XNbmiblzcSfhvWkuRdbc3e0RRpGUQBpKO9bfMagxpU-0wHxQxmAIojc3xp4xjB7WWq0biK-QlmnI2HKyk"
        schema={combinedSchema}
      />

      <div className="min-h-screen pt-36 lg:pt-44 pb-16 px-4 md:px-12 lg:px-24 text-cream relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Breadcrumb */}
          <div className="text-[10px] font-mono text-stone-500 uppercase mb-8 tracking-widest">
            <Link to="/" className="hover:text-oven-orange transition-colors">HOME</Link> / <Link to="/services" className="hover:text-oven-orange transition-colors">SERVICES</Link> / <span className="text-oven-orange">SEO-FRIENDLY-WEBSITES</span>
          </div>

          {/* Hero Section */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-7 space-y-6">
              <span className="cin-eyebrow text-xs tracking-widest block uppercase">// SERVICE DETAIL</span>
              <h1 className="cin-heading text-4xl md:text-5xl lg:text-6xl font-serif font-bold leading-tight">
                SEO-Friendly <span className="italic text-primary-container font-serif">Websites</span>
              </h1>
              <p className="cin-text text-stone-400 text-base leading-relaxed">
                Build a website that ranks first. We craft clean, search-engine-ready custom sites, pre-rendering HTML layouts with native metadata hooks and structured JSON-LD schemas so crawlers index you immediately.
              </p>
              <div className="flex gap-4 pt-2">
                <span className="bg-primary-container/10 border border-primary-container/30 text-primary-container px-4 py-1 font-mono text-[10px] uppercase">Technical SEO Core</span>
                <span className="border border-white/10 text-stone-400 px-4 py-1 font-mono text-[10px] uppercase">Schema &amp; Metadata</span>
              </div>
            </div>

            <div className="lg:col-span-5 relative group">
              <div className="absolute -inset-4 bg-primary-container/10 blur-3xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
              <div className="glass-card p-2 border border-white/10 terminal-glow relative overflow-hidden aspect-square flex items-center justify-center">
                <img
                  className="w-full h-full object-cover opacity-80 grayscale contrast-125 brightness-75 rounded"
                  src="/assets/images/service_seo_friendly.png"
                  alt="Google search indexing and crawler spider concept visual"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent"></div>
                <div className="absolute bottom-8 left-8 right-8">
                  <div className="font-eyebrow-mono text-[10px] text-primary/60 mb-2 uppercase tracking-widest">System Visualization v4.2</div>
                  <div className="h-1 w-full bg-white/10">
                    <div className="h-full bg-primary-container w-[88%] shadow-[0_0_8px_#ff5733]"></div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Technical Specifications */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20">
            {/* Card 1 */}
            <div className="glass-card p-8 border-t-2 border-t-primary-container">
              <span className="font-eyebrow-mono text-eyebrow-mono text-primary-container mb-4 block">// STRATEGY</span>
              <h3 className="font-headline-sm text-headline-sm mb-6 text-cream">SEO Core</h3>
              <ul className="space-y-4">
                <li className="flex items-center gap-3 text-stone-300 font-mono text-xs group cursor-default">
                  <span className="material-symbols-outlined text-primary-container text-lg">code</span>
                  <span>JSON-LD Schemas</span>
                  <span className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity text-primary-container">→</span>
                </li>
                <li className="flex items-center gap-3 text-stone-300 font-mono text-xs group cursor-default">
                  <span className="material-symbols-outlined text-primary-container text-lg">history_edu</span>
                  <span>Semantic HTML5 Trees</span>
                  <span className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity text-primary-container">→</span>
                </li>
                <li className="flex items-center gap-3 text-stone-300 font-mono text-xs group cursor-default">
                  <span className="material-symbols-outlined text-primary-container text-lg">alt_route</span>
                  <span>XML Sitemap Automation</span>
                  <span className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity text-primary-container">→</span>
                </li>
              </ul>
            </div>

            {/* Card 2 */}
            <div className="glass-card p-8 border-t-2 border-t-primary-container">
              <span className="font-eyebrow-mono text-eyebrow-mono text-primary-container mb-4 block">// CRAWLABILITY</span>
              <h3 className="font-headline-sm text-headline-sm mb-6 text-cream">Crawl Budgets</h3>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="font-mono text-[10px] text-stone-400">ORGANIC RANKINGS</span>
                    <span className="font-mono text-[10px] text-primary-container">+120%</span>
                  </div>
                  <div className="h-1 bg-white/5 w-full">
                    <div className="h-full bg-primary-container w-[92%]"></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="font-mono text-[10px] text-stone-400">CRAWL BUDGET WASTE</span>
                    <span className="font-mono text-[10px] text-primary-container">0%</span>
                  </div>
                  <div className="h-1 bg-white/5 w-full">
                    <div className="h-full bg-primary-container w-full"></div>
                  </div>
                </div>
                <div className="bg-primary-container/10 p-4 border-l-2 border-primary-container">
                  <p className="font-mono text-[10px] text-primary-container italic">"Our pre-rendered static routes deliver raw content instantly to crawlers."</p>
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="glass-card p-8 border-t-2 border-t-primary-container">
              <span className="font-eyebrow-mono text-eyebrow-mono text-primary-container mb-4 block">// COMPLIANCE</span>
              <h3 className="font-headline-sm text-headline-sm mb-6 text-cream">Standard Tags</h3>
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="bg-white/5 px-2.5 py-1 font-mono text-[9px] text-stone-300 border border-white/5">ROBOTS LOCKS</span>
                <span className="bg-white/5 px-2.5 py-1 font-mono text-[9px] text-stone-300 border border-white/5">CANONICALS</span>
                <span className="bg-white/5 px-2.5 py-1 font-mono text-[9px] text-stone-300 border border-white/5">ALT LABELS</span>
              </div>
              <div className="text-stone-300 font-mono text-xs space-y-3">
                <p className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-primary-container text-sm">check_circle</span>
                  Perfect heading tags hierarchy
                </p>
                <p className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-primary-container text-sm">check_circle</span>
                  JSON-LD schemas verification
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
                    <h4 className="font-headline-md text-headline-md text-cream mt-2 mb-4">Sitemap &amp; Keyword Discovery</h4>
                    <p className="font-body-md text-body-md text-stone-400 max-w-lg ml-auto leading-relaxed">
                      Reviewing current URL indexing rates, checking missing metadata tags, and planning custom keyword configurations.
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
                    <span className="font-eyebrow-mono text-eyebrow-mono text-primary-container">02 / STRUCTURE</span>
                    <h4 className="font-headline-md text-headline-md text-cream mt-2 mb-4">Clean Semantic Architecture</h4>
                    <p className="font-body-md text-body-md text-stone-400 max-w-lg leading-relaxed">
                      Coding search engine-compliant HTML5 structures and building dynamic meta layout hooks for React routes.
                    </p>
                  </div>
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden md:block">
                    <div className="w-4 h-4 bg-primary-container rotate-45"></div>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="relative grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                  <div className="md:text-right md:pr-12 lg:pr-16">
                    <span className="font-eyebrow-mono text-eyebrow-mono text-primary-container">03 / AUTOMATION</span>
                    <h4 className="font-headline-md text-headline-md text-cream mt-2 mb-4">Schema &amp; Sitemap Hookups</h4>
                    <p className="font-body-md text-body-md text-stone-400 max-w-lg ml-auto leading-relaxed">
                      Generating XML sitemaps, automated robots configurations, and injecting local structured JSON-LD schemas.
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
                <span className="bg-primary-container text-on-primary-container px-6 py-2 font-mono text-xs font-bold rotate-12 inline-block">100% GOOGLE COMPLIANT</span>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <span className="font-eyebrow-mono text-eyebrow-mono text-primary-container mb-4 block">// RECENT RESULT</span>
                  <h2 className="font-headline-md text-headline-md text-cream mb-6">Discoverability Boost: Pune service directory revamp</h2>
                  <blockquote className="border-l-4 border-primary-container pl-6 py-2 mb-6">
                    <p className="font-body-lg text-body-lg text-stone-300 italic leading-relaxed">
                      "Custom SEO architecture transformed our search rankings. Within weeks of migrating our directory pages to pre-rendered static components, our organic queries doubled, and indexing issues disappeared."
                    </p>
                    <footer className="mt-4 font-mono text-xs text-stone-500">
                      — Marcus Thorne, Chief Operations Director
                    </footer>
                  </blockquote>
                </div>
                <div className="relative">
                  <img
                    className="w-full grayscale opacity-60 border border-white/10 rounded-lg"
                    src="/assets/images/case_study_mockup.png"
                    alt="Bespoke search engine crawl structure map visual"
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

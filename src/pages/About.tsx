import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { getBreadcrumbSchema } from '../utils/schema';

export default function About() {
  const aboutUrl = 'https://pizzascript.dev/about';
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Home', url: 'https://pizzascript.dev' },
    { name: 'About', url: aboutUrl }
  ]);

  const aboutPageSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "mainEntity": {
      "@type": "LocalBusiness",
      "name": "PizzaScript",
      "description": "High-performance custom web engineering studio based in Pune, India. Hand-crafted responsive React layouts, technical SEO, and edge deployment.",
      "url": "https://pizzascript.dev",
      "image": "https://pizzascript.dev/assets/images/og_preview.png"
    }
  };


  const combinedSchema = {
    "@graph": [
      breadcrumbSchema,
      aboutPageSchema
    ]
  };

  return (
    <>
      <SEO
        title="About PizzaScript | High-End Web Engineering Studio"
        description="Learn about PizzaScript, a premium custom web engineering studio based in Pune, India. We focus on web performance, React frontend architecture, and technical SEO."
        keywords="About PizzaScript, custom web engineering Pune, frontend developer Pune, React consultant India"
        canonicalUrl="/about"
        schema={combinedSchema}
      />

      <div className="min-h-screen pt-36 lg:pt-44 pb-16 px-4 md:px-12 lg:px-24 text-cream relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Breadcrumb */}
          <div className="text-[10px] font-mono text-stone-500 uppercase mb-8 tracking-widest">
            <Link to="/" className="hover:text-oven-orange transition-colors">HOME</Link> / <span className="text-oven-orange">ABOUT</span>
          </div>

          {/* Hero  Section */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center pt-8">
            <div className="lg:col-span-7 space-y-6" data-animate="fade-up">
              <span className="cin-eyebrow text-xs tracking-widest block uppercase">// ENGINEERING THE FUTURE</span>
              <h1 className="cin-heading text-4xl md:text-5xl lg:text-6xl font-serif font-bold leading-tight">
                Building Fast, Modern Websites That Help Businesses Grow
              </h1>
              <p className="cin-text text-stone-400 text-base leading-relaxed">
                We don't just build sites; we architect digital engines. Focused on extreme performance, SEO supremacy, and conversion-centric UX.
              </p>
              <div className="flex flex-wrap gap-4 pt-2">
                <Link to="/services" className="bg-primary-container hover:bg-ember text-black font-bold px-8 py-4 rounded-sm text-xs font-mono uppercase tracking-widest transition-all hover:scale-[1.02] active:scale-[0.98]">
                  Explore Our Stack
                </Link>
                <Link to="/portfolio" className="border border-white/20 text-cream px-8 py-4 rounded-sm text-xs font-mono uppercase tracking-widest hover:bg-white/5 transition-colors">
                  View Projects
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5 relative group" data-animate="fade-left" data-animate-delay="2">
              <div className="absolute -inset-4 bg-primary-container/10 blur-3xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
              <div className="glass-card p-2 border border-white/10 relative overflow-hidden aspect-square flex items-center justify-center">
                <img
                  className="w-full h-full object-cover opacity-80 grayscale hover:grayscale-0 transition-all duration-700 rounded"
                  src="/assets/images/about_hero.png"
                  alt="Premium engineering workspace visual mockup"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent"></div>
              </div>
            </div>
          </section>

          {/* Our Story */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center mt-32 md:mt-40 lg:mt-48 border-t border-white/5 pt-16 lg:pt-24">
            <div className="lg:col-span-5 order-2 lg:order-1" data-animate="fade-right">
              <div className="glass-card p-4 rounded-lg relative overflow-hidden border border-white/10">
                <img
                  className="w-full h-auto grayscale opacity-85 rounded"
                  src="/assets/images/about_timeline.png"
                  alt="PizzaScript Journey infographic timeline"
                />
              </div>
            </div>
            <div className="lg:col-span-7 order-1 lg:order-2 space-y-6" data-animate="fade-up" data-animate-delay="1">
              <span className="cin-eyebrow text-xs tracking-widest block uppercase">// THE GENESIS</span>
              <h2 className="cin-heading text-3xl md:text-4xl font-serif font-bold text-cream">
                Born from Frustration, Built for Speed
              </h2>
              <div className="space-y-6 text-stone-400 text-sm md:text-base leading-relaxed">
                <p>
                  We grew tired of seeing businesses trapped in slow, bloated templates that killed their conversion rates and search rankings. Most agencies deliver "pretty" sites that fail under the hood.
                </p>
                <p>
                  Pizza Script was founded on a simple premise: Engineering excellence is non-negotiable. We stripped back the bloat and focused on the fundamentals—performance, architecture, and results.
                </p>
                <div className="flex items-center gap-4 py-4">
                  <div className="h-px flex-1 bg-white/10"></div>
                  <span className="font-display-lg-italic italic text-primary-container text-xl md:text-2xl">The pizza is in the script.</span>
                  <div className="h-px flex-1 bg-white/10"></div>
                </div>
              </div>
            </div>
          </section>

          {/* Differentiators */}
          <section className="mt-32 md:mt-40 lg:mt-48 border-t border-white/5 pt-16 lg:pt-24">
            <div className="text-center mb-16" data-animate="fade-up">
              <span className="cin-eyebrow text-xs tracking-widest block uppercase justify-center">// 01. THE DIFFERENCE</span>
              <h2 className="cin-heading text-3xl md:text-4xl font-serif font-bold text-cream">
                What Makes PizzaScript Different
              </h2>
            </div>

            <div className="max-w-4xl mx-auto space-y-12">
              <div className="glass-card p-2 rounded-lg overflow-hidden group border border-white/10" data-animate="fade-up" data-animate-delay="1">
                <img
                  alt="Slow bloated templates vs PizzaScript clean custom code performance comparison"
                  className="w-full h-auto opacity-90 rounded"
                  src="/assets/images/about_comparison.png"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="glass-card p-8 border-t-2 border-t-primary-container" data-animate="fade-up" data-animate-delay="1">
                  <span className="material-symbols-outlined text-primary-container text-4xl mb-4">bolt</span>
                  <h3 className="font-headline-sm text-xl mb-3 text-cream">Performance First</h3>
                  <p className="text-stone-400 text-xs md:text-sm leading-relaxed">
                    We optimize every single kilobyte. Our custom builds consistently hit 95+ Google Lighthouse speed scores across the board.
                  </p>
                </div>
                <div className="glass-card p-8 border-t-2 border-t-primary-container" data-animate="fade-up" data-animate-delay="2">
                  <span className="material-symbols-outlined text-primary-container text-4xl mb-4">terminal</span>
                  <h3 className="font-headline-sm text-xl mb-3 text-cream">Custom Code</h3>
                  <p className="text-stone-400 text-xs md:text-sm leading-relaxed">
                    No template page builders or plugins bloat. Pure, hand-crafted engineering tailored to your unique business scale and branding.
                  </p>
                </div>
                <div className="glass-card p-8 border-t-2 border-t-primary-container" data-animate="fade-up" data-animate-delay="3">
                  <span className="material-symbols-outlined text-primary-container text-4xl mb-4">campaign</span>
                  <h3 className="font-headline-sm text-xl mb-3 text-cream">Direct Access</h3>
                  <p className="text-stone-400 text-xs md:text-sm leading-relaxed">
                    You speak directly to the engineers building your site. No non-technical project managers, no translation errors.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Development Philosophy */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center mt-32 md:mt-40 lg:mt-48 border-t border-white/5 pt-16 lg:pt-24">
            <div className="lg:col-span-7 space-y-8" data-animate="fade-up">
              <div>
                <span className="cin-eyebrow text-xs tracking-widest block uppercase">// OUR WORKFLOW</span>
                <h2 className="cin-heading text-3xl md:text-4xl font-serif font-bold text-cream mt-4">
                  Engineering for the Modern Web
                </h2>
              </div>

              <div className="space-y-6">
                <div className="flex gap-6 group">
                  <div className="h-12 w-12 rounded-full border border-primary-container/30 flex items-center justify-center text-primary-container group-hover:bg-primary-container group-hover:text-black transition-all shrink-0">
                    01
                  </div>
                  <div>
                    <h4 className="font-headline-sm text-lg mb-2 text-cream">Mobile-First Architecture</h4>
                    <p className="text-stone-400 text-sm leading-relaxed">
                      Every interaction is designed for the thumb first, ensuring seamless and fast responsive experiences across all mobile devices.
                    </p>
                  </div>
                </div>

                <div className="flex gap-6 group">
                  <div className="h-12 w-12 rounded-full border border-primary-container/30 flex items-center justify-center text-primary-container group-hover:bg-primary-container group-hover:text-black transition-all shrink-0">
                    02
                  </div>
                  <div>
                    <h4 className="font-headline-sm text-lg mb-2 text-cream">Conversion-Focused UX</h4>
                    <p className="text-stone-400 text-sm leading-relaxed">
                      We don't just build pages; we build sales funnels disguised as high-performance web applications, maximizing lead generation.
                    </p>
                  </div>
                </div>

                <div className="flex gap-6 group">
                  <div className="h-12 w-12 rounded-full border border-primary-container/30 flex items-center justify-center text-primary-container group-hover:bg-primary-container group-hover:text-black transition-all shrink-0">
                    03
                  </div>
                  <div>
                    <h4 className="font-headline-sm text-lg mb-2 text-cream">SEO Integrity</h4>
                    <p className="text-stone-400 text-sm leading-relaxed">
                      Semantic HTML structure, speed paint times, and rich schema structures are baked into the core DNA of every project.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5" data-animate="fade-left" data-animate-delay="2">
              <div className="glass-card p-2 rounded-lg border border-white/10">
                <img
                  alt="PizzaScript web development workflow diagram"
                  className="w-full h-auto grayscale opacity-80 rounded"
                  src="/assets/images/about_workflow.png"
                />
              </div>
            </div>
          </section>

          {/* Industries & Capabilities */}
          <section className="mt-32 md:mt-40 lg:mt-48 border-t border-white/5 pt-16 lg:pt-24">
            <div className="text-center mb-16" data-animate="fade-up">
              <span className="cin-eyebrow text-xs tracking-widest block uppercase justify-center">// 02. EXPERTISE</span>
              <h2 className="cin-heading text-3xl md:text-4xl font-serif font-bold text-cream">
                Data-Driven Capabilities
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-6" data-animate="fade-right">
                <div className="glass-card p-2 rounded-lg border border-white/10">
                  <img
                    alt="Futuristic web performance telemetry dashboard displaying speed metrics"
                    className="w-full h-auto grayscale opacity-80 rounded"
                    src="/assets/images/about_dashboard.png"
                  />
                </div>
              </div>

              <div className="lg:col-span-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="glass-card p-6 flex flex-col justify-between min-h-[180px] border-t-2 border-t-primary-container" data-animate="fade-up" data-animate-delay="1">
                  <div>
                    <h4 className="font-eyebrow-mono text-xs text-primary-container mb-2">// PHARMA &amp; HEALTH</h4>
                    <p className="text-xs md:text-sm text-stone-400 leading-relaxed">
                      Secure, compliant, and lightning-fast platforms designed for local healthcare clinics and medical suppliers.
                    </p>
                  </div>
                  <span className="material-symbols-outlined self-end text-stone-500 text-2xl mt-4">clinical_notes</span>
                </div>

                <div className="glass-card p-6 flex flex-col justify-between min-h-[180px] border-t-2 border-t-primary-container" data-animate="fade-up" data-animate-delay="2">
                  <div>
                    <h4 className="font-eyebrow-mono text-xs text-primary-container mb-2">// B2B SAAS</h4>
                    <p className="text-xs md:text-sm text-stone-400 leading-relaxed">
                      High-conversion campaign landing pages, modern marketing layouts, and user interface dashboards.
                    </p>
                  </div>
                  <span className="material-symbols-outlined self-end text-stone-500 text-2xl mt-4">hub</span>
                </div>

                <div className="glass-card p-6 flex flex-col justify-between min-h-[180px] border-t-2 border-t-primary-container" data-animate="fade-up" data-animate-delay="3">
                  <div>
                    <h4 className="font-eyebrow-mono text-xs text-primary-container mb-2">// COACHING &amp; CONSULTING</h4>
                    <p className="text-xs md:text-sm text-stone-400 leading-relaxed">
                      Authoritative personal branding websites designed to capture bookings and establish client trust.
                    </p>
                  </div>
                  <span className="material-symbols-outlined self-end text-stone-500 text-2xl mt-4">groups</span>
                </div>

                <div className="glass-card p-6 flex flex-col justify-between min-h-[180px] border-t-2 border-t-primary-container" data-animate="fade-up" data-animate-delay="4">
                  <div>
                    <h4 className="font-eyebrow-mono text-xs text-primary-container mb-2">// E-COMMERCE</h4>
                    <p className="text-xs md:text-sm text-stone-400 leading-relaxed">
                      Custom, lightweight store checkouts and fast catalog layouts that boost cart retention rates.
                    </p>
                  </div>
                  <span className="material-symbols-outlined self-end text-stone-500 text-2xl mt-4">shopping_cart</span>
                </div>
              </div>
            </div>
          </section>

          {/* Client Success Case Study */}
          <section className="mt-32 md:mt-40 lg:mt-48 border-t border-white/5 pt-16 lg:pt-24">
            <div className="glass-card p-8 md:p-12 relative overflow-hidden rounded-xl border border-white/10" data-animate="fade-up">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                <div className="lg:col-span-7 space-y-6">
                  <div className="bg-primary-container/10 border border-primary-container/30 text-primary-container px-3 py-1 font-mono text-[10px] uppercase inline-block">
                    CASE STUDY: ORION PHARMA
                  </div>
                  <h2 className="cin-heading text-2xl md:text-3xl font-serif font-bold text-cream">
                    Optimizing Clinical Trial Data Access
                  </h2>
                  <p className="text-stone-300 text-base md:text-lg italic leading-relaxed border-l-4 border-primary-container pl-4">
                    "Pizza Script didn't just build a portal; they engineered a competitive advantage. Our processing speed is up 40%, and customer data security connections are fully compliant."
                  </p>
                  <div className="grid grid-cols-2 gap-6 pt-4">
                    <div className="bg-white/[0.02] border border-white/5 p-4 rounded">
                      <div className="text-primary-container font-serif font-bold text-3xl">40%</div>
                      <div className="text-[9px] text-stone-500 font-mono uppercase tracking-wider mt-1">Faster Data Processing</div>
                    </div>
                    <div className="bg-white/[0.02] border border-white/5 p-4 rounded">
                      <div className="text-primary-container font-serif font-bold text-3xl">100%</div>
                      <div className="text-[9px] text-stone-500 font-mono uppercase tracking-wider mt-1">Uptime SLA Guaranteed</div>
                    </div>
                  </div>
                </div>
                <div className="lg:col-span-5">
                  <div className="glass-card p-2 rounded-lg border border-white/10">
                    <img
                      alt="Orion Pharma analytics case study dashboard mockup"
                      className="w-full h-auto grayscale opacity-80 rounded"
                      src="/assets/images/about_case_study.png"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Meet the Engineer Profile */}
          <section className="mt-32 md:mt-40 lg:mt-48 border-t border-white/5 pt-16 lg:pt-24" data-animate="fade-up">
            <div className="glass-card p-8 md:p-12 rounded-xl border border-white/10 grid grid-cols-1 lg:grid-cols-12 gap-12">
              <div className="lg:col-span-4 space-y-4">
                <span className="cin-eyebrow text-xs tracking-widest block uppercase">// THE STUDIO</span>
                <h3 className="cin-heading text-2xl md:text-3xl font-serif font-bold text-cream">About PizzaScript</h3>
                <p className="text-stone-500 font-mono text-[10px] uppercase">// E-E-A-T AUTHORITY SIGNAL</p>
              </div>
              <div className="lg:col-span-8 space-y-6 text-stone-400 text-sm md:text-base leading-relaxed">
                <p>
                  We are PizzaScript, a custom web engineering studio located in Pune, Maharashtra. Over the past 5 years, we have collaborated with design agencies, software studios, and global enterprises to construct scalable layouts and performance frameworks.
                </p>
                <p>
                  We specialize in the React and Vite ecosystem, writing automated integration workflows, configuring serverless CDNs, and custom-crafting interactive animations that bridge the gap between creative visual art and clean computer science.
                </p>
                <div className="pt-4 flex gap-6">
                  <a href="https://github.com/pizzascript" target="_blank" rel="noopener noreferrer" className="text-xs font-mono text-primary-container hover:underline uppercase tracking-wider">
                    GitHub Profile &nearr;
                  </a>
                  <Link to="/#order" className="text-xs font-mono text-stone-300 hover:underline uppercase tracking-wider">
                    Work With Us &rarr;
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="mt-32 md:mt-40 lg:mt-48 border-t border-white/5 pt-16 lg:pt-24 pb-12 text-center" data-animate="fade-up">
            <div className="max-w-3xl mx-auto space-y-8">
              <h2 className="cin-heading text-4xl md:text-5xl font-serif font-bold text-cream leading-tight">
                Ready to Build Something Exceptional?
              </h2>
              <p className="cin-text text-stone-400 text-base md:text-lg max-w-xl mx-auto leading-relaxed">
                Stop settling for average visual builders. Let's engineer a digital experience that actually moves the needle for your business speed and search discoverability.
              </p>
              <div className="pt-4">
                <Link to="/#order" className="bg-primary-container hover:bg-ember text-black font-bold px-12 py-5 rounded-sm text-sm font-mono uppercase tracking-[0.2em] transition-all hover:scale-[1.02] active:scale-[0.98] inline-block shadow-[0_0_40px_rgba(255,87,51,0.25)]">
                  START YOUR PROJECT
                </Link>
              </div>
            </div>

            <div className="mt-20 glass-card p-2 rounded-xl border border-white/10 max-w-4xl mx-auto group" data-animate="fade-up" data-animate-delay="2">
              <img
                alt="High-impact cinematic website engineering mockup"
                className="w-full h-auto opacity-70 grayscale group-hover:grayscale-0 group-hover:opacity-90 transition-all duration-700 rounded"
                src="/assets/images/about_cta.png"
              />
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

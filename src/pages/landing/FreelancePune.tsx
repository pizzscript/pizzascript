import React, { useEffect, useState } from 'react';
import SEO from '../../components/SEO';
import WhatsAppBall from '../../components/WhatsAppBall';
import { useScrollEngine } from '../../hooks/useScrollEngine';
import RetroModal from '../../components/landing/RetroModal';
import LandingProjectCard from '../../components/landing/LandingProjectCard';
import '../../styles/freelance-pune.css';

const FAQ_ITEMS = [
  {
    q: 'Do you work with clients in Pune?',
    a: 'Yes. PizzaScript is based in Pune and actively works with local startups, SMEs, and enterprises across the city. Fully remote collaboration is also available for clients across India and internationally.',
  },
  {
    q: 'What is the difference between a website and web software?',
    a: 'A website is a digital presence, informational or marketing-focused. Web software is a functional platform: SaaS tools, dashboards, booking systems, CRMs, custom portals, or internal applications. PizzaScript builds both.',
  },
  {
    q: 'How long does a web development project take?',
    a: 'Most websites ship in 3 to 5 weeks. Custom web software applications typically take 6 to 12 weeks depending on scope and complexity. A clear project timeline is defined and agreed upon before any development begins.',
  },
  {
    q: 'Do you work with startups?',
    a: 'Yes. PizzaScript regularly partners with early-stage startups and growing businesses in Pune. From MVPs to full product builds, every project starts with a clear scope and a realistic delivery timeline.',
  },
  {
    q: 'Is SEO included in web development projects?',
    a: 'Yes. Technical SEO is built into every project: semantic HTML structure, Core Web Vitals optimisation, meta tags, schema markup, and crawlability. Search visibility is never an afterthought.',
  },
  {
    q: 'Can I hire you for a single project or ongoing work?',
    a: 'Both. Fixed-scope projects and ongoing retainer arrangements are available for businesses that need continued development, feature updates, and maintenance support.',
  },
];

const SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': ['LocalBusiness', 'ProfessionalService'],
      '@id': 'https://www.pizzascript.com/freelance-pune',
      'name': 'PizzaScript',
      'description': 'Freelance web development and web software studio based in Pune, India. Building custom websites, web applications, and software platforms for startups and businesses.',
      'url': 'https://www.pizzascript.com/freelance-pune',
      'telephone': '+919356636203',
      'email': 'pizzzascript@gmail.com',
      'address': {
        '@type': 'PostalAddress',
        'addressLocality': 'Pune',
        'addressRegion': 'Maharashtra',
        'addressCountry': 'IN',
      },
      'geo': {
        '@type': 'GeoCoordinates',
        'latitude': '18.5204',
        'longitude': '73.8567',
      },
      'areaServed': [
        { '@type': 'City', 'name': 'Pune' },
        { '@type': 'State', 'name': 'Maharashtra' },
        { '@type': 'Country', 'name': 'India' },
      ],
      'serviceType': [
        'Freelance Web Development',
        'Custom Web Software Development',
        'Web Application Development',
        'Technical SEO',
        'Interface Design',
        'Headless E-Commerce Development',
      ],
      'sameAs': [
        'https://pizzascript.com',
        'https://github.com/pizzascript',
      ],
    },
    {
      '@type': 'FAQPage',
      'mainEntity': FAQ_ITEMS.map(item => ({
        '@type': 'Question',
        'name': item.q,
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': item.a,
        },
      })),
    },
  ],
};

const HERO_HEADINGS = [
  'Freelance web development and custom web software, built in Pune, built to last.',
  'High-performance digital products built from scratch with clean, maintainable code.',
  'Product engineering from scope to launch, helping startups build MVPs that scale.',
  'Custom SaaS portals, booking engines, and databases built to streamline your business.'
];

export default function FreelancePune() {
  useScrollEngine();

  const [activeLiveView, setActiveLiveView] = useState<{ src: string; title: string } | null>(null);
  const [headingIndex, setHeadingIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(HERO_HEADINGS[0].length);
  const [isDeleting, setIsDeleting] = useState(false);
  const [delay, setDelay] = useState(4000);

  useEffect(() => {
    const fullText = HERO_HEADINGS[headingIndex];

    const handleTimeout = () => {
      if (!isDeleting) {
        if (charIndex < fullText.length) {
          setCharIndex(prev => prev + 1);
          setDelay(12);
        } else {
          setIsDeleting(true);
          setDelay(4000);
        }
      } else {
        if (charIndex > 0) {
          setCharIndex(prev => prev - 1);
          setDelay(4);
        } else {
          setIsDeleting(false);
          setHeadingIndex(prev => (prev + 1) % HERO_HEADINGS.length);
          setDelay(300);
        }
      }
    };

    const timeout = setTimeout(handleTimeout, delay);
    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, headingIndex, delay]);

  const currentFullHeading = HERO_HEADINGS[headingIndex];
  const headingWords = currentFullHeading.split(' ');
  const lastWord = headingWords[headingWords.length - 1];
  const mainPart = headingWords.slice(0, -1).join(' ') + ' ';

  const isHighlightingLastWord = charIndex > mainPart.length;
  const typedMain = currentFullHeading.substring(0, Math.min(charIndex, mainPart.length));
  const typedLast = isHighlightingLastWord ? currentFullHeading.substring(mainPart.length, charIndex) : '';
  const isComplete = charIndex === currentFullHeading.length && !isDeleting;

  // Remove site preloader immediately
  useEffect(() => {
    const el = document.getElementById('preloader');
    if (el) el.remove();
    document.body.classList.remove('loading');
  }, []);

  // Intersection observer for scroll reveals
  useEffect(() => {
    const els = document.querySelectorAll('.fp-reveal');
    const obs = new IntersectionObserver(
      (entries) => entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          obs.unobserve(e.target);
        }
      }),
      { threshold: 0.05, rootMargin: '0px 0px -20px 0px' }
    );
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;
    const lenis = (window as any).lenis;
    if (lenis) {
      lenis.scrollTo(el);
    } else {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const MARQUEE_ITEMS = [
    'React', 'NextJS', 'TypeScript', 'NodeJS', 'Web Software',
    'TailwindCSS', 'Framer Motion', 'Figma', 'Technical SEO', 'E-Commerce',
    'React', 'NextJS', 'TypeScript', 'NodeJS', 'Web Software',
    'TailwindCSS', 'Framer Motion', 'Figma', 'Technical SEO', 'E-Commerce',
  ];

  const INDUSTRIES = [
    'IT & SaaS Startups',
    'Real Estate',
    'Healthcare & Clinics',
    'Education & EdTech',
    'Retail & E-Commerce',
    'Manufacturing & B2B',
    'Professional Services',
    'Hospitality & Events',
  ];

  return (
    <>
      <SEO
        title="Freelance Web Developer & Web Software in Pune"
        description="Custom websites, web applications, and web software for startups and businesses in Pune. PizzaScript builds high-performance digital products with clean code, technical SEO, and no templates."
        keywords="freelance web developer Pune, web software developer Pune, custom web application Pune, hire web developer Pune, React developer Pune, NextJS developer Pune, web design Pune, web software company Pune, technical SEO Pune, startup web developer Pune, website development Pune, web application development Pune"
        canonicalUrl="/freelance-pune"
        schema={SCHEMA}
      />

      <div className="fp-page">

        {/* ─── NAVIGATION ─── */}
        <nav className="fp-nav">
          <div className="fp-container">
            <div className="fp-nav-inner">
              <a href="https://pizzascript.com/" className="fp-nav-logo">PizzaScript</a>
              <ul className="fp-nav-links">
                <li><a href="#process" onClick={e => scrollTo(e, 'process')}>Process</a></li>
                <li><a href="#services" onClick={e => scrollTo(e, 'services')}>Services</a></li>
                <li><a href="#work" onClick={e => scrollTo(e, 'work')}>Work</a></li>
                <li><a href="#faq" onClick={e => scrollTo(e, 'faq')}>FAQ</a></li>
                <li><a href="#contact" onClick={e => scrollTo(e, 'contact')}>Contact</a></li>
              </ul>
              <a href="mailto:pizzzascript@gmail.com" className="fp-nav-cta">Start a Project</a>
            </div>
          </div>
        </nav>

        {/* ─── HERO & MARQUEE UNIFIED ─── */}
        <section className="fp-hero">
          <div className="fp-hero-inner">
            <div className="fp-container">
              <div className="fp-hero-content">
                <div className="fp-hero-eyebrow fp-reveal">
                  <span className="fp-label">Freelance · Pune-based · Available for new projects</span>
                </div>
                <h1 className="fp-display fp-hero-title fp-reveal fp-delay-1">
                  {typedMain}
                  {isComplete ? <em>{lastWord}</em> : typedLast}
                </h1>
                <p className="fp-hero-sub fp-reveal fp-delay-2">
                  Custom websites, web applications, and software platforms for startups and businesses. Based in Pune, working with clients across India, Europe, and North America.
                </p>
                <div className="fp-hero-actions fp-reveal fp-delay-3">
                  <a href="mailto:pizzzascript@gmail.com" className="fp-btn-primary">
                    Start a project conversation
                  </a>
                  <a href="#work" onClick={e => scrollTo(e, 'work')} className="fp-btn-secondary">
                    View selected work
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* ─── MARQUEE ─── */}
          <div className="fp-marquee-wrap" aria-hidden="true">
            <div className="fp-marquee-track">
              {MARQUEE_ITEMS.map((item, i) => (
                <span key={i}>{item}</span>
              ))}
            </div>
          </div>
        </section>

        {/* ─── PROCESS ─── */}
        <section className="fp-section" id="process">
          <div className="fp-container">
            <div className="fp-section-header fp-reveal">
              <div>
                <span className="fp-label fp-mb-4">Methodology</span>
                <h2 className="fp-headline">Structured Process</h2>
              </div>
              <p className="fp-body">
                A focused process built for clarity, predictability, and high quality output. Every phase establishes the foundation for the next, with no surprises at any stage.
              </p>
            </div>

            <div className="fp-process-list">
              {[
                {
                  phase: 'Discovery Phase',
                  title: 'Definition and Scope',
                  desc: 'You leave this phase with a clear project scope, defined timeline, and fixed cost — all agreed before a single line of code is written.',
                },
                {
                  phase: 'Design Phase',
                  title: 'Prototyping and Layouts',
                  desc: 'Every layout and visual direction is approved by you before production development begins. No redesigns mid-build, no late surprises.',
                },
                {
                  phase: 'Development Phase',
                  title: 'Clean Engineering',
                  desc: 'Your codebase is clean, documented, and fully owned by you. No lock-in, no proprietary builders — code written to last and easy to extend.',
                },
                {
                  phase: 'Deployment Phase',
                  title: 'Launch and Audit',
                  desc: 'Your site or application goes live with complete performance and SEO audits already done. Post-launch support is included in every engagement.',
                },
              ].map((step, i) => (
                <div key={i} className={`fp-process-step fp-reveal fp-delay-${Math.min(i + 1, 3) as 1|2|3}`}>
                  <div className="fp-process-phase">{step.phase}</div>
                  <div>
                    <div className="fp-process-title">{step.title}</div>
                    <p className="fp-process-desc">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── SERVICES ─── */}
        <section className="fp-section" id="services">
          <div className="fp-container">
            <div className="fp-section-header fp-reveal">
              <div>
                <span className="fp-label fp-mb-4">Services in Pune</span>
                <h2 className="fp-headline">Engineering and Design</h2>
              </div>
              <p className="fp-body">
                Full-cycle web development and web software, without the agency overhead. Direct developer communication, reliable updates, and production code built to scale.
              </p>
            </div>

            {/* Services Grid */}
            <div className="fp-services-grid fp-reveal">
              <div className="fp-service-card">
                <div className="fp-service-tag">Engineering</div>
                <div className="fp-service-name">Custom Web Applications</div>
                <p className="fp-service-desc">
                  Maintainable web applications and software platforms built from the ground up using React, NextJS, and TypeScript, designed for Pune startups and growing businesses.
                </p>
              </div>
              <div className="fp-service-card">
                <div className="fp-service-tag">Visibility</div>
                <div className="fp-service-name">Technical SEO</div>
                <p className="fp-service-desc">
                  Semantic structures, Core Web Vitals optimisation, and clean indexable architectures. Built to rank in Pune and across India without ongoing agency dependency.
                </p>
              </div>
              <div className="fp-service-card">
                <div className="fp-service-tag">Design</div>
                <div className="fp-service-name">Interface Design</div>
                <p className="fp-service-desc">
                  Functional, responsive design matched precisely to code execution. Design systems, accessible components, and clean layouts built to convert and perform.
                </p>
              </div>
              <div className="fp-service-card">
                <div className="fp-service-tag">Commerce</div>
                <div className="fp-service-name">Modern Commerce</div>
                <p className="fp-service-desc">
                  Headless Shopify, WooCommerce, and custom storefront builds. Faster load times, better Core Web Vitals, and checkout flows optimised for conversion.
                </p>
              </div>
            </div>
            <div className="fp-section-actions fp-reveal">
              <a href="https://pizzascript.com/services" className="fp-btn-secondary">Review All Services</a>
            </div>

            {/* ─── INDUSTRIES ─── */}
            <div className="fp-industries-wrap fp-reveal">
              <span className="fp-label fp-mb-4">Industries Served in Pune</span>
              <div className="fp-industries-row">
                {INDUSTRIES.map((industry, i) => (
                  <span key={i} className="fp-industry-tag">{industry}</span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ─── LOCATION ─── */}
        <section className="fp-section">
          <div className="fp-container">
            <div className="fp-split">
              <div className="fp-split-image fp-reveal">
                <a
                  href="https://maps.app.goo.gl/8d6HJiHh8656Dsyj6"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display: 'block', width: '100%', height: '100%' }}
                >
                  <img
                    src="/assets/images/pune-map.webp"
                    alt="Pizza Script office location on Pune map"
                  />
                </a>
              </div>
              <div className="fp-split-text fp-reveal fp-delay-2">
                <span className="fp-label">Location</span>
                <h2 className="fp-headline">Based in Pune, delivering globally.</h2>
                <p className="fp-body">
                  Based in Pune, Maharashtra, working remotely with clients across India, Europe, and North America. Partnering with startups building new products and businesses looking to rebuild or improve their digital platforms.
                </p>
                <p className="fp-body">
                  Consistent daily progress updates for all active projects. Aligned communication schedules for clients across time zones. Transparent timelines, no agency middlemen.
                </p>
                <a href="mailto:pizzzascript@gmail.com" className="fp-btn-primary" style={{ alignSelf: 'flex-start' }}>
                  Write an email
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ─── PIZZASCRIPT STUDIO (Pop Out Website Preview) ─── */}
        <section className="fp-studio-section">
          <div className="fp-container">
            <div className="fp-studio-grid fp-reveal" style={{ marginBottom: 0 }}>
              <div className="fp-studio-logo-wrap">
                <span className="fp-label fp-mb-4">Parent Studio</span>
                <h2 className="fp-studio-logo-text">PizzaScript</h2>
                <p className="fp-studio-clarification">
                  This freelance practice operates under PizzaScript, an independent web development and web software studio based in Pune.
                </p>
              </div>
              <div className="fp-studio-content">
                <p className="fp-body">
                  Custom websites and web software, built without templates, page builders, or shortcuts. Every project is engineered from the ground up for speed, reliability, and long-term maintainability.
                </p>
                <p className="fp-body">
                  Explore the main studio to review engineering principles, the full service list, and the complete developer portfolio.
                </p>
                <a href="https://pizzascript.com/" className="fp-btn-primary">
                  Explore Main Studio
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ─── PORTFOLIO ─── */}
        <section className="fp-section" id="work">
          <div className="fp-container">
            <div className="fp-section-header fp-reveal">
              <div>
                <span className="fp-label fp-mb-4">Selected Work</span>
                <h2 className="fp-headline">Recent Releases</h2>
              </div>
              <p className="fp-body">
                A selection of digital products built to perform: clean code, optimised delivery, and measurable results. Click any preview card to view the live website.
              </p>
            </div>

            <div className="fp-portfolio-list">
              <LandingProjectCard
                imageSrc="/assets/images/mydesignacademia.png"
                imageAlt="My Design Academia educational platform mockup"
                title="My Design Academia"
                tags="React · NodeJS · TypeScript · CSS · SEO"
                liveUrl="https://mydesignacademia.com/"
                onLiveViewClick={(url, title) => setActiveLiveView({ src: url, title })}
              />

              <LandingProjectCard
                imageSrc="/assets/images/orionpharmaindia.png"
                imageAlt="Orion Pharma India corporate website mockup"
                title="Orion Pharma India"
                tags="HTML · CSS · JavaScript · SEO"
                liveUrl="https://www.orionpharmaindia.org/"
                onLiveViewClick={(url, title) => setActiveLiveView({ src: url, title })}
              />
            </div>
            <div className="fp-section-actions fp-reveal">
              <a href="https://pizzascript.com/portfolio" className="fp-btn-secondary">Explore Full Portfolio</a>
            </div>
          </div>
        </section>

        {/* ─── WRITING (BLOG) ─── */}
        <section className="fp-section" id="blog">
          <div className="fp-container">
            <div className="fp-section-header fp-reveal">
              <div>
                <span className="fp-label fp-mb-4">Journal</span>
                <h2 className="fp-headline">Technical Writing</h2>
              </div>
              <p className="fp-body">
                Insights on frontend architecture, rendering performance, search crawler indexing, and digital design workflows.
              </p>
            </div>

            <div className="fp-blog-grid fp-reveal">
              <a href="https://pizzascript.com/blog" className="fp-blog-card">
                <span className="fp-blog-card-tag">Engineering</span>
                <h3 className="fp-blog-card-title">Code Splitting in Large Scale React Architectures</h3>
                <p className="fp-blog-card-desc">
                  Analyzing loading sequence graphs and splitting bundles to minimize script execution delay and improve page layout stability.
                </p>
              </a>
              <a href="https://pizzascript.com/blog" className="fp-blog-card">
                <span className="fp-blog-card-tag">SEO</span>
                <h3 className="fp-blog-card-title">Measuring Technical SEO Compounds</h3>
                <p className="fp-blog-card-desc">
                  Exploring crawler budget efficiency, server rendering response times, and semantic elements that build organic search visibility.
                </p>
              </a>
            </div>

            <div className="fp-section-actions fp-reveal">
              <a href="https://pizzascript.com/blog" className="fp-btn-secondary">Read Entire Journal</a>
            </div>
          </div>
        </section>

        {/* ─── FAQ ─── */}
        <section className="fp-section" id="faq">
          <div className="fp-container">
            <div className="fp-section-header fp-reveal">
              <div>
                <span className="fp-label fp-mb-4">Common Questions</span>
                <h2 className="fp-headline">Frequently Asked</h2>
              </div>
              <p className="fp-body">
                Answers to the most common questions about web development and web software projects in Pune.
              </p>
            </div>

            <div className="fp-faq-list">
              {FAQ_ITEMS.map((item, i) => (
                <div key={i} className={`fp-faq-item fp-reveal fp-delay-${Math.min(i % 3 + 1, 3) as 1|2|3}`}>
                  <div className="fp-faq-question">{item.q}</div>
                  <p className="fp-faq-answer">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── CONTACT / CTA ─── */}
        <section className="fp-cta" id="contact">
          <div className="fp-container">
            <div className="fp-cta-inner fp-reveal">
              <div>
                <span className="fp-cta-label">Currently accepting new Pune projects</span>
                <h2 className="fp-cta-display">
                  Start a new <em>collaboration</em>.
                </h2>
              </div>
              <div className="fp-cta-details">
                <p className="fp-cta-body">
                  Open to new web development and web software projects: startups, SMEs, and enterprises in Pune and beyond. Reach out to schedule a brief introductory call.
                </p>
                <div className="fp-cta-links">
                  <a href="mailto:pizzzascript@gmail.com" className="fp-btn-primary">
                    Send Email
                  </a>
                  <a href="https://wa.me/919356636203" target="_blank" rel="noopener noreferrer" className="fp-btn-secondary">
                    Chat on WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── FOOTER ─── */}
        <footer className="fp-footer">
          <div className="fp-container">
            <div className="fp-footer-grid fp-reveal">
              <div>
                <a href="https://pizzascript.com/" className="fp-footer-brand">PizzaScript</a>
                <p className="fp-footer-tagline">
                  Freelance web development, web software, and technical SEO, based in Pune, India.
                </p>
              </div>
              <div>
                <span className="fp-footer-col-label">Navigation</span>
                <ul className="fp-footer-links">
                  <li><a href="#process" onClick={e => scrollTo(e, 'process')}>Process</a></li>
                  <li><a href="#services" onClick={e => scrollTo(e, 'services')}>Services</a></li>
                  <li><a href="#work" onClick={e => scrollTo(e, 'work')}>Selected Work</a></li>
                  <li><a href="#faq" onClick={e => scrollTo(e, 'faq')}>FAQ</a></li>
                  <li><a href="#contact" onClick={e => scrollTo(e, 'contact')}>Contact</a></li>
                  <li><a href="https://pizzascript.com/">Main Site</a></li>
                </ul>
              </div>
              <div>
                <span className="fp-footer-col-label">Contact</span>
                <ul className="fp-footer-links">
                  <li><a href="mailto:pizzzascript@gmail.com">pizzzascript@gmail.com</a></li>
                  <li><a href="https://wa.me/919356636203" target="_blank" rel="noopener noreferrer">WhatsApp Channel</a></li>
                  <li><a href="https://github.com/pizzascript" target="_blank" rel="noopener noreferrer">GitHub Profile</a></li>
                </ul>
              </div>
            </div>
            <div className="fp-footer-bottom fp-reveal">
              <span className="fp-footer-copy">© {new Date().getFullYear()} PizzaScript. All rights reserved.</span>
              <span className="fp-footer-copy">Pune, Maharashtra, India</span>
            </div>
          </div>
        </footer>

      </div>

      <WhatsAppBall />

      <RetroModal
        isOpen={activeLiveView !== null}
        onClose={() => setActiveLiveView(null)}
        src={activeLiveView?.src || ''}
        title={activeLiveView?.title || ''}
      />
    </>
  );
}

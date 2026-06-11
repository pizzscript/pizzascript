import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { portfolioItems } from '../data/portfolio';
import { getBreadcrumbSchema } from '../utils/schema';

// ---- Same live-preview iframe component as PortfolioSection.tsx ----
function PortfolioCardImage({ src, title, link }: { src: string; title: string; link: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [scale, setScale] = useState(0.3);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const updateScale = () => {
      const width = container.clientWidth;
      if (width > 0) setScale(width / 1440);
    };

    updateScale();

    if (typeof ResizeObserver !== 'undefined') {
      const observer = new ResizeObserver(updateScale);
      observer.observe(container);
      return () => observer.disconnect();
    } else {
      window.addEventListener('resize', updateScale);
      return () => window.removeEventListener('resize', updateScale);
    }
  }, []);

  useEffect(() => {
    const handleBlur = () => {
      if (document.activeElement === iframeRef.current) {
        window.open(link, '_blank', 'noopener,noreferrer');
        setTimeout(() => window.focus(), 150);
      }
    };
    window.addEventListener('blur', handleBlur);
    return () => window.removeEventListener('blur', handleBlur);
  }, [link]);

  return (
    <div
      ref={containerRef}
      className="portfolio-card__image"
      style={{ '--iframe-scale': scale } as React.CSSProperties}
      data-lenis-prevent
    >
      <iframe
        ref={iframeRef}
        src={src}
        title={title}
        className="portfolio-iframe"
        loading="lazy"
        sandbox="allow-scripts allow-same-origin"
      />
    </div>
  );
}

// ---- Map portfolio items to add slugs ----
const CASE_STUDIES = portfolioItems.map(item => {
  const slug = item.realName.trim().toLowerCase().replace(/\s+/g, '-');
  return { ...item, slug, title: item.realName.trim() };
});

export default function PortfolioHub() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Home', url: 'https://www.pizzascript.com' },
    { name: 'Portfolio', url: 'https://www.pizzascript.com/portfolio' },
  ]);

  return (
    <>
      <SEO
        title="Web Engineering Case Studies &amp; Portfolio"
        description="Explore our web development and engineering case studies. High-performance React applications, custom layouts, technical SEO audits, and speed optimizations."
        keywords="web development case study, react developer portfolio, custom frontend development, Pune web engineer portfolio"
        canonicalUrl="/portfolio"
        schema={breadcrumbSchema}
      />

      <div className="min-h-screen pt-40 lg:pt-52 pb-16 px-4 md:px-12 lg:px-24 text-cream relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col gap-24">

          {/* Breadcrumb */}
          <div className="text-[10px] font-mono text-stone-500 uppercase mb-8 tracking-widest text-center md:text-left">
            <Link to="/" className="hover:text-oven-orange transition-colors">HOME</Link>
            {' / '}
            <span className="text-oven-orange">PORTFOLIO</span>
          </div>

          {/* Header */}
          <div className="text-center md:text-left mb-16 max-w-3xl">
            <span className="cin-eyebrow text-xs tracking-widest block uppercase mb-2">// Case Studies</span>
            <h1 className="cin-heading text-4xl md:text-5xl lg:text-6xl font-serif font-bold leading-tight">
              Our Web <span className="italic text-oven-orange">Engineering</span> Portfolio
            </h1>
            <p className="cin-text text-stone-400 text-base mt-6 leading-relaxed">
              Explore the technical implementation reports for our projects. We detail our architectural decisions, Core Web Vitals optimization curves, and client conversion results.
            </p>
          </div>

          {/* Grid — exact same card structure as home page PortfolioSection */}
          <div className="portfolio-grid">
            {CASE_STUDIES.map((study) => (
              <article
                key={study.slug}
                className="portfolio-card"
                data-animate="fade-up"
                data-animate-delay={study.animateDelay}
              >
                {/* Live iframe preview or logo fallback — matches home page exactly */}
                {study.showLivePreview ? (
                  <a
                    href={study.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ display: 'block', width: '100%', cursor: 'pointer' }}
                  >
                    <PortfolioCardImage src={study.link} title={study.dishName} link={study.link} />
                  </a>
                ) : (
                  <div className="portfolio-card__image">
                    <img
                      src={study.imageSrc}
                      alt={study.imageAlt}
                      className="portfolio-card__logo"
                    />
                    <div className="portfolio-card__overlay">
                      <a
                        href={study.link}
                        className="btn btn-primary"
                        aria-label={study.linkLabel}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View Project
                      </a>
                    </div>
                  </div>
                )}

                {/* Card body — same as home page */}
                <div className="portfolio-card__body">
                  <h2 className="portfolio-card__title">
                    <a href={study.link} target="_blank" rel="noopener noreferrer">
                      {study.dishName}
                    </a>
                  </h2>
                  {study.dishName !== study.title && (
                    <span className="portfolio-card__subtitle">{study.title}</span>
                  )}
                  <p className="portfolio-card__desc">{study.description}</p>
                  <div className="portfolio-card__tags">
                    {study.tags.map(tag => (
                      <span key={tag} className="portfolio-tag">{tag}</span>
                    ))}
                  </div>
                  <div className="portfolio-card__meta">
                    <span>{study.duration}</span>
                    <span style={{ color: 'var(--color-oven-orange)' }}>{study.flavor}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>

        </div>
      </div>
    </>
  );
}

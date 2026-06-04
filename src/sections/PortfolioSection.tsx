import React, { useRef, useState, useEffect } from 'react';
import { portfolioItems } from '../data/portfolio';

function PortfolioCardImage({ src, title, link }: { src: string; title: string; link: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [scale, setScale] = useState(0.3);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const updateScale = () => {
      const width = container.clientWidth;
      if (width > 0) {
        setScale(width / 1440);
      }
    };

    updateScale();

    if (typeof ResizeObserver !== 'undefined') {
      const observer = new ResizeObserver(() => {
        updateScale();
      });
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
        // Refocus the parent window so subsequent clicks can be captured
        setTimeout(() => {
          window.focus();
        }, 150);
      }
    };

    window.addEventListener('blur', handleBlur);
    return () => {
      window.removeEventListener('blur', handleBlur);
    };
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

export default function PortfolioSection() {
  return (
    <section id="chef-specials" className="section">
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <p className="cin-eyebrow" style={{ justifyContent: 'center' }}>
            <span style={{ width: '32px', height: '1px', background: 'var(--color-oven-orange)', display: 'inline-block' }} />
            Our Work
          </p>
          <h2 className="section-title" data-animate="fade-up">
            Chef's Specials
          </h2>
          <p className="section-subtitle" data-animate="fade-up" data-animate-delay="1">
            Our finest creations. Made with love and late nights.
          </p>
        </div>

        <div className="portfolio-grid">
          {portfolioItems.map((item, index) => (
            <article
              key={index}
              className="portfolio-card"
              data-animate="fade-up"
              data-animate-delay={item.animateDelay}
            >
              {item.showLivePreview ? (
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display: 'block', width: '100%', cursor: 'pointer' }}
                >
                  <PortfolioCardImage src={item.link} title={item.dishName} link={item.link} />
                </a>
              ) : (
                <div className="portfolio-card__image">
                  <img
                    src={item.imageSrc}
                    alt={item.imageAlt}
                    className="portfolio-card__logo"
                  />
                  <div className="portfolio-card__overlay">
                    <a
                      href={item.link}
                      className="btn btn-primary"
                      aria-label={item.linkLabel}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View Project
                    </a>
                  </div>
                </div>
              )}
              <div className="portfolio-card__body">
                <h3 className="portfolio-card__title">
                  <a href={item.link} target="_blank" rel="noopener noreferrer">
                    {item.dishName}
                  </a>
                </h3>
                <span className="portfolio-card__subtitle">{item.realName}</span>
                <p className="portfolio-card__desc">{item.description}</p>
                <div className="portfolio-card__tags">
                  {item.tags.map((tag) => (
                    <span key={tag} className="portfolio-tag">{tag}</span>
                  ))}
                </div>
                <div className="portfolio-card__meta">
                  <span>{item.duration}</span>
                  <span style={{ color: 'var(--color-oven-orange)' }}>{item.flavor}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}


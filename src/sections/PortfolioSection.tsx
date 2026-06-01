import { portfolioItems } from '../data/portfolio';

export default function PortfolioSection() {
  return (
<<<<<<< HEAD
    <section id="chef-specials" className="section" style={{ backgroundColor: 'var(--color-brown-900)' }}>
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
              <div className="portfolio-card__image">
                <img
                  src={item.imageSrc}
                  alt={item.imageAlt}
                  className="logo"
                />
              </div>
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
              <div className="portfolio-card__body">
                <h3 className="portfolio-card__title">{item.dishName}</h3>
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
=======
    <section id="chef-specials" className="section">
      <div className="container">
        <h2 className="section-title" data-animate="fade-up">
          Chef's Specials
        </h2>
        <p
          className="section-subtitle"
          data-animate="fade-up"
          data-animate-delay="1"
        >
          Our finest creations. Made with love and late nights.
        </p>
        <div className="polaroid-grid">
          {portfolioItems.map((item, index) => (
            <article
              key={index}
              className="polaroid"
              data-animate="pop-in"
              data-animate-delay={item.animateDelay}
            >
              <div className="polaroid-image">
                <div
                  className="polaroid-image-placeholder"
                  aria-label={item.linkLabel}
                >
                  <img
                    src={item.imageSrc}
                    alt={item.imageAlt}
                    className="logo"
                  />
                </div>
                <div className="polaroid-overlay">
                  <a
                    href={item.link}
                    className="btn btn-neon"
                    aria-label={item.linkLabel}
                  >
                    👀 Taste It
                  </a>
                </div>
              </div>
              <div className="polaroid-caption">
                <h3 className="polaroid-dish-name">{item.dishName}</h3>
                <span className="polaroid-real-name">{item.realName}</span>
                <p className="polaroid-description">{item.description}</p>
                <div className="polaroid-tags">
                  {item.tags.map((tag) => (
                    <span key={tag} className="tag">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="polaroid-meta">
                  <span>{item.duration}</span>
                  <span className="polaroid-flavor">{item.flavor}</span>
>>>>>>> 50d74942736eff6c8c9a49b5f069202d1d28c8f1
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

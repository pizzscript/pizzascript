import { testimonials } from '../data/testimonials';

export default function ReviewsSection() {
  return (
    <section id="reviews" className="section" style={{ backgroundColor: 'var(--color-brown-800)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <p className="cin-eyebrow" style={{ justifyContent: 'center' }}>
            <span style={{ width: '32px', height: '1px', background: 'var(--color-oven-orange)', display: 'inline-block' }} />
            Testimonials
          </p>
          <h2 className="section-title" data-animate="fade-up">
            Happy Customers
          </h2>
          <p className="section-subtitle" data-animate="fade-up" data-animate-delay="1">
            Don't take our word for it. Read the reviews.
          </p>
        </div>

        <div className="testimonials-grid" data-animate="fade-up" data-animate-delay="2">
          {testimonials.map((t, index) => (
            <div key={index} className="testimonial-card">
              <div className="testimonial-card__quote-mark">"</div>
              <p className="testimonial-card__text">{t.quote}</p>
              {t.rating && (
                <div className="testimonial-card__rating">
                  {/* Convert pizza emojis to stars */}
                  {'★'.repeat(t.rating.split('🍕').length - 1)}
                </div>
              )}
              <div className="testimonial-card__author">
                <span className="testimonial-card__name">{t.authorName}</span>
                <span className="testimonial-card__date">{t.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

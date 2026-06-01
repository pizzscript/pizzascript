import { services } from '../data/services';

export default function SpecialsSection() {
  return (
    <section id="specials" className="section section--alt">
      <div className="container">
        <h2 className="section-title" data-animate="fade-up">
          Today's Specials
        </h2>
        <p
          className="section-subtitle"
          data-animate="fade-up"
          data-animate-delay="1"
        >
          Pick your flavor. Every pie is custom-made to order.
        </p>
        <div className="grid grid--3">
          {services.map((item, index) => (
            <article
              key={index}
              className="menu-card"
              data-animate="pop-in"
              data-animate-delay={item.animateDelay}
            >
              <div className="menu-card-header">
                <span className="menu-card-emoji" aria-hidden="true">
                  {item.emoji}
                </span>
                <div>
                  <h3 className="menu-card-title">{item.title}</h3>
                  <span className="menu-card-service">{item.service}</span>
                </div>
              </div>
              <p className="menu-card-description">{item.description}</p>
              <div
                className="menu-card-ingredients"
                aria-label="Technologies used"
              >
                {item.ingredients.map((ing) => (
                  <span key={ing} className="menu-card-ingredient">
                    {ing}
                  </span>
                ))}
              </div>
              <div className="menu-card-meta">
                <span className="menu-card-time">{item.time}</span>
                <span className="menu-card-price">{item.price}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

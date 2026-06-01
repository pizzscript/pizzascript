import { shelves } from '../data/skills';

export default function PantrySection() {
  return (
    <section id="pantry" className="section">
      <div className="container">
        <h2 className="section-title" data-animate="fade-up">
          The Pantry
        </h2>
        <p
          className="section-subtitle"
          data-animate="fade-up"
          data-animate-delay="1"
        >
          Fresh tools, clean code, and the right ingredients for every digital
          recipe.
        </p>

        {shelves.map((shelf, shelfIdx) => (
          <div
            key={shelfIdx}
            className="shelf"
            data-animate="fade-up"
          >
            <div className="shelf-header">
              <span className="shelf-emoji" aria-hidden="true">
                {shelf.emoji}
              </span>
              <h3 className="shelf-name">{shelf.name}</h3>
              <span className="shelf-category">{shelf.category}</span>
            </div>
            <div className="shelf-items">
              {shelf.items.map((item) => (
                <div
                  key={item.iconId}
                  className="ingredient-badge"
                  data-animate="pop-in"
                  data-animate-delay={item.animateDelay}
                  style={
                    { '--proficiency': item.proficiency } as React.CSSProperties
                  }
                >
                  <div className="ingredient-icon" id={item.iconId} />
                  <div className="ingredient-info">
                    <span className="ingredient-name">{item.name}</span>
                    <div className="proficiency-bar">
                      <div className="proficiency-fill" />
                    </div>
                    <span className="ingredient-freshness">
                      {item.freshness}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

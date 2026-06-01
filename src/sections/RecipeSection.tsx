import { processSteps } from '../data/process';

export default function RecipeSection() {
  return (
    <section id="recipe" className="section section--dark">
      <div className="container">
        <h2 className="section-title" data-animate="fade-up">
          The Recipe
        </h2>
        <p
          className="section-subtitle"
          data-animate="fade-up"
          data-animate-delay="1"
        >
          From raw dough to golden crust. Here's how the magic happens.
        </p>
        <div className="timeline">
          {processSteps.map((step) => (
            <div
              key={step.number}
              className="recipe-step"
              data-animate={step.animate}
            >
              <div className="step-number">{step.number}</div>
              <div className="step-card">
                <h3 className="step-recipe-name">{step.recipeName}</h3>
                <span className="step-real-name">{step.realName}</span>
                <p className="step-description">{step.description}</p>
                <span className="step-duration">{step.duration}</span>
                <div className="chef-note">{step.chefNote}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

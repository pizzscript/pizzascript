import { useForm } from '../hooks/useForm';

export default function OrderSection() {
  const {
    formState,
    errors,
    valid,
    submitting,
    message,
    budgetDisplay,
    updateField,
    validateField,
    handleSubmit,
  } = useForm();

  const fieldClass = (name: 'name' | 'email' | 'project') => {
    if (errors[name]) return 'form-group error';
    if (valid[name]) return 'form-group valid';
    return 'form-group';
  };

  return (
<<<<<<< HEAD
    <section id="order" className="section" style={{ backgroundColor: 'var(--color-brown-900)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <p className="cin-eyebrow" style={{ justifyContent: 'center' }}>
            <span style={{ width: '32px', height: '1px', background: 'var(--color-oven-orange)', display: 'inline-block' }} />
            Get in Touch
          </p>
          <h2 className="section-title" data-animate="fade-up">
            Place Your Order
          </h2>
          <p className="section-subtitle" data-animate="fade-up" data-animate-delay="1">
            Got a project craving? Let's cook up something fresh.
          </p>
        </div>

=======
    <section id="order" className="section section--alt">
      <div className="container">
        <h2 className="section-title" data-animate="fade-up">
          Place Your Order
        </h2>
        <p
          className="section-subtitle"
          data-animate="fade-up"
          data-animate-delay="1"
        >
          Got a project craving? Let's cook up something fresh.
        </p>
>>>>>>> 50d74942736eff6c8c9a49b5f069202d1d28c8f1
        <div className="order-pad" data-animate="fade-up" data-animate-delay="2">
          <form id="order-form" onSubmit={handleSubmit} noValidate>
            <div className={fieldClass('name')} id="field-name">
              <label htmlFor="customer-name" className="form-label">
                Your Name
              </label>
              <input
                type="text"
                id="customer-name"
                name="customer_name"
                className="form-input"
<<<<<<< HEAD
                placeholder="What should we call you?"
=======
                placeholder="Chef needs to know who's ordering"
>>>>>>> 50d74942736eff6c8c9a49b5f069202d1d28c8f1
                required
                value={formState.customerName}
                onChange={(e) => updateField('customerName', e.target.value)}
                onBlur={() => validateField('name')}
              />
              <span className="form-error" id="error-name">
<<<<<<< HEAD
                Every order needs a name.
=======
                Every order needs a name, Chef.
>>>>>>> 50d74942736eff6c8c9a49b5f069202d1d28c8f1
              </span>
            </div>

            <div className={fieldClass('email')} id="field-email">
              <label htmlFor="customer-email" className="form-label">
                Your Email
              </label>
              <input
                type="email"
                id="customer-email"
                name="email"
                className="form-input"
                placeholder="Where should we send the receipt?"
                required
                value={formState.email}
                onChange={(e) => updateField('email', e.target.value)}
                onBlur={() => validateField('email')}
              />
              <span className="form-error" id="error-email">
                We need a valid email to send your order confirmation.
              </span>
            </div>

            <div className="form-group" id="field-phone">
              <label htmlFor="customer-phone" className="form-label">
                Contact Number
              </label>
              <input
                type="tel"
                id="customer-phone"
                name="phone"
                className="form-input"
                placeholder="Your WhatsApp / mobile number"
                pattern="[0-9+\s\-]{7,15}"
                value={formState.phone}
                onChange={(e) => updateField('phone', e.target.value)}
              />
              <span className="form-error" id="error-phone">
                Please enter a valid contact number.
              </span>
            </div>

            <div className={fieldClass('project')} id="field-project">
              <label htmlFor="project-type" className="form-label">
<<<<<<< HEAD
                What Are You Looking For?
=======
                What Are You Craving?
>>>>>>> 50d74942736eff6c8c9a49b5f069202d1d28c8f1
              </label>
              <select
                id="project-type"
                name="project_type"
                className="form-select"
                required
                value={formState.projectType}
                onChange={(e) => updateField('projectType', e.target.value)}
                onBlur={() => validateField('project')}
              >
<<<<<<< HEAD
                <option value="">Select a service...</option>
                <option value="margherita">Landing Page</option>
                <option value="supreme">Full Website</option>
                <option value="deep-dish">Web Application</option>
                <option value="calzone">UI/UX Design</option>
                <option value="secret-sauce">SEO Optimization</option>
                <option value="slice">Bug Fix / Small Task</option>
              </select>
              <span className="form-error" id="error-project">
                Please select a service.
=======
                <option value="">Pick from the menu...</option>
                <option value="margherita">
                  🍕 The Classic Margherita - Landing Page
                </option>
                <option value="supreme">
                  🍕 The Supreme - Full Website
                </option>
                <option value="deep-dish">
                  🥘 The Deep Dish - Web Application
                </option>
                <option value="calzone">
                  🥟 The Calzone - UI/UX Design
                </option>
                <option value="secret-sauce">
                  ⭐ The Secret Sauce - SEO Optimization
                </option>
                <option value="slice">
                  🔪 The Slice - Bug Fix / Small Task
                </option>
              </select>
              <span className="form-error" id="error-project">
                Please pick something from the menu!
>>>>>>> 50d74942736eff6c8c9a49b5f069202d1d28c8f1
              </span>
            </div>

            <div className="form-group range-group" id="field-budget">
              <label htmlFor="budget" className="form-label">
<<<<<<< HEAD
                Budget Range
=======
                How Much Dough? 💰
>>>>>>> 50d74942736eff6c8c9a49b5f069202d1d28c8f1
              </label>
              <div className="range-value" id="budget-display">
                {budgetDisplay}
              </div>
              <input
                type="range"
                id="budget"
                name="budget"
                className="form-range"
                min={5000}
                max={50000}
                step={5000}
                value={formState.budget}
                onChange={(e) =>
                  updateField('budget', parseInt(e.target.value))
                }
              />
            </div>

            <div className="form-group" id="field-details">
              <label htmlFor="details" className="form-label">
<<<<<<< HEAD
                Project Details
=======
                Special Instructions
>>>>>>> 50d74942736eff6c8c9a49b5f069202d1d28c8f1
              </label>
              <textarea
                id="details"
                name="details"
                className="form-textarea"
<<<<<<< HEAD
                placeholder="Tell us about your project — goals, features, timeline..."
=======
                placeholder="Extra toppings? Dietary restrictions? Tell me everything..."
>>>>>>> 50d74942736eff6c8c9a49b5f069202d1d28c8f1
                rows={5}
                value={formState.details}
                onChange={(e) => updateField('details', e.target.value)}
              />
            </div>

            <div className="form-submit">
              <button
                type="submit"
                className="btn btn-primary"
                id="submit-btn"
                aria-label="Submit your project inquiry"
                disabled={submitting}
              >
<<<<<<< HEAD
                {submitting ? 'Sending...' : 'Start the Conversation'}
=======
                {submitting ? '🔥 Firing up the oven...' : '🔥 Fire Up the Oven!'}
>>>>>>> 50d74942736eff6c8c9a49b5f069202d1d28c8f1
              </button>
            </div>
          </form>

          {message && (
            <div
              className={`form-message ${message.type}`}
              id="form-message"
              style={{ display: 'block' }}
            >
              {message.text}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

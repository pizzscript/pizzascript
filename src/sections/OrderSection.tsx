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
    <section id="order" className="section">
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
                placeholder="What should we call you?"
                required
                value={formState.customerName}
                onChange={(e) => updateField('customerName', e.target.value)}
                onBlur={() => validateField('name')}
              />
              <span className="form-error" id="error-name">
                Every order needs a name.
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
                What Are You Looking For?
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
              </span>
            </div>

            <div className="form-group range-group" id="field-budget">
              <label htmlFor="budget" className="form-label">
                Budget Range
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
                Project Details
              </label>
              <textarea
                id="details"
                name="details"
                className="form-textarea"
                placeholder="Tell us about your project — goals, features, timeline..."
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
                {submitting ? 'Sending...' : 'Start the Conversation'}
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

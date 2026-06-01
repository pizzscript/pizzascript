export default function Footer() {
  return (
    <footer id="the-bill" className="footer" role="contentinfo">
      <div className="container">
        <div className="receipt">
          <div className="receipt-header">
            <div className="receipt-logo">Pizza Script</div>
            <p className="receipt-tagline">
              Hand-crafted websites. Made from scratch.
            </p>
          </div>

          <div className="receipt-items">
            <div className="receipt-item">
              <span className="receipt-item-label">Subtotal</span>
              <span className="receipt-item-value">One amazing website</span>
            </div>
            <div className="receipt-item">
              <span className="receipt-item-label">Tax</span>
              <span className="receipt-item-value">Zero hidden fees</span>
            </div>
            <div className="receipt-item">
              <span className="receipt-item-label">Tip</span>
              <span className="receipt-item-value">
                Appreciated but optional
              </span>
            </div>
            <div className="receipt-item">
              <span className="receipt-item-label">Total</span>
              <span className="receipt-item-value">A happy client</span>
            </div>
          </div>

          <div className="receipt-social">
            <p className="receipt-social-label">Get In Touch:</p>
            <div className="social-links">
              <a
                href="mailto:pizzzascript@gmail.com"
                className="social-link"
                aria-label="Email Pizza Script"
              >
                Email
              </a>
              <a
                href="tel:+919356636203"
                className="social-link"
                aria-label="Call Pizza Script"
              >
                +91 93566 36203
              </a>
              <a
                href="https://wa.me/919356636203"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                aria-label="Chat with Pizza Script on WhatsApp"
              >
                WhatsApp
              </a>
            </div>
          </div>

          <p className="receipt-copyright">
            © {new Date().getFullYear()} Pizza Script
          </p>
        </div>
      </div>
    </footer>
  );
}

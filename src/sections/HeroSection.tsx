import { useRef } from 'react';
import { useHeroCanvas } from '../hooks/useHeroCanvas';
import { useHeroMouseTrail } from '../hooks/useHeroMouseTrail';

export default function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const trailCanvasRef = useRef<HTMLCanvasElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useHeroCanvas(canvasRef, sectionRef);
  useHeroMouseTrail(trailCanvasRef, sectionRef);

  const handleExploreClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if ((window as any).scrollToTargetWithTransition) {
      (window as any).scrollToTargetWithTransition('menu');
    } else {
      const target = document.getElementById('menu');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <section id="kitchen" className="hero-scroll-driver" ref={sectionRef}>
      <div className="hero-sticky">
        {/* Scroll Canvas */}
        <div className="hero-canvas-wrap">
          <canvas id="hero-canvas" ref={canvasRef} />
          <canvas id="hero-trail-canvas" ref={trailCanvasRef} className="hero-trail-canvas" />
        </div>

        {/* Desktop Cinematic Overlay */}
        {/* <div className="hero-overlay">
          <h1 className="hero-title">
            <span>Pizza</span>
            <span style={{ fontStyle: 'italic', color: 'var(--color-oven-orange)' }}>Script</span>
          </h1>
          <p className="hero-tagline">
            Hand-crafted websites, made from scratch.
          </p>
          <div className="hero-ctas">
            <a href="#menu" className="btn btn-primary" onClick={handleExploreClick}>
              Explore the Kitchen
            </a>
            <a href="#order" className="btn btn-secondary">
              Place an Order
            </a>
          </div>
        </div> */}
        {/* Mobile Hero Content Overlay */}
        <div className="hero-mobile-overlay">
          <div className="hero-mobile-content">
            <h1 className="hero-mobile-title">
              Pizza<span className="hero-mobile-title-script">Script</span>
            </h1>
            <p className="hero-mobile-tagline">
              Hand-crafted websites,
              <br />
              made from scratch.
            </p>
            <div className="hero-mobile-ctas">
              <a href="#menu" className="btn btn-primary hero-mobile-btn" onClick={handleExploreClick}>
                Explore the Kitchen
              </a>
              <a href="#order" className="btn btn-secondary hero-mobile-btn">
                Place an Order
              </a>
            </div>
          </div>
        </div>

        <div className="hero-mobile-scroll-hint" aria-hidden="true">
          <span>Scroll to explore</span>
          <span className="scroll-arrow">↓</span>
        </div>

        <div className="hero-scroll-hint" aria-hidden="true">
          <span>Scroll to explore</span>
          <span className="scroll-arrow">↓</span>
        </div>
      </div>
    </section>
  );
}

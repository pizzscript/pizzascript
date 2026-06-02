import { useRef } from 'react';
import { useHeroCanvas } from '../hooks/useHeroCanvas';
import gsap from 'gsap';

export default function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useHeroCanvas(canvasRef, sectionRef);

  const handleExploreClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const target = document.querySelector('#dough');
    if (!target) return;

    const targetOffset = target.getBoundingClientRect().top + window.scrollY;

    // Snappy transitions : 1.5s for mobile, 2.5s for desktop
    const checkMobile = window.innerWidth < 768;
    const scrollDuration = checkMobile ? 1.5 : 2.5;

    const lenis = (window as unknown as Record<string, unknown>).lenis as
      | { scrollTo: (target: Element, options?: Record<string, unknown>) => void }
      | undefined;
    if (lenis) {
      lenis.scrollTo(target, {
        duration: scrollDuration,
        easing: (t: number) => 1 - Math.pow(1 - t, 3), // Ease-out cubic: starts immediately at full speed, decelerates at the end
      });
    } else {
      const obj = { y: window.scrollY };
      gsap.to(obj, {
        y: targetOffset,
        duration: scrollDuration,
        ease: 'power2.out', // Snappier ease-out
        onUpdate: () => {
          window.scrollTo(0, obj.y);
        },
      });
    }
  };

  return (
    <section id="kitchen" className="hero-scroll-driver" ref={sectionRef}>
      <div className="hero-sticky">
        {/* Scroll Canvas */}
        <div className="hero-canvas-wrap">
          <canvas id="hero-canvas" ref={canvasRef} />
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
            <a href="#dough" className="btn btn-primary" onClick={handleExploreClick}>
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
              <span className="hero-title-line hero-title-pizza">PIZZA</span>
              <span className="hero-title-line hero-title-script">SCRIPT</span>
            </h1>
            <p className="hero-mobile-tagline">
              Hand-crafted websites,
              <br />
              made from scratch.
            </p>
            <div className="hero-mobile-ctas">
              <a href="#dough" className="btn btn-primary hero-mobile-btn" onClick={handleExploreClick}>
                Explore the Kitchen
              </a>
              <a href="#order" className="btn btn-secondary hero-mobile-btn">
                Place an Order
              </a>
            </div>
          </div>
        </div>

        <div className="hero-scroll-hint" aria-hidden="true">
          <span>Scroll to explore</span>
          <span className="scroll-arrow">↓</span>
        </div>
      </div>
    </section>
  );
}

import { useEffect, useRef, useState } from 'react';
import lottie from 'lottie-web';

export default function Preloader() {
  const [visible, setVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.classList.add('loading');

    const container = containerRef.current;
    if (!container) return;

    const anim = lottie.loadAnimation({
      container,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: '/assets/animations/pizza-glitch-animation.json',
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid meet',
      },
    });

    // Start progress bar filling from 0% to 100% over exactly 5000ms
    if (fillRef.current) {
      fillRef.current.style.width = '0%';
    }

    const animFrame = requestAnimationFrame(() => {
      if (fillRef.current) {
        fillRef.current.style.transition = 'width 5000ms linear';
        fillRef.current.style.width = '100%';
      }
    });

    // Force preloader display for exactly 5 seconds
    const timeoutId = setTimeout(() => {
      setFadeOut(true);
      document.body.classList.remove('loading');

      // Refresh ScrollTrigger calculations after preloader stabilizes layout
      import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
        ScrollTrigger.refresh();
      });

      setTimeout(() => {
        setVisible(false);
      }, 600);
    }, 5000);

    return () => {
      cancelAnimationFrame(animFrame);
      clearTimeout(timeoutId);
      anim.destroy();
      document.body.classList.remove('loading');
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      id="preloader"
      role="status"
      aria-label="Loading"
      className={fadeOut ? 'fade-out' : ''}
    >
      <div 
        id="preloader-lottie"
        ref={containerRef} 
        style={{
          width: '280px',
          height: '280px',
          maxWidth: '80vw',
          maxHeight: '80vh',
        }}
      />
      <div className="preloader-text">PIZZA SCRIPT</div>
      <div className="preloader-bar">
        <div className="preloader-bar-fill" id="preloader-fill" ref={fillRef} />
      </div>
    </div>
  );
}

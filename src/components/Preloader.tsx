import { useEffect, useRef, useState } from 'react';
<<<<<<< HEAD
import lottie from 'lottie-web';
=======
import { useLottie } from '../hooks/useLottie';
>>>>>>> 50d74942736eff6c8c9a49b5f069202d1d28c8f1

export default function Preloader() {
  const [visible, setVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
<<<<<<< HEAD
  const containerRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.classList.add('loading');

    const container = containerRef.current;
    if (!container) return;

    const anim = lottie.loadAnimation({
      container,
      renderer: 'svg',
      loop: false,
      autoplay: true,
      path: '/assets/animations/pizza-glitch-animation.json',
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid meet',
      },
    });

    const handleEnterFrame = () => {
      const current = anim.currentFrame;
      const total = anim.totalFrames;
      if (total > 0 && fillRef.current) {
        fillRef.current.style.width = `${(current / total) * 100}%`;
      }
    };

    const handleComplete = () => {
      if (fillRef.current) {
        fillRef.current.style.width = '100%';
      }
=======
  const lottieRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);

  useLottie(lottieRef, {
    path: '/assets/animations/pizza-glitch-animation.json',
    loop: true,
    autoplay: true,
  });

  useEffect(() => {
    document.body.classList.add('loading');

    const fill = fillRef.current;
    if (fill) {
      setTimeout(() => { fill.style.width = '40%'; }, 800);
      setTimeout(() => { fill.style.width = '75%'; }, 2500);
      setTimeout(() => { fill.style.width = '95%'; }, 4500);
    }

    // Hide preloader after 5 seconds
    const timer = setTimeout(() => {
      if (fill) fill.style.width = '100%';

>>>>>>> 50d74942736eff6c8c9a49b5f069202d1d28c8f1
      setTimeout(() => {
        setFadeOut(true);
        document.body.classList.remove('loading');

<<<<<<< HEAD
=======
        // Refresh ScrollTrigger after preloader stabilizes layout
>>>>>>> 50d74942736eff6c8c9a49b5f069202d1d28c8f1
        import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
          ScrollTrigger.refresh();
        });

        setTimeout(() => {
          setVisible(false);
<<<<<<< HEAD
        }, 600);
      }, 100);
    };

    anim.addEventListener('enterFrame', handleEnterFrame);
    anim.addEventListener('complete', handleComplete);

    return () => {
      anim.removeEventListener('enterFrame', handleEnterFrame);
      anim.removeEventListener('complete', handleComplete);
      anim.destroy();
=======
        }, 500);
      }, 300);
    }, 5000);

    return () => {
      clearTimeout(timer);
>>>>>>> 50d74942736eff6c8c9a49b5f069202d1d28c8f1
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
<<<<<<< HEAD
      <div 
        ref={containerRef} 
        style={{
          width: '280px',
          height: '280px',
          maxWidth: '80vw',
          maxHeight: '80vh',
          marginBottom: '16px',
        }}
      />
      <div style={{
        fontFamily: 'var(--font-display)',
        fontSize: 'clamp(2rem, 5vw, 3.5rem)',
        fontWeight: 700,
        color: 'var(--color-cream)',
        letterSpacing: '-0.02em',
        lineHeight: 1.1,
        textAlign: 'center',
      }}>
        Pizza<span style={{ fontStyle: 'italic', color: 'var(--color-oven-orange)' }}>Script</span>
      </div>
      <div className="preloader-bar" style={{ marginTop: '24px' }}>
=======
      <div
        ref={lottieRef}
        id="preloader-lottie"
        style={{ width: 280, height: 280 }}
      />
      <div className="preloader-text">PIZZA SCRIPT</div>
      <div className="preloader-bar">
>>>>>>> 50d74942736eff6c8c9a49b5f069202d1d28c8f1
        <div className="preloader-bar-fill" id="preloader-fill" ref={fillRef} />
      </div>
    </div>
  );
}

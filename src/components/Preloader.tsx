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
      setTimeout(() => {
        setFadeOut(true);
        document.body.classList.remove('loading');


        import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
          ScrollTrigger.refresh();
        });

        setTimeout(() => {
          setVisible(false);
        }, 600);
      }, 100);
    };

    anim.addEventListener('enterFrame', handleEnterFrame);
    anim.addEventListener('complete', handleComplete);

    return () => {
      anim.removeEventListener('enterFrame', handleEnterFrame);
      anim.removeEventListener('complete', handleComplete);
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
        <div className="preloader-bar-fill" id="preloader-fill" ref={fillRef} />
      </div>
    </div>
  );
}

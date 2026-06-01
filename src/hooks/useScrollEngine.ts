import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Initializes Lenis smooth scroll and connects it to GSAP & ScrollTrigger.
 * Skipped on mobile (<=768px) and when reduced motion is preferred.
 */
export function useScrollEngine() {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
<<<<<<< HEAD
    // Mobile: update ScrollTrigger on native scroll
    if (window.innerWidth <= 768) {
      window.addEventListener('scroll', () => {
        ScrollTrigger.update();
      }, { passive: true });
      return;
    }

    // Desktop: Initialize Lenis smooth scroll
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
=======
    // Do not initialize on reduced motion or mobile devices
    if (
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      window.innerWidth <= 768
    ) {
>>>>>>> 50d74942736eff6c8c9a49b5f069202d1d28c8f1
      return;
    }

    const lenisInstance = new Lenis({
<<<<<<< HEAD
      duration: 2.4, /* Slowed smooth scrolling 2x for highly premium cinematic feel */
=======
      duration: 1.2,
>>>>>>> 50d74942736eff6c8c9a49b5f069202d1d28c8f1
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      syncTouch: false,
    });

    lenisRef.current = lenisInstance;

    // Expose globally so other modules can use lenis.scrollTo()
    (window as unknown as Record<string, unknown>).lenis = lenisInstance;

    // Add lenis classes to the html element
    document.documentElement.classList.add('lenis', 'lenis-smooth');

    // Sync ScrollTrigger updates with Lenis scrolling
    lenisInstance.on('scroll', () => {
      ScrollTrigger.update();
    });

    // Bind Lenis animation frame loop to GSAP's ticker
    const tickerCallback = (time: number) => {
      lenisInstance.raf(time * 1000);
    };
    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tickerCallback);
      lenisInstance.destroy();
      lenisRef.current = null;
      (window as unknown as Record<string, unknown>).lenis = undefined;
      document.documentElement.classList.remove('lenis', 'lenis-smooth');
    };
  }, []);

  return lenisRef;
}

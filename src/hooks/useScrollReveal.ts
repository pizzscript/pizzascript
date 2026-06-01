import { useEffect, useRef } from 'react';
import { isReducedMotion } from '../utils/helpers';

/**
 * IntersectionObserver-based scroll reveal animation hook.
 * Adds 'animate-in' class when elements with [data-animate] enter the viewport.
 * Also sets random animation delays on neon flicker elements.
 *
 * Attach the returned ref to the container element you want to observe within.
 */
export function useScrollReveal() {
  const containerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (isReducedMotion()) return;

    // Use document if no container ref is set
    const root = containerRef.current || document;

    const animatedElements = root.querySelectorAll('[data-animate]');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    animatedElements.forEach((el) => observer.observe(el));

    // Neon flicker random delay
    const neonElements = root.querySelectorAll(
      '.neon-flicker, .neon-flicker--slow, .neon-flicker--fast'
    );
    neonElements.forEach((el) => {
      (el as HTMLElement).style.animationDelay =
        (Math.random() * 2).toFixed(2) + 's';
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return containerRef;
}

import { useEffect, useRef } from 'react';
import type { AnimationItem } from 'lottie-web';

interface UseLottieOptions {
  path?: string;
  animationData?: unknown;
  loop?: boolean;
  autoplay?: boolean;
  renderer?: 'svg' | 'canvas' | 'html';
  rendererSettings?: Record<string, unknown>;
}

/**
 * Hook to load and control a Lottie animation.
 * Returns the animation instance ref for external control (e.g., hover play/stop).
 */
export function useLottie(
  containerRef: React.RefObject<HTMLElement | null>,
  options: UseLottieOptions
) {
  const animationRef = useRef<AnimationItem | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    if (!options.path && !options.animationData) return;

    // Initialize container hidden with transition to prevent mount flickering
    container.style.opacity = '0';
    container.style.transition = 'opacity 0.22s ease-out';

    let anim: AnimationItem | null = null;
    let active = true;

    import('lottie-web')
      .then((lottieModule) => {
        if (!active || !containerRef.current) return;
        const lottie = lottieModule.default;
        anim = lottie.loadAnimation({
          container: containerRef.current,
          renderer: options.renderer || 'svg',
          loop: options.loop ?? true,
          autoplay: options.autoplay ?? true,
          ...(options.path ? { path: options.path } : {}),
          ...(options.animationData
            ? { animationData: options.animationData }
            : {}),
          rendererSettings: options.rendererSettings || {
            preserveAspectRatio: 'xMidYMid slice',
          },
        });

        anim.setSpeed(0.25);
        animationRef.current = anim;

        anim.addEventListener('DOMLoaded', () => {
          if (active && containerRef.current) {
            containerRef.current.style.opacity = '1';
          }
        });
      })
      .catch((err) => {
        console.error('Failed to load Lottie inside useLottie hook:', err);
      });

    return () => {
      active = false;
      if (anim) {
        anim.destroy();
      }
      animationRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [containerRef]);

  return animationRef;
}

import { useEffect, useRef } from 'react';
import lottie, { type AnimationItem } from 'lottie-web';

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

    const anim = lottie.loadAnimation({
      container,
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

    animationRef.current = anim;

    return () => {
      anim.destroy();
      animationRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [containerRef]);

  return animationRef;
}

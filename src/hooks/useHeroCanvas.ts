import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const FRAME_COUNT = 96;
const currentFrame = (index: number) =>
  `/assets/images/hero/frame (${index}).webp`;

/**
 * Scroll-driven 96-frame image sequence animation on a canvas element.
 * Uses GSAP ScrollTrigger to pin the canvas and scrub through frames.
 */
export function useHeroCanvas(
  canvasRef: React.RefObject<HTMLCanvasElement | null>,
  sectionRef: React.RefObject<HTMLElement | null>
) {
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentIndexRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const heroSection = sectionRef.current;
    if (!canvas || !heroSection) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    const images: HTMLImageElement[] = [];
    let loadedCount = 0;

    function setCanvasSize() {
      if (!canvas || !context) return;
      const dpr = window.devicePixelRatio || 1;
      // Use parent container dimensions for consistent sizing
      const parent = canvas.parentElement;
      const width = parent ? parent.clientWidth : window.innerWidth;
      const height = parent ? parent.clientHeight : window.innerHeight;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      context.imageSmoothingEnabled = true;
      context.imageSmoothingQuality = 'high';
      render();
    }

    function render() {
      if (!canvas || !context) return;
      const img = images[currentIndexRef.current];
      if (!img || !img.complete || img.naturalWidth === 0) return;

      context.clearRect(0, 0, canvas.width, canvas.height);
      const scale = Math.max(
        canvas.width / img.width,
        canvas.height / img.height
      );
      const x = canvas.width / 2 - (img.width / 2) * scale;
      const y = canvas.height / 2 - (img.height / 2) * scale;
      context.drawImage(img, x, y, img.width * scale, img.height * scale);
    }

    // Preload images
    for (let i = 1; i <= FRAME_COUNT; i++) {
      const img = new Image();
      img.src = currentFrame(i);
      img.addEventListener('load', () => {
        loadedCount++;
        if (loadedCount === 1) setCanvasSize();
      });
      images.push(img);
    }
    imagesRef.current = images;

    window.addEventListener('resize', setCanvasSize);

    // GSAP ScrollTrigger for scroll-driven animation
    ScrollTrigger.create({
      trigger: heroSection,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.4,
      pin: '.hero-sticky',
      pinSpacing: false,
      onUpdate: (self) => {
        const frameIndex = Math.min(
          FRAME_COUNT - 1,
          Math.floor(self.progress * FRAME_COUNT)
        );
        if (frameIndex !== currentIndexRef.current) {
          currentIndexRef.current = frameIndex;
          requestAnimationFrame(render);
        }

      },
    });

    return () => {
      window.removeEventListener('resize', setCanvasSize);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [canvasRef, sectionRef]);
}

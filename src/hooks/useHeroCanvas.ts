import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const FRAME_COUNT = 96;
const currentFrame = (index: number) =>
<<<<<<< HEAD
`/assets/images/hero/${String(index).padStart(2, '0')}.png`;
=======
  `/assets/images/hero/frame (${index}).jpg`;
>>>>>>> 50d74942736eff6c8c9a49b5f069202d1d28c8f1

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
<<<<<<< HEAD

      // Use parent container dimensions for consistent sizing
      const parent = canvas.parentElement;
      const width = parent ? parent.clientWidth : window.innerWidth;
      const height = parent ? parent.clientHeight : window.innerHeight;

      canvas.width = width * dpr;
      canvas.height = height * dpr;

=======
      
      // Calculate exact height dynamically to prevent aspect ratio distortion from CSS height delays
      if (window.innerWidth <= 768) {
        canvas.width = window.innerWidth * dpr;
        canvas.height = (window.innerHeight * 0.52) * dpr;
      } else {
        canvas.width = window.innerWidth * dpr;
        canvas.height = window.innerHeight * dpr;
        
        // Reset mobile-specific styles when transitioning to desktop!
        const canvasWrap = document.querySelector('.hero-canvas-wrap') as HTMLElement | null;
        if (canvasWrap) {
          canvasWrap.style.marginTop = '';
        }
      }
      
>>>>>>> 50d74942736eff6c8c9a49b5f069202d1d28c8f1
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
<<<<<<< HEAD
    ScrollTrigger.create({
      trigger: heroSection,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.4,
=======
    const trigger = ScrollTrigger.create({
      trigger: heroSection,
      start: 'top top',
      end: 'bottom bottom',
      scrub: true,
>>>>>>> 50d74942736eff6c8c9a49b5f069202d1d28c8f1
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
<<<<<<< HEAD
=======

        // Parallax slide-up marginTop on mobile!
        if (window.innerWidth <= 768) {
          const canvasWrap = document.querySelector('.hero-canvas-wrap') as HTMLElement | null;
          if (canvasWrap) {
            // Slide up 1:1 with the page scroll so it perfectly matches the scrolling absolute navbar
            const navHeight = 60;
            const scrollY = window.scrollY;
            const marginTop = Math.max(0, navHeight - scrollY);
            canvasWrap.style.marginTop = `${marginTop}px`;
          }
        }
>>>>>>> 50d74942736eff6c8c9a49b5f069202d1d28c8f1
      },
    });

    return () => {
      window.removeEventListener('resize', setCanvasSize);
<<<<<<< HEAD
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
=======
      trigger.kill();
>>>>>>> 50d74942736eff6c8c9a49b5f069202d1d28c8f1
    };
  }, [canvasRef, sectionRef]);
}

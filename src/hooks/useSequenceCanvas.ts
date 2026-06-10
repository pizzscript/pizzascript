import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { globalImageLoader } from '../utils/helpers';

gsap.registerPlugin(ScrollTrigger);

interface SequenceCanvasOptions {
  frameCount: number;
  getFramePath: (index: number) => string;
  onProgress?: (progress: number) => void;
  pinSpacing?: boolean;
  objectFit?: 'cover' | 'contain'; // 'cover' (default) fills & crops, 'contain' fits within bounds
  zoom?: number; // Optional scale multiplier, e.g. 1.05 for 5% zoom
  registerWithLoader?: boolean; // If true, registers and blocks the preloader screen
}


/**
 * Reusable scroll-driven image sequence hook.
 * Renders frames on a canvas, scrubbing through them via GSAP ScrollTrigger.
 */
export function useSequenceCanvas(
  canvasRef: React.RefObject<HTMLCanvasElement | null>,
  sectionRef: React.RefObject<HTMLElement | null>,
  options: SequenceCanvasOptions
) {
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentIndexRef = useRef(0);

  // Main canvas rendering and ScrollTrigger logic
  useEffect(() => {
    const canvas = canvasRef.current;
    const section = sectionRef.current;
    if (!canvas || !section) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    const { frameCount, getFramePath } = options;
    const images: HTMLImageElement[] = [];

    function setCanvasSize() {
      if (!canvas || !context) return;
      const dpr = window.devicePixelRatio || 1;

      // Scale based on parent container dimensions
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
      const fitMode = options.objectFit || 'cover';
      let scale = fitMode === 'contain'
        ? Math.min(canvas.width / img.width, canvas.height / img.height)
        : Math.max(canvas.width / img.width, canvas.height / img.height);

      if (options.zoom) {
        scale *= options.zoom;
      }

      const x = canvas.width / 2 - (img.width / 2) * scale;
      const y = canvas.height / 2 - (img.height / 2) * scale;
      context.drawImage(img, x, y, img.width * scale, img.height * scale);
    }

    // Create all image elements in the array
    for (let i = 0; i < frameCount; i++) {
      images.push(new Image());
    }

    const shouldRegister = !!options.registerWithLoader;
    const loader = (window as any).__sequenceLoader;
    if (shouldRegister && loader) {
      loader.registerImages(frameCount);
    }

    // Preload the first frame (index 0) at absolute highest priority
    const firstImg = images[0];
    firstImg.onload = () => {
      firstImg.onload = null;
      firstImg.onerror = null;
      if (shouldRegister && loader) loader.imageLoaded();
      setCanvasSize();

      // Once the first frame is loaded and visible, load the remaining frames quietly in the background using the global rate-limited loader
      for (let i = 1; i < frameCount; i++) {
        const index = i;
        globalImageLoader.add(() => {
          return new Promise<void>((resolve) => {
            const img = images[index];
            img.onload = () => {
              img.onload = null;
              img.onerror = null;
              if (shouldRegister && loader) loader.imageLoaded();
              resolve();
            };
            img.onerror = () => {
              img.onload = null;
              img.onerror = null;
              if (shouldRegister && loader) loader.imageLoaded();
              resolve();
            };
            img.src = getFramePath(index);
          });
        });
      }
    };
    firstImg.onerror = () => {
      firstImg.onload = null;
      firstImg.onerror = null;
      if (shouldRegister && loader) loader.imageLoaded();
    };
    firstImg.src = getFramePath(0);

    imagesRef.current = images;

    window.addEventListener('resize', setCanvasSize);

    // GSAP ScrollTrigger
    // Create ScrollTrigger instance for this sequence
    const triggerInstance = ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 1.5,
      pin: false, // Let CSS position: sticky handle pinning natively for 100% smooth composited scroll without jumping
      onUpdate: (self) => {
        const frameIndex = Math.min(
          frameCount - 1,
          Math.floor(self.progress * frameCount)
        );
        if (frameIndex !== currentIndexRef.current) {
          currentIndexRef.current = frameIndex;
          requestAnimationFrame(render);
        }
        if (options.onProgress) {
          options.onProgress(self.progress);
        }
      },
    });

    // Refresh ScrollTrigger to recalculate bounds after mounting
    ScrollTrigger.refresh();

    return () => {
      window.removeEventListener('resize', setCanvasSize);
      triggerInstance.kill();
      // Recalculate downstream triggers immediately after unmounting
      ScrollTrigger.refresh();
    };
  }, [canvasRef, sectionRef, options]);
}

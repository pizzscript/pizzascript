import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface SequenceCanvasOptions {
  frameCount: number;
  getFramePath: (index: number) => string;
  onProgress?: (progress: number) => void;
  pinSpacing?: boolean;
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
  const [shouldLoad, setShouldLoad] = useState(false);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentIndexRef = useRef(0);

  // 1. Lazy Loading Observer: wait for preloader to end and section to approach viewport
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let isIntersected = false;
    let isPreloaderDone = !document.body.classList.contains('loading');

    const checkAndTrigger = () => {
      if (isIntersected && isPreloaderDone) {
        setShouldLoad(true);
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          isIntersected = true;
          checkAndTrigger();
          observer.disconnect();
        }
      },
      {
        rootMargin: '150% 0px 150% 0px', // Load when within 1.5 screen heights
      }
    );
    observer.observe(section);

    let checkInterval: NodeJS.Timeout | undefined;
    let fallbackTimeout: NodeJS.Timeout | undefined;

    if (!isPreloaderDone) {
      checkInterval = setInterval(() => {
        if (!document.body.classList.contains('loading')) {
          isPreloaderDone = true;
          checkAndTrigger();
          if (checkInterval) clearInterval(checkInterval);
        }
      }, 100);

      fallbackTimeout = setTimeout(() => {
        isPreloaderDone = true;
        checkAndTrigger();
        if (checkInterval) clearInterval(checkInterval);
      }, 4500); // 4.5s fallback (preloader is 4s)
    }

    return () => {
      observer.disconnect();
      if (checkInterval) clearInterval(checkInterval);
      if (fallbackTimeout) clearTimeout(fallbackTimeout);
    };
  }, [sectionRef]);

  // 2. Main canvas rendering and ScrollTrigger logic
  useEffect(() => {
    if (!shouldLoad) return;

    const canvas = canvasRef.current;
    const section = sectionRef.current;
    if (!canvas || !section) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    const { frameCount, getFramePath } = options;
    const images: HTMLImageElement[] = [];
    let loadedCount = 0;

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
      const scale = Math.max(
        canvas.width / img.width,
        canvas.height / img.height
      );
      const x = canvas.width / 2 - (img.width / 2) * scale;
      const y = canvas.height / 2 - (img.height / 2) * scale;
      context.drawImage(img, x, y, img.width * scale, img.height * scale);
    }

    // Create all image elements in the array
    for (let i = 0; i < frameCount; i++) {
      images.push(new Image());
    }

    // Preload the first frame (index 0) at absolute highest priority
    const firstImg = images[0];
    firstImg.src = getFramePath(0);
    firstImg.addEventListener('load', () => {
      loadedCount++;
      setCanvasSize();
      
      // Once the first frame is loaded and visible, load the remaining frames quietly in the background
      for (let i = 1; i < frameCount; i++) {
        images[i].src = getFramePath(i);
        images[i].addEventListener('load', () => {
          loadedCount++;
        });
      }
    });

    imagesRef.current = images;

    window.addEventListener('resize', setCanvasSize);

    // GSAP ScrollTrigger
    const stickyEl = section.querySelector('.sequence-sticky') || section.querySelector('.hero-sticky');
    
    // Create ScrollTrigger instance for this lazy-loaded sequence
    const triggerInstance = ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 1.5,
      pin: stickyEl || undefined,
      pinSpacing: options.pinSpacing ?? true,
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

    return () => {
      window.removeEventListener('resize', setCanvasSize);
      triggerInstance.kill();
    };
  }, [canvasRef, sectionRef, options, shouldLoad]);
}

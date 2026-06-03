import { useEffect } from 'react';

export default function Preloader() {
  useEffect(() => {
    // Lookup the static preloader elements created in index.html
    const preloaderEl = document.getElementById('preloader');
    const fillEl = document.getElementById('preloader-fill');

    if (!preloaderEl) return;

    let minimumTimeElapsed = false;
    let pageLoaded = document.readyState === 'complete';
    let finished = false;

    const checkAndComplete = () => {
      const loader = (window as any).__sequenceLoader;
      const isSequenceComplete = loader ? (loader.loaded >= loader.total) : true;

      // Update progress bar fill dynamically based on sequence loader progress
      if (loader && loader.total > 0 && fillEl) {
        const percent = Math.min(90, Math.floor((loader.loaded / loader.total) * 90));
        fillEl.style.transition = 'width 150ms ease-out';
        fillEl.style.width = `${percent}%`;
      }

      if (minimumTimeElapsed && pageLoaded && isSequenceComplete && !finished) {
        finished = true;

        // Transition progress bar to 100%
        if (fillEl) {
          fillEl.style.transition = 'width 500ms ease-out';
          fillEl.style.width = '100%';
        }

        // Fade out preloader screen after the progress bar animation completes
        setTimeout(() => {
          preloaderEl.classList.add('fade-out');
          document.body.classList.remove('loading');

          // Refresh ScrollTrigger calculations after preloader stabilizes layout
          import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
            ScrollTrigger.refresh();
          });

          // Completely unmount/remove the preloader DOM nodes after the fade-out completes
          setTimeout(() => {
            if (preloaderEl.parentNode) {
              preloaderEl.parentNode.removeChild(preloaderEl);
            }
            // Clean up global Lottie animation instance if defined
            const globalAnim = (window as any).__preloaderAnim;
            if (globalAnim && typeof globalAnim.destroy === 'function') {
              globalAnim.destroy();
              (window as any).__preloaderAnim = undefined;
            }
          }, 600);
        }, 500);
      }
    };

    // Listen to image loading updates
    (window as any).__onSequenceImageLoaded = () => {
      checkAndComplete();
    };

    // Minimum display time timer (4.5s to reach 90%, plus 500ms to reach 100% = 5.0s total minimum)
    const minTimer = setTimeout(() => {
      minimumTimeElapsed = true;
      checkAndComplete();
    }, 4500);

    // Safety fallback timer to prevent infinite loading screen if some asset hangs (15s max)
    const safetyTimer = setTimeout(() => {
      console.warn('Safety preloader timeout reached. Forcing load completion.');
      pageLoaded = true;
      const loader = (window as any).__sequenceLoader;
      if (loader) {
        loader.loaded = loader.total;
      }
      checkAndComplete();
    }, 15000);

    const handleLoad = () => {
      pageLoaded = true;
      checkAndComplete();
    };

    if (document.readyState === 'complete') {
      pageLoaded = true;
      checkAndComplete();
    } else {
      window.addEventListener('load', handleLoad);
    }

    return () => {
      clearTimeout(minTimer);
      clearTimeout(safetyTimer);
      window.removeEventListener('load', handleLoad);
      delete (window as any).__onSequenceImageLoaded;
    };
  }, []);

  return null; // The preloader DOM lives in index.html to render and play Lottie instantly on first paint
}

import { useEffect, useState, useCallback, useRef } from 'react';


/* ---- Section icon SVGs ---- */
const SectionIcons = {
  /* Menu / Stack — clipboard/checklist */
  menu: (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <rect x="3" y="1.5" width="8" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.2"/>
      <path d="M5.5 1V2.5H8.5V1" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
      <path d="M5.5 5H8.5M5.5 7.5H8.5M5.5 10H7" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round"/>
    </svg>
  ),
  /* Dough / Foundation — code brackets <> */
  dough: (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M4.5 2L1 7L4.5 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M9.5 2L13 7L9.5 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  /* Toppings / Features — puzzle piece */
  toppings: (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M9 1.5C9 2.33 8.33 3 7.5 3H6.5C5.67 3 5 2.33 5 1.5M3 5H2.5C1.67 5 1 5.67 1 6.5C1 7.33 1.67 8 2.5 8H3M11 5H11.5C12.33 5 13 5.67 13 6.5C13 7.33 12.33 8 11.5 8H11M5 13C5 12.17 5.67 11.5 6.5 11.5H7.5C8.33 11.5 9 12.17 9 13M3 3H11V11H3V3Z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  /* Baking / Process — flame */
  baking: (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M7 1C7 1 3 5 3 8.5C3 10.71 4.79 12.5 7 12.5C9.21 12.5 11 10.71 11 8.5C11 5 7 1 7 1Z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M7 9.5C7 9.5 5.5 8 5.5 6.75" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
    </svg>
  ),
  /* Removing / Launch — rocket */
  removing: (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M8.5 5.5L12 2M12 2H9.5M12 2V4.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M5 7L2.5 9.5L4.5 9.5L4.5 11.5L7 9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M6 8C4.5 6.5 4.5 4 6 2.5C7.5 4 10 4 11.5 2.5C11.5 4 10 6.5 8 8L6 8Z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  /* Aroma / SEO — magnifying glass with eye */
  aroma: (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <circle cx="6" cy="6" r="4" stroke="currentColor" strokeWidth="1.2"/>
      <path d="M9 9L12.5 12.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
      <circle cx="6" cy="6" r="1.5" stroke="currentColor" strokeWidth="0.8"/>
    </svg>
  ),
  /* Portfolio / Work — grid/gallery */
  'chef-specials': (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <rect x="1.5" y="1.5" width="4.5" height="4.5" rx="1" stroke="currentColor" strokeWidth="1.1"/>
      <rect x="8" y="1.5" width="4.5" height="4.5" rx="1" stroke="currentColor" strokeWidth="1.1"/>
      <rect x="1.5" y="8" width="4.5" height="4.5" rx="1" stroke="currentColor" strokeWidth="1.1"/>
      <rect x="8" y="8" width="4.5" height="4.5" rx="1" stroke="currentColor" strokeWidth="1.1"/>
    </svg>
  ),
  /* Reviews — chat bubble with star */
  reviews: (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M2 2H12V9H6L3 12V9H2V2Z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M7 4L7.6 5.5H9L7.9 6.5L8.3 8L7 7.2L5.7 8L6.1 6.5L5 5.5H6.4L7 4Z" fill="currentColor"/>
    </svg>
  ),
  /* Order / Contact — envelope */
  order: (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <rect x="1.5" y="3" width="11" height="8" rx="1" stroke="currentColor" strokeWidth="1.2"/>
      <path d="M1.5 4L7 8L12.5 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
};

const SECTIONS = [
  { id: 'menu', label: 'Stack' },
  { id: 'dough', label: 'Foundation' },
  { id: 'toppings', label: 'Features' },
  { id: 'baking', label: 'Process' },
  { id: 'removing', label: 'Launch' },
  { id: 'aroma', label: 'SEO' },
  { id: 'chef-specials', label: 'Work' },
  { id: 'reviews', label: 'Reviews' },
  { id: 'order', label: 'Order' },
];


interface SectionNavProps {
  visible: boolean;
}

export default function SectionNav({ visible }: SectionNavProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeRef = useRef(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const [footerHeight, setFooterHeight] = useState(0);

  // Monitor scroll percentage
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const docHeightLimit = documentHeight - viewportHeight;

      if (docHeightLimit > 0) {
        setScrollProgress((scrollY / docHeightLimit) * 100);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Monitor footer height and window size
  useEffect(() => {
    const handleResize = () => {
      const footerEl = document.querySelector('footer');
      setFooterHeight(footerEl ? footerEl.offsetHeight : 0);
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize, { passive: true });
    
    // Delayed check for DOM layout settling
    const timer = setTimeout(handleResize, 1000);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timer);
    };
  }, []);

  // Cache section top offsets to avoid layout reflows on scroll events
  const sectionOffsetsRef = useRef<{ id: string; top: number }[]>([]);

  const updateSectionOffsets = useCallback(() => {
    const scrollY = window.scrollY;
    sectionOffsetsRef.current = SECTIONS.map((sec) => {
      const el = document.getElementById(sec.id);
      if (el) {
        return {
          id: sec.id,
          top: el.getBoundingClientRect().top + scrollY,
        };
      }
      return { id: sec.id, top: 0 };
    });
  }, []);

  // Update cached offsets on mount, resize, and scroll initialization
  useEffect(() => {
    updateSectionOffsets();
    window.addEventListener('resize', updateSectionOffsets);
    
    // Delayed update to ensure correct offsets after components have finished rendering
    const timer = setTimeout(updateSectionOffsets, 1000);

    return () => {
      window.removeEventListener('resize', updateSectionOffsets);
      clearTimeout(timer);
    };
  }, [updateSectionOffsets]);

  // Robust scroll-based active section tracking
  useEffect(() => {
    const handleScrollActive = () => {
      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const isMobile = window.innerWidth < 768;

      // Dynamic focus point threshold: centered midline (50%) on mobile, focus point (30%) on desktop
      const thresholdRatio = isMobile ? 0.5 : 0.3;
      const triggerPoint = scrollY + viewportHeight * thresholdRatio;

      let currentActiveIndex = 0;

      // Find the last section whose top is above the trigger point from cached offsets
      const offsets = sectionOffsetsRef.current;
      for (let i = 0; i < offsets.length; i++) {
        if (triggerPoint >= offsets[i].top) {
          currentActiveIndex = i;
        }
      }

      // Special case: if we are at the very bottom of the page (within 5px of max scroll bounds), force the last section active
      const maxScroll = documentHeight - viewportHeight;
      if (scrollY >= maxScroll - 5) {
        currentActiveIndex = SECTIONS.length - 1;
      }

      setActiveIndex(currentActiveIndex);
      activeRef.current = currentActiveIndex;
    };

    window.addEventListener('scroll', handleScrollActive, { passive: true });
    // Run once on mount to set initial active section
    handleScrollActive();

    return () => {
      window.removeEventListener('scroll', handleScrollActive);
    };
  }, []);

  // Register user interaction listeners to interrupt programmatic scrolling
  useEffect(() => {
    const handleUserInterrupt = (e: Event) => {
      if ((window as any).isScrollingProgrammatically) {
        // Prevent immediate self-interruption from the click/tap event itself
        const startTime = (window as any).scrollStartTime || 0;
        if (Date.now() - startTime < 200) {
          return;
        }

        // Cancel programmatic scrolling
        (window as any).isScrollingProgrammatically = false;
        
        const lenis = (window as any).lenis;
        if (lenis) {
          // Instantly target current scroll position to halt Lenis scrolling
          lenis.scrollTo(window.scrollY, { immediate: true });
        }
        
        // Prevent default on the very first event that triggered the interrupt
        e.preventDefault();
        e.stopPropagation();
      }
    };

    const options = { passive: false };
    window.addEventListener('wheel', handleUserInterrupt, options);
    window.addEventListener('touchmove', handleUserInterrupt, options);
    window.addEventListener('touchstart', handleUserInterrupt, options);
    window.addEventListener('mousedown', handleUserInterrupt, options);
    window.addEventListener('keydown', handleUserInterrupt, options);

    return () => {
      window.removeEventListener('wheel', handleUserInterrupt);
      window.removeEventListener('touchmove', handleUserInterrupt);
      window.removeEventListener('touchstart', handleUserInterrupt);
      window.removeEventListener('mousedown', handleUserInterrupt);
      window.removeEventListener('keydown', handleUserInterrupt);
    };
  }, []);

  const scrollToTarget = useCallback((targetEl: HTMLElement | number, targetIndex?: number | 'home', immediate = false) => {
    const lenis = (window as unknown as Record<string, unknown>).lenis as
      | { scrollTo: (target: Element | number, options?: any) => void }
      | undefined;

    let targetOffset: number;
    if (typeof targetEl === 'number') {
      targetOffset = targetEl;
    } else {
      // Only query client-rect of the specific target element to avoid layout thrashing
      targetOffset = targetEl.getBoundingClientRect().top + window.scrollY;
    }

    const currentY = window.scrollY;
    const scrollDistance = Math.abs(targetOffset - currentY);
    
    // Calculate sections crossed to determine duration (exactly 3 seconds per section)
    let sectionsCrossed: number;
    if (targetIndex !== undefined) {
      let currentIndex = activeRef.current;
      if (window.scrollY < 200) {
        currentIndex = -1; // hero section is active
      }
      const fromIndex = currentIndex;
      const toIndex = targetIndex === 'home' ? -1 : targetIndex;
      sectionsCrossed = Math.max(1, Math.abs(toIndex - fromIndex));
    } else {
      // Fallback: estimate based on scroll distance (each section is roughly 100vh on desktop or sequence driver height on mobile)
      const isMobile = window.innerWidth < 768;
      const sectionUnitHeight = isMobile ? window.innerHeight * 9 : window.innerHeight * 2;
      sectionsCrossed = Math.max(1, Math.round(scrollDistance / sectionUnitHeight));
    }

    const scrollDuration = immediate ? 0 : (sectionsCrossed * 3.0); // exactly 3 seconds per section

    // Set scrolling programmatically flag and record start time (wheel/touch listeners handle block)
    (window as any).isScrollingProgrammatically = true;
    (window as any).scrollStartTime = Date.now();

    let isUnlocked = false;
    let fallbackTimeout = 0;
    let animationFrameId: number | null = null;

    const unlock = () => {
      if (isUnlocked) return;
      isUnlocked = true;
      (window as any).isScrollingProgrammatically = false;
      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId);
      }
      clearTimeout(fallbackTimeout);
    };

    // Safety fallback timeout to prevent locking the screen in case scroll events hang or onComplete isn't called
    fallbackTimeout = window.setTimeout(unlock, scrollDuration * 1000 + 400);

    if (lenis) {
      lenis.scrollTo(typeof targetEl === 'number' ? targetEl : targetEl, {
        duration: scrollDuration,
        immediate: immediate, // support instant scrolling
        easing: (t: number) => t, // Linear easing: constant speed throughout the scroll
        lock: true, // Native Lenis lock to prevent interruption on desktop
        onComplete: () => {
          unlock();
        },
      });
    } else {
      // Mobile custom smooth scroll animation (exactly 3 seconds per section, uninterruptible, 60fps)
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const clampedTarget = Math.max(0, Math.min(targetOffset, maxScroll));
      const startY = window.scrollY;
      const distance = clampedTarget - startY;

      if (immediate || Math.abs(distance) < 2) {
        window.scrollTo(0, clampedTarget);
        unlock();
        return;
      }

      const duration = scrollDuration * 1000;
      let startTime: number | null = null;

      const animateScroll = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;
        const progress = Math.min(1, elapsed / duration);

        // Linear easing: constant speed throughout the scroll
        const easeProgress = progress;
        
        window.scrollTo(0, startY + distance * easeProgress);

        if (progress < 1 && (window as any).isScrollingProgrammatically) {
          animationFrameId = requestAnimationFrame(animateScroll);
        } else {
          unlock();
        }
      };

      animationFrameId = requestAnimationFrame(animateScroll);
    }
  }, []);

  const scrollToTargetWithTransition = useCallback((targetIndex: number | 'home') => {
    if (targetIndex === 'home') {
      scrollToTarget(0, 'home', true);
      return;
    }

    const targetSection = SECTIONS[targetIndex];
    const targetEl = document.getElementById(targetSection.id);
    if (!targetEl) return;

    scrollToTarget(targetEl, targetIndex);
  }, [scrollToTarget]);

  // Expose scroll function globally so it can be called from raw inline scripts
  useEffect(() => {
    (window as any).scrollToTargetWithTransition = (target: number | string) => {
      let targetIndex: number | 'home' = 'home';
      if (typeof target === 'number') {
        targetIndex = target;
      } else if (target === 'home' || target === 'top') {
        targetIndex = 'home';
      } else {
        const cleanId = target.startsWith('#') ? target.substring(1) : target;
        if (cleanId === 'kitchen') {
          targetIndex = 'home';
        } else {
          const foundIndex = SECTIONS.findIndex((s) => s.id === cleanId);
          if (foundIndex !== -1) {
            targetIndex = foundIndex;
          } else {
            const targetEl = document.getElementById(cleanId);
            if (targetEl) {
              scrollToTarget(targetEl);
              return;
            }
          }
        }
      }
      scrollToTargetWithTransition(targetIndex);
    };

    return () => {
      delete (window as any).scrollToTargetWithTransition;
    };
  }, [scrollToTarget, scrollToTargetWithTransition]);

  return (
    <div
      className="section-nav-tracker"
      style={{
        '--footer-height': `${footerHeight}px`,
      } as React.CSSProperties}
    >
      <nav
        ref={navRef}
        className={`section-nav${visible ? ' section-nav--visible' : ''}`}
        aria-label="Section navigation"
        style={{
          '--active-index': activeIndex,
        } as React.CSSProperties}
      >
        {/* Up Arrow */}
        <button
          className="section-nav__btn section-nav__arrow"
          aria-label="Previous section"
          onClick={() => scrollToTargetWithTransition(activeIndex - 1)}
          disabled={activeIndex === 0}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M7 2L2 9H12L7 2Z" fill="currentColor" />
          </svg>
        </button>

        {/* Progress Bar Timeline */}
        <div className="section-nav__progress-track">
          <div 
            className="section-nav__progress-fill" 
            style={{ 
              height: isMobile ? '100%' : `${scrollProgress}%`, 
              width: isMobile ? `${scrollProgress}%` : '100%' 
            }} 
          />
        </div>

        {/* Viewport for sliding dots */}
        <div className="section-nav__dots-viewport">
          <div className="section-nav__dots">
            {SECTIONS.map((section, index: number) => {
              const distance = Math.abs(index - activeIndex);
              return (
                <button
                  key={section.id}
                  className={`section-nav__dot${activeIndex === index ? ' section-nav__dot--active' : ''}`}
                  aria-label={`Go to ${section.label}`}
                  data-tooltip={section.label}
                  style={{ '--distance': distance } as React.CSSProperties}
                  onClick={() => scrollToTargetWithTransition(index)}
                >
                  <span className="section-nav__dot-icon">
                    {SectionIcons[section.id as keyof typeof SectionIcons]}
                  </span>
                  <span className="section-nav__dot-dot" />
                </button>
              );
            })}
          </div>
        </div>

        {/* Down Arrow */}
        <button
          className="section-nav__btn section-nav__arrow"
          aria-label="Next section"
          onClick={() => scrollToTargetWithTransition(activeIndex + 1)}
          disabled={activeIndex >= SECTIONS.length - 1}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M7 12L12 5H2L7 12Z" fill="currentColor" />
          </svg>
        </button>

        {/* Divider */}
        <div className="section-nav__divider" />

        {/* Scroll to Top */}
        <button
          className="section-nav__btn section-nav__home"
          aria-label="Scroll to top"
          onClick={() => scrollToTargetWithTransition('home')}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M8 1L1 8H4V14H7V10H9V14H12V8H15L8 1Z" fill="currentColor" />
          </svg>
        </button>
      </nav>
    </div>
  );
}

import { useEffect, useState, useCallback, useRef } from 'react';

/* ---- Section icon SVGs ---- */
const SectionIcons = {
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
  { id: 'dough', label: 'Foundation' },
  { id: 'toppings', label: 'Features' },
  { id: 'baking', label: 'Process' },
  { id: 'removing', label: 'Launch' },
  { id: 'aroma', label: 'SEO' },
  { id: 'chef-specials', label: 'Work' },
  { id: 'reviews', label: 'Reviews' },
  { id: 'order', label: 'Order' },
];



const preventDefault = (e: Event) => {
  if ((window as any).isScrollingProgrammatically) {
    e.preventDefault();
    e.stopPropagation();
  }
};

const keysToBlock = new Set(['ArrowUp', 'ArrowDown', 'Space', ' ', 'PageUp', 'PageDown', 'Home', 'End', 'Tab']);
const preventKeyDefault = (e: KeyboardEvent) => {
  if ((window as any).isScrollingProgrammatically && keysToBlock.has(e.key)) {
    e.preventDefault();
    e.stopPropagation();
  }
};

interface SectionNavProps {
  visible: boolean;
}

export default function SectionNav({ visible }: SectionNavProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeRef = useRef(0);
  
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

  // Register manual scroll-blocking event listeners during programmatic jumps
  useEffect(() => {
    const options = { passive: false };
    window.addEventListener('wheel', preventDefault, options);
    window.addEventListener('touchmove', preventDefault, options);
    window.addEventListener('touchstart', preventDefault, options);
    window.addEventListener('keydown', preventKeyDefault, options);

    return () => {
      window.removeEventListener('wheel', preventDefault);
      window.removeEventListener('touchmove', preventDefault);
      window.removeEventListener('touchstart', preventDefault);
      window.removeEventListener('keydown', preventKeyDefault);
    };
  }, []);

  const scrollToTarget = useCallback((targetEl: HTMLElement | number) => {
    const lenis = (window as unknown as Record<string, unknown>).lenis as
      | { scrollTo: (target: Element | number, options?: any) => void }
      | undefined;
    const scrollDuration = 3.0;

    // Refresh cached offsets before scrolling
    updateSectionOffsets();

    let targetOffset = 0;
    if (typeof targetEl === 'number') {
      targetOffset = targetEl;
    } else {
      targetOffset = targetEl.getBoundingClientRect().top + window.scrollY;
    }

    // Set scrolling programmatically flag
    (window as any).isScrollingProgrammatically = true;
    document.body.style.pointerEvents = 'none';
    document.documentElement.style.pointerEvents = 'none';

    let isUnlocked = false;
    let fallbackTimeout: number;

    let unlock = () => {
      if (isUnlocked) return;
      isUnlocked = true;
      (window as any).isScrollingProgrammatically = false;
      document.body.style.pointerEvents = '';
      document.documentElement.style.pointerEvents = '';
      clearTimeout(fallbackTimeout);
    };

    // Safety fallback timeout to prevent locking the screen in case scroll events hang or onComplete isn't called
    fallbackTimeout = window.setTimeout(unlock, scrollDuration * 1000 + 400);

    if (lenis) {
      lenis.scrollTo(typeof targetEl === 'number' ? targetEl : targetEl, {
        duration: scrollDuration,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        lock: true, // Native Lenis lock to prevent interruption on desktop
        onComplete: () => {
          unlock();
        },
      });
    } else {
      // Mobile custom smooth scroll animation (exactly 3 seconds, uninterruptible, 60fps)
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const clampedTarget = Math.max(0, Math.min(targetOffset, maxScroll));
      const startY = window.scrollY;
      const distance = clampedTarget - startY;

      if (Math.abs(distance) < 2) {
        unlock();
        return;
      }

      const duration = scrollDuration * 1000;
      let startTime: number | null = null;
      let animationFrameId: number;

      const animateScroll = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;
        const progress = Math.min(1, elapsed / duration);

        // Premium easeOutExpo matching Lenis
        const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        
        window.scrollTo(0, startY + distance * easeProgress);

        if (progress < 1 && (window as any).isScrollingProgrammatically) {
          animationFrameId = requestAnimationFrame(animateScroll);
        } else {
          unlock();
        }
      };

      animationFrameId = requestAnimationFrame(animateScroll);

      // Clean up animation frame if fallback timeout triggers early
      const originalUnlock = unlock;
      unlock = () => {
        cancelAnimationFrame(animationFrameId);
        originalUnlock();
      };
    }
  }, [updateSectionOffsets]);

  const scrollToTargetWithTransition = useCallback((targetIndex: number | 'home') => {
    if (targetIndex === 'home') {
      scrollToTarget(0);
      return;
    }

    const targetSection = SECTIONS[targetIndex];
    const targetEl = document.getElementById(targetSection.id);
    if (!targetEl) return;

    scrollToTarget(targetEl);
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
    <nav
      className={`section-nav${visible ? ' section-nav--visible' : ''}`}
      aria-label="Section navigation"
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

      {/* Section Icons */}
      <div className="section-nav__dots">
        {SECTIONS.map((section, index) => (
          <button
            key={section.id}
            className={`section-nav__dot${activeIndex === index ? ' section-nav__dot--active' : ''}`}
            aria-label={`Go to ${section.label}`}
            data-tooltip={section.label}
            onClick={() => scrollToTargetWithTransition(index)}
          >
            <span className="section-nav__dot-icon">
              {SectionIcons[section.id as keyof typeof SectionIcons]}
            </span>
            <span className="section-nav__dot-dot" />
          </button>
        ))}
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
  );
}

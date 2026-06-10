import { useEffect, useState, useCallback, useRef } from 'react';
import { getScrollPercent } from '../utils/helpers';

/**
 * Tracks scroll progress percentage and navbar scroll state.
 * Returns scrollPercent (0-100), isScrolled (past 100px), showBackToTop, isNavbarVisible.
 */
export function useScrollProgress() {
  const [scrollPercent, setScrollPercent] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);

  // Cache kitchen height to avoid getBoundingClientRect reflows on every scroll frame
  const kitchenHeightRef = useRef(0);
  const lastScrollYRef = useRef(0);

  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY;
    setIsScrolled(scrollY > 100);

    const isMobile = window.innerWidth < 768;

    if (isMobile) {
      // On mobile, show the SectionNav after scrolling past the first 1.2 viewports
      // instead of waiting for the full 600vh hero sequence to finish.
      setShowBackToTop(scrollY >= window.innerHeight * 1.2);
    } else {
      const kitchenHeight = kitchenHeightRef.current;
      const threshold = window.innerHeight * 0.3;
      setShowBackToTop(scrollY >= kitchenHeight - threshold);
    }

    // Hide on scroll down, show on scroll up
    const lastScrollY = lastScrollYRef.current;
    if (scrollY <= 50) {
      setIsNavbarVisible(true);
    } else if (scrollY > lastScrollY) {
      // scrolling down - hide navbar
      setIsNavbarVisible(false);
    } else if (scrollY < lastScrollY) {
      // scrolling up - show navbar
      setIsNavbarVisible(true);
    }
    lastScrollYRef.current = scrollY;

    const percent = getScrollPercent() * 100;
    setScrollPercent(percent);
  }, []);

  // Update kitchen height on  mount and resize
  useEffect(() => {
    const updateKitchenHeight = () => {
      const kitchenEl = document.getElementById('kitchen');
      if (kitchenEl) {
        kitchenHeightRef.current = kitchenEl.offsetHeight;
      } else {
        kitchenHeightRef.current = window.innerHeight;
      }
    };

    updateKitchenHeight();
    window.addEventListener('resize', updateKitchenHeight);

    // Delayed update to ensure DOM has fully painted
    const timer = setTimeout(updateKitchenHeight, 1000);

    return () => {
      window.removeEventListener('resize', updateKitchenHeight);
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    let ticking = false;
    const handleScrollTicker = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScrollTicker, { passive: true });
    
    // Call asynchronously to avoid synchronous setState inside effect body
    const timer = setTimeout(handleScroll, 0);

    return () => {
      window.removeEventListener('scroll', handleScrollTicker);
      clearTimeout(timer);
    };
  }, [handleScroll]);

  return { scrollPercent, isScrolled, showBackToTop, isNavbarVisible };
}

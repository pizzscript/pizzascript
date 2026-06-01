import { useEffect, useState, useCallback } from 'react';
import { throttle, getScrollPercent } from '../utils/helpers';

/**
 * Tracks scroll progress percentage and navbar scroll state.
 * Returns scrollPercent (0-100), isScrolled (past 100px), showBackToTop, isNavbarVisible.
 */
export function useScrollProgress() {
  const [scrollPercent, setScrollPercent] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);

  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY;
    setIsScrolled(scrollY > 100);
    setShowBackToTop(scrollY > window.innerHeight);

    // Hide navbar unless we are at the very top of the page
    if (scrollY <= 50) {
      setIsNavbarVisible(true);
    } else {
      setIsNavbarVisible(false);
    }
    const percent = getScrollPercent() * 100;
    setScrollPercent(percent);
  }, []);

  useEffect(() => {
    const throttledScroll = throttle(handleScroll, 16);
    window.addEventListener('scroll', throttledScroll);
    
    // Call asynchronously to avoid synchronous setState inside effect body
    const timer = setTimeout(handleScroll, 0);

    return () => {
      window.removeEventListener('scroll', throttledScroll);
      clearTimeout(timer);
    };
  }, [handleScroll]);

  return { scrollPercent, isScrolled, showBackToTop, isNavbarVisible };
}

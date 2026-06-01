import { useEffect, useState, useCallback } from 'react';
import { throttle, getScrollPercent } from '../utils/helpers';

/**
 * Tracks scroll progress percentage and navbar scroll state.
<<<<<<< HEAD
 * Returns scrollPercent (0-100), isScrolled (past 100px), showBackToTop, isNavbarVisible.
=======
 * Returns scrollPercent (0-100), isScrolled (past 100px), showBackToTop.
>>>>>>> 50d74942736eff6c8c9a49b5f069202d1d28c8f1
 */
export function useScrollProgress() {
  const [scrollPercent, setScrollPercent] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
<<<<<<< HEAD
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
=======
>>>>>>> 50d74942736eff6c8c9a49b5f069202d1d28c8f1

  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY;
    setIsScrolled(scrollY > 100);
    setShowBackToTop(scrollY > window.innerHeight);

<<<<<<< HEAD
    // Hide navbar unless we are at the very top of the page
    if (scrollY <= 50) {
      setIsNavbarVisible(true);
    } else {
      setIsNavbarVisible(false);
    }

=======
>>>>>>> 50d74942736eff6c8c9a49b5f069202d1d28c8f1
    const percent = getScrollPercent() * 100;
    setScrollPercent(percent);
  }, []);

  useEffect(() => {
    const throttledScroll = throttle(handleScroll, 16);
    window.addEventListener('scroll', throttledScroll);
    handleScroll(); // Initial call

    return () => {
      window.removeEventListener('scroll', throttledScroll);
    };
  }, [handleScroll]);

<<<<<<< HEAD
  return { scrollPercent, isScrolled, showBackToTop, isNavbarVisible };
=======
  return { scrollPercent, isScrolled, showBackToTop };
>>>>>>> 50d74942736eff6c8c9a49b5f069202d1d28c8f1
}

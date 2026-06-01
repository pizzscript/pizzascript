interface BackToTopProps {
  visible: boolean;
}

export default function BackToTop({ visible }: BackToTopProps) {
  const handleClick = () => {
    const lenis = (window as unknown as Record<string, unknown>).lenis as
      | { scrollTo: (target: number) => void }
      | undefined;
    if (lenis) {
      lenis.scrollTo(0);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <button
      id="back-to-top"
      className={visible ? 'visible' : ''}
      aria-label="Scroll back to the top of the page"
      onClick={handleClick}
    >
      🍕
    </button>
  );
}

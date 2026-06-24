import { useEffect } from 'react';

interface RetroModalProps {
  isOpen: boolean;
  onClose: () => void;
  src: string;
  title: string;
}

export default function RetroModal({ isOpen, onClose, src, title }: RetroModalProps) {
  // Lock background scroll when modal is active
  useEffect(() => {
    if (!isOpen) return;

    const lenis = (window as any).lenis;
    document.body.style.overflow = 'hidden';
    if (lenis) {
      lenis.stop();
    }

    return () => {
      document.body.style.overflow = '';
      if (lenis) {
        lenis.start();
      }
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fp-modal-overlay" onClick={onClose} data-lenis-prevent>
      <div className="fp-modal-window" onClick={(e) => e.stopPropagation()} data-lenis-prevent>
        <div className="fp-modal-header">
          <span className="fp-modal-title">PizzaOS v1.0 - Live Preview: {title}</span>
          <button className="fp-modal-close-btn" onClick={onClose}>[X]</button>
        </div>
        <div className="fp-modal-body" data-lenis-prevent>
          <iframe
            src={src}
            title={`${title} live preview`}
            className="fp-modal-iframe"
            sandbox="allow-scripts allow-same-origin allow-popups"
            scrolling="yes"
          />
        </div>
      </div>
    </div>
  );
}

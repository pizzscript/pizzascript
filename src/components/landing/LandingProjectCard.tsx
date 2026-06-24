

interface LandingProjectCardProps {
  imageSrc: string;
  imageAlt?: string;
  title: string;
  tags: string;
  liveUrl: string;
  onLiveViewClick: (url: string, title: string) => void;
}

export default function LandingProjectCard({
  imageSrc,
  imageAlt,
  title,
  tags,
  liveUrl,
  onLiveViewClick
}: LandingProjectCardProps) {
  return (
    <div className="fp-project fp-reveal">
      <div className="fp-project-layout">
        <div className="fp-project-image-wrap">
          <img
            src={imageSrc}
            alt={imageAlt || `${title} preview screenshot`}
            className="fp-project-image"
          />
        </div>
        <div className="fp-project-sidebar">
          <button
            className="fp-btn-sidebar fp-btn-live"
            onClick={() => onLiveViewClick(liveUrl, title)}
          >
            Live View
          </button>
          <a
            href={liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="fp-btn-sidebar fp-btn-visit"
          >
            Visit Site
          </a>
        </div>
      </div>
      <div className="fp-project-meta">
        <a
          href={liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="fp-project-name"
        >
          {title}
        </a>
        <span className="fp-project-tags">{tags}</span>
      </div>
    </div>
  );
}

import { useRef, useMemo, useState } from 'react';
import { useSequenceCanvas } from '../hooks/useSequenceCanvas';

const FRAME_COUNT = 100;
const FRAME_OFFSET = 1;

/* Tech icon data to be displayed in the stacked sidebar */
const TECH_ICONS = [
  { label: 'HTML', color: '#E34F26', icon: '<>', delay: 0 },
  { label: 'CSS', color: '#1572B6', icon: '{ }', delay: 0.4 },
  { label: 'React', color: '#61DAFB', icon: '⚛', delay: 0.8 },
  { label: 'Node', color: '#339933', icon: '⬢', delay: 1.2 },
  { label: 'API', color: '#E87040', icon: '⇋', delay: 1.6 },
  { label: 'SEO', color: '#FFC107', icon: '◎', delay: 2.0 },
];

export default function MenuSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);

  const options = useMemo(() => ({
    frameCount: FRAME_COUNT,
    getFramePath: (index: number) =>
      `https://pub-60e443554d0643d5be3dba979f62b323.r2.dev/order/frame_${String(index + FRAME_OFFSET).padStart(4, '0')}.webp`,
    onProgress: (p: number) => setProgress(p),
    objectFit: 'contain' as const,
    zoom: 1.05,
    registerWithLoader: true,
  }), []);

  useSequenceCanvas(canvasRef, sectionRef, options);

  const stage = useMemo(() => {
    if (progress < 0.35) return 'style'; // keep simple dynamic active styling states on the canvas container
    if (progress < 0.70) return 'css';
    return 'engine';
  }, [progress]);

  return (
    <section
      id="menu"
      className="sequence-scroll-driver cin-bg-dark border-t border-brown-800/10"
      ref={sectionRef}
    >
      <div className="sequence-sticky">
        <div className="w-full h-full flex items-center justify-center">
          
          <div className="menu-container container max-w-7xl lg:max-w-[1440px] xl:max-w-[1600px] mx-auto px-4 lg:px-12 xl:px-16 w-full h-full select-none overflow-hidden">
            
            {/* COLUMN 1: Heading & Description (Left Side) */}
            <div className="menu-content flex flex-col justify-center space-y-4 text-left">
              <div>
                <p className="cin-eyebrow text-xs lg:text-sm">Choosing the Stack</p>
                <h2 className="cin-heading text-4xl lg:text-5xl xl:text-6xl font-serif font-bold leading-tight lg:leading-none mt-1">
                  Read the <span className="italic text-oven-orange">Menu</span>
                </h2>
                <p className="cin-text text-sm lg:text-base xl:text-lg text-smoke-light mt-3 hidden lg:block">
                  Before writing a single line of code, we study the project requirements and select the perfect tech stack — HTML, CSS, React, Node.js, APIs, and SEO tools — tailored to your vision.
                </p>
              </div>
            </div>

            {/* COLUMN 2: Vertical 9:16 Canvas (Center) */}
            <div className="menu-visual flex items-center justify-center">
              <div className={`visual-container-vertical ${stage === 'css' ? 'css-active' : ''} ${stage === 'engine' ? 'js-active' : ''}`}>
                <canvas ref={canvasRef} className="w-full h-full" />
              </div>
            </div>

            {/* COLUMN 3: Tech Icons Stacked Vertically (Right Side) */}
            <div className="menu-sidebar flex flex-col justify-center items-center lg:items-end w-full">
              <div className="menu-tech-icons-vertical w-full max-w-[240px] lg:max-w-none flex flex-col gap-3 lg:gap-4">
                {TECH_ICONS.map((tech) => (
                  <div
                    key={tech.label}
                    className="menu-tech-icon-item"
                    style={{
                      '--icon-color': tech.color,
                      animationDelay: `${tech.delay}s`,
                    } as React.CSSProperties}
                  >
                    <span className="menu-tech-icon-symbol">{tech.icon}</span>
                    <span className="menu-tech-icon-label">{tech.label}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}

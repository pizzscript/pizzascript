export interface PortfolioItem {
  imageSrc: string;
  imageAlt: string;
  dishName: string;
  realName: string;
  description: string;
  tags: string[];
  duration: string;
  flavor: string;
  link: string;
  linkLabel: string;
  animateDelay: string;
  showLivePreview?: boolean;
}

export const portfolioItems: PortfolioItem[] = [
  {
    imageSrc: '/assets/images/logo.avif',
    imageAlt: 'My Design Academia Logo',
    dishName: 'The Signature Slice',
    realName: ' My Design Academia',
    description:
      'A fully developed educational website built with responsive design, enquiry functionality, SEO optimization, and a clean user journey crafted for student conversions.',
    tags: ['HTML', 'CSS', 'JavaScript', 'PHP', 'SEO'],
    duration: '⏱️ 5 weeks',
    flavor: 'Bold & Modern',
    link: 'https://mydesignacademia.com/',
    linkLabel: 'View  My Design Academia ',
    animateDelay: '1',
    showLivePreview: true,
  },
  {
    imageSrc: '/assets/images/pizzascript-logo.webp',
    imageAlt: 'Pizza Script',
    dishName: 'The House Special',
    realName: 'Pizza Script',
    description:
      'The official Pizza Script digital kitchen - a creative portfolio experience built to showcase frontend craftsmanship, interactive UI, brand storytelling, and performance-focused development.',
    tags: ['HTML', 'CSS', 'JavaScript', 'UI/UX'],
    duration: '⏱️ 4 weeks',
    flavor: 'Elegant & Minimal',
    link: 'https://pizzzascript.github.io/pizzzascript/',
    linkLabel: 'View Arcadia Architecture Studio project',
    animateDelay: '2',
  },
];


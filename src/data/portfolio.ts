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
    dishName: 'My Design Academia',
    realName: 'My Design Academia',
    description:
      'A fully developed educational website built with responsive design, enquiry functionality, SEO optimization, and a clean user journey crafted for student conversions.',
    tags: ['HTML', 'CSS', 'JavaScript', 'PHP', 'SEO'],
    duration: '⏱️ 5 weeks',
    flavor: 'Bold & Modern',
    link: 'https://mydesignacademia.com/',
    linkLabel: 'View My Design Academia',
    animateDelay: '1',
    showLivePreview: true,
  },
  {
    imageSrc: '/assets/images/orion-logo.png',
    imageAlt: 'Orion Pharma India Logo',
    dishName: 'Orion Pharma India',
    realName: 'Orion Pharma India',
    description:
      'A professional, search-optimized corporate website for a leading exporter of human infertility, gynecology, oncology, and critical care medicines.',
    tags: ['HTML', 'CSS', 'JavaScript', 'SEO', 'Responsive'],
    duration: '⏱️ 4 weeks',
    flavor: 'Clean & Corporate',
    link: 'https://www.orionpharmaindia.org/',
    linkLabel: 'View Orion Pharma India',
    animateDelay: '2',
    showLivePreview: true,
  },
];


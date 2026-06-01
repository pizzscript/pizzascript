export interface ServiceItem {
  emoji: string;
  title: string;
  service: string;
  description: string;
  ingredients: string[];
  time: string;
  price: string;
  animateDelay: string;
}

export const services: ServiceItem[] = [
  {
    emoji: '🍕',
    title: 'The Classic Margherita',
    service: 'Landing Page',
    description:
      'Crisp, fast, and made to impress at first bite. High-converting landing pages baked for performance, clear messaging, and irresistible calls to action.',
    ingredients: ['HTML', 'CSS', 'JS'],
    time: '⏱️ 1–2 weeks',
    price: '$$',
    animateDelay: '1',
  },
  {
    emoji: '🍕',
    title: 'The Supreme',
    service: 'Full Website',
    description:
      'Loaded with premium toppings. Multi-page business websites layered with responsive design, smooth UX, SEO seasoning, and performance straight from the oven.The crowd-pleaser.',
    ingredients: ['React', 'Next.js', 'Tailwind', 'SEO'],
    time: '⏱️ 3–5 weeks',
    price: '$$$',
    animateDelay: '2',
  },
  {
    emoji: '🥘',
    title: 'The Deep Dish',
    service: 'Web Application',
    description:
      'Rich, layered, and engineered to perfection. Custom logic, dynamic interfaces, database connectivity,user authentication and interactive experiences — takes time, but it\'s worth every bite.',
    ingredients: ['React', 'Node.js', 'Firebase', 'TypeScript'],
    time: '⏱️ 6–10 weeks',
    price: '$$$$',
    animateDelay: '3',
  },
  {
    emoji: '🥟',
    title: 'The Calzone',
    service: 'UI/UX Design',
    description:
      'Beautiful on the outside, perfectly structured inside. Wireframes, prototypes, and pixel-perfect mockups — all folded into one delicious package.',
    ingredients: ['Figma', 'Prototyping', 'Design Systems'],
    time: '⏱️ 2–3 weeks',
    price: '$$',
    animateDelay: '4',
  },
  {
    emoji: '⭐',
    title: 'The Secret Sauce',
    service: 'SEO Optimization',
    description:
      'No point baking a masterpiece if nobody finds the kitchen. On-page optimization, technical SEO fixes, and performance tuning to help your website rise in search rankings.',
    ingredients: ['On Page SEO', 'Technical SEO'],
    time: '⏱️ 1–2 weeks',
    price: '$$',
    animateDelay: '4',
  },
  {
    emoji: '🔪',
    title: 'The Slice',
    service: 'Bug Fix / Small Task',
    description:
      'Quick, affordable, no-fuss. Got a bug? Need a tweak? A single slice is all you need. Fast turnaround, no minimum order.',
    ingredients: ['Debugging', 'CSS Fixes', 'Performance'],
    time: '⏱️ 1–3 days',
    price: '$',
    animateDelay: '5',
  },
];

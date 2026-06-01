export interface SkillItem {
  iconId: string;
  name: string;
  proficiency: string;
  freshness: string;
  animateDelay: string;
}

export interface Shelf {
  emoji: string;
  name: string;
  category: string;
  items: SkillItem[];
}

export const shelves: Shelf[] = [
  {
    emoji: '🫙',
    name: 'Base & Dough',
    category: 'Core Languages',
    items: [
      { iconId: 'icon-html', name: 'HTML', proficiency: '95%', freshness: 'Daily staple', animateDelay: '1' },
      { iconId: 'icon-css', name: 'CSS', proficiency: '92%', freshness: 'Always in stock', animateDelay: '2' },
      { iconId: 'icon-javascript', name: 'JavaScript', proficiency: '90%', freshness: 'Freshly ground', animateDelay: '3' },
      { iconId: 'icon-typescript', name: 'PHP', proficiency: '72%', freshness: 'Premium grade', animateDelay: '4' },
    ],
  },
  {
    emoji: '🥫',
    name: 'Sauce',
    category: 'Frameworks & Libraries',
    items: [
      { iconId: 'icon-react', name: 'React', proficiency: '88%', freshness: 'House recipe', animateDelay: '1' },
      { iconId: 'icon-nextjs', name: 'Next.js', proficiency: '85%', freshness: 'Imported fresh', animateDelay: '2' },
      { iconId: 'icon-vue', name: 'Vue', proficiency: '72%', freshness: 'Seasonal pick', animateDelay: '3' },
      { iconId: 'icon-tailwind', name: 'Tailwind CSS', proficiency: '90%', freshness: "Chef's favorite", animateDelay: '4' },
    ],
  },
  {
    emoji: '🧀',
    name: 'Cheese',
    category: 'Backend & Databases',
    items: [
      { iconId: 'icon-nodejs', name: 'Node.js', proficiency: '85%', freshness: 'Aged perfectly', animateDelay: '1' },
      { iconId: 'icon-python', name: 'PHP', proficiency: '70%', freshness: 'Farm fresh', animateDelay: '2' },
      { iconId: 'icon-express', name: 'SQL', proficiency: '80%', freshness: 'Reliable classic', animateDelay: '3' },
      { iconId: 'icon-firebase', name: 'Firebase', proficiency: '78%', freshness: 'Quick-melt', animateDelay: '4' },
    ],
  },
  {
    emoji: '🫒',
    name: 'Toppings',
    category: 'Tools & Platforms',
    items: [
      { iconId: 'icon-git', name: 'Git', proficiency: '90%', freshness: 'Essential', animateDelay: '1' },
      { iconId: 'icon-figma', name: 'Figma', proficiency: '82%', freshness: 'Design-grade', animateDelay: '2' },
      { iconId: 'icon-vscode', name: 'VS Code', proficiency: '95%', freshness: 'Daily driver', animateDelay: '3' },
      { iconId: 'icon-webpack', name: 'Webpack', proficiency: '75%', freshness: 'Well-seasoned', animateDelay: '4' },
    ],
  },
  {
    emoji: '🌶️',
    name: 'Secret Spice',
    category: 'SEO & Optimization',
    items: [
      { iconId: 'icon-gsap', name: 'On-Page SEO', proficiency: '96%', freshness: 'Motion magic', animateDelay: '1' },
      { iconId: 'icon-threejs', name: 'Technical SEO', proficiency: '85%', freshness: 'Experimental batch', animateDelay: '2' },
      { iconId: 'icon-framer', name: 'Performance Optimization', proficiency: '89%', freshness: 'Smooth blend', animateDelay: '3' },
    ],
  },
];

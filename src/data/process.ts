export interface ProcessStep {
  number: number;
  recipeName: string;
  realName: string;
  description: string;
  duration: string;
  chefNote: string;
  animate: string;
}

export const processSteps: ProcessStep[] = [
  {
    number: 1,
    recipeName: 'Prep the Dough',
    realName: 'Order Intake & Discovery',
    description:
      'We knead through your goals, audience, and competitors. Every great website starts with understanding what makes your business unique.',
    duration: '⏱️ 2–3 days',
    chefNote:
      'A rushed dough never rises. Take time with this step — it shapes everything.',
    animate: 'fade-right',
  },
  {
    number: 2,
    recipeName: 'Choose Your Toppings',
    realName: 'Design & Wireframing',
    description:
      'You pick the flavors, I arrange them beautifully. Layouts, content flow, and interface structure - tasted and approved before we fire up the oven.',
    duration: '⏱️ 3–5 days',
    chefNote:
      "Less can be more. The best pizzas don't need 47 toppings.",
    animate: 'fade-left',
  },
  {
    number: 3,
    recipeName: 'Into the Oven',
    realName: 'Development',
    description:
      'This is where the kitchen gets hot. Clean code, dynamic functionality, and carefully layered development come together to transform the recipe into a fully baked digital experience.',
    duration: '⏱️ 1–4 weeks',
    chefNote:
      "I keep the oven door closed — no peeking! But I'll send you progress updates.",
    animate: 'fade-right',
  },
  {
    number: 4,
    recipeName: 'Quality Check',
    realName: 'Testing & Review',
    description:
      'No burnt crusts here. Every page is tested for responsiveness, functionality, speed, and usability. Your feedback is the final seasoning before we serve.',
    duration: '⏱️ 2–3 days',
    chefNote:
      'Because nobody likes broken checkout buttons or half-cooked mobile layouts.',
    animate: 'fade-left',
  },
  {
    number: 5,
    recipeName: 'Serve Hot',
    realName: 'Launch & Delivery',
    description:
      'Fresh from the oven and deployed to your domain. Optimized, launch-ready, and prepared to serve your audience at full speed.',
    duration: '⏱️ 1 day',
    chefNote:
      'Launching is the beginning, not the end. I stick around for seconds.',
    animate: 'fade-right',
  },
];

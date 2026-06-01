export interface Testimonial {
  quote: string;
  rating?: string;
  authorName: string;
  date: string;
}

export const testimonials: Testimonial[] = [
  {
    quote:
      'Working with Pizza Script was smooth from start to finish. The communication was clear, timelines were respected, and the final website felt polished and thoughtfully built.',
    rating: '🍕🍕🍕🍕🍕',
    authorName: 'Neeraj ',
    date: 'March 2026',
  },
  {
    quote:
      'We needed a clean, responsive website without unnecessary complexity, and Pizza Script delivered exactly that. Fast, professional, and easy to collaborate with.',
    rating: '🍕🍕🍕🍕🍕',
    authorName: 'Ankita ',
    date: 'April 2026',
  },
  {
    quote:
      'What stood out most was the attention to detail. From mobile responsiveness to performance tweaks, everything felt carefully crafted rather than rushed.',
    rating: '🍕🍕🍕🍕',
    authorName: 'Ajinkya',
    date: 'March 2026',
  },
  {
    quote:
      'Pizza Script made the technical side feel simple. Feedback was handled quickly, changes were implemented smoothly, and the overall experience felt reliable and professional.',
    authorName: 'Sarrah ',
    date: 'February 2026',
  },
];

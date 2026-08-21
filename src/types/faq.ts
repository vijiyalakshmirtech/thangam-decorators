export type FaqCategory = 'booking' | 'services' | 'logistics' | 'pricing';

export interface Faq {
  id: string;
  question: string;
  answer: string;
  category: FaqCategory;
}

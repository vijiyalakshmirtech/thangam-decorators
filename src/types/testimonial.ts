export interface Testimonial {
  id: string;
  customerName: string;
  eventType: string;
  location: string;
  content: string;
  date: string;
  source: 'Google' | 'Direct' | 'WhatsApp';
  verified: boolean;
}

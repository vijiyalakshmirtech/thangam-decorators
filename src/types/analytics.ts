export type ConversionEvent =
  | 'page_view'
  | 'portfolio_view'
  | 'project_view'
  | 'whatsapp_click'
  | 'phone_click'
  | 'email_click'
  | 'quote_start'
  | 'quote_submit'
  | 'gallery_open'
  | 'service_view'
  | 'cta_click';

export interface EventPayload {
  category?: string;
  projectId?: string;
  serviceId?: string;
  sourceLocation?: string;
  hasCustomDate?: boolean;
  [key: string]: string | number | boolean | undefined;
}

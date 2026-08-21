import React from 'react';
import { Container } from '../components/common/Container';
import { SectionHeading } from '../components/common/SectionHeading';
import { Accordion } from '../components/common/Accordion';
import { Button } from '../components/common/Button';
import { EmptyState } from '../components/ui/EmptyState';
import { FAQS_DATA } from '../data/faqs';
import { siteConfig } from '../config/site';
import { generateWhatsAppUrl, generateTelUrl } from '../utils/urlHelpers';
import { trackEvent } from '../lib/analytics';
import { MessageCircle, Phone, Sparkles } from 'lucide-react';

export interface FaqsProps {
  id?: string;
  className?: string;
}

export const Faqs: React.FC<FaqsProps> = ({
  id = 'faqs',
  className = '',
}) => {
  const whatsAppUrl = generateWhatsAppUrl(
    `Hello P.T. Selvam, I have a question about stage decoration for our upcoming event.`
  );
  const telUrl = generateTelUrl(siteConfig.contact.phonePrimary);

  const accordionItems = FAQS_DATA.map((faq) => ({
    id: faq.id,
    title: faq.question,
    content: faq.answer,
  }));

  return (
    <section
      id={id}
      className={`py-16 sm:py-20 md:py-24 bg-thangam-dark-950 relative border-t border-white/5 ${className}`}
      aria-labelledby="faqs-heading"
    >
      {/* Ambient background lighting */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-thangam-gold-500/5 blur-[130px] rounded-full pointer-events-none" 
        aria-hidden="true" 
      />

      <Container size="narrow" className="relative z-10">
        {/* Section Heading */}
        <SectionHeading
          eyebrow="Client Guidance"
          title="Frequently Asked Questions"
          subtitle="Everything you need to know about our stage decor & execution"
          description="Have questions about planning your wedding stage decor in Erode or Western Tamil Nadu? Here are clear, factual answers regarding our booking process, custom sets, and floral sourcing."
          className="mb-10 sm:mb-14"
        />

        {/* Accessible Accordion or EmptyState */}
        {FAQS_DATA.length > 0 ? (
          <Accordion items={accordionItems} allowMultiple={false} className="mb-12" />
        ) : (
          <div className="mb-12">
            <EmptyState
              title="Frequently Asked Questions"
              description="Our event guidance and FAQ directory will be updated shortly. Please contact P.T. Selvam directly with your questions."
              actionText="Call For Information"
              actionHref={telUrl}
            />
          </div>
        )}

        {/* Bottom Conversion & Inquiry Prompt */}
        <div className="rounded-2xl bg-thangam-dark-900/90 border border-thangam-gold-500/25 p-6 sm:p-8 text-center shadow-xl">
          <h3 className="text-xl sm:text-2xl font-serif font-bold text-thangam-ivory-50 mb-2">
            Have a Specific Stage or Hall Question?
          </h3>
          <p className="text-xs sm:text-sm text-thangam-ivory-100/75 max-w-lg mx-auto mb-6">
            Speak directly with <strong className="text-thangam-gold-300 font-semibold">{siteConfig.brand.ownerName}</strong> to discuss your mandapam dimensions, floral preferences, and custom scenography.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            {whatsAppUrl && (
              <Button
                variant="whatsapp"
                size="md"
                href={whatsAppUrl}
                target="_blank"
                leftIcon={<MessageCircle className="w-4 h-4" />}
                onClick={() =>
                  trackEvent('whatsapp_click', {
                    sourceLocation: 'faq_section',
                  })
                }
              >
                Inquire on WhatsApp
              </Button>
            )}

            <Button
              variant="primary"
              size="md"
              href="#portfolio"
              leftIcon={<Sparkles className="w-4 h-4" />}
              onClick={() =>
                trackEvent('cta_click', {
                  sourceLocation: 'faq_section',
                  ctaText: 'Explore Collections',
                })
              }
            >
              Explore Collections
            </Button>

            <Button
              variant="ghost"
              size="md"
              href={telUrl}
              leftIcon={<Phone className="w-4 h-4 text-thangam-gold-400" />}
              onClick={() =>
                trackEvent('phone_click', {
                  sourceLocation: 'faq_section',
                })
              }
              className="text-xs"
            >
              Call {siteConfig.contact.phonePrimary}
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
};

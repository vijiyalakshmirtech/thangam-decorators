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
      className={`py-24 sm:py-32 bg-[#FFFDF8] relative overflow-hidden border-t border-[#C9A45C]/25 ${className}`}
      aria-labelledby="faqs-heading"
    >
      {/* Ambient background lighting */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#C9A45C]/8 blur-[130px] rounded-full pointer-events-none"
        aria-hidden="true"
      />

      <Container size="narrow" className="relative z-10">
        {/* Section Heading */}
        <SectionHeading
          eyebrow="Client Guidance"
          title="FREQUENTLY ASKED QUESTIONS."
          subtitle="மேடை அலங்கார ஆலோசனைகள் மற்றும் விளக்கங்கள்"
          description="Have questions about planning your wedding stage decor in Erode or Western Tamil Nadu? Here are clear, factual answers regarding our booking process, custom sets, and floral sourcing."
          className="mb-12 sm:mb-16"
        />

        {/* Accessible Accordion or EmptyState */}
        {FAQS_DATA.length > 0 ? (
          <Accordion items={accordionItems} allowMultiple={false} className="mb-14" />
        ) : (
          <div className="mb-14">
            <EmptyState
              title="Frequently Asked Questions"
              description="Our event guidance and FAQ directory will be updated shortly. Please contact P.T. Selvam directly with your questions."
              actionText="Call For Information"
              actionHref={telUrl}
            />
          </div>
        )}

        {/* Bottom Conversion & Inquiry Prompt */}
        <div className="rounded-3xl bg-[#F7F0E4] border border-[#C9A45C]/40 p-8 sm:p-10 text-center shadow-[0_10px_35px_rgba(110,24,48,0.04)]">
          <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#6E1830] mb-2">
            Have a Specific Stage or Hall Question?
          </h3>
          <p className="text-sm sm:text-base text-[#1F161A]/80 max-w-lg mx-auto mb-8 font-light">
            Speak directly with <strong className="text-[#6E1830] font-semibold">{siteConfig.brand.ownerName}</strong> to discuss your mandapam dimensions, floral preferences, and custom scenography.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            {whatsAppUrl && (
              <Button
                variant="whatsapp"
                size="md"
                href={whatsAppUrl}
                target="_blank"
                leftIcon={<MessageCircle className="w-4 h-4" />}
                className="text-xs uppercase tracking-wider font-semibold"
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
              href="#showroom"
              leftIcon={<Sparkles className="w-4 h-4 text-[#C9A45C]" />}
              className="text-xs uppercase tracking-wider font-semibold"
              onClick={() =>
                trackEvent('cta_click', {
                  sourceLocation: 'faq_section',
                  ctaText: 'Explore Collections',
                })
              }
            >
              Explore Stage Showroom
            </Button>

            <Button
              variant="secondary"
              size="md"
              href={telUrl}
              leftIcon={<Phone className="w-4 h-4 text-[#6E1830]" />}
              onClick={() =>
                trackEvent('phone_click', {
                  sourceLocation: 'faq_section',
                })
              }
              className="text-xs uppercase tracking-wider font-semibold"
            >
              Call {siteConfig.contact.phonePrimary}
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
};

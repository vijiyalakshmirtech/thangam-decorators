import React from 'react';
import { Container } from '../components/common/Container';
import { SectionHeading } from '../components/common/SectionHeading';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { ContactForm } from '../components/ui/ContactForm';
import { siteConfig } from '../config/site';
import { generateWhatsAppUrl, generateTelUrl, generateMailtoUrl } from '../utils/urlHelpers';
import { trackEvent } from '../lib/analytics';
import {
  Sparkles,
  Phone,
  MessageCircle,
  Mail,
  MapPin
} from 'lucide-react';

export interface ContactProps {
  id?: string;
  className?: string;
}

export const Contact: React.FC<ContactProps> = ({
  id = 'contact',
  className = '',
}) => {
  const whatsAppUrl = generateWhatsAppUrl(
    `Hello P.T. Selvam, I would like to request a stage decoration consultation for our upcoming celebration.`
  );
  const primaryTelUrl = generateTelUrl(siteConfig.contact.phonePrimary);
  const secondaryTelUrl = generateTelUrl(siteConfig.contact.phoneSecondary);
  const mailtoUrl = generateMailtoUrl(
    siteConfig.contact.email,
    'Stage Decoration Inquiry — Thangam Decorators'
  );

  return (
    <section
      id={id}
      className={`py-24 sm:py-32 bg-[#F7F0E4] relative overflow-hidden border-t border-[#6E1830]/15 ${className}`}
      aria-labelledby="contact-heading"
    >
      {/* Subtle ambient lighting */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-[#8B3A4E]/5 blur-[160px] rounded-full pointer-events-none"
        aria-hidden="true"
      />

      <Container size="default" className="relative z-10">
        {/* Section Heading */}
        <SectionHeading
          eyebrow="Direct Consultation"
          title="LET'S CREATE YOUR DREAM STAGE."
          subtitle="உங்கள் கனவு மேடையை உருவாக்க இன்றே தொடர்புகொள்ளுங்கள்"
          description="Whether you are organizing a traditional Vedic wedding mandapam, a royal evening reception, or an intimate family ceremony, P.T. Selvam is here to craft your ideal setting."
          theme="light"
          className="mb-14 sm:mb-20"
        />

        {/* Two-Column Editorial Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column: Direct Contact Channels & Heritage */}
          <div className="lg:col-span-5 flex flex-col justify-between h-full space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Badge variant="gold" icon={<Sparkles className="w-3 h-3 text-[#6E1830]" />}>
                  Direct Proprietor Access
                </Badge>
              </div>

              <h3 className="text-2xl sm:text-4xl font-serif font-bold text-[#6E1830] leading-snug mb-3">
                Speak Directly with P.T. Selvam
              </h3>

              <p className="text-sm text-[#1F161A]/80 leading-relaxed mb-6 font-light">
                Every wedding stage is unique. Discuss your kalyana mandapam dimensions, auspicious muhurtham hours, and floral preferences directly with our founder.
              </p>

              {/* Direct Channels List */}
              <div className="space-y-4">
                {/* Primary Phone */}
                <a
                  href={primaryTelUrl}
                  onClick={() =>
                    trackEvent('phone_click', {
                      sourceLocation: 'contact_section',
                      phoneType: 'primary',
                    })
                  }
                  className="flex items-center gap-4 p-5 rounded-2xl bg-[#FFF8ED] border border-[#6E1830]/15 hover:border-[#6E1830] transition-all duration-300 shadow-sm group"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#6E1830] text-[#FFF8ED] flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform shadow-md">
                    <Phone className="w-5 h-5 text-[#FFF8ED]" />
                  </div>
                  <div>
                    <div className="text-[10px] font-semibold uppercase tracking-widest text-[#6E1830]">
                      Primary Consultation Line
                    </div>
                    <div className="text-lg sm:text-xl font-serif font-bold text-[#6E1830] group-hover:text-[#4A0E1B] transition-colors">
                      {siteConfig.contact.phonePrimary}
                    </div>
                    <div className="text-xs text-[#1F161A]/70 font-sans">
                      P.T. Selvam (Direct)
                    </div>
                  </div>
                </a>

                {/* Secondary Phone */}
                <a
                  href={secondaryTelUrl}
                  onClick={() =>
                    trackEvent('phone_click', {
                      sourceLocation: 'contact_section',
                      phoneType: 'secondary',
                    })
                  }
                  className="flex items-center gap-4 p-5 rounded-2xl bg-[#FFF8ED] border border-[#6E1830]/15 hover:border-[#6E1830] transition-all duration-300 shadow-sm group"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#6E1830]/10 border border-[#6E1830]/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <Phone className="w-5 h-5 text-[#6E1830]" />
                  </div>
                  <div>
                    <div className="text-[10px] font-semibold uppercase tracking-widest text-[#6E1830]">
                      Alternate Line
                    </div>
                    <div className="text-base sm:text-lg font-serif font-bold text-[#6E1830] group-hover:text-[#4A0E1B] transition-colors">
                      {siteConfig.contact.phoneSecondary}
                    </div>
                  </div>
                </a>

                {/* Email Address */}
                {siteConfig.contact.email && (
                  <a
                    href={mailtoUrl}
                    onClick={() =>
                      trackEvent('email_click', {
                        sourceLocation: 'contact_section',
                      })
                    }
                    className="flex items-center gap-4 p-5 rounded-2xl bg-[#FFF8ED] border border-[#6E1830]/15 hover:border-[#6E1830] transition-all duration-300 shadow-sm group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-[#6E1830]/10 border border-[#6E1830]/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <Mail className="w-5 h-5 text-[#6E1830]" />
                    </div>
                    <div>
                      <div className="text-[10px] font-semibold uppercase tracking-widest text-[#6E1830]">
                        Official Email
                      </div>
                      <div className="text-sm font-sans font-medium text-[#6E1830] group-hover:text-[#4A0E1B] transition-colors break-all">
                        {siteConfig.contact.email}
                      </div>
                    </div>
                  </a>
                )}

                {/* Physical Workshop & Office Address */}
                <div className="flex items-start gap-4 p-5 rounded-2xl bg-[#FFF8ED] border border-[#6E1830]/15 shadow-sm">
                  <div className="w-12 h-12 rounded-xl bg-[#6E1830] text-[#FFF8ED] flex items-center justify-center flex-shrink-0 mt-0.5 shadow-md">
                    <MapPin className="w-5 h-5 text-[#FFF8ED]" />
                  </div>
                  <div>
                    <div className="text-[10px] font-semibold uppercase tracking-widest text-[#6E1830]">
                      Workshop & Registered Address
                    </div>
                    <address className="not-italic text-sm text-[#1F161A]/85 leading-relaxed font-sans mt-0.5">
                      {siteConfig.location.address}
                    </address>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct WhatsApp CTA Button */}
            {whatsAppUrl && (
              <div className="pt-2">
                <Button
                  variant="whatsapp"
                  size="lg"
                  href={whatsAppUrl}
                  target="_blank"
                  leftIcon={<MessageCircle className="w-4 h-4" />}
                  className="w-full uppercase tracking-wider text-xs font-semibold"
                  onClick={() =>
                    trackEvent('whatsapp_click', {
                      sourceLocation: 'contact_section',
                    })
                  }
                >
                  Start WhatsApp Consultation
                </Button>
              </div>
            )}
          </div>

          {/* Right Column: Interactive Consultation Request Form */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl bg-[#FFF8ED] border border-[#6E1830]/20 p-8 sm:p-10 lg:p-12 shadow-[0_15px_50px_rgba(74,14,27,0.06)]">
              <div className="mb-8">
                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#6E1830] mb-2">
                  Request a Custom Stage Proposal
                </h3>
                <p className="text-sm text-[#1F161A]/75 font-light">
                  Share your event details and preferred decoration style. P.T. Selvam will review your requirements and respond with a personalized proposal.
                </p>
              </div>

              {/* Canonical Form Component */}
              <ContactForm />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

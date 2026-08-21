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
      className={`py-16 sm:py-20 md:py-24 bg-thangam-dark-950 relative border-t border-white/5 ${className}`}
      aria-labelledby="contact-heading"
    >
      {/* Subtle ambient lighting */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-thangam-gold-500/5 blur-[160px] rounded-full pointer-events-none" 
        aria-hidden="true" 
      />

      <Container size="default" className="relative z-10">
        {/* Section Heading */}
        <SectionHeading
          eyebrow="Direct Consultation"
          title="Plan Your Sacred Celebration"
          subtitle={`Connect directly with ${siteConfig.brand.ownerName} for bespoke stage decor`}
          description="Whether you are organizing a traditional Vedic wedding mandapam, a royal evening reception, or an intimate family ceremony, we are here to craft your ideal setting."
          className="mb-12 sm:mb-16"
        />

        {/* Two-Column Editorial Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column: Direct Contact Channels & Heritage */}
          <div className="lg:col-span-5 flex flex-col justify-between h-full space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Badge variant="gold" icon={<Sparkles className="w-3 h-3" />}>
                  Direct Proprietor Access
                </Badge>
              </div>

              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-thangam-ivory-50 leading-snug mb-3">
                Speak Directly with Master Decorator P.T. Selvam
              </h3>

              <p className="text-xs sm:text-sm text-thangam-ivory-100/75 leading-relaxed mb-6 font-sans">
                Every wedding stage is unique. Discuss your kalyana mandapam dimensions, auspicious muhurtham hours, and floral preferences directly with our founder.
              </p>

              {/* Direct Channels List */}
              <div className="space-y-3.5">
                {/* Primary Phone */}
                <a
                  href={primaryTelUrl}
                  onClick={() =>
                    trackEvent('phone_click', {
                      sourceLocation: 'contact_section',
                      phoneType: 'primary',
                    })
                  }
                  className="flex items-center gap-4 p-4 rounded-xl bg-thangam-dark-900/90 border border-thangam-gold-500/20 hover:border-thangam-gold-500/50 transition-all duration-300 group"
                >
                  <div className="w-11 h-11 rounded-lg bg-thangam-gold-500/10 border border-thangam-gold-500/25 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <Phone className="w-5 h-5 text-thangam-gold-400" />
                  </div>
                  <div>
                    <div className="text-[11px] font-semibold uppercase tracking-wider text-thangam-gold-400">
                      Primary Consultation Line
                    </div>
                    <div className="text-base sm:text-lg font-serif font-bold text-thangam-ivory-50 group-hover:text-thangam-gold-300 transition-colors">
                      {siteConfig.contact.phonePrimary}
                    </div>
                    <div className="text-[11px] text-thangam-ivory-100/50 font-sans">
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
                  className="flex items-center gap-4 p-4 rounded-xl bg-thangam-dark-900/90 border border-white/10 hover:border-thangam-gold-500/40 transition-all duration-300 group"
                >
                  <div className="w-11 h-11 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <Phone className="w-5 h-5 text-thangam-ivory-100/70" />
                  </div>
                  <div>
                    <div className="text-[11px] font-semibold uppercase tracking-wider text-thangam-ivory-100/60">
                      Alternate Line
                    </div>
                    <div className="text-base font-serif font-semibold text-thangam-ivory-50 group-hover:text-thangam-gold-300 transition-colors">
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
                    className="flex items-center gap-4 p-4 rounded-xl bg-thangam-dark-900/90 border border-white/10 hover:border-thangam-gold-500/40 transition-all duration-300 group"
                  >
                    <div className="w-11 h-11 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <Mail className="w-5 h-5 text-thangam-ivory-100/70" />
                    </div>
                    <div>
                      <div className="text-[11px] font-semibold uppercase tracking-wider text-thangam-ivory-100/60">
                        Official Email
                      </div>
                      <div className="text-sm font-sans font-medium text-thangam-ivory-50 group-hover:text-thangam-gold-300 transition-colors break-all">
                        {siteConfig.contact.email}
                      </div>
                    </div>
                  </a>
                )}

                {/* Physical Workshop & Office Address */}
                <div className="flex items-start gap-4 p-4 rounded-xl bg-thangam-dark-900/90 border border-white/10">
                  <div className="w-11 h-11 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <MapPin className="w-5 h-5 text-thangam-gold-400" />
                  </div>
                  <div>
                    <div className="text-[11px] font-semibold uppercase tracking-wider text-thangam-gold-400">
                      Workshop & Registered Address
                    </div>
                    <address className="not-italic text-xs sm:text-sm text-thangam-ivory-100/80 leading-relaxed font-sans mt-0.5">
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
                  className="w-full"
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
            <div className="rounded-2xl bg-thangam-dark-900/90 border border-thangam-gold-500/25 p-6 sm:p-8 lg:p-10 shadow-2xl">
              <div className="mb-6">
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-thangam-ivory-50 mb-1.5">
                  Request a Custom Stage Proposal
                </h3>
                <p className="text-xs sm:text-sm text-thangam-ivory-100/70 font-sans">
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

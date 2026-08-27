'use client';

import React from 'react';
import { Container } from '../components/common/Container';
import { TechLabel } from '../components/common/TechLabel';
import { SpatialFrame } from '../components/common/SpatialFrame';
import { GlowLine } from '../components/common/GlowLine';
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
  MapPin,
  Clock,
  Compass
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
    siteConfig.contact.phonePrimary,
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
      className={`py-24 sm:py-32 bg-gradient-to-b from-[#3B0D18] via-[#4A0E1B] to-[#3B0D18] text-[#FFF8ED] relative overflow-hidden border-t border-[#C6A15B]/20 ${className}`}
      aria-labelledby="contact-heading"
    >
      {/* Studio Blueprint Grid Overlay */}
      <div className="absolute inset-0 studio-grid-overlay pointer-events-none opacity-30" aria-hidden="true" />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-[#C6A15B]/10 blur-[160px] rounded-full pointer-events-none"
        aria-hidden="true"
      />

      <Container size="wide" className="relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 sm:mb-20">
          <div className="mb-4 flex justify-center gap-2">
            <TechLabel variant="gold" icon={<Compass className="w-3.5 h-3.5" />}>
              STUDIO CONSULTATION LAB • ERODE HEADQUARTERS
            </TechLabel>
          </div>

          <h2
            id="contact-heading"
            className="text-3xl sm:text-5xl md:text-6xl font-serif font-medium text-[#FFF8ED] tracking-tight leading-tight mb-4"
          >
            BEGIN YOUR STAGE STORY.
          </h2>

          <p className="font-tamil text-base sm:text-xl font-medium text-[#E0C078] mb-4">
            உங்கள் கனவு மேடையை உருவாக்க இன்றே தொடர்புகொள்ளுங்கள்
          </p>

          <p className="text-base text-[#F7F0E4]/85 font-light max-w-2xl mx-auto">
            Whether you are organizing a traditional Vedic wedding mandapam, a royal evening reception, or an intimate family ceremony, P.T. Selvam is here to craft your ideal architectural setting.
          </p>

          <GlowLine variant="gold" className="max-w-xs mx-auto mt-6" />
        </div>

        {/* Two-Column Editorial Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* Left Column: Direct Studio Channels & Founder Access */}
          <div className="lg:col-span-5 flex flex-col justify-between h-full space-y-6">
            <SpatialFrame
              label="DIRECT PROPRIETOR ACCESS"
              theme="dark"
              className="p-6 sm:p-8"
            >
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#FFF8ED] leading-snug mb-3">
                Speak Directly with {siteConfig.brand.ownerName}
              </h3>

              <p className="text-sm text-[#F7F0E4]/80 leading-relaxed mb-6 font-light">
                Every wedding stage is unique. Discuss your kalyana mandapam dimensions, auspicious muhurtham hours, and floral preferences directly with our master scenographer.
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
                  className="flex items-center gap-4 p-4 rounded-xl bg-black/40 border border-[#C6A15B]/30 hover:border-[#E0C078] transition-all duration-300 shadow-sm group"
                >
                  <div className="w-11 h-11 rounded-lg bg-[#C6A15B] text-[#3B0D18] flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform shadow-md">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[9px] font-mono uppercase tracking-widest text-[#E0C078]">
                      PRIMARY CONSULTATION LINE
                    </div>
                    <div className="text-lg font-mono font-bold text-[#FFF8ED] group-hover:text-[#E0C078] transition-colors">
                      {siteConfig.contact.phonePrimary}
                    </div>
                    <div className="text-[11px] text-[#F7F0E4]/70 font-sans">
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
                  className="flex items-center gap-4 p-4 rounded-xl bg-black/40 border border-[#C6A15B]/20 hover:border-[#E0C078] transition-all duration-300 shadow-sm group"
                >
                  <div className="w-11 h-11 rounded-lg bg-black/50 border border-[#C6A15B]/40 text-[#E0C078] flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[9px] font-mono uppercase tracking-widest text-[#E0C078]">
                      ALTERNATE LINE
                    </div>
                    <div className="text-base font-mono font-bold text-[#FFF8ED] group-hover:text-[#E0C078] transition-colors">
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
                    className="flex items-center gap-4 p-4 rounded-xl bg-black/40 border border-[#C6A15B]/20 hover:border-[#E0C078] transition-all duration-300 shadow-sm group"
                  >
                    <div className="w-11 h-11 rounded-lg bg-black/50 border border-[#C6A15B]/40 text-[#E0C078] flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-[9px] font-mono uppercase tracking-widest text-[#E0C078]">
                        OFFICIAL EMAIL
                      </div>
                      <div className="text-xs font-mono text-[#FFF8ED] group-hover:text-[#E0C078] transition-colors break-all">
                        {siteConfig.contact.email}
                      </div>
                    </div>
                  </a>
                )}

                {/* Physical Workshop & Office Address */}
                <div className="flex items-start gap-4 p-4 rounded-xl bg-black/40 border border-white/10 shadow-sm">
                  <div className="w-11 h-11 rounded-lg bg-[#3B0D18] border border-[#C6A15B]/40 text-[#E0C078] flex items-center justify-center flex-shrink-0 mt-0.5 shadow-md">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[9px] font-mono uppercase tracking-widest text-[#E0C078]">
                      WORKSHOP & REGISTERED ADDRESS
                    </div>
                    <address className="not-italic text-xs text-[#F7F0E4]/85 leading-relaxed font-sans mt-0.5">
                      {siteConfig.location.address}
                    </address>
                  </div>
                </div>
              </div>

              {/* Direct WhatsApp CTA Button */}
              {whatsAppUrl && (
                <div className="pt-6">
                  <Button
                    variant="whatsapp"
                    size="lg"
                    href={whatsAppUrl ?? undefined}
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
            </SpatialFrame>
          </div>

          {/* Right Column: Interactive Consultation Request Form */}
          <div className="lg:col-span-7">
            <SpatialFrame
              label="STAGE PROPOSAL INTAKE"
              theme="dark"
              className="p-6 sm:p-8 lg:p-10"
            >
              <div className="mb-6">
                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#FFF8ED] mb-2">
                  Request a Custom Stage Proposal
                </h3>
                <p className="text-xs sm:text-sm text-[#F7F0E4]/75 font-light">
                  Share your event details and preferred decoration style. P.T. Selvam will review your requirements and respond with a personalized proposal.
                </p>
              </div>

              {/* Canonical Form Component */}
              <ContactForm />
            </SpatialFrame>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Contact;

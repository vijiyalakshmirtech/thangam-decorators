import React from 'react';
import { Container } from '../components/common/Container';
import { SectionHeading } from '../components/common/SectionHeading';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { SITE_CONTENT } from '../data/siteContent';
import { siteConfig } from '../config/site';
import { generateWhatsAppUrl, generateTelUrl } from '../utils/urlHelpers';
import { trackEvent } from '../lib/analytics';
import { 
  Sparkles, 
  Quote, 
  MessageCircle, 
  Phone,
  ArrowRight
} from 'lucide-react';

export interface AboutProps {
  id?: string;
  className?: string;
}

export const About: React.FC<AboutProps> = ({
  id = 'about',
  className = '',
}) => {
  const whatsAppUrl = generateWhatsAppUrl(
    `Hello P.T. Selvam, I would like to learn more about Thangam Decorators and discuss our upcoming stage setup.`
  );
  const telUrl = generateTelUrl(siteConfig.contact.phonePrimary);

  return (
    <section
      id={id}
      className={`py-16 sm:py-20 md:py-24 bg-[#F7F0E4] relative border-t border-[#6E1830]/15 ${className}`}
      aria-labelledby="about-heading"
    >
      {/* Subtle ambient radial lighting */}
      <div 
        className="absolute top-1/3 left-1/4 -translate-y-1/2 w-[700px] h-[400px] bg-[#8B3A4E]/5 blur-[150px] rounded-full pointer-events-none" 
        aria-hidden="true" 
      />

      <Container size="default" className="relative z-10">
        {/* Section Heading */}
        <SectionHeading
          eyebrow={SITE_CONTENT.about.eyebrow}
          title={SITE_CONTENT.about.heading}
          subtitle={`${siteConfig.brand.name} • ${siteConfig.brand.ownerName} • ${siteConfig.location.city}, Tamil Nadu`}
          description="A dedication to sacred Vedic traditions, bespoke structural sets, and authentic ceremonial magnificence."
          theme="light"
          className="mb-12 sm:mb-16"
        />

        {/* Editorial Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column: Brand Story & Founder Philosophy */}
          <div className="lg:col-span-6 flex flex-col justify-between h-full">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Badge variant="gold" icon={<Sparkles className="w-3 h-3 text-[#6E1830]" />}>
                  Proprietor-Led Artistry
                </Badge>
              </div>

              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#6E1830] leading-snug mb-4">
                Transforming Sacred Spaces into Royal Scenography
              </h3>

              <div className="space-y-4 text-xs sm:text-sm md:text-base text-[#1F161A]/80 leading-relaxed font-sans mb-8">
                {SITE_CONTENT.about.paragraphs.map((para, pIdx) => (
                  <p key={pIdx}>{para}</p>
                ))}
              </div>

              {/* Founder Quote Card */}
              <div className="relative rounded-2xl bg-[#FFF8ED] border border-[#6E1830]/20 p-5 sm:p-6 mb-8 shadow-md">
                <Quote className="w-8 h-8 text-[#6E1830]/20 absolute top-4 right-4 pointer-events-none" />
                <blockquote className="text-xs sm:text-sm font-serif italic text-[#1F161A]/90 leading-relaxed mb-4">
                  "{SITE_CONTENT.about.founderQuote}"
                </blockquote>
                <div className="pt-3 border-t border-[#6E1830]/15 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-[#6E1830] uppercase tracking-wider">
                      {SITE_CONTENT.about.founderTitle}
                    </div>
                    <div className="text-[11px] text-[#1F161A]/60 font-sans">
                      {siteConfig.brand.name} • {siteConfig.location.city}
                    </div>
                  </div>
                  <Badge variant="gold" className="text-[10px] hidden sm:inline-flex">
                    Master Craftsman
                  </Badge>
                </div>
              </div>
            </div>

            {/* Action CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Button
                variant="primary"
                size="md"
                href="#portfolio"
                rightIcon={<ArrowRight className="w-4 h-4 text-[#FFF8ED]" />}
                onClick={() =>
                  trackEvent('cta_click', {
                    sourceLocation: 'about_section',
                    ctaText: 'Explore Our Designs',
                  })
                }
              >
                Explore Our Designs
              </Button>

              {whatsAppUrl && (
                <Button
                  variant="whatsapp"
                  size="md"
                  href={whatsAppUrl}
                  target="_blank"
                  leftIcon={<MessageCircle className="w-4 h-4" />}
                  onClick={() =>
                    trackEvent('whatsapp_click', {
                      sourceLocation: 'about_section',
                    })
                  }
                >
                  Inquire on WhatsApp
                </Button>
              )}

              <Button
                variant="secondary"
                size="md"
                href={telUrl}
                leftIcon={<Phone className="w-4 h-4 text-[#6E1830]" />}
                onClick={() =>
                  trackEvent('phone_click', {
                    sourceLocation: 'about_section',
                  })
                }
                className="text-xs"
              >
                Call {siteConfig.contact.phonePrimary}
              </Button>
            </div>
          </div>

          {/* Right Column: 4 Core Pillars of Trust */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {SITE_CONTENT.about.pillars.map((pillar, idx) => (
              <article
                key={idx}
                className="luxury-cream-card group rounded-2xl bg-[#FFF8ED] border border-[#6E1830]/15 hover:border-[#6E1830] p-5 sm:p-6 flex flex-col justify-between transition-all duration-300 shadow-md"
              >
                <div>
                  <div className="w-10 h-10 rounded-lg bg-[#6E1830]/10 border border-[#6E1830]/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Sparkles className="w-5 h-5 text-[#6E1830]" />
                  </div>

                  <h4 className="text-base sm:text-lg font-serif font-bold text-[#6E1830] transition-colors mb-2">
                    {pillar.title}
                  </h4>

                  <p className="text-xs sm:text-sm text-[#1F161A]/75 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#6E1830]/15 flex items-center justify-between text-[11px] text-[#6E1830] font-serif">
                  <span>Pillar 0{idx + 1}</span>
                  <span className="text-[#1F161A]/40">• Execution Standard</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

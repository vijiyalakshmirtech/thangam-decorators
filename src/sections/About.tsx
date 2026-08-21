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
  Clock, 
  Flower2, 
  Layers, 
  ShieldCheck, 
  Quote, 
  MessageCircle, 
  Phone,
  ArrowRight
} from 'lucide-react';

export interface AboutProps {
  id?: string;
  className?: string;
}

const PILLAR_ICONS = [
  <Clock className="w-5 h-5 text-thangam-gold-400" />,
  <Flower2 className="w-5 h-5 text-thangam-gold-400" />,
  <Layers className="w-5 h-5 text-thangam-gold-400" />,
  <ShieldCheck className="w-5 h-5 text-thangam-gold-400" />,
];

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
      className={`py-16 sm:py-20 md:py-24 bg-thangam-dark-950 relative border-t border-white/5 ${className}`}
      aria-labelledby="about-heading"
    >
      {/* Subtle ambient gold radial lighting */}
      <div 
        className="absolute top-1/3 left-1/4 -translate-y-1/2 w-[700px] h-[400px] bg-thangam-gold-500/5 blur-[150px] rounded-full pointer-events-none" 
        aria-hidden="true" 
      />

      <Container size="default" className="relative z-10">
        {/* Section Heading */}
        <SectionHeading
          eyebrow={SITE_CONTENT.about.eyebrow}
          title={SITE_CONTENT.about.heading}
          subtitle={`${siteConfig.brand.name} • ${siteConfig.brand.ownerName} • ${siteConfig.location.city}, Tamil Nadu`}
          description="A dedication to sacred Vedic traditions, bespoke structural sets, and authentic ceremonial magnificence."
          className="mb-12 sm:mb-16"
        />

        {/* Editorial Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column: Brand Story & Founder Philosophy */}
          <div className="lg:col-span-6 flex flex-col justify-between h-full">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Badge variant="gold" icon={<Sparkles className="w-3 h-3" />}>
                  Proprietor-Led Artistry
                </Badge>
              </div>

              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-thangam-ivory-50 leading-snug mb-4">
                Transforming Sacred Spaces into Royal Scenography
              </h3>

              <div className="space-y-4 text-xs sm:text-sm md:text-base text-thangam-ivory-100/80 leading-relaxed font-sans mb-8">
                {SITE_CONTENT.about.paragraphs.map((para, pIdx) => (
                  <p key={pIdx}>{para}</p>
                ))}
              </div>

              {/* Founder Quote Card */}
              <div className="relative rounded-2xl bg-thangam-dark-900/90 border border-thangam-gold-500/25 p-5 sm:p-6 mb-8 shadow-xl">
                <Quote className="w-8 h-8 text-thangam-gold-500/20 absolute top-4 right-4 pointer-events-none" />
                <blockquote className="text-xs sm:text-sm font-serif italic text-thangam-ivory-50/90 leading-relaxed mb-4">
                  "{SITE_CONTENT.about.founderQuote}"
                </blockquote>
                <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-thangam-gold-300 uppercase tracking-wider">
                      {SITE_CONTENT.about.founderTitle}
                    </div>
                    <div className="text-[11px] text-thangam-ivory-100/60 font-sans">
                      {siteConfig.brand.name} • {siteConfig.location.city}
                    </div>
                  </div>
                  <Badge variant="emerald" className="text-[10px] hidden sm:inline-flex">
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
                rightIcon={<ArrowRight className="w-4 h-4" />}
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
                variant="ghost"
                size="md"
                href={telUrl}
                leftIcon={<Phone className="w-4 h-4 text-thangam-gold-400" />}
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
                className="luxury-card group rounded-xl bg-thangam-dark-900/80 border border-thangam-gold-500/20 hover:border-thangam-gold-500/50 p-5 sm:p-6 flex flex-col justify-between transition-all duration-300 shadow-lg"
              >
                <div>
                  <div className="w-10 h-10 rounded-lg bg-thangam-gold-500/10 border border-thangam-gold-500/25 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    {PILLAR_ICONS[idx] || <Sparkles className="w-5 h-5 text-thangam-gold-400" />}
                  </div>

                  <h4 className="text-base sm:text-lg font-serif font-bold text-thangam-ivory-50 group-hover:text-thangam-gold-300 transition-colors mb-2">
                    {pillar.title}
                  </h4>

                  <p className="text-xs sm:text-sm text-thangam-ivory-100/75 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-thangam-gold-400/80 font-serif">
                  <span>Pillar 0{idx + 1}</span>
                  <span className="text-thangam-ivory-100/40">• Execution Standard</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

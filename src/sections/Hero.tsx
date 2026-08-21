import React from 'react';
import { Container } from '../components/common/Container';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { ImageWrapper } from '../components/common/ImageWrapper';
import { siteConfig } from '../config/site';
import { generateWhatsAppUrl, generateTelUrl } from '../utils/urlHelpers';
import { trackEvent } from '../lib/analytics';
import { 
  Sparkles, 
  MessageCircle, 
  Phone, 
  ChevronDown, 
  MapPin, 
  ShieldCheck, 
  Flower2
} from 'lucide-react';

export interface HeroProps {
  id?: string;
  className?: string;
}

export const Hero: React.FC<HeroProps> = ({
  id = 'hero',
  className = '',
}) => {
  const whatsAppUrl = generateWhatsAppUrl(
    `Hello P.T. Selvam, I would like to inquire about wedding stage decoration for our upcoming event.`
  );
  const telUrl = generateTelUrl(siteConfig.contact.phonePrimary);

  const handlePrimaryCtaClick = () => {
    trackEvent('cta_click', {
      sourceLocation: 'hero_primary_cta',
      ctaText: 'Explore Collections',
    });
  };

  const handleWhatsAppClick = () => {
    trackEvent('whatsapp_click', {
      sourceLocation: 'hero_secondary_cta',
      intent: 'general_stage_inquiry',
    });
  };

  const handlePhoneClick = () => {
    trackEvent('phone_click', {
      sourceLocation: 'hero_call_cta',
    });
  };

  return (
    <section
      id={id}
      className={`relative min-h-[90vh] lg:min-h-screen flex items-center justify-center pt-28 pb-16 sm:pt-32 sm:pb-20 md:pt-36 md:pb-24 bg-thangam-dark-950 overflow-hidden ${className}`}
      aria-labelledby="hero-heading"
    >
      {/* Background ambient lighting effects */}
      <div 
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[900px] h-[350px] sm:h-[500px] bg-thangam-gold-500/10 blur-[140px] rounded-full pointer-events-none" 
        aria-hidden="true" 
      />
      <div 
        className="absolute top-10 right-10 w-[300px] h-[300px] bg-thangam-emerald-700/10 blur-[100px] rounded-full pointer-events-none" 
        aria-hidden="true" 
      />

      <Container size="default" className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Hero Editorial Copy */}
          <div className="lg:col-span-7 text-center lg:text-left flex flex-col items-center lg:items-start">
            {/* Eyebrow Badge */}
            <div className="mb-4 sm:mb-6">
              <Badge variant="gold" icon={<Sparkles className="w-3.5 h-3.5" />}>
                Bespoke Stage Scenography & Floral Artistry
              </Badge>
            </div>

            {/* Main Primary Headline */}
            <h1
              id="hero-heading"
              className="text-3xl sm:text-5xl md:text-6xl font-serif font-bold text-thangam-ivory-50 tracking-tight leading-[1.12] mb-4 sm:mb-6"
            >
              Crafting Grandeur for Your{' '}
              <span className="text-thangam-gold-400 font-serif italic">
                Most Sacred Celebrations
              </span>
            </h1>

            {/* Value Proposition / Subheadline */}
            <p className="text-sm sm:text-base md:text-lg text-thangam-ivory-100/80 max-w-2xl leading-relaxed mb-6 sm:mb-8 font-sans">
              Led by <strong className="text-thangam-gold-300 font-semibold">{siteConfig.brand.ownerName}</strong>,{' '}
              {siteConfig.brand.name} transforms traditional wedding mandapams, grand reception halls, and intimate family ceremonies into magnificent royal stages across Erode and Western Tamil Nadu.
            </p>

            {/* Action Buttons Group */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4 w-full sm:w-auto mb-8 sm:mb-10">
              <Button
                variant="primary"
                size="lg"
                href="#portfolio"
                leftIcon={<Sparkles className="w-4 h-4" />}
                onClick={handlePrimaryCtaClick}
                className="w-full sm:w-auto"
              >
                Explore Collections
              </Button>

              {whatsAppUrl && (
                <Button
                  variant="whatsapp"
                  size="lg"
                  href={whatsAppUrl}
                  target="_blank"
                  leftIcon={<MessageCircle className="w-4 h-4" />}
                  onClick={handleWhatsAppClick}
                  className="w-full sm:w-auto"
                >
                  Inquire on WhatsApp
                </Button>
              )}

              <Button
                variant="ghost"
                size="lg"
                href={telUrl}
                leftIcon={<Phone className="w-4 h-4 text-thangam-gold-400" />}
                onClick={handlePhoneClick}
                className="w-full sm:w-auto text-xs sm:text-sm"
              >
                Call {siteConfig.contact.phonePrimary}
              </Button>
            </div>

            {/* Factual Trust Indicators */}
            <div className="pt-6 border-t border-white/10 w-full grid grid-cols-2 sm:grid-cols-3 gap-4 text-left">
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-thangam-gold-400 flex-shrink-0" />
                <div>
                  <div className="text-xs font-semibold text-thangam-ivory-50">Proprietor Led</div>
                  <div className="text-[11px] text-thangam-ivory-100/60 font-serif">P.T. Selvam Supervision</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Flower2 className="w-4 h-4 text-thangam-gold-400 flex-shrink-0" />
                <div>
                  <div className="text-xs font-semibold text-thangam-ivory-50">Fresh Florals</div>
                  <div className="text-[11px] text-thangam-ivory-100/60 font-serif">Direct Daily Sourcing</div>
                </div>
              </div>

              <div className="col-span-2 sm:col-span-1 flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-thangam-gold-400 flex-shrink-0" />
                <div>
                  <div className="text-xs font-semibold text-thangam-ivory-50">Erode & Kongu</div>
                  <div className="text-[11px] text-thangam-ivory-100/60 font-serif">Regional Execution</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Authentic Luxury Visual Card */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-lg lg:max-w-none">
              {/* Outer decorative ambient frame */}
              <div className="absolute -inset-1.5 bg-gradient-to-tr from-thangam-gold-600/30 via-thangam-gold-400/20 to-transparent rounded-3xl blur-sm" />

              <div className="relative rounded-2xl overflow-hidden border border-thangam-gold-500/30 bg-thangam-dark-900 shadow-2xl">
                {/* Authentic Primary Hero Photograph */}
                <ImageWrapper
                  src="/assets/portfolio/hero/hero-primary.webp"
                  alt="Grand golden wedding reception stage with circular floral arch and royal seating by Thangam Decorators"
                  aspectRatio="16/9"
                  priority={true}
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700 ease-out"
                />

                {/* Ambient dark gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-thangam-dark-950/90 via-transparent to-transparent pointer-events-none" />

                {/* Bottom Overlay Card Details */}
                <div className="absolute bottom-0 inset-x-0 p-4 sm:p-5 flex items-end justify-between gap-3 pointer-events-none">
                  <div>
                    <span className="text-[10px] font-semibold tracking-wider uppercase text-thangam-gold-400 block mb-1">
                      Grand Reception Stage
                    </span>
                    <p className="text-sm font-serif font-bold text-thangam-ivory-50 leading-tight">
                      Circular Floral Arch & Royal Candelabras
                    </p>
                    <span className="text-[11px] text-thangam-ivory-100/70 font-sans block mt-0.5">
                      Executed in Erode, Tamil Nadu
                    </span>
                  </div>

                  <Badge variant="emerald" className="text-[10px] px-2 py-0.5 whitespace-nowrap">
                    Authentic Setup
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Cue Towards Portfolio */}
        <div className="mt-12 sm:mt-16 flex justify-center">
          <a
            href="#portfolio"
            aria-label="Scroll down to Portfolio gallery"
            className="group flex flex-col items-center gap-2 text-xs font-serif text-thangam-ivory-100/50 hover:text-thangam-gold-300 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-thangam-gold-400 rounded-full p-2"
          >
            <span className="tracking-widest uppercase text-[10px]">Explore Collections</span>
            <ChevronDown className="w-4 h-4 text-thangam-gold-400 animate-bounce group-hover:text-thangam-gold-300 transition-colors" />
          </a>
        </div>
      </Container>
    </section>
  );
};

import React from 'react';
import { Container } from '../components/common/Container';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { MagneticButton } from '../components/common/MagneticButton';
import { ImageWrapper } from '../components/common/ImageWrapper';
import { Stage3DCanvas } from '../components/3d/Stage3DCanvas';
import { siteConfig } from '../config/site';
import { generateWhatsAppUrl, generateTelUrl } from '../utils/urlHelpers';
import { trackEvent } from '../lib/analytics';
import {
  Sparkles,
  MessageCircle,
  Phone,
  ChevronDown,
  ShieldCheck,
  Flower2,
  Crown
} from 'lucide-react';

export interface HeroProps {
  id?: string;
  className?: string;
  onOpenQuoteModal?: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  id = 'hero',
  className = '',
  onOpenQuoteModal,
}) => {
  const whatsAppUrl = generateWhatsAppUrl(
    `Hello P.T. Selvam, I would like to inquire about wedding stage decoration for our upcoming event.`
  );
  const telUrl = generateTelUrl(siteConfig.contact.phonePrimary);

  return (
    <section
      id={id}
      className={`relative min-h-[92vh] lg:min-h-screen flex items-center justify-center pt-28 pb-16 sm:pt-36 sm:pb-24 bg-[#F7F0E4] overflow-hidden ${className}`}
      aria-labelledby="hero-heading"
    >
      {/* 3D Depth Canvas & Atmospheric Background */}
      <Stage3DCanvas className="z-0" />

      {/* Ambient Luxury Gradients */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[900px] h-[350px] sm:h-[500px] bg-[#C9A45C]/12 blur-[140px] rounded-full pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute top-10 right-10 w-[350px] h-[350px] bg-[#6E1830]/8 blur-[120px] rounded-full pointer-events-none"
        aria-hidden="true"
      />

      <Container size="default" className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          {/* Left Column: Hero Luxury Typography & Dual Language Branding */}
          <div className="lg:col-span-7 text-center lg:text-left flex flex-col items-center lg:items-start">

            {/* Dual Language Tamil & English Eyebrow Badge */}
            <div className="mb-4 sm:mb-6 flex flex-wrap items-center justify-center lg:justify-start gap-2">
              <Badge variant="gold" icon={<Crown className="w-3.5 h-3.5 text-[#6E1830]" />}>
                Bespoke Luxury Event Décor
              </Badge>
              <span className="font-tamil text-xs font-semibold text-[#6E1830] bg-[#FFFDF8] px-3 py-1 rounded-full border border-[#C9A45C]/40">
                தங்கம் டெக்கரேட்டர்ஸ்
              </span>
            </div>

            {/* Tamil Service Badge & Heritage Identity */}
            <div className="font-tamil text-sm sm:text-base font-semibold text-[#C9A45C] tracking-wide mb-2">
              மேடை அலங்காரம் • திருமண முகூர்த்த மண்டபங்கள்
            </div>

            {/* Main Primary Headline */}
            <h1
              id="hero-heading"
              className="text-4xl sm:text-6xl md:text-7xl font-serif font-medium text-[#6E1830] tracking-tight leading-[1.08] mb-5 sm:mb-6"
            >
              Crafting Extraordinary Stages for{' '}
              <span className="font-serif italic text-[#C9A45C] block sm:inline">
                Extraordinary Moments.
              </span>
            </h1>

            {/* Value Proposition / Subheadline */}
            <p className="text-base sm:text-lg text-[#1F161A]/80 max-w-2xl leading-relaxed mb-8 sm:mb-10 font-light">
              Led by master artisan <strong className="text-[#6E1830] font-semibold">{siteConfig.brand.ownerName}</strong>,{' '}
              {siteConfig.brand.name} curates breathtaking architectural mandapams, imperial reception stages, and fresh floral scenography across Erode and Western Tamil Nadu.
            </p>

            {/* Action Buttons Group */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4 w-full sm:w-auto mb-10">
              {onOpenQuoteModal && (
                <MagneticButton strength={0.3}>
                  <Button
                    variant="primary"
                    size="lg"
                    onClick={() => {
                      trackEvent('cta_click', { sourceLocation: 'hero_primary', ctaText: 'Book Your Event' });
                      onOpenQuoteModal();
                    }}
                    leftIcon={<Sparkles className="w-4 h-4 text-[#C9A45C]" />}
                    className="w-full sm:w-auto uppercase tracking-wider text-xs font-bold"
                  >
                    Book Your Event
                  </Button>
                </MagneticButton>
              )}

              <Button
                variant="secondary"
                size="lg"
                href="#portfolio"
                leftIcon={<Sparkles className="w-4 h-4 text-[#6E1830]" />}
                className="w-full sm:w-auto uppercase tracking-wider text-xs font-semibold"
                onClick={() => trackEvent('cta_click', { sourceLocation: 'hero_secondary', ctaText: 'Explore Our Work' })}
              >
                Explore Our Work
              </Button>

              {whatsAppUrl && (
                <Button
                  variant="whatsapp"
                  size="lg"
                  href={whatsAppUrl}
                  target="_blank"
                  leftIcon={<MessageCircle className="w-4 h-4" />}
                  onClick={() => trackEvent('whatsapp_click', { sourceLocation: 'hero_whatsapp' })}
                  className="w-full sm:w-auto text-xs uppercase tracking-wider font-semibold"
                >
                  WhatsApp Inquiry
                </Button>
              )}

              <Button
                variant="ghost"
                size="lg"
                href={telUrl}
                leftIcon={<Phone className="w-4 h-4 text-[#6E1830]" />}
                onClick={() => trackEvent('phone_click', { sourceLocation: 'hero_call' })}
                className="w-full sm:w-auto text-xs uppercase tracking-wider text-[#6E1830] hover:text-[#4A1022] font-semibold"
              >
                Call {siteConfig.contact.phonePrimary}
              </Button>
            </div>

            {/* Factual Trust Indicators */}
            <div className="pt-6 border-t border-[#C9A45C]/30 w-full grid grid-cols-2 sm:grid-cols-3 gap-4 text-left">
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-[#6E1830] flex-shrink-0" />
                <div>
                  <div className="text-xs font-semibold text-[#6E1830]">25+ Years Experience</div>
                  <div className="text-[11px] text-[#1F161A]/70 font-serif">P.T. Selvam Direct Supervision</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Flower2 className="w-4 h-4 text-[#6E1830] flex-shrink-0" />
                <div>
                  <div className="text-xs font-semibold text-[#6E1830]">Daily Fresh Florals</div>
                  <div className="text-[11px] text-[#1F161A]/70 font-serif">Direct Morning Sourcing</div>
                </div>
              </div>

              <div className="col-span-2 sm:col-span-1 flex items-center gap-2.5">
                <Crown className="w-4 h-4 text-[#6E1830] flex-shrink-0" />
                <div>
                  <div className="text-xs font-semibold text-[#6E1830]">In-House Inventory</div>
                  <div className="text-[11px] text-[#1F161A]/70 font-serif">100% Reliable Execution</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Authentic Luxury Visual Card with 3D Depth */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-lg lg:max-w-none group">
              {/* Outer decorative gold accent halo */}
              <div className="absolute -inset-2 bg-gradient-to-tr from-[#6E1830]/20 via-[#C9A45C]/30 to-transparent rounded-3xl blur-md group-hover:blur-lg transition-all duration-500" />

              <div className="relative rounded-2xl overflow-hidden border border-[#C9A45C]/50 bg-[#FFFDF8] shadow-[0_15px_50px_rgba(110,24,48,0.12)]">
                {/* Authentic Primary Hero Photograph */}
                <ImageWrapper
                  src="/assets/portfolio/hero/hero-primary.webp"
                  alt="Grand golden wedding reception stage with circular floral arch and royal seating by Thangam Decorators"
                  aspectRatio="16/9"
                  priority={true}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                />

                {/* Ambient Subtle Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#300713]/85 via-transparent to-transparent pointer-events-none" />

                {/* Bottom Overlay Card Details */}
                <div className="absolute bottom-0 inset-x-0 p-5 flex items-end justify-between gap-3 pointer-events-none">
                  <div>
                    <span className="text-[10px] font-semibold tracking-widest uppercase text-[#C9A45C] block mb-1">
                      Grand Reception Scenography
                    </span>
                    <p className="text-base font-serif font-bold text-[#FFFDF8] leading-tight">
                      Circular Floral Arch & Royal Candelabras
                    </p>
                    <span className="text-[11px] text-[#F7F0E4]/80 font-sans block mt-0.5">
                      Executed in Erode, Tamil Nadu
                    </span>
                  </div>

                  <Badge variant="gold" className="text-[10px] px-2.5 py-0.5 whitespace-nowrap bg-[#FFFDF8] text-[#6E1830]">
                    Authentic Setup
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Cue Towards Brand Intro */}
        <div className="mt-14 sm:mt-18 flex justify-center">
          <a
            href="#brand-intro"
            aria-label="Scroll down to explore Thangam Decorators"
            className="group flex flex-col items-center gap-2 text-xs font-serif text-[#6E1830]/70 hover:text-[#6E1830] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A45C] rounded-full p-2"
          >
            <span className="tracking-[0.25em] uppercase text-[9px] font-semibold">Discover Our Artistry</span>
            <ChevronDown className="w-4 h-4 text-[#C9A45C] animate-bounce group-hover:text-[#6E1830] transition-colors" />
          </a>
        </div>
      </Container>
    </section>
  );
};

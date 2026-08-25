import React from 'react';
import { Container } from '../components/common/Container';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { MagneticButton } from '../components/common/MagneticButton';
import { ImageWrapper } from '../components/common/ImageWrapper';
import { Stage3DCanvas } from '../components/3d/Stage3DCanvas';
import { siteConfig } from '../config/site';
import { SITE_CONTENT } from '../data/siteContent';
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
      className={`relative min-h-[92vh] lg:min-h-screen flex items-center justify-center pt-28 pb-16 sm:pt-36 sm:pb-24 bg-gradient-to-b from-[#4A0E1B] via-[#5A1426] to-[#6E1830] text-[#FFF8ED] overflow-hidden ${className}`}
      aria-labelledby="hero-heading"
    >
      {/* 3D Depth Canvas & Atmospheric Background */}
      <Stage3DCanvas className="z-0" />

      {/* Ambient Luxury Gradients */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[900px] h-[350px] sm:h-[500px] bg-[#8B3A4E]/20 blur-[150px] rounded-full pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute top-10 right-10 w-[350px] h-[350px] bg-[#7A1F3D]/30 blur-[130px] rounded-full pointer-events-none"
        aria-hidden="true"
      />

      <Container size="default" className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          {/* Left Column: Hero Luxury Typography & Dual Language Branding */}
          <div className="lg:col-span-7 text-center lg:text-left flex flex-col items-center lg:items-start">

            {/* Dual Language Tamil & English Eyebrow Badge */}
            <div className="mb-4 sm:mb-6 flex flex-wrap items-center justify-center lg:justify-start gap-2">
              <Badge variant="dark" icon={<Crown className="w-3.5 h-3.5 text-[#FFF8ED]" />}>
                {SITE_CONTENT.hero.badge}
              </Badge>
              <span className="font-tamil text-xs font-semibold text-[#FFF8ED] bg-[#5A1426] px-3 py-1 rounded-full border border-white/20">
                தங்கம் டெக்கரேட்டர்ஸ்
              </span>
            </div>

            {/* Tamil Service Badge & Heritage Identity */}
            <div className="font-tamil text-sm sm:text-base font-semibold text-[#FFF8ED]/90 tracking-wide mb-2">
              மேடை அலங்காரம் • திருமண முகூர்த்த மண்டபங்கள்
            </div>

            {/* Main Primary Headline */}
            <h1
              id="hero-heading"
              className="text-4xl sm:text-6xl md:text-7xl font-serif font-medium text-[#FFF8ED] tracking-tight leading-[1.08] mb-5 sm:mb-6"
            >
              Crafting Grandeur for Your{' '}
              <span className="font-serif italic text-[#FFF8ED] block sm:inline">
                Most Sacred Celebrations.
              </span>
            </h1>

            {/* Value Proposition / Subheadline */}
            <p className="text-base sm:text-lg text-[#F7F0E4]/85 max-w-2xl leading-relaxed mb-8 sm:mb-10 font-light">
              Led by <strong className="text-[#FFF8ED] font-semibold">{siteConfig.brand.ownerName}</strong>,{' '}
              {siteConfig.brand.name} transforms wedding mandapams, reception halls, and family ceremonies into magnificent royal stages across Erode and Western Tamil Nadu.
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
                    leftIcon={<Sparkles className="w-4 h-4 text-[#4A0E1B]" />}
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
                {SITE_CONTENT.hero.primaryCtaText}
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
                leftIcon={<Phone className="w-4 h-4 text-[#FFF8ED]" />}
                onClick={() => trackEvent('phone_click', { sourceLocation: 'hero_call' })}
                className="w-full sm:w-auto text-xs uppercase tracking-wider text-[#FFF8ED] hover:text-[#FFF8ED] font-semibold"
              >
                Call {siteConfig.contact.phonePrimary}
              </Button>
            </div>

            {/* Factual Trust Indicators */}
            <div className="pt-6 border-t border-white/20 w-full grid grid-cols-2 sm:grid-cols-3 gap-4 text-left">
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-[#FFF8ED] flex-shrink-0" />
                <div>
                  <div className="text-xs font-semibold text-[#FFF8ED]">Master Scenography</div>
                  <div className="text-[11px] text-[#F7F0E4]/70 font-serif">P.T. Selvam Direct Supervision</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Flower2 className="w-4 h-4 text-[#FFF8ED] flex-shrink-0" />
                <div>
                  <div className="text-xs font-semibold text-[#FFF8ED]">Daily Fresh Florals</div>
                  <div className="text-[11px] text-[#F7F0E4]/70 font-serif">Direct Morning Sourcing</div>
                </div>
              </div>

              <div className="col-span-2 sm:col-span-1 flex items-center gap-2.5">
                <Crown className="w-4 h-4 text-[#FFF8ED] flex-shrink-0" />
                <div>
                  <div className="text-xs font-semibold text-[#FFF8ED]">In-House Inventory</div>
                  <div className="text-[11px] text-[#F7F0E4]/70 font-serif">100% Punctual Execution</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Authentic Luxury Visual Card with 3D Depth */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-lg lg:max-w-none group">
              {/* Outer decorative accent halo */}
              <div className="absolute -inset-2 bg-gradient-to-tr from-[#6E1830]/40 via-[#8B3A4E]/30 to-transparent rounded-3xl blur-md group-hover:blur-lg transition-all duration-500" />

              <div className="relative rounded-2xl overflow-hidden border border-white/20 bg-[#4A0E1B] shadow-[0_15px_50px_rgba(74,14,27,0.4)]">
                {/* Authentic Primary Hero Photograph */}
                <ImageWrapper
                  src="/assets/portfolio/hero/hero-primary.webp"
                  alt="Grand golden wedding reception stage with circular floral arch and royal seating by Thangam Decorators"
                  aspectRatio="16/9"
                  priority={true}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                />

                {/* Ambient Subtle Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#4A0E1B]/90 via-transparent to-transparent pointer-events-none" />

                {/* Bottom Overlay Card Details */}
                <div className="absolute bottom-0 inset-x-0 p-5 flex items-end justify-between gap-3 pointer-events-none">
                  <div>
                    <span className="text-[10px] font-semibold tracking-widest uppercase text-[#FFF8ED]/90 block mb-1">
                      Grand Reception Scenography
                    </span>
                    <p className="text-base font-serif font-bold text-[#FFF8ED] leading-tight">
                      Circular Floral Arch & Royal Candelabras
                    </p>
                    <span className="text-[11px] text-[#F7F0E4]/80 font-sans block mt-0.5">
                      Executed in Erode, Tamil Nadu
                    </span>
                  </div>

                  <Badge variant="gold" className="text-[10px] px-2.5 py-0.5 whitespace-nowrap bg-[#FFF8ED] text-[#6E1830]">
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
            href="#about"
            aria-label="Scroll down to explore Thangam Decorators"
            className="group flex flex-col items-center gap-2 text-xs font-serif text-[#F7F0E4]/70 hover:text-[#FFF8ED] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-full p-2"
          >
            <span className="tracking-[0.25em] uppercase text-[9px] font-semibold">Discover Our Artistry</span>
            <ChevronDown className="w-4 h-4 text-[#FFF8ED] animate-bounce group-hover:text-[#FFF8ED] transition-colors" />
          </a>
        </div>
      </Container>
    </section>
  );
};

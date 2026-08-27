'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Container } from '../components/common/Container';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { MagneticButton } from '../components/common/MagneticButton';
import { TechLabel } from '../components/common/TechLabel';
import { SpatialFrame } from '../components/common/SpatialFrame';
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
  Crown,
  Compass,
  Layers
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
  const sectionRef = useRef<HTMLElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const totalScrollable = rect.height;
      const scrolled = Math.max(0, -rect.top);
      const progress = Math.min(1, Math.max(0, scrolled / (totalScrollable || windowHeight)));
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const whatsAppUrl = generateWhatsAppUrl(
    siteConfig.contact.phonePrimary,
    'Vanakkam Thangam Decorators, I would like to inquire about wedding stage decoration for our upcoming event.'
  );
  const telUrl = generateTelUrl(siteConfig.contact.phonePrimary);

  // Stage Scenography State Determination based on scroll progress
  const getStageState = () => {
    if (scrollProgress < 0.25) return { stage: '01/04', title: 'BLUEPRINT MATRIX', desc: 'Vedic Ground Geometry' };
    if (scrollProgress < 0.55) return { stage: '02/04', title: 'VEDIC STRUCTURE', desc: 'Handcrafted Gold Pillars' };
    if (scrollProgress < 0.80) return { stage: '03/04', title: 'FLORAL SCENOGRAPHY', desc: 'Madurai Jasmine Torana' };
    return { stage: '04/04', title: 'ROYAL SANCTUM', desc: 'Completed Stage Sanctum' };
  };

  const currentStage = getStageState();

  return (
    <section
      ref={sectionRef}
      id={id}
      className={`relative min-h-[95vh] lg:min-h-screen flex items-center justify-center pt-32 pb-20 sm:pt-40 sm:pb-28 bg-gradient-to-b from-[#3B0D18] via-[#4A0E1B] to-[#5A1426] text-[#FFF8ED] overflow-hidden ${className}`}
      aria-labelledby="hero-heading"
    >
      {/* 3D WebGL Depth Stage Canvas with Scroll Progress Binding */}
      <Stage3DCanvas scrollProgress={scrollProgress} className="z-0" />

      {/* Architectural Studio Grid & Atmospheric Glows */}
      <div className="absolute inset-0 studio-grid-overlay pointer-events-none opacity-40" aria-hidden="true" />
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[1000px] h-[350px] sm:h-[550px] bg-[#7A1F3D]/25 blur-[160px] rounded-full pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute top-16 right-16 w-[400px] h-[400px] bg-[#C6A15B]/15 blur-[140px] rounded-full pointer-events-none"
        aria-hidden="true"
      />

      <Container size="wide" className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          {/* Left Column: Digital Studio Scenography Typography & CTAs */}
          <div className="lg:col-span-7 text-center lg:text-left flex flex-col items-center lg:items-start">
            
            {/* Digital Studio Coordinate Pill & Brand Tag */}
            <div className="mb-4 sm:mb-6 flex flex-wrap items-center justify-center lg:justify-start gap-2.5">
              <TechLabel variant="gold" icon={<Compass className="w-3.5 h-3.5" />}>
                11.3410° N, 77.7172° E • ERODE STUDIO LAB
              </TechLabel>
              <span className="font-tamil text-xs font-semibold text-[#E0C078] bg-[#3B0D18]/90 px-3 py-1 rounded-full border border-[#C6A15B]/30 backdrop-blur-sm">
                தங்கம் டெக்கரேட்டர்ஸ்
              </span>
            </div>

            {/* Tamil Heritage Eyebrow */}
            <div className="font-tamil text-sm sm:text-base font-semibold text-[#E0C078] tracking-wide mb-3">
              மேடை அலங்காரம் • பாரம்பரிய முகூர்த்த மண்டபங்கள் • வரவேற்பு மேடைகள்
            </div>

            {/* Main Primary Editorial Headline */}
            <h1
              id="hero-heading"
              className="text-4xl sm:text-6xl md:text-7xl font-serif font-medium text-[#FFF8ED] tracking-tight leading-[1.08] mb-5 sm:mb-6"
            >
              Crafting Grandeur for Your{' '}
              <span className="font-serif italic text-[#E0C078] block sm:inline">
                Most Sacred Celebrations.
              </span>
            </h1>

            {/* Subheadline / Value Proposition */}
            <p className="text-base sm:text-lg text-[#F7F0E4]/85 max-w-2xl leading-relaxed mb-8 sm:mb-10 font-light">
              Led by <strong className="text-[#FFF8ED] font-semibold">{siteConfig.brand.ownerName}</strong>,{' '}
              {siteConfig.brand.name} elevates wedding mandapams, reception scenography, and family ceremonies into magnificent architectural realms across Erode and Western Tamil Nadu.
            </p>

            {/* Floating Action Controls Group */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4 w-full sm:w-auto mb-8">
              {onOpenQuoteModal && (
                <MagneticButton strength={0.3}>
                  <Button
                    variant="primary"
                    size="lg"
                    onClick={() => {
                      trackEvent('cta_click', { sourceLocation: 'hero_primary', ctaText: 'Inquire Stage' });
                      onOpenQuoteModal();
                    }}
                    leftIcon={<Sparkles className="w-4 h-4 text-[#3B0D18]" />}
                    className="w-full sm:w-auto uppercase tracking-wider text-xs font-bold shadow-gold-md"
                  >
                    Inquire Scenography
                  </Button>
                </MagneticButton>
              )}

              <Button
                variant="secondary"
                size="lg"
                href="#portfolio"
                leftIcon={<Sparkles className="w-4 h-4 text-[#E0C078]" />}
                className="w-full sm:w-auto uppercase tracking-wider text-xs font-semibold border-[#C6A15B]/30 hover:border-[#E0C078]"
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
                leftIcon={<Phone className="w-4 h-4 text-[#E0C078]" />}
                onClick={() => trackEvent('phone_click', { sourceLocation: 'hero_call' })}
                className="w-full sm:w-auto text-xs font-mono uppercase tracking-wider text-[#FFF8ED] hover:text-[#E0C078] font-semibold"
              >
                Call {siteConfig.contact.phonePrimary}
              </Button>
            </div>

            {/* Factual Trust & Scenography Standards */}
            <div className="pt-6 border-t border-white/15 w-full grid grid-cols-2 sm:grid-cols-3 gap-4 text-left">
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-[#E0C078] flex-shrink-0" />
                <div>
                  <div className="text-xs font-semibold text-[#FFF8ED]">Master Scenography</div>
                  <div className="text-[11px] text-[#F7F0E4]/70 font-mono">P.T. Selvam Direct Oversight</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Flower2 className="w-4 h-4 text-[#E0C078] flex-shrink-0" />
                <div>
                  <div className="text-xs font-semibold text-[#FFF8ED]">Daily Fresh Florals</div>
                  <div className="text-[11px] text-[#F7F0E4]/70 font-mono">Direct Dawn Harvest Sourcing</div>
                </div>
              </div>

              <div className="col-span-2 sm:col-span-1 flex items-center gap-2.5">
                <Crown className="w-4 h-4 text-[#E0C078] flex-shrink-0" />
                <div>
                  <div className="text-xs font-semibold text-[#FFF8ED]">In-House Inventory</div>
                  <div className="text-[11px] text-[#F7F0E4]/70 font-mono">100% Punctual Delivery</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Architectural Framed Stage Preview & Real-Time Stage HUD */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="relative w-full max-w-lg lg:max-w-none">
              <SpatialFrame
                label={`STAGE SCENOGRAPHY // ${currentStage.stage}`}
                theme="dark"
                className="p-3 sm:p-4"
              >
                <div className="relative rounded-xl overflow-hidden border border-[#C6A15B]/30 bg-[#3B0D18] group">
                  <img
                    src="/assets/portfolio/hero/hero-primary.webp"
                    alt="Grand golden wedding reception stage with circular floral arch and royal seating by Thangam Decorators"
                    className="w-full aspect-[16/10] object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                  />

                  {/* Gradient Light Vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#3B0D18]/95 via-transparent to-transparent pointer-events-none" />

                  {/* Spatial Overlay Metadata */}
                  <div className="absolute bottom-0 inset-x-0 p-4 sm:p-5 flex items-end justify-between gap-3 pointer-events-none">
                    <div>
                      <span className="text-[9px] font-mono tracking-widest uppercase text-[#E0C078] block mb-1">
                        GRAND RECEPTION SCENOGRAPHY
                      </span>
                      <p className="text-base font-serif font-bold text-[#FFF8ED] leading-tight">
                        Circular Floral Arch & Royal Candelabras
                      </p>
                      <span className="text-[10px] font-mono text-[#F7F0E4]/75 block mt-0.5">
                        Executed in Erode, Tamil Nadu
                      </span>
                    </div>

                    <span className="text-[9px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#E0C078] text-[#3B0D18] font-bold">
                      AUTHENTIC
                    </span>
                  </div>
                </div>

                {/* Real-time 3D Engine HUD State */}
                <div className="mt-3 px-2 py-2 rounded-lg bg-black/40 border border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Layers className="w-3.5 h-3.5 text-[#E0C078]" />
                    <span className="text-[10px] font-mono text-[#FFF8ED]">
                      {currentStage.title}
                    </span>
                  </div>
                  <div className="text-[9px] font-mono text-[#E0C078]">
                    {currentStage.desc}
                  </div>
                </div>
              </SpatialFrame>
            </div>
          </div>
        </div>

        {/* Scroll Cue Towards About / Studio Narrative */}
        <div className="mt-14 sm:mt-18 flex justify-center">
          <a
            href="#about"
            aria-label="Scroll down to explore Thangam Decorators studio"
            className="group flex flex-col items-center gap-2 text-xs font-mono text-[#F7F0E4]/70 hover:text-[#E0C078] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E0C078] rounded-full p-2"
          >
            <span className="tracking-[0.25em] uppercase text-[9px] font-medium">EXPLORE STUDIO DISCIPLINES</span>
            <ChevronDown className="w-4 h-4 text-[#E0C078] animate-bounce group-hover:text-[#FFF8ED] transition-colors" />
          </a>
        </div>
      </Container>
    </section>
  );
};

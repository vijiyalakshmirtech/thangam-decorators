'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Container } from '../components/common/Container';
import { Button } from '../components/common/Button';
import { MagneticButton } from '../components/common/MagneticButton';
import { TechLabel } from '../components/common/TechLabel';
import { SpatialFrame } from '../components/common/SpatialFrame';
import { Stage3DCanvas } from '../components/3d/Stage3DCanvas';
import { siteConfig } from '../config/site';
import { generateWhatsAppUrl, generateTelUrl } from '../utils/urlHelpers';
import { trackEvent } from '../lib/analytics';
import {
  ArrowRight,
  ArrowUpRight,
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

const STAGE_PRESETS = [
  { id: 0, number: '01', name: 'VEDIC', title: 'VEDIC MANDAPAM', tag: 'Traditional Temple Architecture' },
  { id: 1, number: '02', name: 'IMPERIAL', title: 'IMPERIAL RECEPTION', tag: 'Circular Grandeur & Arch' },
  { id: 2, number: '03', name: 'FLORAL', title: 'FLORAL SCENOGRAPHY', tag: 'Madurai Jasmine Torana' },
  { id: 3, number: '04', name: 'SANCTUM', title: 'ROYAL SANCTUM', tag: 'Completed Sacred Stage' },
];

export const Hero: React.FC<HeroProps> = ({
  id = 'hero',
  className = '',
  onOpenQuoteModal,
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activePreset, setActivePreset] = useState(0);

  // Damped scroll progress calculation for Blueprint -> Reality progression
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
    'Vanakkam P.T. Selvam, I would like to inquire about wedding stage decoration consultation.'
  );
  const telUrl = generateTelUrl(siteConfig.contact.phonePrimary);

  // Scenography State Determination based on scroll progress
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
      className={`relative min-h-[95vh] lg:min-h-screen flex items-center justify-center pt-32 pb-16 sm:pt-36 sm:pb-24 bg-gradient-to-b from-[#16070B] via-[#240A12] to-[#350D19] text-[#FFF8ED] overflow-hidden ${className}`}
      aria-labelledby="hero-heading"
    >
      {/* 3D WebGL Depth Stage Canvas with Scroll & Preset Binding */}
      <Stage3DCanvas scrollProgress={scrollProgress} activePreset={activePreset} className="z-0" />

      {/* Atmospheric Cinematic Lighting & Micro Texture */}
      <div className="absolute inset-0 studio-grid-overlay pointer-events-none opacity-20" aria-hidden="true" />
      <div
        className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] sm:w-[800px] h-[300px] sm:h-[450px] bg-[#7A1F3D]/20 blur-[160px] rounded-full pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute top-20 right-10 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] bg-[#C6A15B]/10 blur-[150px] rounded-full pointer-events-none"
        aria-hidden="true"
      />

      <Container size="wide" className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* ============================================================ */}
          {/* LEFT COLUMN: FOREGROUND EDITORIAL CONTENT SAFE ZONE (43%)   */}
          {/* ============================================================ */}
          <div className="lg:col-span-7 text-center lg:text-left flex flex-col items-center lg:items-start">
            
            {/* Location & Studio Micro Badge */}
            <div className="mb-3.5 sm:mb-5 flex flex-wrap items-center justify-center lg:justify-start gap-2.5">
              <TechLabel variant="gold" icon={<Compass className="w-3.5 h-3.5" />}>
                11.3410° N, 77.7172° E • ERODE STUDIO
              </TechLabel>
              <span className="text-[10px] font-mono tracking-widest text-[#E0C078] uppercase px-3 py-1 rounded-full bg-black/40 border border-[#C6A15B]/30 backdrop-blur-md">
                DIGITAL SCENOGRAPHY 2.0
              </span>
            </div>

            {/* Tamil Heritage Identity Line */}
            <div className="font-tamil text-sm sm:text-base font-semibold text-[#E0C078] tracking-wide mb-3 flex items-center gap-2">
              <span>தங்கம் டெக்கரேட்டர்ஸ்</span>
              <span className="text-[#C6A15B]/60">•</span>
              <span>மேடை அலங்காரம்</span>
              <span className="text-[#C6A15B]/60">•</span>
              <span>பாரம்பரிய முகூர்த்த மண்டபங்கள்</span>
            </div>

            {/* Primary Editorial Dominant Headline */}
            <h1
              id="hero-heading"
              className="text-4xl sm:text-6xl md:text-7xl font-serif text-[#FFF8ED] tracking-tight leading-[1.04] mb-4 sm:mb-5"
            >
              <span className="block text-2xl sm:text-3xl md:text-4xl uppercase tracking-[0.18em] text-[#E0C078] font-sans font-light mb-1 sm:mb-2">
                FROM VISION
              </span>
              <span className="block font-serif italic text-4xl sm:text-6xl md:text-7xl lg:text-[5rem] text-[#FFF8ED] leading-none">
                TO GRANDEUR.
              </span>
            </h1>

            {/* Subheadline / Value Proposition */}
            <p className="text-sm sm:text-base text-[#F7F0E4]/85 max-w-xl leading-relaxed mb-6 sm:mb-8 font-light">
              Led by <strong className="text-[#FFF8ED] font-semibold">{siteConfig.brand.ownerName}</strong>,{' '}
              {siteConfig.brand.name} elevates wedding mandapams, reception scenography, and sacred cultural ceremonies into magnificent architectural realms across Erode and Western Tamil Nadu.
            </p>

            {/* Interactive Stage Presets Indicator / Selector */}
            <div className="mb-6 w-full flex flex-col items-center lg:items-start">
              <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-[#C6A15B] mb-2 block">
                SCENOGRAPHY PRESETS // SELECT PERSPECTIVE
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 w-full max-w-lg">
                {STAGE_PRESETS.map((preset) => {
                  const isSelected = activePreset === preset.id;
                  return (
                    <button
                      key={preset.id}
                      type="button"
                      onClick={() => setActivePreset(preset.id)}
                      className={`p-2 rounded-xl text-left font-mono transition-all duration-300 focus-visible:ring-2 focus-visible:ring-[#E0C078] ${
                        isSelected
                          ? 'bg-[#4A0E1B] border border-[#E0C078] text-[#FFF8ED] shadow-[0_0_15px_rgba(224,192,120,0.25)]'
                          : 'bg-black/30 border border-white/10 text-[#F7F0E4]/60 hover:text-[#E0C078] hover:border-[#C6A15B]/40'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className={`text-[9px] ${isSelected ? 'text-[#E0C078] font-bold' : 'text-[#C6A15B]'}`}>
                          {preset.number}
                        </span>
                        {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-[#E0C078] animate-pulse" />}
                      </div>
                      <span className="block text-[11px] font-semibold uppercase tracking-wider mt-0.5">
                        {preset.name}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Primary & Secondary Conversion CTAs */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4 w-full sm:w-auto mb-8">
              <MagneticButton strength={0.3}>
                <Button
                  variant="primary"
                  size="lg"
                  href={onOpenQuoteModal ? undefined : '#contact'}
                  onClick={() => {
                    trackEvent('cta_click', { sourceLocation: 'hero_primary', ctaText: 'Plan Your Stage' });
                    if (onOpenQuoteModal) onOpenQuoteModal();
                  }}
                  rightIcon={<ArrowRight className="w-4 h-4 text-[#3B0D18]" />}
                  className="w-full sm:w-auto uppercase tracking-wider text-xs font-bold shadow-gold-md py-3.5 px-6"
                >
                  Plan Your Stage
                </Button>
              </MagneticButton>

              <Button
                variant="secondary"
                size="lg"
                href="#showroom"
                rightIcon={<ArrowUpRight className="w-4 h-4 text-[#E0C078]" />}
                className="w-full sm:w-auto uppercase tracking-wider text-xs font-semibold border-[#C6A15B]/30 hover:border-[#E0C078] py-3.5 px-6"
                onClick={() => trackEvent('cta_click', { sourceLocation: 'hero_secondary', ctaText: 'Explore Our Stages' })}
              >
                Explore Our Stages
              </Button>

              {whatsAppUrl && (
                <a
                  href={whatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackEvent('whatsapp_click', { sourceLocation: 'hero_whatsapp' })}
                  aria-label="Inquire via WhatsApp"
                  className="p-3 text-[#25D366] hover:text-white bg-black/40 hover:bg-[#25D366]/20 rounded-xl border border-[#25D366]/30 transition-all duration-300 focus-visible:ring-2 focus-visible:ring-[#25D366]"
                >
                  <MessageCircle className="w-4 h-4" />
                </a>
              )}

              {telUrl && (
                <a
                  href={telUrl}
                  onClick={() => trackEvent('phone_click', { sourceLocation: 'hero_call' })}
                  aria-label={`Call ${siteConfig.contact.phonePrimary}`}
                  className="p-3 text-[#E0C078] hover:text-[#FFF8ED] bg-black/40 hover:bg-[#C6A15B]/20 rounded-xl border border-[#C6A15B]/30 transition-all duration-300 focus-visible:ring-2 focus-visible:ring-[#E0C078]"
                >
                  <Phone className="w-4 h-4" />
                </a>
              )}
            </div>

            {/* Factual Trust Foundation */}
            <div className="pt-5 border-t border-white/10 w-full grid grid-cols-2 sm:grid-cols-3 gap-3.5 text-left">
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-[#E0C078] flex-shrink-0" />
                <div>
                  <div className="text-xs font-semibold text-[#FFF8ED]">Master Scenography</div>
                  <div className="text-[10px] text-[#F7F0E4]/70 font-mono">P.T. Selvam Direct Oversight</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Flower2 className="w-4 h-4 text-[#E0C078] flex-shrink-0" />
                <div>
                  <div className="text-xs font-semibold text-[#FFF8ED]">Daily Fresh Florals</div>
                  <div className="text-[10px] text-[#F7F0E4]/70 font-mono">Dawn Harvest Sourcing</div>
                </div>
              </div>

              <div className="col-span-2 sm:col-span-1 flex items-center gap-2.5">
                <Crown className="w-4 h-4 text-[#E0C078] flex-shrink-0" />
                <div>
                  <div className="text-xs font-semibold text-[#FFF8ED]">In-House Inventory</div>
                  <div className="text-[10px] text-[#F7F0E4]/70 font-mono">100% Punctual Delivery</div>
                </div>
              </div>
            </div>
          </div>

          {/* ============================================================ */}
          {/* RIGHT COLUMN: REAL PROJECT PROOF & ARCHITECTURAL FRAME (57%)*/}
          {/* ============================================================ */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="relative w-full max-w-lg lg:max-w-none">
              <SpatialFrame
                label={`PROJECT / 001 • ${STAGE_PRESETS[activePreset].name} STAGE`}
                theme="dark"
                className="p-3 sm:p-4"
              >
                <div className="relative rounded-xl overflow-hidden border border-[#C6A15B]/30 bg-[#2A0610] group">
                  <img
                    src="/assets/portfolio/hero/hero-primary.webp"
                    alt="Grand golden wedding reception stage with circular floral arch and royal seating by Thangam Decorators"
                    className="w-full aspect-[16/10] object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                  />

                  {/* Gradient Depth Vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#16070B]/95 via-transparent to-transparent pointer-events-none" />

                  {/* Spatial Overlay Metadata */}
                  <div className="absolute bottom-0 inset-x-0 p-4 sm:p-5 flex items-end justify-between gap-3 pointer-events-none">
                    <div>
                      <span className="text-[9px] font-mono tracking-widest uppercase text-[#E0C078] block mb-1">
                        {STAGE_PRESETS[activePreset].tag}
                      </span>
                      <p className="text-base font-serif font-bold text-[#FFF8ED] leading-tight">
                        {STAGE_PRESETS[activePreset].title}
                      </p>
                      <span className="text-[10px] font-mono text-[#F7F0E4]/75 block mt-0.5">
                        Executed in Erode, Tamil Nadu
                      </span>
                    </div>

                    <span className="text-[9px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#E0C078] text-[#16070B] font-bold">
                      AUTHENTIC
                    </span>
                  </div>
                </div>

                {/* Real-time 3D Engine Scenography HUD */}
                <div className="mt-3 px-3 py-2 rounded-lg bg-black/50 border border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Layers className="w-3.5 h-3.5 text-[#E0C078]" />
                    <span className="text-[10px] font-mono text-[#FFF8ED]">
                      {currentStage.stage} {currentStage.title}
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

        {/* Scroll Cue Towards Studio Narrative */}
        <div className="mt-12 sm:mt-16 flex justify-center">
          <a
            href="#brand-intro"
            aria-label="Scroll down to explore Thangam Decorators studio disciplines"
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

export default Hero;

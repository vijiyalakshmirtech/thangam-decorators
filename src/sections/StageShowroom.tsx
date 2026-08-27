'use client';

import React, { useState } from 'react';
import { Container } from '../components/common/Container';
import { Button } from '../components/common/Button';
import { TechLabel } from '../components/common/TechLabel';
import { SpatialFrame } from '../components/common/SpatialFrame';
import { GlowLine } from '../components/common/GlowLine';
import {
  Sparkles,
  Crown,
  CheckCircle2,
  Layers,
  Eye,
  Sliders,
  MessageCircle
} from 'lucide-react';
import { siteConfig } from '../config/site';
import { generateWhatsAppUrl } from '../utils/urlHelpers';
import { trackEvent } from '../lib/analytics';

export interface StageShowroomProps {
  id?: string;
  className?: string;
  onOpenQuoteModal?: () => void;
}

interface StageConcept {
  id: string;
  number: string;
  category: string;
  title: string;
  tamil: string;
  description: string;
  image: string;
  features: string[];
  dimensions: string;
  highlight: string;
  lightingPreset: string;
  acoustics: string;
}

const stages: StageConcept[] = [
  {
    id: 'stage-vedic-mandapam',
    number: '01',
    category: 'Sacred Muhurtham',
    title: 'Royal Vedic Temple Mandapam',
    tamil: 'பாரம்பரிய முகூர்த்த நல்மண்டபம்',
    description: 'A deeply sacred wedding mandapam featuring natural green leaf mats, handcrafted floral parrot totems, golden pillared domes, and cascading Madurai malli garlands for authentic Tamil heritage rituals.',
    image: '/assets/portfolio/traditional-mandapam/traditional-banana-leaf-parrot-stage.webp',
    features: [
      'Authentic fresh banana leaf mats and coconut frond weave',
      'Handcrafted parrot floral sculptures & auspicious hanging toranas',
      'Four-pillar temple sanctum with tiered floral domes',
      'Dedicated homam canopy with fire-retardant safety clearance',
    ],
    dimensions: '30ft – 50ft Width Scale',
    highlight: 'Heritage Muhurtham',
    lightingPreset: 'Vedic Dawn Warm Wash (3000K)',
    acoustics: 'Open Homam Airflow & 100% Sightline',
  },
  {
    id: 'stage-imperial-reception',
    number: '02',
    category: 'Grand Reception',
    title: 'Imperial Floral Arch & Royal Candelabras',
    tamil: 'அரச கம்பீர வரவேற்பு மேடை',
    description: 'A breathtaking evening scenography showcasing a monumental circular floral arch, royal gold candelabras, velvet backdrop drapes, and ambient mood lighting designed for high-profile photography.',
    image: '/assets/portfolio/hero/hero-primary.webp',
    features: [
      'Full-perimeter circular floral ring with fresh red & white roses',
      'Multi-tiered illuminated crystal candelabras and gold urns',
      'Plush royal seating platform with bespoke couple throne',
      'Warm optical wash lighting with zero glare for video cameras',
    ],
    dimensions: '40ft – 65ft Panoramic Span',
    highlight: 'Contemporary Grandeur',
    lightingPreset: 'Imperial Evening Amber & Rose Wash',
    acoustics: 'Multi-Angle Studio Photography Tuning',
  },
  {
    id: 'stage-jharokha-gold',
    number: '03',
    category: 'Royal Heritage',
    title: 'Golden Jharokha & Valance Scenography',
    tamil: 'தங்க ஜரோகா சிற்ப மேடை அமைப்பு',
    description: 'Intricately carved Indian architectural jharokhas highlighted with rich gold leafing, layered crimson silk valances, and botanical garlands that evoke the opulence of royal palace courtyards.',
    image: '/assets/portfolio/reception/jharokha-gold-valance-heart-stage.webp',
    features: [
      'Multi-panel gold filigree jharokha carved screens',
      'Layered burgundy and champagne gold fabric valances',
      'Illuminated heart floral medallion with dense rose embroidery',
      'Symmetrical brass lamps and floral urli foreground styling',
    ],
    dimensions: '35ft – 55ft Hall Width',
    highlight: 'Palatial Opulence',
    lightingPreset: 'Antique Gold Architectural Spotting',
    acoustics: 'Deep Shadow Contrast & High-Lumen Depth',
  },
  {
    id: 'stage-panoramic-symmetry',
    number: '04',
    category: 'Ultra-Wide Panoramic',
    title: 'Symmetrical Floral Columns & Layered Drapes',
    tamil: 'பிரமாண்ட நெடுவரிசை மேடை அலங்காரம்',
    description: 'Engineered for massive convention centers and mega marriage halls, this design utilizes rhythmic floral columns, seamless fabric drapery, and elevated stage platforms to captivate over 2,000 guests.',
    image: '/assets/portfolio/reception/grand-reception-floral-columns-stage.webp',
    features: [
      'Eight continuous botanical columns packed with fresh carnations',
      'Full-span tiered fabric draping with pleating precision',
      'High-lumen architectural spotlights calibrated for mega halls',
      'Custom stage skirting and carpet runner matching the floral palette',
    ],
    dimensions: '50ft – 80ft Mega Hall Scale',
    highlight: 'Monumental Presence',
    lightingPreset: 'Panoramic Ultra-Wide Hall Calibration',
    acoustics: '2,000+ Guest Panoramic Line-of-Sight',
  },
];

export const StageShowroom: React.FC<StageShowroomProps> = ({
  id = 'showroom',
  className = '',
  onOpenQuoteModal,
}) => {
  const [activeStage, setActiveStage] = useState<StageConcept>(stages[0]);
  const [selectedLighting, setSelectedLighting] = useState<string>('default');

  const whatsAppUrl = generateWhatsAppUrl(
    siteConfig.contact.phonePrimary,
    `Vanakkam Thangam Decorators, I am exploring the "${activeStage.title}" (${activeStage.number}) in your Digital Stage Showroom and would like to inquire.`
  );

  return (
    <section
      id={id}
      className={`py-24 sm:py-32 bg-gradient-to-b from-[#3B0D18] via-[#4A0E1B] to-[#3B0D18] text-[#FFF8ED] relative overflow-hidden border-t border-[#C6A15B]/20 ${className}`}
      aria-labelledby="showroom-heading"
    >
      {/* Studio Blueprint Background Overlay */}
      <div className="absolute inset-0 studio-grid-overlay pointer-events-none opacity-30" aria-hidden="true" />
      <div
        className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-[#C6A15B]/10 blur-[150px] rounded-full pointer-events-none"
        aria-hidden="true"
      />

      <Container size="wide" className="relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
          <div className="mb-4 flex justify-center gap-2">
            <TechLabel variant="gold" icon={<Crown className="w-3.5 h-3.5" />}>
              DIGITAL SCENOGRAPHY LAB
            </TechLabel>
          </div>

          <h2
            id="showroom-heading"
            className="text-3xl sm:text-5xl md:text-6xl font-serif font-medium text-[#FFF8ED] tracking-tight leading-tight mb-4"
          >
            INTERACTIVE STAGE SHOWROOM.
          </h2>

          <p className="font-tamil text-base sm:text-xl font-medium text-[#E0C078] mb-4">
            உங்கள் கனவு மேடையை தேர்வு செய்யுங்கள் — 4 பிரத்யேக கலை படைப்புகள்
          </p>

          <p className="text-base text-[#F7F0E4]/85 font-light max-w-2xl mx-auto">
            Explore our authentic stage compositions designed by P.T. Selvam across Erode and Western Tamil Nadu. Inspect dimensional metrics, structural layers, and lighting calibrations.
          </p>

          <GlowLine variant="gold" className="max-w-xs mx-auto mt-6" />
        </div>

        {/* Stage Selector Digital Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-10">
          {stages.map((stage) => {
            const isActive = activeStage.id === stage.id;
            return (
              <button
                key={stage.id}
                type="button"
                onClick={() => {
                  trackEvent('portfolio_view', { sourceLocation: 'stage_showroom', category: stage.id });
                  setActiveStage(stage);
                }}
                className={`px-5 py-3 rounded-xl font-medium text-xs sm:text-sm transition-all duration-300 flex items-center gap-2.5 border backdrop-blur-md ${
                  isActive
                    ? 'bg-[#C6A15B] text-[#3B0D18] border-[#F3E5AB] font-bold shadow-[0_0_20px_rgba(224,192,120,0.35)] scale-105'
                    : 'bg-[#3B0D18]/80 text-[#F7F0E4]/80 border-[#C6A15B]/25 hover:border-[#E0C078] hover:text-[#FFF8ED]'
                }`}
              >
                <span className={`text-[10px] font-mono font-bold tracking-widest ${isActive ? 'text-[#3B0D18]' : 'text-[#E0C078]'}`}>
                  STAGE {stage.number}
                </span>
                <span>{stage.title}</span>
              </button>
            );
          })}
        </div>

        {/* Digital Design Lab Interactive Display Frame */}
        <SpatialFrame
          label={`SCENOGRAPHY SPECIFICATION // STAGE ${activeStage.number}`}
          theme="dark"
          className="p-5 sm:p-8 lg:p-10"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center">
            
            {/* Left Column: Interactive Visual Showcase & Layer Filters */}
            <div className="lg:col-span-7 flex flex-col gap-4">
              <div className="relative rounded-2xl overflow-hidden border border-[#C6A15B]/35 shadow-2xl group bg-[#3B0D18]">
                <img
                  src={activeStage.image}
                  alt={activeStage.title}
                  className="w-full h-80 sm:h-[460px] object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                
                {/* Dynamic Lighting Tint Vignette */}
                <div
                  className={`absolute inset-0 transition-opacity duration-500 pointer-events-none ${
                    selectedLighting === 'warm'
                      ? 'bg-amber-900/30 mix-blend-color'
                      : selectedLighting === 'rose'
                      ? 'bg-rose-900/30 mix-blend-color'
                      : 'bg-gradient-to-t from-[#3B0D18]/90 via-transparent to-transparent'
                  }`}
                />

                {/* Top Badges */}
                <div className="absolute top-4 left-4 flex flex-wrap gap-2 z-10">
                  <TechLabel variant="burgundy">
                    STAGE {activeStage.number}
                  </TechLabel>
                  <TechLabel variant="gold">
                    {activeStage.highlight}
                  </TechLabel>
                </div>

                {/* Bottom Architectural Metadata HUD */}
                <div className="absolute bottom-4 inset-x-4 p-3 rounded-xl bg-black/60 backdrop-blur-md border border-white/10 flex items-center justify-between pointer-events-none">
                  <div>
                    <span className="text-[9px] font-mono tracking-widest text-[#E0C078] uppercase block">
                      SCALE CALIBRATION
                    </span>
                    <span className="text-xs font-mono text-[#FFF8ED]">
                      {activeStage.dimensions}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-[9px] font-mono tracking-widest text-[#E0C078] uppercase block">
                      LIGHTING PRESET
                    </span>
                    <span className="text-xs font-mono text-[#FFF8ED]">
                      {activeStage.lightingPreset.split(' ')[0]}
                    </span>
                  </div>
                </div>
              </div>

              {/* Digital Lab Interactive Layer Controls */}
              <div className="p-3 rounded-xl bg-black/30 border border-white/10 flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Sliders className="w-3.5 h-3.5 text-[#E0C078]" />
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#F7F0E4]/80">
                    LAB PRESETS:
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedLighting('default')}
                    className={`px-2.5 py-1 rounded-lg text-[10px] font-mono uppercase transition-all ${
                      selectedLighting === 'default'
                        ? 'bg-[#E0C078] text-[#3B0D18] font-bold'
                        : 'bg-white/5 text-[#FFF8ED] hover:bg-white/10'
                    }`}
                  >
                    Natural Stage
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedLighting('warm')}
                    className={`px-2.5 py-1 rounded-lg text-[10px] font-mono uppercase transition-all ${
                      selectedLighting === 'warm'
                        ? 'bg-[#E0C078] text-[#3B0D18] font-bold'
                        : 'bg-white/5 text-[#FFF8ED] hover:bg-white/10'
                    }`}
                  >
                    Vedic Gold (3000K)
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedLighting('rose')}
                    className={`px-2.5 py-1 rounded-lg text-[10px] font-mono uppercase transition-all ${
                      selectedLighting === 'rose'
                        ? 'bg-[#E0C078] text-[#3B0D18] font-bold'
                        : 'bg-white/5 text-[#FFF8ED] hover:bg-white/10'
                    }`}
                  >
                    Evening Burgundy
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column: Architectural Specifications & Consultation */}
            <div className="lg:col-span-5 text-left flex flex-col justify-between h-full">
              <div>
                <div className="font-tamil text-sm font-semibold text-[#E0C078] mb-1">
                  {activeStage.tamil}
                </div>

                <h3 className="text-2xl sm:text-4xl font-serif font-bold text-[#FFF8ED] mb-3 leading-tight">
                  {activeStage.title}
                </h3>

                <p className="text-sm sm:text-base text-[#F7F0E4]/85 leading-relaxed font-light mb-6">
                  {activeStage.description}
                </p>

                {/* Scenography Specifications List */}
                <div className="mb-6 p-4 rounded-xl bg-black/25 border border-white/10">
                  <h4 className="text-xs font-mono uppercase tracking-widest text-[#E0C078] mb-3 flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5" />
                    <span>In-House Craftsmanship Highlights:</span>
                  </h4>
                  <ul className="space-y-2">
                    {activeStage.features.map((feat, index) => (
                      <li key={index} className="flex items-start gap-2 text-xs sm:text-sm text-[#F7F0E4]/90 font-light">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#E0C078] flex-shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Acoustic & Hall Line-of-Sight Calibration */}
                <div className="mb-8 flex items-center gap-2.5 text-xs font-mono text-[#E0C078]/90">
                  <Eye className="w-4 h-4 text-[#E0C078]" />
                  <span>Calibration: {activeStage.acoustics}</span>
                </div>
              </div>

              {/* Action Buttons & Direct Inquiries */}
              <div className="pt-6 border-t border-white/15 flex flex-wrap gap-3">
                {onOpenQuoteModal && (
                  <Button
                    variant="primary"
                    size="md"
                    onClick={() => {
                      trackEvent('cta_click', { sourceLocation: `showroom_${activeStage.id}`, ctaText: 'Book Stage' });
                      onOpenQuoteModal();
                    }}
                    leftIcon={<Sparkles className="w-4 h-4 text-[#3B0D18]" />}
                    className="w-full sm:w-auto uppercase tracking-wider text-xs font-bold shadow-gold-sm"
                  >
                    Inquire This Stage
                  </Button>
                )}

                <Button
                  variant="whatsapp"
                  size="md"
                  href={whatsAppUrl ?? undefined}
                  target="_blank"
                  leftIcon={<MessageCircle className="w-4 h-4" />}
                  onClick={() => trackEvent('whatsapp_click', { sourceLocation: 'stage_showroom' })}
                  className="w-full sm:w-auto text-xs uppercase tracking-wider font-semibold"
                >
                  WhatsApp Spec
                </Button>

                <Button
                  variant="secondary"
                  size="md"
                  href="#portfolio"
                  className="w-full sm:w-auto text-xs uppercase tracking-wider font-semibold border-[#C6A15B]/30 hover:border-[#E0C078]"
                >
                  View Full Portfolio
                </Button>
              </div>
            </div>
          </div>
        </SpatialFrame>
      </Container>
    </section>
  );
};

export default StageShowroom;

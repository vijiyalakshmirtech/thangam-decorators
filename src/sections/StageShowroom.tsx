import React, { useState } from 'react';
import { Container } from '../components/common/Container';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { Sparkles, Crown, CheckCircle2 } from 'lucide-react';
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
}

const stages: StageConcept[] = [
  {
    id: 'stage-vedic-mandapam',
    number: 'STAGE 01',
    category: 'Sacred Muhurtham',
    title: 'Royal Vedic Temple Mandapam',
    tamil: 'பாரம்பரிய முகூர்த்த நல்மண்டபம்',
    description: 'A deeply sacred wedding mandapam featuring natural green leaf mats, handcrafted floral parrot totems, golden pillared domes, and cascading Madurai malli garlands for authentic Tamil heritage rituals.',
    image: '/assets/portfolio/mandapams/traditional-banana-leaf-parrot-stage.webp',
    features: [
      'Authentic fresh banana leaf mats and coconut frond weave',
      'Handcrafted parrot floral sculptures & auspicious hanging toranas',
      'Four-pillar temple sanctum with tiered floral domes',
      'Dedicated homam canopy with fire-retardant safety clearance',
    ],
    dimensions: '30ft – 50ft Width Scale',
    highlight: 'Heritage Muhurtham',
  },
  {
    id: 'stage-imperial-reception',
    number: 'STAGE 02',
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
  },
  {
    id: 'stage-jharokha-gold',
    number: 'STAGE 03',
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
  },
  {
    id: 'stage-panoramic-symmetry',
    number: 'STAGE 04',
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
  },
];

export const StageShowroom: React.FC<StageShowroomProps> = ({
  id = 'showroom',
  className = '',
  onOpenQuoteModal,
}) => {
  const [activeStage, setActiveStage] = useState<StageConcept>(stages[0]);

  return (
    <section
      id={id}
      className={`py-24 sm:py-32 bg-gradient-to-b from-[#5A1426] via-[#4A0E1B] to-[#5A1426] text-[#FFF8ED] relative overflow-hidden border-t border-white/10 ${className}`}
      aria-labelledby="showroom-heading"
    >
      <Container size="wide">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
          <div className="mb-4 flex justify-center">
            <Badge variant="dark" icon={<Crown className="w-3.5 h-3.5 text-[#FFF8ED]" />}>
              Featured Stage Collections
            </Badge>
          </div>

          <h2
            id="showroom-heading"
            className="text-3xl sm:text-5xl md:text-6xl font-serif font-medium text-[#FFF8ED] tracking-tight leading-tight mb-4"
          >
            SIGNATURE STAGE CONCEPTS.
          </h2>

          <p className="font-tamil text-base sm:text-xl font-medium text-[#FFF8ED]/90 mb-4">
            உங்கள் கனவு மேடையை தேர்வு செய்யுங்கள் — 4 பிரத்யேக கலை படைப்புகள்
          </p>

          <p className="text-base text-[#F7F0E4]/85 font-light max-w-2xl mx-auto">
            Explore our authentic stage compositions designed by P.T. Selvam across Erode and Western Tamil Nadu. Select a setup below to inspect details and specifications.
          </p>

          <div className="mt-6 h-[1.5px] w-20 bg-white/20 mx-auto" />
        </div>

        {/* Stage Selector Navigation Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-12">
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
                className={`px-5 py-3 rounded-xl font-medium text-xs sm:text-sm transition-all duration-300 flex items-center gap-2 border ${
                  isActive
                    ? 'bg-[#6E1830] text-[#FFF8ED] border-white/40 shadow-lg scale-105'
                    : 'bg-[#4A0E1B] text-[#F7F0E4]/80 border-white/15 hover:border-white/30 hover:text-[#FFF8ED]'
                }`}
              >
                <span className={`text-[10px] uppercase font-bold tracking-widest ${isActive ? 'text-[#FFF8ED]' : 'text-[#F7F0E4]/60'}`}>
                  {stage.number}
                </span>
                <span>{stage.title}</span>
              </button>
            );
          })}
        </div>

        {/* Active Stage Immersive Spotlight Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center bg-[#5A1426] border border-white/15 rounded-3xl p-6 sm:p-12 shadow-[0_15px_50px_rgba(74,14,27,0.4)]">
          {/* Left Column: Visual Showcase */}
          <div className="lg:col-span-7">
            <div className="relative rounded-2xl overflow-hidden border border-white/15 shadow-xl group">
              <img
                src={activeStage.image}
                alt={activeStage.title}
                className="w-full h-80 sm:h-[480px] object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#4A0E1B]/85 via-transparent to-transparent pointer-events-none" />

              {/* Badges on Top */}
              <div className="absolute top-5 left-5 flex gap-2">
                <span className="text-xs uppercase tracking-widest font-bold text-[#FFF8ED] bg-[#6E1830] px-3.5 py-1.5 rounded-lg border border-white/20 shadow-md">
                  {activeStage.number}
                </span>
                <span className="text-xs uppercase tracking-wider font-semibold text-[#1F161A] bg-[#FFF8ED] px-3.5 py-1.5 rounded-lg border border-white/20 shadow-sm">
                  {activeStage.highlight}
                </span>
              </div>

              {/* Bottom Dimensions Pill */}
              <div className="absolute bottom-5 right-5">
                <span className="text-xs font-mono font-medium text-[#FFF8ED] bg-[#4A0E1B]/90 px-3.5 py-1.5 rounded-lg border border-white/20 backdrop-blur-sm">
                  {activeStage.dimensions}
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Specifications & Booking */}
          <div className="lg:col-span-5 text-left flex flex-col justify-between h-full">
            <div>
              <div className="font-tamil text-sm font-semibold text-[#FFF8ED]/90 mb-1">
                {activeStage.tamil}
              </div>

              <h3 className="text-2xl sm:text-4xl font-serif font-bold text-[#FFF8ED] mb-4 leading-tight">
                {activeStage.title}
              </h3>

              <p className="text-base text-[#F7F0E4]/85 leading-relaxed font-light mb-6">
                {activeStage.description}
              </p>

              {/* Key Features List */}
              <div className="mb-8">
                <h4 className="text-xs uppercase tracking-widest font-bold text-[#FFF8ED]/90 mb-3">
                  Scenography Specifications:
                </h4>
                <ul className="space-y-2.5">
                  {activeStage.features.map((feat, index) => (
                    <li key={index} className="flex items-start gap-2.5 text-sm text-[#F7F0E4]/85 font-light">
                      <CheckCircle2 className="w-4 h-4 text-[#FFF8ED] flex-shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-6 border-t border-white/15 flex flex-wrap gap-4">
              {onOpenQuoteModal && (
                <Button
                  variant="primary"
                  size="md"
                  onClick={() => {
                    trackEvent('cta_click', { sourceLocation: `showroom_${activeStage.id}`, ctaText: 'Book Stage' });
                    onOpenQuoteModal();
                  }}
                  leftIcon={<Sparkles className="w-4 h-4 text-[#4A0E1B]" />}
                  className="w-full sm:w-auto uppercase tracking-wider text-xs"
                >
                  Book This Stage
                </Button>
              )}

              <Button
                variant="secondary"
                size="md"
                href="#portfolio"
                className="w-full sm:w-auto text-xs uppercase tracking-wider font-semibold"
              >
                View Full Portfolio
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

import React from 'react';
import { Container } from '../components/common/Container';
import { Badge } from '../components/common/Badge';
import { Sparkles, ArrowUpRight } from 'lucide-react';
import { trackEvent } from '../lib/analytics';

export interface SignatureDecorationsProps {
  id?: string;
  className?: string;
  onOpenQuoteModal?: () => void;
}

interface CategoryItem {
  id: string;
  title: string;
  tamil: string;
  desc: string;
  image: string;
  accent: string;
  aspectSpan: string;
}

const categories: CategoryItem[] = [
  {
    id: 'wedding-stage',
    title: 'Wedding Stage',
    tamil: 'திருமண மேடை அலங்காரம்',
    desc: 'Grand royal wedding stages adorned with fragrant florals, architectural pillars, and sacred lighting.',
    image: '/assets/portfolio/mandapams/auspicious-green-gold-mandapam.webp',
    accent: 'Vedic Sanctum',
    aspectSpan: 'col-span-1 md:col-span-2 lg:col-span-2',
  },
  {
    id: 'reception-stage',
    title: 'Reception Stage',
    tamil: 'வரவேற்பு மேடை அலங்காரம்',
    desc: 'Contemporary royal backdrops with circular floral arches, crystal candelabras, and ambient mood lighting.',
    image: '/assets/portfolio/reception/panoramic-circular-arch-stage.webp',
    accent: 'Imperial Evening',
    aspectSpan: 'col-span-1 md:col-span-1 lg:col-span-1',
  },
  {
    id: 'engagement-decor',
    title: 'Engagement Décor',
    tamil: 'நிச்சயதார்த்த அலங்காரம்',
    desc: 'Intimate pastel themes, delicate floral backdrops, and bespoke seating for betrothal ceremonies.',
    image: '/assets/portfolio/reception/white-drape-red-rose-heart-stage.webp',
    accent: 'Romantic Harmony',
    aspectSpan: 'col-span-1 md:col-span-1 lg:col-span-1',
  },
  {
    id: 'traditional-mandapam',
    title: 'Traditional Mandapam',
    tamil: 'பாரம்பரிய முகூர்த்த மண்டபம்',
    desc: 'Sacred banana tree motifs, auspicious greenery mats, parrot floral hangings, and temple domes.',
    image: '/assets/portfolio/mandapams/traditional-banana-leaf-parrot-stage.webp',
    accent: 'Heritage Auspicious',
    aspectSpan: 'col-span-1 md:col-span-2 lg:col-span-2',
  },
  {
    id: 'luxury-scenography',
    title: 'Luxury Scenography',
    tamil: 'பிரமாண்ட மேடை அமைப்பு',
    desc: 'Ultra-wide panoramic stage compositions with multi-layered drapes, gold jharokha carvings, and depth.',
    image: '/assets/portfolio/reception/ultra-wide-reception-scenography.webp',
    accent: 'Opulent Scale',
    aspectSpan: 'col-span-1 md:col-span-2 lg:col-span-2',
  },
  {
    id: 'floral-artistry',
    title: 'Floral Décor',
    tamil: 'இயற்கை மலர் அலங்காரம்',
    desc: 'Artisanal hand-crafted peacock sculptures, fragrant rose cascades, and pure Madurai jasmine strings.',
    image: '/assets/portfolio/cultural/floral-peacock-sculpture-urli.webp',
    accent: 'Botanical Couture',
    aspectSpan: 'col-span-1 md:col-span-1 lg:col-span-1',
  },
  {
    id: 'entrance-arch',
    title: 'Entrance & Pathway',
    tamil: 'முகப்பு & வரவேற்பு வளைவு',
    desc: 'Majestic welcome arches, illuminated floral pillars, and urli brass lamp arrangements for royal arrivals.',
    image: '/assets/portfolio/reception/illuminated-floral-arch-reception.webp',
    accent: 'Grand Welcome',
    aspectSpan: 'col-span-1 md:col-span-1 lg:col-span-1',
  },
  {
    id: 'family-celebrations',
    title: 'Milestone Ceremonies',
    tamil: 'மங்கள நன்னாள் அலங்காரம்',
    desc: 'Tailored stage decor for Seemantham, Sashtiabdhapoorthi, and family celebrations with cultural fidelity.',
    image: '/assets/portfolio/family-ceremonies/traditional-swing-backdrop.webp',
    accent: 'Sacred Milestones',
    aspectSpan: 'col-span-1 md:col-span-2 lg:col-span-2',
  },
];

export const SignatureDecorations: React.FC<SignatureDecorationsProps> = ({
  id = 'decorations',
  className = '',
  onOpenQuoteModal,
}) => {
  return (
    <section
      id={id}
      className={`py-24 sm:py-32 bg-[#F7F0E4] relative overflow-hidden border-t border-[#6E1830]/15 ${className}`}
      aria-labelledby="decorations-heading"
    >
      <Container size="wide">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 sm:mb-20">
          <div className="mb-4 flex justify-center">
            <Badge variant="gold" icon={<Sparkles className="w-3.5 h-3.5 text-[#6E1830]" />}>
              Event Décor Offerings
            </Badge>
          </div>

          <h2
            id="decorations-heading"
            className="text-3xl sm:text-5xl md:text-6xl font-serif font-medium text-[#6E1830] tracking-tight leading-tight mb-4"
          >
            SIGNATURE DÉCOR STYLES.
          </h2>

          <p className="font-tamil text-base sm:text-xl font-medium text-[#6E1830]/80 mb-4">
            அழகுணர்ச்சியும் பாரம்பரியமும் இணைந்த பிரத்யேக மேடை அலங்காரங்கள்
          </p>

          <p className="text-base text-[#1F161A]/80 font-light max-w-2xl mx-auto">
            From traditional muhurtham mandapams to evening reception stages and family ceremonies across Erode and Western Tamil Nadu.
          </p>

          <div className="mt-6 h-[1.5px] w-20 bg-[#6E1830]/20 mx-auto" />
        </div>

        {/* Signature Category Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className={`group relative rounded-2xl overflow-hidden bg-[#FFF8ED] border border-[#6E1830]/15 hover:border-[#6E1830] shadow-[0_6px_25px_rgba(74,14,27,0.06)] hover:shadow-[0_15px_45px_rgba(74,14,27,0.15)] transition-all duration-500 flex flex-col justify-end min-h-[380px] sm:min-h-[420px] ${cat.aspectSpan}`}
            >
              {/* Background Authentic Photograph */}
              <img
                src={cat.image}
                alt={cat.title}
                className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-108 transition-transform duration-700 ease-out"
              />

              {/* Dynamic Burgundy Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#4A0E1B]/95 via-[#5A1426]/40 to-transparent group-hover:from-[#4A0E1B]/98 group-hover:via-[#6E1830]/50 transition-colors duration-500 pointer-events-none" />

              {/* Top Accent Pill */}
              <div className="absolute top-5 left-5 z-10">
                <span className="text-[10px] uppercase tracking-widest font-semibold text-[#FFF8ED] bg-[#6E1830]/90 px-3 py-1 rounded-full border border-white/20 backdrop-blur-sm">
                  {cat.accent}
                </span>
              </div>

              {/* Content Box */}
              <div className="relative z-10 p-6 sm:p-8 text-left">
                <div className="font-tamil text-xs sm:text-sm font-semibold text-[#FFF8ED]/90 mb-1">
                  {cat.tamil}
                </div>

                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#FFF8ED] mb-2 transition-colors flex items-center justify-between">
                  <span>{cat.title}</span>
                  <ArrowUpRight className="w-5 h-5 text-[#FFF8ED] opacity-0 group-hover:opacity-100 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
                </h3>

                <p className="text-sm text-[#F7F0E4]/85 font-light leading-relaxed mb-4 max-w-xl">
                  {cat.desc}
                </p>

                {onOpenQuoteModal && (
                  <button
                    type="button"
                    onClick={() => {
                      trackEvent('cta_click', { sourceLocation: `category_${cat.id}`, ctaText: 'Inquire Category' });
                      onOpenQuoteModal();
                    }}
                    className="text-xs uppercase tracking-widest font-semibold text-[#FFF8ED] hover:text-[#FFF8ED] inline-flex items-center gap-1.5 transition-colors focus-visible:outline-none focus-visible:underline"
                  >
                    <span>Inquire this Style</span>
                    <span className="text-sm">→</span>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

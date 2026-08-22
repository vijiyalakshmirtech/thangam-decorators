import React, { useRef, useEffect } from 'react';
import { Container } from '../components/common/Container';
import { Badge } from '../components/common/Badge';
import { Sparkles, Layers, Palette, Hammer, Crown } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export interface TransformationExperienceProps {
  id?: string;
  className?: string;
}

const steps = [
  {
    step: '01',
    title: 'The Raw Canvas',
    tamil: 'வெற்று இடம்',
    concept: 'Empty Space',
    desc: 'Every celebration begins with an architectural appraisal of your hall dimensions, ceiling elevations, guest sightlines, and ambient lighting.',
    icon: <Layers className="w-5 h-5 text-[#C9A45C]" />,
    image: '/assets/portfolio/reception/panoramic-hall-stage-decor.webp',
  },
  {
    step: '02',
    title: 'Aesthetic Vision',
    tamil: 'வடிவமைப்பு பார்வை',
    concept: 'Vision & Concept',
    desc: 'Translating family traditions, color palettes, muhurtham timing, and couple preferences into a cohesive theme.',
    icon: <Palette className="w-5 h-5 text-[#C9A45C]" />,
    image: '/assets/portfolio/mandapams/gold-jali-circular-floral-stage.webp',
  },
  {
    step: '03',
    title: 'Master Scenography',
    tamil: 'மேடை வரைபடம்',
    concept: 'Bespoke Design',
    desc: 'Engineering floral arches, hand-carved jali panels, layered fabric drapes, and bespoke lighting fixtures in our workshop.',
    icon: <Hammer className="w-5 h-5 text-[#C9A45C]" />,
    image: '/assets/portfolio/reception/jharokha-gold-valance-heart-stage.webp',
  },
  {
    step: '04',
    title: 'Botanical Weaving',
    tamil: 'மலர் அலங்கார வேலைப்பாடு',
    concept: 'Artisan Décor',
    desc: 'Freshly harvested carnations, Dutch roses, and fragrant jasmine garlands are meticulously hand-woven on site at dawn.',
    icon: <Sparkles className="w-5 h-5 text-[#C9A45C]" />,
    image: '/assets/portfolio/cultural/floral-peacock-sculpture-urli.webp',
  },
  {
    step: '05',
    title: 'The Grand Stage',
    tamil: 'அரச கம்பீர மேடை',
    concept: 'The Living Masterpiece',
    desc: 'The finished stage radiates warmth, prestige, and sacred grandeur—creating an unforgettable backdrop for your lifelong memories.',
    icon: <Crown className="w-5 h-5 text-[#C9A45C]" />,
    image: '/assets/portfolio/hero/hero-primary.webp',
  },
];

export const TransformationExperience: React.FC<TransformationExperienceProps> = ({
  id = 'experience',
  className = '',
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>('.transform-card');

      cards.forEach((card, index) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
          y: 40,
          opacity: 0,
          duration: 0.8,
          delay: index * 0.1,
          ease: 'power3.out',
        });
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id={id}
      ref={sectionRef}
      className={`py-24 sm:py-32 bg-[#F7F0E4] relative overflow-hidden ${className}`}
      aria-labelledby="transformation-heading"
    >
      <Container size="default">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 sm:mb-20">
          <div className="mb-4 flex justify-center">
            <Badge variant="gold" icon={<Sparkles className="w-3.5 h-3.5 text-[#6E1830]" />}>
              The Transformation Odyssey
            </Badge>
          </div>

          <h2
            id="transformation-heading"
            className="text-3xl sm:text-5xl md:text-6xl font-serif font-medium text-[#6E1830] tracking-tight leading-tight mb-4"
          >
            HOW A VENUE BECOMES A PALACE.
          </h2>

          <p className="font-tamil text-base sm:text-xl font-medium text-[#C9A45C] mb-4">
            வெற்று அரங்கம் முதல் கம்பீர மேடை வரையிலான கலைப்பயணம்
          </p>

          <p className="text-base text-[#1F161A]/80 font-light max-w-2xl mx-auto">
            Experience the meticulous 5-phase metamorphosis as our master craftsmen turn an empty hall into a royal sanctuary.
          </p>

          <div className="mt-6 h-[1.5px] w-20 bg-gradient-to-r from-[#C9A45C] via-[#E0C078] to-[#9E7B35] mx-auto" />
        </div>

        {/* Transformation Flow Cards */}
        <div ref={containerRef} className="space-y-12 sm:space-y-16">
          {steps.map((step, idx) => {
            const isEven = idx % 2 === 1;
            return (
              <div
                key={step.step}
                className={`transform-card grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center p-6 sm:p-10 rounded-2xl bg-[#FFFDF8] border border-[#C9A45C]/35 shadow-[0_8px_30px_rgba(110,24,48,0.04)] hover:border-[#6E1830]/60 transition-all duration-500`}
              >
                {/* Image Composition */}
                <div
                  className={`lg:col-span-6 ${
                    isEven ? 'lg:order-2' : 'lg:order-1'
                  }`}
                >
                  <div className="relative rounded-xl overflow-hidden border border-[#C9A45C]/40 shadow-md group">
                    <img
                      src={step.image}
                      alt={step.title}
                      className="w-full h-64 sm:h-80 object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#4A1022]/60 via-transparent to-transparent pointer-events-none" />

                    <div className="absolute top-4 left-4">
                      <span className="font-serif text-2xl sm:text-3xl font-bold text-[#FFFDF8] bg-[#6E1830]/90 px-3.5 py-1 rounded-md border border-[#C9A45C]/50 shadow-md">
                        {step.step}
                      </span>
                    </div>

                    <div className="absolute bottom-4 right-4">
                      <span className="font-tamil text-xs font-semibold text-[#FFFDF8] bg-[#4A1022]/85 px-3 py-1 rounded-full border border-[#C9A45C]/40">
                        {step.tamil}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Editorial Content */}
                <div
                  className={`lg:col-span-6 ${
                    isEven ? 'lg:order-1' : 'lg:order-2'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-[#6E1830]/10 border border-[#C9A45C]/30 flex items-center justify-center">
                      {step.icon}
                    </div>
                    <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#C9A45C]">
                      Phase {step.step} • {step.concept}
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-4xl font-serif font-medium text-[#6E1830] mb-4">
                    {step.title}
                  </h3>

                  <p className="text-base text-[#1F161A]/80 leading-relaxed font-light mb-6">
                    {step.desc}
                  </p>

                  <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-[#6E1830]">
                    <span className="w-6 h-[1.5px] bg-[#C9A45C]" />
                    P.T. Selvam Quality Standard
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
};

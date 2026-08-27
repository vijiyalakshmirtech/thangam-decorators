'use client';

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
    title: 'Venue & Sightline Assessment',
    tamil: 'அரங்க அளவீடு',
    concept: 'Hall Evaluation',
    desc: 'Thorough appraisal of kalyana mandapam width, ceiling elevation, guest sightlines, and ambient illumination.',
    icon: <Layers className="w-5 h-5 text-[#FFF8ED]" />,
    image: '/assets/portfolio/reception/panoramic-hall-stage-decor.webp',
  },
  {
    step: '02',
    title: 'Custom Scenography & Layout',
    tamil: 'மேடை வரைபடம்',
    concept: 'Design Alignment',
    desc: 'Selecting temple gopuram pillars, floral arches, velvet drapes, and lighting rigs tailored to your family tradition.',
    icon: <Palette className="w-5 h-5 text-[#FFF8ED]" />,
    image: '/assets/portfolio/traditional-mandapam/gold-jali-circular-floral-stage.webp',
  },
  {
    step: '03',
    title: 'Workshop Crafting & Curation',
    tamil: 'பட்டறை தயாரிப்பு',
    concept: 'In-House Preparation',
    desc: 'Handcrafted jali panels, mandapam domes, brass oil lamps, and fabric valances prepared at our Erode workshop.',
    icon: <Hammer className="w-5 h-5 text-[#FFF8ED]" />,
    image: '/assets/portfolio/reception/jharokha-gold-valance-heart-stage.webp',
  },
  {
    step: '04',
    title: 'Dawn Fresh Floral Weaving',
    tamil: 'மலர் அலங்கார வேலை',
    concept: 'Artisan Floristry',
    desc: 'Freshly harvested Madurai jasmine, roses, and auspicious greens hand-woven on-site at dawn before the ceremony.',
    icon: <Sparkles className="w-5 h-5 text-[#FFF8ED]" />,
    image: '/assets/portfolio/traditional-mandapam/greenery-mat-floral-panel-stage.webp',
  },
  {
    step: '05',
    title: 'Flawless On-Site Execution',
    tamil: 'நிறைவான மேடை அர்ப்பணிப்பு',
    concept: 'Punctual Delivery',
    desc: 'Final lighting checks and P.T. Selvam personal quality inspection completed hours prior to muhurtham.',
    icon: <Crown className="w-5 h-5 text-[#FFF8ED]" />,
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
      className={`py-24 sm:py-32 bg-gradient-to-b from-[#4A0E1B] via-[#5A1426] to-[#4A0E1B] text-[#FFF8ED] relative overflow-hidden border-y border-white/10 ${className}`}
      aria-labelledby="transformation-heading"
    >
      <Container size="default">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 sm:mb-20">
          <div className="mb-4 flex justify-center">
            <Badge variant="dark" icon={<Sparkles className="w-3.5 h-3.5 text-[#FFF8ED]" />}>
              Stage Scenography Craftsmanship
            </Badge>
          </div>

          <h2
            id="transformation-heading"
            className="text-3xl sm:text-5xl md:text-6xl font-serif font-medium text-[#FFF8ED] tracking-tight leading-tight mb-4"
          >
            MASTER STAGE EXECUTION.
          </h2>

          <p className="font-tamil text-base sm:text-xl font-medium text-[#FFF8ED]/90 mb-4">
            வெற்று அரங்கம் முதல் கம்பீர மேடை வரையிலான கலைப்பயணம்
          </p>

          <p className="text-base text-[#F7F0E4]/85 font-light max-w-2xl mx-auto">
            From hall dimensions and structural rigging to dawn floral weaving, our craftsmen execute every stage with discipline and care.
          </p>

          <div className="mt-6 h-[1.5px] w-20 bg-white/20 mx-auto" />
        </div>

        {/* Transformation Flow Cards */}
        <div ref={containerRef} className="space-y-12 sm:space-y-16">
          {steps.map((step, idx) => {
            const isEven = idx % 2 === 1;
            return (
              <div
                key={step.step}
                className="transform-card grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center p-6 sm:p-10 rounded-2xl bg-[#5A1426] border border-white/15 shadow-[0_8px_30px_rgba(74,14,27,0.4)] hover:border-white/30 transition-all duration-500"
              >
                {/* Image Composition */}
                <div
                  className={`lg:col-span-6 ${
                    isEven ? 'lg:order-2' : 'lg:order-1'
                  }`}
                >
                  <div className="relative rounded-xl overflow-hidden border border-white/15 shadow-md group">
                    <img
                      src={step.image}
                      alt={step.title}
                      className="w-full h-64 sm:h-80 object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#4A0E1B]/80 via-transparent to-transparent pointer-events-none" />

                    <div className="absolute top-4 left-4">
                      <span className="font-serif text-2xl sm:text-3xl font-bold text-[#FFF8ED] bg-[#6E1830] px-3.5 py-1 rounded-md border border-white/20 shadow-md">
                        {step.step}
                      </span>
                    </div>

                    <div className="absolute bottom-4 right-4">
                      <span className="font-tamil text-xs font-semibold text-[#FFF8ED] bg-[#4A0E1B]/90 px-3 py-1 rounded-full border border-white/20">
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
                    <div className="w-10 h-10 rounded-lg bg-[#6E1830] border border-white/15 flex items-center justify-center">
                      {step.icon}
                    </div>
                    <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#FFF8ED]/80">
                      Step {step.step} • {step.concept}
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-4xl font-serif font-medium text-[#FFF8ED] mb-4">
                    {step.title}
                  </h3>

                  <p className="text-base text-[#F7F0E4]/85 leading-relaxed font-light mb-6">
                    {step.desc}
                  </p>

                  <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-[#FFF8ED]/90">
                    <span className="w-6 h-[1.5px] bg-white/40" />
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

import React, { useEffect, useRef } from 'react';
import { Container } from '../components/common/Container';
import { Badge } from '../components/common/Badge';
import { Sparkles, Crown, Compass } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export interface BrandIntroProps {
  id?: string;
  className?: string;
}

export const BrandIntro: React.FC<BrandIntroProps> = ({
  id = 'about',
  className = '',
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Headline reveal
      if (headlineRef.current) {
        gsap.from(headlineRef.current, {
          scrollTrigger: {
            trigger: headlineRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
          y: 40,
          opacity: 0,
          duration: 1,
          ease: 'power3.out',
        });
      }

      // Narrative reveal
      if (textRef.current) {
        gsap.from(textRef.current, {
          scrollTrigger: {
            trigger: textRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
          y: 30,
          opacity: 0,
          duration: 1,
          delay: 0.2,
          ease: 'power3.out',
        });
      }

      // Pillar cards staggered reveal
      if (cardsRef.current) {
        gsap.from(cardsRef.current.children, {
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
          y: 40,
          opacity: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
        });
      }
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id={id}
      ref={sectionRef}
      className={`py-24 sm:py-32 bg-[#FFFDF8] relative overflow-hidden border-y border-[#C9A45C]/20 ${className}`}
      aria-labelledby="brand-intro-heading"
    >
      {/* Background Decorative Motifs */}
      <div
        className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-[#C9A45C]/10 blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-[#6E1830]/5 blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <Container size="default" className="relative z-10">
        <div className="max-w-4xl mx-auto text-center">

          {/* Eyebrow */}
          <div className="mb-6 flex justify-center">
            <Badge variant="gold" icon={<Sparkles className="w-3.5 h-3.5 text-[#6E1830]" />}>
              The Heritage of Elegance
            </Badge>
          </div>

          {/* Large Editorial Headline */}
          <h2
            id="brand-intro-heading"
            ref={headlineRef}
            className="text-4xl sm:text-6xl md:text-7xl font-serif font-medium text-[#6E1830] tracking-tight leading-[1.08] mb-8"
          >
            WE DESIGN MOMENTS.
          </h2>

          {/* Tamil Heritage Statement */}
          <p className="font-tamil text-lg sm:text-2xl font-medium text-[#C9A45C] tracking-wide mb-6">
            "ஒவ்வொரு திருமணத் தருணத்தையும் தெய்வீக கம்பீரத்துடன் உயிர்ப்பிக்கிறோம்."
          </p>

          {/* Editorial Supporting Narrative */}
          <p
            ref={textRef}
            className="text-base sm:text-xl text-[#1F161A]/85 leading-relaxed font-light max-w-3xl mx-auto mb-16"
          >
            From regal wedding mandapams steeped in Vedic purity to breathtaking contemporary reception scenography, <strong className="text-[#6E1830] font-medium">Thangam Decorators</strong> transforms ordinary venues into extraordinary memories. Under the visionary stewardship of <strong className="text-[#6E1830] font-medium">P.T. Selvam</strong>, every stage is conceived as a singular work of spatial artistry.
          </p>

          {/* Three Luxury Pillars */}
          <div
            ref={cardsRef}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 text-left"
          >
            {/* Pillar 1 */}
            <div className="p-8 rounded-xl bg-[#F7F0E4]/60 border border-[#C9A45C]/35 hover:border-[#6E1830] transition-all duration-300 hover:shadow-lg group">
              <div className="w-12 h-12 rounded-lg bg-[#6E1830] text-[#FFFDF8] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-md">
                <Crown className="w-6 h-6 text-[#C9A45C]" />
              </div>
              <h3 className="font-serif text-2xl font-semibold text-[#6E1830] mb-3">
                Architectural Grandeur
              </h3>
              <p className="text-sm text-[#1F161A]/75 leading-relaxed font-light">
                Custom mandapam structures, jharokha carved arches, and multi-tiered scenography engineered for monumental presence.
              </p>
            </div>

            {/* Pillar 2 */}
            <div className="p-8 rounded-xl bg-[#F7F0E4]/60 border border-[#C9A45C]/35 hover:border-[#6E1830] transition-all duration-300 hover:shadow-lg group">
              <div className="w-12 h-12 rounded-lg bg-[#6E1830] text-[#FFFDF8] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-md">
                <Sparkles className="w-6 h-6 text-[#C9A45C]" />
              </div>
              <h3 className="font-serif text-2xl font-semibold text-[#6E1830] mb-3">
                Fresh Botanical Artistry
              </h3>
              <p className="text-sm text-[#1F161A]/75 leading-relaxed font-light">
                Madurai jasmine, Dutch roses, and traditional foliage procured daily at dawn for vibrant fragrance and uncompromised freshness.
              </p>
            </div>

            {/* Pillar 3 */}
            <div className="p-8 rounded-xl bg-[#F7F0E4]/60 border border-[#C9A45C]/35 hover:border-[#6E1830] transition-all duration-300 hover:shadow-lg group">
              <div className="w-12 h-12 rounded-lg bg-[#6E1830] text-[#FFFDF8] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-md">
                <Compass className="w-6 h-6 text-[#C9A45C]" />
              </div>
              <h3 className="font-serif text-2xl font-semibold text-[#6E1830] mb-3">
                Proprietor Direct Craft
              </h3>
              <p className="text-sm text-[#1F161A]/75 leading-relaxed font-light">
                Personalized consultation, transparent scope planning, and on-site oversight by P.T. Selvam from concept to celebration.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

'use client';

import React, { useEffect, useRef } from 'react';
import { Container } from '../components/common/Container';
import { Badge } from '../components/common/Badge';
import { Sparkles, Crown, Compass } from 'lucide-react';
import { SITE_CONTENT } from '../data/siteContent';
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
      className={`py-24 sm:py-32 bg-[#F7F0E4] relative overflow-hidden border-y border-[#6E1830]/15 ${className}`}
      aria-labelledby="brand-intro-heading"
    >
      {/* Background Decorative Motifs */}
      <div
        className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-[#8B3A4E]/10 blur-3xl pointer-events-none"
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
              {SITE_CONTENT.about.eyebrow}
            </Badge>
          </div>

          {/* Large Editorial Headline */}
          <h2
            id="brand-intro-heading"
            ref={headlineRef}
            className="text-3xl sm:text-5xl md:text-6xl font-serif font-medium text-[#6E1830] tracking-tight leading-[1.12] mb-8"
          >
            {SITE_CONTENT.about.heading}
          </h2>

          {/* Tamil Heritage Statement */}
          <p className="font-tamil text-lg sm:text-2xl font-medium text-[#6E1830]/80 tracking-wide mb-6">
            "ஒவ்வொரு திருமணத் தருணத்தையும் தெய்வீக கம்பீரத்துடன் உயிர்ப்பிக்கிறோம்."
          </p>

          {/* Editorial Supporting Narrative */}
          <div
            ref={textRef}
            className="space-y-4 text-base sm:text-lg text-[#1F161A]/85 leading-relaxed font-light max-w-3xl mx-auto mb-16"
          >
            {SITE_CONTENT.about.paragraphs.map((para, idx) => (
              <p key={idx}>{para}</p>
            ))}
          </div>

          {/* Four Authentic Luxury Pillars */}
          <div
            ref={cardsRef}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 text-left mb-16"
          >
            {SITE_CONTENT.about.pillars.map((pillar, idx) => (
              <div
                key={idx}
                className="p-8 rounded-2xl bg-[#FFF8ED] border border-[#6E1830]/15 hover:border-[#6E1830] transition-all duration-300 shadow-[0_4px_24px_rgba(74,14,27,0.04)] hover:shadow-lg group"
              >
                <div className="w-12 h-12 rounded-xl bg-[#6E1830] text-[#FFF8ED] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-md">
                  {idx === 0 && <Crown className="w-6 h-6 text-[#FFF8ED]" />}
                  {idx === 1 && <Sparkles className="w-6 h-6 text-[#FFF8ED]" />}
                  {idx === 2 && <Crown className="w-6 h-6 text-[#FFF8ED]" />}
                  {idx === 3 && <Compass className="w-6 h-6 text-[#FFF8ED]" />}
                </div>
                <h3 className="font-serif text-xl sm:text-2xl font-semibold text-[#6E1830] mb-3">
                  {pillar.title}
                </h3>
                <p className="text-sm text-[#1F161A]/75 leading-relaxed font-light">
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>

          {/* Founder Quote Card */}
          <div className="p-8 sm:p-10 rounded-2xl bg-[#FFF8ED] border border-[#6E1830]/20 text-center shadow-md max-w-3xl mx-auto">
            <blockquote className="font-serif italic text-lg sm:text-xl text-[#6E1830] leading-relaxed mb-4">
              "{SITE_CONTENT.about.founderQuote}"
            </blockquote>
            <span className="text-xs uppercase tracking-widest font-bold text-[#1F161A]/70 font-sans">
              {SITE_CONTENT.about.founderTitle}
            </span>
          </div>
        </div>
      </Container>
    </section>
  );
};

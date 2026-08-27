'use client';

import React, { useRef, useEffect } from 'react';
import { Container } from '../components/common/Container';
import { TechLabel } from '../components/common/TechLabel';
import { SpatialFrame } from '../components/common/SpatialFrame';
import { GlowLine } from '../components/common/GlowLine';
import { Sparkles, MessageSquare, Compass, Flower2, Award, GitCommit } from 'lucide-react';
import { SITE_CONTENT } from '../data/siteContent';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export interface ProcessProps {
  id?: string;
  className?: string;
}

const processSteps = [
  {
    step: '01',
    phase: 'DISCOVER',
    title: 'Vision & Hall Consultation',
    tamil: 'கலந்தாய்வு & தேவை அறிதல்',
    desc: 'Share your event date, kalyana mandapam name, and aesthetic preferences or mood boards.',
    icon: <MessageSquare className="w-5 h-5 text-[#E0C078]" />,
  },
  {
    step: '02',
    phase: 'CONCEPT',
    title: 'Custom Design Proposal',
    tamil: 'மேடை வரைபடம் & வடிவமைப்பு',
    desc: 'We tailor the stage dimensions, floral varieties, and lighting palette to fit your venue and budget.',
    icon: <Compass className="w-5 h-5 text-[#E0C078]" />,
  },
  {
    step: '03',
    phase: 'CURATION',
    title: 'Material & Floral Curation',
    tamil: 'மலர் மற்றும் பொருட்கள் தயாரிப்பு',
    desc: 'Fresh temple blooms and handcrafted structural sets are prepared at our Erode workshop.',
    icon: <Flower2 className="w-5 h-5 text-[#E0C078]" />,
  },
  {
    step: '04',
    phase: 'EXECUTION',
    title: 'Flawless On-Site Execution',
    tamil: 'நிறைவான மேடை அர்ப்பணிப்பு',
    desc: 'Our dedicated crew erects, lights, and details the stage well before the muhurtham begins.',
    icon: <Award className="w-5 h-5 text-[#E0C078]" />,
  },
];

export const Process: React.FC<ProcessProps> = ({
  id = 'process',
  className = '',
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      if (stepsRef.current) {
        gsap.from(stepsRef.current.children, {
          scrollTrigger: {
            trigger: stepsRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
          y: 40,
          opacity: 0,
          duration: 0.8,
          stagger: 0.12,
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
      className={`py-24 sm:py-32 bg-gradient-to-b from-[#3B0D18] via-[#4A0E1B] to-[#3B0D18] text-[#FFF8ED] relative overflow-hidden border-t border-[#C6A15B]/20 ${className}`}
      aria-labelledby="process-heading"
    >
      {/* Studio Blueprint Grid */}
      <div className="absolute inset-0 studio-grid-overlay pointer-events-none opacity-25" aria-hidden="true" />

      <Container size="wide" className="relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 sm:mb-20">
          <div className="mb-4 flex justify-center gap-2">
            <TechLabel variant="gold" icon={<GitCommit className="w-3.5 h-3.5" />}>
              THE DESIGN JOURNEY
            </TechLabel>
          </div>

          <h2
            id="process-heading"
            className="text-3xl sm:text-5xl md:text-6xl font-serif font-medium text-[#FFF8ED] tracking-tight leading-tight mb-4"
          >
            {SITE_CONTENT.process.heading}
          </h2>

          <p className="font-tamil text-base sm:text-xl font-medium text-[#E0C078] mb-4">
            கருத்துரு முதல் கண்கவர் மேடை வரை துல்லியமான 4 படிநிலைகள்
          </p>

          <p className="text-base text-[#F7F0E4]/85 font-light max-w-2xl mx-auto">
            {SITE_CONTENT.process.subheading}
          </p>

          <GlowLine variant="gold" className="max-w-xs mx-auto mt-6" />
        </div>

        {/* Process Timeline Spatial Grid */}
        <div
          ref={stepsRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-6 relative"
        >
          {processSteps.map((step) => (
            <SpatialFrame
              key={step.step}
              label={`PHASE // ${step.phase}`}
              theme="dark"
              className="p-6 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-serif text-3xl font-bold text-[#E0C078] group-hover:text-[#FFF8ED] transition-colors">
                    {step.step}
                  </span>
                  <div className="w-10 h-10 rounded-xl bg-black/40 border border-[#C6A15B]/30 flex items-center justify-center shadow-sm">
                    {step.icon}
                  </div>
                </div>

                <h3 className="font-serif text-lg font-bold text-[#FFF8ED] mb-1">
                  {step.title}
                </h3>

                <div className="font-tamil text-xs font-semibold text-[#E0C078] mb-3">
                  {step.tamil}
                </div>

                <p className="text-xs text-[#F7F0E4]/80 leading-relaxed font-light">
                  {step.desc}
                </p>
              </div>

              <div className="pt-4 mt-6 border-t border-white/10 text-[9px] font-mono uppercase tracking-widest text-[#E0C078]">
                STAGE SPECIFICATION {step.step}
              </div>
            </SpatialFrame>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default Process;

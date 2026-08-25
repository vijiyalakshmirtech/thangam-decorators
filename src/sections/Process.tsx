import React, { useRef, useEffect } from 'react';
import { Container } from '../components/common/Container';
import { Badge } from '../components/common/Badge';
import { Sparkles, MessageSquare, Compass, Flower2, Award } from 'lucide-react';
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
    title: 'Vision & Hall Consultation',
    tamil: 'கலந்தாய்வு & தேவை அறிதல்',
    desc: 'Share your event date, kalyana mandapam name, and aesthetic preferences or mood boards.',
    icon: <MessageSquare className="w-5 h-5 text-[#6E1830]" />,
  },
  {
    step: '02',
    title: 'Custom Design Proposal',
    tamil: 'மேடை வரைபடம் & வடிவமைப்பு',
    desc: 'We tailor the stage dimensions, floral varieties, and lighting palette to fit your venue and budget.',
    icon: <Compass className="w-5 h-5 text-[#6E1830]" />,
  },
  {
    step: '03',
    title: 'Material & Floral Curation',
    tamil: 'மலர் மற்றும் பொருட்கள் தயாரிப்பு',
    desc: 'Fresh temple blooms and handcrafted structural sets are prepared at our Erode workshop.',
    icon: <Flower2 className="w-5 h-5 text-[#6E1830]" />,
  },
  {
    step: '04',
    title: 'Flawless On-Site Execution',
    tamil: 'நிறைவான மேடை அர்ப்பணிப்பு',
    desc: 'Our dedicated crew erects, lights, and details the stage well before the muhurtham begins.',
    icon: <Award className="w-5 h-5 text-[#6E1830]" />,
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
      className={`py-24 sm:py-32 bg-[#F7F0E4] relative overflow-hidden border-t border-[#6E1830]/15 ${className}`}
      aria-labelledby="process-heading"
    >
      <Container size="default">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 sm:mb-20">
          <div className="mb-4 flex justify-center">
            <Badge variant="gold" icon={<Sparkles className="w-3.5 h-3.5 text-[#6E1830]" />}>
              {SITE_CONTENT.process.eyebrow}
            </Badge>
          </div>

          <h2
            id="process-heading"
            className="text-3xl sm:text-5xl md:text-6xl font-serif font-medium text-[#6E1830] tracking-tight leading-tight mb-4"
          >
            {SITE_CONTENT.process.heading}
          </h2>

          <p className="font-tamil text-base sm:text-xl font-medium text-[#6E1830]/80 mb-4">
            கருத்துரு முதல் கண்கவர் மேடை வரை துல்லியமான 4 படிநிலைகள்
          </p>

          <p className="text-base text-[#1F161A]/80 font-light max-w-2xl mx-auto">
            {SITE_CONTENT.process.subheading}
          </p>

          <div className="mt-6 h-[1.5px] w-20 bg-[#6E1830]/20 mx-auto" />
        </div>

        {/* Process Timeline Grid */}
        <div
          ref={stepsRef}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-6 relative"
        >
          {processSteps.map((step) => (
            <div
              key={step.step}
              className="p-6 rounded-2xl bg-[#FFF8ED] border border-[#6E1830]/15 hover:border-[#6E1830] transition-all duration-300 shadow-[0_4px_20px_rgba(74,14,27,0.04)] hover:shadow-lg group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-serif text-3xl font-bold text-[#6E1830] group-hover:text-[#4A0E1B] transition-colors">
                    {step.step}
                  </span>
                  <div className="w-9 h-9 rounded-lg bg-[#F7F0E4] border border-[#6E1830]/20 flex items-center justify-center shadow-sm">
                    {step.icon}
                  </div>
                </div>

                <h3 className="font-serif text-lg font-bold text-[#6E1830] mb-1">
                  {step.title}
                </h3>

                <div className="font-tamil text-xs font-semibold text-[#6E1830]/80 mb-3">
                  {step.tamil}
                </div>

                <p className="text-xs text-[#1F161A]/75 leading-relaxed font-light">
                  {step.desc}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-[#6E1830]/15 text-[10px] uppercase tracking-widest font-semibold text-[#6E1830]/70">
                Step {step.step}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

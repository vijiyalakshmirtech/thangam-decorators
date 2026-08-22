import React, { useRef, useEffect } from 'react';
import { Container } from '../components/common/Container';
import { Badge } from '../components/common/Badge';
import { Sparkles, MessageSquare, Compass, Palette, Flower2, Award } from 'lucide-react';
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
    title: 'Discover & Align',
    tamil: 'கலந்தாய்வு & தேவை அறிதல்',
    desc: 'Initial consultation to understand your family tradition, wedding timing, guest capacity, and hall dimensions in Erode or Kongu region.',
    icon: <MessageSquare className="w-5 h-5 text-[#C9A45C]" />,
  },
  {
    step: '02',
    title: 'Concept & Blueprint',
    tamil: 'மேடை வரைபடம் & வடிவமைப்பு',
    desc: 'Translating concepts into clear stage layouts, selecting flower palettes (Carnations, Roses, Jasmine), and finalizing structure dimensions.',
    icon: <Compass className="w-5 h-5 text-[#C9A45C]" />,
  },
  {
    step: '03',
    title: 'Design & Crafting',
    tamil: 'பட்டறை தயாரிப்பு & கட்டமைப்பு',
    desc: 'Our in-house fabrication team prepares hand-carved jali panels, mandapam pillars, lighting trusses, and silk valance drapes.',
    icon: <Palette className="w-5 h-5 text-[#C9A45C]" />,
  },
  {
    step: '04',
    title: 'Dawn Fresh Weaving',
    tamil: 'அதிகாலை மலர் அலங்கார வேலை',
    desc: 'Freshly procured flowers arrive at dawn. Our artisan florists hand-weave garlands, urli bowls, and stage backdrops on-site.',
    icon: <Flower2 className="w-5 h-5 text-[#C9A45C]" />,
  },
  {
    step: '05',
    title: 'Flawless Delivery',
    tamil: 'நிறைவான மேடை அர்ப்பணிப்பு',
    desc: 'Final lighting test and P.T. Selvam personal quality walkthrough hours prior to muhurtham for a completely stress-free celebration.',
    icon: <Award className="w-5 h-5 text-[#C9A45C]" />,
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
      className={`py-24 sm:py-32 bg-[#FFFDF8] relative overflow-hidden border-t border-[#C9A45C]/25 ${className}`}
      aria-labelledby="process-heading"
    >
      <Container size="default">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 sm:mb-20">
          <div className="mb-4 flex justify-center">
            <Badge variant="gold" icon={<Sparkles className="w-3.5 h-3.5 text-[#6E1830]" />}>
              Disciplined Execution
            </Badge>
          </div>

          <h2
            id="process-heading"
            className="text-3xl sm:text-5xl md:text-6xl font-serif font-medium text-[#6E1830] tracking-tight leading-tight mb-4"
          >
            OUR 5-STEP JOURNEY.
          </h2>

          <p className="font-tamil text-base sm:text-xl font-medium text-[#C9A45C] mb-4">
            கருத்துரு முதல் கண்கவர் மேடை வரை துல்லியமான 5 படிநிலைகள்
          </p>

          <p className="text-base text-[#1F161A]/80 font-light max-w-2xl mx-auto">
            A seamless, transparent, and punctual workflow that guarantees peace of mind for your family on your most sacred day.
          </p>

          <div className="mt-6 h-[1.5px] w-20 bg-gradient-to-r from-[#C9A45C] via-[#E0C078] to-[#9E7B35] mx-auto" />
        </div>

        {/* Process Timeline Grid */}
        <div
          ref={stepsRef}
          className="grid grid-cols-1 md:grid-cols-5 gap-6 sm:gap-6 relative"
        >
          {processSteps.map((step) => (
            <div
              key={step.step}
              className="p-6 rounded-2xl bg-[#F7F0E4]/70 border border-[#C9A45C]/35 hover:border-[#6E1830] transition-all duration-300 shadow-[0_4px_20px_rgba(110,24,48,0.04)] hover:shadow-lg group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-serif text-3xl font-bold text-[#6E1830] group-hover:text-[#C9A45C] transition-colors">
                    {step.step}
                  </span>
                  <div className="w-9 h-9 rounded-lg bg-[#FFFDF8] border border-[#C9A45C]/40 flex items-center justify-center shadow-sm">
                    {step.icon}
                  </div>
                </div>

                <h3 className="font-serif text-lg font-bold text-[#6E1830] mb-1">
                  {step.title}
                </h3>

                <div className="font-tamil text-xs font-semibold text-[#C9A45C] mb-3">
                  {step.tamil}
                </div>

                <p className="text-xs text-[#1F161A]/75 leading-relaxed font-light">
                  {step.desc}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-[#C9A45C]/25 text-[10px] uppercase tracking-widest font-semibold text-[#6E1830]/70">
                Phase {step.step}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

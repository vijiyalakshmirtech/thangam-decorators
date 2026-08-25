import React, { useRef, useEffect } from 'react';
import { Container } from '../components/common/Container';
import { Badge } from '../components/common/Badge';
import { Sparkles, Users, CheckCircle, ShieldCheck, HeartHandshake } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export interface WhyThangamProps {
  id?: string;
  className?: string;
}

const pillars = [
  {
    title: '100% Punctual Delivery',
    tamil: 'சரியான நேரத்தில் மேடை அமைப்பு',
    desc: 'Your stage is fully rigged, illuminated, and inspected hours prior to your guests arrival.',
    icon: <ShieldCheck className="w-6 h-6 text-[#FFF8ED]" />,
  },
  {
    title: 'Daily Fresh Flowers',
    tamil: 'தினசரி புதிய மலர் கொள்முதல்',
    desc: 'Direct daily sourcing of temple jasmine, lotus, and exotic blooms from regional flower markets.',
    icon: <Sparkles className="w-6 h-6 text-[#FFF8ED]" />,
  },
  {
    title: 'In-House Inventory',
    tamil: 'சொந்த மேடை உபகரணங்கள்',
    desc: 'Extensive collection of carved temple gopurams, contemporary arches, and lighting rigs.',
    icon: <Users className="w-6 h-6 text-[#FFF8ED]" />,
  },
  {
    title: 'Proprietor Oversight',
    tamil: 'உரிமையாளரின் நேரடி மேற்பார்வை',
    desc: 'P.T. Selvam personally supervises the execution of every major wedding and reception stage.',
    icon: <HeartHandshake className="w-6 h-6 text-[#FFF8ED]" />,
  },
];

export const WhyThangam: React.FC<WhyThangamProps> = ({
  id = 'why-thangam',
  className = '',
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      if (statsRef.current) {
        gsap.from(statsRef.current.children, {
          scrollTrigger: {
            trigger: statsRef.current,
            start: 'top 85%',
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
      className={`py-24 sm:py-32 bg-gradient-to-b from-[#4A0E1B] via-[#5A1426] to-[#4A0E1B] text-[#FFF8ED] relative overflow-hidden border-t border-white/10 ${className}`}
      aria-labelledby="why-thangam-heading"
    >
      <Container size="default">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 sm:mb-20">
          <div className="mb-4 flex justify-center">
            <Badge variant="dark" icon={<ShieldCheck className="w-3.5 h-3.5 text-[#FFF8ED]" />}>
              Excellence & Distinction
            </Badge>
          </div>

          <h2
            id="why-thangam-heading"
            className="text-3xl sm:text-5xl md:text-6xl font-serif font-medium text-[#FFF8ED] tracking-tight leading-tight mb-4"
          >
            THE PILLARS OF TRUST.
          </h2>

          <p className="font-tamil text-base sm:text-xl font-medium text-[#FFF8ED]/90 mb-4">
            ஏன் தங்கம் டெக்கரேட்டர்ஸ் உங்கள் குடும்பத்தின் முதல் தேர்வு?
          </p>

          <p className="text-base text-[#F7F0E4]/85 font-light max-w-2xl mx-auto">
            Authentic stage craftsmanship, direct proprietor accountability, and devotion to sacred milestone celebrations.
          </p>

          <div className="mt-6 h-[1.5px] w-20 bg-white/20 mx-auto" />
        </div>

        {/* Pillars Grid */}
        <div
          ref={statsRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-16"
        >
          {pillars.map((item, index) => (
            <div
              key={index}
              className="p-8 rounded-2xl bg-[#5A1426] border border-white/15 hover:border-white/30 transition-all duration-300 shadow-[0_4px_20px_rgba(74,14,27,0.3)] hover:shadow-lg group text-center flex flex-col items-center justify-between"
            >
              <div className="w-12 h-12 rounded-xl bg-[#6E1830] text-[#FFF8ED] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-md border border-white/10">
                {item.icon}
              </div>

              <div>
                <div className="text-sm uppercase tracking-wider font-bold text-[#FFF8ED] mb-2 font-serif">
                  {item.title}
                </div>

                <div className="font-tamil text-xs font-semibold text-[#FFF8ED]/80 mb-3">
                  {item.tamil}
                </div>

                <p className="text-xs text-[#F7F0E4]/75 leading-relaxed font-light">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Founder Trust Spotlight Box */}
        <div className="p-8 sm:p-12 rounded-3xl bg-[#5A1426] border border-white/15 shadow-[0_12px_40px_rgba(74,14,27,0.4)] grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-4 text-center lg:text-left">
            <div className="w-20 h-20 rounded-2xl bg-[#6E1830] border-2 border-white/20 flex items-center justify-center mx-auto lg:mx-0 mb-4 shadow-md">
              <span className="font-serif text-3xl font-bold text-[#FFF8ED]">PTS</span>
            </div>
            <h3 className="font-serif text-2xl font-bold text-[#FFF8ED]">
              P.T. Selvam
            </h3>
            <span className="text-xs uppercase tracking-widest text-[#FFF8ED]/80 font-semibold block mt-0.5">
              Founder & Master Decorator
            </span>
            <span className="text-xs text-[#F7F0E4]/70 font-sans block mt-1">
              Erode, Tamil Nadu
            </span>
          </div>

          <div className="lg:col-span-8 space-y-4">
            <blockquote className="text-base sm:text-lg text-[#F7F0E4]/90 font-light leading-relaxed font-serif italic">
              "A wedding stage is not merely decor; it is the sacred backdrop where lifelong vows are made and family legacies celebrated. Every pillar, flower string, and light beam must be executed with unwavering devotion."
            </blockquote>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="flex items-center gap-2 text-xs font-medium text-[#FFF8ED]">
                <CheckCircle className="w-4 h-4 text-[#FFF8ED] flex-shrink-0" />
                <span>Zero Middlemen & Transparent Planning</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-medium text-[#FFF8ED]">
                <CheckCircle className="w-4 h-4 text-[#FFF8ED] flex-shrink-0" />
                <span>Prompt On-Time Setup Before Muhurtham</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-medium text-[#FFF8ED]">
                <CheckCircle className="w-4 h-4 text-[#FFF8ED] flex-shrink-0" />
                <span>100% In-House Structures & Materials</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-medium text-[#FFF8ED]">
                <CheckCircle className="w-4 h-4 text-[#FFF8ED] flex-shrink-0" />
                <span>Direct Proprietor Phone Accessibility</span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

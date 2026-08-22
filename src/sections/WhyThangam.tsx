import React, { useRef, useEffect } from 'react';
import { Container } from '../components/common/Container';
import { Badge } from '../components/common/Badge';
import { Sparkles, Award, Users, CheckCircle, ShieldCheck, HeartHandshake } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export interface WhyThangamProps {
  id?: string;
  className?: string;
}

const stats = [
  {
    number: '25+',
    label: 'Years of Experience',
    tamil: '25+ ஆண்டுகள் நற்பெயர்',
    desc: 'Mastery in authentic Tamil wedding rituals and contemporary luxury stage scenography.',
    icon: <Award className="w-6 h-6 text-[#C9A45C]" />,
  },
  {
    number: '1,000+',
    label: 'Events Created',
    tamil: '1000+ மங்கள நிகழ்வுகள்',
    desc: 'Grand marriages, receptions, betrothals, and temple celebrations executed with perfection.',
    icon: <Users className="w-6 h-6 text-[#C9A45C]" />,
  },
  {
    number: '100+',
    label: 'Stage Designs',
    tamil: '100+ பிரத்யேக மேடை வகைகள்',
    desc: 'From sacred Vedic mandapams to monumental panoramic illuminated backdrops.',
    icon: <Sparkles className="w-6 h-6 text-[#C9A45C]" />,
  },
  {
    number: '100%',
    label: 'Custom Approach',
    tamil: '100% பிரத்யேக வடிவமைப்பு',
    desc: 'Tailored dimensions, custom color themes, and daily morning fresh flower procurement.',
    icon: <HeartHandshake className="w-6 h-6 text-[#C9A45C]" />,
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
      className={`py-24 sm:py-32 bg-[#F7F0E4] relative overflow-hidden border-t border-[#C9A45C]/25 ${className}`}
      aria-labelledby="why-thangam-heading"
    >
      <Container size="default">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 sm:mb-20">
          <div className="mb-4 flex justify-center">
            <Badge variant="gold" icon={<ShieldCheck className="w-3.5 h-3.5 text-[#6E1830]" />}>
              Excellence & Distinction
            </Badge>
          </div>

          <h2
            id="why-thangam-heading"
            className="text-3xl sm:text-5xl md:text-6xl font-serif font-medium text-[#6E1830] tracking-tight leading-tight mb-4"
          >
            THE PILLARS OF TRUST.
          </h2>

          <p className="font-tamil text-base sm:text-xl font-medium text-[#C9A45C] mb-4">
            ஏன் தங்கம் டெக்கரேட்டர்ஸ் உங்கள் குடும்பத்தின் முதல் தேர்வு?
          </p>

          <p className="text-base text-[#1F161A]/80 font-light max-w-2xl mx-auto">
            A quarter-century legacy of authentic craftsmanship, direct proprietor accountability, and uncompromised devotion to sacred milestone celebrations.
          </p>

          <div className="mt-6 h-[1.5px] w-20 bg-gradient-to-r from-[#C9A45C] via-[#E0C078] to-[#9E7B35] mx-auto" />
        </div>

        {/* Stats Grid */}
        <div
          ref={statsRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-16"
        >
          {stats.map((item, index) => (
            <div
              key={index}
              className="p-8 rounded-2xl bg-[#FFFDF8] border border-[#C9A45C]/35 hover:border-[#6E1830] transition-all duration-300 shadow-[0_4px_20px_rgba(110,24,48,0.04)] hover:shadow-lg group text-center flex flex-col items-center justify-between"
            >
              <div className="w-12 h-12 rounded-xl bg-[#6E1830] text-[#FFFDF8] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-md">
                {item.icon}
              </div>

              <div>
                <div className="font-serif text-4xl sm:text-5xl font-bold text-[#6E1830] tracking-tight mb-2">
                  {item.number}
                </div>

                <div className="text-xs uppercase tracking-widest font-bold text-[#1F161A] mb-1">
                  {item.label}
                </div>

                <div className="font-tamil text-xs font-semibold text-[#C9A45C] mb-3">
                  {item.tamil}
                </div>

                <p className="text-xs text-[#1F161A]/75 leading-relaxed font-light">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Founder Trust Spotlight Box */}
        <div className="p-8 sm:p-12 rounded-3xl bg-[#FFFDF8] border border-[#C9A45C]/45 shadow-[0_12px_40px_rgba(110,24,48,0.06)] grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-4 text-center lg:text-left">
            <div className="w-20 h-20 rounded-2xl bg-[#6E1830] border-2 border-[#C9A45C] flex items-center justify-center mx-auto lg:mx-0 mb-4 shadow-md">
              <span className="font-serif text-3xl font-bold text-[#FFFDF8]">PTS</span>
            </div>
            <h3 className="font-serif text-2xl font-bold text-[#6E1830]">
              P.T. Selvam
            </h3>
            <span className="text-xs uppercase tracking-widest text-[#C9A45C] font-semibold block mt-0.5">
              Founder & Master Decorator
            </span>
            <span className="text-xs text-[#1F161A]/70 font-sans block mt-1">
              Erode, Tamil Nadu
            </span>
          </div>

          <div className="lg:col-span-8 space-y-4">
            <p className="text-base sm:text-lg text-[#1F161A]/85 font-light leading-relaxed">
              "We believe that a wedding stage is not merely decorative carpentry; it is the sacred altar where two families unite and where memories are etched for generations. Every flower garland, pillar alignment, and fabric fold receives my personal inspection."
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="flex items-center gap-2 text-xs font-medium text-[#6E1830]">
                <CheckCircle className="w-4 h-4 text-[#C9A45C] flex-shrink-0" />
                <span>Zero Middlemen & Transparent Planning</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-medium text-[#6E1830]">
                <CheckCircle className="w-4 h-4 text-[#C9A45C] flex-shrink-0" />
                <span>Prompt On-Time Setup Before Muhurtham</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-medium text-[#6E1830]">
                <CheckCircle className="w-4 h-4 text-[#C9A45C] flex-shrink-0" />
                <span>100% In-House Structures & Materials</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-medium text-[#6E1830]">
                <CheckCircle className="w-4 h-4 text-[#C9A45C] flex-shrink-0" />
                <span>Direct Proprietor Phone Accessibility</span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

import React, { useRef, useEffect } from 'react';
import { Container } from '../components/common/Container';
import { MagneticButton } from '../components/common/MagneticButton';
import { Button } from '../components/common/Button';
import { Sparkles, MessageCircle, Phone } from 'lucide-react';
import { siteConfig } from '../config/site';
import { generateWhatsAppUrl, generateTelUrl } from '../utils/urlHelpers';
import { trackEvent } from '../lib/analytics';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export interface BrandStatementProps {
  id?: string;
  className?: string;
  onOpenQuoteModal?: () => void;
}

export const BrandStatement: React.FC<BrandStatementProps> = ({
  id = 'statement',
  className = '',
  onOpenQuoteModal,
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const whatsAppUrl = generateWhatsAppUrl(
    `Hello P.T. Selvam, I am inspired by your stage work and would like to discuss decor for our upcoming wedding.`
  );
  const telUrl = generateTelUrl(siteConfig.contact.phonePrimary);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      if (textRef.current) {
        gsap.from(textRef.current.children, {
          scrollTrigger: {
            trigger: textRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
          y: 40,
          opacity: 0,
          duration: 1,
          stagger: 0.2,
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
      className={`py-28 sm:py-36 bg-gradient-to-br from-[#6E1830] via-[#4A1022] to-[#300713] text-[#FFFDF8] relative overflow-hidden border-y border-[#C9A45C]/40 ${className}`}
      aria-labelledby="statement-heading"
    >
      {/* Background Ambient Gold Halos */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[#C9A45C]/15 blur-[160px] rounded-full pointer-events-none"
        aria-hidden="true"
      />

      <Container size="default" className="relative z-10 text-center">
        <div ref={textRef} className="max-w-4xl mx-auto flex flex-col items-center">

          {/* Subtle Champagne Gold Accent Pill */}
          <div className="mb-6">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#300713]/80 border border-[#C9A45C]/50 text-xs font-mono tracking-[0.25em] text-[#C9A45C] uppercase backdrop-blur-sm">
              <Sparkles className="w-3.5 h-3.5 text-[#E0C078]" />
              The Thangam Promise
            </span>
          </div>

          {/* Giant Monumental Headline */}
          <h2
            id="statement-heading"
            className="text-5xl sm:text-7xl md:text-8xl font-serif font-bold text-[#FFFDF8] tracking-tight leading-[1.02] mb-6"
          >
            YOUR EVENT. <br className="hidden sm:block" />
            <span className="text-[#C9A45C] font-serif italic">OUR ART.</span>
          </h2>

          {/* Tamil Signature Narrative */}
          <p className="font-tamil text-xl sm:text-3xl font-medium text-[#E0C078] mb-6 tracking-wide">
            "உங்கள் மங்கள நன்னாள். எங்கள் கலைப்படைப்பு."
          </p>

          {/* Editorial Subtitle */}
          <p className="text-lg sm:text-2xl text-[#F7F0E4]/90 font-serif italic max-w-2xl leading-relaxed mb-10">
            We create stages that become an everlasting part of your most cherished family memories.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4 w-full sm:w-auto">
            {onOpenQuoteModal && (
              <MagneticButton strength={0.3}>
                <Button
                  variant="secondary"
                  size="lg"
                  onClick={() => {
                    trackEvent('cta_click', { sourceLocation: 'brand_statement', ctaText: 'Book Your Event' });
                    onOpenQuoteModal();
                  }}
                  leftIcon={<Sparkles className="w-4 h-4 text-[#6E1830]" />}
                  className="w-full sm:w-auto uppercase tracking-wider text-xs font-bold"
                >
                  Book Your Event
                </Button>
              </MagneticButton>
            )}

            {whatsAppUrl && (
              <Button
                variant="whatsapp"
                size="lg"
                href={whatsAppUrl}
                target="_blank"
                leftIcon={<MessageCircle className="w-4 h-4" />}
                onClick={() => trackEvent('whatsapp_click', { sourceLocation: 'statement_whatsapp' })}
                className="w-full sm:w-auto text-xs uppercase tracking-wider font-semibold"
              >
                Inquire on WhatsApp
              </Button>
            )}

            <Button
              variant="ghost"
              size="lg"
              href={telUrl}
              leftIcon={<Phone className="w-4 h-4 text-[#C9A45C]" />}
              onClick={() => trackEvent('phone_click', { sourceLocation: 'statement_call' })}
              className="w-full sm:w-auto text-xs uppercase tracking-wider text-[#FFFDF8] hover:text-[#C9A45C]"
            >
              Direct Call: {siteConfig.contact.phonePrimary}
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
};

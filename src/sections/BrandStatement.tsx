'use client';

import React, { useRef, useEffect } from 'react';
import { Container } from '../components/common/Container';
import { MagneticButton } from '../components/common/MagneticButton';
import { Button } from '../components/common/Button';
import { TechLabel } from '../components/common/TechLabel';
import { GlowLine } from '../components/common/GlowLine';
import { Sparkles, MessageCircle, Phone, Crown } from 'lucide-react';
import { siteConfig } from '../config/site';
import { SITE_CONTENT } from '../data/siteContent';
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
    siteConfig.contact.phonePrimary,
    `Hello P.T. Selvam, I would like to discuss stage decor for our upcoming wedding celebration.`
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
      className={`py-28 sm:py-36 bg-gradient-to-br from-[#3B0D18] via-[#4A0E1B] to-[#3B0D18] text-[#FFF8ED] relative overflow-hidden border-y border-[#C6A15B]/20 ${className}`}
      aria-labelledby="statement-heading"
    >
      {/* Blueprint Grid Overlay */}
      <div className="absolute inset-0 studio-grid-overlay pointer-events-none opacity-30" aria-hidden="true" />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[#C6A15B]/10 blur-[160px] rounded-full pointer-events-none"
        aria-hidden="true"
      />

      <Container size="wide" className="relative z-10 text-center">
        <div ref={textRef} className="max-w-4xl mx-auto flex flex-col items-center">

          {/* Eyebrow Pill */}
          <div className="mb-6 flex justify-center">
            <TechLabel variant="gold" icon={<Crown className="w-3.5 h-3.5" />}>
              {siteConfig.brand.name} • SACRED CELEBRATION ARCHITECTURE
            </TechLabel>
          </div>

          {/* Monumental Editorial Headline */}
          <h2
            id="statement-heading"
            className="text-4xl sm:text-6xl md:text-7xl font-serif font-bold text-[#FFF8ED] tracking-tight leading-[1.08] mb-6"
          >
            {SITE_CONTENT.ctaBanner.heading}
          </h2>

          {/* Tamil Signature Narrative */}
          <p className="font-tamil text-xl sm:text-2xl font-medium text-[#E0C078] mb-6 tracking-wide">
            "உங்கள் மங்கள நன்னாள். எங்கள் பாரம்பரிய கலைப்படைப்பு."
          </p>

          {/* Subtitle */}
          <p className="text-base sm:text-xl text-[#F7F0E4]/85 font-light max-w-2xl leading-relaxed mb-10">
            {SITE_CONTENT.ctaBanner.subheading}
          </p>

          <GlowLine variant="gold" className="max-w-xs mx-auto mb-10" />

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4 w-full sm:w-auto">
            {onOpenQuoteModal && (
              <MagneticButton strength={0.3}>
                <Button
                  variant="primary"
                  size="lg"
                  onClick={() => {
                    trackEvent('cta_click', { sourceLocation: 'brand_statement', ctaText: 'Request Quote' });
                    onOpenQuoteModal();
                  }}
                  leftIcon={<Sparkles className="w-4 h-4 text-[#3B0D18]" />}
                  className="w-full sm:w-auto uppercase tracking-wider text-xs font-bold shadow-gold-md"
                >
                  {SITE_CONTENT.ctaBanner.quoteButtonText}
                </Button>
              </MagneticButton>
            )}

            {whatsAppUrl && (
              <Button
                variant="whatsapp"
                size="lg"
                href={whatsAppUrl ?? undefined}
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
              leftIcon={<Phone className="w-4 h-4 text-[#E0C078]" />}
              onClick={() => trackEvent('phone_click', { sourceLocation: 'statement_call' })}
              className="w-full sm:w-auto text-xs font-mono uppercase tracking-wider text-[#FFF8ED] hover:text-[#E0C078] font-semibold"
            >
              {SITE_CONTENT.ctaBanner.callButtonText}
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default BrandStatement;

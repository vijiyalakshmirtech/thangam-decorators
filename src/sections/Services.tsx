'use client';

import React from 'react';
import { Container } from '../components/common/Container';
import { TechLabel } from '../components/common/TechLabel';
import { SpatialFrame } from '../components/common/SpatialFrame';
import { GlowLine } from '../components/common/GlowLine';
import { Button } from '../components/common/Button';
import { SERVICES_DATA } from '../data/services';
import { generateWhatsAppUrl } from '../utils/urlHelpers';
import { trackEvent } from '../lib/analytics';
import {
  Sparkles,
  Flower2,
  Landmark,
  Heart,
  CheckCircle2,
  MessageCircle,
  ArrowRight,
  Layers
} from 'lucide-react';

export interface ServicesProps {
  id?: string;
  className?: string;
}

const SERVICE_ICONS: Record<string, React.ReactNode> = {
  'wedding-mandapams': <Landmark className="w-5 h-5 text-[#E0C078]" />,
  'reception-stages': <Sparkles className="w-5 h-5 text-[#E0C078]" />,
  'pre-wedding-ceremonies': <Heart className="w-5 h-5 text-[#E0C078]" />,
  'temple-cultural-events': <Flower2 className="w-5 h-5 text-[#E0C078]" />,
};

export const Services: React.FC<ServicesProps> = ({
  id = 'services',
  className = '',
}) => {
  return (
    <section
      id={id}
      className={`py-24 sm:py-32 bg-gradient-to-b from-[#3B0D18] via-[#4A0E1B] to-[#3B0D18] text-[#FFF8ED] relative overflow-hidden border-t border-[#C6A15B]/20 ${className}`}
      aria-labelledby="services-heading"
    >
      {/* Studio Grid Overlay */}
      <div className="absolute inset-0 studio-grid-overlay pointer-events-none opacity-30" aria-hidden="true" />
      <div
        className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[600px] h-[500px] bg-[#C6A15B]/10 blur-[150px] rounded-full pointer-events-none"
        aria-hidden="true"
      />

      <Container size="wide" className="relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 sm:mb-20">
          <div className="mb-4 flex justify-center gap-2">
            <TechLabel variant="gold" icon={<Layers className="w-3.5 h-3.5" />}>
              SCENOGRAPHY DISCIPLINES • ERODE STUDIO LAB
            </TechLabel>
          </div>

          <h2
            id="services-heading"
            className="text-3xl sm:text-5xl md:text-6xl font-serif font-medium text-[#FFF8ED] tracking-tight leading-tight mb-4"
          >
            DIGITAL SCENOGRAPHY SERVICES.
          </h2>

          <p className="font-tamil text-base sm:text-xl font-medium text-[#E0C078] mb-4">
            பாரம்பரிய நேர்த்தியும் நவீன கம்பீரமும் இணைந்த மேடை அலங்காரங்கள்
          </p>

          <p className="text-base text-[#F7F0E4]/85 font-light max-w-2xl mx-auto">
            From sacred Vedic muhurtham mandapams to monumental evening reception backdrops, P.T. Selvam leads end-to-end stage design and execution across Erode and Western Tamil Nadu.
          </p>

          <GlowLine variant="gold" className="max-w-xs mx-auto mt-6" />
        </div>

        {/* 4 Core Scenography Service Modules */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10">
          {SERVICES_DATA.map((service, idx) => {
            const whatsAppUrl = generateWhatsAppUrl(
              `Hello P.T. Selvam, I would like to inquire about "${service.titleEnglish}" decoration for our upcoming event.`
            );
            const icon = SERVICE_ICONS[service.id] || (
              <Sparkles className="w-5 h-5 text-[#E0C078]" />
            );

            return (
              <SpatialFrame
                key={service.id}
                label={`SERVICE // 0${idx + 1}`}
                theme="dark"
                className="p-6 sm:p-8 flex flex-col justify-between group"
              >
                <article
                  className="flex flex-col justify-between h-full"
                  aria-labelledby={`service-title-${service.id}`}
                >
                  <div>
                    {/* Header Row: Icon & Tag */}
                    <div className="flex items-center justify-between gap-4 mb-6">
                      <div className="w-12 h-12 rounded-xl bg-black/40 border border-[#C6A15B]/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-sm">
                        {icon}
                      </div>

                      <TechLabel variant="gold">
                        BESPOKE CRAFTSMANSHIP
                      </TechLabel>
                    </div>

                    {/* English Title */}
                    <h3
                      id={`service-title-${service.id}`}
                      className="text-2xl sm:text-3xl font-serif font-bold text-[#FFF8ED] group-hover:text-[#E0C078] transition-colors leading-snug mb-1"
                    >
                      {service.titleEnglish}
                    </h3>

                    {/* Tamil Title */}
                    {service.titleTamil && (
                      <p className="font-tamil text-sm font-semibold text-[#E0C078] mb-3">
                        {service.titleTamil}
                      </p>
                    )}

                    {/* Short Description */}
                    <p className="text-sm text-[#F7F0E4]/80 leading-relaxed mb-6 font-light">
                      {service.shortDescription}
                    </p>

                    {/* Execution Highlights Checklist */}
                    <div className="mb-6 pt-5 border-t border-white/10">
                      <h4 className="text-[10px] font-mono uppercase tracking-widest text-[#E0C078] mb-3">
                        DISCIPLINE SPECIFICATIONS:
                      </h4>
                      <ul className="space-y-2">
                        {service.features.map((feature, fIdx) => (
                          <li key={fIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#F7F0E4]/90 font-light">
                            <CheckCircle2 className="w-4 h-4 text-[#E0C078] flex-shrink-0 mt-0.5" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Action Bar */}
                  <div className="pt-5 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
                    <Button
                      variant="secondary"
                      size="sm"
                      href="#portfolio"
                      rightIcon={<ArrowRight className="w-3.5 h-3.5 text-[#E0C078] group-hover:translate-x-1 transition-transform" />}
                      className="text-xs font-semibold border-[#C6A15B]/30 hover:border-[#E0C078]"
                      onClick={() =>
                        trackEvent('service_view', {
                          serviceId: service.id,
                          category: service.relatedCategory,
                        })
                      }
                    >
                      View Stage Designs
                    </Button>

                    {whatsAppUrl && (
                      <Button
                        variant="whatsapp"
                        size="sm"
                        href={whatsAppUrl ?? undefined}
                        target="_blank"
                        leftIcon={<MessageCircle className="w-3.5 h-3.5" />}
                        className="text-xs font-semibold uppercase tracking-wider"
                        onClick={() =>
                          trackEvent('whatsapp_click', {
                            sourceLocation: 'services_card',
                            serviceId: service.id,
                          })
                        }
                      >
                        Inquire
                      </Button>
                    )}
                  </div>
                </article>
              </SpatialFrame>
            );
          })}
        </div>
      </Container>
    </section>
  );
};

export default Services;

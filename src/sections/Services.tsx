import React from 'react';
import { Container } from '../components/common/Container';
import { SectionHeading } from '../components/common/SectionHeading';
import { Badge } from '../components/common/Badge';
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
  ArrowRight
} from 'lucide-react';

export interface ServicesProps {
  id?: string;
  className?: string;
}

const SERVICE_ICONS: Record<string, React.ReactNode> = {
  'wedding-mandapams': <Landmark className="w-6 h-6 text-thangam-gold-400" />,
  'reception-stages': <Sparkles className="w-6 h-6 text-thangam-gold-400" />,
  'pre-wedding-ceremonies': <Heart className="w-6 h-6 text-thangam-gold-400" />,
  'temple-cultural-events': <Flower2 className="w-6 h-6 text-thangam-gold-400" />,
};

export const Services: React.FC<ServicesProps> = ({
  id = 'services',
  className = '',
}) => {
  return (
    <section
      id={id}
      className={`py-24 sm:py-32 bg-[#F7F0E4] relative overflow-hidden border-t border-[#C9A45C]/25 ${className}`}
      aria-labelledby="services-heading"
    >
      {/* Subtle ambient lighting backdrop */}
      <div
        className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[600px] h-[400px] bg-[#C9A45C]/8 blur-[140px] rounded-full pointer-events-none"
        aria-hidden="true"
      />

      <Container size="default" className="relative z-10">
        {/* Section Heading */}
        <SectionHeading
          eyebrow="Décor Capabilities"
          title="BESPOKE SCENOGRAPHY SERVICES."
          subtitle="பாரம்பரிய நேர்த்தியும் நவீன கம்பீரமும் இணைந்த சேவைகள்"
          description="From auspicious Vedic muhurtham mandapams in temple halls to high-glamour evening reception backdrops, P.T. Selvam and his team deliver complete on-site decor execution across Erode and Western Tamil Nadu."
          className="mb-12 sm:mb-16"
        />

        {/* 4 Core Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10">
          {SERVICES_DATA.map((service) => {
            const whatsAppUrl = generateWhatsAppUrl(
              `Hello P.T. Selvam, I would like to inquire about "${service.titleEnglish}" decoration for our upcoming event.`
            );
            const icon = SERVICE_ICONS[service.id] || (
              <Sparkles className="w-6 h-6 text-[#C9A45C]" />
            );

            return (
              <article
                key={service.id}
                className="group rounded-2xl bg-[#FFFDF8] border border-[#C9A45C]/35 hover:border-[#6E1830] p-6 sm:p-9 flex flex-col justify-between transition-all duration-500 shadow-[0_6px_25px_rgba(110,24,48,0.04)] hover:shadow-[0_15px_40px_rgba(110,24,48,0.1)]"
                aria-labelledby={`service-title-${service.id}`}
              >
                <div>
                  {/* Top Card Header: Icon & Category Tag */}
                  <div className="flex items-center justify-between gap-4 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-[#6E1830]/10 border border-[#C9A45C]/40 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      {icon}
                    </div>

                    <Badge variant="gold">Bespoke Setup</Badge>
                  </div>

                  {/* English Service Title */}
                  <h3
                    id={`service-title-${service.id}`}
                    className="text-2xl sm:text-3xl font-serif font-bold text-[#6E1830] group-hover:text-[#4A1022] transition-colors leading-snug mb-1"
                  >
                    {service.titleEnglish}
                  </h3>

                  {/* Tamil Service Subtitle */}
                  {service.titleTamil && (
                    <p className="font-tamil text-sm font-semibold text-[#C9A45C] mb-3">
                      {service.titleTamil}
                    </p>
                  )}

                  {/* Short Description */}
                  <p className="text-sm text-[#1F161A]/80 leading-relaxed mb-6 font-light">
                    {service.shortDescription}
                  </p>

                  {/* Features Checklist */}
                  <div className="mb-6 pt-5 border-t border-[#C9A45C]/20">
                    <h4 className="text-[11px] font-semibold uppercase tracking-widest text-[#6E1830] mb-3">
                      Key Execution Highlights
                    </h4>
                    <ul className="space-y-2.5">
                      {service.features.map((feature, fIdx) => (
                        <li key={fIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#1F161A]/85 font-light">
                          <CheckCircle2 className="w-4 h-4 text-[#C9A45C] flex-shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Card Action Row */}
                <div className="pt-5 border-t border-[#C9A45C]/25 flex flex-wrap items-center justify-between gap-3">
                  <Button
                    variant="secondary"
                    size="sm"
                    href="#portfolio"
                    rightIcon={<ArrowRight className="w-3.5 h-3.5 text-[#6E1830] group-hover:translate-x-1 transition-transform" />}
                    className="text-xs font-semibold"
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
                      href={whatsAppUrl}
                      target="_blank"
                      leftIcon={<MessageCircle className="w-3.5 h-3.5" />}
                      className="text-xs font-semibold"
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
            );
          })}
        </div>
      </Container>
    </section>
  );
};

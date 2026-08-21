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
      className={`py-16 sm:py-20 md:py-24 bg-thangam-dark-950 relative border-t border-white/5 ${className}`}
      aria-labelledby="services-heading"
    >
      {/* Subtle ambient lighting backdrop */}
      <div 
        className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[600px] h-[400px] bg-thangam-gold-500/5 blur-[140px] rounded-full pointer-events-none" 
        aria-hidden="true" 
      />

      <Container size="default" className="relative z-10">
        {/* Section Heading */}
        <SectionHeading
          eyebrow="Decor Capabilities"
          title="Bespoke Scenography & Event Services"
          subtitle="Traditional Craftsmanship Meets Contemporary Grandeur"
          description="From auspicious Vedic muhurtham mandapams in temple halls to high-glamour evening reception backdrops, P.T. Selvam and his team deliver complete on-site decor execution across Erode and Western Tamil Nadu."
          className="mb-10 sm:mb-14"
        />

        {/* 4 Core Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-10">
          {SERVICES_DATA.map((service) => {
            const whatsAppUrl = generateWhatsAppUrl(
              `Hello P.T. Selvam, I would like to inquire about "${service.titleEnglish}" decoration for our upcoming event.`
            );
            const icon = SERVICE_ICONS[service.id] || (
              <Sparkles className="w-6 h-6 text-thangam-gold-400" />
            );

            return (
              <article
                key={service.id}
                className="luxury-card group rounded-2xl bg-thangam-dark-900/80 border border-thangam-gold-500/20 hover:border-thangam-gold-500/50 p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 shadow-xl"
                aria-labelledby={`service-title-${service.id}`}
              >
                <div>
                  {/* Top Card Header: Icon & Category Tag */}
                  <div className="flex items-center justify-between gap-4 mb-5">
                    <div className="w-12 h-12 rounded-xl bg-thangam-gold-500/10 border border-thangam-gold-500/25 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      {icon}
                    </div>

                    <Badge variant="gold">Bespoke Setup</Badge>
                  </div>

                  {/* English Service Title */}
                  <h3
                    id={`service-title-${service.id}`}
                    className="text-xl sm:text-2xl font-serif font-bold text-thangam-ivory-50 group-hover:text-thangam-gold-300 transition-colors leading-snug mb-1"
                  >
                    {service.titleEnglish}
                  </h3>

                  {/* Tamil Service Subtitle */}
                  {service.titleTamil && (
                    <p className="text-xs sm:text-sm font-serif italic text-thangam-gold-400/80 mb-3">
                      {service.titleTamil}
                    </p>
                  )}

                  {/* Short Description */}
                  <p className="text-xs sm:text-sm text-thangam-ivory-100/75 leading-relaxed mb-6">
                    {service.shortDescription}
                  </p>

                  {/* Features Checklist */}
                  <div className="mb-6 pt-4 border-t border-white/5">
                    <h4 className="text-[11px] font-semibold uppercase tracking-wider text-thangam-gold-400/90 mb-3">
                      Key Execution Highlights
                    </h4>
                    <ul className="space-y-2.5">
                      {service.features.map((feature, fIdx) => (
                        <li key={fIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-thangam-ivory-100/80">
                          <CheckCircle2 className="w-4 h-4 text-thangam-gold-400 flex-shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Card Action Row */}
                <div className="pt-5 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
                  <Button
                    variant="ghost"
                    size="sm"
                    href="#portfolio"
                    rightIcon={<ArrowRight className="w-3.5 h-3.5 text-thangam-gold-400 group-hover:translate-x-1 transition-transform" />}
                    className="text-xs sm:text-sm hover:bg-thangam-gold-500/10"
                    onClick={() =>
                      trackEvent('service_view', {
                        serviceId: service.id,
                        category: service.relatedCategory,
                      })
                    }
                  >
                    View Designs
                  </Button>

                  {whatsAppUrl && (
                    <Button
                      variant="whatsapp"
                      size="sm"
                      href={whatsAppUrl}
                      target="_blank"
                      leftIcon={<MessageCircle className="w-3.5 h-3.5" />}
                      className="text-xs"
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

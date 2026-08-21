import React from 'react';
import { Container } from '../common/Container';
import { siteConfig } from '../../config/site';
import { SERVICES_DATA } from '../../data/services';
import { 
  generateTelUrl, 
  generateMailtoUrl, 
  generateGoogleMapsUrl, 
  generateWhatsAppUrl 
} from '../../utils/urlHelpers';
import { 
  Phone, 
  Mail, 
  MapPin, 
  MessageCircle, 
  Instagram, 
  Facebook, 
  Youtube, 
  ArrowUp,
  Sparkles
} from 'lucide-react';
import { trackEvent } from '../../lib/analytics';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const whatsAppUrl = generateWhatsAppUrl(
    `Hello P.T. Selvam, I would like to inquire about wedding stage decoration.`
  );
  const primaryTelUrl = generateTelUrl(siteConfig.contact.phonePrimary);
  const secondaryTelUrl = generateTelUrl(siteConfig.contact.phoneSecondary);
  const mailtoUrl = generateMailtoUrl('Website Inquiry — Thangam Decorators');
  const mapsUrl = generateGoogleMapsUrl();

  const NAV_LINKS = [
    { label: 'Home', href: '#hero' },
    { label: 'Decor Services', href: '#services' },
    { label: 'Authentic Portfolio', href: '#portfolio' },
    { label: 'Heritage & Trust', href: '#about' },
    { label: 'Client FAQs', href: '#faqs' },
    { label: 'Consultation & Contact', href: '#contact' },
  ];

  return (
    <footer 
      className="bg-thangam-dark-950 border-t border-thangam-gold-500/20 pt-16 pb-28 sm:pb-16 text-thangam-ivory-100/80 text-sm relative"
      aria-label="Site Footer"
    >
      <Container size="wide">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-white/10">
          {/* Column 1: Brand & Founder Identity (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-lg overflow-hidden border border-thangam-gold-500/40 bg-thangam-dark-900 flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-5 h-5 text-thangam-gold-400" />
              </div>
              <div>
                <span className="block font-serif text-xl font-bold text-thangam-gold-300">
                  {siteConfig.brand.name}
                </span>
                <span className="block text-xs text-thangam-ivory-100/70 uppercase tracking-wider font-sans">
                  Proprietor: {siteConfig.brand.ownerName}
                </span>
              </div>
            </div>

            <p className="text-xs text-thangam-ivory-100/70 leading-relaxed font-sans max-w-sm">
              {siteConfig.site.description}
            </p>

            <p className="text-xs font-serif italic text-thangam-gold-300/90">
              "{siteConfig.brand.tagline}"
            </p>

            {/* Verified Social Channels */}
            <div className="flex items-center gap-3 pt-2" aria-label="Social media channels">
              {siteConfig.social.instagram && (
                <a
                  href={siteConfig.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow Thangam Decorators on Instagram"
                  className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-thangam-ivory-100 hover:text-thangam-gold-300 hover:border-thangam-gold-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-thangam-gold-400"
                >
                  <Instagram className="w-4 h-4" />
                </a>
              )}

              {siteConfig.social.facebook && (
                <a
                  href={siteConfig.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow Thangam Decorators on Facebook"
                  className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-thangam-ivory-100 hover:text-thangam-gold-300 hover:border-thangam-gold-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-thangam-gold-400"
                >
                  <Facebook className="w-4 h-4" />
                </a>
              )}

              {siteConfig.social.youtube && (
                <a
                  href={siteConfig.social.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow Thangam Decorators on YouTube"
                  className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-thangam-ivory-100 hover:text-thangam-gold-300 hover:border-thangam-gold-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-thangam-gold-400"
                >
                  <Youtube className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>

          {/* Column 2: Section Navigation (2 cols) */}
          <div className="lg:col-span-2">
            <h4 className="font-serif text-sm font-semibold text-thangam-gold-300 uppercase tracking-wider mb-4">
              Navigation
            </h4>
            <nav aria-label="Footer Navigation">
              <ul className="space-y-2.5 text-xs font-sans">
                {NAV_LINKS.map((link, idx) => (
                  <li key={idx}>
                    <a
                      href={link.href}
                      className="text-thangam-ivory-100/70 hover:text-thangam-gold-300 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-thangam-gold-400 rounded"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Column 3: Decor Offerings (3 cols) */}
          <div className="lg:col-span-3">
            <h4 className="font-serif text-sm font-semibold text-thangam-gold-300 uppercase tracking-wider mb-4">
              Stage Specialties
            </h4>
            <ul className="space-y-2.5 text-xs font-sans">
              {SERVICES_DATA.map((service) => (
                <li key={service.id}>
                  <a
                    href="#services"
                    className="text-thangam-ivory-100/70 hover:text-thangam-gold-300 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-thangam-gold-400 rounded block"
                  >
                    {service.titleEnglish}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Verified Contact & Workshop Location (3 cols) */}
          <div className="lg:col-span-3 space-y-3.5">
            <h4 className="font-serif text-sm font-semibold text-thangam-gold-300 uppercase tracking-wider mb-4">
              Direct Contact
            </h4>
            <ul className="space-y-3 text-xs font-sans">
              {/* Primary Phone */}
              <li>
                <a
                  href={primaryTelUrl}
                  onClick={() => trackEvent('phone_click', { sourceLocation: 'footer', phoneType: 'primary' })}
                  className="flex items-start gap-2.5 text-thangam-ivory-100/80 hover:text-thangam-gold-300 transition-colors group"
                >
                  <Phone className="w-4 h-4 text-thangam-gold-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="block font-medium text-thangam-ivory-50 group-hover:text-thangam-gold-300">
                      {siteConfig.contact.phonePrimary}
                    </span>
                    <span className="text-[10px] text-thangam-ivory-100/50">
                      P.T. Selvam (Direct)
                    </span>
                  </div>
                </a>
              </li>

              {/* Secondary Phone */}
              <li>
                <a
                  href={secondaryTelUrl}
                  onClick={() => trackEvent('phone_click', { sourceLocation: 'footer', phoneType: 'secondary' })}
                  className="flex items-start gap-2.5 text-thangam-ivory-100/80 hover:text-thangam-gold-300 transition-colors group"
                >
                  <Phone className="w-4 h-4 text-thangam-gold-400/70 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="block font-medium text-thangam-ivory-50 group-hover:text-thangam-gold-300">
                      {siteConfig.contact.phoneSecondary}
                    </span>
                    <span className="text-[10px] text-thangam-ivory-100/50">
                      Alternate Line
                    </span>
                  </div>
                </a>
              </li>

              {/* WhatsApp */}
              {whatsAppUrl && (
                <li>
                  <a
                    href={whatsAppUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackEvent('whatsapp_click', { sourceLocation: 'footer' })}
                    className="flex items-center gap-2.5 text-emerald-400 hover:text-emerald-300 transition-colors font-medium"
                  >
                    <MessageCircle className="w-4 h-4 flex-shrink-0" />
                    <span>Chat on WhatsApp</span>
                  </a>
                </li>
              )}

              {/* Email */}
              {siteConfig.contact.email && (
                <li>
                  <a
                    href={mailtoUrl}
                    onClick={() => trackEvent('email_click', { sourceLocation: 'footer' })}
                    className="flex items-start gap-2.5 text-thangam-ivory-100/80 hover:text-thangam-gold-300 transition-colors"
                  >
                    <Mail className="w-4 h-4 text-thangam-gold-400 flex-shrink-0 mt-0.5" />
                    <span className="break-all">{siteConfig.contact.email}</span>
                  </a>
                </li>
              )}

              {/* Physical Address */}
              <li>
                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-2.5 text-thangam-ivory-100/70 hover:text-thangam-gold-300 transition-colors group"
                >
                  <MapPin className="w-4 h-4 text-thangam-gold-400 flex-shrink-0 mt-0.5" />
                  <address className="not-italic leading-relaxed">
                    {siteConfig.location.address}, {siteConfig.location.city} – {siteConfig.location.postalCode}
                  </address>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright & Back-to-Top Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-thangam-ivory-100/50 text-center sm:text-left font-sans">
          <p>
            © {new Date().getFullYear()} {siteConfig.brand.name}. All Rights Reserved. Led by {siteConfig.brand.ownerName} ({siteConfig.location.city}, Tamil Nadu).
          </p>

          <button
            type="button"
            onClick={scrollToTop}
            aria-label="Scroll back to top of page"
            className="flex items-center gap-1.5 text-thangam-gold-400 hover:text-thangam-gold-300 transition-colors p-1.5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-thangam-gold-400 rounded"
          >
            <span className="text-xs">Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </Container>
    </footer>
  );
};

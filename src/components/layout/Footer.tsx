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
    { label: 'Brand Legacy', href: '#about' },
    { label: 'Transformation', href: '#experience' },
    { label: 'Signature Styles', href: '#decorations' },
    { label: 'Stage Showroom', href: '#showroom' },
    { label: 'Curated Portfolio', href: '#portfolio' },
    { label: 'Client FAQs', href: '#faqs' },
    { label: 'Consultation & Contact', href: '#contact' },
  ];

  return (
    <footer
      className="bg-[#4A0E1B] border-t border-white/15 pt-20 pb-28 sm:pb-20 text-[#F7F0E4]/80 text-sm relative overflow-hidden"
      aria-label="Site Footer"
    >
      {/* Background Subtle Gradient */}
      <div
        className="absolute top-0 right-0 w-[500px] h-[300px] bg-[#6E1830]/30 blur-[130px] rounded-full pointer-events-none"
        aria-hidden="true"
      />

      <Container size="wide">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-14 border-b border-white/10">
          {/* Column 1: Brand & Founder Identity (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl overflow-hidden border border-white/20 bg-[#5A1426] flex items-center justify-center flex-shrink-0 shadow-md">
                <Sparkles className="w-5 h-5 text-[#FFF8ED]" />
              </div>
              <div>
                <span className="block font-serif text-2xl font-bold text-[#FFF8ED] tracking-tight">
                  {siteConfig.brand.name}
                </span>
                <span className="block font-tamil text-xs text-[#FFF8ED]/90 font-semibold mt-0.5">
                  தங்கம் டெக்கரேட்டர்ஸ் • ஈரோடு
                </span>
              </div>
            </div>

            <p className="text-xs text-[#F7F0E4]/75 leading-relaxed font-light max-w-sm">
              {siteConfig.site.description}
            </p>

            <p className="text-xs font-serif italic text-[#FFF8ED]/90">
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
                  className="w-10 h-10 rounded-full bg-[#5A1426] border border-white/20 flex items-center justify-center text-[#FFF8ED] hover:text-white hover:border-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
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
                  className="w-10 h-10 rounded-full bg-[#5A1426] border border-white/20 flex items-center justify-center text-[#FFF8ED] hover:text-white hover:border-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
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
                  className="w-10 h-10 rounded-full bg-[#5A1426] border border-white/20 flex items-center justify-center text-[#FFF8ED] hover:text-white hover:border-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  <Youtube className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>

          {/* Column 2: Section Navigation (2 cols) */}
          <div className="lg:col-span-2">
            <h4 className="font-serif text-sm font-bold text-[#FFF8ED] uppercase tracking-widest mb-4">
              Navigation
            </h4>
            <nav aria-label="Footer Navigation">
              <ul className="space-y-2.5 text-xs font-sans font-light">
                {NAV_LINKS.map((link, idx) => (
                  <li key={idx}>
                    <a
                      href={link.href}
                      className="text-[#F7F0E4]/70 hover:text-[#FFF8ED] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white rounded"
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
            <h4 className="font-serif text-sm font-bold text-[#FFF8ED] uppercase tracking-widest mb-4">
              Stage Specialties
            </h4>
            <ul className="space-y-2.5 text-xs font-sans font-light">
              {SERVICES_DATA.map((service) => (
                <li key={service.id}>
                  <a
                    href="#showroom"
                    className="text-[#F7F0E4]/70 hover:text-[#FFF8ED] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white rounded block"
                  >
                    {service.titleEnglish}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Verified Contact & Workshop Location (3 cols) */}
          <div className="lg:col-span-3 space-y-3.5">
            <h4 className="font-serif text-sm font-bold text-[#FFF8ED] uppercase tracking-widest mb-4">
              Direct Contact
            </h4>
            <ul className="space-y-3 text-xs font-sans">
              {/* Primary Phone */}
              <li>
                <a
                  href={primaryTelUrl}
                  onClick={() => trackEvent('phone_click', { sourceLocation: 'footer', phoneType: 'primary' })}
                  className="flex items-start gap-2.5 text-[#F7F0E4]/80 hover:text-[#FFF8ED] transition-colors group"
                >
                  <Phone className="w-4 h-4 text-[#FFF8ED] flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="block font-semibold text-[#FFF8ED] group-hover:text-white">
                      {siteConfig.contact.phonePrimary}
                    </span>
                    <span className="text-[10px] text-[#F7F0E4]/60">
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
                  className="flex items-start gap-2.5 text-[#F7F0E4]/80 hover:text-[#FFF8ED] transition-colors group"
                >
                  <Phone className="w-4 h-4 text-[#FFF8ED]/80 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="block font-semibold text-[#FFF8ED] group-hover:text-white">
                      {siteConfig.contact.phoneSecondary}
                    </span>
                    <span className="text-[10px] text-[#F7F0E4]/60">
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
                    className="flex items-center gap-2.5 text-[#4ADE80] hover:text-[#86EFAC] transition-colors font-medium"
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
                    className="flex items-start gap-2.5 text-[#F7F0E4]/80 hover:text-[#FFF8ED] transition-colors"
                  >
                    <Mail className="w-4 h-4 text-[#FFF8ED] flex-shrink-0 mt-0.5" />
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
                  className="flex items-start gap-2.5 text-[#F7F0E4]/70 hover:text-[#FFF8ED] transition-colors group"
                >
                  <MapPin className="w-4 h-4 text-[#FFF8ED] flex-shrink-0 mt-0.5" />
                  <address className="not-italic leading-relaxed font-light">
                    {siteConfig.location.address}, {siteConfig.location.city} – {siteConfig.location.postalCode}
                  </address>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright & Back-to-Top Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#F7F0E4]/60 text-center sm:text-left font-sans">
          <p>
            © {new Date().getFullYear()} {siteConfig.brand.name}. All Rights Reserved. Led by {siteConfig.brand.ownerName} ({siteConfig.location.city}, Tamil Nadu).
          </p>

          <button
            type="button"
            onClick={scrollToTop}
            aria-label="Scroll back to top of page"
            className="flex items-center gap-1.5 text-[#FFF8ED] hover:text-white transition-colors p-1.5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white rounded"
          >
            <span className="text-xs uppercase tracking-widest font-semibold">Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </Container>
    </footer>
  );
};

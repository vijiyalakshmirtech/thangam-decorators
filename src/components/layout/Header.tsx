'use client';

import React, { useState, useEffect } from 'react';
import { Container } from '../common/Container';
import { Button } from '../common/Button';
import { MagneticButton } from '../common/MagneticButton';
import { TechLabel } from '../common/TechLabel';
import { Phone, Menu, X, Sparkles, MessageCircle } from 'lucide-react';
import { siteConfig } from '../../config/site';
import { generateTelUrl, generateWhatsAppUrl } from '../../utils/urlHelpers';
import { trackEvent } from '../../lib/analytics';

export interface HeaderProps {
  onOpenQuoteModal?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenQuoteModal }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 25);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Studio', href: '#hero' },
    { label: 'About', href: '#about' },
    { label: 'Decorations', href: '#decorations' },
    { label: 'Showroom', href: '#showroom' },
    { label: 'Portfolio', href: '#portfolio' },
    { label: 'Services', href: '#services' },
    { label: 'Process', href: '#process' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-[#3B0D18]/90 backdrop-blur-xl border-b border-[#C6A15B]/30 py-3 shadow-[0_8px_32px_rgba(59,13,24,0.45)]'
          : 'bg-[#3B0D18]/75 backdrop-blur-md py-4 sm:py-5 border-b border-[#C6A15B]/20'
      }`}
    >
      <Container size="wide">
        <div className="flex items-center justify-between">
          {/* Brand Emblem & Digital Studio Status */}
          <a
            href="#hero"
            className="flex items-center gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E0C078] rounded-xl p-1 transition-transform duration-300 group-hover:scale-[1.02]"
          >
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl overflow-hidden border border-[#C6A15B]/40 bg-[#FFF8ED] flex-shrink-0 transition-all duration-300 shadow-md group-hover:border-[#E0C078]">
              <img
                src={siteConfig.brand.logo}
                alt={siteConfig.brand.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <div className="flex items-baseline gap-2">
                <span className="font-serif text-lg sm:text-2xl font-bold tracking-wider text-[#FFF8ED] transition-colors leading-none">
                  THANGAM
                </span>
                <span className="font-tamil text-sm sm:text-base font-semibold text-[#E0C078] leading-none">
                  தங்கம்
                </span>
              </div>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-[9px] sm:text-[10px] text-[#F7F0E4]/80 uppercase tracking-widest font-mono">
                  {siteConfig.brand.ownerName}
                </span>
                <span className="hidden sm:inline-block text-[#C6A15B] text-[8px]">•</span>
                <span className="hidden sm:inline-flex items-center gap-1 text-[9px] font-mono text-[#E0C078]/90">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#25D366] animate-pulse" />
                  STUDIO ACTIVE
                </span>
              </div>
            </div>
          </a>

          {/* Desktop Architectural Navigation */}
          <nav className="hidden xl:flex items-center gap-6 2xl:gap-8" aria-label="Main Navigation">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-[11px] uppercase tracking-[0.2em] text-[#FFF8ED]/85 hover:text-[#E0C078] font-medium transition-all duration-300 py-1 relative group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E0C078] rounded"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-gradient-to-r from-[#C6A15B] to-[#E0C078] transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Desktop Header Actions (Dial, WhatsApp, Inquire) */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Quick WhatsApp Action */}
            <a
              href={generateWhatsAppUrl(siteConfig.contact.phonePrimary, 'Vanakkam Thangam Decorators, I would like to inquire about stage decoration.') ?? '#'}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent('whatsapp_click', { sourceLocation: 'header' })}
              aria-label="Inquire via WhatsApp"
              className="p-2 text-[#25D366] hover:text-white bg-[#3B0D18] hover:bg-[#25D366]/20 rounded-xl border border-[#25D366]/30 transition-all duration-300 focus-visible:ring-2 focus-visible:ring-[#25D366]"
            >
              <MessageCircle className="w-4 h-4" />
            </a>

            {/* Direct Phone Dial */}
            <Button
              variant="secondary"
              size="sm"
              href={generateTelUrl(siteConfig.contact.phonePrimary)}
              leftIcon={<Phone className="w-3.5 h-3.5 text-[#E0C078]" />}
              onClick={() => trackEvent('phone_click', { sourceLocation: 'header' })}
              aria-label={`Call ${siteConfig.brand.ownerName} at ${siteConfig.contact.phonePrimary}`}
              className="text-xs font-mono font-medium border-[#C6A15B]/30 hover:border-[#E0C078]"
            >
              {siteConfig.contact.phonePrimary}
            </Button>

            {/* Primary Consultation Trigger */}
            {onOpenQuoteModal && (
              <MagneticButton strength={0.25}>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => {
                    trackEvent('cta_click', { sourceLocation: 'header', ctaText: 'Inquire Scenography' });
                    onOpenQuoteModal();
                  }}
                  leftIcon={<Sparkles className="w-3.5 h-3.5 text-[#3B0D18]" />}
                  className="text-xs uppercase tracking-wider font-semibold shadow-gold-sm"
                >
                  Inquire Stage
                </Button>
              </MagneticButton>
            )}
          </div>

          {/* Mobile Menu Trigger Button */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-expanded={isMobileMenuOpen}
            aria-label="Toggle navigation menu"
            className="xl:hidden p-2.5 text-[#FFF8ED] hover:text-[#E0C078] bg-[#4A0E1B] rounded-xl border border-[#C6A15B]/30 min-h-[44px] min-w-[44px] flex items-center justify-center focus-visible:ring-2 focus-visible:ring-[#E0C078] shadow-md transition-all duration-300"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </Container>

      {/* Mobile Navigation Architectural Drawer */}
      {isMobileMenuOpen && (
        <div className="xl:hidden bg-[#3B0D18]/98 backdrop-blur-2xl border-b border-[#C6A15B]/30 px-5 py-6 mt-3 shadow-2xl animate-fadeIn">
          <div className="mb-4 flex items-center justify-between pb-3 border-b border-white/10">
            <TechLabel variant="gold">
              ERODE STAGE STUDIO
            </TechLabel>
            <span className="text-[10px] font-mono text-[#F7F0E4]/70">
              ESTD. SACRED HERITAGE
            </span>
          </div>

          <nav className="flex flex-col space-y-3 text-center" aria-label="Mobile Navigation">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-sm font-serif uppercase tracking-widest text-[#FFF8ED] hover:text-[#E0C078] py-2.5 border-b border-white/10 transition-colors"
              >
                {link.label}
              </a>
            ))}

            <div className="pt-4 flex flex-col gap-3">
              <Button
                variant="secondary"
                size="md"
                href={generateTelUrl(siteConfig.contact.phonePrimary)}
                leftIcon={<Phone className="w-4 h-4 text-[#E0C078]" />}
                className="w-full justify-center font-mono"
                onClick={() => {
                  trackEvent('phone_click', { sourceLocation: 'mobile_drawer' });
                  setIsMobileMenuOpen(false);
                }}
              >
                Call {siteConfig.contact.phonePrimary}
              </Button>

              <Button
                variant="whatsapp"
                size="md"
                href={generateWhatsAppUrl(siteConfig.contact.phonePrimary, 'Vanakkam Thangam Decorators, I would like to inquire about stage decoration.') ?? undefined}
                leftIcon={<MessageCircle className="w-4 h-4" />}
                className="w-full justify-center"
                onClick={() => {
                  trackEvent('whatsapp_click', { sourceLocation: 'mobile_drawer' });
                  setIsMobileMenuOpen(false);
                }}
              >
                WhatsApp Inquiry
              </Button>

              {onOpenQuoteModal && (
                <Button
                  variant="primary"
                  size="md"
                  className="w-full justify-center font-semibold uppercase tracking-wider"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onOpenQuoteModal();
                  }}
                >
                  Book Stage Consultation
                </Button>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

import React, { useState, useEffect } from 'react';
import { Container } from '../common/Container';
import { Button } from '../common/Button';
import { MagneticButton } from '../common/MagneticButton';
import { Phone, Menu, X, Sparkles } from 'lucide-react';
import { siteConfig } from '../../config/site';
import { generateTelUrl } from '../../utils/urlHelpers';
import { trackEvent } from '../../lib/analytics';

export interface HeaderProps {
  onOpenQuoteModal?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenQuoteModal }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#hero' },
    { label: 'About', href: '#about' },
    { label: 'Decorations', href: '#decorations' },
    { label: 'Stage Showroom', href: '#showroom' },
    { label: 'Portfolio', href: '#portfolio' },
    { label: 'Services', href: '#services' },
    { label: 'Process', href: '#process' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#F7F0E4]/95 backdrop-blur-md border-b border-[#C9A45C]/35 py-3 shadow-[0_4px_25px_rgba(110,24,48,0.06)]'
          : 'bg-[#F7F0E4]/80 backdrop-blur-sm py-4 sm:py-5 border-b border-[#C9A45C]/15'
      }`}
    >
      <Container size="wide">
        <div className="flex items-center justify-between">
          {/* Brand Logo & Typography */}
          <a
            href="#hero"
            className="flex items-center gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A45C] rounded-lg p-1"
          >
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-lg overflow-hidden border border-[#C9A45C]/60 bg-[#FFFDF8] flex-shrink-0 group-hover:border-[#6E1830] transition-colors shadow-sm">
              <img
                src={siteConfig.brand.logo}
                alt={siteConfig.brand.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <div className="flex items-baseline gap-2">
                <span className="font-serif text-lg sm:text-2xl font-bold tracking-wider text-[#6E1830] group-hover:text-[#4A1022] transition-colors leading-none">
                  THANGAM
                </span>
                <span className="font-tamil text-sm sm:text-base font-semibold text-[#C9A45C] leading-none">
                  தங்கம்
                </span>
              </div>
              <span className="block text-[9px] sm:text-[10px] text-[#1F161A]/70 uppercase tracking-widest font-sans mt-0.5">
                {siteConfig.brand.ownerName} • Erode
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center gap-7" aria-label="Main Navigation">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-[11px] uppercase tracking-[0.2em] text-[#1F161A]/80 hover:text-[#6E1830] font-medium transition-colors py-1 relative group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A45C] rounded"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#C9A45C] transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Desktop Header Actions */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Phone Call Button */}
            <Button
              variant="secondary"
              size="sm"
              href={generateTelUrl(siteConfig.contact.phonePrimary)}
              leftIcon={<Phone className="w-3.5 h-3.5" />}
              onClick={() => trackEvent('phone_click', { sourceLocation: 'header' })}
              aria-label={`Call ${siteConfig.brand.ownerName} at ${siteConfig.contact.phonePrimary}`}
              className="text-xs font-semibold"
            >
              {siteConfig.contact.phonePrimary}
            </Button>

            {onOpenQuoteModal && (
              <MagneticButton strength={0.25}>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={onOpenQuoteModal}
                  leftIcon={<Sparkles className="w-3.5 h-3.5 text-[#C9A45C]" />}
                  className="text-xs uppercase tracking-wider"
                >
                  Book Your Event
                </Button>
              </MagneticButton>
            )}
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-expanded={isMobileMenuOpen}
            aria-label="Toggle navigation menu"
            className="xl:hidden p-2 text-[#6E1830] hover:text-[#4A1022] bg-[#FFFDF8] rounded-lg border border-[#C9A45C]/40 min-h-[44px] min-w-[44px] flex items-center justify-center focus-visible:ring-2 focus-visible:ring-[#C9A45C] shadow-sm"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </Container>

      {/* Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <div className="xl:hidden bg-[#FFFDF8]/98 backdrop-blur-xl border-b border-[#C9A45C]/40 px-4 py-6 mt-3 shadow-xl animate-fadeIn">
          <nav className="flex flex-col space-y-3 text-center" aria-label="Mobile Navigation">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-sm font-serif uppercase tracking-widest text-[#6E1830] hover:text-[#C9A45C] py-2 border-b border-[#C9A45C]/15 transition-colors"
              >
                {link.label}
              </a>
            ))}

            <div className="pt-4 flex flex-col gap-3">
              <Button
                variant="secondary"
                size="md"
                href={generateTelUrl(siteConfig.contact.phonePrimary)}
                leftIcon={<Phone className="w-4 h-4" />}
                className="w-full"
                onClick={() => {
                  trackEvent('phone_click', { sourceLocation: 'mobile_drawer' });
                  setIsMobileMenuOpen(false);
                }}
              >
                Call {siteConfig.contact.phonePrimary}
              </Button>

              {onOpenQuoteModal && (
                <Button
                  variant="primary"
                  size="md"
                  className="w-full"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onOpenQuoteModal();
                  }}
                >
                  Book Your Event / Get Quote
                </Button>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

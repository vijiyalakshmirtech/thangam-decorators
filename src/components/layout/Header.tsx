import React, { useState, useEffect } from 'react';
import { Container } from '../common/Container';
import { Button } from '../common/Button';
import { Phone, Menu, X } from 'lucide-react';
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
    { label: 'Services', href: '#services' },
    { label: 'Portfolio', href: '#portfolio' },
    { label: 'About', href: '#about' },
    { label: 'FAQs', href: '#faqs' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-thangam-dark-950/90 backdrop-blur-md border-b border-thangam-gold-500/20 py-3 shadow-lg'
          : 'bg-transparent py-4 sm:py-5'
      }`}
    >
      <Container size="wide">
        <div className="flex items-center justify-between">
          {/* Brand Logo & Typography */}
          <a
            href="#hero"
            className="flex items-center gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-thangam-gold-400 rounded-lg p-1"
          >
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-lg overflow-hidden border border-thangam-gold-500/40 bg-thangam-dark-900 flex-shrink-0 group-hover:border-thangam-gold-400 transition-colors">
              <img
                src={siteConfig.brand.logo}
                alt={siteConfig.brand.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <span className="block font-serif text-lg sm:text-xl font-bold tracking-wider text-thangam-gold-400 group-hover:text-thangam-gold-300 transition-colors leading-tight">
                {siteConfig.brand.name}
              </span>
              <span className="block text-[10px] sm:text-xs text-thangam-ivory-100/60 uppercase tracking-widest font-sans">
                {siteConfig.brand.ownerName} • Erode
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6" aria-label="Main Navigation">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-xs uppercase tracking-widest text-thangam-ivory-100/80 hover:text-thangam-gold-300 font-medium transition-colors py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-thangam-gold-400 rounded"
              >
                {link.label}
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
            >
              {siteConfig.contact.phonePrimary}
            </Button>

            {onOpenQuoteModal && (
              <Button
                variant="primary"
                size="sm"
                onClick={onOpenQuoteModal}
              >
                Get Quote
              </Button>
            )}
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-expanded={isMobileMenuOpen}
            aria-label="Toggle navigation menu"
            className="lg:hidden p-2 text-thangam-ivory-100 hover:text-thangam-gold-300 bg-white/5 rounded-lg border border-white/10 min-h-[44px] min-w-[44px] flex items-center justify-center focus-visible:ring-2 focus-visible:ring-thangam-gold-400"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </Container>

      {/* Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-thangam-dark-900/98 backdrop-blur-xl border-b border-thangam-gold-500/20 px-4 py-6 mt-3 animate-fadeIn">
          <nav className="flex flex-col space-y-4 text-center" aria-label="Mobile Navigation">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-sm font-serif uppercase tracking-widest text-thangam-ivory-50 hover:text-thangam-gold-300 py-2 transition-colors"
              >
                {link.label}
              </a>
            ))}

            <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
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
                  Request Event Quote
                </Button>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

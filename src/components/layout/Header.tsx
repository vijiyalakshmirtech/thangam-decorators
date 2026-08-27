'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Container } from '../common/Container';
import { Button } from '../common/Button';
import { MagneticButton } from '../common/MagneticButton';
import { MessageCircle, ArrowRight, Layers, Eye } from 'lucide-react';
import { siteConfig } from '../../config/site';
import { generateWhatsAppUrl } from '../../utils/urlHelpers';
import { trackEvent } from '../../lib/analytics';

export interface HeaderProps {
  onOpenQuoteModal?: () => void;
}

interface NavItem {
  number: string;
  label: string;
  sublabel: string;
  href: string;
  hasPreview?: 'showroom' | 'archive';
}

const NAV_ITEMS: NavItem[] = [
  {
    number: '01',
    label: 'EXPERIENCE',
    sublabel: '01 / ENTER THE STUDIO',
    href: '#experience',
  },
  {
    number: '02',
    label: 'SHOWROOM',
    sublabel: '02 / EXPLORE 3D',
    href: '#showroom',
    hasPreview: 'showroom',
  },
  {
    number: '03',
    label: 'ARCHIVE',
    sublabel: '03 / DIGITAL PROJECTS',
    href: '#portfolio',
    hasPreview: 'archive',
  },
  {
    number: '04',
    label: 'SERVICES',
    sublabel: '04 / DESIGN SYSTEMS',
    href: '#services',
  },
  {
    number: '05',
    label: 'PROCESS',
    sublabel: '05 / HOW WE CREATE',
    href: '#process',
  },
  {
    number: '06',
    label: 'STUDIO',
    sublabel: '06 / OUR PHILOSOPHY',
    href: '#why-thangam',
  },
];

export const Header: React.FC<HeaderProps> = ({ onOpenQuoteModal }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('experience');
  const [hoveredPreview, setHoveredPreview] = useState<'showroom' | 'archive' | null>(null);
  const previewTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Scroll detection & active section intersection
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);

      const sectionIds = ['experience', 'showroom', 'portfolio', 'services', 'process', 'why-thangam'];
      const scrollPos = window.scrollY + 200;

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sectionIds[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMouseEnterPreview = (preview: 'showroom' | 'archive') => {
    if (previewTimeoutRef.current) clearTimeout(previewTimeoutRef.current);
    setHoveredPreview(preview);
  };

  const handleMouseLeavePreview = () => {
    if (previewTimeoutRef.current) clearTimeout(previewTimeoutRef.current);
    previewTimeoutRef.current = setTimeout(() => {
      setHoveredPreview(null);
    }, 200);
  };

  const whatsAppUrl = generateWhatsAppUrl(
    siteConfig.contact.phonePrimary,
    'Vanakkam P.T. Selvam, I would like to inquire about stage decoration consultation.'
  );

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'py-2.5 sm:py-3 bg-[#2A0610]/95 backdrop-blur-2xl border-b border-[#C6A15B]/30 shadow-[0_12px_40px_rgba(42,6,16,0.65)]'
          : 'py-3.5 sm:py-5 bg-gradient-to-b from-[#2A0610]/90 via-[#3B0D18]/70 to-transparent backdrop-blur-md border-b border-[#C6A15B]/15'
      }`}
    >
      <Container size="wide">
        <div className="flex items-center justify-between gap-4">
          
          {/* ============================================================ */}
          {/* LEFT: BRAND EMBLEM & STUDIO IDENTITY                         */}
          {/* ============================================================ */}
          <a
            href="#hero"
            className="flex items-center gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E0C078] rounded-xl p-1 transition-transform duration-300 group-hover:scale-[1.01]"
            aria-label="Thangam Decorators — Return to Top"
          >
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl overflow-hidden border border-[#C6A15B]/40 bg-[#FFF8ED] flex-shrink-0 transition-all duration-300 shadow-md group-hover:border-[#E0C078] group-hover:shadow-[0_0_15px_rgba(224,192,120,0.3)]">
              <img
                src={siteConfig.brand.logo}
                alt={siteConfig.brand.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <div className="flex items-baseline gap-2">
                <span className="font-serif text-lg sm:text-xl font-bold tracking-wider text-[#FFF8ED] transition-colors leading-none">
                  THANGAM
                </span>
                <span className="font-tamil text-xs sm:text-sm font-semibold text-[#E0C078] leading-none">
                  டெக்கரேட்டர்ஸ்
                </span>
              </div>
              <div className="flex items-center gap-1.5 mt-1">
                <span className="text-[9px] font-mono tracking-[0.2em] text-[#E0C078] uppercase">
                  DIGITAL SCENOGRAPHY STUDIO
                </span>
              </div>
            </div>
          </a>

          {/* ============================================================ */}
          {/* CENTER: DESKTOP DIGITAL SCENOGRAPHY NAV RAIL                */}
          {/* ============================================================ */}
          <nav
            className="hidden lg:flex items-center gap-1 xl:gap-2 px-3 py-1.5 rounded-full bg-black/40 border border-[#C6A15B]/20 backdrop-blur-xl relative"
            aria-label="Main Navigation"
          >
            {NAV_ITEMS.map((item) => {
              const targetId = item.href.replace('#', '');
              const isActive = activeSection === targetId;

              return (
                <div
                  key={item.number}
                  className="relative"
                  onMouseEnter={() => item.hasPreview && handleMouseEnterPreview(item.hasPreview)}
                  onMouseLeave={handleMouseLeavePreview}
                >
                  <a
                    href={item.href}
                    aria-current={isActive ? 'page' : undefined}
                    className={`relative flex flex-col items-center px-3 py-1.5 rounded-lg text-xs font-mono transition-all duration-300 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E0C078] ${
                      isActive
                        ? 'text-[#FFF8ED] font-semibold bg-[#4A0E1B]/80 border border-[#C6A15B]/40 shadow-sm'
                        : 'text-[#F7F0E4]/70 hover:text-[#E0C078] hover:bg-white/5'
                    }`}
                  >
                    {/* Primary Number + Label */}
                    <div className="flex items-center gap-1.5">
                      <span className={`text-[10px] ${isActive ? 'text-[#E0C078]' : 'text-[#C6A15B]/70 group-hover:text-[#E0C078]'}`}>
                        {item.number}
                      </span>
                      <span className="tracking-[0.15em] uppercase text-[11px]">
                        {item.label}
                      </span>
                    </div>

                    {/* Active Glow Coordinate Tick */}
                    {isActive && (
                      <span className="absolute -bottom-1 w-2 h-0.5 bg-[#E0C078] rounded-full shadow-[0_0_8px_#E0C078]" />
                    )}

                    {/* Hover Tooltip Descriptor */}
                    <span className="absolute -bottom-7 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded bg-[#2A0610] border border-[#C6A15B]/40 text-[9px] font-mono tracking-widest text-[#E0C078] opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap shadow-lg z-50">
                      {item.sublabel}
                    </span>
                  </a>

                  {/* Micro Preview Panel: SHOWROOM */}
                  {item.hasPreview === 'showroom' && hoveredPreview === 'showroom' && (
                    <div
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-80 p-4 rounded-2xl bg-[#2A0610]/98 border border-[#C6A15B]/40 shadow-[0_15px_45px_rgba(42,6,16,0.85)] backdrop-blur-2xl z-50 animate-fadeIn text-left"
                      onMouseEnter={() => handleMouseEnterPreview('showroom')}
                      onMouseLeave={handleMouseLeavePreview}
                    >
                      <div className="flex items-center justify-between pb-2 mb-3 border-b border-[#C6A15B]/20">
                        <span className="text-[10px] font-mono uppercase tracking-widest text-[#E0C078]">
                          SHOWROOM // 3D LAB
                        </span>
                        <Eye className="w-3.5 h-3.5 text-[#E0C078]" />
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-[11px] font-mono mb-4 text-[#F7F0E4]/90">
                        <div className="p-2 rounded bg-black/40 border border-white/10 hover:border-[#E0C078] transition-colors">
                          <span className="text-[#E0C078] block text-[9px]">01</span> VEDIC MANDAPAM
                        </div>
                        <div className="p-2 rounded bg-black/40 border border-white/10 hover:border-[#E0C078] transition-colors">
                          <span className="text-[#E0C078] block text-[9px]">02</span> IMPERIAL RECEPTION
                        </div>
                        <div className="p-2 rounded bg-black/40 border border-white/10 hover:border-[#E0C078] transition-colors">
                          <span className="text-[#E0C078] block text-[9px]">03</span> GOLDEN JHAROKHA
                        </div>
                        <div className="p-2 rounded bg-black/40 border border-white/10 hover:border-[#E0C078] transition-colors">
                          <span className="text-[#E0C078] block text-[9px]">04</span> SYMMETRIC COLUMNS
                        </div>
                      </div>

                      <a
                        href="#showroom"
                        className="flex items-center justify-between text-xs font-mono uppercase tracking-wider text-[#FFF8ED] hover:text-[#E0C078] pt-2 border-t border-white/10 group/btn"
                      >
                        <span>Enter 3D Showroom</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                      </a>
                    </div>
                  )}

                  {/* Micro Preview Panel: ARCHIVE */}
                  {item.hasPreview === 'archive' && hoveredPreview === 'archive' && (
                    <div
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-80 p-4 rounded-2xl bg-[#2A0610]/98 border border-[#C6A15B]/40 shadow-[0_15px_45px_rgba(42,6,16,0.85)] backdrop-blur-2xl z-50 animate-fadeIn text-left"
                      onMouseEnter={() => handleMouseEnterPreview('archive')}
                      onMouseLeave={handleMouseLeavePreview}
                    >
                      <div className="flex items-center justify-between pb-2 mb-3 border-b border-[#C6A15B]/20">
                        <span className="text-[10px] font-mono uppercase tracking-widest text-[#E0C078]">
                          ARCHIVE // CASE STUDIES
                        </span>
                        <Layers className="w-3.5 h-3.5 text-[#E0C078]" />
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-[11px] font-mono mb-4 text-[#F7F0E4]/90">
                        <div className="p-2 rounded bg-black/40 border border-white/10 hover:border-[#E0C078] transition-colors">
                          WEDDING MANDAPAMS
                        </div>
                        <div className="p-2 rounded bg-black/40 border border-white/10 hover:border-[#E0C078] transition-colors">
                          RECEPTION STAGES
                        </div>
                        <div className="p-2 rounded bg-black/40 border border-white/10 hover:border-[#E0C078] transition-colors">
                          FAMILY CEREMONIES
                        </div>
                        <div className="p-2 rounded bg-black/40 border border-white/10 hover:border-[#E0C078] transition-colors">
                          TEMPLE FESTIVALS
                        </div>
                      </div>

                      <a
                        href="#portfolio"
                        className="flex items-center justify-between text-xs font-mono uppercase tracking-wider text-[#FFF8ED] hover:text-[#E0C078] pt-2 border-t border-white/10 group/btn"
                      >
                        <span>View Digital Archive</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                      </a>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* ============================================================ */}
          {/* RIGHT: LIVE STUDIO STATUS & PRIMARY CTA                      */}
          {/* ============================================================ */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            
            {/* Live Studio Indicator */}
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/40 border border-[#C6A15B]/20 text-[10px] font-mono text-[#E0C078]">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>STUDIO ONLINE</span>
            </div>

            {/* Quick WhatsApp Action */}
            {whatsAppUrl && (
              <a
                href={whatsAppUrl ?? undefined}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent('whatsapp_click', { sourceLocation: 'header' })}
                aria-label="Inquire via WhatsApp"
                className="hidden md:flex p-2 text-[#25D366] hover:text-white bg-black/40 hover:bg-[#25D366]/20 rounded-xl border border-[#25D366]/30 transition-all duration-300 focus-visible:ring-2 focus-visible:ring-[#25D366]"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            )}

            {/* Primary Consultation Trigger */}
            {onOpenQuoteModal && (
              <MagneticButton strength={0.25}>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => {
                    trackEvent('cta_click', { sourceLocation: 'header', ctaText: 'Plan Your Stage' });
                    onOpenQuoteModal();
                  }}
                  rightIcon={<ArrowRight className="w-3.5 h-3.5 text-[#3B0D18]" />}
                  className="text-xs uppercase tracking-wider font-bold shadow-gold-sm py-2 px-3.5 sm:px-4"
                >
                  Plan Your Stage
                </Button>
              </MagneticButton>
            )}
          </div>
        </div>

        {/* ============================================================ */}
        {/* MOBILE HORIZONTALLY SCROLLABLE NAVIGATION RAIL (NO HAMBURGER) */}
        {/* ============================================================ */}
        <nav
          className="lg:hidden mt-2.5 pt-2 border-t border-[#C6A15B]/20 flex items-center gap-2 overflow-x-auto no-scrollbar scroll-smooth"
          aria-label="Mobile Scenography Navigation"
        >
          {NAV_ITEMS.map((item) => {
            const targetId = item.href.replace('#', '');
            const isActive = activeSection === targetId;

            return (
              <a
                key={item.number}
                href={item.href}
                aria-current={isActive ? 'page' : undefined}
                className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-mono tracking-wider transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E0C078] min-h-[36px] ${
                  isActive
                    ? 'text-[#FFF8ED] font-semibold bg-[#4A0E1B] border border-[#C6A15B] shadow-sm'
                    : 'text-[#F7F0E4]/70 bg-black/30 border border-white/10 hover:text-[#E0C078]'
                }`}
              >
                <span className={`text-[9px] ${isActive ? 'text-[#E0C078]' : 'text-[#C6A15B]'}`}>
                  {item.number}
                </span>
                <span>{item.label}</span>
              </a>
            );
          })}
        </nav>
      </Container>
    </header>
  );
};

export default Header;

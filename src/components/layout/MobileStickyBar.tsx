'use client';

import React from 'react';
import { Phone, MessageCircle, Sparkles } from 'lucide-react';
import { siteConfig } from '../../config/site';
import { generateTelUrl, generateWhatsAppUrl } from '../../utils/urlHelpers';
import { trackEvent } from '../../lib/analytics';

export interface MobileStickyBarProps {
  onOpenQuoteModal?: () => void;
}

export const MobileStickyBar: React.FC<MobileStickyBarProps> = ({ onOpenQuoteModal }) => {
  const whatsAppUrl = generateWhatsAppUrl(
    siteConfig.contact.phonePrimary,
    'Vanakkam Thangam Decorators, I would like to inquire about stage decoration.'
  );

  return (
    <div
      className="fixed bottom-0 inset-x-0 z-40 sm:hidden bg-[#3B0D18]/95 backdrop-blur-2xl border-t border-[#C6A15B]/30 px-3 py-2.5 shadow-[0_-8px_30px_rgba(59,13,24,0.6)] safe-area-bottom"
      role="navigation"
      aria-label="Mobile Quick Action Bar"
    >
      <div className="grid grid-cols-3 gap-2.5 items-center">
        {/* 1. Direct Phone Call */}
        <a
          href={generateTelUrl(siteConfig.contact.phonePrimary)}
          onClick={() => trackEvent('phone_click', { sourceLocation: 'mobile_sticky_bar' })}
          className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-[#4A0E1B] border border-[#C6A15B]/25 text-[#FFF8ED] active:scale-95 transition-all min-h-[48px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E0C078]"
          aria-label={`Call ${siteConfig.brand.ownerName} at ${siteConfig.contact.phonePrimary}`}
        >
          <Phone className="w-4 h-4 mb-0.5 text-[#E0C078]" />
          <span className="text-[9px] font-mono font-medium tracking-wider uppercase">Call</span>
        </a>

        {/* 2. WhatsApp Instant Chat */}
        <a
          href={whatsAppUrl ?? '#'}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackEvent('whatsapp_click', { sourceLocation: 'mobile_sticky_bar' })}
          className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-[#25D366]/20 border border-[#25D366]/40 text-[#25D366] active:scale-95 font-medium transition-all min-h-[48px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366]"
          aria-label="Chat on WhatsApp"
        >
          <MessageCircle className="w-4 h-4 mb-0.5" />
          <span className="text-[9px] font-mono tracking-wider uppercase font-semibold">WhatsApp</span>
        </a>

        {/* 3. Book Stage Consultation */}
        <button
          type="button"
          onClick={() => {
            trackEvent('quote_start', { sourceLocation: 'mobile_sticky_bar' });
            if (onOpenQuoteModal) onOpenQuoteModal();
          }}
          className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-gradient-to-r from-[#C6A15B] to-[#E0C078] text-[#3B0D18] font-bold active:scale-95 transition-all min-h-[48px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFF8ED] shadow-sm"
          aria-label="Request Stage Scenography Consultation"
        >
          <Sparkles className="w-4 h-4 mb-0.5 text-[#3B0D18]" />
          <span className="text-[9px] font-mono tracking-wider uppercase font-bold">Book Stage</span>
        </button>
      </div>
    </div>
  );
};

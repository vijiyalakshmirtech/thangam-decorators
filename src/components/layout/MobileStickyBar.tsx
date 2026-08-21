import React from 'react';
import { Phone, MessageCircle, FileText } from 'lucide-react';
import { siteConfig } from '../../config/site';
import { generateTelUrl, generateWhatsAppUrl } from '../../utils/urlHelpers';
import { trackEvent } from '../../lib/analytics';

export interface MobileStickyBarProps {
  onOpenQuoteModal?: () => void;
}

export const MobileStickyBar: React.FC<MobileStickyBarProps> = ({ onOpenQuoteModal }) => {
  const whatsAppUrl = generateWhatsAppUrl('Hello P.T. Selvam, I would like to inquire about wedding stage decoration.');
  const isWhatsAppConfigured = Boolean(whatsAppUrl);

  return (
    <div
      className="fixed bottom-0 inset-x-0 z-40 sm:hidden bg-thangam-dark-950/95 backdrop-blur-lg border-t border-thangam-gold-500/30 px-3 py-2 shadow-2xl safe-area-bottom"
      role="navigation"
      aria-label="Mobile Quick Action Bar"
    >
      <div className="grid grid-cols-3 gap-2 items-center">
        {/* 1. Call Button */}
        <a
          href={generateTelUrl(siteConfig.contact.phonePrimary)}
          onClick={() => trackEvent('phone_click', { sourceLocation: 'mobile_sticky_bar' })}
          className="flex flex-col items-center justify-center py-2 px-1 rounded-lg bg-thangam-dark-850 border border-thangam-gold-500/20 text-thangam-gold-300 active:bg-thangam-gold-500/20 transition-colors min-h-[48px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-thangam-gold-400"
          aria-label={`Call ${siteConfig.brand.ownerName} at ${siteConfig.contact.phonePrimary}`}
        >
          <Phone className="w-4 h-4 mb-0.5 text-thangam-gold-400" />
          <span className="text-[10px] font-semibold tracking-wider uppercase">Call</span>
        </a>

        {/* 2. WhatsApp Button: Conditionally active only when WhatsApp number is configured */}
        {isWhatsAppConfigured ? (
          <a
            href={whatsAppUrl!}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent('whatsapp_click', { sourceLocation: 'mobile_sticky_bar' })}
            className="flex flex-col items-center justify-center py-2 px-1 rounded-lg bg-thangam-whatsapp text-thangam-dark-950 font-semibold active:brightness-110 transition-colors min-h-[48px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 shadow-sm"
            aria-label="Chat on WhatsApp"
          >
            <MessageCircle className="w-4 h-4 mb-0.5" />
            <span className="text-[10px] tracking-wider uppercase">WhatsApp</span>
          </a>
        ) : (
          <div
            className="flex flex-col items-center justify-center py-2 px-1 rounded-lg bg-thangam-dark-900/60 border border-white/5 text-thangam-ivory-100/30 cursor-not-allowed min-h-[48px]"
            title="WhatsApp line pending client confirmation"
            aria-disabled="true"
          >
            <MessageCircle className="w-4 h-4 mb-0.5 opacity-40" />
            <span className="text-[10px] tracking-wider uppercase opacity-40">WhatsApp</span>
          </div>
        )}

        {/* 3. Get Quote Trigger */}
        <button
          type="button"
          onClick={() => {
            trackEvent('quote_start', { sourceLocation: 'mobile_sticky_bar' });
            if (onOpenQuoteModal) onOpenQuoteModal();
          }}
          className="flex flex-col items-center justify-center py-2 px-1 rounded-lg bg-gradient-to-r from-thangam-gold-400 to-thangam-gold-600 text-thangam-dark-950 font-semibold active:brightness-110 transition-colors min-h-[48px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-thangam-gold-400 shadow-sm"
          aria-label="Request an Event Quote"
        >
          <FileText className="w-4 h-4 mb-0.5" />
          <span className="text-[10px] tracking-wider uppercase">Get Quote</span>
        </button>
      </div>
    </div>
  );
};

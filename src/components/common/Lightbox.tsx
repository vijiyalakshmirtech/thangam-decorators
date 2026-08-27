'use client';

import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, MessageCircle, Sparkles } from 'lucide-react';
import { ProjectImage } from '../../types/project';
import { Button } from './Button';
import { TechLabel } from './TechLabel';
import { generateWhatsAppUrl } from '../../utils/urlHelpers';
import { trackEvent } from '../../lib/analytics';

export interface LightboxProps {
  isOpen: boolean;
  images: ProjectImage[];
  currentIndex: number;
  projectTitle?: string;
  category?: string;
  onClose: () => void;
  onNavigate?: (newIndex: number) => void;
}

export const Lightbox: React.FC<LightboxProps> = ({
  isOpen,
  images,
  currentIndex,
  projectTitle,
  category,
  onClose,
  onNavigate,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight' && onNavigate && currentIndex < images.length - 1) {
        onNavigate(currentIndex + 1);
      }
      if (e.key === 'ArrowLeft' && onNavigate && currentIndex > 0) {
        onNavigate(currentIndex - 1);
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, currentIndex, images.length, onClose, onNavigate]);

  if (!isOpen || images.length === 0) return null;

  const currentImage = images[currentIndex] || images[0];
  const whatsAppUrl = generateWhatsAppUrl(
    `Hello P.T. Selvam, I am viewing "${projectTitle || currentImage.altText}" in your Digital Project Archive and would like to inquire about this stage setup.`
  );

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#3B0D18]/95 backdrop-blur-2xl p-4 sm:p-6 md:p-8"
      role="dialog"
      aria-modal="true"
      aria-label="Digital Project Archive Viewer"
    >
      {/* Studio Blueprint Grid Overlay in Viewer Background */}
      <div className="absolute inset-0 studio-grid-overlay pointer-events-none opacity-25" aria-hidden="true" />

      {/* Top Header Bar */}
      <div className="absolute top-4 inset-x-4 sm:inset-x-8 flex items-center justify-between z-30 max-w-7xl mx-auto">
        <div className="flex items-center gap-3 truncate pr-4">
          <TechLabel variant="gold">
            SPECIFICATION {currentIndex + 1} / {images.length}
          </TechLabel>
          {category && (
            <span className="hidden md:inline text-[11px] font-mono uppercase tracking-widest text-[#E0C078]/80">
              {category}
            </span>
          )}
        </div>

        <button
          type="button"
          onClick={onClose}
          aria-label="Close project viewer"
          className="p-2.5 text-[#FFF8ED] hover:text-[#E0C078] bg-black/40 hover:bg-black/60 rounded-full border border-white/15 transition-all min-h-[44px] min-w-[44px] flex items-center justify-center focus-visible:ring-2 focus-visible:ring-[#E0C078]"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Left Navigation Chevron */}
      {images.length > 1 && onNavigate && (
        <button
          type="button"
          disabled={currentIndex === 0}
          onClick={() => onNavigate(currentIndex - 1)}
          aria-label="Previous photograph"
          className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 p-3 sm:p-4 text-[#FFF8ED] hover:text-[#3B0D18] bg-black/60 hover:bg-[#E0C078] rounded-full border border-white/20 transition-all disabled:opacity-15 disabled:cursor-not-allowed z-30 min-h-[48px] min-w-[48px] flex items-center justify-center focus-visible:ring-2 focus-visible:ring-[#E0C078] shadow-2xl"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      )}

      {/* Right Navigation Chevron */}
      {images.length > 1 && onNavigate && (
        <button
          type="button"
          disabled={currentIndex === images.length - 1}
          onClick={() => onNavigate(currentIndex + 1)}
          aria-label="Next photograph"
          className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 p-3 sm:p-4 text-[#FFF8ED] hover:text-[#3B0D18] bg-black/60 hover:bg-[#E0C078] rounded-full border border-white/20 transition-all disabled:opacity-15 disabled:cursor-not-allowed z-30 min-h-[48px] min-w-[48px] flex items-center justify-center focus-visible:ring-2 focus-visible:ring-[#E0C078] shadow-2xl"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      )}

      {/* Center Image Container */}
      <div className="relative max-w-6xl w-full max-h-[85vh] flex flex-col items-center justify-center z-20">
        <div className="relative rounded-2xl overflow-hidden border border-[#C6A15B]/30 bg-black/50 shadow-2xl max-h-[68vh] flex items-center justify-center">
          <img
            src={currentImage.url}
            alt={currentImage.altText}
            className="max-w-full max-h-[68vh] object-contain rounded-2xl"
          />
        </div>

        {/* Bottom Title, Caption & Inquire Action Bar */}
        <div className="mt-4 p-4 rounded-xl bg-black/40 border border-white/10 backdrop-blur-md flex flex-col sm:flex-row items-center justify-between w-full gap-4 text-center sm:text-left">
          <div className="max-w-xl">
            <h3 className="text-base sm:text-lg font-serif font-bold text-[#FFF8ED]">
              {projectTitle}
            </h3>
            <p className="text-xs text-[#F7F0E4]/80 font-light mt-0.5 line-clamp-2">
              {currentImage.caption || currentImage.altText}
            </p>
          </div>

          {whatsAppUrl && (
            <Button
              variant="whatsapp"
              size="sm"
              href={whatsAppUrl ?? undefined}
              target="_blank"
              leftIcon={<MessageCircle className="w-4 h-4" />}
              className="text-xs uppercase tracking-wider font-semibold flex-shrink-0"
              onClick={() =>
                trackEvent('whatsapp_click', {
                  sourceLocation: 'lightbox_viewer',
                  projectId: projectTitle,
                })
              }
            >
              Inquire This Setup
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Lightbox;

import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, MessageCircle } from 'lucide-react';
import { ProjectImage } from '../../types/project';
import { Button } from './Button';
import { generateWhatsAppUrl } from '../../utils/urlHelpers';
import { trackEvent } from '../../lib/analytics';

export interface LightboxProps {
  isOpen: boolean;
  images: ProjectImage[];
  currentIndex: number;
  projectTitle?: string;
  onClose: () => void;
  onNavigate?: (newIndex: number) => void;
}

export const Lightbox: React.FC<LightboxProps> = ({
  isOpen,
  images,
  currentIndex,
  projectTitle,
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
    `Hello P.T. Selvam, I am inquiring about stage design: "${projectTitle || currentImage.altText}".`
  );

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#300713]/95 backdrop-blur-xl p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Image Lightbox Viewer"
    >
      {/* Top Bar */}
      <div className="absolute top-4 inset-x-4 flex items-center justify-between z-20 max-w-6xl mx-auto">
        <div className="text-[#FFFDF8] text-sm sm:text-base font-medium truncate pr-4">
          <span className="text-[#C9A45C] font-serif text-lg sm:text-xl font-bold">{projectTitle}</span>
          {images.length > 1 && (
            <span className="text-[#F7F0E4]/60 text-xs ml-2">
              ({currentIndex + 1} of {images.length})
            </span>
          )}
        </div>

        <button
          type="button"
          onClick={onClose}
          aria-label="Close lightbox"
          className="p-2 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center focus-visible:ring-2 focus-visible:ring-[#C9A45C]"
        >
          <X className="w-6 h-6 text-[#C9A45C]" />
        </button>
      </div>

      {/* Navigation Buttons */}
      {images.length > 1 && onNavigate && (
        <>
          <button
            type="button"
            disabled={currentIndex === 0}
            onClick={() => onNavigate(currentIndex - 1)}
            aria-label="Previous image"
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 text-[#FFFDF8] hover:text-[#C9A45C] bg-[#4A1022]/80 hover:bg-[#4A1022] rounded-full border border-[#C9A45C]/35 transition-all disabled:opacity-20 disabled:cursor-not-allowed z-20 min-h-[48px] min-w-[48px] flex items-center justify-center focus-visible:ring-2 focus-visible:ring-[#C9A45C] shadow-lg"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            type="button"
            disabled={currentIndex === images.length - 1}
            onClick={() => onNavigate(currentIndex + 1)}
            aria-label="Next image"
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 text-[#FFFDF8] hover:text-[#C9A45C] bg-[#4A1022]/80 hover:bg-[#4A1022] rounded-full border border-[#C9A45C]/35 transition-all disabled:opacity-20 disabled:cursor-not-allowed z-20 min-h-[48px] min-w-[48px] flex items-center justify-center focus-visible:ring-2 focus-visible:ring-[#C9A45C] shadow-lg"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </>
      )}

      {/* Image Display */}
      <div className="relative max-w-5xl max-h-[80vh] flex flex-col items-center justify-center">
        <img
          src={currentImage.url}
          alt={currentImage.altText}
          className="max-w-full max-h-[72vh] object-contain rounded-xl shadow-2xl border border-[#C9A45C]/30"
        />

        {/* Caption & Inquiry CTA */}
        <div className="mt-4 flex flex-col sm:flex-row items-center justify-between w-full gap-3 text-center sm:text-left">
          <p className="text-xs sm:text-sm text-[#F7F0E4]/85 font-light">
            {currentImage.caption || currentImage.altText}
          </p>

          {whatsAppUrl && (
            <Button
              variant="whatsapp"
              size="sm"
              href={whatsAppUrl}
              target="_blank"
              leftIcon={<MessageCircle className="w-4 h-4" />}
              className="text-xs font-semibold"
              onClick={() =>
                trackEvent('whatsapp_click', {
                  sourceLocation: 'lightbox',
                  projectId: projectTitle,
                })
              }
            >
              Inquire on WhatsApp
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

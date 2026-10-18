import React, { useEffect } from 'react';
import { X, ZoomIn, ArrowLeft, ArrowRight } from 'lucide-react';
import { GalleryItem } from '../types.ts';
import { SafeImage } from './SafeImage.tsx';

interface GalleryLightboxProps {
  item: GalleryItem | null;
  onClose: () => void;
  onNext?: () => void;
  onPrev?: () => void;
  hasMultiple?: boolean;
}

export const GalleryLightbox: React.FC<GalleryLightboxProps> = ({
  item,
  onClose,
  onNext,
  onPrev,
  hasMultiple = false,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight' && onNext) onNext();
      if (e.key === 'ArrowLeft' && onPrev) onPrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [onClose, onNext, onPrev]);

  if (!item) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={item.title}
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/90 backdrop-blur-md p-4 sm:p-6 animate-in fade-in duration-200"
      onClick={onClose}
    >
      {/* Lightbox container */}
      <div
        className="relative max-w-4xl w-full bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between p-4 border-b border-slate-800 bg-slate-900/90">
          <div>
            <span className="text-[10px] font-semibold uppercase tracking-wider text-amber-400 bg-amber-400/10 px-2.5 py-0.5 rounded-full border border-amber-400/20">
              {item.category}
            </span>
            <h3 className="text-base sm:text-lg font-serif font-bold text-white mt-1">
              {item.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-400"
            aria-label="Close image viewer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Image Preview Stage */}
        <div className="relative flex-1 bg-black flex items-center justify-center overflow-hidden min-h-[280px] sm:min-h-[440px]">
          <SafeImage
            src={item.imageUrl}
            alt={item.title}
            fallbackType="assignment"
            containerClassName="w-full h-full max-h-[65vh] flex items-center justify-center"
            className="max-h-[65vh] w-auto max-w-full object-contain mx-auto"
          />

          {/* Navigation Controls */}
          {hasMultiple && (
            <>
              {onPrev && (
                <button
                  onClick={onPrev}
                  className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-slate-900/80 hover:bg-slate-800 text-white border border-slate-700 shadow-md transition-colors"
                  aria-label="Previous image"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
              )}
              {onNext && (
                <button
                  onClick={onNext}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-slate-900/80 hover:bg-slate-800 text-white border border-slate-700 shadow-md transition-colors"
                  aria-label="Next image"
                >
                  <ArrowRight className="w-5 h-5" />
                </button>
              )}
            </>
          )}
        </div>

        {/* Caption footer */}
        <div className="p-4 bg-slate-900 border-t border-slate-800 flex items-center justify-between text-xs text-slate-300">
          <p className="max-w-xl">{item.description}</p>
          <span className="hidden sm:inline-flex items-center gap-1 text-[11px] text-amber-300/80 shrink-0 font-medium">
            <ZoomIn className="w-3.5 h-3.5" /> High-Resolution Inspection
          </span>
        </div>
      </div>
    </div>
  );
};

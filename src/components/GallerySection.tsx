import React, { useState } from 'react';
import { ZoomIn, Image as ImageIcon } from 'lucide-react';
import { GalleryItem } from '../types.ts';
import { SafeImage } from './SafeImage.tsx';
import { GalleryLightbox } from './GalleryLightbox.tsx';

interface GallerySectionProps {
  gallery: GalleryItem[];
}

export const GallerySection: React.FC<GallerySectionProps> = ({ gallery }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);

  const categories = ['All', ...Array.from(new Set(gallery.map(g => g.category)))];

  const filteredItems = selectedCategory === 'All'
    ? gallery
    : gallery.filter(g => g.category === selectedCategory);

  const activeItem = activeImageIndex !== null ? filteredItems[activeImageIndex] : null;

  const handleNext = () => {
    if (activeImageIndex === null) return;
    setActiveImageIndex((activeImageIndex + 1) % filteredItems.length);
  };

  const handlePrev = () => {
    if (activeImageIndex === null) return;
    setActiveImageIndex((activeImageIndex - 1 + filteredItems.length) % filteredItems.length);
  };

  return (
    <section id="gallery" className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-100/70 px-3 py-1 rounded-full border border-amber-300 inline-block mb-3">
            Visual Assignment Archive
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 tracking-tight">
            Academic Work & Study Gallery
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base max-w-2xl mx-auto">
            Authentic visual examples of university documents, printed research papers, presentation layouts, and structured study desk environments.
          </p>
          <div className="w-16 h-1 bg-amber-500 mx-auto mt-4 rounded-full" />
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                setActiveImageIndex(null);
              }}
              className={`px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all ${
                selectedCategory === cat
                  ? 'bg-slate-900 text-amber-300 shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:text-slate-900 border border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              onClick={() => setActiveImageIndex(index)}
              className="group relative cursor-pointer overflow-hidden rounded-2xl bg-slate-900 border border-slate-200 hover:border-amber-400 shadow-xs hover:shadow-xl transition-all duration-300"
            >
              {/* Image Frame */}
              <div className="aspect-4/3 w-full overflow-hidden bg-slate-100">
                <SafeImage
                  src={item.imageUrl}
                  alt={item.title}
                  fallbackType="assignment"
                  containerClassName="w-full h-full"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Hover Dark Overlay with Details */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent opacity-80 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4 text-white">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-amber-300 bg-slate-900/80 px-2 py-0.5 rounded-md border border-amber-300/30">
                    {item.category}
                  </span>
                  <div className="p-1.5 rounded-full bg-slate-900/80 text-amber-300 group-hover:bg-amber-400 group-hover:text-slate-950 transition-colors">
                    <ZoomIn className="w-3.5 h-3.5" />
                  </div>
                </div>

                <h3 className="text-xs sm:text-sm font-semibold text-white line-clamp-1 group-hover:text-amber-200 transition-colors">
                  {item.title}
                </h3>
                <p className="text-[11px] text-slate-300 line-clamp-1 mt-0.5 opacity-90">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {activeItem && (
          <GalleryLightbox
            item={activeItem}
            onClose={() => setActiveImageIndex(null)}
            onNext={handleNext}
            onPrev={handlePrev}
            hasMultiple={filteredItems.length > 1}
          />
        )}

      </div>
    </section>
  );
};

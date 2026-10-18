import React, { useState } from 'react';
import { BookOpen } from 'lucide-react';
import { CAT_AVATAR_DEFAULT } from '../data/defaultData.ts';

interface SafeImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackType?: 'cat' | 'assignment' | 'general';
  containerClassName?: string;
}

export const SafeImage: React.FC<SafeImageProps> = ({
  src,
  alt,
  className,
  fallbackType = 'general',
  containerClassName = '',
  ...props
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const getFallbackSrc = () => {
    if (fallbackType === 'cat') {
      return CAT_AVATAR_DEFAULT;
    }
    return "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=800&q=80";
  };

  const handleImageError = () => {
    if (!hasError) {
      setHasError(true);
    }
    setIsLoading(false);
  };

  return (
    <div className={`relative overflow-hidden ${containerClassName}`}>
      {isLoading && (
        <div className="absolute inset-0 bg-slate-200 animate-pulse flex items-center justify-center">
          <BookOpen className="w-5 h-5 text-slate-400 animate-bounce" />
        </div>
      )}
      
      {hasError ? (
        <div className="w-full h-full min-h-[140px] bg-slate-800 text-amber-300 flex flex-col items-center justify-center p-4 text-center">
          <BookOpen className="w-8 h-8 mb-2 opacity-80" />
          <span className="text-xs font-medium text-slate-200">{alt || "Academic Documentation"}</span>
          <span className="text-[10px] text-amber-400/80 mt-1">KM Academic Writing</span>
        </div>
      ) : (
        <img
          src={src || getFallbackSrc()}
          alt={alt}
          className={`${className} transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
          onLoad={() => setIsLoading(false)}
          onError={handleImageError}
          loading="lazy"
          {...props}
        />
      )}
    </div>
  );
};

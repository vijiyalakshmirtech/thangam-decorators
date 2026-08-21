import React, { useState } from 'react';

export interface ImageWrapperProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  aspectRatio?: '1/1' | '4/3' | '16/9' | '3/2' | 'auto';
  fallbackSrc?: string;
  containerClassName?: string;
  imageClassName?: string;
  priority?: boolean;
}

export const ImageWrapper: React.FC<ImageWrapperProps> = ({
  src,
  alt,
  aspectRatio = '4/3',
  fallbackSrc = '/assets/brand/logo.jpg',
  containerClassName = '',
  imageClassName = '',
  priority = false,
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const aspectRatioClasses: Record<string, string> = {
    '1/1': 'aspect-square',
    '4/3': 'aspect-[4/3]',
    '16/9': 'aspect-video',
    '3/2': 'aspect-[3/2]',
    'auto': 'aspect-auto',
  };

  const currentSrc = hasError ? fallbackSrc : src;

  return (
    <div
      className={`relative overflow-hidden bg-thangam-dark-900 ${
        aspectRatioClasses[aspectRatio] || ''
      } ${containerClassName}`}
    >
      {/* Loading Skeleton */}
      {!isLoaded && !hasError && (
        <div
          className="absolute inset-0 bg-thangam-dark-850 animate-pulse flex items-center justify-center"
          aria-hidden="true"
        >
          <div className="w-8 h-8 rounded-full border-2 border-thangam-gold-500/20 border-t-thangam-gold-500 animate-spin" />
        </div>
      )}

      {/* Actual Image */}
      <img
        src={currentSrc}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        fetchPriority={priority ? 'high' : 'auto'}
        onLoad={() => setIsLoaded(true)}
        onError={() => {
          setHasError(true);
          setIsLoaded(true);
        }}
        className={`w-full h-full object-cover transition-all duration-500 ${
          isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
        } ${imageClassName}`}
        {...props}
      />

      {/* Fallback Badge if fallback is active */}
      {hasError && (
        <div className="absolute bottom-2 right-2 px-2 py-0.5 bg-black/70 rounded text-[10px] text-thangam-gold-300 backdrop-blur-sm">
          Preview Image
        </div>
      )}
    </div>
  );
};

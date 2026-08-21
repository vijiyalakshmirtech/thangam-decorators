import React from 'react';
import { Badge } from './Badge';

export interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  description?: string;
  align?: 'left' | 'center';
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  eyebrow,
  title,
  subtitle,
  description,
  align = 'center',
  className = '',
}) => {
  const isCenter = align === 'center';

  return (
    <div
      className={`max-w-3xl mb-10 md:mb-14 ${
        isCenter ? 'mx-auto text-center' : 'text-left'
      } ${className}`}
    >
      {eyebrow && (
        <div className={`mb-3 ${isCenter ? 'flex justify-center' : ''}`}>
          <Badge variant="gold">{eyebrow}</Badge>
        </div>
      )}

      <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-semibold text-thangam-ivory-50 tracking-tight leading-tight">
        {title}
      </h2>

      {subtitle && (
        <p className="mt-2 text-base sm:text-lg font-medium text-thangam-gold-300/90 font-serif italic">
          {subtitle}
        </p>
      )}

      {description && (
        <p className="mt-4 text-sm sm:text-base text-thangam-ivory-100/70 leading-relaxed max-w-2xl mx-auto">
          {description}
        </p>
      )}

      <div
        className={`mt-4 h-0.5 w-16 bg-gradient-to-r from-thangam-gold-400 to-thangam-gold-600 rounded-full ${
          isCenter ? 'mx-auto' : ''
        }`}
        aria-hidden="true"
      />
    </div>
  );
};

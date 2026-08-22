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

      <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-medium text-[#6E1830] tracking-tight leading-tight">
        {title}
      </h2>

      {subtitle && (
        <p className="mt-2 text-base sm:text-xl font-serif italic text-[#C9A45C] tracking-wide">
          {subtitle}
        </p>
      )}

      {description && (
        <p className="mt-4 text-sm sm:text-base text-[#1F161A]/80 leading-relaxed max-w-2xl mx-auto font-light">
          {description}
        </p>
      )}

      <div
        className={`mt-5 h-[1.5px] w-20 bg-gradient-to-r from-[#C9A45C] via-[#E0C078] to-[#9E7B35] ${
          isCenter ? 'mx-auto' : ''
        }`}
        aria-hidden="true"
      />
    </div>
  );
};

import React from 'react';
import { Badge } from './Badge';

export interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  description?: string;
  align?: 'left' | 'center';
  theme?: 'light' | 'dark'; // 'light' for cream sections, 'dark' for burgundy sections
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  eyebrow,
  title,
  subtitle,
  description,
  align = 'center',
  theme = 'light',
  className = '',
}) => {
  const isCenter = align === 'center';
  const isDark = theme === 'dark';

  return (
    <div
      className={`max-w-3xl mb-10 md:mb-14 ${
        isCenter ? 'mx-auto text-center' : 'text-left'
      } ${className}`}
    >
      {eyebrow && (
        <div className={`mb-3 ${isCenter ? 'flex justify-center' : ''}`}>
          <Badge variant={isDark ? 'dark' : 'gold'}>{eyebrow}</Badge>
        </div>
      )}

      <h2
        className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-medium tracking-tight leading-tight ${
          isDark ? 'text-[#FFF8ED]' : 'text-[#6E1830]'
        }`}
      >
        {title}
      </h2>

      {subtitle && (
        <p
          className={`mt-2 text-base sm:text-xl font-serif italic tracking-wide ${
            isDark ? 'text-[#FFF8ED]/90' : 'text-[#6E1830]/80'
          }`}
        >
          {subtitle}
        </p>
      )}

      {description && (
        <p
          className={`mt-4 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto font-light ${
            isDark ? 'text-[#F7F0E4]/85' : 'text-[#1F161A]/80'
          }`}
        >
          {description}
        </p>
      )}

      <div
        className={`mt-5 h-[1.5px] w-20 ${isDark ? 'bg-white/20' : 'bg-[#6E1830]/20'} ${
          isCenter ? 'mx-auto' : ''
        }`}
        aria-hidden="true"
      />
    </div>
  );
};

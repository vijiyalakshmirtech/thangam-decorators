import React from 'react';

export interface GlowLineProps {
  className?: string;
  variant?: 'gold' | 'burgundy' | 'dual';
}

export const GlowLine: React.FC<GlowLineProps> = ({
  className = '',
  variant = 'gold',
}) => {
  const gradientStyles = {
    gold: 'from-transparent via-[#C6A15B] to-transparent',
    burgundy: 'from-transparent via-[#6E1830] to-transparent',
    dual: 'from-transparent via-[#C6A15B] via-[#6E1830] to-transparent',
  };

  return (
    <div
      className={`h-[1.5px] w-full bg-gradient-to-r ${gradientStyles[variant]} opacity-70 ${className}`}
      aria-hidden="true"
    />
  );
};

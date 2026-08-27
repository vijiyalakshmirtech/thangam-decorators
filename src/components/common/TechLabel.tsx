import React from 'react';

export interface TechLabelProps {
  children: React.ReactNode;
  variant?: 'gold' | 'burgundy' | 'cream' | 'emerald';
  icon?: React.ReactNode;
  className?: string;
}

export const TechLabel: React.FC<TechLabelProps> = ({
  children,
  variant = 'gold',
  icon,
  className = '',
}) => {
  const variantStyles = {
    gold: 'text-[#E0C078] bg-[#3B0D18]/80 border-[#C6A15B]/30',
    burgundy: 'text-[#FFF8ED] bg-[#6E1830]/90 border-white/20',
    cream: 'text-[#1F161A] bg-[#FFF8ED] border-[#6E1830]/20',
    emerald: 'text-[#25D366] bg-[#3B0D18]/90 border-[#25D366]/30',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono tracking-wider uppercase border backdrop-blur-sm ${variantStyles[variant]} ${className}`}
    >
      {icon && <span className="w-3.5 h-3.5 flex items-center justify-center">{icon}</span>}
      <span>{children}</span>
    </span>
  );
};

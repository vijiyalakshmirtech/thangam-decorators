import React from 'react';

export type BadgeVariant = 'gold' | 'dark' | 'emerald' | 'maroon';

export interface BadgeProps {
  variant?: BadgeVariant;
  children: React.ReactNode;
  className?: string;
  icon?: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'gold',
  children,
  className = '',
  icon,
}) => {
  const variantClasses: Record<BadgeVariant, string> = {
    gold: 'bg-[#3B0D18]/90 text-[#E0C078] border border-[#C6A15B]/35 shadow-sm',
    dark: 'bg-[#3B0D18] text-[#FFF8ED] border border-white/20',
    emerald: 'bg-[#134E39]/30 text-[#25D366] border border-[#25D366]/30',
    maroon: 'bg-[#6E1830]/80 text-[#FFF8ED] border border-[#C6A15B]/25',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider backdrop-blur-sm ${variantClasses[variant]} ${className}`}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      <span>{children}</span>
    </span>
  );
};

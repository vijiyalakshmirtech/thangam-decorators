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
    gold: 'bg-[#6E1830]/10 text-[#6E1830] border border-[#6E1830]/25',
    dark: 'bg-[#5A1426] text-[#FFF8ED] border border-white/20',
    emerald: 'bg-[#134E39]/15 text-[#134E39] border border-[#134E39]/30',
    maroon: 'bg-[#6E1830]/10 text-[#6E1830] border border-[#6E1830]/25',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider ${variantClasses[variant]} ${className}`}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      <span>{children}</span>
    </span>
  );
};

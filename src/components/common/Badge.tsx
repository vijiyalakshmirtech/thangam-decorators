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
    gold: 'bg-thangam-gold-500/10 text-thangam-gold-300 border border-thangam-gold-500/30',
    dark: 'bg-thangam-dark-800 text-thangam-ivory-100 border border-white/10',
    emerald: 'bg-emerald-950/60 text-emerald-300 border border-emerald-500/30',
    maroon: 'bg-thangam-maroon-900/60 text-rose-300 border border-rose-500/30',
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

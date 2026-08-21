import React from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'whatsapp' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  target?: string;
  rel?: string;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  href,
  target,
  rel,
  isLoading = false,
  leftIcon,
  rightIcon,
  children,
  className = '',
  disabled,
  ...props
}) => {
  // Base classes: 48px minimum touch target on mobile, smooth transitions, focus outlines
  const baseClasses =
    'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-thangam-dark-950 disabled:opacity-50 disabled:cursor-not-allowed select-none min-h-[48px]';

  const variantClasses: Record<ButtonVariant, string> = {
    primary:
      'bg-gradient-to-r from-thangam-gold-400 via-thangam-gold-500 to-thangam-gold-600 text-thangam-dark-950 font-semibold shadow-gold-sm hover:shadow-gold-md hover:brightness-105 active:scale-[0.98] focus-visible:ring-thangam-gold-400',
    secondary:
      'border border-thangam-gold-500/40 text-thangam-gold-300 bg-thangam-dark-900/60 hover:bg-thangam-gold-500/10 hover:border-thangam-gold-400 active:scale-[0.98] focus-visible:ring-thangam-gold-400',
    ghost:
      'text-thangam-ivory-100 hover:text-thangam-gold-300 hover:bg-white/5 active:scale-[0.98] focus-visible:ring-thangam-gold-400',
    whatsapp:
      'bg-thangam-whatsapp text-thangam-dark-950 font-semibold hover:bg-emerald-400 active:scale-[0.98] focus-visible:ring-emerald-400 shadow-md',
    danger:
      'bg-thangam-maroon-700 text-thangam-ivory-50 hover:bg-thangam-maroon-600 focus-visible:ring-red-400',
  };

  const sizeClasses: Record<ButtonSize, string> = {
    sm: 'text-xs px-3 py-2 gap-1.5 min-h-[40px]',
    md: 'text-sm px-5 py-2.5 gap-2 min-h-[48px]',
    lg: 'text-base px-7 py-3.5 gap-2.5 min-h-[52px]',
  };

  const combinedClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  if (href && !disabled) {
    const isExternal = href.startsWith('http') || href.startsWith('tel:') || href.startsWith('mailto:');
    const safeRel = rel ?? (isExternal ? 'noopener noreferrer' : undefined);

    return (
      <a
        href={href}
        target={target}
        rel={safeRel}
        className={combinedClasses}
        aria-disabled={disabled}
      >
        {isLoading && <LoadingSpinner />}
        {!isLoading && leftIcon && <span className="flex-shrink-0">{leftIcon}</span>}
        <span>{children}</span>
        {!isLoading && rightIcon && <span className="flex-shrink-0">{rightIcon}</span>}
      </a>
    );
  }

  return (
    <button
      className={combinedClasses}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && <LoadingSpinner />}
      {!isLoading && leftIcon && <span className="flex-shrink-0">{leftIcon}</span>}
      <span>{children}</span>
      {!isLoading && rightIcon && <span className="flex-shrink-0">{rightIcon}</span>}
    </button>
  );
};

const LoadingSpinner = () => (
  <svg
    className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    />
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    />
  </svg>
);

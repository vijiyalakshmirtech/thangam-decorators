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
  const baseClasses =
    'inline-flex items-center justify-center font-medium tracking-wide transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#6E1830] disabled:opacity-50 disabled:cursor-not-allowed select-none min-h-[48px] rounded-lg';

  const variantClasses: Record<ButtonVariant, string> = {
    primary:
      'bg-[#6E1830] text-[#FFF8ED] border border-white/20 hover:bg-[#4A0E1B] hover:border-white/40 hover:shadow-[0_8px_25px_rgba(74,14,27,0.35)] active:scale-[0.98] font-semibold',
    secondary:
      'border border-[#6E1830]/30 text-[#6E1830] bg-[#FFF8ED] hover:bg-[#F7F0E4] hover:border-[#6E1830] hover:shadow-sm active:scale-[0.98] font-medium',
    ghost:
      'text-[#FFF8ED] hover:text-white hover:bg-[#6E1830]/20 active:scale-[0.98]',
    whatsapp:
      'bg-[#25D366] text-[#FFFDF8] font-semibold hover:bg-[#1EBE5D] hover:shadow-[0_6px_20px_rgba(37,211,102,0.35)] active:scale-[0.98]',
    danger:
      'bg-[#5A1426] text-[#FFF8ED] hover:bg-[#4A0E1B] focus-visible:ring-red-400',
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
        onClick={props.onClick as unknown as React.MouseEventHandler<HTMLAnchorElement>}
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

import React from 'react';

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: 'div' | 'section' | 'main' | 'header' | 'footer' | 'nav';
  size?: 'default' | 'narrow' | 'wide' | 'full';
  children: React.ReactNode;
  className?: string;
}

export const Container: React.FC<ContainerProps> = ({
  as: Component = 'div',
  size = 'default',
  children,
  className = '',
  ...props
}) => {
  const sizeClasses = {
    narrow: 'max-w-4xl',
    default: 'max-w-7xl',
    wide: 'max-w-[1400px]',
    full: 'max-w-full',
  };

  return (
    <Component
      className={`w-full mx-auto px-4 sm:px-6 lg:px-8 ${sizeClasses[size]} ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
};

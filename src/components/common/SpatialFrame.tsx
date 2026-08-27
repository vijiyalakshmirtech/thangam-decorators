import React from 'react';

export interface SpatialFrameProps {
  children: React.ReactNode;
  className?: string;
  label?: string;
  theme?: 'dark' | 'light';
}

export const SpatialFrame: React.FC<SpatialFrameProps> = ({
  children,
  className = '',
  label,
  theme = 'dark',
}) => {
  const isDark = theme === 'dark';

  return (
    <div
      className={`relative p-6 sm:p-8 rounded-2xl border ${
        isDark
          ? 'bg-[#3B0D18]/70 border-[#C6A15B]/25 text-[#FFF8ED]'
          : 'bg-[#FFF8ED] border-[#6E1830]/20 text-[#1F161A]'
      } backdrop-blur-md shadow-2xl transition-all duration-500 group ${className}`}
    >
      {/* Top Left Architectural Corner Tick */}
      <div
        className={`absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 rounded-tl-sm ${
          isDark ? 'border-[#E0C078]' : 'border-[#6E1830]'
        }`}
        aria-hidden="true"
      />
      {/* Top Right Architectural Corner Tick */}
      <div
        className={`absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 rounded-tr-sm ${
          isDark ? 'border-[#E0C078]' : 'border-[#6E1830]'
        }`}
        aria-hidden="true"
      />
      {/* Bottom Left Architectural Corner Tick */}
      <div
        className={`absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 rounded-bl-sm ${
          isDark ? 'border-[#E0C078]' : 'border-[#6E1830]'
        }`}
        aria-hidden="true"
      />
      {/* Bottom Right Architectural Corner Tick */}
      <div
        className={`absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 rounded-br-sm ${
          isDark ? 'border-[#E0C078]' : 'border-[#6E1830]'
        }`}
        aria-hidden="true"
      />

      {/* Optional Spatial Frame Label Header */}
      {label && (
        <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/10">
          <span className="text-[10px] font-mono tracking-widest uppercase opacity-75">
            {label}
          </span>
          <div className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E0C078] animate-pulse" />
            <span className="text-[9px] font-mono tracking-wider opacity-60">ACTIVE</span>
          </div>
        </div>
      )}

      {children}
    </div>
  );
};

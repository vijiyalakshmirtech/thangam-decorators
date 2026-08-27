'use client';

import React, { useEffect, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [cursorText, setCursorText] = useState<string | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only enable custom cursor on fine pointer devices (desktop/mouse)
    const isFinePointer = window.matchMedia('(pointer: fine)').matches;
    if (!isFinePointer) return;

    setIsVisible(true);

    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      if (target.closest('#portfolio img') || target.closest('[data-cursor="view"]')) {
        setIsHovered(true);
        setCursorText('VIEW');
      } else if (target.closest('#showroom') || target.closest('[data-cursor="stage"]')) {
        setIsHovered(true);
        setCursorText('STAGE');
      } else if (
        target.closest('button') ||
        target.closest('a') ||
        target.closest('[data-magnetic]') ||
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.tagName === 'SELECT'
      ) {
        setIsHovered(true);
        setCursorText(null);
      } else {
        setIsHovered(false);
        setCursorText(null);
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      {/* Central Gold/Burgundy Dot */}
      <div
        className="fixed top-0 left-0 w-2 h-2 bg-[#E0C078] rounded-full pointer-events-none z-50 transition-transform duration-75 ease-out -translate-x-1/2 -translate-y-1/2 shadow-[0_0_8px_#E0C078]"
        style={{
          transform: `translate3d(${position.x}px, ${position.y}px, 0) scale(${isHovered ? 0.3 : 1})`,
        }}
      />
      {/* Digital Studio Trailing Ring & Context Badge */}
      <div
        className="fixed top-0 left-0 w-9 h-9 border rounded-full pointer-events-none z-50 transition-all duration-300 ease-out -translate-x-1/2 -translate-y-1/2 flex items-center justify-center"
        style={{
          transform: `translate3d(${position.x}px, ${position.y}px, 0) scale(${
            cursorText ? 2.2 : isHovered ? 1.6 : 1
          })`,
          backgroundColor: cursorText
            ? 'rgba(59, 13, 24, 0.85)'
            : isHovered
            ? 'rgba(198, 161, 91, 0.15)'
            : 'transparent',
          borderColor: isHovered ? '#E0C078' : 'rgba(198, 161, 91, 0.35)',
          backdropFilter: cursorText ? 'blur(4px)' : 'none',
        }}
      >
        {cursorText && (
          <span className="text-[7px] font-mono tracking-widest font-bold text-[#E0C078] uppercase select-none">
            {cursorText}
          </span>
        )}
      </div>
    </>
  );
};

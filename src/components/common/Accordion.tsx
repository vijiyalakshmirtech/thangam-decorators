import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export interface AccordionItem {
  id: string;
  title: string;
  content: string;
}

export interface AccordionProps {
  items: AccordionItem[];
  allowMultiple?: boolean;
  theme?: 'light' | 'dark';
  className?: string;
}

export const Accordion: React.FC<AccordionProps> = ({
  items,
  allowMultiple = false,
  theme = 'light',
  className = '',
}) => {
  const [openIds, setOpenIds] = useState<string[]>([]);
  const isDark = theme === 'dark';

  const toggleItem = (id: string) => {
    if (allowMultiple) {
      setOpenIds((prev) =>
        prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
      );
    } else {
      setOpenIds((prev) => (prev.includes(id) ? [] : [id]));
    }
  };

  if (!items || items.length === 0) {
    return null;
  }

  return (
    <div className={`space-y-3 ${className}`}>
      {items.map((item) => {
        const isOpen = openIds.includes(item.id);
        const headerId = `accordion-header-${item.id}`;
        const panelId = `accordion-panel-${item.id}`;

        return (
          <div
            key={item.id}
            className={`border rounded-2xl overflow-hidden transition-all duration-300 ${
              isDark
                ? 'border-white/15 bg-[#5A1426] hover:border-white/30 shadow-[0_4px_20px_rgba(74,14,27,0.3)]'
                : 'border-[#6E1830]/15 bg-[#FFF8ED] hover:border-[#6E1830] shadow-[0_4px_20px_rgba(74,14,27,0.03)]'
            }`}
          >
            <h3>
              <button
                type="button"
                id={headerId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggleItem(item.id)}
                className={`w-full flex items-center justify-between p-5 sm:p-6 text-left font-serif font-semibold text-lg sm:text-xl transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white min-h-[56px] ${
                  isDark
                    ? 'text-[#FFF8ED] hover:text-white'
                    : 'text-[#6E1830] hover:text-[#4A0E1B]'
                }`}
              >
                <span className="pr-4">{item.title}</span>
                <ChevronDown
                  className={`w-5 h-5 flex-shrink-0 transition-transform duration-300 ${
                    isDark ? 'text-[#FFF8ED]' : 'text-[#6E1830]'
                  } ${isOpen ? 'rotate-180' : ''}`}
                  aria-hidden="true"
                />
              </button>
            </h3>

            <div
              id={panelId}
              role="region"
              aria-labelledby={headerId}
              hidden={!isOpen}
              className={`px-5 pb-6 sm:px-6 text-sm sm:text-base leading-relaxed font-light transition-all duration-300 ${
                isDark ? 'text-[#F7F0E4]/85' : 'text-[#1F161A]/80'
              } ${isOpen ? 'block' : 'hidden'}`}
            >
              <div className={`pt-3 border-t ${isDark ? 'border-white/10' : 'border-[#6E1830]/15'}`}>
                {item.content}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

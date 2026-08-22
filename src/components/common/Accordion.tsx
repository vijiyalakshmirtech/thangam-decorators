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
  className?: string;
}

export const Accordion: React.FC<AccordionProps> = ({
  items,
  allowMultiple = false,
  className = '',
}) => {
  const [openIds, setOpenIds] = useState<string[]>([]);

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
            className="border border-[#C9A45C]/35 rounded-2xl bg-[#FFFDF8] overflow-hidden transition-all duration-300 hover:border-[#6E1830] shadow-[0_4px_20px_rgba(110,24,48,0.03)]"
          >
            <h3>
              <button
                type="button"
                id={headerId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggleItem(item.id)}
                className="w-full flex items-center justify-between p-5 sm:p-6 text-left font-serif font-semibold text-lg sm:text-xl text-[#6E1830] hover:text-[#4A1022] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A45C] min-h-[56px]"
              >
                <span className="pr-4">{item.title}</span>
                <ChevronDown
                  className={`w-5 h-5 text-[#C9A45C] flex-shrink-0 transition-transform duration-300 ${
                    isOpen ? 'rotate-180 text-[#6E1830]' : ''
                  }`}
                  aria-hidden="true"
                />
              </button>
            </h3>

            <div
              id={panelId}
              role="region"
              aria-labelledby={headerId}
              hidden={!isOpen}
              className={`px-5 pb-6 sm:px-6 text-sm sm:text-base text-[#1F161A]/80 leading-relaxed font-light transition-all duration-300 ${
                isOpen ? 'block' : 'hidden'
              }`}
            >
              <div className="pt-3 border-t border-[#C9A45C]/20">{item.content}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

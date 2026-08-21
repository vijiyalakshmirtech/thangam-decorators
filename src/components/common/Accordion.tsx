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
            className="border border-thangam-gold-500/20 rounded-xl bg-thangam-dark-900/80 overflow-hidden transition-colors hover:border-thangam-gold-500/40"
          >
            <h3>
              <button
                type="button"
                id={headerId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggleItem(item.id)}
                className="w-full flex items-center justify-between p-4 sm:p-5 text-left font-serif font-medium text-base sm:text-lg text-thangam-ivory-50 hover:text-thangam-gold-300 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-thangam-gold-400 min-h-[52px]"
              >
                <span className="pr-4">{item.title}</span>
                <ChevronDown
                  className={`w-5 h-5 text-thangam-gold-400 flex-shrink-0 transition-transform duration-300 ${
                    isOpen ? 'rotate-180' : ''
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
              className={`px-4 pb-5 sm:px-5 text-sm sm:text-base text-thangam-ivory-100/75 leading-relaxed transition-all duration-300 ${
                isOpen ? 'block' : 'hidden'
              }`}
            >
              <div className="pt-2 border-t border-white/5">{item.content}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

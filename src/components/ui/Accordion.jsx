import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export function AccordionItem({ title, category, children, isOpen, onToggle }) {
  return (
    <div className="border border-slate-200 rounded-2xl overflow-hidden bg-white transition-all duration-200 hover:border-gb-primary/30 shadow-sm">
      <button
        type="button"
        onClick={onToggle}
        className="w-full px-5 sm:px-6 py-4 sm:py-5 flex items-center justify-between text-left focus:outline-none gap-4"
        aria-expanded={isOpen}
      >
        <div>
          {category && (
            <span className="text-[10px] font-bold uppercase tracking-wider text-gb-primary bg-gb-primary-subtle px-2.5 py-0.5 rounded-full inline-block mb-1.5">
              {category}
            </span>
          )}
          <h4 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
            {title}
          </h4>
        </div>
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center bg-slate-50 text-slate-500 transition-transform duration-300 shrink-0 ${
            isOpen ? 'rotate-180 bg-gb-primary text-white' : ''
          }`}
        >
          <ChevronDown className="w-4 h-4" />
        </div>
      </button>

      <div
        className={`transition-all duration-300 ease-in-out px-5 sm:px-6 overflow-hidden ${
          isOpen ? 'max-h-96 pb-5 pt-1 text-slate-600 border-t border-slate-100' : 'max-h-0'
        }`}
      >
        <div className="text-xs sm:text-sm leading-relaxed">{children}</div>
      </div>
    </div>
  );
}

export default function Accordion({ items }) {
  const [openIndex, setOpenIndex] = useState(0);

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <AccordionItem
          key={index}
          title={item.question || item.title}
          category={item.category}
          isOpen={openIndex === index}
          onToggle={() => handleToggle(index)}
        >
          {item.answer || item.content}
        </AccordionItem>
      ))}
    </div>
  );
}

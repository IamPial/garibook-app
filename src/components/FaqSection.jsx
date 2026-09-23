import React, { useState } from 'react';
import Accordion from './ui/Accordion';
import { faqs } from '../data/faqs';
import { HelpCircle, MessageSquare } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function FaqSection() {
  const { t } = useLanguage();
  const copy = t.sections.faq;
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Booking & Pricing', 'Billing & Payments', 'Airport Transfers', 'Safety & Security', 'Tour & Custom Trips'];

  const filteredFaqs =
    selectedCategory === 'All'
      ? faqs
      : faqs.filter((faq) => faq.category === selectedCategory);

  return (
    <section id="faq" className="py-20 sm:py-28 bg-slate-50 relative overflow-hidden">
      {/* Decorative Blur */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-gb-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <span className="text-xs font-bold text-gb-primary uppercase tracking-widest bg-gb-primary-subtle px-3 py-1 rounded-full">
            {copy.badge}
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            {copy.title}
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base">
            {copy.description}
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 ${
                selectedCategory === cat
                  ? 'bg-gb-primary text-white shadow-sm'
                  : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300 hover:bg-slate-100/50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Accordion Component */}
        <div className="bg-transparent">
          <Accordion items={filteredFaqs} />
        </div>

        {/* Support Banner Card */}
        <div className="mt-12 bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="w-12 h-12 rounded-2xl bg-gb-primary-subtle text-gb-primary flex items-center justify-center shrink-0">
              <MessageSquare className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-base">{copy.supportTitle}</h4>
              <p className="text-xs sm:text-sm text-slate-500">{copy.supportDescription}</p>
            </div>
          </div>
          <a
            href="tel:09678112233"
            className="px-6 py-3 rounded-xl font-bold text-sm text-white bg-gb-primary hover:bg-gb-primary-dark transition-all duration-200 shadow shrink-0"
          >
            {copy.call}
          </a>
        </div>
      </div>
    </section>
  );
}

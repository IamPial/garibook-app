import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, ExternalLink, Newspaper } from 'lucide-react';

export default function FeaturedNewsSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const newsItems = [
    {
      source: 'The Daily Star',
      title: 'Garibook spreads Eid joy with "Khushir Ticket" & launches intercity digital fleet',
      snippet: 'Garibook’s pioneering bidding ecosystem lets travelers select their own driver fare without middlemen markups.',
      date: 'Press Release',
      link: 'https://www.thedailystar.net/business/organisation-news/press-releases/news/garibook-spreads-eid-joy-khushir-ticket-3911946',
      badge: 'National Press',
    },
    {
      source: 'Dhaka Tribune',
      title: 'Digital app Garibook to offer "Chander Gari" for tourism across hilly districts',
      snippet: 'Travelers heading to Sajek Valley and Bandarban can now hire verified 4x4 open-hood Chander Gari with transparent pricing.',
      date: 'Tech & Business',
      link: 'https://www.dhakatribune.com/business/365516/digital-app-garibook-to-offer-%E2%80%98chander-gari%E2%80%99',
      badge: 'Tourism Feature',
    },
    {
      source: 'Prothom Alo',
      title: 'সহজ ও নিরাপদ আন্তঃজেলা গাড়ি ভাড়ার ডিজিটাল প্ল্যাটফর্ম গারিবুক',
      snippet: '৬৪ জেলায় নির্ভরযোগ্য ড্রাইভার ও সাশ্রয়ী ভাড়ার মাধ্যমে নিরাপদ ভ্রমণের নতুন দিগন্ত উন্মোচন করেছে গারিবুক।',
      date: 'জাতীয় সংবাদ',
      link: 'https://www.prothomalo.com/bangladesh/a3gn6ql2t8',
      badge: 'Bangladesh Daily',
    },
    {
      source: 'Tech In Asia',
      title: 'How Bangladeshi startup Garibook built a 0% driver commission car rental model',
      snippet: 'Disrupting traditional fleet agencies by replacing fixed cartels with peer-to-peer live auction bidding.',
      date: 'Ecosystem Spotlight',
      link: 'https://garibook.com/newsrooms',
      badge: 'Startup Tech',
    },
  ];

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev === 0 ? newsItems.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev === newsItems.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="py-20 sm:py-24 bg-slate-50 border-y border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header & Slider Nav */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
          <div>
            <span className="text-xs font-bold text-gb-primary uppercase tracking-widest bg-gb-primary-subtle px-3 py-1 rounded-full">
              Press & Media
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              We Featured by Top News Platforms
            </h2>
            <p className="mt-2 text-slate-600 text-sm">
              Read what national media and travel editors are saying about our journey.
            </p>
          </div>

          {/* Slider controls */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handlePrev}
              className="p-3 rounded-full bg-white border border-slate-200 text-slate-700 hover:bg-gb-primary hover:text-white hover:border-gb-primary transition-all duration-200 shadow-sm active:scale-95"
              aria-label="Previous article"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="p-3 rounded-full bg-white border border-slate-200 text-slate-700 hover:bg-gb-primary hover:text-white hover:border-gb-primary transition-all duration-200 shadow-sm active:scale-95"
              aria-label="Next article"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* News Cards Grid / Carousel */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {newsItems.map((item, idx) => (
            <a
              key={item.title}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className={`group bg-white rounded-2xl p-6 border transition-all duration-300 flex flex-col justify-between hover:shadow-gb-hover hover:border-gb-primary/30 ${
                idx === currentSlide
                  ? 'ring-2 ring-gb-primary/20 border-gb-primary/40'
                  : 'border-slate-200'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold text-gb-primary bg-gb-primary-subtle px-2.5 py-1 rounded-full">
                    {item.badge}
                  </span>
                  <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-gb-primary transition-colors" />
                </div>

                <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                  <Newspaper className="w-3.5 h-3.5 text-slate-400" />
                  <span>{item.source}</span>
                </div>

                <h3 className="text-base font-bold text-slate-900 group-hover:text-gb-primary transition-colors line-clamp-2 leading-snug">
                  {item.title}
                </h3>

                <p className="mt-3 text-xs sm:text-sm text-slate-600 line-clamp-3 leading-relaxed">
                  {item.snippet}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                <span>{item.date}</span>
                <span className="font-semibold text-gb-primary group-hover:underline">
                  Read article →
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

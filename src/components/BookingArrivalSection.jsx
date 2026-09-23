import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function BookingArrivalSection() {
  const { t } = useLanguage();
  const copy = t.sections.arrival;
  return (
    <section className="py-20 sm:py-28 bg-slate-950 text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header & CTA Row */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div className="max-w-xl">
            <span className="text-xs font-bold text-gb-warning uppercase tracking-widest bg-white/5 px-3 py-1 rounded-full border border-white/10">
              {copy.badge}
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              {copy.title}
            </h2>
            <p className="mt-3 text-slate-400 text-sm sm:text-base">
              {copy.description}
            </p>
          </div>

          <div>
            <a
              href="https://onelink.to/gbweb"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-3.5 rounded-xl font-bold text-slate-900 bg-gb-warning hover:bg-gb-warning-hover transition-all duration-200 shadow-lg hover:shadow-gb-warning/20 active:scale-95"
            >
              <span>{copy.download}</span>
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Asymmetric Image Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4 sm:gap-6">
          {/* Item 1 (Wide): Explore */}
          <div className="lg:col-span-8 rounded-2xl overflow-hidden border border-white/10 relative group h-64 sm:h-80">
            <img
              src="/assets/images/services/explore.jpeg"
              alt="Explore Bangladesh"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-6">
              <div>
                <span className="text-xs font-semibold text-gb-warning">{copy.explore}</span>
                <p className="text-lg font-bold text-white">{copy.nationwide}</p>
              </div>
            </div>
          </div>

          {/* Item 2: Freedom */}
          <div className="lg:col-span-4 rounded-2xl overflow-hidden border border-white/10 relative group h-64 sm:h-80">
            <img
              src="/assets/images/services/freedom.jpg"
              alt="Total Freedom"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-6">
              <div>
                <span className="text-xs font-semibold text-gb-warning">{copy.flexibility}</span>
                <p className="text-lg font-bold text-white">{copy.pace}</p>
              </div>
            </div>
          </div>

          {/* Item 3: Safe Travel */}
          <div className="lg:col-span-4 rounded-2xl overflow-hidden border border-white/10 relative group h-64 sm:h-72 bg-slate-900 flex items-center justify-center p-6">
            <img
              src="/assets/images/services/safe_travel.svg"
              alt="Safe Travel"
              className="max-h-48 w-auto object-contain group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute bottom-4 left-6">
              <span className="text-xs font-bold text-emerald-400">{copy.safety}</span>
            </div>
          </div>

          {/* Item 4: Preferred Car */}
          <div className="lg:col-span-4 rounded-2xl overflow-hidden border border-white/10 relative group h-64 sm:h-72">
            <img
              src="/assets/images/services/prefarred_car.jpg"
              alt="Preferred Car"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-6">
              <div>
                <span className="text-xs font-semibold text-gb-warning">{copy.clean}</span>
                <p className="text-base font-bold text-white">{copy.standards}</p>
              </div>
            </div>
          </div>

          {/* Item 5: Smooth Ride */}
          <div className="lg:col-span-4 rounded-2xl overflow-hidden border border-white/10 relative group h-64 sm:h-72">
            <img
              src="/assets/images/services/smooth.jpg"
              alt="Smooth Journey"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-6">
              <div>
                <span className="text-xs font-semibold text-gb-warning">{copy.smooth}</span>
                <p className="text-base font-bold text-white">{copy.dispatch}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

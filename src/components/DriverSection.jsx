import React from 'react';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function DriverSection() {
  const { t } = useLanguage();
  const copy = t.sections.driver;
  return (
    <section id="smart-driver" className="py-20 sm:py-28 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-xl mx-auto mb-12 sm:mb-16">
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

        {/* Feature Banner in Garibook Yellow */}
        <div className="bg-gradient-to-br from-amber-400 via-amber-400 to-amber-500 rounded-3xl p-8 sm:p-12 lg:p-16 shadow-xl relative overflow-hidden">
          {/* Decorative background shapes */}
          <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-white/10 rounded-full blur-2xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <span className="inline-block text-xs font-black uppercase tracking-wider text-slate-950 bg-white/40 px-3.5 py-1.5 rounded-full border border-black/10">
                {copy.zeroFee}
              </span>

              <h3 className="text-3xl sm:text-5xl font-black text-slate-950 tracking-tight leading-[1.1]">
                {copy.freedom} <br />
                <span className="text-white drop-shadow-sm">{copy.freedomTitle}</span>
              </h3>

              <p className="text-slate-900 text-base sm:text-lg max-w-lg font-medium leading-relaxed">
                {copy.body}
              </p>

              {/* Perks */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-sm font-semibold text-slate-950">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-slate-950 shrink-0" />
                  <span>{copy.perks[0]}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-slate-950 shrink-0" />
                  <span>{copy.perks[1]}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-slate-950 shrink-0" />
                  <span>{copy.perks[2]}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-slate-950 shrink-0" />
                  <span>{copy.perks[3]}</span>
                </div>
              </div>

              <div className="pt-4">
                <a
                  href="https://play.google.com/store/search?q=garibook%20smart%20driver&c=apps"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-8 py-4 rounded-xl font-bold text-white bg-slate-950 hover:bg-slate-800 transition-all duration-200 shadow-xl hover:shadow-2xl active:scale-95"
                >
                  <span>{copy.download}</span>
                  <ArrowRight className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Right: Phone App Screen Graphic */}
            <div className="lg:col-span-5 flex justify-center items-center">
              <div className="relative group max-w-xs sm:max-w-sm">
                <img
                  src="/assets/images/app-screen/no_commission_app_screen.png"
                  alt="Garibook Smart Driver App Screen"
                  className="w-full h-auto drop-shadow-2xl transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

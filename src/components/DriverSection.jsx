import React from 'react';
import { ArrowRight, CheckCircle } from 'lucide-react';

export default function DriverSection() {
  return (
    <section id="smart-driver" className="py-20 sm:py-28 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-xl mx-auto mb-12 sm:mb-16">
          <span className="text-xs font-bold text-gb-primary uppercase tracking-widest bg-gb-primary-subtle px-3 py-1 rounded-full">
            Driver Partner Program
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            Be a Smart Driver
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base">
            Keep everything you earn. Join thousands of respected drivers choosing their own bids and trips.
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
                ⭐ Zero Platform Fee for Drivers
              </span>

              <h3 className="text-3xl sm:text-5xl font-black text-slate-950 tracking-tight leading-[1.1]">
                0% Commission <br />
                <span className="text-white drop-shadow-sm">100% Freedom</span>
              </h3>

              <p className="text-slate-900 text-base sm:text-lg max-w-lg font-medium leading-relaxed">
                Set your own fare bids, pick routes you prefer, receive direct passenger payments, and enjoy complimentary road assistance anytime, anywhere.
              </p>

              {/* Perks */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-sm font-semibold text-slate-950">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-slate-950 shrink-0" />
                  <span>Direct passenger cash / bKash</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-slate-950 shrink-0" />
                  <span>Choose long tours or short city trips</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-slate-950 shrink-0" />
                  <span>No forced trips or cancellation penalties</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-slate-950 shrink-0" />
                  <span>24/7 Garibook driver helpline</span>
                </div>
              </div>

              <div className="pt-4">
                <a
                  href="https://play.google.com/store/search?q=garibook%20smart%20driver&c=apps"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-8 py-4 rounded-xl font-bold text-white bg-slate-950 hover:bg-slate-800 transition-all duration-200 shadow-xl hover:shadow-2xl active:scale-95"
                >
                  <span>Download Smart Driver App</span>
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

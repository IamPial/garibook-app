import React from 'react';
import { ArrowRight, Smartphone, QrCode, Shield, CheckCircle } from 'lucide-react';

export default function DownloadAppSection() {
  return (
    <section className="py-16 sm:py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-gb-primary to-emerald-900 rounded-3xl p-8 sm:p-14 lg:p-16 text-white relative overflow-hidden shadow-2xl">
          {/* Background decorative circles */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-amber-400/20 rounded-full blur-2xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <span className="inline-block text-xs font-bold uppercase tracking-wider text-slate-900 bg-gb-warning px-3.5 py-1.5 rounded-full shadow-sm">
                Get Started on Mobile
              </span>

              <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-[1.15]">
                Download <br />
                Garibook Mobile App
              </h2>

              <p className="text-emerald-100 text-base sm:text-lg max-w-lg leading-relaxed">
                Download our Customer, Smart Driver, and Enterprise App. Book rides on the go, receive instant driver bids, and track your trip live in real-time.
              </p>

              {/* Perks Checklist */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-emerald-50 pt-2 font-medium">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-gb-warning shrink-0" />
                  <span>Available on Android & iOS</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-gb-warning shrink-0" />
                  <span>Instant Driver Bidding</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-gb-warning shrink-0" />
                  <span>Live GPS Tracking</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-gb-warning shrink-0" />
                  <span>24/7 Roadside Assistance</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex flex-wrap items-center gap-4">
                <a
                  href="https://play.google.com/store/apps/details?id=com.garibook.user"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-6 py-3.5 rounded-xl font-bold text-slate-900 bg-white hover:bg-slate-100 transition-all shadow-md hover:shadow-lg active:scale-95 text-sm"
                >
                  <Smartphone className="w-5 h-5 text-gb-primary" />
                  <div className="text-left">
                    <p className="text-[10px] text-slate-500 uppercase leading-none">Get it on</p>
                    <p className="font-extrabold text-xs sm:text-sm text-slate-900 leading-tight">Google Play</p>
                  </div>
                </a>

                <a
                  href="https://apps.apple.com/us/app/garibook/id6444159035"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-6 py-3.5 rounded-xl font-bold text-slate-900 bg-white hover:bg-slate-100 transition-all shadow-md hover:shadow-lg active:scale-95 text-sm"
                >
                  <Smartphone className="w-5 h-5 text-slate-900" />
                  <div className="text-left">
                    <p className="text-[10px] text-slate-500 uppercase leading-none">Download on</p>
                    <p className="font-extrabold text-xs sm:text-sm text-slate-900 leading-tight">App Store</p>
                  </div>
                </a>

                <a
                  href="https://onelink.to/gbweb"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-slate-900 bg-gb-warning hover:bg-gb-warning-hover transition-all shadow-md active:scale-95 text-sm"
                >
                  <span>Direct Download</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Right Card / QR mockup */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="bg-white/10 backdrop-blur-md p-6 sm:p-8 rounded-3xl border border-white/20 text-center max-w-xs w-full shadow-2xl">
                <div className="w-16 h-16 rounded-2xl bg-white/20 mx-auto flex items-center justify-center mb-4 text-gb-warning">
                  <QrCode className="w-10 h-10" />
                </div>
                <h4 className="font-extrabold text-lg text-white">Scan to Install</h4>
                <p className="text-xs text-emerald-100 mt-1 mb-4">
                  Point your phone camera to download instantly
                </p>
                <div className="bg-white p-3 rounded-2xl inline-block shadow-inner">
                  {/* Decorative QR code matrix */}
                  <div className="w-36 h-36 border-2 border-slate-900/10 rounded-xl flex items-center justify-center p-2 bg-slate-50">
                    <img
                      src="/assets/images/gaibook-logo.svg"
                      alt="Garibook App"
                      className="w-20 h-auto opacity-90"
                    />
                  </div>
                </div>
                <p className="text-[11px] text-emerald-200 mt-4">
                  Supports Android 8+ & iOS 14+
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

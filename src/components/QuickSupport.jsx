import React, { useState, useEffect } from 'react';
import { Phone, ArrowUp, MessageSquare, X, MessageCircle, Clock, ShieldCheck } from 'lucide-react';

export default function QuickSupport() {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 350);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3">
      {/* Expanded Support Card */}
      {isDrawerOpen && (
        <div className="bg-white rounded-3xl p-5 shadow-2xl border border-slate-200 w-72 sm:w-80 animate-in fade-in slide-in-from-bottom-5 duration-200">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <h4 className="font-bold text-slate-900 text-sm">Garibook 24/7 Help Desk</h4>
            </div>
            <button
              type="button"
              onClick={() => setIsDrawerOpen(false)}
              className="p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-xs text-slate-500 my-3 leading-relaxed">
            Need urgent driver dispatch or airport schedule assistance? Reach out to our Dhaka support center immediately.
          </p>

          <div className="space-y-2">
            <a
              href="tel:09678112233"
              className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-50 hover:bg-gb-primary-subtle text-slate-800 hover:text-gb-primary transition-colors border border-slate-200/60"
            >
              <div className="w-8 h-8 rounded-lg bg-emerald-100 text-gb-primary flex items-center justify-center shrink-0">
                <Phone className="w-4 h-4" />
              </div>
              <div className="text-left">
                <p className="text-[10px] text-slate-400 uppercase font-semibold">Toll-Free Hotline</p>
                <p className="text-xs font-bold">09678-112233</p>
              </div>
            </a>

            <a
              href="https://wa.me/8801700000000?text=Hi%20Garibook,%20I%20need%20assistance%20with%20car%20rental"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-50 hover:bg-emerald-50 text-slate-800 hover:text-emerald-700 transition-colors border border-slate-200/60"
            >
              <div className="w-8 h-8 rounded-lg bg-emerald-500 text-white flex items-center justify-center shrink-0">
                <MessageCircle className="w-4 h-4" />
              </div>
              <div className="text-left">
                <p className="text-[10px] text-slate-400 uppercase font-semibold">Instant WhatsApp</p>
                <p className="text-xs font-bold">+88 017 0000 0000</p>
              </div>
            </a>
          </div>

          <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400">
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" /> Average response: 2 mins
            </span>
            <span className="flex items-center gap-1 text-emerald-600 font-semibold">
              <ShieldCheck className="w-3 h-3" /> Verified Help
            </span>
          </div>
        </div>
      )}

      {/* Floating Buttons Row */}
      <div className="flex items-center gap-3">
        {/* Support Bubble Toggle */}
        <button
          type="button"
          onClick={() => setIsDrawerOpen(!isDrawerOpen)}
          className="flex items-center gap-2.5 px-4 py-3 rounded-full bg-slate-900 text-white shadow-2xl hover:bg-gb-primary transition-all duration-200 group active:scale-95 cursor-pointer border border-slate-800"
          title="24/7 Customer Assistance"
        >
          <div className="relative">
            <MessageSquare className="w-4 h-4 text-gb-warning" />
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-400 ring-2 ring-slate-900" />
          </div>
          <span className="text-xs font-bold hidden sm:inline">24/7 Helpline</span>
        </button>

        {/* Back To Top Button */}
        {showBackToTop && (
          <button
            type="button"
            onClick={scrollToTop}
            className="p-3 rounded-full bg-white text-slate-700 border border-slate-200 shadow-xl hover:bg-gb-primary hover:text-white hover:border-gb-primary transition-all duration-200 active:scale-90 cursor-pointer"
            aria-label="Back to top"
          >
            <ArrowUp className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
}

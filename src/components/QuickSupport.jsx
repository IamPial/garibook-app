import React, { useState, useEffect } from 'react';
import { Phone, ArrowUp, MessageSquare, X, MessageCircle, Clock, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function QuickSupport() {
  const { lang } = useLanguage();
  const bn = lang === 'bn';
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
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3 select-none">
      
      {/* Expanded Support Card Drawer */}
      {isDrawerOpen && (
        <div className="bg-white rounded-3xl p-5 shadow-2xl border border-slate-100 w-72 sm:w-80 animate-in fade-in slide-in-from-bottom-5 duration-200 mb-2">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-gb-primary animate-pulse" />
              <h4 className="font-bold text-slate-900 text-sm">{bn ? 'গাড়িবুক ২৪/৭ হেল্প ডেস্ক' : 'Garibook 24/7 Help Desk'}</h4>
            </div>
            <button
              type="button"
              onClick={() => setIsDrawerOpen(false)}
              className="p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-xs text-slate-500 my-3 leading-relaxed">
            {bn ? 'জরুরি চালক বা এয়ারপোর্ট সহায়তা দরকার? আমাদের ঢাকা সাপোর্ট সেন্টারে যোগাযোগ করুন।' : 'Need urgent driver dispatch or airport schedule assistance? Reach out to our Dhaka support center immediately.'}
          </p>

          <div className="space-y-2">
            <a
              href="tel:09678112233"
              className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-50 hover:bg-blue-50 text-slate-800 hover:text-[#0052FF] transition-colors border border-slate-200/60"
            >
              <div className="w-8 h-8 rounded-lg bg-blue-100 text-[#0052FF] flex items-center justify-center shrink-0">
                <Phone className="w-4 h-4" />
              </div>
              <div className="text-left">
                <p className="text-[10px] text-slate-400 uppercase font-semibold">{bn ? 'টোল-ফ্রি হটলাইন' : 'Toll-Free Hotline'}</p>
                <p className="text-xs font-bold">09678-112233</p>
              </div>
            </a>

            <a
              href="https://wa.me/8801700000000?text=Hi%20Garibook,%20I%20need%20assistance%20with%20car%20rental"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-50 hover:bg-emerald-50 text-slate-800 hover:text-gb-primary transition-colors border border-slate-200/60"
            >
              <div className="w-8 h-8 rounded-lg bg-gb-primary text-white flex items-center justify-center shrink-0">
                <MessageCircle className="w-4 h-4" />
              </div>
              <div className="text-left">
                <p className="text-[10px] text-slate-400 uppercase font-semibold">{bn ? 'তাৎক্ষণিক হোয়াটসঅ্যাপ' : 'Instant WhatsApp'}</p>
                <p className="text-xs font-bold">+88 017 0000 0000</p>
              </div>
            </a>
          </div>

          <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400">
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" /> {bn ? 'গড় উত্তর: ২ মিনিট' : 'Average response: 2 mins'}
            </span>
            <span className="flex items-center gap-1 text-gb-primary font-semibold">
              <ShieldCheck className="w-3 h-3" /> {bn ? 'যাচাইকৃত সহায়তা' : 'Verified Help'}
            </span>
          </div>
        </div>
      )}

      {/* Vertical Column for Floating Action Buttons */}
      <div className="flex flex-col items-center gap-3">
        
        {/* Rounded Square Back To Top Button */}
        {showBackToTop && (
          <button
            type="button"
            onClick={scrollToTop}
            className="relative z-10 w-12 h-12 rounded-2xl bg-[#0052FF] text-white flex items-center justify-center shadow-lg hover:bg-blue-700 transition-all duration-200 active:scale-95 cursor-pointer"
            aria-label="Back to top"
            title={bn ? 'উপরে যান' : 'Back to top'}
          >
            <ArrowUp className="w-6 h-6 stroke-[2.5]" />
          </button>
        )}

        {/* Circular Blue Message Support Button */}
        <button
          type="button"
          onClick={() => setIsDrawerOpen(!isDrawerOpen)}
          className="w-14 h-14 rounded-full bg-[#0052FF] text-white flex items-center justify-center shadow-xl hover:bg-blue-700 transition-all duration-200 active:scale-95 cursor-pointer"
          aria-label="Support Chat"
          title={bn ? '২৪/৭ গ্রাহক সহায়তা' : '24/7 Customer Assistance'}
        >
          {isDrawerOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <MessageSquare className="w-6 h-6 fill-white stroke-none" />
          )}
        </button>

      </div>
    </div>
  );
}
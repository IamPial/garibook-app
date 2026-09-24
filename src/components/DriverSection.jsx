import React from 'react';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function DriverSection() {
  const { t } = useLanguage();
  const copy = t.sections.driver;
  return (
    <section id="smart-driver" className="py-10 sm:py-16 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <h2 className="mt-3 text-3xl sm:text-[46px]  font-bold text-gb-dark tracking-tight mb-10">
            {copy.title}
          </h2>

        <div className="bg-[#efc30c] rounded-3xl shadow-xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 p-20 ">   

              <h3 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-gb-primary tracking-tight leading-[1.1]">
                {copy.freedom} <br />
                <span className="text-gb-primary">{copy.freedomTitle}</span>
              </h3>
              {/* Perks */}
              
              <div className="pt-4">
                <a
                  href="https://play.google.com/store/search?q=garibook%20smart%20driver&c=apps"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-8 py-4 rounded-xl font-bold text-white bg-gb-primary  transition-all duration-300  hover:scale-105 active:scale-95"
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
                  className="w-full h-auto "
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

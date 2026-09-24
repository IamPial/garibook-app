import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function DownloadAppSection() {
  const { t } = useLanguage();
  const copy = t.sections.download;

 
  const title = copy?.title || 'Download Garibook Mobile App';
  const [firstWord, ...restWords] = title.split(' ');

  return (

    <section className="pt-12 pb-12 sm:pt-20 sm:pb-20 lg:pt-24 bg-white relative select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="relative rounded-xl bg-[#0052FF] text-white px-6 pt-10 pb-106 sm:px-12 sm:pt-14 sm:pb-112 lg:pl-24 lg:pr-8 lg:py-16 lg:min-h-110 flex items-start lg:items-center">
          {/* Left text */}
          <div className="relative z-10 max-w-xl">
            <h2 className="text-4xl sm:text-5xl lg:text-[46px] font-bold leading-[1.15] tracking-tight">
              <span className="block">{firstWord}</span>
              {restWords.length > 0 && <span className="block">{restWords.join(' ')}</span>}
            </h2>

            <p className="mt-4 max-w-md text-lg sm:text-xl font-medium leading-snug text-white">
              {copy?.description || 'Download our Customer, Smart Driver and Enterprise App'}
            </p>


            <div className="mt-8">
              <a
                href="https://onelink.to/gbweb"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex w-full sm:w-75 h-16 sm:h-18 items-center justify-between px-8 rounded-xl bg-[#FFD200] text-gb-dark text-base sm:text-lg font-semibold transition hover:brightness-95 active:scale-[0.98] hover:scale-105"
              >
                <span>Download App</span>
                <ArrowRight className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1" />
              </a>
            </div>
          </div>
          <div
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 h-90 sm:h-96 lg:h-[calc(100%+2.5rem)] overflow-hidden rounded-b-xl pointer-events-none"
          >
            <img
              src="/assets/images/app-screen/app_download.png"
              alt="Garibook Mobile App"
              className="absolute bottom-0 left-1/2 -translate-x-1/2 lg:left-auto lg:right-[10%] lg:translate-x-0 h-full w-auto max-w-none object-contain object-bottom"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
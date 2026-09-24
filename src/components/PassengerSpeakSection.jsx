import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, ArrowRight, Play, X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function PassengerSpeakSection() {
  const { lang } = useLanguage();
  const bn = lang === 'bn';

  const sliderRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const [activeVideoId, setActiveVideoId] = useState(null);

  // Scroll Animation State
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  // Mobile Touch Swipe Handlers
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  // Both Scroll In & Scroll Out Trigger Logic
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // স্ক্রিনের সাইজ অনুযায়ী কলাম নিয়ন্ত্রণ
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemsPerPage(2);
      } else if (window.innerWidth < 1024) {
        setItemsPerPage(2);
      } else {
        setItemsPerPage(3);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const passengers = [
    {
      id: 1,
      name: 'Atif Haider',
      role: 'Banker',
      youtubeId: 'JsBwaJ_VIcA',
    },
    {
      id: 2,
      name: 'Mohammad Habibur Rahman',
      role: 'Banker',
      youtubeId: 'CsxeEof1T3M',
    },
    {
      id: 3,
      name: 'Sadia Afrin',
      role: 'Service Holder',
      youtubeId: '8ma9XEGhi5s',
    },
    {
      id: 4,
      name: 'Tanvir Ahmed',
      role: 'Business Owner',
      youtubeId: 'JsBwaJ_VIcA',
    },
  ];

  const handlePrev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? passengers.length - itemsPerPage : prev - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prev) =>
      prev >= passengers.length - itemsPerPage ? 0 : prev + 1
    );
  };

  // Mobile Touch Swipe Handlers
  const handleTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      handleNext();
    } else if (isRightSwipe) {
      handlePrev();
    }
  };

  return (
    <section 
      ref={sectionRef} 
      id="reviews" 
      className="py-10 sm:py-16 bg-[#f4f7fc] overflow-hidden select-none"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section with Scroll In & Out Animation */}
        <div 
          className={`flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 sm:mb-14 transition-all duration-700 ease-in-out transform ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'
          }`}
        >
          <div className="max-w-2xl">
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              {bn ? 'আমাদের সম্মানিত যাত্রীদের অভিজ্ঞতা' : 'Our Passengers Speak For Us'}
            </h2>
            <p className="mt-2 sm:mt-3 text-slate-600 font-normal text-sm sm:text-base leading-relaxed">
              {bn
                ? 'আমাদের যাত্রা শুরু থেকে শেষ পর্যন্ত অত্যন্ত স্বাচ্ছন্দ্যময় ও আনন্দদায়ক ছিল। বুকিং প্রক্রিয়াটি ছিল খুবই সহজ এবং টিম ছিল অত্যন্ত যত্নশীল।'
                : 'Our journey was seamless and enjoyable from start to finish. The booking process was straightforward, and the staff were incredibly attentive, ensuring we felt comfortable throughout the trip.'}
            </p>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-3 shrink-0 self-start md:self-auto">
            <button
              type="button"
              onClick={handlePrev}
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white hover:bg-gb-dark flex items-center justify-center text-slate-800 hover:text-white border border-slate-200/60 transition-all duration-300 active:scale-90 cursor-pointer shadow-xs"
              aria-label="Previous slide"
            >
              <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-200 group-hover:-translate-x-0.5" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white hover:bg-gb-dark flex items-center justify-center text-slate-800 hover:text-white border border-slate-200/60 transition-all duration-300 active:scale-90 cursor-pointer shadow-xs"
              aria-label="Next slide"
            >
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-200 group-hover:translate-x-0.5" />
            </button>
          </div>
        </div>

        {/* Carousel Slider with Dynamic Scroll In & Out Animation */}
        <div 
          className="overflow-hidden touch-pan-y"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div
            ref={sliderRef}
            className="flex transition-transform duration-500 ease-in-out gap-3 sm:gap-6 lg:gap-8"
            style={{
              transform: `translateX(-${currentIndex * (100 / itemsPerPage)}%)`,
            }}
          >
            {passengers.map((item, index) => {
              const thumbnailUrl = `https://img.youtube.com/vi/${item.youtubeId}/hqdefault.jpg`;

              return (
                <div
                  key={item.id}
                  style={{
                    transitionDelay: isVisible ? `${(index + 1) * 120}ms` : '0ms',
                  }}
                  className={`w-[calc(50%-0.375rem)] sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1.33rem)] shrink-0 group cursor-pointer transition-all duration-700 ease-in-out transform ${
                    isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-12 scale-95'
                  }`}
                  onClick={() => setActiveVideoId(item.youtubeId)}
                >
                  {/* Video Card Preview Container */}
                  <div className="relative w-full h-36 sm:h-64 rounded-xl sm:rounded-2xl overflow-hidden mb-2 sm:mb-4 bg-slate-200 shadow-xs">
                    <img
                      src={thumbnailUrl}
                      alt={item.name}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    />
                    
                    {/* Dark Hover Overlay */}
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300" />

                    {/* Red Play Icon Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-9 h-9 sm:w-16 sm:h-16 rounded-full bg-[#E50914] flex items-center justify-center text-white shadow-lg transition-all duration-300 group-hover:scale-115 group-hover:shadow-red-500/50">
                        <Play className="w-4 h-4 sm:w-6 sm:h-6 fill-white ml-0.5" />
                      </div>
                    </div>
                  </div>

                  {/* Passenger Info */}
                  <div className="px-1">
                    <h3 className="text-xs sm:text-lg font-bold text-slate-900 leading-snug group-hover:text-gb-dark transition-colors duration-200 truncate">
                      {item.name}
                    </h3>
                    <p className="text-[10px] sm:text-sm font-medium text-slate-500 mt-0.5 truncate">
                      {item.role}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* YouTube Video Modal / Popup */}
      {activeVideoId && (
        <div 
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 transition-opacity duration-300"
          onClick={() => setActiveVideoId(null)}
        >
          <div 
            className="relative w-full max-w-3xl bg-black rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl aspect-video transition-transform duration-300 scale-100"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setActiveVideoId(null)}
              className="absolute top-3 right-3 z-10 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center transition-all cursor-pointer active:scale-95"
              aria-label="Close video"
            >
              <X className="w-5 h-5" />
            </button>

            {/* YouTube Embed iFrame */}
            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${activeVideoId}?autoplay=1`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </section>
  );
}
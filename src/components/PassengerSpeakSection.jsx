import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star, Quote, CheckCircle2, ThumbsUp } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function PassengerSpeakSection() {
  const { lang } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const testimonials = [
    {
      name: 'Tanvir Ahmed',
      role: 'Family Vacation Traveler',
      route: 'Dhaka ⇄ Sylhet',
      car: 'Toyota Noah (7-Seater)',
      stars: 5,
      date: 'Verified 2 days ago',
      review:
        'Super punctual driver, arrived 15 minutes early in Niketon. The car was spotless with great dual air-conditioning for our 6-hour family journey. The best and most transparent car booking experience in Bangladesh!',
    },
    {
      name: 'Nusrat Jahan',
      role: 'Expat & Frequent Flyer',
      route: 'DAC Airport ⇄ Dhanmondi',
      car: 'Sedan (Toyota Allion)',
      stars: 5,
      date: 'Verified 1 week ago',
      review:
        'Landing at midnight usually makes finding a reliable ride stressful. With Garibook, my driver was waiting right outside Terminal 2 with my name card. Zero bargaining, transparent payment, and total peace of mind.',
    },
    {
      name: 'Shahriar Kabir',
      role: 'Group Tour Organizer',
      route: "Dhaka ⇄ Cox's Bazar",
      car: 'Toyota HiAce Super GL',
      stars: 5,
      date: 'Verified 2 weeks ago',
      review:
        'We booked a HiAce for our 10-person reunion road trip. Through the live bidding feature, we received multiple driver quotes within 15 minutes and selected an experienced highway chauffeur. Saved ৳2,500 compared to local rental agencies!',
    },
    {
      name: 'Dr. Mehzabin Chowdhury',
      role: 'Medical Consultant',
      route: 'Chattogram ⇄ Cumilla',
      car: 'Sedan (Toyota Premio)',
      stars: 5,
      date: 'Verified 3 weeks ago',
      review:
        'Polite chauffeur who maintained safe highway speeds without reckless overtakes. As a solo female traveler traveling intercity frequently for hospital visits, safety is my #1 priority. Garibook delivered 10/10.',
    },
  ];

  // Auto rotate every 5 seconds unless hovered
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, [isPaused, testimonials.length]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  return (
    <section
      id="reviews"
      className="py-20 sm:py-28 bg-slate-50 relative overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Subtle background circles */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-emerald-100/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header & Controls */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div className="max-w-2xl">
            <span className="text-xs font-bold text-gb-primary uppercase tracking-widest bg-gb-primary-subtle px-3 py-1 rounded-full">
              {lang === 'bn' ? 'যাত্রীদের মতামত' : 'Real Experiences'}
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              {lang === 'bn' ? 'আমাদের সম্মানিত যাত্রীদের অভিজ্ঞতা' : 'Our Passengers Speak For Us'}
            </h2>
            <p className="mt-3 text-slate-600 text-sm sm:text-base">
              {lang === 'bn'
                ? 'বাংলাদেশের বিভিন্ন জেলার প্রকৃত গ্রাহকদের শতভাগ যাচাইকৃত অভিজ্ঞতা।'
                : 'Our journey was seamless and enjoyable from start to finish. Read genuine testimonials from verified riders across Bangladesh.'}
            </p>
          </div>

          {/* Slider Controls & Rating Pill */}
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white border border-slate-200 text-xs font-bold text-slate-700 shadow-xs">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span>4.9 / 5 Overall Score</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handlePrev}
                className="p-3 rounded-full bg-white border border-slate-200 text-slate-700 hover:bg-gb-primary hover:text-white hover:border-gb-primary transition-all duration-200 shadow-xs active:scale-95 cursor-pointer"
                aria-label="Previous review"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="p-3 rounded-full bg-white border border-slate-200 text-slate-700 hover:bg-gb-primary hover:text-white hover:border-gb-primary transition-all duration-200 shadow-xs active:scale-95 cursor-pointer"
                aria-label="Next review"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Carousel Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((item, idx) => {
            const isFeatured = idx === currentIndex;
            return (
              <div
                key={item.name}
                onClick={() => setCurrentIndex(idx)}
                className={`bg-white rounded-3xl p-6 border transition-all duration-300 flex flex-col justify-between relative cursor-pointer ${
                  isFeatured
                    ? 'border-gb-primary shadow-gb-hover ring-2 ring-gb-primary/10 scale-[1.02]'
                    : 'border-slate-200 shadow-gb-card hover:border-slate-300 opacity-90 hover:opacity-100'
                }`}
              >
                <div>
                  {/* Top Quote & Stars */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1 text-amber-400">
                      {[...Array(item.stars)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <Quote className="w-6 h-6 text-slate-200" />
                  </div>

                  {/* Route & Car Tag */}
                  <div className="flex flex-wrap items-center gap-1.5 mb-3">
                    <span className="text-[11px] font-bold text-gb-primary bg-gb-primary-subtle px-2 py-0.5 rounded-full">
                      {item.route}
                    </span>
                    <span className="text-[11px] text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                      {item.car}
                    </span>
                  </div>

                  {/* Review Text */}
                  <p className="text-slate-700 text-xs sm:text-sm leading-relaxed italic line-clamp-4">
                    "{item.review}"
                  </p>
                </div>

                {/* Reviewer Details */}
                <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">
                      {item.name}
                    </h4>
                    <p className="text-[11px] text-slate-400">{item.role}</p>
                  </div>
                  <div className="flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Verified</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Carousel Pagination Dots */}
        <div className="flex justify-center items-center gap-2 mt-8">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setCurrentIndex(idx)}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                idx === currentIndex ? 'w-8 bg-gb-primary' : 'w-2 bg-slate-300 hover:bg-slate-400'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, ShieldCheck, Star, Users, MapPin, Sparkles } from 'lucide-react';
import gsap from 'gsap';
import { useLanguage } from '../context/LanguageContext';

export default function HeroSection() {
  const { lang, t } = useLanguage();
  const heroRef = useRef(null);
  const headlineRef = useRef(null);
  const subtitleRef = useRef(null);
  const ctaRef = useRef(null);
  const badgesRef = useRef(null);

  // Rotating phrases for typewriter
  const phrases = [
    'City to City',
    'Intercity Car Rental',
    'Airport Transfer',
    'Hourly Car Rental',
    'Freedom in Every Journey',
  ];

  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  // Typewriter effect
  useEffect(() => {
    const currentPhrase = phrases[currentPhraseIndex];
    let timer;

    if (!isDeleting && displayText === currentPhrase) {
      timer = setTimeout(() => setIsDeleting(true), 2200);
    } else if (isDeleting && displayText === '') {
      setIsDeleting(false);
      setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length);
    } else {
      const speed = isDeleting ? 35 : 75;
      timer = setTimeout(() => {
        setDisplayText((prev) =>
          isDeleting
            ? currentPhrase.substring(0, prev.length - 1)
            : currentPhrase.substring(0, prev.length + 1)
        );
      }, speed);
    }

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, currentPhraseIndex]);

  // GSAP Entrance Animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(
        heroRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.5 }
      )
        .fromTo(
          headlineRef.current,
          { y: 25, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7 },
          '-=0.2'
        )
        .fromTo(
          subtitleRef.current,
          { y: 15, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6 },
          '-=0.4'
        )
        .fromTo(
          ctaRef.current,
          { y: 15, opacity: 0, scale: 0.98 },
          { y: 0, opacity: 1, scale: 1, duration: 0.5 },
          '-=0.3'
        )
        .fromTo(
          badgesRef.current.children,
          { y: 12, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.08, duration: 0.4 },
          '-=0.2'
        );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={heroRef}
      className="relative pt-28 sm:pt-36 pb-20 sm:pb-28 bg-gradient-to-b from-emerald-50/50 via-white to-slate-50 overflow-hidden"
    >
      {/* Decorative background grid and blurs */}
      <div className="absolute inset-0 bg-[radial-gradient(#00827f_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.04] pointer-events-none" />
      <div className="absolute top-16 right-10 w-96 h-96 bg-gb-primary/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-5 w-80 h-80 bg-amber-400/8 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Heading and Tagline */}
          <div className="lg:col-span-7">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gb-primary-subtle text-gb-primary font-bold text-xs mb-6 border border-gb-primary/20 shadow-xs">
              <span className="flex h-2 w-2 rounded-full bg-gb-primary animate-pulse" />
              <span>{t.hero.badge}</span>
            </div>

            {/* Dynamic Typewriter Heading */}
            <div ref={headlineRef} className="min-h-[105px] sm:min-h-[135px] flex items-center">
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.12]">
                <span className="block text-slate-800">{t.hero.titlePrefix}</span>
                <span className="text-gb-primary inline-flex items-center">
                  {displayText}
                  <span className="inline-block w-1.5 h-8 sm:h-12 bg-gb-warning ml-2 animate-pulse rounded-full" />
                </span>
              </h1>
            </div>

            {/* Subtitle */}
            <p
              ref={subtitleRef}
              className="mt-4 text-base sm:text-lg text-slate-600 max-w-xl leading-relaxed"
            >
              {t.hero.subtitle}
            </p>

            {/* CTAs */}
            <div ref={ctaRef} className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="https://onelink.to/gbweb"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-3 px-7 py-3.5 rounded-xl font-bold text-slate-950 bg-gb-warning hover:bg-gb-warning-hover transition-all duration-200 shadow-md hover:shadow-lg active:scale-95"
              >
                <span>{t.hero.downloadApp}</span>
                <ArrowRight className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1" />
              </a>

              <a
                href="#booking"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 transition-all duration-200 shadow-xs hover:border-slate-300 active:scale-95"
              >
                <span>{t.hero.bookRide}</span>
              </a>
            </div>

            {/* Trust Badges */}
            <div
              ref={badgesRef}
              className="mt-10 pt-6 border-t border-slate-200/80 grid grid-cols-3 gap-4 max-w-lg"
            >
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-emerald-100 text-emerald-700">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div className="text-xs">
                  <p className="font-bold text-slate-900">{t.hero.zeroCommission}</p>
                  <p className="text-slate-500">{t.hero.zeroCommissionSub}</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-amber-100 text-amber-700">
                  <Star className="w-4 h-4" />
                </div>
                <div className="text-xs">
                  <p className="font-bold text-slate-900">{t.hero.rating}</p>
                  <p className="text-slate-500">{t.hero.ratingSub}</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-sky-100 text-sky-700">
                  <MapPin className="w-4 h-4" />
                </div>
                <div className="text-xs">
                  <p className="font-bold text-slate-900">{t.hero.districts}</p>
                  <p className="text-slate-500">{t.hero.districtsSub}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Showcase Card */}
          <div className="lg:col-span-5 relative mt-6 lg:mt-0">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Main Card with Real Car illustration */}
              <div className="relative bg-white/90 backdrop-blur-xl p-6 rounded-3xl shadow-xl border border-white/80 ring-1 ring-slate-900/5 hover:shadow-2xl transition-all duration-300">
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                    <span className="text-xs font-bold text-slate-800">Live Driver Bidding</span>
                  </div>
                  <span className="text-xs px-3 py-1 rounded-full bg-gb-primary-subtle text-gb-primary font-bold">
                    Dhaka ⇄ Chattogram
                  </span>
                </div>

                <div className="py-6 flex justify-center items-center">
                  <img
                    src="/assets/images/cars/intercity_car_rental.svg"
                    alt="Garibook Intercity Vehicle"
                    className="h-32 sm:h-40 w-auto drop-shadow-md hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Driver bidding snippet */}
                <div className="bg-slate-50/90 rounded-2xl p-4 border border-slate-100 space-y-2.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500 font-medium">Recommended Fleet</span>
                    <span className="font-bold text-slate-800">Sedan / Noah Microbus</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500 font-medium">Average Fare Range</span>
                    <span className="font-black text-gb-primary text-base">৳3,800 - ৳4,800</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-200/60">
                    <span className="font-semibold text-slate-600">⚡ 5 Bids Received in 3 mins</span>
                    <span className="text-emerald-600 font-bold">0% Middleman markup</span>
                  </div>
                </div>
              </div>

              {/* Floating Pill Accent */}
              <div className="absolute -bottom-4 -left-4 bg-slate-950 text-white px-4 py-2.5 rounded-2xl shadow-xl flex items-center gap-3 text-xs border border-slate-800 hidden sm:flex">
                <Users className="w-4 h-4 text-gb-warning" />
                <div>
                  <p className="font-bold">5,000+ Verified Chauffeurs</p>
                  <p className="text-slate-400 text-[10px]">Ready for nationwide pickup</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

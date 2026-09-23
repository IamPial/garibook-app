import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { useLanguage } from '../context/LanguageContext';
import heroImage from '../assets/freedom_section.webp';

export default function HeroSection() {
  const { lang, t } = useLanguage();
  const heroRef = useRef(null);
  const headlineRef = useRef(null);
  const rightColRef = useRef(null);

  // Exact rotating phrases from garibook.com
  const phrases = [
    'Assurance of Effortless Travels',
    'Luxury Tips with Comfort',
    'Your Journey Starts Here...',
    'Hourly Car Rental',
    'Intercity Car Rental',
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

  // GSAP Entrance Animation (Animation #1)
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(
        heroRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.6 }
      )
        .fromTo(
          headlineRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8 },
          '-=0.3'
        )
        .fromTo(
          rightColRef.current,
          { y: 25, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7 },
          '-=0.5'
        );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={heroRef}
      className="relative pt-32 sm:pt-40 pb-20 sm:pb-28 bg-[#f4faf8] overflow-hidden"
    >
      <div className="hero-grid absolute inset-0 opacity-40" />
      <div className="hero-orb absolute -right-32 top-12 rounded-full blur-3xl" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Column: Big Typing Headline */}
          <div className="lg:col-span-6" ref={headlineRef}>
            <div className="flex items-center gap-3 mb-6">
              <span className="h-px w-10 bg-gb-warning" />
              <span className="text-xs font-extrabold uppercase tracking-[0.24em] text-gb-primary">Move freely</span>
            </div>
            <h1 className="text-[clamp(3rem,6vw,5.8rem)] font-black text-[#102c2a] tracking-[-0.06em] leading-[0.98]">
              <span className="block">{displayText}<span className="inline-block w-1.5 h-12 sm:h-20 bg-gb-warning ml-2 align-[-0.08em] animate-pulse" /></span>
              <span className="block mt-3 text-[#102c2a]">made simple.</span>
            </h1>
            <p className="mt-7 max-w-xl text-base sm:text-lg text-slate-600 leading-relaxed">
              Choose your city, pick your car and enjoy the journey with Garibook’s best drivers.
            </p>
            <div className="mt-8 flex flex-wrap gap-3 text-xs font-bold text-slate-600">
              <span className="rounded-full border border-[#c9dfd8] bg-white/70 px-4 py-2">Fair fares</span>
              <span className="rounded-full border border-[#c9dfd8] bg-white/70 px-4 py-2">Verified drivers</span>
              <span className="rounded-full border border-[#c9dfd8] bg-white/70 px-4 py-2">64 districts</span>
            </div>
          </div>

          {/* Right Column: Reference Text & Download App Button */}
          <div className="lg:col-span-6 flex justify-center lg:justify-end" ref={rightColRef}>
            <div className="relative w-full max-w-lg">
              <div className="absolute -inset-4 rounded-[2.5rem] border border-white/80 bg-white/30 rotate-3" />
              <div className="relative overflow-hidden rounded-[2.25rem] border border-white/80 bg-white/50 shadow-[0_30px_80px_rgba(0,83,79,0.18)]">
                <img src={heroImage} alt="A Garibook car ready for the road" className="hero-image w-full object-cover" />
                <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between rounded-2xl bg-[#102c2a]/90 p-4 text-white backdrop-blur-md">
                  <div><p className="text-[10px] uppercase tracking-[0.2em] text-[#9ed6c6]">Your next journey</p><p className="mt-1 text-sm font-bold">Begins with a better choice.</p></div>
                  <ArrowRight className="h-5 w-5 text-gb-warning" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { useLanguage } from '../context/LanguageContext';
import heroImage from '../assets/freedom_section.webp';

export default function HeroSection() {
  const { t } = useLanguage();
  const copy = t.sections.hero;
  const heroRef = useRef(null);
  const headlineRef = useRef(null);
  const rightColRef = useRef(null);

  // Exact rotating phrases from garibook.com
  const phrases = copy.phrases;

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
      className="relative pt-32 sm:pt-40 pb-20 sm:pb-28 bg-[#ffffff] overflow-hidden"
    >
      <div className="hero-grid absolute inset-0 opacity-40" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Column: Big Typing Headline */}
          <div className="lg:col-span-6" ref={headlineRef}>
            <h1 className="text-3xl md:text-6xl font-bold text-black">
              <span className="block">{displayText}<span className="inline-block w-1.5 h-12 sm:h-20 bg-gb-primary-dark ml-2 align-[-0.08em] animate-pulse" /></span>
            </h1>
           
          </div>

          {/* Right Column: Reference Text & Download App Button */}
          <div className="lg:col-span-6 flex justify-start lg:justify-end" ref={rightColRef}>
            <div className='flex flex-col'>
               <p className="mt-7 max-w-xl text-base sm:text-2xl text-gray-400 leading-relaxed">
              {copy.description}
            </p>
            <div className="flex w-70 bg-[#fdd300] hover:bg-[#e6c003] mt-8  justify-between text-lg p-5 font-medium text-black duration-300 transition-all hover:scale-105 rounded-2xl">
               <button type="button">{t.hero.downloadApp}</button> <ArrowRight />
            </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import React, { useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../context/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

export default function DriverSection() {
  const { t } = useLanguage();
  const copy = t.sections.driver;

  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const leftContentRef = useRef(null);
  const phoneImageRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
     // title 
      gsap.fromTo(
        titleRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 85%',
            end: 'bottom 15%',
            toggleActions: 'play reverse play reverse',
          },
        }
      );

      // for left side content
      gsap.fromTo(
        leftContentRef.current,
        { x: -50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: leftContentRef.current,
            start: 'top 85%',
            end: 'bottom 15%',
            toggleActions: 'play reverse play reverse',
          },
        }
      );

      // for image
      gsap.fromTo(
        phoneImageRef.current,
        { y: 60, opacity: 0, scale: 0.85 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.9,
          ease: 'back.out(1.4)', 
          scrollTrigger: {
            trigger: phoneImageRef.current,
            start: 'top 85%',
            end: 'bottom 15%',
            toggleActions: 'play reverse play reverse',
            invalidateOnRefresh: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="smart-driver" className="py-10 sm:py-16 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <h2 ref={titleRef} className="mt-3 text-3xl max-w-xl sm:text-[40px] font-bold text-gb-dark tracking-tight mb-10">
          {copy.title}
        </h2>

        <div className="bg-[#efc30c] rounded-3xl shadow-xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
            {/* Left Content */}
            <div ref={leftContentRef} className="lg:col-span-7 space-y-6 p-8 sm:p-14 lg:p-20">
              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gb-primary tracking-tight leading-[1.1]">
                {copy.freedom} <br />
                <span className="text-gb-primary">{copy.freedomTitle}</span>
              </h3>

              {/* Perks */}
              <div className="pt-4">
                <a
                  href="https://play.google.com/store/search?q=garibook%20smart%20driver&c=apps"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-8 py-4 rounded-xl font-bold text-white bg-gb-primary transition-all duration-300 hover:scale-105 active:scale-95"
                >
                  <span>{copy.download}</span>
                  <ArrowRight className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Right: Phone App Screen Graphic */}
            <div className="lg:col-span-5 flex justify-center items-center">
              <div ref={phoneImageRef} className="relative group max-w-xs sm:max-w-sm">
                <img
                  src="/assets/images/app-screen/app.png"
                  alt="Garibook Smart Driver App Screen"
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
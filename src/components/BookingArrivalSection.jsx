import React, { useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../context/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

export default function BookingArrivalSection() {
  const { t } = useLanguage();
  const copy = t.sections.arrival;

  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const ctaRef = useRef(null);
  const gridRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // for header
      gsap.fromTo(
        headerRef.current,
        { x: -50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 85%',
            end: 'bottom 15%',
            toggleActions: 'play reverse play reverse',
          },
        }
      );

      // ২. Button animation
      gsap.fromTo(
        ctaRef.current,
        { x: 50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: ctaRef.current,
            start: 'top 85%',
            end: 'bottom 15%',
            toggleActions: 'play reverse play reverse',
          },
        }
      );

      // Staggered GSAP Animation
      gsap.fromTo(
        gridRef.current.children,
        { y: 50, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          stagger: 0.15,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: gridRef.current,
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
    <section ref={sectionRef} className="py-10 sm:py-16 bg-slate-950 text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header & CTA Row */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div ref={headerRef} className="max-w-xl">
            <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-white leading-tight">
              {copy.title}
            </h2>
          </div>

          <div ref={ctaRef}>
            <a
              href="https://onelink.to/gbweb"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-3.5 rounded-xl font-bold text-white bg-gb-primary hover:scale-105 transition-all duration-200 active:scale-95"
            >
              <span>{copy.download}</span>
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Asymmetric Image Grid */}
        <div ref={gridRef} className="grid grid-cols-2 lg:grid-cols-12 gap-4 sm:gap-6">
        
        {/* first image */}
          <div className="col-span-2 lg:col-span-8 rounded-2xl overflow-hidden border border-white/10 relative h-48 sm:h-80">
            <img
              src="/assets/images/services/explore.jpeg"
              alt="Explore Bangladesh"
              className="w-full h-full object-cover"
            />
          </div>

         {/* second image */}
          <div className="col-span-1 lg:col-span-4 rounded-2xl overflow-hidden border border-white/10 relative h-48 sm:h-80">
            <img
              src="/assets/images/services/freedom.jpg"
              alt="Total Freedom"
              className="w-full h-full object-cover"
            />
          </div>

         {/*third image  */}
          <div className="col-span-1 lg:col-span-4 rounded-2xl overflow-hidden border border-white/10 relative h-48 sm:h-72 ">
            <img
              src="/assets/images/services/safe_travel.svg"
              alt="Safe Travel"
              className="w-full h-full object-cover"
            />
          </div>

          {/* fourth image */}
          <div className="col-span-1 lg:col-span-4 rounded-2xl overflow-hidden border border-white/10 relative h-48 sm:h-72">
            <img
              src="/assets/images/services/prefarred_car.jpg"
              alt="Preferred Car"
              className="w-full h-full object-cover"
            />
          </div>

          {/* fifth image */}
          <div className="col-span-1 lg:col-span-4 rounded-2xl overflow-hidden border border-white/10 relative h-48 sm:h-72">
            <img
              src="/assets/images/services/smooth.jpg"
              alt="Smooth Journey"
              className="w-full h-full object-cover"
            />
           
          </div>
        </div>
      </div>
    </section>
  );
}
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../context/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

export default function FreedomSection() {
  const { t } = useLanguage();
  const copy = t.sections.freedom;
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const bannerRef = useRef(null);
  const itemsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Header reveal/remove animation
      gsap.fromTo(
        headerRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play reverse play reverse',
          },
        }
      );

      // 2. Banner image reveal (Scale 0 to 1) / remove animation
      gsap.fromTo(
        bannerRef.current,
        { opacity: 0, scale: 0 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: 'back.out(1.5)',
          scrollTrigger: {
            trigger: bannerRef.current,
            start: 'top 85%',
            end: 'bottom 20%',
            toggleActions: 'play reverse play reverse',
          },
        }
      );

      // 3. Feature cards staggered reveal & remove animation
      gsap.fromTo(
        itemsRef.current.children,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.18,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: itemsRef.current,
            start: 'top 85%',
            end: 'bottom 15%',
            toggleActions: 'play reverse play reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const features = [
    {
      title: copy.car,
      desc: copy.carDesc,
      icon: '/assets/icon/car.svg',
    },
    {
      title: copy.driver,
      desc: copy.driverDesc,
      icon: '/assets/icon/drive.svg',
    },
    {
      title: copy.fare,
      desc: copy.fareDesc,
      icon: '/assets/icon/price.svg',
    },
  ];

  return (
    <section ref={sectionRef} className="py-10 sm:py-14 bg-gb-dark text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div ref={headerRef} className="max-w-2xl mb-12 sm:mb-16">
          <h2 className="mt-4 text-3xl sm:text-4xl font-bold tracking-tight text-white leading-tight">
            {copy.title}
          </h2>
        </div>

        {/* Feature Hero Banner Image */}
        <div ref={bannerRef} className="rounded-3xl overflow-hidden border border-white/10 shadow-2xl mb-14">
          <img
            src="/assets/images/banner/garibook_freedom.webp"
            alt="Garibook Freedom on Bangladesh Roads"
            className="w-full h-64 sm:h-96 lg:h-105 object-cover transition-transform duration-700"
          />
        </div>

        {/* 3 Pillars Grid */}
        <div
          ref={itemsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10"
        >
          {features.map((item) => (
            <div
              key={item.title}
              className="p-6 sm:p-8 rounded-2xl bg-white/3 "
            >
              <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center p-3 mb-6 ">
                <img
                  src={item.icon}
                  alt={item.title}
                  className="w-10 h-10 object-contain"
                />
              </div>
              <h3 className="text-xl font-bold text-white">
                {item.title}
              </h3>
              <p className="mt-3 text-sm text-slate-400 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
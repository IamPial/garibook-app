import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../context/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

export default function FreedomSection() {
  const { t } = useLanguage();
  const copy = t.sections.freedom;
  const sectionRef = useRef(null);
  const itemsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        itemsRef.current.children,
        { y: 35, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.18,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: itemsRef.current,
            start: 'top 85%',
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
    <section ref={sectionRef} className="py-20 sm:py-28 bg-slate-950 text-white relative overflow-hidden">
      {/* Background radial accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gb-primary/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-2xl mb-12 sm:mb-16">
          <span className="text-xs font-bold text-gb-warning uppercase tracking-widest bg-white/5 px-3 py-1 rounded-full border border-white/10">
            {copy.badge}
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
            {copy.title}
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base">
            {copy.description}
          </p>
        </div>

        {/* Feature Hero Banner Image */}
        <div className="rounded-3xl overflow-hidden border border-white/10 shadow-2xl mb-14 group">
          <img
            src="/assets/images/banner/garibook_freedom.webp"
            alt="Garibook Freedom on Bangladesh Roads"
            className="w-full h-64 sm:h-96 lg:h-[420px] object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>

        {/* 3 Pillars Grid */}
        <div
          ref={itemsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10"
        >
          {features.map((item, idx) => (
            <div
              key={item.title}
              className="p-6 sm:p-8 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-gb-warning/40 transition-all duration-300 hover:bg-white/[0.05] group"
            >
              <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center p-3 mb-6 group-hover:bg-gb-warning/20 transition-colors">
                <img
                  src={item.icon}
                  alt={item.title}
                  className="w-10 h-10 object-contain drop-shadow"
                />
              </div>
              <h3 className="text-xl font-bold text-white group-hover:text-gb-warning transition-colors">
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

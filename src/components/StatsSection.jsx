import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../context/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

export default function StatsSection() {
  const { t } = useLanguage();
  const copy = t.sections.stats;
  const sectionRef = useRef(null);
  const countRefs = useRef([]);

  const stats = [
    { target: 150000, suffix: '+', label: copy.tripRequests },
    { target: 100000, suffix: '+', label: copy.customers },
    { target: 5000, suffix: '+', label: copy.drivers },
    { target: 64, suffix: '', label: copy.districts },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Staggered reveal for the entire stats block
      gsap.fromTo(
        sectionRef.current.querySelectorAll('.stat-item'),
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.15,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        }
      );

      // GSAP Numeric Counter Animation (Animation Requirement #2)
      countRefs.current.forEach((el, index) => {
        if (!el) return;
        const targetVal = stats[index].target;
        const obj = { val: 0 };

        gsap.to(obj, {
          val: targetVal,
          duration: 2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            once: true,
          },
          onUpdate: () => {
            const formatted = Math.floor(obj.val).toLocaleString();
            el.innerText = `${formatted}${stats[index].suffix}`;
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative pt-24 pb-20 bg-slate-900 text-white overflow-hidden -mt-16"
    >
      {/* Subtle background glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-gb-primary/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-amber-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Headline */}
          <div className="lg:col-span-5">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              {copy.title} <br className="hidden sm:block" />
              <span className="text-gb-warning">{copy.highlight}</span>
            </h2>
            <p className="mt-4 text-slate-400 text-sm sm:text-base leading-relaxed">
              {copy.description}
            </p>
          </div>

          {/* Stats grid */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8">
            {stats.map((stat, idx) => (
              <div
                key={stat.label}
                className="stat-item flex flex-col p-4 sm:p-5 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-sm hover:border-gb-warning/30 transition-colors"
              >
                <span
                  ref={(el) => (countRefs.current[idx] = el)}
                  className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gb-warning tracking-tight"
                >
                  0{stat.suffix}
                </span>
                <span className="mt-2 text-xs sm:text-sm font-medium text-slate-300">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

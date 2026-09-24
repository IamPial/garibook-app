import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../context/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

export default function StatsSection() {
  const { t } = useLanguage();
  const copy = t.sections.stats;
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const statsRef = useRef(null);
  const countRefs = useRef([]);

  const stats = [
    { target: 350000, suffix: '+', label: copy.tripRequests },
    { target: 850000, suffix: '+', label: copy.customers },
    { target: 35000, suffix: '+', label: copy.drivers },
    { target: 64, suffix: '', label: copy.districts },
  ];

  const words = `${copy.title} ${copy.highlight}`.split(' ');

 
  useLayoutEffect(() => {
    const format = (i, v) => `${Math.floor(v).toLocaleString()}${stats[i].suffix}`;

    const ctx = gsap.context(() => {
      // for heading
      gsap.fromTo(
        '.hl-word',
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          delay: 0.3,
          ease: 'power3.out',
          stagger: 0.1,
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 80%',
            toggleActions: 'restart reset restart reset',
          },
        }
      );

      //for counting and also reset the animation when scrolling
      const zeroCounters = () =>
        countRefs.current.forEach((el, i) => { if (el) el.textContent = format(i, 0); });

      const tl = gsap.timeline({
        onStart: zeroCounters,
        scrollTrigger: {
          trigger: statsRef.current,
          start: 'top 92%',
          toggleActions: 'restart reset restart reset',
        },
      });
      tl.fromTo(
        '.stat-item',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.15, duration: 0.8, ease: 'power3.out' }
      );
      countRefs.current.forEach((el, i) => {
        if (!el) return;
        const obj = { val: 0 };
        tl.to(
          obj,
          {
            val: stats[i].target,
            duration: 2,
            ease: 'power2.out',
            onUpdate: () => { el.textContent = format(i, obj.val); },
          },
          0.2
        );
      });
    }, sectionRef);

    
    document.fonts?.ready.then(() => ScrollTrigger.refresh());

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative -mt-16 pt-32 sm:pt-44 pb-32 sm:pb-36 overflow-hidden text-white bg-[linear-gradient(90deg,#0035c8_0%,#0d52ff_100%)]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Headline */}
        <h2 ref={headingRef} className="max-w-210 text-3xl sm:text-4xl lg:text-[44px] font-bold leading-tight tracking-tight">
          {words.map((word, i) => (
            <span key={i} className="hl-word inline-block">
              {word}{i < words.length - 1 ? '\u00A0' : ''}
            </span>
          ))}
        </h2>

        {/* Stats */}
        <div ref={statsRef} className="mt-14 lg:mt-24 flex lg:justify-end">
          <div className="grid grid-cols-2 sm:flex gap-x-8 sm:gap-x-10 gap-y-6">
            {stats.map((stat, idx) => (
              <div key={stat.label} className="stat-item">
                <span className="grid text-2xl sm:text-4xl font-extrabold leading-none tabular-nums text-[#f0c40b]">
                  <span className="col-start-1 row-start-1 invisible" aria-hidden="true">
                    {stat.target.toLocaleString()}{stat.suffix}
                  </span>
                  <span ref={(el) => (countRefs.current[idx] = el)} className="col-start-1 row-start-1">
                    0{stat.suffix}
                  </span>
                </span>
                <span className="mt-1.5 block text-sm font-semibold text-white">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

     {/* looping the building */}
      <style>{`
        @keyframes gb-skyline-scroll { to { transform: translateX(calc(var(--tile) * -1)); } }
        .gb-skyline-track { animation: gb-skyline-scroll 25s linear infinite; will-change: transform; }
        @media (prefers-reduced-motion: reduce) { .gb-skyline-track { animation: none; } }
      `}</style>
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 w-full h-15 sm:h-19.5 overflow-hidden pointer-events-none [--tile:1477px] sm:[--tile:1920px]"
      >
       
        <div
          className="gb-skyline-track h-full bg-[url('/assets/images/stats/Building_frame.png')] bg-repeat-x bg-bottom-left bg-size-[auto_60px] sm:bg-size-[auto_78px]"
          style={{ width: 'calc(100% + var(--tile))' }}
        />
      </div>

      {/* moving car */}
      <img
        src="/assets/images/stats/Moveable_Car.gif"
        alt=""
        aria-hidden="true"
        className="absolute bottom-0 left-10 sm:left-20 w-32 sm:w-40 lg:w-48 translate-y-[7%] pointer-events-none select-none"
      />
    </section>
  );
}
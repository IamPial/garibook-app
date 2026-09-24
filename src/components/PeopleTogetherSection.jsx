import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../context/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

export default function PeopleTogetherSection() {
  const { t } = useLanguage();
  const copy = t.sections.together;
  
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const cardsRef = useRef(null);

  const cards = [
    {
      image: '/assets/images/services/Airport_Rental_Webp.webp',
      tag: copy.airportTag,
    },
    {
      image: '/assets/images/services/family_trips.webp',
      tag: copy.familyTag,
    },
    {
      image: '/assets/images/services/Group_Tour_Webp.webp',
      tag: copy.toursTag,
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // for header animation
      gsap.fromTo(
        headerRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
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

      // for card animation
      gsap.fromTo(
        cardsRef.current.children,
        { y: 60, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          stagger: 0.2,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 85%',
            end: 'bottom 15%',
            toggleActions: 'play reverse play reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-10 sm:py-16 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div ref={headerRef} className="max-w-2xl mb-12 sm:mb-16">
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gb-dark leading-tight">
            {copy.title}
          </h2>
        </div>

        {/* 3 Cards */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-4">
          {cards.map((card, idx) => (
            <div
              key={idx}
              className="group relative h-96 sm:h-105 rounded-xl overflow-hidden shadow-lg border border-slate-100 cursor-pointer"
            >
              {/* Background Image */}
              <img
                src={card.image}
                alt={card.tag}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />
              {/* Top Tag */}
              <div className="absolute top-5 left-5">
                <span className="text-xl sm:text-3xl font-bold px-3 py-1.5 text-gb-gray-bg">
                  {card.tag}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
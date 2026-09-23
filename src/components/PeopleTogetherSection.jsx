import React from 'react';
import { ArrowUpRight } from 'lucide-react';

export default function PeopleTogetherSection() {
  const cards = [
    {
      title: 'Airport Rentals',
      subtitle: 'Effortless flight transfers & greetings',
      image: '/assets/images/services/Airport_Rental_Webp.webp',
      tag: 'Airport Pickup & Drop',
    },
    {
      title: 'Family Trips',
      subtitle: 'Comfortable & spacious multi-passenger cars',
      image: '/assets/images/services/family_trips.webp',
      tag: 'Vacations & Reunions',
    },
    {
      title: 'Long Tours',
      subtitle: 'Scenic drives to Cox\'s Bazar, Sylhet & Sajek',
      image: '/assets/images/services/Group_Tour_Webp.webp',
      tag: 'Intercity Tourism',
    },
  ];

  return (
    <section className="py-20 sm:py-28 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mb-12 sm:mb-16">
          <span className="text-xs font-bold text-gb-primary uppercase tracking-widest bg-gb-primary-subtle px-3 py-1 rounded-full">
            Moments That Matter
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            More Than Miles — <br />
            We Bring People Together
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base">
            From returning expats landing at midnight to holiday road trips with extended family, we make every mile memorable.
          </p>
        </div>

        {/* 3 Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {cards.map((card) => (
            <div
              key={card.title}
              className="group relative h-96 sm:h-[420px] rounded-3xl overflow-hidden shadow-lg border border-slate-100 cursor-pointer"
            >
              {/* Background Image */}
              <img
                src={card.image}
                alt={card.title}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent transition-opacity duration-300 group-hover:from-slate-950" />

              {/* Top Tag */}
              <div className="absolute top-5 left-5">
                <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-white/90 text-slate-900 backdrop-blur-sm shadow">
                  {card.tag}
                </span>
              </div>

              {/* Bottom Content */}
              <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
                <div>
                  <h3 className="text-2xl font-extrabold text-white group-hover:text-gb-warning transition-colors">
                    {card.title}
                  </h3>
                  <p className="mt-1 text-xs sm:text-sm text-slate-300">
                    {card.subtitle}
                  </p>
                </div>
                <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white group-hover:bg-gb-warning group-hover:text-slate-900 transition-all shrink-0">
                  <ArrowUpRight className="w-5 h-5" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

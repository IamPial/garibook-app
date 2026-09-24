import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Car, Building2, Users, Cpu, CheckCircle2 } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../context/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

export default function ServicesSection() {
  const { t } = useLanguage();
  const copy = t.sections.services;
  const [activeTab, setActiveTab] = useState('rides');
  const sectionRef = useRef(null);
  const cardsRef = useRef(null);

  const tabs = [
    { id: 'rides', label: copy.rides, icon: Car },
    { id: 'business', label: copy.business, icon: Building2 },
    { id: 'club', label: copy.club, icon: Users },
    { id: 'vms', label: copy.vms, icon: Cpu },
  ];

  const rideServices = [
    {
      title: copy.intercity,
      desc: copy.travel,
      image: '/assets/images/cars/intercity_car_rental.svg',
      features: [copy.door, copy.bidding, copy.verified],
    },
    {
      title: copy.rideShare,
      desc: copy.city,
      image: '/assets/images/cars/rideshare.svg',
      features: [copy.inside, copy.dispatch, copy.tracking],
    },
    {
      title: copy.airport,
      desc: copy.airportDesc,
      image: '/assets/images/cars/airport_rental.svg',
      features: [copy.waiting, copy.luggage, copy.transparent],
    },
    {
      title: copy.hourly,
      desc: copy.hourlyDesc,
      image: '/assets/images/cars/hourly_rental.svg',
      features: [copy.stops, copy.fullDay, copy.included],
    },
  ];

  // GSAP animation for cards reveal (Animation #3)
  useEffect(() => {
    if (activeTab === 'rides' && cardsRef.current) {
      const ctx = gsap.context(() => {
        gsap.fromTo(
          cardsRef.current.children,
          { y: 35, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.12,
            duration: 0.6,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top 85%',
            },
          }
        );
      }, sectionRef);

      return () => ctx.revert();
    }
  }, [activeTab]);

  return (
    <section id="services" ref={sectionRef} className="py-10 sm:py-14 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight mb-8">
            {copy.title}
          </h2>

        {/* Tab Buttons */}
        <div className="flex flex-wrap  gap-2 sm:gap-3 mb-12">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2.5 px-5 py-3 rounded-lg text-sm font-semibold transition-all duration-200 ${
                  isActive
                    ? 'bg-gb-primary text-white shadow-md  scale-105'
                    : 'bg-gray-300 text-black '
                }`}
              >  
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: RIDES */}
        {activeTab === 'rides' && (
          <div>
            <div className="text-left mb-8">
              <h3 className="text-2xl sm:text-3xl font-bold text-slate-900">
                {copy.platform}
              </h3>
              <p className="text-sm text-slate-500 mt-1">
                {copy.platformDescription}
              </p>
            </div>

            <div
              ref={cardsRef}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8"
            >
              {rideServices.map((service, idx) => (
                <div
                  key={service.title}
                  className="group relative bg-white rounded-2xl p-6 overflow-hidden hover:bg-gb-primary transition-colors duration-300 flex flex-col justify-between"
                >
                  <div>
                    {/* Car Image Illustration */}
                    <div className="relative h-32 -mx-6 mb-5 flex items-center">
                   
                      <span
                        aria-hidden="true"
                        className="absolute left-0 top-1/2 h-20 w-0 -translate-y-1/2 rounded-r-xl bg-white transition-all duration-700 group-hover:w-24 ease-in-out"
                      />
                    
                      <img
                        src={service.image}
                        alt={service.title}
                        className="relative ml-6 transition-transform duration-700 group-hover:translate-x-10"
                      />
                    </div>

                    <h4 className="text-lg font-bold text-slate-900 group-hover:text-white transition-colors duration-300">
                      {service.title}
                    </h4>
                    <p className="mt-2 text-xs sm:text-sm text-slate-600 group-hover:text-white leading-relaxed transition-colors duration-300">
                      {service.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: GARIBOOK BUSINESS */}
        {activeTab === 'business' && (
          <div className="bg-slate-50  ">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              <div className="lg:col-span-6 space-y-5">
                <h3 className="text-3xl lg:text-5xl sm:text-4xl font-extrabold text-slate-900 leading-tight">
                  Modern Car Rentals <br /> For Business
                </h3>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                  Simplify your corporate transportation, ensure on-time team mobility, and gain complete control over travel expenditure with our centralized billing and employee dispatch dashboard.
                </p>
                <div className="pt-4">
                  <a
                    href="#"
                    className="inline-flex items-center gap-3 px-7 py-3.5 rounded-xl font-bold text-white bg-gb-primary  shadow transition-all duration-300 hover:scale-105"
                  >
                    <span>Learn More</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
              <div className="lg:col-span-6">
                <div className="rounded-2xl overflow-hidden shadow-xl border border-white">
                  <img
                    src="/assets/images/services/busines.jpeg"
                    alt="Garibook Business"
                    className="w-full h-80 sm:h-96 object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: GARIBOOK CLUB */}
        {activeTab === 'club' && (
          <div className="bg-slate-50">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              <div className="lg:col-span-6 space-y-5">
                <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight">
                  Turn Your Car into Earnings With Garibook Club
                </h3>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                  Garibook Club is more than just a community. Join a vibrant network of vehicle owners and enthusiasts, all fueled by the same passion: the open road and making reliable monthly passive income doing what they love.
                </p>
                <div className="pt-4">
                  <a
                    href="#"
                    className="inline-flex items-center gap-3 px-7 py-3.5 rounded-xl font-bold text-white bg-gb-primary hover:scale-105 shadow transition-all duration-200"
                  >
                    <span>Learn More</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
              <div className="lg:col-span-6">
                <div className="rounded-2xl overflow-hidden shadow-xl border border-white">
                  <img
                    src="/assets/images/services/garibook_club.jpg"
                    alt="Garibook Club"
                    className="w-full h-80 sm:h-96 object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: VMS */}
        {activeTab === 'vms' && (
          <div className="bg-slate-50">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              <div className="lg:col-span-6 space-y-5">
               
                <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight">
                  Vehicle Management System - VMS
                </h3>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                  Just like Garibook Business makes traveling easy for your team, our Vehicle Management System (VMS) helps you take care of your own vehicles. VMS is a powerful platform that monitors health, fuel, live telemetry, and driver logs.
                </p>
               
                <div className="pt-4">
                  <a
                    href="#"
                    className="inline-flex items-center gap-3 px-7 py-3.5 rounded-xl font-bold text-white bg-gb-primary hover:scale-105 shadow transition-all duration-200"
                  >
                    <span>Learn More</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
              <div className="lg:col-span-6">
                <div className="rounded-2xl overflow-hidden  ">
                  <img
                    src="/assets/images/vms/dashboard.png"
                    alt="Garibook VMS"
                    className="w-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

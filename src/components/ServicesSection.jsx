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
    <section id="services" ref={sectionRef} className="py-20 sm:py-28 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <span className="text-xs font-bold text-gb-primary uppercase tracking-widest bg-gb-primary-subtle px-3 py-1 rounded-full">
            {copy.badge}
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            {copy.title}
          </h2>
          <p className="mt-4 text-slate-600 text-sm sm:text-base">
            {copy.description}
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-12">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2.5 px-5 py-3 rounded-full text-sm font-semibold transition-all duration-200 ${
                  isActive
                    ? 'bg-gb-primary text-white shadow-md shadow-gb-primary/20 scale-105'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200/80 hover:text-slate-900'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: RIDES */}
        {activeTab === 'rides' && (
          <div>
            <div className="text-left mb-8">
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
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
                  className="group relative bg-white rounded-2xl p-6 border border-slate-200 shadow-gb-card hover:shadow-gb-hover hover:border-gb-primary/40 transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    {/* Car Image Illustration */}
                    <div className="h-32 flex items-center justify-center bg-slate-50 rounded-xl p-4 mb-5 group-hover:bg-emerald-50/50 transition-colors">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="max-h-24 w-auto object-contain transition-transform duration-300 group-hover:scale-110 drop-shadow-sm"
                      />
                    </div>

                    <h4 className="text-lg font-bold text-slate-900 group-hover:text-gb-primary transition-colors">
                      {service.title}
                    </h4>
                    <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {service.desc}
                    </p>

                    {/* Features list */}
                    <ul className="mt-4 space-y-2 border-t border-slate-100 pt-4">
                      {service.features.map((feat) => (
                        <li key={feat} className="flex items-center gap-2 text-xs text-slate-500">
                          <CheckCircle2 className="w-3.5 h-3.5 text-gb-primary shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-6 pt-2">
                    <a
                      href="#booking"
                      className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-bold text-gb-primary bg-gb-primary-subtle group-hover:bg-gb-primary group-hover:text-white transition-all duration-200"
                    >
                      <span>{copy.book}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: GARIBOOK BUSINESS */}
        {activeTab === 'business' && (
          <div className="bg-slate-50 rounded-3xl p-6 sm:p-10 lg:p-14 border border-slate-200">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              <div className="lg:col-span-6 space-y-5">
                <span className="text-xs font-bold text-gb-primary uppercase tracking-widest bg-white px-3 py-1 rounded-full border border-slate-200">
                  Enterprise Travel Solutions
                </span>
                <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight">
                  Modern Car Rentals <br /> For Business
                </h3>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                  Simplify your corporate transportation, ensure on-time team mobility, and gain complete control over travel expenditure with our centralized billing and employee dispatch dashboard.
                </p>
                <div className="space-y-3 pt-2">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-gb-primary shrink-0 mt-0.5" />
                    <span className="text-sm text-slate-700">Automated corporate invoicing and GST/tax compliance</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-gb-primary shrink-0 mt-0.5" />
                    <span className="text-sm text-slate-700">Dedicated fleet management and priority driver allocation</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-gb-primary shrink-0 mt-0.5" />
                    <span className="text-sm text-slate-700">Live GPS tracking and employee safety monitoring</span>
                  </div>
                </div>
                <div className="pt-4">
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-3 px-7 py-3.5 rounded-xl font-bold text-white bg-gb-primary hover:bg-gb-primary-dark shadow transition-all duration-200"
                  >
                    <span>Contact Business Team</span>
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
          <div className="bg-slate-50 rounded-3xl p-6 sm:p-10 lg:p-14 border border-slate-200">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              <div className="lg:col-span-6 space-y-5">
                <span className="text-xs font-bold text-amber-600 uppercase tracking-widest bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
                  Car Owner Community
                </span>
                <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight">
                  Turn Your Car into Earnings <br /> With Garibook Club
                </h3>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                  Garibook Club is more than just a community. Join a vibrant network of vehicle owners and enthusiasts, all fueled by the same passion: the open road and making reliable monthly passive income doing what they love.
                </p>
                <div className="space-y-3 pt-2">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                    <span className="text-sm text-slate-700">Guaranteed monthly returns with flexible leasing</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                    <span className="text-sm text-slate-700">Comprehensive insurance and 24/7 telematics protection</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                    <span className="text-sm text-slate-700">Exclusive maintenance perks, discounts, and member meetups</span>
                  </div>
                </div>
                <div className="pt-4">
                  <a
                    href="#smart-driver"
                    className="inline-flex items-center gap-3 px-7 py-3.5 rounded-xl font-bold text-slate-950 bg-gb-warning hover:bg-gb-warning-hover shadow transition-all duration-200"
                  >
                    <span>Join Garibook Club</span>
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
          <div className="bg-slate-50 rounded-3xl p-6 sm:p-10 lg:p-14 border border-slate-200">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              <div className="lg:col-span-6 space-y-5">
                <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200">
                  Fleet Intelligence
                </span>
                <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight">
                  Vehicle Management System <br /> (VMS)
                </h3>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                  Just like Garibook Business makes traveling easy for your team, our Vehicle Management System (VMS) helps you take care of your own vehicles. VMS is a powerful platform that monitors health, fuel, live telemetry, and driver logs.
                </p>
                <div className="space-y-3 pt-2">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
                    <span className="text-sm text-slate-700">Real-time OBD-II vehicle diagnostics and engine health logs</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
                    <span className="text-sm text-slate-700">Fuel consumption tracking and mileage verification</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
                    <span className="text-sm text-slate-700">Scheduled maintenance reminders and fitness expiration alerts</span>
                  </div>
                </div>
                <div className="pt-4">
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-3 px-7 py-3.5 rounded-xl font-bold text-white bg-slate-900 hover:bg-slate-800 shadow transition-all duration-200"
                  >
                    <span>Request VMS Demo</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
              <div className="lg:col-span-6">
                <div className="rounded-2xl overflow-hidden shadow-xl border border-white">
                  <img
                    src="/assets/images/vms/Frame_1000001473.png"
                    alt="Garibook VMS"
                    className="w-full h-80 sm:h-96 object-cover hover:scale-105 transition-transform duration-500"
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

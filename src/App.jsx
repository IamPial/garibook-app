import React from 'react';
import { LanguageProvider } from './context/LanguageContext';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import BookingWidget from './components/BookingWidget';
import StatsSection from './components/StatsSection';
import ServicesSection from './components/ServicesSection';
import FreedomSection from './components/FreedomSection';
import PeopleTogetherSection from './components/PeopleTogetherSection';
import BookingArrivalSection from './components/BookingArrivalSection';
import DriverSection from './components/DriverSection';
import FeaturedNewsSection from './components/FeaturedNewsSection';
import PassengerSpeakSection from './components/PassengerSpeakSection';
import FaqSection from './components/FaqSection';
import BlogSection from './components/BlogSection';
import DownloadAppSection from './components/DownloadAppSection';
import Footer from './components/Footer';
import QuickSupport from './components/QuickSupport';

export default function App() {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-white text-slate-800 flex flex-col font-sans selection:bg-gb-primary selection:text-white">
        {/* Top Fixed Header */}
        <Navbar />

        {/* Main Content Sections */}
        <main className="flex-grow">
          {/* 1. Hero Section with GSAP dynamic typewriter headline */}
          <HeroSection />

          {/* 2. Interactive Booking Console (Car Rental & Airport Rental tabs) */}
          <BookingWidget />

          {/* 3. Stats Counter Section with GSAP ScrollTrigger number counting */}
          <StatsSection />

          {/* 4. Our Services Section (Rides, Business, Club, VMS tabs) */}
          <ServicesSection />

          {/* 5. Freedom in Every Journey (Dark Luxury Section) */}
          <FreedomSection />

          {/* 6. More Than Miles — We Bring People Together */}
          <PeopleTogetherSection />

          {/* 7. From Booking to Arrival It's All in Your Hands */}
          <BookingArrivalSection />

          {/* 8. Be a Smart Driver (0% Commission Yellow Banner) */}
          <DriverSection />

          {/* 9. Top Newsroom Media Coverage Slider */}
          <FeaturedNewsSection />

          {/* 10. Passenger Speak Reviews Carousel */}
          <PassengerSpeakSection />

          {/* 11. Frequently Asked Questions Accordion */}
          <FaqSection />

          {/* 12. Beyond Destinations Blog Posts */}
          <BlogSection />

          {/* 13. Download Mobile App CTA Banner */}
          <DownloadAppSection />
        </main>

        {/* Corporate Footer with trade license and payment badges */}
        <Footer />

        {/* Floating 24/7 Helpline & Back-to-Top Actions */}
        <QuickSupport />
      </div>
    </LanguageProvider>
  );
}

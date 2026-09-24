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
        <main className="grow">
         
          <HeroSection />
          <BookingWidget />
          <StatsSection />
          <ServicesSection />
          <FreedomSection />
          <PeopleTogetherSection />
          <BookingArrivalSection />
          <DriverSection />
          <FeaturedNewsSection />
          <PassengerSpeakSection />

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

import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../context/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

export default function FeaturedNewsSection() {
  const { lang } = useLanguage();
  const bn = lang === 'bn';

  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const sliderRef = useRef(null);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(3);

  //for small screen and large screen resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setItemsPerPage(2); 
      } else {
        setItemsPerPage(3); 
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const newsItems = [
    {
      source: '/assets/images/top-news/dhaka-post.png',
      date: 'September 23, 2026',
      title: 'ঢাকায় রাইড শেয়ারিং সেবা চালু করল গাড়িবুক',
      snippet: 'বাংলাদেশে কার রেন্টালের পর এবার রাইড শেয়ারিং সেবা শুরু করলো গাড়িবুক (Garibook)। উত্তরা, বসুন্ধরা, বনানী, বারিধারা ও বারিধারা ডিওএইচএসসহ ঢাকার নির্বাচিত এলাকায় বাইক ও গাড়ি রাইড বুকিং করা...',
      link: 'https://www.dhakapost.com',
      image: '/assets/images/top-news/img1.webp',
    },
    {
      source: '/assets/images/top-news/dhaka-tribune.png',
      date: 'September 23, 2026',
      title: 'Garibook has expanded its transportation services with the launch of Garibook Ridesharing',
      snippet: 'Offering both car and bike rides across key areas of Dhaka including Gulshan, Uttara, Bashundhara, Banani, Baridhara and Baridhara DOHS, along with other locations.',
      link: 'https://bestbangladesh.com',
      image: '/assets/images/top-news/img2.jpeg',
    },
    {
      source: '/assets/images/top-news/prothom-alo.png',
      date: 'September 23, 2026',
      title: 'Garibook, a long-standing car rental service platform providing intercity transportation across Bangladesh',
      snippet: 'Garibook has officially launched its new ride-sharing service, adding both car and bike rides to its existing services. Through the Garibook website and mobile app, passengers...',
      link: 'https://sozootoday.com',
      image: '/assets/images/top-news/img3.jpeg',
    },
    {
      source: '/assets/images/top-news/dhaka-tribune.png',
      date: 'December 05, 2024',
      title: 'গারিবুক: বাংলাদেশের ইন্টারসিটি ভ্রমণে স্বাধীনতার নতুন পথচলা',
      snippet: 'বাংলাদেশের ইন্টারসিটি ভ্রমণ সহজ ও সাশ্রয়ী করার লক্ষ্যে একটি অনন্য উদ্যোগ নিয়ে এসেছে \'গারিবুক\'। কোনো কমিশন ছাড়াই ইন্টারসিটি কার রেন্টাল পরিষেবা দেওয়া গারিবুক দেশের প্রথম এবং একমাত্র অ্যাপ।',
      link: 'https://www.prothomalo.com/bangladesh/a3gn6ql2t8',
      image: '/assets/images/top-news/img4.png', 
    },
    {
      source: '/assets/images/top-news/prothom-alo.png',
      date: 'December 04, 2024',
      title: 'Digital App to offer "Chander Gari"',
      snippet: 'For the first time in Bangladesh, tourists can now book the iconic Chander Gari through an online platform.',
      link: 'https://www.dhakatribune.com/business/365516/digital-app-garibook-to-offer-%E2%80%98chander-gari%E2%80%99',
      image: '/assets/images/top-news/img5.png',
    },
    {
      source: '/assets/images/top-news/dhaka-post.png',
      date: 'December 04, 2024',
      title: 'বাংলাদেশে প্রথমবার \'চান্দের গাড়ি\' গাড়ি বুক অ্যাপে',
      snippet: 'বাংলাদেশের পর্যটকদের জন্য জনপ্রিয় যানবাহন \'চান্দের গাড়ি\' এবার যুক্ত হলো অনলাইন অ্যাপ ভিত্তিক প্ল্যাটফর্মে। গাড়ি বুক দেশের প্রথম অ্যাপ হিসেবে পর্যটকদের জন্য এই বিশেষ গাড়িটি বুকিং সুবিধা নিয়ে এলো।',
      link: 'https://garibook.com/newsrooms',
      image: '/assets/images/top-news/img6.gif',
    },
  ];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? newsItems.length - itemsPerPage : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev >= newsItems.length - itemsPerPage ? 0 : prev + 1));
  };

  // GSAP Scroll Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        sectionRef.current,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
            end: 'bottom 15%',
            toggleActions: 'play reverse play reverse',
          },
        }
      );

      gsap.fromTo(
        sliderRef.current.children,
        { opacity: 0, scale: 0.95 },
        {
          opacity: 1,
          scale: 1,
          stagger: 0.1,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sliderRef.current,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play reverse play reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-12 sm:py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header & Controls */}
        <div ref={headerRef} className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-8 sm:mb-14">
          <h2 className="text-2xl sm:text-4xl lg:text-[42px] font-extrabold text-slate-900 tracking-tight leading-tight">
            {bn ? 'মিডিয়া ফিচারস' : 'We Featured by Top news\nPlatforms'}
          </h2>

          {/* Navigation Arrows */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={handlePrev}
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-800 transition-all duration-200 active:scale-95 cursor-pointer"
              aria-label="Previous News"
            >
              <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-800 transition-all duration-200 active:scale-95 cursor-pointer"
              aria-label="Next News"
            >
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>

        {/* Carousel Window */}
        <div className="overflow-hidden">
          <div
            ref={sliderRef}
            className="flex transition-transform duration-500 ease-out gap-4 sm:gap-6 lg:gap-8"
            style={{
              transform: `translateX(-${currentIndex * (100 / itemsPerPage)}%)`,
            }}
          >
            {newsItems.map((item, idx) => (
              <a
                key={idx}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group w-[calc(50%-0.5rem)] lg:w-[calc(33.333%-1.33rem)] shrink-0 flex flex-col justify-between bg-white rounded-lg overflow-hidden transition-all duration-300 hover:-translate-y-1.5"
              >
                <div>
                  {/* Thumbnail Image */}
                  <div className="w-full h-36 sm:h-52 lg:h-60 rounded-xl sm:rounded-2xl overflow-hidden bg-slate-100 mb-3 sm:mb-5 relative">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Date */}
                  <span className="text-[10px] sm:text-xs lg:text-sm font-medium text-slate-500 block mb-1.5 sm:mb-3">
                    {item.date}
                  </span>

                  {/* Title */}
                  <h3 className="text-sm sm:text-lg lg:text-xl font-bold text-black transition-colors leading-snug sm:leading-snug mb-2 sm:mb-3 line-clamp-2">
                    {item.title}
                  </h3>

                  {/* Snippet */}
                  <p className="text-[11px] sm:text-xs lg:text-sm text-slate-500 leading-relaxed line-clamp-2 sm:line-clamp-3 mb-4 sm:mb-6">
                    {item.snippet}
                  </p>
                </div>

                {/* Footer: Source Logo & Link */}
                <div className="flex flex-wrap items-center justify-between gap-2 pt-2">
                  <div className="h-4 sm:h-6 max-w-20 sm:max-w-27.5 flex items-center">
                    <img src={item.source} alt="news source" className="max-h-full object-contain" />
                  </div>

                  <span className="inline-flex items-center gap-1 text-[11px] sm:text-xs lg:text-sm font-semibold text-blue-600 group-hover:underline">
                    {bn ? 'আর্টিকেল পড়ুন →' : 'Read Article →'}
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function BlogSection() {
  const { t } = useLanguage();
  const copy = t.sections.blog;

  // Scroll Animation State
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  // Both Scroll In & Scroll Out Intersection Observer Logic
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const blogs = [
    {
      title: 'রাইড শেয়ারিংয়ে বদলে যাচ্ছে বাংলাদেশের শহুরে পরিবহন ব্যবস্থা',
      desc: 'রাইড শেয়ারিংয়ে বদলে যাচ্ছে বাংলাদেশের শহুরে পরিবহন ব্যবস্থা',
      date: 'September 15, 2026',
      image: '/assets/images/destination/img1.webp',
    },
    {
      title: 'সিলেটের দর্শনীয় স্থান সমূহ, খাবার ও থাকার ব্যবস্থা',
      desc: 'সিলেটের দর্শনীয় স্থান',
      date: 'September 20, 2026',
      image: '/assets/images/destination/img2.webp',
    },
    {
      title: 'নওগাঁর দর্শনীয় স্থান সমূহ, খাবার ও থাকার ব্যবস্থা',
      desc: 'নওগাঁর দর্শনীয় স্থান সমূহ',
      date: 'September 20, 2026',
      image: '/assets/images/destination/img3.webp',
    },
  ];

  return (
    <section 
      ref={sectionRef} 
      id="blogs" 
      className="py-10 sm:py-16 bg-white relative overflow-hidden select-none"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Row */}
        <div 
          className={`flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-12 transition-all duration-700 ease-in-out transform ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'
          }`}
        >
          <div>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-black tracking-tight">
              {copy?.title || 'Beyond Destinations'}
            </h2>
            <p className="mt-1 sm:mt-2 text-slate-500 text-xs sm:text-base font-medium">
              {copy?.description || 'Discover travel hacks, guides, and inspirations for your next intercity trip with Garibook.'}
            </p>
          </div>

          <div className="shrink-0 self-start sm:self-auto">
            <a
              href="#"
              className="inline-flex items-center gap-1.5 text-xs sm:text-base font-bold text-blue-600 hover:text-blue-700 transition-colors group"
            >
              <span className="font-bold text-sm">{copy?.all || 'Show All Blogs'}</span>
              <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform duration-200 group-hover:translate-x-1" />
            </a>
          </div>
        </div>

       
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-8">
          {blogs.map((blog, index) => (
            <article
              key={index}
              style={{
                transitionDelay: isVisible ? `${(index + 1) * 150}ms` : '0ms',
              }}
              className={`group cursor-pointer transition-all duration-700 ease-in-out transform ${
                isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-12 scale-95'
              }`}
            >
              {/* Image Container */}
              <div className="w-full h-32 sm:h-60 rounded-xl  overflow-hidden mb-2 sm:mb-4 bg-slate-100">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Blog Content */}
              <div>
                {/* Date */}
                <p className="text-[10px] sm:text-xs font-medium text-slate-400 mb-1">
                  {blog.date}
                </p>

                {/* Title */}
                <h3 className="text-xs sm:text-lg font-extrabold text-slate-900 transition-colors leading-snug line-clamp-2">
                  {blog.title}
                </h3>

                {/* Subtitle / Short Desc */}
                <p className="mt-0.5 sm:mt-1 text-[10px] sm:text-sm font-normal text-slate-400 line-clamp-1">
                  {blog.desc}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
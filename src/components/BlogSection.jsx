import React from 'react';
import { ArrowRight, Clock, Calendar } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function BlogSection() {
  const { t } = useLanguage();
  const copy = t.sections.blog;
  const blogs = [
    {
      title: 'Top 10 Scenic Road Trips in Bangladesh You Must Experience in 2026',
      desc: 'From the rolling tea hills of Sreemangal to the Marine Drive of Cox’s Bazar, here are the most breathtaking routes to book this season.',
      category: 'Travel Guide',
      readTime: '5 min read',
      date: 'Sept 2026',
      image: '/assets/images/services/Group_Tour_Webp.webp',
    },
    {
      title: 'How Garibook’s Driver Bidding Model Saves You Up To 30% on Intercity Travel',
      desc: 'Understand how dynamic market pricing empowers you to negotiate directly with drivers without traditional fleet rental markups.',
      category: 'Smart Travel',
      readTime: '4 min read',
      date: 'Sept 2026',
      image: '/assets/images/services/explore.jpeg',
    },
    {
      title: 'Airport Transfers Made Simple: Tips for Smooth Arrivals at DAC & CGP',
      desc: 'Never stress over international flight delays again. Learn how flight tracking and verified airport chauffeurs make all the difference.',
      category: 'Airport Hacks',
      readTime: '3 min read',
      date: 'Aug 2026',
      image: '/assets/images/services/Airport_Rental_Webp.webp',
    },
  ];

  return (
    <section id="blogs" className="py-20 sm:py-28 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Row */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div>
            <span className="text-xs font-bold text-gb-primary uppercase tracking-widest bg-gb-primary-subtle px-3 py-1 rounded-full">
              {copy.badge}
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
              {copy.title}
            </h2>
            <p className="mt-2 text-slate-600 text-sm sm:text-base">
              {copy.description}
            </p>
          </div>

          <div>
            <a
              href="#blogs"
              className="inline-flex items-center gap-2 text-sm sm:text-base font-bold text-gb-primary hover:text-gb-primary-dark transition-colors group"
            >
              <span>{copy.all}</span>
              <ArrowRight className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1" />
            </a>
          </div>
        </div>

        {/* Blog Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <article
              key={blog.title}
              className="group bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-gb-card hover:shadow-gb-hover hover:border-gb-primary/30 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Image */}
                <div className="h-52 overflow-hidden relative">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="text-xs font-bold px-3 py-1 rounded-full bg-white/95 text-gb-primary backdrop-blur-sm shadow-sm">
                      {blog.category}
                    </span>
                  </div>
                </div>

                {/* Details */}
                <div className="p-6">
                  <div className="flex items-center gap-4 text-xs text-slate-400 mb-3">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{blog.date}</span>
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{blog.readTime}</span>
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-gb-primary transition-colors leading-snug line-clamp-2">
                    {blog.title}
                  </h3>

                  <p className="mt-3 text-xs sm:text-sm text-slate-600 line-clamp-3 leading-relaxed">
                    {blog.desc}
                  </p>
                </div>
              </div>

              <div className="px-6 pb-6 pt-2">
                <span className="text-xs font-bold text-gb-primary inline-flex items-center gap-1.5 group-hover:gap-2.5 transition-all">
                  <span>{copy.read}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

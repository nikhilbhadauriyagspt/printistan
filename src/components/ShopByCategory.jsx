import React from 'react';
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, FreeMode } from 'swiper/modules';
import { motion } from 'framer-motion';
import { Skeleton } from './ui/skeleton';

import 'swiper/css';
import 'swiper/css/navigation';

export default function ShopByCategory({ categories = [], loading = false }) {
  // Filter logic (keeping original data logic)
  const filteredCategories = categories.filter(cat => {
    const name = cat.name.toLowerCase();
    const slug = cat.slug.toLowerCase();
    return !name.includes('laptop') && 
           !slug.includes('laptop') && 
           !name.includes('computer') && 
           !name.includes('pc') &&
           !name.includes('chromebook') &&
           !name.includes('notebook');
  });

  const subcategories = filteredCategories
    .flatMap(parent => parent.children || [])
    .filter(sub => {
      const name = sub.name.toLowerCase();
      const slug = sub.slug.toLowerCase();
      return !name.includes('laptop') && 
             !slug.includes('laptop') && 
             !name.includes('computer') && 
             !name.includes('pc');
    });

  const getImagePath = (image) => {
    if (image) return `/${image}`;
    return "https://via.placeholder.com/400x400?text=Category";
  };

  return (
    <section className="bg-white py-16 md:py-24 w-full overflow-hidden">
      <div className="w-full px-4 md:px-10 lg:px-16 max-w-[1920px] mx-auto">
        
        {/* --- CENTERED E-COM HEADER --- */}
        <div className="flex flex-col items-center text-center mb-12 md:mb-20">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-[11px] font-black text-blue-600 uppercase tracking-[0.3em] mb-4"
          >
            Our Collections
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-2xl md:text-4xl font-black text-slate-900 "
          >
            Shop by Category
          </motion.h2>
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: "80px" }}
            className="h-1.5 bg-blue-600 rounded-full mt-6"
          />
        </div>

        {/* --- CIRCULAR CARDS SLIDER --- */}
        <div className="relative group/slider px-4 md:px-0">
          <Swiper
            modules={[Navigation, Autoplay, FreeMode]}
            spaceBetween={30}
            slidesPerView={2.2}
            freeMode={true}
            navigation={{
              prevEl: '.cat-prev',
              nextEl: '.cat-next',
            }}
            breakpoints={{
              480: { slidesPerView: 2.8 },
              640: { slidesPerView: 3.5 },
              768: { slidesPerView: 4.5 },
              1024: { slidesPerView: 5.5 },
              1440: { slidesPerView: 6.5 },
            }}
            className="!overflow-visible"
          >
            {loading ? (
              Array.from({ length: 8 }).map((_, index) => (
                <SwiperSlide key={`skeleton-${index}`}>
                  <div className="flex flex-col items-center gap-5">
                    <Skeleton className="w-full aspect-square rounded-full bg-slate-50" />
                    <Skeleton className="h-4 w-24 bg-slate-50" />
                  </div>
                </SwiperSlide>
              ))
            ) : (
              subcategories.map((item) => (
                <SwiperSlide key={item.id}>
                  <Link to={`/shop?category=${item.slug}`} className="group flex flex-col items-center">
                    {/* Circle Image Container - Full Fit */}
                    <div className="relative w-full aspect-square rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center transition-all duration-500 group-hover:shadow-[0_20px_60px_rgba(0,0,0,0.15)] group-hover:border-blue-400 group-hover:-translate-y-3 overflow-hidden">
                      <div className="w-full h-full rounded-full overflow-hidden bg-white">
                        <img 
                          src={getImagePath(item.image)} 
                          alt={item.name} 
                          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                          onError={(e) => { e.target.src = "https://via.placeholder.com/400x400?text=" + item.name; }}
                        />
                      </div>
                      
                      {/* Interactive Ring */}
                      <div className="absolute inset-0 rounded-full border-2 border-blue-600 scale-110 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-500 pointer-events-none" />
                    </div>

                    {/* Category Label */}
                    <div className="mt-8 text-center">
                      <h4 className="text-[14px] md:text-[16px] font-black text-slate-800 group-hover:text-blue-600 transition-colors uppercase tracking-widest">
                        {item.name}
                      </h4>
                      <div className="flex items-center justify-center gap-2 mt-2 opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-y-2 group-hover:translate-y-0">
                         <div className="h-1 w-1 rounded-full bg-blue-600" />
                         <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">Explore All</span>
                      </div>
                    </div>
                  </Link>
                </SwiperSlide>
              ))
            )}
          </Swiper>

          {/* Navigation Arrows - Show on Hover */}
          <button className="cat-prev absolute top-1/2 -left-4 md:-left-12 -translate-y-16 z-30 h-10 w-10 md:h-14 md:w-14 rounded-full bg-white shadow-2xl flex items-center justify-center text-slate-900 border border-slate-100 opacity-0 group-hover/slider:opacity-100 group-hover/slider:-translate-x-2 transition-all duration-300 hover:bg-blue-600 hover:text-white">
            <ChevronLeft size={24} strokeWidth={3} />
          </button>
          <button className="cat-next absolute top-1/2 -right-4 md:-right-12 -translate-y-16 z-30 h-10 w-10 md:h-14 md:w-14 rounded-full bg-white shadow-2xl flex items-center justify-center text-slate-900 border border-slate-100 opacity-0 group-hover/slider:opacity-100 group-hover/slider:translate-x-2 transition-all duration-300 hover:bg-blue-600 hover:text-white">
            <ChevronRight size={24} strokeWidth={3} />
          </button>
        </div>
      </div>
    </section>
  );
}

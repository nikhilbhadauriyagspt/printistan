import React from 'react';
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import { motion } from 'framer-motion';
import { cn } from '../lib/utils';
import { Skeleton } from './ui/skeleton';

import 'swiper/css';
import 'swiper/css/navigation';

export default function ShopByCategory({ categories = [], loading = false }) {
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
    <section className="bg-white py-12 md:py-20 w-full overflow-hidden">
      <div className="w-full px-4 md:px-8">
        
        {/* --- CENTERED SECTION HEADER --- */}
        <div className="flex flex-col items-center text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
            Shop By <span className="text-blue-600">Category</span>
          </h2>
          <div className="h-1 w-20 bg-blue-600 mt-4 rounded-full" />
          <p className="text-slate-500 text-sm font-bold mt-4 max-w-lg">
            Discover our extensive collection of high-performance printers and professional supplies.
          </p>
        </div>

        {/* --- SQUARE CATEGORY SLIDER --- */}
        <div className="relative group">
          <Swiper
            modules={[Navigation, Autoplay]}
            spaceBetween={20}
            slidesPerView={1.5}
            navigation={{
              prevEl: '.cat-prev-sq',
              nextEl: '.cat-next-sq',
            }}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            breakpoints={{
              480: { slidesPerView: 2.2 },
              640: { slidesPerView: 3.2 },
              768: { slidesPerView: 4.2 },
              1024: { slidesPerView: 5.2 },
              1280: { slidesPerView: 6.2 },
            }}
            className="!overflow-visible"
          >
            {loading ? (
              Array.from({ length: 8 }).map((_, index) => (
                <SwiperSlide key={`skeleton-${index}`}>
                  <div className="flex flex-col gap-4">
                    <Skeleton className="w-full aspect-square rounded-xl bg-slate-100" />
                    <Skeleton className="h-4 w-2/3 mx-auto bg-slate-100" />
                  </div>
                </SwiperSlide>
              ))
            ) : (
              subcategories.map((item, index) => (
                <SwiperSlide key={item.id}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.03 }}
                    viewport={{ once: true }}
                  >
                    <Link 
                      to={`/shop?category=${item.slug}`}
                      className="flex flex-col gap-4 group/card"
                    >
                      {/* Square Image Container */}
                      <div className="relative w-full aspect-square bg-slate-50 rounded-2xl overflow-hidden border border-slate-100 group-hover/card:border-blue-600 group-hover/card:shadow-xl group-hover/card:shadow-blue-100 transition-all duration-500">
                        <img 
                          src={getImagePath(item.image)} 
                          alt={item.name} 
                          className="w-full h-full object-contain p-6 transition-transform duration-700 ease-out group-hover/card:scale-110"
                          onError={(e) => { e.target.src = "https://via.placeholder.com/400x400?text=" + item.name; }}
                        />
                        
                        {/* Interactive Overlay */}
                        <div className="absolute inset-0 bg-blue-600/0 group-hover/card:bg-blue-600/5 transition-colors duration-500" />
                        
                        <div className="absolute bottom-0 left-0 w-full p-4 translate-y-full group-hover/card:translate-y-0 transition-transform duration-500 bg-gradient-to-t from-blue-600/90 to-transparent">
                           <div className="flex items-center justify-center gap-2 text-white text-[10px] font-black uppercase tracking-widest">
                              View Products <ArrowRight size={12} />
                           </div>
                        </div>
                      </div>

                      {/* Name Label */}
                      <h4 className="text-[13px] font-black text-slate-800 group-hover/card:text-blue-600 transition-colors uppercase tracking-widest text-center leading-tight">
                        {item.name}
                      </h4>
                    </Link>
                  </motion.div>
                </SwiperSlide>
              ))
            )}
          </Swiper>

          {/* Navigation Arrows - Styled for Square Layout */}
          <button className="cat-prev-sq absolute top-1/2 -left-4 -translate-y-1/2 z-10 h-12 w-12 flex items-center justify-center rounded-full bg-white shadow-xl border border-slate-100 text-slate-900 hover:bg-blue-600 hover:text-white transition-all opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0">
            <ChevronLeft size={24} />
          </button>
          <button className="cat-next-sq absolute top-1/2 -right-4 -translate-y-1/2 z-10 h-12 w-12 flex items-center justify-center rounded-full bg-white shadow-xl border border-slate-100 text-slate-900 hover:bg-blue-600 hover:text-white transition-all opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0">
            <ChevronRight size={24} />
          </button>
        </div>

      </div>
    </section>
  );
}

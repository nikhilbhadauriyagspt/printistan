import React from 'react';
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';

export default function ShopByCategory({ categories = [] }) {
  // Flatten and filter categories for a clean printer-focused list
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
    <section className="bg-white py-12 w-full border-b border-gray-100">
      <div className="w-full px-4 md:px-10">
        
        {/* --- HEADER --- */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight uppercase">
              Top <span className="text-cyan-600">Categories</span>
            </h2>
            <div className="h-1 w-8 bg-cyan-500 mt-1" />
          </div>
          
          <div className="flex gap-2">
            <button className="cat-prev h-10 w-10 flex items-center justify-center rounded-full border border-gray-200 hover:bg-cyan-500 hover:text-white transition-all disabled:opacity-20 shadow-sm">
              <ChevronLeft size={20} />
            </button>
            <button className="cat-next h-10 w-10 flex items-center justify-center rounded-full border border-gray-200 hover:bg-cyan-500 hover:text-white transition-all disabled:opacity-20 shadow-sm">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* --- FULL-BLEED COMPACT CARDS --- */}
        <div className="relative">
          <Swiper
            modules={[Navigation]}
            spaceBetween={16}
            slidesPerView={2.2}
            navigation={{
              prevEl: '.cat-prev',
              nextEl: '.cat-next',
            }}
            breakpoints={{
              640: { slidesPerView: 3.2 },
              768: { slidesPerView: 4.2 },
              1024: { slidesPerView: 5.2 },
              1280: { slidesPerView: 6.2 },
              1536: { slidesPerView: 7.2 },
            }}
          >
            {subcategories.map((item) => (
              <SwiperSlide key={item.id}>
                <Link 
                  to={`/shop?category=${item.slug}`}
                  className="flex flex-col gap-3 group"
                >
                  {/* Full-Bleed Image Wrapper */}
                  <div className="w-full aspect-square rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center overflow-hidden transition-all duration-300 group-hover:border-cyan-500 group-hover:bg-white">
                    <img 
                      src={getImagePath(item.image)} 
                      alt={item.name} 
                      className="w-full h-full object-cover transition-transform duration-500"
                      onError={(e) => { e.target.src = "https://via.placeholder.com/400x400?text=" + item.name; }}
                    />
                  </div>

                  {/* Label */}
                  <div className="text-center">
                    <h4 className="text-[11px] font-bold text-slate-800 group-hover:text-cyan-600 transition-colors uppercase tracking-tight line-clamp-1 px-1">
                      {item.name}
                    </h4>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

      </div>
    </section>
  );
}

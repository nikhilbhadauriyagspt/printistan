import React from 'react';
import { ChevronLeft, ChevronRight, Heart, ShoppingBag, Eye, Star } from "lucide-react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, FreeMode } from 'swiper/modules';
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { cn } from "../lib/utils";
import { Skeleton } from './ui/skeleton';
import { motion } from 'framer-motion';

import 'swiper/css';
import 'swiper/css/navigation';

export default function CategorySlider({ title, products = [], loading = false }) {
  const { addToCart, toggleWishlist, isInWishlist, openCartDrawer } = useCart();

  const handleAddToCart = (e, product) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    openCartDrawer();
  };

  const getImagePath = (images) => {
    try {
      const imgs = typeof images === 'string' ? JSON.parse(images) : images;
      if (Array.isArray(imgs) && imgs.length > 0) return `/${imgs[0]}`;
    } catch (e) {}
    return "https://via.placeholder.com/400x400?text=Product";
  };

  return (
    <section className="bg-white py-16 md:py-24 w-full overflow-hidden">
      <div className="w-full px-4 md:px-10 lg:px-16 max-w-[1920px] mx-auto">
        
        {/* --- CENTERED E-COM HEADER --- */}
        <div className="flex flex-col items-center text-center mb-12 md:mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3 mb-4"
          >
            <span className="h-px w-8 bg-blue-600" />
            <span className="text-[11px] font-black text-blue-600 uppercase tracking-[0.3em]">Specialized Selection</span>
            <span className="h-px w-8 bg-blue-600" />
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-2xl md:text-4xl font-black text-slate-900 "
          >
            {title}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-slate-500 text-sm md:text-lg font-medium max-w-2xl mt-4 leading-relaxed"
          >
            Professional-grade {title.toLowerCase()} engineered for high-volume productivity and precision.
          </motion.p>
        </div>

        {/* --- PRODUCT SLIDER WITH PREMIUM CARDS --- */}
        <div className="relative group/slider">
          <Swiper
            modules={[Navigation, Autoplay, FreeMode]}
            spaceBetween={24}
            slidesPerView={1.2}
            freeMode={true}
            navigation={{
              prevEl: `.cs-prev-${title.replace(/\s+/g, '-')}`,
              nextEl: `.cs-next-${title.replace(/\s+/g, '-')}`,
            }}
            breakpoints={{
              480: { slidesPerView: 2.2 },
              768: { slidesPerView: 3.2 },
              1024: { slidesPerView: 4.2 },
              1440: { slidesPerView: 5.2 },
            }}
            className="!overflow-visible"
          >
            {loading ? (
              Array.from({ length: 8 }).map((_, index) => (
                <SwiperSlide key={`skeleton-${index}`}>
                  <div className="flex flex-col gap-4">
                    <Skeleton className="w-full aspect-[4/5] rounded-[2rem] bg-slate-50" />
                    <Skeleton className="h-6 w-3/4 bg-slate-50" />
                    <Skeleton className="h-4 w-1/2 bg-slate-50" />
                  </div>
                </SwiperSlide>
              ))
            ) : (
              products.slice(0, 15).map((p) => (
                <SwiperSlide key={p.id}>
                  <Link 
                    to={`/product/${p.slug}`} 
                    className="group relative flex flex-col h-full bg-white rounded-[2rem] overflow-hidden border border-slate-100 transition-all duration-500 hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] hover:border-blue-100 hover:-translate-y-2"
                  >
                  

                    {/* Image Container */}
                    <div className="relative aspect-[4/5]  flex items-center justify-center p-8 overflow-hidden">
                      <img 
                        src={getImagePath(p.images)} 
                        alt={p.name} 
                        className="max-w-full max-h-full object-contain transition-transform duration-700 ease-out group-hover:scale-110"
                        onError={(e) => { e.target.src = "https://via.placeholder.com/400x400?text=" + p.name; }}
                      />
                      
                      {/* Floating Action Bar (Vertical) */}
                      <div className="absolute right-5 top-5 flex flex-col gap-2 translate-x-12 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500">
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            toggleWishlist(p);
                          }}
                          className={cn(
                            "h-10 w-10 rounded-full bg-white shadow-xl flex items-center justify-center transition-all duration-300 border border-slate-50",
                            isInWishlist(p.id) ? "text-red-500" : "text-slate-400 hover:text-red-500"
                          )}
                        >
                          <Heart size={18} fill={isInWishlist(p.id) ? "currentColor" : "none"} />
                        </button>
                        <div className="h-10 w-10 rounded-full bg-white shadow-xl flex items-center justify-center text-slate-400 hover:text-blue-600 border border-slate-50">
                           <Eye size={18} />
                        </div>
                      </div>

                      {/* Quick Add Overlay */}
                      <div className="absolute bottom-0 left-0 w-full p-5 translate-y-full group-hover:translate-y-0 transition-all duration-500">
                        <button
                          onClick={(e) => handleAddToCart(e, p)}
                          className="w-full h-12 bg-white text-slate-900 rounded-2xl flex items-center justify-center gap-3 text-[11px] font-black uppercase tracking-widest shadow-2xl hover:bg-blue-600 hover:text-white transition-all active:scale-95"
                        >
                          <ShoppingBag size={18} />
                          Quick Add
                        </button>
                      </div>
                    </div>

                    {/* Details */}
                    <div className="flex flex-col p-6 bg-white flex-1">
                     
                      <h4 className="text-[14px] font-black text-slate-800 uppercase tracking-wide leading-tight group-hover:text-blue-600 transition-colors mb-2 line-clamp-2">
                        {p.name}
                      </h4>
                      <div className="mt-auto flex items-end justify-between">
                        <p className="text-xl font-black text-slate-900">
                          ${p.price}
                        </p>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 group-hover:text-blue-600 transition-colors">
                          View Details
                        </p>
                      </div>
                    </div>
                  </Link>
                </SwiperSlide>
              ))
            )}
          </Swiper>

          {/* Custom Navigation - Center Aligned Side Buttons */}
          <button className={`cs-prev-${title.replace(/\s+/g, '-')} absolute top-1/2 -left-4 md:-left-10 -translate-y-12 z-20 h-10 w-10 md:h-14 md:w-14 rounded-full bg-white shadow-2xl flex items-center justify-center text-slate-400 hover:text-blue-600 hover:bg-white transition-all border border-slate-50 opacity-0 group-hover/slider:opacity-100 active:scale-90`}>
            <ChevronLeft size={24} strokeWidth={3} />
          </button>
          <button className={`cs-next-${title.replace(/\s+/g, '-')} absolute top-1/2 -right-4 md:-right-10 -translate-y-12 z-20 h-10 w-10 md:h-14 md:w-14 rounded-full bg-white shadow-2xl flex items-center justify-center text-slate-400 hover:text-blue-600 hover:bg-white transition-all border border-slate-50 opacity-0 group-hover/slider:opacity-100 active:scale-90`}>
            <ChevronRight size={24} strokeWidth={3} />
          </button>
        </div>
      </div>
    </section>
  );
}

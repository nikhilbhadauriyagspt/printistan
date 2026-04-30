import React from 'react';
import { motion } from "framer-motion";
import { ShoppingCart, Heart, ChevronRight, Zap, Eye } from "lucide-react";
import { Link } from 'react-router-dom';
import { cn } from '../lib/utils';

export default function BestSellers({ products = [], loading = false }) {
  const bestSellers = products
    .filter(p => p.price > 50)
    .slice(0, 12); // Showing 12 products (2 rows of 6)

  const getImagePath = (images) => {
    if (!images) return "https://via.placeholder.com/400x400?text=Product";
    try {
      const parsed = typeof images === 'string' ? JSON.parse(images) : images;
      return Array.isArray(parsed) ? parsed[0] : parsed;
    } catch (e) {
      return images;
    }
  };

  return (
    <section className="w-full bg-[#FAF9F6] py-16 md:py-24 font-poppins relative overflow-hidden">
      <div className="max-w-[1920px] mx-auto px-4 md:px-10 relative z-10">
        
        {/* --- Header Section --- */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-600 rounded-lg text-[11px] font-bold mb-3 uppercase tracking-widest">
               <Zap size={14} fill="currentColor" />
               <span>Top Trending</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A]  leading-none mb-3">
              Best <span className="text-blue-600">Sellers</span>
            </h2>
            <p className="text-gray-500 text-[14px] font-medium leading-relaxed">
              Curated collection of our highest performing printing solutions.
            </p>
          </div>
          <Link 
            to="/shop" 
            className="group flex items-center gap-2 text-[13px] font-bold text-[#1A1A1A] hover:text-blue-600 transition-colors"
          >
            Explore All <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* --- Compact 6-Column Grid --- */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-5">
          {loading ? (
             Array.from({ length: 6 }).map((_, i) => (
               <div key={i} className="aspect-[4/5] rounded-3xl bg-white animate-pulse border border-[#E8E6E1]" />
             ))
          ) : (
            bestSellers.map((p, i) => (
              <motion.div
                key={p.id || i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="group flex flex-col h-full bg-white rounded-[2rem] p-3.5 border border-[#E8E6E1] hover:border-blue-500/20 hover:shadow-[0_20px_40px_rgba(0,0,0,0.03)] transition-all duration-500"
              >
                {/* Compact Image Container */}
                <div className="relative aspect-square w-full mb-4 flex items-center justify-center p-3 bg-[#F8F8F8] rounded-[1.5rem] overflow-hidden group-hover:bg-blue-50/50 transition-colors duration-500">
                  <img 
                    src={getImagePath(p.images)} 
                    loading="lazy"
                    width={400}
                    height={400}
                    className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-700 ease-out" 
                    alt={p.name} 
                  />
                  
                  {/* Quick Action Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center gap-1.5 opacity-0 group-hover:opacity-100 transition-all duration-500 bg-black/5 backdrop-blur-[2px]">
                     <Link to={`/product/${p.slug}`} aria-label={`View details of ${p.name}`} className="h-8 w-8 rounded-lg bg-white text-[#1A1A1A] flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all shadow-lg active:scale-90">
                                           <Eye size={14} />
                                        </Link>
                    <button aria-label={`Add ${p.name} to wishlist`} className="h-8 w-8 rounded-lg bg-white text-[#1A1A1A] flex items-center justify-center hover:bg-red-500 hover:text-white transition-all shadow-xl active:scale-90">
                       <Heart size={14} />
                    </button>
                  </div>
                </div>

                {/* Info Section */}
                <div className="flex flex-col flex-1 px-1">
                  <Link to={`/product/${p.slug}`} className="block mb-2 flex-1">
                    <h3 className="font-bold text-[#1A1A1A] text-[13px] group-hover:text-blue-600 transition-colors leading-snug line-clamp-2">
                      {p.name}
                    </h3>
                  </Link>
                  
                  <div className="flex items-center justify-between mt-auto">
                    <p className="text-[#1A1A1A] font-bold text-[15px] leading-none">${p.price}</p>
                    
                    <button aria-label={`Add ${p.name} to cart`} className="h-9 w-9 rounded-xl bg-[#1A1A1A] text-white flex items-center justify-center hover:bg-blue-600 transition-all group/cart active:scale-90">
                      <ShoppingCart size={16} strokeWidth={2.5} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}

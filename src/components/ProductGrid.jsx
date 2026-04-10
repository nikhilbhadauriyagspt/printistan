import React from 'react';
import { Heart, ShoppingBag, ArrowRight, Eye, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { motion } from "framer-motion";
import { cn } from "../lib/utils";
import { Skeleton } from './ui/skeleton';

export default function ProductGrid({ products = [], loading = false }) {
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
    <section className="bg-slate-50/50 py-16 md:py-24 w-full overflow-hidden">
      <div className="w-full px-4 md:px-10 lg:px-16 max-w-[1920px] mx-auto">

        {/* --- CENTERED E-COM HEADER --- */}
        <div className="flex flex-col items-center text-center mb-12 md:mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3 mb-4"
          >
            <span className="h-px w-8 bg-blue-600" />
            <span className="text-[11px] font-black text-blue-600 uppercase tracking-[0.3em]">New Collection</span>
            <span className="h-px w-8 bg-blue-600" />
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-2xl md:text-4xl font-black text-slate-900 "
          >
            New Arrivals
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-slate-500 text-sm md:text-lg font-medium max-w-2xl mt-4 leading-relaxed"
          >
            Experience the latest innovations in printing technology with our freshest industrial-grade equipment.
          </motion.p>
        </div>

        {/* --- PREMIUM PRODUCT GRID --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 md:gap-8">
          {loading ? (
            Array.from({ length: 10 }).map((_, index) => (
              <div key={`skeleton-${index}`} className="flex flex-col gap-4">
                <Skeleton className="w-full aspect-[4/5] rounded-[2rem] bg-white border border-slate-100" />
                <Skeleton className="h-6 w-3/4 bg-slate-100 mx-auto" />
                <Skeleton className="h-4 w-1/2 bg-slate-100 mx-auto" />
              </div>
            ))
          ) : (
            products.slice(0, 10).map((p, index) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: (index % 5) * 0.05 }}
                viewport={{ once: true }}
              >
                <Link 
                  to={`/product/${p.slug}`} 
                  className="group relative flex flex-col h-full bg-white rounded-[2rem] overflow-hidden border border-slate-100 transition-all duration-500 hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] hover:border-blue-100 hover:-translate-y-2"
                >
                  

                  {/* Image Container */}
                  <div className="relative aspect-[4/5] bg-white flex items-center justify-center p-8 overflow-hidden">
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
                        className="w-full h-12 bg-white text-black rounded-2xl flex items-center justify-center gap-3 text-[11px] font-black uppercase tracking-widest shadow-2xl hover:bg-blue-600 transition-all active:scale-95"
                      >
                        <ShoppingBag size={18} />
                        Quick Add
                      </button>
                    </div>
                  </div>

                  {/* Details - Centered for Grid */}
                  <div className="flex flex-col items-center text-center p-6 bg-slate-50/50 flex-1 border-t border-slate-50">
                    
                    <h4 className="text-[14px] font-black text-slate-800 uppercase tracking-wide leading-tight group-hover:text-blue-600 transition-colors mb-3 line-clamp-2 px-2">
                      {p.name}
                    </h4>
                    <div className="mt-auto">
                      <p className="text-xl font-black text-slate-900">
                        ${p.price}
                      </p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))
          )}
        </div>

        {/* Bottom Action CTA */}
        {!loading && products.length > 0 && (
          <div className="flex justify-center mt-16 md:mt-24">
            <Link
              to="/shop"
              className="group flex items-center gap-4 px-10 py-4 bg-white text-slate-900 border border-slate-200 rounded-full text-[11px] font-black uppercase tracking-[0.3em] transition-all hover:bg-slate-900 hover:text-white hover:border-slate-900 shadow-sm hover:shadow-xl active:scale-95"
            >
              View Full Collection
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}

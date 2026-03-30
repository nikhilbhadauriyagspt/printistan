import React from 'react';
import { Heart, ShoppingBag, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { motion } from "framer-motion";
import { cn } from "../lib/utils";
import { ProductCardSkeleton } from './ui/skeleton';

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
    <section className="bg-white py-12 md:py-20 w-full overflow-hidden">
      <div className="w-full px-4 md:px-8">

        {/* Header */}
        <div className="flex flex-col items-center text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
            New <span className="text-blue-600">Arrivals</span>
          </h2>
          <div className="h-1 w-20 bg-blue-600 mt-4 rounded-full" />
          <p className="text-slate-500 text-sm font-bold mt-4 max-w-lg">
            Discover the latest printers and accessories designed for reliable performance and everyday productivity.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5 md:gap-6">
          {loading ? (
            Array.from({ length: 12 }).map((_, index) => (
              <div
                key={`skeleton-${index}`}
                className="bg-white border border-slate-100 rounded-2xl overflow-hidden"
              >
                <ProductCardSkeleton />
              </div>
            ))
          ) : (
            products.slice(0, 18).map((p, index) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: (index % 6) * 0.04 }}
                viewport={{ once: true }}
              >
                <Link to={`/product/${p.slug}`} className="flex flex-col gap-4 group/card">
                  
                  {/* Card */}
                  <div className="relative w-full bg-slate-50 rounded-2xl overflow-hidden border border-slate-100 group-hover/card:border-blue-600 group-hover/card:shadow-xl group-hover/card:shadow-blue-100 transition-all duration-500 p-4">

                    {/* Wishlist */}
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        toggleWishlist(p);
                      }}
                      className={cn(
                        "absolute top-3 right-3 z-20 h-10 w-10 rounded-full bg-white shadow-md flex items-center justify-center transition-all duration-300",
                        isInWishlist(p.id)
                          ? "text-red-500"
                          : "text-slate-400 hover:text-blue-600"
                      )}
                    >
                      <Heart size={18} fill={isInWishlist(p.id) ? "currentColor" : "none"} />
                    </button>

                    {/* Image */}
                    <div className="relative w-full aspect-square flex items-center justify-center">
                      <img
                        src={getImagePath(p.images)}
                        alt={p.name}
                        className="w-full h-full object-contain p-4 transition-transform duration-700 ease-out group-hover/card:scale-110"
                        onError={(e) => {
                          e.target.src = "https://via.placeholder.com/400x400?text=" + p.name;
                        }}
                      />
                    </div>

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-blue-600/0 group-hover/card:bg-blue-600/5 transition-colors duration-500 pointer-events-none" />

                    {/* Hover Add to Cart */}
                    <div className="absolute bottom-0 left-0 w-full p-4 translate-y-full group-hover/card:translate-y-0 transition-transform duration-500 bg-gradient-to-t from-blue-600/90 to-transparent z-20">
                      <button
                        onClick={(e) => handleAddToCart(e, p)}
                        className="w-full h-11 bg-white text-blue-600 flex items-center justify-center gap-2 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-slate-100 transition-colors"
                      >
                        <ShoppingBag size={16} />
                        Add to Cart
                      </button>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="text-center px-1">
                    <h3 className="text-[13px] font-black text-slate-800 group-hover/card:text-blue-600 transition-colors uppercase tracking-widest leading-[1.45] line-clamp-2 min-h-[38px] max-h-[38px] overflow-hidden">
                      {p.name}
                    </h3>

                    <div className="mt-3 flex items-center justify-center gap-2 flex-wrap">
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                        Price:
                      </span>
                      <span className="text-lg font-black text-slate-900 tracking-tight">
                        ${p.price}
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))
          )}
        </div>

        {/* Bottom Button */}
        {!loading && products.length > 0 && (
          <div className="flex justify-center mt-10">
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-blue-600 text-white text-sm font-black uppercase tracking-widest hover:bg-blue-700 transition-all"
            >
              Explore All Products
              <ArrowRight size={16} />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
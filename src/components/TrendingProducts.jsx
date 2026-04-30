import React from 'react';
import { motion } from "framer-motion";
import { Star, ShoppingCart, ArrowRight, Heart, Zap } from "lucide-react";
import { Link } from 'react-router-dom';

const products = [
  {
    name: "EcoTank Photo L8180",
    tag: "Top Rated",
    price: "$799",
    rating: "4.9",
    image: "/products/image_1.png",
    color: "bg-blue-50/30"
  },
  {
    name: "LaserJet Pro M404dw",
    tag: "Best Seller",
    price: "$349",
    rating: "4.8",
    image: "/products/image_10.png",
    color: "bg-slate-50"
  },
  {
    name: "WorkForce Pro WF-4830",
    tag: "Trending",
    price: "$249",
    rating: "4.7",
    image: "/products/image_20.png",
    color: "bg-indigo-50/30"
  },
  {
    name: "PIXMA G6020 MegaTank",
    tag: "New Arrival",
    price: "$299",
    rating: "4.9",
    image: "/products/image_30.png",
    color: "bg-rose-50/30"
  }
];

export default function TrendingProducts() {
  return (
    <section className="w-full bg-white py-20 md:py-32 font-poppins">
      <div className="max-w-[1600px] mx-auto px-4 md:px-10">
        
        {/* --- CENTERED HEADER --- */}
        <div className="text-center mb-16 md:mb-24">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-full text-[11px] font-bold uppercase tracking-[0.2em] mb-6">
             <Zap size={14} fill="currentColor" />
             <span>Top Trending</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-slate-900  mb-6">
            Best <span className="text-blue-600">Sellers</span>
          </h2>
          <p className="text-slate-400 text-[14px] md:text-[16px] font-medium max-w-2xl mx-auto leading-relaxed">
            Discover our most popular products, highly rated by our community and handpicked for their exceptional quality and performance.
          </p>
        </div>

        {/* --- PRODUCT GRID --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
          {products.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group flex flex-col"
            >
              {/* Image Container - Square & Clean */}
              <div className={cn(
                "relative aspect-square rounded-[2.5rem] overflow-hidden border border-slate-100 transition-all duration-500 group-hover:border-blue-200 group-hover:shadow-[0_20px_50px_rgba(0,0,0,0.05)]",
                p.color
              )}>
                <div className="absolute inset-0 p-10 flex items-center justify-center">
                  <img 
                    src={p.image} 
                    width={400}
                    height={400}
                    className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700 ease-out" 
                    alt={p.name} 
                    onError={(e) => { e.target.src = "https://via.placeholder.com/400x400?text=" + p.name; }}
                  />
                </div>
                
                {/* Badge */}
                <span className="absolute top-6 left-6 text-[10px] font-bold uppercase tracking-widest bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl border border-slate-100 shadow-sm">
                  {p.tag}
                </span>

                {/* Quick Actions */}
                <div className="absolute top-6 right-6 flex flex-col gap-2 translate-x-12 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500">
                   <button className="h-10 w-10 rounded-xl bg-white shadow-lg flex items-center justify-center text-slate-400 hover:text-rose-500 hover:bg-rose-50 transition-all active:scale-95">
                      <Heart size={18} />
                   </button>
                </div>

                {/* Bottom Action (Desktop only) */}
                <div className="absolute bottom-0 left-0 w-full p-6 translate-y-20 group-hover:translate-y-0 transition-all duration-500">
                   <button className="w-full h-14 bg-slate-900 text-white rounded-2xl font-bold text-[13px] uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-blue-600 transition-colors shadow-xl">
                      <ShoppingCart size={18} />
                      Add to Cart
                   </button>
                </div>
              </div>

              {/* Product Info */}
              <div className="mt-6 px-2">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-bold text-slate-900 text-[18px] group-hover:text-blue-600 transition-colors truncate flex-1 pr-4">
                    {p.name}
                  </h4>
                  <div className="flex items-center gap-1.5 bg-amber-50 px-2 py-1 rounded-lg">
                    <Star size={12} className="fill-amber-400 text-amber-400" />
                    <span className="text-[12px] font-bold text-amber-600">{p.rating}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                   <p className="text-blue-600 font-bold text-[20px]">{p.price}</p>
                   <Link to="/shop" className="text-[11px] font-bold uppercase tracking-widest text-slate-400 hover:text-blue-600 flex items-center gap-1 transition-colors">
                      Details <ArrowRight size={12} strokeWidth={3} />
                   </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Utility check (Importing cn since it's used)
import { cn } from '../lib/utils';

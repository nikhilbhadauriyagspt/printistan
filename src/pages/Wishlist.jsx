import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { Heart, ArrowRight, ShoppingBag, Eye, X, ChevronLeft, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import SEO from '@/components/SEO';
import { cn } from '../lib/utils';

export default function Wishlist() {
  const { wishlist, toggleWishlist, addToCart, wishlistCount, openCartDrawer } = useCart();
  const [hoveredId, setHoveredId] = useState(null);

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
    } catch (e) { }
    return "https://via.placeholder.com/400x400?text=Product";
  };

  if (wishlistCount === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center pt-20 px-6 font-jakarta bg-white text-slate-900">
        <SEO title="Empty Wishlist | Larry Printing Solutions" />
        <div className="h-20 w-20 bg-cyan-50 rounded-full flex items-center justify-center mb-8">
          <Heart size={32} className="text-cyan-600/50" />
        </div>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-center">Your wishlist is <span className="text-cyan-600">empty</span></h2>
        <p className="text-slate-500 text-sm font-medium mb-10 text-center max-w-xs leading-relaxed">Save your favorite printers here to easily find them later in your collection.</p>
        <Link to="/shop" className="inline-flex items-center gap-3 bg-slate-900 text-white h-12 px-10 rounded font-bold text-xs hover:bg-cyan-600 transition-all shadow-lg active:scale-95">
          Start shopping <ArrowRight size={16} />
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white font-jakarta text-slate-900 overflow-x-hidden pt-32 pb-20">
      <SEO title="My Wishlist | Larry Printing Solutions" description="Review your saved printers." />
      
      <div className="w-full px-4 md:px-10">
        
        {/* --- HEADER --- */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-gray-100 pb-10 mb-12">
          <div className="space-y-2 text-left">
            <h1 className="text-3xl md:text-5xl font-bold text-slate-900 tracking-tight leading-none">
              My <span className="text-cyan-600">wishlist</span>
            </h1>
            <p className="text-slate-500 font-medium text-sm md:text-base">Review and manage your saved favorites</p>
          </div>
          
          <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
            <Heart size={14} className="text-cyan-600" fill="currentColor" />
            {wishlistCount} saved items
          </div>
        </div>

        {/* --- PRODUCT GRID --- */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 md:gap-6">
          <AnimatePresence mode="popLayout">
            {wishlist.map((p) => (
              <motion.div 
                key={p.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white border border-gray-100 rounded-xl p-4 flex flex-col h-full hover:border-cyan-500 transition-all duration-300 group"
              >
                {/* Image Section */}
                <div className="relative aspect-square w-full mb-4 flex items-center justify-center overflow-hidden bg-gray-50 rounded-lg">
                  <Link to={`/product/${p.slug}`} className="absolute inset-0 z-10" />
                  <img 
                    src={getImagePath(p.images)} 
                    alt={p.name} 
                    className="max-h-[85%] max-w-[85%] object-contain transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => { e.target.src = "https://via.placeholder.com/400x400?text=" + p.name; }}
                  />
                  
                  {/* Remove Wishlist Button */}
                  <button 
                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleWishlist(p); }}
                    className="absolute top-2 right-2 z-20 p-2 rounded-full bg-white/80 backdrop-blur-sm shadow-sm transition-colors hover:bg-white text-red-500"
                    title="Remove from Wishlist"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>

                {/* Details Section */}
                <div className="flex-1 flex flex-col">
                  <Link to={`/product/${p.slug}`}>
                    <h3 className="text-[12px] font-bold text-slate-800 group-hover:text-cyan-600 transition-colors line-clamp-2 mb-2">
                      {p.name}
                    </h3>
                  </Link>
                  
                  <div className="mt-auto pt-3 border-t border-gray-50 flex flex-col gap-3">
                    <span className="text-lg font-black text-slate-900">${p.price}</span>
                    
                    <button 
                      onClick={(e) => handleAddToCart(e, p)}
                      className="w-full py-2 bg-cyan-500 text-slate-900 text-[10px] font-bold uppercase tracking-widest hover:bg-slate-900 hover:text-white transition-all rounded shadow-sm"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* --- FOOTER ACTION --- */}
        <div className="mt-16 pt-8 border-t border-gray-100 flex justify-center">
          <Link to="/shop" className="group inline-flex items-center gap-3 text-xs font-bold text-slate-400 hover:text-cyan-600 transition-all">
            <ChevronLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
            Continue shopping
          </Link>
        </div>
      </div>
    </div>
  );
}

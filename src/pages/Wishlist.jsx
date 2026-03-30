import React from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { Heart, ArrowRight, ShoppingBag, ChevronLeft, Trash2, Package } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import SEO from '@/components/SEO';
import { cn } from '../lib/utils';

export default function Wishlist() {
  const { wishlist, toggleWishlist, addToCart, wishlistCount, openCartDrawer } = useCart();

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

  return (
    <div className="bg-white min-h-screen font-jakarta text-slate-900 overflow-x-hidden">
      <SEO title="My Wishlist |Inktrix Printers" description="Review your saved professional printing solutions." />
      
    

      {/* --- CONTENT SECTION --- */}
      <section className="py-20 bg-slate-50 min-h-[60vh]">
        <div className="w-full px-4 md:px-12 lg:px-20">
          
          <AnimatePresence mode="wait">
            {wishlistCount === 0 ? (
              <motion.div 
                key="empty"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-center py-32 bg-white rounded-[40px] border border-slate-200 shadow-xl max-w-4xl mx-auto px-8"
              >
                <div className="h-24 w-24 bg-slate-50 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-inner">
                  <Heart size={48} className="text-slate-200" />
                </div>
                <h2 className="text-3xl font-black text-slate-900 mb-4">Your wishlist is empty</h2>
                <p className="text-slate-500 font-bold mb-10 text-lg leading-relaxed">Save your preferred models to easily compare and finalize your professional inventory.</p>
                <Link to="/shop" className="inline-flex items-center gap-4 bg-blue-600 text-white px-12 py-5 rounded-full font-black text-sm uppercase tracking-widest hover:bg-blue-700 transition-all shadow-xl active:scale-95 group">
                  Explore Catalog <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            ) : (
              <div className="max-w-[1920px] mx-auto">
                <div className="flex items-center gap-3 text-sm font-black text-slate-400 uppercase tracking-widest bg-white px-8 py-4 rounded-2xl border border-slate-100 self-start shadow-sm w-fit mb-12">
                  <Heart size={18} className="text-blue-600" fill="currentColor" /> {wishlistCount} Saved Solutions
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6 md:gap-8 lg:gap-10">
                  <AnimatePresence mode="popLayout">
                    {wishlist.map((p, index) => (
                      <motion.div 
                        key={p.id}
                        layout
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.4 }}
                      >
                        <Link to={`/product/${p.slug}`} className="flex flex-col gap-5 group/card h-full">
                          
                          {/* Card (Matching Professional Style) */}
                          <div className="relative w-full bg-white rounded-[32px] overflow-hidden border border-slate-200 group-hover/card:border-blue-600 group-hover/card:shadow-2xl group-hover/card:shadow-slate-200/60 transition-all duration-500 p-6 shadow-sm">

                            {/* Remove Button */}
                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                toggleWishlist(p);
                              }}
                              className="absolute top-4 right-4 z-20 h-10 w-10 rounded-2xl bg-slate-50 text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all duration-300 flex items-center justify-center border border-slate-100"
                              title="Remove from wishlist"
                            >
                              <Trash2 size={18} />
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
                                className="w-full h-12 bg-white text-blue-600 flex items-center justify-center gap-2 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-slate-50 transition-colors shadow-lg"
                              >
                                <ShoppingBag size={18} />
                                Add to Cart
                              </button>
                            </div>
                          </div>

                          {/* Content */}
                          <div className="text-center px-2 flex flex-col items-center">
                            <div className="h-1 w-8 bg-blue-100 mb-3 rounded-full group-hover/card:w-16 group-hover/card:bg-blue-600 transition-all duration-500" />
                            <h3 className="text-[14px] font-black text-slate-800 group-hover/card:text-blue-600 transition-colors uppercase tracking-wide leading-snug line-clamp-2 min-h-[40px]">
                              {p.name}
                            </h3>

                            <div className="mt-4 flex flex-col items-center">
                              <span className="text-xl font-black text-slate-900 tracking-tight">
                                ${parseFloat(p.price).toLocaleString()}
                              </span>
                              <span className="text-[10px] font-bold text-slate-300 line-through tracking-widest mt-1">
                                ${(parseFloat(p.price) * 1.2).toFixed(2)}
                              </span>
                            </div>
                          </div>
                        </Link>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>
            )}
          </AnimatePresence>

          <div className="mt-24 pt-12 border-t border-slate-200 flex justify-center">
            <Link to="/shop" className="group inline-flex items-center gap-4 text-sm font-black uppercase tracking-widest text-slate-400 hover:text-blue-600 transition-all">
              <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
              Return to Catalog
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

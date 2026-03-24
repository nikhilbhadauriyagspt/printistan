import React from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, ArrowRight, ShoppingBag, Trash2, ChevronLeft, ShieldCheck } from 'lucide-react';
import SEO from '@/components/SEO';
import { cn } from '../lib/utils';

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, cartCount } = useCart();

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const getImagePath = (images) => {
    try {
      const imgs = typeof images === 'string' ? JSON.parse(images) : images;
      if (Array.isArray(imgs) && imgs.length > 0) return `/${imgs[0]}`;
    } catch (e) { }
    return "https://via.placeholder.com/200x200?text=Product";
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center pt-20 px-6 font-jakarta bg-white text-slate-900">
        <SEO title="Empty Cart | Larry Printing Solutions" />
        <div className="h-24 w-24 bg-gray-50 rounded-full flex items-center justify-center mb-8 border border-gray-100">
          <ShoppingBag size={40} className="text-gray-300" />
        </div>
        <h2 className="text-4xl font-bold tracking-tight mb-4 text-center">Your cart is empty</h2>
        <p className="text-slate-500 text-sm font-medium mb-10 text-center max-w-xs leading-relaxed">It looks like you haven't added anything to your cart yet. Discover our latest printers to get started.</p>
        <Link to="/shop" className="inline-flex items-center gap-3 bg-slate-900 text-white h-14 px-10 rounded font-bold text-sm transition-all shadow-xl hover:bg-cyan-600 active:scale-95">
          Start shopping <ArrowRight size={18} />
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white font-jakarta text-slate-900 overflow-x-hidden pt-32 pb-24">
      <SEO title="Shopping Cart | Larry Printing Solutions" />
      
      <div className="w-full px-4 md:px-10">
        
        {/* --- HEADER --- */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-12 mb-12 border-b border-gray-100">
          <div className="space-y-2 text-left">
            <h1 className="text-3xl md:text-5xl font-bold text-slate-900 tracking-tight leading-none">
              Your <span className="text-cyan-600">cart</span>
            </h1>
            <p className="text-slate-500 font-medium text-base">You have {cartCount} items in your selection</p>
          </div>
          
          <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
            <ShieldCheck size={16} className="text-cyan-600" />
            <span className="text-[10px] font-bold uppercase tracking-widest">Secure transactions</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* --- ITEMS LIST --- */}
          <div className="lg:col-span-8 space-y-10">
            <AnimatePresence mode="popLayout">
              {cart.map((item) => (
                <motion.div 
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  key={item.id} 
                  className="group flex flex-col md:flex-row gap-10 items-center pb-10 border-b border-gray-50 last:border-0"
                >
                  <div className="h-40 w-40 bg-gray-50 rounded-2xl flex items-center justify-center p-6 border border-gray-100 transition-all duration-500 group-hover:bg-white group-hover:border-cyan-100 flex-shrink-0 relative overflow-hidden">
                    <img 
                      src={getImagePath(item.images)} 
                      alt={item.name}
                      className="max-h-full max-w-full object-contain mix-blend-multiply transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>

                  <div className="flex-1 min-w-0 flex flex-col h-full py-2 w-full">
                    <div className="flex justify-between items-start gap-6">
                      <div className="space-y-1">
                        <Link to={`/product/${item.slug}`}>
                          <h3 className="text-xl font-bold text-slate-900 hover:text-cyan-600 transition-colors leading-tight line-clamp-2">{item.name}</h3>
                        </Link>
                        <p className="text-xs font-medium text-slate-400">Professional printing printer</p>
                      </div>
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="h-10 w-10 rounded-full bg-gray-50 text-gray-300 hover:text-red-500 hover:bg-red-50 transition-all flex items-center justify-center shrink-0 border border-transparent hover:border-red-100"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-8 md:mt-auto">
                      <div className="flex items-center border border-gray-100 rounded-lg h-11 px-1 bg-gray-50">
                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-10 h-9 flex items-center justify-center text-gray-400 hover:text-slate-900 transition-colors"><Minus size={14} /></button>
                        <span className="text-base font-bold w-10 text-center text-slate-900">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-10 h-9 flex items-center justify-center text-gray-400 hover:text-slate-900 transition-colors"><Plus size={14} /></button>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] text-slate-400 font-bold mb-1 uppercase tracking-tight">${item.price.toLocaleString()} per unit</p>
                        <span className="text-2xl font-bold text-slate-900 tracking-tight">${(item.price * item.quantity).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            <div className="pt-10">
              <Link to="/shop" className="group inline-flex items-center gap-3 text-xs font-bold text-slate-400 hover:text-cyan-600 transition-all">
                <ChevronLeft size={18} className="transition-transform group-hover:-translate-x-1" />
                Return to shopping
              </Link>
            </div>
          </div>

          {/* --- SUMMARY CARD --- */}
          <div className="lg:col-span-4">
            <div className="bg-slate-900 rounded-3xl p-10 text-white space-y-10 sticky top-32 shadow-xl overflow-hidden relative">
              <div className="space-y-2 relative z-10">
                <h2 className="text-3xl font-bold tracking-tight">Summary</h2>
                <div className="h-1 w-12 bg-cyan-500 rounded-full" />
              </div>

              <div className="space-y-6 relative z-10">
                <div className="flex justify-between items-center text-sm font-medium text-slate-400">
                  <span>Subtotal</span>
                  <span className="text-white font-bold">${total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center text-sm font-medium text-slate-400">
                  <span>Shipping fee</span>
                  <span className="text-cyan-400 font-bold">Complimentary</span>
                </div>
                <div className="h-px bg-white/10 w-full" />
                <div className="flex justify-between items-end">
                  <div className="space-y-1">
                    <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Grand total</span>
                    <p className="text-4xl font-bold text-cyan-400 leading-none tracking-tighter">${total.toLocaleString()}</p>
                  </div>
                </div>
              </div>

              <div className="pt-6 relative z-10">
                <Link 
                  to="/checkout"
                  className="w-full h-16 bg-cyan-500 text-slate-900 rounded-xl font-bold text-sm hover:bg-white transition-all shadow-lg flex items-center justify-center gap-4 group/btn"
                >
                  Begin checkout
                  <ArrowRight size={20} className="transition-transform group-hover/btn:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

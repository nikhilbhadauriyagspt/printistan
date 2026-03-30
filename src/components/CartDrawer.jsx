import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, ArrowRight, ShoppingBag, ShieldCheck, Trash2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { cn } from '../lib/utils';

export default function CartDrawer() {
  const { isCartDrawerOpen, closeCartDrawer, cart, removeFromCart, updateQuantity, cartCount } = useCart();

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const getImagePath = (images) => {
    try {
      const imgs = typeof images === 'string' ? JSON.parse(images) : images;
      if (Array.isArray(imgs) && imgs.length > 0) return `/${imgs[0]}`;
    } catch (e) { }
    return "https://via.placeholder.com/100x100?text=Product";
  };

  return (
    <AnimatePresence>
      {isCartDrawerOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCartDrawer}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[1000]"
          />

          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-0 right-0 bottom-0 w-full sm:w-[500px] bg-white z-[1001] flex flex-col font-jakarta shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="px-8 pt-12 pb-8 bg-white border-b border-slate-50 relative">
              <div className="flex flex-col items-center text-center">
                <h2 className="text-3xl font-black text-slate-900 tracking-tight">
                  Your <span className="text-blue-600">Cart</span>
                </h2>
                <div className="h-1 w-12 bg-blue-600 mt-3 rounded-full" />
                <p className="text-slate-500 text-xs font-bold mt-4 uppercase tracking-widest">
                  {cartCount} solutions selected
                </p>
              </div>
              <button 
                onClick={closeCartDrawer}
                className="absolute top-8 right-8 h-12 w-12 flex items-center justify-center rounded-2xl bg-slate-50 text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-all border border-slate-100"
              >
                <X size={24} />
              </button>
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto px-8 py-10 bg-slate-50/50 custom-scrollbar">
              {cart.length > 0 ? (
                <div className="space-y-8">
                  {cart.map((item) => (
                    <motion.div 
                      layout
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      key={item.id} 
                      className="group flex gap-6 p-5 bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 hover:border-blue-600/20 transition-all duration-500"
                    >
                      <div className="h-24 w-24 bg-slate-50 rounded-2xl flex items-center justify-center flex-shrink-0 p-3 overflow-hidden border border-slate-100 group-hover:bg-white transition-colors">
                        <img 
                          src={getImagePath(item.images)} 
                          alt={item.name}
                          className="max-h-full max-w-full object-contain transition-transform duration-700 group-hover:scale-110"
                        />
                      </div>
                      
                      <div className="flex-1 min-w-0 flex flex-col">
                        <div className="flex justify-between items-start gap-2 mb-1">
                          <Link to={`/product/${item.slug}`} onClick={closeCartDrawer}>
                            <h3 className="text-[14px] font-black text-slate-800 hover:text-blue-600 transition-colors uppercase tracking-wide leading-snug line-clamp-2">{item.name}</h3>
                          </Link>
                          <button 
                            onClick={() => removeFromCart(item.id)} 
                            className="text-slate-300 hover:text-red-500 transition-all p-1 hover:scale-110"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                        
                        <div className="flex items-center justify-between mt-auto pt-3">
                          <div className="flex items-center border border-slate-100 rounded-xl h-10 px-1 bg-slate-50">
                            <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-slate-900 transition-colors"><Minus size={12} /></button>
                            <span className="text-sm font-black w-8 text-center text-slate-900">{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-slate-900 transition-colors"><Plus size={12} /></button>
                          </div>
                          <span className="text-lg font-black text-slate-900 tracking-tight">${(item.price * item.quantity).toLocaleString()}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-8">
                  <div className="h-24 w-24 bg-white rounded-3xl flex items-center justify-center border border-slate-200 shadow-xl shadow-slate-200/50">
                    <ShoppingBag size={40} className="text-slate-200" />
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-2xl font-black text-slate-900">Your bag is empty</h3>
                    <p className="text-slate-500 font-bold max-w-[240px] mx-auto leading-relaxed">Discover our collection of high-performance printing solutions.</p>
                  </div>
                  <Link 
                    to="/shop"
                    onClick={closeCartDrawer}
                    className="inline-flex items-center gap-4 bg-slate-900 text-white h-14 px-12 rounded-full font-black text-xs uppercase tracking-widest hover:bg-blue-600 transition-all shadow-xl active:scale-95"
                  >
                    Start Exploring <ArrowRight size={18} />
                  </Link>
                </div>
              )}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div className="p-8 pb-12 bg-white border-t border-slate-100 shadow-[0_-20px_50px_rgba(0,0,0,0.02)] relative z-10">
                <div className="space-y-4 mb-8">
                  <div className="flex items-center justify-between text-xs font-black text-slate-400 uppercase tracking-widest">
                    <span>Subtotal Valuation</span>
                    <span className="text-slate-900 font-black">${total.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs font-black text-slate-400 uppercase tracking-widest">
                    <span>Logistics</span>
                    <span className="text-blue-600 font-black">Calculated at checkout</span>
                  </div>
                  <div className="pt-6 flex flex-col gap-1">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Estimated Total</span>
                    <div className="flex items-end justify-between">
                      <span className="text-4xl font-black text-slate-900 tracking-tighter">${total.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <Link 
                    to="/checkout"
                    onClick={closeCartDrawer}
                    className="w-full h-16 bg-blue-600 text-white rounded-full font-black text-sm uppercase tracking-widest flex items-center justify-center gap-4 shadow-2xl shadow-blue-100 hover:bg-slate-900 transition-all active:scale-95"
                  >
                    Proceed to checkout
                    <ArrowRight size={20} />
                  </Link>
                  
                  <div className="flex items-center justify-center gap-2 text-slate-400">
                    <ShieldCheck size={16} className="text-blue-600" />
                    <span className="text-[10px] font-black uppercase tracking-[0.2em]">Safe & secure checkout</span>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

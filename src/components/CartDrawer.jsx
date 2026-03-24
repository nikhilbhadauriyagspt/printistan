import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, ArrowRight, ShoppingBag, ShieldCheck } from 'lucide-react';
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
            className="fixed inset-0 bg-slate-900/20 backdrop-blur-[2px] z-[1000]"
          />

          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-0 right-0 bottom-0 w-full sm:w-[480px] bg-white z-[1001] flex flex-col font-jakarta shadow-2xl"
          >
            {/* Header */}
            <div className="px-8 pt-10 pb-6 flex items-center justify-between">
              <div className="space-y-1">
                <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Your cart</h2>
                <div className="flex items-center gap-2">
                  <div className="h-1 w-1 rounded-full bg-cyan-600" />
                  <p className="text-xs font-medium text-slate-400">{cartCount} items selected</p>
                </div>
              </div>
              <button 
                onClick={closeCartDrawer}
                className="h-12 w-12 flex items-center justify-center rounded-full border border-gray-100 text-gray-400 hover:text-slate-900 hover:border-gray-200 transition-all"
              >
                <X size={24} />
              </button>
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto px-8 py-6 custom-scrollbar">
              {cart.length > 0 ? (
                <div className="space-y-10">
                  {cart.map((item) => (
                    <motion.div 
                      layout
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      key={item.id} 
                      className="group flex gap-6 relative"
                    >
                      <div className="h-28 w-28 bg-gray-50 rounded-xl flex items-center justify-center flex-shrink-0 p-4 overflow-hidden border border-gray-100 transition-all group-hover:border-cyan-100">
                        <img 
                          src={getImagePath(item.images)} 
                          alt={item.name}
                          className="max-h-full max-w-full object-contain transition-transform duration-700 group-hover:scale-110"
                        />
                      </div>
                      
                      <div className="flex-1 min-w-0 flex flex-col py-1">
                        <div className="space-y-1">
                          <div className="flex justify-between items-start gap-2">
                            <Link to={`/product/${item.slug}`} onClick={closeCartDrawer}>
                              <h3 className="text-sm font-bold text-slate-900 leading-snug hover:text-cyan-600 transition-colors line-clamp-2">{item.name}</h3>
                            </Link>
                            <button 
                              onClick={() => removeFromCart(item.id)} 
                              className="text-gray-300 hover:text-red-500 transition-colors p-1"
                            >
                              <X size={16} />
                            </button>
                          </div>
                          <p className="text-[11px] font-medium text-slate-400">Professional printer</p>
                        </div>

                        <div className="flex items-center justify-between mt-auto">
                          <div className="flex items-center border border-gray-100 rounded-lg h-9 px-1 bg-gray-50">
                            <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-7 h-7 flex items-center justify-center text-gray-400 hover:text-slate-900 transition-colors"><Minus size={12} /></button>
                            <span className="text-xs font-bold w-7 text-center text-slate-900">{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-7 h-7 flex items-center justify-center text-gray-400 hover:text-slate-900 transition-colors"><Plus size={12} /></button>
                          </div>
                          <span className="text-base font-bold text-slate-900">${(item.price * item.quantity).toLocaleString()}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-6">
                  <div className="h-20 w-20 bg-gray-50 rounded-full flex items-center justify-center border border-gray-100">
                    <ShoppingBag size={32} className="text-gray-300" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-slate-900">Your bag is empty</h3>
                    <p className="text-sm font-medium text-slate-400 max-w-[200px] mx-auto leading-relaxed">Discover our collection of high-performance printers.</p>
                  </div>
                  <Link 
                    to="/shop"
                    onClick={closeCartDrawer}
                    className="inline-flex items-center gap-3 bg-slate-900 text-white h-12 px-10 rounded-lg font-bold text-xs hover:bg-cyan-600 transition-all shadow-lg active:scale-95"
                  >
                    Browse products
                  </Link>
                </div>
              )}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div className="p-8 space-y-6 bg-white border-t border-gray-100">
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs font-medium text-slate-400">
                    <span>Subtotal</span>
                    <span className="text-slate-900 font-bold">${total.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs font-medium text-slate-400">
                    <span>Shipping</span>
                    <span className="text-cyan-600 font-bold">Calculated at checkout</span>
                  </div>
                  <div className="pt-4 flex items-end justify-between border-t border-gray-50">
                    <span className="text-xs font-bold text-slate-900">Total amount</span>
                    <span className="text-3xl font-bold text-slate-900 tracking-tight">${total.toLocaleString()}</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <Link 
                    to="/checkout"
                    onClick={closeCartDrawer}
                    className="w-full h-14 bg-cyan-500 text-slate-900 rounded-xl font-bold text-xs flex items-center justify-center gap-3 shadow-lg shadow-cyan-500/10 hover:bg-slate-900 hover:text-white transition-all"
                  >
                    Proceed to checkout
                    <ArrowRight size={18} />
                  </Link>
                  
                  <div className="flex items-center justify-center gap-2 text-slate-300">
                    <ShieldCheck size={14} />
                    <span className="text-[9px] font-bold uppercase tracking-widest">Safe & secure checkout</span>
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

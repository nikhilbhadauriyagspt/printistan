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
      <div className="bg-white min-h-screen font-jakarta text-slate-900 overflow-x-hidden">
        <SEO title="Empty Cart | Intrix Printers" />
        
        {/* --- PAGE HEADER --- */}
        <section className="pt-24 pb-16 bg-white border-b border-slate-50">
          <div className="w-full px-4 md:px-12 lg:px-20">
            <div className="flex flex-col items-center text-center">
              <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
                Your <span className="text-blue-600">Cart</span>
              </h1>
              <div className="h-1.5 w-24 bg-blue-600 mt-5 rounded-full" />
            </div>
          </div>
        </section>

        <section className="py-20 bg-slate-50 min-h-[60vh] flex items-center justify-center">
          <div className="text-center py-20 bg-white rounded-[40px] border border-slate-200 shadow-xl max-w-4xl mx-auto px-12">
            <div className="h-24 w-24 bg-slate-50 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-inner">
              <ShoppingBag size={48} className="text-slate-200" />
            </div>
            <h2 className="text-3xl font-black text-slate-900 mb-4">Your cart is currently empty</h2>
            <p className="text-slate-500 font-bold mb-10 text-lg leading-relaxed">It looks like you haven't added any professional solutions yet. Explore our catalog to find the perfect printer for your needs.</p>
            <Link to="/shop" className="inline-flex items-center gap-4 bg-blue-600 text-white px-12 py-5 rounded-full font-black text-sm uppercase tracking-widest hover:bg-blue-700 transition-all shadow-xl active:scale-95 group">
              Explore Our Collection <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen font-jakarta text-slate-900 overflow-x-hidden">
      <SEO title="Shopping Cart | Intrix Printers" />
      
      {/* --- PAGE HEADER --- */}
      <section className="pt-24 pb-16 bg-white border-b border-slate-50">
        <div className="w-full px-4 md:px-12 lg:px-20">
          <div className="flex flex-col items-center text-center">
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
              Your <span className="text-blue-600">Cart</span>
            </h1>
            <div className="h-1.5 w-24 bg-blue-600 mt-5 rounded-full" />
            <p className="text-slate-500 text-lg font-bold mt-6 max-w-2xl leading-relaxed">
              Review your professional selection and prepare for secure checkout.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-slate-50 min-h-screen">
        <div className="w-full px-4 md:px-12 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start max-w-[1920px] mx-auto">
            
            {/* --- ITEMS LIST --- */}
            <div className="lg:col-span-8 space-y-8">
              <AnimatePresence mode="popLayout">
                {cart.map((item) => (
                  <motion.div 
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    key={item.id} 
                    className="group flex flex-col md:flex-row gap-10 items-center p-8 bg-white rounded-[40px] border border-slate-200 hover:border-blue-600/20 hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-500"
                  >
                    <div className="h-36 w-36 bg-slate-50 rounded-3xl flex items-center justify-center p-5 border border-slate-100 flex-shrink-0 relative overflow-hidden group-hover:bg-white transition-colors">
                      <img 
                        src={getImagePath(item.images)} 
                        alt={item.name}
                        className="max-h-full max-w-full object-contain transition-transform duration-700 group-hover:scale-110"
                      />
                    </div>

                    <div className="flex-1 min-w-0 flex flex-col w-full h-full">
                      <div className="flex justify-between items-start gap-6">
                        <div className="space-y-2">
                          <Link to={`/product/${item.slug}`}>
                            <h3 className="text-lg font-black text-slate-800 hover:text-blue-600 transition-colors uppercase tracking-wide leading-tight line-clamp-2">{item.name}</h3>
                          </Link>
                          <div className="flex items-center gap-2">
                            <div className="h-1 w-6 bg-blue-100 rounded-full" />
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Professional Unit</p>
                          </div>
                        </div>
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="h-12 w-12 rounded-2xl bg-slate-50 text-slate-300 hover:text-red-500 hover:bg-red-50 transition-all flex items-center justify-center shrink-0 border border-transparent"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>

                      <div className="flex flex-wrap items-center justify-between mt-10 gap-6">
                        <div className="flex items-center border border-slate-100 rounded-2xl h-14 px-1 bg-slate-50">
                          <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-12 h-12 flex items-center justify-center text-slate-400 hover:text-slate-900 transition-colors"><Minus size={16} /></button>
                          <span className="text-lg font-black w-12 text-center text-slate-900">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-12 h-12 flex items-center justify-center text-slate-400 hover:text-slate-900 transition-colors"><Plus size={16} /></button>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-slate-400 font-bold mb-1 uppercase tracking-widest">${parseFloat(item.price).toLocaleString()} per unit</p>
                          <span className="text-3xl font-black text-slate-900 tracking-tighter">${(item.price * item.quantity).toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              <div className="pt-10 flex justify-center">
                <Link to="/shop" className="group inline-flex items-center gap-4 text-sm font-black uppercase tracking-widest text-slate-400 hover:text-blue-600 transition-all">
                  <ChevronLeft size={20} className="transition-transform group-hover:-translate-x-1" />
                  Continue Selection
                </Link>
              </div>
            </div>

            {/* --- SUMMARY CARD --- */}
            <div className="lg:col-span-4">
              <div className="bg-slate-900 rounded-[48px] p-10 md:p-14 text-white space-y-12 sticky top-32 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] overflow-hidden relative border border-slate-800">
                <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl -mr-40 -mt-40" />
                
                <div className="space-y-4 relative z-10">
                  <h2 className="text-3xl font-black tracking-tight uppercase">Valuation</h2>
                  <div className="h-1.5 w-16 bg-blue-600 rounded-full" />
                </div>

                <div className="space-y-8 relative z-10">
                  <div className="flex justify-between items-center text-xs font-black text-slate-400 uppercase tracking-[0.2em]">
                    <span>Subtotal</span>
                    <span className="text-white text-base">${total.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs font-black text-slate-400 uppercase tracking-[0.2em]">
                    <span>Logistics</span>
                    <span className="text-blue-500 text-base">Included</span>
                  </div>
                  <div className="h-px bg-white/10 w-full" />
                  <div className="pt-4 space-y-2">
                    <span className="text-[10px] text-slate-500 font-black uppercase tracking-[0.4em]">Total Investment</span>
                    <p className="text-6xl font-black text-blue-500 leading-none tracking-tighter">${total.toLocaleString()}</p>
                  </div>
                </div>

                <div className="pt-8 relative z-10 space-y-8">
                  <Link 
                    to="/checkout"
                    className="w-full h-18 py-6 bg-blue-600 text-white rounded-full font-black text-sm uppercase tracking-widest hover:bg-white hover:text-slate-900 transition-all shadow-2xl shadow-blue-500/20 flex items-center justify-center gap-4 group/btn"
                  >
                    Proceed to checkout
                    <ArrowRight size={22} className="transition-transform group-hover/btn:translate-x-1" />
                  </Link>

                  <div className="flex items-center justify-center gap-3 text-slate-400 py-2">
                    <ShieldCheck size={20} className="text-blue-600" />
                    <span className="text-[10px] font-black uppercase tracking-[0.3em]">Encrypted Protocol</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}

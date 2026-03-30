import React from 'react';
import { ArrowRight, Sparkles, ShieldCheck, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

// Assets
import banner10 from "@/assets/bannerr/newban1.jpg";
import banner1 from "@/assets/bannerr/banner1.jpg";
import banner6 from "@/assets/bannerr/banner6.jpg";

export default function Collections() {
  return (
    <section className="bg-white py-12 md:py-20 w-full overflow-hidden">
      <div className="w-full px-4 md:px-8">
        
     

        {/* --- BENTO GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-auto md:h-[600px]">
          
          {/* Main Large Card (Left) */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="md:col-span-8 relative group overflow-hidden  border border-slate-100 bg-[#0a0a0b]"
          >
            <div className="absolute inset-0 z-0">
              <img
                src={banner6}
                alt="Flagship Collection"
                className="w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0b] via-[#0a0a0b]/40 to-transparent" />
            </div>

            <div className="relative z-10 h-full p-8 md:p-12 flex flex-col justify-center max-w-xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-500/30 mb-6 w-fit">
                <Sparkles size={12} className="text-blue-400" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-blue-400">Limited Series 2026</span>
              </div>

              <h3 className="text-3xl md:text-5xl font-black text-white leading-tight mb-4">
                High Performance <br />
                <span className="text-blue-500"> Printers</span>
              </h3>

              <p className="text-slate-400 text-sm md:text-base font-medium mb-8 leading-relaxed">
                Experience the next generation of precision printing. Designed for clarity, speed, and heavy-duty office workflows.
              </p>

              <Link
                to="/shop"
                className="inline-flex items-center gap-3 bg-white text-slate-900 px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all active:scale-95 w-fit"
              >
                Explore Now <ArrowRight size={16} />
              </Link>
            </div>
          </motion.div>

          {/* Right Side Stack */}
          <div className="md:col-span-4 flex flex-col gap-6">
            
            {/* Top Small Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex-1 relative group overflow-hidden  border border-slate-100 bg-slate-50"
            >
              <div className="absolute inset-0 z-0">
                <img
                  src={banner1}
                  alt="Elite Accessories"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-slate-900/40 group-hover:bg-slate-900/20 transition-colors" />
              </div>
              
              <div className="relative z-10 h-full p-8 flex flex-col justify-end">
                <h4 className="text-xl font-black text-white uppercase tracking-tight mb-2">Elite Inventory</h4>
                <p className="text-white/80 text-xs font-bold uppercase tracking-widest mb-4">Pro Accessories</p>
                <Link to="/shop" className="text-white flex items-center gap-2 text-xs font-black uppercase tracking-widest group/link">
                  Shop Now <ArrowRight size={14} className="group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>

            {/* Bottom Small Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="flex-1 relative group overflow-hidden  border border-slate-100 bg-blue-600"
            >
              <div className="absolute inset-0 z-0">
                <img
                  src={banner10}
                  alt="Fast Delivery"
                  className="w-full h-full object-cover opacity-30 group-hover:scale-110 transition-transform duration-700"
                />
              </div>

              <div className="relative z-10 h-full p-8 flex flex-col justify-center items-center text-center">
                <div className="h-12 w-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center mb-4">
                  <Zap size={24} className="text-white" />
                </div>
                <h4 className="text-xl font-black text-white uppercase tracking-tight mb-2">Fast Delivery</h4>
                <p className="text-blue-100 text-xs font-bold leading-relaxed max-w-[150px]">
                  Express shipping on all elite printers.
                </p>
              </div>
            </motion.div>

          </div>
        </div>

      </div>
    </section>
  );
}

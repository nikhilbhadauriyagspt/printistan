import React from 'react';
import { Truck, RotateCcw, ShieldCheck, Headphones } from 'lucide-react';
import { motion } from 'framer-motion';

const features = [
  {
    icon: <Truck size={22} />,
    title: "Free Shipping",
    desc: "All US Orders"
  },
  {
    icon: <RotateCcw size={22} />,
    title: "Money Back",
    desc: "7 Day Guarantee"
  },
  {
    icon: <ShieldCheck size={22} />,
    title: "Safe Checkout",
    desc: "100% Secure"
  },
  {
    icon: <Headphones size={22} />,
    title: "Expert Help",
    desc: "24/7 Support"
  }
];

export default function Features() {
  return (
    <section className="w-full bg-white py-12 md:py-16 border-b border-slate-50">
      <div className="w-full px-6 md:px-10 lg:px-20 max-w-7xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-12 gap-x-8 md:gap-x-12">
          {features.map((item, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="flex items-center justify-start lg:justify-center gap-4 md:gap-6 group cursor-default w-full"
            >
              {/* Industrial Bordered Icon Box */}
              <div className="h-14 w-14 md:h-16 md:w-16 shrink-0 rounded-2xl border-2 border-slate-100 flex items-center justify-center text-slate-300 group-hover:border-blue-600 group-hover:text-blue-600 group-hover:bg-blue-50/30 group-hover:shadow-2xl group-hover:shadow-blue-600/10 transition-all duration-500 relative">
                {item.icon}
                {/* Decorative corner dot */}
                <div className="absolute -top-1 -right-1 h-2 w-2 bg-blue-600 rounded-full scale-0 group-hover:scale-100 transition-transform duration-500" />
              </div>

              <div className="flex flex-col min-w-0">
                <h3 className="text-[13px] md:text-[14px] font-black text-slate-900 uppercase tracking-widest leading-none mb-2 group-hover:text-blue-600 transition-colors">
                  {item.title}
                </h3>
                <div className="flex items-center gap-2">
                   <div className="h-[1px] w-3 bg-blue-600 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />
                   <p className="text-slate-400 text-[10px] md:text-[11px] font-black uppercase tracking-[2px] leading-none whitespace-nowrap">
                     {item.desc}
                   </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

import React from 'react';
import { Truck, RotateCcw, ShieldCheck, Headphones, Zap, CreditCard, Award, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '../lib/utils';

const features = [
  {
    icon: <Truck size={22} />,
    title: "Free Express Shipping",
    desc: "On all orders ",
    color: "text-blue-600",
    bg: "bg-blue-50"
  },
  {
    icon: <RotateCcw size={22} />,
    title: "7 Days Easy Return",
    desc: "No questions asked policy",
    color: "text-orange-600",
    bg: "bg-orange-50"
  },
  {
    icon: <ShieldCheck size={22} />,
    title: "Secure Payments",
    desc: "100% SSL protected checkout",
    color: "text-emerald-600",
    bg: "bg-emerald-50"
  },
  {
    icon: <Headphones size={22} />,
    title: "24/7 Support",
    desc: "Help for your needs",
    color: "text-purple-600",
    bg: "bg-purple-50"
  }
];

export default function Features() {
  return (
    <section className="w-full  bg-[#FAF9F6] border-y border-[#E8E6E1] h-[80px] hidden md:flex items-center font-poppins relative overflow-hidden">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full" style={{ backgroundImage: 'radial-gradient(#1A1A1A 1px, transparent 1px)', size: '20px 20px' }} />
      </div>

      <div className="max-w-[1920px] mx-auto px-10 w-full relative z-10">
        <div className="flex items-center justify-between gap-8">
          {features.map((item, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="flex items-center gap-4 group cursor-default"
            >
              <div className={cn(
                "h-12 w-12 rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 shadow-sm border border-white/50",
                item.bg, item.color
              )}>
                {item.icon}
              </div>
              
              <div className="flex flex-col">
                <h3 className="text-[14px] font-bold text-[#1A1A1A] leading-tight group-hover:text-blue-600 transition-colors">
                  {item.title}
                </h3>
                <p className="text-[12px] font-medium text-gray-500 leading-tight mt-0.5">
                  {item.desc}
                </p>
              </div>

              {index !== features.length - 1 && (
                <div className="h-8 w-[1px] bg-gray-200/60 ml-8" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

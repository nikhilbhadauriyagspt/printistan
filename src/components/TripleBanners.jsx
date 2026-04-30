import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight, Zap, Target, PenTool } from 'lucide-react';
import { cn } from '../lib/utils';

// Assets
import png1 from '@/assets/bannerr/png-1.png';
import png2 from '@/assets/bannerr/png-2.png';
import png3 from '@/assets/bannerr/png-3.png';

const banners = [
  {
    id: "01",
    tag: "Pro Series",
    title: "Enterprise Solutions",
    desc: "Laser precision for high-volume printing.",
    image: png1,
    bg: "bg-[#F3F1ED]",
    accent: "text-blue-600",
    link: "/shop?category=laser-printers",
    icon: <Zap size={16} className="text-blue-600" />
  },
  {
    id: "02",
    tag: "Creative",
    title: "Precision Inkjet",
    desc: "Vibrant colors for professional results.",
    image: png2,
    bg: "bg-blue-50/60",
    accent: "text-indigo-600",
    icon: <Target size={16} className="text-indigo-600" />
  },
  {
    id: "03",
    tag: "Essential",
    title: "Inks & Toners",
    desc: "Genuine supplies for flawless prints.",
    image: png3,
    bg: "bg-orange-50/40",
    accent: "text-orange-600",
    icon: <PenTool size={16} className="text-orange-600" />
  }
];

export default function TripleBanners() {
  return (
    <section className="w-full bg-white py-12 md:py-16 font-poppins overflow-hidden">
      <div className="max-w-[1920px] mx-auto px-4 md:px-10">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {banners.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={cn(
                "group relative h-[220px] md:h-[240px] rounded-[2rem] overflow-hidden border border-[#E8E6E1] p-6 md:p-8 flex items-center justify-between",
                item.bg
              )}
            >
              {/* Content Side */}
              <div className="relative z-10 w-[60%] flex flex-col justify-center h-full">
                <div className="flex items-center gap-2 mb-3">
                  <div className="h-8 w-8 rounded-xl bg-white flex items-center justify-center shadow-sm">
                    {item.icon}
                  </div>
                  <span className="text-[12px] font-bold text-gray-500 uppercase tracking-wider">{item.tag}</span>
                </div>
                
                <h3 className="text-xl md:text-2xl font-bold text-[#1A1A1A] leading-tight mb-2">
                  {item.title}
                </h3>
                <p className="text-[13px] text-gray-500 font-medium leading-tight mb-5 line-clamp-1">
                  {item.desc}
                </p>
                
                <Link 
                  to={item.link || "/shop"} 
                  className="group/link flex items-center gap-2 text-[13px] font-bold text-[#1A1A1A] hover:text-blue-600 transition-colors w-fit"
                >
                  Shop Now 
                  <ChevronRight size={16} className="group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </div>

              {/* Image Side */}
              <div className="relative w-[40%] h-full flex items-center justify-center pointer-events-none">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  width={300}
                  height={240}
                  className="max-w-full max-h-[85%] object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-700 ease-out"
                />
              </div>

              {/* Subtle Decorative Gradient */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

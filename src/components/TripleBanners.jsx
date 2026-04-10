import React from 'react';
import { Link } from 'react-router-dom';
import { MoveRight, Zap, Scan, Shield } from 'lucide-react';

// Assets
import trip1 from '@/assets/bannerr/trip1.jpg';
import trip2 from '@/assets/bannerr/trip2.jpg';
import trip3 from '@/assets/bannerr/trip3.jpg';

const banners = [
  {
    id: "01",
    title: "Workforce Pro Series",
    subtitle: "Enterprise Solutions",
    desc: "Industrial-grade efficiency designed for high-volume corporate environments.",
    image: trip1,
    icon: <Zap size={18} />
  },
  {
    id: "02",
    title: "Precision Laser Tech",
    subtitle: "Advanced Documentation",
    desc: "Next-gen thermal imaging for crystal clear documentation and accuracy.",
    image: trip2,
    icon: <Scan size={18} />
  },
  {
    id: "03",
    title: "Supply Eco System",
    subtitle: "Authentic Components",
    desc: "Authentic manufacturer components ensuring peak mechanical longevity.",
    image: trip3,
    icon: <Shield size={18} />
  }
];

export default function TripleBanners() {
  return (
    <section className="w-full bg-white py-12 md:py-20">
      <div className="w-full px-4 md:px-10 lg:px-16 max-w-[1920px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {banners.map((item) => (
            <Link 
              key={item.id}
              to="/shop"
              className="group relative h-[350px] md:h-[480px] overflow-hidden border border-slate-100 flex flex-col justify-end"
            >
              {/* Background Image Layer */}
              <div className="absolute inset-0">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent" />
              </div>

              {/* Top Meta Info */}
              <div className="absolute top-0 left-0 w-full p-6 md:p-8 flex justify-between items-start z-20">
                <span className="text-[11px] font-bold text-white/60 tracking-widest font-mono">
                  /{item.id}
                </span>
                <div className="text-blue-400">
                  {item.icon}
                </div>
              </div>

              {/* Content Layer - Now always visible */}
              <div className="relative p-6 md:p-8 z-20 space-y-4">
                <div className="space-y-1.5">
                  <p className="text-[10px] font-bold text-blue-400 tracking-wider">
                    {item.subtitle}
                  </p>
                  <h3 className="text-xl md:text-2xl font-black text-white leading-tight">
                    {item.title}
                  </h3>
                </div>

                <p className="text-slate-300 text-[13px] md:text-[14px] font-medium leading-relaxed max-w-[280px]">
                  {item.desc}
                </p>

                <div className="pt-2 flex items-center gap-3 text-white text-[11px] font-black uppercase tracking-widest group-hover:text-blue-400 transition-colors">
                  Explore Collection
                  <MoveRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

              {/* Decorative Accent */}
              <div className="absolute bottom-0 left-0 w-full h-1 bg-blue-600 opacity-50 group-hover:opacity-100 transition-opacity" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

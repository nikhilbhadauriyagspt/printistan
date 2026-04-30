import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import promoImg from '@/assets/bannerr/png-6.png';

export default function PromoBanner() {
  return (
    <section className="w-full bg-white py-8 md:py-12 font-poppins">
      <div className="max-w-[1920px] mx-auto px-4 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="relative h-[280px] md:h-[320px] rounded-[2rem] bg-[#F3F1ED] border border-[#E8E6E1] overflow-hidden group flex items-center"
        >
          {/* Content Side */}
          <div className="relative z-10 w-full md:w-1/2 p-8 md:p-16">
            <span className="text-[11px] font-bold text-blue-600 uppercase tracking-[0.2em] mb-3 block">
              Limited Time Offer
            </span>
            <h2 className="text-2xl md:text-4xl font-bold text-[#1A1A1A] leading-tight mb-4">
              Reliable Office Printers <br />
              Up to 25% Off.
            </h2>
            <p className="text-[14px] text-gray-500 font-medium mb-8 max-w-sm hidden md:block">
              Upgrade your workspace with our latest high-performance laser series.
            </p>
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 bg-[#1A1A1A] hover:bg-blue-600 text-white px-8 py-3.5 rounded-xl font-bold text-[14px] transition-all group/btn"
            >
              Shop Now
              <ChevronRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Image Side - Simple & Clean */}
          <div className="absolute right-0 top-0 w-1/2 h-full hidden md:flex items-center justify-end pr-10 lg:pr-20">
            <img
              src={promoImg}
              alt="Promo"
              width={600}
              height={320}
              loading="lazy"
              className="h-[105%] w-auto object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-700"
            />
          </div>

          {/* Subtle Accent */}
          <div className="absolute bottom-0 right-0 w-1/3 h-1 bg-blue-600" />
        </motion.div>
      </div>
    </section>
  );
}

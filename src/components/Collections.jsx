import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Box, Layers, Zap } from 'lucide-react';
import colImg from "@/assets/bannerr/col.png";
import promoImg from "@/assets/bannerr/ban4.png";
import bannerImg from "@/assets/bannerr/banner6.png";

const collectionData = [
  {
    title: "Home Office Set",
    desc: "Everything you need for a productive home workspace.",
    image: colImg,
    link: "/shop?category=inkjet-printers",
    tag: "Essential"
  },
  {
    title: "Enterprise Hub",
    desc: "High-volume solutions for growing businesses.",
    image: promoImg,
    link: "/shop?category=laser-printers",
    tag: "Professional"
  },
  {
    title: "Creative Studio",
    desc: "Vibrant photo printing for design professionals.",
    image: bannerImg,
    link: "/shop?category=photo-printers",
    tag: "Premium"
  }
];

export default function Collections() {
  return (
    <section className="w-full bg-white py-20 font-poppins overflow-hidden">
      <div className="max-w-[1920px] mx-auto px-4 md:px-10">
        
        {/* --- Header Section --- */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-600 rounded-lg text-[11px] font-bold mb-4 uppercase tracking-widest">
             <Layers size={14} />
             <span>Curated Sets</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-[#1A1A1A]  mb-4">
            Exclusive <span className="text-blue-600">Collections</span>
          </h2>
          <p className="text-gray-500 text-[15px] font-medium leading-relaxed">
            Handpicked printer and accessory bundles tailored for your specific needs.
          </p>
        </div>

        {/* --- Collections Grid --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {collectionData.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative flex flex-col rounded-[2.5rem] overflow-hidden bg-[#FAF9F6] border border-[#E8E6E1] hover:border-blue-500/20 transition-all duration-500"
            >
              {/* Image Container */}
              <div className="relative h-[280px] overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  width={600}
                  height={280}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Tag */}
                <div className="absolute top-6 left-6 px-4 py-1.5 bg-white/90 backdrop-blur-md rounded-full text-[11px] font-bold text-[#1A1A1A] shadow-sm uppercase tracking-widest">
                  {item.tag}
                </div>
              </div>

              {/* Content Section */}
              <div className="p-10 flex flex-col items-center text-center">
                <h3 className="text-2xl font-bold text-[#1A1A1A] mb-3 group-hover:text-blue-600 transition-colors">
                  {item.title}
                </h3>
                <p className="text-[14px] text-gray-500 font-medium leading-relaxed mb-8 max-w-[280px]">
                  {item.desc}
                </p>
                
                <Link 
                  to={item.link} 
                  className="inline-flex items-center gap-3 text-[14px] font-bold text-[#1A1A1A] border-b-2 border-[#1A1A1A] pb-1 hover:text-blue-600 hover:border-blue-600 transition-all group/link"
                >
                  View Collection 
                  <ArrowRight size={18} className="group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </div>

              {/* Decorative Corner Element */}
              <div className="absolute bottom-0 right-0 w-24 h-24 bg-blue-600/5 rounded-tl-[3rem] -z-0" />
            </motion.div>
          ))}
        </div>

      

      </div>
    </section>
  );
}

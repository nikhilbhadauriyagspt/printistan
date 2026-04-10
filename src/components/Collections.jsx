import React from 'react';
import { motion } from "framer-motion";

// Assets
import banner6 from "@/assets/bannerr/banner6.png";

export default function Collections() {
  return (
    <section className="bg-white">
      <div className="w-full">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative w-full h-[80px] md:h-[400px] overflow-hidden bg-slate-900"
        >
          {/* Background Image with Overlay */}
          <div className="absolute inset-0">
            <img
              src={banner6}
              alt="Elite Collection"
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

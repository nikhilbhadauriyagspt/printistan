import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, Award, Users, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AboutSection() {
  const points = [
    { title: "Reliable Quality", desc: "We choose only the best printers and genuine ink from brands you know and trust.", icon: <Award className="text-blue-600" size={20} /> },
    { title: "Expert Support", desc: "Our skilled team is here 24/7 to assist you in finding the right printer for your needs.", icon: <Users className="text-blue-600" size={20} /> },
    { title: "Fast Shipping", desc: "With our quick delivery system, we make sure your new gear arrives at your door on time.", icon: <Zap className="text-blue-600" size={20} /> },
  ];

  return (
    <section className="w-full py-20 bg-white overflow-hidden font-poppins">
      <div className="max-w-[1920px] mx-auto px-4 md:px-10">
        <div className="flex flex-col lg:flex-row items-center gap-16 md:gap-24">
          
          {/* Image Side */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="w-full lg:w-1/2 relative"
          >
            <div className="relative z-10 rounded-[2.5rem] overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.1)] border-8 border-white">
              <img
                src="/category/all-in-one-printers.jpg"
                alt="High-performance imaging device"
                width={800}
                height={600}
                loading="eager"
                className="w-full h-auto object-cover hover:scale-105 transition-transform duration-700"
              />            </div>
            
            {/* Decorative Elements */}
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-blue-50 rounded-full -z-0 blur-3xl opacity-60" />
            <div className="absolute -bottom-10 -right-10 w-60 h-60 bg-cream-50 rounded-full -z-0 blur-3xl opacity-60" style={{ backgroundColor: '#FAF9F6' }} />
            
           
          </motion.div>

          {/* Content Side */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="w-full lg:w-1/2"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full text-blue-600 text-[13px] font-bold mb-6">
              <span className="h-2 w-2 bg-blue-600 rounded-full animate-pulse" />
              Our Commitment to Excellence
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-[#1A1A1A] leading-[1.1] mb-8">
              Better Printing for Your <span className="text-blue-600">Home and Office.</span>
            </h2>
            
            <h3 className="text-lg md:text-xl font-semibold text-gray-700 mb-6 leading-relaxed">
              Printistan is your trusted source for modern printers. We offer simple plans to make your work clear and fast.
            </h3>

            <p className="text-[16px] text-gray-600 font-medium leading-relaxed mb-6">
              We know that finding the right printer can be hard. That is why we focus on giving you the best tools for your home or office. Our team selects top-rated devices and genuine ink to ensure you get great results every time. Whether you need a simple desk printer or a large office machine, we are here to assist you in choosing the right fit.
            </p>

            <p className="text-[16px] text-gray-600 font-medium leading-relaxed mb-10">
              Our commitment to you starts with quality. We only sell brands we trust, ensuring that your equipment lasts for years. We also provide expert support to make sure your setup runs smoothly. From setup advice to finding the right toner, our team is just a click away. At Printistan, we believe that great technology should be simple to use and easy to find. We offer fast shipping across the USA so you can get back to work quickly.
            </p>

            <div className="grid gap-6 mb-12">
              {points.map((point, idx) => (
                <div key={idx} className="flex items-start gap-4 group">
                  <div className="h-10 w-10 shrink-0 bg-[#F3F1ED] rounded-xl flex items-center justify-center">
                    {point.icon}
                  </div>
                  <div>
                    <h4 className="text-[16px] font-bold text-[#1A1A1A] mb-1">{point.title}</h4>
                    <p className="text-[14px] text-gray-500 font-medium leading-snug">{point.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <Link 
              to="/about" 
              className="inline-flex items-center gap-3 bg-[#1A1A1A] hover:bg-blue-600 text-white px-8 py-4 rounded-2xl font-bold transition-all duration-300 group shadow-xl shadow-gray-200"
            >
              Explore Our Vision
              <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
            </Link>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

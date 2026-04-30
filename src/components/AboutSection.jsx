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
                loading="lazy"
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
              Reliable printing solutions for your home and office.
            </h3>

            <p className="text-[16px] text-gray-600 font-medium leading-relaxed mb-6">
              Finding the right imaging device should be a simple process. At Printistan, we focus on providing high-quality hardware for every documentation need. Our team hand-picks top-rated machines and genuine supplies to ensure your work always looks its best. Whether you need a small desk unit or a robust system for a busy workplace, we have the tools to help you succeed.
            </p>

            <p className="text-[16px] text-gray-600 font-medium leading-relaxed mb-6">
              We are dedicated to your satisfaction from the moment you browse our shop. Our catalog features trusted brands that stand for durability and performance. We don't just sell equipment; we offer a complete support experience. Our experts are ready to provide guidance on setup, maintenance, and finding the perfect ink or toner for your specific model.
            </p>

            <p className="text-[16px] text-gray-600 font-medium leading-relaxed mb-10">
              In today's fast-paced world, clear and efficient documentation is vital. That's why we prioritize speed and reliability in our shipping and service. We offer quick delivery across the USA, ensuring that your new technology arrives ready to work. By choosing us, you are investing in a partner committed to your long-term operational success and professional growth. We believe in making high-end technology accessible to everyone, regardless of their technical background.
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

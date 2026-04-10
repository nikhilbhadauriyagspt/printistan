import React from 'react';
import { Link } from 'react-router-dom';
import { HeadphonesIcon, MessageSquare, ArrowRight, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export default function SupportCTA() {
  return (
    <section className="w-full bg-white py-12 md:py-20">
      <div className="w-full px-4 md:px-10 lg:px-16 max-w-[1920px] mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative overflow-hidden bg-slate-900 rounded-[3rem] p-10 md:p-20 text-white"
        >
          {/* Decorative Background Elements */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] -mr-64 -mt-64" />
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-blue-500/10 rounded-full blur-[80px] -ml-32 -mb-32" />
          
          <div className="relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto space-y-10">
            
          
            
            <div className="space-y-6">
              <h2 className="text-2xl md:text-5xl font-black  leading-none">
                Need Help Selecting The <br />
                <span className="text-blue-500 text-slate-300">Perfect Printer?</span>
              </h2>
              <p className="text-slate-400 text-lg md:text-xl font-medium max-w-2xl mx-auto leading-relaxed">
                Our specialized  team is ready to guide you through our industrial-grade specifications to find the ideal match for your specific workflow needs.
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-6 pt-4">
              <Link 
                to="/contact" 
                className="bg-white text-slate-900 h-16 px-14 rounded-2xl flex items-center justify-center font-black text-[11px] uppercase tracking-[0.2em] hover:bg-blue-600 hover:text-white transition-all shadow-2xl active:scale-95 group"
              >
                Consult Specialist
                <ArrowRight size={18} className="ml-3 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                to="/faq" 
                className="h-16 px-14 rounded-2xl flex items-center justify-center font-black text-[11px] uppercase tracking-[0.2em] border-2 border-slate-800 hover:bg-slate-800 transition-all active:scale-95"
              >
                View Knowledge Base
              </Link>
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
}

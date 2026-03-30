import React from 'react';
import { Shield, Zap, Heart, ArrowRight, Printer, Info, CheckCircle2, Award, Users, Target } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '@/components/SEO';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <div className="bg-white min-h-screen font-jakarta text-slate-900 overflow-x-hidden">
      <SEO 
        title="About Inktrix Printers | Our Mission & Values"
        description="Learn aboutInktrix Printers and our commitment to providing reliable, high-quality printing solutions for professionals."
      />

      {/* --- PAGE HEADER --- */}
      <section className="pt-24 pb-16 bg-white border-b border-slate-50">
        <div className="w-full px-4 md:px-12 lg:px-20">
          <div className="flex flex-col items-center text-center">
            <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight">
              About <span className="text-blue-600">Inktrix Printers</span>
            </h1>
            <div className="h-1.5 w-24 bg-blue-600 mt-6 rounded-full" />
            <p className="text-slate-500 text-lg font-bold mt-8 max-w-3xl leading-relaxed">
              We specialize in providing high-performance printers and professional supplies designed to meet the demands of modern business environments.
            </p>
          </div>
        </div>
      </section>

      {/* --- CORE FOCUS (Full Width) --- */}
      <section className="py-20 bg-slate-50">
        <div className="w-full px-4 md:px-12 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="inline-flex items-center gap-2 text-blue-600 font-black text-sm">
                <Target size={20} /> Our Mission
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 leading-tight">
                Quality printing solutions <span className="text-blue-600">delivered with precision.</span>
              </h2>
              <p className="text-slate-600 font-medium leading-relaxed text-lg">
                Our objective is simple: to provide reliable, enterprise-grade printing equipment that minimizes downtime and maximizes productivity. We understand that in a professional setting, every print counts. That's why we only offer products that have been tested for consistency and durability.
              </p>
              <ul className="space-y-4 pt-4">
                {[
                  "Sourcing only from industry-leading manufacturers.",
                  "Rigorous quality control on all printers and supplies.",
                  "Comprehensive expert specifications for informed decisions.",
                  "Dedicated focus on long-term equipment reliability."
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-slate-700 font-bold">
                    <CheckCircle2 size={18} className="text-blue-600 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="space-y-8"
            >
              <div className="inline-flex items-center gap-2 text-blue-600 font-black text-sm">
                <Award size={20} /> Our Standards
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 leading-tight">
                Commitment to <span className="text-blue-600">Professional Excellence.</span>
              </h2>
              <p className="text-slate-600 font-medium leading-relaxed text-lg">
                We maintain high standards for our entire inventory. From high-volume office printers to specialized wide-format machines, we ensure that every piece of printer meets the rigorous requirements of our professional clientele. Our vision is to be the premier source for printing technology that professionals can trust.
              </p>
              <div className="p-8 bg-white rounded-3xl border border-slate-200 shadow-sm">
                <h4 className="text-xl font-black text-slate-900 mb-4 flex items-center gap-2">
                  <Info size={20} className="text-blue-600" /> Professional Support
                </h4>
                <p className="text-slate-500 font-medium leading-relaxed">
                  Our expert team is available to assist with product selection, ensuring you get the exact specifications required for your workspace. We don't just sell equipment; we provide the foundation for your office's documentation workflow.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- SERVICE PILLARS (Full Width) --- */}
      <section className="py-24 bg-white">
        <div className="w-full px-4 md:px-12 lg:px-20">
          <div className="text-center mb-16">
             <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-6">Service Pillars</h2>
             <div className="h-1.5 w-20 bg-blue-600 mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: <Printer size={28} />, title: "Precision Printers", desc: "Enterprise-grade printers selected for their mechanical integrity and output quality." },
              { icon: <Shield size={28} />, title: "Reliable Supplies", desc: "Direct access to original consumables that ensure optimal machine performance." },
              { icon: <Zap size={28} />, title: "Efficient Workflow", desc: "Tools and accessories designed to streamline your office's daily printing tasks." },
              { icon: <Heart size={28} />, title: "Client Focused", desc: "A dedicated approach to ensuring every client receives the right solution for their needs." }
            ].map((item, idx) => (
              <div key={idx} className="p-10 rounded-3xl bg-slate-50 border border-slate-100 hover:border-blue-200 hover:bg-white hover:shadow-xl transition-all group">
                <div className="h-14 w-14 rounded-2xl bg-blue-600 flex items-center justify-center text-white mb-8 group-hover:scale-110 transition-transform shadow-lg shadow-blue-100">
                  {item.icon}
                </div>
                <h4 className="text-xl font-black text-slate-900 mb-4">{item.title}</h4>
                <p className="text-slate-500 font-medium leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- CALL TO ACTION --- */}
      <section className="py-24 bg-slate-50">
        <div className="w-full px-4 md:px-12 lg:px-20">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="max-w-3xl space-y-6 text-center lg:text-left">
              <h2 className="text-4xl md:text-3xl font-black leading-tight">
                Enhance your printing <span className="text-blue-500">infrastructure today.</span>
              </h2>
              <p className="text-slate-400 text-lg font-medium">
                Explore our curated collection of professional printers and supplies, or contact our team for expert guidance on your next printing acquisition.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-6 shrink-0 w-full lg:w-auto">
              <Link 
                to="/shop" 
                className="inline-flex items-center justify-center gap-3 bg-blue-600 text-white px-12 py-5 rounded-full font-black text-sm hover:bg-blue-700 transition-all shadow-xl active:scale-95"
              >
                Browse Inventory <ArrowRight size={18} />
              </Link>
              <Link 
                to="/contact" 
                className="inline-flex items-center justify-center gap-3 bg-transparent border-2  px-12 py-5 rounded-full font-black text-sm hover:bg-white hover:text-slate-900 transition-all active:scale-95"
              >
                Contact Support
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;

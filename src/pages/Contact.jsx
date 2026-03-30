import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SEO from '@/components/SEO';
import { Mail, CheckCircle2, Loader2, ChevronDown, Send, Globe, MapPin, Phone } from 'lucide-react';
import API_BASE_URL from '../config';
import { cn } from '../lib/utils';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General question',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      const response = await fetch(`${API_BASE_URL}/contacts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      if (data.status === 'success') {
        setStatus('success');
        setFormData({ name: '', email: '', phone: '', subject: 'General question', message: '' });
      } else {
        setStatus('error');
      }
    } catch (err) {
      setStatus('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white min-h-screen font-jakarta text-slate-900 overflow-x-hidden">
      <SEO 
        title="Contact Us |Inktrix Printers" 
        description="Connect withInktrix Printers. Our professional team is here to assist with your printing requirements."
      />
      
      {/* --- PAGE HEADER (Home Page Style) --- */}
      <section className="pt-24 pb-16 bg-white border-b border-slate-50">
        <div className="w-full px-4 md:px-12 lg:px-20">
          <div className="flex flex-col items-center text-center">
            <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight">
              Contact <span className="text-blue-600">Us</span>
            </h1>
            <div className="h-1.5 w-24 bg-blue-600 mt-6 rounded-full" />
            <p className="text-slate-500 text-lg font-bold mt-8 max-w-3xl leading-relaxed">
              Have questions about our professional printing solutions? Our support team is ready to assist you with any inquiries.
            </p>
          </div>
        </div>
      </section>

      {/* --- CONTENT GRID (Full Width) --- */}
      <section className="py-20 bg-slate-50">
        <div className="w-full px-4 md:px-12 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            
            {/* LEFT: INFO CARDS */}
            <div className="lg:col-span-4 space-y-8">
              <div className="space-y-6">
                <h3 className="text-3xl font-black text-slate-900 leading-tight">
                  Get in <span className="text-blue-600">touch</span>
                </h3>
                <p className="text-slate-600 font-medium leading-relaxed">
                  Connect with us through any of our official channels. We aim to respond to all professional inquiries within 24 business hours.
                </p>
              </div>
                
              <div className="grid gap-6">
                {[
                  { icon: <Mail size={22} />, label: "Email support", val: "info@inktrixprinters.shop", link: "mailto:info@inktrixprinters.shop" },
                  { icon: <MapPin size={22} />, label: "Visit our office", val: "1800 Surveyor Blvd, Carrollton, TX 75006, USA", link: "#" }
                  
                ].map((item, i) => (
                  <div key={i} className="p-8 bg-white rounded-3xl border border-slate-200 shadow-sm flex items-start gap-6 group hover:border-blue-600 transition-all duration-300">
                    <div className="h-12 w-12 rounded-2xl bg-blue-600 flex items-center justify-center text-white shrink-0 group-hover:scale-110 transition-transform shadow-lg shadow-blue-100">
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-sm font-black text-slate-400 mb-1">{item.label}</p>
                      {item.link !== "#" ? (
                        <a href={item.link} className="text-lg font-black text-slate-900 break-all hover:text-blue-600 transition-colors">{item.val}</a>
                      ) : (
                        <p className="text-lg font-black text-slate-900">{item.val}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT: CONTACT FORM */}
            <div className="lg:col-span-8">
              <div className="bg-white p-8 md:p-16 rounded-[40px] border border-slate-200 shadow-2xl shadow-slate-200/50">
                <AnimatePresence mode="wait">
                  {status === 'success' ? (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-12"
                    >
                      <div className="h-24 w-24 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner shadow-blue-100">
                        <CheckCircle2 size={48} />
                      </div>
                      <h2 className="text-3xl font-black text-slate-900 mb-4">Message received successfully</h2>
                      <p className="text-slate-500 mb-10 max-w-sm mx-auto font-bold text-lg leading-relaxed">Thank you for reaching out. Our  team will review your inquiry and get back to you shortly.</p>
                      <button 
                        onClick={() => setStatus(null)} 
                        className="bg-blue-600 text-white px-12 py-5 rounded-full font-black text-sm transition-all hover:bg-blue-700 shadow-xl shadow-blue-100"
                      >
                        Send another message
                      </button>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-10">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-3">
                          <label className="text-sm font-black text-slate-900 ml-1">Full Name</label>
                          <input 
                            required type="text" placeholder="Enter your name" value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                            className="w-full h-16 px-8 bg-slate-50 border border-slate-200 rounded-2xl focus:border-blue-600 focus:bg-white outline-none text-base font-bold transition-all placeholder:text-slate-300"
                          />
                        </div>
                        <div className="space-y-3">
                          <label className="text-sm font-black text-slate-900 ml-1">Email Address</label>
                          <input 
                            required type="email" placeholder="example@business.com" value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                            className="w-full h-16 px-8 bg-slate-50 border border-slate-200 rounded-2xl focus:border-blue-600 focus:bg-white outline-none text-base font-bold transition-all placeholder:text-slate-300"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-3">
                          <label className="text-sm font-black text-slate-900 ml-1">Phone (Optional)</label>
                          <input 
                            type="tel" placeholder="+1 (000) 000-0000" value={formData.phone}
                            onChange={(e) => setFormData({...formData, phone: e.target.value})}
                            className="w-full h-16 px-8 bg-slate-50 border border-slate-200 rounded-2xl focus:border-blue-600 focus:bg-white outline-none text-base font-bold transition-all placeholder:text-slate-300"
                          />
                        </div>
                        <div className="space-y-3">
                          <label className="text-sm font-black text-slate-900 ml-1">Inquiry Type</label>
                          <div className="relative">
                            <select 
                              value={formData.subject}
                              onChange={(e) => setFormData({...formData, subject: e.target.value})}
                              className="w-full h-16 px-8 bg-slate-50 border border-slate-200 rounded-2xl focus:border-blue-600 focus:bg-white outline-none text-base font-bold transition-all appearance-none cursor-pointer"
                            >
                              <option>General question</option>
                              <option>Product support</option>
                              <option>Order help</option>
                              <option>Other</option>
                            </select>
                            <ChevronDown className="absolute right-8 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={20} />
                          </div>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <label className="text-sm font-black text-slate-900 ml-1">Detailed Message</label>
                        <textarea 
                          required rows="5" placeholder="Please describe your requirements..." value={formData.message}
                          onChange={(e) => setFormData({...formData, message: e.target.value})}
                          className="w-full p-8 bg-slate-50 border border-slate-200 rounded-2xl focus:border-blue-600 focus:bg-white outline-none text-base font-bold transition-all resize-none min-h-[180px] placeholder:text-slate-300"
                        ></textarea>
                      </div>

                      <div className="pt-4">
                        <button 
                          disabled={loading}
                          className="w-full md:w-auto inline-flex items-center justify-center gap-4 bg-slate-900 text-white h-16 px-16 rounded-full font-black text-sm transition-all hover:bg-blue-600 shadow-2xl shadow-slate-900/10 active:scale-95 disabled:opacity-50 group"
                        >
                          {loading ? <Loader2 size={20} className="animate-spin" /> : "Submit Message"}
                          {!loading && <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />}
                        </button>
                      </div>
                      {status === 'error' && <p className="text-red-600 text-sm font-black mt-6">Failed to send message. Please verify your connection and try again.</p>}
                    </form>
                  )}
                </AnimatePresence>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}

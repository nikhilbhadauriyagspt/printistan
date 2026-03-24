import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SEO from '@/components/SEO';
import { Mail, CheckCircle2, Loader2, ArrowRight, ChevronDown, Send, Globe, Phone } from 'lucide-react';
import API_BASE_URL from '../config';

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
    <div className="bg-white min-h-screen font-jakarta text-slate-900 overflow-x-hidden ">
      <SEO 
        title="Contact Us | Larry Printing Solutions" 
        description="Connect with Larry Printing Solutions. Our friendly team is here to help you."
      />
      
      {/* --- HERO HEADER --- */}
      <section className="relative pt-12 pb-16 px-4 md:px-10 bg-gray-50">
        <div className="max-w-[1200px] mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20">
            <span className="text-xs font-bold text-cyan-600">Get in touch</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-slate-900 leading-tight">
            How can we <span className="text-cyan-600">help you?</span>
          </h1>
          <p className="text-base text-slate-500 font-medium max-w-lg mx-auto">
            Our team is here to listen and help you find exactly what you're looking for. Reach out to us for any questions or support.
          </p>
        </div>
      </section>

      {/* --- MAIN CONTACT CONTENT --- */}
      <section className="py-16 md:py-24 px-4 md:px-10">
        <div className="max-w-[1200px] mx-auto">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
            
            {/* LEFT: INFO PILLS */}
            <div className="lg:col-span-4 space-y-8">
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-slate-900">Direct contact</h2>
                <p className="text-sm text-slate-500 font-medium leading-relaxed">
                  Prefer to reach out directly? Use the information below to get in touch with our team.
                </p>
              </div>

              <div className="space-y-4">
                {[
                  { icon: <Mail />, title: "Email us", value: "info@larryprintingsolutions.shop" },
                  { icon: <Globe />, title: "Visit us", value: "3106 E Camelback Rd, Phoenix, AZ 85016, USA" }
                ].map((card, i) => (
                  <div 
                    key={i}
                    className="flex items-start gap-4 p-6 rounded-xl bg-gray-50 border border-gray-100 transition-colors hover:border-cyan-500"
                  >
                    <div className="h-10 w-10 shrink-0 rounded bg-white border border-gray-100 text-cyan-600 flex items-center justify-center shadow-sm">
                      {React.cloneElement(card.icon, { size: 18, strokeWidth: 1.5 })}
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] font-bold text-slate-400 mb-1">{card.title}</p>
                      <p className="text-sm font-bold text-slate-900">{card.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT: CONTACT FORM */}
            <div className="lg:col-span-8">
              <div className="bg-white p-6 md:p-10 border border-gray-100 shadow-xl shadow-slate-200/20">
                <AnimatePresence mode="wait">
                  {status === 'success' ? (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-16"
                    >
                      <div className="h-20 w-20 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle2 size={32} />
                      </div>
                      <h2 className="text-2xl font-bold text-slate-900 mb-3">Message received</h2>
                      <p className="text-slate-500 mb-8 max-w-sm mx-auto font-medium">Thank you for reaching out. Our team will get back to you shortly.</p>
                      <button 
                        onClick={() => setStatus(null)} 
                        className="text-xs font-bold text-cyan-600 hover:text-cyan-700 transition-colors"
                      >
                        Send another message
                      </button>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-8">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold text-slate-500 ml-1">Your name</label>
                          <input 
                            required type="text" placeholder="John Doe" value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                            className="w-full h-12 px-4 bg-gray-50 border border-gray-100 rounded-lg focus:border-cyan-600 outline-none text-sm font-medium transition-all"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold text-slate-500 ml-1">Email address</label>
                          <input 
                            required type="email" placeholder="john@example.com" value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                            className="w-full h-12 px-4 bg-gray-50 border border-gray-100 rounded-lg focus:border-cyan-600 outline-none text-sm font-medium transition-all"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold text-slate-500 ml-1">Phone number (optional)</label>
                          <input 
                            type="tel" placeholder="+1 (555) 000-0000" value={formData.phone}
                            onChange={(e) => setFormData({...formData, phone: e.target.value})}
                            className="w-full h-12 px-4 bg-gray-50 border border-gray-100 rounded-lg focus:border-cyan-600 outline-none text-sm font-medium transition-all"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold text-slate-500 ml-1">Subject</label>
                          <div className="relative">
                            <select 
                              value={formData.subject}
                              onChange={(e) => setFormData({...formData, subject: e.target.value})}
                              className="w-full h-12 px-4 bg-gray-50 border border-gray-100 rounded-lg focus:border-cyan-600 outline-none text-sm font-medium transition-all appearance-none cursor-pointer"
                            >
                              <option>General question</option>
                              <option>Product support</option>
                              <option>Order help</option>
                              <option>Other</option>
                            </select>
                            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={16} />
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-slate-500 ml-1">Your message</label>
                        <textarea 
                          required rows="4" placeholder="How can we help you today?" value={formData.message}
                          onChange={(e) => setFormData({...formData, message: e.target.value})}
                          className="w-full p-4 bg-gray-50 border border-gray-100 rounded-lg focus:border-cyan-600 outline-none text-sm font-medium transition-all resize-none min-h-[120px]"
                        ></textarea>
                      </div>

                      <div className="pt-2">
                        <button 
                          disabled={loading}
                          className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-slate-900 text-white h-12 px-10 rounded font-bold text-xs uppercase tracking-widest hover:bg-cyan-600 transition-all shadow-lg active:scale-95 disabled:opacity-50"
                        >
                          {loading ? <Loader2 size={16} className="animate-spin" /> : "Send message"}
                          {!loading && <Send size={16} />}
                        </button>
                      </div>
                      {status === 'error' && <p className="text-red-600 text-xs font-bold mt-4">Failed to send message. Please try again.</p>}
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

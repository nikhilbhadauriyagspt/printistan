import { Link } from 'react-router-dom';
import { Mail, Loader2, MapPin, Sparkles, MoveRight, Shield, Globe, Zap, CreditCard } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import API_BASE_URL from '../config';
import { cn } from '../lib/utils';
import { motion } from 'framer-motion';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const { showToast } = useCart();

  useEffect(() => {
    fetch(`${API_BASE_URL}/categories`)
      .then(res => res.json())
      .then(data => {
        if (data.status === 'success') {
          const flat = data.data.flatMap(cat => [cat, ...(cat.children || [])]);
          const unique = Array.from(new Map(flat.map(item => [item.slug, item])).values())
            .filter(cat => 
              !cat.name.toLowerCase().includes('laptop') && 
              !cat.slug.toLowerCase().includes('laptop') &&
              !cat.name.toLowerCase().includes('chromebook')
            )
            .slice(0, 6);
          setCategories(unique);
        }
      });
  }, []);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/newsletter`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      const data = await response.json();
      if (data.status === 'success') {
        showToast(data.message, 'success');
        setEmail('');
      } else {
        showToast(data.message, 'info');
      }
    } catch (err) {
      showToast('Failed to subscribe. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="bg-white text-slate-900 pt-12 pb-10 font-jakarta border-t border-slate-100 relative overflow-hidden">
      {/* Subtle Background Glows (Light Mode) */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />

      <div className="w-full px-4 md:px-10 lg:px-16 relative z-10">
        
        {/* --- TOP SECTION: BRAND & NEWSLETTER (BENTO STYLE) --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-10">
          {/* Brand Card */}
          <div className="lg:col-span-9 bg-slate-50 border border-slate-100 rounded-[1.5rem] p-6 md:p-8 group hover:border-blue-600/30 hover:bg-white hover:shadow-xl hover:shadow-blue-500/5  duration-500 flex flex-col justify-center">
            <Link to="/" className="inline-block mb-4 ">
              <img src="/logo/logo.png" alt="Inktrix Printers" className="h-12 w-auto object-contain" />
            </Link>
            <p className="text-slate-500 text-[14px] font-medium leading-relaxed max-w-3xl mb-6">
              Reliable printers and essential supplies for your daily needs. Quality printer and expert support directly to your doorstep. Delivering excellence across the USA with high-performance solutions.
            </p>
           
          </div>

          {/* Newsletter Card (Slim & Far Right) */}
          <div className="lg:col-span-3 bg-slate-50 border border-slate-100 rounded-[1.5rem] p-6 hover:border-blue-600/30 hover:bg-white hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-500 flex flex-col justify-center">
            <div className="w-full">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles size={12} className="text-blue-600" />
                <h3 className="text-[9px] font-black uppercase tracking-[0.2em] text-blue-600">Join the Elite</h3>
              </div>
              <h2 className="text-lg font-black mb-4 tracking-tight text-slate-900 leading-tight">Stay updated with  our <span className="text-blue-600">latest news.</span></h2>
              
              <form onSubmit={handleSubscribe} className="flex flex-col gap-2 w-full group">
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                  <input
                    required type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                    placeholder="EMAIL"
                    className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-2 text-[9px] font-black uppercase tracking-widest outline-none focus:border-blue-600/50 transition-all text-slate-900 placeholder:text-slate-400"
                  />
                </div>
                <button
                  disabled={loading}
                  className="w-full h-[40px] bg-blue-600 text-white rounded-xl flex items-center justify-center hover:bg-blue-700 transition-all shrink-0 shadow-lg shadow-blue-500/10 active:scale-95 text-[10px] font-black uppercase tracking-widest"
                >
                  {loading ? <Loader2 className="animate-spin" size={16} /> : "Subscribe"}
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* --- LINKS SECTION: BENTO GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          
          {/* Address Box */}
          <div className="bg-slate-50 border border-slate-100 rounded-3xl p-8 hover:border-blue-600/20 hover:bg-white hover:shadow-lg hover:shadow-blue-500/5 transition-all group">
            <h4 className="text-[11px] font-black text-blue-600 uppercase tracking-[0.25em] mb-8">Direct Access</h4>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-xl bg-white flex items-center justify-center shrink-0 border border-slate-200 group-hover:bg-blue-600 group-hover:border-blue-600 group-hover:text-white transition-all">
                   <MapPin size={16} className="text-blue-600 group-hover:text-white" />
                </div>
                <p className="text-[13px] font-bold text-slate-500 leading-relaxed group-hover:text-slate-900">1800 Surveyor Blvd, Carrollton, TX 75006, USA</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-xl bg-white flex items-center justify-center shrink-0 border border-slate-200 group-hover:bg-blue-600 group-hover:border-blue-600 group-hover:text-white transition-all">
                   <Mail size={16} className="text-blue-600 group-hover:text-white" />
                </div>
                <a href="mailto:info@inktrixprinters.shop" className="text-[13px] font-bold text-slate-500 hover:text-blue-600 transition-all truncate">info@inktrixprinters.shop</a>
              </div>
            </div>
          </div>

          {/* Printers Box */}
          <div className="bg-slate-50 border border-slate-100 rounded-3xl p-8 hover:border-blue-600/20 hover:bg-white hover:shadow-lg hover:shadow-blue-500/5 transition-all group">
            <h4 className="text-[11px] font-black text-blue-600 uppercase tracking-[0.25em] mb-8">Printers</h4>
            <ul className="space-y-4">
              {categories.map(cat => (
                <li key={cat.id}>
                  <Link to={`/shop?category=${cat.slug}`} className="text-slate-500 hover:text-blue-600 transition-all text-[12px] font-bold uppercase tracking-wider flex items-center gap-3 group/link">
                    <div className="h-[2px] w-2 bg-blue-600/30 group-hover/link:w-4 group-hover/link:bg-blue-600 transition-all" />
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Box */}
          <div className="bg-slate-50 border border-slate-100 rounded-3xl p-8 hover:border-blue-600/20 hover:bg-white hover:shadow-lg hover:shadow-blue-500/5 transition-all group">
            <h4 className="text-[11px] font-black text-blue-600 uppercase tracking-[0.25em] mb-8">Company</h4>
            <ul className="space-y-4">
              {[
                { name: 'About us', path: '/about' },
                { name: 'Contact us', path: '/contact' },
                { name: 'FAQs', path: '/faq' },
                { name: 'Track order', path: '/orders' }
              ].map(item => (
                <li key={item.name}>
                  <Link to={item.path} className="text-slate-500 hover:text-blue-600 transition-all text-[12px] font-bold uppercase tracking-wider flex items-center gap-3 group/link">
                    <div className="h-[2px] w-2 bg-blue-600/30 group-hover/link:w-4 group-hover/link:bg-blue-500 transition-all" />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Box */}
          <div className="bg-slate-50 border border-slate-100 rounded-3xl p-8 hover:border-blue-600/20 hover:bg-white hover:shadow-lg hover:shadow-blue-500/5 transition-all group">
            <h4 className="text-[11px] font-black text-blue-600 uppercase tracking-[0.25em] mb-8">Legal</h4>
            <ul className="space-y-4">
              {[
                { name: 'Privacy policy', path: '/privacy-policy' },
                { name: 'Terms & conditions', path: '/terms-and-conditions' },
                { name: 'Return policy', path: '/return-policy' },
                { name: 'Shipping policy', path: '/shipping-policy' },
                { name: 'Cookie policy', path: '/cookie-policy' }
              ].map(item => (
                <li key={item.name}>
                  <Link to={item.path} className="text-slate-500 hover:text-blue-600 transition-all text-[12px] font-bold uppercase tracking-wider flex items-center gap-3 group/link">
                    <div className="h-[2px] w-2 bg-blue-600/30 group-hover/link:w-4 group-hover/link:bg-blue-500 transition-all" />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* --- FOOTER BOTTOM: TRUST & LEGAL --- */}
        <div className="flex flex-col lg:flex-row justify-between items-center gap-8  ">
          <div className="flex flex-col items-center lg:items-start gap-4">
            <p className="text-[11px] text-slate-400 font-black uppercase tracking-[0.2em]">
              © 2026Inktrix Printers. All rights reserved.
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center items-center">
            <div className="flex items-center gap-3 bg-slate-50 px-5 py-3 rounded-2xl border border-slate-100">
               <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-5 opacity-80" />
            </div>
           
           
          </div>
        </div>

        {/* --- DISCLAIMER --- */}
        <div className="mt-12 text-center max-w-4xl mx-auto ">
         
          <p className="text-slate-400 text-[11px] font-bold uppercase tracking-widest leading-relaxed max-w-3xl mx-auto">
            Disclaimer: For informational purposes only. No software installation or distribution.
          </p>
        </div>
      </div>
    </footer>
  );
}



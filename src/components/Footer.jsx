import { Link } from 'react-router-dom';
import { Mail, Loader2, MapPin, Sparkles, ShieldCheck, ArrowRight, Phone, Send } from 'lucide-react';
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
            .slice(0, 5);
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

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'Track Orders', path: '/orders' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact', path: '/contact' },
    { name: 'FAQ', path: '/faq' },
  ];

  const legalLinks = [
    { name: 'Privacy Policy', path: '/privacy-policy' },
    { name: 'Terms of Service', path: '/terms-and-conditions' },
    { name: 'Return Policy', path: '/return-policy' },
    { name: 'Shipping Policy', path: '/shipping-policy' },
    { name: 'Cookie Policy', path: '/cookie-policy' },
  ];

  return (
    <footer className="bg-white text-slate-900 pt-20 pb-10 font-jakarta overflow-hidden relative border-t border-slate-100">
     
      
      <div className="w-full px-4 md:px-10 lg:px-16 max-w-[1920px] mx-auto">
        
        {/* --- TOP SECTION: BRAND & NEWSLETTER --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-20 items-center">
          <div className="lg:col-span-5 space-y-6">
            <Link to="/" className="inline-block group">
              <img src="/logo/logo.png" alt="Printer Loop" className="h-12 md:h-16 w-auto" />
            </Link>
            <p className="text-slate-500 text-sm md:text-base font-medium leading-relaxed max-w-md">
              Delivering high-performance industrial printing solutions nationwide. Engineered for precision, built for reliability, and supported by experts.
            </p>
          </div>

          <div className="lg:col-span-7 bg-slate-50 border border-slate-100 p-8 md:p-10 rounded-[2.5rem] relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 rounded-full blur-3xl -mr-16 -mt-16 transition-colors" />
            
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="space-y-2 text-center md:text-left">
                <h3 className="text-xl md:text-2xl font-black  ">Stay Updated.</h3>
                <p className="text-slate-500 text-xs md:text-sm font-medium  tracking-wider">Subscribe for exclusive insights and new arrivals.</p>
              </div>
              
              <form onSubmit={handleSubscribe} className="flex gap-2 w-full max-w-md">
                <input
                  required type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 bg-white border border-slate-200 rounded-xl px-6 py-4 text-sm font-bold outline-none focus:border-blue-500 transition-all placeholder:text-slate-300 shadow-sm"
                />
                <button
                  disabled={loading}
                  className="h-14 w-14 bg-slate-900 text-white rounded-xl flex items-center justify-center hover:bg-blue-600 transition-all shadow-lg active:scale-95 shrink-0"
                >
                  {loading ? <Loader2 className="animate-spin" size={20} /> : <Send size={20} />}
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* --- MAIN LINKS GRID --- */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-12 gap-12 mb-20 border-t border-slate-100 pt-20">
          
          {/* Quick Links Column */}
          <div className="lg:col-span-3">
            <h4 className="text-[11px] font-black uppercase tracking-[3px] text-blue-600 mb-8">Quick Menu</h4>
            <ul className="space-y-4">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="text-slate-500 hover:text-blue-600 text-[13px] font-black transition-all flex items-center gap-3 group">
                    <span className="h-[2px] w-0 bg-blue-600 group-hover:w-4 transition-all duration-300" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories Column */}
          <div className="lg:col-span-3">
            <h4 className="text-[11px] font-black uppercase tracking-[3px] text-blue-600 mb-8">Collections</h4>
            <ul className="space-y-4">
              {categories.map((cat) => (
                <li key={cat.id}>
                  <Link to={`/shop?category=${cat.slug}`} className="text-slate-500 hover:text-blue-600 text-[13px] font-black  transition-all flex items-center gap-3 group">
                    <span className="h-[2px] w-0 bg-blue-600 group-hover:w-4 transition-all duration-300" />
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal/Support Column */}
          <div className="lg:col-span-3">
            <h4 className="text-[11px] font-black uppercase tracking-[3px] text-blue-600 mb-8">Assistance</h4>
            <ul className="space-y-4">
              {legalLinks.map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="text-slate-500 hover:text-blue-600 text-[13px] font-black  transition-all flex items-center gap-3 group">
                    <span className="h-[2px] w-0 bg-blue-600 group-hover:w-4 transition-all duration-300" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div className="lg:col-span-3 space-y-8">
            <h4 className="text-[11px] font-black uppercase tracking-[3px] text-blue-600 mb-8">Contact Us</h4>
            <div className="space-y-6">
               <div className="flex items-start gap-4 group">
                  <div className="h-10 w-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 shadow-sm">
                    <MapPin size={18} />
                  </div>
                  <span className="text-[13px] font-bold text-slate-600 leading-relaxed  ">
                    1311 N Hancock St Philadelphia, PA 19122, USA
                  </span>
               </div>
               <div className="flex items-center gap-4 group">
                  <div className="h-10 w-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 shadow-sm">
                    <Mail size={18} />
                  </div>
                  <a href="mailto:info@printerloop.shop" className="text-[15px] font-black text-slate-900 hover:text-blue-600 transition-colors  ">
                    info@printerloop.shop
                  </a>
               </div>
            </div>
          </div>
        </div>

        {/* --- BOTTOM SECTION --- */}
        <div className="pt-10 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left">
          <div className="flex flex-col gap-2">
            <p className="text-[10px] text-slate-400 font-black uppercase tracking-[3px]">
              © 2026 Printer Loop. All rights reserved.
            </p>
          </div>
          
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-3 py-2 px-4 bg-slate-50 rounded-xl border border-slate-100 shadow-sm">
               <ShieldCheck size={16} className="text-blue-600" />
               <span className="text-[10px] font-black text-slate-900 uppercase tracking-widest leading-none">SSL Secure</span>
            </div>
            <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-5 opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500" />
          </div>
        </div>

        <div className="mt-10 text-center border-t border-slate-50 pt-8">
           <p className="text-slate-300 text-[9px] font-bold uppercase tracking-[2px]">
              For informational purposes only. No software distribution.
           </p>
        </div>
      </div>
    </footer>
  );
}

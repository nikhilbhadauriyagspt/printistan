import { Link } from 'react-router-dom';
import { Mail, MapPin, ShieldCheck, Loader2, ChevronRight, Zap } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import API_BASE_URL from '../config';

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
      showToast('Failed to subscribe.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop All', path: '/shop' },
    { name: 'Track Order', path: '/orders' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const legalLinks = [
    { name: 'Privacy Policy', path: '/privacy-policy' },
    { name: 'Terms of Service', path: '/terms-and-conditions' },
    { name: 'Return Policy', path: '/return-policy' },
    { name: 'Shipping Policy', path: '/shipping-policy' },
    { name: 'Cookie Policy', path: '/cookie-policy' },
  ];

  return (
    <footer className="bg-[#1A1A1A] text-[#FAF9F6] pt-20 pb-10 font-poppins relative overflow-hidden">
      {/* Subtle Background Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-white/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-[1920px] mx-auto px-4 md:px-10 lg:px-20 relative z-10">
        
        {/* --- TOP ROW: NEWSLETTER --- */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10 pb-16 mb-16 border-b border-white/10">
          <div className="max-w-xl text-center lg:text-left">
           
            <h3 className="text-3xl md:text-4xl  text-white  mb-3">Join Our Newsletter</h3>
            <p className="text-gray-300 text-[14px] font-medium leading-relaxed">
              Subscribe to get the latest updates on printing technology and exclusive offers.
            </p>
          </div>

          <form onSubmit={handleSubscribe} className="w-full max-w-lg flex flex-col sm:flex-row items-center gap-3 bg-white/5 p-2 rounded-[1.5rem] border border-white/10 focus-within:border-blue-500/50 transition-all backdrop-blur-md">
            <div className="flex-1 flex items-center gap-3 px-4 w-full">
              <Mail size={20} className="text-gray-400" />
              <input
                required type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                aria-label="Email Address for Newsletter"
                className="w-full bg-transparent py-3 text-[14px] font-medium text-white outline-none placeholder:text-gray-500"
              />
            </div>
            <button
              disabled={loading}
              aria-label="Subscribe to Newsletter"
              className="w-full sm:w-auto bg-blue-600 text-white px-8 py-3.5 rounded-xl text-[14px] font-bold hover:bg-white hover:text-[#1A1A1A] transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              {loading ? <Loader2 className="animate-spin" size={18} /> : "Subscribe"}
            </button>
          </form>
        </div>

        {/* --- MAIN GRID --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 mb-16">
          
          {/* Column 1: Brand */}
          <div className="lg:col-span-2 pr-0 lg:pr-12">
            <Link to="/" aria-label="Printistan Home">
              <img 
                src="/logo/logo.png" 
                alt="Printistan" 
                width={200}
                height={48}
                className="h-10 md:h-12 mb-6 invert brightness-0" 
              />
            </Link>
            <p className="text-gray-300 max-w-sm text-[14px] leading-relaxed font-medium mb-8">
              Your trusted partner for high-quality printers, inks, and accessories. 
              We are dedicated to providing the best printing solutions with uncompromising support.
            </p>
            
          </div>

          {/* Column 2: Navigation */}
          <div>
            <h4 className="text-[16px] font-bold text-white mb-6">Quick Links</h4>
            <ul className="space-y-4">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="text-gray-400 hover:text-white text-[14px] font-medium transition-colors flex items-center gap-2 group">
                    <span className="w-1 h-1 rounded-full bg-blue-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Categories */}
          <div>
            <h4 className="text-[16px] font-bold text-white mb-6">Top Categories</h4>
            <ul className="space-y-4">
              {categories.map((cat) => (
                <li key={cat.id}>
                  <Link to={`/shop?category=${cat.slug}`} className="text-gray-400 hover:text-white text-[14px] font-medium transition-colors flex items-center gap-2 group capitalize">
                    <span className="w-1 h-1 rounded-full bg-blue-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div>
            <h4 className="text-[16px] font-bold text-white mb-6">Get in Touch</h4>
            <ul className="space-y-5">
               <li>
                 <a href="mailto:info@printistan.shop" className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors group">
                    <div className="h-10 w-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                      <Mail size={18} />
                    </div>
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-0.5">Email Support</p>
                      <p className="text-[14px] font-bold text-white">info@printistan.shop</p>
                    </div>
                 </a>
               </li>
               <li>
                 <div className="flex items-center gap-3 text-gray-400">
                    <div className="h-10 w-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0">
                      <MapPin size={18} />
                    </div>
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-0.5">Location</p>
                      <p className="text-[13px] font-medium text-white leading-snug">
                        3001 27th St N, Birmingham, AL 35207, USA
                      </p>
                    </div>
                 </div>
               </li>
            </ul>
          </div>
        </div>

        {/* --- BOTTOM SECTION & LEGAL --- */}
        <div className="pt-8 border-t border-white/10 flex flex-col lg:flex-row justify-between items-center gap-6">
          <div className="flex flex-wrap justify-center lg:justify-start gap-4 md:gap-6">
            {legalLinks.map((link) => (
               <Link key={link.name} to={link.path} className="text-gray-400 hover:text-white text-[12px] font-bold transition-colors">
                 {link.name}
               </Link>
            ))}
          </div>
          
          <div className="flex items-center gap-4">
            <span className="text-[12px] font-bold text-gray-400">Secure Payments via</span>
            <span className="text-white font-bold text-[14px]">PayPal</span>
          </div>        </div>

        <div className="mt-8 flex flex-col md:flex-row items-center justify-between gap-4">
           <p className="text-[13px] font-medium text-gray-400">
             © {new Date().getFullYear()} Printistan. All rights reserved.
           </p>
           
           {/* DISCLAIMER */}
           <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest text-center md:text-right max-w-xl">
             Disclaimer - For Informational only. No software installation or distribution.
           </p>
        </div>

      </div>
    </footer>
  );
}

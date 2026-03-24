import { Link } from 'react-router-dom';
import { Mail, Loader2, MapPin, Sparkles, MoveRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import API_BASE_URL from '../config';
import { cn } from '../lib/utils';

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
    <footer className="bg-slate-900 text-white pt-12 pb-8 font-jakarta">
      <div className="w-full px-4 md:px-10">
        
        {/* --- TOP SECTION --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-10 pb-10 border-b border-white/10">
          <div className="lg:col-span-4 space-y-4">
            <Link to="/" className="inline-block">
              <img src="/logo/logo.png" alt="Larry Printing Solutions" className="h-13 w-auto object-contain brightness-0 invert" />
            </Link>
            <p className="text-gray-400 text-sm font-medium leading-relaxed max-w-sm">
              Reliable printers and essential supplies for your daily needs. 
              Quality printer and expert support directly to your doorstep.
            </p>
          </div>

          <div className="lg:col-span-8 flex flex-col md:flex-row items-center justify-end gap-6 md:gap-12">
            <div className="space-y-1 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-2">
                <Sparkles size={14} className="text-cyan-400" />
                <h3 className="text-sm font-bold">Stay updated</h3>
              </div>
              <p className="text-xs text-gray-400 font-medium">Join our community for the latest news.</p>
            </div>
            <form onSubmit={handleSubscribe} className="flex items-center gap-2 w-full md:w-auto">
              <input
                required type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 md:w-60 bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-xs outline-none focus:border-cyan-500 transition-all text-white"
              />
              <button
                disabled={loading}
                className="h-10 w-10 bg-cyan-500 text-slate-900 rounded-lg flex items-center justify-center hover:bg-white transition-all shrink-0"
              >
                {loading ? <Loader2 className="animate-spin" size={16} /> : <MoveRight size={18} />}
              </button>
            </form>
          </div>
        </div>

        {/* --- LINKS SECTION --- */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-cyan-400">Address</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin size={14} className="text-cyan-400 shrink-0 mt-0.5" />
                <p className="text-[13px] font-medium text-gray-400 leading-relaxed">3106 E Camelback Rd, Phoenix, AZ 85016, USA</p>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={14} className="text-cyan-400 shrink-0" />
                <p className="text-[13px] font-medium text-gray-400">info@larryprintingsolutions.shop</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-xs font-bold text-cyan-400">Printers</h4>
            <ul className="space-y-2">
              {categories.map(cat => (
                <li key={cat.id}>
                  <Link to={`/shop?category=${cat.slug}`} className="text-gray-400 hover:text-cyan-400 transition-all text-[13px] font-medium">
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-xs font-bold text-cyan-400">Company</h4>
            <ul className="space-y-2">
              {[
                { name: 'About us', path: '/about' },
                { name: 'Contact us', path: '/contact' },
                { name: 'FAQs', path: '/faq' },
                { name: 'Track order', path: '/orders' }
              ].map(item => (
                <li key={item.name}>
                  <Link to={item.path} className="text-gray-400 hover:text-cyan-400 transition-all text-[13px] font-medium">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-xs font-bold text-cyan-400">Legal</h4>
            <ul className="space-y-2">
              {[
                { name: 'Privacy policy', path: '/privacy-policy' },
                { name: 'Terms & conditions', path: '/terms-and-conditions' },
                { name: 'Return policy', path: '/return-policy' },
                { name: 'Shipping policy', path: '/shipping-policy' },
                { name: 'Cookie policy', path: '/cookie-policy' }
              ].map(item => (
                <li key={item.name}>
                  <Link to={item.path} className="text-gray-400 hover:text-cyan-400 transition-all text-[13px] font-medium">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* --- FOOTER BOTTOM --- */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-8 border-t border-white/10">
          <p className="text-xs text-white-500 font-medium">
            © 2026 Larry Printing Solutions. All rights reserved.
          </p>
          
          <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-6  transition-all" />
        </div>

        {/* --- DISCLAIMER --- */}
        <div className="mt-8 text-center">
          <p className="text-white-500 text-[15px] font-medium">
            Disclaimer: For informational purposes only. No software installation or distribution.
          </p>
        </div>
      </div>
    </footer>
  );
}

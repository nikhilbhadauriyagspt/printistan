import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { useCart } from '../context/CartContext';
import API_BASE_URL from '../config';
import { 
  Search, 
  User, 
  Heart, 
  ShoppingCart,
  Menu,
  X,
  ArrowRight,
  Loader2,
  ChevronDown,
  MapPin,
  Mail,
  History
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../lib/utils';

export default function Header() {
  const { cartCount, wishlistCount, openCartDrawer } = useCart();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isAllDropdownOpen, setIsAllDropdownOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState({ products: [] });
  const [isSearching, setIsSearching] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const navigate = useNavigate();
  const location = useLocation();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/categories`);
        const data = await res.json();
        if (data.status === 'success') {
          const allCats = data.data.flatMap(parent => parent.children || []);
          const printerCats = allCats.filter(cat => {
            const name = cat.name.toLowerCase();
            return !name.includes('laptop') && !name.includes('computer');
          });
          setCategories(printerCats);
        }
      } catch (err) {
        console.error('Category Fetch Error:', err);
      }
    };
    fetchCategories();
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsAllDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (searchQuery.trim().length > 0) {
        setIsSearching(true);
        try {
          const pRes = await fetch(`${API_BASE_URL}/products?search=${encodeURIComponent(searchQuery)}&limit=5`);
          const pData = await pRes.json();
          if (pData.status === 'success') {
            setSuggestions({ products: pData.data || [] });
          }
        } catch (err) { 
          console.error('Search Error:', err); 
        } finally { 
          setIsSearching(false); 
        }
      } else {
        setSuggestions({ products: [] });
      }
    };
    const timeoutId = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  const handleSearch = (e) => {
    if (e) e.preventDefault();
    if (searchQuery.trim()) {
      let url = `/shop?search=${encodeURIComponent(searchQuery.trim())}`;
      if (selectedCategory !== 'All') {
        const cat = categories.find(c => c.name === selectedCategory);
        if (cat) url += `&category=${cat.slug}`;
      }
      navigate(url);
      setSearchQuery('');
    }
  };

  useEffect(() => {
    const checkUser = () => {
      try {
        const storedUser = localStorage.getItem('user');
        if (!storedUser || storedUser === 'undefined') {
          setUser(null);
          return;
        }
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser && parsedUser.role !== 'admin' ? parsedUser : null);
      } catch (e) {
        setUser(null);
      }
    };
    checkUser();
    window.addEventListener('storage', checkUser);
    return () => window.removeEventListener('storage', checkUser);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop'},
    { name: 'Track Order', path: '/orders' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
    { name: 'FAQ', path: '/faq' },
  ];

  return (
    <>
      <header className="w-full z-[100] font-sans text-white relative">
        {/* --- TOP ROW: AMAZON STYLE --- */}
        <div className="bg-slate-900 px-2 md:px-4 py-1.5 flex items-center justify-between gap-2 md:gap-4 h-14 md:h-16">
          
          {/* Logo Section */}
          <div className="flex items-center gap-1">
            <Link to="/" className="flex items-center p-2 shrink-0">
              <img src="/logo/logo.png" alt="Larry Printing Solutions" className="h-10 md:h-12 w-auto object-contain brightness-0 invert" />
            </Link>
          </div>

          {/* Search Bar */}
          <div className="flex-1 flex justify-center relative max-w-4xl group">
            <form onSubmit={handleSearch} className="w-full flex items-center bg-white rounded-md overflow-hidden h-9 md:h-10 focus-within:ring-2 focus-within:ring-cyan-500 transition-all">
              <div className="relative hidden md:block">
                <select 
                  className="bg-gray-100 text-gray-700 text-[12px] h-full px-3 border-r border-gray-300 outline-none cursor-pointer hover:bg-gray-200 transition-colors"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <option>All</option>
                  {categories.map(cat => (
                    <option key={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>
              
              <input 
                type="text" 
                placeholder="Search printers, scanners, ink cartridges..." 
                className="flex-1 bg-transparent px-4 py-2 text-[14px] text-slate-900 outline-none placeholder:text-gray-400"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              
              <button type="submit" className="bg-cyan-500 hover:bg-cyan-600 text-slate-900 px-4 md:px-5 flex items-center justify-center transition-colors h-full">
                <Search size={22} strokeWidth={2.5} />
              </button>
            </form>

            {/* SEARCH SUGGESTIONS */}
            <AnimatePresence>
              {searchQuery.length > 0 && (
                <motion.div 
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="absolute top-full left-0 w-full bg-white shadow-xl rounded-b-md overflow-hidden z-[110] border border-gray-200 mt-0.5"
                >
                  <div className="p-2 space-y-1">
                    {isSearching ? (
                      <div className="flex items-center justify-center py-6 gap-3">
                        <Loader2 size={18} className="animate-spin text-cyan-600" />
                        <span className="text-[12px] text-slate-500 font-medium">Searching...</span>
                      </div>
                    ) : suggestions.products.length > 0 ? (
                      <>
                        {suggestions.products.map(p => {
                          const rawImg = p.images ? (typeof p.images === 'string' ? JSON.parse(p.images)[0] : p.images[0]) : '';
                          const imageSrc = rawImg && !rawImg.startsWith('http') && !rawImg.startsWith('/') ? `/${rawImg}` : rawImg;
                          return (
                            <Link 
                              key={p.id} to={`/product/${p.slug}`} onClick={() => setSearchQuery('')}
                              className="flex items-center gap-4 p-2 hover:bg-slate-50 transition-all border-b border-gray-50 last:border-0"
                            >
                              <div className="h-10 w-10 bg-white flex items-center justify-center shrink-0">
                                <img src={imageSrc} className="max-h-full max-w-full object-contain" alt="" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <h4 className="text-[13px] font-medium text-slate-800 line-clamp-1">{p.name}</h4>
                                <p className="text-[11px] font-bold text-cyan-700">${p.price}</p>
                              </div>
                            </Link>
                          );
                        })}
                      </>
                    ) : (
                      <div className="py-6 text-center text-[12px] text-slate-400">No results found</div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-0 md:gap-1 ml-2">
            <Link to={user ? "/profile" : "/login"} className="p-2 hover:outline hover:outline-1 hover:outline-white rounded-sm flex flex-col justify-center min-w-max hidden sm:flex">
              <span className="text-[11px] text-gray-400 leading-tight">Hello, {user?.name ? user.name.split(' ')[0] : 'sign in'}</span>
              <span className="text-[13px] font-bold leading-tight flex items-center gap-0.5">
                Account & Lists <ChevronDown size={12} />
              </span>
            </Link>

            <Link to="/wishlist" className="p-2 hover:outline hover:outline-1 hover:outline-white rounded-sm flex flex-col justify-center min-w-max hidden md:flex">
              <span className="text-[11px] text-gray-400 leading-tight">Wishlist</span>
              <span className="text-[13px] font-bold leading-tight"> & Saved Items</span>
            </Link>

            <button onClick={openCartDrawer} className="p-2 hover:outline hover:outline-1 hover:outline-white rounded-sm flex items-end gap-1 relative">
              <div className="relative">
                <ShoppingCart size={24} strokeWidth={1.5} className="text-white" />
                <span className="absolute -top-1.5 left-1/2 -translate-x-1/2 text-cyan-500 text-[14px] font-bold leading-none bg-slate-900 px-0.5">
                  {cartCount}
                </span>
              </div>
              <span className="text-[13px] font-bold hidden md:block mb-0.5">Cart</span>
            </button>
            
            <button onClick={() => setIsSidebarOpen(true)} className="lg:hidden p-2 hover:outline hover:outline-1 hover:outline-white rounded-sm ml-1">
              <Menu size={26} />
            </button>
          </div>
        </div>

        {/* --- SECOND ROW: SUB NAVIGATION --- */}
        <div className="bg-cyan-600 px-4 py-1.5 flex items-center gap-4 text-[13px] font-medium relative">
            <div className="relative" ref={dropdownRef}>
                <button 
                  onClick={() => setIsAllDropdownOpen(!isAllDropdownOpen)}
                  className={cn(
                    "flex items-center gap-1 py-1 px-2 hover:outline hover:outline-1 hover:outline-white rounded-sm font-bold transition-all",
                    isAllDropdownOpen && "outline outline-1 outline-white"
                  )}
                >
                  <Menu size={18} />
                Categories
                </button>

                {/* --- CATEGORY DROPDOWN --- */}
                <AnimatePresence>
                    {isAllDropdownOpen && (
                        <motion.div 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            className="absolute top-full left-0 mt-1 w-[280px] bg-white text-slate-900 shadow-2xl rounded-md overflow-hidden z-[450] border border-gray-200"
                        >
                            <div className="bg-slate-50 px-4 py-3 border-b border-gray-100">
                                <h3 className="text-xs font-black uppercase tracking-widest text-slate-400">Shop By Category</h3>
                            </div>
                            <div className="max-h-[400px] overflow-y-auto py-2">
                                {categories.map(cat => (
                                    <Link 
                                        key={cat.id} 
                                        to={`/shop?category=${cat.slug}`} 
                                        onClick={() => setIsAllDropdownOpen(false)}
                                        className="flex items-center justify-between px-4 py-2.5 hover:bg-slate-50 hover:text-cyan-600 transition-colors text-[14px] font-semibold"
                                    >
                                        {cat.name}
                                        <ArrowRight size={14} className="text-slate-300" />
                                    </Link>
                                ))}
                                <div className="border-t border-gray-100 mt-2 pt-2">
                                    <Link to="/shop" onClick={() => setIsAllDropdownOpen(false)} className="block px-4 py-2.5 text-cyan-600 font-bold hover:bg-slate-50">See All Products</Link>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
            
            <div className="flex items-center gap-1 h-full">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  to={link.path} 
                  className={cn(
                    "py-1 px-2 hover:outline hover:outline-1 hover:outline-white rounded-sm transition-all",
                    location.pathname === link.path ? "font-bold text-white" : "text-gray-200"
                  )}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            <div className="hidden lg:flex items-center gap-4 ml-auto">
              <div className="flex items-center gap-1 py-1 px-2 text-gray-300">
                <Mail size={14} className="text-cyan-400" />
                <span className="text-[12px]">info@larryprintingsolutions.shop</span>
              </div>
            </div>
        </div>
      </header>

      {/* --- MOBILE SIDEBAR (Still sidebar for mobile UX) --- */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsSidebarOpen(false)} className="fixed inset-0 z-[200] bg-black/60" />
            <motion.div 
              initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }} 
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed top-0 left-0 bottom-0 w-[80%] max-w-[350px] bg-white z-[210] flex flex-col shadow-2xl text-slate-900"
            >
              <div className="bg-slate-800 text-white p-6 flex flex-col gap-2">
                <div className="flex justify-between items-center mb-2">
                   <div className="flex items-center gap-2">
                      <User size={24} className="bg-gray-200 text-slate-800 rounded-full p-0.5" />
                      <span className="text-[18px] font-bold">Hello, {user ? user.name : 'Sign in'}</span>
                   </div>
                   <button onClick={() => setIsSidebarOpen(false)}><X size={24} /></button>
                </div>
              </div>
              <div className="flex-1 overflow-y-auto py-4">
                <div className="px-6 py-4 border-b border-gray-100">
                  <h3 className="text-[16px] font-bold mb-2">Shop By Category</h3>
                  <div className="flex flex-col gap-3">
                    {categories.slice(0, 8).map(cat => (
                       <Link key={cat.id} to={`/shop?category=${cat.slug}`} onClick={() => setIsSidebarOpen(false)} className="text-[14px] flex justify-between items-center py-1">
                         {cat.name} <ArrowRight size={14} className="text-gray-400" />
                       </Link>
                    ))}
                  </div>
                </div>
                <div className="px-6 py-4">
                  <h3 className="text-[16px] font-bold mb-2">Account & Settings</h3>
                  <div className="flex flex-col gap-3">
                    <Link to="/profile" onClick={() => setIsSidebarOpen(false)} className="text-[14px]">Your Account</Link>
                    <Link to="/contact" onClick={() => setIsSidebarOpen(false)} className="text-[14px]">Contact Us</Link>
                    {user ? (
                        <button onClick={() => { localStorage.clear(); window.location.reload(); }} className="text-[14px] text-red-600 text-left">Sign Out</button>
                    ) : (
                      <Link to="/login" onClick={() => setIsSidebarOpen(false)} className="text-[14px]">Sign In</Link>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

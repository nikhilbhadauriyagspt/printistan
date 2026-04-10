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
  LayoutGrid,
  ChevronRight,
  LogOut
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
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setIsMobileSearchOpen(false);
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
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' }, 
       { name: 'FAQ', path: '/faq' }

  ];

  return (
    <>
      <header className={cn(
        "fixed top-0 left-0 right-0 z-[100] transition-all duration-300 w-full bg-white/98 backdrop-blur-md",
        isScrolled ? "shadow-lg border-b border-slate-100" : "border-b border-slate-100/50"
      )}>
        {/* --- ROW 1: BRAND, SEARCH & ACTIONS --- */}
        <div className="max-w-[1920px] mx-auto px-4 md:px-10 h-[60px] md:h-[75px] flex items-center justify-between gap-4 md:gap-8">
          
          {/* LOGO & MOBILE TOGGLE */}
          <div className="flex items-center gap-2 md:gap-4 shrink-0">
            <button 
              onClick={() => setIsSidebarOpen(true)} 
              className="lg:hidden p-1.5 text-slate-900 hover:bg-slate-50 rounded-lg transition-colors"
            >
              <Menu size={22} />
            </button>
            <Link to="/" className="shrink-0">
              <img 
                src="/logo/logo.png" 
                alt="Printer Loop" 
                className="h-5 md:h-11 transition-all duration-300 object-contain"
              />
            </Link>
          </div>

          {/* SEARCH BAR (DESKTOP) */}
          <div className="hidden lg:block flex-1 max-w-2xl relative">
            <form onSubmit={handleSearch} className="relative group">
              <input 
                type="text" 
                placeholder="Search printers, ink, or accessories..." 
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-10 py-2 text-[13px] font-medium text-slate-900 outline-none focus:ring-2 focus:ring-blue-600/10 focus:bg-white focus:border-blue-600/30 transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
              
              {isSearching && (
                 <Loader2 size={14} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-blue-600 animate-spin" />
              )}
            </form>

            {/* Suggestions Dropdown */}
            <AnimatePresence>
              {searchQuery.length > 0 && (
                <motion.div 
                  initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 5 }}
                  className="absolute top-[calc(100%+8px)] left-0 w-full bg-white shadow-2xl rounded-xl overflow-hidden z-[110] border border-slate-100 p-1"
                >
                  {suggestions.products.length > 0 ? (
                    <div className="grid gap-0.5">
                      {suggestions.products.map(p => (
                        <Link key={p.id} to={`/product/${p.slug}`} onClick={() => setSearchQuery('')} className="flex items-center gap-3 p-2 hover:bg-slate-50 rounded-lg transition-all group">
                           <div className="h-10 w-10 bg-white rounded border border-slate-100 flex items-center justify-center p-1">
                              <img src={p.images ? (typeof p.images === 'string' ? JSON.parse(p.images)[0] : p.images[0]) : ''} alt="" className="max-h-full max-w-full object-contain" />
                           </div>
                           <div className="flex-1 min-w-0">
                              <p className="text-[12px] font-bold text-slate-800 truncate group-hover:text-blue-600 transition-colors">{p.name}</p>
                              <p className="text-[11px] font-black text-blue-600">${p.price}</p>
                           </div>
                           <ChevronRight size={14} className="text-slate-300" />
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <div className="p-4 text-center text-xs text-slate-400 font-bold">No results found</div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* ACTION ICONS */}
          <div className="flex items-center gap-2 md:gap-5 shrink-0">
            <button 
              onClick={() => setIsMobileSearchOpen(true)} 
              className="lg:hidden h-10 w-10 flex items-center justify-center text-slate-700 hover:bg-slate-50 rounded-full transition-colors"
            >
              <Search size={22} />
            </button>

            <Link to={user ? "/profile" : "/login"} className="flex items-center gap-2.5 px-3 py-2 text-slate-700 hover:text-blue-600 hover:bg-blue-50/50 rounded-xl transition-all group border border-transparent hover:border-blue-100">
              <div className="h-9 w-9 flex items-center justify-center bg-slate-100 group-hover:bg-white rounded-lg transition-colors">
                <User size={18} />
              </div>
              <div className="hidden xl:block">
                <p className="text-[9px] font-black uppercase text-slate-400 leading-none mb-1">Account</p>
                <p className="text-[12px] font-bold text-slate-900 leading-none">{user ? user.name.split(' ')[0] : 'Sign In'}</p>
              </div>
            </Link>

            <Link to="/wishlist" className="flex items-center gap-2.5 px-3 py-2 text-slate-700 hover:text-red-500 hover:bg-red-50/50 rounded-xl transition-all group border border-transparent hover:border-red-100 relative">
              <div className="h-9 w-9 flex items-center justify-center bg-slate-100 group-hover:bg-white rounded-lg transition-colors relative">
                <Heart size={18} className={cn(wishlistCount > 0 && "fill-current text-red-500")} />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-[8px] font-bold rounded-full flex items-center justify-center ring-2 ring-white">
                    {wishlistCount}
                  </span>
                )}
              </div>
              <div className="hidden xl:block">
                <p className="text-[9px] font-black uppercase text-slate-400 leading-none mb-1">Saved</p>
                <p className="text-[12px] font-bold text-slate-900 leading-none">Wishlist</p>
              </div>
            </Link>

            <button 
              onClick={openCartDrawer} 
              className="flex items-center gap-3 h-[44px] md:h-[48px] px-4 md:px-5 bg-blue-600 hover:bg-slate-900 text-white rounded-xl transition-all ml-1 shadow-lg shadow-blue-100 active:scale-95"
            >
              <div className="relative">
                <ShoppingCart size={20} />
                <span className="absolute -top-2 -right-2 h-4 w-4 bg-white text-blue-600 text-[9px] font-black rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              </div>
              <span className="text-[13px] font-black uppercase tracking-wider hidden sm:block">Cart</span>
            </button>
          </div>
        </div>

        {/* --- ROW 2: NAVIGATION --- */}
        <div className="hidden lg:block border-t border-slate-50 bg-white/50">
          <div className="max-w-[1920px] mx-auto px-10 h-[48px] flex items-center justify-between">
            <div className="flex items-center gap-6">
              {/* Categories Dropdown */}
              <div className="relative" ref={dropdownRef}>
                 <button 
                   onClick={() => setIsAllDropdownOpen(!isAllDropdownOpen)}
                   className={cn(
                     "flex items-center gap-3 px-4 py-2 rounded-lg text-[12px] font-black uppercase tracking-widest transition-all",
                     isAllDropdownOpen ? "bg-slate-900 text-white" : "bg-blue-600 text-white hover:bg-slate-900"
                   )}
                 >
                   <LayoutGrid size={16} />
                   <span>Categories</span>
                   <ChevronDown size={14} className={cn("transition-transform duration-300", isAllDropdownOpen && "rotate-180")} />
                 </button>

                 <AnimatePresence>
                   {isAllDropdownOpen && (
                     <motion.div 
                       initial={{ opacity: 0, y: 10 }} 
                       animate={{ opacity: 1, y: 0 }} 
                       exit={{ opacity: 0, y: 10 }}
                       className="absolute top-[calc(100%+8px)] left-0 w-[260px] bg-white shadow-2xl z-[500] border border-slate-100 rounded-2xl overflow-hidden"
                     >
                        <div className="py-2">
                          {categories.slice(0, 10).map(cat => (
                            <Link 
                              key={cat.id} to={`/shop?category=${cat.slug}`} onClick={() => setIsAllDropdownOpen(false)}
                              className="flex items-center justify-between px-6 py-3 hover:bg-slate-50 text-slate-700 hover:text-blue-600 font-bold text-[12px] transition-all"
                            >
                              <span>{cat.name}</span>
                              <ChevronRight size={14} className="text-slate-300" />
                            </Link>
                          ))}
                          <div className="p-3 bg-slate-50 mt-1 border-t">
                             <Link to="/shop" onClick={() => setIsAllDropdownOpen(false)} className="flex items-center justify-center gap-2 py-2.5 bg-white border border-slate-200 text-slate-900 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all">
                                View Catalog <ArrowRight size={14} />
                             </Link>
                          </div>
                        </div>
                     </motion.div>
                   )}
                 </AnimatePresence>
              </div>

              <nav className="flex items-center gap-2">
                {navLinks.map((link) => (
                  <Link 
                    key={link.name} to={link.path} 
                    className={cn(
                      "relative px-4 py-2 text-[12px] font-black uppercase tracking-widest transition-all rounded-lg",
                      location.pathname === link.path ? "text-blue-600 bg-blue-50" : "text-slate-500 hover:text-blue-600 hover:bg-slate-50"
                    )}
                  >
                    {link.name}
                    {location.pathname === link.path && (
                      <motion.div layoutId="nav-underline" className="absolute bottom-1.5 left-4 right-4 h-[2px] bg-blue-600 rounded-full" />
                    )}
                  </Link>
                ))}
              </nav>
            </div>

            <div className="flex items-center gap-4 text-[13px] font-black  tracking-widest text-blue-600">
               <a href="mailto:info@printerloop.shop" className="flex items-center gap-1.5 ">
                 Mail: info@printerloop.shop
               </a>
            </div>
          </div>
        </div>

        {/* Mobile Search Overlay */}
        <AnimatePresence>
          {isMobileSearchOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
              className="lg:hidden absolute top-0 left-0 w-full bg-white z-[200] p-3 shadow-xl border-b border-slate-100"
            >
              <div className="flex items-center gap-2">
                <form onSubmit={handleSearch} className="flex-1 flex items-center bg-slate-100 rounded-lg px-3 h-11">
                  <Search size={18} className="text-slate-400" />
                  <input 
                    autoFocus type="text" placeholder="Search..." 
                    className="flex-1 bg-transparent px-2 text-sm font-medium outline-none text-slate-900"
                    value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </form>
                <button onClick={() => setIsMobileSearchOpen(false)} className="h-11 w-11 flex items-center justify-center text-slate-500"><X size={20} /></button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* --- MOBILE SIDEBAR --- */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsSidebarOpen(false)} className="fixed inset-0 z-[200] bg-slate-900/60 backdrop-blur-sm" />
            <motion.div 
              initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }} 
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed top-0 left-0 bottom-0 w-[80%] max-w-[320px] bg-white z-[210] flex flex-col shadow-2xl"
            >
              <div className="p-6 flex justify-between items-center border-b border-slate-100">
                 <img src="/logo/logo.png" alt="" className="h-8" />
                 <button className="h-8 w-8 flex items-center justify-center text-slate-500" onClick={() => setIsSidebarOpen(false)}><X size={20} /></button>
              </div>

              <div className="flex-1 overflow-y-auto py-6 px-6 no-scrollbar">
                <div className="mb-8">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Navigation</p>
                  <div className="grid gap-1">
                    {navLinks.map(link => (
                      <Link 
                        key={link.name} to={link.path} onClick={() => setIsSidebarOpen(false)} 
                        className={cn(
                          "py-3 px-4 rounded-lg font-bold text-sm transition-all",
                          location.pathname === link.path ? "bg-blue-50 text-blue-600" : "text-slate-700 active:bg-slate-50"
                        )}
                      >
                        {link.name}
                      </Link>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Categories</p>
                  <div className="grid gap-1">
                    {categories.slice(0, 10).map(cat => (
                       <Link 
                        key={cat.id} to={`/shop?category=${cat.slug}`} onClick={() => setIsSidebarOpen(false)} 
                        className="py-3 px-4 text-slate-700 active:text-blue-600 font-bold text-sm transition-all flex items-center justify-between"
                       >
                         <span>{cat.name}</span>
                         <ChevronRight size={14} className="text-slate-300" />
                       </Link>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-6 border-t border-slate-100">
                {user ? (
                   <button onClick={() => { localStorage.clear(); window.location.reload(); }} className="w-full py-3.5 bg-red-50 text-red-600 rounded-lg font-bold uppercase text-[11px] tracking-wider flex items-center justify-center gap-2">
                     <LogOut size={16} /> Logout
                   </button>
                ) : (
                  <Link to="/login" onClick={() => setIsSidebarOpen(false)} className="block w-full py-3.5 bg-blue-600 text-white text-center rounded-lg font-bold uppercase text-[11px] tracking-wider">
                    Member Login
                  </Link>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      
      <div className="h-[60px] md:h-[119px]" />
    </>
  );
}

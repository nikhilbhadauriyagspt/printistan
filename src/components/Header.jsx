import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { useCart } from '../context/CartContext';
import API_BASE_URL from '../config';
import {
  Search,
  User,
  Heart,
  ShoppingBag,
  Menu,
  X,
  Loader2,
  ChevronDown,
  LayoutGrid,
  ChevronRight,
  LogOut,
  Mail,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../lib/utils';

export default function Header() {
  const { cartCount, wishlistCount, openCartDrawer } = useCart();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isAllDropdownOpen, setIsAllDropdownOpen] = useState(false);
  const [isSearchCategoryOpen, setIsSearchCategoryOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState({ products: [] });
  const [isSearching, setIsSearching] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState({
    name: 'All Category',
    slug: '',
  });
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const allDropdownRef = useRef(null);
  const searchCategoryRef = useRef(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/categories`);
        const data = await res.json();
        if (data.status === 'success') {
          const allCats = data.data.flatMap((parent) => parent.children || []);
          setCategories(allCats.filter((cat) => !cat.name.toLowerCase().includes('laptop')));
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (allDropdownRef.current && !allDropdownRef.current.contains(event.target)) {
        setIsAllDropdownOpen(false);
      }
      if (searchCategoryRef.current && !searchCategoryRef.current.contains(event.target)) {
        setIsSearchCategoryOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (searchQuery.trim().length > 1) {
        setIsSearching(true);
        try {
          let url = `${API_BASE_URL}/products?search=${encodeURIComponent(searchQuery)}&limit=5`;

          if (selectedCategory.slug) {
            url += `&category=${encodeURIComponent(selectedCategory.slug)}`;
          }

          const res = await fetch(url);
          const data = await res.json();
          if (data.status === 'success') {
            setSuggestions({ products: data.data || [] });
          }
        } catch (err) {
          console.error(err);
        } finally {
          setIsSearching(false);
        }
      } else {
        setSuggestions({ products: [] });
      }
    };

    const timeoutId = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(timeoutId);
  }, [searchQuery, selectedCategory]);

  const handleSearchSubmit = (e) => {
    if (e) e.preventDefault();

    const params = new URLSearchParams();

    if (searchQuery.trim()) {
      params.set('search', searchQuery.trim());
    }

    if (selectedCategory.slug) {
      params.set('category', selectedCategory.slug);
    }

    navigate(`/shop?${params.toString()}`);
    setSearchQuery('');
    setIsMobileSearchOpen(false);
    setSuggestions({ products: [] });
  };

  useEffect(() => {
    const checkUser = () => {
      const storedUser = localStorage.getItem('user');
      if (storedUser && storedUser !== 'undefined') {
        const parsed = JSON.parse(storedUser);
        setUser(parsed.role !== 'admin' ? parsed : null);
      } else {
        setUser(null);
      }
    };

    checkUser();
    window.addEventListener('storage', checkUser);
    return () => window.removeEventListener('storage', checkUser);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
    { name: 'FAQ', path: '/faq' },
  ];

  return (
    <>
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[1000] focus:bg-blue-600 focus:text-white focus:px-4 focus:py-2 focus:rounded-lg">
        Skip to content
      </a>
      <header className="w-full bg-[#f3f3f3] font-poppins sticky top-0 left-0 right-0 z-[120] shadow-sm">
        <div className="max-w-[1920px] mx-auto px-4 md:px-8 xl:px-12">
          {/* Top Row */}
          <div className="min-h-[60px] md:min-h-[86px] py-1 md:py-2 flex items-center justify-between gap-4 md:gap-6">
            {/* Logo */}
            <div className="flex items-center gap-2 md:gap-3 shrink-0">
              <button
                onClick={() => setIsSidebarOpen(true)}
                aria-label="Open Menu"
                className="xl:hidden p-2 rounded-lg hover:bg-black/5"
              >
                <Menu size={24} />
              </button>

              <Link to="/" aria-label="Printistan Home" className="shrink-0 ml-2 md:ml-4 flex items-center">
                <span className="sr-only">Printistan Home</span>
                <img
                  src="/optimized/logo.avif"
                  alt="Printistan"
                  width={200}
                  height={44}
                  fetchPriority="high"
                  loading="eager"
                  className="h-8 md:h-10 lg:h-14 object-contain"
                />
              </Link>            </div>

            {/* Nav */}
            <nav className="hidden xl:flex items-center gap-6 2xl:gap-10">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={cn(
                    'text-[14px] 2xl:text-[15px] font-semibold transition-colors relative whitespace-nowrap',
                    location.pathname === link.path
                      ? 'text-blue-700'
                      : 'text-[#111111] hover:text-blue-700'
                  )}
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-3 md:gap-5 2xl:gap-7 shrink-0">
              <button
                onClick={() => setIsMobileSearchOpen(true)}
                aria-label="Open Search"
                className="xl:hidden p-2 rounded-full hover:bg-black/5"
              >
                <Search size={22} />
              </button>

              <Link
                to={user ? '/profile' : '/login'}
                aria-label={user ? 'Go to Profile' : 'Sign In'}
                className="flex items-center gap-3 group"
              >
                <div className="w-11 h-11 rounded-full border border-black/15 flex items-center justify-center group-hover:border-[#13c3a3] group-hover:text-blue-700 transition-colors shrink-0">
                  <User size={22} />
                </div>
                <div className="hidden xl:flex flex-col -gap-1">
                  <span className="text-[11px] text-gray-700 font-bold uppercase tracking-wider">
                    {user ? 'Profile' : 'Sign In'}
                  </span>
                  <span className="text-[14px] font-bold text-[#111] group-hover:text-blue-700 transition-colors">
                    Account
                  </span>
                </div>
              </Link>

              <Link
                to="/wishlist"
                aria-label={`View Wishlist (${wishlistCount} items)`}
                className="flex items-center gap-3 group"
              >
                <div className="relative w-11 h-11 rounded-full border border-black/15 flex items-center justify-center group-hover:border-[#13c3a3] group-hover:text-blue-700 transition-colors shrink-0">
                  <Heart size={22} className={cn(wishlistCount > 0 && 'fill-black')} />
                  {wishlistCount > 0 && (
                    <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-blue-700 text-white text-[10px] font-bold flex items-center justify-center">
                      {wishlistCount}
                    </span>
                  )}
                </div>
                <div className="hidden xl:flex flex-col -gap-1">
                  <span className="text-[11px] text-gray-700 font-bold uppercase tracking-wider">Favorite</span>
                  <span className="text-[14px] font-bold text-[#111] group-hover:text-blue-700 transition-colors">Wishlist</span>
                </div>
              </Link>

              <button
                onClick={openCartDrawer}
                aria-label={`Open Cart (${cartCount} items)`}
                className="flex items-center gap-3 group"
              >
                <div className="relative w-11 h-11 rounded-full border border-black/15 flex items-center justify-center group-hover:border-[#13c3a3] group-hover:text-blue-700 transition-colors shrink-0">
                  <ShoppingBag size={22} />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-blue-700 text-white text-[10px] font-bold flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </div>
                <div className="hidden xl:flex flex-col -gap-1 text-left">
                  <span className="text-[11px] text-gray-700 font-bold uppercase tracking-wider">Your Cart</span>
                  <span className="text-[14px] font-bold text-[#111] group-hover:text-blue-700 transition-colors">Checkout</span>
                </div>
              </button>
            </div>
          </div>

          {/* Bottom Search Section */}
          <div className="pb-6 hidden lg:block">
            <div className="flex items-center gap-6">
              {/* Mail Us instead of All Categories */}
              <div className="relative w-[300px] shrink-0">
                <a
                  href="mailto:info@printistan.shop"
                  className="w-full h-[56px] rounded-full border-[4px] border-black bg-white px-7 flex items-center gap-3 text-[#111111] font-semibold text-[15px] hover:text-blue-700 transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-blue-700 flex items-center justify-center text-white shrink-0">
                    <Mail size={16} />
                  </div>
                  <span className="truncate">info@printistan.shop</span>
                </a>
              </div>

              {/* Search Bar */}
              <div className="flex-1 relative">
                <form onSubmit={handleSearchSubmit} className="relative">
                  <div className="h-[56px] rounded-full border-[4px] border-black bg-white flex items-center overflow-hidden">
                    {/* Search Category Selector */}
                    <div className="relative h-full shrink-0" ref={searchCategoryRef}>
                      

                      <AnimatePresence>
                        {isSearchCategoryOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            className="absolute top-[calc(100%+10px)] left-0 w-[280px] bg-white rounded-3xl border border-black/10 shadow-[0_20px_40px_rgba(0,0,0,0.08)] py-3 z-[130] overflow-hidden max-h-[420px] overflow-y-auto"
                          >
                            <button
                              type="button"
                              onClick={() => {
                                setSelectedCategory({ name: 'All Category', slug: '' });
                                setIsSearchCategoryOpen(false);
                              }}
                              className="w-full text-left px-6 py-3 text-[14px] font-medium text-[#222] hover:bg-[#f7f7f7] hover:text-blue-700 transition-colors"
                            >
                              All Category
                            </button>

                            {categories.map((cat) => (
                              <button
                                key={cat.id}
                                type="button"
                                onClick={() => {
                                  setSelectedCategory({
                                    name: cat.name,
                                    slug: cat.slug,
                                  });
                                  setIsSearchCategoryOpen(false);
                                }}
                                className="w-full text-left px-6 py-3 text-[14px] font-medium text-[#222] hover:bg-[#f7f7f7] hover:text-blue-700 transition-colors"
                              >
                                {cat.name}
                              </button>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    <div className="w-px h-7 bg-black/10 shrink-0" />

                    {/* Search Input */}
                    <div className="relative flex-1 h-full">
                      <label htmlFor="search-input" className="sr-only">Search products</label>
                      <input
                        id="search-input"
                        type="text"
                        placeholder="Search"
                        aria-label="Search for printers and accessories"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full h-full bg-transparent px-6 pr-16 text-[16px] text-[#111111] outline-none placeholder:text-[#666]"
                      />

                      {isSearching && (
                        <Loader2
                          size={18}
                          className="absolute right-24 top-1/2 -translate-y-1/2 text-blue-700 animate-spin"
                        />
                      )}
                    </div>

                    {/* Search Button */}
                    <button
                      type="submit"
                      className="h-[40px] min-w-[140px] mr-2 rounded-full bg-blue-700 hover:bg-[#0fb292] text-white font-semibold text-[15px] transition-colors"
                    >
                      SEARCH
                    </button>
                  </div>
                </form>

                {/* Suggestions */}
                <AnimatePresence>
                  {searchQuery.length > 1 && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-[calc(100%+12px)] left-0 w-full bg-white rounded-[28px] border border-black/10 shadow-[0_24px_60px_rgba(0,0,0,0.08)] p-3 z-[140]"
                    >
                      {suggestions.products.length > 0 ? (
                        <div className="grid gap-1">
                          {suggestions.products.map((p) => {
                            let imageSrc = '';
                            try {
                              imageSrc = p.images
                                ? typeof p.images === 'string'
                                  ? JSON.parse(p.images)[0]
                                  : p.images[0]
                                : '';
                            } catch {
                              imageSrc = '';
                            }

                            return (
                              <Link
                                key={p.id}
                                to={`/product/${p.slug}`}
                                onClick={() => setSearchQuery('')}
                                className="flex items-center gap-4 p-3 rounded-2xl hover:bg-[#f8f8f8] transition-colors"
                              >
                                <div className="h-14 w-14 rounded-xl bg-white border border-gray-100 flex items-center justify-center overflow-hidden shrink-0">
                                  {imageSrc ? (
                                    <img
                                      src={imageSrc}
                                      alt={p.name}
                                      width={56}
                                      height={56}
                                      className="max-h-full max-w-full object-contain"
                                    />
                                  ) : null}
                                </div>

                                <div className="flex-1 min-w-0">
                                  <p className="text-[14px] font-semibold text-[#111] truncate">
                                    {p.name}
                                  </p>
                                  <p className="text-[13px] text-blue-700 font-bold">
                                    ${p.price}
                                  </p>
                                </div>

                                <ChevronRight size={16} className="text-black/30" />
                              </Link>
                            );
                          })}

                          <button
                            onClick={handleSearchSubmit}
                            className="w-full mt-1 pt-3 border-t border-black/5 text-center text-[13px] font-semibold text-[#555] hover:text-blue-700 transition-colors"
                          >
                            View all results for "{searchQuery}"
                          </button>
                        </div>
                      ) : (
                        <div className="p-8 text-center text-sm text-gray-400 font-medium">
                          No products found for "{searchQuery}"
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Search Overlay */}
      <AnimatePresence>
        {isMobileSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1000] bg-[#111111]/95 backdrop-blur-md p-6"
          >
            <div className="flex justify-between items-center mb-10">
              <img src="/logo/logo.png" alt="" width={150} height={32} loading="eager" className="h-8" />
              <button onClick={() => setIsMobileSearchOpen(false)}>
                <X size={30} className="text-white" />
              </button>
            </div>

            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                autoFocus
                type="text"
                placeholder="Search products..."
                className="w-full bg-transparent border-b-2 border-white/20 text-white text-2xl py-4 outline-none focus:border-[#13c3a3] transition-all placeholder:text-white/25"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit" className="absolute right-0 top-1/2 -translate-y-1/2 text-white">
                <Search size={28} />
              </button>

              {/* Mobile Suggestions */}
              <AnimatePresence>
                {searchQuery.length > 1 && suggestions.products.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full left-0 w-full bg-white/10 backdrop-blur-xl rounded-2xl mt-4 p-2 z-[1001] max-h-[60vh] overflow-y-auto"
                  >
                    {suggestions.products.map((p) => {
                      let imageSrc = '';
                      try {
                        imageSrc = p.images
                          ? typeof p.images === 'string'
                            ? JSON.parse(p.images)[0]
                            : p.images[0]
                          : '';
                      } catch {
                        imageSrc = '';
                      }

                      return (
                        <Link
                          key={p.id}
                          to={`/product/${p.slug}`}
                          onClick={() => {
                            setSearchQuery('');
                            setIsMobileSearchOpen(false);
                          }}
                          className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/10 transition-colors border-b border-white/5 last:border-0"
                        >
                          <div className="h-12 w-12 rounded-lg bg-white/10 flex items-center justify-center overflow-hidden shrink-0">
                            {imageSrc && (
                              <img 
                                src={imageSrc} 
                                alt="" 
                                width={48}
                                height={48}
                                className="max-h-full max-w-full object-contain" 
                              />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-white text-sm font-semibold truncate">{p.name}</p>
                            <p className="text-blue-700 text-xs font-bold">${p.price}</p>
                          </div>
                        </Link>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSidebarOpen(false)}
              className="fixed inset-0 z-[200] bg-black/50 backdrop-blur-sm"
            />

            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              className="fixed top-0 left-0 bottom-0 w-[310px] bg-white z-[210] flex flex-col shadow-2xl"
            >
              <div className="p-8 border-b border-gray-100 flex justify-between items-center">
                <img src="/logo/logo.png" alt="" width={150} height={32} loading="eager" className="h-8" />
                <button onClick={() => setIsSidebarOpen(false)} className="p-2 bg-gray-50 rounded-lg">
                  <X size={22} />
                </button>
              </div>

              <div className="p-6 flex-1 overflow-y-auto">
                <nav className="flex flex-col gap-2">
                  {navLinks.map((link) => (
                    <Link
                      key={link.name}
                      to={link.path}
                      onClick={() => setIsSidebarOpen(false)}
                      className="py-3.5 px-4 rounded-xl font-semibold text-[15px] text-gray-700 hover:bg-[#f7f7f7] hover:text-blue-700 transition-all flex items-center justify-between"
                    >
                      {link.name}
                      <ChevronRight size={16} className="opacity-30" />
                    </Link>
                  ))}
                </nav>

                <div className="mt-6 border-t border-gray-100 pt-6">
                  <p className="px-4 text-[13px] font-semibold text-gray-500 mb-3">Shop Categories</p>
                  <div className="flex flex-col gap-1">
                    {categories.slice(0, 10).map((cat) => (
                      <Link
                        key={cat.id}
                        to={`/shop?category=${cat.slug}`}
                        onClick={() => setIsSidebarOpen(false)}
                        className="py-3 px-4 rounded-xl text-[14px] font-medium text-gray-700 hover:bg-[#f7f7f7] hover:text-blue-700 transition-all"
                      >
                        {cat.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-8 border-t border-gray-100 bg-gray-50/50">
                {user ? (
                  <button
                    onClick={() => {
                      localStorage.clear();
                      window.location.reload();
                    }}
                    className="w-full py-3.5 bg-white border border-gray-200 text-gray-600 rounded-xl font-bold text-[14px] flex items-center justify-center gap-2 shadow-sm"
                  >
                    <LogOut size={18} /> Logout
                  </button>
                ) : (
                  <Link
                    to="/login"
                    onClick={() => setIsSidebarOpen(false)}
                    className="block w-full py-4 bg-blue-700 text-white text-center rounded-xl font-bold text-[14px]"
                  >
                    Sign In to Account
                  </Link>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

     
    </>
  );
}
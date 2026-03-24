import { useState, useEffect } from 'react';
import { useSearchParams, Link, useParams, useNavigate } from 'react-router-dom';
import SEO from '@/components/SEO';
import { useCart } from '../context/CartContext';
import { 
  Search, 
  X,
  Loader2,
  SlidersHorizontal,
  Package,
  Heart,
  ChevronDown,
  ShoppingBag,
  ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import API_BASE_URL from '../config';
import { cn } from '../lib/utils';

export default function Shop() {
  const { addToCart, toggleWishlist, isInWishlist, openCartDrawer } = useCart();
  const { category: pathCategory, brand: pathBrand } = useParams();
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const category = searchParams.get('category') || pathCategory || '';
  const sort = searchParams.get('sort') || 'newest';
  const search = searchParams.get('search') || '';

  const handleAddToCart = (e, product) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    openCartDrawer();
  };

  useEffect(() => {
    fetch(`${API_BASE_URL}/categories`)
      .then(res => res.json())
      .then(d => {
        if (d.status === 'success') {
          const filtered = d.data.filter(cat => 
            !cat.name.toLowerCase().includes('laptop') && 
            !cat.slug.toLowerCase().includes('laptop') &&
            !cat.name.toLowerCase().includes('chromebook')
          );
          setCategories(filtered);
        }
      });
  }, []);

  useEffect(() => {
    if (pathCategory) {
      navigate(`/shop?category=${pathCategory}`, { replace: true });
      return;
    }

    setLoading(true);
    const params = new URLSearchParams(searchParams);
    params.set('limit', '1000');
    
    fetch(`${API_BASE_URL}/products?${params.toString()}`)
      .then(res => res.json())
      .then(data => {
        if (data.status === 'success') {
          const filteredProducts = data.data.filter(p => 
            !p.name.toLowerCase().includes('laptop') && 
            !p.name.toLowerCase().includes('macbook') && 
            !p.name.toLowerCase().includes('notebook') &&
            !p.name.toLowerCase().includes('chromebook')
          );
          setProducts(filteredProducts);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [searchParams, pathCategory, navigate]);

  const updateFilter = (key, value) => {
    const newParams = new URLSearchParams(searchParams);
    if (value) newParams.set(key, value);
    else newParams.delete(key);
    newParams.set('page', '1');
    navigate(`/shop?${newParams.toString()}`);
  };

  const getImagePath = (images) => {
    try {
      const imgs = typeof images === 'string' ? JSON.parse(images) : images;
      if (Array.isArray(imgs) && imgs.length > 0) return `/${imgs[0]}`;
    } catch (e) { }
    return "https://via.placeholder.com/400x400?text=Product";
  };

  return (
    <div className="bg-white min-h-screen font-jakarta text-slate-900 overflow-x-hidden ">
      <SEO 
        title="Shop Collections | Larry Printing Solutions" 
        description="Browse our curated selection of high-performance printers and professional printer."
      />

      {/* --- SIMPLE HEADER --- */}
      <section className="py-10 px-4 md:px-10 border-b border-gray-100 bg-gray-50">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight uppercase">
              All <span className="text-cyan-600">Products</span>
            </h1>
            <div className="h-1 w-12 bg-cyan-500 mt-1" />
            <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mt-3">Showing {products.length} printing solutions</p>
          </div>
          
          <div className="flex items-center gap-3 overflow-x-auto pb-2 no-scrollbar max-w-full">
            <button 
              onClick={() => updateFilter('category', '')}
              className={cn(
                "px-6 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-widest whitespace-nowrap transition-all border",
                !category ? "bg-slate-900 text-white border-slate-900" : "bg-white text-gray-500 border-gray-200 hover:border-cyan-500"
              )}
            >
              All Categories
            </button>
            {categories.map(cat => (
              <button 
                key={cat.id} 
                onClick={() => updateFilter('category', cat.slug)}
                className={cn(
                  "px-6 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-widest whitespace-nowrap transition-all border",
                  category === cat.slug ? "bg-cyan-500 text-slate-900 border-cyan-500 font-black" : "bg-white text-gray-500 border-gray-200 hover:border-cyan-500"
                )}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* --- TOOLBAR --- */}
      <div className="sticky top-20 z-40 bg-white/95 backdrop-blur-md border-b border-gray-100 px-4 md:px-10 py-4 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          
          {/* Search */}
          <div className="flex-1 min-w-[200px]">
            <div className="flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 w-full focus-within:border-cyan-500 transition-all">
              <Search size={16} className="text-gray-400" />
              <input 
                type="text" 
                placeholder="Search by model or type..."
                value={search}
                onChange={(e) => updateFilter('search', e.target.value)}
                className="bg-transparent text-[12px] font-semibold outline-none w-full placeholder:text-gray-400"
              />
            </div>
          </div>

          {/* Sort & Filter */}
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsMobileFilterOpen(true)}
              className="lg:hidden h-10 px-4 flex items-center justify-center gap-2 rounded-lg bg-gray-50 text-slate-700 border border-gray-200"
            >
              <SlidersHorizontal size={16} />
              <span className="text-[11px] font-bold uppercase tracking-tight">Filters</span>
            </button>

            <div className="relative group flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 hover:border-cyan-500 transition-all cursor-pointer">
              <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Sort:</span>
              <select 
                value={sort} 
                onChange={(e) => updateFilter('sort', e.target.value)}
                className="bg-transparent text-[11px] font-bold uppercase tracking-tight cursor-pointer outline-none appearance-none"
              >
                <option value="newest">Latest Arrivals</option>
                <option value="price_low">Price: Low to High</option>
                <option value="price_high">Price: High to Low</option>
                <option value="name_asc">Name: A-Z</option>
              </select>
              <ChevronDown size={14} className="text-gray-400" />
            </div>
          </div>
        </div>
      </div>

      {/* --- GRID --- */}
      <section className="px-4 md:px-10 py-12">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-40">
            <Loader2 className="animate-spin h-10 w-10 text-cyan-600 mb-4" strokeWidth={1.5} />
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-400">Syncing collection...</p>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-32 bg-gray-50 rounded-2xl border border-gray-100">
            <Package size={48} strokeWidth={1} className="mx-auto text-gray-300 mb-4" />
            <h2 className="text-sm font-bold uppercase tracking-widest text-slate-900">No matches found</h2>
            <button 
              onClick={() => navigate('/shop')} 
              className="mt-6 bg-cyan-500 text-slate-900 px-10 py-3 rounded font-bold text-xs uppercase tracking-widest transition-all hover:bg-slate-900 hover:text-white"
            >
              Reset All
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 md:gap-6">
            {products.map((p) => (
              <div 
                key={p.id}
                className="bg-white border border-gray-100 rounded-xl p-4 flex flex-col h-full hover:border-cyan-500 transition-all duration-300 group"
              >
                {/* Image Section */}
                <div className="relative aspect-square w-full mb-4 flex items-center justify-center overflow-hidden bg-gray-50 rounded-lg">
                  <Link to={`/product/${p.slug}`} className="absolute inset-0 z-10" />
                  <img 
                    src={getImagePath(p.images)} 
                    alt={p.name} 
                    className="max-h-[85%] max-w-[85%] object-contain transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => { e.target.src = "https://via.placeholder.com/400x400?text=" + p.name; }}
                  />
                  <button 
                    onClick={(e) => { e.preventDefault(); toggleWishlist(p); }}
                    className={cn(
                      "absolute top-2 right-2 z-20 p-2 rounded-full bg-white/80 backdrop-blur-sm shadow-sm transition-colors hover:bg-white",
                      isInWishlist(p.id) ? "text-red-500" : "text-gray-400 hover:text-cyan-600"
                    )}
                  >
                    <Heart size={16} fill={isInWishlist(p.id) ? "currentColor" : "none"} />
                  </button>
                </div>

                {/* Details Section */}
                <div className="flex-1 flex flex-col">
                  <Link to={`/product/${p.slug}`}>
                    <h3 className="text-[12px] font-bold text-slate-800 group-hover:text-cyan-600 transition-colors uppercase tracking-tight line-clamp-2 mb-2">
                      {p.name}
                    </h3>
                  </Link>
                  
                  <div className="mt-auto pt-3 border-t border-gray-50 flex flex-col gap-3">
                    <span className="text-lg font-black text-slate-900">${p.price}</span>
                    
                    <button 
                      onClick={(e) => handleAddToCart(e, p)}
                      className="w-full py-2 bg-cyan-500 text-slate-900 text-[10px] font-bold uppercase tracking-widest hover:bg-slate-900 hover:text-white transition-all rounded shadow-sm"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* MOBILE FILTER DRAWER */}
      <AnimatePresence>
        {isMobileFilterOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsMobileFilterOpen(false)}
              className="fixed inset-0 z-[100] bg-slate-900/40 backdrop-blur-sm lg:hidden"
            />
            <motion.div 
              initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }}
              className="fixed top-0 left-0 bottom-0 w-[300px] bg-white z-[110] lg:hidden flex flex-col p-6 shadow-2xl overflow-hidden"
            >
              <div className="flex justify-between items-center mb-10 pb-4 border-b border-gray-100">
                <h3 className="text-xs font-bold uppercase tracking-widest text-slate-900">Filters</h3>
                <button onClick={() => setIsMobileFilterOpen(false)} className="h-8 w-8 rounded-full bg-gray-50 text-slate-900 flex items-center justify-center"><X size={18} /></button>
              </div>
              <div className="flex-1 overflow-y-auto">
                <div className="space-y-4">
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-400">Categories</h4>
                  <div className="flex flex-col gap-2">
                    <button 
                      onClick={() => { updateFilter('category', ''); setIsMobileFilterOpen(false); }}
                      className={cn("w-full text-left px-4 py-3 text-[11px] font-bold uppercase tracking-widest rounded-lg transition-all", !category ? "bg-slate-900 text-white" : "bg-gray-50 text-slate-600")}
                    >
                      All Categories
                    </button>
                    {categories.map(cat => (
                      <button 
                        key={cat.id} 
                        onClick={() => { updateFilter('category', cat.slug); setIsMobileFilterOpen(false); }}
                        className={cn("w-full text-left px-4 py-3 text-[11px] font-bold uppercase tracking-widest rounded-lg transition-all", category === cat.slug ? "bg-cyan-500 text-slate-900" : "bg-gray-50 text-slate-600")}
                      >
                        {cat.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

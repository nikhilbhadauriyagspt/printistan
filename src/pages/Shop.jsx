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
import { ProductCardSkeleton } from '@/components/ui/skeleton';

export default function Shop() {
  const { addToCart, toggleWishlist, isInWishlist, openCartDrawer } = useCart();
  const { category: pathCategory } = useParams();
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
    setSearchParams(newParams);
  };

  const getImagePath = (images) => {
    try {
      const imgs = typeof images === 'string' ? JSON.parse(images) : images;
      if (Array.isArray(imgs) && imgs.length > 0) return `/${imgs[0]}`;
    } catch (e) { }
    return "https://via.placeholder.com/400x400?text=Product";
  };

  return (
    <div className="bg-white min-h-screen font-jakarta text-slate-900 overflow-x-hidden">
      <SEO 
        title="Shop All Products |Inktrix Printers" 
        description="Browse our curated selection of high-performance printers and professional supplies."
      />

      {/* --- PAGE HEADER (Home Page Style) --- */}
      <section className="pt-24 pb-12 bg-white">
        <div className="w-full px-4 md:px-8">
          <div className="flex flex-col items-center text-center">
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
              Our <span className="text-blue-600">Shop</span>
            </h1>
            <div className="h-1.5 w-24 bg-blue-600 mt-5 rounded-full" />
            <p className="text-slate-500 text-md font-bold mt-6 max-w-3xl  leading-relaxed">
              Precision-engineered printing solutions curated for professional and everyday productivity.
            </p>
          </div>
        </div>
      </section>

      {/* --- TOOLBAR (Search & Filters) --- */}
      <div className="sticky top-[72px] md:top-[88px] z-40 bg-white/95 backdrop-blur-md border-y border-slate-100 px-4 md:px-8 py-4">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4 max-w-[1920px] mx-auto">
          
          {/* Categories Quick Filter */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar w-full lg:w-auto">
            <button 
              onClick={() => updateFilter('category', '')}
              className={cn(
                "h-10 px-6 rounded-full text-[11px] font-black uppercase tracking-widest whitespace-nowrap transition-all border",
                !category ? "bg-blue-600 text-white border-blue-600" : "bg-white text-slate-500 border-slate-200 hover:border-blue-600 hover:text-blue-600"
              )}
            >
              All Products
            </button>
            {categories.map(cat => (
              <button 
                key={cat.id} 
                onClick={() => updateFilter('category', cat.slug)}
                className={cn(
                  "h-10 px-6 rounded-full text-[11px] font-black uppercase tracking-widest whitespace-nowrap transition-all border",
                  category === cat.slug ? "bg-blue-600 text-white border-blue-600" : "bg-white text-slate-500 border-slate-200 hover:border-blue-600 hover:text-blue-600"
                )}
              >
                {cat.name}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3 w-full lg:w-auto">
            {/* Search Box */}
            <div className="relative flex-1 lg:w-80 group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={16} />
              <input 
                type="text" 
                placeholder="Search products..."
                value={search}
                onChange={(e) => updateFilter('search', e.target.value)}
                className="w-full h-11 pl-11 pr-4 bg-slate-50 border border-slate-100 rounded-xl text-[12px] font-bold outline-none focus:bg-white focus:border-blue-600/50 transition-all"
              />
            </div>

            {/* Sort Dropdown */}
            <div className="relative flex items-center bg-slate-50 border border-slate-100 rounded-xl h-11 px-4 hover:bg-white transition-all">
              <select 
                value={sort} 
                onChange={(e) => updateFilter('sort', e.target.value)}
                className="bg-transparent text-[11px] font-black uppercase tracking-widest cursor-pointer outline-none appearance-none pr-6"
              >
                <option value="newest">Newest</option>
                <option value="price_low">Price: Low-High</option>
                <option value="price_high">Price: High-Low</option>
                <option value="name_asc">A-Z</option>
              </select>
              <ChevronDown className="absolute right-3 pointer-events-none text-slate-400" size={14} />
            </div>
          </div>
        </div>
      </div>

      {/* --- PRODUCT GRID (Home Page Card Style) --- */}
      <section className="px-4 md:px-8 py-12">
        <div className="max-w-[1920px] mx-auto">
          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6">
              {Array.from({ length: 12 }).map((_, index) => (
                <div key={index} className="flex flex-col gap-4">
                  <ProductCardSkeleton />
                </div>
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-32 bg-slate-50 rounded-3xl border border-dashed border-slate-200">
              <Package size={48} className="mx-auto text-slate-300 mb-6" />
              <h2 className="text-2xl font-black text-slate-900 uppercase tracking-widest mb-2">No Products Found</h2>
              <p className="text-slate-500 font-bold mb-8">Try adjusting your filters or search terms.</p>
              <button 
                onClick={() => navigate('/shop')} 
                className="bg-blue-600 text-white px-8 py-3 rounded-full font-black text-xs uppercase tracking-widest hover:bg-blue-700 transition-all"
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            <>
              <div className="flex items-center gap-2 text-[11px] font-black text-slate-400 uppercase tracking-widest mb-8">
                <Package size={14} /> Showing {products.length} products
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5 md:gap-6">
                {products.map((p, index) => (
                  <motion.div
                    key={p.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: (index % 6) * 0.04 }}
                    viewport={{ once: true }}
                  >
                    <Link to={`/product/${p.slug}`} className="flex flex-col gap-4 group/card">
                      
                      {/* Card (Matching Home Page) */}
                      <div className="relative w-full bg-slate-50 rounded-2xl overflow-hidden border border-slate-100 group-hover/card:border-blue-600 group-hover/card:shadow-xl group-hover/card:shadow-blue-100 transition-all duration-500 p-4">

                        {/* Wishlist */}
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            toggleWishlist(p);
                          }}
                          className={cn(
                            "absolute top-3 right-3 z-20 h-10 w-10 rounded-full bg-white shadow-md flex items-center justify-center transition-all duration-300",
                            isInWishlist(p.id)
                              ? "text-red-500"
                              : "text-slate-400 hover:text-blue-600"
                          )}
                        >
                          <Heart size={18} fill={isInWishlist(p.id) ? "currentColor" : "none"} />
                        </button>

                        {/* Image */}
                        <div className="relative w-full aspect-square flex items-center justify-center">
                          <img
                            src={getImagePath(p.images)}
                            alt={p.name}
                            className="w-full h-full object-contain p-4 transition-transform duration-700 ease-out group-hover/card:scale-110"
                            onError={(e) => {
                              e.target.src = "https://via.placeholder.com/400x400?text=" + p.name;
                            }}
                          />
                        </div>

                        {/* Hover Overlay */}
                        <div className="absolute inset-0 bg-blue-600/0 group-hover/card:bg-blue-600/5 transition-colors duration-500 pointer-events-none" />

                        {/* Hover Add to Cart */}
                        <div className="absolute bottom-0 left-0 w-full p-4 translate-y-full group-hover/card:translate-y-0 transition-transform duration-500 bg-gradient-to-t from-blue-600/90 to-transparent z-20">
                          <button
                            onClick={(e) => handleAddToCart(e, p)}
                            className="w-full h-11 bg-white text-blue-600 flex items-center justify-center gap-2 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-slate-100 transition-colors"
                          >
                            <ShoppingBag size={16} />
                            Add to Cart
                          </button>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="text-center px-1">
                        <h3 className="text-[13px] font-black text-slate-800 group-hover/card:text-blue-600 transition-colors uppercase tracking-widest leading-[1.45] line-clamp-2 min-h-[38px] max-h-[38px] overflow-hidden">
                          {p.name}
                        </h3>

                        <div className="mt-3 flex items-center justify-center gap-2 flex-wrap">
                          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                            Price:
                          </span>
                          <span className="text-lg font-black text-slate-900 tracking-tight">
                            ${p.price}
                          </span>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}

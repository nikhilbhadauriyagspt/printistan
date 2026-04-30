import { useState, useEffect } from 'react';
import { useSearchParams, Link, useParams, useNavigate } from 'react-router-dom';
import SEO from '@/components/SEO';
import { useCart } from '../context/CartContext';
import {
  Search,
  X,
  Package,
  Heart,
  ChevronDown,
  ShoppingCart,
  Filter,
  LayoutGrid,
  ChevronRight,
  Eye,
  Zap
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import API_BASE_URL from '../config';
import { cn } from '../lib/utils';

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
      .then((res) => res.json())
      .then((d) => {
        if (d.status === 'success') {
          const all = d.data.flatMap((parent) => [parent, ...(parent.children || [])]);
          const filtered = all.filter(
            (cat) =>
              !cat.name.toLowerCase().includes('laptop') &&
              !cat.slug.toLowerCase().includes('laptop') &&
              !cat.name.toLowerCase().includes('computer')
          );
          const unique = Array.from(new Map(filtered.map((item) => [item.slug, item])).values());
          setCategories(unique);
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
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 'success') {
          const filteredProducts = data.data.filter(
            (p) => !p.name.toLowerCase().includes('laptop')
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
    if (isMobileFilterOpen) setIsMobileFilterOpen(false);
  };

  const getImagePath = (images) => {
    try {
      const imgs = typeof images === 'string' ? JSON.parse(images) : images;
      if (Array.isArray(imgs) && imgs.length > 0) return `/${imgs[0]}`;
    } catch (e) {}
    return 'https://via.placeholder.com/400x400?text=Product';
  };

  return (
    <div className="min-h-screen bg-white font-poppins text-[#1A1A1A]">
      <SEO
        title="Shop Inventory | Printistan"
        description="Browse our high-performance inventory of precision printers."
      />

      {/* --- Page Header --- */}
      <section className="pt-32 pb-16 bg-[#FAF9F6] border-b border-[#E8E6E1]">
        <div className="max-w-[1920px] mx-auto px-4 md:px-10">
          <div className="max-w-4xl mx-auto text-center">
             <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-600 rounded-lg text-[12px] font-bold mb-4 uppercase tracking-widest">
               <Zap size={14} fill="currentColor" />
               <span>Professional Range</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-[#1A1A1A]  leading-none mb-6">
              Shop <span className="text-blue-600">Inventory</span>
            </h1>
            <p className="text-[16px] text-gray-500 font-medium max-w-2xl mx-auto leading-relaxed">
              Explore our comprehensive collection of enterprise-grade printers and accessories. 
              Find the perfect match for your high-volume printing needs.
            </p>
          </div>
        </div>
      </section>

      {/* --- Main Shop Content --- */}
      <section className="py-12 md:py-16">
        <div className="max-w-[1920px] mx-auto px-4 md:px-10">
          <div className="flex flex-col lg:flex-row gap-10">
            
            {/* Desktop Sidebar Filter */}
            <aside className="hidden lg:block w-[300px] shrink-0">
              <div className="sticky top-32 space-y-8">
                
                {/* Search Card */}
                <div className="bg-[#FAF9F6] rounded-[2rem] p-6 border border-[#E8E6E1]">
                  <h4 className="text-[13px] font-bold text-[#1A1A1A] mb-4 flex items-center gap-2">
                    <Search size={16} className="text-blue-600" />
                    Quick Search
                  </h4>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search products..."
                      value={search}
                      onChange={(e) => updateFilter('search', e.target.value)}
                      className="w-full h-12 rounded-xl bg-white border border-[#E8E6E1] px-4 text-sm font-medium text-[#1A1A1A] outline-none focus:border-blue-500/50 transition-all placeholder:text-gray-400"
                    />
                  </div>
                </div>

                {/* Categories Card */}
                <div className="bg-[#FAF9F6] rounded-[2rem] p-6 border border-[#E8E6E1]">
                  <h4 className="text-[13px] font-bold text-[#1A1A1A] mb-4 flex items-center gap-2">
                    <LayoutGrid size={16} className="text-blue-600" />
                    Categories
                  </h4>
                  <div className="flex flex-col gap-1.5">
                    <button
                      onClick={() => updateFilter('category', '')}
                      className={cn(
                        'text-left px-4 py-3 rounded-xl text-[13px] font-bold transition-all flex items-center justify-between group',
                        !category
                          ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/10'
                          : 'text-gray-500 hover:bg-white hover:text-blue-600 border border-transparent'
                      )}
                    >
                      All Collections
                      {!category && <ChevronRight size={14} />}
                    </button>

                    {categories.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => updateFilter('category', cat.slug)}
                        className={cn(
                          'text-left px-4 py-3 rounded-xl text-[13px] font-bold transition-all flex items-center justify-between group',
                          category === cat.slug
                            ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/10'
                            : 'text-gray-500 hover:bg-white hover:text-blue-600 border border-transparent'
                        )}
                      >
                        {cat.name}
                        {category === cat.slug && <ChevronRight size={14} />}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sort Card */}
                <div className="bg-[#FAF9F6] rounded-[2rem] p-6 border border-[#E8E6E1]">
                  <h4 className="text-[13px] font-bold text-[#1A1A1A] mb-4">Sort By Performance</h4>
                  <div className="relative">
                    <select
                      value={sort}
                      onChange={(e) => updateFilter('sort', e.target.value)}
                      className="w-full h-12 rounded-xl bg-white border border-[#E8E6E1] px-4 pr-10 text-sm font-bold text-[#1A1A1A] outline-none appearance-none cursor-pointer"
                    >
                      <option value="newest">Latest Arrivals</option>
                      <option value="price_low">Price: Low to High</option>
                      <option value="price_high">Price: High to Low</option>
                      <option value="name_asc">Alphabetical</option>
                    </select>
                    <ChevronDown
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                      size={16}
                    />
                  </div>
                </div>

              </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1">
              {/* Toolbar */}
              <div className="flex items-center justify-between mb-8">
                 <p className="text-[14px] font-bold text-gray-400">
                    Showing <span className="text-[#1A1A1A]">{products.length}</span> Results
                 </p>
                 <div className="lg:hidden">
                    <button
                      onClick={() => setIsMobileFilterOpen(true)}
                      className="flex items-center gap-2 px-5 py-2.5 bg-[#FAF9F6] border border-[#E8E6E1] rounded-xl text-[13px] font-bold text-[#1A1A1A]"
                    >
                      <Filter size={16} /> Filters
                    </button>
                 </div>
              </div>

              {loading ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
                  {Array.from({ length: 12 }).map((_, i) => (
                    <div
                      key={i}
                      className="aspect-[4/5] rounded-[2.5rem] bg-[#FAF9F6] animate-pulse border border-[#E8E6E1]"
                    />
                  ))}
                </div>
              ) : products.length === 0 ? (
                <div className="text-center py-20 bg-[#FAF9F6] rounded-[3rem] border border-dashed border-[#E8E6E1]">
                  <Package size={48} className="mx-auto text-gray-300 mb-6" />
                  <h2 className="text-2xl font-bold text-[#1A1A1A]">No products found</h2>
                  <p className="text-gray-500 mt-2 mb-8 max-w-xs mx-auto">
                    We couldn't find any products matching your current selection.
                  </p>
                  <button
                    onClick={() => navigate('/shop')}
                    className="px-8 py-3.5 rounded-xl bg-blue-600 text-white text-sm font-bold shadow-lg shadow-blue-500/10"
                  >
                    Clear All Filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
                  {products.map((p, i) => (
                    <motion.div
                      key={p.id}
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: i % 10 * 0.05 }}
                      className="group flex flex-col h-full bg-[#FAF9F6] rounded-[2rem] p-3.5 border border-[#E8E6E1] hover:border-blue-500/20 hover:shadow-[0_20px_40px_rgba(0,0,0,0.03)] transition-all duration-500"
                    >
                      {/* Image Container */}
                      <div className="relative aspect-square w-full mb-4 flex items-center justify-center p-3 bg-white rounded-[1.5rem] overflow-hidden group-hover:bg-blue-50/50 transition-colors duration-500">
                        <Link to={`/product/${p.slug}`} className="absolute inset-0 flex items-center justify-center p-4">
                          <img
                            src={getImagePath(p.images)}
                            alt={p.name}
                            width={400}
                            height={400}
                            className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-700 ease-out"
                            onError={(e) => { e.target.src = 'https://via.placeholder.com/400x400?text=' + encodeURIComponent(p.name); }}
                          />
                        </Link>

                        {/* Quick Action Overlay */}
                        <div className="absolute inset-0 flex items-center justify-center gap-1.5 opacity-0 group-hover:opacity-100 transition-all duration-500 bg-black/5 backdrop-blur-[2px] pointer-events-none group-hover:pointer-events-auto">
                          <Link to={`/product/${p.slug}`} className="h-8 w-8 rounded-lg bg-white text-[#1A1A1A] flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all shadow-lg active:scale-90">
                            <Eye size={14} />
                          </Link>
                          <button
                            onClick={(e) => { e.preventDefault(); toggleWishlist(p); }}
                            className="h-8 w-8 rounded-lg bg-white text-[#1A1A1A] flex items-center justify-center hover:bg-red-500 hover:text-white transition-all shadow-xl active:scale-90"
                          >
                            <Heart size={14} className={isInWishlist(p.id) ? 'fill-red-500 text-red-500' : ''} />
                          </button>
                        </div>
                      </div>

                      {/* Info Section */}
                      <div className="flex flex-col flex-1 px-1">
                        <Link to={`/product/${p.slug}`} className="block mb-2 flex-1">
                          <h3 className="text-[13px] font-bold text-[#1A1A1A] group-hover:text-blue-600 transition-colors leading-snug line-clamp-2">
                            {p.name}
                          </h3>
                        </Link>

                        <div className="flex items-center justify-between mt-auto">
                          <p className="text-[#1A1A1A] font-bold text-[15px] leading-none">${p.price}</p>
                          <button
                            onClick={(e) => handleAddToCart(e, p)}
                            className="h-9 w-9 rounded-xl bg-[#1A1A1A] text-white flex items-center justify-center hover:bg-blue-600 transition-all group/cart active:scale-90"
                          >
                            <ShoppingCart size={16} strokeWidth={2.5} />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </main>
          </div>
        </div>
      </section>

      {/* Mobile Filter Drawer */}
      <AnimatePresence>
        {isMobileFilterOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsMobileFilterOpen(false)}
              className="fixed inset-0 z-[200] bg-[#1A1A1A]/60 backdrop-blur-sm lg:hidden"
            />

            <motion.div 
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              className="fixed top-0 right-0 bottom-0 w-[88%] max-w-[360px] bg-white z-[210] lg:hidden flex flex-col shadow-2xl"
            >
              <div className="flex items-center justify-between px-6 py-5 border-b border-[#E8E6E1]">
                <h3 className="text-[14px] font-bold text-[#1A1A1A] uppercase tracking-widest">
                  Filters & Sorting
                </h3>
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="h-10 w-10 rounded-xl bg-[#FAF9F6] border border-[#E8E6E1] flex items-center justify-center text-[#1A1A1A]"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-8">
                {/* Search */}
                <div>
                  <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-3">Search Products</h4>
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                    <input
                      type="text"
                      placeholder="Product name..."
                      value={search}
                      onChange={(e) => updateFilter('search', e.target.value)}
                      className="w-full h-12 rounded-xl bg-[#FAF9F6] border border-[#E8E6E1] pl-11 pr-4 text-sm font-bold outline-none"
                    />
                  </div>
                </div>

                {/* Categories */}
                <div>
                  <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-3">Categories</h4>
                  <div className="flex flex-col gap-2">
                    <button
                      onClick={() => updateFilter('category', '')}
                      className={cn(
                        'text-left px-4 py-3.5 rounded-xl text-[13px] font-bold transition-all',
                        !category ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/10' : 'bg-[#FAF9F6] text-gray-600 border border-[#E8E6E1]'
                      )}
                    >
                      All Collections
                    </button>
                    {categories.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => updateFilter('category', cat.slug)}
                        className={cn(
                          'text-left px-4 py-3.5 rounded-xl text-[13px] font-bold transition-all capitalize',
                          category === cat.slug ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/10' : 'bg-[#FAF9F6] text-gray-600 border border-[#E8E6E1]'
                        )}
                      >
                        {cat.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sort */}
                <div>
                  <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-3">Sort By</h4>
                  <div className="flex flex-col gap-2">
                    {[
                      { value: 'newest', label: 'Latest Arrivals' },
                      { value: 'price_low', label: 'Price: Low to High' },
                      { value: 'price_high', label: 'Price: High to Low' },
                      { value: 'name_asc', label: 'Alphabetical' }
                    ].map((item) => (
                      <button
                        key={item.value}
                        onClick={() => updateFilter('sort', item.value)}
                        className={cn(
                          'text-left px-4 py-3.5 rounded-xl text-[13px] font-bold transition-all',
                          sort === item.value ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/10' : 'bg-[#FAF9F6] text-gray-600 border border-[#E8E6E1]'
                        )}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-6 border-t border-[#E8E6E1]">
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="w-full h-14 rounded-2xl bg-[#1A1A1A] text-white text-[14px] font-bold shadow-xl shadow-gray-200"
                >
                  Apply Filters
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

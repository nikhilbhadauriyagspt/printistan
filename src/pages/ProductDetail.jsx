import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import SEO from '@/components/SEO';
import { useCart } from '../context/CartContext';
import {
  Heart,
  ChevronRight,
  Truck,
  ShieldCheck,
  RefreshCcw,
  Loader2,
  Plus,
  Minus,
  CheckCircle,
  ShoppingBag,
  ArrowRight
} from 'lucide-react';
import { motion } from 'framer-motion';
import API_BASE_URL from '../config';
import { cn } from '../lib/utils';

export default function ProductDetail() {
  const { addToCart, toggleWishlist, isInWishlist, openCartDrawer } = useCart();
  const [isAdded, setIsAdded] = useState(false);
  const { slug } = useParams();

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setIsAdded(true);
    openCartDrawer();
    setTimeout(() => setIsAdded(false), 2000);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true);

    fetch(`${API_BASE_URL}/products/${slug}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 'success') {
          setProduct(data.data);

          const categories = data.data.categories || [];
          const categorySlug = categories.length > 0 ? categories[0].slug : '';

          let fetchUrl = `${API_BASE_URL}/products?limit=10`;
          if (categorySlug) fetchUrl += `&category=${categorySlug}`;

          fetch(fetchUrl)
            .then((res) => res.json())
            .then((relData) => {
              if (relData.status === 'success') {
                setRelatedProducts(
                  relData.data.filter((p) => p.id !== data.data.id)
                );
              }
            });
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [slug]);

  const getImages = (images) => {
    try {
      const imgs = typeof images === 'string' ? JSON.parse(images) : images;
      return Array.isArray(imgs) ? imgs.map((img) => `/${img}`) : [];
    } catch (e) {
      return [];
    }
  };

  const getImagePath = (images) => {
    try {
      const imgs = typeof images === 'string' ? JSON.parse(images) : images;
      if (Array.isArray(imgs) && imgs.length > 0) return `/${imgs[0]}`;
    } catch (e) {}
    return 'https://via.placeholder.com/400x400?text=Product';
  };

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-white font-['Poppins']">
        <Loader2 className="mb-5 h-8 w-8 animate-spin text-blue-600" strokeWidth={1.5} />
        <p className="text-xs font-semibold text-gray-400">Loading details...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-white px-6 text-center font-['Poppins'] text-slate-900">
        <div className="mb-8 flex h-20 w-20 items-center justify-center border border-gray-100 bg-gray-50 rounded-[22px]">
          <ShoppingBag size={30} className="text-gray-200" />
        </div>
        <h2 className="mb-4 text-lg font-bold">Product not found</h2>
        <Link
          to="/shop"
          className="inline-flex h-11 items-center gap-2 rounded-[14px] bg-blue-600 px-7 text-sm font-semibold text-white transition-all hover:bg-slate-900"
        >
          Return to Shop
        </Link>
      </div>
    );
  }

  const images = getImages(product.images);
  const mainImage =
    images.length > 0 ? images[activeImage] : 'https://via.placeholder.com/600x600?text=No+Image';

  return (
    <div className="min-h-screen bg-white pt-28 pb-20 font-['Poppins'] text-slate-900">
      <SEO
        title={`${product.name} | Printistan`}
        description={product.description?.substring(0, 160)}
      />

      <div className="mx-auto max-w-[1760px] px-4 md:px-8 lg:px-14">
        {/* BREADCRUMBS */}
        <nav className="mb-6 flex items-center gap-2 overflow-hidden text-[11px] font-semibold text-slate-400">
          <Link to="/" className="shrink-0 transition-colors hover:text-blue-600">
            Home
          </Link>
          <ChevronRight size={11} className="shrink-0" />
          <Link to="/shop" className="shrink-0 transition-colors hover:text-blue-600">
            Shop
          </Link>
          <ChevronRight size={11} className="shrink-0" />
          <span className="truncate font-medium capitalize text-slate-900">
            {product.name}
          </span>
        </nav>

        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-14">
          {/* LEFT: GALLERY */}
          <div className="space-y-5 lg:col-span-5">
            <div className="group relative flex aspect-square items-center justify-center overflow-hidden rounded-[28px] border border-slate-200 bg-[#fbfcff] p-6 md:p-10 transition-all">
              <motion.img
                key={activeImage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                src={mainImage}
                alt={product.name}
                width={600}
                height={600}
                className="max-h-[72%] max-w-[72%] object-contain transition-transform duration-700 group-hover:scale-105"
              />

              <div className="absolute top-4 right-4 z-20">
                <button
                  onClick={() => toggleWishlist(product)}
                  className={cn(
                    'flex h-10 w-10 items-center justify-center rounded-[14px] border transition-all duration-300',
                    isInWishlist(product.id)
                      ? 'border-red-500 bg-red-500 text-white shadow-lg shadow-red-500/20'
                      : 'border-slate-200 bg-white text-slate-400 hover:text-red-500'
                  )}
                >
                  <Heart
                    size={17}
                    fill={isInWishlist(product.id) ? 'currentColor' : 'none'}
                  />
                </button>
              </div>
            </div>

            {images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(idx)}
                    className={cn(
                      'flex h-16 w-16 shrink-0 items-center justify-center rounded-[16px] border-2 bg-white p-2 transition-all md:h-20 md:w-20',
                      activeImage === idx
                        ? 'border-blue-600'
                        : 'border-slate-100 hover:border-slate-200'
                    )}
                  >
                    <img 
                      src={img} 
                      alt="" 
                      width={80}
                      height={80}
                      className="max-h-full max-w-full object-contain" 
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT: INFO */}
          <div className="space-y-6 lg:col-span-7">
            <div className="space-y-3">
              <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-blue-600">
                Product Details
              </span>

              <h1 className="text-2xl font-bold leading-snug capitalize text-slate-900 md:text-3xl">
                {product.name}
              </h1>

              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-bold text-blue-600">
                  ${parseFloat(product.price).toLocaleString()}
                </span>
                {product.sale_price && (
                  <span className="text-base font-medium text-slate-300 line-through">
                    ${parseFloat(product.sale_price).toLocaleString()}
                  </span>
                )}
              </div>
            </div>

            <div className="space-y-3 rounded-[24px] border border-slate-100 bg-white p-5">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-2 text-slate-900">
                <h4 className="text-[10px] font-bold uppercase tracking-[0.2em]">
                  About this item
                </h4>
              </div>

              <p className="text-sm font-medium leading-relaxed text-slate-500">
                {product.description ||
                  'A high-performance printer solution engineered for professional and home use. Delivering consistent precision and absolute reliability for all your printing needs.'}
              </p>
            </div>

            <div className="space-y-6 border-t border-slate-100 pt-6">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-stretch">
                <div className="flex h-12 w-full items-center justify-between rounded-[16px] border border-slate-200 px-2 sm:w-[145px]">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="flex h-9 w-9 items-center justify-center rounded-[12px] text-slate-900 transition-all hover:bg-slate-50"
                  >
                    <Minus size={15} />
                  </button>

                  <span className="text-sm font-bold text-slate-900">{quantity}</span>

                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="flex h-9 w-9 items-center justify-center rounded-[12px] text-slate-900 transition-all hover:bg-slate-50"
                  >
                    <Plus size={15} />
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  disabled={isAdded}
                  className="flex h-12 flex-1 items-center justify-center gap-2 rounded-[16px] bg-blue-600 px-6 text-xs font-bold uppercase tracking-[0.18em] text-white transition-all hover:bg-slate-900 active:scale-95 disabled:opacity-50"
                >
                  {isAdded ? <CheckCircle size={18} /> : <ShoppingBag size={18} />}
                  {isAdded ? 'Added to Cart' : 'Buy It Now'}
                </button>
              </div>

              <div className="grid grid-cols-1 gap-4 rounded-[24px] border border-slate-100 bg-slate-50 p-4 sm:grid-cols-3">
                {[
                  {
                    icon: <Truck size={18} className="text-blue-600" />,
                    label: 'Fast shipping across USA',
                  },
                  {
                    icon: <ShieldCheck size={18} className="text-blue-600" />,
                    label: 'Secured checkout payment',
                  },
                  {
                    icon: <RefreshCcw size={18} className="text-blue-600" />,
                    label: '7-day easy return policy',
                  },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2.5">
                    <div className="shrink-0">{item.icon}</div>
                    <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-slate-600">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* RELATED PRODUCTS */}
        {relatedProducts.length > 0 && (
          <div className="mt-20 border-t border-slate-100 pt-12">
            <div className="mb-8 flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-900 md:text-2xl">
                Recommended Products
              </h2>
              <Link
                to="/shop"
                className="group flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-blue-600"
              >
                See all products
                <ArrowRight
                  size={13}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-8">
              {relatedProducts.slice(0, 8).map((p) => (
                <div
                  key={p.id}
                  className="group flex h-full flex-col overflow-hidden rounded-[20px] border border-slate-200 bg-white transition-all hover:border-blue-400"
                >
                  <div className="relative flex aspect-square w-full items-center justify-center border-b border-slate-100 bg-white p-3">
                    <Link to={`/product/${p.slug}`} className="absolute inset-0 z-10" />
                    <img
                      src={getImagePath(p.images)}
                      width={300}
                      height={300}
                      className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-105"
                      alt={p.name}
                    />
                  </div>

                  <div className="flex flex-1 flex-col p-3">
                    <Link to={`/product/${p.slug}`}>
                      <h3 className="mb-2 line-clamp-2 text-[11px] font-semibold uppercase text-slate-800 transition-colors group-hover:text-blue-600">
                        {p.name}
                      </h3>
                    </Link>
                    <span className="mt-auto text-sm font-bold text-slate-900">
                      ${parseFloat(p.price).toLocaleString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
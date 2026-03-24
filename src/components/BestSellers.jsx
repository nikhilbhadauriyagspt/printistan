import { ChevronLeft, ChevronRight, Heart } from "lucide-react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { cn } from "../lib/utils";

import 'swiper/css';
import 'swiper/css/navigation';

export default function BestSellers({ products = [] }) {
  const { addToCart, toggleWishlist, isInWishlist, openCartDrawer } = useCart();

  const handleAddToCart = (e, product) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    openCartDrawer();
  };

  const getImagePath = (images) => {
    try {
      const imgs = typeof images === 'string' ? JSON.parse(images) : images;
      if (Array.isArray(imgs) && imgs.length > 0) return `/${imgs[0]}`;
    } catch (e) { }
    return "https://via.placeholder.com/400x400?text=Product";
  };

  return (
    <section className="bg-white py-12 w-full border-b border-gray-100">
      <div className="w-full px-4 md:px-10">
        
        {/* --- HEADER --- */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight uppercase">
              Market <span className="text-cyan-600">Favourites</span>
            </h2>
            <div className="h-1 w-12 bg-cyan-500 mt-1" />
          </div>
          
          <div className="flex gap-2">
            <button className="bs-prev h-10 w-10 flex items-center justify-center rounded-full border border-gray-200 hover:bg-cyan-500 hover:text-white transition-all disabled:opacity-20 shadow-sm group">
              <ChevronLeft size={20} />
            </button>
            <button className="bs-next h-10 w-10 flex items-center justify-center rounded-full border border-gray-200 hover:bg-cyan-500 hover:text-white transition-all disabled:opacity-20 shadow-sm group">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* --- CAROUSEL --- */}
        <div className="relative">
          <Swiper
            modules={[Navigation, Autoplay]}
            spaceBetween={16}
            slidesPerView={1.2}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            navigation={{ prevEl: '.bs-prev', nextEl: '.bs-next' }}
            breakpoints={{
              480: { slidesPerView: 2 },
              768: { slidesPerView: 3 },
              1024: { slidesPerView: 4 },
              1280: { slidesPerView: 5 },
              1536: { slidesPerView: 6 },
            }}
          >
            {products.slice(0, 15).map((p) => (
              <SwiperSlide key={p.id}>
                <div className="bg-white border border-gray-100 rounded-xl p-4 flex flex-col h-full hover:border-cyan-500 transition-all duration-300 group">
                  {/* Image Section */}
                  <div className="relative aspect-square w-full mb-4 flex items-center justify-center overflow-hidden bg-gray-50 rounded-lg">
                    <Link to={`/product/${p.slug}`} className="absolute inset-0 z-10" />
                    <img 
                      src={getImagePath(p.images)} 
                      alt={p.name} 
                      className="max-h-[85%] max-w-[85%] object-contain transition-transform duration-500 group-hover:scale-105"
                      onError={(e) => { e.target.src = "https://via.placeholder.com/400x400?text=" + p.name; }}
                    />
                    
                    {/* Minimal Wishlist Button */}
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
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

      </div>
    </section>
  );
}

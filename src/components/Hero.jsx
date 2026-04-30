import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import API_BASE_URL from '../config';

const banners = [
  { id: 1, image: "/optimized/hero-main.avif", alt: "Premium Printers" },
  { id: 2, image: "/optimized/hero-slide2.avif", alt: "Latest Printer Models" },
  { id: 3, image: "/optimized/hero-slide3.avif", alt: "Printer Accessories" }
];

const Hero = () => {
  const [categories, setCategories] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/categories`);
        const data = await res.json();

        if (data.status === 'success') {
          const allCats = data.data.flatMap((parent) => parent.children || []);

          const categoryConfig = [
            { name: 'Inkjet Printers', image: '/category/inkjet-printers.jpg' },
            { name: 'Large Format Printers', image: '/category/large-format-printers.jpg' },
            { name: 'Printer Accessories', image: '/category/printer-accessories.jpg' },
            { name: 'Laser Printers', image: '/category/laser-printers.jpg' },
            { name: 'Supertank Printers', image: '/category/supertank-printers.jpg' },
            { name: 'LED Printers', image: '/category/led-printers.jpg' },
            { name: 'Thermal Printers', image: '/category/thermal-printers.jpg' },
            { name: 'Photo Printers', image: '/category/photo-printers.jpg' },
            { name: 'Dot Matrix Printers', image: '/category/dot-matrix-printers.jpg' },
            { name: 'All-In-One Printers', image: '/category/all-in-one-printers.jpg' },
          ];

          const filtered = allCats.filter((cat) =>
            categoryConfig.some(conf => conf.name === cat.name)
          );

          const sorted = categoryConfig
            .map((conf) => {
              const cat = filtered.find((c) => c.name === conf.name);
              return cat ? { ...cat, icon: conf.image } : null;
            })
            .filter(Boolean);

          setCategories(sorted);
        }
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % banners.length);
  }, []);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  return (
    <section className="w-full bg-[#f5f5f5] pt-4 md:pt-6 pb-6">
      <div className="max-w-[1920px] mx-auto px-3 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 xl:grid-cols-[320px_minmax(0,1fr)] gap-5 items-start">
          
          {/* Left Category Panel */}
          <div className="bg-white rounded-[24px] shadow-[0_10px_35px_rgba(0,0,0,0.05)] border border-[#ececec] overflow-hidden h-full">
            <div className="py-2">
              {categories.map((cat) => (
                <Link
                  key={cat.id}
                  to={`/shop?category=${cat.slug}`}
                  className="flex items-center justify-between px-5 md:px-6 py-3 text-[14px] md:text-[15px] font-medium text-[#1a1a1a] hover:bg-blue-50/50 hover:text-blue-600 transition-all duration-300 group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 md:w-10 md:h-10 rounded-full border border-gray-100 overflow-hidden flex-shrink-0 bg-gray-50 group-hover:border-blue-200 transition-colors">
                      <img 
                        src={cat.icon} 
                        alt={cat.name} 
                        width={40}
                        height={40}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/40x40?text=P';
                        }}
                      />
                    </div>
                    <span className="leading-tight">{cat.name}</span>
                  </div>
                  <ChevronRight size={16} className="text-gray-400 group-hover:text-blue-600 transition-all group-hover:translate-x-0.5" />
                </Link>
              ))}
            </div>
          </div>

          {/* Right Banner Slider */}
          <div 
            className="relative w-full overflow-hidden rounded-[28px] bg-[#d9ecff] h-[260px] sm:h-[340px] md:h-[430px] lg:h-[520px] xl:h-[660px]"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Banners */}
            {banners.map((banner, index) => (
              <Link
                key={banner.id}
                to="/shop"
                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                  index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
                }`}
              >
                <img
                  src={banner.image}
                  alt={banner.alt}
                  width={1920}
                  height={660}
                  fetchPriority={index === 0 ? "high" : undefined}
                  loading={index === 0 ? "eager" : "lazy"}
                  className="w-full h-full object-cover object-center"
                />
              </Link>
            ))}

            {/* Navigation Arrows */}
            <button
              onClick={(e) => { e.preventDefault(); prevSlide(); }}
              type="button"
              aria-label="Previous Slide"
              className={`absolute left-4 md:left-6 top-1/2 -translate-y-1/2 w-11 h-11 md:w-14 md:h-14 rounded-full bg-white/90 hover:bg-white text-[#1a1a1a] flex items-center justify-center shadow-lg z-20 transition-all duration-300 ${
                isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
              }`}
            >
              <ChevronLeft size={24} />
            </button>

            <button
              onClick={(e) => { e.preventDefault(); nextSlide(); }}
              type="button"
              aria-label="Next Slide"
              className={`absolute right-4 md:right-6 top-1/2 -translate-y-1/2 w-11 h-11 md:w-14 md:h-14 rounded-full bg-white/90 hover:bg-white text-[#1a1a1a] flex items-center justify-center shadow-lg z-20 transition-all duration-300 ${
                isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
              }`}
            >
              <ChevronRight size={24} />
            </button>

            {/* Progress Dots */}
            <div className="absolute bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2.5 bg-black/20 backdrop-blur-md px-4 py-2.5 rounded-full z-20">
              {banners.map((_, index) => (
                <button
                  key={index}
                  onClick={(e) => { e.preventDefault(); setCurrentSlide(index); }}
                  aria-label={`Go to slide ${index + 1}`}
                  className={`transition-all duration-300 rounded-full ${
                    index === currentSlide ? 'w-6 h-2.5 bg-white' : 'w-2.5 h-2.5 bg-white/50 hover:bg-white/70'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Assets
import banner1 from '@/assets/bannerr/banner6.png'; 
import banner2 from '@/assets/bannerr/newban2.png';



const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    { id: 2, image: banner2, link: "/shop" },
    
    { id: 4, image: banner1, link: "/shop" }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <section className="w-full bg-white pt-10 ">
      <div className="w-full  h-[400px] md:h-[750px]">
        <div className="relative w-full h-full overflow-hidden  shadow-sm group">
          {/* --- SLIDES --- */}
          {slides.map((slide, index) => (
            <Link
              key={slide.id}
              to={slide.link}
              className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
              }`}
            >
              <img
                src={slide.image}
                alt=""
                className="w-full h-full object-cover"
              />
            </Link>
          ))}

          {/* --- NAVIGATION ARROWS --- */}
          <button
            onClick={(e) => { e.preventDefault(); prevSlide(); }}
            className="absolute left-6 top-1/2 -translate-y-1/2 z-20 p-3 bg-white/20 hover:bg-white/40 text-white rounded-full transition-all opacity-0 group-hover:opacity-100 hidden md:block backdrop-blur-sm"
          >
            <ChevronLeft size={28} />
          </button>
          <button
            onClick={(e) => { e.preventDefault(); nextSlide(); }}
            className="absolute right-6 top-1/2 -translate-y-1/2 z-20 p-3 bg-white/20 hover:bg-white/40 text-white rounded-full transition-all opacity-0 group-hover:opacity-100 hidden md:block backdrop-blur-sm"
          >
            <ChevronRight size={28} />
          </button>

          {/* --- DOTS --- */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentSlide(i)}
                className={`h-1.5 rounded-full transition-all ${
                  currentSlide === i ? 'bg-white w-10' : 'bg-white/40 w-2'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

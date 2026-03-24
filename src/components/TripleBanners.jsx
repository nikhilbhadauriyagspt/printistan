import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

// Assets
import banner1 from '@/assets/bannerr/banner4.jpg';
import banner2 from '@/assets/bannerr/banner5.jpg';
import banner3 from '@/assets/bannerr/banner6.jpg';

const TripleBanners = () => {
  return (
    <section className="bg-white py-12 w-full border-b border-gray-100">
      <div className="w-full px-4 md:px-10">
        <div className="flex flex-col gap-6">
          
          {/* TOP: One Large Wide Banner */}
          <div className="w-full relative h-[300px] md:h-[400px] border border-gray-200 overflow-hidden">
            <img src={banner1} alt="" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent flex items-center">
              <div className="px-8 md:px-16 max-w-2xl text-white">
                <span className="text-cyan-400 font-bold uppercase tracking-[0.2em] text-[10px] md:text-xs block mb-2">Professional Series</span>
                <h3 className="text-3xl md:text-5xl font-bold  leading-none mb-4">Workplace Laser Elite</h3>
                <p className="text-gray-300 text-sm md:text-base font-medium mb-6 leading-relaxed">
                  High-speed printing for busy offices. Get sharp documents and reliable performance every single day.
                </p>
                <Link 
                  to="/shop?category=laser-printers" 
                  className="inline-block bg-cyan-500 text-slate-900 px-10 py-3 text-xs font-black uppercase tracking-widest hover:bg-cyan-600 transition-colors"
                >
                  Shop Now
                </Link>
              </div>
            </div>
          </div>

          {/* BOTTOM: Two Uniquely Sized Banners (60% and 40%) */}
          <div className="flex flex-col md:flex-row gap-6 h-auto md:h-[350px]">
            
            {/* Bottom Left: 60% Width */}
            <div className="w-full md:w-[60%] relative h-[300px] md:h-full border border-gray-200 overflow-hidden">
              <img src={banner2} alt="" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-8 text-white">
                <h3 className="text-2xl md:text-3xl font-bold  mb-2">Studio Inkjet</h3>
                <p className="text-gray-200 text-xs md:text-sm font-medium mb-4 max-w-md">Vibrant colors and professional photo quality for your creative projects.</p>
                <Link 
                  to="/shop?category=inkjet-printers" 
                  className="text-cyan-400 font-bold text-xs uppercase tracking-widest hover:text-white transition-colors flex items-center gap-2"
                >
                  Explore Collection <ArrowRight size={14} />
                </Link>
              </div>
            </div>

            {/* Bottom Right: 40% Width */}
            <div className="w-full md:w-[40%] relative h-[300px] md:h-full border border-gray-200 overflow-hidden">
              <img src={banner3} alt="" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/50 flex flex-col justify-end p-8 text-white">
                <h3 className="text-2xl font-bold  mb-2">Ink & Toner</h3>
                <p className="text-gray-200 text-xs font-medium mb-4">Original supplies for best results.</p>
                <Link 
                  to="/shop?search=ink" 
                  className="bg-white text-slate-900 px-6 py-2.5 text-[10px] font-black uppercase tracking-widest w-fit hover:bg-cyan-500 hover:text-white transition-all"
                >
                  Buy Now
                </Link>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default TripleBanners;

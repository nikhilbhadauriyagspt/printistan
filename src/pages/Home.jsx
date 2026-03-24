import Hero from "@/components/Hero";
import TopShowcase from "@/components/TopShowcase";
import SEO from "@/components/SEO";
import Collections from "@/components/Collections";
import ShopByCategory from "@/components/ShopByCategory";
import ProductGrid from "@/components/ProductGrid";
import CategorySlider from "@/components/CategorySlider";
import BestSellers from "@/components/BestSellers";
import TripleBanners from "@/components/TripleBanners";
import QuickPicks from "@/components/QuickPicks";
import TheVault from "@/components/TheVault";
import PromotionGrid from "@/components/PromotionGrid";
import { Shield, Wrench, ArrowUpRight, RefreshCw, ArrowRight, Loader2, ChevronRight, Zap, Globe, Layers } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import API_BASE_URL from "../config";
import { cn } from "../lib/utils";
import bannerImg from "../assets/bannerr/banner6.jpg";

export default function Home() {
  const [data, setData] = useState({
    all: [],
    printers: [],
    accessories: [],
    mixedArrivals: [],
    categories: [],
    brands: [],
    loading: true
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [prodRes, catRes, brandRes] = await Promise.all([
          fetch(`${API_BASE_URL}/products?limit=1000`).then(r => r.json()),
          fetch(`${API_BASE_URL}/categories`).then(r => r.json()),
          fetch(`${API_BASE_URL}/brands`).then(r => r.json())
        ]);

        if (prodRes.status === 'success' && catRes.status === 'success' && brandRes.status === 'success') {
          const allowedBrands = ["brother", "canon", "epson", "hp", "lexmark", "xerox"];
          const filteredBrands = brandRes.data.filter(b => allowedBrands.includes(b.name.trim().toLowerCase()));
          
          const all = prodRes.data.filter(p => 
            !p.name.toLowerCase().includes('laptop') && 
            !p.name.toLowerCase().includes('macbook') && 
            !p.name.toLowerCase().includes('notebook') &&
            !p.name.toLowerCase().includes('chromebook')
          );
          
          const printers = all.filter(p => 
            p.name.toLowerCase().includes('printer') || 
            p.name.toLowerCase().includes('laserjet') || 
            p.name.toLowerCase().includes('pixma')
          );
          const accessories = all.filter(p => 
            p.name.toLowerCase().includes('ink') || 
            p.name.toLowerCase().includes('toner') ||
            p.name.toLowerCase().includes('cable') ||
            p.name.toLowerCase().includes('adapter')
          );

          const shuffled = [...all].sort(() => 0.5 - Math.random());

          setData({
            all,
            printers,
            accessories,
            mixedArrivals: shuffled,
            categories: catRes.data,
            brands: filteredBrands,
            loading: false
          });
        }
      } catch (err) {
        console.error(err);
        setData(prev => ({ ...prev, loading: false }));
      }
    };

    fetchData();
  }, []);

  return (
    <div className="bg-white font-jakarta overflow-x-hidden text-slate-900">
      <SEO 
        title="Larry Printing Solutions | Quality Printers & Printer"
        description="Your trusted source for high-quality printers and printing printer. Delivering excellence across the USA."
      />

      <Hero />
      <TopShowcase products={data.all} />

      <ShopByCategory categories={data.categories} />
      <TripleBanners />
      <BestSellers products={data.all} />
      <Collections />
      <ProductGrid products={data.mixedArrivals.slice(0, 18)} />
      
      <CategorySlider 
        title="Office Printers"  
        products={data.printers} 
      />
       
     {/* --- CLEAN CONTACT CTA --- */}
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="w-full px-4 md:px-10">
          <div className="relative rounded-xl p-8 md:p-12 bg-cyan-900 text-white flex flex-col md:flex-row items-center justify-between gap-10 overflow-hidden shadow-xl">
            
            <div className="text-left space-y-3 max-w-xl relative z-10">
              <span className="text-[10px] font-black tracking-[0.3em] uppercase text-cyan-400">
                Support Excellence
              </span>
              <h2 className="text-3xl md:text-4xl font-bold ">
                Need expert  guidance?
              </h2>
              <p className="text-gray-400 text-sm md:text-base font-medium leading-relaxed">
                Our friendly team is always here to help you find the perfect printing solution for your needs.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto relative z-10">
              <Link
                to="/contact"
                className="bg-cyan-500 text-slate-900 px-10 h-12 flex items-center justify-center rounded font-bold text-xs uppercase tracking-widest transition-all hover:bg-white hover:text-slate-900 shadow-lg shadow-cyan-500/10 whitespace-nowrap"
              >
                Contact Us
              </Link>
              <Link
                to="/faq"
                className="bg-transparent border border-white/20 text-white px-10 h-12 flex items-center justify-center rounded font-bold text-xs uppercase tracking-widest transition-all hover:bg-white hover:text-slate-900 whitespace-nowrap"
              >
                View FAQ
              </Link>
            </div>

            {/* Subtle background decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-[80px]" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2 blur-[80px]" />
            
          </div>
        </div>
      </section>
    </div>
  );
}

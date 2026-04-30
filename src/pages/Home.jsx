import Hero from "@/components/Hero";
import Features from "@/components/Features";
import AboutSection from "@/components/AboutSection";
import TopShowcase from "@/components/TopShowcase";
import SEO from "@/components/SEO";
import Collections from "@/components/Collections";
import ShopByCategory from "@/components/ShopByCategory";
import PromoBanner from "@/components/PromoBanner";
import ProductGrid from "@/components/ProductGrid";
import CategorySlider from "@/components/CategorySlider";
import BestSellers from "@/components/BestSellers";
import TripleBanners from "@/components/TripleBanners";
import QuickPicks from "@/components/QuickPicks";
import SupportCTA from "@/components/SupportCTA";
import TheVault from "@/components/TheVault";
import PromotionGrid from "@/components/PromotionGrid";
import { ArrowUpRight, ArrowRight, Loader2, ChevronRight, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import API_BASE_URL from "../config";
import { cn } from "../lib/utils";
import bannerImg from "../assets/bannerr/banner6.png";

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
        title="Printistan | Professional Documentation & Imaging Solutions"
        description="Discover our extensive range of high-performance office imaging tools and reliable accessories. We provide expert consulting and nationwide delivery for all your business documentation needs across the USA."
      />

      <Hero />
     
      <AboutSection />

      <TripleBanners />
      
      <BestSellers products={data.all} loading={data.loading} />
      
      <PromoBanner />
           <ShopByCategory categories={data.categories} loading={data.loading} />

      <ProductGrid products={data.mixedArrivals.slice(0, 18)} loading={data.loading} />
              <Features />

       <Collections />
      {/* <CategorySlider 
        title="Office Printers"  
        products={data.printers} 
        loading={data.loading}
      /> */}
      <SupportCTA />
       
  </div>
  );
}

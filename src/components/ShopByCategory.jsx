import React from 'react';
import { Link } from "react-router-dom";
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function ShopByCategory({ categories = [], loading = false }) {
  const filteredCategories = categories.filter((cat) => {
    const name = cat.name.toLowerCase();
    const slug = cat.slug.toLowerCase();
    return (
      !name.includes('laptop') &&
      !slug.includes('laptop') &&
      !name.includes('computer') &&
      !name.includes('pc') &&
      !name.includes('chromebook') &&
      !name.includes('notebook')
    );
  });

  const subcategories = filteredCategories
    .flatMap((parent) => parent.children || [])
    .filter((sub) => {
      const name = sub.name.toLowerCase();
      const slug = sub.slug.toLowerCase();
      return (
        !name.includes('laptop') &&
        !slug.includes('laptop') &&
        !name.includes('computer') &&
        !name.includes('pc')
      );
    })
    .slice(0, 10);

  const getImagePath = (image) => {
    if (image) return `/${image}`;
    return "https://via.placeholder.com/300x300?text=Category";
  };

  return (
    <section className="w-full bg-[#f5f6fa] py-8 md:py-10 font-poppins">
      <div className="max-w-[1920px] mx-auto px-3 md:px-4">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-4 md:mb-5">
          <h2 className="text-[24px] md:text-[30px] font-extrabold uppercase text-black ">
            TOP CATEGORIES
          </h2>

          
        </div>

        {/* Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-5 xl:grid-cols-10 gap-3">
          {loading ? (
            Array.from({ length: 10 }).map((_, i) => (
              <div
                key={i}
                className="h-[210px] rounded-lg bg-white animate-pulse border border-gray-200"
              />
            ))
          ) : (
            subcategories.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="group"
              >
                <Link
                  to={`/shop?category=${item.slug}`}
                  className="h-[210px] bg-[#f7f7f7] border border-[#e6e6e6] rounded-lg flex flex-col items-center justify-center px-3 text-center transition-all duration-300 hover:bg-blue-600 hover:border-blue-600"
                >
                  {/* Big Circle Image */}
                  <div className="w-[110px] h-[110px] md:w-[120px] md:h-[120px] rounded-full overflow-hidden flex items-center justify-center bg-white shadow-sm mb-5 shrink-0">
                    <img
                      src={getImagePath(item.image)}
                      alt={item.name}
                      width={120}
                      height={120}
                      loading="lazy"
                      className="w-full  object-cover transition-transform duration-500 group-hover:scale-105"
                      onError={(e) => {
                        e.target.src =
                          "https://via.placeholder.com/300x300?text=" + item.name;
                      }}
                    />
                  </div>

                  {/* Normal Text */}
                  <span className="text-[15px] md:text-[16px] font-medium text-[#111111] leading-snug transition-all duration-300 group-hover:hidden">
                    {item.name}
                  </span>

                  {/* Hover Text */}
                  <span className="hidden group-hover:block text-[15px] md:text-[16px] font-semibold text-white tracking-wide">
                    Shop Now
                  </span>
                </Link>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
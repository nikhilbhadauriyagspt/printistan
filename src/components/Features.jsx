import React from 'react';
import { Globe, ShieldCheck, Box, RefreshCcw } from 'lucide-react';

const features = [
  {
    icon: <Globe className="text-blue-600 group-hover:text-white" size={20} strokeWidth={2.5} />,
    title: "Global Shipping",
    desc: "Reliable worldwide delivery."
  },
  {
    icon: <ShieldCheck className="text-blue-600 group-hover:text-white" size={20} strokeWidth={2.5} />,
    title: "Secure Checkout",
    desc: "100% protected payments."
  },
  {
    icon: <Box className="text-blue-600 group-hover:text-white" size={20} strokeWidth={2.5} />,
    title: "Elite Inventory",
    desc: "Curated reliable printing."
  },
  {
    icon: <RefreshCcw className="text-blue-600 group-hover:text-white" size={20} strokeWidth={2.5} />,
    title: "Easy Returns",
    desc: "Hassle-free 30-day policy."
  }
];

export default function Features() {
  return (
    <section className="w-full bg-white py-10">
      <div className=" mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {features.map((item, index) => (
            <div 
              key={index} 
              className="group flex items-center gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100 hover:border-blue-200 hover:bg-white hover:shadow-md transition-all duration-300"
            >
              <div className="shrink-0 h-10 w-10 bg-white rounded-lg flex items-center justify-center shadow-sm border border-slate-100 group-hover:bg-blue-600 transition-colors duration-300">
                {item.icon}
              </div>
              <div className="flex flex-col min-w-0">
                <h3 className="text-[13px] font-black text-slate-900 uppercase tracking-wide truncate">
                  {item.title}
                </h3>
                <p className="text-slate-500 text-[11px] font-bold leading-tight line-clamp-1">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

import React, { useState } from 'react';
import SEO from '@/components/SEO';
import { ChevronDown, ArrowRight, MessageCircle, HelpCircle, Info, ShieldCheck, Truck, RotateCcw, Headphones } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../lib/utils';

const faqs = [
  {
    category: "Orders & purchasing",
    icon: <ShieldCheck size={20} />,
    questions: [
      { q: "How do I place an order for a printer?", a: "To place an order, simply browse our catalog, select your desired model, and add it to your cart. Follow the secure checkout process to provide your shipping and payment information." },     
      { q: "Is a user account required to shop?", a: "No, we offer a guest checkout option. However, creating an account allows you to track your order history and manage your preferences more efficiently." },
      { q: "How can I verify my order status?", a: "Upon completing your purchase, an order confirmation email will be sent immediately. You can also use the 'Track Order' feature in your account dashboard." },
      { q: "Can I modify or cancel my order?", a: "Orders can be modified or cancelled if they have not yet entered the shipping phase. Please contact our support team immediately for assistance with changes." },
      { q: "What payment methods are accepted?", a: "We accept all major credit cards and PayPal. All transactions are processed through encrypted, secure payment gateways to ensure your data is protected." }
    ]
  },
  {
    category: "Shipping & logistics",
    icon: <Truck size={20} />,
    questions: [
      { q: "What are your delivery locations?", a: "We provide nationwide shipping to all residential and commercial addresses across the United States." },
      { q: "What is the estimated delivery timeframe?", a: "Standard delivery typically takes between 3 to 7 business days. You will receive a notification with a precise delivery window once your order is dispatched." },
      { q: "How are shipping costs calculated?", a: "Shipping fees are determined based on the destination and the weight of the printer. The final cost will be clearly displayed during the checkout process." },
      { q: "How can I track my shipment?", a: "A tracking number will be provided via email as soon as your order leaves our warehouse. You can monitor the real-time progress of your delivery through our carrier's portal." },
      { q: "What happens if I am unavailable for delivery?", a: "Our carriers typically attempt delivery on the following business day or leave a notification with instructions for local pickup or rescheduling." }
    ]
  },
  {
    category: "Product specifications",
    icon: <Info size={20} />,
    questions: [
      { q: "Are all products original and new?", a: "Yes, we exclusively sell brand-new, authentic printers in original manufacturer packaging with all factory seals intact." },
      { q: "Is there a warranty provided with the Printers?", a: "All printers include a full manufacturer's warranty, ensuring you have access to official support and repairs if required." },
      { q: "Do you provide  setup assistance?", a: "Yes, our  team is available to guide you through the initial installation and configuration of your new printer." },
      { q: "Are original consumables available for purchase?", a: "We maintain a comprehensive inventory of original ink and toner cartridges for all models we carry to ensure optimal performance." },
      { q: "How can I determine the right model for my needs?", a: "Consider your primary use case: high-speed text (Laser) or high-quality graphics (Inkjet). Our specialists are available to provide tailored recommendations." }
    ]
  },
  {
    category: "Returns & cancellations",
    icon: <RotateCcw size={20} />,
    questions: [
      { q: "What is your return policy?", a: "Unused products in their original, unopened packaging may be returned within 14 days of delivery for a full refund." },
      { q: "How is the refund processed?", a: "Once the returned item is inspected and approved, a refund will be issued to your original payment method within 5-7 business days." },
      { q: "What if the product arrives damaged?", a: "In the unlikely event of shipping damage, please report the issue immediately. We will arrange for a priority replacement or full refund." }
    ]
  },
  
];

export default function FAQ() {
  const [activeIdx, setActiveIdx] = useState(null);
  const [activeCategory, setActiveCategory] = useState(faqs[0].category);

  const toggle = (idx) => {
    setActiveIdx(activeIdx === idx ? null : idx);
  };

  const currentCategoryData = faqs.find(f => f.category === activeCategory);
  const filteredFaqs = currentCategoryData?.questions || [];

  return (
    <div className="bg-white min-h-screen font-jakarta text-slate-900 overflow-x-hidden">
      <SEO 
        title="Frequently Asked Questions |Inktrix Printers" 
        description="Find professional answers to your questions regarding printing support."
      />

      {/* --- PAGE HEADER (Home Page Style) --- */}
      <section className="pt-24 pb-16 bg-white border-b border-slate-50">
        <div className="w-full px-4 md:px-12 lg:px-20">
          <div className="flex flex-col items-center text-center">
            <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight">
              Frequently Asked <span className="text-blue-600">Questions</span>
            </h1>
            <div className="h-1.5 w-24 bg-blue-600 mt-6 rounded-full" />
            <p className="text-slate-500 text-lg font-bold mt-8 max-w-3xl leading-relaxed">
              Find comprehensive answers to common inquiries regarding our professional printing  support services.
            </p>
          </div>
        </div>
      </section>

      {/* --- CONTENT GRID (Full Width) --- */}
      <div className="w-full px-4 md:px-12 lg:px-20 py-20 bg-slate-50">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* LEFT: CATEGORY NAV */}
          <div className="lg:col-span-4 space-y-8">
            <div className="bg-white p-10 rounded-[40px] border border-slate-200 shadow-sm space-y-8">
              <h3 className="text-2xl font-black text-slate-900">Support Categories</h3>
              <div className="flex flex-col gap-3">
                {faqs.map((f) => (
                  <button
                    key={f.category}
                    onClick={() => { setActiveCategory(f.category); setActiveIdx(null); }}
                    className={cn(
                      "w-full text-left px-8 py-5 rounded-2xl text-[15px] font-black transition-all border flex items-center gap-4",
                      activeCategory === f.category 
                        ? "bg-blue-600 text-white border-blue-600 shadow-xl shadow-blue-100" 
                        : "bg-slate-50 text-slate-500 border-slate-100 hover:border-blue-600 hover:text-blue-600 hover:bg-white"
                    )}
                  >
                    <span className={cn(
                      "shrink-0",
                      activeCategory === f.category ? "text-white" : "text-blue-600"
                    )}>
                      {f.icon}
                    </span>
                    {f.category}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-slate-900 p-10 rounded-[40px] text-white space-y-6 overflow-hidden relative group">
               <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/20 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-blue-600/30 transition-colors" />
               <div className="flex items-center gap-3 relative z-10 text-blue-500">
                  <MessageCircle size={24} />
                  <h4 className="text-xl font-black">Direct Assistance</h4>
               </div>
               <p className="text-slate-400 font-medium leading-relaxed relative z-10">
                 Our support team is available to provide personalized assistance for complex inquiries or specific printer requirements.
               </p>
               <Link to="/contact" className="inline-flex items-center gap-2 font-black text-white hover:text-blue-500 transition-colors relative z-10 group/link">
                 Contact support team <ArrowRight size={18} className="group-hover/link:translate-x-1 transition-transform" />
               </Link>
            </div>
          </div>

          {/* RIGHT: ACCORDION PANEL */}
          <div className="lg:col-span-8">
            <div className="mb-10 flex items-center gap-4">
              <div className="h-10 w-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-100">
                {currentCategoryData?.icon}
              </div>
              <h2 className="text-3xl font-black text-slate-900">{activeCategory}</h2>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                {filteredFaqs.map((faq, i) => (
                  <div 
                    key={i}
                    className={cn(
                      "bg-white rounded-[32px] transition-all duration-500 overflow-hidden border shadow-sm",
                      activeIdx === i ? "shadow-2xl shadow-slate-200 border-blue-600/30" : "border-slate-200/60 hover:border-blue-600/50"
                    )}
                  >
                    <button
                      onClick={() => toggle(i)}
                      className="w-full flex items-center justify-between p-8 md:p-10 text-left group"
                    >
                      <span className={cn(
                        "text-xl font-black transition-colors leading-snug pr-8",
                        activeIdx === i ? "text-blue-600" : "text-slate-900 group-hover:text-blue-600"
                      )}>
                        {faq.q}
                      </span>
                      <div className={cn(
                        "h-12 w-12 rounded-2xl border flex items-center justify-center transition-all duration-500 shrink-0",
                        activeIdx === i ? "bg-blue-600 text-white border-blue-600 rotate-180 shadow-xl shadow-blue-100" : "bg-slate-50 border-slate-100 text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-600 group-hover:border-blue-100"
                      )}>
                        <ChevronDown size={22} />
                      </div>
                    </button>

                    <AnimatePresence>
                      {activeIdx === i && (
                        <motion.div 
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.4, ease: "easeOut" }}
                        >
                          <div className="px-10 pb-10 pt-2">
                            <div className="h-px w-full bg-slate-100 mb-8" />
                            <p className="text-slate-600 text-lg font-medium leading-relaxed max-w-4xl">
                              {faq.a}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>

      {/* --- BOTTOM CTA --- */}
      <section className="py-24 text-center bg-white border-t border-slate-50">
        <div className="w-full px-4 md:px-12 lg:px-20">
          <div className="max-w-4xl mx-auto space-y-12">
            <h2 className="text-4xl md:text-4xl font-black text-slate-900 tracking-tight leading-tight">
              Still require specialized <span className="text-blue-600">assistance?</span>
            </h2>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link 
                to="/contact" 
                className="w-full sm:w-auto bg-slate-900 text-white px-16 h-16 flex items-center justify-center rounded-full font-black text-sm transition-all hover:bg-blue-600 shadow-2xl shadow-slate-900/10 active:scale-95 group"
              >
                Inquire Directly <ArrowRight size={20} className="ml-3 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                to="/shop" 
                className="w-full sm:w-auto bg-white text-slate-900 border-2 border-slate-900 px-16 h-16 flex items-center justify-center rounded-full font-black text-sm transition-all hover:bg-slate-900 hover:text-white active:scale-95"
              >
                Explore Catalog
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

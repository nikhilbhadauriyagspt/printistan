import React from 'react';
import { Shield, Zap, Heart, ArrowRight, Printer, Mail, Phone, Info, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '@/components/SEO';

const About = () => {
  return (
    <div className="bg-white min-h-screen font-jakarta text-slate-900 overflow-x-hidden ">
      <SEO 
        title="About Larry Printing Solutions - Simple and Reliable Printing"
        description="Learn more about Larry Printing Solutions, our dedication to quality printer, and how we help you with your daily printing needs."
      />

      {/* --- MAIN STORY SECTION --- */}
      <section className="py-12 md:py-20 px-4 md:px-10">
        <div className=" mx-auto space-y-10">
          <div className="space-y-4">
            <h1 className="text-3xl md:text-5xl font-bold text-slate-900 tracking-tight">
              About Larry Printing Solutions
            </h1>
            <div className="h-1 w-20 bg-cyan-500" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-6 text-slate-600 leading-relaxed text-base md:text-lg">
              <p>
                Larry Printing Solutions was started with a simple goal: to make it easier for everyone to find the right printing tools without any confusion. We know that choosing a printer can be hard with all the technical words and different options out there. That is why we focus on selecting only the most reliable and easy-to-use models for our shop.
              </p>
              <p>
                Whether you are printing important documents for your business, school projects for your children, or beautiful photos for your home, we want to make sure you have a machine that works every time you press print. We don't believe in "fancy" gadgets that break easily; we believe in solid printer that provides value for your money.
              </p>
              <p>
                Our team spends a lot of time testing different brands and models to see which ones are actually the best for daily use. We look at how easy they are to set up, how long the ink lasts, and how well they handle different types of paper. If it doesn't meet our standards for reliability, we don't sell it.
              </p>
            </div>
            
            <div className="bg-gray-200 p-8 md:p-10 border border-gray-100 flex flex-col justify-center space-y-6">
              <h2 className="text-2xl font-bold text-slate-900">What we provide</h2>
              <ul className="space-y-4">
                <li className="flex gap-4">
                  <div className="mt-1 shrink-0 text-cyan-600"><Printer size={20} /></div>
                  <p className="text-sm md:text-base font-medium">Genuine printers selected from the most reliable manufacturers for their quality and performance.</p>
                </li>
                <li className="flex gap-4">
                  <div className="mt-1 shrink-0 text-cyan-600"><Shield size={20} /></div>
                  <p className="text-sm md:text-base font-medium">Authentic ink and toner cartridges that won't damage your machine.</p>
                </li>
                <li className="flex gap-4">
                  <div className="mt-1 shrink-0 text-cyan-600"><Zap size={20} /></div>
                  <p className="text-sm md:text-base font-medium">Simple setup guides and direct help from our team if you get stuck.</p>
                </li>
                <li className="flex gap-4">
                  <div className="mt-1 shrink-0 text-cyan-600"><Heart size={20} /></div>
                  <p className="text-sm md:text-base font-medium">A focus on customer satisfaction and long-term printer support.</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* --- DETAILED INFORMATION --- */}
      <section className="py-16 bg-gray-50 border-y border-gray-100 px-4 md:px-10">
        <div className=" mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <Info size={20} className="text-cyan-600" /> Choosing the right printer
              </h3>
              <div className="space-y-4 text-sm md:text-base text-slate-600 leading-relaxed">
                <p>
                  Most people ask us whether they should get an Inkjet or a Laser printer. We explain it simply: Inkjet printers are usually better if you print a lot of photos or colorful documents at home. They are compact and great for daily creative tasks.
                </p>
                <p>
                  Laser printers are built for speed and large amounts of text. If you have a home office or a small business where you print hundreds of pages of black-and-white documents, a laser printer will save you a lot of time and money in the long run.
                </p>
                <p>
                  We also offer "All-in-One" machines. These are perfect if you also need to scan old documents or make quick copies. Having one machine that does everything saves space on your desk and makes your daily work much smoother.
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <Shield size={20} className="text-cyan-600" /> Our commitment to you
              </h3>
              <div className="space-y-4 text-sm md:text-base text-slate-600 leading-relaxed">
                <p>
                  We are not just an online store; we are your partners in printing. When you buy from Larry Printing Solutions, you get the peace of mind that comes with knowing you have someone to talk to if things don't go as planned.
                </p>
                <p>
                  Our return policy is straightforward because we trust the quality of our products. If your printer arrives damaged or doesn't work as advertised, we will make it right quickly. We want you to be happy with your purchase for years, not just for the first few days.
                </p>
                <p>
                  We also care about the environment. That is why we encourage using high-capacity ink tanks and energy-efficient printers that help reduce waste. Proper printing printer can last a long time, and we are here to help you maintain yours.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- CONTACT & HELP --- */}
      <section className="py-20 px-4 md:px-10 bg-white">
        <div className="w-full mx-auto text-center space-y-12">
          <div className="space-y-4">
            <h2 className="text-2xl md:text-4xl font-bold text-slate-900">Need any help or have a question?</h2>
            <p className="text-slate-500 max-w-2xl mx-auto text-base">
              If you are not sure which printer is best for your needs, or if you need help with an order you already placed, please reach out to us. We love talking about printers and helping our customers find solutions.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <div className="p-6 border border-gray-100 rounded-lg">
              <div className="w-10 h-10 bg-gray-50 text-cyan-600 flex items-center justify-center mx-auto mb-4 rounded-full"><Mail size={20} /></div>
              <h4 className="font-bold mb-1">Email us</h4>
              <p className="text-xs text-slate-500">info@larryprintingsolutions.shop</p>
            </div>
            <div className="p-6 border border-gray-100 rounded-lg">
              <div className="w-10 h-10 bg-gray-50 text-cyan-600 flex items-center justify-center mx-auto mb-4 rounded-full"><MessageCircle size={20} /></div>
              <h4 className="font-bold mb-1">Chat Support</h4>
              <p className="text-xs text-slate-500">Fastest way to get an answer</p>
            </div>
          </div>

          <div className="pt-6">
            <Link 
              to="/shop" 
              className="inline-flex items-center gap-2 bg-slate-900 text-white px-10 py-4 font-bold text-sm hover:bg-cyan-500 transition-all shadow-md"
            >
              Browse our products <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;

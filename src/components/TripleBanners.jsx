import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

// Assets
import banner1 from '@/assets/bannerr/trip1.png';

const TripleBanners = () => {
  return (
    <section className="w-full bg-white ">
          <div className="w-full px-0 py-0">
            <div className="w-full h-[400px] md:h-[600px] lg:h-[800px] bg-slate-100 overflow-hidden border-b border-slate-100">
              <Link to="/shop" className="block w-full h-full">
                <img
                  src={banner1}
                  alt="Promotion Banner"
                  className="w-full h-full object-cover"
                />
              </Link>
            </div>
          </div>
        </section>
  );
};

export default TripleBanners;

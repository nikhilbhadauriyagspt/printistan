import React from 'react';
import { Link } from 'react-router-dom';

// Assets
import banner2 from '@/assets/bannerr/newban2.png';

const Hero = () => {
  return (
    <section className="w-full bg-white ">
      <div className="w-full px-0 py-0">
        <div className="w-full h-auto bg-slate-100 overflow-hidden border-b border-slate-100">
          <Link to="/shop" className="block w-full">
            <img
              src={banner2}
              alt="Promotion Banner"
              className="w-full h-auto"
            />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;

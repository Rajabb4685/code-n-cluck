import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import heroImage from '../assets/images/hero.jpg';

import food1 from '../assets/images/food1.jpg';
import food2 from '../assets/images/food2.jpg';
import food3 from '../assets/images/food3.jpg';
import food4 from '../assets/images/food4.jpg';
import food5 from '../assets/images/food5.jpg';
import food6 from '../assets/images/food6.jpg';

const galleryImages = [
  food1, food2, food3, food4, food5, food6
];

const Home = () => {
  return (
    // 💡 FIXED: Wrapping all content in a single div to ensure correct flow inside App.jsx's layout container
    <div className="w-full"> 
      {/* Hero Section (FULL WIDTH of its parent container) */}
    <section className="relative">
        <img src={heroImage} alt="Restaurant" className="w-full h-[500px] object-cover" />        
        
        {/* ✨ FIX: Added a semi-transparent black overlay for better text contrast. */}
        <div className="absolute inset-0 bg-black/50"></div> 
        
        {/* The text container should remain fully opaque on top of the overlay. */}
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-5xl md:text-6xl font-bold text-yellow-400">Dave's Hot Chicken</h1>
        </div>
      </section>

      {/* Content Container START: Defines the consistent max-width for the rest of the content */}
      <div className="mx-auto max-w-5xl"> 
        {/* About Section */}
        <section className="p-10 text-center">
          <h2 className="text-3xl font-bold mb-4">Welcome to Dave’s Hot Chicken</h2>
          <p className="max-w-2xl mx-auto text-lg text-gray-600">
            Experience the spiciest, juiciest chicken in town! Our Nashville-style
            hot chicken is made fresh daily using a secret blend of spices and love.
          </p>
        </section>

        {/* Gallery Section with Swiper */}
        <section className="p-10 bg-gray-50">
          <h2 className="text-3xl font-bold text-center mb-6">Our Gallery</h2>
          
          <div className="w-full">
            <Swiper
              modules={[Autoplay, Pagination, Navigation]}
              loop={true}
              spaceBetween={20}
              slidesPerView={1}
              autoplay={{ delay: 3000, disableOnInteraction: false }}
              pagination={{ clickable: true }}
              navigation={true}
              breakpoints={{
                640: { slidesPerView: 1 },
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
              }}
              className="mySwiper"
            >
              {galleryImages.map((imgSrc, index) => (
                <SwiperSlide key={index}>
                  <img 
                    src={imgSrc} 
                    className="w-full h-80 object-cover rounded-lg" 
                    alt={`Food ${index + 1}`} 
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </section>
      </div>
      {/* Content Container END */}
    </div>
  );
};

export default Home;
import React from 'react';

import food1 from '../assets/images/food1.jpg';
import food2 from '../assets/images/food2.jpg';
import food3 from '../assets/images/food3.jpg';
import food4 from '../assets/images/food4.jpg';
import food5 from '../assets/images/food5.jpg';
import food6 from '../assets/images/food6.jpg';

const galleryImages = [
  food1, food2, food3, food4, food5, food6
];

const About = () => {
  return (
    <>
      <section className="p-10 text-center">
        <h2 className="text-3xl font-bold mb-4">Our Story</h2>
        <p className="max-w-2xl mx-auto text-lg text-gray-600 mb-8">
          Founded on a love for true Nashville hot chicken, Dave's started as a simple pop-up and grew into a nationwide sensation. 
          We're committed to quality ingredients and seven levels of spice, from 'No Spice' to 'The Reaper.'
        </p>
      </section>
      
      <section className="p-10 bg-gray-50">
        <h2 className="text-3xl font-bold text-center mb-6">Gallery</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {galleryImages.map((imgSrc, index) => (
            <img 
              key={index}
              src={imgSrc} 
              className="w-full h-64 object-cover rounded-lg" 
              alt={`Food ${index + 1}`}
            />
          ))}
        </div>
      </section>
    </>
  );
};

export default About;
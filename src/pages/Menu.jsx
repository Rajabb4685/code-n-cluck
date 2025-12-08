import React from 'react';

import food7 from '../assets/images/food7.jpg';
import food8 from '../assets/images/food8.jpg';
import food9 from '../assets/images/food9.jpg';
import food10 from '../assets/images/food10.jpg';
import drink1 from '../assets/images/drink1.jpg';
import drink2 from '../assets/images/drink2.jpg';

const menuItemsData = [
  // Use imported variable 'food1' instead of string path
  { name: 'Hot Chicken Sandwich', price: 9.99, description: 'Spicy fried chicken with pickles & sauce', image: food7, type: 'Food' }, 
  { name: 'Tenders & Fries', price: 12.99, description: 'Crispy tenders served with seasoned fries', image: food8, type: 'Food' },
  { name: 'Mac & Cheese', price: 5.99, description: 'Classic creamy macaroni and cheese', image: food9, type: 'Food' },
  { name: 'Combo Plate', price: 15.50, description: '2 Tenders, 1 Slider, and Fries.', image: food10, type: 'Food' },
  { name: 'Lucky Charms Shake', price: 5.00, description: 'Vanilla Shake with Lucky Charms.', image: drink1, type: 'Drinks' },
  { name: 'Vanilla Shake', price: 4.75, description: 'Vanilla Milk Shake.', image: drink2, type: 'Drinks' },
];

const groupedMenu = menuItemsData.reduce((acc, item) => {
  acc[item.type] = acc[item.type] || [];
  acc[item.type].push(item);
  return acc;
}, {});

// Component now only needs the addToCart function as a prop
const Menu = ({ addToCart }) => { 
  
  return (
    <div className="p-10">
      {Object.entries(groupedMenu).map(([type, items]) => (
        <React.Fragment key={type}>
          <h2 className={`text-3xl font-bold mb-6 ${type === 'Food' ? 'mt-10' : ''}`}>{type}</h2>
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-10">
            {items.map((item, index) => (
              <div
                key={index}
                className="menu-item rounded-lg shadow-xl overflow-hidden bg-white hover:shadow-2xl transition duration-300"
              >
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-full h-48 object-cover"
                  onError={(e) => { e.target.onerror = null; e.target.src = '/assets/images/default.jpg' }}
                />
                <div className="p-4">
                  <h3 className="text-xl font-bold mb-1 flex justify-between">
                    {item.name} <span className="text-red-600 font-semibold">${item.price.toFixed(2)}</span>
                  </h3>
                  <p className="text-gray-600 mb-4 text-sm">{item.description}</p>
                  <button
                    // Calls the function passed down from App.jsx
                    onClick={() => addToCart(item.name, item.price)}
                    className={`add-to-cart w-full text-white px-4 py-2 rounded-md transition ${item.type === 'Food' ? 'bg-red-600 hover:bg-red-700' : 'bg-green-700 hover:bg-green-800'}`}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </section>
        </React.Fragment>
      ))}
    </div>
  );
};

export default Menu;
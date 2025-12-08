import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import Components
import Header from './components/Header';
import Footer from './components/Footer'; // Assuming you have one, if not, remove this
import Cart from './components/Cart';

// Import Pages
import Home from './pages/Home';
import Menu from './pages/Menu';
import About from './pages/About';
import Contact from './pages/Contact';

function App() {
  // 1. STATE: Lifted up to the top level
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // 2. HELPER: Add to Cart Function
  const addToCart = (name, price) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.name === name);
      if (existingItem) {
        // If item exists, increase quantity
        return prevItems.map((item) =>
          item.name === name ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        // Add new item
        return [...prevItems, { name, price, quantity: 1 }];
      }
    });
    // Optional: Open cart automatically when adding
    setIsCartOpen(true); 
  };

  // 3. HELPER: Update Quantity / Remove
  const updateQuantity = (name, delta) => {
    setCartItems((prevItems) => {
      return prevItems.map((item) => {
        if (item.name === name) {
          return { ...item, quantity: Math.max(0, item.quantity + delta) };
        }
        return item;
      }).filter(item => item.quantity > 0); // Remove items with 0 quantity
    });
  };

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        
        {/* HEADER: Passed props so the button works */}
        <Header totalItems={totalItems} setIsCartOpen={setIsCartOpen} />

        {/* MAIN CONTENT AREA */}
        {/* We add a margin on desktop if you want the cart always visible, 
            otherwise, the cart component handles the overlay */}
        <main className="flex-grow relative">
          <Routes>
            <Route path="/" element={<Home />} />
            {/* Pass addToCart to Menu so it can update the App's state */}
            <Route path="/menu" element={<Menu addToCart={addToCart} />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>

        <Footer />

        {/* CART SIDEBAR: Lives outside Routes so it's always accessible */}
        <Cart 
          isCartOpen={isCartOpen} 
          setIsCartOpen={setIsCartOpen}
          cartItems={cartItems}
          updateQuantity={updateQuantity}
        />
        
      </div>
    </Router>
  );
}

export default App;
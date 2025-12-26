import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';
import Cart from './components/Cart';
import Home from './pages/Home';
import Menu from './pages/Menu';
import About from './pages/About';
import Contact from './pages/Contact';

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (name, price) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.name === name);
      if (existingItem) {
        return prevItems.map((item) =>
          item.name === name ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevItems, { name, price, quantity: 1 }];
    });
    setIsCartOpen(true); 
  };

  const updateQuantity = (name, delta) => {
    setCartItems((prevItems) => 
      prevItems.map((item) => 
        item.name === name ? { ...item, quantity: Math.max(0, item.quantity + delta) } : item
      ).filter(item => item.quantity > 0)
    );
  };

  const handlePlaceOrder = async () => {
    const total = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    
    try {
      // UPDATED: Changed to 5001
      const response = await fetch("http://localhost:5001/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
            items: cartItems, 
            total: total 
        })
      });

      if (response.ok) {
        alert("Order sent to MongoDB!");
        setCartItems([]);
        setIsCartOpen(false);
      } else {
        alert("Failed to save order.");
      }
    } catch (error) {
      console.error("Connection error:", error);
      alert("Is your server.js running on port 5001?");
    }
  };

  return (
    <Router basename="/code-n-cluck"> 
      <div className="flex flex-col min-h-screen">
        <Header totalItems={cartItems.reduce((a,b) => a+b.quantity, 0)} setIsCartOpen={setIsCartOpen} />
        <main className="flex-grow relative">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Menu addToCart={addToCart} />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
        <Cart 
          isCartOpen={isCartOpen} 
          setIsCartOpen={setIsCartOpen}
          cartItems={cartItems}
          updateQuantity={updateQuantity}
          handlePlaceOrder={handlePlaceOrder}
        />
      </div>
    </Router>
  );
}

export default App;








// import React, { useState } from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Header from './components/Header';
// import Footer from './components/Footer';
// import Cart from './components/Cart';
// import Home from './pages/Home';
// import Menu from './pages/Menu';

// function App() {
//   const [cartItems, setCartItems] = useState([]);
//   const [isCartOpen, setIsCartOpen] = useState(false);

//   const addToCart = (name, price) => {
//     setCartItems((prev) => {
//       const existing = prev.find((item) => item.name === name);
//       if (existing) {
//         return prev.map((item) =>
//           item.name === name ? { ...item, quantity: item.quantity + 1 } : item
//         );
//       }
//       return [...prev, { name, price, quantity: 1 }];
//     });
//     setIsCartOpen(true);
//   };

//   const updateQuantity = (name, delta) => {
//     setCartItems((prev) =>
//       prev.map((item) =>
//         item.name === name ? { ...item, quantity: Math.max(0, item.quantity + delta) } : item
//       ).filter(item => item.quantity > 0)
//     );
//   };

//   // NEW: Function to send the order to MongoDB
//   const handlePlaceOrder = async () => {
//     const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    
//     try {
//       const response = await fetch("http://localhost:5000/api/orders", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ items: cartItems, total: total })
//       });

//       if (response.ok) {
//         const data = await response.json();
//         alert("Order Placed Successfully!");
//         setCartItems([]); // Clear cart
//         setIsCartOpen(false);
//       }
//     } catch (error) {
//       alert("Error connecting to server.");
//     }
//   };

//   return (
//     <Router basename="/code-n-cluck">
//       <div className="flex flex-col min-h-screen">
//         <Header totalItems={cartItems.reduce((a, b) => a + b.quantity, 0)} setIsCartOpen={setIsCartOpen} />
//         <main className="flex-grow">
//           <Routes>
//             <Route path="/" element={<Home />} />
//             <Route path="/menu" element={<Menu addToCart={addToCart} />} />
//           </Routes>
//         </main>
//         <Cart 
//           isCartOpen={isCartOpen} 
//           setIsCartOpen={setIsCartOpen}
//           cartItems={cartItems}
//           updateQuantity={updateQuantity}
//           handlePlaceOrder={handlePlaceOrder} // PASSING THE FUNCTION HERE
//         />
//         <Footer />
//       </div>
//     </Router>
//   );
// }

// export default App;



// -----------------------------------------------------------------

// import React, { useState } from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// // Import Components
// import Header from './components/Header';
// import Footer from './components/Footer'; // Assuming you have one, if not, remove this
// import Cart from './components/Cart';

// // Import Pages
// import Home from './pages/Home';
// import Menu from './pages/Menu';
// import About from './pages/About';
// import Contact from './pages/Contact';

// function App() {
//   // 1. STATE: Lifted up to the top level
//   const [cartItems, setCartItems] = useState([]);
//   const [isCartOpen, setIsCartOpen] = useState(false);

//   // 2. HELPER: Add to Cart Function
//   const addToCart = (name, price) => {
//     setCartItems((prevItems) => {
//       const existingItem = prevItems.find((item) => item.name === name);
//       if (existingItem) {
//         // If item exists, increase quantity
//         return prevItems.map((item) =>
//           item.name === name ? { ...item, quantity: item.quantity + 1 } : item
//         );
//       } else {
//         // Add new item
//         return [...prevItems, { name, price, quantity: 1 }];
//       }
//     });
//     // Optional: Open cart automatically when adding
//     setIsCartOpen(true); 
//   };

//   // 3. HELPER: Update Quantity / Remove
//   const updateQuantity = (name, delta) => {
//     setCartItems((prevItems) => {
//       return prevItems.map((item) => {
//         if (item.name === name) {
//           return { ...item, quantity: Math.max(0, item.quantity + delta) };
//         }
//         return item;
//       }).filter(item => item.quantity > 0); // Remove items with 0 quantity
//     });
//   };

//   const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

//   return (
//     // 📢 FIX: Added 'basename' to tell React Router the app lives in a subfolder
//     <Router basename="/code-n-cluck"> 
//       <div className="flex flex-col min-h-screen">
        
//         {/* HEADER: Passed props so the button works */}
//         <Header totalItems={totalItems} setIsCartOpen={setIsCartOpen} />

//         {/* MAIN CONTENT AREA */}
//         <main className="flex-grow relative">
//           <Routes>
//             <Route path="/" element={<Home />} />
//             {/* Pass addToCart to Menu so it can update the App's state */}
//             <Route path="/menu" element={<Menu addToCart={addToCart} />} />
//             <Route path="/about" element={<About />} />
//             <Route path="/contact" element={<Contact />} />
//           </Routes>
//         </main>

//         <Footer />

//         {/* CART SIDEBAR: Lives outside Routes so it's always accessible */}
//         <Cart 
//           isCartOpen={isCartOpen} 
//           setIsCartOpen={setIsCartOpen}
//           cartItems={cartItems}
//           updateQuantity={updateQuantity}
//         />
        
//       </div>
//     </Router>
//   );
// }

// export default App;
import React from 'react';

const Cart = ({ isCartOpen, setIsCartOpen, cartItems, updateQuantity }) => {
  // Calculate Total
  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  // If cart is closed, don't render anything to keep DOM clean
  if (!isCartOpen) return null;

  return (
    <>
      {/* OVERLAY: This is the element that dims the background.
          - bg-opacity-20 is the key to transparency.
          - backdrop-blur-sm visually confirms the background is visible.
      */}
      <div 
        className="fixed inset-0 top-[5.5rem] z-40 cursor-pointer cart-overlay-fix"
        onClick={() => setIsCartOpen(false)}
      ></div>

      {/* CART SIDEBAR - The z-index is higher (z-50) so it sits on top of the overlay (z-40) */}
      <div 
        className="fixed top-[5.5rem] right-0 w-full md:w-[350px] h-[calc(100vh-4.5rem)] bg-white shadow-xl z-50 overflow-y-auto border-l border-gray-200"
      >
        <div className="p-4">
          <div className="flex justify-between items-center mb-4 border-b pb-4">
            <h2 className="text-2xl font-bold text-red-600">Your Order</h2>
            <button 
              onClick={() => setIsCartOpen(false)}
              className="text-gray-500 hover:text-red-600 font-bold"
            >
              Close
            </button>
          </div>

          <div className="space-y-4">
            {cartItems.length === 0 ? (
              <p className="text-gray-500 text-center py-10">Cart is empty.</p>
            ) : (
              cartItems.map((item, index) => (
                <div key={index} className="flex justify-between items-center bg-gray-50 p-3 rounded shadow-sm">
                  <div>
                    <h4 className="font-bold text-sm">{item.name}</h4>
                    <p className="text-xs text-gray-500">${item.price.toFixed(2)}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button 
                      onClick={() => updateQuantity(item.name, -1)}
                      className="bg-gray-200 px-2 rounded hover:bg-gray-300"
                    >-</button>
                    <span className="font-semibold">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.name, 1)}
                      className="bg-gray-200 px-2 rounded hover:bg-gray-300"
                    >+</button>
                  </div>
                </div>
              ))
            )}
          </div>

          {cartItems.length > 0 && (
            <div className="mt-6 pt-4 border-t border-gray-200">
              <div className="flex justify-between text-xl font-bold mb-4">
                <span>Total:</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              <button className="w-full bg-red-600 text-white py-3 rounded-lg font-bold hover:bg-red-700 transition">
                Checkout
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Cart;
import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import logo from '../assets/logo.png';

// Header now accepts props for cart state management
const Header = ({ totalItems, setIsCartOpen }) => { 
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Menu', path: '/menu' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header className="flex justify-between items-center p-5 bg-red-600 text-white sticky top-0 z-40"> {/* Added sticky top and z-40 */}
      <Link to="/">
<img src={logo} alt="Logo" className="h-12 cursor-pointer hover:opacity-80 transition" />      </Link>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex space-x-6">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `hover:text-yellow-300 ${isActive ? 'font-bold underline underline-offset-4' : ''}`
            }
          >
            {item.name}
          </NavLink>
        ))}
      </nav>
      
      {/* Cart Button (Visible on all pages) */}
      <button 
        // Only show this button on the Menu page (or conditionally render based on current route if needed)
        // For simplicity, we assume this button is always available in the header.
        onClick={() => setIsCartOpen(true)}
        className="bg-yellow-400 text-red-600 px-4 py-2 rounded-full font-bold shadow-md hover:bg-yellow-300 transition"
      >
        Cart ({totalItems})
      </button>


      {/* Hamburger Button (Mobile Menu is unchanged) */}
      <div className="md:hidden">
        <button id="menu-btn" className="focus:outline-none" onClick={toggleMenu}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`${isMenuOpen ? 'flex' : 'hidden'} absolute top-[4.5rem] left-0 right-0 z-10 
        bg-red-600 text-white flex-col items-center space-y-4 py-4 md:hidden`}
      >
        {navItems.map((item) => (
          <Link key={item.name} to={item.path} onClick={() => setIsMenuOpen(false)}>
            {item.name}
          </Link>
        ))}
      </div>
    </header>
  );
};

export default Header;
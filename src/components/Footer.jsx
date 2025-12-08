import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-6 text-center">
      <p>Follow us:</p>
      <div className="flex justify-center space-x-6 my-3">
        <a href="#" className="hover:text-yellow-400">Facebook</a>
        <a href="#" className="hover:text-yellow-400">Instagram</a>
        <a href="#" className="hover:text-yellow-400">Twitter</a>
      </div>
      <p>Open Daily: 11am - 10pm</p>

      {/* <p>This is a student project</p> */}
    </footer>
  );
};

export default Footer;
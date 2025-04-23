
import React from 'react';

const Footer = () => {
  return (
    <footer className="py-10 border-t border-glitch-outline">
      <div className="container max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <span className="text-white font-bold text-xl tracking-wider">
              GLITCH<span className="text-glitch-neon-pink">.</span>
            </span>
          </div>
          
          <div className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} Glitch Design. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

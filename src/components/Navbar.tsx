
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <header 
      className={cn(
        "fixed top-0 left-0 w-full z-50 transition-all duration-300",
        isScrolled ? "bg-glitch-darker/80 backdrop-blur-lg py-3" : "bg-transparent py-6"
      )}
    >
      <div className="container max-w-6xl mx-auto px-6 flex items-center justify-between">
        <a href="#" className="text-white font-bold text-xl tracking-wider relative">
          GLITCH
          <span className="text-glitch-neon-pink">.</span>
          {/* Small glitch effect on the dot */}
          <span className="absolute -right-1.5 top-0 w-3 h-3 bg-glitch-electric-blue rounded-full opacity-50 animate-glitch"></span>
        </a>
        
        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center space-x-10">
          {['About', 'Services', 'Portfolio', 'Contact'].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase()}`} 
              className="text-gray-300 hover:text-white transition-colors duration-300 relative group"
            >
              {item}
              <span className="absolute bottom-0 left-0 w-full h-[1px] bg-glitch-neon-pink transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
            </a>
          ))}
        </nav>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-white focus:outline-none"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <div className="w-6 flex flex-col items-end space-y-1.5">
            <span className={cn(
              "block h-0.5 bg-white transition-all duration-300",
              isMobileMenuOpen ? "w-6 transform rotate-45 translate-y-2" : "w-6"
            )}></span>
            <span className={cn(
              "block h-0.5 bg-white transition-all duration-300",
              isMobileMenuOpen ? "w-0 opacity-0" : "w-4"
            )}></span>
            <span className={cn(
              "block h-0.5 bg-white transition-all duration-300",
              isMobileMenuOpen ? "w-6 transform -rotate-45 -translate-y-2" : "w-5"
            )}></span>
          </div>
        </button>
      </div>
      
      {/* Mobile Menu */}
      <div 
        className={cn(
          "fixed inset-0 bg-glitch-darker/95 backdrop-blur-lg z-40 flex flex-col items-center justify-center transition-all duration-300 md:hidden",
          isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
      >
        <nav className="flex flex-col items-center space-y-8">
          {['About', 'Services', 'Portfolio', 'Contact'].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase()}`} 
              className="text-white text-2xl font-medium hover:text-glitch-neon-pink transition-colors duration-300"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {item}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;

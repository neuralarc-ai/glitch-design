
import React, { useEffect } from 'react';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import ServicesSection from '@/components/ServicesSection';
import PortfolioSection from '@/components/PortfolioSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import ContactSection from '@/components/ContactSection';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Index = () => {
  // Initialize intersection observer for reveal animations
  useEffect(() => {
    // Add noise background and scanline effects
    const noiseElement = document.createElement('div');
    noiseElement.className = 'noise-bg';
    document.body.appendChild(noiseElement);
    
    const scanlineElement = document.createElement('div');
    scanlineElement.className = 'scanline';
    document.body.appendChild(scanlineElement);
    
    return () => {
      document.body.removeChild(noiseElement);
      document.body.removeChild(scanlineElement);
    };
  }, []);
  
  return (
    <div className="overflow-x-hidden">
      <Navbar />
      
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <PortfolioSection />
      <TestimonialsSection />
      <ContactSection />
      
      <Footer />
    </div>
  );
};

export default Index;


import React, { useState } from 'react';
import GlitchText from './GlitchText';
import { Button } from '@/components/ui/button';
import RevealOnScroll from './RevealOnScroll';
import DiscoveryCallModal from './DiscoveryCallModal';

const HeroSection = () => {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <section className="relative min-h-screen flex items-center justify-center p-6">
      {/* Glitch Overlay */}
      <div className="absolute inset-0 bg-glitch-darker z-0 overflow-hidden">
        {/* Animated grid lines */}
        <div className="absolute inset-0 opacity-5">
          <div className="h-full w-full" style={{
            backgroundImage: 'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
            backgroundSize: '40px 40px'
          }}></div>
        </div>
        {/* Animated horizontal interference lines */}
        <div className="absolute inset-0">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="absolute h-px bg-glitch-neon-pink/30 w-full"
              style={{
                top: `${5 + (i * 5)}%`,
                left: 0,
                animation: `scanline ${3 + Math.random() * 7}s linear infinite`,
                animationDelay: `${Math.random() * 2}s`,
                opacity: Math.random() * 0.5
              }}
            ></div>
          ))}
        </div>
      </div>
      <div className="container z-10 max-w-5xl text-center">
        <RevealOnScroll>
          <GlitchText
            text="GLITCH DESIGN"
            element="h1"
            glitchEffect="heavy"
            className="text-5xl sm:text-6xl md:text-7xl font-bold mb-4 text-white tracking-wider text-center" // Added text-center
          />
        </RevealOnScroll>
        <RevealOnScroll delay={200}>
          <p className="text-2xl sm:text-3xl md:text-4xl mb-10 text-glitch-electric-blue font-light glitch-hero-cap line-clamp-3 text-center">
            Born to disrupt. Built for outliers.<br />
            This is branding for the bold.
          </p>
        </RevealOnScroll>
        <RevealOnScroll delay={400} className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button className="glitch-button text-lg" variant="outline">
            View Our Work
          </Button>
          <Button
            className="glitch-button text-lg"
            variant="outline"
            onClick={() => setModalOpen(true)}
          >
            Book a Discovery Call
          </Button>
        </RevealOnScroll>
      </div>
      <DiscoveryCallModal open={modalOpen} onOpenChange={setModalOpen} />
    </section>
  );
};

export default HeroSection;

import React from 'react';
import GlitchText from './GlitchText';
import RevealOnScroll from './RevealOnScroll';

// Import valid icons from lucide-react that match our needs
import { 
  Palette, 
  Layout,
  Film, 
  Sparkles 
} from 'lucide-react';

const services = [
  {
    icon: Palette,
    title: "Brand Identity",
    description: "Logos, style guides, tone of voice",
    color: "glitch-neon-pink"
  },
  {
    icon: Layout,
    title: "UI/UX Design",
    description: "Interfaces that feel like instinct",
    color: "glitch-electric-blue"
  },
  {
    icon: Film,
    title: "Motion Graphics",
    description: "Kinetic stories, digital rhythm",
    color: "glitch-acid-green"
  },
  {
    icon: Sparkles,
    title: "Digital Art",
    description: "Glitch-infused, abstract, immersive visuals",
    color: "glitch-neon-pink"
  }
];

const ServicesSection = () => {
  return (
    <section id="services" className="py-20 relative">
      <div className="container max-w-6xl mx-auto px-6">
        <RevealOnScroll>
          <GlitchText 
            text="What We Do Best" 
            element="h2" 
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-12 text-center text-white"
          />
        </RevealOnScroll>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <RevealOnScroll key={service.title} delay={index * 100}>
              <div className="glitch-card p-6 rounded-lg h-full flex flex-col justify-between min-h-[240px] group">
                <div className="mb-4 relative">
                  <div className={`w-14 h-14 flex items-center justify-center rounded-lg bg-${service.color}/10 group-hover:bg-${service.color}/20 transition-colors duration-300`}>
                    <service.icon 
                      className={`w-7 h-7 text-${service.color}`} 
                      strokeWidth={1.5}
                    />
                  </div>
                  
                  <div 
                    className="absolute -inset-1 bg-gradient-to-r from-glitch-neon-pink to-glitch-electric-blue opacity-0 group-hover:opacity-30 blur rounded-lg transition-opacity duration-300"
                    style={{ mixBlendMode: 'overlay' }}
                  ></div>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-white group-hover:text-shadow-glow transition-all duration-300">
                    {service.title}
                  </h3>
                  <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                    {service.description}
                  </p>
                </div>
                
                {/* Animated corner accent */}
                <div className="absolute bottom-0 right-0 w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 right-0 w-5 h-[1px] bg-glitch-neon-pink"></div>
                  <div className="absolute bottom-0 right-0 w-[1px] h-5 bg-glitch-neon-pink"></div>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;

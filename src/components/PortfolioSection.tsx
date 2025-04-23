
import React, { useState } from 'react';
import GlitchText from './GlitchText';
import RevealOnScroll from './RevealOnScroll';

const portfolioItems = [
  {
    title: "NeoBank UI Kit",
    description: "Mobile finance dashboard",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=600&h=400&q=80"
  },
  {
    title: "Pixel Verse",
    description: "Immersive digital art exploration",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&h=400&q=80"
  },
  {
    title: "TaskMaster Pro",
    description: "B2B dashboard UX",
    image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=600&h=400&q=80"
  },
  {
    title: "Bold Brand Launch",
    description: "Animated brand story visuals",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=600&h=400&q=80"
  }
];

const PortfolioSection = () => {
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);

  return (
    <section id="portfolio" className="py-20 relative">
      <div className="container max-w-6xl mx-auto px-6">
        <RevealOnScroll>
          <GlitchText 
            text="Featured Work" 
            element="h2" 
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-12 text-center text-white"
          />
        </RevealOnScroll>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {portfolioItems.map((item, index) => (
            <RevealOnScroll key={item.title} delay={index * 150}>
              <div 
                className="relative overflow-hidden rounded-lg aspect-[3/2] group"
                onMouseEnter={() => setHoveredItem(index)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <div className="absolute inset-0 bg-glitch-darker/40 group-hover:bg-glitch-darker/10 z-10 transition-colors duration-300"></div>
                
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Glitch overlay on hover */}
                {hoveredItem === index && (
                  <div className="absolute inset-0 z-[11] overflow-hidden opacity-20">
                    <div className="absolute inset-0 animate-glitch" style={{
                      backgroundImage: `url(${item.image})`, 
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      filter: 'hue-rotate(90deg) saturate(200%)'
                    }}></div>
                  </div>
                )}
                
                {/* Content overlay */}
                <div className="absolute inset-0 flex flex-col justify-end p-6 z-20">
                  <div className="transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <h3 className="text-xl font-semibold mb-1 text-white">
                      {item.title}
                    </h3>
                    <p className="text-gray-300">
                      {item.description}
                    </p>
                    
                    <div className="mt-4 inline-block">
                      <span className="text-glitch-neon-pink text-sm uppercase tracking-wider font-mono relative">
                        View Project
                        <span className="absolute bottom-0 left-0 w-full h-[1px] bg-glitch-neon-pink transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                      </span>
                    </div>
                  </div>
                </div>
                
                {/* Border accents */}
                <div className="absolute bottom-0 left-0 w-5 h-5 z-20">
                  <div className="absolute bottom-0 left-0 w-5 h-[1px] bg-glitch-neon-pink transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                  <div className="absolute bottom-0 left-0 w-[1px] h-5 bg-glitch-neon-pink transform scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-bottom"></div>
                </div>
                
                <div className="absolute top-0 right-0 w-5 h-5 z-20">
                  <div className="absolute top-0 right-0 w-5 h-[1px] bg-glitch-electric-blue transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-right"></div>
                  <div className="absolute top-0 right-0 w-[1px] h-5 bg-glitch-electric-blue transform scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-top"></div>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;

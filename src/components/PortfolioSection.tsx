import React, { useState } from 'react';
import GlitchText from './GlitchText';
import RevealOnScroll from './RevealOnScroll';

// Featured works gallery – now includes your 4 provided images
const portfolioItems = [
  {
    title: "Project Dashboard",
    description: "UI dashboard for project management",
    image: "/lovable-uploads/82af9673-1b2a-4676-b482-2a44aedd8368.png"
  },
  {
    title: "Glitch Studio Gallery",
    description: "Bold modern landing – Brand & Strategy",
    image: "/lovable-uploads/3d5f9cda-8922-4582-b325-cda099c754f8.png"
  },
  {
    title: "SYNTHIKA & Investment",
    description: "Branding, growth, investment dashboards",
    image: "/lovable-uploads/9ddb7119-d663-4dec-b84a-75f903c3cccc.png"
  },
  {
    title: "Brikon Onboarding",
    description: "Creative solution for startups, onboarding flow",
    image: "/lovable-uploads/b2f4b73a-ed63-4c9d-a39a-4a511f8e8b6e.png"
  },
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

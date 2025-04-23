
import React from "react";
import RevealOnScroll from "./RevealOnScroll";
import GlitchText from "./GlitchText";

// Images provided by user with creative project names
const featuredWorks = [
  {
    img: "/lovable-uploads/b2f4b73a-ed63-4c9d-a39a-4a511f8e8b6e.png",
    title: "Chromatic Synapse",
  },
  {
    img: "/lovable-uploads/9ddb7119-d663-4dec-b84a-75f903c3cccc.png",
    title: "Neon Skyline Dashboard",
  },
  {
    img: "/lovable-uploads/82af9673-1b2a-4676-b482-2a44aedd8368.png",
    title: "Futuresynth Portal",
  },
  {
    img: "/lovable-uploads/3d5f9cda-8922-4582-b325-cda099c754f8.png",
    title: "Signal Drift Studio",
  },
];

const PortfolioSection = () => {
  return (
    <section id="portfolio" className="py-20 bg-background relative">
      <div className="container max-w-6xl mx-auto px-6">
        <RevealOnScroll>
          <GlitchText
            text="Signal. Noise. Art."
            element="h2"
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-12 text-center text-white"
          />
        </RevealOnScroll>
        <p className="text-center max-w-2xl mx-auto text-lg mb-10 text-glitch-electric-blue/80 font-light">
          Explore our gallery where code and color collide—crafted for brands that see the world differently, designed for impact that leaves a mark in memory and the matrix.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {featuredWorks.map((work, i) => (
            <RevealOnScroll key={work.img} delay={i * 100}>
              <div className="glitch-card bg-glitch-dark p-3 rounded-xl overflow-hidden shadow-xl flex flex-col items-center">
                <div className="w-full aspect-video bg-black rounded-lg overflow-hidden mb-4">
                  <img
                    src={work.img}
                    alt={work.title}
                    className="object-cover w-full h-full"
                  />
                </div>
                <h3 className="text-xl font-semibold text-white text-center">
                  {work.title}
                </h3>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;

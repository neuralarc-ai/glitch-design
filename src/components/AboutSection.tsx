
import React from 'react';
import GlitchText from './GlitchText';
import RevealOnScroll from './RevealOnScroll';

const AboutSection = () => {
  return (
    <section id="about" className="py-20 relative">
      <div className="container max-w-5xl mx-auto px-6">
        <RevealOnScroll>
          <GlitchText
            text="We Break, Then Build."
            element="h2"
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 text-white"
          />
        </RevealOnScroll>

        <p className="text-center max-w-3xl mx-auto text-lg mb-8 text-glitch-acid-green/90 font-light">
          Our signature? Transformation—with sparks and static. We convert chaos to clarity and turn static into signal for brands ready to reboot the rules.
        </p>

        <RevealOnScroll delay={200}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="glitch-card p-6 rounded-lg">
              <p className="text-lg text-gray-300 leading-relaxed">
                At Glitch Design, we believe in beautifully fractured beginnings. <span className="text-glitch-neon-pink font-bold">Distort. Disrupt. Deliver.</span> We're a design studio forging new visual languages at the intersection of art and technology. Expect the unexpected—our work is raw, authentic, and ruthlessly creative.
              </p>
            </div>
            <div className="relative h-full min-h-[200px]">
              <div className="absolute inset-0 bg-gradient-to-r from-glitch-neon-pink to-glitch-electric-blue opacity-20 rounded-lg"></div>
              <div className="absolute inset-0 backdrop-blur-sm border border-glitch-outline rounded-lg overflow-hidden">
                {/* Animated code-like elements */}
                {Array.from({ length: 10 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-3 bg-white/5 my-3 rounded"
                    style={{
                      width: `${30 + Math.random() * 60}%`,
                      marginLeft: '20px',
                      animation: `glitch-flash ${3 + Math.random() * 5}s infinite`
                    }}
                  ></div>
                ))}

                {/* Small glitch elements */}
                {Array.from({ length: 5 }).map((_, i) => (
                  <div
                    key={`glitch-${i}`}
                    className="absolute bg-glitch-neon-pink/30"
                    style={{
                      top: `${Math.random() * 80}%`,
                      left: `${Math.random() * 80}%`,
                      width: `${5 + Math.random() * 20}px`,
                      height: `${1 + Math.random() * 4}px`,
                      animation: `glitch ${0.5 + Math.random() * 2}s ease-in-out infinite alternate`
                    }}
                  ></div>
                ))}
              </div>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
};

export default AboutSection;

import React, { useState, useEffect } from 'react';
import GlitchText from './GlitchText';
import RevealOnScroll from './RevealOnScroll';

const testimonials = [
  {
    quote: "Glitch Design turned our static into pure signal. Never felt more seen.",
    client: "VFX.ai"
  },
  {
    quote: "Their visual storytelling hits like a bug in the Matrix—but perfectly on brand.",
    client: "FutureWare"
  },
  {
    quote: "They made us look more futuristic than our own roadmap.",
    client: "ModularMuse"
  }
];

const TestimonialsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="testimonials" className="py-20 relative">
      <div className="container max-w-5xl mx-auto px-6">
        <RevealOnScroll>
          <GlitchText
            text="Distorted. Delivered. Devoured."
            element="h2"
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-16 text-center text-white" // Added text-center
          />
        </RevealOnScroll>
        <p className="text-center max-w-2xl mx-auto text-lg mb-8 text-glitch-acid-green/80 font-light">
          Don’t just take our word for it—these digital pioneers plugged in, glitched out, and leveled up. Here’s what they said after their own signal boost.
        </p>
        <div className="relative h-40">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={`absolute inset-0 flex flex-col items-center justify-center transition-all duration-700 ${
                activeIndex === index ? 'opacity-100 transform-none' : 'opacity-0 translate-y-8'
              }`}
            >
              <p className="text-xl sm:text-2xl md:text-3xl font-light text-center mb-4 text-white">
                "{testimonial.quote}"
              </p>
              <p className="text-glitch-neon-pink text-sm uppercase tracking-wider font-mono">
                — {testimonial.client}
              </p>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-10 space-x-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                activeIndex === index ? 'bg-glitch-neon-pink w-8' : 'bg-gray-600'
              }`}
              onClick={() => setActiveIndex(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;

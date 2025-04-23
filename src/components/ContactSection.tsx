
import React, { useState } from 'react';
import GlitchText from './GlitchText';
import RevealOnScroll from './RevealOnScroll';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Instagram, Linkedin } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  
  const { toast } = useToast();
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    toast({
      title: "Message sent!",
      description: "We'll get back to you as soon as possible.",
    });
    setFormData({ name: '', email: '', message: '' });
  };
  
  return (
    <section id="contact" className="py-20 relative">
      <div className="container max-w-5xl mx-auto px-6">
        <RevealOnScroll>
          <GlitchText 
            text="Get in Touch. Let's Distort the Norm." 
            element="h2" 
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-12 text-center text-white"
          />
        </RevealOnScroll>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <RevealOnScroll>
            <div className="glitch-card p-6 rounded-lg h-full">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Input
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleChange}
                    className="glitch-input"
                    required
                  />
                </div>
                
                <div>
                  <Input
                    name="email"
                    type="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="glitch-input"
                    required
                  />
                </div>
                
                <div>
                  <Textarea
                    name="message"
                    placeholder="Project Idea"
                    value={formData.message}
                    onChange={handleChange}
                    className="glitch-input min-h-[120px]"
                    required
                  />
                </div>
                
                <Button type="submit" className="glitch-button w-full">
                  Send Message
                </Button>
              </form>
            </div>
          </RevealOnScroll>
          
          <RevealOnScroll delay={200}>
            <div className="flex flex-col justify-between h-full">
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4 text-white">Let's Connect</h3>
                <p className="text-gray-400 mb-6">
                  Ready to push the boundaries of digital design? We're here to bring your boldest ideas to life with our distorted touch.
                </p>
                
                <div className="space-y-4">
                  <a href="mailto:hello@glitchdesign.com" className="block text-gray-300 hover:text-glitch-neon-pink transition-colors">
                    hello@glitchdesign.com
                  </a>
                  <a href="tel:+12345678901" className="block text-gray-300 hover:text-glitch-neon-pink transition-colors">
                    +1 (234) 567-8901
                  </a>
                </div>
              </div>
              
              <div>
                <h4 className="text-lg font-medium mb-4 text-white">Follow Us</h4>
                <div className="flex space-x-4">
                  <a href="#" className="w-10 h-10 flex items-center justify-center rounded-full border border-glitch-outline hover:border-glitch-neon-pink transition-colors">
                    <Instagram className="text-gray-300 hover:text-glitch-neon-pink transition-colors" size={20} />
                  </a>
                  <a href="#" className="w-10 h-10 flex items-center justify-center rounded-full border border-glitch-outline hover:border-glitch-neon-pink transition-colors">
                    <Linkedin className="text-gray-300 hover:text-glitch-neon-pink transition-colors" size={20} />
                  </a>
                </div>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;

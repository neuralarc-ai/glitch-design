import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import Captcha from "./Captcha";

const ContactSection = () => {
  const { toast } = useToast();
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
    captcha: "",
  });
  const [captchaValid, setCaptchaValid] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleCaptchaChange = (valid: boolean, value: string) => {
    setCaptchaValid(valid);
    setForm(f => ({ ...f, captcha: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!captchaValid) {
      toast({
        title: "Captcha failed",
        description: "Please solve the captcha correctly.",
        variant: "destructive",
      });
      return;
    }

    setSubmitting(true);
    try {
      const apiUrl = import.meta.env.VITE_API_URL || '/api';
      const response = await fetch(`${apiUrl}/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: form.message,
        }),
      });

      const data = await response.json();

      if (data.success) {
        toast({
          title: "Message sent!",
          description: "We'll reply with a signal—never static.",
        });
        setForm({ name: "", email: "", message: "", captcha: "" });
        setCaptchaValid(false);
      } else {
        throw new Error(data.error || 'Failed to send message');
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send your message. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="py-20 bg-glitch-dark/80 relative" id="contact">
      <div className="container max-w-3xl mx-auto px-6">
        <div className="glitch-card p-8 rounded-lg shadow-xl">
          <h2 className="font-bold text-3xl sm:text-4xl md:text-5xl text-white mb-2 text-center">
            Get In Touch
          </h2>
          <p className="text-center mb-8 text-glitch-neon-pink font-light text-lg">
            Got a wild idea or burning question? <span className="font-bold">Break the ice. Start a glitch.</span>
          </p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              name="name"
              placeholder="Name"
              value={form.name}
              onChange={handleChange}
              required
              className="glitch-input bg-transparent border-glitch-neon-pink/50 focus:border-glitch-neon-pink text-white placeholder:text-gray-400"
              disabled={submitting}
            />
            <Input
              name="email"
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
              className="glitch-input bg-transparent border-glitch-neon-pink/50 focus:border-glitch-neon-pink text-white placeholder:text-gray-400"
              disabled={submitting}
            />
            <Textarea
              name="message"
              placeholder="Your message"
              value={form.message}
              onChange={handleChange}
              className="glitch-input min-h-[100px] bg-transparent border-glitch-neon-pink/50 focus:border-glitch-neon-pink text-white placeholder:text-gray-400"
              required
              disabled={submitting}
            />
            <Captcha disabled={submitting} onResult={handleCaptchaChange} />
            <div className="flex justify-end mt-6">
              <Button
                type="submit"
                className="glitch-button text-lg"
                disabled={submitting}
              >
                {submitting ? "Sending..." : "Send Message"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;

import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import Captcha from "./Captcha";

interface DiscoveryCallModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const DiscoveryCallModal: React.FC<DiscoveryCallModalProps> = ({ open, onOpenChange }) => {
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", email: "", details: "", captcha: "" });
  const [submitting, setSubmitting] = useState(false);
  const [captchaValid, setCaptchaValid] = useState(false);

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
      const response = await fetch('/api/discovery-call', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          details: form.details,
        }),
      });

      const data = await response.json();

      if (data.success) {
        toast({
          title: "Discovery call booked!",
          description: "We'll contact you soon to confirm your appointment.",
        });
        setForm({ name: "", email: "", details: "", captcha: "" });
        setCaptchaValid(false);
        onOpenChange(false);
      } else {
        throw new Error(data.error || 'Failed to send request');
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send your request. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-background border-glitch-neon-pink max-w-md w-full">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-white mb-2">
            Book a Discovery Call
          </DialogTitle>
          <p className="text-gray-400 mb-2 text-sm">
            Plug into our frequency—just a few details and we'll reach back within one business day. Let's break something ordinary and build something legendary together.
          </p>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            required
            className="glitch-input"
            disabled={submitting}
          />
          <Input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            className="glitch-input"
            disabled={submitting}
          />
          <Textarea
            name="details"
            placeholder="Tell us about your project, your vision, or your wildest idea."
            value={form.details}
            onChange={handleChange}
            className="glitch-input min-h-[100px]"
            required
            disabled={submitting}
          />
          <Captcha disabled={submitting} onResult={handleCaptchaChange} />
          <div className="flex justify-end space-x-2 mt-4">
            <DialogClose asChild>
              <Button type="button" variant="outline" disabled={submitting}>
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" className="glitch-button" disabled={submitting}>
              {submitting ? "Sending..." : "Book Now"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default DiscoveryCallModal;

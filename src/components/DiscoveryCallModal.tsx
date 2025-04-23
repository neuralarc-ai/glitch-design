
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

  const handleSubmit = (e: React.FormEvent) => {
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
    setTimeout(() => {
      toast({
        title: "Discovery call booked!",
        description: "We'll contact you soon to confirm your appointment.",
      });
      setForm({ name: "", email: "", details: "", captcha: "" });
      setCaptchaValid(false);
      setSubmitting(false);
      onOpenChange(false);
    }, 800);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-background border-glitch-neon-pink max-w-md w-full">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-white mb-2">
            Book a Discovery Call
          </DialogTitle>
          <p className="text-gray-400 mb-2 text-sm">
            Plug into our frequency—just a few details and we’ll reach back within one business day. Let’s break something ordinary and build something legendary together.
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
              {submitting ? "Booking..." : "Book Now"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default DiscoveryCallModal;

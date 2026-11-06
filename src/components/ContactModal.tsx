'use client';

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, CheckCircle2, ArrowRight, MessageCircle } from 'lucide-react';
import { useActiveWhatsApp } from '@/hooks/useActiveWhatsApp';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultPlan?: string;
}

export const ContactModal: React.FC<ContactModalProps> = ({
  isOpen,
  onClose,
  defaultPlan,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    service: defaultPlan || 'Custom Software & Web Apps',
    budget: '$5,000 – $15,000',
    message: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { getDynamicWhatsAppUrl } = useActiveWhatsApp();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (defaultPlan) {
      setFormData((prev) => ({ ...prev, service: defaultPlan }));
    }
  }, [defaultPlan]);

  // Lock body scroll and handle browser back button + ESC
  useEffect(() => {
    if (!isOpen) {
      document.body.style.overflow = 'unset';
      return;
    }

    document.body.style.overflow = 'hidden';
    window.history.pushState({ modal: 'contact' }, '');

    const handlePopState = () => {
      onClose();
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('popstate', handlePopState);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!mounted || !isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 800);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    onClose();
  };

  return createPortal(
    <div className="fixed inset-0 z-[999999] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-xl rounded-3xl bg-[#090f0b] border border-[#00FC43]/40 p-6 sm:p-9 shadow-[0_0_60px_rgba(0,252,67,0.25)] text-left z-10 my-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 w-9 h-9 rounded-full bg-white/5 border border-white/10 hover:border-[#00FC43]/50 flex items-center justify-center text-neutral-400 hover:text-white transition-colors cursor-pointer"
          aria-label="Close dialog"
        >
          <X className="w-4 h-4" />
        </button>

        {isSubmitted ? (
          <div className="py-10 text-center flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-[#00FC43]/20 border border-[#00FC43] flex items-center justify-center text-[#00FC43] mb-5 shadow-[0_0_30px_#00FC43]">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="editorial-serif text-2xl sm:text-3xl font-normal text-white mb-2">
              Proposal Request Received
            </h3>
            <p className="text-xs sm:text-sm text-neutral-300 max-w-md mx-auto leading-relaxed mb-6">
              Thank you, <span className="text-[#00FC43] font-medium">{formData.name}</span>.
              A senior solutions architect will review your project scope and deliver a proposal within 24–48 hours.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full max-w-sm">
              <a
                href={getDynamicWhatsAppUrl(
                  `Hi TOTO Development,\n\nName: ${formData.name}\nEmail: ${formData.email}\nCompany: ${formData.company || 'N/A'}\nService: ${formData.service}\nBudget: ${formData.budget}\nMessage: ${formData.message}`
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="brand-glow-button px-5 py-2.5 rounded-full text-xs font-bold text-[#041608] inline-flex items-center justify-center gap-2 w-full sm:w-auto shadow-[0_0_20px_rgba(0,252,67,0.5)]"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>Instant WhatsApp Priority</span>
              </a>

              <button
                type="button"
                onClick={handleReset}
                className="px-5 py-2.5 rounded-full text-xs font-semibold text-white bg-white/5 border border-white/10 hover:border-white/20 transition-all w-full sm:w-auto"
              >
                Close Window
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00FC43]/10 border border-[#00FC43]/30 text-[11px] font-mono text-[#00FC43] mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00FC43] animate-pulse" />
                <span>DIRECT ARCHITECT ACCESS</span>
              </div>
              <h2 className="editorial-serif text-2xl sm:text-3xl font-normal text-white tracking-tight">
                Request a Custom <span className="italic text-[#00FC43]">Strategy & Proposal</span>
              </h2>
              <p className="text-xs sm:text-sm text-neutral-400 mt-2">
                Tell us about your objectives. We will analyze your requirements and assemble a milestone blueprint.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-1.5">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Marcus Vance"
                    className="w-full px-4 py-2.5 rounded-xl dark-input text-sm text-white placeholder-neutral-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-1.5">
                    Work Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="marcus@company.com"
                    className="w-full px-4 py-2.5 rounded-xl dark-input text-sm text-white placeholder-neutral-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-1.5">
                    Company Name
                  </label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="Acme Global Inc"
                    className="w-full px-4 py-2.5 rounded-xl dark-input text-sm text-white placeholder-neutral-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-1.5">
                    Primary Service / Package
                  </label>
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl dark-input text-sm text-white bg-[#0a120c] focus:outline-none"
                  >
                    <option value="Custom Software & ERP">Custom Software & ERP</option>
                    <option value="Website Development (Next.js)">Website Development (Next.js)</option>
                    <option value="Digital Marketing & SEO">Digital Marketing & SEO</option>
                    <option value="Meta & Google Ads">Meta & Google Ads</option>
                    <option value="Commercial Video & Motion">Commercial Video & Motion</option>
                    <option value="Brand Design & 3D Packaging">Brand Design & 3D Packaging</option>
                    <option value="রুপালীকা প্যাকেজ (৳৯,৯৯৯/মাস)">রুপালীকা প্যাকেজ (৳৯,৯৯৯/মাস)</option>
                    <option value="সোনালীকা প্যাকেজ (৳১২,৪৯৯/মাস)">সোনালীকা প্যাকেজ (৳১২,৪৯৯/মাস)</option>
                    <option value="অগ্রযাত্রা প্যাকেজ (৳১৭,৯৯৯/মাস)">অগ্রযাত্রা প্যাকেজ (৳১৭,৯৯৯/মাস)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-1.5">
                  Investment Budget Range
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                  {['৳১০,০০০ – ৳২৫,০০০', '৳২৫,০০০ – ৳৫০,০০০', '৳৫০,০০০ – ৳১,০০,০০০+', 'Enterprise Scope'].map((b) => (
                    <button
                      type="button"
                      key={b}
                      onClick={() => setFormData({ ...formData, budget: b })}
                      className={`py-2 px-2 text-center rounded-lg border transition-all ${
                        formData.budget === b
                          ? 'border-[#00FC43] bg-[#00FC43]/20 text-[#00FC43] font-bold'
                          : 'border-white/10 bg-white/5 text-neutral-300 hover:border-white/20'
                      }`}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-1.5">
                  Project Scope & Objectives *
                </label>
                <textarea
                  rows={3}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Describe your current system, target deadline, and business goals..."
                  className="w-full px-4 py-2.5 rounded-xl dark-input text-sm text-white placeholder-neutral-500 focus:outline-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full brand-glow-button py-3.5 rounded-full font-bold text-sm text-[#041608] flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <span>{isSubmitting ? 'Transmitting Request...' : 'Send Proposal Request'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <p className="text-[11px] text-neutral-500 text-center mt-2.5">
                  Strict NDA guaranteed. No spam. Direct response from senior architects.
                </p>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>,
    document.body
  );
};

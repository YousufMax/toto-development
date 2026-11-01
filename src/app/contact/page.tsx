'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  ShieldCheck,
  Zap,
  Globe2,
  Mail,
  Phone,
  MapPin,
  CheckCircle2,
  MessageCircle,
} from 'lucide-react';
import { Badge } from '@/components/Badge';
import { SITE_CONFIG } from '@/lib/data';
import { useActiveWhatsApp } from '@/hooks/useActiveWhatsApp';

export default function ContactPage() {
  const { getDynamicWhatsAppUrl } = useActiveWhatsApp();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    service: 'Custom Software & ERP',
    budget: '৳১০,০০০ – ৳২৫,০০০',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 800);
  };

  return (
    <div className="relative pt-36 md:pt-44 pb-24 overflow-hidden">
      <section className="relative px-4 max-w-6xl mx-auto mb-20 text-center">
        <Badge variant="emerald">DIRECT ARCHITECT ACCESS</Badge>

        <h1 className="editorial-serif text-4xl sm:text-6xl md:text-7xl font-bold text-white mt-6 tracking-tight leading-[1.08] max-w-4xl mx-auto">
          Start Your Technical <br className="hidden sm:inline" />
          <span className="editorial-serif italic font-normal text-[#00FC43]">
            Discovery & Proposal
          </span>
        </h1>

        <p className="text-base sm:text-lg text-neutral-300 max-w-2xl mx-auto mt-6 leading-relaxed font-normal">
          Direct dialogue with senior solutions architects. Detailed technical breakdown, architectural
          assessment, and fixed-scope proposal within 48 hours.
        </p>
      </section>

      <section className="max-w-6xl mx-auto px-4 mb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct Inquiries & Office Hubs */}
          <div className="lg:col-span-5 space-y-8">
            <div className="p-8 rounded-3xl bg-[#0a120c] border border-white/10 shadow-xl">
              <h3 className="editorial-serif text-2xl font-normal text-white mb-2">
                Direct Communications
              </h3>
              <p className="text-xs sm:text-sm text-neutral-400 mb-6">
                Our Khulna headquarters team coordinates directly to guarantee swift delivery and dedicated support.
              </p>

              <div className="space-y-4 text-xs sm:text-sm">
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-[#00FC43] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-neutral-400 block text-xs">Email Proposals</span>
                    <a
                      href={`mailto:${SITE_CONFIG.contactEmail}`}
                      className="text-white hover:text-[#00FC43] transition-colors font-mono font-medium"
                    >
                      {SITE_CONFIG.contactEmail}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-[#00FC43] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-neutral-400 block text-xs">Direct Line</span>
                    <span className="text-white font-mono">{SITE_CONFIG.contactPhone}</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-white/10 space-y-3">
                <div className="flex items-center gap-2 text-xs text-neutral-300">
                  <ShieldCheck className="w-4 h-4 text-[#00FC43]" />
                  <span>Strict Mutual NDA Signed Prior to Deep Dive</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-neutral-300">
                  <Zap className="w-4 h-4 text-[#00FC43]" />
                  <span>48-Hour Proposal Turnaround</span>
                </div>
              </div>
            </div>

            {/* Agency Headquarters */}
            <div className="p-8 rounded-3xl bg-[#0a120c] border border-white/10 shadow-xl space-y-5">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-mono uppercase tracking-widest text-[#00FC43]">
                  Agency Headquarters
                </h4>
                <span className="w-2 h-2 rounded-full bg-[#00FC43] shadow-[0_0_8px_#00FC43] animate-pulse" />
              </div>
              <div className="border-l-2 border-[#00FC43]/60 pl-3.5 space-y-2">
                <span className="text-base font-bold text-white block">Khulna, Bangladesh</span>
                <span className="text-xs text-[#00FC43] font-mono block">Centralized Operations & Production Studio</span>
                <p className="text-xs text-neutral-300 leading-relaxed pt-1">
                  256 Upper Road, Mou Market 3rd Floor,<br />
                  Sonadanga, Khulna - 9000,<br />
                  Bangladesh
                </p>
                <div className="pt-3 border-t border-white/10 flex flex-col gap-1 text-[11px] font-mono text-neutral-400">
                  <div className="flex items-center justify-between">
                    <span>Working Hours:</span>
                    <span className="text-neutral-200">09:00 AM – 08:00 PM</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Open Days:</span>
                    <span className="text-neutral-200">Saturday – Thursday</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Proposal Form */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-[#101b14] via-[#0a120c] to-[#050805] border border-[#00FC43]/30 shadow-[0_0_50px_rgba(0,252,67,0.15)]">
              {isSubmitted ? (
                <div className="py-12 text-center flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-[#00FC43]/20 border border-[#00FC43] flex items-center justify-center text-[#00FC43] mb-6 shadow-[0_0_30px_#00FC43]">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="editorial-serif text-3xl font-normal text-white mb-3">
                    Proposal Request Dispatched
                  </h3>
                  <p className="text-sm text-neutral-300 max-w-md mx-auto leading-relaxed mb-6">
                    Thank you, <span className="text-[#00FC43] font-semibold">{formData.name}</span>.
                    Our technical lead has received your specifications and will deliver a detailed roadmap within 24–48 hours.
                  </p>

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full max-w-md">
                    <a
                      href={getDynamicWhatsAppUrl(
                        `Hi TOTO Development,\n\nName: ${formData.name}\nEmail: ${formData.email}\nCompany: ${formData.company || 'N/A'}\nService: ${formData.service}\nBudget: ${formData.budget}\nMessage: ${formData.message}`
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="brand-glow-button px-6 py-3 rounded-full text-xs font-bold text-[#041608] inline-flex items-center justify-center gap-2 w-full sm:w-auto shadow-[0_0_20px_rgba(0,252,67,0.5)]"
                    >
                      <MessageCircle className="w-4 h-4 fill-current" />
                      <span>Instant WhatsApp Priority</span>
                    </a>

                    <button
                      type="button"
                      onClick={() => setIsSubmitted(false)}
                      className="px-6 py-3 rounded-full text-xs font-semibold text-white bg-white/5 border border-white/10 hover:border-white/20 transition-all w-full sm:w-auto"
                    >
                      Submit Another Request
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-1.5">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Tanvir Ahmed"
                        className="w-full px-4 py-3 rounded-xl dark-input text-sm text-white placeholder-neutral-500 focus:outline-none"
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
                        placeholder="tanvir@company.com"
                        className="w-full px-4 py-3 rounded-xl dark-input text-sm text-white placeholder-neutral-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-1.5">
                        Company or Project
                      </label>
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        placeholder="Your Company / Brand"
                        className="w-full px-4 py-3 rounded-xl dark-input text-sm text-white placeholder-neutral-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-1.5">
                        Target Service / Package
                      </label>
                      <select
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl dark-input text-sm text-white bg-[#0a120c] focus:outline-none"
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
                      Target Budget Range
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                      {['৳১০,০০০ – ৳২৫,০০০', '৳২৫,০০০ – ৳৫০,০০০', '৳৫০,০০০ – ৳১,০০,০০০+', 'Enterprise Custom'].map((b) => (
                        <button
                          type="button"
                          key={b}
                          onClick={() => setFormData({ ...formData, budget: b })}
                          className={`py-2.5 px-3 text-center rounded-xl border transition-all ${
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
                      Scope & Technical Objectives *
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Share your timeline, current software setup, and target business outcomes..."
                      className="w-full px-4 py-3 rounded-xl dark-input text-sm text-white placeholder-neutral-500 focus:outline-none"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full brand-glow-button py-4 rounded-full font-bold text-sm text-[#041608] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      <span>
                        {isSubmitting ? 'Transmitting Request...' : 'Send Discovery Request'}
                      </span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    <p className="text-[11px] text-neutral-500 text-center mt-3">
                      Mutual NDA signed automatically. No junior reps — you will speak with principal engineers.
                    </p>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

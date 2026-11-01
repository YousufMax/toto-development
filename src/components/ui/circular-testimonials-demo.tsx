import React from "react";
import { CircularTestimonials, Testimonial } from "@/components/ui/circular-testimonials";

const testimonials: Testimonial[] = [
  {
    quote:
      "TOTO Development completely rebuilt our retail e-commerce infrastructure. Our checkout latency dropped to under 180ms, cart abandonment reduced by 38%, and we processed over 15,000 orders during Eid festival without a single hiccup. Truly world-class engineering right here in Bangladesh.",
    name: "Tanvir Ahmed",
    designation: "Founder & MD, TOTO Elite Mart (Dhaka)",
    src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop",
  },
  {
    quote:
      "Managing 120+ supply vehicles and 8 port warehouses across Chattogram was pure chaos with spreadsheets. TOTO engineered a centralized management system that saved our logistics team 28 hours per week and eliminated inventory leakage completely.",
    name: "Rafiqul Islam Chowdhury",
    designation: "Director of Operations, Bengal Logistics (Chattogram)",
    src: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=800&auto=format&fit=crop",
  },
  {
    quote:
      "Finding an agency that understands Bangladeshi consumer psychology and data-driven ad algorithms is rare. TOTO scaled our Meta & Google ad campaigns to an average 5.2x ROAS while cutting our customer acquisition cost in half. Exceptional results.",
    name: "Farhan Sadeq",
    designation: "Chief Marketing Officer, BrandPulse Retail (Dhaka)",
    src: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=800&auto=format&fit=crop",
  },
  {
    quote:
      "Before launching our premium organic packaging across supershops in Gulshan and Dhanmondi, TOTO delivered photorealistic 3D renders and commercial CGI animations. It accelerated our retail buyer approvals by 3 weeks and captivated customers on social media.",
    name: "Kazi Mahfuzur Rahman",
    designation: "Brand Director, Agrona Consumer Goods (Tejgaon, Dhaka)",
    src: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=800&auto=format&fit=crop",
  },
];

export const CircularTestimonialsDemo = () => (
  <section className="space-y-12">
    {/* Dark Luxury Testimonials Section (TOTO Brand Aesthetic) */}
    <div className="bg-[#050705] border border-[#00FC43]/20 p-8 sm:p-16 rounded-3xl min-h-[400px] flex flex-wrap gap-6 items-center justify-center relative shadow-[0_0_50px_rgba(0,0,0,0.8)]">
      <div
        className="items-center justify-center relative flex w-full"
        style={{ maxWidth: "1024px" }}
      >
        <CircularTestimonials
          testimonials={testimonials}
          autoplay={true}
          colors={{
            name: "#ffffff",
            designation: "#00FC43",
            testimony: "#e2e8f0",
            arrowBackground: "#0b150e",
            arrowForeground: "#00FC43",
            arrowHoverBackground: "#00FC43",
          }}
          fontSizes={{
            name: "1.75rem",
            designation: "0.875rem",
            quote: "1.05rem",
          }}
        />
      </div>
    </div>

    {/* Light Testimonials Section */}
    <div className="bg-[#f7f7fa] p-8 sm:p-16 rounded-3xl min-h-[400px] flex flex-wrap gap-6 items-center justify-center relative shadow-md">
      <div
        className="items-center justify-center relative flex w-full"
        style={{ maxWidth: "1024px" }}
      >
        <CircularTestimonials
          testimonials={testimonials}
          autoplay={true}
          colors={{
            name: "#0a0a0a",
            designation: "#454545",
            testimony: "#171717",
            arrowBackground: "#141414",
            arrowForeground: "#f1f1f7",
            arrowHoverBackground: "#00FC43",
          }}
          fontSizes={{
            name: "1.75rem",
            designation: "0.875rem",
            quote: "1.05rem",
          }}
        />
      </div>
    </div>
  </section>
);

export default CircularTestimonialsDemo;

"use client";

import React from "react";
import dynamic from "next/dynamic";
import { Badge } from "@/components/Badge";
import { type GlassyCarouselItem } from "@/components/ui/glassy-coverflow-carousel";
import { Film, Sparkles, Smartphone, ArrowRight } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";
import { useActiveWhatsApp } from "@/hooks/useActiveWhatsApp";

const GlassyCarousel = dynamic(
  () => import("@/components/ui/glassy-coverflow-carousel"),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[540px] sm:h-[620px] flex items-center justify-center bg-[#070d08]/80 rounded-3xl border border-white/5 animate-pulse">
        <div className="text-center">
          <div className="w-10 h-10 mx-auto rounded-full border-2 border-[#00FC43] border-t-transparent animate-spin mb-3" />
          <p className="text-xs text-neutral-400 font-mono tracking-wider uppercase">Loading 3D Commercial Showcase...</p>
        </div>
      </div>
    ),
  }
);

export const COMMERCIAL_VIDEO_REELS: GlassyCarouselItem[] = [
  {
    id: "cyberpunk-supercar-cgi",
    title: "Cyberpunk 3D Supercar Reveal",
    subtitle: "4K CGI · Automotive Commercial Teaser",
    image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=1200&q=80",
    accent: "#00FC43",
    description: "Ray-traced automotive teaser with cinematic emerald volumetric lighting, exploded carbon-fiber assembly, and sub-second cutaways.",
    trailerUrl: "https://www.youtube.com/watch?v=7X8II6J-6mU",
    href: "#packages",
    linkLabel: "Book Commercial Package",
  },
  {
    id: "lumina-cosmetics-splash",
    title: "Lumina Eau De Parfum & Fluid Splash",
    subtitle: "Luxury Cosmetics · Liquid Simulation CGI",
    image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=1200&q=80",
    accent: "#eab308",
    description: "Photorealistic fluid dynamics and ray-traced glass dispersion engineered for luxury beauty and skincare commercial conversions.",
    trailerUrl: "https://www.youtube.com/watch?v=wb49-oV0F78",
    href: "#packages",
    linkLabel: "Explore Beauty Packages",
  },
  {
    id: "apex-energy-drink",
    title: "Apex Citrus Energy Elixir 1000fps",
    subtitle: "FMCG Commercial · High-Speed Splash Physics",
    image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=1200&q=80",
    accent: "#06b6d4",
    description: "1000fps high-speed fluid physics, aluminum can condensation droplets, and dynamic fruit slice explosion built for high-converting social ads.",
    trailerUrl: "https://www.youtube.com/watch?v=j7jPnwVGdZ8",
    href: "#packages",
    linkLabel: "View FMCG Packages",
  },
  {
    id: "vortex-titanium-audio",
    title: "Vortex Pro Titanium Wireless Audio",
    subtitle: "Consumer Tech · 3D Product Exploded View",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1200&q=80",
    accent: "#8b5cf6",
    description: "High-precision CAD rendering, exploded driver assembly, and spatial soundwaves for international tech hardware launches.",
    trailerUrl: "https://www.youtube.com/watch?v=qEVUtrk8_B4",
    href: "#packages",
    linkLabel: "Order Hardware 3D Reel",
  },
  {
    id: "agrona-heritage-oil",
    title: "Agrona Pure Heritage Culinary Oil",
    subtitle: "Brand Heritage · 4K Commercial Brand Film",
    image: "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?auto=format&fit=crop&w=1200&q=80",
    accent: "#f97316",
    description: "Authentic cinematic food storytelling combining farm-fresh heritage with warm golden hues to maximize FMCG buyer trust and retail sell-through.",
    trailerUrl: "https://www.youtube.com/watch?v=hEJnMQG9ev8",
    href: "#packages",
    linkLabel: "View Commercial Film Rates",
  },
  {
    id: "nova-fintech-explainer",
    title: "Nova Cloud FinTech Kinetic Explainer",
    subtitle: "SaaS Motion · Kinetic Typography & UI Flythrough",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80",
    accent: "#10b981",
    description: "High-retention kinetic typography and futuristic dashboard UI fly-throughs delivering 3.4x higher conversion for enterprise software.",
    trailerUrl: "https://www.youtube.com/watch?v=Y274jZs5s7s",
    href: "#packages",
    linkLabel: "Book SaaS Explainer",
  },
];

const totoAgencyTheme = {
  "--color-background": "#050705",
  "--color-foreground": "#f3f4f6",
  "--color-card": "#09120c",
  "--color-card-foreground": "#ffffff",
  "--color-muted-foreground": "#9ca3af",
  "--color-border": "rgba(0, 252, 67, 0.22)",
  "--color-primary": "#00FC43",
  "--color-primary-foreground": "#050705",
  "--carousel-background": "#050705",
  "--carousel-shadow-color": "#000000",
} as React.CSSProperties;

export function CommercialReelsShowcase() {
  const { openWhatsApp } = useActiveWhatsApp();

  return (
    <div className="relative w-full max-w-7xl mx-auto px-4 py-8">
      {/* Background Cinematic Duotone Bloom (Violet, Cyan & Emerald Atmosphere) */}
      <div className="absolute top-1/4 left-1/3 -translate-x-1/2 w-[600px] h-[350px] bg-violet-600/16 blur-[160px] pointer-events-none -z-10" />
      <div className="absolute top-1/4 right-1/4 w-[550px] h-[350px] bg-cyan-500/14 blur-[160px] pointer-events-none -z-10" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-[#00FC43]/10 blur-[150px] pointer-events-none -z-10" />

      {/* Header and Controls */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8 text-center md:text-left">
        <div>
          <div className="inline-flex items-center gap-2 mb-2">
            <Badge variant="emerald">
              <Film className="w-3.5 h-3.5 inline mr-1 text-[#00FC43]" />
              COMMERCIAL SHOWCASE · 3D COVERFLOW
            </Badge>
            <span className="text-xs text-neutral-400 font-mono hidden sm:inline">
              4K Ultra-HD · 60 FPS
            </span>
          </div>
          <h2 className="editorial-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-white tracking-tight">
            Commercial Video Reels {'&'}{" "}
            <span className="italic text-[#00FC43] drop-shadow-[0_0_25px_rgba(0,252,67,0.35)]">
              Motion Showreel
            </span>
          </h2>
          <p className="text-neutral-300 text-sm sm:text-base mt-2 max-w-2xl font-light leading-relaxed">
            Drag to browse our signature commercial reels. Click any active reel to open the interactive video trailer player with sound and dynamic playback.
          </p>
        </div>

        {/* Vertical Reel Format Indicator */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0a140d] border border-[#00FC43]/30 text-xs font-mono font-semibold text-[#00FC43] shadow-[0_0_15px_rgba(0,252,67,0.15)]">
          <Smartphone className="w-3.5 h-3.5 text-[#00FC43]" />
          <span>Vertical Reel (9:16)</span>
        </div>
      </div>

      {/* 3D Glassy Coverflow Carousel Container with Cinema Violet & Emerald Ambient Rim */}
      <div className="relative rounded-3xl p-1 sm:p-3 bg-gradient-to-b from-violet-500/20 via-[#00FC43]/08 to-transparent border border-white/10 hover:border-violet-500/35 transition-colors shadow-[0_20px_80px_rgba(0,0,0,0.95),0_0_50px_rgba(139,92,246,0.12)] overflow-hidden">
        <GlassyCarousel
          items={COMMERCIAL_VIDEO_REELS}
          layout="poster"
          initialIndex={1}
          autoPlay={false}
          label="TOTO Development Commercial Video Showreel"
          style={totoAgencyTheme}
        />
      </div>

      {/* Under-carousel Quick Action & Guarantees */}
      <div className="flex flex-wrap items-center justify-between gap-4 mt-8 pt-6 border-t border-white/10">
        <div className="flex items-center gap-3 text-xs sm:text-sm text-neutral-300">
          <Sparkles className="w-4 h-4 text-[#00FC43]" />
          <span>Need a customized viral reel or 3D CGI commercial for your brand?</span>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="#packages"
            className="text-xs sm:text-sm text-[#00FC43] hover:underline font-semibold inline-flex items-center gap-1.5"
          >
            <span>View Monthly Packages</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
          <button
            type="button"
            onClick={() =>
              openWhatsApp(
                "commercial_reels_cta",
                "Hi TOTO Development, I watched your Commercial Video Reels and want to discuss video production for my brand."
              )
            }
            className="px-4 py-2 rounded-full text-xs font-bold text-[#050705] bg-[#00FC43] hover:bg-[#00e33c] transition-all inline-flex items-center gap-1.5 cursor-pointer shadow-[0_0_20px_rgba(0,252,67,0.3)]"
          >
            <FaWhatsapp className="w-3.5 h-3.5" />
            <span>Quick WhatsApp Quote</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default CommercialReelsShowcase;

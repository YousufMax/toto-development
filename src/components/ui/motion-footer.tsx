"use client";

import * as React from "react";
import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ArrowUp, ArrowRight } from "lucide-react";
import {
  FaLinkedinIn,
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaXTwitter,
  FaWhatsapp,
} from "react-icons/fa6";
import { cn } from "@/lib/utils";
import { useActiveWhatsApp } from "@/hooks/useActiveWhatsApp";

// -------------------------------------------------------------------------
// 1. THEME-ADAPTIVE INLINE STYLES
// -------------------------------------------------------------------------
const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800;900&display=swap');

.cinematic-footer-wrapper {
  font-family: 'Plus Jakarta Sans', sans-serif;
  -webkit-font-smoothing: antialiased;
  
  /* Dynamic Variables using standard shadcn/tailwind tokens */
  --pill-bg-1: rgba(255, 255, 255, 0.05);
  --pill-bg-2: rgba(255, 255, 255, 0.02);
  --pill-shadow: rgba(0, 0, 0, 0.6);
  --pill-highlight: rgba(255, 255, 255, 0.12);
  --pill-inset-shadow: rgba(0, 0, 0, 0.8);
  --pill-border: rgba(255, 255, 255, 0.12);
  
  --pill-bg-1-hover: rgba(255, 255, 255, 0.12);
  --pill-bg-2-hover: rgba(255, 255, 255, 0.04);
  --pill-border-hover: rgba(255, 255, 255, 0.28);
  --pill-shadow-hover: rgba(0, 0, 0, 0.85);
  --pill-highlight-hover: rgba(255, 255, 255, 0.3);
}

@keyframes footer-breathe {
  0% { transform: translate(-50%, -50%) scale(1); opacity: 0.4; }
  100% { transform: translate(-50%, -50%) scale(1.15); opacity: 0.8; }
}

@keyframes footer-scroll-marquee {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}

@keyframes footer-heartbeat {
  0%, 100% { transform: scale(1); filter: drop-shadow(0 0 5px rgba(239, 68, 68, 0.5)); }
  15%, 45% { transform: scale(1.2); filter: drop-shadow(0 0 10px rgba(239, 68, 68, 0.8)); }
  30% { transform: scale(1); }
}

.animate-footer-breathe {
  animation: footer-breathe 8s ease-in-out infinite alternate;
}

.animate-footer-scroll-marquee {
  animation: footer-scroll-marquee 35s linear infinite;
}

.animate-footer-heartbeat {
  animation: footer-heartbeat 2s cubic-bezier(0.25, 1, 0.5, 1) infinite;
}

/* Theme-adaptive Grid Background */
.footer-bg-grid {
  background-size: 50px 50px;
  background-image: 
    linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
  mask-image: linear-gradient(to bottom, transparent, black 20%, black 80%, transparent);
  -webkit-mask-image: linear-gradient(to bottom, transparent, black 20%, black 80%, transparent);
}

/* Theme-adaptive Aurora Glow */
.footer-aurora {
  background: radial-gradient(
    circle at 50% 50%, 
    rgba(0, 252, 67, 0.14) 0%, 
    rgba(14, 165, 233, 0.08) 40%, 
    transparent 70%
  );
}

/* Glass Pill Theming */
.footer-glass-pill {
  background: linear-gradient(145deg, var(--pill-bg-1) 0%, var(--pill-bg-2) 100%);
  box-shadow: 
      0 10px 30px -10px var(--pill-shadow), 
      inset 0 1px 1px var(--pill-highlight), 
      inset 0 -1px 2px var(--pill-inset-shadow);
  border: 1px solid var(--pill-border);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.footer-glass-pill:hover {
  background: linear-gradient(145deg, var(--pill-bg-1-hover) 0%, var(--pill-bg-2-hover) 100%);
  border-color: var(--pill-border-hover);
  box-shadow: 
      0 20px 40px -10px var(--pill-shadow-hover), 
      inset 0 1px 1px var(--pill-highlight-hover);
}

/* Giant Background Text Masking */
.footer-giant-bg-text {
  font-size: clamp(64px, 18vw, 220px);
  line-height: 0.88;
  font-weight: 950;
  letter-spacing: -0.04em;
  color: transparent;
  -webkit-text-fill-color: transparent;
  -webkit-text-stroke: 1.5px rgba(255, 255, 255, 0.12);
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.20) 0%, rgba(0, 252, 67, 0.10) 45%, rgba(255, 255, 255, 0.02) 100%);
  -webkit-background-clip: text;
  background-clip: text;
  text-shadow: 0 0 35px rgba(0, 252, 67, 0.12);
  transition: all 0.3s ease;
}

/* Metallic Text Glow */
.footer-text-glow {
  background: linear-gradient(180deg, #ffffff 0%, rgba(255, 255, 255, 0.55) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  filter: drop-shadow(0px 0px 25px rgba(255, 255, 255, 0.15));
}
`;

// -------------------------------------------------------------------------
// 2. MAGNETIC BUTTON PRIMITIVE
// -------------------------------------------------------------------------
export interface MagneticButtonProps extends React.HTMLAttributes<HTMLElement> {
  as?: "button" | "a" | "div";
  href?: string;
  target?: string;
  rel?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

const MagneticButton = React.forwardRef<HTMLElement, MagneticButtonProps>(
  ({ className, children, as = "button", ...props }, forwardedRef) => {
    const localRef = useRef<HTMLElement>(null);

    useEffect(() => {
      // Magnetic hover physics active only on non-touch desktop screens
      if (typeof window === "undefined" || window.innerWidth < 1024) return;
      const element = localRef.current;
      if (!element) return;

      const ctx = gsap.context(() => {
        const handleMouseMove = (e: MouseEvent) => {
          const rect = element.getBoundingClientRect();
          const h = rect.width / 2;
          const w = rect.height / 2;
          const x = e.clientX - rect.left - h;
          const y = e.clientY - rect.top - w;

          gsap.to(element, {
            x: x * 0.35,
            y: y * 0.35,
            rotationX: -y * 0.08,
            rotationY: x * 0.08,
            scale: 1.04,
            ease: "power2.out",
            duration: 0.3,
          });
        };

        const handleMouseLeave = () => {
          gsap.to(element, {
            x: 0,
            y: 0,
            rotationX: 0,
            rotationY: 0,
            scale: 1,
            ease: "elastic.out(1, 0.3)",
            duration: 1.1,
          });
        };

        element.addEventListener("mousemove", handleMouseMove);
        element.addEventListener("mouseleave", handleMouseLeave);

        return () => {
          element.removeEventListener("mousemove", handleMouseMove);
          element.removeEventListener("mouseleave", handleMouseLeave);
        };
      }, element);

      return () => ctx.revert();
    }, []);

    const Component = as as any;

    return (
      <Component
        ref={(node: HTMLElement | null) => {
          (localRef as React.MutableRefObject<HTMLElement | null>).current = node;
          if (typeof forwardedRef === "function") forwardedRef(node as any);
          else if (forwardedRef) (forwardedRef as React.MutableRefObject<HTMLElement | null>).current = node;
        }}
        className={cn("cursor-pointer", className)}
        {...props}
      >
        {children}
      </Component>
    );
  }
);
MagneticButton.displayName = "MagneticButton";

// -------------------------------------------------------------------------
// 3. MAIN CINEMATIC FOOTER COMPONENT
// -------------------------------------------------------------------------
export interface SocialLink {
  label: string;
  href: string;
  icon: React.ReactNode;
}

export interface CinematicFooterProps {
  heading?: string;
  giantBackgroundText?: string;
  brandName?: string;
  copyrightText?: string;
  marqueeItems?: string[];
  socialLinks?: SocialLink[];
  primaryActions?: Array<{
    label: string;
    href: string;
    icon?: React.ReactNode;
  }>;
  secondaryLinks?: Array<{
    label: string;
    href: string;
  }>;
  className?: string;
}

const DEFAULT_MARQUEE = [
  "Custom Software Development",
  "High-Performance Web Platforms",
  "Digital Marketing & Strategy",
  "Meta & Google Ads Management",
  "Video Editing & Motion Graphics",
  "Brand Visual Identity & 3D Packaging",
];

const DEFAULT_SOCIAL_LINKS: SocialLink[] = [
  {
    label: "LinkedIn",
    href: "https://linkedin.com",
    icon: <FaLinkedinIn className="w-4 h-4" />,
  },
  {
    label: "Facebook",
    href: "https://facebook.com",
    icon: <FaFacebookF className="w-4 h-4" />,
  },
  {
    label: "Instagram",
    href: "https://instagram.com",
    icon: <FaInstagram className="w-4 h-4" />,
  },
  {
    label: "YouTube",
    href: "https://youtube.com",
    icon: <FaYoutube className="w-4 h-4" />,
  },
  {
    label: "X (Twitter)",
    href: "https://x.com",
    icon: <FaXTwitter className="w-4 h-4" />,
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/8801410003423",
    icon: <FaWhatsapp className="w-4 h-4 text-[#00FC43]" />,
  },
];

export function CinematicFooter({
  heading = "Ready to engineer your digital edge?",
  giantBackgroundText = "TOTO",
  brandName = "TOTO Development",
  copyrightText = "© 2026 TOTO Development Group. All rights reserved.",
  marqueeItems = DEFAULT_MARQUEE,
  socialLinks = DEFAULT_SOCIAL_LINKS,
  primaryActions,
  secondaryLinks = [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services/" },
    { label: "Projects", href: "/portfolio/" },
    { label: "Pricing Plans", href: "/pricing/" },
    { label: "About", href: "/about/" },
    { label: "Contact", href: "/contact/" },
  ],
  className,
}: CinematicFooterProps) {
  const { getDynamicWhatsAppUrl } = useActiveWhatsApp();
  const dynamicWhatsAppLink = getDynamicWhatsAppUrl(
    'Hi TOTO Development, I would like to discuss a project.'
  );

  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const renderedPrimaryActions = primaryActions || [
    {
      label: "Start a Project",
      href: "/contact/",
      icon: <ArrowRight className="w-4 h-4 text-[#00FC43]" />,
    },
    {
      label: "Chat on WhatsApp",
      href: dynamicWhatsAppLink,
      icon: (
        <svg className="w-4 h-4 fill-current text-[#00FC43] shrink-0" viewBox="0 0 24 24">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
        </svg>
      ),
    },
  ];

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />

      {/* 
        Standard Document Flow Footer:
        Clean, resilient, never blocks or covers page content, 
        and performs flawlessly on all mobile devices and desktops!
      */}
      <footer
        className={cn(
          "relative w-full overflow-hidden bg-[#040605] text-[#dae6d3] cinematic-footer-wrapper border-t border-white/10 pt-12 sm:pt-16 pb-8",
          className
        )}
      >
        {/* Ambient Light & Subtle Grid */}
        <div className="footer-aurora absolute left-1/2 top-1/2 h-[50vh] w-[75vw] -translate-x-1/2 -translate-y-1/2 animate-footer-breathe rounded-[50%] blur-[90px] pointer-events-none z-0" />
        <div className="footer-bg-grid absolute inset-0 z-0 pointer-events-none" />

        {/* 1. Diagonal Sleek Marquee */}
        <div className="relative w-full overflow-hidden border-y border-white/10 bg-black/60 backdrop-blur-md py-3 z-10 shadow-lg mb-10 sm:mb-14 -rotate-1 scale-105">
          <div className="flex w-max animate-footer-scroll-marquee text-[11px] sm:text-xs md:text-sm font-bold tracking-[0.2em] text-neutral-400 uppercase">
            <div className="flex items-center space-x-8 px-4">
              {marqueeItems.map((item, idx) => (
                <React.Fragment key={idx}>
                  <span>{item}</span>
                  <span className="text-[#00FC43]">✦</span>
                </React.Fragment>
              ))}
            </div>
            <div className="flex items-center space-x-8 px-4">
              {marqueeItems.map((item, idx) => (
                <React.Fragment key={`repeat-${idx}`}>
                  <span>{item}</span>
                  <span className="text-[#00FC43]">✦</span>
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>

        {/* 2. Main Center Content */}
        <div className="relative z-10 flex flex-col items-center justify-center px-4 sm:px-6 w-full max-w-4xl mx-auto text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black footer-text-glow tracking-tight mb-6 sm:mb-8 text-center max-w-3xl leading-[1.12]">
            {heading}
          </h2>

          {/* Interactive Magnetic Pills Layout */}
          <div className="flex flex-col items-center gap-4 sm:gap-6 w-full">
            {/* Primary Call to Action Pills */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full sm:w-auto">
              {renderedPrimaryActions.map((action, idx) => (
                <MagneticButton
                  key={idx}
                  as="a"
                  href={action.href}
                  className="footer-glass-pill w-full sm:w-auto px-7 sm:px-9 py-3.5 sm:py-4 rounded-full text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2.5 group text-neutral-100 hover:text-white shadow-lg"
                >
                  {action.icon}
                  <span>{action.label}</span>
                </MagneticButton>
              ))}
            </div>

            {/* Secondary Navigation Links */}
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4 w-full mt-2">
              {secondaryLinks.map((link, idx) => (
                <Link
                  key={idx}
                  href={link.href}
                  className="footer-glass-pill px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-neutral-300 font-medium text-xs sm:text-sm hover:text-white transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Social Channels (Glass Magnetic Icons) */}
            {socialLinks && socialLinks.length > 0 && (
              <div className="flex items-center justify-center flex-wrap gap-2.5 mt-4">
                {socialLinks.map((social, idx) => (
                  <MagneticButton
                    key={idx}
                    as="a"
                    href={social.label === 'WhatsApp' ? dynamicWhatsAppLink : social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="footer-glass-pill w-10 h-10 rounded-full flex items-center justify-center text-neutral-300 hover:text-[#00FC43] hover:border-[#00FC43]/60 transition-all duration-300 shadow-md group/social"
                  >
                    {social.icon}
                  </MagneticButton>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* 3. Grand Architectural Brand Signature Watermark */}
        {giantBackgroundText && (
          <div className="relative w-full overflow-hidden flex items-center justify-center select-none pointer-events-none z-10 my-4 sm:my-8 md:my-10 px-4">
            {/* Subtle Ambient Radial Glow */}
            <div className="absolute w-[85vw] max-w-3xl h-24 sm:h-32 bg-[#00FC43]/[0.06] blur-[70px] rounded-full pointer-events-none" />

            <span className="footer-giant-bg-text font-black text-center select-none block tracking-[-0.04em] uppercase">
              {giantBackgroundText}
            </span>
          </div>
        )}

        {/* 4. Bottom Bar / Credits */}
        <div className="relative z-20 w-full px-4 sm:px-8 lg:px-12 pt-6 pb-2 border-t border-white/5 bg-black/40 backdrop-blur-sm flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Copyright */}
          <div className="text-neutral-500 text-[11px] sm:text-xs font-medium tracking-wide order-2 md:order-1 text-center md:text-left">
            {copyrightText}
          </div>

          {/* "Made with Love" Badge */}
          <div className="footer-glass-pill px-4 py-2 rounded-full flex items-center gap-2 order-1 md:order-2 cursor-default border-white/10">
            <span className="text-neutral-400 text-[10px] sm:text-xs font-bold uppercase tracking-wider">
              Crafted with
            </span>
            <span className="animate-footer-heartbeat text-xs sm:text-sm text-red-500">❤</span>
            <span className="text-neutral-400 text-[10px] sm:text-xs font-bold uppercase tracking-wider">
              by
            </span>
            <span className="text-white font-black text-xs sm:text-sm tracking-normal ml-0.5">
              {brandName}
            </span>
          </div>

          {/* Back to top button */}
          <MagneticButton
            as="button"
            onClick={scrollToTop}
            className="w-10 h-10 sm:w-11 sm:h-11 rounded-full footer-glass-pill flex items-center justify-center text-neutral-400 hover:text-white group order-3"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-4 h-4 transform group-hover:-translate-y-1 transition-transform duration-300" />
          </MagneticButton>
        </div>
      </footer>
    </>
  );
}

export default CinematicFooter;

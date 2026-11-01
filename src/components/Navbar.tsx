'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { clsx } from 'clsx';
import {
  Code2,
  Globe,
  TrendingUp,
  Target,
  Film,
  Palette,
  ChevronDown,
  ChevronRight,
  ArrowRight,
  X,
  Menu,
} from 'lucide-react';
import { SITE_CONFIG } from '@/lib/data';
import { ContactModal } from './ContactModal';
import { useActiveWhatsApp } from '@/hooks/useActiveWhatsApp';

export const NAV_SERVICES = [
  {
    id: 'software',
    title: 'Custom Software Development',
    desc: 'Web applications, ERPs & custom platforms',
    href: '/services/custom-software/',
    icon: Code2,
  },
  {
    id: 'web-dev',
    title: 'Website Development',
    desc: 'High-speed business & e-commerce sites',
    href: '/services/web-development/',
    icon: Globe,
  },
  {
    id: 'digital-marketing',
    title: 'Digital Marketing',
    desc: 'SEO optimization, growth & social media',
    href: '/services/digital-marketing/',
    icon: TrendingUp,
  },
  {
    id: 'paid-ads',
    title: 'Meta & Google Ads',
    desc: 'ROI-driven paid campaigns & lead gen',
    href: '/services/paid-ads/',
    icon: Target,
  },
  {
    id: 'video-editing',
    title: 'Video Editing & Motion Graphics',
    desc: 'Reels, promotional videos & animations',
    href: '/services/video-motion/',
    icon: Film,
  },
  {
    id: 'brand-design',
    title: 'Graphic Design & 3D Branding',
    desc: 'Logos, brand identity & 3D visual assets',
    href: '/services/brand-design/',
    icon: Palette,
  },
];

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);
  const [isMobileServicesExpanded, setIsMobileServicesExpanded] = useState(false);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);

  const dropdownTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsServicesDropdownOpen(false);
  }, [pathname]);

  // Lock body scroll on mobile menu open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/' || pathname === '';
    return pathname?.startsWith(href.replace(/\/$/, ''));
  };

  if (pathname?.startsWith('/admin')) {
    return null;
  }

  const isServicesActive = pathname?.startsWith('/services');

  const handleMouseEnterServices = () => {
    if (dropdownTimerRef.current) clearTimeout(dropdownTimerRef.current);
    setIsServicesDropdownOpen(true);
  };

  const handleMouseLeaveServices = () => {
    dropdownTimerRef.current = setTimeout(() => {
      setIsServicesDropdownOpen(false);
    }, 150);
  };

  const { getDynamicWhatsAppUrl } = useActiveWhatsApp();
  const whatsappUrl = getDynamicWhatsAppUrl(
    'Hi TOTO Development, I would like to discuss a project.'
  );

  return (
    <>
      {/* ========================================================================= */}
      {/* 01. CLEAN & ELEGANT FLOATING HEADER BAR                                    */}
      {/* ========================================================================= */}
      <header
        className={clsx(
          'fixed top-0 inset-x-0 z-50 transition-all duration-300 pointer-events-none',
          isScrolled ? 'pt-2.5 sm:pt-3' : 'pt-3 sm:pt-4'
        )}
      >
        <div className="max-w-6xl mx-auto px-3.5 sm:px-6 pointer-events-auto">
          <div
            className={clsx(
              'saas-floating-dock rounded-2xl md:rounded-full px-4 sm:px-6 flex items-center justify-between transition-all duration-300',
              isScrolled ? 'h-[58px] sm:h-[64px]' : 'h-[64px] sm:h-[72px]'
            )}
          >
            {/* Left: TOTO Logo Mark (Pure Square Shape, Big Professional Size, Icon-Only) */}
            <Link
              href="/"
              className="flex items-center group shrink-0 select-none py-1"
              aria-label="TOTO Development Home"
            >
              <div className="relative w-11 h-11 sm:w-12 sm:h-12 md:w-[50px] md:h-[50px] aspect-square rounded-none overflow-hidden bg-[#0a0f1d] border border-white/20 flex items-center justify-center shrink-0 shadow-md group-hover:border-[#00FC43]/80 group-hover:shadow-[0_0_20px_rgba(0,252,67,0.45)] transition-all">
                <img
                  src="https://cdn.jsdelivr.net/gh/YousufMax/image-server-001@main/toto%20new%20new%20logo.jpg"
                  onError={(e) => {
                    e.currentTarget.src = '/images/toto-logo.png';
                  }}
                  alt="TOTO Development Logo"
                  className="w-full h-full object-cover"
                />
              </div>
            </Link>

            {/* Center: Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-1 lg:gap-2 text-xs font-semibold px-2 py-1 rounded-full bg-white/[0.03] border border-white/5">
              <Link
                href="/"
                className={clsx(
                  'px-3.5 py-1.5 rounded-full transition-all duration-200',
                  isActive('/') && !isServicesActive
                    ? 'bg-white/10 text-white shadow-sm'
                    : 'text-neutral-300 hover:text-white hover:bg-white/5'
                )}
              >
                Home
              </Link>

              {/* CLEAN MANUAL SERVICES DROPDOWN */}
              <div
                className="relative"
                onMouseEnter={handleMouseEnterServices}
                onMouseLeave={handleMouseLeaveServices}
              >
                <Link
                  href="/services/"
                  className={clsx(
                    'px-3.5 py-1.5 rounded-full transition-all duration-200 flex items-center gap-1 cursor-pointer',
                    isServicesActive || isServicesDropdownOpen
                      ? 'bg-white/10 text-white shadow-sm'
                      : 'text-neutral-300 hover:text-white hover:bg-white/5'
                  )}
                >
                  <span>Services</span>
                  <ChevronDown
                    className={clsx(
                      'w-3 h-3 transition-transform duration-200',
                      isServicesDropdownOpen && 'rotate-180 text-[#00FC43]'
                    )}
                  />
                </Link>

                {/* HIGH-CONTRAST 100% OPAQUE OBSIDIAN DROPDOWN MENU */}
                {isServicesDropdownOpen && (
                  <div
                    className="absolute top-full left-0 pt-2.5 w-[360px] pointer-events-auto z-[100] animate-in fade-in zoom-in-95 duration-150"
                    onMouseEnter={handleMouseEnterServices}
                    onMouseLeave={handleMouseLeaveServices}
                  >
                    <div
                      className="rounded-2xl p-2.5 border border-white/15 flex flex-col space-y-1 shadow-[0_25px_70px_rgba(0,0,0,1),0_0_0_1px_rgba(255,255,255,0.08),0_0_30px_rgba(0,252,67,0.08)]"
                      style={{ backgroundColor: '#070b09' }}
                    >
                      {NAV_SERVICES.map((s) => {
                        const Icon = s.icon;
                        return (
                          <Link
                            key={s.id}
                            href={s.href}
                            onClick={() => setIsServicesDropdownOpen(false)}
                            className="p-2.5 rounded-xl transition-all duration-150 flex items-center gap-3.5 text-left group/item hover:bg-white/[0.08] border border-transparent hover:border-white/10"
                          >
                            <div className="w-9 h-9 rounded-xl bg-white/[0.04] border border-white/10 group-hover/item:border-[#00FC43]/60 group-hover/item:bg-[#00FC43]/15 text-neutral-300 group-hover/item:text-[#00FC43] flex items-center justify-center shrink-0 transition-all shadow-sm">
                              <Icon className="w-4 h-4" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="text-[13px] font-bold text-white group-hover/item:text-[#00FC43] transition-colors leading-tight">
                                {s.title}
                              </div>
                              <p className="text-[11px] text-neutral-400 group-hover/item:text-neutral-200 transition-colors truncate mt-0.5 font-normal leading-normal">
                                {s.desc}
                              </p>
                            </div>
                            <ChevronRight className="w-3.5 h-3.5 text-neutral-500 opacity-0 group-hover/item:opacity-100 group-hover/item:text-[#00FC43] group-hover/item:translate-x-0.5 transition-all shrink-0" />
                          </Link>
                        );
                      })}

                      <div className="pt-2 mt-1 border-t border-white/10 px-1 pb-0.5">
                        <Link
                          href="/services/"
                          onClick={() => setIsServicesDropdownOpen(false)}
                          className="px-3 py-2 rounded-xl text-xs font-semibold text-neutral-300 hover:text-white hover:bg-white/5 transition-all flex items-center justify-between group/all"
                        >
                          <span className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-[#00FC43] inline-block shadow-[0_0_8px_#00FC43]" />
                            <span className="font-bold text-white">View All Services & Pricing</span>
                          </span>
                          <ArrowRight className="w-3.5 h-3.5 text-[#00FC43] group-hover/all:translate-x-1 transition-transform" />
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* PROJECTS LINK */}
              <Link
                href="/portfolio/"
                className={clsx(
                  'px-3.5 py-1.5 rounded-full transition-all duration-200',
                  isActive('/portfolio/')
                    ? 'bg-white/10 text-white shadow-sm'
                    : 'text-neutral-300 hover:text-white hover:bg-white/5'
                )}
              >
                Projects
              </Link>

              <Link
                href="/pricing/"
                className={clsx(
                  'px-3.5 py-1.5 rounded-full transition-all duration-200',
                  isActive('/pricing/')
                    ? 'bg-white/10 text-white shadow-sm'
                    : 'text-neutral-300 hover:text-white hover:bg-white/5'
                )}
              >
                Pricing
              </Link>

              <Link
                href="/about/"
                className={clsx(
                  'px-3.5 py-1.5 rounded-full transition-all duration-200',
                  isActive('/about/')
                    ? 'bg-white/10 text-white shadow-sm'
                    : 'text-neutral-300 hover:text-white hover:bg-white/5'
                )}
              >
                About
              </Link>

              <Link
                href="/contact/"
                className={clsx(
                  'px-3.5 py-1.5 rounded-full transition-all duration-200',
                  isActive('/contact/')
                    ? 'bg-white/10 text-white shadow-sm'
                    : 'text-neutral-300 hover:text-white hover:bg-white/5'
                )}
              >
                Contact
              </Link>
            </nav>

            {/* Right Action: Desktop Live WhatsApp Pill & Mobile Controls */}
            <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
              {/* Desktop Live WhatsApp CTA Button */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00FC43] hover:bg-[#00e33c] text-[#041608] font-bold text-xs uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(0,252,67,0.4)] hover:scale-105 active:scale-95 cursor-pointer shrink-0"
                aria-label="Chat on WhatsApp"
              >
                <svg className="w-3.5 h-3.5 fill-current shrink-0" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                </svg>
                <span>WhatsApp</span>
              </a>

              {/* Mobile WhatsApp Quick Icon */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="md:hidden inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#00FC43] text-[#041608] font-bold text-xs shadow-md active:scale-95 transition-all"
                aria-label="Direct WhatsApp"
              >
                <svg className="w-3.5 h-3.5 fill-current shrink-0" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                </svg>
                <span className="text-[11px] font-bold uppercase tracking-wide">WhatsApp</span>
              </a>

              {/* Mobile Menu Toggle Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle navigation menu"
                className="md:hidden w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 flex flex-col items-center justify-center gap-1 transition text-white cursor-pointer active:scale-90"
              >
                <span
                  className={clsx(
                    'w-4 h-[2px] bg-current rounded-full transition-all duration-300',
                    isMobileMenuOpen && 'rotate-45 translate-y-[3px]'
                  )}
                />
                <span
                  className={clsx(
                    'w-4 h-[2px] bg-current rounded-full transition-all duration-300',
                    isMobileMenuOpen && 'opacity-0'
                  )}
                />
                <span
                  className={clsx(
                    'w-4 h-[2px] bg-current rounded-full transition-all duration-300',
                    isMobileMenuOpen && '-rotate-45 -translate-y-[3px]'
                  )}
                />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* 02. CLEAN, NATURAL & TRUSTWORTHY MOBILE MENU                              */}
      {/* ========================================================================= */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[100] md:hidden pointer-events-auto">
          {/* Backdrop overlay */}
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Clean Mobile Panel */}
          <div
            className="fixed top-16 inset-x-3 max-h-[85vh] overflow-y-auto rounded-3xl border border-white/15 p-5 shadow-2xl space-y-4 z-[101]"
            style={{
              backgroundColor: '#070b09',
              boxShadow: '0 25px 70px rgba(0, 0, 0, 1), 0 0 0 1px rgba(255, 255, 255, 0.1)',
            }}
          >
            {/* Header with Agency Logo & Status */}
            <div className="flex items-center justify-between pb-3.5 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="relative w-9 h-9 aspect-square rounded-none overflow-hidden bg-[#0a0f1d] border border-white/20 shrink-0 shadow-sm">
                  <img
                    src="https://cdn.jsdelivr.net/gh/YousufMax/image-server-001@main/toto%20new%20new%20logo.jpg"
                    onError={(e) => {
                      e.currentTarget.src = '/images/toto-logo.png';
                    }}
                    alt="TOTO Development Logo"
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="text-xs font-mono font-bold tracking-wider text-white uppercase">
                  TOTO Digital Agency
                </span>
              </div>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-neutral-300 hover:text-white border border-white/10"
                aria-label="Close Menu"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex flex-col space-y-1">
              <Link
                href="/"
                onClick={() => setIsMobileMenuOpen(false)}
                className={clsx(
                  'px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all flex items-center justify-between',
                  isActive('/') && !isServicesActive
                    ? 'bg-[#00FC43]/15 text-[#00FC43] border border-[#00FC43]/30 font-bold'
                    : 'text-neutral-200 hover:bg-white/5'
                )}
              >
                <span>Home</span>
              </Link>

              {/* Clean Services Accordion */}
              <div className="rounded-xl border border-white/10 bg-white/[0.02] overflow-hidden">
                <button
                  onClick={() => setIsMobileServicesExpanded(!isMobileServicesExpanded)}
                  className="w-full px-3.5 py-2.5 flex items-center justify-between text-sm font-semibold text-white cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <span>Services</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#00FC43]/10 text-[#00FC43] font-bold">
                      6 Capabilities
                    </span>
                  </span>
                  <ChevronDown
                    className={clsx(
                      'w-4 h-4 text-neutral-400 transition-transform duration-200',
                      isMobileServicesExpanded && 'rotate-180 text-white'
                    )}
                  />
                </button>

                {isMobileServicesExpanded && (
                  <div className="px-2 pb-2 space-y-1 pt-1 border-t border-white/5">
                    {NAV_SERVICES.map((s) => {
                      const Icon = s.icon;
                      return (
                        <Link
                          key={s.id}
                          href={s.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="px-3 py-2 rounded-lg hover:bg-white/5 flex items-center gap-3 text-left transition-colors group"
                        >
                          <div className="w-7 h-7 rounded-lg bg-white/5 border border-white/10 text-[#00FC43] flex items-center justify-center shrink-0 group-hover:border-[#00FC43]/40 group-hover:bg-[#00FC43]/10">
                            <Icon className="w-3.5 h-3.5" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-xs font-bold text-white leading-tight">
                              {s.title}
                            </div>
                            <div className="text-[10px] text-neutral-400 truncate mt-0.5">
                              {s.desc}
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>

              <Link
                href="/portfolio/"
                onClick={() => setIsMobileMenuOpen(false)}
                className={clsx(
                  'px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all flex items-center justify-between',
                  isActive('/portfolio/')
                    ? 'bg-[#00FC43]/15 text-[#00FC43] border border-[#00FC43]/30 font-bold'
                    : 'text-neutral-200 hover:bg-white/5'
                )}
              >
                <span>Portfolio</span>
              </Link>

              <Link
                href="/pricing/"
                onClick={() => setIsMobileMenuOpen(false)}
                className={clsx(
                  'px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all flex items-center justify-between',
                  isActive('/pricing/')
                    ? 'bg-[#00FC43]/15 text-[#00FC43] border border-[#00FC43]/30 font-bold'
                    : 'text-neutral-200 hover:bg-white/5'
                )}
              >
                <span className="flex items-center gap-2">
                  <span>Pricing</span>
                  <span className="text-[9px] font-mono px-1.5 py-0.5 rounded-full bg-white/10 text-neutral-300">
                    Monthly Plans
                  </span>
                </span>
              </Link>

              <Link
                href="/about/"
                onClick={() => setIsMobileMenuOpen(false)}
                className={clsx(
                  'px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all flex items-center justify-between',
                  isActive('/about/')
                    ? 'bg-[#00FC43]/15 text-[#00FC43] border border-[#00FC43]/30 font-bold'
                    : 'text-neutral-200 hover:bg-white/5'
                )}
              >
                <span>About</span>
              </Link>

              <Link
                href="/contact/"
                onClick={() => setIsMobileMenuOpen(false)}
                className={clsx(
                  'px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all flex items-center justify-between',
                  isActive('/contact/')
                    ? 'bg-[#00FC43]/15 text-[#00FC43] border border-[#00FC43]/30 font-bold'
                    : 'text-neutral-200 hover:bg-white/5'
                )}
              >
                <span>Contact</span>
              </Link>
            </div>

            {/* Bottom Actions */}
            <div className="pt-3 border-t border-white/10 space-y-2">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full text-center py-3 rounded-xl text-xs font-bold uppercase tracking-wider bg-[#00FC43] text-[#041608] shadow-[0_0_20px_rgba(0,252,67,0.3)] flex items-center justify-center gap-2 active:scale-95 transition"
              >
                <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                </svg>
                <span>Direct WhatsApp Consultation</span>
              </a>

              <div className="flex items-center justify-between px-2 pt-1 text-[11px] font-mono text-neutral-400">
                <span>Sonadanga, Khulna</span>
                <span className="text-[#00FC43]">{SITE_CONFIG.contactPhone}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Quote / Contact Modal */}
      <ContactModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
      />
    </>
  );
};

export default Navbar;

'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Home, Compass, Layers } from 'lucide-react';
import { Badge } from '@/components/Badge';

export default function NotFound() {
  return (
    <div className="relative min-h-[85vh] flex items-center justify-center px-4 py-32 overflow-hidden bg-[#050705]">
      {/* Ambient Radial Spotlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[#00FC43]/12 blur-[170px] pointer-events-none -z-10" />

      <div className="max-w-2xl mx-auto text-center relative z-10">
        <Badge variant="emerald">ERROR 404 · ROUTE NOT FOUND</Badge>

        <div className="my-6">
          <span className="editorial-serif text-7xl sm:text-9xl font-bold text-white tracking-tight drop-shadow-[0_0_35px_rgba(0,252,67,0.3)] block">
            4<span className="italic text-[#00FC43]">0</span>4
          </span>
        </div>

        <h1 className="editorial-serif text-3xl sm:text-5xl font-normal text-white mb-4 tracking-tight">
          Lost in the <span className="italic text-[#00FC43]">Digital Architecture</span>
        </h1>

        <p className="text-sm sm:text-base text-neutral-300 max-w-lg mx-auto leading-relaxed mb-10">
          The endpoint or page you requested does not exist or has been migrated. Return to our flagship or explore our capabilities.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/"
            className="brand-glow-button px-7 py-3.5 rounded-full text-xs font-bold text-[#041608] inline-flex items-center gap-2 shadow-[0_0_25px_rgba(0,252,67,0.5)] active:scale-95 transition-all"
          >
            <Home className="w-4 h-4" />
            <span>Return to Flagship</span>
          </Link>

          <Link
            href="/services/"
            className="px-6 py-3.5 rounded-full text-xs font-semibold text-white bg-white/5 border border-white/15 hover:border-[#00FC43]/50 hover:bg-[#00FC43]/10 transition-all backdrop-blur-md inline-flex items-center gap-2"
          >
            <Layers className="w-4 h-4 text-[#00FC43]" />
            <span>Explore Services</span>
          </Link>

          <button
            onClick={() => window.history.back()}
            className="px-5 py-3.5 rounded-full text-xs font-medium text-neutral-400 hover:text-white transition-colors inline-flex items-center gap-1.5 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Go Back</span>
          </button>
        </div>
      </div>
    </div>
  );
}

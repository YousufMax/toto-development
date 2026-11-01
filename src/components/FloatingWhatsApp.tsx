'use client';

import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import { FaWhatsapp } from 'react-icons/fa6';
import { Sparkles, X } from 'lucide-react';
import { useActiveWhatsApp } from '@/hooks/useActiveWhatsApp';

export const FloatingWhatsApp: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { agentName, isScheduled, openWhatsApp } = useActiveWhatsApp();

  // Hide on admin routes
  if (pathname?.startsWith('/admin')) {
    return null;
  }

  return (
    <aside
      aria-label="Live WhatsApp Consultation"
      className="fixed bottom-5 right-5 sm:bottom-7 sm:right-7 z-50 flex flex-col items-end gap-2.5"
    >
      {/* Expanded Quick Card */}
      {isOpen && (
        <div className="w-72 rounded-3xl bg-[#090f0b] border border-[#00FC43]/40 p-4 shadow-[0_20px_50px_rgba(0,0,0,0.9),0_0_35px_rgba(0,252,67,0.2)] animate-in fade-in slide-in-from-bottom-3 duration-200 backdrop-blur-xl relative mb-1 text-white">
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-3 right-3 w-6 h-6 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-neutral-400 hover:text-white transition-colors"
            aria-label="Close WhatsApp card"
          >
            <X className="w-3.5 h-3.5" />
          </button>

          <div className="flex items-center gap-2.5 mb-2.5">
            <div className="relative w-9 h-9 rounded-full bg-[#00FC43]/20 border border-[#00FC43] flex items-center justify-center text-[#00FC43]">
              <FaWhatsapp className="w-5 h-5" />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-[#00FC43] ring-2 ring-black animate-pulse" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white truncate max-w-[170px]">{agentName}</h4>
              <p className="text-[10px] font-mono text-[#00FC43]">
                ● {isScheduled ? 'Active Scheduled Shift' : 'Online · Fast Reply'}
              </p>
            </div>
          </div>

          <p className="text-xs text-neutral-300 leading-relaxed mb-3">
            Have a project scope, custom requirement, or budget question? Speak directly with our active team on WhatsApp.
          </p>

          <button
            onClick={() => openWhatsApp('floating_card')}
            className="w-full brand-glow-button py-2.5 px-4 rounded-full text-xs font-bold text-[#041608] flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(0,252,67,0.5)] active:scale-95 cursor-pointer"
          >
            <FaWhatsapp className="w-4 h-4 fill-current" />
            <span>Start WhatsApp Chat</span>
          </button>
        </div>
      )}

      {/* Main Trigger Pill / Button */}
      <div className="flex items-center gap-2">
        {!isOpen && (
          <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#070d09]/90 border border-[#00FC43]/30 backdrop-blur-md shadow-lg pointer-events-none select-none">
            <span className="w-2 h-2 rounded-full bg-[#00FC43] animate-pulse" />
            <span className="text-[11px] font-mono text-[#00FC43] font-medium">
              {agentName ? `${agentName.split('—')[0].trim()} (Online)` : 'Chat with an Architect'}
            </span>
          </div>
        )}

        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Chat with TOTO Development on WhatsApp"
          className="relative group w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-tr from-[#0b1f11] via-[#052912] to-[#00FC43] border border-[#00FC43] flex items-center justify-center text-white shadow-[0_0_30px_rgba(0,252,67,0.5)] hover:shadow-[0_0_45px_rgba(0,252,67,0.8)] active:scale-95 transition-all duration-300 cursor-pointer"
        >
          <span className="absolute inset-0 rounded-full bg-[#00FC43]/30 animate-ping pointer-events-none duration-1000" />
          <FaWhatsapp className="w-6 h-6 sm:w-7 sm:h-7 text-white drop-shadow-md group-hover:scale-110 transition-transform" />
        </button>
      </div>
    </aside>
  );
};

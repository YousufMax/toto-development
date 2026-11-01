'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { clsx } from 'clsx';
import { ArrowUpRight, ArrowLeft, X, ShieldCheck, CheckCircle2, Sparkles, ExternalLink } from 'lucide-react';
import { ProjectItem } from '@/lib/data';

interface ProjectCardProps {
  project: ProjectItem;
  featured?: boolean;
  className?: string;
  onSelect?: (project: ProjectItem) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  featured = false,
  className,
  onSelect,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div
        style={{
          background: featured
            ? 'radial-gradient(circle at 10% 8%, rgba(0, 252, 67, 0.35) 0%, rgba(0, 252, 67, 0.12) 28%, transparent 58%), radial-gradient(circle at 90% 12%, rgba(255, 255, 255, 0.22) 0%, transparent 45%), radial-gradient(circle at 90% 90%, rgba(0, 210, 255, 0.14) 0%, transparent 55%), linear-gradient(145deg, rgba(16, 26, 20, 0.88) 0%, rgba(8, 14, 10, 0.94) 50%, rgba(3, 6, 4, 0.98) 100%)'
            : 'radial-gradient(circle at 8% 8%, rgba(0, 252, 67, 0.30) 0%, rgba(0, 252, 67, 0.10) 28%, transparent 58%), radial-gradient(circle at 92% 10%, rgba(255, 255, 255, 0.20) 0%, transparent 45%), radial-gradient(circle at 92% 92%, rgba(0, 210, 255, 0.12) 0%, transparent 55%), linear-gradient(145deg, rgba(14, 22, 17, 0.86) 0%, rgba(7, 12, 9, 0.92) 50%, rgba(3, 5, 4, 0.98) 100%)',
        }}
        className={clsx(
          'asymmetric-glass-card group relative rounded-3xl p-6 sm:p-8 transition-all duration-500 border border-white/10 hover:border-[#00FC43]/60 shadow-[0_20px_50px_rgba(0,0,0,0.92),inset_1.5px_1.5px_2px_rgba(255,255,255,0.45),inset_0_0_25px_rgba(0,252,67,0.18),inset_-1px_-1px_20px_rgba(0,210,255,0.06)] backdrop-blur-2xl flex flex-col justify-between overflow-hidden',
          featured && 'lg:col-span-2 shadow-[0_30px_70px_rgba(0,0,0,0.98),0_0_45px_rgba(0,252,67,0.25)]',
          'hover:shadow-[0_35px_75px_rgba(0,0,0,0.98),0_0_50px_rgba(0,252,67,0.32)] hover:-translate-y-2',
          className
        )}
      >
        {/* 3-Sided Ambient Radial Light Layers */}
        <div className="absolute -left-16 -top-16 w-80 h-80 rounded-full bg-[#00FC43]/25 blur-[75px] pointer-events-none group-hover:bg-[#00FC43]/38 transition-all duration-700" />
        <div className="absolute -right-12 -top-12 w-64 h-64 rounded-full bg-white/15 blur-[65px] pointer-events-none" />
        <div className="absolute -right-16 -bottom-16 w-72 h-72 rounded-full bg-cyan-400/10 blur-[80px] pointer-events-none" />

        <div>
          {/* Top Header Row with Category */}
          <div className="flex items-center justify-between gap-3 mb-5">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#00FC43] shadow-[0_0_8px_#00FC43]" />
              <span className="text-xs font-mono uppercase tracking-widest text-[#00FC43] font-semibold">
                {project.categoryLabel}
              </span>
            </div>
            {project.industry && (
              <span className="text-xs text-neutral-300 font-medium px-3 py-1 rounded-full bg-white/5 border border-white/10">
                {project.industry}
              </span>
            )}
          </div>

          {/* PROJECT PICTURE — High-definition commercial showcase */}
          {project.image && (
            <div
              onClick={() => setIsModalOpen(true)}
              className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden mb-6 border border-white/10 group-hover:border-[#00FC43]/50 transition-all duration-500 shadow-xl bg-black/50 cursor-pointer"
            >
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 select-none"
                loading="lazy"
              />
              {/* Bottom vignette & subtle glass shine */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />

              {/* Verified Trust Badge */}
              <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/75 backdrop-blur-md border border-white/15 flex items-center gap-1.5 z-10 shadow-lg">
                <span className="w-2 h-2 rounded-full bg-[#00FC43] shadow-[0_0_8px_#00FC43] animate-pulse" />
                <span className="text-[10px] font-mono font-bold text-white tracking-wider uppercase">
                  Verified Production
                </span>
              </div>

              {/* Hover Inspect Pill */}
              <div className="absolute bottom-3 right-3 px-3 py-1.5 rounded-full bg-[#00FC43] text-[#041608] text-xs font-bold font-mono tracking-wider uppercase shadow-[0_0_20px_rgba(0,252,67,0.6)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-1 z-10">
                <span>View Case Study</span>
                <ArrowUpRight className="w-3.5 h-3.5 font-bold" />
              </div>
            </div>
          )}

          {/* Project Title & Tagline */}
          <h3
            onClick={() => setIsModalOpen(true)}
            className="editorial-serif text-2xl sm:text-3xl lg:text-4xl font-normal text-white mb-2.5 group-hover:text-[#00FC43] transition-colors duration-300 tracking-tight cursor-pointer"
          >
            {project.title}
          </h3>
          <p className="text-sm sm:text-base font-bold text-white mb-3">
            {project.tagline}
          </p>

          {/* Description (Crisp White High-Contrast Typography) */}
          <p className="text-xs sm:text-sm text-white/95 leading-relaxed font-normal mb-5">
            {project.description}
          </p>

          {/* Key Highlights / Capabilities */}
          {project.highlights && project.highlights.length > 0 && (
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 mb-6 text-xs text-white font-medium bg-white/[0.04] border border-white/10 rounded-xl px-4 py-2.5 backdrop-blur-sm">
              {project.highlights.map((highlight, idx) => (
                <React.Fragment key={idx}>
                  <span className="inline-flex items-center gap-1.5 text-white">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#00FC43] shrink-0" />
                    <span>{highlight}</span>
                  </span>
                  {project.highlights && idx < project.highlights.length - 1 && (
                    <span className="text-white/40 select-none">·</span>
                  )}
                </React.Fragment>
              ))}
            </div>
          )}
        </div>

        {/* Highlights / Metrics Row */}
        <div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 py-4 border-y border-white/10 mb-6 bg-black/35 rounded-2xl px-5">
            {project.metrics.map((metric, i) => (
              <div key={i} className="flex flex-col">
                <span className="editorial-serif text-xl sm:text-2xl font-bold text-[#00FC43] tracking-tight drop-shadow-[0_0_12px_rgba(0,252,67,0.35)]">
                  {metric.value}
                </span>
                <span className="text-[11px] text-neutral-400 font-medium mt-0.5">
                  {metric.label}
                </span>
              </div>
            ))}
          </div>

          {/* Footer with Tags and Action */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <div className="flex flex-wrap gap-1.5">
              {project.tags.map((tag, i) => (
                <span
                  key={i}
                  className="text-[11px] px-3 py-1 rounded-full bg-white/5 border border-white/10 text-neutral-300 font-medium group-hover:border-[#00FC43]/30 transition-colors"
                >
                  {tag}
                </span>
              ))}
            </div>

            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#00FC43] hover:underline underline-offset-4 cursor-pointer group/btn"
            >
              <span>Explore Project</span>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
            </button>
          </div>
        </div>
      </div>

      {/* SMART CASE STUDY MODAL */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-[9999] flex flex-col bg-black/95 backdrop-blur-2xl animate-in fade-in duration-200 select-none"
          onClick={() => setIsModalOpen(false)}
        >
          {/* FIXED TOP NAVIGATION BAR */}
          <div
            className="shrink-0 w-full px-4 sm:px-8 py-4 bg-[#060c08] border-b border-[#00FC43]/30 flex items-center justify-between z-20 shadow-[0_4px_25px_rgba(0,0,0,0.8)]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsModalOpen(false)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00FC43] text-[#041608] hover:bg-[#00FC43]/90 font-bold text-xs sm:text-sm transition-all duration-200 cursor-pointer shadow-[0_0_20px_rgba(0,252,67,0.4)] active:scale-95"
            >
              <ArrowLeft className="w-4 h-4 font-bold" />
              <span>← Back to Portfolio</span>
            </button>

            <div className="flex flex-col items-center text-center px-2 truncate max-w-[50vw]">
              <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-[#00FC43] font-semibold truncate">
                {project.categoryLabel}
              </span>
              <h3 className="text-sm sm:text-base font-bold text-white tracking-tight truncate">
                {project.title}
              </h3>
            </div>

            <button
              onClick={() => setIsModalOpen(false)}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-white/15 bg-white/5 hover:bg-white/15 text-neutral-300 hover:text-white flex items-center justify-center transition-all cursor-pointer"
              aria-label="Close Case Study"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* MODAL MAIN CONTENT */}
          <div
            className="flex-1 w-full overflow-y-auto p-4 sm:p-8 flex flex-col items-center justify-start min-h-0"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-full max-w-5xl mx-auto flex flex-col gap-8 pb-12">
              {/* Image Preview Container */}
              {project.image && (
                <div className="relative w-full rounded-3xl overflow-hidden border border-white/15 shadow-[0_0_60px_rgba(0,0,0,0.95)] bg-black/60">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full max-h-[62vh] object-contain mx-auto select-none"
                  />
                  <div className="absolute top-4 left-4 px-3.5 py-1.5 rounded-full bg-black/80 backdrop-blur-md border border-[#00FC43]/40 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#00FC43] animate-pulse" />
                    <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                      Live Commercial Deployment
                    </span>
                  </div>
                </div>
              )}

              {/* Case Study Details Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 bg-[#0a120c] p-6 sm:p-8 rounded-3xl border border-white/10">
                <div className="lg:col-span-2">
                  <span className="text-xs font-mono uppercase tracking-wider text-[#00FC43] font-semibold block mb-2">
                    {project.industry}
                  </span>
                  <h2 className="editorial-serif text-2xl sm:text-4xl font-normal text-white mb-3">
                    {project.title}
                  </h2>
                  <p className="text-base text-neutral-200 font-semibold mb-4">
                    {project.tagline}
                  </p>
                  <p className="text-sm text-neutral-400 leading-relaxed font-normal mb-6">
                    {project.description}
                  </p>

                  {/* Highlights */}
                  {project.highlights && project.highlights.length > 0 && (
                    <div className="mb-6">
                      <h4 className="text-xs font-mono uppercase tracking-wider text-neutral-400 font-semibold mb-3">
                        Key Capabilities Delivered:
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {project.highlights.map((h, i) => (
                          <span
                            key={i}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white font-medium"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#00FC43]" />
                            <span>{h}</span>
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Tech Stack */}
                  <div>
                    <h4 className="text-xs font-mono uppercase tracking-wider text-neutral-400 font-semibold mb-3">
                      Technology & Architecture:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 rounded-full bg-[#00FC43]/10 border border-[#00FC43]/30 text-[#00FC43] text-xs font-mono font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Column: Verified Metrics & CTA */}
                <div className="flex flex-col justify-between p-6 rounded-2xl bg-[#060c08] border border-white/10 gap-6">
                  <div>
                    <div className="flex items-center gap-2 mb-4 pb-3 border-b border-white/10">
                      <ShieldCheck className="w-5 h-5 text-[#00FC43]" />
                      <span className="text-xs font-mono uppercase font-bold text-white tracking-wider">
                        Verified Business ROI
                      </span>
                    </div>

                    <div className="space-y-4">
                      {project.metrics.map((m, i) => (
                        <div key={i} className="flex items-center justify-between border-b border-white/5 pb-2.5">
                          <span className="text-xs text-neutral-400 font-medium">{m.label}</span>
                          <span className="editorial-serif text-xl font-bold text-[#00FC43] drop-shadow-[0_0_10px_rgba(0,252,67,0.35)]">
                            {m.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Link
                    href="/contact/"
                    onClick={() => setIsModalOpen(false)}
                    className="w-full py-3.5 rounded-full bg-[#00FC43] text-[#041608] hover:bg-[#00FC43]/90 font-bold text-sm text-center transition-all duration-200 shadow-[0_0_25px_rgba(0,252,67,0.5)] active:scale-95 block"
                  >
                    Start a Project Like This →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProjectCard;

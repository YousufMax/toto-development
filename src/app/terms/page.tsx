'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Code2, Award, Clock, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { Badge } from '@/components/Badge';
import { SITE_CONFIG } from '@/lib/data';

export default function TermsPage() {
  const lastUpdated = 'October 29, 2026';

  return (
    <div className="relative pt-36 md:pt-44 pb-24 overflow-hidden bg-[#050705]">
      {/* Ambient Spotlight */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[450px] bg-[#00FC43]/10 blur-[160px] pointer-events-none -z-10" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="mb-12 text-center sm:text-left">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-mono text-[#00FC43] hover:underline mb-4"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Flagship</span>
          </Link>
          <Badge variant="emerald">COMMERCIAL AGREEMENT STANDARDS</Badge>

          <h1 className="editorial-serif text-3xl sm:text-5xl md:text-6xl font-normal text-white mt-4 tracking-tight">
            Terms of <span className="italic text-[#00FC43]">Engagement & Service</span>
          </h1>

          <p className="text-xs sm:text-sm font-mono text-neutral-400 mt-3">
            Last Updated: {lastUpdated} · Predictable Milestones, Zero Hidden Overages, 100% IP Transfer
          </p>
        </div>

        {/* Content Body */}
        <div className="space-y-10 text-neutral-300 text-sm sm:text-base leading-relaxed bg-[#0a120c] p-6 sm:p-10 rounded-3xl border border-white/10 shadow-2xl">
          {/* Section 1 */}
          <section>
            <div className="flex items-center gap-2.5 mb-3">
              <ShieldCheck className="w-5 h-5 text-[#00FC43]" />
              <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                1. Engagement Framework & Scope Definition
              </h2>
            </div>
            <p className="text-neutral-300 text-xs sm:text-sm">
              All consulting, software engineering, digital marketing, ad buying, and creative production contracts entered into with <strong>TOTO Development</strong> are executed under structured milestone blueprints. We do not bill ambiguous, open-ended hours; our deliverables are defined in advance with clear success criteria.
            </p>
          </section>

          {/* Section 2 */}
          <section>
            <div className="flex items-center gap-2.5 mb-3">
              <Code2 className="w-5 h-5 text-[#00FC43]" />
              <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                2. 100% Intellectual Property (IP) Ownership
              </h2>
            </div>
            <div className="space-y-2 text-xs sm:text-sm text-neutral-300">
              <p>Unlike traditional agencies that trap clients in proprietary hosting or retain repository rights:</p>
              <ul className="list-disc list-inside space-y-1.5 pl-2 text-neutral-400">
                <li><strong className="text-white">Full Handover:</strong> Upon milestone completion, 100% of all custom source code, Git repositories, database migrations, Figma design kits, 3D CGI files, and 4K video masters are transferred to client-owned accounts.</li>
                <li><strong className="text-white">Zero Vendor Lock-In:</strong> You maintain unconditional freedom to host, modify, scale, or inspect the software with your internal engineering teams.</li>
              </ul>
            </div>
          </section>

          {/* Section 3 */}
          <section>
            <div className="flex items-center gap-2.5 mb-3">
              <Clock className="w-5 h-5 text-[#00FC43]" />
              <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                3. Milestone Commitments & Sprint Velocity
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-neutral-300">
              Each sprint is deployed to live staging environments accessible 24/7 by client executives. Approvals are conducted weekly to ensure design fidelity and performance thresholds (such as sub-200ms API response time and Lighthouse 95+ scores) are met before production rollout.
            </p>
          </section>

          {/* Section 4 */}
          <section>
            <div className="flex items-center gap-2.5 mb-3">
              <Award className="w-5 h-5 text-[#00FC43]" />
              <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                4. 60-Day Post-Launch Warranty
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-neutral-300">
              Every production system delivered by TOTO Development includes <strong>60 calendar days of post-launch warranty</strong>. Any architectural defects, bugs, or browser inconsistencies reported within this period are resolved at zero supplementary cost.
            </p>
          </section>

          {/* Section 5 */}
          <section className="pt-4 border-t border-white/10">
            <h3 className="text-sm font-bold text-white mb-2">Inquiries & Formal Agreements</h3>
            <p className="text-xs text-neutral-400">
              To request an official master services agreement (MSA) or statement of work (SOW), write to our lead contracts team at <a href={`mailto:${SITE_CONFIG.contactEmail}`} className="text-[#00FC43] underline font-mono">{SITE_CONFIG.contactEmail}</a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

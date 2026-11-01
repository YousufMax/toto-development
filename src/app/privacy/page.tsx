'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Lock, Eye, FileText, ArrowLeft, Mail } from 'lucide-react';
import { Badge } from '@/components/Badge';
import { SITE_CONFIG } from '@/lib/data';

export default function PrivacyPage() {
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
          <Badge variant="emerald">COMPLIANCE & DATA INTEGRITY</Badge>

          <h1 className="editorial-serif text-3xl sm:text-5xl md:text-6xl font-normal text-white mt-4 tracking-tight">
            Privacy Policy & <span className="italic text-[#00FC43]">Confidentiality</span>
          </h1>

          <p className="text-xs sm:text-sm font-mono text-neutral-400 mt-3">
            Last Updated: {lastUpdated} · Governed by Strict Mutual Confidentiality Standards
          </p>
        </div>

        {/* Content Body */}
        <div className="space-y-10 text-neutral-300 text-sm sm:text-base leading-relaxed bg-[#0a120c] p-6 sm:p-10 rounded-3xl border border-white/10 shadow-2xl">
          {/* Section 1 */}
          <section>
            <div className="flex items-center gap-2.5 mb-3">
              <ShieldCheck className="w-5 h-5 text-[#00FC43]" />
              <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                1. Executive Summary & Privacy Commitment
              </h2>
            </div>
            <p className="text-neutral-300 text-xs sm:text-sm">
              At <strong>TOTO Development</strong> (&ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;), protecting the confidentiality and intellectual integrity of our clients&rsquo; technical and commercial assets is non-negotiable. This Privacy Policy outlines how we collect, handle, safeguard, and disclose data across our website (<a href="https://totodevelopment.com" className="text-[#00FC43] underline">totodevelopment.com</a>), client discovery forms, and custom software consulting workflows.
            </p>
          </section>

          {/* Section 2 */}
          <section>
            <div className="flex items-center gap-2.5 mb-3">
              <Eye className="w-5 h-5 text-[#00FC43]" />
              <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                2. Information We Collect
              </h2>
            </div>
            <div className="space-y-2 text-xs sm:text-sm text-neutral-300">
              <p>We only collect information necessary to prepare technical proposals, architect solutions, and execute milestones:</p>
              <ul className="list-disc list-inside space-y-1.5 pl-2 text-neutral-400">
                <li><strong className="text-white">Direct Inquiries:</strong> Full name, professional work email, company name, target services, budget ranges, and project scopes provided through our proposal forms or WhatsApp discovery.</li>
                <li><strong className="text-white">Technical Telemetry & Analytics:</strong> Aggregate browser telemetry, approximate geographic region, screen resolution, and session interactions via privacy-compliant analytics to optimize site velocity.</li>
                <li><strong className="text-white">We Do Not Sell Data:</strong> We will never sell, rent, monetize, or trade any client information to data brokers or third parties.</li>
              </ul>
            </div>
          </section>

          {/* Section 3 */}
          <section>
            <div className="flex items-center gap-2.5 mb-3">
              <Lock className="w-5 h-5 text-[#00FC43]" />
              <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                3. Mutual Non-Disclosure Agreement (NDA) by Default
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-neutral-300">
              Prior to accessing proprietary source repositories, database architectures, or internal brand files, TOTO Development signs a formal bilateral Non-Disclosure Agreement. Any technical schemas, API tokens, marketing conversion metrics, or product roadmaps shared remain 100% strictly confidential.
            </p>
          </section>

          {/* Section 4 */}
          <section>
            <div className="flex items-center gap-2.5 mb-3">
              <FileText className="w-5 h-5 text-[#00FC43]" />
              <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                4. Advertising Platforms & Cookie Compliance
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-neutral-300">
              To measure the performance of our educational resources and service announcements, we may utilize privacy-conscious conversion tags (such as Meta Conversion API and Google Ads Signals). You can disable cookies in your browser settings at any time without impacting site navigation.
            </p>
          </section>

          {/* Section 5 */}
          <section>
            <div className="flex items-center gap-2.5 mb-3">
              <Mail className="w-5 h-5 text-[#00FC43]" />
              <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                5. Contact Our Privacy & Security Officer
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-neutral-300 mb-4">
              If you have any questions regarding our data practices or wish to request data deletion, contact our lead solutions team directly:
            </p>
            <div className="p-4 rounded-xl bg-black/40 border border-white/5 font-mono text-xs text-neutral-300">
              <p>Email: <a href={`mailto:${SITE_CONFIG.contactEmail}`} className="text-[#00FC43] hover:underline">{SITE_CONFIG.contactEmail}</a></p>
              <p className="mt-1">Hotline: {SITE_CONFIG.contactPhone}</p>
              <p className="mt-1">Headquarters: TOTO Development Group, 256 Upper Road, Mou Market 3rd Floor, Sonadanga, Khulna - 9000, Bangladesh</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

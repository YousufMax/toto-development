"use client";

import React from "react";
import Image from "next/image";
import { Sparkles, Star, Users, CheckCircle2 } from "lucide-react";
import { Marquee } from "@/components/ui/marquee";

export interface TeamMember {
  image: string;
  cdnImage?: string;
  name: string;
  role: string;
  department?: string;
}

export const TOTO_OFFICIAL_TEAM: TeamMember[] = [
  {
    image: "/team/founder-frontend.png",
    cdnImage: "https://cdn.jsdelivr.net/gh/YousufMax/image-server-001@main/Founder%20%26%20Front-End%20Developer.png",
    name: "Yousuf Rahman",
    role: "Founder & Front-End Developer",
    department: "Executive & Core Engineering",
  },
  {
    image: "/team/ceo-backend.png",
    cdnImage: "https://cdn.jsdelivr.net/gh/YousufMax/image-server-001@main/CEO%20%26%20Back-End%20Developer.png",
    name: "Sumaiya Akter Bita",
    role: "CEO & Back-End Developer",
    department: "Executive & Distributed Systems",
  },
  {
    image: "/team/project-manager.png",
    cdnImage: "https://cdn.jsdelivr.net/gh/YousufMax/image-server-001@main/Project%20Manager.png",
    name: "MD Abdur Razzak",
    role: "Project Manager",
    department: "Operations & Delivery Architecture",
  },
  {
    image: "/team/rajib-web.jpeg",
    cdnImage: "https://cdn.jsdelivr.net/gh/YousufMax/image-server-001@main/rajib%20web%20picture.jpeg",
    name: "Afif Islam Rajib",
    role: "Web Developer & Digital Strategist",
    department: "Web Platforms & Growth Systems",
  },
  {
    image: "/team/graphic-designer.png",
    cdnImage: "https://cdn.jsdelivr.net/gh/YousufMax/image-server-001@main/graphic%20designer%201.png",
    name: "MD. Rashidul Islam",
    role: "Graphic Designer",
    department: "Visual Brand Identity",
  },
  {
    image: "/team/video-editor.jpeg",
    cdnImage: "https://cdn.jsdelivr.net/gh/YousufMax/image-server-001@main/video%20editor%20picture.jpeg",
    name: "Shahriar Sayed",
    role: "Video Editor & Motion Designer",
    department: "Motion Graphics & Cinematic Video",
  },
  {
    image: "/team/maya-sales.jpeg",
    cdnImage: "https://cdn.jsdelivr.net/gh/YousufMax/image-server-001@main/maya%20sales.jpeg",
    name: "Alifa Benta Choa (Maya)",
    role: "Client Closure & Sales Executive",
    department: "Client Strategy & Account Growth",
  },
  {
    image: "/team/halal-sales.jpeg",
    cdnImage: "https://cdn.jsdelivr.net/gh/YousufMax/image-server-001@main/halal%20sales.jpeg",
    name: "MD Al Halal",
    role: "Client Closure & Sales Executive",
    department: "Business Partnerships & Inquiries",
  },
];

export interface TeamSectionProps {
  title?: string;
  subtitle?: string;
  badge?: string;
  members?: TeamMember[];
  className?: string;
}

export function Team({
  title = "The Masterminds Behind Your Digital Advantage",
  subtitle = "Meet our elite team of software engineers, creative architects, project managers, and growth strategists dedicated to delivering industry-defining results.",
  badge = "ELITE EXECUTION FLEET · TOTO CORE TALENT",
  members = TOTO_OFFICIAL_TEAM,
  className,
}: TeamSectionProps) {
  return (
    <section
      className={`relative w-full overflow-hidden py-20 md:py-32 bg-[#050705] text-neutral-100 ${
        className || ""
      }`}
    >
      {/* Background Decorative Abstract Geometry */}
      <div className="pointer-events-none absolute right-0 bottom-0 opacity-20 select-none">
        <svg
          className="text-[#00FC43]"
          fill="none"
          height="154"
          viewBox="0 0 460 154"
          width="460"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_team_ambient)">
            <path
              d="M-87.463 458.432C-102.118 348.092 -77.3418 238.841 -15.0744 188.274C57.4129 129.408 180.708 150.071 351.748 341.128C278.246 -374.233 633.954 380.602 548.123 42.7707"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="40"
            />
          </g>
          <defs>
            <clipPath id="clip0_team_ambient">
              <rect fill="white" height="154" width="460" />
            </clipPath>
          </defs>
        </svg>
      </div>

      {/* Ambient Multi-Point Radial Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[900px] h-[450px] bg-[#00FC43]/12 blur-[150px] rounded-full pointer-events-none -z-10" />
      <div className="absolute -bottom-20 -left-20 w-[450px] h-[450px] bg-[#00FC43]/08 blur-[130px] rounded-full pointer-events-none -z-10" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="mx-auto mb-16 sm:mb-20 flex max-w-3xl flex-col items-center text-center">
          <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#00FC43] font-semibold mb-3">
            {badge}
          </span>

          <h2 className="editorial-serif relative mb-5 font-normal text-3xl sm:text-5xl lg:text-[54px] text-white tracking-tight leading-[1.12]">
            {title}
          </h2>

          <p className="max-w-2xl text-neutral-400 text-sm sm:text-base md:text-lg leading-relaxed font-normal">
            {subtitle}
          </p>
        </div>

        {/* Infinite Marquee Carousel */}
        <div className="relative w-full overflow-hidden py-4">
          {/* Edge Subtle Fade Masks */}
          <div className="pointer-events-none absolute top-0 left-0 z-20 h-full w-24 sm:w-36 md:w-56 bg-gradient-to-r from-[#050705] via-[#050705]/85 to-transparent" />
          <div className="pointer-events-none absolute top-0 right-0 z-20 h-full w-24 sm:w-36 md:w-56 bg-gradient-to-l from-[#050705] via-[#050705]/85 to-transparent" />

          <Marquee className="[--gap:2rem] py-4" pauseOnHover>
            {members.map((member) => (
              <div
                className="group flex w-[270px] sm:w-[310px] md:w-[330px] shrink-0 flex-col select-none cursor-default"
                key={member.name}
              >
                <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl bg-[#080f0a] border border-[#00FC43]/30 group-hover:border-[#00FC43] shadow-[0_15px_45px_rgba(0,0,0,0.9)] transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-[0_0_40px_rgba(0,252,67,0.35)]">
                  {/* Subtle Top-Right Ambient Specular Shine */}
                  <div className="absolute -top-16 -right-16 w-36 h-36 bg-[#00FC43]/20 rounded-full blur-[40px] pointer-events-none group-hover:bg-[#00FC43]/35 transition-all duration-500 z-10" />

                  {/* Official Card Image */}
                  <Image
                    alt={`${member.name} — ${member.role}`}
                    className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.025]"
                    fill
                    src={member.image}
                    sizes="(max-width: 640px) 270px, (max-width: 768px) 310px, 330px"
                    priority={false}
                  />
                </div>
              </div>
            ))}
          </Marquee>
        </div>

        {/* Executive Endorsement Banner */}
        <div className="mx-auto mt-20 max-w-3xl px-6 text-center lg:px-0">
          <div className="flex items-center justify-center gap-1.5 text-[#00FC43] mb-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-current drop-shadow-[0_0_8px_rgba(0,252,67,0.6)]" />
            ))}
          </div>

          <p className="mb-8 font-normal text-base sm:text-lg md:text-xl text-neutral-200 leading-relaxed italic">
            &ldquo;The engineering velocity, flawless communication, and creative brilliance of the TOTO Development team set a new benchmark for agency partnerships. They transformed our vision into an enterprise-grade digital flagship.&rdquo;
          </p>

          <div className="flex items-center justify-center gap-3">
            <span className="w-2 h-2 rounded-full bg-[#00FC43] shadow-[0_0_8px_#00FC43]" />
            <span className="text-xs sm:text-sm font-mono text-neutral-400 tracking-wide">
              Verified Executive Endorsement · Trusted by Fast-Growing Global Brands
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Team;

"use client";

import Image from "next/image";
import Typewriter from "./Typewriter";
import { useLanguage } from "@/context/LanguageContext";

export default function HeroSection() {
  const { data } = useLanguage();

  return (
    <section
      id="home"
      className="relative min-h-[92vh] lg:min-h-screen flex flex-col justify-center pt-24 pb-12 overflow-hidden bg-[#0D0D12] neo-grid-dark-bg"
    >
      {/* Neo-Brutalist High-Voltage Marquee Tape */}
      <div className="w-full bg-[#FFE600] border-y-3 border-black py-2.5 overflow-hidden mb-8 shadow-[0px_4px_0px_0px_#000]">
        <div className="animate-marquee whitespace-nowrap flex items-center gap-8 font-mono font-black text-xs sm:text-sm text-black uppercase tracking-wider">
          <span>⚡ FULL-STACK ARCHITECTURE</span>
          <span>★</span>
          <span>FLUTTER & MOBILE DEV</span>
          <span>★</span>
          <span>LARAVEL & NEXT.JS 16</span>
          <span>★</span>
          <span>INTERACTIVE THREE.JS 3D</span>
          <span>★</span>
          <span>TELKOM UNIVERSITY JAKARTA</span>
          <span>★</span>
          <span>AVAILABLE FOR FREELANCE & FULLTIME</span>
          <span>★</span>
          {/* Duplicate loop */}
          <span>⚡ FULL-STACK ARCHITECTURE</span>
          <span>★</span>
          <span>FLUTTER & MOBILE DEV</span>
          <span>★</span>
          <span>LARAVEL & NEXT.JS 16</span>
          <span>★</span>
          <span>INTERACTIVE THREE.JS 3D</span>
          <span>★</span>
          <span>TELKOM UNIVERSITY JAKARTA</span>
          <span>★</span>
          <span>AVAILABLE FOR FREELANCE & FULLTIME</span>
          <span>★</span>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 w-full">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-14">
          {/* Left Content */}
          <div className="flex-1 text-center lg:text-left order-2 lg:order-1">
            {/* Status & Availability Badge */}
            <div className="animate-fade-in-up mb-5 inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#00F08B] text-black border-2 border-black shadow-[3px_3px_0px_#000] font-mono text-xs font-black uppercase">
              <span className="w-2.5 h-2.5 bg-black rounded-none animate-pulse" />
              <span>{data.hero.available}</span>
            </div>

            {/* Brutalist Display Headline */}
            <h1 className="animate-fade-in-up text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.05] mb-4 text-white uppercase font-sans">
              <span className="text-[#00D2FF] block text-base sm:text-lg font-mono font-bold mb-2 tracking-widest">
                {"//"} {data.hero.greeting}
              </span>
              <span>{data.hero.nameFirst} </span>
              <span className="inline-block bg-[#FFE600] text-black px-2.5 py-0.5 border-3 border-black shadow-[4px_4px_0px_#000] rotate-[-1deg]">
                {data.hero.nameLast}
              </span>
            </h1>

            {/* Typewriter Specialization Strip */}
            <div className="animate-fade-in-up inline-flex items-center gap-2.5 px-3 py-1.5 bg-[#171720] border-2 border-black shadow-[3px_3px_0px_#000] mb-6">
              <span className="font-mono text-xs font-bold text-[#FF3366]">&gt;&gt;</span>
              <p className="text-sm sm:text-base text-zinc-100 font-mono font-bold tracking-wide">
                <Typewriter
                  texts={data.hero.typewriter}
                  speed={65}
                  deleteSpeed={30}
                  pauseTime={2200}
                />
              </p>
            </div>

            {/* High-Conversion Value Proposition */}
            <p className="animate-fade-in-up max-w-xl text-sm sm:text-base text-zinc-300 leading-relaxed mb-8 mx-auto lg:mx-0 font-medium">
              {data.hero.description}
            </p>

            {/* Primary Action Buttons */}
            <div className="animate-fade-in-up flex flex-wrap items-center justify-center lg:justify-start gap-4 mb-10">
              <a
                href="#projects"
                id="hero-cta-projects"
                className="neo-btn px-6 py-3.5 bg-[#FFE600] text-black text-sm hover:bg-[#FFF066]"
              >
                <span>{data.hero.viewProjects}</span>
                <span className="font-mono text-base font-black">→</span>
              </a>

              <a
                href="#contact"
                id="hero-cta-contact"
                className="neo-btn px-6 py-3.5 bg-white text-black text-sm hover:bg-zinc-100"
              >
                <span>{data.hero.contactMe}</span>
                <span className="font-mono text-base font-black">⚡</span>
              </a>
            </div>

            {/* Tactile Metrics Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t-3 border-black">
              {data.hero.quickStats.map((stat, i) => (
                <div
                  key={i}
                  className="p-3 bg-[#171720] border-2 border-black shadow-[3px_3px_0px_#000] text-center lg:text-left hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[5px_5px_0px_#000] transition-all"
                >
                  <div className="text-xl sm:text-2xl font-black text-[#FFE600] font-mono tracking-tight">
                    {stat.number}
                  </div>
                  <div className="text-xs font-bold text-white uppercase font-mono">{stat.label}</div>
                  <div className="text-[10px] text-zinc-400 font-mono hidden sm:block">{stat.sublabel}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side - Neo-Brutalist Portrait Frame */}
          <div className="flex-shrink-0 order-1 lg:order-2">
            <div className="relative">
              {/* Hard Drop-Block Shadow Plate */}
              <div className="absolute inset-0 bg-[#00D2FF] border-3 border-black translate-x-3 translate-y-3 sm:translate-x-4 sm:translate-y-4" />

              {/* Main Card */}
              <div className="relative w-64 h-64 sm:w-76 sm:h-76 md:w-84 md:h-84 bg-white border-3 border-black overflow-hidden">
                <Image
                  src="/profile.jpeg"
                  alt="Muhammad Fatih Rahman"
                  fill
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-300"
                  priority
                  sizes="(max-width: 640px) 256px, (max-width: 768px) 304px, 336px"
                />

                {/* Bottom Label Bar */}
                <div className="absolute bottom-0 left-0 right-0 p-3 bg-black text-white border-t-3 border-black flex items-center justify-between">
                  <div>
                    <p className="text-xs font-black font-mono uppercase tracking-wider text-[#FFE600]">
                      M. Fatih Rahman
                    </p>
                    <p className="text-[10px] font-mono text-zinc-300">
                      TELKOM UNIVERSITY
                    </p>
                  </div>
                  <span className="px-2 py-0.5 bg-[#00F08B] text-black font-mono text-[9px] font-black uppercase border border-black">
                    VERIFIED
                  </span>
                </div>
              </div>

              {/* Sticker 1: Punch Pink Stamp */}
              <div className="absolute -top-4 -left-4 px-3 py-1 bg-[#FF3366] text-white border-2 border-black shadow-[3px_3px_0px_#000] font-mono text-xs font-black uppercase rotate-[-6deg]">
                SYS::ONLINE
              </div>

              {/* Sticker 2: Canary Yellow Stamp */}
              <div className="absolute -bottom-3 -right-3 px-3 py-1 bg-[#FFE600] text-black border-2 border-black shadow-[3px_3px_0px_#000] font-mono text-xs font-black uppercase rotate-[4deg]">
                3D POV READY
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

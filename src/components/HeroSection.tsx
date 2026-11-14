"use client";

import Image from "next/image";
import ParticleBackground from "./ParticleBackground";
import Typewriter from "./Typewriter";
import { useLanguage } from "@/context/LanguageContext";

export default function HeroSection() {
  const { data } = useLanguage();

  return (
    <section
      id="home"
      className="relative min-h-[92vh] lg:min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden"
    >
      {/* Particle Background */}
      <ParticleBackground />

      {/* Subtle Animated Glow Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute -top-32 -left-32 w-[30rem] h-[30rem] rounded-full animate-float opacity-30"
          style={{
            background: "radial-gradient(circle, rgba(99,102,241,0.25) 0%, transparent 70%)",
            animationDelay: "0s",
          }}
        />
        <div
          className="absolute top-1/4 -right-24 w-[26rem] h-[26rem] rounded-full animate-float opacity-20"
          style={{
            background: "radial-gradient(circle, rgba(52,211,153,0.2) 0%, transparent 70%)",
            animationDelay: "2.5s",
          }}
        />
        <div
          className="absolute -bottom-24 left-1/3 w-[24rem] h-[24rem] rounded-full animate-float opacity-25"
          style={{
            background: "radial-gradient(circle, rgba(168,85,247,0.2) 0%, transparent 70%)",
            animationDelay: "4.5s",
          }}
        />

        {/* Technical Grid Pattern */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 w-full">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-14">
          {/* Left Content */}
          <div className="flex-1 text-center lg:text-left order-2 lg:order-1">
            {/* Status & Availability Badge */}
            <div className="animate-fade-in-up mb-6 inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-surface-900/80 border border-primary-500/20 text-xs font-medium text-surface-200 backdrop-blur-md shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-400" />
              </span>
              <span>{data.hero.available}</span>
            </div>

            {/* Main Greeting & Positioning */}
            <h1 className="animate-fade-in-up text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-tight mb-4">
              <span className="text-surface-300 block text-lg sm:text-xl font-mono font-medium mb-1 tracking-normal">
                {data.hero.greeting}
              </span>
              <span className="text-white">{data.hero.nameFirst} </span>
              <span className="bg-gradient-to-r from-primary-400 via-indigo-300 to-accent-300 bg-clip-text text-transparent">
                {data.hero.nameLast}
              </span>
            </h1>

            {/* Typewriter Specialization */}
            <div className="animate-fade-in-up flex items-center justify-center lg:justify-start gap-3 mb-5">
              <div className="h-0.5 w-6 bg-gradient-to-r from-primary-500 to-accent-400 rounded-full" />
              <p className="text-base sm:text-lg text-primary-300 font-mono font-semibold tracking-wide">
                <Typewriter
                  texts={data.hero.typewriter}
                  speed={65}
                  deleteSpeed={30}
                  pauseTime={2200}
                />
              </p>
            </div>

            {/* High-Conversion Value Proposition */}
            <p className="animate-fade-in-up max-w-xl text-sm sm:text-base text-surface-300/80 leading-relaxed mb-8 mx-auto lg:mx-0">
              {data.hero.description}
            </p>

            {/* Primary Action Buttons */}
            <div className="animate-fade-in-up flex flex-wrap items-center justify-center lg:justify-start gap-3.5 mb-10">
              <a
                href="#projects"
                id="hero-cta-projects"
                className="group relative inline-flex items-center gap-2.5 px-6 py-3.5 bg-gradient-to-r from-primary-600 to-indigo-600 hover:from-primary-500 hover:to-indigo-500 text-white font-semibold text-sm rounded-xl transition-all duration-300 shadow-lg shadow-primary-600/25 hover:shadow-primary-600/40 hover:-translate-y-0.5"
              >
                <span>{data.hero.viewProjects}</span>
                <svg
                  className="w-4 h-4 transition-transform group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>

              <a
                href="#contact"
                id="hero-cta-contact"
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl border border-white/10 hover:border-primary-500/40 bg-white/5 hover:bg-white/10 text-white font-medium text-sm transition-all duration-200 hover:-translate-y-0.5"
              >
                <span>{data.hero.contactMe}</span>
              </a>
            </div>

            {/* Quick Proof Metrics Strip (Passes the 30-Second Test) */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-white/10">
              {data.hero.quickStats.map((stat, i) => (
                <div key={i} className="text-center lg:text-left">
                  <div className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center justify-center lg:justify-start gap-1">
                    <span className="bg-gradient-to-r from-white via-surface-100 to-primary-300 bg-clip-text text-transparent">
                      {stat.number}
                    </span>
                  </div>
                  <div className="text-xs font-semibold text-primary-300">{stat.label}</div>
                  <div className="text-[11px] text-surface-400 hidden sm:block">{stat.sublabel}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side - Interactive Profile Portrait */}
          <div className="flex-shrink-0 order-1 lg:order-2">
            <div className="relative group">
              {/* Outer Glowing Rings */}
              <div className="absolute -inset-4 rounded-3xl border border-primary-500/20 animate-[spin_35s_linear_infinite]" />
              <div className="absolute -inset-8 rounded-3xl border border-accent-400/10 animate-[spin_50s_linear_infinite_reverse]" />

              {/* Ambient Glow */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-primary-600/30 via-indigo-500/20 to-accent-400/20 blur-2xl opacity-70 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Profile Card Container */}
              <div className="relative w-60 h-60 sm:w-72 sm:h-72 md:w-80 md:h-80 rounded-3xl overflow-hidden border border-white/15 bg-surface-900/80 shadow-2xl transition-transform duration-500 group-hover:scale-[1.02]">
                <Image
                  src="/profile.jpeg"
                  alt="Muhammad Fatih Rahman"
                  fill
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  priority
                  sizes="(max-width: 640px) 240px, (max-width: 768px) 288px, 320px"
                />

                {/* Subtle Vignette Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-surface-950/80 via-transparent to-transparent opacity-80" />

                {/* Floating Bottom Pill inside image */}
                <div className="absolute bottom-3 left-3 right-3 p-3 rounded-2xl bg-surface-950/85 backdrop-blur-md border border-white/10 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-white leading-tight">M. Fatih Rahman</p>
                    <p className="text-[11px] font-mono text-primary-400">Telkom Univ Jakarta</p>
                  </div>
                  <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-accent-500/20 border border-accent-400/30 text-[10px] text-accent-300 font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent-400 animate-pulse" />
                    <span>Open to Work</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

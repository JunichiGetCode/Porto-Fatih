"use client";

import Image from "next/image";
import ParticleBackground from "./ParticleBackground";
import Typewriter from "./Typewriter";

export default function HeroSection() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Particle Background */}
      <ParticleBackground />

      {/* Animated Background Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute -top-40 -left-40 w-96 h-96 rounded-full animate-float"
          style={{
            background:
              "radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)",
            animationDelay: "0s",
          }}
        />
        <div
          className="absolute top-1/3 -right-20 w-80 h-80 rounded-full animate-float"
          style={{
            background:
              "radial-gradient(circle, rgba(52,211,153,0.1) 0%, transparent 70%)",
            animationDelay: "2s",
          }}
        />
        <div
          className="absolute -bottom-20 left-1/3 w-72 h-72 rounded-full animate-float"
          style={{
            background:
              "radial-gradient(circle, rgba(167,139,250,0.1) 0%, transparent 70%)",
            animationDelay: "4s",
          }}
        />

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 w-full">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">
          {/* Left Content */}
          <div className="flex-1 text-center lg:text-left order-2 lg:order-1">
            {/* Status Badge */}
            <div className="animate-fade-in-up opacity-0 mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-surface-200">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-accent-400" />
              </span>
              Available for projects &amp; collaboration
            </div>

            {/* Name */}
            <h1 className="animate-fade-in-up opacity-0 delay-200 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-none mb-4">
              <span className="block text-white">Muhammad</span>
              <span className="block gradient-text mt-2">Fatih Rahman</span>
            </h1>

            {/* Typewriter Subtitle */}
            <div className="animate-fade-in-up opacity-0 delay-300 flex items-center justify-center lg:justify-start gap-3 mb-6">
              <div className="h-px w-8 bg-gradient-to-r from-transparent to-primary-500" />
              <p className="text-lg sm:text-xl text-surface-200 font-light tracking-wide">
                <Typewriter
                  texts={[
                    "Web Developer",
                    "Mobile Developer",
                    "Laravel Expert",
                    "Flutter Developer",
                    "UI/UX Enthusiast",
                  ]}
                  speed={70}
                  deleteSpeed={35}
                  pauseTime={2500}
                />
              </p>
            </div>

            {/* Description */}
            <p className="animate-fade-in-up opacity-0 delay-400 max-w-xl text-base sm:text-lg text-surface-200/70 leading-relaxed mb-10 mx-auto lg:mx-0">
              Mahasiswa Sistem Informasi di{" "}
              <span className="text-primary-300 font-medium">
                Telkom University Jakarta
              </span>{" "}Dengan keahlian di pengembangan web &amp; mobile menggunakan{" "}
              <span className="text-accent-400">Laravel</span>,{" "}
              <span className="text-accent-400">Flutter</span>, dan{" "}
              <span className="text-accent-400">Next.js</span>.
            </p>

            {/* CTA Buttons */}
            <div className="animate-fade-in-up opacity-0 delay-500 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <a
                href="#projects"
                id="hero-cta-projects"
                className="group relative inline-flex items-center gap-3 px-8 py-4 bg-primary-600 hover:bg-primary-500 text-white font-semibold rounded-2xl transition-all duration-300 hover:shadow-2xl hover:shadow-primary-600/30 hover:-translate-y-1 overflow-hidden"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-primary-600 via-primary-500 to-primary-600 bg-[length:200%_100%] animate-[gradient-shift_3s_ease_infinite] opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="relative">Lihat Projects</span>
                <svg
                  className="relative w-5 h-5 transition-transform group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </a>

              <a
                href="#contact"
                id="hero-cta-contact"
                className="group inline-flex items-center gap-3 px-8 py-4 border border-surface-700 hover:border-primary-500/50 text-surface-200 hover:text-white font-semibold rounded-2xl transition-all duration-300 hover:bg-white/5 hover:-translate-y-1"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <span>Hubungi Saya</span>
              </a>
            </div>

            {/* Tech Stack Pills */}
            <div className="animate-fade-in-up opacity-0 delay-700 mt-10 flex flex-wrap items-center justify-center lg:justify-start gap-3">
              {[
                "Laravel",
                "Flutter",
                "Next.js",
                "TypeScript",
                "Python",
                "MySQL",
              ].map((tech, i) => (
                <span
                  key={tech}
                  className="tech-badge opacity-0 animate-fade-in-up"
                  style={{ animationDelay: `${800 + i * 100}ms`, animationFillMode: "forwards" }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Right Side - Profile Photo */}
          <div className="flex-shrink-0 order-1 lg:order-2 animate-fade-in-up opacity-0 delay-300">
            <div className="relative group">
              {/* Decorative rings */}
              <div className="absolute -inset-4 rounded-full border border-primary-500/20 animate-[spin_20s_linear_infinite]" />
              <div className="absolute -inset-8 rounded-full border border-primary-500/10 animate-[spin_30s_linear_infinite_reverse]" />
              
              {/* Floating orbs around photo */}
              <div className="absolute -top-3 -right-3 w-6 h-6 bg-primary-500 rounded-full animate-float opacity-60 blur-[2px]" style={{ animationDelay: "0s" }} />
              <div className="absolute -bottom-2 -left-4 w-4 h-4 bg-accent-400 rounded-full animate-float opacity-60 blur-[2px]" style={{ animationDelay: "1.5s" }} />
              <div className="absolute top-1/2 -right-6 w-3 h-3 bg-purple-400 rounded-full animate-float opacity-50 blur-[1px]" style={{ animationDelay: "3s" }} />

              {/* Glow behind image */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary-500/30 via-accent-400/20 to-purple-500/30 blur-2xl opacity-60 group-hover:opacity-80 transition-opacity duration-500 scale-110" />

              {/* Profile image container */}
              <div className="relative w-56 h-56 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 rounded-full overflow-hidden border-2 border-primary-500/30 group-hover:border-primary-400/50 transition-all duration-500 animate-pulse-glow">
                <Image
                  src="/profile.jpeg"
                  alt="Muhammad Fatih Rahman"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                  priority
                  sizes="(max-width: 640px) 224px, (max-width: 768px) 256px, (max-width: 1024px) 288px, 320px"
                />
                {/* Overlay gradient on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-fade-in opacity-0 delay-800">
        <a
          href="#about"
          className="flex flex-col items-center gap-2 text-surface-200/50 hover:text-primary-400 transition-colors"
        >
          <span className="text-xs font-medium tracking-widest uppercase">
            Scroll
          </span>
          <div className="w-5 h-8 border-2 border-current rounded-full flex items-start justify-center p-1">
            <div className="w-1 h-2 bg-current rounded-full animate-bounce" />
          </div>
        </a>
      </div>
    </section>
  );
}

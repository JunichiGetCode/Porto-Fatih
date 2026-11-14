"use client";

import { useState } from "react";
import Image from "next/image";
import AnimateOnScroll from "./AnimateOnScroll";
import TiltCard from "./TiltCard";
import Counter from "./Counter";
import { useLanguage } from "@/context/LanguageContext";

export default function AboutSection() {
  const { data, language } = useLanguage();
  const [activeTab, setActiveTab] = useState<"bio" | "timeline" | "philosophy">("bio");

  return (
    <section id="about" className="relative py-24 md:py-32 section-glow">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <AnimateOnScroll className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 text-xs font-semibold tracking-widest uppercase text-primary-400 bg-primary-500/10 rounded-full border border-primary-500/20 mb-4">
            {data.about.badge}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
            {data.about.title1}{" "}
            <span className="bg-gradient-to-r from-primary-400 via-indigo-300 to-accent-300 bg-clip-text text-transparent">
              {data.about.title2}
            </span>
          </h2>
          <p className="max-w-2xl mx-auto text-surface-300/80 text-base sm:text-lg">
            {data.about.subtitle}
          </p>
        </AnimateOnScroll>

        {/* About Main Layout */}
        <div className="grid lg:grid-cols-12 gap-10 items-start mb-16">
          {/* Left Column: Portrait & Identity (5 cols) */}
          <AnimateOnScroll animation="animate-slide-in-left" className="lg:col-span-5">
            <TiltCard className="mx-auto max-w-md w-full">
              <div className="relative group">
                {/* Background ambient aura */}
                <div className="absolute -inset-2 bg-gradient-to-br from-primary-500/20 via-accent-400/15 to-purple-500/20 rounded-3xl blur-xl opacity-60 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Card Container */}
                <div className="relative rounded-3xl overflow-hidden bg-surface-900 border border-white/10 shadow-2xl">
                  <div className="relative w-full h-[380px] sm:h-[440px]">
                    <Image
                      src="/odoo.jpeg"
                      alt="Muhammad Fatih Rahman at work"
                      fill
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                      sizes="(max-width: 1024px) 100vw, 450px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-surface-950 via-surface-950/40 to-transparent" />

                    {/* Bottom Caption */}
                    <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-surface-950/85 backdrop-blur-md border border-white/10">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="text-base font-bold text-white">M. Fatih Rahman</h3>
                        <span className="flex items-center gap-1.5 text-[11px] text-accent-300 font-semibold">
                          <span className="w-2 h-2 rounded-full bg-accent-400 animate-pulse" />
                          <span>Information Systems</span>
                        </span>
                      </div>
                      <p className="text-xs text-primary-300 font-mono">
                        Telkom University Jakarta
                      </p>
                    </div>
                  </div>
                </div>

                {/* Floating Floating Pill */}
                <div className="absolute -top-3 -right-3 px-3 py-1.5 rounded-full bg-surface-900/90 border border-primary-500/40 text-xs font-semibold text-primary-300 shadow-xl backdrop-blur-md animate-float">
                  Full-Stack Dev
                </div>
              </div>
            </TiltCard>
          </AnimateOnScroll>

          {/* Right Column: Interactive Story & Journey Tabs (7 cols) */}
          <AnimateOnScroll animation="animate-slide-in-right" className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-3xl bg-surface-900/70 border border-white/10 shadow-xl">
              {/* Tab Navigation */}
              <div className="flex items-center gap-2 pb-4 mb-6 border-b border-white/10 overflow-x-auto">
                <button
                  onClick={() => setActiveTab("bio")}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer whitespace-nowrap ${
                    activeTab === "bio"
                      ? "bg-primary-600 text-white shadow-md shadow-primary-600/30"
                      : "text-surface-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {data.about.tabs.bio}
                </button>
                <button
                  onClick={() => setActiveTab("timeline")}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer whitespace-nowrap ${
                    activeTab === "timeline"
                      ? "bg-primary-600 text-white shadow-md shadow-primary-600/30"
                      : "text-surface-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {data.about.tabs.timeline}
                </button>
                <button
                  onClick={() => setActiveTab("philosophy")}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer whitespace-nowrap ${
                    activeTab === "philosophy"
                      ? "bg-primary-600 text-white shadow-md shadow-primary-600/30"
                      : "text-surface-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {data.about.tabs.philosophy}
                </button>
              </div>

              {/* Tab Content 1: Bio */}
              {activeTab === "bio" && (
                <div className="space-y-4 animate-fade-in">
                  <p
                    className="text-surface-300 text-sm sm:text-base leading-relaxed text-justify"
                    dangerouslySetInnerHTML={{ __html: data.about.bioParagraph1 }}
                  />
                  <p
                    className="text-surface-300 text-sm sm:text-base leading-relaxed text-justify"
                    dangerouslySetInnerHTML={{ __html: data.about.bioParagraph2 }}
                  />

                  <div className="pt-4 flex flex-wrap gap-3">
                    <a
                      href="#contact"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary-600 hover:bg-primary-500 text-white text-xs font-semibold shadow-lg shadow-primary-600/25 transition-all"
                    >
                      <span>{data.hero.contactMe}</span>
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </a>
                  </div>
                </div>
              )}

              {/* Tab Content 2: Timeline */}
              {activeTab === "timeline" && (
                <div className="space-y-5 animate-fade-in">
                  {data.about.timelineItems.map((item, idx) => (
                    <div key={idx} className="relative pl-6 border-l-2 border-primary-500/30 pb-2">
                      <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-surface-900 border-2 border-primary-400" />
                      <div className="flex items-center justify-between gap-2 mb-1 flex-wrap">
                        <span className="text-xs font-mono font-bold text-primary-400">
                          {item.year}
                        </span>
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-white/5 text-surface-300 border border-white/5">
                          {item.tag}
                        </span>
                      </div>
                      <h4 className="text-sm sm:text-base font-bold text-white">
                        {item.title} — <span className="text-primary-300">{item.institution}</span>
                      </h4>
                      <p className="text-xs sm:text-sm text-surface-300/80 leading-relaxed mt-1 text-justify">
                        {item.description}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {/* Tab Content 3: Philosophy */}
              {activeTab === "philosophy" && (
                <div className="space-y-4 animate-fade-in">
                  {data.about.principles.map((p, idx) => (
                    <div key={idx} className="p-4 rounded-2xl bg-surface-950/60 border border-white/5 flex items-start gap-3.5">
                      <div className="w-8 h-8 rounded-xl bg-primary-500/20 text-primary-300 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white mb-1">{p.title}</h4>
                        <p className="text-xs sm:text-sm text-surface-300/80 leading-relaxed text-justify">{p.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </AnimateOnScroll>
        </div>

        {/* Quantified Impact Numbers Banner */}
        <AnimateOnScroll animation="animate-scale-in">
          <div className="p-6 sm:p-8 rounded-3xl bg-surface-900/50 border border-white/10 backdrop-blur-md">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-extrabold text-white mb-1">
                  <Counter end={7} suffix="+" />
                </div>
                <p className="text-xs sm:text-sm font-semibold text-primary-300">{data.about.stats.projects}</p>
              </div>

              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-extrabold text-white mb-1">
                  <Counter end={2} suffix={language === "en" ? " Years" : " Tahun"} />
                </div>
                <p className="text-xs sm:text-sm font-semibold text-primary-300">{data.about.stats.experience}</p>
              </div>

              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-extrabold text-white mb-1">
                  <Counter end={9} suffix={language === "en" ? " Modules" : " Modul"} />
                </div>
                <p className="text-xs sm:text-sm font-semibold text-primary-300">{data.about.stats.modules}</p>
              </div>

              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-extrabold text-white mb-1">
                  <Counter end={12} suffix="+" />
                </div>
                <p className="text-xs sm:text-sm font-semibold text-primary-300">{data.about.stats.technologies}</p>
              </div>
            </div>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}

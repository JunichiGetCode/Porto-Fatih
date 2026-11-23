"use client";

import { useState } from "react";
import Image from "next/image";
import AnimateOnScroll from "./AnimateOnScroll";
import Counter from "./Counter";
import { useLanguage } from "@/context/LanguageContext";

export default function AboutSection() {
  const { data, language } = useLanguage();
  const [activeTab, setActiveTab] = useState<"bio" | "timeline" | "philosophy">("bio");

  return (
    <section id="about" className="relative py-20 md:py-28 bg-[#0D0D12] border-b-3 border-black neo-grid-dark-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <AnimateOnScroll className="text-center mb-16">
          <div className="inline-block px-3.5 py-1 text-xs font-mono font-black tracking-widest uppercase bg-[#00D2FF] text-black border-2 border-black shadow-[3px_3px_0px_#000] mb-4">
            [SECTION: 01] // {data.about.badge}
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white uppercase font-sans tracking-tight mb-4">
            {data.about.title1}{" "}
            <span className="inline-block bg-[#FFE600] text-black px-3 py-0.5 border-3 border-black shadow-[4px_4px_0px_#000] rotate-1">
              {data.about.title2}
            </span>
          </h2>
          <p className="max-w-2xl mx-auto text-zinc-300 text-sm sm:text-base font-medium">
            {data.about.subtitle}
          </p>
        </AnimateOnScroll>

        {/* About Main Layout */}
        <div className="grid lg:grid-cols-12 gap-10 items-start mb-16">
          {/* Left Column: Portrait & Identity (5 cols) */}
          <AnimateOnScroll animation="animate-slide-in-left" className="lg:col-span-5">
            <div className="relative mx-auto max-w-md w-full">
              {/* Hard Drop-Block Shadow Slab */}
              <div className="absolute inset-0 bg-[#FFE600] border-3 border-black translate-x-3 translate-y-3 sm:translate-x-4 sm:translate-y-4" />

              {/* Main Card */}
              <div className="relative border-3 border-black bg-[#171720] overflow-hidden">
                <div className="relative w-full h-[380px] sm:h-[440px]">
                  <Image
                    src="/odoo.jpeg"
                    alt="Muhammad Fatih Rahman at work"
                    fill
                    className="object-cover object-center grayscale contrast-115 hover:grayscale-0 transition-all duration-300"
                    sizes="(max-width: 1024px) 100vw, 450px"
                  />

                  {/* High-Contrast Bottom Plaque */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-black text-white border-t-3 border-black">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="text-base font-mono font-black text-[#FFE600] uppercase tracking-wide">
                        M. Fatih Rahman
                      </h3>
                      <span className="px-2 py-0.5 bg-[#00F08B] text-black font-mono text-[10px] font-black uppercase border border-black">
                        INFO SYSTEMS
                      </span>
                    </div>
                    <p className="text-xs text-zinc-300 font-mono">
                      TELKOM UNIVERSITY JAKARTA
                    </p>
                  </div>
                </div>
              </div>

              {/* Floating Sticker */}
              <div className="absolute -top-3 -right-3 px-3 py-1 bg-[#FF3366] text-white border-2 border-black font-mono font-black text-xs uppercase shadow-[3px_3px_0px_#000] rotate-[3deg]">
                FULL-STACK & 3D
              </div>
            </div>
          </AnimateOnScroll>

          {/* Right Column: Interactive Story & Journey Tabs (7 cols) */}
          <AnimateOnScroll animation="animate-slide-in-right" className="lg:col-span-7">
            <div className="p-6 sm:p-8 bg-[#171720] border-3 border-black shadow-[6px_6px_0px_#000]">
              {/* Tab Navigation */}
              <div className="flex items-center gap-2 pb-4 mb-6 border-b-3 border-black overflow-x-auto">
                <button
                  onClick={() => setActiveTab("bio")}
                  className={`px-4 py-2 text-xs sm:text-sm font-mono font-black uppercase transition-all duration-150 cursor-pointer whitespace-nowrap border-2 border-black ${
                    activeTab === "bio"
                      ? "bg-[#FFE600] text-black shadow-[3px_3px_0px_#000]"
                      : "bg-[#0D0D12] text-zinc-300 hover:text-white hover:bg-black"
                  }`}
                >
                  {data.about.tabs.bio}
                </button>
                <button
                  onClick={() => setActiveTab("timeline")}
                  className={`px-4 py-2 text-xs sm:text-sm font-mono font-black uppercase transition-all duration-150 cursor-pointer whitespace-nowrap border-2 border-black ${
                    activeTab === "timeline"
                      ? "bg-[#FFE600] text-black shadow-[3px_3px_0px_#000]"
                      : "bg-[#0D0D12] text-zinc-300 hover:text-white hover:bg-black"
                  }`}
                >
                  {data.about.tabs.timeline}
                </button>
                <button
                  onClick={() => setActiveTab("philosophy")}
                  className={`px-4 py-2 text-xs sm:text-sm font-mono font-black uppercase transition-all duration-150 cursor-pointer whitespace-nowrap border-2 border-black ${
                    activeTab === "philosophy"
                      ? "bg-[#FFE600] text-black shadow-[3px_3px_0px_#000]"
                      : "bg-[#0D0D12] text-zinc-300 hover:text-white hover:bg-black"
                  }`}
                >
                  {data.about.tabs.philosophy}
                </button>
              </div>

              {/* Tab Content 1: Bio */}
              {activeTab === "bio" && (
                <div className="space-y-4 animate-fade-in font-sans">
                  <p
                    className="text-zinc-200 text-sm sm:text-base leading-relaxed text-justify"
                    dangerouslySetInnerHTML={{ __html: data.about.bioParagraph1 }}
                  />
                  <p
                    className="text-zinc-200 text-sm sm:text-base leading-relaxed text-justify"
                    dangerouslySetInnerHTML={{ __html: data.about.bioParagraph2 }}
                  />

                  <div className="pt-4 flex flex-wrap gap-3">
                    <a
                      href="#contact"
                      className="neo-btn px-5 py-3 bg-[#FFE600] text-black text-xs hover:bg-[#FFF066]"
                    >
                      <span>{data.hero.contactMe}</span>
                      <span className="font-mono text-base font-black">→</span>
                    </a>
                  </div>
                </div>
              )}

              {/* Tab Content 2: Timeline */}
              {activeTab === "timeline" && (
                <div className="space-y-4 animate-fade-in">
                  {data.about.timelineItems.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-4 bg-[#0D0D12] border-2 border-black shadow-[3px_3px_0px_#000] relative"
                    >
                      <div className="flex items-center justify-between gap-2 mb-1.5 flex-wrap">
                        <span className="text-xs font-mono font-black px-2 py-0.5 bg-[#FFE600] text-black border border-black">
                          {item.year}
                        </span>
                        <span className="text-[10px] font-mono font-bold px-2 py-0.5 bg-[#00D2FF] text-black border border-black uppercase">
                          {item.tag}
                        </span>
                      </div>
                      <h4 className="text-sm sm:text-base font-black text-white font-sans">
                        {item.title} — <span className="text-[#00F08B]">{item.institution}</span>
                      </h4>
                      <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed mt-1 text-justify">
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
                    <div
                      key={idx}
                      className="p-4 bg-[#0D0D12] border-2 border-black shadow-[3px_3px_0px_#000] flex items-start gap-3.5"
                    >
                      <div className="w-8 h-8 bg-[#FFE600] text-black border-2 border-black flex items-center justify-center flex-shrink-0 font-mono font-black text-sm">
                        0{idx + 1}
                      </div>
                      <div>
                        <h4 className="text-sm font-black text-white uppercase font-mono mb-1">{p.title}</h4>
                        <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed text-justify">{p.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </AnimateOnScroll>
        </div>

        {/* Quantified Impact Numbers Banner (Neo-Brutalist Pop Block) */}
        <AnimateOnScroll animation="animate-scale-in">
          <div className="p-6 sm:p-8 bg-[#FFE600] text-black border-3 border-black shadow-[8px_8px_0px_#000]">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center p-3 bg-white border-2 border-black shadow-[3px_3px_0px_#000]">
                <div className="text-3xl sm:text-4xl font-black text-black font-mono mb-1">
                  <Counter end={7} suffix="+" />
                </div>
                <p className="text-xs font-mono font-bold uppercase text-black">{data.about.stats.projects}</p>
              </div>

              <div className="text-center p-3 bg-white border-2 border-black shadow-[3px_3px_0px_#000]">
                <div className="text-3xl sm:text-4xl font-black text-black font-mono mb-1">
                  <Counter end={2} suffix={language === "en" ? " Years" : " Thn"} />
                </div>
                <p className="text-xs font-mono font-bold uppercase text-black">{data.about.stats.experience}</p>
              </div>

              <div className="text-center p-3 bg-white border-2 border-black shadow-[3px_3px_0px_#000]">
                <div className="text-3xl sm:text-4xl font-black text-black font-mono mb-1">
                  <Counter end={9} suffix={language === "en" ? " Mod" : " Modul"} />
                </div>
                <p className="text-xs font-mono font-bold uppercase text-black">{data.about.stats.modules}</p>
              </div>

              <div className="text-center p-3 bg-white border-2 border-black shadow-[3px_3px_0px_#000]">
                <div className="text-3xl sm:text-4xl font-black text-black font-mono mb-1">
                  <Counter end={12} suffix="+" />
                </div>
                <p className="text-xs font-mono font-bold uppercase text-black">{data.about.stats.technologies}</p>
              </div>
            </div>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}

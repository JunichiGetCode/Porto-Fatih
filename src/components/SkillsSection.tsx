"use client";

import { useState } from "react";
import AnimateOnScroll from "./AnimateOnScroll";
import { useLanguage } from "@/context/LanguageContext";

export default function SkillsSection() {
  const { data } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const categories = data.skills.categories;

  const filteredCategories = categories.filter((cat) => {
    if (selectedCategory === "all") return true;
    return cat.id === selectedCategory;
  });

  return (
    <section id="skills" className="relative py-20 md:py-28 bg-[#0D0D12] border-b-3 border-black neo-grid-dark-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <AnimateOnScroll className="text-center mb-12">
          <div className="inline-block px-3.5 py-1 text-xs font-mono font-black tracking-widest uppercase bg-[#00F08B] text-black border-2 border-black shadow-[3px_3px_0px_#000] mb-4">
            [SECTION: 03] // {data.skills.badge}
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white uppercase font-sans tracking-tight mb-4">
            {data.skills.title1}{" "}
            <span className="inline-block bg-[#FFE600] text-black px-3 py-0.5 border-3 border-black shadow-[4px_4px_0px_#000] rotate-1">
              {data.skills.title2}
            </span>
          </h2>
          <p className="max-w-2xl mx-auto text-zinc-300 text-sm sm:text-base font-medium">
            {data.skills.subtitle}
          </p>
        </AnimateOnScroll>

        {/* Category Tabs (Neo-Brutalist Filter Row) */}
        <div className="flex items-center justify-center gap-2.5 mb-12 flex-wrap">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`neo-btn px-4 py-2 text-xs font-mono uppercase cursor-pointer ${
              selectedCategory === "all"
                ? "bg-[#FFE600] text-black shadow-[4px_4px_0px_#000]"
                : "bg-[#171720] text-zinc-300 hover:text-white"
            }`}
          >
            ALL DISCIPLINES
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`neo-btn px-4 py-2 text-xs font-mono uppercase cursor-pointer ${
                selectedCategory === cat.id
                  ? "bg-[#FFE600] text-black shadow-[4px_4px_0px_#000]"
                  : "bg-[#171720] text-zinc-300 hover:text-white"
              }`}
            >
              {cat.title}
            </button>
          ))}
        </div>

        {/* Technical Architecture Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {filteredCategories.map((cat, catIndex) => (
            <AnimateOnScroll
              key={cat.id}
              animation="animate-scale-in"
              delay={catIndex % 2 === 0 ? "delay-100" : "delay-200"}
            >
              <div className="h-full bg-[#171720] border-3 border-black shadow-[6px_6px_0px_#000] p-6 sm:p-8 flex flex-col justify-between">
                <div>
                  {/* Category Title & Badge */}
                  <div className="flex items-center justify-between mb-3 border-b-2 border-black pb-3">
                    <h3 className="text-xl font-black text-white font-sans uppercase">
                      {cat.title}
                    </h3>
                    <span className="w-8 h-8 bg-[#FFE600] text-black border-2 border-black flex items-center justify-center text-xs font-mono font-black shadow-[2px_2px_0px_#000]">
                      0{catIndex + 1}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-zinc-300 font-mono mb-6">
                    {"//"} {cat.description}
                  </p>

                  {/* Skills Items */}
                  <div className="space-y-3">
                    {cat.skills.map((skill, sIdx) => (
                      <div
                        key={sIdx}
                        className="p-3.5 bg-[#0D0D12] border-2 border-black shadow-[2px_2px_0px_#000] hover:shadow-[4px_4px_0px_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all"
                      >
                        <div className="flex items-center justify-between gap-2 mb-1.5">
                          <span className="font-mono font-black text-sm text-white">
                            {skill.name}
                          </span>
                          <span className="text-[10px] font-mono font-black px-2 py-0.5 bg-[#00D2FF] text-black border border-black uppercase">
                            {skill.tag}
                          </span>
                        </div>
                        <p className="text-xs text-zinc-400 font-sans leading-relaxed">
                          {skill.focus}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Category Tape */}
                <div className="mt-6 pt-4 border-t-2 border-black flex items-center justify-between text-xs font-mono text-zinc-400 font-bold">
                  <span>PRODUCTION READY</span>
                  <span className="text-[#00F08B]">STACK CERTIFIED ★</span>
                </div>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}

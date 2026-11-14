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
    <section id="skills" className="relative py-24 md:py-32 section-glow">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <AnimateOnScroll className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 text-xs font-semibold tracking-widest uppercase text-primary-400 bg-primary-500/10 rounded-full border border-primary-500/20 mb-4">
            {data.skills.badge}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
            {data.skills.title1}{" "}
            <span className="bg-gradient-to-r from-primary-400 via-indigo-300 to-accent-300 bg-clip-text text-transparent">
              {data.skills.title2}
            </span>
          </h2>
          <p className="max-w-2xl mx-auto text-surface-300/80 text-base sm:text-lg">
            {data.skills.subtitle}
          </p>
        </AnimateOnScroll>

        {/* Category Tabs */}
        <div className="flex items-center justify-center gap-2 mb-12 flex-wrap">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer ${
              selectedCategory === "all"
                ? "bg-primary-600 text-white shadow-lg shadow-primary-600/30 border border-primary-400/40"
                : "bg-surface-900/80 text-surface-300 hover:text-white border border-white/5 hover:border-white/20"
            }`}
          >
            All Disciplines
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer ${
                selectedCategory === cat.id
                  ? "bg-primary-600 text-white shadow-lg shadow-primary-600/30 border border-primary-400/40"
                  : "bg-surface-900/80 text-surface-300 hover:text-white border border-white/5 hover:border-white/20"
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
              <div className="h-full rounded-3xl bg-surface-900/70 border border-white/10 p-6 sm:p-8 flex flex-col justify-between hover:border-primary-500/30 transition-all duration-300 shadow-xl group">
                <div>
                  {/* Category Title & Description */}
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-bold text-white group-hover:text-primary-300 transition-colors">
                      {cat.title}
                    </h3>
                    <span className="w-8 h-8 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-primary-400 text-xs font-mono font-bold">
                      0{catIndex + 1}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-surface-400 mb-6">
                    {cat.description}
                  </p>

                  {/* Skills Items */}
                  <div className="space-y-3">
                    {cat.skills.map((skill, sIdx) => (
                      <div
                        key={sIdx}
                        className="p-3.5 rounded-2xl bg-surface-950/60 border border-white/5 hover:border-primary-500/20 transition-all"
                      >
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <span className="font-semibold text-sm text-white font-mono">
                            {skill.name}
                          </span>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-primary-500/15 text-primary-300 border border-primary-500/30 uppercase tracking-wider">
                            {skill.tag}
                          </span>
                        </div>
                        <p className="text-xs text-surface-300/80 leading-relaxed">
                          {skill.focus}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Architectural Note */}
                <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs text-surface-400 font-mono">
                  <span>Stack Verified in Production</span>
                  <span className="text-accent-400 font-bold">Tested</span>
                </div>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}

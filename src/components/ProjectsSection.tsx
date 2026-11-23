"use client";

import { useState } from "react";
import Image from "next/image";
import AnimateOnScroll from "./AnimateOnScroll";
import ProjectModal from "./ProjectModal";
import { useLanguage } from "@/context/LanguageContext";
import { ProjectItem } from "@/context/translations";

interface ProjectAssetMeta {
  image: string;
  techStack: string[];
  categoryTag: string;
  liveUrl?: string;
  accentColor: string;
}

const projectMetaMap: Record<string, ProjectAssetMeta> = {
  haramainqu: {
    image: "/haramainqu.jpeg",
    techStack: ["Flutter", "Dart", "Clean Architecture", "Dio REST API"],
    categoryTag: "MOBILE (FLUTTER)",
    accentColor: "#00D2FF",
  },
  tangkapin: {
    image: "/tangkapin.png",
    techStack: ["Vue.js 3", "Inertia.js", "Laravel", "PostgreSQL", "Midtrans"],
    categoryTag: "VILT STACK WEB",
    accentColor: "#00F08B",
  },
  bakso: {
    image: "/bakso_preview.png",
    techStack: ["Next.js 14", "React 18", "MySQL2", "Tailwind CSS", "WhatsApp API"],
    categoryTag: "E-COMMERCE WEB",
    liveUrl: "https://si-bakso.vercel.app",
    accentColor: "#FFE600",
  },
  "ai-interview": {
    image: "/ai_interview.png",
    techStack: ["React 18", "TypeScript", "Ruby on Rails", "WebSocket", "Redis"],
    categoryTag: "AI & WEBSOCKET",
    accentColor: "#FF3366",
  },
  "haramain-tour": {
    image: "/haramain_tour.png",
    techStack: ["Laravel", "PHP", "Midtrans", "REST API", "Google OAuth"],
    categoryTag: "ENTERPRISE SAAS",
    accentColor: "#00F08B",
  },
  televent: {
    image: "/televent.png",
    techStack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Vercel"],
    categoryTag: "CAMPUS PLATFORM",
    liveUrl: "https://televent.vercel.app",
    accentColor: "#00D2FF",
  },
  barbershop: {
    image: "/barbershop.png",
    techStack: ["Laravel", "Point of Sale", "Chart.js", "MySQL"],
    categoryTag: "POS OPERATIONS",
    accentColor: "#FFE600",
  },
};

export default function ProjectsSection() {
  const { data } = useLanguage();
  const [activeFilter, setActiveFilter] = useState<"all" | "mobile" | "web">("all");
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  const filteredProjects = data.projects.items.filter((item) => {
    if (activeFilter === "all") return true;
    return item.category === activeFilter;
  });

  return (
    <section id="projects" className="relative py-20 md:py-28 bg-[#0D0D12] border-b-3 border-black neo-grid-dark-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <AnimateOnScroll className="text-center mb-12">
          <div className="inline-block px-3.5 py-1 text-xs font-mono font-black tracking-widest uppercase bg-[#FFE600] text-black border-2 border-black shadow-[3px_3px_0px_#000] mb-4">
            [SECTION: 02] // {data.projects.badge}
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white uppercase font-sans tracking-tight mb-4">
            {data.projects.title1}{" "}
            <span className="inline-block bg-[#00F08B] text-black px-3 py-0.5 border-3 border-black shadow-[4px_4px_0px_#000] rotate-[-1deg]">
              {data.projects.title2}
            </span>
          </h2>
          <p className="max-w-2xl mx-auto text-zinc-300 text-sm sm:text-base font-medium">
            {data.projects.subtitle}
          </p>
        </AnimateOnScroll>

        {/* Interactive Filter Pills (Tactile Buttons) */}
        <div className="flex items-center justify-center gap-3 mb-14 flex-wrap">
          <button
            onClick={() => setActiveFilter("all")}
            className={`neo-btn px-5 py-2 text-xs font-mono uppercase cursor-pointer ${
              activeFilter === "all"
                ? "bg-[#FFE600] text-black shadow-[4px_4px_0px_#000]"
                : "bg-[#171720] text-zinc-300 hover:text-white"
            }`}
          >
            {data.projects.filterAll} ({data.projects.items.length})
          </button>
          <button
            onClick={() => setActiveFilter("mobile")}
            className={`neo-btn px-5 py-2 text-xs font-mono uppercase cursor-pointer ${
              activeFilter === "mobile"
                ? "bg-[#FFE600] text-black shadow-[4px_4px_0px_#000]"
                : "bg-[#171720] text-zinc-300 hover:text-white"
            }`}
          >
            {data.projects.filterMobile} (1)
          </button>
          <button
            onClick={() => setActiveFilter("web")}
            className={`neo-btn px-5 py-2 text-xs font-mono uppercase cursor-pointer ${
              activeFilter === "web"
                ? "bg-[#FFE600] text-black shadow-[4px_4px_0px_#000]"
                : "bg-[#171720] text-zinc-300 hover:text-white"
            }`}
          >
            {data.projects.filterWeb} (6)
          </button>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {filteredProjects.map((project, index) => {
            const meta = projectMetaMap[project.id] || {
              image: "/profile.jpeg",
              techStack: ["Next.js", "TypeScript"],
              categoryTag: "FULL-STACK",
              accentColor: "#FFE600",
            };

            return (
              <AnimateOnScroll
                key={project.id}
                animation="animate-scale-in"
                delay={index % 2 === 0 ? "delay-100" : "delay-200"}
              >
                <div className="h-full flex flex-col bg-[#171720] border-3 border-black shadow-[6px_6px_0px_#000] hover:shadow-[10px_10px_0px_#000] hover:-translate-x-1 hover:-translate-y-1 transition-all duration-200 group">
                  {/* Visual Card Banner */}
                  <div className="relative w-full h-52 sm:h-64 overflow-hidden bg-black border-b-3 border-black">
                    <Image
                      src={meta.image}
                      alt={project.title}
                      fill
                      className="object-cover object-top contrast-105 group-hover:scale-102 transition-transform duration-300"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />

                    {/* Top Floating Badges */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
                      <span className="px-2.5 py-1 bg-black text-[#FFE600] border-2 border-black font-mono text-[10px] font-black uppercase shadow-[2px_2px_0px_#000]">
                        {meta.categoryTag}
                      </span>
                      <div className="flex items-center gap-1.5">
                        {(project.liveUrl || meta.liveUrl) && (
                          <a
                            href={project.liveUrl || meta.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#00F08B] text-black border-2 border-black font-mono text-[10px] font-black uppercase shadow-[2px_2px_0px_#000] hover:bg-[#34FF9E] transition-colors"
                            title="Open Live Website"
                          >
                            <span className="w-1.5 h-1.5 bg-black rounded-none animate-pulse" />
                            <span>LIVE ↗</span>
                          </a>
                        )}
                        <span className="px-2.5 py-1 bg-[#FF3366] text-white border-2 border-black font-mono text-[10px] font-black uppercase shadow-[2px_2px_0px_#000]">
                          {project.impactBadge}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Header Title & Period */}
                      <div className="flex items-start justify-between gap-2 mb-1.5">
                        <h3 className="text-xl font-black text-white font-sans uppercase group-hover:text-[#FFE600] transition-colors">
                          {project.title}
                        </h3>
                        <span className="text-xs font-mono font-bold text-[#00D2FF] flex-shrink-0">
                          {project.period}
                        </span>
                      </div>

                      <p className="text-[#00F08B] text-xs font-mono font-bold uppercase mb-3">
                        {"//"} {project.subtitle}
                      </p>

                      <p className="text-zinc-300 text-sm leading-relaxed mb-5 font-medium">
                        {project.description}
                      </p>

                      {/* Bullet Highlights */}
                      <div className="space-y-2 mb-6">
                        {project.highlights.map((highlight, hIndex) => (
                          <div key={hIndex} className="flex items-start gap-2.5">
                            <span className="w-4 h-4 mt-0.5 bg-[#FFE600] text-black border border-black flex items-center justify-center text-[10px] font-black flex-shrink-0">
                              ✓
                            </span>
                            <span className="text-xs sm:text-sm text-zinc-200">
                              {highlight}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Card Footer: Tech Stack + Actions */}
                    <div>
                      <div className="flex flex-wrap gap-1.5 pt-4 border-t-2 border-black mb-5">
                        {meta.techStack.map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-0.5 text-[11px] font-mono font-bold bg-[#0D0D12] text-zinc-300 border border-black shadow-[1px_1px_0px_#000]"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      {/* Interactive Action Buttons */}
                      <div className="flex items-center gap-2">
                        {(project.liveUrl || meta.liveUrl) && (
                          <a
                            href={project.liveUrl || meta.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="neo-btn flex-1 py-2.5 px-3 bg-[#00F08B] text-black text-xs hover:bg-[#34FF9E]"
                          >
                            <span>🌐</span>
                            <span>LIVE DEMO ↗</span>
                          </a>
                        )}
                        <button
                          onClick={() => setSelectedProject(project)}
                          className={`neo-btn ${
                            project.liveUrl || meta.liveUrl ? "flex-1" : "w-full"
                          } py-2.5 px-3 bg-[#FFE600] text-black text-xs hover:bg-[#FFF066]`}
                        >
                          <span>{data.projects.viewCaseStudy}</span>
                          <span className="font-mono text-sm font-black">→</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </AnimateOnScroll>
            );
          })}
        </div>
      </div>

      {/* Case Study Modal */}
      <ProjectModal
        project={selectedProject}
        imageSrc={selectedProject ? projectMetaMap[selectedProject.id]?.image : undefined}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}

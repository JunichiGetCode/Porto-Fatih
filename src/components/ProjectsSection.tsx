"use client";

import { useState } from "react";
import Image from "next/image";
import AnimateOnScroll from "./AnimateOnScroll";
import TiltCard from "./TiltCard";
import ProjectModal from "./ProjectModal";
import { useLanguage } from "@/context/LanguageContext";
import { ProjectItem } from "@/context/translations";

interface ProjectAssetMeta {
  image: string;
  techStack: string[];
  gradient: string;
  categoryTag: string;
  liveUrl?: string;
}

const projectMetaMap: Record<string, ProjectAssetMeta> = {
  haramainqu: {
    image: "/haramainqu.jpeg",
    techStack: ["Flutter", "Dart", "Clean Architecture", "Dio REST API"],
    gradient: "from-indigo-500/20 to-purple-500/20",
    categoryTag: "Mobile App (Flutter)",
  },
  tangkapin: {
    image: "/tangkapin.png",
    techStack: ["Vue.js 3", "Inertia.js", "Laravel", "PostgreSQL", "Midtrans"],
    gradient: "from-teal-500/20 to-cyan-500/20",
    categoryTag: "VILT Stack Platform",
  },
  bakso: {
    image: "/bakso_preview.png",
    techStack: ["Next.js 14", "React 18", "MySQL2", "Tailwind CSS", "WhatsApp API"],
    gradient: "from-amber-500/20 to-rose-500/20",
    categoryTag: "Next.js E-Commerce",
    liveUrl: "https://si-bakso.vercel.app",
  },
  "ai-interview": {
    image: "/ai_interview.png",
    techStack: ["React 18", "TypeScript", "Ruby on Rails", "WebSocket", "Redis"],
    gradient: "from-purple-500/20 to-indigo-500/20",
    categoryTag: "AI & WebSocket Platform",
  },
  "haramain-tour": {
    image: "/haramain_tour.png",
    techStack: ["Laravel", "PHP", "Midtrans", "REST API", "Google OAuth"],
    gradient: "from-emerald-500/20 to-teal-500/20",
    categoryTag: "Enterprise Travel Web",
  },
  televent: {
    image: "/televent.png",
    techStack: ["Laravel", "MySQL", "RBAC", "Bootstrap"],
    gradient: "from-blue-500/20 to-cyan-500/20",
    categoryTag: "Campus Event Workflow",
    liveUrl: "https://televent.vercel.app",
  },
  barbershop: {
    image: "/barbershop.png",
    techStack: ["Laravel", "Point of Sale", "Chart.js", "MySQL"],
    gradient: "from-orange-500/20 to-amber-500/20",
    categoryTag: "POS & Operations System",
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
    <section id="projects" className="relative py-24 md:py-32 section-glow">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <AnimateOnScroll className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 text-xs font-semibold tracking-widest uppercase text-primary-400 bg-primary-500/10 rounded-full border border-primary-500/20 mb-4">
            {data.projects.badge}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
            {data.projects.title1}{" "}
            <span className="bg-gradient-to-r from-primary-400 via-indigo-300 to-accent-300 bg-clip-text text-transparent">
              {data.projects.title2}
            </span>
          </h2>
          <p className="max-w-2xl mx-auto text-surface-300/80 text-base sm:text-lg">
            {data.projects.subtitle}
          </p>
        </AnimateOnScroll>

        {/* Interactive Filter Pills */}
        <div className="flex items-center justify-center gap-2.5 mb-14 flex-wrap">
          <button
            onClick={() => setActiveFilter("all")}
            className={`px-5 py-2 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer ${
              activeFilter === "all"
                ? "bg-primary-600 text-white shadow-lg shadow-primary-600/30 border border-primary-400/40"
                : "bg-surface-900/80 text-surface-300 hover:text-white border border-white/5 hover:border-white/20"
            }`}
          >
            {data.projects.filterAll} ({data.projects.items.length})
          </button>
          <button
            onClick={() => setActiveFilter("mobile")}
            className={`px-5 py-2 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer ${
              activeFilter === "mobile"
                ? "bg-primary-600 text-white shadow-lg shadow-primary-600/30 border border-primary-400/40"
                : "bg-surface-900/80 text-surface-300 hover:text-white border border-white/5 hover:border-white/20"
            }`}
          >
            {data.projects.filterMobile} (1)
          </button>
          <button
            onClick={() => setActiveFilter("web")}
            className={`px-5 py-2 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer ${
              activeFilter === "web"
                ? "bg-primary-600 text-white shadow-lg shadow-primary-600/30 border border-primary-400/40"
                : "bg-surface-900/80 text-surface-300 hover:text-white border border-white/5 hover:border-white/20"
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
              gradient: "from-primary-500/20 to-indigo-500/20",
              categoryTag: "Full-Stack Project",
            };

            return (
              <AnimateOnScroll
                key={project.id}
                animation="animate-scale-in"
                delay={index % 2 === 0 ? "delay-100" : "delay-200"}
              >
                <TiltCard tiltIntensity={5} className="h-full">
                  <div className="h-full flex flex-col rounded-3xl bg-surface-900/70 border border-white/10 hover:border-primary-500/40 transition-all duration-300 overflow-hidden group shadow-xl">
                    {/* Visual Card Banner */}
                    <div className="relative w-full h-52 sm:h-60 overflow-hidden bg-surface-950">
                      <Image
                        src={meta.image}
                        alt={project.title}
                        fill
                        className="object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-surface-900 via-surface-950/40 to-transparent" />

                      {/* Top Floating Badges */}
                      <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2">
                        <span className="px-3 py-1 rounded-full bg-surface-950/80 backdrop-blur-md border border-white/10 text-[10px] font-bold text-white tracking-wide uppercase">
                          {meta.categoryTag}
                        </span>
                        <div className="flex items-center gap-1.5">
                          {(project.liveUrl || meta.liveUrl) && (
                            <a
                              href={project.liveUrl || meta.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/30 hover:bg-emerald-500/50 border border-emerald-400/50 text-[10px] font-bold text-emerald-200 backdrop-blur-md transition-all hover:scale-105 shadow-md shadow-emerald-950/60 z-10"
                              title="Buka Live Preview Website"
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse" />
                              <span>Live Demo ↗</span>
                            </a>
                          )}
                          <span className="px-3 py-1 rounded-full bg-accent-500/20 backdrop-blur-md border border-accent-400/30 text-[10px] font-semibold text-accent-300">
                            {project.impactBadge}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                      <div>
                        {/* Header Title & Period */}
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <h3 className="text-xl font-bold text-white group-hover:text-primary-300 transition-colors">
                            {project.title}
                          </h3>
                          <span className="text-xs font-mono text-surface-400 flex-shrink-0">
                            {project.period}
                          </span>
                        </div>

                        <p className="text-primary-400/90 text-xs font-medium mb-3">
                          {project.subtitle}
                        </p>

                        <p className="text-surface-300/80 text-sm leading-relaxed mb-5">
                          {project.description}
                        </p>

                        {/* Bullet Highlights */}
                        <div className="space-y-2 mb-6">
                          {project.highlights.map((highlight, hIndex) => (
                            <div key={hIndex} className="flex items-start gap-2.5">
                              <svg
                                className="w-4 h-4 mt-0.5 text-accent-400 flex-shrink-0"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                              <span className="text-xs sm:text-sm text-surface-300">
                                {highlight}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Card Footer: Tech Stack + Case Study Trigger */}
                      <div>
                        <div className="flex flex-wrap gap-1.5 pt-4 border-t border-white/10 mb-5">
                          {meta.techStack.map((tech) => (
                            <span
                              key={tech}
                              className="px-2.5 py-1 text-[11px] font-mono font-medium rounded-lg bg-white/5 text-surface-300 border border-white/5"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>

                        {/* Interactive Buttons: Live Preview + Case Study */}
                        <div className="flex items-center gap-2">
                          {(project.liveUrl || meta.liveUrl) && (
                            <a
                              href={project.liveUrl || meta.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex-1 py-3 px-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white border border-emerald-400/30 text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-lg shadow-emerald-950/40 hover:shadow-emerald-600/30 cursor-pointer"
                            >
                              <span>🌐</span>
                              <span>Live Preview</span>
                              <svg className="w-3.5 h-3.5 text-white/90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                              </svg>
                            </a>
                          )}
                          <button
                            onClick={() => setSelectedProject(project)}
                            className={`${
                              project.liveUrl || meta.liveUrl ? "flex-1" : "w-full"
                            } py-3 px-4 rounded-xl bg-surface-800/80 hover:bg-primary-600/30 text-white border border-white/10 hover:border-primary-500/40 text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer group-hover:border-primary-500/50`}
                          >
                            <span>{data.projects.viewCaseStudy}</span>
                            <svg className="w-4 h-4 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </TiltCard>
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

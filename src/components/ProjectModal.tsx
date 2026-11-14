"use client";

import { useEffect } from "react";
import Image from "next/image";
import { ProjectItem } from "@/context/translations";
import { useLanguage } from "@/context/LanguageContext";

interface ProjectModalProps {
  project: ProjectItem | null;
  imageSrc?: string;
  onClose: () => void;
}

export default function ProjectModal({ project, imageSrc, onClose }: ProjectModalProps) {
  const { data, language } = useLanguage();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    if (project) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-surface-950/85 backdrop-blur-md transition-opacity animate-fade-in"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-3xl bg-surface-900 border border-white/15 rounded-3xl shadow-2xl shadow-black/60 overflow-hidden z-10 my-8 animate-scale-in">
        {/* Header Visual Banner */}
        {imageSrc && (
          <div className="relative w-full h-52 sm:h-64 bg-surface-950 overflow-hidden border-b border-white/10">
            <Image
              src={imageSrc}
              alt={project.title}
              fill
              className="object-cover object-top"
              sizes="(max-width: 768px) 100vw, 800px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-surface-900 via-surface-900/60 to-transparent" />

            {/* Top Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-surface-950/80 hover:bg-surface-800 border border-white/20 text-white flex items-center justify-center transition-all cursor-pointer shadow-lg"
              aria-label="Close case study"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Title & Badges Over Image */}
            <div className="absolute bottom-4 left-6 right-6">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="px-3 py-1 rounded-full bg-primary-600/80 border border-primary-400/40 text-[11px] font-bold text-white tracking-wide uppercase">
                  {project.category === "mobile" ? "Mobile App" : "Web Platform"}
                </span>
                <span className="px-3 py-1 rounded-full bg-accent-500/20 border border-accent-400/30 text-[11px] font-semibold text-accent-300">
                  {project.status}
                </span>
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/30 hover:bg-emerald-500/50 border border-emerald-400/50 text-[11px] font-bold text-emerald-200 transition-all hover:scale-105 shadow-md shadow-emerald-950/60"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse" />
                    <span>Live Website ↗</span>
                  </a>
                )}
                <span className="text-xs text-surface-300 font-mono">
                  {project.period}
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                {project.title}
              </h3>
              <p className="text-primary-300 text-sm font-medium">
                {project.subtitle}
              </p>
            </div>
          </div>
        )}

        {/* Modal Body Content */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[calc(85vh-16rem)] overflow-y-auto">
          {/* Key Metrics Strip */}
          {project.caseStudy.metrics && project.caseStudy.metrics.length > 0 && (
            <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-surface-950/60 border border-white/10">
              {project.caseStudy.metrics.map((m, idx) => (
                <div key={idx} className="text-center">
                  <div className="text-base sm:text-lg font-bold text-accent-400">{m.value}</div>
                  <div className="text-[11px] text-surface-400 uppercase tracking-wider">{m.label}</div>
                </div>
              ))}
            </div>
          )}

          {/* Section: Challenge & Role */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-primary-400 mb-2 flex items-center gap-2">
                <svg className="w-4 h-4 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                {data.projects.challengeTitle}
              </h4>
              <p className="text-sm text-surface-300 leading-relaxed">
                {project.caseStudy.challenge}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-accent-400 mb-2 flex items-center gap-2">
                <svg className="w-4 h-4 text-accent-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                {data.projects.roleTitle}
              </h4>
              <p className="text-sm text-surface-300 leading-relaxed font-medium">
                {project.caseStudy.role}
              </p>
            </div>
          </div>

          {/* Section: Architectural Decisions */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-surface-300 mb-3 flex items-center gap-2">
              <svg className="w-4 h-4 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              {data.projects.architectureTitle}
            </h4>
            <div className="space-y-2.5">
              {project.caseStudy.architecture.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-surface-950/40 border border-white/5">
                  <span className="w-5 h-5 rounded-md bg-primary-500/20 text-primary-300 flex items-center justify-center text-xs font-mono font-bold mt-0.5 flex-shrink-0">
                    {idx + 1}
                  </span>
                  <span className="text-sm text-surface-200/90 leading-relaxed">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Section: Results & Impact */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-surface-300 mb-3 flex items-center gap-2">
              <svg className="w-4 h-4 text-accent-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {data.projects.resultsTitle}
            </h4>
            <div className="space-y-2">
              {project.caseStudy.results.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-sm text-surface-300">
                  <svg className="w-4 h-4 text-accent-400 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-6 bg-surface-950/80 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl border border-white/10 hover:border-white/20 text-surface-300 hover:text-white text-xs font-semibold transition-all cursor-pointer"
          >
            {data.projects.closeModal}
          </button>

          <div className="flex items-center gap-3">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold shadow-lg shadow-emerald-600/30 transition-all hover:-translate-y-0.5"
              >
                <span>🌐</span>
                <span>{language === "id" ? "Buka Website Langsung" : "Open Live Website"}</span>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            )}

            <a
              href="#contact"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-primary-600 to-indigo-600 hover:from-primary-500 hover:to-indigo-500 text-white text-xs font-semibold shadow-lg shadow-primary-600/25 transition-all"
            >
              {data.hero.contactMe}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

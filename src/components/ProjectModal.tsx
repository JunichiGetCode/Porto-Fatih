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
  const { data } = useLanguage();

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
      {/* Brutalist Backdrop */}
      <div
        className="fixed inset-0 bg-black/85 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-3xl bg-[#171720] border-4 border-black shadow-[12px_12px_0px_#000] overflow-hidden z-10 my-8 animate-scale-in text-white">
        {/* Header Visual Banner */}
        {imageSrc && (
          <div className="relative w-full h-52 sm:h-64 bg-black overflow-hidden border-b-3 border-black">
            <Image
              src={imageSrc}
              alt={project.title}
              fill
              className="object-cover object-top"
              sizes="(max-width: 768px) 100vw, 800px"
            />

            {/* Top Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-9 h-9 bg-[#FF3366] hover:bg-[#FF1A53] text-white border-2 border-black shadow-[3px_3px_0px_#000] flex items-center justify-center font-mono font-black text-sm cursor-pointer active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
              aria-label="Close modal"
            >
              ✕
            </button>

            {/* Category Tape */}
            <div className="absolute bottom-3 left-4">
              <span className="px-3 py-1 bg-[#FFE600] text-black border-2 border-black font-mono text-xs font-black uppercase shadow-[3px_3px_0px_#000]">
                {project.impactBadge}
              </span>
            </div>
          </div>
        )}

        {/* Modal Body */}
        <div className="p-6 sm:p-8 max-h-[65vh] overflow-y-auto">
          {/* Header */}
          <div className="flex items-start justify-between gap-4 mb-2">
            <div>
              <h2 className="text-2xl sm:text-3xl font-black font-sans uppercase text-white">
                {project.title}
              </h2>
              <p className="text-xs font-mono font-bold text-[#00F08B] uppercase mt-1">
                {"//"} {project.subtitle}
              </p>
            </div>
            <span className="px-2.5 py-1 bg-black text-[#00D2FF] border border-black font-mono text-xs font-bold">
              {project.period}
            </span>
          </div>

          <p className="text-zinc-300 text-sm sm:text-base leading-relaxed mt-4 mb-6">
            {project.description}
          </p>

          {/* Highlights */}
          <div className="mb-6 p-4 bg-[#0D0D12] border-2 border-black shadow-[4px_4px_0px_#000]">
            <h4 className="text-xs font-mono font-black uppercase text-[#FFE600] tracking-wider mb-3">
              [KEY ARCHITECTURE HIGHLIGHTS]
            </h4>
            <div className="space-y-2">
              {project.highlights.map((h, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <span className="w-4 h-4 bg-[#FFE600] text-black border border-black flex items-center justify-center text-[10px] font-black flex-shrink-0 mt-0.5">
                    ✓
                  </span>
                  <span className="text-xs sm:text-sm text-zinc-200">{h}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Case Study Detailed Breakdown */}
          {project.caseStudy && (
            <div className="space-y-4">
              <div className="p-4 bg-[#0D0D12] border-2 border-black shadow-[4px_4px_0px_#000]">
                <h4 className="text-xs font-mono font-black uppercase text-[#FF3366] tracking-wider mb-2">
                  [CHALLENGE & PROBLEM]
                </h4>
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans">
                  {project.caseStudy.challenge}
                </p>
                <div className="mt-3 pt-2 border-t border-black/40 flex items-center gap-2">
                  <span className="text-[11px] font-mono text-zinc-400">ROLE:</span>
                  <span className="text-xs font-mono font-bold text-[#FFE600]">{project.caseStudy.role}</span>
                </div>
              </div>

              <div className="p-4 bg-[#0D0D12] border-2 border-black shadow-[4px_4px_0px_#000]">
                <h4 className="text-xs font-mono font-black uppercase text-[#00D2FF] tracking-wider mb-3">
                  [ARCHITECTURE & ENGINEERING DECISIONS]
                </h4>
                <div className="space-y-2">
                  {project.caseStudy.architecture.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <span className="text-xs font-mono text-[#00D2FF] font-black mt-0.5">▸</span>
                      <span className="text-xs sm:text-sm text-zinc-300 font-sans">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 bg-[#0D0D12] border-2 border-black shadow-[4px_4px_0px_#000]">
                <h4 className="text-xs font-mono font-black uppercase text-[#00F08B] tracking-wider mb-3">
                  [MEASURED RESULTS & IMPACT]
                </h4>
                <div className="space-y-2">
                  {project.caseStudy.results.map((res, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <span className="text-xs font-mono text-[#00F08B] font-black mt-0.5">✓</span>
                      <span className="text-xs sm:text-sm text-zinc-300 font-sans">{res}</span>
                    </div>
                  ))}
                </div>
              </div>

              {project.caseStudy.metrics && project.caseStudy.metrics.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {project.caseStudy.metrics.map((m, idx) => (
                    <div key={idx} className="p-3 bg-[#0D0D12] border-2 border-black shadow-[3px_3px_0px_#000] text-center">
                      <div className="text-lg sm:text-xl font-mono font-black text-[#FFE600]">{m.value}</div>
                      <div className="text-[10px] font-mono font-bold text-zinc-400 uppercase">{m.label}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Action Row */}
          <div className="mt-8 pt-4 border-t-2 border-black flex items-center justify-end gap-3">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="neo-btn px-4 py-2.5 bg-[#00F08B] text-black text-xs hover:bg-[#34FF9E]"
              >
                <span>OPEN LIVE DEMO ↗</span>
              </a>
            )}
            <button
              onClick={onClose}
              className="neo-btn px-4 py-2.5 bg-[#FFE600] text-black text-xs hover:bg-[#FFF066]"
            >
              <span>{data.projects.closeModal}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

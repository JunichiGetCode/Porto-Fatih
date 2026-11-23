"use client";

import React, { useEffect } from "react";
import { SectionType } from "./RoomCanvas";
import AboutSection from "@/components/AboutSection";
import ProjectsSection from "@/components/ProjectsSection";
import SkillsSection from "@/components/SkillsSection";
import ContactSection from "@/components/ContactSection";

interface RoomModalViewProps {
  section: SectionType;
  onClose: () => void;
  onSwitchSection: (section: SectionType) => void;
  language: "id" | "en";
  onToggleLanguage: () => void;
}

export default function RoomModalView({
  section,
  onClose,
  onSwitchSection,
  language,
  onToggleLanguage,
}: RoomModalViewProps) {
  // Listen for Escape key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!section || section === "light") return null;

  const sectionHeaders: Record<
    "projects" | "about" | "skills" | "contact",
    { breadcrumb: string; title: string; icon: string }
  > = {
    projects: {
      breadcrumb:
        language === "id"
          ? "RUANGAN 3D > MEJA WORKSTATION > PROYEK"
          : "3D ROOM > WORKSTATION > PROJECTS",
      title: language === "id" ? "Proyek & Hasil Karya" : "Featured Projects",
      icon: "💻",
    },
    about: {
      breadcrumb:
        language === "id"
          ? "RUANGAN 3D > LOUNGE AREA > TENTANG SAYA"
          : "3D ROOM > LOUNGE AREA > ABOUT ME",
      title: language === "id" ? "Profil & Perjalanan" : "Profile & Journey",
      icon: "🛏️",
    },
    skills: {
      breadcrumb:
        language === "id"
          ? "RUANGAN 3D > RAK & WHITEBOARD > TECH STACK"
          : "3D ROOM > BOOKSHELF & BOARD > TECH STACK",
      title: language === "id" ? "Keahlian & Teknologi" : "Skills & Architecture",
      icon: "📚",
    },
    contact: {
      breadcrumb:
        language === "id"
          ? "RUANGAN 3D > PINTU & SMARTPHONE > KONTAK"
          : "3D ROOM > GATEWAY & PHONE > CONTACT",
      title: language === "id" ? "Hubungi Saya & Kolaborasi" : "Contact & Connect",
      icon: "🚪",
    },
  };

  const currentHeader = sectionHeaders[section];

  return (
    <div className="fixed inset-0 z-40 flex flex-col bg-[#0D0D12]/95 backdrop-blur-md text-white animate-fade-in overflow-hidden">
      {/* STICKY TOP MODAL BAR */}
      <header className="sticky top-0 z-50 flex items-center justify-between px-4 sm:px-8 py-3 bg-[#171720] border-b-3 border-black shadow-[0px_4px_0px_#000]">
        {/* Left: Back button with smooth room transition */}
        <button
          onClick={onClose}
          className="neo-btn px-4 py-2 bg-[#FFE600] text-black text-xs hover:bg-[#FFF066]"
        >
          <span>←</span>
          <span>
            {language === "id" ? "KEMBALI KE RUANGAN" : "BACK TO ROOM"}
          </span>
          <span className="hidden sm:inline text-[10px] font-mono opacity-80">
            [ESC]
          </span>
        </button>

        {/* Center: Breadcrumb indicator */}
        <div className="hidden md:flex items-center gap-2 text-xs font-mono font-bold text-zinc-300">
          <span className="text-base">{currentHeader.icon}</span>
          <span>{currentHeader.breadcrumb}</span>
        </div>

        {/* Right: Quick Tab Switcher */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => onSwitchSection("about")}
            title="Tentang Saya"
            className={`neo-btn px-3 py-1.5 text-xs border-2 border-black ${
              section === "about"
                ? "bg-[#FFE600] text-black shadow-[2px_2px_0px_#000]"
                : "bg-[#0D0D12] text-zinc-300 hover:text-white"
            }`}
          >
            🛏️ <span className="hidden sm:inline">BIO</span>
          </button>
          <button
            onClick={() => onSwitchSection("projects")}
            title="Proyek"
            className={`neo-btn px-3 py-1.5 text-xs border-2 border-black ${
              section === "projects"
                ? "bg-[#FFE600] text-black shadow-[2px_2px_0px_#000]"
                : "bg-[#0D0D12] text-zinc-300 hover:text-white"
            }`}
          >
            💻 <span className="hidden sm:inline">PROYEK</span>
          </button>
          <button
            onClick={() => onSwitchSection("skills")}
            title="Keahlian"
            className={`neo-btn px-3 py-1.5 text-xs border-2 border-black ${
              section === "skills"
                ? "bg-[#FFE600] text-black shadow-[2px_2px_0px_#000]"
                : "bg-[#0D0D12] text-zinc-300 hover:text-white"
            }`}
          >
            📚 <span className="hidden sm:inline">STACK</span>
          </button>
          <button
            onClick={() => onSwitchSection("contact")}
            title="Kontak"
            className={`neo-btn px-3 py-1.5 text-xs border-2 border-black ${
              section === "contact"
                ? "bg-[#FFE600] text-black shadow-[2px_2px_0px_#000]"
                : "bg-[#0D0D12] text-zinc-300 hover:text-white"
            }`}
          >
            🚪 <span className="hidden sm:inline">KONTAK</span>
          </button>

          {/* Language Switcher */}
          <div className="ml-1 sm:ml-2 flex items-center bg-[#0D0D12] border-2 border-black p-0.5 shadow-[2px_2px_0px_#000]">
            <button
              onClick={() => language !== "id" && onToggleLanguage()}
              className={`px-2 py-0.5 text-xs font-mono font-black transition-all cursor-pointer ${
                language === "id"
                  ? "bg-[#00D2FF] text-black border border-black"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              ID
            </button>
            <button
              onClick={() => language !== "en" && onToggleLanguage()}
              className={`px-2 py-0.5 text-xs font-mono font-black transition-all cursor-pointer ${
                language === "en"
                  ? "bg-[#00D2FF] text-black border border-black"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              EN
            </button>
          </div>
        </div>
      </header>

      {/* MODAL CONTENT CONTAINER */}
      <div className="flex-1 overflow-y-auto px-2 sm:px-6 py-6 pb-24 neo-grid-dark-bg">
        <div className="max-w-7xl mx-auto">
          {section === "projects" && <ProjectsSection />}
          {section === "about" && <AboutSection />}
          {section === "skills" && <SkillsSection />}
          {section === "contact" && <ContactSection />}
        </div>
      </div>
    </div>
  );
}

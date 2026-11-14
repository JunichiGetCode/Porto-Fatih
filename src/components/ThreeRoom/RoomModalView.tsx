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
          ? "Ruangan 3D > Meja Kerja & PC > Portofolio Proyek"
          : "3D Room > Developer Workstation > Projects",
      title: language === "id" ? "Proyek & Hasil Karya" : "Featured Projects",
      icon: "💻",
    },
    about: {
      breadcrumb:
        language === "id"
          ? "Ruangan 3D > Area Kasur & Lounge > Tentang Saya"
          : "3D Room > Lounge Area > About Me",
      title: language === "id" ? "Profil & Perjalanan" : "Profile & Journey",
      icon: "🛏️",
    },
    skills: {
      breadcrumb:
        language === "id"
          ? "Ruangan 3D > Rak Buku & Whiteboard > Tech Stack"
          : "3D Room > Bookshelf & Whiteboard > Tech Stack",
      title: language === "id" ? "Keahlian & Teknologi" : "Skills & Architecture",
      icon: "📚",
    },
    contact: {
      breadcrumb:
        language === "id"
          ? "Ruangan 3D > Pintu Kamar & HP > Hub Komunikasi"
          : "3D Room > Gateway & Phone > Contact",
      title: language === "id" ? "Hubungi Saya & Kolaborasi" : "Contact & Connect",
      icon: "🚪",
    },
  };

  const currentHeader = sectionHeaders[section];

  return (
    <div className="fixed inset-0 z-40 flex flex-col bg-surface-950/90 backdrop-blur-2xl text-white animate-fade-in overflow-hidden">
      {/* STICKY TOP MODAL BAR */}
      <header className="sticky top-0 z-50 flex items-center justify-between px-4 sm:px-8 py-3.5 bg-surface-900/90 backdrop-blur-xl border-b border-white/10 shadow-xl">
        {/* Left: Back button with smooth room transition */}
        <button
          onClick={onClose}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary-600/20 hover:bg-primary-600/40 border border-primary-500/30 text-primary-300 hover:text-white font-semibold text-xs sm:text-sm transition-all duration-200 cursor-pointer shadow-md"
        >
          <span>←</span>
          <span>
            {language === "id" ? "Kembali ke Ruangan" : "Back to Room"}
          </span>
          <span className="hidden sm:inline text-[11px] text-surface-400 font-mono">
            (Esc)
          </span>
        </button>

        {/* Center: Breadcrumb indicator */}
        <div className="hidden md:flex items-center gap-2 text-xs font-mono text-surface-300">
          <span className="text-base">{currentHeader.icon}</span>
          <span>{currentHeader.breadcrumb}</span>
        </div>

        {/* Right: Quick Tab Switcher */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => onSwitchSection("about")}
            title="Tentang Saya"
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              section === "about"
                ? "bg-primary-500 text-white"
                : "bg-surface-800 text-surface-400 hover:text-white"
            }`}
          >
            🛏️ <span className="hidden sm:inline">Bio</span>
          </button>
          <button
            onClick={() => onSwitchSection("projects")}
            title="Proyek"
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              section === "projects"
                ? "bg-primary-500 text-white"
                : "bg-surface-800 text-surface-400 hover:text-white"
            }`}
          >
            💻 <span className="hidden sm:inline">Proyek</span>
          </button>
          <button
            onClick={() => onSwitchSection("skills")}
            title="Keahlian"
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              section === "skills"
                ? "bg-primary-500 text-white"
                : "bg-surface-800 text-surface-400 hover:text-white"
            }`}
          >
            📚 <span className="hidden sm:inline">Stack</span>
          </button>
          <button
            onClick={() => onSwitchSection("contact")}
            title="Kontak"
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              section === "contact"
                ? "bg-primary-500 text-white"
                : "bg-surface-800 text-surface-400 hover:text-white"
            }`}
          >
            🚪 <span className="hidden sm:inline">Kontak</span>
          </button>

          {/* Prominent Language Switcher in Modal View */}
          <div
            className="ml-1 sm:ml-2 flex items-center p-1 rounded-xl bg-surface-900 border border-white/10"
            role="group"
            aria-label="Language Switcher"
          >
            <button
              onClick={() => language !== "id" && onToggleLanguage()}
              className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                language === "id"
                  ? "bg-primary-600 text-white shadow-md shadow-primary-600/40"
                  : "text-surface-400 hover:text-white"
              }`}
              title="Gunakan Bahasa Indonesia"
            >
              <span>🇮🇩</span>
              <span>ID</span>
            </button>
            <button
              onClick={() => language !== "en" && onToggleLanguage()}
              className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                language === "en"
                  ? "bg-primary-600 text-white shadow-md shadow-primary-600/40"
                  : "text-surface-400 hover:text-white"
              }`}
              title="Switch to English"
            >
              <span>🇬🇧</span>
              <span>EN</span>
            </button>
          </div>
        </div>
      </header>

      {/* MODAL CONTENT CONTAINER */}
      <div className="flex-1 overflow-y-auto px-2 sm:px-6 py-6 pb-24">
        <div className="max-w-6xl mx-auto">
          {section === "projects" && <ProjectsSection />}
          {section === "about" && <AboutSection />}
          {section === "skills" && <SkillsSection />}
          {section === "contact" && <ContactSection />}
        </div>
      </div>
    </div>
  );
}

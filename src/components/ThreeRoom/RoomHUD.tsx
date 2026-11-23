"use client";

import React from "react";
import Image from "next/image";
import { SectionType } from "./RoomCanvas";

interface RoomHUDProps {
  activeSection: SectionType;
  onSelectSection: (section: SectionType) => void;
  onResetCamera: () => void;
  onToggleClassicMode: () => void;
  language: "id" | "en";
  onToggleLanguage: () => void;
  timeOfDay: "day" | "night";
  onToggleTimeOfDay: () => void;
  isLightOn: boolean;
  onToggleLight: () => void;
  onOpenGuide: () => void;
}

export default function RoomHUD({
  activeSection,
  onSelectSection,
  onResetCamera,
  onToggleClassicMode,
  language,
  onToggleLanguage,
  timeOfDay,
  onToggleTimeOfDay,
  isLightOn,
  onToggleLight,
  onOpenGuide,
}: RoomHUDProps) {
  const [isHintDismissed, setIsHintDismissed] = React.useState(false);
  const navItems: { key: SectionType; idLabel: string; enLabel: string; icon: string }[] = [
    { key: null, idLabel: "Ruangan", enLabel: "Overview", icon: "🏠" },
    { key: "about", idLabel: "Tentang Saya", enLabel: "About Me", icon: "🛏️" },
    { key: "projects", idLabel: "Proyek & Portofolio", enLabel: "Projects", icon: "💻" },
    { key: "skills", idLabel: "Stack & Skill", enLabel: "Tech Stack", icon: "📚" },
    { key: "contact", idLabel: "Kontak", enLabel: "Contact", icon: "🚪" },
  ];

  return (
    <div className="pointer-events-none fixed inset-0 z-30 flex flex-col justify-between p-3 sm:p-6">
      {/* TOP HEADER BAR */}
      <header className="pointer-events-auto flex flex-wrap items-center justify-between gap-3 w-full max-w-7xl mx-auto">
        {/* Profile Identity Pill */}
        <div className="flex items-center gap-3 px-3.5 py-2 rounded-2xl bg-surface-950/80 backdrop-blur-xl border border-white/10 shadow-2xl">
          <div className="relative w-9 h-9 rounded-xl overflow-hidden border border-cyan-500/40 ring-2 ring-cyan-500/20 bg-surface-950">
            <Image
              src="/logo-mark.svg"
              alt="Fatih.dev Logo"
              fill
              sizes="36px"
              className="object-contain p-0.5"
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs sm:text-sm font-bold text-white leading-tight">
                Muhammad Fatih Rahman
              </span>
              <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] text-emerald-400 font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                POV Room v2.0
              </span>
            </div>
            <p className="text-[11px] text-surface-400 font-medium">
              Full-Stack & Mobile Developer
            </p>
          </div>
        </div>

        {/* Right Action Controls */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
          {/* Day / Night Toggle (Sun vs Moon) */}
          <button
            onClick={onToggleTimeOfDay}
            title={
              language === "id"
                ? `Waktu: ${timeOfDay === "day" ? "Siang" : "Malam"} (Klik untuk ganti)`
                : `Time: ${timeOfDay === "day" ? "Day" : "Night"} (Click to toggle)`
            }
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl backdrop-blur-xl border text-xs font-semibold transition-all duration-200 shadow-xl cursor-pointer ${
              timeOfDay === "day"
                ? "bg-amber-500/20 hover:bg-amber-500/30 border-amber-400/40 text-amber-300"
                : "bg-indigo-950/80 hover:bg-indigo-900 border-indigo-400/30 text-indigo-300"
            }`}
          >
            <span>{timeOfDay === "day" ? "☀️" : "🌙"}</span>
            <span className="hidden md:inline">
              {timeOfDay === "day"
                ? language === "id" ? "Siang" : "Day"
                : language === "id" ? "Malam" : "Night"}
            </span>
          </button>

          {/* Room Lights Toggle (ON / OFF) */}
          <button
            onClick={onToggleLight}
            title={
              language === "id"
                ? `Lampu Ruangan: ${isLightOn ? "NYALA" : "MATI"} (Klik sakelar)`
                : `Room Lights: ${isLightOn ? "ON" : "OFF"} (Click switch)`
            }
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl backdrop-blur-xl border text-xs font-semibold transition-all duration-200 shadow-xl cursor-pointer ${
              isLightOn
                ? "bg-yellow-500/20 hover:bg-yellow-500/30 border-yellow-400/50 text-yellow-300"
                : "bg-surface-950/80 hover:bg-surface-900 border-white/10 text-surface-400"
            }`}
          >
            <span>💡</span>
            <span className="hidden md:inline">
              {isLightOn
                ? language === "id" ? "Lampu Nyala" : "Lights On"
                : language === "id" ? "Lampu Mati" : "Lights Off"}
            </span>
          </button>

          {/* Reset Camera / POV View */}
          <button
            onClick={onResetCamera}
            title={language === "id" ? "Reset Sudut Pandangan" : "Reset POV Angle"}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-surface-950/80 hover:bg-surface-900 backdrop-blur-xl border border-white/10 text-xs font-semibold text-surface-300 hover:text-white transition-all duration-200 shadow-xl cursor-pointer"
          >
            <span className="text-sm">🔄</span>
            <span className="hidden lg:inline">
              {language === "id" ? "Reset POV" : "Reset View"}
            </span>
          </button>

          {/* Switch to Classic Scroll Mode */}
          <button
            onClick={onToggleClassicMode}
            title={
              language === "id"
                ? "Beralih ke mode tampilan gulir standar"
                : "Switch to standard scroll view"
            }
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-surface-950/80 hover:bg-surface-900 backdrop-blur-xl border border-white/10 text-xs font-semibold text-surface-300 hover:text-white transition-all duration-200 shadow-xl cursor-pointer"
          >
            <span className="text-sm">📜</span>
            <span className="hidden lg:inline">
              {language === "id" ? "Scroll Klasik" : "Classic Mode"}
            </span>
          </button>

          {/* Interactive 3D Room Guide Button */}
          <button
            onClick={onOpenGuide}
            title={
              language === "id"
                ? "Penjelasan fitur: Apa saja yang bisa dilakukan di 3D Room?"
                : "Feature Guide: What can you do in this 3D Room?"
            }
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-gradient-to-r from-primary-600/30 to-indigo-600/30 hover:from-primary-600/50 hover:to-indigo-600/50 backdrop-blur-xl border border-primary-400/40 text-xs font-bold text-white transition-all duration-200 shadow-xl shadow-primary-500/20 cursor-pointer"
          >
            <span className="text-sm">❓</span>
            <span className="hidden sm:inline">
              {language === "id" ? "Panduan Ruangan" : "Room Guide"}
            </span>
          </button>

          {/* Prominent Dual Segmented Language Switcher */}
          <div
            className="flex items-center p-1 rounded-xl bg-surface-950/90 backdrop-blur-xl border border-white/15 shadow-xl"
            role="group"
            aria-label="Language Switcher"
          >
            <button
              onClick={() => language !== "id" && onToggleLanguage()}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-extrabold transition-all cursor-pointer ${
                language === "id"
                  ? "bg-primary-600 text-white shadow-md shadow-primary-600/50"
                  : "text-surface-400 hover:text-white"
              }`}
              title="Gunakan Bahasa Indonesia"
            >
              <span>🇮🇩</span>
              <span>ID</span>
            </button>
            <button
              onClick={() => language !== "en" && onToggleLanguage()}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-extrabold transition-all cursor-pointer ${
                language === "en"
                  ? "bg-primary-600 text-white shadow-md shadow-primary-600/50"
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

      {/* FLOATING QUICK HINT HELPER (BOTTOM-LEFT) */}
      {!isHintDismissed && (
        <div className="pointer-events-auto hidden md:flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-surface-950/85 backdrop-blur-xl border border-white/10 shadow-2xl max-w-lg animate-fade-in self-start ml-2 mb-2">
          <span className="text-xl">🎮</span>
          <div className="text-xs">
            <p className="font-bold text-white leading-tight">
              {language === "id" ? "Eksplorasi Ruangan 3D" : "Explore 3D Room"}
            </p>
            <p className="text-[11px] text-surface-400">
              {language === "id"
                ? "Gunakan tombol [W][A][S][D] untuk jalan & klik objek (PC, Kasur, Rak) untuk membuka konten."
                : "Use [W][A][S][D] keys to walk & click objects (PC, Bed, Shelves) to open content."}
            </p>
          </div>
          <button
            onClick={onOpenGuide}
            className="px-2.5 py-1 rounded-lg bg-primary-600/30 hover:bg-primary-600 text-[11px] font-bold text-primary-300 hover:text-white border border-primary-500/30 transition-all whitespace-nowrap cursor-pointer ml-1"
          >
            {language === "id" ? "Panduan" : "Guide"}
          </button>
          <button
            onClick={() => setIsHintDismissed(true)}
            className="text-surface-500 hover:text-surface-300 text-xs p-1"
            title={language === "id" ? "Sembunyikan tips" : "Dismiss tips"}
          >
            ✕
          </button>
        </div>
      )}

      {/* BOTTOM NAVIGATION DOCK */}
      <footer className="pointer-events-auto w-full max-w-xl mx-auto mb-2 sm:mb-4">
        <nav
          className="flex items-center justify-between gap-1 sm:gap-2 p-1.5 sm:p-2 rounded-3xl bg-surface-950/85 backdrop-blur-2xl border border-white/15 shadow-2xl shadow-black/80"
          aria-label="3D Room Navigation"
        >
          {navItems.map((item) => {
            const isActive = activeSection === item.key;
            return (
              <button
                key={item.key ?? "overview"}
                onClick={() => onSelectSection(item.key)}
                className={`relative flex-1 flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 py-2 px-2 sm:px-3 rounded-2xl text-xs font-semibold transition-all duration-300 cursor-pointer ${
                  isActive
                    ? "bg-gradient-to-r from-primary-600 to-indigo-600 text-white shadow-lg shadow-primary-500/30 scale-102"
                    : "text-surface-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <span className="text-lg sm:text-base">{item.icon}</span>
                <span className="text-[10px] sm:text-xs truncate">
                  {language === "id" ? item.idLabel : item.enLabel}
                </span>
                {isActive && (
                  <span className="absolute -bottom-1 w-1.5 h-1.5 rounded-full bg-primary-400 animate-pulse" />
                )}
              </button>
            );
          })}
        </nav>
      </footer>
    </div>
  );
}

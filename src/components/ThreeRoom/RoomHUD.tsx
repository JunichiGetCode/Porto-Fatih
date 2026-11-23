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
    { key: null, idLabel: "RUANGAN", enLabel: "OVERVIEW", icon: "🏠" },
    { key: "about", idLabel: "TENTANG", enLabel: "ABOUT", icon: "🛏️" },
    { key: "projects", idLabel: "PROYEK", enLabel: "PROJECTS", icon: "💻" },
    { key: "skills", idLabel: "STACK", enLabel: "STACK", icon: "📚" },
    { key: "contact", idLabel: "KONTAK", enLabel: "CONTACT", icon: "🚪" },
  ];

  return (
    <div className="pointer-events-none fixed inset-0 z-30 flex flex-col justify-between p-3 sm:p-5">
      {/* TOP HEADER BAR */}
      <header className="pointer-events-auto flex flex-wrap items-center justify-between gap-3 w-full max-w-7xl mx-auto">
        {/* Profile Identity Pill */}
        <div className="flex items-center gap-3 px-3 py-2 bg-[#171720] border-3 border-black shadow-[4px_4px_0px_#000]">
          <div className="w-9 h-9 bg-[#FFE600] border-2 border-black shadow-[2px_2px_0px_#000] flex items-center justify-center p-0.5 flex-shrink-0">
            <Image
              src="/logo-mark.svg"
              alt="Fatih.dev Logo"
              width={30}
              height={30}
              className="object-contain"
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs sm:text-sm font-mono font-black text-white uppercase tracking-tight">
                M. Fatih Rahman
              </span>
              <span className="hidden sm:inline-flex items-center px-1.5 py-0.5 bg-[#00F08B] text-black border border-black font-mono text-[9px] font-black uppercase">
                3D POV v2.0
              </span>
            </div>
            <p className="text-[10px] font-mono text-[#00D2FF] font-bold">
              FULL-STACK & MOBILE
            </p>
          </div>
        </div>

        {/* Right Action Controls */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Day / Night Toggle */}
          <button
            onClick={onToggleTimeOfDay}
            title={
              language === "id"
                ? `Waktu: ${timeOfDay === "day" ? "Siang" : "Malam"}`
                : `Time: ${timeOfDay === "day" ? "Day" : "Night"}`
            }
            className={`neo-btn px-3 py-2 text-xs border-2 border-black ${
              timeOfDay === "day"
                ? "bg-[#FFE600] text-black shadow-[3px_3px_0px_#000]"
                : "bg-[#171720] text-[#FFE600] shadow-[3px_3px_0px_#000]"
            }`}
          >
            <span>{timeOfDay === "day" ? "☀️" : "🌙"}</span>
            <span className="hidden md:inline font-mono font-black">
              {timeOfDay === "day"
                ? language === "id" ? "SIANG" : "DAY"
                : language === "id" ? "MALAM" : "NIGHT"}
            </span>
          </button>

          {/* Room Lights Toggle */}
          <button
            onClick={onToggleLight}
            title={
              language === "id"
                ? `Lampu: ${isLightOn ? "NYALA" : "MATI"}`
                : `Lights: ${isLightOn ? "ON" : "OFF"}`
            }
            className={`neo-btn px-3 py-2 text-xs border-2 border-black ${
              isLightOn
                ? "bg-[#FFE600] text-black shadow-[3px_3px_0px_#000]"
                : "bg-black text-zinc-400 shadow-[3px_3px_0px_#000]"
            }`}
          >
            <span>💡</span>
            <span className="hidden md:inline font-mono font-black">
              {isLightOn
                ? language === "id" ? "LAMPU: ON" : "LIGHTS: ON"
                : language === "id" ? "LAMPU: OFF" : "LIGHTS: OFF"}
            </span>
          </button>

          {/* Reset Camera / POV View */}
          <button
            onClick={onResetCamera}
            title={language === "id" ? "Reset Sudut Pandangan" : "Reset POV Angle"}
            className="neo-btn px-3 py-2 text-xs bg-white text-black border-2 border-black shadow-[3px_3px_0px_#000]"
          >
            <span>🔄</span>
            <span className="hidden lg:inline font-mono font-black">RESET POV</span>
          </button>

          {/* Switch to Classic Scroll Mode */}
          <button
            onClick={onToggleClassicMode}
            title={
              language === "id"
                ? "Beralih ke tampilan standar gulir"
                : "Switch to standard scroll view"
            }
            className="neo-btn px-3 py-2 text-xs bg-[#00D2FF] text-black border-2 border-black shadow-[3px_3px_0px_#000]"
          >
            <span>📜</span>
            <span className="hidden lg:inline font-mono font-black">
              {language === "id" ? "KLASIK" : "CLASSIC"}
            </span>
          </button>

          {/* Interactive 3D Room Guide Button */}
          <button
            onClick={onOpenGuide}
            title={language === "id" ? "Panduan Fitur Ruangan" : "Room Feature Guide"}
            className="neo-btn px-3 py-2 text-xs bg-[#FF3366] text-white border-2 border-black shadow-[3px_3px_0px_#000]"
          >
            <span>❓</span>
            <span className="hidden sm:inline font-mono font-black">
              {language === "id" ? "PANDUAN" : "GUIDE"}
            </span>
          </button>

          {/* Language Switcher */}
          <div className="flex items-center bg-[#171720] border-2 border-black shadow-[3px_3px_0px_#000] p-0.5">
            <button
              onClick={() => language !== "id" && onToggleLanguage()}
              className={`px-2 py-1 text-xs font-mono font-black transition-all cursor-pointer ${
                language === "id"
                  ? "bg-[#FFE600] text-black border border-black shadow-[1px_1px_0px_#000]"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              ID
            </button>
            <button
              onClick={() => language !== "en" && onToggleLanguage()}
              className={`px-2 py-1 text-xs font-mono font-black transition-all cursor-pointer ${
                language === "en"
                  ? "bg-[#FFE600] text-black border border-black shadow-[1px_1px_0px_#000]"
                : "text-zinc-400 hover:text-white"
              }`}
            >
              EN
            </button>
          </div>
        </div>
      </header>

      {/* FLOATING QUICK HINT HELPER (BOTTOM-LEFT) */}
      {!isHintDismissed && (
        <div className="pointer-events-auto hidden md:flex items-center gap-3 px-4 py-2.5 bg-[#171720] border-3 border-black shadow-[5px_5px_0px_#000] max-w-lg animate-fade-in self-start ml-2 mb-2 text-white">
          <span className="text-xl">🕹️</span>
          <div className="text-xs">
            <p className="font-mono font-black text-[#FFE600] uppercase">
              {language === "id" ? "KONTROL NAVIGASI 3D" : "3D NAVIGATION"}
            </p>
            <p className="text-[11px] font-mono text-zinc-300">
              {language === "id"
                ? "Gunakan tombol [W][A][S][D] untuk jalan & klik objek (PC, Kasur, Rak) untuk membuka konten."
                : "Use [W][A][S][D] keys to walk & click objects (PC, Bed, Shelves) to open content."}
            </p>
          </div>
          <button
            onClick={onOpenGuide}
            className="px-2 py-1 bg-[#FFE600] text-black font-mono font-black text-[10px] uppercase border border-black shadow-[2px_2px_0px_#000] cursor-pointer ml-1 whitespace-nowrap"
          >
            {language === "id" ? "INFO" : "HELP"}
          </button>
          <button
            onClick={() => setIsHintDismissed(true)}
            className="text-zinc-400 hover:text-white font-mono font-black text-xs p-1 ml-1 cursor-pointer"
            title="Dismiss"
          >
            ✕
          </button>
        </div>
      )}

      {/* BOTTOM NAVIGATION DOCK */}
      <footer className="pointer-events-auto w-full max-w-xl mx-auto mb-2 sm:mb-3">
        <nav
          className="flex items-center justify-between gap-1 sm:gap-2 p-1.5 bg-[#171720] border-3 border-black shadow-[8px_8px_0px_#000]"
          aria-label="3D Room Navigation"
        >
          {navItems.map((item) => {
            const isActive = activeSection === item.key;
            return (
              <button
                key={item.key ?? "overview"}
                onClick={() => onSelectSection(item.key)}
                className={`neo-btn flex-1 flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-1.5 py-2 px-2 text-xs border-2 border-black ${
                  isActive
                    ? "bg-[#FFE600] text-black shadow-[3px_3px_0px_#000] scale-102"
                    : "bg-[#0D0D12] text-zinc-300 hover:text-white hover:bg-black shadow-[2px_2px_0px_#000]"
                }`}
              >
                <span className="text-base sm:text-sm">{item.icon}</span>
                <span className="text-[10px] sm:text-xs font-mono font-black truncate">
                  {language === "id" ? item.idLabel : item.enLabel}
                </span>
              </button>
            );
          })}
        </nav>
      </footer>
    </div>
  );
}

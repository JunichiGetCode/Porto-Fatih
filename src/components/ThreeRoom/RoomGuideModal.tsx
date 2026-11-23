"use client";

import React, { useEffect } from "react";

interface RoomGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: "id" | "en";
  onToggleLanguage: () => void;
}

export default function RoomGuideModal({
  isOpen,
  onClose,
  language,
  onToggleLanguage,
}: RoomGuideModalProps) {
  // Listen for Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const isId = language === "id";

  const guideItems = [
    {
      icon: "🚶",
      title: isId ? "Jalan Keliling Kamar" : "Walk Around the Room",
      badge: isId ? "GERAK" : "MOVEMENT",
      badgeBg: "bg-[#00F08B]",
      desc: isId
        ? "Gunakan tombol keyboard [W] [A] [S] [D] atau tombol panah [↑] [←] [↓] [→] untuk berjalan mengelilingi kamar. Tahan [Shift] untuk sprint."
        : "Use [W] [A] [S] [D] or Arrow keys [↑] [←] [↓] [→] to walk around the room. Hold [Shift] to sprint.",
      keys: ["W", "A", "S", "D", "Shift"],
    },
    {
      icon: "👀",
      title: isId ? "Arahkan Sudut Pandang (POV)" : "First-Person Look (POV)",
      badge: isId ? "KAMERA" : "CAMERA",
      badgeBg: "bg-[#00D2FF]",
      desc: isId
        ? "Geser kursor mouse ke kanan, kiri, atas, atau bawah untuk menolehkan kepala. Anda juga bisa klik dan drag untuk memutar sudut pandangan 360°."
        : "Move your mouse cursor to look around naturally. You can also click and drag to freely rotate your field of view 360°.",
      keys: isId ? ["Gerak Mouse", "Klik & Drag"] : ["Move Mouse", "Click & Drag"],
    },
    {
      icon: "💻",
      title: isId ? "Meja Kerja & Workstation PC" : "Developer Desk & Dual PC",
      badge: isId ? "INTERAKTIF" : "INTERACTIVE",
      badgeBg: "bg-[#FFE600]",
      desc: isId
        ? "Klik monitor ganda atau meja kerja untuk zoom in dan membuka Portofolio Proyek (7 proyek nyata dengan studi kasus arsitektur & live demo)."
        : "Click the dual monitors or workstation desk to inspect Featured Projects (7 real production applications with case studies & architecture).",
      action: isId ? "Membuka: Portofolio Proyek" : "Opens: Featured Projects",
    },
    {
      icon: "🛏️",
      title: isId ? "Kasur & Area Santai" : "Bed & Personal Lounge",
      badge: isId ? "INTERAKTIF" : "INTERACTIVE",
      badgeBg: "bg-[#FFE600]",
      desc: isId
        ? "Klik kasur untuk membuka bagian Tentang Saya — berisi biografi lengkap Muhammad Fatih Rahman, 2+ tahun pengalaman, perjalanan & pendidikan."
        : "Click the bed to open About Me — covering biography, 2+ years of experience, education timeline, and development principles.",
      action: isId ? "Membuka: Tentang Saya" : "Opens: About Me & Bio",
    },
    {
      icon: "📚",
      title: isId ? "Rak Buku & Whiteboard" : "Bookshelf & Whiteboard",
      badge: isId ? "INTERAKTIF" : "INTERACTIVE",
      badgeBg: "bg-[#FFE600]",
      desc: isId
        ? "Klik rak buku atau papan tulis untuk melihat Keahlian & Tech Stack lengkap (Flutter, Next.js, Laravel, PostgreSQL, Riverpod, Tailwind CSS, dll.)."
        : "Click the bookshelf or whiteboard to explore the Tech Stack & Skills (Flutter, Next.js, Laravel, PostgreSQL, Riverpod, Tailwind CSS, etc.).",
      action: isId ? "Membuka: Keahlian & Tech Stack" : "Opens: Tech Stack & Skills",
    },
    {
      icon: "🚪",
      title: isId ? "Pintu Kamar & Smartphone" : "Bedroom Door & Smartphone",
      badge: isId ? "INTERAKTIF" : "INTERACTIVE",
      badgeBg: "bg-[#FFE600]",
      desc: isId
        ? "Klik pintu kamar atau smartphone di meja untuk membuka Hub Kontak — kirim email langsung, hubungi via WhatsApp, atau salin email."
        : "Click the door or phone on the desk to open Contact Channels — WhatsApp direct chat, email form, or social links.",
      action: isId ? "Membuka: Kontak & Kolaborasi" : "Opens: Contact & Connect",
    },
    {
      icon: "💡",
      title: isId ? "Sakelar Lampu Kamar" : "Interactive Room Lights",
      badge: isId ? "INTERAKTIF" : "INTERACTIVE",
      badgeBg: "bg-[#FFE600]",
      desc: isId
        ? "Klik langsung lampu gantung plafon atau lampu meja kerja (atau tombol 💡 di menu atas) untuk menyalakan/mematikan pencahayaan kamar."
        : "Click the ceiling pendant lamp or desk lamp (or 💡 button in top bar) to turn room lights ON or OFF.",
      action: isId ? "Aksi: Lampu Nyala / Mati" : "Action: Toggle Lights ON/OFF",
    },
    {
      icon: "☀️🌙",
      title: isId ? "Siklus Langit Jam Lokal" : "Dynamic Local Day/Night",
      badge: isId ? "REALTIME" : "REALTIME",
      badgeBg: "bg-[#00D2FF]",
      desc: isId
        ? "Cahaya jendela dan langit luar otomatis tersinkronisasi dengan jam lokal Anda (siang 06:00 - 18:00, malam dengan bulan & bintang). Bisa diganti manual lewat tombol ☀️/🌙."
        : "Window light and outdoor sky dynamically synchronize with your local system clock. Can be manually toggled anytime.",
      action: isId ? "Fitur: Jam Lokal Otomatis" : "Feature: Auto Local Time",
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-3xl my-auto bg-[#171720] border-4 border-black shadow-[12px_12px_0px_#000] overflow-hidden text-white">
        {/* MODAL HEADER */}
        <div className="flex items-center justify-between px-6 py-4 border-b-3 border-black bg-black">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#FFE600] text-black border-2 border-black shadow-[2px_2px_0px_#000] flex items-center justify-center text-xl font-bold">
              🎮
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-mono font-black text-white uppercase leading-tight">
                {isId ? "PANDUAN EKSPLORASI RUANGAN 3D" : "INTERACTIVE 3D ROOM GUIDE"}
              </h3>
              <p className="text-[11px] font-mono text-[#00F08B]">
                {"//"} {isId ? "KONTROL & INTERAKSI FITUR" : "CONTROLS & FEATURE NAVIGATION"}
              </p>
            </div>
          </div>

          {/* Right: Language Switcher inside Guide & Close Button */}
          <div className="flex items-center gap-2">
            <div className="flex items-center bg-[#171720] border-2 border-black p-0.5">
              <button
                onClick={() => !isId && onToggleLanguage()}
                className={`px-2 py-0.5 text-xs font-mono font-black transition-all cursor-pointer ${
                  isId ? "bg-[#FFE600] text-black border border-black" : "text-zinc-400 hover:text-white"
                }`}
              >
                ID
              </button>
              <button
                onClick={() => isId && onToggleLanguage()}
                className={`px-2 py-0.5 text-xs font-mono font-black transition-all cursor-pointer ${
                  !isId ? "bg-[#FFE600] text-black border border-black" : "text-zinc-400 hover:text-white"
                }`}
              >
                EN
              </button>
            </div>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="w-8 h-8 bg-[#FF3366] hover:bg-[#FF1A53] text-white border-2 border-black shadow-[2px_2px_0px_#000] flex items-center justify-center font-mono font-black text-xs cursor-pointer active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
              title="Close (Esc)"
            >
              ✕
            </button>
          </div>
        </div>

        {/* MODAL BODY */}
        <div className="p-5 sm:p-6 max-h-[68vh] overflow-y-auto space-y-3.5 pr-3">
          {/* Concept Banner */}
          <div className="p-4 bg-[#FFE600] text-black border-3 border-black shadow-[4px_4px_0px_#000] flex items-start gap-3">
            <span className="text-2xl mt-0.5">⚡</span>
            <div>
              <h4 className="text-xs sm:text-sm font-mono font-black uppercase mb-1">
                {isId ? "KONSEP RUANGAN 3D" : "3D WORKSPACE ARCHITECTURE"}
              </h4>
              <p className="text-xs font-sans font-bold leading-relaxed text-justify">
                {isId
                  ? "Seluruh ruangan ini dirancang sebagai kamar kerja developer. Anda dapat berjalan bebas, menoleh 360°, dan mengklik berbagai benda interaktif di kamar untuk membuka data proyek, keahlian, biografi, maupun hub kontak."
                  : "This entire room is a virtual developer workspace. You can walk around freely, look 360°, and click interactive room objects to discover projects, skills, biography, and contact info."}
              </p>
            </div>
          </div>

          {/* Grid of Interactive Features */}
          <div className="grid sm:grid-cols-2 gap-3 pt-2">
            {guideItems.map((item, idx) => (
              <div
                key={idx}
                className="p-4 bg-[#0D0D12] border-2 border-black shadow-[3px_3px_0px_#000] flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{item.icon}</span>
                      <h4 className="text-xs sm:text-sm font-mono font-black uppercase text-white">
                        {item.title}
                      </h4>
                    </div>
                    <span className={`text-[9px] font-mono font-black px-2 py-0.5 text-black border border-black uppercase ${item.badgeBg}`}>
                      {item.badge}
                    </span>
                  </div>
                  <p className="text-xs text-zinc-300 leading-relaxed text-justify mb-3 font-sans">
                    {item.desc}
                  </p>
                </div>

                {/* Footer Keys / Action */}
                <div className="pt-2 border-t-2 border-black flex items-center justify-between flex-wrap gap-1 text-[11px]">
                  {item.keys ? (
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="text-zinc-400 font-mono text-[10px]">
                        {isId ? "KEYS:" : "KEYS:"}
                      </span>
                      {item.keys.map((k, kIdx) => (
                        <kbd
                          key={kIdx}
                          className="px-2 py-0.5 bg-[#FFE600] text-black border border-black font-mono text-[10px] font-black shadow-[1px_1px_0px_#000]"
                        >
                          {k}
                        </kbd>
                      ))}
                    </div>
                  ) : item.action ? (
                    <span className="text-[#00F08B] font-mono font-bold text-[10px] uppercase flex items-center gap-1">
                      <span>⚡</span>
                      <span>{item.action}</span>
                    </span>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* MODAL FOOTER */}
        <div className="px-6 py-4 border-t-3 border-black bg-black flex items-center justify-between flex-wrap gap-3">
          <p className="text-xs text-zinc-400 font-mono hidden sm:block">
            {isId ? "[ESC] TEKAN TOMBOL ESC UNTUK KELUAR" : "[ESC] PRESS ESC TO CLOSE"}
          </p>

          <button
            onClick={onClose}
            className="neo-btn w-full sm:w-auto px-6 py-3 bg-[#FFE600] text-black text-xs sm:text-sm hover:bg-[#FFF066]"
          >
            {isId ? "MULAI JELAJAHI KAMAR 🚀" : "START EXPLORING ROOM 🚀"}
          </button>
        </div>
      </div>
    </div>
  );
}

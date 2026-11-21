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
      badge: isId ? "Kontrol Gerak" : "Movement",
      desc: isId
        ? "Gunakan tombol keyboard [W] [A] [S] [D] atau tombol panah [↑] [←] [↓] [→] untuk berjalan mengelilingi kamar. Tahan [Shift] untuk berjalan lebih cepat (sprint)."
        : "Use [W] [A] [S] [D] or Arrow keys [↑] [←] [↓] [→] to walk around the room. Hold [Shift] to sprint.",
      keys: ["W", "A", "S", "D", "Shift"],
    },
    {
      icon: "👀",
      title: isId ? "Arahkan Sudut Pandang (POV)" : "First-Person Look (POV)",
      badge: isId ? "Kamera" : "Camera",
      desc: isId
        ? "Cukup geser kursor mouse ke kanan, kiri, atas, atau bawah untuk menolehkan kepala. Anda juga bisa klik dan geser (drag) mouse untuk memutar sudut pandangan 360°."
        : "Move your mouse cursor (Right/Left/Up/Down) to look around naturally. You can also click and drag to freely rotate your field of view 360°.",
      keys: isId ? ["Gerak Kursor", "Klik & Drag"] : ["Move Mouse", "Click & Drag"],
    },
    {
      icon: "💻",
      title: isId ? "Meja Kerja & Workstation PC" : "Developer Desk & Dual PC",
      badge: isId ? "Bisa Diklik" : "Interactive",
      desc: isId
        ? "Klik monitor ganda atau meja kerja untuk zoom in dan membuka Portofolio Proyek (koleksi proyek unggulan beserta studi kasus arsitektur & metrik performa)."
        : "Click the dual monitors or workstation desk to inspect Featured Projects (featured applications with case studies & architecture).",
      action: isId ? "Membuka: Portofolio Proyek" : "Opens: Featured Projects",
    },
    {
      icon: "🛏️",
      title: isId ? "Kasur & Area Santai" : "Bed & Personal Lounge",
      badge: isId ? "Bisa Diklik" : "Interactive",
      desc: isId
        ? "Klik kasur untuk membuka bagian Tentang Saya — berisi biografi pengembang, rekam jejak pengalaman, perjalanan karier, serta filosofi kode."
        : "Click the bed to open About Me — covering developer biography, experience timeline, engineering principles, and background.",
      action: isId ? "Membuka: Tentang Saya" : "Opens: About Me & Bio",
    },
    {
      icon: "📚",
      title: isId ? "Rak Buku & Whiteboard" : "Bookshelf & Whiteboard",
      badge: isId ? "Bisa Diklik" : "Interactive",
      desc: isId
        ? "Klik rak buku atau papan tulis untuk melihat Keahlian & Tech Stack lengkap (Flutter, Next.js, Laravel, PostgreSQL, Riverpod, Tailwind CSS, REST API, dll.)."
        : "Click the bookshelf or whiteboard to explore the Tech Stack & Skills (Flutter, Next.js, Laravel, PostgreSQL, Riverpod, Tailwind CSS, etc.).",
      action: isId ? "Membuka: Keahlian & Tech Stack" : "Opens: Tech Stack & Skills",
    },
    {
      icon: "🚪",
      title: isId ? "Pintu Kamar & Smartphone" : "Bedroom Door & Smartphone",
      badge: isId ? "Bisa Diklik" : "Interactive",
      desc: isId
        ? "Klik pintu kamar atau smartphone di meja untuk membuka Hub Kontak — kirim email langsung, hubungi via WhatsApp, salin alamat email, atau buka profil LinkedIn/GitHub."
        : "Click the door or phone on the desk to open Contact Channels — WhatsApp direct chat, email form, or social links.",
      action: isId ? "Membuka: Kontak & Kolaborasi" : "Opens: Contact & Connect",
    },
    {
      icon: "💡",
      title: isId ? "Sakelar Lampu Kamar" : "Interactive Room Lights",
      badge: isId ? "Bisa Diklik" : "Interactive",
      desc: isId
        ? "Klik langsung lampu gantung di plafon atau lampu meja kerja (atau klik tombol 💡 di menu atas) untuk menyalakan atau mematikan pencahayaan kamar."
        : "Click the ceiling pendant lamp or the desk lamp (or the 💡 button in top bar) to turn room lights ON or OFF.",
      action: isId ? "Aksi: Lampu Nyala / Mati" : "Action: Toggle Lights ON/OFF",
    },
    {
      icon: "☀️🌙",
      title: isId ? "Siklus Langit Sesuai Jam Lokal" : "Dynamic Local Day/Night Cycle",
      badge: isId ? "Real-time" : "Dynamic",
      desc: isId
        ? "Cahaya jendela dan pemandangan langit di luar otomatis mengikuti jam lokal Anda (06:00 - 18:00 siang dengan matahari & awan, malam dengan bulan & bintang). Bisa diganti manual lewat tombol ☀️/🌙."
        : "Window light and outdoor sky dynamically synchronize with your local system clock (daytime with sun & clouds, night with moon & stars). Can be manually toggled anytime.",
      action: isId ? "Fitur: Jam Lokal Otomatis" : "Feature: Auto Local Time",
    },
    {
      icon: "📜",
      title: isId ? "Mode Tampilan Scroll Klasik" : "Classic Scrollable Website Mode",
      badge: isId ? "Fleksibel" : "Mode Switch",
      desc: isId
        ? "Jika Anda atau perangkat Anda lebih nyaman dengan portofolio bergaya website konvensional, klik tombol 'Scroll Klasik' di menu atas kapan saja."
        : "If you prefer a conventional scrollable website layout, click 'Classic Mode' in the top bar anytime.",
      action: isId ? "Opsi: 3D Room ⇄ Website Klasik" : "Option: 3D Room ⇄ Classic Web",
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-surface-950/85 backdrop-blur-xl animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-3xl my-auto rounded-3xl bg-surface-900/95 border border-white/15 shadow-2xl shadow-black/90 overflow-hidden">
        {/* MODAL HEADER */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/10 bg-surface-950/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-primary-600 to-indigo-600 flex items-center justify-center text-xl shadow-lg shadow-primary-500/30">
              🎮
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-extrabold text-white leading-tight">
                {isId ? "Panduan Lengkap Ruangan 3D" : "Interactive 3D Room Guide"}
              </h3>
              <p className="text-xs text-surface-400">
                {isId
                  ? "Apa saja yang bisa Anda lakukan di kamar developer ini?"
                  : "Everything you can explore and interact with in this 3D room"}
              </p>
            </div>
          </div>

          {/* Right: Language Switcher inside Guide & Close Button */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Prominent Language Switcher */}
            <div className="flex items-center p-1 rounded-xl bg-surface-900 border border-white/10">
              <button
                onClick={() => !isId && onToggleLanguage()}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  isId
                    ? "bg-primary-600 text-white shadow-md shadow-primary-600/40"
                    : "text-surface-400 hover:text-white"
                }`}
                title="Gunakan Bahasa Indonesia"
              >
                <span>🇮🇩</span>
                <span>ID</span>
              </button>
              <button
                onClick={() => isId && onToggleLanguage()}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  !isId
                    ? "bg-primary-600 text-white shadow-md shadow-primary-600/40"
                    : "text-surface-400 hover:text-white"
                }`}
                title="Switch to English"
              >
                <span>🇬🇧</span>
                <span>EN</span>
              </button>
            </div>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-surface-300 hover:text-white text-base transition-all cursor-pointer"
              title={isId ? "Tutup Panduan (Esc)" : "Close Guide (Esc)"}
            >
              ✕
            </button>
          </div>
        </div>

        {/* MODAL BODY: SCROLLABLE LIST OF FEATURES */}
        <div className="p-5 sm:p-6 max-h-[68vh] overflow-y-auto space-y-3.5 pr-3 custom-scrollbar">
          {/* Quick Summary Pill Banner */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-primary-950/60 via-indigo-950/40 to-surface-950/60 border border-primary-500/20 flex items-start gap-3.5">
            <span className="text-2xl mt-0.5">💡</span>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-primary-300 mb-1">
                {isId ? "Konsep Interaksi Portofolio 3D" : "3D Portfolio Interactive Concept"}
              </h4>
              <p className="text-xs text-surface-300/90 leading-relaxed text-justify">
                {isId
                  ? "Seluruh ruangan ini dirancang sebagai representasi kamar kerja seorang developer. Anda tidak hanya membaca portofolio, tetapi bisa berjalan langsung, menoleh, dan mengklik berbagai benda interaktif di kamar untuk membuka data proyek, keahlian, biografi, maupun kontak."
                  : "This entire room serves as a virtual developer workspace. Instead of a flat website, you can walk around in first-person POV, look around, and click real room objects to discover projects, skills, biography, and contact info."}
              </p>
            </div>
          </div>

          {/* Grid of All Interactive Features */}
          <div className="grid sm:grid-cols-2 gap-3 pt-2">
            {guideItems.map((item, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-surface-950/70 border border-white/5 hover:border-primary-500/30 transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{item.icon}</span>
                      <h4 className="text-xs sm:text-sm font-bold text-white">
                        {item.title}
                      </h4>
                    </div>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-white/5 text-primary-300 border border-white/10 whitespace-nowrap">
                      {item.badge}
                    </span>
                  </div>
                  <p className="text-xs text-surface-300/80 leading-relaxed text-justify mb-3">
                    {item.desc}
                  </p>
                </div>

                {/* Footer Keys / Action */}
                <div className="pt-2 border-t border-white/5 flex items-center justify-between flex-wrap gap-1 text-[11px]">
                  {item.keys ? (
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="text-surface-400 text-[10px]">
                        {isId ? "Tombol:" : "Keys:"}
                      </span>
                      {item.keys.map((k, kIdx) => (
                        <kbd
                          key={kIdx}
                          className="px-2 py-0.5 rounded-md bg-surface-800 border border-white/20 font-mono text-[10px] text-primary-300 font-bold shadow-sm"
                        >
                          {k}
                        </kbd>
                      ))}
                    </div>
                  ) : item.action ? (
                    <span className="text-accent-400 font-medium text-[11px] flex items-center gap-1">
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
        <div className="px-6 py-4 border-t border-white/10 bg-surface-950/60 flex items-center justify-between flex-wrap gap-3">
          <p className="text-xs text-surface-400 font-mono hidden sm:block">
            {isId ? "Tips: Tekan tombol [Esc] kapan saja untuk menutup" : "Tip: Press [Esc] anytime to close"}
          </p>

          <button
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-primary-600 to-indigo-600 hover:from-primary-500 hover:to-indigo-500 text-white font-bold text-xs sm:text-sm shadow-xl shadow-primary-600/30 transition-all cursor-pointer text-center"
          >
            {isId ? "Mulai Jelajahi Kamar 🚀" : "Start Exploring Room 🚀"}
          </button>
        </div>
      </div>
    </div>
  );
}

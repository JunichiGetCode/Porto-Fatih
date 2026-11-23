"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

interface NavItem {
  href: string;
  key: "home" | "about" | "projects" | "skills" | "contact";
}

const navLinks: NavItem[] = [
  { href: "#home", key: "home" },
  { href: "#about", key: "about" },
  { href: "#projects", key: "projects" },
  { href: "#skills", key: "skills" },
  { href: "#contact", key: "contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const { language, toggleLanguage, data } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);

      const sectionIds = ["home", "about", "projects", "skills", "contact"];
      for (const section of [...sectionIds].reverse()) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 140) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      id="navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        scrolled
          ? "bg-[#0D0D12] border-b-3 border-black py-2.5 shadow-[0px_6px_0px_0px_#000000]"
          : "bg-[#0D0D12]/95 border-b-3 border-black py-3.5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Brutalist Logo */}
        <a
          href="#home"
          className="flex items-center gap-2.5 group"
          id="nav-logo"
        >
          <div className="w-9 h-9 sm:w-10 sm:h-10 bg-[#FFE600] border-2 sm:border-3 border-black shadow-[3px_3px_0px_#000] flex items-center justify-center p-1 transition-transform group-hover:-translate-x-0.5 group-hover:-translate-y-0.5 group-hover:shadow-[5px_5px_0px_#000]">
            <Image
              src="/logo-mark.svg"
              alt="Fatih.dev Logo"
              width={32}
              height={32}
              className="w-full h-full object-contain"
              priority
            />
          </div>
          <div className="flex flex-col">
            <span className="font-mono font-black text-base sm:text-lg text-white tracking-tight leading-none group-hover:text-[#FFE600] transition-colors">
              FATIH<span className="text-[#FFE600]">.DEV</span>
            </span>
            <span className="text-[10px] font-mono font-bold tracking-widest text-[#00F08B] uppercase leading-tight mt-0.5">
              [FULLSTACK // 3D]
            </span>
          </div>
        </a>

        {/* Desktop Links (Neo-Brutalist Segmented Bar) */}
        <div className="hidden md:flex items-center gap-1.5 bg-[#171720] px-2 py-1.5 border-2 border-black shadow-[3px_3px_0px_#000]">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.slice(1);
            return (
              <a
                key={link.href}
                href={link.href}
                id={`nav-${link.key}`}
                className={`px-3 py-1 text-xs font-mono font-bold uppercase transition-all duration-150 ${
                  isActive
                    ? "bg-[#FFE600] text-black border-2 border-black shadow-[2px_2px_0px_#000]"
                    : "text-zinc-300 hover:text-white hover:bg-zinc-800 border-2 border-transparent"
                }`}
              >
                {data.nav[link.key]}
              </a>
            );
          })}
        </div>

        {/* Actions Desktop */}
        <div className="hidden md:flex items-center gap-3">
          {/* Brutalist Language Switcher */}
          <div className="flex items-center bg-[#171720] border-2 border-black shadow-[3px_3px_0px_#000] p-0.5">
            <button
              onClick={() => language !== "id" && toggleLanguage()}
              className={`px-2 py-1 text-xs font-mono font-black transition-all cursor-pointer ${
                language === "id"
                  ? "bg-[#00D2FF] text-black border-2 border-black"
                  : "text-zinc-400 hover:text-white border-2 border-transparent"
              }`}
              title="Bahasa Indonesia"
            >
              ID
            </button>
            <button
              onClick={() => language !== "en" && toggleLanguage()}
              className={`px-2 py-1 text-xs font-mono font-black transition-all cursor-pointer ${
                language === "en"
                  ? "bg-[#00D2FF] text-black border-2 border-black"
                  : "text-zinc-400 hover:text-white border-2 border-transparent"
              }`}
              title="English"
            >
              EN
            </button>
          </div>

          {/* Neo-Brutalist CTA Button */}
          <a
            href="#contact"
            id="nav-cta"
            className="neo-btn px-4 py-2 bg-[#FFE600] text-black text-xs hover:bg-[#FFF066]"
          >
            <span className="w-2 h-2 bg-black rounded-none animate-ping" />
            <span>{data.hero.contactMe}</span>
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          id="mobile-menu-toggle"
          className="md:hidden w-10 h-10 bg-[#FFE600] text-black border-2 border-black shadow-[3px_3px_0px_#000] flex items-center justify-center cursor-pointer active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <div className="flex flex-col gap-1 w-5">
            <span
              className={`block w-full h-0.5 bg-black transition-all duration-200 ${
                menuOpen ? "rotate-45 translate-y-1.5" : ""
              }`}
            />
            <span
              className={`block w-full h-0.5 bg-black transition-all duration-200 ${
                menuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block w-full h-0.5 bg-black transition-all duration-200 ${
                menuOpen ? "-rotate-45 -translate-y-1.5" : ""
              }`}
            />
          </div>
        </button>
      </div>

      {/* Mobile Drawer */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          menuOpen ? "max-h-[32rem] opacity-100" : "max-h-0 opacity-0 pointer-events-none"
        }`}
      >
        <div className="p-4 mx-3 my-2 bg-[#171720] border-3 border-black shadow-[6px_6px_0px_#000] flex flex-col gap-2.5">
          <div className="flex items-center justify-between pb-3 border-b-2 border-black">
            <span className="text-xs font-mono font-bold uppercase text-zinc-300">Language:</span>
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => language !== "id" && toggleLanguage()}
                className={`px-3 py-1 text-xs font-mono font-black border-2 border-black ${
                  language === "id" ? "bg-[#00D2FF] text-black shadow-[2px_2px_0px_#000]" : "bg-black text-zinc-400"
                }`}
              >
                ID
              </button>
              <button
                onClick={() => language !== "en" && toggleLanguage()}
                className={`px-3 py-1 text-xs font-mono font-black border-2 border-black ${
                  language === "en" ? "bg-[#00D2FF] text-black shadow-[2px_2px_0px_#000]" : "bg-black text-zinc-400"
                }`}
              >
                EN
              </button>
            </div>
          </div>
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={`px-3 py-2 text-xs font-mono font-bold uppercase border-2 transition-all ${
                activeSection === link.href.slice(1)
                  ? "bg-[#FFE600] text-black border-black shadow-[3px_3px_0px_#000]"
                  : "bg-black/40 text-zinc-300 border-zinc-800 hover:border-black hover:bg-black"
              }`}
            >
              {data.nav[link.key]}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setMenuOpen(false)}
            className="neo-btn mt-2 py-3 bg-[#FFE600] text-black text-center text-xs"
          >
            {data.hero.contactMe}
          </a>
        </div>
      </div>
    </nav>
  );
}

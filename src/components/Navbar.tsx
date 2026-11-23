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
      setScrolled(window.scrollY > 40);

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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-surface-950/80 backdrop-blur-md border-b border-white/10 shadow-xl shadow-black/40 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#home"
          className="flex items-center gap-2.5 group tracking-tight"
          id="nav-logo"
        >
          <div className="relative w-9 h-9 rounded-xl overflow-hidden group-hover:scale-105 transition-transform flex-shrink-0">
            <Image
              src="/logo-mark.svg"
              alt="Fatih.dev Logo"
              width={36}
              height={36}
              className="w-full h-full object-contain"
              priority
            />
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-base sm:text-lg text-white group-hover:text-primary-200 transition-colors leading-tight">
              Fatih<span className="bg-gradient-to-r from-cyan-400 to-primary-400 bg-clip-text text-transparent">.dev</span>
            </span>
            <span className="text-[9px] font-mono tracking-wider text-surface-400 uppercase leading-none hidden sm:inline-block">
              Full-Stack &bull; 3D WebGL
            </span>
          </div>
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-1 bg-surface-900/60 p-1.5 rounded-full border border-white/5 backdrop-blur-sm">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.slice(1);
            return (
              <a
                key={link.href}
                href={link.href}
                id={`nav-${link.key}`}
                className={`relative px-4 py-1.5 text-xs font-semibold rounded-full transition-all duration-200 ${
                  isActive
                    ? "text-white bg-primary-600/30 border border-primary-500/40 shadow-sm"
                    : "text-surface-200 hover:text-white hover:bg-white/5"
                }`}
              >
                {data.nav[link.key]}
              </a>
            );
          })}
        </div>

        {/* Actions Desktop */}
        <div className="hidden md:flex items-center gap-3">
          {/* Language Switcher */}
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-900/80 border border-surface-700/60 text-xs font-semibold hover:border-primary-500/50 hover:bg-surface-800 transition-all cursor-pointer"
            aria-label="Toggle language"
            title="Switch Language (ID / EN)"
          >
            <span className={language === "id" ? "text-primary-400 font-bold" : "text-surface-400"}>ID</span>
            <span className="text-surface-600">/</span>
            <span className={language === "en" ? "text-primary-400 font-bold" : "text-surface-400"}>EN</span>
          </button>

          {/* Quick CTA */}
          <a
            href="#contact"
            id="nav-cta"
            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary-600 to-indigo-600 hover:from-primary-500 hover:to-indigo-500 text-white text-xs font-semibold rounded-full shadow-lg shadow-primary-600/20 hover:shadow-primary-600/30 hover:-translate-y-0.5 transition-all"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-400" />
            </span>
            <span>{data.hero.contactMe}</span>
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          id="mobile-menu-toggle"
          className="md:hidden relative w-10 h-10 rounded-xl bg-surface-900/80 border border-white/10 flex items-center justify-center text-white"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <div className="flex flex-col gap-1.5">
            <span
              className={`block w-5 h-0.5 bg-white transition-all duration-300 ${
                menuOpen ? "rotate-45 translate-y-2" : ""
              }`}
            />
            <span
              className={`block w-5 h-0.5 bg-white transition-all duration-300 ${
                menuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block w-5 h-0.5 bg-white transition-all duration-300 ${
                menuOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            />
          </div>
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0 pointer-events-none"
        }`}
      >
        <div className="px-6 py-4 flex flex-col gap-2 bg-surface-950/95 backdrop-blur-xl border-b border-white/10 shadow-2xl mt-2 mx-4 rounded-2xl">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <span className="text-xs font-medium text-surface-200">Bahasa / Language:</span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => language !== "id" && toggleLanguage()}
                className={`px-2.5 py-1 rounded-md text-xs font-bold transition-all ${
                  language === "id" ? "bg-primary-600 text-white" : "bg-surface-800 text-surface-400"
                }`}
              >
                ID
              </button>
              <button
                onClick={() => language !== "en" && toggleLanguage()}
                className={`px-2.5 py-1 rounded-md text-xs font-bold transition-all ${
                  language === "en" ? "bg-primary-600 text-white" : "bg-surface-800 text-surface-400"
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
              className={`px-4 py-2.5 text-sm font-medium rounded-xl transition-all ${
                activeSection === link.href.slice(1)
                  ? "text-white bg-primary-600/30 border border-primary-500/30"
                  : "text-surface-200 hover:text-white hover:bg-white/5"
              }`}
            >
              {data.nav[link.key]}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setMenuOpen(false)}
            className="mt-1 px-4 py-2.5 bg-gradient-to-r from-primary-600 to-indigo-600 text-white text-sm font-semibold rounded-xl text-center shadow-lg"
          >
            {data.hero.contactMe}
          </a>
        </div>
      </div>
    </nav>
  );
}

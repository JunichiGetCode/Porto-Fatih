"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";

const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const { language, toggleLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const sections = navLinks.map((link) => link.href.slice(1));
      for (const section of sections.reverse()) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      id="navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "glass shadow-lg shadow-black/20 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#home"
          className="text-xl font-bold tracking-tight group"
          id="nav-logo"
        >
          <span className="text-primary-400 group-hover:text-primary-300 transition-colors">
            &lt;
          </span>
          <span className="text-white group-hover:text-primary-100 transition-colors">
            Fatih
          </span>
          <span className="text-accent-400 group-hover:text-accent-300 transition-colors">
            /
          </span>
          <span className="text-primary-400 group-hover:text-primary-300 transition-colors">
            &gt;
          </span>
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              id={`nav-${link.label.toLowerCase()}`}
              className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
                activeSection === link.href.slice(1)
                  ? "text-primary-300 bg-primary-500/10"
                  : "text-surface-200 hover:text-white hover:bg-white/5"
              }`}
            >
              {t(`nav.${link.label.toLowerCase()}` as any)}
              {activeSection === link.href.slice(1) && (
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-primary-400 rounded-full" />
              )}
            </a>
          ))}
        </div>

        {/* Actions Desktop */}
        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={toggleLanguage}
            className="px-3 py-1.5 text-xs font-semibold rounded-md border border-surface-700 hover:border-primary-500/50 text-surface-200 hover:text-white transition-all duration-300 hover:bg-white/5"
            aria-label="Toggle Language"
          >
            {language.toUpperCase()}
          </button>
          
          <a
            href="#contact"
            id="nav-cta"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary-600 hover:bg-primary-500 text-white text-sm font-medium rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-primary-600/25 hover:-translate-y-0.5"
          >
            <span className="w-2 h-2 bg-accent-400 rounded-full animate-pulse" />
            {t("hero.contactMe")}
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          id="mobile-menu-toggle"
          className="md:hidden relative w-10 h-10 flex items-center justify-center"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <div className="flex flex-col gap-1.5">
            <span
              className={`block w-6 h-0.5 bg-white transition-all duration-300 ${
                menuOpen ? "rotate-45 translate-y-2" : ""
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-white transition-all duration-300 ${
                menuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-white transition-all duration-300 ${
                menuOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            />
          </div>
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-500 ${
          menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-6 py-4 flex flex-col gap-1 glass mt-2 mx-4 rounded-2xl">
          <div className="flex justify-end mb-2">
            <button
              onClick={() => {
                toggleLanguage();
                setMenuOpen(false);
              }}
              className="px-4 py-2 text-xs font-semibold rounded-lg border border-surface-700 bg-surface-900 text-surface-200 hover:text-white"
            >
              Language: {language === 'id' ? 'Indonesia' : 'English'}
            </button>
          </div>
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={`px-4 py-3 text-sm font-medium rounded-xl transition-all ${
                activeSection === link.href.slice(1)
                  ? "text-primary-300 bg-primary-500/10"
                  : "text-surface-200 hover:text-white hover:bg-white/5"
              }`}
            >
              {t(`nav.${link.label.toLowerCase()}` as any)}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setMenuOpen(false)}
            className="mt-2 px-4 py-3 bg-primary-600 text-white text-sm font-medium rounded-xl text-center"
          >
            {t("hero.contactMe")}
          </a>
        </div>
      </div>
    </nav>
  );
}

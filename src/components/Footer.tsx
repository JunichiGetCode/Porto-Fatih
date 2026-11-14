"use client";

import { useLanguage } from "@/context/LanguageContext";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { data } = useLanguage();

  return (
    <footer className="relative py-12 border-t border-white/10 bg-surface-950/80 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo & Tagline */}
          <div className="flex flex-col items-center md:items-start gap-1">
            <a href="#home" className="flex items-center gap-2 group tracking-tight" id="footer-logo">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-primary-500/20 to-accent-500/20 border border-primary-500/30 flex items-center justify-center font-mono text-xs font-bold text-primary-300">
                MF
              </div>
              <span className="font-bold text-sm text-white">
                Muhammad Fatih Rahman
              </span>
            </a>
            <p className="text-xs text-surface-400 max-w-sm text-center md:text-left">
              {data.footer.tagline}
            </p>
          </div>

          {/* Copyright */}
          <div className="text-center">
            <p className="text-xs text-surface-400">
              &copy; {currentYear} Muhammad Fatih Rahman. {data.footer.rights}
            </p>
            <p className="text-[11px] text-surface-500 mt-1">
              Built with Next.js 16, React 19 & Tailwind CSS v4.
            </p>
          </div>

          {/* Back to top */}
          <a
            href="#home"
            id="back-to-top"
            className="group flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-surface-300 hover:text-white hover:border-primary-500/40 transition-all cursor-pointer"
          >
            <span>{data.footer.backToTop}</span>
            <svg
              className="w-3.5 h-3.5 text-primary-400 transition-transform group-hover:-translate-y-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}

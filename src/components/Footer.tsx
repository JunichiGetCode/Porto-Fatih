"use client";

import { useLanguage } from "@/context/LanguageContext";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { t } = useLanguage();

  return (
    <footer className="relative py-12 border-t border-white/5">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <a href="#home" className="text-lg font-bold tracking-tight group">
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

          {/* Copyright */}
          <p className="text-sm text-surface-200/40">
            &copy; {currentYear} Muhammad Fatih Rahman. {t("footer.rights")}
          </p>

          {/* Back to top */}
          <a
            href="#home"
            id="back-to-top"
            className="group flex items-center gap-2 text-sm text-surface-200/40 hover:text-primary-400 transition-colors"
          >
            <span>{t("nav.home")}</span>
            <svg
              className="w-4 h-4 transition-transform group-hover:-translate-y-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 10l7-7m0 0l7 7m-7-7v18"
              />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}

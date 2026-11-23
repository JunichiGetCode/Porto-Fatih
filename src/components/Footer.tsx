"use client";

import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { data } = useLanguage();

  return (
    <footer className="relative py-12 border-t-3 border-black bg-[#0D0D12] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo & Tagline */}
          <div className="flex flex-col items-center md:items-start gap-1">
            <a href="#home" className="flex items-center gap-2.5 group" id="footer-logo">
              <div className="w-8 h-8 bg-[#FFE600] border-2 border-black shadow-[2px_2px_0px_#000] flex items-center justify-center p-0.5">
                <Image
                  src="/logo-mark.svg"
                  alt="Fatih.dev Logo"
                  width={24}
                  height={24}
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="font-mono font-black text-sm text-white tracking-tight uppercase group-hover:text-[#FFE600] transition-colors">
                FATIH<span className="text-[#FFE600]">.DEV</span>
              </span>
            </a>
            <p className="text-xs text-zinc-400 font-mono max-w-sm text-center md:text-left mt-1">
              {"//"} {data.footer.tagline}
            </p>
          </div>

          {/* Copyright & Stack Stamp */}
          <div className="text-center">
            <p className="text-xs font-mono font-bold text-zinc-300 uppercase">
              &copy; {currentYear} MUHAMMAD FATIH RAHMAN. {data.footer.rights}
            </p>
            <p className="text-[11px] font-mono text-zinc-500 mt-1">
              BUILT WITH NEXT.JS 16, REACT 19 & THREE.JS // NEO-BRUTALISM EDITION
            </p>
          </div>

          {/* Back to top */}
          <a
            href="#home"
            id="back-to-top"
            className="neo-btn px-4 py-2 bg-[#FFE600] text-black text-xs hover:bg-[#FFF066]"
          >
            <span>{data.footer.backToTop}</span>
            <span className="font-mono text-sm font-black">↑</span>
          </a>
        </div>
      </div>
    </footer>
  );
}

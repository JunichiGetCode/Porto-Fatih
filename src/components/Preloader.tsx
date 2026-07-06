"use client";

import { useEffect, useState } from "react";

export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(true);
  const [slideUp, setSlideUp] = useState(false);

  useEffect(() => {
    // Disable scroll during loading
    document.body.style.overflow = "hidden";

    // Smooth counting interval
    const duration = 1600; // 1.6s total time
    const intervalTime = 16; // ~60fps
    const steps = duration / intervalTime;
    let currentStep = 0;

    const interval = setInterval(() => {
      currentStep++;
      const percent = Math.min(100, Math.floor((currentStep / steps) * 100));
      
      // Easing-like progress increments
      setProgress(percent);

      if (percent >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setSlideUp(true);
          setTimeout(() => {
            setLoading(false);
            document.body.style.overflow = "unset";
          }, 800); // Duration of the slide-up animation
        }, 300); // Hold 100% briefly for impact
      }
    }, intervalTime);

    return () => {
      clearInterval(interval);
      document.body.style.overflow = "unset";
    };
  }, []);

  if (!loading) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col justify-between bg-surface-950 p-8 sm:p-16 transition-transform duration-[850ms] cubic-bezier(0.85, 0, 0.15, 1) ${
        slideUp ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      {/* Background grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
        }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(99,102,241,0.05)_0%,transparent_50%)] pointer-events-none" />

      {/* TOP HEADER */}
      <div className="relative z-10 flex items-center justify-between">
        <span className="text-sm font-mono tracking-widest text-surface-200/50 uppercase">
          M. Fatih Rahman
        </span>
        <span className="text-xs font-mono tracking-wider text-surface-200/30">
          © 2026
        </span>
      </div>

      {/* CENTER BRANDING */}
      <div className="relative z-10 my-auto text-left max-w-lg">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-4 leading-tight">
          Designing &amp; Building <br />
          <span className="gradient-text">Premium Digital Solutions</span>
        </h1>
        <p className="text-sm sm:text-base text-surface-200/50 font-light max-w-sm">
          Web &amp; Mobile Developer specializing in Laravel, Flutter, and Next.js.
        </p>
      </div>

      {/* BOTTOM METRICS & COUNTER */}
      <div className="relative z-10 flex items-end justify-between border-t border-white/5 pt-8">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-accent-400 animate-pulse" />
            <span className="text-xs font-mono tracking-widest uppercase text-surface-200/50">
              Status
            </span>
          </div>
          <span className="text-sm text-white font-medium">Loading Portfolio...</span>
        </div>

        {/* Large Premium Percentage Counter */}
        <div className="flex items-baseline font-mono text-7xl sm:text-9xl font-bold tracking-tighter text-white leading-none">
          <span>{progress.toString().padStart(3, "0")}</span>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useEffect, useState, useRef, type MouseEvent, type TouchEvent } from "react";

export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const [loading, setLoading] = useState(true);

  // Dragging states
  const [isDragging, setIsDragging] = useState(false);
  const [sliderPos, setSliderPos] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const startX = useRef(0);

  useEffect(() => {
    // Disable scroll during loading
    document.body.style.overflow = "hidden";

    // Speed up initial progress to make it responsive
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setLoaded(true);
          return 100;
        }
        const increment = Math.floor(Math.random() * 20) + 10;
        return Math.min(100, prev + increment);
      });
    }, 50);

    return () => {
      clearInterval(interval);
      document.body.style.overflow = "unset";
    };
  }, []);

  const handleStart = (clientX: number) => {
    if (!loaded || unlocked) return;
    setIsDragging(true);
    startX.current = clientX - sliderPos;
  };

  const handleMove = (clientX: number) => {
    if (!isDragging || !trackRef.current) return;
    const track = trackRef.current;
    const maxSlide = track.clientWidth - 56; // 56px is the button width (w-14)
    let newPos = clientX - startX.current;

    if (newPos < 0) newPos = 0;
    if (newPos > maxSlide) {
      newPos = maxSlide;
      // Trigger unlock
      setIsDragging(false);
      setUnlocked(true);
      setTimeout(() => {
        setFadeOut(true);
        setTimeout(() => {
          setLoading(false);
          document.body.style.overflow = "unset";
        }, 800);
      }, 300);
    }
    setSliderPos(newPos);
  };

  const handleEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    // Reset slider back to start if not fully unlocked
    if (!unlocked) {
      setSliderPos(0);
    }
  };

  // Mouse Handlers
  const onMouseDown = (e: MouseEvent) => handleStart(e.clientX);
  const onMouseMove = (e: any) => handleMove(e.clientX);
  const onMouseUp = () => handleEnd();

  // Touch Handlers for mobile support
  const onTouchStart = (e: TouchEvent) => handleStart(e.touches[0].clientX);
  const onTouchMove = (e: TouchEvent) => handleMove(e.touches[0].clientX);
  const onTouchEnd = () => handleEnd();

  // Global mouse up handling to reset if user drags out of window
  useEffect(() => {
    const handleGlobalMouseUp = () => {
      if (isDragging) {
        setIsDragging(false);
        if (!unlocked) setSliderPos(0);
      }
    };
    window.addEventListener("mouseup", handleGlobalMouseUp);
    return () => window.removeEventListener("mouseup", handleGlobalMouseUp);
  }, [isDragging, unlocked]);

  if (!loading) return null;

  return (
    <div
      onMouseMove={onMouseMove}
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-surface-950 transition-all duration-800 cubic-bezier(0.85, 0, 0.15, 1) ${
        fadeOut ? "opacity-0 scale-95 pointer-events-none" : "opacity-100"
      }`}
      style={{ userSelect: "none" }}
    >
      {/* Background radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.08)_0%,transparent_60%)] pointer-events-none" />

      {/* Main Logo Container */}
      <div className="relative mb-12 text-center">
        <h2 className="text-4xl sm:text-5xl font-mono font-bold tracking-wider mb-2">
          <span className="text-primary-400">&lt;</span>
          <span className="text-white">Fatih</span>
          <span className="text-accent-400">/</span>
          <span className="text-primary-400">&gt;</span>
        </h2>
        <p className="text-surface-200/40 text-xs tracking-widest uppercase mt-2 font-light">
          {loaded ? "Ready to Explore" : "Initializing Portfolio"}
        </p>
      </div>

      {!loaded ? (
        /* PHASE 1: Loading progress bar */
        <div className="flex flex-col items-center">
          <div className="w-64 max-w-[80vw] h-[2px] bg-white/5 rounded-full overflow-hidden relative mb-4">
            <div
              className="h-full bg-gradient-to-r from-primary-500 via-accent-400 to-primary-500 transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="text-sm font-mono font-semibold text-primary-300">
            {progress}%
          </div>
        </div>
      ) : (
        /* PHASE 2: Interactive swipe slider to enter */
        <div className="flex flex-col items-center animate-fade-in">
          <div
            ref={trackRef}
            className={`relative w-72 sm:w-80 h-14 bg-white/5 border border-white/10 rounded-full flex items-center p-1 overflow-hidden transition-all duration-300 ${
              unlocked ? "border-accent-500 bg-accent-500/10" : ""
            }`}
          >
            {/* Slide message */}
            <div
              className={`absolute inset-0 flex items-center justify-center text-xs sm:text-sm font-semibold tracking-wider transition-opacity duration-300 pointer-events-none ${
                isDragging ? "opacity-30" : "opacity-70"
              } ${unlocked ? "text-accent-300" : "text-surface-200"}`}
            >
              {unlocked ? (
                <span className="flex items-center gap-2">
                  <svg className="w-4 h-4 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                  Welcome!
                </span>
              ) : (
                <span className="animate-[pulse_1.5s_infinite]">Swipe to Enter &gt;&gt;</span>
              )}
            </div>

            {/* Slider Handle */}
            <div
              onMouseDown={onMouseDown}
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
              onMouseUp={onMouseUp}
              className={`absolute w-12 h-12 rounded-full flex items-center justify-center cursor-grab active:cursor-grabbing transition-shadow duration-300 ${
                unlocked
                  ? "bg-accent-500 text-white shadow-[0_0_20px_rgba(16,185,129,0.5)]"
                  : "bg-primary-600 text-white hover:bg-primary-500 shadow-[0_0_15px_rgba(99,102,241,0.3)]"
              }`}
              style={{
                transform: `translateX(${sliderPos}px)`,
                transition: isDragging ? "none" : "transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)",
              }}
            >
              {unlocked ? (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <svg
                  className={`w-5 h-5 transition-transform ${isDragging ? "scale-110" : ""}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </svg>
              )}
            </div>
          </div>
          <p className="text-xs text-surface-200/30 mt-4 tracking-wider">
            Drag the button to unlock portfolio
          </p>
        </div>
      )}
    </div>
  );
}

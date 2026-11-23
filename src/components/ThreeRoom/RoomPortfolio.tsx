"use client";

import React, { useState, useCallback, useEffect } from "react";
import RoomCanvas, { SectionType } from "./RoomCanvas";
import RoomPreloader from "./RoomPreloader";
import RoomHUD from "./RoomHUD";
import RoomModalView from "./RoomModalView";
import RoomGuideModal from "./RoomGuideModal";
import { useLanguage } from "@/context/LanguageContext";

// Classic Mode Components
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ProjectsSection from "@/components/ProjectsSection";
import SkillsSection from "@/components/SkillsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

// Helper to detect mobile devices (User-Agent + screen width + coarse touch)
function checkIsMobile(): boolean {
  if (typeof window === "undefined") return false;
  const ua = navigator.userAgent || navigator.vendor || "";
  const isMobileUA = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua);
  const isSmallScreen = window.innerWidth < 768;
  const isTouchCoarse = window.matchMedia?.("(pointer: coarse)").matches && window.innerWidth < 1024;
  return isMobileUA || isSmallScreen || Boolean(isTouchCoarse);
}

export default function RoomPortfolio() {
  const { language, toggleLanguage } = useLanguage();
  const [isMobile, setIsMobile] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState<SectionType>(null);
  const [displayMode, setDisplayMode] = useState<"3d" | "classic">("3d");
  const [cameraResetTrigger, setCameraResetTrigger] = useState(0);
  const [isGuideOpen, setIsGuideOpen] = useState(false);

  // Automatic Mobile vs Desktop Device Detection
  useEffect(() => {
    const handleDeviceCheck = () => {
      const mob = checkIsMobile();
      setIsMobile(mob);
      if (mob) {
        // Mobile users: automatically display classic scroll view without 3D loading
        setDisplayMode("classic");
        setIsLoading(false);
      }
    };

    const timer = setTimeout(handleDeviceCheck, 0);
    window.addEventListener("resize", handleDeviceCheck);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", handleDeviceCheck);
    };
  }, []);

  // Dynamic Day/Night based on user's real local time (6 AM - 6 PM is Day)
  const [timeOfDay, setTimeOfDay] = useState<"day" | "night">("day");

  useEffect(() => {
    const timer = setTimeout(() => {
      const currentHour = new Date().getHours();
      setTimeOfDay(currentHour >= 6 && currentHour < 18 ? "day" : "night");
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  // Room light state (default ON for bright, vibrant view)
  const [isLightOn, setIsLightOn] = useState(true);

  const handleSelectSection = useCallback((section: SectionType) => {
    setActiveSection(section);
  }, []);

  const handleCloseModal = useCallback(() => {
    setActiveSection(null);
  }, []);

  const handleResetCamera = useCallback(() => {
    setActiveSection(null);
    setCameraResetTrigger((prev) => prev + 1);
  }, []);

  const handleToggleMode = useCallback(() => {
    setDisplayMode((prev) => (prev === "3d" ? "classic" : "3d"));
  }, []);

  const handleToggleTimeOfDay = useCallback(() => {
    setTimeOfDay((prev) => (prev === "day" ? "night" : "day"));
  }, []);

  const handleToggleLight = useCallback(() => {
    setIsLightOn((prev) => !prev);
  }, []);

  // Preloader completion handler
  const handlePreloaderComplete = useCallback(() => {
    setIsLoading(false);
    setActiveSection(null);
  }, []);

  const handleOpenClassicFromPreloader = useCallback(() => {
    setIsLoading(false);
    setActiveSection(null);
    setDisplayMode("classic");
  }, []);

  return (
    <>
      {/* 3D Wireframe Preloader on Desktop Initial Entry */}
      {isLoading && !isMobile && (
        <RoomPreloader
          onComplete={handlePreloaderComplete}
          language={language}
          onToggleLanguage={toggleLanguage}
          onOpenClassic={handleOpenClassicFromPreloader}
        />
      )}

      {/* 3D INTERACTIVE ROOM MODE (Desktop Only) */}
      {displayMode === "3d" && !isMobile ? (
        <div className="relative w-screen h-screen overflow-hidden bg-[#080c14]">
          {/* Interactive 3D Canvas */}
          <RoomCanvas
            activeSection={activeSection}
            onSelectSection={handleSelectSection}
            language={language}
            resetTrigger={cameraResetTrigger}
            timeOfDay={timeOfDay}
            onToggleTimeOfDay={handleToggleTimeOfDay}
            isLightOn={isLightOn}
            onToggleLight={handleToggleLight}
            isPreloading={isLoading}
          />

          {/* Floating HUD & Bottom Navigation Dock */}
          <RoomHUD
            activeSection={activeSection}
            onSelectSection={handleSelectSection}
            onResetCamera={handleResetCamera}
            onToggleClassicMode={handleToggleMode}
            language={language}
            onToggleLanguage={toggleLanguage}
            timeOfDay={timeOfDay}
            onToggleTimeOfDay={handleToggleTimeOfDay}
            isLightOn={isLightOn}
            onToggleLight={handleToggleLight}
            onOpenGuide={() => setIsGuideOpen(true)}
          />

          {/* Section Modal Overlay with Breadcrumbs & Back to Room Button */}
          <RoomModalView
            section={activeSection}
            onClose={handleCloseModal}
            onSwitchSection={handleSelectSection}
            language={language}
            onToggleLanguage={toggleLanguage}
          />

          {/* Full Interactive 3D Room Feature & Navigation Guide */}
          <RoomGuideModal
            isOpen={isGuideOpen}
            onClose={() => setIsGuideOpen(false)}
            language={language}
            onToggleLanguage={toggleLanguage}
          />
        </div>
      ) : (
        /* CLASSIC SCROLLABLE MODE (Mobile Default & Desktop Opt-in) */
        <div className="relative min-h-screen bg-surface-950 text-white">
          <Navbar />
          <main>
            <HeroSection />
            <AboutSection />
            <ProjectsSection />
            <SkillsSection />
            <ContactSection />
          </main>
          <Footer />

          {/* Floating Switcher back to 3D Room (Desktop Only) */}
          {!isMobile && (
            <div className="hidden md:flex fixed bottom-6 right-6 z-50">
              <button
                onClick={handleToggleMode}
                className="neo-btn px-5 py-3.5 bg-[#FFE600] text-black text-xs sm:text-sm shadow-[6px_6px_0px_#000] hover:bg-[#FFF066]"
              >
                <span className="text-lg">🎮</span>
                <span>
                  {language === "id" ? "Buka Ruangan 3D" : "Open 3D Room"}
                </span>
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
}

"use client";

import React, { useEffect, useRef, useState, useCallback, useMemo } from "react";
import * as THREE from "three";

interface RoomPreloaderProps {
  onComplete: () => void;
  language: "id" | "en";
  onToggleLanguage: () => void;
  onOpenClassic?: () => void;
}

export default function RoomPreloader({
  onComplete,
  language,
  onToggleLanguage,
  onOpenClassic,
}: RoomPreloaderProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [progress, setProgress] = useState(0);
  const [isEntering, setIsEntering] = useState(false);
  const [currentTime, setCurrentTime] = useState("");

  const isId = language === "id";

  // Real-time clock update (HH:MM:SS)
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");
      const seconds = String(now.getSeconds()).padStart(2, "0");
      setCurrentTime(`${hours}:${minutes}:${seconds} WIB`);
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  // Telemetry stages based on progress
  const telemetryMessage = useMemo(() => {
    if (progress < 25) {
      return isId
        ? "Menginisialisasi WebGL 2.0 Spatial Engine..."
        : "Initializing WebGL 2.0 Spatial Engine...";
    }
    if (progress < 50) {
      return isId
        ? "Merakit Workstation, Parquet Oak & Furnitur Kamar..."
        : "Assembling Workstation, Oak Parquet & Furniture...";
    }
    if (progress < 75) {
      return isId
        ? "Mengkalibrasi Cahaya Matahari, Bayangan & Langit Dinamis..."
        : "Calibrating Dynamic Sunlight, Shaders & Atmospheric Sky...";
    }
    if (progress < 100) {
      return isId
        ? "Menghubungkan Navigasi POV Orang Pertama (WASD)..."
        : "Binding First-Person POV Controls (WASD)...";
    }
    return isId
      ? "Ruangan 3D Siap Dieksplorasi Sepenuhnya! ✨"
      : "Virtual 3D Room Suite Fully Ready! ✨";
  }, [progress, isId]);

  const isReady = progress >= 100;

  // Progress Bar Simulation with natural organic easing
  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      const remaining = 100 - current;
      // Smooth deceleration near the end
      const step = Math.max(1, Math.floor(remaining * 0.08) + Math.floor(Math.random() * 3));
      current = Math.min(100, current + step);
      setProgress(current);

      if (current >= 100) {
        clearInterval(interval);
      }
    }, 45);

    return () => clearInterval(interval);
  }, []);

  // Enter room action with warp animation
  const handleEnter = useCallback((e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (isEntering) return;
    setIsEntering(true);
    setTimeout(() => {
      onComplete();
    }, 850);
  }, [isEntering, onComplete]);

  // Keyboard shortcut: Press Enter or Space to enter when ready
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.code === "Enter" || e.code === "Space") && isReady && !isEntering) {
        e.preventDefault();
        handleEnter();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isReady, isEntering, handleEnter]);

  // Full-screen Three.js Holographic Blueprint & Particle Galaxy Scene
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const width = window.innerWidth;
    const height = window.innerHeight;
    // Mobile optimization: Skip heavy WebGL setup on small screens
    if (width < 768) return;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2("#050811", 0.035);

    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
    camera.position.set(0, 2.2, 8.5);
    camera.lookAt(0, 0.5, 0);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Group for the 3D Holographic Room Model
    const roomBlueprintGroup = new THREE.Group();
    scene.add(roomBlueprintGroup);

    // 1. Cyber Grid Floor
    const gridHelper = new THREE.GridHelper(36, 36, 0x6366f1, 0x1e2238);
    gridHelper.position.y = -2.2;
    scene.add(gridHelper);

    // 2. Blueprint Room Outer Bounds (Wireframe Box)
    const roomBoxGeo = new THREE.BoxGeometry(6.5, 4.2, 5.5);
    const roomBoxEdges = new THREE.EdgesGeometry(roomBoxGeo);
    const roomBoxMat = new THREE.LineBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.45,
    });
    const roomBox = new THREE.LineSegments(roomBoxEdges, roomBoxMat);
    roomBox.position.y = 0;
    roomBlueprintGroup.add(roomBox);

    // 3. Desk Wireframe
    const deskGeo = new THREE.BoxGeometry(3.0, 1.2, 1.4);
    const deskEdges = new THREE.EdgesGeometry(deskGeo);
    const deskMat = new THREE.LineBasicMaterial({
      color: 0x818cf8,
      transparent: true,
      opacity: 0.6,
    });
    const deskWire = new THREE.LineSegments(deskEdges, deskMat);
    deskWire.position.set(0, -1.4, -1.6);
    roomBlueprintGroup.add(deskWire);

    // 4. Dual Monitors Wireframe
    const mon1Geo = new THREE.BoxGeometry(1.2, 0.7, 0.05);
    const monEdges = new THREE.EdgesGeometry(mon1Geo);
    const monMat = new THREE.LineBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.85,
    });

    const mon1 = new THREE.LineSegments(monEdges, monMat);
    mon1.position.set(-0.7, -0.4, -1.6);
    mon1.rotation.y = 0.15;
    roomBlueprintGroup.add(mon1);

    const mon2 = new THREE.LineSegments(monEdges, monMat);
    mon2.position.set(0.7, -0.4, -1.6);
    mon2.rotation.y = -0.15;
    roomBlueprintGroup.add(mon2);

    // 5. Bed Wireframe
    const bedGeo = new THREE.BoxGeometry(2.0, 0.8, 3.2);
    const bedEdges = new THREE.EdgesGeometry(bedGeo);
    const bedMat = new THREE.LineBasicMaterial({
      color: 0xa855f7,
      transparent: true,
      opacity: 0.5,
    });
    const bedWire = new THREE.LineSegments(bedEdges, bedMat);
    bedWire.position.set(-2.0, -1.6, 0.8);
    roomBlueprintGroup.add(bedWire);

    // 6. Central Glowing Crystalline Core
    const coreGeo = new THREE.IcosahedronGeometry(0.75, 1);
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      wireframe: true,
      transparent: true,
      opacity: 0.7,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    coreMesh.position.set(0, 0.3, 0);
    roomBlueprintGroup.add(coreMesh);

    // 7. Concentric Holographic Rings around the Core
    const ringGeo1 = new THREE.TorusGeometry(1.3, 0.015, 16, 64);
    const ringMat1 = new THREE.MeshBasicMaterial({
      color: 0x6366f1,
      transparent: true,
      opacity: 0.6,
    });
    const ring1 = new THREE.Mesh(ringGeo1, ringMat1);
    ring1.position.copy(coreMesh.position);
    roomBlueprintGroup.add(ring1);

    const ringGeo2 = new THREE.TorusGeometry(1.7, 0.015, 16, 64);
    const ringMat2 = new THREE.MeshBasicMaterial({
      color: 0xa855f7,
      transparent: true,
      opacity: 0.45,
    });
    const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
    ring2.position.copy(coreMesh.position);
    ring2.rotation.x = Math.PI / 3;
    roomBlueprintGroup.add(ring2);

    // 8. Drifting Particle Galaxy (500 Star Motes)
    const particleCount = 500;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);

    const palette = [
      new THREE.Color("#38bdf8"),
      new THREE.Color("#818cf8"),
      new THREE.Color("#c084fc"),
      new THREE.Color("#34d399"),
    ];

    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 24;
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 14;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 20;

      const c = palette[Math.floor(Math.random() * palette.length)];
      particleColors[i * 3] = c.r;
      particleColors[i * 3 + 1] = c.g;
      particleColors[i * 3 + 2] = c.b;
    }

    particleGeo.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));
    particleGeo.setAttribute("color", new THREE.BufferAttribute(particleColors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.07,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    });
    const particleSystem = new THREE.Points(particleGeo, particleMat);
    scene.add(particleSystem);

    // Mouse Parallax Interaction Variables
    let mouseX = 0;
    let mouseY = 0;
    let targetRotX = 0;
    let targetRotY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const normX = (e.clientX / window.innerWidth) * 2 - 1;
      const normY = -(e.clientY / window.innerHeight) * 2 + 1;
      mouseX = normX * 0.4;
      mouseY = normY * 0.3;
    };
    window.addEventListener("mousemove", handleMouseMove);

    // Window Resize Handler
    const handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    // Animation Render Loop
    let animationFrameId: number;
    let lastTime = performance.now();
    let warpSpeed = 1.0;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const now = performance.now();
      const delta = (now - lastTime) / 1000;
      lastTime = now;

      // Mouse Parallax Easing
      targetRotX += (mouseY - targetRotX) * 0.05;
      targetRotY += (mouseX - targetRotY) * 0.05;

      // Rotate Blueprint Group
      roomBlueprintGroup.rotation.y = 0.25 * Math.sin(now * 0.0004) + targetRotY;
      roomBlueprintGroup.rotation.x = 0.12 * Math.cos(now * 0.0003) + targetRotX;

      // Core & Ring Rotations
      coreMesh.rotation.x += delta * 0.6;
      coreMesh.rotation.y += delta * 0.8;
      ring1.rotation.z += delta * 0.7;
      ring2.rotation.y += delta * 0.5;

      // Particle Drift
      particleSystem.rotation.y += delta * 0.03 * warpSpeed;

      // Warp speed acceleration when entering room
      if (isEntering) {
        warpSpeed = Math.min(20, warpSpeed + delta * 30);
        camera.position.z -= delta * 9.5;
        camera.fov = Math.min(85, camera.fov + delta * 25);
        camera.updateProjectionMatrix();
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      particleGeo.dispose();
      particleMat.dispose();
    };
  }, [isEntering]);

  return (
    <div
      className={`hidden md:flex fixed inset-0 z-50 flex-col justify-between overflow-hidden bg-[#050811] text-white transition-all duration-700 select-none ${
        isEntering ? "opacity-0 scale-105 pointer-events-auto" : "opacity-100 scale-100"
      }`}
    >
      {/* Three.js Interactive Holographic 3D Background */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block pointer-events-none" />

      {/* Cybernetic Radial Vignette & Grid Backdrop */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(5,8,17,0.85)_100%)] pointer-events-none" />
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      {/* TOP BAR: Brandmark, Live Status, Telemetry & Segmented Language Switcher */}
      <header className="relative z-20 flex items-center justify-between px-6 sm:px-10 py-6">
        {/* Left: Brand Identity & Live Diagnostics */}
        <div className="flex items-center gap-4">
          <div className="flex items-center justify-center w-10 h-10 rounded-2xl bg-gradient-to-br from-primary-500/30 to-accent-500/30 border border-white/20 backdrop-blur-xl shadow-lg shadow-primary-500/20 font-black text-sm tracking-wider text-white">
            MFR
          </div>
          <div className="hidden sm:flex flex-col">
            <span className="text-xs font-bold text-white tracking-wider uppercase">
              Muhammad Fatih Rahman
            </span>
            <div className="flex items-center gap-2 text-[11px] font-mono text-surface-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>SYSTEM READY</span>
              <span>•</span>
              <span className="text-primary-300">{currentTime || "ONLINE"}</span>
            </div>
          </div>
        </div>

        {/* Right: Segmented Language Switcher & Classic Mode Direct Link */}
        <div className="flex items-center gap-3">
          {onOpenClassic && (
            <button
              onClick={onOpenClassic}
              className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-surface-900/60 hover:bg-surface-800/80 backdrop-blur-md border border-white/10 text-xs font-medium text-surface-300 hover:text-white transition-all cursor-pointer"
              title={isId ? "Lihat versi website klasik tanpa 3D" : "View classic 2D website"}
            >
              <span>📄</span>
              <span>{isId ? "Mode Web 2D" : "Classic 2D"}</span>
            </button>
          )}

          {/* Segmented [ 🇮🇩 ID | 🇬🇧 EN ] Language Switcher */}
          <div className="flex items-center p-1 rounded-2xl bg-surface-950/80 backdrop-blur-xl border border-white/15 shadow-xl">
            <button
              onClick={() => !isId && onToggleLanguage()}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer ${
                isId
                  ? "bg-gradient-to-r from-primary-600 to-indigo-600 text-white shadow-md shadow-primary-600/40"
                  : "text-surface-400 hover:text-white"
              }`}
              title="Gunakan Bahasa Indonesia"
            >
              <span>🇮🇩</span>
              <span>ID</span>
            </button>
            <button
              onClick={() => isId && onToggleLanguage()}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer ${
                !isId
                  ? "bg-gradient-to-r from-primary-600 to-indigo-600 text-white shadow-md shadow-primary-600/40"
                  : "text-surface-400 hover:text-white"
              }`}
              title="Switch to English"
            >
              <span>🇬🇧</span>
              <span>EN</span>
            </button>
          </div>
        </div>
      </header>

      {/* CENTER: Futuristic Cyber HUD Hero Card */}
      <main className="relative z-10 flex flex-col items-center justify-center px-4 sm:px-6 my-auto">
        <div className="w-full max-w-2xl p-6 sm:p-10 rounded-3xl bg-surface-950/70 backdrop-blur-2xl border border-white/10 shadow-[0_0_100px_rgba(99,102,241,0.2)] text-center relative overflow-hidden">
          {/* Subtle Top Accent Glow Line */}
          <div className="absolute top-0 left-1/4 right-1/4 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-80" />

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-500/10 border border-primary-500/30 text-primary-300 text-xs font-mono tracking-widest uppercase mb-5 shadow-inner">
            <span className="w-2 h-2 rounded-full bg-primary-400 animate-ping" />
            <span>{isId ? "PORTFOLIO 3D VIRTUAL EXPERIENCE" : "INTERACTIVE 3D VIRTUAL SUITE"}</span>
          </div>

          {/* User Authentic Name */}
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight text-white mb-2 leading-tight">
            <span className="bg-gradient-to-r from-white via-primary-200 to-accent-300 bg-clip-text text-transparent">
              MUHAMMAD FATIH RAHMAN
            </span>
          </h1>

          {/* Subtitle / Role & University */}
          <p className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-surface-300/90 font-mono mb-4">
            Full-Stack & Mobile Developer <span className="text-primary-400">•</span> Telkom University Jakarta
          </p>

          {/* Intro Description */}
          <p className="text-xs sm:text-sm text-surface-300/80 max-w-lg mx-auto mb-6 leading-relaxed">
            {isId
              ? "Masuki ruang kerja virtual interaktif berbasis WebGL 3D. Jelajahi karya teruji, keahlian arsitektur kode, dan rekam jejak teknologi langsung dari sudut pandang nyata."
              : "Step into an interactive 3D WebGL virtual workstation. Explore production projects, clean architecture practices, and tech journey from an authentic first-person perspective."}
          </p>

          {/* 3 Feature Teaser Chips */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mb-7 text-left">
            <div className="p-3 rounded-2xl bg-surface-900/60 border border-white/5 backdrop-blur-md">
              <div className="flex items-center gap-2 text-xs font-bold text-white mb-1">
                <span>🎮</span>
                <span>{isId ? "Navigasi WASD" : "WASD Controls"}</span>
              </div>
              <p className="text-[11px] text-surface-400 leading-snug">
                {isId ? "Jalan bebas & arahkan kursor kamera POV." : "Free walk & first-person camera pan."}
              </p>
            </div>

            <div className="p-3 rounded-2xl bg-surface-900/60 border border-white/5 backdrop-blur-md">
              <div className="flex items-center gap-2 text-xs font-bold text-white mb-1">
                <span>☀️</span>
                <span>{isId ? "Cuaca & Lampu" : "Real-Time Sun"}</span>
              </div>
              <p className="text-[11px] text-surface-400 leading-snug">
                {isId ? "Sinkron jam lokal & saklar lampu kamar." : "Syncs local hours & toggleable lamps."}
              </p>
            </div>

            <div className="p-3 rounded-2xl bg-surface-900/60 border border-white/5 backdrop-blur-md">
              <div className="flex items-center gap-2 text-xs font-bold text-white mb-1">
                <span>💻</span>
                <span>{isId ? "7+ Showcase" : "7+ Projects"}</span>
              </div>
              <p className="text-[11px] text-surface-400 leading-snug">
                {isId ? "Klik objek 3D untuk detail interaktif." : "Click 3D props for live modal inspection."}
              </p>
            </div>
          </div>

          {/* Telemetry Terminal Line */}
          <div className="w-full p-2.5 rounded-xl bg-black/60 border border-white/10 font-mono text-left text-xs mb-6 flex items-center justify-between">
            <div className="flex items-center gap-2 truncate pr-2">
              <span className="text-primary-400 font-bold">&gt;</span>
              <span className="text-surface-300 truncate">{telemetryMessage}</span>
            </div>
            <span className="text-accent-300 font-bold shrink-0">{progress}%</span>
          </div>

          {/* High-Tech Glowing Progress Bar */}
          <div className="relative w-full bg-surface-900/90 rounded-full h-3 p-0.5 border border-white/15 mb-6 overflow-hidden shadow-inner">
            <div
              className="h-full rounded-full bg-gradient-to-r from-primary-500 via-indigo-500 to-accent-400 transition-all duration-150 ease-out shadow-[0_0_20px_rgba(56,189,248,0.7)]"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Action CTA Area */}
          <div className="flex flex-col items-center justify-center gap-3">
            {isReady ? (
              <div className="flex flex-col items-center gap-3 w-full animate-fade-in">
                <button
                  onClick={handleEnter}
                  disabled={isEntering}
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-primary-600 via-indigo-600 to-accent-500 hover:from-primary-500 hover:to-accent-400 text-white font-extrabold text-base sm:text-lg shadow-[0_0_40px_rgba(99,102,241,0.5)] hover:shadow-[0_0_60px_rgba(99,102,241,0.8)] transition-all duration-300 transform hover:scale-[1.03] active:scale-95 cursor-pointer flex items-center justify-center gap-3 border border-white/20 group"
                >
                  <span>{isId ? "Jelajahi Ruangan 3D Sekarang" : "Enter 3D Room Experience"}</span>
                  <span className="text-xl group-hover:translate-x-1 transition-transform">🚀</span>
                </button>
                <p className="text-xs text-surface-400 font-mono flex items-center gap-1.5">
                  <span>💡</span>
                  <span>
                    {isId
                      ? "Tekan tombol atau tekan [Enter / Spasi] pada keyboard"
                      : "Click button or press [Enter / Space] on keyboard"}
                  </span>
                </p>
              </div>
            ) : (
              <div className="flex items-center gap-3 text-xs font-mono text-surface-400 py-2">
                <div className="w-4 h-4 border-2 border-primary-400 border-t-transparent rounded-full animate-spin" />
                <span>
                  {isId
                    ? "Menyiapkan aset 3D & tekstur fotorealistik..."
                    : "Preparing 3D assets & photorealistic shaders..."}
                </span>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* FOOTER: System Tech Stack Specs & University Accreditation */}
      <footer className="relative z-20 flex flex-col sm:flex-row items-center justify-between px-6 sm:px-10 py-5 text-[11px] font-mono text-surface-400 border-t border-white/5 backdrop-blur-md bg-surface-950/40 gap-2">
        <div className="flex items-center gap-2">
          <span>Sistem Informasi • Telkom University Jakarta</span>
        </div>
        <div className="flex items-center gap-3 text-surface-500">
          <span>Three.js WebGL</span>
          <span>•</span>
          <span>Next.js 15 (Turbopack)</span>
          <span>•</span>
          <span>Tailwind CSS</span>
          <span>•</span>
          <span>TypeScript</span>
        </div>
        <div className="text-surface-400">
          © {new Date().getFullYear()} Muhammad Fatih Rahman
        </div>
      </footer>
    </div>
  );
}

"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import {
  createParquetFloorTextures,
  createCarpetTexture,
  createAcousticSlatsTexture,
  createSkyTexture,
  createWhiteboardTexture,
  createDigitalClockTexture,
  createSoftParticleTexture,
} from "./roomTextures";

export type SectionType = "projects" | "about" | "skills" | "contact" | "light" | null;

interface RoomCanvasProps {
  activeSection: SectionType;
  onSelectSection: (section: SectionType) => void;
  language: "id" | "en";
  resetTrigger?: number;
  timeOfDay: "day" | "night";
  onToggleTimeOfDay: () => void;
  isLightOn: boolean;
  onToggleLight: () => void;
  isPreloading?: boolean;
}

interface HoverInfo {
  section: SectionType;
  title: string;
  subtitle: string;
  icon: string;
  x: number;
  y: number;
}

// Natural Standing Adult Eye-Level Position inside the room (realistic height)
const STANDING_EYE_HEIGHT = 2.85;
const DEFAULT_CAM_POS = new THREE.Vector3(0.0, STANDING_EYE_HEIGHT, 1.2);
const DEFAULT_LOOK_AT = new THREE.Vector3(-0.5, STANDING_EYE_HEIGHT - 0.35, -2.2);

// Close-up camera positions when focusing on specific furniture
const SECTION_CAMERAS: Record<
  "projects" | "about" | "skills" | "contact",
  { pos: THREE.Vector3; look: THREE.Vector3 }
> = {
  projects: {
    // Sitting directly in front of the workstation PC desk & ultrawide monitor
    pos: new THREE.Vector3(-1.8, 2.15, -1.0),
    look: new THREE.Vector3(-1.8, 2.15, -2.6),
  },
  about: {
    // Standing beside the cozy bed looking down comfortably
    pos: new THREE.Vector3(0.8, 2.45, 1.4),
    look: new THREE.Vector3(2.4, 1.1, 1.8),
  },
  skills: {
    // Standing directly in front of the tech whiteboard & bookshelf
    pos: new THREE.Vector3(1.6, 2.6, -1.8),
    look: new THREE.Vector3(1.8, 2.5, -4.9),
  },
  contact: {
    // Standing directly in front of the door & console table smartphone
    pos: new THREE.Vector3(-2.4, 2.75, 2.0),
    look: new THREE.Vector3(-4.0, 2.3, 3.0),
  },
};

// Section meta info for hover tooltip
const SECTION_META: Record<
  "projects" | "about" | "skills" | "contact" | "light",
  { idTitle: string; idSub: string; enTitle: string; enSub: string; icon: string }
> = {
  projects: {
    idTitle: "Meja Kerja & Workstation",
    idSub: "7 Proyek Unggulan, Demo & Studi Kasus",
    enTitle: "Developer Workstation",
    enSub: "7 Featured Projects & Case Studies",
    icon: "💻",
  },
  about: {
    idTitle: "Area Kasur & Relaksasi",
    idSub: "Biografi, 2+ Tahun Pengalaman & Latar Belakang",
    enTitle: "Lounge & Profile Space",
    enSub: "Bio, 2+ Years Experience & Background",
    icon: "🛏️",
  },
  skills: {
    idTitle: "Rak Buku & Whiteboard",
    idSub: "Tech Stack, Clean Architecture & Alat",
    enTitle: "Tech Bookshelf & Board",
    enSub: "Tech Stacks, Architecture & Tooling",
    icon: "📚",
  },
  contact: {
    idTitle: "Pintu Kamar & Hub Komunikasi",
    idSub: "Kirim Pesan, WhatsApp, Email & Jejaring",
    enTitle: "Room Gateway & Phone",
    enSub: "Direct WhatsApp, Email & Collaboration",
    icon: "🚪",
  },
  light: {
    idTitle: "Sakelar Lampu Ruangan",
    idSub: "Klik untuk menyalakan atau mematikan lampu",
    enTitle: "Room Light Switch",
    enSub: "Click to toggle room lights ON / OFF",
    icon: "💡",
  },
};

export default function RoomCanvas({
  activeSection,
  onSelectSection,
  language,
  resetTrigger,
  timeOfDay,
  isLightOn,
  onToggleLight,
  isPreloading,
}: RoomCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredSection, setHoveredSection] = useState<HoverInfo | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const isPreloadingRef = useRef(Boolean(isPreloading));
  const clickIgnoreUntilRef = useRef(0);

  const onSelectSectionRef = useRef(onSelectSection);
  const onToggleLightRef = useRef(onToggleLight);
  const languageRef = useRef(language);
  const activeSectionRef = useRef(activeSection);

  useEffect(() => {
    onSelectSectionRef.current = onSelectSection;
    onToggleLightRef.current = onToggleLight;
    languageRef.current = language;
    activeSectionRef.current = activeSection;
  }, [onSelectSection, onToggleLight, language, activeSection]);

  useEffect(() => {
    isPreloadingRef.current = Boolean(isPreloading);
    if (!isPreloading) {
      clickIgnoreUntilRef.current = Date.now() + 1000;
      const timer = setTimeout(() => {
        setHoveredSection(null);
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [isPreloading]);

  // References for Three.js instance
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const interactiveObjectsRef = useRef<THREE.Group[]>([]);

  // Dynamic light & sky references for live updates
  const ambientLightRef = useRef<THREE.AmbientLight | null>(null);
  const hemiLightRef = useRef<THREE.HemisphereLight | null>(null);
  const ceilingLightRef = useRef<THREE.PointLight | null>(null);
  const deskLightRef = useRef<THREE.PointLight | null>(null);
  const bedLightRef = useRef<THREE.PointLight | null>(null);
  const windowSunLightRef = useRef<THREE.DirectionalLight | null>(null);
  const sunFillLightRef = useRef<THREE.PointLight | null>(null);
  const skyMeshRef = useRef<THREE.Mesh | null>(null);
  const sunMeshRef = useRef<THREE.Group | null>(null);
  const moonMeshRef = useRef<THREE.Group | null>(null);
  const starsRef = useRef<THREE.Points | null>(null);
  const cloudsRef = useRef<THREE.Group | null>(null);
  const ceilingBulbRef = useRef<THREE.Mesh | null>(null);
  const deskBulbRef = useRef<THREE.Mesh | null>(null);
  const clockMeshRef = useRef<THREE.Mesh | null>(null);

  // Camera animation targets & walking position
  const targetCameraPos = useRef<THREE.Vector3>(DEFAULT_CAM_POS.clone());
  const targetLookAt = useRef<THREE.Vector3>(DEFAULT_LOOK_AT.clone());

  // First-person POV mouse-look tracking
  const targetPovOffset = useRef({ x: 0, y: 0 });
  const currentPovOffset = useRef({ x: 0, y: 0 });
  const dragRotation = useRef({ yaw: 0, pitch: 0 });
  const isDraggingRef = useRef(false);
  const lastPointerPos = useRef({ x: 0, y: 0 });
  const hasDraggedRef = useRef(false);
  const isPointerDownOnCanvas = useRef(false);
  const pointerDownPos = useRef({ x: 0, y: 0 });

  // WASD Walking controls state
  const keysPressed = useRef<{ [key: string]: boolean }>({});
  const headBobTimer = useRef(0);

  // Update camera target when activeSection changes
  useEffect(() => {
    if (activeSection && activeSection !== "light" && SECTION_CAMERAS[activeSection]) {
      targetCameraPos.current.copy(SECTION_CAMERAS[activeSection].pos);
      targetLookAt.current.copy(SECTION_CAMERAS[activeSection].look);
    } else {
      targetCameraPos.current.copy(DEFAULT_CAM_POS);
      targetLookAt.current.copy(DEFAULT_LOOK_AT);
      dragRotation.current = { yaw: 0, pitch: 0 };
    }
  }, [activeSection]);

  // Handle explicit reset button trigger
  useEffect(() => {
    if (resetTrigger && resetTrigger > 0) {
      targetCameraPos.current.copy(DEFAULT_CAM_POS);
      targetLookAt.current.copy(DEFAULT_LOOK_AT);
      dragRotation.current = { yaw: 0, pitch: 0 };
      targetPovOffset.current = { x: 0, y: 0 };
    }
  }, [resetTrigger]);

  // Keyboard WASD event listeners
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept if user is typing in form inputs
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }
      keysPressed.current[e.key.toLowerCase()] = true;
      keysPressed.current[e.code.toLowerCase()] = true;
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      keysPressed.current[e.key.toLowerCase()] = false;
      keysPressed.current[e.code.toLowerCase()] = false;
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  // Handle Day/Night & Light Toggle dynamically
  useEffect(() => {
    const isDay = timeOfDay === "day";

    if (sunMeshRef.current) sunMeshRef.current.visible = isDay;
    if (cloudsRef.current) cloudsRef.current.visible = isDay;
    if (moonMeshRef.current) moonMeshRef.current.visible = !isDay;
    if (starsRef.current) starsRef.current.visible = !isDay;

    if (skyMeshRef.current) {
      const mat = skyMeshRef.current.material as THREE.MeshBasicMaterial;
      mat.map?.dispose();
      mat.map = createSkyTexture(isDay);
      mat.needsUpdate = true;
    }

    if (windowSunLightRef.current) {
      if (isDay) {
        windowSunLightRef.current.color.set("#fff7ed");
        windowSunLightRef.current.intensity = 5.5;
      } else {
        windowSunLightRef.current.color.set("#93c5fd");
        windowSunLightRef.current.intensity = 1.8;
      }
    }

    if (sunFillLightRef.current) {
      sunFillLightRef.current.color.set(isDay ? "#fed7aa" : "#60a5fa");
      sunFillLightRef.current.intensity = isDay ? 3.5 : 0.8;
    }

    if (hemiLightRef.current) {
      hemiLightRef.current.color.set(isDay ? "#ffffff" : "#818cf8");
      hemiLightRef.current.groundColor.set("#334155");
      hemiLightRef.current.intensity = isLightOn ? (isDay ? 2.4 : 1.9) : (isDay ? 1.5 : 0.9);
    }

    if (ambientLightRef.current) {
      if (isLightOn) {
        ambientLightRef.current.color.set(isDay ? "#f8fafc" : "#fef3c7");
        ambientLightRef.current.intensity = isDay ? 3.0 : 2.4;
      } else {
        ambientLightRef.current.color.set(isDay ? "#cbd5e1" : "#1e293b");
        ambientLightRef.current.intensity = isDay ? 1.8 : 0.85;
      }
    }

    if (ceilingLightRef.current) {
      ceilingLightRef.current.intensity = isLightOn ? 8.5 : 0.0;
    }
    if (ceilingBulbRef.current) {
      const mat = ceilingBulbRef.current.material as THREE.MeshBasicMaterial;
      mat.color.set(isLightOn ? "#fef3c7" : "#334155");
    }

    if (deskLightRef.current) {
      deskLightRef.current.intensity = isLightOn ? 4.5 : 0.0;
    }
    if (deskBulbRef.current) {
      const mat = deskBulbRef.current.material as THREE.MeshBasicMaterial;
      mat.color.set(isLightOn ? "#fbbf24" : "#1f2937");
    }

    if (bedLightRef.current) {
      bedLightRef.current.intensity = isLightOn ? 3.8 : 0.0;
    }

    if (rendererRef.current) {
      rendererRef.current.toneMappingExposure = isLightOn
        ? isDay
          ? 1.55
          : 1.40
        : isDay
        ? 1.30
        : 1.15;
    }
  }, [timeOfDay, isLightOn]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // SCENE SETUP
    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#080c14");
    scene.fog = new THREE.FogExp2("#080c14", 0.008);
    sceneRef.current = scene;

    // CAMERA SETUP (Human Eye Perspective FOV 58)
    const aspect = container.clientWidth / container.clientHeight;
    const camera = new THREE.PerspectiveCamera(58, aspect, 0.1, 100);
    camera.position.copy(DEFAULT_CAM_POS);
    cameraRef.current = camera;

    // RENDERER SETUP (ACES Filmic Tone Mapping, High-resolution Shadows)
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: "high-performance",
      alpha: false,
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // ==========================================
    // PROCEDURAL CODE & METRICS TEXTURES FOR WORKSTATION
    // ==========================================
    const createCodeScreenTexture = () => {
      const canvas = document.createElement("canvas");
      canvas.width = 1024;
      canvas.height = 512;
      const ctx = canvas.getContext("2d")!;
      ctx.fillStyle = "#0d1117";
      ctx.fillRect(0, 0, 1024, 512);

      // VS Code Window Bar
      ctx.fillStyle = "#161b22";
      ctx.fillRect(0, 0, 1024, 48);
      ctx.fillStyle = "#ff5f56";
      ctx.beginPath();
      ctx.arc(28, 24, 7, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#ffbd2e";
      ctx.beginPath();
      ctx.arc(52, 24, 7, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#27c93f";
      ctx.beginPath();
      ctx.arc(76, 24, 7, 0, Math.PI * 2);
      ctx.fill();

      // Tab File Title
      ctx.fillStyle = "#8b949e";
      ctx.font = "bold 16px monospace";
      ctx.fillText("MuhammadFatihRahman.tsx — Full-Stack Portfolio", 110, 31);

      const lines = [
        { text: "import { LeadDeveloper } from '@fatih/profile';", color: "#ff7b72" },
        { text: "import { Flutter, NextJs, Laravel, PostgreSQL } from '@tech/core';", color: "#79c0ff" },
        { text: "", color: "" },
        { text: "export const developer: LeadDeveloper = {", color: "#d2a8ff" },
        { text: "  name: 'Muhammad Fatih Rahman',", color: "#a5d6ff" },
        { text: "  institution: 'Telkom University Jakarta',", color: "#7ee787" },
        { text: "  experience: '2+ Years Production Delivery',", color: "#7ee787" },
        { text: "  featuredProjects: ['HaramainQu', 'TangkapIN', 'Juragan Bakso', 'AI Interview'],", color: "#ffa657" },
        { text: "  architecture: 'Clean Architecture, High-Throughput APIs, Idempotent Payments',", color: "#7ee787" },
        { text: "  mindset: 'Building digital solutions that solve real business bottlenecks',", color: "#ff7b72" },
        { text: "};", color: "#d2a8ff" },
        { text: "", color: "" },
        { text: "export default async function architectSolutions() {", color: "#79c0ff" },
        { text: "  await developer.shipImpactfulApplications();", color: "#56d364" },
        { text: "  console.log('⚡ Ready to collaborate with high-performing engineering teams.');", color: "#8b949e" },
        { text: "}", color: "#79c0ff" },
      ];

      ctx.font = "18px 'Fira Code', monospace";
      lines.forEach((l, idx) => {
        if (!l.text) return;
        ctx.fillStyle = "#30363d";
        ctx.fillText(String(idx + 1).padStart(2, " "), 20, 85 + idx * 26);
        ctx.fillStyle = l.color;
        ctx.fillText(l.text, 65, 85 + idx * 26);
      });

      return new THREE.CanvasTexture(canvas);
    };

    const createDashboardTexture = () => {
      const canvas = document.createElement("canvas");
      canvas.width = 512;
      canvas.height = 1024;
      const ctx = canvas.getContext("2d")!;
      ctx.fillStyle = "#0c1322";
      ctx.fillRect(0, 0, 512, 1024);

      ctx.fillStyle = "#1e293b";
      ctx.fillRect(0, 0, 512, 60);
      ctx.fillStyle = "#38bdf8";
      ctx.font = "bold 22px sans-serif";
      ctx.fillText("SYSTEM TELEMETRY", 28, 40);

      const metrics = [
        { label: "EXPERIENCE", val: "2+ YEARS", color: "#38bdf8" },
        { label: "SYSTEM UPTIME", val: "99.94%", color: "#34d399" },
        { label: "SHIPPED APPS", val: "7 PRODUCTS", color: "#a855f7" },
        { label: "CLEAN ARCHITECTURE", val: "100% MODULAR", color: "#f59e0b" },
      ];

      metrics.forEach((m, idx) => {
        const y = 80 + idx * 105;
        ctx.fillStyle = "#131e33";
        ctx.fillRect(25, y, 462, 85);

        ctx.fillStyle = "#64748b";
        ctx.font = "bold 14px sans-serif";
        ctx.fillText(m.label, 42, y + 32);

        ctx.fillStyle = m.color;
        ctx.font = "bold 26px sans-serif";
        ctx.fillText(m.val, 42, y + 68);
      });

      // Simulated GitHub contribution graph
      ctx.fillStyle = "#1e293b";
      ctx.fillRect(25, 520, 462, 220);
      ctx.fillStyle = "#94a3b8";
      ctx.font = "bold 16px sans-serif";
      ctx.fillText("GIT ACTIVITY HEATMAP", 45, 555);

      const gitColors = ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"];
      for (let row = 0; row < 5; row++) {
        for (let col = 0; col < 18; col++) {
          const cIdx = (row * 3 + col * 7) % gitColors.length;
          ctx.fillStyle = gitColors[cIdx];
          ctx.fillRect(45 + col * 23, 580 + row * 24, 18, 18);
        }
      }

      return new THREE.CanvasTexture(canvas);
    };

    // ==========================================
    // LIGHTING SETUP (Cinematic, High-Contrast & Realistic)
    // ==========================================
    const isDay = timeOfDay === "day";

    // 1. Natural Ambient Fill & Soft Bouncing
    const ambientLight = new THREE.AmbientLight(
      isLightOn ? (isDay ? "#f8fafc" : "#fef3c7") : (isDay ? "#cbd5e1" : "#1e293b"),
      isLightOn ? (isDay ? 3.0 : 2.4) : (isDay ? 1.8 : 0.85)
    );
    scene.add(ambientLight);
    ambientLightRef.current = ambientLight;

    // 1b. Hemisphere Light for Rich Indirect Sky & Floor Bounce (Eliminates Pitch Black Voids!)
    const hemiLight = new THREE.HemisphereLight(
      isDay ? "#ffffff" : "#818cf8",
      "#334155",
      isLightOn ? (isDay ? 2.4 : 1.9) : (isDay ? 1.5 : 0.9)
    );
    scene.add(hemiLight);
    hemiLightRef.current = hemiLight;

    // 2. High-Resolution Directional Sunlight / Moonlight streaming through window
    const windowSunLight = new THREE.DirectionalLight(
      isDay ? "#fff7ed" : "#93c5fd",
      isDay ? 5.5 : 1.8
    );
    windowSunLight.position.set(-10.5, 7.5, -2.5);
    windowSunLight.target.position.set(0.5, 0.5, 0.5);
    windowSunLight.castShadow = true;
    windowSunLight.shadow.mapSize.width = 2048;
    windowSunLight.shadow.mapSize.height = 2048;
    windowSunLight.shadow.camera.near = 1.0;
    windowSunLight.shadow.camera.far = 24.0;
    windowSunLight.shadow.camera.left = -5.0;
    windowSunLight.shadow.camera.right = 5.0;
    windowSunLight.shadow.camera.top = 5.0;
    windowSunLight.shadow.camera.bottom = -5.0;
    windowSunLight.shadow.bias = -0.0003;
    windowSunLight.shadow.normalBias = 0.02;
    scene.add(windowSunLight);
    scene.add(windowSunLight.target);
    windowSunLightRef.current = windowSunLight;

    // 2b. Window Interior Sun Spill Point Light (Floods room with natural daylight from window opening)
    const sunFillLight = new THREE.PointLight(
      isDay ? "#fed7aa" : "#60a5fa",
      isDay ? 3.5 : 0.8,
      12.0,
      1.2
    );
    sunFillLight.position.set(-4.0, 3.2, -1.2);
    scene.add(sunFillLight);
    sunFillLightRef.current = sunFillLight;

    // 3. Ceiling Designer Pendant Lamp (High power to brighten entire room)
    const ceilingLight = new THREE.PointLight(
      "#fef3c7",
      isLightOn ? 8.5 : 0.0,
      18.0,
      1.2
    );
    ceilingLight.position.set(0, 4.25, 0);
    ceilingLight.castShadow = true;
    ceilingLight.shadow.mapSize.width = 1024;
    ceilingLight.shadow.mapSize.height = 1024;
    ceilingLight.shadow.bias = -0.0005;
    scene.add(ceilingLight);
    ceilingLightRef.current = ceilingLight;

    // 4. Desk Lamp with Warm Glow
    const deskLight = new THREE.PointLight(
      "#ffedd5",
      isLightOn ? 4.5 : 0.0,
      7.0,
      1.2
    );
    deskLight.position.set(-1.6, 2.7, -1.8);
    deskLight.castShadow = true;
    deskLight.shadow.mapSize.width = 1024;
    deskLight.shadow.mapSize.height = 1024;
    deskLight.shadow.bias = -0.0003;
    scene.add(deskLight);
    deskLightRef.current = deskLight;

    // 5. Dual Screen Ambient Glow on Desk
    const monitorGlow = new THREE.PointLight("#38bdf8", 3.2, 5.5, 1.8);
    monitorGlow.position.set(-1.8, 2.3, -2.4);
    scene.add(monitorGlow);

    // 6. Bedside Nightstand Warm Lamp
    const bedLamp = new THREE.PointLight(
      "#f59e0b",
      isLightOn ? 3.8 : 0.0,
      7.0,
      1.2
    );
    bedLamp.position.set(3.8, 1.8, 1.0);
    scene.add(bedLamp);
    bedLightRef.current = bedLamp;

    // ==========================================
    // ROOM ARCHITECTURE & REALISTIC MATERIALS
    // ==========================================

    // Realistic Scandinavian Oak Parquet Floor
    const { map: parquetMap, roughnessMap: parquetRoughness } = createParquetFloorTextures();
    const floorGeo = new THREE.BoxGeometry(10.2, 0.4, 10.2);
    const floorMat = new THREE.MeshStandardMaterial({
      map: parquetMap,
      roughnessMap: parquetRoughness,
      roughness: 0.32,
      metalness: 0.04,
    });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.position.set(0, -0.2, 0);
    floor.receiveShadow = true;
    scene.add(floor);

    // Modern Plush Scandinavian Area Rug under Workstation & Bed
    const carpetMat = new THREE.MeshStandardMaterial({
      map: createCarpetTexture(),
      roughness: 0.95,
      metalness: 0.0,
    });
    const carpet = new THREE.Mesh(new THREE.BoxGeometry(5.4, 0.02, 4.6), carpetMat);
    carpet.position.set(0.1, 0.01, -0.5);
    carpet.receiveShadow = true;
    scene.add(carpet);

    // Skirting Boards around room perimeter
    const skirtingMat = new THREE.MeshStandardMaterial({ color: "#182030", roughness: 0.5 });
    const skirting1 = new THREE.Mesh(new THREE.BoxGeometry(10.2, 0.25, 0.15), skirtingMat);
    skirting1.position.set(0, 0.125, -5.02);
    scene.add(skirting1);
    const skirting2 = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.25, 10.2), skirtingMat);
    skirting2.position.set(-5.02, 0.125, 0);
    scene.add(skirting2);

    // Room Walls (Modern Architectural Slate - Warm & Reflective instead of Pitch Black)
    const wallMat = new THREE.MeshStandardMaterial({
      color: "#283548",
      roughness: 0.72,
      metalness: 0.05,
    });
    const backWall = new THREE.Mesh(new THREE.BoxGeometry(10.2, 5.5, 0.3), wallMat);
    backWall.position.set(0, 2.75, -5.15);
    backWall.receiveShadow = true;
    scene.add(backWall);

    // Left Wall with Architectural Window Cutout Opening (Opening: Y: 1.85-4.55, Z: -3.1 to 0.7)
    // 1. Bottom section under window
    const leftWallBottom = new THREE.Mesh(new THREE.BoxGeometry(0.3, 1.85, 10.2), wallMat);
    leftWallBottom.position.set(-5.15, 0.925, 0);
    leftWallBottom.receiveShadow = true;
    scene.add(leftWallBottom);

    // 2. Top lintel section above window
    const leftWallTop = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.95, 10.2), wallMat);
    leftWallTop.position.set(-5.15, 5.025, 0);
    leftWallTop.receiveShadow = true;
    scene.add(leftWallTop);

    // 3. Back section behind window (toward back wall)
    const leftWallBack = new THREE.Mesh(new THREE.BoxGeometry(0.3, 2.7, 2.0), wallMat);
    leftWallBack.position.set(-5.15, 3.2, -4.1);
    leftWallBack.receiveShadow = true;
    scene.add(leftWallBack);

    // 4. Front section in front of window (toward front wall)
    const leftWallFront = new THREE.Mesh(new THREE.BoxGeometry(0.3, 2.7, 4.4), wallMat);
    leftWallFront.position.set(-5.15, 3.2, 2.9);
    leftWallFront.receiveShadow = true;
    scene.add(leftWallFront);

    const rightWall = new THREE.Mesh(new THREE.BoxGeometry(0.3, 5.5, 10.2), wallMat);
    rightWall.position.set(5.15, 2.75, 0);
    rightWall.receiveShadow = true;
    scene.add(rightWall);

    const frontWall = new THREE.Mesh(new THREE.BoxGeometry(10.2, 5.5, 0.3), wallMat);
    frontWall.position.set(0, 2.75, 5.15);
    scene.add(frontWall);

    // Room Ceiling with Cornice Molding
    const ceiling = new THREE.Mesh(
      new THREE.BoxGeometry(10.4, 0.3, 10.4),
      new THREE.MeshStandardMaterial({ color: "#1e293b", roughness: 0.85 })
    );
    ceiling.position.set(0, 5.3, 0);
    scene.add(ceiling);

    // Feature Accent Wall: Acoustic Wood Fluted Slats behind Desk
    const slatsMat = new THREE.MeshStandardMaterial({
      map: createAcousticSlatsTexture(),
      roughness: 0.55,
      metalness: 0.05,
    });
    const acousticWall = new THREE.Mesh(new THREE.BoxGeometry(5.0, 5.2, 0.05), slatsMat);
    acousticWall.position.set(-1.8, 2.6, -4.98);
    acousticWall.receiveShadow = true;
    scene.add(acousticWall);

    // Hidden LED backlight strip behind desk washing up the wood slats
    const deskLedStrip = new THREE.PointLight("#f59e0b", isLightOn ? 2.5 : 0.4, 4.8);
    deskLedStrip.position.set(-1.8, 1.6, -2.6);
    scene.add(deskLedStrip);

    // Designer Ceiling Pendant Lamp
    const ceilingLampGroup = new THREE.Group();
    ceilingLampGroup.position.set(0, 4.3, 0);
    ceilingLampGroup.userData = { section: "light", name: "Ceiling Lamp" };

    const lampCord = new THREE.Mesh(
      new THREE.CylinderGeometry(0.015, 0.015, 0.9, 12),
      new THREE.MeshStandardMaterial({ color: "#0f172a" })
    );
    lampCord.position.set(0, 0.45, 0);
    ceilingLampGroup.add(lampCord);

    const lampShade = new THREE.Mesh(
      new THREE.ConeGeometry(0.45, 0.35, 24, 1, true),
      new THREE.MeshStandardMaterial({ color: "#1e293b", roughness: 0.3, metalness: 0.7 })
    );
    lampShade.position.set(0, 0.05, 0);
    ceilingLampGroup.add(lampShade);

    const lampBulbCenter = new THREE.Mesh(
      new THREE.SphereGeometry(0.12, 16, 16),
      new THREE.MeshBasicMaterial({ color: isLightOn ? "#fef3c7" : "#334155" })
    );
    lampBulbCenter.position.set(0, -0.05, 0);
    ceilingBulbRef.current = lampBulbCenter;
    ceilingLampGroup.add(lampBulbCenter);

    scene.add(ceilingLampGroup);

    // ==========================================
    // WINDOW, VENETIAN BLINDS & DYNAMIC SKY
    // ==========================================
    const windowFrameMat = new THREE.MeshStandardMaterial({ color: "#1e293b", roughness: 0.3, metalness: 0.2 });
    const windowGlassMat = new THREE.MeshBasicMaterial({
      color: isDay ? "#bae6fd" : "#38bdf8",
      transparent: true,
      opacity: 0.12,
      depthWrite: false,
    });

    const windowGroup = new THREE.Group();
    windowGroup.position.set(-4.95, 3.2, -1.2);

    const windowGlass = new THREE.Mesh(new THREE.PlaneGeometry(3.6, 2.6), windowGlassMat);
    windowGlass.rotation.y = Math.PI / 2;
    windowGroup.add(windowGlass);

    // Window Frames
    const frameTop = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.15, 3.8), windowFrameMat);
    frameTop.position.set(0, 1.35, 0);
    windowGroup.add(frameTop);
    const frameBottom = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.15, 3.8), windowFrameMat);
    frameBottom.position.set(0, -1.35, 0);
    windowGroup.add(frameBottom);
    const frameMullion = new THREE.Mesh(new THREE.BoxGeometry(0.08, 2.6, 0.08), windowFrameMat);
    windowGroup.add(frameMullion);

    // Window Sill
    const sill = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.08, 4.0), windowFrameMat);
    sill.position.set(0.12, -1.38, 0);
    windowGroup.add(sill);

    // Potted Succulent Plant on Window Sill
    const plantGroup = new THREE.Group();
    plantGroup.position.set(0.12, -1.3, 1.2);
    const pot = new THREE.Mesh(
      new THREE.CylinderGeometry(0.12, 0.09, 0.18, 16),
      new THREE.MeshStandardMaterial({ color: "#f8fafc", roughness: 0.3 })
    );
    pot.castShadow = true;
    plantGroup.add(pot);

    const plantGreen = new THREE.MeshStandardMaterial({ color: "#10b981", roughness: 0.7 });
    for (let p = 0; p < 5; p++) {
      const angle = (p * Math.PI * 2) / 5;
      const leaf = new THREE.Mesh(new THREE.ConeGeometry(0.06, 0.22, 8), plantGreen);
      leaf.position.set(Math.sin(angle) * 0.05, 0.14, Math.cos(angle) * 0.05);
      leaf.rotation.z = Math.sin(angle) * 0.35;
      leaf.rotation.x = Math.cos(angle) * 0.35;
      leaf.castShadow = true;
      plantGroup.add(leaf);
    }
    windowGroup.add(plantGroup);

    // 14 Horizontal Venetian Blind Slats (Level and horizontal, rotating around Z to angle the blades open)
    const blindMat = new THREE.MeshStandardMaterial({ color: "#334155", roughness: 0.5 });
    for (let s = 0; s < 14; s++) {
      const slatY = -1.15 + s * 0.18;
      const slat = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.015, 3.6), blindMat);
      slat.position.set(0.04, slatY, 0);
      slat.rotation.z = 0.25; // Rotates blade around Z axis (stays 100% level & horizontal along window!)
      slat.castShadow = true;
      windowGroup.add(slat);
    }

    // Vertical String Ladder Cords
    const cordMat = new THREE.MeshBasicMaterial({ color: "#64748b" });
    const cord1 = new THREE.Mesh(new THREE.CylinderGeometry(0.003, 0.003, 2.5, 8), cordMat);
    cord1.position.set(0.04, 0, -1.2);
    windowGroup.add(cord1);
    const cord2 = new THREE.Mesh(new THREE.CylinderGeometry(0.003, 0.003, 2.5, 8), cordMat);
    cord2.position.set(0.04, 0, 1.2);
    windowGroup.add(cord2);

    scene.add(windowGroup);

    // Curved Panoramic Sky Backdrop Plane (Placed right outside the window cutout opening)
    const skyGeo = new THREE.PlaneGeometry(28, 18);
    const skyMat = new THREE.MeshBasicMaterial({
      map: createSkyTexture(isDay),
      side: THREE.DoubleSide,
      fog: false,
    });
    const skyMesh = new THREE.Mesh(skyGeo, skyMat);
    skyMesh.position.set(-8.8, 3.6, -1.2);
    skyMesh.rotation.y = Math.PI / 2;
    scene.add(skyMesh);
    skyMeshRef.current = skyMesh;

    // Glowing Sun Disc with Atmospheric Corona
    const sunGroup = new THREE.Group();
    sunGroup.position.set(-8.2, 5.4, -2.2);
    const sunCore = new THREE.Mesh(
      new THREE.SphereGeometry(1.2, 32, 32),
      new THREE.MeshBasicMaterial({ color: "#fef08a", fog: false })
    );
    sunGroup.add(sunCore);
    const sunHalo = new THREE.Mesh(
      new THREE.SphereGeometry(2.0, 16, 16),
      new THREE.MeshBasicMaterial({ color: "#f59e0b", transparent: true, opacity: 0.35, fog: false })
    );
    sunGroup.add(sunHalo);
    sunGroup.visible = isDay;
    scene.add(sunGroup);
    sunMeshRef.current = sunGroup;

    // Drifting 3D Puffy Clouds
    const cloudsGroup = new THREE.Group();
    const cloudMat = new THREE.MeshStandardMaterial({ color: "#ffffff", roughness: 1.0, fog: false });
    for (let c = 0; c < 6; c++) {
      const puff = new THREE.Mesh(new THREE.SphereGeometry(0.7 + (c % 3) * 0.25, 12, 12), cloudMat);
      puff.position.set(-7.9, 4.2 + (c % 2) * 0.9, -4.5 + c * 1.8);
      cloudsGroup.add(puff);
    }
    cloudsGroup.visible = isDay;
    scene.add(cloudsGroup);
    cloudsRef.current = cloudsGroup;

    // Luminous Moon with Cool Halo
    const moonGroup = new THREE.Group();
    moonGroup.position.set(-8.2, 5.0, -1.8);
    const moonCore = new THREE.Mesh(
      new THREE.SphereGeometry(0.95, 32, 32),
      new THREE.MeshBasicMaterial({ color: "#f8fafc", fog: false })
    );
    moonGroup.add(moonCore);
    const moonHalo = new THREE.Mesh(
      new THREE.SphereGeometry(1.5, 16, 16),
      new THREE.MeshBasicMaterial({ color: "#7dd3fc", transparent: true, opacity: 0.30, fog: false })
    );
    moonGroup.add(moonHalo);
    moonGroup.visible = !isDay;
    scene.add(moonGroup);
    moonMeshRef.current = moonGroup;

    // 200 Dynamic Twinkling Stars
    const starsGeo = new THREE.BufferGeometry();
    const starCount = 200;
    const starPositions = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount * 3; i += 3) {
      starPositions[i] = -8.0 - Math.random() * 4.0;
      starPositions[i + 1] = 1.2 + Math.random() * 6.5;
      starPositions[i + 2] = -6.0 + Math.random() * 11.0;
    }
    starsGeo.setAttribute("position", new THREE.BufferAttribute(starPositions, 3));
    const starsMat = new THREE.PointsMaterial({
      color: "#93c5fd",
      size: 0.12,
      transparent: true,
      opacity: 0.85,
      fog: false,
    });
    const starField = new THREE.Points(starsGeo, starsMat);
    starField.visible = !isDay;
    scene.add(starField);
    starsRef.current = starField;

    // 120 Soft Ambient Glowing Dust Particles (Radial bokeh texture - no square blocks!)
    const dustGeo = new THREE.BufferGeometry();
    const dustCount = 120;
    const dustPositions = new Float32Array(dustCount * 3);
    for (let i = 0; i < dustCount * 3; i += 3) {
      dustPositions[i] = -4.0 + Math.random() * 8.0;
      dustPositions[i + 1] = 0.6 + Math.random() * 4.0;
      dustPositions[i + 2] = -4.0 + Math.random() * 8.0;
    }
    dustGeo.setAttribute("position", new THREE.BufferAttribute(dustPositions, 3));
    const dustMat = new THREE.PointsMaterial({
      map: createSoftParticleTexture(),
      color: isDay ? "#fef08a" : "#7dd3fc",
      size: 0.08,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const dustField = new THREE.Points(dustGeo, dustMat);
    scene.add(dustField);

    // ==========================================
    // WALL ART GALLERY: FEATURED PROJECT FRAMES & NEON LEDS
    // ==========================================
    const textureLoader = new THREE.TextureLoader();
    const galleryFrames: THREE.Group[] = [];

    const createWallGalleryFrame = (
      imageSrc: string,
      title: string,
      subtitle: string,
      w: number,
      h: number,
      neonColor: string = "#38bdf8"
    ) => {
      const frameGroup = new THREE.Group();
      frameGroup.userData = { section: "projects", name: title };

      // 1. Frame outer bezel
      const frameBezel = new THREE.Mesh(
        new THREE.BoxGeometry(w + 0.12, h + 0.12, 0.06),
        new THREE.MeshStandardMaterial({
          color: "#0f172a",
          roughness: 0.3,
          metalness: 0.7,
        })
      );
      frameBezel.castShadow = true;
      frameGroup.add(frameBezel);

      // 2. Picture Canvas Texture
      const artTex = textureLoader.load(imageSrc);
      artTex.colorSpace = THREE.SRGBColorSpace;
      const artwork = new THREE.Mesh(
        new THREE.PlaneGeometry(w, h),
        new THREE.MeshBasicMaterial({ map: artTex })
      );
      artwork.position.set(0, 0, 0.035);
      frameGroup.add(artwork);

      // 3. Neon LED Backlight Halo
      const neonHalo = new THREE.Mesh(
        new THREE.PlaneGeometry(w + 0.22, h + 0.22),
        new THREE.MeshBasicMaterial({
          color: neonColor,
          transparent: true,
          opacity: 0.45,
          depthWrite: false,
        })
      );
      neonHalo.position.set(0, 0, -0.01);
      frameGroup.add(neonHalo);

      // 4. Museum Picture Light Fixture on top
      const lampTube = new THREE.Mesh(
        new THREE.CylinderGeometry(0.018, 0.018, w * 0.75, 12),
        new THREE.MeshStandardMaterial({ color: "#cbd5e1", metalness: 0.9, roughness: 0.2 })
      );
      lampTube.rotation.z = Math.PI / 2;
      lampTube.position.set(0, h / 2 + 0.12, 0.14);
      frameGroup.add(lampTube);

      const lampArm = new THREE.Mesh(
        new THREE.CylinderGeometry(0.01, 0.01, 0.14, 8),
        new THREE.MeshStandardMaterial({ color: "#94a3b8", metalness: 0.8 })
      );
      lampArm.rotation.x = Math.PI / 2;
      lampArm.position.set(0, h / 2 + 0.07, 0.07);
      frameGroup.add(lampArm);

      // Picture Spotlight
      const spot = new THREE.PointLight(neonColor, 1.4, 3.2, 1.6);
      spot.position.set(0, h / 2 + 0.1, 0.2);
      frameGroup.add(spot);

      // 5. Plaque label
      const pCanvas = document.createElement("canvas");
      pCanvas.width = 512;
      pCanvas.height = 100;
      const pCtx = pCanvas.getContext("2d")!;
      pCtx.fillStyle = "#0b1220";
      pCtx.fillRect(0, 0, 512, 100);
      pCtx.strokeStyle = neonColor;
      pCtx.lineWidth = 3;
      pCtx.strokeRect(3, 3, 506, 94);
      pCtx.fillStyle = "#ffffff";
      pCtx.font = "bold 26px sans-serif";
      pCtx.textAlign = "center";
      pCtx.fillText(title, 256, 42);
      pCtx.fillStyle = neonColor;
      pCtx.font = "18px sans-serif";
      pCtx.fillText(subtitle, 256, 78);
      const plaqueTex = new THREE.CanvasTexture(pCanvas);
      const plaqueMesh = new THREE.Mesh(
        new THREE.PlaneGeometry(w * 0.85, 0.2),
        new THREE.MeshBasicMaterial({ map: plaqueTex })
      );
      plaqueMesh.position.set(0, -h / 2 - 0.14, 0.033);
      frameGroup.add(plaqueMesh);

      return frameGroup;
    };

    // --- RIGHT WALL PROJECT GALLERY (Organized 4-Bay Exhibition Wall) ---
    // Bay 1: Z = -3.2 (Lounge area)
    // 1. TangkapIN AI (Top)
    const frameTangkapin = createWallGalleryFrame(
      "/tangkapin.png",
      "TangkapIN AI",
      "Smart Waste Classification • Flutter & PyTorch",
      1.9,
      1.2,
      "#38bdf8"
    );
    frameTangkapin.position.set(5.0, 3.6, -3.2);
    frameTangkapin.rotation.y = -Math.PI / 2;
    scene.add(frameTangkapin);
    galleryFrames.push(frameTangkapin);

    // 2. Barbershop Booking (Bottom)
    const frameBarbershop = createWallGalleryFrame(
      "/barbershop.png",
      "Barbershop Booking",
      "Real-time Queue & POS • Laravel",
      1.6,
      1.0,
      "#f59e0b"
    );
    frameBarbershop.position.set(5.0, 1.7, -3.2);
    frameBarbershop.rotation.y = -Math.PI / 2;
    scene.add(frameBarbershop);
    galleryFrames.push(frameBarbershop);

    // Bay 2: Z = -1.0 (Middle open wall)
    // 3. AI Mock Interview (Top)
    const frameAiInterview = createWallGalleryFrame(
      "/ai_interview.png",
      "AI Mock Interview",
      "Gemini AI • Audio Streaming • Next.js",
      1.9,
      1.2,
      "#a855f7"
    );
    frameAiInterview.position.set(5.0, 3.6, -1.0);
    frameAiInterview.rotation.y = -Math.PI / 2;
    scene.add(frameAiInterview);
    galleryFrames.push(frameAiInterview);

    // 4. Odoo ERP Solutions (Bottom)
    const frameOdoo = createWallGalleryFrame(
      "/odoo.jpeg",
      "Odoo ERP Solutions",
      "Enterprise Custom Modules • Python",
      1.6,
      1.0,
      "#8b5cf6"
    );
    frameOdoo.position.set(5.0, 1.7, -1.0);
    frameOdoo.rotation.y = -Math.PI / 2;
    scene.add(frameOdoo);
    galleryFrames.push(frameOdoo);

    // Bay 3: Z = 1.3 (Above Bed)
    // 5. HaramainQu Mobile (Top)
    const frameHaramainQu = createWallGalleryFrame(
      "/haramainqu.jpeg",
      "HaramainQu Mobile",
      "Umrah & Hajj Offline Guide • Flutter",
      1.8,
      1.2,
      "#10b981"
    );
    frameHaramainQu.position.set(5.0, 3.6, 1.3);
    frameHaramainQu.rotation.y = -Math.PI / 2;
    scene.add(frameHaramainQu);
    galleryFrames.push(frameHaramainQu);

    // Bay 4: Z = 3.5 (Bed lounge foot area)
    // 6. TelEvent Platform (Top)
    const frameTelevent = createWallGalleryFrame(
      "/televent.png",
      "TelEvent Telkom University",
      "televent.vercel.app • Next.js & Event Hub",
      1.8,
      1.2,
      "#e11d48"
    );
    frameTelevent.position.set(5.0, 3.6, 3.5);
    frameTelevent.rotation.y = -Math.PI / 2;
    scene.add(frameTelevent);
    galleryFrames.push(frameTelevent);

    // --- BACK WALL GALLERY (Showcases Juragan Bakso & Haramain Tour) ---
    // 7. Juragan Bakso (Grand Featured Showcase with live link preview!)
    const frameBakso = createWallGalleryFrame(
      "/bakso_preview.png",
      "Juragan Bakso — SaaS POS",
      "si-bakso.vercel.app • Next.js & Midtrans",
      2.4,
      1.3,
      "#fbbf24"
    );
    frameBakso.position.set(2.4, 4.3, -5.0);
    scene.add(frameBakso);
    galleryFrames.push(frameBakso);

    // 8. Haramain Tour Web
    const frameHaramainTour = createWallGalleryFrame(
      "/haramain_tour.png",
      "Haramain Tour Web",
      "Pilgrimage Travel CMS • Next.js",
      1.8,
      1.1,
      "#06b6d4"
    );
    frameHaramainTour.position.set(-3.6, 4.3, -5.0);
    scene.add(frameHaramainTour);
    galleryFrames.push(frameHaramainTour);

    // --- LEFT WALL (Profile Portrait hanging above Console Table) ---
    // 9. Lead Developer Profile Portrait (Cleanly centered between window & door!)
    const frameProfile = createWallGalleryFrame(
      "/profile.jpeg",
      "Muhammad Fatih Rahman",
      "Lead Full-Stack & Mobile Developer",
      1.1,
      1.4,
      "#38bdf8"
    );
    frameProfile.position.set(-5.0, 3.0, 1.4);
    frameProfile.rotation.y = Math.PI / 2;
    scene.add(frameProfile);
    galleryFrames.push(frameProfile);

    // --- NEON LED AMBIENT LIGHT STRIPS ---
    // 1. Neon LED Ceiling Perimeter Cove Molding (Cyan ice glow washing down from ceiling)
    const neonCoveMat = new THREE.MeshBasicMaterial({ color: "#38bdf8" });
    const coveBack = new THREE.Mesh(new THREE.BoxGeometry(10.2, 0.04, 0.04), neonCoveMat);
    coveBack.position.set(0, 5.15, -5.05);
    scene.add(coveBack);

    const coveRight = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.04, 10.2), neonCoveMat);
    coveRight.position.set(5.05, 5.15, 0);
    scene.add(coveRight);

    const coveLeft = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.04, 10.2), neonCoveMat);
    coveLeft.position.set(-5.05, 5.15, 0);
    scene.add(coveLeft);

    // 2. Neon LED Floor Skirting Glow (Soft Indigo / Purple glow along baseboard)
    const neonFloorMat = new THREE.MeshBasicMaterial({ color: "#818cf8" });
    const skirtBack = new THREE.Mesh(new THREE.BoxGeometry(10.2, 0.02, 0.02), neonFloorMat);
    skirtBack.position.set(0, 0.26, -5.02);
    scene.add(skirtBack);

    const skirtRight = new THREE.Mesh(new THREE.BoxGeometry(0.02, 0.02, 10.2), neonFloorMat);
    skirtRight.position.set(5.02, 0.26, 0);
    scene.add(skirtRight);

    // 3. Bed Headboard Warm Ambient Halo (Golden amber glow upward behind bed)
    const headboardHalo = new THREE.Mesh(
      new THREE.BoxGeometry(3.2, 0.04, 0.04),
      new THREE.MeshBasicMaterial({ color: "#f59e0b" })
    );
    headboardHalo.position.set(2.4, 1.84, -0.31);
    scene.add(headboardHalo);

    const headboardLight = new THREE.PointLight("#f59e0b", 1.8, 3.5, 1.8);
    headboardLight.position.set(2.4, 1.95, -0.2);
    scene.add(headboardLight);

    // 4. Floating Wall Shelves with Neon Underglow on Right Wall
    const shelfWoodMat = new THREE.MeshStandardMaterial({ color: "#1e293b", roughness: 0.4 });
    const shelfUnderglowMat = new THREE.MeshBasicMaterial({ color: "#a855f7" });

    const createFloatingShelf = (x: number, y: number, z: number, length: number) => {
      const shelf = new THREE.Group();
      shelf.position.set(x, y, z);
      shelf.rotation.y = -Math.PI / 2;

      const plank = new THREE.Mesh(new THREE.BoxGeometry(length, 0.05, 0.35), shelfWoodMat);
      plank.castShadow = true;
      shelf.add(plank);

      const ledStrip = new THREE.Mesh(new THREE.BoxGeometry(length * 0.95, 0.015, 0.02), shelfUnderglowMat);
      ledStrip.position.set(0, -0.03, 0.12);
      shelf.add(ledStrip);

      for (let i = 0; i < 2; i++) {
        const miniPot = new THREE.Mesh(
          new THREE.CylinderGeometry(0.06, 0.04, 0.09, 12),
          new THREE.MeshStandardMaterial({ color: "#f8fafc", roughness: 0.3 })
        );
        miniPot.position.set(-length / 3 + i * (length * 0.65), 0.07, 0);
        miniPot.castShadow = true;
        shelf.add(miniPot);

        const miniPlant = new THREE.Mesh(
          new THREE.SphereGeometry(0.06, 8, 8),
          new THREE.MeshStandardMaterial({ color: "#10b981", roughness: 0.8 })
        );
        miniPlant.position.set(-length / 3 + i * (length * 0.65), 0.14, 0);
        shelf.add(miniPlant);
      }

      return shelf;
    };

    scene.add(createFloatingShelf(5.0, 2.1, 1.3, 1.6));
    scene.add(createFloatingShelf(5.0, 2.1, 3.5, 1.6));

    // ==========================================
    // INTERACTIVE GROUP 1: WORKSTATION / PC (PROJECTS)
    // ==========================================
    const projectsGroup = new THREE.Group();
    projectsGroup.position.set(-1.8, 0, -2.4);
    projectsGroup.userData = { section: "projects", name: "Desk & Workstation" };

    const deskMat = new THREE.MeshStandardMaterial({ color: "#22252e", roughness: 0.3, metalness: 0.2 });
    const deskTop = new THREE.Mesh(new THREE.BoxGeometry(3.6, 0.12, 1.7), deskMat);
    deskTop.position.set(0, 1.45, 0);
    deskTop.castShadow = true;
    deskTop.receiveShadow = true;
    projectsGroup.add(deskTop);

    const legMat = new THREE.MeshStandardMaterial({ color: "#0f172a", roughness: 0.5 });
    const legGeo = new THREE.BoxGeometry(0.1, 1.4, 0.1);
    const legPositions = [
      [-1.65, 0.7, -0.7],
      [-1.65, 0.7, 0.7],
      [1.65, 0.7, -0.7],
      [1.65, 0.7, 0.7],
    ];
    legPositions.forEach(([x, y, z]) => {
      const leg = new THREE.Mesh(legGeo, legMat);
      leg.position.set(x, y, z);
      leg.castShadow = true;
      projectsGroup.add(leg);
    });

    // Stitched Leather / Felt Desk Mat
    const matGeo = new THREE.BoxGeometry(2.4, 0.015, 0.95);
    const matMat = new THREE.MeshStandardMaterial({ color: "#111827", roughness: 0.85 });
    const deskPad = new THREE.Mesh(matGeo, matMat);
    deskPad.position.set(-0.1, 1.515, 0.1);
    deskPad.receiveShadow = true;
    projectsGroup.add(deskPad);

    const screenBezelMat = new THREE.MeshStandardMaterial({ color: "#111827", roughness: 0.4 });
    const screenStandMat = new THREE.MeshStandardMaterial({ color: "#374151", roughness: 0.2, metalness: 0.8 });

    // Monitor 1: Main Ultrawide Curved Screen
    const monitorStand = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.45, 16), screenStandMat);
    monitorStand.position.set(-0.2, 1.74, -0.3);
    projectsGroup.add(monitorStand);
    const monitorBase = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.02, 0.4), screenStandMat);
    monitorBase.position.set(-0.2, 1.52, -0.3);
    projectsGroup.add(monitorBase);

    const mainScreen = new THREE.Mesh(new THREE.BoxGeometry(1.8, 0.8, 0.06), screenBezelMat);
    mainScreen.position.set(-0.2, 2.15, -0.3);
    mainScreen.castShadow = true;

    const codeDisplayMat = new THREE.MeshBasicMaterial({ map: createCodeScreenTexture() });
    const codeDisplay = new THREE.Mesh(new THREE.PlaneGeometry(1.72, 0.72), codeDisplayMat);
    codeDisplay.position.set(0, 0, 0.035);
    mainScreen.add(codeDisplay);
    projectsGroup.add(mainScreen);

    // Monitor 2: Vertical Telemetry Screen
    const vertScreen = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.95, 0.05), screenBezelMat);
    vertScreen.position.set(1.05, 2.2, -0.22);
    vertScreen.rotation.y = -0.25;
    const vertDisplayMat = new THREE.MeshBasicMaterial({ map: createDashboardTexture() });
    const vertDisplay = new THREE.Mesh(new THREE.PlaneGeometry(0.48, 0.88), vertDisplayMat);
    vertDisplay.position.set(0, 0, 0.03);
    vertScreen.add(vertDisplay);
    projectsGroup.add(vertScreen);

    // Audio Studio Monitor Speakers
    const speakerMat = new THREE.MeshStandardMaterial({ color: "#1e293b", roughness: 0.5 });
    const coneMat = new THREE.MeshStandardMaterial({ color: "#fbbf24", roughness: 0.3, metalness: 0.3 });

    const createSpeaker = (x: number, y: number, z: number, rotY: number) => {
      const spk = new THREE.Group();
      spk.position.set(x, y, z);
      spk.rotation.y = rotY;
      const body = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.42, 0.28), speakerMat);
      body.castShadow = true;
      spk.add(body);
      const woofer = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 0.02, 16), coneMat);
      woofer.rotation.x = Math.PI / 2;
      woofer.position.set(0, -0.06, 0.14);
      spk.add(woofer);
      const tweeter = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.02, 16), coneMat);
      tweeter.rotation.x = Math.PI / 2;
      tweeter.position.set(0, 0.1, 0.14);
      spk.add(tweeter);
      return spk;
    };
    projectsGroup.add(createSpeaker(-1.4, 1.72, -0.3, 0.25));
    projectsGroup.add(createSpeaker(1.5, 1.72, -0.1, -0.35));

    // Gaming / Workstation PC Case with Glass Side Panel & Internal RGB
    const pcCase = new THREE.Mesh(
      new THREE.BoxGeometry(0.5, 0.85, 0.9),
      new THREE.MeshStandardMaterial({ color: "#0f172a", roughness: 0.3 })
    );
    pcCase.position.set(-1.45, 1.95, -0.15);
    pcCase.castShadow = true;
    const pcGlass = new THREE.Mesh(
      new THREE.PlaneGeometry(0.82, 0.75),
      new THREE.MeshBasicMaterial({ color: "#818cf8", transparent: true, opacity: 0.65 })
    );
    pcGlass.position.set(0.255, 0, 0);
    pcGlass.rotation.y = Math.PI / 2;
    pcCase.add(pcGlass);
    projectsGroup.add(pcCase);

    // Mechanical Keyboard & Mouse
    const kbGeo = new THREE.BoxGeometry(0.75, 0.035, 0.28);
    const kbMat = new THREE.MeshStandardMaterial({ color: "#1f2937", roughness: 0.4 });
    const keyboard = new THREE.Mesh(kbGeo, kbMat);
    keyboard.position.set(-0.2, 1.54, 0.18);
    projectsGroup.add(keyboard);

    const mouseGeo = new THREE.BoxGeometry(0.12, 0.03, 0.18);
    const deskMouse = new THREE.Mesh(mouseGeo, kbMat);
    deskMouse.position.set(0.45, 1.54, 0.18);
    projectsGroup.add(deskMouse);

    // Ceramic Coffee Mug on Cork Coaster
    const coaster = new THREE.Mesh(
      new THREE.CylinderGeometry(0.12, 0.12, 0.015, 16),
      new THREE.MeshStandardMaterial({ color: "#92400e", roughness: 0.8 })
    );
    coaster.position.set(-0.85, 1.52, 0.25);
    projectsGroup.add(coaster);

    const mug = new THREE.Mesh(
      new THREE.CylinderGeometry(0.08, 0.07, 0.16, 16),
      new THREE.MeshStandardMaterial({ color: "#f8fafc", roughness: 0.2 })
    );
    mug.position.set(-0.85, 1.6, 0.25);
    mug.castShadow = true;
    projectsGroup.add(mug);

    // Ergonomic Mesh Office Chair
    const chairGroup = new THREE.Group();
    chairGroup.position.set(-0.2, 0, 0.85);
    chairGroup.rotation.y = 0.2;

    const chairSeatMat = new THREE.MeshStandardMaterial({ color: "#1e293b", roughness: 0.7 });
    const chairSeat = new THREE.Mesh(new THREE.BoxGeometry(0.85, 0.12, 0.8), chairSeatMat);
    chairSeat.position.set(0, 0.9, 0);
    chairSeat.castShadow = true;
    chairGroup.add(chairSeat);

    const chairBack = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.95, 0.1), chairSeatMat);
    chairBack.position.set(0, 1.45, 0.35);
    chairBack.castShadow = true;
    chairGroup.add(chairBack);

    const chairHeadrest = new THREE.Mesh(new THREE.BoxGeometry(0.45, 0.25, 0.08), chairSeatMat);
    chairHeadrest.position.set(0, 2.05, 0.35);
    chairGroup.add(chairHeadrest);

    const chairStem = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.8, 16), screenStandMat);
    chairStem.position.set(0, 0.45, 0);
    chairGroup.add(chairStem);

    for (let i = 0; i < 5; i++) {
      const angle = (i * Math.PI * 2) / 5;
      const leg = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.06, 0.45), screenStandMat);
      leg.position.set(Math.sin(angle) * 0.25, 0.1, Math.cos(angle) * 0.25);
      leg.rotation.y = angle;
      chairGroup.add(leg);
    }
    projectsGroup.add(chairGroup);

    // Interactive Desk Lamp
    const deskLampGroup = new THREE.Group();
    deskLampGroup.position.set(-1.45, 1.52, 0.35);
    deskLampGroup.userData = { section: "light", name: "Desk Lamp" };

    const lampBase = new THREE.Mesh(
      new THREE.CylinderGeometry(0.12, 0.14, 0.03, 16),
      new THREE.MeshStandardMaterial({ color: "#0f172a", roughness: 0.3 })
    );
    deskLampGroup.add(lampBase);

    const lampArm = new THREE.Mesh(
      new THREE.CylinderGeometry(0.02, 0.02, 0.45, 12),
      new THREE.MeshStandardMaterial({ color: "#94a3b8", metalness: 0.8 })
    );
    lampArm.position.set(0, 0.22, 0);
    lampArm.rotation.z = -0.2;
    deskLampGroup.add(lampArm);

    const lampHead = new THREE.Mesh(
      new THREE.ConeGeometry(0.12, 0.18, 16, 1, true),
      new THREE.MeshStandardMaterial({ color: "#0f172a" })
    );
    lampHead.position.set(-0.1, 0.45, 0);
    lampHead.rotation.z = Math.PI / 1.3;
    deskLampGroup.add(lampHead);

    const deskBulbMesh = new THREE.Mesh(
      new THREE.SphereGeometry(0.06, 12, 12),
      new THREE.MeshBasicMaterial({ color: isLightOn ? "#fbbf24" : "#1f2937" })
    );
    deskBulbMesh.position.set(-0.12, 0.42, 0);
    deskBulbRef.current = deskBulbMesh;
    deskLampGroup.add(deskBulbMesh);

    projectsGroup.add(deskLampGroup);
    scene.add(projectsGroup);

    // ==========================================
    // INTERACTIVE GROUP 2: BED & LOUNGE (ABOUT ME)
    // ==========================================
    const aboutGroup = new THREE.Group();
    aboutGroup.position.set(2.4, 0, 1.8);
    aboutGroup.userData = { section: "about", name: "Bed & Profile" };

    const bedWoodMat = new THREE.MeshStandardMaterial({ color: "#32231b", roughness: 0.6 });
    const bedBase = new THREE.Mesh(new THREE.BoxGeometry(3.2, 0.45, 4.4), bedWoodMat);
    bedBase.position.set(0, 0.225, 0);
    bedBase.castShadow = true;
    bedBase.receiveShadow = true;
    aboutGroup.add(bedBase);

    const headboard = new THREE.Mesh(new THREE.BoxGeometry(3.2, 1.5, 0.2), bedWoodMat);
    headboard.position.set(0, 1.1, -2.1);
    headboard.castShadow = true;
    aboutGroup.add(headboard);

    const mattressMat = new THREE.MeshStandardMaterial({ color: "#e2e8f0", roughness: 0.9 });
    const mattress = new THREE.Mesh(new THREE.BoxGeometry(2.9, 0.5, 4.0), mattressMat);
    mattress.position.set(0, 0.65, 0.05);
    mattress.castShadow = true;
    aboutGroup.add(mattress);

    const duvetMat = new THREE.MeshStandardMaterial({ color: "#312e81", roughness: 0.8 });
    const duvet = new THREE.Mesh(new THREE.BoxGeometry(2.94, 0.22, 2.8), duvetMat);
    duvet.position.set(0, 0.85, 0.65);
    duvet.castShadow = true;
    aboutGroup.add(duvet);

    const pillowMat = new THREE.MeshStandardMaterial({ color: "#f8fafc", roughness: 0.95 });
    const pillow1 = new THREE.Mesh(new THREE.BoxGeometry(1.0, 0.18, 0.65), pillowMat);
    pillow1.position.set(-0.7, 0.98, -1.4);
    pillow1.rotation.x = 0.2;
    aboutGroup.add(pillow1);

    const pillow2 = new THREE.Mesh(new THREE.BoxGeometry(1.0, 0.18, 0.65), pillowMat);
    pillow2.position.set(0.7, 0.98, -1.4);
    pillow2.rotation.x = 0.2;
    aboutGroup.add(pillow2);

    // Bedside Nightstand
    const nightstand = new THREE.Mesh(new THREE.BoxGeometry(0.85, 0.8, 0.85), bedWoodMat);
    nightstand.position.set(2.1, 0.4, -1.4);
    nightstand.castShadow = true;
    aboutGroup.add(nightstand);

    // Digital LED Bedside Clock (Displays live local time!)
    const now = new Date();
    const clockMat = new THREE.MeshBasicMaterial({
      map: createDigitalClockTexture(now.getHours(), now.getMinutes()),
    });
    const clockMesh = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.22, 0.15), clockMat);
    clockMesh.position.set(2.1, 0.92, -1.1);
    clockMesh.rotation.y = -Math.PI / 4;
    clockMeshRef.current = clockMesh;
    aboutGroup.add(clockMesh);

    // Bedside Lamp
    const lampStand = new THREE.Mesh(
      new THREE.CylinderGeometry(0.04, 0.12, 0.35, 16),
      new THREE.MeshStandardMaterial({ color: "#e2e8f0", metalness: 0.8 })
    );
    lampStand.position.set(2.1, 0.95, -1.5);
    aboutGroup.add(lampStand);

    const lampBulb = new THREE.Mesh(
      new THREE.SphereGeometry(0.18, 16, 16),
      new THREE.MeshBasicMaterial({ color: "#fbbf24" })
    );
    lampBulb.position.set(2.1, 1.25, -1.5);
    aboutGroup.add(lampBulb);

    scene.add(aboutGroup);

    // ==========================================
    // INTERACTIVE GROUP 3: WHITEBOARD & BOOKSHELF (SKILLS)
    // ==========================================
    const skillsGroup = new THREE.Group();
    skillsGroup.position.set(0, 0, 0); // Root origin so children use clear world coords
    skillsGroup.userData = { section: "skills", name: "Whiteboard & Bookshelf" };

    // 1. Architectural Whiteboard mounted FLAT against the Back Wall (Z = -4.96)
    const boardGroup = new THREE.Group();
    boardGroup.position.set(0.6, 2.5, -4.96);

    const boardFrame = new THREE.Mesh(
      new THREE.BoxGeometry(3.2, 2.0, 0.06),
      new THREE.MeshStandardMaterial({ color: "#334155", metalness: 0.7, roughness: 0.3 })
    );
    boardFrame.castShadow = true;
    boardGroup.add(boardFrame);

    const boardMat = new THREE.MeshBasicMaterial({ map: createWhiteboardTexture() });
    const boardSurface = new THREE.Mesh(new THREE.PlaneGeometry(3.08, 1.88), boardMat);
    boardSurface.position.set(0, 0, 0.035);
    boardGroup.add(boardSurface);

    skillsGroup.add(boardGroup);

    // 2. Modern Open Bookshelf (Lemari Buku) tucked flush against Back Wall to the right (X = 3.6, Z = -4.85)
    // Zero collision with whiteboard (0.6m clear open wall gap between them)!
    const shelfGroup = new THREE.Group();
    shelfGroup.position.set(3.6, 0, -4.85);

    const shelfMat = new THREE.MeshStandardMaterial({ color: "#1e1e24", roughness: 0.4 });
    const bookcaseWoodMat = new THREE.MeshStandardMaterial({ color: "#2d3748", roughness: 0.5 });

    // Back panel
    const shelfBack = new THREE.Mesh(new THREE.BoxGeometry(1.6, 3.4, 0.03), shelfMat);
    shelfBack.position.set(0, 1.7, -0.15);
    shelfBack.castShadow = true;
    shelfGroup.add(shelfBack);

    // Side panels
    const sideL = new THREE.Mesh(new THREE.BoxGeometry(0.04, 3.4, 0.35), shelfMat);
    sideL.position.set(-0.8, 1.7, 0);
    shelfGroup.add(sideL);

    const sideR = new THREE.Mesh(new THREE.BoxGeometry(0.04, 3.4, 0.35), shelfMat);
    sideR.position.set(0.8, 1.7, 0);
    shelfGroup.add(sideR);

    // Top & Bottom panels
    const panelTop = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.04, 0.35), shelfMat);
    panelTop.position.set(0, 3.4, 0);
    shelfGroup.add(panelTop);

    const panelBottom = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.04, 0.35), shelfMat);
    panelBottom.position.set(0, 0.02, 0);
    shelfGroup.add(panelBottom);

    // 4 Horizontal shelves with colorful books
    const bookColors = ["#ef4444", "#3b82f6", "#10b981", "#f59e0b", "#8b5cf6", "#06b6d4"];
    for (let sIdx = 0; sIdx < 4; sIdx++) {
      const shelfY = 0.7 + sIdx * 0.75;
      const shelfPlank = new THREE.Mesh(new THREE.BoxGeometry(1.56, 0.03, 0.32), bookcaseWoodMat);
      shelfPlank.position.set(0, shelfY, 0);
      shelfGroup.add(shelfPlank);

      // Books on shelf
      for (let b = 0; b < 5; b++) {
        const bookH = 0.42 + (b % 3) * 0.06;
        const bookW = 0.07;
        const bookD = 0.24;
        const bookMesh = new THREE.Mesh(
          new THREE.BoxGeometry(bookW, bookH, bookD),
          new THREE.MeshStandardMaterial({
            color: bookColors[(sIdx * 2 + b) % bookColors.length],
            roughness: 0.5,
          })
        );
        bookMesh.position.set(-0.6 + b * 0.16, shelfY + bookH / 2 + 0.015, 0.02);
        bookMesh.castShadow = true;
        shelfGroup.add(bookMesh);
      }
    }

    // Golden Trophy on 3rd shelf
    const trophyMat = new THREE.MeshStandardMaterial({ color: "#fbbf24", metalness: 0.9, roughness: 0.2 });
    const trophy = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.04, 0.32, 16), trophyMat);
    trophy.position.set(0.45, 2.38, 0.02);
    shelfGroup.add(trophy);

    skillsGroup.add(shelfGroup);
    scene.add(skillsGroup);

    // ==========================================
    // INTERACTIVE GROUP 4: DOOR & PHONE (CONTACT)
    // ==========================================
    const contactGroup = new THREE.Group();
    contactGroup.position.set(-4.0, 0, 3.2);
    contactGroup.userData = { section: "contact", name: "Door & Contact Hub" };

    const doorFrameMat = new THREE.MeshStandardMaterial({ color: "#0f172a", roughness: 0.6 });
    const doorFrame = new THREE.Mesh(new THREE.BoxGeometry(0.2, 4.5, 2.1), doorFrameMat);
    doorFrame.position.set(-0.95, 2.25, 0);
    doorFrame.castShadow = true;
    contactGroup.add(doorFrame);

    const doorMat = new THREE.MeshStandardMaterial({ color: "#182234", roughness: 0.4, metalness: 0.1 });
    const door = new THREE.Mesh(new THREE.BoxGeometry(0.12, 4.3, 1.95), doorMat);
    door.position.set(-0.92, 2.2, 0);
    contactGroup.add(door);

    const handleMat = new THREE.MeshStandardMaterial({ color: "#94a3b8", metalness: 0.9, roughness: 0.2 });
    const handle = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.025, 0.35, 12), handleMat);
    handle.rotation.x = Math.PI / 2;
    handle.position.set(-0.8, 2.1, 0.65);
    contactGroup.add(handle);

    // Console table with glowing smartphone placed cleanly under frameProfile at Z = 1.4
    const tableMat = new THREE.MeshStandardMaterial({ color: "#1e1e24", roughness: 0.5 });
    const consoleTable = new THREE.Mesh(new THREE.BoxGeometry(0.6, 1.3, 1.1), tableMat);
    consoleTable.position.set(-0.5, 0.65, -1.8);
    consoleTable.castShadow = true;
    contactGroup.add(consoleTable);

    const phone = new THREE.Mesh(
      new THREE.BoxGeometry(0.24, 0.02, 0.44),
      new THREE.MeshStandardMaterial({ color: "#0f172a", metalness: 0.8, roughness: 0.2 })
    );
    phone.position.set(-0.4, 1.32, -1.8);
    const phoneScreen = new THREE.Mesh(
      new THREE.PlaneGeometry(0.22, 0.42),
      new THREE.MeshBasicMaterial({ color: "#22c55e" })
    );
    phoneScreen.rotation.x = -Math.PI / 2;
    phoneScreen.position.set(0, 0.012, 0);
    phone.add(phoneScreen);
    contactGroup.add(phone);

    scene.add(contactGroup);

    // Collect interactive group references
    interactiveObjectsRef.current = [
      projectsGroup,
      aboutGroup,
      skillsGroup,
      contactGroup,
      ceilingLampGroup,
      ...galleryFrames,
    ];

    setIsLoaded(true);

    // ==========================================
    // RAYCASTER & POINTER INTERACTION
    // ==========================================
    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();

    const findInteractiveParent = (obj: THREE.Object3D | null): THREE.Group | null => {
      let curr = obj;
      while (curr) {
        if (curr.userData && curr.userData.section) {
          return curr as THREE.Group;
        }
        curr = curr.parent;
      }
      return null;
    };

    const handlePointerMove = (e: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      // Non-inverted POV offset: cursor right -> look right (+X), cursor up -> look up (+Y)
      targetPovOffset.current.x = pointer.x;
      targetPovOffset.current.y = pointer.y;

      if (isDraggingRef.current) {
        const dx = e.clientX - lastPointerPos.current.x;
        const dy = e.clientY - lastPointerPos.current.y;
        if (Math.abs(dx) > 3 || Math.abs(dy) > 3) {
          hasDraggedRef.current = true;
        }
        dragRotation.current.yaw += dx * 0.0055;
        dragRotation.current.pitch += dy * 0.004;
        dragRotation.current.pitch = Math.max(-1.1, Math.min(1.1, dragRotation.current.pitch));
        lastPointerPos.current = { x: e.clientX, y: e.clientY };
      }

      raycaster.setFromCamera(pointer, camera);

      if (isPreloadingRef.current || Date.now() < clickIgnoreUntilRef.current || activeSectionRef.current !== null) {
        renderer.domElement.style.cursor = "default";
        setHoveredSection(null);
        return;
      }

      const intersects = raycaster.intersectObjects(interactiveObjectsRef.current, true);

      if (intersects.length > 0) {
        const parent = findInteractiveParent(intersects[0].object);
        if (parent && parent.userData.section) {
          const s = parent.userData.section as "projects" | "about" | "skills" | "contact" | "light";
          const meta = SECTION_META[s];
          renderer.domElement.style.cursor = "pointer";
          setHoveredSection({
            section: s,
            title: parent.userData.name || (languageRef.current === "id" ? meta.idTitle : meta.enTitle),
            subtitle: languageRef.current === "id" ? meta.idSub : meta.enSub,
            icon: meta.icon,
            x: e.clientX,
            y: e.clientY,
          });
          return;
        }
      }

      renderer.domElement.style.cursor = "default";
      setHoveredSection(null);
    };

    const handlePointerDown = (e: MouseEvent) => {
      // Only recognize pointer down if it physically originated on the WebGL canvas
      if (e.target !== domElement) {
        isPointerDownOnCanvas.current = false;
        return;
      }
      isPointerDownOnCanvas.current = true;
      pointerDownPos.current = { x: e.clientX, y: e.clientY };
      isDraggingRef.current = true;
      hasDraggedRef.current = false;
      lastPointerPos.current = { x: e.clientX, y: e.clientY };
    };

    const handlePointerUp = (e: MouseEvent) => {
      const wasCanvasDown = isPointerDownOnCanvas.current;
      isPointerDownOnCanvas.current = false;
      isDraggingRef.current = false;

      // If dragging camera view or did not start on canvas, do not trigger click
      if (hasDraggedRef.current || !wasCanvasDown) return;

      // Never trigger 3D object interaction if:
      // 1. Preloader is still active
      // 2. Cooldown timer after preloader has not elapsed
      // 3. A modal or menu is already open
      // 4. Pointer up target was NOT the 3D canvas itself (e.g. clicked on UI/HUD)
      if (isPreloadingRef.current) return;
      if (Date.now() < clickIgnoreUntilRef.current) return;
      if (activeSectionRef.current !== null) return;
      if (e.target !== domElement) return;

      // Verify distance moved is tiny (clicks only, not micro-pans)
      const dist = Math.hypot(e.clientX - pointerDownPos.current.x, e.clientY - pointerDownPos.current.y);
      if (dist > 6) return;

      const rect = renderer.domElement.getBoundingClientRect();
      const clickPointer = new THREE.Vector2(
        ((e.clientX - rect.left) / rect.width) * 2 - 1,
        -((e.clientY - rect.top) / rect.height) * 2 + 1
      );

      raycaster.setFromCamera(clickPointer, camera);
      const intersects = raycaster.intersectObjects(interactiveObjectsRef.current, true);

      if (intersects.length > 0) {
        const parent = findInteractiveParent(intersects[0].object);
        if (parent && parent.userData.section) {
          const sectionKey = parent.userData.section as SectionType;
          if (sectionKey === "light") {
            onToggleLightRef.current();
          } else {
            onSelectSectionRef.current(sectionKey);
          }
        }
      }
    };

    const domElement = renderer.domElement;
    domElement.addEventListener("mousemove", handlePointerMove);
    domElement.addEventListener("mousedown", handlePointerDown);
    window.addEventListener("mouseup", handlePointerUp);

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    // ==========================================
    // ANIMATION, WALKING & POV RENDER LOOP
    // ==========================================
    let animationFrameId: number;
    const startTime = performance.now();
    let lastClockUpdate = 0;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const time = (performance.now() - startTime) * 0.001;

      // 1. Smoothly interpolate POV mouse-look offset
      currentPovOffset.current.x += (targetPovOffset.current.x - currentPovOffset.current.x) * 0.08;
      currentPovOffset.current.y += (targetPovOffset.current.y - currentPovOffset.current.y) * 0.08;

      // 1b. Continuous 360° Edge Panning (turn continuously when cursor moves to screen borders)
      if (!activeSection && Math.abs(currentPovOffset.current.x) > 0.58) {
        const sign = Math.sign(currentPovOffset.current.x);
        const factor = (Math.abs(currentPovOffset.current.x) - 0.58) / 0.42;
        dragRotation.current.yaw += sign * factor * 0.032;
      }

      // 1c. Keyboard 360° Rotation ([Q] / [ArrowLeft] -> turn left, [E] / [ArrowRight] -> turn right)
      if (!activeSection) {
        const keys = keysPressed.current;
        if (keys["q"] || keys["keyq"] || keys["arrowleft"]) {
          dragRotation.current.yaw -= 0.038;
        }
        if (keys["e"] || keys["keye"] || keys["arrowright"]) {
          dragRotation.current.yaw += 0.038;
        }
      }

      // 2. Compute Yaw (Non-inverted: cursor right -> +yaw -> look right!)
      const baseAngle = -0.35; // Default orientation facing workstation & room interior
      const totalYaw = baseAngle + dragRotation.current.yaw + currentPovOffset.current.x * 0.7;
      const totalPitch = dragRotation.current.pitch + currentPovOffset.current.y * 0.6;

      // 3. First-Person WASD Walking Movement
      if (!activeSection) {
        const keys = keysPressed.current;
        const isFwd = keys["w"] || keys["arrowup"] || keys["keyw"];
        const isBack = keys["s"] || keys["arrowdown"] || keys["keys"];
        const isLeft = keys["a"] || keys["arrowleft"] || keys["keya"];
        const isRight = keys["d"] || keys["arrowright"] || keys["keyd"];

        if (isFwd || isBack || isLeft || isRight) {
          // Direction vectors on horizontal floor plane
          const fwdX = Math.sin(totalYaw);
          const fwdZ = -Math.cos(totalYaw);
          const rightX = Math.cos(totalYaw);
          const rightZ = Math.sin(totalYaw);

          const isSprint = keys["shift"] || keys["shiftleft"] || keys["shiftright"];
          const moveSpeed = isSprint ? 0.085 : 0.05;

          let dirX = 0;
          let dirZ = 0;

          if (isFwd) {
            dirX += fwdX;
            dirZ += fwdZ;
          }
          if (isBack) {
            dirX -= fwdX;
            dirZ -= fwdZ;
          }
          if (isRight) {
            dirX += rightX;
            dirZ += rightZ;
          }
          if (isLeft) {
            dirX -= rightX;
            dirZ -= rightZ;
          }

          const len = Math.hypot(dirX, dirZ);
          if (len > 0.001) {
            dirX = (dirX / len) * moveSpeed;
            dirZ = (dirZ / len) * moveSpeed;

            targetCameraPos.current.x += dirX;
            targetCameraPos.current.z += dirZ;

            // Room collision boundary clamp (keep inside the room)
            targetCameraPos.current.x = Math.max(-4.2, Math.min(4.2, targetCameraPos.current.x));
            targetCameraPos.current.z = Math.max(-4.2, Math.min(4.2, targetCameraPos.current.z));

            // Subtle walking step head-bob
            headBobTimer.current += 0.16;
            targetCameraPos.current.y = STANDING_EYE_HEIGHT + Math.sin(headBobTimer.current) * 0.04;
          }
        } else {
          // Smoothly return to standing eye-level height
          targetCameraPos.current.y = STANDING_EYE_HEIGHT;
        }
      }

      // 4. Smoothly interpolate camera position
      camera.position.lerp(targetCameraPos.current, 0.08);

      // 5. Look Target (Non-inverted: cursor right -> right (+X), up -> up (+Y))
      if (activeSection && activeSection !== "light") {
        const lookX = targetLookAt.current.x + currentPovOffset.current.x * 0.35;
        const lookY = targetLookAt.current.y + currentPovOffset.current.y * 0.25;
        const lookZ = targetLookAt.current.z;
        camera.lookAt(lookX, lookY, lookZ);
      } else {
        const forwardDistance = 6.0;
        const forwardX = Math.sin(totalYaw) * forwardDistance;
        const forwardZ = -Math.cos(totalYaw) * forwardDistance;
        const forwardY = totalPitch * 3.5;

        const lookTarget = new THREE.Vector3(
          camera.position.x + forwardX,
          camera.position.y + forwardY - 0.25,
          camera.position.z + forwardZ
        );

        camera.lookAt(lookTarget);
      }

      // Subtle ambient animations
      if (starsMat) {
        starsMat.opacity = 0.65 + Math.sin(time * 2.5) * 0.25;
      }
      if (monitorGlow) {
        monitorGlow.intensity = 2.8 + Math.sin(time * 4) * 0.4;
      }

      if (cloudsRef.current) {
        cloudsRef.current.position.z = Math.sin(time * 0.2) * 1.5;
      }

      // Update digital bedside clock every 10 seconds
      if (time - lastClockUpdate > 10 && clockMeshRef.current) {
        lastClockUpdate = time;
        const d = new Date();
        const mat = clockMeshRef.current.material as THREE.MeshBasicMaterial;
        mat.map?.dispose();
        mat.map = createDigitalClockTexture(d.getHours(), d.getMinutes());
        mat.needsUpdate = true;
      }

      const posArray = dustGeo.attributes.position.array as Float32Array;
      for (let i = 1; i < dustCount * 3; i += 3) {
        posArray[i] += Math.sin(time + i) * 0.002;
      }
      dustGeo.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    // ==========================================
    // CLEANUP
    // ==========================================
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      domElement.removeEventListener("mousemove", handlePointerMove);
      domElement.removeEventListener("mousedown", handlePointerDown);
      window.removeEventListener("mouseup", handlePointerUp);

      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="relative w-full h-full overflow-hidden select-none">
      {/* 3D WebGL Canvas Container */}
      <div ref={containerRef} className="w-full h-full" />

      {/* Hover Floating Tooltip */}
      {hoveredSection && !activeSection && (
        <div
          className="fixed pointer-events-none z-40 transition-all duration-150 transform -translate-x-1/2 -translate-y-full mb-3"
          style={{
            left: `${hoveredSection.x}px`,
            top: `${hoveredSection.y - 18}px`,
          }}
        >
          <div className="flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-surface-900/90 backdrop-blur-xl border border-primary-500/40 shadow-2xl shadow-primary-500/20 text-white animate-fade-in">
            <span className="text-2xl">{hoveredSection.icon}</span>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-primary-400">
                {language === "id" ? "Interaksi 3D" : "3D Interaction"}
              </p>
              <h4 className="text-sm font-bold text-white leading-tight">
                {hoveredSection.title}
              </h4>
              <p className="text-[11px] text-surface-300">
                {hoveredSection.subtitle}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* POV & Walking Guidance Banner */}
      {!activeSection && isLoaded && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="hidden sm:block absolute top-24 left-1/2 -translate-x-1/2 pointer-events-auto">
            <div className="flex items-center gap-2.5 px-4 py-2 rounded-full bg-surface-950/80 backdrop-blur-md border border-white/10 text-xs text-surface-300 shadow-xl">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>
                {language === "id"
                  ? "🎮 Putar 360°: Drag mouse / [Q][E] / Kursor ke tepi layar • Jalan: [W][A][S][D] • Klik objek untuk jelajah"
                  : "🎮 360° View: Drag mouse / [Q][E] / Cursor to edge • Walk: [W][A][S][D] • Click objects to explore"}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

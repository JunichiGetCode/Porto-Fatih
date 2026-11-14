import * as THREE from "three";

/**
 * Procedural Realistic Scandinavian Oak Wood Parquet Texture
 * Features:
 * - Natural wood plank variations
 * - Organic wood grain fiber curves
 * - Chamfered bevel grooves between planks
 * - Paired roughness map for realistic specular sheen
 */
export function createParquetFloorTextures(): { map: THREE.CanvasTexture; roughnessMap: THREE.CanvasTexture } {
  // 1. Color Map Canvas
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext("2d")!;

  const plankW = 256;
  const plankH = 64;
  const rows = 1024 / plankH;
  const cols = 1024 / plankW + 1;

  // Rich warm oak color variations
  const oakPalette = [
    { base: "#855333", grain: "#6c4125", dark: "#50301a" },
    { base: "#915c38", grain: "#764929", dark: "#58351d" },
    { base: "#7a4a2b", grain: "#62381f", dark: "#472714" },
    { base: "#9a653f", grain: "#7d502f", dark: "#5f3b21" },
    { base: "#8c5836", grain: "#714528", dark: "#53311b" },
    { base: "#7f4f2e", grain: "#663d22", dark: "#4b2b17" },
  ];

  for (let r = 0; r < rows; r++) {
    const y = r * plankH;
    const offset = r % 2 === 0 ? 0 : plankW / 2;

    for (let c = -1; c < cols; c++) {
      const x = c * plankW + offset;
      const rawIndex = r * 5 + (c + 2) * 3 + (r % 4);
      const paletteIndex = ((rawIndex % oakPalette.length) + oakPalette.length) % oakPalette.length;
      const shade = oakPalette[paletteIndex] || oakPalette[0];

      // Base plank color
      ctx.fillStyle = shade.base;
      ctx.fillRect(x, y, plankW, plankH);

      // Fine wood grain fibers
      ctx.strokeStyle = shade.grain;
      ctx.lineWidth = 1;
      ctx.globalAlpha = 0.28;
      for (let g = 0; g < 14; g++) {
        const gy = y + 4 + g * 4.2;
        ctx.beginPath();
        ctx.moveTo(x, gy);
        ctx.bezierCurveTo(
          x + plankW * 0.35, gy + Math.sin(x * 0.05 + g) * 3,
          x + plankW * 0.70, gy + Math.cos(x * 0.05 + g) * 3,
          x + plankW, gy
        );
        ctx.stroke();
      }

      // Natural wood knot / whorl
      if ((r * 3 + (c + 2) * 7) % 7 === 0) {
        ctx.fillStyle = shade.dark;
        ctx.globalAlpha = 0.32;
        ctx.beginPath();
        ctx.ellipse(x + plankW * 0.45, y + plankH * 0.5, 12, 5, 0.08, 0, Math.PI * 2);
        ctx.fill();
      }

      // Plank bevel groove outline (dark recessed seam)
      ctx.globalAlpha = 1.0;
      ctx.strokeStyle = "#27160c";
      ctx.lineWidth = 2.5;
      ctx.strokeRect(x, y, plankW, plankH);

      // Top subtle specular highlight on beveled edge
      ctx.strokeStyle = "rgba(255, 235, 205, 0.15)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(x + 1, y + 1);
      ctx.lineTo(x + plankW - 1, y + 1);
      ctx.stroke();
    }
  }

  const map = new THREE.CanvasTexture(canvas);
  map.wrapS = THREE.RepeatWrapping;
  map.wrapT = THREE.RepeatWrapping;
  map.repeat.set(4, 4);

  // 2. Matching Roughness Map Canvas
  const rCanvas = document.createElement("canvas");
  rCanvas.width = 512;
  rCanvas.height = 512;
  const rCtx = rCanvas.getContext("2d")!;

  // Smooth varnished wood surface (~0.30 roughness)
  rCtx.fillStyle = "#4c4c4c";
  rCtx.fillRect(0, 0, 512, 512);

  // Grooves are rough & diffuse (~0.90 roughness)
  rCtx.strokeStyle = "#e5e5e5";
  rCtx.lineWidth = 3;
  const rPlankH = 32;
  const rPlankW = 128;
  for (let y = 0; y < 512; y += rPlankH) {
    rCtx.beginPath();
    rCtx.moveTo(0, y);
    rCtx.lineTo(512, y);
    rCtx.stroke();

    const offset = (y / rPlankH) % 2 === 0 ? 0 : rPlankW / 2;
    for (let x = offset; x < 512; x += rPlankW) {
      rCtx.beginPath();
      rCtx.moveTo(x, y);
      rCtx.lineTo(x, y + rPlankH);
      rCtx.stroke();
    }
  }

  const roughnessMap = new THREE.CanvasTexture(rCanvas);
  roughnessMap.wrapS = THREE.RepeatWrapping;
  roughnessMap.wrapT = THREE.RepeatWrapping;
  roughnessMap.repeat.set(4, 4);

  return { map, roughnessMap };
}

/**
 * Plush Geometric Area Rug / Carpet Texture
 */
export function createCarpetTexture(): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext("2d")!;

  // Warm Charcoal / Slate textured wool base
  ctx.fillStyle = "#1e293b";
  ctx.fillRect(0, 0, 512, 512);

  // Micro-weave noise
  ctx.fillStyle = "#26354a";
  for (let i = 0; i < 6000; i++) {
    const rx = Math.random() * 512;
    const ry = Math.random() * 512;
    ctx.fillRect(rx, ry, 2, 2);
  }

  // Scandinavian minimal geometric diamond trellis pattern
  ctx.strokeStyle = "#38475e";
  ctx.lineWidth = 2.5;
  for (let i = -512; i < 1024; i += 64) {
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i + 512, 512);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(i + 512, 0);
    ctx.lineTo(i, 512);
    ctx.stroke();
  }

  // Thick woven border border
  ctx.strokeStyle = "#475569";
  ctx.lineWidth = 16;
  ctx.strokeRect(8, 8, 496, 496);

  ctx.strokeStyle = "#64748b";
  ctx.lineWidth = 2;
  ctx.strokeRect(16, 16, 480, 480);

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(2, 2);
  return texture;
}

/**
 * Modern Architectural Wooden Fluted Slat Accent Wall Texture
 */
export function createAcousticSlatsTexture(): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext("2d")!;

  // Dark acoustic felt backing
  ctx.fillStyle = "#090d16";
  ctx.fillRect(0, 0, 512, 512);

  // Vertical warm oak slats
  const slatW = 20;
  const gap = 12;
  const total = slatW + gap;

  for (let x = 0; x < 512; x += total) {
    // Slat drop shadow on felt
    ctx.fillStyle = "rgba(0,0,0,0.6)";
    ctx.fillRect(x + slatW, 0, 4, 512);

    // Warm oak slat face
    const grad = ctx.createLinearGradient(x, 0, x + slatW, 0);
    grad.addColorStop(0.0, "#a06b43");
    grad.addColorStop(0.2, "#be8357");
    grad.addColorStop(0.8, "#b3794e");
    grad.addColorStop(1.0, "#8d5c36");
    ctx.fillStyle = grad;
    ctx.fillRect(x, 0, slatW, 512);

    // Fine vertical grain lines
    ctx.strokeStyle = "#7c4e2b";
    ctx.lineWidth = 1;
    ctx.globalAlpha = 0.25;
    for (let l = 0; l < 4; l++) {
      const lx = x + 4 + l * 4;
      ctx.beginPath();
      ctx.moveTo(lx, 0);
      ctx.lineTo(lx, 512);
      ctx.stroke();
    }
    ctx.globalAlpha = 1.0;
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(3, 1);
  return texture;
}

/**
 * Outside Dynamic Sky & Weather Panoramic Texture
 */
export function createSkyTexture(isDay: boolean): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 512;
  const ctx = canvas.getContext("2d")!;

  if (isDay) {
    // Atmospheric Day Sky Gradient
    const grad = ctx.createLinearGradient(0, 0, 0, 512);
    grad.addColorStop(0.0, "#0284c7"); // Deep Azure Zenith
    grad.addColorStop(0.45, "#38bdf8"); // Sky Blue
    grad.addColorStop(0.75, "#bae6fd"); // Atmosphere Haze
    grad.addColorStop(0.95, "#fef3c7"); // Warm Golden Horizon
    grad.addColorStop(1.0, "#fed7aa"); // Sun Glow
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 1024, 512);

    // Sun coronal glow overlay
    const sunGrad = ctx.createRadialGradient(280, 220, 20, 280, 220, 240);
    sunGrad.addColorStop(0.0, "rgba(255, 255, 255, 0.95)");
    sunGrad.addColorStop(0.25, "rgba(254, 240, 138, 0.65)");
    sunGrad.addColorStop(0.6, "rgba(251, 191, 36, 0.2)");
    sunGrad.addColorStop(1.0, "rgba(251, 191, 36, 0)");
    ctx.fillStyle = sunGrad;
    ctx.fillRect(0, 0, 1024, 512);

    // Distant soft blue mountain silhouettes
    ctx.fillStyle = "#0369a1";
    ctx.globalAlpha = 0.28;
    ctx.beginPath();
    ctx.moveTo(0, 360);
    for (let x = 0; x <= 1024; x += 64) {
      const y = 350 + Math.sin(x * 0.012) * 28 + Math.cos(x * 0.024) * 16;
      ctx.lineTo(x, y);
    }
    ctx.lineTo(1024, 512);
    ctx.lineTo(0, 512);
    ctx.fill();

    // Layer of lush green tree silhouettes outside window
    ctx.fillStyle = "#0f766e";
    ctx.globalAlpha = 0.45;
    ctx.beginPath();
    ctx.moveTo(0, 420);
    for (let x = 0; x <= 1024; x += 32) {
      const y = 410 + Math.sin(x * 0.04) * 16 + Math.cos(x * 0.09) * 12;
      ctx.lineTo(x, y);
    }
    ctx.lineTo(1024, 512);
    ctx.lineTo(0, 512);
    ctx.fill();
    ctx.globalAlpha = 1.0;
  } else {
    // Cosmic Midnight Sky Gradient
    const grad = ctx.createLinearGradient(0, 0, 0, 512);
    grad.addColorStop(0.0, "#02040a"); // Space Black
    grad.addColorStop(0.4, "#0b0f19"); // Deep Midnight Navy
    grad.addColorStop(0.8, "#171a33"); // Cosmic Twilight Indigo
    grad.addColorStop(1.0, "#1e2442"); // Distant City Glow Horizon
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 1024, 512);

    // Milky Way subtle starry nebula dust
    const nebula = ctx.createRadialGradient(700, 180, 30, 700, 180, 300);
    nebula.addColorStop(0.0, "rgba(99, 102, 241, 0.22)");
    nebula.addColorStop(0.5, "rgba(56, 189, 248, 0.12)");
    nebula.addColorStop(1.0, "rgba(0, 0, 0, 0)");
    ctx.fillStyle = nebula;
    ctx.fillRect(0, 0, 1024, 512);

    // Distant City Skyline Silhouette with golden & cyan bokeh window lights
    ctx.fillStyle = "#050814";
    ctx.globalAlpha = 0.95;
    const bWidths = [45, 65, 35, 75, 50, 40, 85, 55, 70, 45, 95, 50, 75, 40, 60, 80];
    let cx = 10;
    for (let b = 0; b < bWidths.length && cx < 1024; b++) {
      const bw = bWidths[b];
      const bh = 95 + (b * 39) % 155;
      const by = 512 - bh;
      ctx.fillRect(cx, by, bw, bh);

      // Glowing windows
      ctx.fillStyle = (b % 3 === 0) ? "#38bdf8" : "#fef08a";
      ctx.globalAlpha = 0.75;
      for (let wy = by + 14; wy < 490; wy += 18) {
        for (let wx = cx + 8; wx < cx + bw - 10; wx += 14) {
          if ((wx * 3 + wy * 5) % 4 === 0) {
            ctx.fillRect(wx, wy, 4, 6);
          }
        }
      }
      ctx.fillStyle = "#050814";
      ctx.globalAlpha = 0.95;
      cx += bw + 8;
    }
    ctx.globalAlpha = 1.0;
  }

  return new THREE.CanvasTexture(canvas);
}

/**
 * Bedside Digital LED Clock Texture (Shows live local time!)
 */
export function createDigitalClockTexture(hours: number, minutes: number): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 128;
  const ctx = canvas.getContext("2d")!;

  // Matte dark bezel
  ctx.fillStyle = "#0a0e17";
  ctx.fillRect(0, 0, 256, 128);

  // Digital LED Display Glass
  ctx.fillStyle = "#030712";
  ctx.fillRect(12, 12, 232, 104);

  // Formatted Time String
  const timeStr = `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;

  // Soft LED Glow
  ctx.shadowColor = "#34d399";
  ctx.shadowBlur = 12;
  ctx.fillStyle = "#34d399";
  ctx.font = "bold 58px 'Courier New', monospace";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(timeStr, 128, 64);

  // Subtext: LOCAL TIME
  ctx.shadowBlur = 0;
  ctx.fillStyle = "#059669";
  ctx.font = "bold 12px sans-serif";
  ctx.fillText("LIVE LOCAL TIME", 128, 100);

  return new THREE.CanvasTexture(canvas);
}

/**
 * High-End Developer Art Poster Texture for Room Wall
 */
export function createPosterTexture(): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 768;
  const ctx = canvas.getContext("2d")!;

  // Deep dark gradient backdrop
  const grad = ctx.createLinearGradient(0, 0, 512, 768);
  grad.addColorStop(0.0, "#090d16");
  grad.addColorStop(0.5, "#1e1b4b");
  grad.addColorStop(1.0, "#0f172a");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 512, 768);

  // Geometric wireframe neon ring
  ctx.strokeStyle = "#6366f1";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(256, 320, 160, 0, Math.PI * 2);
  ctx.stroke();

  ctx.strokeStyle = "#38bdf8";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(256, 320, 130, 0, Math.PI * 2);
  ctx.stroke();

  // Typography
  ctx.fillStyle = "#ffffff";
  ctx.font = "900 36px sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("ARCHITECT", 256, 290);
  ctx.fillStyle = "#38bdf8";
  ctx.fillText("THE FUTURE", 256, 340);

  ctx.fillStyle = "#94a3b8";
  ctx.font = "bold 14px monospace";
  ctx.fillText("CLEAN ARCHITECTURE • FULL-STACK", 256, 390);

  // Bottom Identity Brand
  ctx.fillStyle = "#6366f1";
  ctx.fillRect(64, 620, 384, 2);

  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 20px sans-serif";
  ctx.fillText("MUHAMMAD FATIH RAHMAN", 256, 660);

  ctx.fillStyle = "#38bdf8";
  ctx.font = "14px monospace";
  ctx.fillText("Telkom University Jakarta", 256, 690);

  return new THREE.CanvasTexture(canvas);
}

/**
 * Realistic Architecture Whiteboard Diagram Texture
 */
export function createWhiteboardTexture(): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 512;
  const ctx = canvas.getContext("2d")!;

  // Glossy Whiteboard surface with subtle ambient sheen
  ctx.fillStyle = "#f8fafc";
  ctx.fillRect(0, 0, 1024, 512);

  // Diagram Title
  ctx.fillStyle = "#0f172a";
  ctx.font = "bold 26px sans-serif";
  ctx.fillText("CORE SYSTEM ARCHITECTURE (Clean Architecture)", 40, 48);

  // Architecture Diagram Nodes (Marker style)
  const drawNode = (x: number, y: number, w: number, h: number, title: string, sub: string, border: string) => {
    ctx.strokeStyle = border;
    ctx.lineWidth = 3;
    ctx.fillStyle = "#ffffff";
    if (ctx.roundRect) {
      ctx.roundRect(x, y, w, h, 10);
    } else {
      ctx.fillRect(x, y, w, h);
    }
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = "#0f172a";
    ctx.font = "bold 16px sans-serif";
    ctx.fillText(title, x + 16, y + 28);
    ctx.fillStyle = "#64748b";
    ctx.font = "12px monospace";
    ctx.fillText(sub, x + 16, y + 50);
  };

  // Flow Nodes
  drawNode(40, 110, 260, 68, "Flutter App (Mobile)", "Riverpod • Dio • Offline Cache", "#2563eb");
  drawNode(40, 200, 260, 68, "Next.js 14 / VILT Web", "TypeScript • Server Components", "#059669");
  drawNode(380, 155, 270, 75, "API Gateway / Backend", "Laravel 11 • Node.js Express", "#7c3aed");
  drawNode(730, 95, 250, 64, "PostgreSQL Database", "Relational • ACID Compliance", "#d97706");
  drawNode(730, 175, 250, 64, "Redis & WebSockets", "Real-time Pub/Sub & Caching", "#dc2626");
  drawNode(730, 255, 250, 64, "Midtrans Payment API", "Secure Snap Webhooks", "#0891b2");

  // Connective Flow Arrows
  ctx.strokeStyle = "#475569";
  ctx.lineWidth = 2.5;

  // Arrow 1: Mobile -> Gateway
  ctx.beginPath();
  ctx.moveTo(300, 144);
  ctx.lineTo(380, 192);
  ctx.stroke();

  // Arrow 2: Web -> Gateway
  ctx.beginPath();
  ctx.moveTo(300, 234);
  ctx.lineTo(380, 192);
  ctx.stroke();

  // Arrow 3: Gateway -> DBs
  ctx.beginPath();
  ctx.moveTo(650, 192);
  ctx.lineTo(730, 127);
  ctx.moveTo(650, 192);
  ctx.lineTo(730, 207);
  ctx.moveTo(650, 192);
  ctx.lineTo(730, 287);
  ctx.stroke();

  // Colorful Sticky Notes at bottom
  const notes = [
    { text: "⚡ Target Latency < 100ms", x: 60, y: 340, bg: "#fef08a" },
    { text: "🛡️ Idempotent Payments", x: 280, y: 340, bg: "#fbcfe8" },
    { text: "📦 Clean Architecture 100%", x: 500, y: 340, bg: "#bbf7d0" },
    { text: "🚀 7 Shipped Projects", x: 740, y: 340, bg: "#bae6fd" },
  ];

  notes.forEach((n) => {
    ctx.fillStyle = n.bg;
    ctx.shadowColor = "rgba(0,0,0,0.15)";
    ctx.shadowBlur = 8;
    ctx.fillRect(n.x, n.y, 180, 110);
    ctx.shadowBlur = 0;

    ctx.fillStyle = "#1e293b";
    ctx.font = "bold 15px sans-serif";
    ctx.fillText(n.text, n.x + 14, n.y + 60);
  });

  return new THREE.CanvasTexture(canvas);
}

/**
 * Soft Glowing Circular Particle Texture for Dust Motes (Eliminates square blocky particles)
 */
export function createSoftParticleTexture(): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext("2d")!;

  const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  grad.addColorStop(0.0, "rgba(255, 245, 180, 1.0)");
  grad.addColorStop(0.25, "rgba(254, 215, 170, 0.7)");
  grad.addColorStop(0.65, "rgba(251, 146, 60, 0.2)");
  grad.addColorStop(1.0, "rgba(0, 0, 0, 0)");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 64, 64);

  return new THREE.CanvasTexture(canvas);
}

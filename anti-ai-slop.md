# Anti-AI-Slop & Neo-Brutalism Design System Directive

This document defines the strict aesthetic and technical constraints for the website to eliminate generic "AI slop" and establish an authentic, high-impact **Neo-Brutalist** design language.

---

## 🚫 1. Banned "AI Slop" Anti-Patterns
* **NO generic purple/indigo gradients**: Ban the cliché `#6366f1` to `#a855f7` soft gradient text and background glows.
* **NO floating blur blobs**: Ban meaningless `filter: blur(120px)` color blobs floating in dark voids.
* **NO fuzzy multi-layer shadows**: Ban soft Gaussian blur shadows (`box-shadow: 0 20px 25px -5px rgba(...)`).
* **NO generic glassmorphism**: Ban standard semi-transparent frosted cards with thin opacity borders.
* **NO repetitive cookie-cutter 3-column feature cards** with identical icon-heading-paragraph formulas.
* **NO decorative sparkle (✨) emojis** as filler badges.

---

## ⚡ 2. Neo-Brutalism Core Rules

### A. Stark Geometric Borders & Hard Block Shadows
* **Borders**: Everything has an explicit, high-contrast border: `border-2 border-black` or `border-3 border-black` (in dark mode: `border-2 border-white` or `border-2 border-black` on high-contrast surfaces).
* **Hard Block Shadows**:
  - Small elements: `shadow-[3px_3px_0px_0px_#000]`
  - Standard cards/buttons: `shadow-[5px_5px_0px_0px_#000]`
  - Hero containers & featured displays: `shadow-[8px_8px_0px_0px_#000]`
* **Mechanical Micro-Interactions**:
  - Hover: `hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_0px_#000]`
  - Active (Press): `active:translate-x-1 active:translate-y-1 active:shadow-[1px_1px_0px_0px_#000]` (simulates a physical tactile mechanical switch).

### B. High-Contrast Neo-Brutalist Color Palette
* **Canvas Foundation**: Rich cream `#FFFDF8` (or stark brutalist dark `#0F0F12` with solid color blocks).
* **High-Voltage Pop Colors**:
  - **Electric Canary**: `#FFE600` (Primary attention, badges, CTA highlights)
  - **Neo Mint / Acid Lime**: `#00F08B` (Status indicators, live demos, success)
  - **Stark Cyan**: `#00D2FF` (WebGL, tech tags, links)
  - **Vivid Punch Pink**: `#FF3366` (Featured alerts, active toggles)
  - **Royal Ultra Violet**: `#8B5CF6` (Architecture, structural highlights)
* **Ink & Outlines**: Deepest Solid Black `#000000` for all strokes and typography.

### C. Bold & Opinionated Typography
* **Display Font**: Space Grotesk / Syne / Epilogue — heavy weights (`font-black`, `font-extrabold`), tight tracking (`tracking-tight`), uppercase headers.
* **Telemetry & Metadata**: JetBrains Mono / Courier — uppercase, bracketed labels (`[SYSTEM::ONLINE]`, `(01) // WORK`), raw status tags.
* **Sticker / Stamp Elements**: Rotated badges (`-rotate-1`, `rotate-2`), marquee ribbons, high-contrast tape headers.

---

## 🕹️ 3. 3D WebGL Room Neo-Brutalist Adaptation
* **Cell & Outlines**: Hard contrast materials and outlines on 3D geometry.
* **Pop Accent Palette**: Desk and frames adopt bold Canary Yellow, Mint, and Cyan block tones with pitch-black accents.
* **Posters & Galleries**: Thick black border frames with 3D drop-block depth instead of soft glass glow.
* **HUD Overlay**: Neo-brutalist tactile control bar with `bg-[#FFE600] text-black border-2 border-black shadow-[4px_4px_0px_#000]`, hard buttons, and arcade-like telemetry.

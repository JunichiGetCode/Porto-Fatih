# 🚀 3D Interactive Room Portfolio — Open Source Starter Template

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-16.2.10-black?style=for-the-badge&logo=next.js&logoColor=white)
![Three.js](https://img.shields.io/badge/Three.js-0.187.0-black?style=for-the-badge&logo=three.js&logoColor=white)
![React](https://img.shields.io/badge/React-19.2.4-blue?style=for-the-badge&logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.0-38BDF8?style=for-the-badge&logo=tailwindcss&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-emerald?style=for-the-badge)

<p align="center">
  A futuristic, hardware-accelerated <b>3D WebGL virtual developer room</b> portfolio template built with <b>Next.js 16</b>, <b>Three.js</b>, <b>React 19</b>, and <b>Tailwind CSS v4</b>.
  <br />
  Includes first-person 360° POV, WASD walking navigation, dynamic Day/Night lighting, interactive furniture modals, and an automatic responsive 2D scroll fallback for mobile devices.
</p>

</div>

---

## ✨ Features at a Glance

* **🎮 First-Person 360° POV & Free Roam**: Walk around the room using `[W]`, `[A]`, `[S]`, `[D]` keys or look around naturally with mouse drag and edge-panning. Built-in collision boundaries keep camera securely inside the room.
* **💡 Dynamic Lighting & Day/Night Cycle**: Toggle between bright natural daylight through the window and cozy midnight ambiance with starfield and moon, alongside controllable ceiling and desk lamps.
* **📱 Intelligent Device Detection (Mobile Fallback)**: Automatically serves an optimized, high-performance **2D Classic Scroll Portfolio** on smartphones and touch devices (< 768px), while seamlessly delivering the full **3D Virtual Room Experience** on desktops and laptops.
* **🌐 Complete Bilingual Support (i18n)**: One-click instant language toggle between **Indonesian 🇮🇩** and **English 🇬🇧**, fully synced across preloader, 3D HUD, interactive modals, and 2D components.
* **🎨 100% Procedural Shaders & Canvas Textures**: Zero bloated external image downloads for room surfaces! Herringbone parquet flooring, acoustic wood fluted slats, soft wool carpet, real-time LED clock, and glowing particle galaxy are dynamically generated via HTML5 canvas.
* **⚡ 1-Minute Centralized Customization**: Change your name, bio, projects, avatar, and social links in a single file (`src/config/portfolio.config.ts`) without digging into Three.js WebGL code.

---

## 🛠️ Tech Stack Architecture

| Layer | Technology | Purpose |
| :--- | :--- | :--- |
| **Framework** | Next.js 16 (App Router + Turbopack) | Fast SSR/SSG rendering, routing & bundling |
| **3D Engine** | Three.js v0.187.0 + WebGL 2.0 | 3D room rendering, PBR materials & raycaster |
| **UI Library** | React 19 (`react`, `react-dom`) | Modern state & component lifecycle |
| **Styling** | Tailwind CSS v4 (`@tailwindcss/postcss`) | High-performance CSS design system |
| **Language** | TypeScript 5 | Strict type-safety across models and configs |
| **State & i18n** | React Context (`LanguageContext`) | Bilingual state management & local persistence |

---

## 🚀 Quick Start

### Prerequisites
* **Node.js**: `v20.x` or higher (LTS recommended)
* **Package Manager**: `npm`, `pnpm`, or `yarn`
* **Modern Web Browser**: Google Chrome, Edge, Firefox, Safari, or Brave with WebGL 2.0 and Hardware Acceleration enabled.

### 1. Clone the repository
```bash
git clone https://github.com/JunichiGetCode/Porto-Fatih.git
cd Porto-Fatih
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run development server
```bash
npm run dev
```
Open **[http://localhost:3000](http://localhost:3000)** in your browser to explore the 3D room.

---

## ⚙️ How to Customize (Only 3 Steps!)

This open-source template is intentionally designed so you **never** have to write complex Three.js math just to update your portfolio.

### Step 1: Edit `src/config/portfolio.config.ts`
Open [`src/config/portfolio.config.ts`](./src/config/portfolio.config.ts) and replace the placeholder fields with your own details:
```typescript
export const portfolioConfig = {
  personal: {
    name: "Alex Johnson",
    firstName: "Alex",
    lastName: "Johnson",
    role: "Full-Stack Software Engineer",
    institution: "Computer Science & Engineering",
    email: "alex@example.com",
    avatar: "/avatar.svg", // place your photo/avatar in /public
    githubUrl: "https://github.com/your-username",
    linkedinUrl: "https://linkedin.com/in/your-username",
    whatsappUrl: "https://wa.me/your-phone-number",
  },
  // Add your showcase projects
  projects: [
    {
      id: "my-project",
      title: "My Super App",
      subtitle: "Enterprise Next.js Platform",
      category: "web",
      description: "...",
      image: "/projects/my-screenshot.png",
      liveUrl: "https://my-app.vercel.app",
      githubUrl: "https://github.com/...",
      caseStudy: { ... }
    }
  ]
};
```

### Step 2: Replace Your Avatar & Screenshots
* Put your profile photo or avatar in the `public/` directory (e.g., `public/avatar.svg` or `public/profile.jpg`).
* Place your project preview screenshots into `public/projects/`.

### Step 3: Run Build & Deploy!
```bash
npm run build
```

---

## 📁 Directory Structure

```text
├── public/                     # Static assets (avatars, sample project previews, posters)
│   ├── projects/               # Showcase project UI previews
│   ├── posters/                # 3D room wall posters
│   └── avatar.svg              # Default developer avatar
├── src/
│   ├── app/                    # Next.js 16 App Router (layout.tsx, page.tsx, globals.css)
│   ├── config/
│   │   └── portfolio.config.ts # ⭐ SINGLE SOURCE OF TRUTH (Customize here!)
│   ├── context/
│   │   ├── LanguageContext.tsx # Bilingual ID/EN state management
│   │   └── translations.ts     # Content localization dictionaries
│   └── components/
│       ├── ThreeRoom/          # 3D WebGL Room Components
│       │   ├── RoomCanvas.tsx  # Three.js Scene, Lighting, Camera, Raycasting & Mesh
│       │   ├── RoomHUD.tsx     # Floating HUD, time toggle, light toggle, bottom dock
│       │   ├── RoomPreloader.tsx # Holographic rotating cyber preloader
│       │   ├── RoomModalView.tsx # Section modal detail overlay
│       │   ├── RoomGuideModal.tsx# Interactive navigation manual & hotkeys
│       │   ├── RoomPortfolio.tsx # Master controller & device detector
│       │   └── roomTextures.ts # Dynamic procedural canvas textures generator
│       ├── HeroSection.tsx     # 2D Classic fallback Hero
│       ├── AboutSection.tsx    # 2D Classic fallback About
│       ├── ProjectsSection.tsx # 2D Classic fallback Projects
│       ├── SkillsSection.tsx   # 2D Classic fallback Skills
│       ├── ContactSection.tsx  # 2D Classic fallback Contact
│       └── Footer.tsx          # 2D Classic fallback Footer
├── package.json
└── README.md
```

---

## ⌨️ Room Controls & Navigation

| Control | Action |
| :--- | :--- |
| **Mouse Drag / Cursor Pan** | Rotate camera angle 360° (first-person look) |
| **`[W]` / `[A]` / `[S]` / `[D]`** | Walk forward, left, backward, and right |
| **`[Q]` / `[E]` or Arrow Keys** | Turn camera left / right via keyboard |
| **Click on Dual PC Monitors** | Focus workstation & open Projects Modal |
| **Click on Bed Lounge** | Focus lounge area & open About Modal |
| **Click on Bookshelf / Board** | Focus study area & open Skills & Tech Stack |
| **Click on Door / Phone** | Open Direct Contact & Collaboration Modal |
| **Click on Ceiling Lamp** | Toggle room lighting ON / OFF |
| **Top HUD Buttons** | Switch Day/Night, Reset POV, or Toggle 2D Classic View |

---

## 🚢 Deploying to Vercel

The easiest way to deploy this project is via [Vercel](https://vercel.com):

1. Push your repository to GitHub.
2. Sign in to [Vercel](https://vercel.com) and click **"Add New"** > **"Project"**.
3. Import your GitHub repository.
4. Leave the default build settings (`npm run build`) and click **"Deploy"**.
5. Your live 3D Room Portfolio will be ready in under 2 minutes!

---

## 📄 License

This project is licensed under the [MIT License](./LICENSE). You are free to fork, customize, modify, and use it for your personal or commercial portfolio!

---

<div align="center">
  <b>⭐ If you find this template helpful, don't forget to give it a star on GitHub! ⭐</b>
</div>

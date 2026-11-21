export interface ProjectCaseStudy {
  challenge: string;
  role: string;
  architecture: string[];
  results: string[];
  metrics: { label: string; value: string }[];
}

export interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  category: "mobile" | "web";
  period: string;
  description: string;
  impactBadge: string;
  highlights: string[];
  status: string;
  image: string;
  caseStudy: ProjectCaseStudy;
  liveUrl?: string;
  githubUrl?: string;
}

export interface SkillCategory {
  id: string;
  title: string;
  description: string;
  skills: {
    name: string;
    focus: string;
    tag: string;
  }[];
}

export const portfolioConfig = {
  // ==========================================
  // PERSONAL IDENTITY (Customize in 1 minute!)
  // ==========================================
  personal: {
    name: "Developer Name",
    firstName: "Developer",
    lastName: "Name",
    role: "Full-Stack Web & Mobile Developer",
    tagline: "Web & Mobile Developer specializing in high-performance digital products and scalable systems.",
    institution: "Software Engineering & Computer Science",
    location: "Jakarta, Indonesia",
    email: "developer@example.com",
    phone: "+62 812-0000-0000",
    avatar: "/avatar.svg",
    githubUrl: "https://github.com/yourusername",
    linkedinUrl: "https://linkedin.com/in/yourusername",
    whatsappUrl: "https://wa.me/6281200000000",
    resumeUrl: "#",
    openForWork: true,
  },

  // ==========================================
  // 3D ROOM SPECIFIC BRANDING
  // ==========================================
  room: {
    roomTitle: "3D ROOM SUITE",
    badge: "POV Room v2.0",
    experienceBanner: "INTERACTIVE 3D VIRTUAL SUITE",
    introDescription: {
      id: "Masuki ruang kerja virtual interaktif berbasis WebGL 3D. Jelajahi karya teruji, keahlian arsitektur kode, dan rekam jejak teknologi langsung dari sudut pandang nyata.",
      en: "Step into an interactive 3D WebGL virtual workstation. Explore production projects, clean architecture practices, and tech journey from an authentic first-person perspective.",
    },
  },

  // ==========================================
  // FEATURED TEMPLATE PROJECTS
  // ==========================================
  projects: [
    {
      id: "cloud-pos",
      title: "Cloud POS & Retail SaaS",
      subtitle: "Enterprise Point of Sale & Inventory Analytics",
      category: "web" as const,
      period: "2025 - Present",
      description: "Full-stack cloud-native POS suite featuring sub-100ms inventory updates, automated multi-channel invoice dispatch, and high-concurrency payment gateways.",
      impactBadge: "99.98% Uptime • 15K+ Txns",
      highlights: [
        "Event-driven architecture with optimistic UI updates",
        "Automated PDF tax receipt generation & email webhook pipelines",
        "PCI-DSS compliant payment processing with auto-reconciliation",
      ],
      status: "Production Ready",
      image: "/projects/sample-saas.svg",
      liveUrl: "https://example.com/demo",
      githubUrl: "https://github.com/yourusername/cloud-pos",
      caseStudy: {
        challenge: "Handling concurrent orders and real-time inventory adjustments across multiple store branches without table locks.",
        role: "Lead Full-Stack Architect & System Engineer",
        architecture: ["Next.js 16 (App Router)", "TypeScript", "PostgreSQL", "Tailwind CSS", "Redis"],
        results: ["Reduced order settlement latency to under 90ms", "Zero data anomalies under 1,000 req/sec stress tests"],
        metrics: [
          { label: "Daily Transactions", value: "15,000+" },
          { label: "P95 Latency", value: "< 95ms" },
          { label: "Sync Accuracy", value: "100%" },
          { label: "API Uptime", value: "99.98%" },
        ],
      },
    },
    {
      id: "mobile-suite",
      title: "Clean Mobile Application",
      subtitle: "Cross-Platform Mobile App with BLoC State",
      category: "mobile" as const,
      period: "2025",
      description: "High-performance cross-platform mobile application built with Clean Architecture, offline-first SQLite sync, and reactive BLoC state management.",
      impactBadge: "4.9★ Rating • 25K+ Active Users",
      highlights: [
        "Separation of concerns across Domain, Data, and Presentation layers",
        "Local encrypted SQLite caching for offline resilience",
        "60 FPS smooth physics transitions across Android and iOS",
      ],
      status: "Production Ready",
      image: "/projects/sample-mobile.svg",
      liveUrl: "https://example.com/mobile",
      githubUrl: "https://github.com/yourusername/clean-mobile-app",
      caseStudy: {
        challenge: "Ensuring zero data loss and seamless background synchronization when users navigate remote areas with intermittent connection.",
        role: "Mobile Solutions Lead & Flutter Specialist",
        architecture: ["Flutter", "Dart", "BLoC Pattern", "SQLite / Drift", "Clean Architecture"],
        results: ["Maintained 60 FPS UI rendering without jank", "Reduced network payload by 45% via delta compression"],
        metrics: [
          { label: "Cold Start Time", value: "< 650ms" },
          { label: "Crash-Free Sessions", value: "99.95%" },
          { label: "Active Installs", value: "25,000+" },
          { label: "App Store Rating", value: "4.9 / 5.0" },
        ],
      },
    },
    {
      id: "ai-studio",
      title: "AI Simulation & Speech Studio",
      subtitle: "Real-Time Adaptive LLM Assessment Engine",
      category: "web" as const,
      period: "2025",
      description: "Voice-driven interactive AI assessment suite utilizing streaming LLM tokens, Web Audio API visualization, and dynamic scoring rubric algorithms.",
      impactBadge: "Sub-400ms Streaming Latency",
      highlights: [
        "WebSocket bi-directional audio streaming with real-time feedback",
        "Deterministic JSON rubric scoring across 4 evaluation pillars",
        "Multi-modal prompt orchestration with guardrails",
      ],
      status: "Production Ready",
      image: "/projects/sample-ai.svg",
      liveUrl: "https://example.com/ai-studio",
      githubUrl: "https://github.com/yourusername/ai-studio",
      caseStudy: {
        challenge: "Minimizing speech-to-text to LLM reasoning latency so conversational feedback feels fluid and natural.",
        role: "AI Integration & Frontend Engineer",
        architecture: ["Next.js", "WebSockets", "Web Audio API", "Tailwind CSS", "OpenAI / Claude API"],
        results: ["Cut round-trip conversational turn time by 50%", "Implemented structured output validation preventing hallucinations"],
        metrics: [
          { label: "Audio Turnaround", value: "< 420ms" },
          { label: "Evaluation Precision", value: "96.4%" },
          { label: "Streaming Tokens", value: "85 tps" },
          { label: "Client Satisfaction", value: "98%" },
        ],
      },
    },
    {
      id: "event-hub",
      title: "Event Hub & Ticketing Portal",
      subtitle: "High-Volume Ticketing & Fast-Pass QR Check-In",
      category: "web" as const,
      period: "2024",
      description: "Scalable event management and ticketing platform with cryptographic QR verification, dynamic seat reservation, and idempotent payment dispatch.",
      impactBadge: "5,000+ Concurrent Check-Ins",
      highlights: [
        "Cryptographically signed QR tickets with offline validation",
        "Optimistic ticket holding locks preventing double-booking",
        "Real-time attendee telemetry and gate throughput analytics",
      ],
      status: "Production Ready",
      image: "/projects/sample-event.svg",
      liveUrl: "https://example.com/events",
      githubUrl: "https://github.com/yourusername/event-ticketing",
      caseStudy: {
        challenge: "Preventing ticket scalping and server overload during flash-sale releases of conference tickets.",
        role: "Full-Stack Backend & Integration Developer",
        architecture: ["Next.js", "Node.js", "Redis Queues", "PostgreSQL", "QR Crypto"],
        results: ["Handled 3,000 check-ins in under 30 minutes without queuing", "Zero double-allocation bugs across 10,000 tickets sold"],
        metrics: [
          { label: "Check-in Speed", value: "0.8s / scan" },
          { label: "Peak RPS", value: "1,200 RPS" },
          { label: "Sold Out Flow", value: "100% Idempotent" },
          { label: "Scanner Reliability", value: "99.9%" },
        ],
      },
    },
  ],

  // ==========================================
  // SKILL STACKS & TOOLING
  // ==========================================
  skills: [
    {
      id: "frontend",
      title: "Frontend & 3D Web",
      description: "Modern client-side frameworks, WebGL 3D, and high-performance UI engineering.",
      skills: [
        { name: "React 19 & Next.js 16", focus: "App Router, Server Components & Streaming", tag: "Expert" },
        { name: "Three.js & WebGL", focus: "Physically Based Rendering, Shaders & Raycasting", tag: "Advanced" },
        { name: "TypeScript", focus: "Strict type safety & domain modeling", tag: "Expert" },
        { name: "Tailwind CSS v4", focus: "Design systems & responsive micro-interactions", tag: "Expert" },
      ],
    },
    {
      id: "mobile",
      title: "Mobile Development",
      description: "Cross-platform engineering with native performance and clean code architecture.",
      skills: [
        { name: "Flutter & Dart", focus: "Clean Architecture, BLoC State & Offline Sync", tag: "Expert" },
        { name: "iOS & Android", focus: "Platform channels, hardware access & native bridging", tag: "Advanced" },
        { name: "SQLite & Local Cache", focus: "Sub-100ms query optimization & delta sync", tag: "Advanced" },
      ],
    },
    {
      id: "backend",
      title: "Backend & Systems",
      description: "Scalable API architectures, databases, and secure payment integrations.",
      skills: [
        { name: "Node.js & TypeScript", focus: "Event-driven microservices & REST/GraphQL", tag: "Advanced" },
        { name: "PostgreSQL & Redis", focus: "Relational indexing, caching & queue management", tag: "Advanced" },
        { name: "Payment Gateways", focus: "Webhook verification & idempotent transactions", tag: "Advanced" },
      ],
    },
  ],

  // ==========================================
  // CORE ENGINEERING PRINCIPLES
  // ==========================================
  principles: [
    {
      title: "Clean Architecture & Modular Design",
      desc: "Separating business logic from delivery mechanisms ensuring high testability, maintainability, and clean codebases.",
      icon: "🏗️",
    },
    {
      title: "Performance & Responsive First",
      desc: "Sub-second initial loads, 60 FPS WebGL animations, and seamless fallbacks across mobile and desktop devices.",
      icon: "⚡",
    },
    {
      title: "Type Safety & Developer Ergonomics",
      desc: "Strict TypeScript discipline, automated linting, zero runtime regressions, and clear modular configurations.",
      icon: "🛡️",
    },
  ],
};

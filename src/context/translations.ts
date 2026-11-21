import { portfolioConfig, ProjectItem, SkillCategory, ProjectCaseStudy } from "@/config/portfolio.config";

export type Language = "id" | "en";
export type { ProjectItem, SkillCategory, ProjectCaseStudy };

export interface TranslationData {
  nav: {
    home: string;
    about: string;
    projects: string;
    skills: string;
    contact: string;
    resume: string;
  };
  hero: {
    available: string;
    roleTag: string;
    greeting: string;
    nameFirst: string;
    nameLast: string;
    typewriter: string[];
    headline: string;
    description: string;
    viewProjects: string;
    contactMe: string;
    copyEmail: string;
    emailCopied: string;
    quickStats: {
      number: string;
      label: string;
      sublabel: string;
    }[];
  };
  about: {
    badge: string;
    title1: string;
    title2: string;
    subtitle: string;
    tabs: {
      bio: string;
      timeline: string;
      philosophy: string;
    };
    bioParagraph1: string;
    bioParagraph2: string;
    stats: {
      projects: string;
      experience: string;
      technologies: string;
      modules: string;
    };
    timelineItems: {
      year: string;
      title: string;
      institution: string;
      description: string;
      tag: string;
    }[];
    principles: {
      title: string;
      desc: string;
      icon: string;
    }[];
    downloadCV: string;
  };
  projects: {
    badge: string;
    title1: string;
    title2: string;
    subtitle: string;
    filterAll: string;
    filterMobile: string;
    filterWeb: string;
    viewCaseStudy: string;
    livePreview?: string;
    closeModal: string;
    architectureTitle: string;
    resultsTitle: string;
    challengeTitle: string;
    roleTitle: string;
    items: ProjectItem[];
  };
  skills: {
    badge: string;
    title1: string;
    title2: string;
    subtitle: string;
    categories: SkillCategory[];
  };
  contact: {
    badge: string;
    title1: string;
    title2: string;
    subtitle: string;
    chatWhatsApp: string;
    sendEmail: string;
    copyEmail: string;
    emailCopied: string;
    formName: string;
    formEmail: string;
    formSubject: string;
    formMessage: string;
    formSend: string;
    formSending: string;
    formSuccess: string;
    directChannels: string;
    locationLabel: string;
    locationValue: string;
  };
  footer: {
    tagline: string;
    rights: string;
    madeWith: string;
    by: string;
    backToTop: string;
  };
}

export const translations: Record<Language, TranslationData> = {
  id: {
    nav: {
      home: "Beranda",
      about: "Tentang",
      projects: "Proyek",
      skills: "Keahlian",
      contact: "Kontak",
      resume: "Unduh CV",
    },
    hero: {
      available: "Terbuka untuk Kolaborasi & Proyek Baru",
      roleTag: portfolioConfig.personal.role,
      greeting: "Halo, saya",
      nameFirst: portfolioConfig.personal.firstName,
      nameLast: portfolioConfig.personal.lastName,
      typewriter: [
        "Full-Stack Web Developer",
        "Mobile App Engineer (Flutter)",
        "3D WebGL & Three.js Enthusiast",
        "Next.js & TypeScript Architect",
      ],
      headline: "Membangun Pengalaman Web 3D Interaktif & Aplikasi Mobile Skalabel.",
      description: "Pengembang full-stack dengan fokus pada rancang bangun aplikasi Web 3D WebGL modern (Next.js, Three.js), mobile modular (Flutter), serta sistem backend yang tangguh dan teruji.",
      viewProjects: "Lihat Koleksi Proyek",
      contactMe: "Hubungi Saya",
      copyEmail: "Salin Email",
      emailCopied: "Email Berhasil Disalin!",
      quickStats: [
        { number: "4+", label: "Proyek Unggulan", sublabel: "Aplikasi Teruji" },
        { number: "60 FPS", label: "Render 3D WebGL", sublabel: "Hardware Accelerated" },
        { number: "100%", label: "TypeScript Strict", sublabel: "Clean Architecture" },
        { number: "Multi-Platform", label: "Web & Mobile", sublabel: "Responsive Fallback" },
      ],
    },
    about: {
      badge: "Tentang Saya",
      title1: "Profil &",
      title2: "Filosofi Kode",
      subtitle: "Menyeimbangkan keindahan visual antarmuka 3D dengan ketahanan arsitektur sistem di balik layar.",
      tabs: {
        bio: "Biografi",
        timeline: "Perjalanan & Pengalaman",
        philosophy: "Prinsip Rekayasa",
      },
      bioParagraph1: "Saya adalah seorang <strong>Full-Stack & Mobile Developer</strong> yang berdedikasi membangun pengalaman digital interaktif berkinerja tinggi. Spesialisasi saya meliputi <strong>Next.js, Three.js, TypeScript, dan Flutter</strong>, memadukan grafis 3D WebGL imersif dengan arsitektur kode bersih (Clean Architecture).",
      bioParagraph2: "Dalam setiap produk, saya mengutamakan performa loading cepat, modularitas komponen, kemudahan adaptasi, dan keterbacaan kode tingkat tinggi. Template ini dirancang terbuka (open-source) agar mudah dikustomisasi oleh siapa saja hanya dengan mengubah berkas konfigurasi.",
      stats: {
        projects: "Proyek Selesai",
        experience: "Tahun Pengalaman",
        technologies: "Teknologi Terintegrasi",
        modules: "Modul Bersih",
      },
      timelineItems: [
        {
          year: "2024 - Sekarang",
          title: "Senior Full-Stack & 3D Web Engineer",
          institution: portfolioConfig.personal.institution,
          description: "Merancang arsitektur ruang 3D WebGL interaktif, integrasi state management reaktif, dan performa 60 FPS pada Next.js App Router.",
          tag: "Modern Web & 3D",
        },
        {
          year: "2024",
          title: "Mobile Solutions Lead",
          institution: "Cross-Platform Engineering",
          description: "Membangun arsitektur Feature-First Flutter dengan BLoC state, SQLite offline caching, dan sistem sinkronisasi data delta.",
          tag: "Mobile Development",
        },
        {
          year: "2023 - 2024",
          title: "Full-Stack Backend Developer",
          institution: "Cloud & Distributed Systems",
          description: "Mengembangkan REST & WebSocket API berkinerja tinggi, manajemen antrean tugas Redis, dan gateway pembayaran terverifikasi webhook.",
          tag: "Backend & Systems",
        },
      ],
      principles: portfolioConfig.principles,
      downloadCV: "Unduh Resume (PDF)",
    },
    projects: {
      badge: "Karya Unggulan",
      title1: "Studi Kasus &",
      title2: "Proyek Pilihan",
      subtitle: "Bukan sekadar visual semata—berikut adalah arsitektur modular yang memecahkan masalah performa dan keandalan sistem.",
      filterAll: "Semua Proyek",
      filterMobile: "Mobile App",
      filterWeb: "Web & Full-Stack",
      viewCaseStudy: "Lihat Studi Kasus",
      livePreview: "Buka Live Preview ↗",
      closeModal: "Tutup Detail",
      architectureTitle: "Keputusan Arsitektur",
      resultsTitle: "Dampak & Hasil Terukur",
      challengeTitle: "Tantangan Masalah",
      roleTitle: "Peran & Kontribusi",
      items: portfolioConfig.projects,
    },
    skills: {
      badge: "Keahlian & Tooling",
      title1: "Tech Stack &",
      title2: "Arsitektur",
      subtitle: "Kumpulan teknologi modern yang digunakan untuk merancang produk digital dari hulu ke hilir.",
      categories: portfolioConfig.skills,
    },
    contact: {
      badge: "Hubungi Saya",
      title1: "Mari Berkolaborasi &",
      title2: "Bangun Proyek Hebat",
      subtitle: "Tertarik menggunakan template ini, mengusulkan fitur baru, atau mendiskusikan peluang kolaborasi rekayasa perangkat lunak?",
      chatWhatsApp: "Hubungi via WhatsApp",
      sendEmail: "Kirim Email Langsung",
      copyEmail: "Salin Alamat Email",
      emailCopied: "Email Berhasil Disalin!",
      formName: "Nama Lengkap",
      formEmail: "Alamat Email",
      formSubject: "Subjek Pesan",
      formMessage: "Ceritakan tentang proyek atau ide Anda...",
      formSend: "Kirim Pesan Sekarang",
      formSending: "Membuka Klien Email...",
      formSuccess: "Pesan siap dikirimkan melalui klien email Anda!",
      directChannels: "Saluran Komunikasi Langsung",
      locationLabel: "Lokasi",
      locationValue: portfolioConfig.personal.location,
    },
    footer: {
      tagline: "Merancang dan membangun produk digital interaktif dengan presisi, kode bersih, dan performa tinggi.",
      rights: "Hak Cipta Dilindungi. Dilisensikan di bawah MIT License.",
      madeWith: "Dibuat dengan",
      by: "oleh",
      backToTop: "Kembali ke Atas",
    },
  },

  en: {
    nav: {
      home: "Home",
      about: "About",
      projects: "Projects",
      skills: "Skills",
      contact: "Contact",
      resume: "Download CV",
    },
    hero: {
      available: "Available for Collaboration & Engineering Roles",
      roleTag: portfolioConfig.personal.role,
      greeting: "Hello, I am",
      nameFirst: portfolioConfig.personal.firstName,
      nameLast: portfolioConfig.personal.lastName,
      typewriter: [
        "Full-Stack Web Developer",
        "Mobile App Engineer (Flutter)",
        "3D WebGL & Three.js Enthusiast",
        "Next.js & TypeScript Architect",
      ],
      headline: "Architecting Interactive 3D WebGL Experiences & Scalable Mobile Suites.",
      description: "Full-stack engineer specializing in interactive 3D WebGL environments (Next.js, Three.js), clean architecture mobile applications (Flutter), and resilient cloud backend architectures.",
      viewProjects: "Explore Featured Projects",
      contactMe: "Get in Touch",
      copyEmail: "Copy Email",
      emailCopied: "Email Copied!",
      quickStats: [
        { number: "4+", label: "Showcase Projects", sublabel: "Production Architecture" },
        { number: "60 FPS", label: "3D WebGL Render", sublabel: "Hardware Accelerated" },
        { number: "100%", label: "TypeScript Strict", sublabel: "Clean Code" },
        { number: "Multi-Platform", label: "Web & Mobile", sublabel: "Responsive Fallback" },
      ],
    },
    about: {
      badge: "About Me",
      title1: "Profile &",
      title2: "Engineering Ethos",
      subtitle: "Balancing elegant 3D user interfaces with rock-solid architectural durability behind the scenes.",
      tabs: {
        bio: "Biography",
        timeline: "Journey & Milestones",
        philosophy: "Engineering Principles",
      },
      bioParagraph1: "I am a <strong>Full-Stack & Mobile Developer</strong> passionate about engineering high-performance interactive digital experiences. My specialization spans <strong>Next.js, Three.js, TypeScript, and Flutter</strong>, harmonizing immersive 3D WebGL graphics with strict Clean Architecture discipline.",
      bioParagraph2: "Every product is crafted prioritizing sub-second load times, component modularity, effortless extensibility, and clean code ergonomics. This template is designed as an open-source starter to be effortlessly customized by changing a single config file.",
      stats: {
        projects: "Shipped Projects",
        experience: "Years Experience",
        technologies: "Tech Integrated",
        modules: "Clean Modules",
      },
      timelineItems: [
        {
          year: "2024 - Present",
          title: "Senior Full-Stack & 3D Web Engineer",
          institution: portfolioConfig.personal.institution,
          description: "Architected interactive 3D WebGL environments, reactive state orchestration, and 60 FPS performance on Next.js App Router.",
          tag: "Modern Web & 3D",
        },
        {
          year: "2024",
          title: "Mobile Solutions Lead",
          institution: "Cross-Platform Engineering",
          description: "Engineered Feature-First Flutter architecture with BLoC state, SQLite offline caching, and delta synchronization engines.",
          tag: "Mobile Development",
        },
        {
          year: "2023 - 2024",
          title: "Full-Stack Backend Developer",
          institution: "Cloud & Distributed Systems",
          description: "Constructed high-throughput REST & WebSocket APIs, Redis queue workers, and webhook-verified payment gateways.",
          tag: "Backend & Systems",
        },
      ],
      principles: portfolioConfig.principles,
      downloadCV: "Download CV (PDF)",
    },
    projects: {
      badge: "Featured Works",
      title1: "Case Studies &",
      title2: "Selected Projects",
      subtitle: "Far beyond static mockups—here are scalable modular architectures solving real-world performance and reliability challenges.",
      filterAll: "All Projects",
      filterMobile: "Mobile Apps",
      filterWeb: "Web & Full-Stack",
      viewCaseStudy: "View Case Study",
      livePreview: "Open Live Demo ↗",
      closeModal: "Close Details",
      architectureTitle: "Architectural Decisions",
      resultsTitle: "Measurable Impact & Results",
      challengeTitle: "Problem Statement",
      roleTitle: "Role & Key Contribution",
      items: portfolioConfig.projects,
    },
    skills: {
      badge: "Skills & Tooling",
      title1: "Tech Stacks &",
      title2: "Architecture",
      subtitle: "Modern toolset and engineering standards applied across the entire application lifecycle.",
      categories: portfolioConfig.skills,
    },
    contact: {
      badge: "Get in Touch",
      title1: "Let's Collaborate &",
      title2: "Build Something Great",
      subtitle: "Looking to deploy this 3D template, discuss innovative system architectures, or explore collaboration opportunities?",
      chatWhatsApp: "Direct WhatsApp Message",
      sendEmail: "Send Direct Email",
      copyEmail: "Copy Email Address",
      emailCopied: "Email Successfully Copied!",
      formName: "Full Name",
      formEmail: "Email Address",
      formSubject: "Subject / Project Scope",
      formMessage: "Tell me about your project or inquiry...",
      formSend: "Send Message Now",
      formSending: "Opening Email Client...",
      formSuccess: "Message ready to dispatch via your preferred email client!",
      directChannels: "Direct Communication Channels",
      locationLabel: "Location",
      locationValue: portfolioConfig.personal.location,
    },
    footer: {
      tagline: "Designing and engineering interactive digital products with precision, clean code, and high performance.",
      rights: "All Rights Reserved. Open Source Template released under MIT License.",
      madeWith: "Crafted with",
      by: "by",
      backToTop: "Back to Top",
    },
  },
};

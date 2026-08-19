export type Language = "id" | "en";

export const translations = {
  id: {
    nav: {
      home: "Home",
      about: "About",
      projects: "Projects",
      skills: "Skills",
      portfolio: "Portfolio",
      contact: "Contact",
    },
    hero: {
      available: "Tersedia untuk proyek & kolaborasi",
      viewProjects: "Lihat Projects",
      contactMe: "Hubungi Saya",
      typewriter: [
        "Web Developer",
        "Mobile Developer",
        "Laravel Expert",
        "Flutter Developer",
        "UI/UX Enthusiast",
      ],
      description: "Mahasiswa aktif Sistem Informasi di Telkom University Jakarta dengan pengalaman praktis 1,5 tahun dalam pengembangan web dan mobile.",
    },
    about: {
      badge: "Tentang Saya",
      title1: "Mengenal Lebih",
      title2: "Dekat",
      subtitle: "Passionate developer yang selalu bersemangat membangun solusi digital inovatif.",
      description1: "Mahasiswa aktif <span class='text-white font-medium'>Sistem Informasi</span> di <span class='text-primary-300 font-medium'>Telkom University Jakarta</span> dengan pengalaman praktis 1,5 tahun dalam pengembangan web dan mobile. Memiliki keahlian yang kuat dalam menggunakan <span class='text-accent-400'>HTML, CSS, PHP, Laravel, Node.js, Flutter, Next.js, dan TypeScript</span>, dilengkapi dengan JavaScript dan Python untuk pengembangan backend, serta manajemen basis data dengan MySQL dan PostgreSQL.",
      description2: "Mahir menggunakan alat pengembangan modern, termasuk <span class='text-primary-300 font-medium'>Git & GitHub, VS Code, Postman, XAMPP, dan Laragon</span>.",
      stats: {
        projects: "Projects",
        experience: "Tahun Exp",
        technologies: "Teknologi",
      },
      education: "Pendidikan",
      internship: "Magang",
      active: "Aktif",
    },
    skills: {
      badge: "Keahlian",
      title1: "Tech",
      title2: "Stack",
      subtitle: "Teknologi dan tools yang saya gunakan untuk membangun solusi digital.",
    },
    projects: {
      badge: "Portfolio",
      title1: "Project",
      title2: "Experience",
      subtitle: "Koleksi project yang telah saya bangun, mulai dari mobile apps hingga full-stack web platforms.",
      items: [
        {
          title: "HaramainQu",
          subtitle: "Aplikasi Microservices Travel Umrah & Haji",
          period: "April - Juli 2026",
          description: "Aplikasi mobile komprehensif menggunakan Flutter yang bertindak sebagai asisten digital jamaah untuk panduan ibadah di Tanah Suci.",
          highlights: [
            "Struktur Feature-First (Clean Architecture) di 9 modul utama",
            "Pendekatan Full API menggunakan Dio untuk mengalihkan beban pemrosesan ke sisi server",
            "Ukuran dan performa aplikasi yang dioptimalkan",
          ],
          status: "Selesai",
        },
        {
          title: "Haramain Tour",
          subtitle: "Platform Travel Umrah & Haji",
          period: "April - Juli 2026",
          description: "Platform manajemen travel end-to-end dengan alur online 5 tahap untuk pengumpulan data jamaah dan validasi dokumen terstruktur.",
          highlights: [
            "Integrasi Midtrans untuk pembayaran penuh & cicilan",
            "Login Google OAuth & pembuatan PDF otomatis",
            "Backend REST API yang tangguh untuk menyajikan data panduan & doa",
            "Chatbot asisten virtual berbasis kata kunci",
          ],
          status: "Selesai",
        },
        {
          title: "TelEvent",
          subtitle: "Sistem Manajemen Event",
          period: "September - Desember 2025",
          description: "Platform web komprehensif untuk digitalisasi pengajuan dan manajemen proposal event kampus.",
          highlights: [
            "Dashboard admin dengan sistem persetujuan terstruktur",
            "Manajemen unggah dokumen (proposal, anggaran, linimasa)",
            "Autentikasi pengguna yang aman & profil dinamis",
            "Fitur pencarian event interaktif",
          ],
          status: "Selesai",
        },
        {
          title: "Barbershop Management",
          subtitle: "Aplikasi Manajemen Operasional",
          period: "Oktober 2025",
          description: "Aplikasi manajemen operasional barbershop berbasis web untuk efisiensi aktivitas harian.",
          highlights: [
            "Modul manajemen pelanggan, staf, layanan, produk",
            "Sistem Point of Sale (POS) terintegrasi",
            "Dashboard statistik real-time",
            "Pelaporan bisnis otomatis",
          ],
          status: "Selesai",
        }
      ]
    },
    contact: {
      badge: "Kontak",
      title1: "Mari",
      title2: "Berdiskusi",
      subtitle: "Punya ide project atau peluang kerjasama? Jangan ragu untuk menghubungi saya.",
      sendEmail: "Kirim Email",
      copyEmail: "Salin Email",
      emailCopied: "Tersalin!",
      socialMedia: "Media Sosial",
      connectText: "Mari terhubung dan berdiskusi lebih lanjut tentang teknologi atau kolaborasi.",
    },
    footer: {
      rights: "Seluruh hak cipta dilindungi.",
      madeWith: "Dibuat dengan",
      by: "oleh",
    }
  },
  en: {
    nav: {
      home: "Home",
      about: "About",
      projects: "Projects",
      skills: "Skills",
      portfolio: "Portfolio",
      contact: "Contact",
    },
    hero: {
      available: "Available for projects & collaboration",
      viewProjects: "View Projects",
      contactMe: "Contact Me",
      typewriter: [
        "Web Developer",
        "Mobile Developer",
        "Laravel Expert",
        "Flutter Developer",
        "UI/UX Enthusiast",
      ],
      description: "Active Information Systems student at Telkom University Jakarta with 1.5 years of practical experience in web and mobile development.",
    },
    about: {
      badge: "About Me",
      title1: "Get to Know Me",
      title2: "Better",
      subtitle: "Passionate developer always eager to build innovative digital solutions.",
      description1: "Active <span class='text-white font-medium'>Information Systems</span> student at <span class='text-primary-300 font-medium'>Telkom University Jakarta</span> with 1.5 years of practical experience in web and mobile development. Demonstrates strong expertise in utilizing <span class='text-accent-400'>HTML, CSS, PHP, Laravel, Node.js, Flutter, Next.js, and TypeScript</span>, complemented by JavaScript and Python for backend development, as well as database management with MySQL and PostgreSQL.",
      description2: "Proficient in modern developer tools, including <span class='text-primary-300 font-medium'>Git & GitHub, VS Code, Postman, XAMPP, and Laragon</span>.",
      stats: {
        projects: "Projects",
        experience: "Years Exp",
        technologies: "Technologies",
      },
      education: "Education",
      internship: "Internship",
      active: "Active",
    },
    skills: {
      badge: "Skills",
      title1: "Tech",
      title2: "Stack",
      subtitle: "Technologies and tools I use to build digital solutions.",
    },
    projects: {
      badge: "Portfolio",
      title1: "Project",
      title2: "Experience",
      subtitle: "Collection of projects I have built, ranging from mobile apps to full-stack web platforms.",
      items: [
        {
          title: "HaramainQu",
          subtitle: "Umrah & Hajj Travel Microservices Application",
          period: "April - July 2026",
          description: "Comprehensive mobile application using Flutter acting as a digital pilgrim assistant for worship guidance in the Holy Land.",
          highlights: [
            "Feature-First (Clean Architecture) structure across 9 main modules",
            "Full API approach using Dio to shift processing loads to the server side",
            "Optimized application size and performance",
          ],
          status: "Completed",
        },
        {
          title: "Haramain Tour",
          subtitle: "Umrah & Hajj Travel Platform",
          period: "April - July 2026",
          description: "End-to-end travel management platform with a 5-stage online flow for structured pilgrim data collection and document validation.",
          highlights: [
            "Midtrans integration for full & installment payments",
            "Google OAuth login & automated PDF generation",
            "Robust REST API backend to serve guides & prayer data",
            "Keyword-based virtual assistant chatbot",
          ],
          status: "Completed",
        },
        {
          title: "TelEvent",
          subtitle: "Event Management System",
          period: "September - December 2025",
          description: "Comprehensive web platform for digitizing submission and management of campus event proposals.",
          highlights: [
            "Admin dashboard with structured approval system",
            "Document upload management (proposal, budget, timeline)",
            "Secure user authentication & dynamic profile",
            "Interactive event search feature",
          ],
          status: "Completed",
        },
        {
          title: "Barbershop Management",
          subtitle: "Operational Management Application",
          period: "October 2025",
          description: "Web-based barbershop operational management application for efficient daily activities.",
          highlights: [
            "Customers, staff, services, products management module",
            "Integrated Point of Sale (POS) system",
            "Real-time statistical dashboard",
            "Automated business reporting",
          ],
          status: "Completed",
        }
      ]
    },
    contact: {
      badge: "Contact",
      title1: "Let's",
      title2: "Talk",
      subtitle: "Have a project idea or collaboration opportunity? Don't hesitate to contact me.",
      sendEmail: "Send Email",
      copyEmail: "Copy Email",
      emailCopied: "Copied!",
      socialMedia: "Social Media",
      connectText: "Let's connect and discuss further about technology or collaboration.",
    },
    footer: {
      rights: "All rights reserved.",
      madeWith: "Made with",
      by: "by",
    }
  },
};

export type TranslationKey = 
  | "nav.home" | "nav.about" | "nav.projects" | "nav.skills" | "nav.portfolio" | "nav.contact"
  | "hero.available" | "hero.viewProjects" | "hero.contactMe" | "hero.typewriter" | "hero.description"
  | "about.badge" | "about.title1" | "about.title2" | "about.subtitle" | "about.description1" | "about.description2" 
  | "about.stats.projects" | "about.stats.experience" | "about.stats.technologies" 
  | "about.education" | "about.internship" | "about.active"
  | "skills.badge" | "skills.title1" | "skills.title2" | "skills.subtitle"
  | "projects.badge" | "projects.title1" | "projects.title2" | "projects.subtitle" | "projects.items"
  | "contact.badge" | "contact.title1" | "contact.title2" | "contact.subtitle" | "contact.sendEmail" | "contact.copyEmail" | "contact.emailCopied" | "contact.socialMedia" | "contact.connectText"
  | "footer.rights" | "footer.madeWith" | "footer.by";

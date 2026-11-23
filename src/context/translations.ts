export type Language = "id" | "en";

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
      available: "Terbuka untuk Proyek & Peluang Karir",
      roleTag: "Full-Stack Web & Mobile Developer",
      greeting: "Halo, saya",
      nameFirst: "Muhammad",
      nameLast: "Fatih Rahman",
      typewriter: [
        "Full-Stack Web Developer",
        "Mobile Developer (Flutter)",
        "Backend Specialist (Laravel & Node)",
        "VILT & Next.js Enthusiast",
      ],
      headline: "Membangun Solusi Digital Skalabel dengan Performa Tinggi & Kode Bersih.",
      description: "Mahasiswa Sistem Informasi Telkom University Jakarta dengan pengalaman praktis 2+ tahun. Berfokus pada perancangan aplikasi mobile modular (Flutter), sistem web modern (Next.js, Vue/Inertia), dan backend yang andal (Laravel, PostgreSQL, REST API).",
      viewProjects: "Lihat Karya Terbaik",
      contactMe: "Hubungi Saya",
      copyEmail: "Salin Email",
      emailCopied: "Email Tersalin!",
      quickStats: [
        { number: "7+", label: "Proyek Nyata", sublabel: "Aplikasi Teruji" },
        { number: "2+", label: "Tahun Pengalaman", sublabel: "Web & Mobile" },
        { number: "9", label: "Modul Arsitektur", sublabel: "Clean Code" },
        { number: "100%", label: "Komitmen Solusi", sublabel: "Bisnis & Pengguna" },
      ],
    },
    about: {
      badge: "Tentang Saya",
      title1: "Profil &",
      title2: "Latar Belakang",
      subtitle: "Menyeimbangkan keindahan antarmuka pengguna dengan ketahanan arsitektur di balik layar.",
      tabs: {
        bio: "Biografi",
        timeline: "Perjalanan & Pendidikan",
        philosophy: "Prinsip Pengembangan",
      },
      bioParagraph1: "Saya adalah mahasiswa aktif Sistem Informasi di <strong>Telkom University Jakarta</strong> dengan fokus pada <strong>rancang bangun aplikasi Web & Mobile modern</strong>. Saya terbiasa memecahkan masalah nyata—dari merancang marketplace hasil laut berbasis analitik (TangkapIN), platform F&B e-commerce (Juragan Bakso), sistem simulasi wawancara kerja AI (AI Interview), hingga alur pendaftaran haji/umrah bertahap (Haramain Tour & HaramainQu).",
      bioParagraph2: "Dalam membangun produk digital, saya berfokus pada arsitektur kode yang bersih (<strong>Clean Architecture</strong>), performa tinggi, dan pengalaman pengguna yang responsif. Keahlian saya mencakup <strong>pengembangan full-stack modern</strong>—mulai dari aplikasi mobile Flutter, platform web berbasis Next.js dan VILT Stack, hingga integrasi backend API dan sistem pembayaran digital yang andal.",
      stats: {
        projects: "Proyek Selesai",
        experience: "Tahun Praktis",
        technologies: "Teknologi Dikuasai",
        modules: "Modul Terstruktur",
      },
      timelineItems: [
        {
          year: "2024 - Sekarang",
          title: "S1 Sistem Informasi",
          institution: "Telkom University Jakarta",
          description: "Menempuh pendidikan sarjana dengan fokus pada pengembangan sistem informasi, arsitektur basis data, analisis proses bisnis, dan kepemimpinan tim proyek teknologi.",
          tag: "Pendidikan Formal",
        },
        {
          year: "September - Desember 2025",
          title: "Full-Stack Web Developer",
          institution: "TelEvent & Barbershop Management",
          description: "Mengembangkan platform digitalisasi alur proposal kegiatan kampus serta sistem kasir (POS) dan manajemen inventaris berbasis Laravel & MySQL.",
          tag: "Sistem Informasi & POS",
        },
        {
          year: "April - Juli 2026",
          title: "Lead Mobile & Backend Developer",
          institution: "HaramainQu & Haramain Tour",
          description: "Merancang arsitektur Clean Architecture pada aplikasi asisten ibadah (Flutter) dan platform pendaftaran travel online terintegrasi payment gateway Midtrans.",
          tag: "Mobile & Enterprise Web",
        },
        {
          year: "September - November 2026",
          title: "Full-Stack & AI Systems Lead",
          institution: "TangkapIN, Juragan Bakso & AI Interview",
          description: "Mengembangkan platform analitik kelautan VILT stack, sistem e-commerce F&B Next.js 14, serta sistem simulasi wawancara kerja berbasis AI & duplex audio WebSocket.",
          tag: "Proyek Skala Penuh & AI",
        },
      ],
      principles: [
        {
          title: "Feature-First & Clean Architecture",
          desc: "Memisahkan lapisan domain, data, dan presentasi agar aplikasi mudah diuji, diperluas, dan dirawat dalam jangka panjang.",
          icon: "layers",
        },
        {
          title: "Keamanan & Integritas Transaksi",
          desc: "Menerapkan validasi ketat, OAuth 2.0, token interseptor, dan idempotency dalam penanganan transaksi pembayaran.",
          icon: "shield",
        },
        {
          title: "Optimasi Pengalaman Pengguna (UX)",
          desc: "Memastikan interaksi secepat kilat dengan mengalihkan beban komputasi berat ke backend dan meminimalisir latensi jaringan.",
          icon: "zap",
        },
      ],
      downloadCV: "Unduh Resume (PDF)",
    },
    projects: {
      badge: "Karya Unggulan",
      title1: "Studi Kasus &",
      title2: "Proyek Pilihan",
      subtitle: "Bukan sekadar tampilan visual—berikut adalah solusi nyata dan teruji yang memecahkan masalah operasional serta bisnis.",
      filterAll: "Semua Proyek",
      filterMobile: "Mobile (Flutter)",
      filterWeb: "Web & Full-Stack",
      viewCaseStudy: "Lihat Studi Kasus",
      livePreview: "Buka Live Preview ↗",
      closeModal: "Tutup Detail",
      architectureTitle: "Keputusan Arsitektur",
      resultsTitle: "Dampak & Hasil Terukur",
      challengeTitle: "Tantangan Masalah",
      roleTitle: "Peran & Kontribusi",
      items: [
        {
          id: "haramainqu",
          title: "HaramainQu",
          subtitle: "Aplikasi Mobile Asisten Ibadah Umrah & Haji",
          category: "mobile",
          period: "April - Juli 2026",
          description: "Aplikasi mobile komprehensif bertindak sebagai asisten pintar jamaah untuk panduan doa, peta manasik, dan komunikasi darurat di Tanah Suci.",
          impactBadge: "9 Modul Clean Architecture",
          highlights: [
            "Clean Architecture Feature-First di 9 modul utama tanpa coupling ketat",
            "Pendekatan Full API via Dio untuk mengalihkan beban pemrosesan ke server",
            "Optimasi ukuran package hingga 30% lebih ringan dan bebas lag di smartphone low-end",
          ],
          status: "Produksi Siap",
          caseStudy: {
            challenge: "Kondisi jaringan di Tanah Suci seringkali padat dan lambat. Jamaah membutuhkan akses panduan ibadah, doa, dan jadwal yang selalu responsif, ringan di memori ponsel, dan bebas lag.",
            role: "Lead Mobile Developer (Flutter)",
            architecture: [
              "Pemisahan modular Feature-First (Domain, Data, Presentation) di 9 modul mandiri.",
              "Penggunaan Dio Client dengan caching strategi offline dan header token interseptor otomatis.",
              "State management reaktif yang menjaga konsumsi memori tetap minimal.",
            ],
            results: [
              "Waktu respon UI instan tanpa jank bahkan pada perangkat spesifikasi ramah kantong.",
              "Reduksi beban bundle aplikasi hingga 30% dibanding arsitektur monolitik biasa.",
              "Arsitektur modular siap digunakan untuk ekspansi fitur tracking rombongan jamaah.",
            ],
            metrics: [
              { label: "Modul Mandiri", value: "9 Modul" },
              { label: "Ukuran Bundle", value: "30% Lebih Ringan" },
              { label: "Efisiensi API", value: "Full REST" },
            ],
          },
        },
        {
          id: "tangkapin",
          title: "TangkapIN",
          subtitle: "Sistem Analitik Tren Hasil Laut & Marketplace Terintegrasi",
          category: "web",
          period: "September - November 2026",
          description: "Platform VILT Stack yang memadukan dasbor analitik tren tangkapan nelayan dengan marketplace B2B/B2C hasil laut terintegrasi Midtrans untuk menekan overfishing dan kerugian hasil tangkap.",
          impactBadge: "VILT Stack & Analitik Cerdas",
          highlights: [
            "Arsitektur VILT Stack modern (Vue.js 3, Inertia.js, Laravel, Tailwind CSS, PostgreSQL)",
            "Dashboard analitik cerdas berisi grafik tren tangkapan untuk memandu nelayan melaut secara berkelanjutan",
            "Marketplace hasil laut B2B/B2C dengan checkout instan Midtrans Snap Window",
            "Manajemen peran multi-level (Nelayan, Customer, Admin) yang dikembangkan dalam 6 sprint Agile",
          ],
          status: "Versi 5.0 Rilis",
          caseStudy: {
            challenge: "Nelayan skala kecil mengalami kerugian finansial akibat rantai pasok panjang, ikan membusuk sebelum terjual, dan penangkapan berlebih (overfishing) karena ketiadaan wawasan data.",
            role: "Full-Stack Architect & Lead Developer (VILT Stack)",
            architecture: [
              "Penerapan arsitektur VILT Stack (Vue.js + Inertia.js + Laravel) untuk SPA yang cepat dengan backend terstruktur.",
              "Visualisasi data real-time menggunakan Chart.js untuk memetakan spesies ikan dan tren volume tangkapan.",
              "Integrasi payment gateway Midtrans Snap Window dengan webhook audit payload yang aman.",
              "Relational database schema di PostgreSQL dengan indeks performa untuk pencarian produk dan analitik panen.",
            ],
            results: [
              "Menghubungkan langsung nelayan dengan pembeli grosir/ritel tanpa perantara berbelit.",
              "Memberikan prediksi volume panen yang membantu nelayan menekan risiko ikan tak terjual.",
              "Sistem checkout instan aman dengan tingkat keberhasilan pembayaran 100%.",
            ],
            metrics: [
              { label: "Arsitektur", value: "VILT Stack" },
              { label: "Pembayaran", value: "Midtrans Snap" },
              { label: "Agile Sprints", value: "6 Sprints" },
            ],
          },
        },
        {
          id: "bakso",
          title: "Juragan Bakso Platform",
          subtitle: "Platform E-Commerce & Pemesanan F&B Terpadu",
          category: "web",
          period: "November 2026",
          description: "Platform e-commerce restoran modern dengan katalog menu interaktif, alur pemesanan WhatsApp otomatis, autentikasi pelanggan, dan dashboard operasional admin.",
          impactBadge: "Next.js 14 & WhatsApp API",
          liveUrl: "https://si-bakso.vercel.app",
          highlights: [
            "Dibangun menggunakan Next.js 14 App Router, React 18, Tailwind CSS, dan database MySQL2",
            "Sistem order cerdas terhubung ke WhatsApp dengan format pesanan dan catatan racikan otomatis",
            "Dashboard admin untuk kontrol status pesanan, stok menu, dan verifikasi pembayaran QRIS/Tunai",
            "Manajemen sesi pengguna dinamis dan alur checkout multi-opsi (Makan di Tempat / Bungkus / Antar)",
          ],
          status: "Produksi Siap",
          caseStudy: {
            challenge: "Pemesanan manual di gerai F&B sering memicu salah catat menu, antrean kasir panjang, dan kesulitan rekapitulasi omset harian bagi pemilik usaha.",
            role: "Full-Stack Web Developer (Next.js)",
            architecture: [
              "Next.js App Router dengan pemisahan Client dan Server Components untuk rendering ultra-cepat.",
              "Generator URL WhatsApp dinamis yang merangkum rincian menu, nomor meja, dan metode bayar.",
              "Database relational MySQL2 dengan kueri transaksi teroptimasi untuk pencatatan pesanan real-time.",
              "Panel admin terlindungi dengan tabel interaktif status pesanan.",
            ],
            results: [
              "Memangkas waktu antrean kasir dan pemesanan meja hingga 40%.",
              "Format pesanan WhatsApp yang rapi dan terstandar meminimalisir salah racik pesanan.",
              "Visibilitas penjualan harian yang akurat langsung dari dashboard admin.",
            ],
            metrics: [
              { label: "Framework", value: "Next.js 14" },
              { label: "Efisiensi Order", value: "40% Lebih Cepat" },
              { label: "Database", value: "MySQL2" },
            ],
          },
        },
        {
          id: "ai-interview",
          title: "AI Interview Platform",
          subtitle: "Platform Simulasi & Asesmen Wawancara Berbasis AI",
          category: "web",
          period: "September 2026",
          description: "Platform asesmen berbasis AI dengan simulasi wawancara teknis real-time, streaming audio duplex via WebSocket, dan scorecard evaluasi kandidat otomatis.",
          impactBadge: "WebSocket Duplex & AI Assessment",
          highlights: [
            "Arsitektur terdistribusi dua layanan: Frontend Web (React 18 + Vite) & Backend API (Rails + Redis)",
            "Komunikasi audio dan teks real-time dua arah memanfaatkan protokol WebSocket duplex",
            "Pemrosesan sinyal suara di sisi klien menggunakan AudioWorkletProcessor kustom",
            "Scorecard penilaian otomatis mengukur problem-solving, arsitektur sistem, dan komunikasi",
          ],
          status: "Studi Kasus Selesai",
          caseStudy: {
            challenge: "Proses wawancara kerja teknis konvensional membutuhkan waktu screening interviewer yang sangat besar dan rentan terhadap penilaian yang tidak terstandarisasi.",
            role: "Product Engineer & Full-Stack Developer",
            architecture: [
              "Pemisahan service independen: Web App (React 18 + TypeScript + Tailwind) dan API (Ruby on Rails + PostgreSQL).",
              "Koneksi WebSocket real-time untuk interaksi wawancara minim latensi.",
              "Redis dan Sidekiq untuk background job processing dan antrean penilaian asesmen.",
              "Pipeline evaluasi otomatis yang membandingkan jawaban kandidat dengan rubrik benchmark industri.",
            ],
            results: [
              "Simulasi wawancara teknis interaktif dengan latensi respon real-time.",
              "Pemberian skor analitik instan dengan rincian kekuatan dan area perbaikan kandidat.",
              "Arsitektur teruji yang siap direlease dan diskalakan untuk ratusan sesi wawancara simultan.",
            ],
            metrics: [
              { label: "Komunikasi", value: "WebSocket" },
              { label: "Background Jobs", value: "Redis/Sidekiq" },
              { label: "Frontend", value: "React 18 + Vite" },
            ],
          },
        },
        {
          id: "haramain-tour",
          title: "Haramain Tour",
          subtitle: "Platform Enterprise Manajemen Travel Umrah & Haji",
          category: "web",
          period: "April - Juli 2026",
          description: "Platform travel end-to-end dengan alur pendaftaran 5 tahap, verifikasi dokumen otomatis, integrasi Midtrans, dan API asisten virtual.",
          impactBadge: "Pembayaran & Otomasi PDF",
          highlights: [
            "Alur pendaftaran terstruktur 5 tahap dengan validasi dokumen otomatis",
            "Integrasi Midtrans Payment Gateway untuk pembayaran penuh & skema cicilan",
            "Autentikasi Google OAuth & generator manifes jemaah format PDF otomatis",
            "Penyedia REST API backend untuk menyuplai data konten ke aplikasi HaramainQu",
          ],
          status: "Selesai",
          caseStudy: {
            challenge: "Proses administrasi travel haji/umrah konvensional lambat karena formulir fisik, rawan kesalahan verifikasi paspor, dan pencatatan pembayaran manual yang rentan selisih.",
            role: "Full-Stack Web & Backend Lead (Laravel)",
            architecture: [
              "Pipeline pendaftaran multi-step dengan validasi file dokumen terisolasi.",
              "Webhook Midtrans yang idempotent untuk sinkronisasi status pembayaran real-time.",
              "REST API aman dengan dokumentasi endpoint untuk dikonsumsi langsung oleh aplikasi mobile HaramainQu.",
              "Automated PDF builder untuk dokumen manifes keberangkatan dan bukti booking.",
            ],
            results: [
              "Mengurangi waktu verifikasi berkas jamaah dari berhari-hari menjadi hitungan menit.",
              "Zero error pada rekonsiliasi pembayaran berkat penanganan webhook yang aman.",
              "Mendukung pendaftaran serentak dengan kestabilan database yang optimal.",
            ],
            metrics: [
              { label: "Alur Registrasi", value: "5 Tahap" },
              { label: "Gateway Bayar", value: "Midtrans" },
              { label: "Sinkronisasi", value: "Real-time" },
            ],
          },
        },
        {
          id: "televent",
          title: "TelEvent",
          subtitle: "Platform Manajemen Acara & Pengajuan Proposal Kampus",
          category: "web",
          period: "2025 - 2026",
          description: "Sistem Informasi terpadu untuk digitalisasi manajemen acara, pengajuan berkas proposal kepanitiaan, alokasi budgeting, dan katalog publik kegiatan mahasiswa Telkom University.",
          impactBadge: "Paperless Campus Workflow",
          highlights: [
            "Alur pengajuan berkas digital (proposal, timeline kegiatan, dan estimasi budgeting RAB)",
            "Review dan validasi verifikator/kemahasiswaan secara real-time via dashboard admin",
            "Katalog dan pencarian publik interaktif untuk festival, kompetisi, dan seminar kampus",
            "Persetujuan resmi instan dengan status approved transparan",
          ],
          status: "Selesai",
          liveUrl: "https://televent.vercel.app",
          caseStudy: {
            challenge: "Kepanitiaan acara kampus kerap mengalami keterlambatan perizinan akibat proposal fisik berbelit-belit dan sulitnya mempromosikan kegiatan ke seluruh mahasiswa.",
            role: "Full-Stack Web Developer (Next.js & React)",
            architecture: [
              "Next.js App Router dengan Server Components untuk render katalog acara cepat.",
              "Tailwind CSS dengan desain modern identitas resmi Telkom University.",
              "Manajemen berkas digital proposal dan validasi multi-role transparan.",
            ],
            results: [
              "100% transisi dari proses pengajuan kertas menjadi sistem digital terpusat.",
              "Mempercepat waktu persetujuan kegiatan hingga 70% lebih efisien.",
              "Meningkatkan partisipasi peserta acara kampus melalui direktori publik.",
            ],
            metrics: [
              { label: "Waktu Review", value: "70% Lebih Cepat" },
              { label: "Penggunaan Kertas", value: "0 (Paperless)" },
              { label: "Aksesibilitas", value: "Publik & Kampus" },
            ],
          },
        },
        {
          id: "barbershop",
          title: "Barbershop Management",
          subtitle: "Sistem Operasional Point of Sale & Manajemen Layanan",
          category: "web",
          period: "Oktober 2025",
          description: "Aplikasi web POS dan inventaris untuk barbershop modern dengan kalkulasi komisi kapster otomatis dan analitik transaksi harian.",
          impactBadge: "POS & Laporan Otomatis",
          highlights: [
            "Modul kasir POS interaktif dengan perhitungan diskon dan metode pembayaran beragam",
            "Perhitungan komisi staf otomatis berdasarkan layanan potong yang diselesaikan",
            "Dashboard analitik penjualan real-time menggunakan visualisasi interaktif",
            "Ekspor laporan omset dan pengeluaran harian/bulanan dalam satu klik",
          ],
          status: "Selesai",
          caseStudy: {
            challenge: "Pemilik usaha kesulitan memantau bagi hasil kapster harian dan inventaris pomade/produk perawatan karena pencatatan manual di buku kasir.",
            role: "Full-Stack Web Developer",
            architecture: [
              "Sistem transaksi terpadu yang memotong stok inventaris dan menghitung komisi secara otomatis.",
              "Visualisasi data real-time dengan Chart.js untuk memetakan jam ramai dan layanan terlaris.",
              "Database relational yang dioptimalkan untuk kueri agregasi laporan keuangan cepat.",
            ],
            results: [
              "Menghilangkan selisih kas harian dan sengketa perhitungan komisi kapster.",
              "Mempercepat antrean kasir hingga 50% saat jam operasional padat.",
              "Memberikan visibilitas finansial yang jelas bagi pemilik bisnis.",
            ],
            metrics: [
              { label: "Akurasi Kas", value: "100%" },
              { label: "Waktu Kasir", value: "50% Lebih Cepat" },
              { label: "Laporan", value: "Otomatis" },
            ],
          },
        },
      ],
    },
    skills: {
      badge: "Arsitektur & Keahlian",
      title1: "Teknologi &",
      title2: "Spesialisasi Teknis",
      subtitle: "Bukan sekadar daftar nama pustaka—berikut adalah kapabilitas teruji yang digunakan dalam proyek produksi.",
      categories: [
        {
          id: "mobile",
          title: "Mobile App Development",
          description: "Membangun aplikasi mobile multi-platform yang cepat, tangguh, dan ramah pengguna.",
          skills: [
            { name: "Flutter & Dart", focus: "Clean Architecture & Feature-First Structure", tag: "Utama" },
            { name: "Dio HTTP Client", focus: "Interceptors, Offline Caching & Error Handling", tag: "Jaringan" },
            { name: "State Management", focus: "BLoC / Provider / Riverpod Pattern", tag: "State" },
            { name: "Android SDK & Tools", focus: "Device Testing, Emulators & APK Packaging", tag: "Build" },
          ],
        },
        {
          id: "backend",
          title: "Backend & Sistem API",
          description: "Merancang fondasi server yang scalable, aman, dan siap menopang traffic tinggi.",
          skills: [
            { name: "PHP & Laravel", focus: "REST API, Service Repositories, Eloquent ORM", tag: "Utama" },
            { name: "Next.js & Node.js", focus: "App Router, Full-Stack APIs, Microservices", tag: "Backend" },
            { name: "Midtrans Payment Gateway", focus: "Idempotent Webhooks, Pembayaran Penuh & Cicilan", tag: "Fintech" },
            { name: "Autentikasi & Security", focus: "Google OAuth 2.0, Sanctum, JWT, RBAC", tag: "Keamanan" },
          ],
        },
        {
          id: "frontend",
          title: "Modern Frontend Web",
          description: "Menciptakan pengalaman web interaktif yang modern, estetik, dan berkecepatan tinggi.",
          skills: [
            { name: "Vue.js & Inertia.js", focus: "VILT Stack, Single Page App Architecture", tag: "Frontend" },
            { name: "Next.js & React 19", focus: "Server Components, High Performance & SEO", tag: "Utama" },
            { name: "TypeScript & Vite", focus: "Strict Typing, Real-time WebSockets & Tooling", tag: "Full-Stack" },
            { name: "Tailwind CSS v4", focus: "Modern Design Systems, Responsive & Dark Mode", tag: "Styling" },
          ],
        },
        {
          id: "database",
          title: "Basis Data & Perangkat Kerja",
          description: "Pengelolaan integritas data relasional serta alur kerja kolaborasi profesional.",
          skills: [
            { name: "MySQL & PostgreSQL", focus: "Schema Relasional, Indexing & Query Optimization", tag: "Database" },
            { name: "Git & GitHub Workflow", focus: "Branching Strategy, Code Review & Version Control", tag: "VCS" },
            { name: "Redis & WebSocket", focus: "Real-time Messaging, Caching & Queue Workers", tag: "Real-time" },
            { name: "VS Code & Laragon/XAMPP", focus: "Local Development Setup & Environment Config", tag: "Tooling" },
          ],
        },
      ],
    },
    contact: {
      badge: "Hubungi Saya",
      title1: "Mari Berkolaborasi &",
      title2: "Bangun Proyek Hebat",
      subtitle: "Sedang mencari full-stack developer yang berkomitmen untuk tim Anda atau ingin mendiskusikan ide proyek? Mari terhubung.",
      chatWhatsApp: "Chat via WhatsApp",
      sendEmail: "Kirim Email Langsung",
      copyEmail: "Salin Alamat Email",
      emailCopied: "Email Berhasil Disalin!",
      formName: "Nama Lengkap",
      formEmail: "Alamat Email",
      formSubject: "Subjek / Topik Proyek",
      formMessage: "Ceritakan tentang proyek atau tawaran Anda...",
      formSend: "Kirim Pesan Sekarang",
      formSending: "Membuka Klien Email...",
      formSuccess: "Pesan siap dikirimkan melalui klien email Anda!",
      directChannels: "Saluran Komunikasi Langsung",
      locationLabel: "Domisili",
      locationValue: "Tangerang Selatan & Jakarta, Indonesia",
    },
    footer: {
      tagline: "Merancang dan membangun produk digital dengan presisi, performa, dan dampak nyata.",
      rights: "Semua hak cipta dilindungi.",
      madeWith: "Dirancang & Dibuat dengan",
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
      available: "Open for Projects & Engineering Roles",
      roleTag: "Full-Stack Web & Mobile Developer",
      greeting: "Hi, I am",
      nameFirst: "Muhammad",
      nameLast: "Fatih Rahman",
      typewriter: [
        "Full-Stack Web Developer",
        "Mobile Developer (Flutter)",
        "Backend Specialist (Laravel & Node)",
        "VILT & Next.js Enthusiast",
      ],
      headline: "Building Scalable Digital Solutions with High Performance & Clean Code.",
      description: "Information Systems student at Telkom University Jakarta with 2+ years of hands-on experience. Focused on modular mobile engineering (Flutter), modern web applications (Next.js, Vue/Inertia), and robust backends (Laravel, PostgreSQL, REST APIs).",
      viewProjects: "Explore Featured Work",
      contactMe: "Get in Touch",
      copyEmail: "Copy Email",
      emailCopied: "Email Copied!",
      quickStats: [
        { number: "7+", label: "Real Projects", sublabel: "Shipped & Tested" },
        { number: "2+", label: "Years Experience", sublabel: "Web & Mobile" },
        { number: "9", label: "Clean Modules", sublabel: "Maintainable Code" },
        { number: "100%", label: "Problem Solving", sublabel: "Real-world Impact" },
      ],
    },
    about: {
      badge: "About Me",
      title1: "Profile &",
      title2: "Background",
      subtitle: "Balancing elegant user experiences with resilient underlying software architectures.",
      tabs: {
        bio: "Biography",
        timeline: "Journey & Education",
        philosophy: "Development Principles",
      },
      bioParagraph1: "I am an active Information Systems undergraduate at <strong>Telkom University Jakarta</strong> specializing in <strong>modern Web & Mobile application development</strong>. I love solving real-world operational problems—from developing marine analytics and seafood marketplaces (TangkapIN), F&B e-commerce platforms (Juragan Bakso), and AI interview assessment systems (AI Interview) to multi-step pilgrimage booking systems (Haramain Tour & HaramainQu).",
      bioParagraph2: "In building digital products, I focus on <strong>Clean Architecture</strong>, high performance, and responsive user experiences. My technical expertise spans <strong>modern full-stack development</strong>—from mobile applications using Flutter, web platforms built with Next.js and the VILT Stack, to resilient backend API integrations and secure digital payment systems.",
      stats: {
        projects: "Projects Completed",
        experience: "Years Hands-on",
        technologies: "Technologies Mastered",
        modules: "Clean Modules",
      },
      timelineItems: [
        {
          year: "2024 - Present",
          title: "B.S. in Information Systems",
          institution: "Telkom University Jakarta",
          description: "Pursuing an undergraduate degree focused on information systems development, relational database systems, business process analysis, and technical team leadership.",
          tag: "Higher Education",
        },
        {
          year: "September - December 2025",
          title: "Full-Stack Web Developer",
          institution: "TelEvent & Barbershop Management",
          description: "Engineered a campus event proposal workflow system and a barbershop POS and inventory management platform built with Laravel and MySQL.",
          tag: "Information Systems & POS",
        },
        {
          year: "April - July 2026",
          title: "Lead Mobile & Backend Developer",
          institution: "HaramainQu & Haramain Tour",
          description: "Architected Feature-First Clean Architecture for a pilgrimage companion app (Flutter) and an online travel onboarding platform with Midtrans integration.",
          tag: "Mobile & Enterprise Web",
        },
        {
          year: "September - November 2026",
          title: "Full-Stack & AI Systems Lead",
          institution: "TangkapIN, Juragan Bakso & AI Interview",
          description: "Developed a marine analytics VILT platform, an interactive F&B Next.js 14 e-commerce solution, and an AI-driven technical interview assessment platform with WebSockets.",
          tag: "Full-Cycle & AI Systems",
        },
      ],
      principles: [
        {
          title: "Feature-First & Clean Architecture",
          desc: "Decoupling domain, data, and presentation layers so the codebase remains easily testable, maintainable, and scalable over time.",
          icon: "layers",
        },
        {
          title: "Transaction Integrity & Security",
          desc: "Implementing rigorous validation, OAuth 2.0, token interceptors, and idempotent webhook handlers for reliable payment flows.",
          icon: "shield",
        },
        {
          title: "Performance & User-Centric UX",
          desc: "Ensuring instant, lag-free interactions by shifting heavy processing server-side and eliminating redundant network round trips.",
          icon: "zap",
        },
      ],
      downloadCV: "Download Resume (PDF)",
    },
    projects: {
      badge: "Featured Work",
      title1: "Case Studies &",
      title2: "Selected Projects",
      subtitle: "More than just pretty UI—here is real engineering built to solve complex operational challenges.",
      filterAll: "All Projects",
      filterMobile: "Mobile (Flutter)",
      filterWeb: "Web & Full-Stack",
      viewCaseStudy: "View Case Study",
      livePreview: "Open Live Preview ↗",
      closeModal: "Close Details",
      architectureTitle: "Architectural Decisions",
      resultsTitle: "Measurable Impact & Results",
      challengeTitle: "The Challenge",
      roleTitle: "My Role & Contribution",
      items: [
        {
          id: "haramainqu",
          title: "HaramainQu",
          subtitle: "Umrah & Hajj Pilgrim Assistant Mobile App",
          category: "mobile",
          period: "April - July 2026",
          description: "Comprehensive mobile companion serving as a digital assistant for prayer guides, pilgrimage maps, and emergency communication in the Holy Land.",
          impactBadge: "9-Module Clean Architecture",
          highlights: [
            "Feature-First Clean Architecture across 9 independent modules without tight coupling",
            "Full API approach via Dio to offload compute-heavy processing to backend servers",
            "Optimized APK size (30% lighter) and lag-free responsiveness on budget-friendly mobile devices",
          ],
          status: "Production Ready",
          caseStudy: {
            challenge: "Cellular networks in Mecca and Medina become heavily congested during peak pilgrimage seasons. Pilgrims urgently need access to worship guides and maps that stay responsive, consume minimal battery, and never crash.",
            role: "Lead Mobile Developer (Flutter)",
            architecture: [
              "Feature-First Clean Architecture isolating Domain, Data, and Presentation across 9 self-contained modules.",
              "Dio HTTP client implementation with offline cache fallbacks and automated token interceptors.",
              "Reactive state management guaranteeing minimal memory footprint and zero UI stutter.",
            ],
            results: [
              "Instant UI responsiveness without stutter even on affordable smartphone models.",
              "30% reduction in app bundle size compared to traditional monolithic mobile codebases.",
              "Modular structure ready for future group tracking and real-time audio guide extensions.",
            ],
            metrics: [
              { label: "Independent Modules", value: "9 Modules" },
              { label: "Bundle Optimization", value: "30% Lighter" },
              { label: "Network Architecture", value: "Full REST" },
            ],
          },
        },
        {
          id: "tangkapin",
          title: "TangkapIN",
          subtitle: "Marine Analytics & Integrated Seafood Marketplace",
          category: "web",
          period: "September - November 2026",
          description: "VILT Stack platform combining a fisherman harvest analytics dashboard with a Midtrans-powered B2B/B2C seafood marketplace to prevent overfishing and eliminate produce spoilage.",
          impactBadge: "VILT Stack & Marine Analytics",
          highlights: [
            "Modern VILT Stack architecture (Vue.js 3, Inertia.js, Laravel, Tailwind CSS, PostgreSQL)",
            "Intelligent analytics dashboard visualizing catch volume trends to guide sustainable fishing trips",
            "B2B/B2C seafood marketplace with integrated Midtrans Snap Window checkout",
            "Multi-tiered role permissions (Fisherman, Customer, Admin) engineered in 6 Agile sprints",
          ],
          status: "Version 5.0 Release",
          caseStudy: {
            challenge: "Small-scale fishermen suffered substantial financial losses due to predatory intermediary supply chains, fish spoilage before reaching buyers, and overfishing driven by lack of data insights.",
            role: "Full-Stack Architect & Lead Developer (VILT Stack)",
            architecture: [
              "VILT Stack architecture (Vue.js + Inertia.js + Laravel) delivering a lightning-fast SPA with a robust backend.",
              "Real-time data visualization via Chart.js mapping fish species seasonality and harvest volumes.",
              "Midtrans Snap Window payment integration with tamper-proof idempotent webhook auditing.",
              "Relational PostgreSQL schema optimized for fast spatial and analytics queries.",
            ],
            results: [
              "Directly connected fishermen with bulk commercial and retail buyers, increasing margins.",
              "Provided actionable harvest predictions that cut fish spoilage rates.",
              "100% payment verification accuracy through automated transactional webhook listeners.",
            ],
            metrics: [
              { label: "Architecture", value: "VILT Stack" },
              { label: "Payment Gateway", value: "Midtrans Snap" },
              { label: "Agile Sprints", value: "6 Sprints" },
            ],
          },
        },
        {
          id: "bakso",
          title: "Juragan Bakso Platform",
          subtitle: "Comprehensive F&B E-Commerce & Ordering Platform",
          category: "web",
          period: "November 2026",
          description: "Modern F&B web platform featuring an interactive digital menu, automated WhatsApp order formatting, user authentication, and an operations admin portal.",
          impactBadge: "Next.js 14 & WhatsApp API",
          liveUrl: "https://si-bakso.vercel.app",
          highlights: [
            "Engineered with Next.js 14 App Router, React 18, Tailwind CSS, and MySQL2 database",
            "Smart WhatsApp order integration pre-filling customized recipe notes and item quantities",
            "Unified operations dashboard managing live order statuses, stock, and payment confirmations",
            "Dynamic session authentication and multi-service checkout (Dine-in / Takeaway / Delivery)",
          ],
          status: "Production Ready",
          caseStudy: {
            challenge: "Manual order taking resulted in miscommunicated customer requests, slow cashier queues during peak hours, and difficult end-of-day revenue reconciliation for the restaurant owner.",
            role: "Full-Stack Web Developer (Next.js)",
            architecture: [
              "Next.js App Router separating Server Components for fast initial loads and Client Components for cart state.",
              "Automated WhatsApp URL encoder formatting item breakdowns, table numbers, and payment selections.",
              "Relational MySQL2 database with optimized queries for real-time order recordkeeping.",
              "Authenticated admin portal providing instant status updates and order dispatching.",
            ],
            results: [
              "Reduced cashier queue times by over 40% during peak meal rush hours.",
              "Standardized WhatsApp messaging eliminated kitchen preparation mistakes.",
              "Real-time sales visibility delivered directly to the business owner.",
            ],
            metrics: [
              { label: "Framework", value: "Next.js 14" },
              { label: "Order Efficiency", value: "40% Faster" },
              { label: "Database", value: "MySQL2" },
            ],
          },
        },
        {
          id: "ai-interview",
          title: "AI Interview Platform",
          subtitle: "AI-Powered Technical Interview & Assessment Platform",
          category: "web",
          period: "September 2026",
          description: "Dual-service AI interview assessment system featuring real-time technical interview simulations, full-duplex WebSocket audio streaming, and automated candidate competency evaluation.",
          impactBadge: "WebSocket Duplex & AI Assessment",
          highlights: [
            "Distributed two-service architecture: Web Frontend (React 18 + Vite) & Backend (Ruby on Rails + Redis)",
            "Real-time bidirectional audio and transcript streaming powered by full-duplex WebSockets",
            "Client-side low-latency speech processing via custom AudioWorkletProcessor",
            "Automated multi-factor evaluation scorecard benchmarking problem-solving and communication",
          ],
          status: "Case Study Complete",
          caseStudy: {
            challenge: "Traditional technical interviewing consumes dozens of engineering hours per hire and often suffers from subjective, non-standardized evaluation criteria.",
            role: "Product Engineer & Full-Stack Developer",
            architecture: [
              "Two-service architecture separating React 18 TypeScript client from Rails REST and WebSocket backend.",
              "Full-duplex WebSocket connection delivering seamless audio streaming with minimal latency.",
              "Redis and Sidekiq handling background job queues and asynchronous candidate scorecard generation.",
              "Automated grading engine benchmarking candidate responses against industry assessment rubrics.",
            ],
            results: [
              "Interactive real-time interview simulator with instantaneous AI interviewer responses.",
              "Objective candidate scorecards generated within seconds of interview completion.",
              "Production-ready codebase hardened and evaluated for enterprise-grade scalability.",
            ],
            metrics: [
              { label: "Real-time Protocol", value: "WebSocket" },
              { label: "Async Queues", value: "Redis/Sidekiq" },
              { label: "Client Stack", value: "React 18 + Vite" },
            ],
          },
        },
        {
          id: "haramain-tour",
          title: "Haramain Tour",
          subtitle: "Enterprise Umrah & Hajj Travel Management Platform",
          category: "web",
          period: "April - July 2026",
          description: "End-to-end travel platform featuring a 5-stage online onboarding flow, automated document validation, Midtrans payment gateway, and mobile backend APIs.",
          impactBadge: "Midtrans & PDF Automation",
          highlights: [
            "5-stage structured onboarding funnel with automated document validation",
            "Midtrans Payment Gateway integration supporting full and installment plans",
            "Google OAuth login & automated pilgrim manifest PDF generator",
            "Robust REST API supplying dynamic worship and prayer data to the HaramainQu app",
          ],
          status: "Completed",
          caseStudy: {
            challenge: "Traditional travel agencies faced administrative bottlenecks from paper forms, passport verification errors, and manual bank transfer reconciliations prone to discrepancies.",
            role: "Full-Stack Web & Backend Lead (Laravel)",
            architecture: [
              "Multi-step registration pipeline with isolated document validation and storage sanitization.",
              "Idempotent Midtrans webhook listener ensuring instantaneous, tamper-proof payment reconciliation.",
              "Secured REST API endpoints consumed in real-time by the HaramainQu Flutter mobile app.",
              "Automated PDF compilation engine for instant booking vouchers and group flight manifests.",
            ],
            results: [
              "Reduced document verification turnaround from days to under 5 minutes.",
              "Zero payment reconciliation errors achieved via idempotent transactional webhooks.",
              "Seamless high-concurrency registration during peak booking campaigns.",
            ],
            metrics: [
              { label: "Registration Funnel", value: "5 Stages" },
              { label: "Payment Gateway", value: "Midtrans" },
              { label: "Reconciliation", value: "Real-time" },
            ],
          },
        },
        {
          id: "televent",
          title: "TelEvent",
          subtitle: "Campus Event & Proposal Management Platform",
          category: "web",
          period: "2025 - 2026",
          description: "Unified web platform digitizing event management, committee proposal submissions, budgeting allocations, and public campus event directories for Telkom University.",
          impactBadge: "Paperless Campus Workflow",
          highlights: [
            "Digital file submission pipeline for proposals, timelines, and RAB budgeting",
            "Real-time administrative verification and approval workflows",
            "Interactive public event discovery for campus competitions, festivals, and webinars",
            "Transparent review lifecycle from draft to approved publication",
          ],
          status: "Completed",
          liveUrl: "https://televent.vercel.app",
          caseStudy: {
            challenge: "Student committee teams suffered severe delays due to manual paper proposals and fragmented event promotion across campus channels.",
            role: "Full-Stack Web Developer (Next.js & React)",
            architecture: [
              "Next.js App Router with Server-Side Rendering for ultra-fast event discovery.",
              "Tailwind CSS responsive design system tailored to Telkom University branding.",
              "Structured document pipeline and transparent multi-role validation states.",
            ],
            results: [
              "100% paperless digital transformation across student activity submissions.",
              "Accelerated approval and review cycles by over 70%.",
              "Maximized student attendance via centralized public showcase.",
            ],
            metrics: [
              { label: "Review Speed", value: "70% Faster" },
              { label: "Paper Consumption", value: "0 (Paperless)" },
              { label: "Discovery", value: "Campus-Wide" },
            ],
          },
        },
        {
          id: "barbershop",
          title: "Barbershop Management",
          subtitle: "Point of Sale & Operational Management Platform",
          category: "web",
          period: "October 2025",
          description: "Web-based POS and inventory system for modern barbershops with automated staff commission calculation and daily transaction analytics.",
          impactBadge: "POS & Automated Reporting",
          highlights: [
            "Fast interactive POS checkout with custom discounts and multiple payment methods",
            "Automated barber commission calculation per completed haircut and styling treatment",
            "Real-time visual sales analytics tracking peak rush hours and top-selling services",
            "One-click financial report export for daily and monthly business reviews",
          ],
          status: "Completed",
          caseStudy: {
            challenge: "Shop owners struggled to tally daily cash registers, calculate staff commissions accurately, and track hair care product stock using handwritten logbooks.",
            role: "Full-Stack Web Developer",
            architecture: [
              "Integrated checkout workflow automatically decrementing retail stock and computing technician commissions.",
              "Interactive Chart.js visual dashboard showing revenue trends and popular time slots.",
              "Relational database indexed for instantaneous aggregation of financial statements.",
            ],
            results: [
              "Zero cash register discrepancies and complete elimination of staff commission disputes.",
              "50% reduction in customer checkout wait times during peak weekend rushes.",
              "Immediate financial visibility allowing the owner to plan inventory restocking accurately.",
            ],
            metrics: [
              { label: "Cash Register Accuracy", value: "100%" },
              { label: "Checkout Speed", value: "50% Faster" },
              { label: "Reporting", value: "Automated" },
            ],
          },
        },
      ],
    },
    skills: {
      badge: "Architecture & Capabilities",
      title1: "Technical",
      title2: "Stack & Specialization",
      subtitle: "More than a checklist of keywords—here are proven competencies deployed in real production projects.",
      categories: [
        {
          id: "mobile",
          title: "Mobile App Development",
          description: "Engineering resilient, cross-platform mobile experiences with clean code.",
          skills: [
            { name: "Flutter & Dart", focus: "Clean Architecture & Feature-First Structure", tag: "Primary" },
            { name: "Dio HTTP Client", focus: "Interceptors, Offline Caching & Robust Error Flow", tag: "Networking" },
            { name: "State Management", focus: "BLoC / Provider / Riverpod Pattern", tag: "State" },
            { name: "Android SDK & Tools", focus: "Device Testing, Emulators & APK Packaging", tag: "Build" },
          ],
        },
        {
          id: "backend",
          title: "Backend & API Systems",
          description: "Architecting secure, scalable server foundations built to handle high traffic.",
          skills: [
            { name: "PHP & Laravel", focus: "REST APIs, Service Repositories, Eloquent ORM", tag: "Primary" },
            { name: "Next.js & Node.js", focus: "App Router, Full-Stack APIs, Microservices", tag: "Backend" },
            { name: "Midtrans Payment Gateway", focus: "Idempotent Webhooks, Full & Installment Flows", tag: "Fintech" },
            { name: "Auth & Security", focus: "Google OAuth 2.0, Sanctum, JWT, RBAC", tag: "Security" },
          ],
        },
        {
          id: "frontend",
          title: "Modern Frontend Web",
          description: "Crafting fluid, high-conversion web apps with high responsiveness and accessibility.",
          skills: [
            { name: "Vue.js & Inertia.js", focus: "VILT Stack, Single Page App Architecture", tag: "Frontend" },
            { name: "Next.js & React 19", focus: "Server Components, High Performance & SEO", tag: "Primary" },
            { name: "TypeScript & Vite", focus: "Strict Typing, Real-time WebSockets & Tooling", tag: "Full-Stack" },
            { name: "Tailwind CSS v4", focus: "Design Systems, Micro-Interactions & Dark Mode", tag: "Styling" },
          ],
        },
        {
          id: "database",
          title: "Databases & Dev Tooling",
          description: "Ensuring database relational integrity and streamlined engineering collaboration.",
          skills: [
            { name: "MySQL & PostgreSQL", focus: "Relational Schemas, Indexing & Optimization", tag: "Database" },
            { name: "Git & GitHub Workflow", focus: "Branching Conventions, PRs & Version Control", tag: "VCS" },
            { name: "Redis & WebSocket", focus: "Real-time Messaging, Caching & Queue Workers", tag: "Real-time" },
            { name: "VS Code & Laragon/XAMPP", focus: "Local Development Setup & Environment Config", tag: "Tooling" },
          ],
        },
      ],
    },
    contact: {
      badge: "Get in Touch",
      title1: "Let's Connect &",
      title2: "Build Something Impactful",
      subtitle: "Looking for a dedicated developer for your team or want to discuss a project collaboration? I'd love to hear from you.",
      chatWhatsApp: "Chat via WhatsApp",
      sendEmail: "Send Direct Email",
      copyEmail: "Copy Email Address",
      emailCopied: "Email Successfully Copied!",
      formName: "Your Full Name",
      formEmail: "Your Email Address",
      formSubject: "Subject / Project Scope",
      formMessage: "Tell me about your project, idea, or role opportunity...",
      formSend: "Send Message Now",
      formSending: "Launching Email Client...",
      formSuccess: "Your message is ready to be sent via your email client!",
      directChannels: "Direct Channels",
      locationLabel: "Location",
      locationValue: "South Tangerang & Jakarta, Indonesia",
    },
    footer: {
      tagline: "Designing and engineering digital products with precision, performance, and tangible impact.",
      rights: "All rights reserved.",
      madeWith: "Crafted with",
      by: "by",
      backToTop: "Back to Top",
    },
  },
};

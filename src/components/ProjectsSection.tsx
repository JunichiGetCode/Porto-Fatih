"use client";

import Image from "next/image";
import AnimateOnScroll from "./AnimateOnScroll";
import TiltCard from "./TiltCard";

const projects = [
  {
    title: "HaramainQu",
    subtitle: "Umrah & Hajj Travel Microservices Application",
    period: "April 2026 - Present",
    description:
      "Aplikasi mobile komprehensif menggunakan Flutter sebagai asisten digital bagi jamaah selama ibadah di Tanah Suci.",
    highlights: [
      "Feature-First (Clean Architecture) dengan 9 modul utama",
      "Full API approach menggunakan Dio",
      "Optimasi performa dengan lightweight app size",
    ],
    techStack: ["Flutter", "Dart", "Dio", "Clean Architecture"],
    color: "from-indigo-500/20 to-purple-500/20",
    borderColor: "border-indigo-500/30",
    iconColor: "text-indigo-400",
    status: "In Progress",
    image: "/haramainqu.jpeg",
  },
  {
    title: "Haramain Tour",
    subtitle: "Umrah & Hajj Travel Platform",
    period: "April 2026 - Present",
    description:
      "Platform manajemen perjalanan end-to-end dengan multi-step online registration flow (5 tahap).",
    highlights: [
      "Integrasi Midtrans (full payment & installments)",
      "Google OAuth & PDF generation",
      "REST API backend untuk mobile app",
      "Virtual assistant chatbot berbasis keyword",
    ],
    techStack: ["Laravel", "PHP", "MySQL", "REST API", "Midtrans"],
    color: "from-emerald-500/20 to-teal-500/20",
    borderColor: "border-emerald-500/30",
    iconColor: "text-emerald-400",
    status: "In Progress",
    image: "/haramain_tour.png",
  },
  {
    title: "TelEvent",
    subtitle: "Event Management System",
    period: "September - December 2025",
    description:
      "Platform web komprehensif untuk digitalisasi pengajuan dan manajemen proposal event kampus.",
    highlights: [
      "Dashboard admin dengan structured approval system",
      "Document upload management (proposal, budget, timeline)",
      "Secure user authentication & dynamic profile",
      "Interactive event search feature",
    ],
    techStack: ["Laravel", "PHP", "MySQL", "Bootstrap"],
    color: "from-blue-500/20 to-cyan-500/20",
    borderColor: "border-blue-500/30",
    iconColor: "text-blue-400",
    status: "Completed",
    image: "/televent.png",
  },
  {
    title: "Barbershop Management",
    subtitle: "Operational Management Application",
    period: "October 2025",
    description:
      "Aplikasi manajemen operasional barbershop berbasis web untuk efisiensi aktivitas harian.",
    highlights: [
      "Modul manajemen customers, staff, services, products",
      "Point of Sale (POS) system terintegrasi",
      "Real-time statistical dashboard",
      "Automated business reporting",
    ],
    techStack: ["Laravel", "PHP", "MySQL", "Chart.js"],
    color: "from-amber-500/20 to-orange-500/20",
    borderColor: "border-amber-500/30",
    iconColor: "text-amber-400",
    status: "Completed",
    image: "/barbershop.png",
  },
];

export default function ProjectsSection() {
  return (
    <section id="projects" className="relative py-24 md:py-32 section-glow">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <AnimateOnScroll className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 text-xs font-semibold tracking-widest uppercase text-primary-400 bg-primary-500/10 rounded-full border border-primary-500/20 mb-4">
            Portfolio
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            Project <span className="gradient-text">Experience</span>
          </h2>
          <p className="max-w-2xl mx-auto text-surface-200/60 text-lg">
            Koleksi project yang telah saya bangun, mulai dari mobile apps hingga/dan full-stack web platforms.
          </p>
        </AnimateOnScroll>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <AnimateOnScroll
              key={index}
              animation="animate-scale-in"
              delay={index % 2 === 0 ? "delay-100" : "delay-300"}
            >
              <TiltCard tiltIntensity={6} className="h-full">
                <div className="glass-card h-full flex flex-col group overflow-hidden">
                  {/* Project Image */}
                  {project.image && (
                    <div className="relative w-full h-48 sm:h-56 md:h-64 overflow-hidden border-b border-white/5">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-surface-950 via-transparent to-transparent opacity-85" />
                    </div>
                  )}

                  {/* Project Content */}
                  <div className="p-6 md:p-8 flex-1 flex flex-col">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <h3 className="text-xl font-bold text-white group-hover:text-primary-300 transition-colors">
                            {project.title}
                          </h3>
                          <span
                            className={`inline-flex items-center gap-1 px-2.5 py-0.5 text-xs font-medium rounded-full ${
                              project.status === "In Progress"
                                ? "bg-accent-500/10 text-accent-400 border border-accent-500/20"
                                : "bg-surface-700/50 text-surface-200/60 border border-surface-700"
                            }`}
                          >
                            {project.status === "In Progress" && (
                              <span className="w-1.5 h-1.5 bg-accent-400 rounded-full animate-pulse" />
                            )}
                            {project.status}
                          </span>
                        </div>
                        <p className="text-primary-400/70 text-sm font-medium">
                          {project.subtitle}
                        </p>
                      </div>
                    </div>

                    {/* Period */}
                    <div className="flex items-center gap-2 text-xs text-surface-200/40 mb-4">
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {project.period}
                    </div>

                    {/* Description */}
                    <p className="text-surface-200/60 text-sm leading-relaxed mb-5">
                      {project.description}
                    </p>

                    {/* Highlights */}
                    <div className="space-y-2 mb-6 flex-1">
                      {project.highlights.map((highlight, hIndex) => (
                        <div key={hIndex} className="flex items-start gap-2">
                          <svg
                            className={`w-4 h-4 mt-0.5 flex-shrink-0 ${project.iconColor}`}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 12l2 2 4-4"
                            />
                          </svg>
                          <span className="text-surface-200/50 text-sm">
                            {highlight}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5">
                      {project.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 text-xs font-medium rounded-md bg-white/5 text-surface-200/60 border border-white/5"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </TiltCard>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}

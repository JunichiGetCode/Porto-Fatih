"use client";

import Image from "next/image";
import AnimateOnScroll from "./AnimateOnScroll";
import TiltCard from "./TiltCard";
import Counter from "./Counter";

const highlights = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
    title: "Web Development",
    description: "Full-stack web apps dengan Laravel, Next.js, dan teknologi modern.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
    title: "Mobile Development",
    description: "Cross-platform apps menggunakan Flutter + Clean Architecture.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
      </svg>
    ),
    title: "Backend & API",
    description: "REST API scalable dengan payment gateway, OAuth, dan real-time.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
      </svg>
    ),
    title: "Creative Production",
    description: "Lead Editor film pendek, pemenang kompetisi film.",
  },
];

export default function AboutSection() {
  return (
    <section id="about" className="relative py-24 md:py-32 section-glow">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <AnimateOnScroll className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 text-xs font-semibold tracking-widest uppercase text-primary-400 bg-primary-500/10 rounded-full border border-primary-500/20 mb-4">
            Tentang Saya
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            Mengenal Lebih <span className="gradient-text">Dekat</span>
          </h2>
          <p className="max-w-2xl mx-auto text-surface-200/60 text-lg">
            Passionate developer yang selalu bersemangat membangun solusi digital inovatif.
          </p>
        </AnimateOnScroll>

        {/* About Content - Photo + Text */}
        <div className="grid lg:grid-cols-5 gap-12 items-center mb-20">
          {/* Photo Side */}
          <AnimateOnScroll animation="animate-slide-in-left" className="lg:col-span-2">
            <TiltCard className="mx-auto max-w-sm">
              <div className="relative group">
                {/* Background decoration */}
                <div className="absolute -inset-3 bg-gradient-to-br from-primary-500/20 via-accent-400/10 to-purple-500/20 rounded-3xl blur-xl opacity-50 group-hover:opacity-80 transition-opacity duration-700" />
                
                {/* Photo container */}
                <div className="relative rounded-2xl overflow-hidden border border-white/10 group-hover:border-primary-500/30 transition-colors duration-500">
                  <Image
                    src="/profile.jpeg"
                    alt="Muhammad Fatih Rahman"
                    width={400}
                    height={500}
                    className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700"
                    priority
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-surface-950/80 via-transparent to-transparent" />
                  
                  {/* Info overlay at bottom */}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <p className="text-white font-bold text-lg">M. Fatih Rahman</p>
                    <p className="text-primary-300 text-sm font-medium">Information System Student</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="w-2 h-2 bg-accent-400 rounded-full animate-pulse" />
                      <span className="text-surface-200/60 text-xs">Telkom University Jakarta</span>
                    </div>
                  </div>
                </div>

                {/* Floating badges around photo */}
                <div className="absolute -top-3 -right-3 px-3 py-1.5 glass rounded-xl text-xs font-semibold text-primary-300 animate-float" style={{ animationDelay: "0s" }}>
                  💻 Coder
                </div>
                <div className="absolute top-1/3 -left-5 px-3 py-1.5 glass rounded-xl text-xs font-semibold text-accent-400 animate-float" style={{ animationDelay: "1.5s" }}>
                  🎬 Editor
                </div>
                <div className="absolute -bottom-3 right-8 px-3 py-1.5 glass rounded-xl text-xs font-semibold text-purple-300 animate-float" style={{ animationDelay: "3s" }}>
                  📱 Flutter
                </div>
              </div>
            </TiltCard>
          </AnimateOnScroll>

          {/* Text Side */}
          <AnimateOnScroll animation="animate-slide-in-right" className="lg:col-span-3">
            <div className="space-y-6">
              <div className="glass-card p-8">
                <p className="text-surface-200/80 leading-relaxed text-base">
                  Saya adalah mahasiswa{" "}
                  <span className="text-white font-medium">Sistem Informasi</span> di{" "}
                  <span className="text-primary-300 font-medium">Telkom University Jakarta</span>{" "}
                  dengan keahlian di pengembangan web dan mobile. Saya menguasai{" "}
                  <span className="text-accent-400">HTML, CSS, PHP, Laravel, Flutter, JavaScript, Python, Next.js, Node.js</span>, 
                  dan manajemen database dengan MySQL.
                </p>
                <div className="mt-6 pt-6 border-t border-white/5">
                  <p className="text-surface-200/80 leading-relaxed text-base">
                    Proficient dalam developer tools seperti Git &amp; GitHub, VS Code, Postman, XAMPP, dan Laragon. Selain itu, 
                    saya juga memiliki nilai tambah di aspek kreatif melalui pengalaman sebagai{" "}
                    <span className="text-primary-300 font-medium">Lead Editor</span> dalam 
                    produksi film pendek — terbukti sebagai pemenang kompetisi film pendek.
                  </p>
                </div>
              </div>

              {/* Animated Stats */}
              <div className="grid grid-cols-3 gap-4">
                {[
                  { value: 4, suffix: "+", label: "Projects" },
                  { value: 2, suffix: "+", label: "Tahun Exp" },
                  { value: 8, suffix: "+", label: "Teknologi" },
                ].map((stat) => (
                  <TiltCard key={stat.label} tiltIntensity={15}>
                    <div className="glass-card p-5 text-center cursor-default">
                      <div className="text-3xl font-bold gradient-text mb-1">
                        <Counter end={stat.value} suffix={stat.suffix} />
                      </div>
                      <div className="text-xs text-surface-200/50 font-medium">{stat.label}</div>
                    </div>
                  </TiltCard>
                ))}
              </div>
            </div>
          </AnimateOnScroll>
        </div>

        {/* Highlights Grid with Tilt */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {highlights.map((item, index) => (
            <AnimateOnScroll
              key={index}
              animation="animate-fade-in-up"
              delay={`delay-${(index + 1) * 200}`}
            >
              <TiltCard tiltIntensity={12} className="h-full">
                <div className="glass-card p-6 h-full group">
                  <div className="w-12 h-12 rounded-xl bg-primary-500/10 border border-primary-500/20 flex items-center justify-center text-primary-400 group-hover:bg-primary-500/20 group-hover:text-primary-300 group-hover:scale-110 transition-all duration-300 mb-4">
                    {item.icon}
                  </div>
                  <h3 className="text-white font-semibold text-sm mb-2 group-hover:text-primary-300 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-surface-200/50 text-xs leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </TiltCard>
            </AnimateOnScroll>
          ))}
        </div>

        {/* Education & Experience */}
        <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <AnimateOnScroll animation="animate-fade-in-up" delay="delay-100">
            <TiltCard tiltIntensity={8} className="h-full">
              <div className="glass-card p-8 text-center h-full">
                <div className="flex items-center justify-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-primary-500/10 border border-primary-500/20 flex items-center justify-center">
                    <svg className="w-5 h-5 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-white">Education</h3>
                </div>
                <p className="text-primary-300 font-semibold text-lg">Telkom University Jakarta</p>
                <p className="text-surface-200/60 text-sm mt-1">Bachelor of Information System</p>
                <p className="text-surface-200/40 text-xs mt-1">September 2024 - Present</p>
              </div>
            </TiltCard>
          </AnimateOnScroll>

          <AnimateOnScroll animation="animate-fade-in-up" delay="delay-300">
            <TiltCard tiltIntensity={8} className="h-full">
              <div className="glass-card p-8 text-center h-full relative overflow-hidden">
                {/* Active indicator */}
                <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 bg-accent-500/10 border border-accent-500/20 rounded-full">
                  <span className="w-1.5 h-1.5 bg-accent-400 rounded-full animate-pulse" />
                  <span className="text-accent-400 text-[10px] font-semibold">Active</span>
                </div>
                <div className="flex items-center justify-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-accent-500/10 border border-accent-500/20 flex items-center justify-center">
                    <svg className="w-5 h-5 text-accent-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-white">Internship</h3>
                </div>
                <p className="text-accent-400 font-semibold text-lg">Trans Retail</p>
                <p className="text-surface-200/60 text-sm mt-1">Magang / Intern</p>
                <p className="text-surface-200/40 text-xs mt-1">2026 - Present</p>
              </div>
            </TiltCard>
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  );
}

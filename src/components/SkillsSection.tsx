"use client";

import AnimateOnScroll from "./AnimateOnScroll";
import { useLanguage } from "@/context/LanguageContext";

const skillCategories = [
  {
    title: "Frontend",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    skills: [
      { name: "HTML & CSS", level: 90 },
      { name: "JavaScript", level: 80 },
      { name: "TypeScript", level: 70 },
      { name: "Next.js", level: 65 },
    ],
    color: "primary",
  },
  {
    title: "Backend",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
      </svg>
    ),
    skills: [
      { name: "PHP / Laravel", level: 85 },
      { name: "Node.js / Express", level: 75 },
      { name: "REST API", level: 85 },
      { name: "MySQL / PostgreSQL", level: 80 },
    ],
    color: "accent",
  },
  {
    title: "Mobile",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
    skills: [
      { name: "Flutter", level: 80 },
      { name: "Dart", level: 80 },
      { name: "Clean Architecture", level: 75 },
      { name: "Microservices", level: 70 },
    ],
    color: "purple",
  },
  {
    title: "Tools & Others",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    skills: [
      { name: "Git & GitHub", level: 85 },
      { name: "VS Code", level: 90 },
      { name: "Postman", level: 80 },
      { name: "Android Studio", level: 75 },
    ],
    color: "amber",
  },
];

const colorMap: Record<string, { bar: string; bg: string; icon: string; border: string }> = {
  primary: {
    bar: "bg-primary-500",
    bg: "bg-primary-500/10",
    icon: "text-primary-400",
    border: "border-primary-500/20",
  },
  accent: {
    bar: "bg-accent-500",
    bg: "bg-accent-500/10",
    icon: "text-accent-400",
    border: "border-accent-500/20",
  },
  purple: {
    bar: "bg-purple-500",
    bg: "bg-purple-500/10",
    icon: "text-purple-400",
    border: "border-purple-500/20",
  },
  amber: {
    bar: "bg-amber-500",
    bg: "bg-amber-500/10",
    icon: "text-amber-400",
    border: "border-amber-500/20",
  },
};

export default function SkillsSection() {
  const { t } = useLanguage();
  return (
    <section id="skills" className="relative py-24 md:py-32 section-glow">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <AnimateOnScroll className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 text-xs font-semibold tracking-widest uppercase text-primary-400 bg-primary-500/10 rounded-full border border-primary-500/20 mb-4">
            {t("skills.badge")}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            {t("skills.title1")} <span className="gradient-text">{t("skills.title2")}</span>
          </h2>
          <p className="max-w-2xl mx-auto text-surface-200/60 text-lg">
            {t("skills.subtitle")}
          </p>
        </AnimateOnScroll>

        {/* Skills Grid */}
        <div className="grid sm:grid-cols-2 gap-6">
          {skillCategories.map((category, index) => {
            const colors = colorMap[category.color];
            return (
              <AnimateOnScroll
                key={index}
                animation="animate-fade-in-up"
                delay={`delay-${(index + 1) * 200}`}
              >
                <div className="glass-card p-6 md:p-8 h-full">
                  {/* Category Header */}
                  <div className="flex items-center gap-3 mb-6">
                    <div
                      className={`w-10 h-10 rounded-xl ${colors.bg} border ${colors.border} flex items-center justify-center ${colors.icon}`}
                    >
                      {category.icon}
                    </div>
                    <h3 className="text-lg font-bold text-white">
                      {category.title}
                    </h3>
                  </div>

                  {/* Skills */}
                  <div className="space-y-5">
                    {category.skills.map((skill, sIndex) => (
                      <div key={sIndex}>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-surface-200/80">
                            {skill.name}
                          </span>
                          <span className="text-xs text-surface-200/40 font-mono">
                            {skill.level}%
                          </span>
                        </div>
                        <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                          <div
                            className={`h-full ${colors.bar} rounded-full transition-all duration-1000 ease-out`}
                            style={{ width: `${skill.level}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </AnimateOnScroll>
            );
          })}
        </div>
      </div>
    </section>
  );
}

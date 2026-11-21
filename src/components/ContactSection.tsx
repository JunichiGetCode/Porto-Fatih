"use client";

import { useState, type FormEvent } from "react";
import AnimateOnScroll from "./AnimateOnScroll";
import { useLanguage } from "@/context/LanguageContext";
import { portfolioConfig } from "@/config/portfolio.config";

export default function ContactSection() {
  const { data } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [copied, setCopied] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(portfolioConfig.personal.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const mailtoUrl = `mailto:${portfolioConfig.personal.email}?subject=${encodeURIComponent(
      formData.subject || "Inquiry from 3D Portfolio"
    )}&body=${encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`
    )}`;
    window.open(mailtoUrl, "_blank");
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3500);
  };

  return (
    <section id="contact" className="relative py-24 md:py-32 section-glow">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <AnimateOnScroll className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 text-xs font-semibold tracking-widest uppercase text-primary-400 bg-primary-500/10 rounded-full border border-primary-500/20 mb-4">
            {data.contact.badge}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
            {data.contact.title1}{" "}
            <span className="bg-gradient-to-r from-primary-400 via-indigo-300 to-accent-300 bg-clip-text text-transparent">
              {data.contact.title2}
            </span>
          </h2>
          <p className="max-w-2xl mx-auto text-surface-300/80 text-base sm:text-lg">
            {data.contact.subtitle}
          </p>
        </AnimateOnScroll>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Direct Channels & Socials (5 cols) */}
          <AnimateOnScroll animation="animate-slide-in-left" className="lg:col-span-5 space-y-4">
            {/* Quick Email Copy Card */}
            <div className="p-6 rounded-3xl bg-surface-900/80 border border-white/10 shadow-xl">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-surface-400">
                  Email
                </span>
                <span className="text-[11px] text-accent-400 font-mono font-medium">
                  {portfolioConfig.personal.email}
                </span>
              </div>
              <p className="text-xs text-surface-300 mb-4">
                Have a collaboration proposal, engineering role, or technical inquiry? Copy email to connect directly.
              </p>
              <button
                onClick={handleCopyEmail}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-primary-600 to-indigo-600 hover:from-primary-500 hover:to-indigo-500 text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-lg shadow-primary-600/25 transition-all cursor-pointer"
              >
                {copied ? (
                  <>
                    <svg className="w-4 h-4 text-accent-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{data.contact.emailCopied}</span>
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                    </svg>
                    <span>{data.contact.copyEmail}</span>
                  </>
                )}
              </button>
            </div>

            {/* Direct WhatsApp Card */}
            <a
              href={`${portfolioConfig.personal.whatsappUrl}?text=Hello,%20I%20am%20exploring%20your%203D%20portfolio%20and%20would%20love%20to%20connect.`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-5 rounded-3xl bg-surface-900/70 border border-white/10 hover:border-emerald-500/40 flex items-center justify-between group transition-all shadow-xl block"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:scale-105 transition-transform">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.007c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.303-.058.116-.087.188-.173.289l-.26.302c-.087.087-.177.182-.076.355.101.173.45 743 1.042 1.271.761.679 1.403.889 1.604.99.202.101.319.087.433-.044.116-.13.491-.572.622-.767.13-.195.26-.159.433-.087.173.072 1.097.517 1.285.611.188.094.313.141.359.221.046.08.046.883-.098 1.288z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white group-hover:text-emerald-300 transition-colors">
                    {data.contact.chatWhatsApp}
                  </h4>
                  <p className="text-xs text-surface-400 font-mono">{portfolioConfig.personal.phone}</p>
                </div>
              </div>
              <svg className="w-5 h-5 text-surface-500 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>

            {/* Social Links & Location */}
            <div className="p-5 rounded-3xl bg-surface-900/70 border border-white/10 shadow-xl">
              <span className="text-xs font-bold uppercase tracking-wider text-surface-400 block mb-3">
                Social Profiles & Networks
              </span>
              <div className="flex items-center gap-3 mb-4">
                <a
                  href={portfolioConfig.personal.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-surface-300 hover:text-white hover:bg-primary-600/30 hover:border-primary-500/40 transition-all"
                  aria-label="GitHub Profile"
                  title="GitHub"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                </a>
                <a
                  href={portfolioConfig.personal.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-surface-300 hover:text-white hover:bg-blue-600/30 hover:border-blue-500/40 transition-all"
                  aria-label="LinkedIn Profile"
                  title="LinkedIn"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
                <a
                  href="https://x.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-surface-300 hover:text-white hover:bg-sky-600/30 hover:border-sky-500/40 transition-all"
                  aria-label="Twitter / X Profile"
                  title="X (Twitter)"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
              </div>
              <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs text-surface-400">
                <span>{data.contact.locationLabel}:</span>
                <span className="text-white font-medium">{data.contact.locationValue}</span>
              </div>
            </div>
          </AnimateOnScroll>

          {/* Right Column: Interactive Quick Inquiry Form (7 cols) */}
          <AnimateOnScroll animation="animate-slide-in-right" className="lg:col-span-7">
            <form onSubmit={handleSubmit} className="p-6 sm:p-8 rounded-3xl bg-surface-900/80 border border-white/10 shadow-2xl">
              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="form-name" className="block text-xs font-semibold text-surface-300 uppercase tracking-wider mb-1.5">
                    {data.contact.formName}
                  </label>
                  <input
                    id="form-name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. John Doe / Recruiter"
                    className="w-full px-4 py-3 rounded-xl bg-surface-950/70 border border-white/10 text-white text-sm placeholder:text-surface-500 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all"
                  />
                </div>
                <div>
                  <label htmlFor="form-email" className="block text-xs font-semibold text-surface-300 uppercase tracking-wider mb-1.5">
                    {data.contact.formEmail}
                  </label>
                  <input
                    id="form-email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@company.com"
                    className="w-full px-4 py-3 rounded-xl bg-surface-950/70 border border-white/10 text-white text-sm placeholder:text-surface-500 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label htmlFor="form-subject" className="block text-xs font-semibold text-surface-300 uppercase tracking-wider mb-1.5">
                  {data.contact.formSubject}
                </label>
                <input
                  id="form-subject"
                  type="text"
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="e.g. Opportunity / Mobile App Project"
                  className="w-full px-4 py-3 rounded-xl bg-surface-950/70 border border-white/10 text-white text-sm placeholder:text-surface-500 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all"
                />
              </div>

              <div className="mb-6">
                <label htmlFor="form-message" className="block text-xs font-semibold text-surface-300 uppercase tracking-wider mb-1.5">
                  {data.contact.formMessage}
                </label>
                <textarea
                  id="form-message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Briefly describe what you are looking for..."
                  className="w-full px-4 py-3 rounded-xl bg-surface-950/70 border border-white/10 text-white text-sm placeholder:text-surface-500 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all resize-none"
                />
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <button
                  type="submit"
                  disabled={submitted}
                  className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-gradient-to-r from-primary-600 to-indigo-600 hover:from-primary-500 hover:to-indigo-500 text-white font-semibold text-xs shadow-lg shadow-primary-600/30 flex items-center justify-center gap-2 transition-all cursor-pointer hover:-translate-y-0.5 disabled:opacity-50"
                >
                  {submitted ? (
                    <>
                      <svg className="w-4 h-4 text-accent-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>{data.contact.formSuccess}</span>
                    </>
                  ) : (
                    <>
                      <span>{data.contact.formSend}</span>
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </>
                  )}
                </button>
                <span className="text-[11px] text-surface-400 font-mono text-center sm:text-right">
                  Fast response within 24 hours
                </span>
              </div>
            </form>
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useState, type FormEvent } from "react";
import AnimateOnScroll from "./AnimateOnScroll";
import { useLanguage } from "@/context/LanguageContext";

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
      await navigator.clipboard.writeText("fatihfatihrahman@gmail.com");
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const mailtoUrl = `mailto:fatihfatihrahman@gmail.com?subject=${encodeURIComponent(
      formData.subject || "Inquiry from Portfolio"
    )}&body=${encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`
    )}`;
    window.open(mailtoUrl, "_blank");
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3500);
  };

  return (
    <section id="contact" className="relative py-20 md:py-28 bg-[#0D0D12] border-b-3 border-black neo-grid-dark-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <AnimateOnScroll className="text-center mb-16">
          <div className="inline-block px-3.5 py-1 text-xs font-mono font-black tracking-widest uppercase bg-[#FF3366] text-white border-2 border-black shadow-[3px_3px_0px_#000] mb-4">
            [SECTION: 04] // {data.contact.badge}
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white uppercase font-sans tracking-tight mb-4">
            {data.contact.title1}{" "}
            <span className="inline-block bg-[#FFE600] text-black px-3 py-0.5 border-3 border-black shadow-[4px_4px_0px_#000] rotate-[-1deg]">
              {data.contact.title2}
            </span>
          </h2>
          <p className="max-w-2xl mx-auto text-zinc-300 text-sm sm:text-base font-medium">
            {data.contact.subtitle}
          </p>
        </AnimateOnScroll>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Direct Channels & Socials (5 cols) */}
          <AnimateOnScroll animation="animate-slide-in-left" className="lg:col-span-5 space-y-4">
            {/* Quick Email Copy Card */}
            <div className="p-6 bg-[#171720] border-3 border-black shadow-[6px_6px_0px_#000]">
              <div className="flex items-center justify-between mb-3 border-b-2 border-black pb-2">
                <span className="text-xs font-mono font-black uppercase tracking-wider text-[#FFE600]">
                  DIRECT INBOX
                </span>
                <span className="text-xs text-[#00D2FF] font-mono font-bold">
                  fatihfatihrahman@gmail.com
                </span>
              </div>
              <p className="text-xs text-zinc-300 mb-5 leading-relaxed font-medium">
                Ada tawaran kerja sama, peluang karir, atau diskusi teknis? Salin email untuk mengirim pesan langsung.
              </p>
              <button
                onClick={handleCopyEmail}
                className="neo-btn w-full py-3 bg-[#FFE600] text-black text-xs hover:bg-[#FFF066]"
              >
                {copied ? (
                  <>
                    <span>✓</span>
                    <span>{data.contact.emailCopied}</span>
                  </>
                ) : (
                  <>
                    <span>📋</span>
                    <span>{data.contact.copyEmail}</span>
                  </>
                )}
              </button>
            </div>

            {/* Direct WhatsApp Card */}
            <a
              href="https://wa.me/6281275516335?text=Halo%20Fatih,%20saya%20melihat%20portofolio%20Anda%20dan%20tertarik%20untuk%20berdiskusi."
              target="_blank"
              rel="noopener noreferrer"
              className="block p-6 bg-[#171720] border-3 border-black shadow-[6px_6px_0px_#000] hover:shadow-[9px_9px_0px_#000] hover:-translate-x-1 hover:-translate-y-1 transition-all group"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 bg-[#00F08B] border border-black animate-pulse" />
                  <span className="text-xs font-mono font-black uppercase text-white">
                    WHATSAPP INSTANT
                  </span>
                </div>
                <span className="text-xs font-mono font-bold text-[#00F08B] group-hover:underline">
                  +62 812-7551-6335 ↗
                </span>
              </div>
              <p className="text-xs text-zinc-400 font-sans">
                Respon cepat untuk konsultasi freelance, diskusi proyek, atau rekrutmen.
              </p>
            </a>

            {/* Social Links Row */}
            <div className="grid grid-cols-3 gap-3">
              <a
                href="https://github.com/fatih0202"
                target="_blank"
                rel="noopener noreferrer"
                className="neo-btn p-3 bg-[#0D0D12] text-white text-xs hover:bg-black hover:text-[#FFE600] text-center"
              >
                GITHUB ↗
              </a>
              <a
                href="https://linkedin.com/in/muhammad-fatih-rahman"
                target="_blank"
                rel="noopener noreferrer"
                className="neo-btn p-3 bg-[#0D0D12] text-white text-xs hover:bg-black hover:text-[#00D2FF] text-center"
              >
                LINKEDIN ↗
              </a>
              <a
                href="https://instagram.com/fatihh.rr"
                target="_blank"
                rel="noopener noreferrer"
                className="neo-btn p-3 bg-[#0D0D12] text-white text-xs hover:bg-black hover:text-[#FF3366] text-center"
              >
                INSTA ↗
              </a>
            </div>
          </AnimateOnScroll>

          {/* Right Column: Message Dispatcher Terminal (7 cols) */}
          <AnimateOnScroll animation="animate-slide-in-right" className="lg:col-span-7">
            <div className="bg-[#171720] border-3 border-black shadow-[8px_8px_0px_#000]">
              {/* Terminal Title Bar */}
              <div className="bg-black text-[#FFE600] font-mono text-xs font-black uppercase px-4 py-3 border-b-3 border-black flex items-center justify-between">
                <span>[TERMINAL::DISPATCH_MESSAGE]</span>
                <span className="text-[#00F08B] text-[10px]">READY_TO_SEND</span>
              </div>

              {/* Form Body */}
              <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono font-bold uppercase text-zinc-300 mb-1">
                      {data.contact.formName} *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Alex Henderson"
                      className="w-full p-3 bg-[#0D0D12] border-2 border-black text-white font-mono text-xs focus:outline-none focus:border-[#FFE600] focus:shadow-[3px_3px_0px_#FFE600] transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono font-bold uppercase text-zinc-300 mb-1">
                      {data.contact.formEmail} *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="alex@company.com"
                      className="w-full p-3 bg-[#0D0D12] border-2 border-black text-white font-mono text-xs focus:outline-none focus:border-[#FFE600] focus:shadow-[3px_3px_0px_#FFE600] transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold uppercase text-zinc-300 mb-1">
                    {data.contact.formSubject} *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="e.g. Tawaran Kolaborasi Web / Full-Stack Project"
                    className="w-full p-3 bg-[#0D0D12] border-2 border-black text-white font-mono text-xs focus:outline-none focus:border-[#FFE600] focus:shadow-[3px_3px_0px_#FFE600] transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold uppercase text-zinc-300 mb-1">
                    {data.contact.formMessage} *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tuliskan pesan atau detail kebutuhan project Anda di sini..."
                    className="w-full p-3 bg-[#0D0D12] border-2 border-black text-white font-mono text-xs focus:outline-none focus:border-[#FFE600] focus:shadow-[3px_3px_0px_#FFE600] transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="neo-btn w-full py-4 bg-[#FFE600] text-black text-sm uppercase tracking-wider hover:bg-[#FFF066]"
                >
                  {submitted ? (
                    <>
                      <span>✓</span>
                      <span>{data.contact.formSuccess}</span>
                    </>
                  ) : (
                    <>
                      <span>⚡</span>
                      <span>{data.contact.formSend}</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  );
}

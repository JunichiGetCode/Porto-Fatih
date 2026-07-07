"use client";

import { useState, type FormEvent } from "react";
import AnimateOnScroll from "./AnimateOnScroll";

const contactInfo = [
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    label: "Email",
    value: "fatihfatihrahman@gmail.com",
    href: "mailto:fatihfatihrahman@gmail.com",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
    label: "Phone",
    value: "081275516335",
    href: "tel:+6281275516335",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
    label: "Instagram",
    value: "@ffaattihhr",
    href: "https://instagram.com/ffaattiihrr",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    label: "Lokasi",
    value: "Batan Indah Blok O17, Setu, kademangan, Kota Tangerang Selatan",
    href: "#",
  },
];

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Create mailto link with form data
    const mailtoUrl = `mailto:fatihfatihrahman@gmail.com?subject=${encodeURIComponent(
      formData.subject || "Message from Portfolio"
    )}&body=${encodeURIComponent(
      `Dari: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`
    )}`;
    window.open(mailtoUrl, "_blank");
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section id="contact" className="relative py-24 md:py-32 section-glow">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <AnimateOnScroll className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 text-xs font-semibold tracking-widest uppercase text-primary-400 bg-primary-500/10 rounded-full border border-primary-500/20 mb-4">
            Kontak
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            Mari <span className="gradient-text">Berkolaborasi</span>
          </h2>
          <p className="max-w-2xl mx-auto text-surface-200/60 text-lg">
            Tertarik untuk bekerja sama? Jangan ragu untuk menghubungi saya.
          </p>
        </AnimateOnScroll>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Contact Info */}
          <AnimateOnScroll animation="animate-slide-in-left" className="lg:col-span-2">
            <div className="space-y-4">
              {contactInfo.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="glass-card p-5 flex items-center gap-4 group block"
                  id={`contact-${item.label.toLowerCase()}`}
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary-500/10 border border-primary-500/20 flex items-center justify-center text-primary-400 group-hover:bg-primary-500/20 group-hover:text-primary-300 transition-all duration-300">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-xs text-surface-200/40 font-medium uppercase tracking-wider mb-0.5">
                      {item.label}
                    </p>
                    <p className="text-sm text-surface-200/80 group-hover:text-white transition-colors">
                      {item.value}
                    </p>
                  </div>
                </a>
              ))}

              {/* Social Links */}
              <div className="glass-card p-5 mt-6">
                <p className="text-xs text-surface-200/40 font-medium uppercase tracking-wider mb-4">
                  Social Media
                </p>
                <div className="flex gap-3">
                  <a
                    href="https://github.com/ffaattiihrr"
                    target="_blank"
                    rel="noopener noreferrer"
                    id="social-github"
                    className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-surface-200/60 hover:text-white hover:bg-primary-500/20 hover:border-primary-500/30 transition-all duration-300"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                  </a>
                  <a
                    href="https://instagram.com/ffaattiihrr"
                    target="_blank"
                    rel="noopener noreferrer"
                    id="social-instagram"
                    className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-surface-200/60 hover:text-white hover:bg-pink-500/20 hover:border-pink-500/30 transition-all duration-300"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  </a>
                  <a
                    href="https://www.linkedin.com/in/fatih-rahman/"
                    target="_blank"
                    rel="noopener noreferrer"
                    id="social-linkedin"
                    className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-surface-200/60 hover:text-white hover:bg-blue-500/20 hover:border-blue-500/30 transition-all duration-300"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </AnimateOnScroll>

          {/* Contact Form */}
          <AnimateOnScroll animation="animate-slide-in-right" className="lg:col-span-3">
            <form onSubmit={handleSubmit} className="glass-card p-6 md:p-8">
              <div className="grid sm:grid-cols-2 gap-5 mb-5">
                <div>
                  <label
                    htmlFor="contact-name"
                    className="block text-xs text-surface-200/40 font-medium uppercase tracking-wider mb-2"
                  >
                    Nama
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    placeholder="Nama lengkap"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm placeholder:text-surface-200/30 focus:outline-none focus:border-primary-500/50 focus:bg-white/[0.07] transition-all duration-300"
                  />
                </div>
                <div>
                  <label
                    htmlFor="contact-email"
                    className="block text-xs text-surface-200/40 font-medium uppercase tracking-wider mb-2"
                  >
                    Email
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    placeholder="email@example.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm placeholder:text-surface-200/30 focus:outline-none focus:border-primary-500/50 focus:bg-white/[0.07] transition-all duration-300"
                  />
                </div>
              </div>

              <div className="mb-5">
                <label
                  htmlFor="contact-subject"
                  className="block text-xs text-surface-200/40 font-medium uppercase tracking-wider mb-2"
                >
                  Subject
                </label>
                <input
                  id="contact-subject"
                  type="text"
                  required
                  placeholder="Topik pesan"
                  value={formData.subject}
                  onChange={(e) =>
                    setFormData({ ...formData, subject: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm placeholder:text-surface-200/30 focus:outline-none focus:border-primary-500/50 focus:bg-white/[0.07] transition-all duration-300"
                />
              </div>

              <div className="mb-6">
                <label
                  htmlFor="contact-message"
                  className="block text-xs text-surface-200/40 font-medium uppercase tracking-wider mb-2"
                >
                  Pesan
                </label>
                <textarea
                  id="contact-message"
                  required
                  rows={5}
                  placeholder="Tulis pesan Anda..."
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm placeholder:text-surface-200/30 focus:outline-none focus:border-primary-500/50 focus:bg-white/[0.07] transition-all duration-300 resize-none"
                />
              </div>

              <button
                type="submit"
                id="contact-submit"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-primary-600 hover:bg-primary-500 text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-primary-600/25 hover:-translate-y-0.5 disabled:opacity-50"
                disabled={submitted}
              >
                {submitted ? (
                  <>
                    <svg className="w-5 h-5 text-accent-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Terkirim!
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                    Kirim Pesan
                  </>
                )}
              </button>
            </form>
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  );
}

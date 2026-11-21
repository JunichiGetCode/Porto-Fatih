import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import { portfolioConfig } from "@/config/portfolio.config";

export const metadata: Metadata = {
  title: `${portfolioConfig.personal.name} | ${portfolioConfig.personal.role}`,
  description: `${portfolioConfig.personal.name} — ${portfolioConfig.personal.role}. Interactive 3D WebGL Room Portfolio built with Next.js, Three.js, and Tailwind CSS.`,
  keywords: [
    portfolioConfig.personal.name,
    "Web Developer",
    "Mobile Developer",
    "Three.js 3D Portfolio",
    "Next.js Portfolio",
    "WebGL Virtual Room",
    "Open Source Starter Template",
  ],
  authors: [{ name: portfolioConfig.personal.name }],
  openGraph: {
    title: `${portfolioConfig.personal.name} | 3D Interactive Portfolio`,
    description: `Explore ${portfolioConfig.personal.name}'s interactive 3D WebGL room portfolio suite.`,
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className="min-h-screen bg-surface-950 text-white font-sans antialiased noise-bg">
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Muhammad Fatih Rahman | Web & Mobile Developer",
  description:
    "Portfolio of Muhammad Fatih Rahman — Information Systems student at Telkom University Jakarta. Expert in Web & Mobile Development with Laravel, Flutter, Next.js, and more.",
  keywords: [
    "Muhammad Fatih Rahman",
    "Web Developer",
    "Mobile Developer",
    "Flutter",
    "Laravel",
    "Next.js",
    "Portfolio",
    "Telkom University Jakarta",
  ],
  authors: [{ name: "Muhammad Fatih Rahman" }],
  openGraph: {
    title: "Muhammad Fatih Rahman | Web & Mobile Developer",
    description:
      "Portfolio of Muhammad Fatih Rahman — Information Systems student at Telkom University Jakarta.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="min-h-screen bg-surface-950 text-white font-sans antialiased noise-bg">
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";

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
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/icon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.ico", sizes: "32x32" },
    ],
    shortcut: "/icon.svg",
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
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
    <html lang="id">
      <body className="min-h-screen bg-surface-950 text-white font-sans antialiased noise-bg">
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}

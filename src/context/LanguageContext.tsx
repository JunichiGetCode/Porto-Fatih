"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { translations, Language, TranslationData } from "./translations";

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  setLang: (lang: Language) => void;
  t: (key: string) => string | string[];
  data: TranslationData;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguage] = useState<Language>("id");

  useEffect(() => {
    try {
      const storedLang = localStorage.getItem("app-language") as Language | null;
      if (storedLang === "id" || storedLang === "en") {
        const timer = setTimeout(() => {
          setLanguage(storedLang);
        }, 0);
        return () => clearTimeout(timer);
      }
    } catch {
      // Fallback for private browsing or restricted environments
    }
  }, []);

  const toggleLanguage = () => {
    setLanguage((prev) => {
      const newLang: Language = prev === "id" ? "en" : "id";
      try {
        localStorage.setItem("app-language", newLang);
      } catch {
        // Ignore storage errors
      }
      return newLang;
    });
  };

  const setLang = (newLang: Language) => {
    setLanguage(newLang);
    try {
      localStorage.setItem("app-language", newLang);
    } catch {
      // Ignore storage errors
    }
  };

  const currentData: TranslationData = translations[language];

  const t = (key: string): string | string[] => {
    const keys = key.split(".");
    let current: unknown = currentData;
    for (const k of keys) {
      if (current && typeof current === "object" && k in current) {
        current = (current as Record<string, unknown>)[k];
      } else {
        console.warn(`Translation key missing: ${key}`);
        return key;
      }
    }
    if (typeof current === "string" || Array.isArray(current)) {
      return current as string | string[];
    }
    return key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, setLang, t, data: currentData }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

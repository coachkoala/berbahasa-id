"use client";

import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";

type Settings = {
  emailNotif: boolean;
  dailyReminder: boolean;
  language: "id" | "en";
};

type AppState = {
  bookmarks: Record<string, boolean>;
  toggleBookmark: (slug: string) => void;
  isBookmarked: (slug: string) => boolean;
  settings: Settings;
  toggleSetting: (key: "emailNotif" | "dailyReminder") => void;
  setLanguage: (lang: "id" | "en") => void;
};

const defaultSettings: Settings = { emailNotif: true, dailyReminder: true, language: "id" };

const AppStateContext = createContext<AppState | null>(null);

const STORAGE_KEY = "berbahasa-id:app-state";

function readStoredState(): { bookmarks: Record<string, boolean>; settings: Settings } {
  if (typeof window === "undefined") {
    return { bookmarks: {}, settings: defaultSettings };
  }
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return { bookmarks: {}, settings: defaultSettings };
    const parsed = JSON.parse(raw);
    return {
      bookmarks: parsed.bookmarks ?? {},
      settings: { ...defaultSettings, ...parsed.settings },
    };
  } catch {
    return { bookmarks: {}, settings: defaultSettings };
  }
}

export function AppStateProvider({ children }: { children: ReactNode }) {
  const [bookmarks, setBookmarks] = useState<Record<string, boolean>>({});
  const [settings, setSettings] = useState<Settings>(defaultSettings);
  const hydrated = useRef(false);

  // Read localStorage once after mount (avoids SSR/client markup mismatch).
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      const stored = readStoredState();
      setBookmarks(stored.bookmarks);
      setSettings(stored.settings);
      hydrated.current = true;
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (!hydrated.current) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ bookmarks, settings }));
  }, [bookmarks, settings]);

  const toggleBookmark = (slug: string) =>
    setBookmarks((prev) => ({ ...prev, [slug]: !prev[slug] }));

  const isBookmarked = (slug: string) => !!bookmarks[slug];

  const toggleSetting = (key: "emailNotif" | "dailyReminder") =>
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));

  const setLanguage = (lang: "id" | "en") => setSettings((prev) => ({ ...prev, language: lang }));

  return (
    <AppStateContext.Provider
      value={{ bookmarks, toggleBookmark, isBookmarked, settings, toggleSetting, setLanguage }}
    >
      {children}
    </AppStateContext.Provider>
  );
}

export function useAppState() {
  const ctx = useContext(AppStateContext);
  if (!ctx) throw new Error("useAppState must be used within AppStateProvider");
  return ctx;
}

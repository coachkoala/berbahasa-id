"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import type { User } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";

type Settings = {
  emailNotif: boolean;
  dailyReminder: boolean;
  language: "id" | "en";
};

type AppState = {
  user: User | null;
  loading: boolean;
  bookmarks: Record<string, boolean>;
  toggleBookmark: (slug: string) => void;
  isBookmarked: (slug: string) => boolean;
  settings: Settings;
  toggleSetting: (key: "emailNotif" | "dailyReminder") => void;
  setLanguage: (lang: "id" | "en") => void;
  signOut: () => void;
};

const defaultSettings: Settings = { emailNotif: true, dailyReminder: true, language: "id" };

const AppStateContext = createContext<AppState | null>(null);

export function AppStateProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [supabase] = useState(() => createClient());
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [bookmarks, setBookmarks] = useState<Record<string, boolean>>({});
  const [settings, setSettings] = useState<Settings>(defaultSettings);

  useEffect(() => {
    let active = true;

    async function load() {
      const {
        data: { user: currentUser },
      } = await supabase.auth.getUser();
      if (!active) return;
      if (!currentUser) {
        setLoading(false);
        return;
      }
      setUser(currentUser);

      const [{ data: bookmarkRows }, { data: settingsRow }] = await Promise.all([
        supabase.from("bookmarks").select("article_slug").eq("user_id", currentUser.id),
        supabase.from("user_settings").select("*").eq("user_id", currentUser.id).maybeSingle(),
      ]);

      if (!active) return;

      if (bookmarkRows) {
        setBookmarks(Object.fromEntries(bookmarkRows.map((row) => [row.article_slug, true])));
      }

      if (settingsRow) {
        setSettings({
          emailNotif: settingsRow.email_notif,
          dailyReminder: settingsRow.daily_reminder,
          language: settingsRow.language as "id" | "en",
        });
      } else {
        await supabase.from("user_settings").insert({ user_id: currentUser.id });
      }

      setLoading(false);
    }

    load();
    return () => {
      active = false;
    };
  }, [supabase]);

  const toggleBookmark = (slug: string) => {
    if (!user) return;
    const wasBookmarked = !!bookmarks[slug];
    setBookmarks((prev) => ({ ...prev, [slug]: !wasBookmarked }));

    if (wasBookmarked) {
      supabase.from("bookmarks").delete().eq("user_id", user.id).eq("article_slug", slug).then();
    } else {
      supabase.from("bookmarks").insert({ user_id: user.id, article_slug: slug }).then();
    }
  };

  const isBookmarked = (slug: string) => !!bookmarks[slug];

  const persistSettings = (next: Settings) => {
    if (!user) return;
    supabase
      .from("user_settings")
      .update({
        email_notif: next.emailNotif,
        daily_reminder: next.dailyReminder,
        language: next.language,
      })
      .eq("user_id", user.id)
      .then();
  };

  const toggleSetting = (key: "emailNotif" | "dailyReminder") => {
    setSettings((prev) => {
      const next = { ...prev, [key]: !prev[key] };
      persistSettings(next);
      return next;
    });
  };

  const setLanguage = (lang: "id" | "en") => {
    setSettings((prev) => {
      const next = { ...prev, language: lang };
      persistSettings(next);
      return next;
    });
  };

  const signOut = () => {
    supabase.auth.signOut().then(() => router.push("/"));
  };

  return (
    <AppStateContext.Provider
      value={{
        user,
        loading,
        bookmarks,
        toggleBookmark,
        isBookmarked,
        settings,
        toggleSetting,
        setLanguage,
        signOut,
      }}
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

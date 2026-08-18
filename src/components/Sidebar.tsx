"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo, WordMark } from "@/components/Logo";

const NAV_ITEMS = [
  { key: "dashboard", href: "/app", label: "Dashboard", icon: "▦" },
  { key: "news", href: "/app/news", label: "Berita", icon: "▤" },
  { key: "vocabulary", href: "/app/vocabulary", label: "Kosakata", icon: "Aa" },
  { key: "practice", href: "/app/practice", label: "Latihan", icon: "✓" },
  { key: "progress", href: "/app/progress", label: "Progres", icon: "↗" },
  { key: "bookmarks", href: "/app/bookmarks", label: "Tersimpan", icon: "★" },
  { key: "settings", href: "/app/settings", label: "Pengaturan", icon: "⚙" },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-[220px] shrink-0 flex-col gap-6 border-r-[3px] border-[#111] bg-white p-4 sm:flex">
      <div className="flex items-center gap-2.5 px-1">
        <Logo size="sm" />
        <WordMark size={17} />
      </div>

      <nav className="flex flex-col gap-1.5">
        {NAV_ITEMS.map((item) => {
          const active = item.href === "/app" ? pathname === "/app" : pathname.startsWith(item.href);
          return (
            <Link
              key={item.key}
              href={item.href}
              className={`flex w-full items-center gap-3 rounded-xl border-[3px] px-3 py-2.5 text-left font-[family-name:var(--font-display)] text-sm font-semibold ${
                active ? "border-[#111] bg-[#FFD100] text-[#111]" : "border-transparent text-[#2B2B2B] hover:bg-[#F7F5EF]"
              }`}
            >
              <span className="flex h-[26px] w-[26px] shrink-0 items-center justify-center text-[13px]">
                {item.icon}
              </span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      <Link
        href="/"
        className="mt-auto px-3 py-2 font-[family-name:var(--font-display)] text-[13px] font-semibold text-[#2B2B2B]"
      >
        ← Kembali ke Beranda
      </Link>
    </aside>
  );
}

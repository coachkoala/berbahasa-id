"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { key: "dashboard", href: "/app", label: "Dashboard", icon: "▦" },
  { key: "news", href: "/app/news", label: "Berita", icon: "▤" },
  { key: "vocabulary", href: "/app/vocabulary", label: "Kosakata", icon: "Aa" },
  { key: "practice", href: "/app/practice", label: "Latihan", icon: "✓" },
  { key: "progress", href: "/app/progress", label: "Progres", icon: "↗" },
  { key: "bookmarks", href: "/app/bookmarks", label: "Tersimpan", icon: "★" },
  { key: "settings", href: "/app/settings", label: "Pengaturan", icon: "⚙" },
];

export function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="flex gap-2 overflow-x-auto border-b-[3px] border-[#111] bg-white px-3 py-2.5 sm:hidden print:hidden">
      {NAV_ITEMS.map((item) => {
        const active = item.href === "/app" ? pathname === "/app" : pathname.startsWith(item.href);
        return (
          <Link
            key={item.key}
            href={item.href}
            className={`flex shrink-0 items-center gap-1.5 rounded-full border-2 px-3 py-1.5 font-[family-name:var(--font-display)] text-xs font-semibold ${
              active ? "border-[#111] bg-[#FFD100] text-[#111]" : "border-[#111] bg-white text-[#2B2B2B]"
            }`}
          >
            <span>{item.icon}</span>
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}

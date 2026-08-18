"use client";

import Link from "next/link";
import { WordMark } from "@/components/Logo";
import { useAppState } from "@/lib/store";

export function AppHeader() {
  const { user } = useAppState();
  const initial = user?.email?.[0]?.toUpperCase() ?? "?";

  return (
    <header className="flex items-center justify-between border-b-[3px] border-[#111] bg-white px-4 py-3.5 sm:px-8 print:hidden">
      <WordMark size={18} />
      <Link
        href="/app/settings"
        title={user?.email}
        className="flex h-[38px] w-[38px] items-center justify-center rounded-full border-[2.5px] border-[#111] bg-[#FFD100] font-[family-name:var(--font-display)] text-sm font-bold text-[#111] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111] focus-visible:ring-offset-2"
      >
        {initial}
      </Link>
    </header>
  );
}

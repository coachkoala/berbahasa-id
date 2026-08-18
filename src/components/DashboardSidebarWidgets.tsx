"use client";

import Link from "next/link";
import { useAppState } from "@/lib/store";

export function DashboardSidebarWidgets() {
  const { streak } = useAppState();

  return (
    <div className="flex w-full shrink-0 flex-col gap-4 sm:w-[260px]">
      <div className="rounded-[18px] border-[3px] border-[#111] bg-[#FFD100] p-[18px]">
        <div className="font-[family-name:var(--font-display)] text-[13px] font-semibold text-[#111]">
          Streak
        </div>
        <div className="mt-0.5 font-[family-name:var(--font-display)] text-[32px] font-bold text-[#111]">
          {streak} <span className="text-sm font-semibold">hari</span>
        </div>
        <div className="mt-1 text-xs text-[#111]">
          {streak > 1 ? "Pertahankan!" : "Kembali besok untuk lanjutkan streak-mu."}
        </div>
      </div>

      <Link
        href="/app/progress"
        className="rounded-[18px] border-[3px] border-[#111] bg-white p-[18px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111] focus-visible:ring-offset-2"
      >
        <div className="text-[13px] font-semibold text-[#2B2B2B]">Progres Anda</div>
        <div className="mt-0.5 font-[family-name:var(--font-display)] text-[17px] font-bold text-[#111]">
          Lihat detail →
        </div>
      </Link>
    </div>
  );
}
